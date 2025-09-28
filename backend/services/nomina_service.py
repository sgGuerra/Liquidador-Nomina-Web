from exceptions import *
from services.loan_service import LoanService
from apps.nomina.models import HoraExtra, TipoHoraExtra
from apps.prestamos.models import Prestamo

# Constantes
SALARIO_MINIMO_LEGAL_VIGENTE = 1423500  # Salario mínimo legal vigente en 2025
AUXILIO_TRANSPORTE = 200000  # Auxilio de transporte en 2025
VALOR_UVT = 49799  # Valor de la Unidad de Valor Tributario en 2025
PORCENTAJE_SALUD = 0.04  # Porcentaje de descuento de salud
PORCENTAJE_PENSION = 0.04  # Porcentaje de descuento de pensión
DIVISOR_HORAS_LABORALES = 240  # Número de horas trabajadas en un mes
MAXIMO_HORAS_EXTRA_LEGALES_PERMITIDAS = 50  # Límite de horas extra legales
SIN_HORAS_EXTRAS = 0
SIN_PRESTAMO = 0
SIN_CUOTAS = 1

PORCENTAJE_APORTE_FONDO_SOLIDARIDAD_PENSIONAL = {
    "limite inferior": 0.01,
    "limite superior": 0.02
}

# Factores de horas extras
FACTORES_HORA_EXTRA = {
    "Diurnas": 1.25,
    "Nocturnas": 1.75,
    "Festivas": 2.5,
    "N/A": 0
}


class NominaService:
    @staticmethod
    def calcular_bonificacion(cargo):
        return cargo.bonificacion

    @staticmethod
    def calcular_valor_hora_extra(horas_extras, tipo_hora_extra):
        factor = FACTORES_HORA_EXTRA.get(tipo_hora_extra.nombre_tipo_hora, 0)
        return (240 / DIVISOR_HORAS_LABORALES) * factor * horas_extras  # Assuming 240 hours/month

    @staticmethod
    def calcular_salario_bruto(empleado):
        bonificacion = NominaService.calcular_bonificacion(empleado.cargo)
        valor_hora_extra = 0

        horas_extras = HoraExtra.objects.filter(empleado=empleado)
        for hora_extra in horas_extras:
            valor_hora_extra += NominaService.calcular_valor_hora_extra(
                hora_extra.numero_de_horas, hora_extra.tipo_hora
            )

        return empleado.salario_base + bonificacion + valor_hora_extra

    @staticmethod
    def calcular_deducciones_legales(salario_base):
        salud = salario_base * PORCENTAJE_SALUD
        pension = salario_base * PORCENTAJE_PENSION
        return salud + pension

    @staticmethod
    def calcular_impuestos(salario_bruto):
        limite_inferior = 4 * VALOR_UVT
        limite_superior = 16 * VALOR_UVT

        if salario_bruto <= limite_inferior:
            return 0
        elif salario_bruto <= limite_superior:
            return (salario_bruto - limite_inferior) * PORCENTAJE_APORTE_FONDO_SOLIDARIDAD_PENSIONAL.get("limite inferior", 0)
        else:
            return (limite_superior - limite_inferior) * PORCENTAJE_APORTE_FONDO_SOLIDARIDAD_PENSIONAL.get("limite inferior", 0) + \
                   (salario_bruto - limite_superior) * PORCENTAJE_APORTE_FONDO_SOLIDARIDAD_PENSIONAL.get("limite superior", 0)

    @staticmethod
    def calcular_nomina(empleado):
        # Validaciones
        if empleado.salario_base == 0.0:
            raise SalarioBaseInexistente()
        if empleado.salario_base < 0:
            raise SalarioBaseNegativoError()
        if empleado.salario_base < SALARIO_MINIMO_LEGAL_VIGENTE:
            raise SalarioBaseMenorMinimoError(empleado.salario_base, SALARIO_MINIMO_LEGAL_VIGENTE)

        total_horas_extra = sum(h.numero_de_horas for h in HoraExtra.objects.filter(empleado=empleado))
        if total_horas_extra > MAXIMO_HORAS_EXTRA_LEGALES_PERMITIDAS:
            raise LimiteHorasExtraError(total_horas_extra, 0)

        for hora_extra in HoraExtra.objects.filter(empleado=empleado):
            if hora_extra.numero_de_horas < 0:
                raise ValorHoraExtraNegativoError(hora_extra.numero_de_horas)
            if hora_extra.tipo_hora.nombre_tipo_hora not in FACTORES_HORA_EXTRA:
                raise TipoHoraExtraInvalidoError(hora_extra.tipo_hora.nombre_tipo_hora)

        salario_bruto = NominaService.calcular_salario_bruto(empleado)
        deducciones_legales = NominaService.calcular_deducciones_legales(empleado.salario_base)
        deducciones_prestamos = LoanService.calcular_deducciones_prestamos(empleado, salario_bruto - deducciones_legales)
        total_deducciones = deducciones_legales + deducciones_prestamos['total_deducciones']
        impuestos = NominaService.calcular_impuestos(salario_bruto)

        auxilio_transporte = AUXILIO_TRANSPORTE if empleado.salario_base <= 2 * SALARIO_MINIMO_LEGAL_VIGENTE else 0

        neto = salario_bruto + auxilio_transporte - total_deducciones - impuestos

        return {
            'salario_bruto': salario_bruto,
            'deducciones_legales': deducciones_legales,
            'deducciones_prestamos': deducciones_prestamos['total_deducciones'],
            'impuestos': impuestos,
            'auxilio_transporte': auxilio_transporte,
            'neto': neto,
            'detalles_prestamos': deducciones_prestamos['detalles']
        }

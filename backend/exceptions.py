from rest_framework.exceptions import ValidationError

class SalarioBaseInexistente(ValidationError):
    default_detail = "Ingrese su salario en el campo de salario base."
    default_code = 'salario_inexistente'

class SalarioBaseNegativoError(ValidationError):
    default_detail = "El Salario base del empleado no puede ser negativo (Art. 127 CST)"
    default_code = 'salario_negativo'

class LimiteHorasExtraError(ValidationError):
    def __init__(self, horas_extra, horas_extras_adicionales):
        total_horas = horas_extra + horas_extras_adicionales
        self.default_detail = f"El empleado ha ingresado un total de {total_horas} horas extra, superando el límite de 50 horas extra mensuales."
        self.default_code = 'limite_horas_extra'

class TipoHoraExtraInvalidoError(ValidationError):
    def __init__(self, tipo_hora_extra):
        self.default_detail = f"El tipo de hora extra '{tipo_hora_extra}' no es válido. Ingrese: (Diurnas, Nocturnas, Festivas)"
        self.default_code = 'tipo_hora_invalido'

class ValorHoraExtraNegativoError(ValidationError):
    def __init__(self, horas_extras):
        self.default_detail = f"El valor de horas extra '{horas_extras}' no puede ser negativo. Ingrese un valor entre 0-50"
        self.default_code = 'hora_extra_negativa'

class SalarioBaseMenorMinimoError(ValidationError):
    def __init__(self, salario_base, salario_minimo):
        self.default_detail = f"El salario base '{salario_base}' es menor que el salario mínimo legal vigente '{salario_minimo}' (Art. 145 CST)"
        self.default_code = 'salario_menor_minimo'

class CargoInvalidoError(ValidationError):
    def __init__(self, cargo_opcion):
        self.default_detail = f"El cargo '{cargo_opcion}' no es válido. Ingrese: 1: Empleado nuevo, 2: Empleado antiguo, 3: Administrador"
        self.default_code = 'cargo_invalido'

class PrestamoNegativoError(ValidationError):
    def __init__(self, prestamo):
        self.default_detail = f"El valor del préstamo no puede ser negativo. Ingrese un valor mayor o igual a 0. valor ingresado: {prestamo}"
        self.default_code = 'prestamo_negativo'

class CargoNoExistenteError(ValidationError):
    def __init__(self, cargo):
        self.default_detail = f"No existe un cargo con el nombre '{cargo}' en la base de datos"
        self.default_code = 'cargo_no_existente'

class TipoHoraExtraNoExistenteError(ValidationError):
    def __init__(self, tipo_hora):
        self.default_detail = f"No existe el tipo de hora extra '{tipo_hora}' en la base de datos"
        self.default_code = 'tipo_hora_no_existente'

class EmpleadoNoExistenteError(ValidationError):
    def __init__(self, cedula):
        self.default_detail = f"No existe un empleado con cédula '{cedula}' en la base de datos"
        self.default_code = 'empleado_no_existente'

class EmpleadoExistenteError(ValidationError):
    def __init__(self, cedula):
        self.default_detail = f"Ya existe un empleado con la cédula {cedula}. Use el botón 'Modificar Empleado' para actualizar sus datos."
        self.default_code = 'empleado_existente'

class CedulaInvalidaError(ValidationError):
    def __init__(self, cedula):
        self.default_detail = f"La cédula '{cedula}' contiene caracteres no válidos. La cédula debe contener únicamente números."
        self.default_code = 'cedula_invalida'

class CedulaMuyCortaError(CedulaInvalidaError):
    def __init__(self, cedula, longitud_minima=8):
        self.default_detail = f"La cédula '{cedula}' tiene {len(cedula)} dígitos. Debe tener mínimo {longitud_minima} dígitos."
        self.default_code = 'cedula_corta'

class CedulaMuyLargaError(CedulaInvalidaError):
    def __init__(self, cedula, longitud_maxima=10):
        self.default_detail = f"La cédula '{cedula}' tiene {len(cedula)} dígitos. Debe tener máximo {longitud_maxima} dígitos."
        self.default_code = 'cedula_larga'

class NombreInvalidoError(ValidationError):
    default_detail = "El nombre debe contener solo letras y espacios"
    default_code = 'nombre_invalido'

class ApellidoInvalidoError(ValidationError):
    default_detail = "El apellido debe contener solo letras y espacios"
    default_code = 'apellido_invalido'

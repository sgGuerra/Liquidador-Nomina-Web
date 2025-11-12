# apps/nomina/services.py

def calcular_neto(salario_bruto, deducciones, impuestos, auxilio_transporte):
    """
    Calcula el salario neto del empleado.
    """
    return salario_bruto - deducciones - impuestos + auxilio_transporte

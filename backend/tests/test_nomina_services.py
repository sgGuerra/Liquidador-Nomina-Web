import pytest
from apps.nomina.services import calcular_neto


def test_calculo_neto_basico():
    resultado = calcular_neto(2000000, 100000, 50000, 162000)
    assert resultado == 2012000


@pytest.mark.parametrize(
    "salario_bruto,deducciones,impuestos,auxilio,esperado",
    [
        (1500000, 50000, 40000, 162000, 1572000),
        (2500000, 200000, 100000, 162000, 2362000),
        (1800000, 0, 0, 162000, 1962000),
    ],
)
def test_calculo_neto_parametrizado(salario_bruto, deducciones, impuestos, auxilio, esperado):
    assert calcular_neto(salario_bruto, deducciones, impuestos, auxilio) == esperado

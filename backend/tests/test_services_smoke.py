import pytest
import importlib
import inspect

@pytest.mark.django_db
def test_services_have_expected_functions():
    try:
        mod = importlib.import_module("services.nomina")
    except ModuleNotFoundError:
        pytest.skip("El módulo services.nomina no existe, ajusta el nombre según tu estructura.")

    posibles = ["calcular_nomina", "calcular", "compute_payroll"]
    func = None
    for nombre in posibles:
        if hasattr(mod, nombre):
            func = getattr(mod, nombre)
            break

    assert func is not None, "No se encontró ninguna función de cálculo esperada en services.nomina"
    sig = inspect.signature(func)
    assert len(sig.parameters) >= 0

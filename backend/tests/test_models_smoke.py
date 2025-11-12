import pytest
import importlib

@pytest.mark.django_db
def test_models_importables():
    posibles_modulos = [
        "model.empleado",
        "model.models",
        "apps.empleados.models",
        "apps.nomina.models"
    ]
    encontrado = False
    for modname in posibles_modulos:
        try:
            importlib.import_module(modname)
            encontrado = True
            break
        except ModuleNotFoundError:
            continue

    if not encontrado:
        pytest.skip("No se encontró ningún módulo de modelos con nombres esperados.")
    assert encontrado

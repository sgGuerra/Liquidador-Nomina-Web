import pytest
from django.urls import reverse

@pytest.mark.django_db
def test_listar_nomina(client):
    url = reverse("nomina-list")  # ajusta si tu ruta se llama diferente
    response = client.get(url)
    assert response.status_code in (200, 302)

@pytest.mark.django_db
def test_crear_nomina(client):
    url = reverse("nomina-create")  # ajusta al nombre real en tus urls
    data = {
        "empleado": 1,
        "dias_trabajados": 30,
        "salario_devengado": 5000000,
        "deducciones": 500000,
        "salario_neto": 4500000,
    }
    response = client.post(url, data)
    assert response.status_code in (200, 201, 302)

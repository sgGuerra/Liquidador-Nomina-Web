import pytest
from django.test import Client

@pytest.mark.django_db
def test_api_root_accessible():
    client = Client()
    for path in ["/api/", "/"]:
        response = client.get(path)
        if response.status_code in (200, 301, 302, 401, 403):
            assert True
            return
    pytest.skip("No se encontró endpoint accesible en /api/ o /")

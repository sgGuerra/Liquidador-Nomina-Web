from rest_framework.routers import DefaultRouter
from .views import CargoViewSet

router = DefaultRouter()
router.register(r'cargos', CargoViewSet)

urlpatterns = router.urls

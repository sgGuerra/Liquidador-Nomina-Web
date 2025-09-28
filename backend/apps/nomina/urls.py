from rest_framework.routers import DefaultRouter
from .views import TipoHoraExtraViewSet, HoraExtraViewSet, HistorialNominaViewSet

router = DefaultRouter()
router.register(r'tipos-hora-extra', TipoHoraExtraViewSet)
router.register(r'horas-extra', HoraExtraViewSet)
router.register(r'historial-nomina', HistorialNominaViewSet)

urlpatterns = router.urls

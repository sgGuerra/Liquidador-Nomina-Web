from rest_framework.routers import DefaultRouter
from .views import PrestamoViewSet

router = DefaultRouter()
router.register(r'prestamos', PrestamoViewSet)

urlpatterns = router.urls

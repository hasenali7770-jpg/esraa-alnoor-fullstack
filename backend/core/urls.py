from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cms.views import PageViewSet, ActivationView

router = DefaultRouter()
router.register("pages", PageViewSet, basename="pages")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/activate/", ActivationView.as_view(), name="activate"),
]

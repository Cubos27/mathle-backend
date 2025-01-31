from django.urls import path
from rest_framework import routers
from . import api

router = routers.DefaultRouter()
# router.register('api/profesores', api.ProfesoresViewSet, 'Profesores')

urlpatterns = [
    path('api/login/', api.login),
    path('api/register/', api.register),
    path('api/profile/', api.profile),
    path('api/logout/', api.api_logout),
    path('api/get/articles/', api.get_all_articles),
]
urlpatterns += router.urls

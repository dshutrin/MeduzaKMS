from django.urls import path
from .views import *


urlpatterns = [
    path('', home),
    path('admin_panel', admin_panel)
]

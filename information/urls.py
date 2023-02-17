from django.urls import path

from information.views import *

app_name = 'information'

urlpatterns = [
    path('', index, name="index"),
]
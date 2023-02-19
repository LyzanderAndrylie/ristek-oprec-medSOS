from django.urls import path
from .views import *

app_name = 'authentication_feature'

urlpatterns = [
    path('register/', register_page, name="register_page"),
    path('register/ajax', register, name="register_ajax"),
]
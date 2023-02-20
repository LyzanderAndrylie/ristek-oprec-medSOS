from django.urls import path
from .views import *

app_name = 'authentication_feature'

urlpatterns = [
    path('register/', register_page, name="register_page"),
    path('register/ajax', register_ajax, name="register_ajax"),
    path('login/', login_page, name="login_page"),
    path('login/ajax', login_ajax, name="login_ajax"),
    path('logout/', logout_ajax, name="logout_ajax"),
    path('profile/<str:username>', profile_page, name='profile_page'),
]
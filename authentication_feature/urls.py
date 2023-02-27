from django.urls import path
from .views import *

app_name = 'authentication_feature'

urlpatterns = [
    path('register/', register_page, name="register_page"),
    path('register/ajax', register_ajax, name="register_ajax"),
    path('login/', login_page, name="login_page"),
    path('login/ajax', login_ajax, name="login_ajax"),
    path('logout/', logout_user, name="logout"),
    path('logout/ajax', logout_ajax, name="logout_ajax"),
    path('profile/<str:username>/', profile_page, name='profile_page'),
    path('profile/<str:username>/edit', edit_profile_page, name='edit_profile_page'),
    path('profile/<str:username>/update', update_profile_ajax, name='update_profile_ajax'),
    path('user-data/<int:pk>/', user_data, name='user_data'),
    path('add-close-friends/<int:pk>/', add_close_friends, name='add_close_friends'),
    path('remove-close-friends/<int:pk>/', remove_close_friends, name='remove_close_friends'),
    path('get-friends/<int:pk>/', get_friends, name='get_close_friend'),
]
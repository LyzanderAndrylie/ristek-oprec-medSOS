from django.urls import path
from .views import *

app_name = 'tweet_api'

urlpatterns = [
    path("", ApiOverview, name="api_overview"),
    path("create/", add_tweet, name="add_tweet"),
    path("all/", view_tweets, name="view_tweets"),
    path("edit/<int:pk>/", edit_tweet, name="edit_tweet"),
    path("delete/<int:pk>/", delete_tweet, name="delete_tweet")
]

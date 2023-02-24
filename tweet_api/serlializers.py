from django.db.models import fields
from rest_framework import serializers
from .models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ("id", "user", "content", "post_date", "last_modified_date", "modified", "is_public")

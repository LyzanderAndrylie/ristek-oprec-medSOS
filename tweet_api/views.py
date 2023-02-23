from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status

from .models import Tweet
from .serlializers import TweetSerializer

# Create your views here.
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'all_tweets': '/all',
        'Add': '/create',
        'Update': '/edit/pk',
        'Delete': '/delete/pk'
    }
 
    return Response(api_urls)

@api_view(['POST'])
def add_tweet(request):
    if str(request.user.pk) == request.data["user"]:
        tweet = TweetSerializer(data=request.data)
    
        # validating for already existing data
        if Tweet.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')
    
        if tweet.is_valid():
            tweet.save()
            return Response(tweet.data)

    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def view_tweets(request):
    # checking for the parameters from the URL
    if request.query_params:
        tweets = Tweet.objects.filter(**request.query_params.dict()).order_by('-post_date')
    else:
        tweets = Tweet.objects.all().order_by('-post_date')
    
    # if there is something in items else raise error
    if tweets:
        serializer = TweetSerializer(tweets, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def edit_tweet(request, pk):
    if request.user.pk == request.data["user"]:
        tweet = Tweet.objects.get(pk=pk)
        request.data["modified"] = True;
        data = TweetSerializer(instance=tweet, data=request.data)

        if data.is_valid():
            data.save()
            return Response(data.data)
    
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_tweet(request, pk):
    if request.user.pk == request.data["user"]:
        tweet = get_object_or_404(Tweet, pk=pk)
        tweet.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
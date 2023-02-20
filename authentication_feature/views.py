from django.http import JsonResponse
from django.shortcuts import render

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from authentication_feature.forms import UpdateProfileForm
from django.contrib.auth.models import User
# Create your views here.


def register_page(request):
    form = UserCreationForm()
    context = {'form': form}
    return render(request, 'register.html', context)


def register_ajax(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({
                "status": True,
                "message": "Register Success"
            }, status=200)
        else:
            return JsonResponse({
                "status": False,
                "message": form.errors.as_json()
            }, status=401)

    return JsonResponse({
        "status": False,
        "message": "Register Fail"
    }, status=401)


def login_page(request):
    return render(request, 'login.html')


def login_ajax(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({
                "status": True,
                "message": "Successfully Logged In!"
            }, status=200)
        else:
            return JsonResponse({
                "status": False,
                "message": "Failed to Login, Account Disabled."
            }, status=401)

    else:
        return JsonResponse({
            "status": False,
            "message": "Failed to Login, check your email/password."
        }, status=401)


def logout_ajax(request):
    logout(request)
    return JsonResponse({
        "status": True,
        "message": "Successfully Logout In!"
    }, status=200)

def profile_page(request, username):
    if User.objects.filter(username = username).exists():
        context = {"user": request.user}
        return render(request, "profile.html", context=context)
    else:
        return render(request, "not-found.html")

@login_required
def update_profile_ajax(request):
    if request.method == "POST":
        profile_form = UpdateProfileForm(
            request.POST, request.FILES, instance=request.user.profile)

        if profile_form.is_valid():
            profile_form.save()
            return JsonResponse({
                "status": True,
                "message": "Successfully Updated Profile!"
            }, status=200)
        else:
            return JsonResponse({
                "status": False,
                "message": profile_form.errors.as_json
            }, status=401)

    return JsonResponse({
        "status": False,
        "message": "Failed to Update Profile."
    }, status=401)


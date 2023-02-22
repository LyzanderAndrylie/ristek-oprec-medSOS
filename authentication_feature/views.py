from django.http import JsonResponse
from django.shortcuts import redirect, render

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.urls import reverse

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


def logout_user(request):
    logout(request)
    return redirect('information:index')


def logout_ajax(request):
    logout(request)
    return JsonResponse({
        "status": True,
        "message": "Successfully Logout In!"
    }, status=200)


def profile_page(request, username):
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        context = {"profile_user": user}

        if username == request.user.username:
            context["active_user"] = request.user

        return render(request, "profile.html", context=context)
    else:
        return render(request, "not-found.html")


@login_required
def edit_profile_page(request, username):
    if request.user.username == username:
        updateProfileForm = UpdateProfileForm()
        context = {"active_user": request.user,
                   "update_profile_form": updateProfileForm}
        return render(request, "edit-profile.html", context)
    else:
        return render(request, "not-found.html")


@login_required
def update_profile_ajax(request, username):
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


def user_data(request, pk):
    if User.objects.filter(pk=pk).exists():
        user = User.objects.get(pk=pk)
        user_data = {"username": user.username,
                     "avatar_path": user.profile.avatar.url,
                     "profile_path":reverse("authentication_feature:profile_page", args=(user.username,))}
        return JsonResponse(user_data, status=200)

    else:
        return JsonResponse({
            "status": False,
            "message": "User doesn't exist."
        }, status=401)

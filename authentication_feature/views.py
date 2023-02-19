from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def register_page(request):
    form = UserCreationForm()
    context = {'form': form}
    return render(request, 'register.html', context)

def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({
                "status": True,
                "message": "Register berhasil"
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

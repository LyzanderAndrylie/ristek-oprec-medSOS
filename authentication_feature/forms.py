from django import forms

from django.contrib.auth.models import User
from .models import Profile


class UpdateProfileForm(forms.ModelForm):
    avatar = forms.ImageField(widget=forms.FileInput(
        attrs={'class': 'w-[240px]'}))
    bio = forms.CharField(widget=forms.Textarea(
        attrs={'class': 'bg-primary-color text-white border-cyan-200 rounded p-2', 'rows': 5, 'cols':25}))

    class Meta:
        model = Profile
        fields = ['avatar', 'bio']

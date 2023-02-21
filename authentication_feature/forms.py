from django import forms

from django.contrib.auth.models import User
from .models import Profile


class UpdateProfileForm(forms.ModelForm):
    avatar = forms.ImageField(widget=forms.FileInput(
        attrs={'class': ''}))
    bio = forms.CharField(widget=forms.Textarea(
        attrs={'class': 'text-black', 'rows': 5}))

    class Meta:
        model = Profile
        fields = ['avatar', 'bio']

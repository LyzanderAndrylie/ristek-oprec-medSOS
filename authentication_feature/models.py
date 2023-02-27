from django.db import models
from django.contrib.auth.models import User
from PIL import Image

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(
        default='default.jpg', upload_to='profile_images')
    bio = models.TextField()
    close_friends = models.ManyToManyField(User, related_name="close_friends")

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        self.close_friends.add(self.user)
        super().save()

        img = Image.open(self.avatar.path)

        if img.height > 100 or img.width > 100:
            new_img = (100, 100)
            img.thumbnail(new_img)
            img.save(self.avatar.path)

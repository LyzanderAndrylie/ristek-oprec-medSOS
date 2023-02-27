from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_date = models.DateTimeField(auto_now_add=True)
    last_modified_date = models.DateTimeField(auto_now=True)
    content = models.CharField(max_length=300)
    is_public = models.BooleanField(default=True)

    class Meta:
        ordering = ["-post_date"]

    def __str__(self) -> str:
        return f"{self.user.username}: {self.content}"

    @property
    def modified(self):
        return self.post_date != self.last_modified_date

from django.db import models
from django.contrib.auth.models import User

class FileParsed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=300000)
    content = models.CharField(max_length=300000)
    input_csv = models.CharField(max_length=300000)
    target_csv = models.CharField(max_length=300000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
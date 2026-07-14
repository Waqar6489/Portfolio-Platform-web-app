from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100, blank=True)
    user_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    linkedin_profile = models.URLField(max_length=200, blank=True)
    github_profile = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.user.username
    

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    project_image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    description = models.TextField()
    project_link=models.URLField(max_length=200, blank=True)
    technologies_used = models.CharField(max_length=200, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title    

# Create your models here.


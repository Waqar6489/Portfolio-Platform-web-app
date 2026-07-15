from .models import UserProfile,Project
from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        UserProfile.objects.create(user=user)
        return user 


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'full_name', 'user_image', 'bio', 'location', 'birth_date', 'linkedin_profile', 'github_profile']                      


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__' 
        read_only_fields = ['user']
        
         
#  make serializer for home page
class HomepageUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class HomepageUserProfile(serializers.ModelSerializer):
    user= HomepageUserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ['user', 'full_name','user_image']

class HomepageSerializer(serializers.ModelSerializer):
    user_detail= HomepageUserProfile(source='user.userprofile',read_only=True)
    class Meta:
        model = Project
        fields = ['user_detail','title','project_image','short_description','project_link','technologies_used']


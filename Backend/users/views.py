from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework import generics
from .models import Project,UserProfile
from .serializers import RegistrationSerializer, ProjectSerializer, UserProfileSerializer, UserSerializer,HomepageSerializer
 

# view all project in home page
@api_view(['GET'])
@permission_classes([AllowAny])
def project_view(request):
    projects = Project.objects.all().order_by('-id')
    serializer = HomepageSerializer(projects, many=True)
    return Response(serializer.data)


# view all project for profile owner on dashborad
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def My_project(request):
    project= Project.objects.filter(user=request.user).order_by('-id')
    serializer= ProjectSerializer(project, many=True)
    return Response(serializer.data)


# only authorized user create your project
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_create(request):
    serializer= ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({'message': 'project are successfully created','data': serializer.data }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# only profile owner update and delete project 
class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
    
class ProjectUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset= Project.objects.all()
    serializer_class= ProjectSerializer
    permission_classes= [IsAuthenticated, IsOwner]


# only profile owner update your profile
class ProfileUpdate(generics.RetrieveUpdateAPIView):
    serializer_class= UserProfileSerializer 
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.userprofile


# all user are allow to register 
@api_view(['POST'])
@permission_classes([AllowAny])
def Resgistration(request):
    serializer= RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user_serializer= serializer.save()
        return Response({'message': 'user successfully created', 'user': UserSerializer(user_serializer).data}, status=status.HTTP_201_CREATED)  
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views



urlpatterns = [
    path('project_view/', views.project_view, name='project_views'),
    path('myproject/',views.My_project, name="view_my_project"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('project_create/', views.project_create, name='project_create'),
    path('register/', views.Resgistration, name='register'),
    path('project/<int:pk>',views.ProjectUpdateDelete.as_view()),
    path('profile/', views.ProfileUpdate.as_view(), name='profile'), 
]
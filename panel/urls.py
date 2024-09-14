from django.contrib import admin
from django.urls import path
from . import views
from django.contrib.auth.views import LoginView,LogoutView
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurViewSet

router = DefaultRouter()
router.register(r'utilisateurs', UtilisateurViewSet)

urlpatterns = [
    
    path('',views.home_view,name='home'),
    path('dashabord/',views.dashabord,name='dashabord'),
    path('register',views.register,name='register'),
    path('login/',views.login_view,name='login'),
    path('users',views.users,name='users'),
    path('etudiants',views.etudiants,name='etudiants'),
    path('enseignants',views.enseignants,name='enseignants'),
    path('modules',views.modules,name='modules'),
    path('specialite',views.specialite,name='specialite'),
    path('logout',views.logout_view,name='logout'),
    path('api/', include(router.urls)),  # Inclure les routes de l'API
    ]
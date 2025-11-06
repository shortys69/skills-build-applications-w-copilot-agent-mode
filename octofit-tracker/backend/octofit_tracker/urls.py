"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet, api_root

# Get Codespace URL
CODESPACE_NAME = os.environ.get('CODESPACE_NAME', '')
if CODESPACE_NAME:
    API_URL = f"https://{CODESPACE_NAME}-8000.app.github.dev/api"
else:
    API_URL = "http://localhost:8000/api"

# Configure router with proper schema URL
router = routers.DefaultRouter(root_renderers=['rest_framework.renderers.JSONRenderer'])
router.scheme = 'https' if CODESPACE_NAME else 'http'

# Set the router's base URL
router.root_view_name = 'api-root'
router.urls[0].pattern._route = f"{API_URL}/"

# Register viewsets
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboard', LeaderboardViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api_root'),
]

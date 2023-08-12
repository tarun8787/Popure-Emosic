"""popure_emosic URL Configuration

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
from django.contrib import admin
from django.urls import path
from user_authentication import views


urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('main/', views.main, name='main'),
    path('emoji_generator/', views.emoji_generator, name='emoji_generator'),
    path('emotion_by_face/', views.emotion_by_face, name='emotion_by_face'),
    path('podcast/', views.podcast, name='podcast'),
    path('execute-script/', views.emotion_detection, name='run_emotion_detection'),
    path('result/', views.result, name='result'),
    path('forgot/', views.forgot, name='forgot'),
    path('voice_recognition/', views.voice_recog, name='voice_recog'),
    path('execute-voice-script/', views.voice, name='run_voice_detection'),
    path('search/', views.search, name='search'),
    path('about_us/', views.about, name='about'),
    path('logout/', views.logout, name='logout'),

]

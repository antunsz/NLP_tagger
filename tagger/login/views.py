from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse

def login_view(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('core:home'))
    else:
        if request.method == 'POST':
            return _login_method(request)
        else:
            return render(request, 'login.html')
        
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('login:login'))
   
def _login_method(request):
    print('re:', request)
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse('core:home'))
    else:
        return render(request, 'login.html')
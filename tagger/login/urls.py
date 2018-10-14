from django.conf.urls import url
from .views import login_view, logout_view

app_name='login'

urlpatterns = [
    url(r'^logout$', logout_view, name="logout"),
    url(r'^$', login_view, name="login")
]
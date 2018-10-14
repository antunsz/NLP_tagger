from django.conf.urls import url
from .views import *

app_name='core'

urlpatterns = [
    url(r'^$', home, name="home"),
    url(r'^upload', upload, name="upload"),
    url(r'^update_input', update_input, name="update_input"),
    url(r'^update_output', update_output, name="update_output")
]
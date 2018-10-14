from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from tagger.core.models import FileParsed
import os


def home(request):
    if request.user.is_authenticated:
        context = {
            'principal':'active',
            'page_name':'Principal'
        }
        return render(request, 'home.html', context)
    else:
        return HttpResponseRedirect(reverse('login:login'))
        
@csrf_exempt
def upload(request):
    file = request.FILES.get('files', None)
    filename = file.name
    with default_storage.open(os.path.join(os.path.dirname(__file__), 'static/uploads/', filename), 'wb+') as destination:
        content = ''
        for chunk in file.chunks():
            destination.write(chunk)
            content += chunk.decode('utf-8')
    file = FileParsed()
    file.user = request.user
    file.file_name = str(file)
    file.content = content
    try:
        file.save()
    except Exception as e:
        return JsonResponse({'error':str(e)})
        
    return JsonResponse({'id':file.id,'content':clean_text(content)})

@csrf_exempt    
def update_input(request):
    if request.method == 'POST':
        file_pk = request.POST.get('pk', None)
        input_csv = request.POST.get('csv', None)
        if file_pk:
            file = FileParsed.objects.get(pk=file_pk)
            file.input_csv = input_csv
            try:
                file.save()
            except Exception as e:
                print(str(e))
            return JsonResponse({'status':True, 'message':'Foi'})
        else:
            return JsonResponse({'status':False, 'message':'Error'})
    else:
        return JsonResponse({'status':False, 'message':'Foi get'})

@csrf_exempt    
def update_output(request):
    if request.method == 'POST':
        file_pk = request.POST.get('pk', None)
        output_csv = request.POST.get('csv', None)
        if file_pk:
            file = FileParsed.objects.get(pk=file_pk)
            file.target_csv = output_csv
            try:
                file.save()
            except Exception as e:
                print(str(e))
            return JsonResponse({'status':True, 'message':'Foi'})
        else:
            return JsonResponse({'status':False, 'message':'Error'})
    else:
        return JsonResponse({'status':False, 'message':'Foi get'})

def clean_text(text):
    t = ''.join(c for c in text.split())
    return ' '.join(c for c in t)
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from constance import config
from .models import *


# Create your views here.
def home(request):

	questions = FastQuestion.objects.all()
	active_quests = Quest.objects.filter(is_active=True)

	return render(request, 'home.html', {
		'questions': questions,
		'quests': active_quests
	})


@login_required(login_url='/login')
def admin_panel(request):
	if request.user.is_superuser:

		questions = FastQuestion.objects.all()
		active_quests = Quest.objects.filter(is_active=True)

		return render(request, 'admin_panel/home.html', {
			'questions': questions,
			'quests': active_quests
		})

	return HttpResponse(status=404)


def login_view(request):


	if request.method == 'GET':
		return render(request, 'login.html')
	elif request.method == 'POST':
		username = request.POST['login']
		password = request.POST['password']

		usr = authenticate(request, username=username, password=password)
		if usr is not None:

			login(request, usr)
			return HttpResponseRedirect('/admin_panel')

		else:
			return render(request, 'login.html', {
				'error': 'Ошибка входа. Проверьте правильность введённых данных!'
			})

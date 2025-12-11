import json

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from constance import config
from django.views.decorators.csrf import csrf_exempt

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


@login_required
@csrf_exempt
def update_config(request):
	if request.method == 'POST':
		data = json.loads(request.body)

		try:
			config.EMAIL = data['email']
			config.REVIEWS_LINK = data['reviews_link']
			config.PHONE_NUMBER = data['phone']
			config.MAX_LINK = data['social_link']
			config.ADDRESS = data['address']
			config.WORK_HOURS = data['work_hours']
			config.DESCRIPTION = data['description']
			config.PRAVILA = data['roles']
			config.USLOVIYA = data['reserv_roles']
			config.ARENDA = data['arenda']
		except Exception as e:
			return JsonResponse({'success': False}, status=500)

		return JsonResponse({'success': True}, status=200)

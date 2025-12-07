from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
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


@login_required(login_url='/admin_login')
def admin_panel(request):
	if request.user.is_superuser:

		questions = FastQuestion.objects.all()
		active_quests = Quest.objects.filter(is_active=True)

		return render(request, 'admin_panel/home.html', {
			'questions': questions,
			'quests': active_quests
		})

	return HttpResponse(status=404)

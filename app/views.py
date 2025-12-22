import json
import os
import uuid

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from constance import config
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

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
		active_quests = Quest.objects.filter()

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
			config.PHONE_NUMBER = data['phone']
			config.MAX_LINK = data['max_link']
			config.WA_LINK = data['wa_link']
			config.ADDRESS = data['address']
			config.WORK_HOURS = data['work_hours']

			config.DESCRIPTION = data['description']
			config.PRAVILA = data['roles']
			config.USLOVIYA = data['reserv_roles']
			config.ARENDA = data['arenda']

		except Exception as e:
			return JsonResponse({'success': False}, status=500)

		return JsonResponse({'success': True}, status=200)


@login_required
@csrf_exempt
def get_question(request, q_id):
	question = FastQuestion.objects.get(id=q_id)

	return JsonResponse({
		'question': question.question,
		'answer': question.answer
	}, status=200)


@login_required
@csrf_exempt
def get_quest(request, q_id):
	quest = Quest.objects.get(id=q_id)

	pp = None
	if quest.image:
		pp = quest.image.path

	return JsonResponse({
		'title': quest.title,
		'desc': quest.desc,
		'subdesc': quest.subdesc,
		'is_active': quest.is_active,
		'photo': pp
	}, status=200)


@login_required
@csrf_exempt
def rm_question(request):
	data = json.loads(request.body)

	question = FastQuestion.objects.filter(id=int(data['q_id']))
	if question.exists():
		question.delete()
		return JsonResponse({}, status=200)
	else:
		return JsonResponse({}, status=404)


@login_required
@csrf_exempt
def edit_question(request):
	data = json.loads(request.body)

	question = FastQuestion.objects.filter(id=int(data['q_id']))
	if question.exists():
		question = question.first()

		question.question = data['question']
		question.answer = data['answer']
		question.save()

		return JsonResponse({}, status=200)
	else:
		return JsonResponse({}, status=404)


@login_required
@csrf_exempt
def add_question(request):
	data = json.loads(request.body)

	try:
		FastQuestion.objects.create(
			question=data['question'],
			answer=data['answer']
		)

		return JsonResponse({}, status=200)
	except Exception as e:
		return JsonResponse({}, status=500)


@login_required
@csrf_exempt
def rm_quest(request):
	data = json.loads(request.body)

	quest = Quest.objects.filter(id=int(data['q_id']))
	if quest.exists():
		quest.delete()
		return JsonResponse({}, status=200)
	else:
		return JsonResponse({}, status=404)


# Альтернативный вариант без использования форм (если не хотите использовать Django формы)
@csrf_exempt
@require_http_methods(["POST"])
def edit_quest(request):
	"""Обновление данных квеста (простой вариант без форм)"""
	try:
		quest_id = request.POST.get('quest_id')
		if not quest_id:
			return JsonResponse({
				'success': False,
				'error': 'ID квеста не указан'
			}, status=400)

		quest = get_object_or_404(Quest, id=quest_id)

		# Обновляем поля
		if 'description' in request.POST:
			quest.desc = request.POST.get('description', '')

		if 'additional_description' in request.POST:
			quest.subdesc = request.POST.get('additional_description', '')

		if 'title' in request.POST:
			if request.POST.get('title', ''):
				quest.title = request.POST.get('title', '')

		if 'is_active' in request.POST:
			quest.is_active = request.POST.get('is_active', 'true').lower() == 'true'

		# Обработка загрузки изображения
		if 'image' in request.FILES:
			image_file = request.FILES['image']

			# Валидация типа файла
			allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
			file_ext = os.path.splitext(image_file.name)[1].lower()

			if file_ext not in allowed_extensions:
				return JsonResponse({
					'success': False,
					'error': f'Недопустимый формат файла. Разрешены: {", ".join(allowed_extensions)}'
				}, status=400)

			# Генерируем уникальное имя файла
			file_name = f"quest_{quest_id}_{uuid.uuid4().hex[:8]}{file_ext}"

			# Сохраняем файл
			file_path = default_storage.save(f'quests/{file_name}', ContentFile(image_file.read()))

			# Удаляем старое изображение, если оно есть
			if quest.image:
				old_image_path = quest.image.path
				if default_storage.exists(old_image_path):
					default_storage.delete(old_image_path)

			# Сохраняем новый путь
			quest.image = file_path

		# Сохраняем изменения
		quest.save()

		# Формируем ответ
		response_data = {
			'success': True,
			'message': 'Квест успешно обновлен',
			'quest_id': quest.id,
		}

		# Добавляем URL изображения, если оно есть
		if quest.image:
			response_data['image_url'] = quest.image.url

		return JsonResponse(response_data)

	except Quest.DoesNotExist:
		return JsonResponse({
			'success': False,
			'error': 'Квест не найден'
		}, status=404)

	except Exception as e:
		return JsonResponse({
			'success': False,
			'error': 'Ошибка при обновлении квеста'
		}, status=500)

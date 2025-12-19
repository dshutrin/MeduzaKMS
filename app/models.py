from django.core.exceptions import ValidationError
from django.db.models import *


# Create your models here.
class FastQuestion(Model):
	question = CharField(max_length=255, verbose_name='Вопрос', null=False)
	answer = TextField(verbose_name='Ответ', null=False)

	class Meta:
		verbose_name = 'Быстрый вопрос'
		verbose_name_plural= 'Быстрые вопросы'


class Quest(Model):
	title = CharField(verbose_name='Название квеста', max_length=255)
	desc = TextField(verbose_name='Описание', null=True, default=None)
	subdesc = TextField(verbose_name='Доп. описание', null=True, default=None)
	image = ImageField(verbose_name='Фото', upload_to='quest_images')
	price = DecimalField(verbose_name='Стоимость', max_digits=9, decimal_places=2)
	is_active = BooleanField(verbose_name='Активен', default=False)

	class Meta:
		verbose_name = 'Квест'
		verbose_name_plural = 'Квесты'

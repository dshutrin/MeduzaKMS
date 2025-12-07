from django.contrib import admin
from .models import *


# Register your models here.
@admin.register(FastQuestion)
class AdminFastQuestion(admin.ModelAdmin):
	list_display = 'question',


@admin.register(Quest)
class QuestAdmin(admin.ModelAdmin):
	list_display = 'title',

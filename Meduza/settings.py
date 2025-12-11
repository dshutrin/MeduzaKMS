import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-ts6o103wi4z-la4frj=f-2@9iy#5ayr$xbdtn+ji95fxe7iy+j'
DEBUG = True
ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'app.apps.AppConfig',
	'constance',
    'constance.backends.database'
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Meduza.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [BASE_DIR / 'templates', BASE_DIR / 'media'],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
				'app.context_processors.constance_settings',
			],
		},
	},
]

WSGI_APPLICATION = 'Meduza.wsgi.application'

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': BASE_DIR / 'db.sqlite3',
	}
}

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]


LOGIN_URL = '/login'
LANGUAGE_CODE = 'ru'
TIME_ZONE = 'Asia/Vladivostok'
APPEND_SLASH = False
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
if not DEBUG:
	STATIC_ROOT = os.path.join(BASE_DIR, 'static')
else:
	STATICFILES_DIRS = [
		os.path.join(BASE_DIR, 'static/')
	]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

CONSTANCE_BACKEND = 'constance.backends.database.DatabaseBackend'

CONSTANCE_CONFIG = {
    'REVIEWS_LINK': ('https://yandex.ru/maps/', 'Ссылка на отзывы', str),
    'PHONE_NUMBER': ('+7 (999) 123-45-67', 'Телефон для связи', str),
    'MAX_LINK': ('https://wa.me/79991234567', 'Ссылка на MAX', str),
    'EMAIL': ('info@mysite.com', 'Email адрес', str),
    'ADDRESS': ('г. Москва, ул. Примерная, 1', 'Адрес', str),
    'WORK_HOURS': ('Пн-Пт: 9:00-18:00', 'Часы работы', str),
	'DESCRIPTION': ('Описание', 'Описание', str),
	'PRAVILA': ('Наши правила', 'Правила', str),
	'USLOVIYA': ('Наши условия бронирования', 'Условия бронирования', str),
	'ARENDA': ('Аренда комнаты под угощения', 'Аренда', str)
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

from django.urls import path
from .views import *


urlpatterns = [
    path('', home),
    path('admin_panel', admin_panel),
    path('login', login_view),
    path('update_config', update_config),

    # api

    # get
    path('api/get_question/<int:q_id>', get_question),
    path('api/get_quest/<int:q_id>', get_quest),

    # rm
    path('api/rm_question', rm_question),
    path('api/rm_quest', rm_quest),

    # edit
    path('api/edit_question', edit_question),
    path('api/edit_quest', edit_quest),

    # add
    path('api/add_question', add_question),
    path('api/add_quest', add_quest)
]

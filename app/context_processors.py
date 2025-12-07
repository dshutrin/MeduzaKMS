from constance import config

def constance_settings(request):
    return {
        'config': config
    }

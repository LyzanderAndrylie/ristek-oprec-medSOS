from django.apps import AppConfig


class AuthenticationFeatureConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication_feature'

    # add this
    def ready(self):
        import authentication_feature.signals
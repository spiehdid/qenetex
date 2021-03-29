from pydantic import BaseSettings

from dotenv import load_dotenv

# Find and load environment variables from the '.env' file.
from api.utils import env_variable

load_dotenv(verbose=True)


class BaseConfig(BaseSettings):
    RESTPLUS_VALIDATE = True
    SWAGGER_UI_REQUEST_DURATION = True
    SWAGGER_UI_OPERATION_ID = True
    APP_PORT = int(env_variable('APP_PORT'))


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SHOW_SWAGGER = True
    FORCE_SWAGGER_JSON_HTTP = True


class ServerConfig(BaseConfig):
    # TODO
    # def __init__(self):
    # self.SENTRY_ENVIRONMENT = env_variable('ENV')
    #
    # self.CUSTOMER_API_SENTRY_DSN = env_variable("API_SENTRY_DSN")
    pass


class TestingConfig(ServerConfig):
    DEBUG = True
    SHOW_SWAGGER = True
    TESTING = True


class ProductionConfig(ServerConfig):
    PROXY_FIX = True


config_name = env_variable('ENV')

if config_name == 'DEV':
    settings = DevelopmentConfig()
elif config_name == 'TEST':
    settings = TestingConfig()
elif config_name == 'PROD':
    settings = ProductionConfig()
else:
    raise NotImplementedError

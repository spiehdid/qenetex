import os

from api.errors import ImproperlyConfigured


def env_variable(var_name, allow_none=False, default=None):
    try:
        return os.environ[var_name]
    except KeyError:

        if default is not None:
            return default

        if allow_none is False:
            err_msg = f"Set the {var_name} environment variable"
            raise ImproperlyConfigured(err_msg)

        return None

import os
import logging

from api.config import env_variable


def register_logger():
    log_formatter = logging.Formatter('[%(asctime)s] - '
                                      '[%(pathname)s::%(lineno)d] - '
                                      '[%(levelname)s] - '
                                      '%(message)s',
                                      datefmt='%Y-%m-%d %H:%M:%S')

    logging.getLogger('gunicorn.access').setLevel(logging.ERROR)
    logging.getLogger('socketio').setLevel(logging.ERROR)
    logging.getLogger('engineio').setLevel(logging.ERROR)

    root_logger = logging.getLogger()

    root_logger.setLevel(logging.INFO)

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(log_formatter)
    root_logger.addHandler(console_handler)

    # if env_variable("ENV", default="PROD") == "DEV":
    #     file_handler = logging.FileHandler(f"{os.getcwd()}/logs.log")
    #     file_handler.setFormatter(log_formatter)
    #     root_logger.addHandler(file_handler)

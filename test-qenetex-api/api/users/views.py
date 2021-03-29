import logging

from api.users.helpers import get_addresses, create_user


class GetAddressesView:
    def __call__(self):
        try:
            addresses = get_addresses()
            logging.info(
                f"User got {len(addresses)} addresses")
            return addresses

        except Exception as e:
            logging.error(f"Server error occurred [{e}]")
            return {"message": 'Error server'}, 500


class CreateUserView:
    def __call__(self):
        try:
            new_user = create_user()
            logging.info(
                f"Created new user with id {new_user.id}")
            return "Created"

        except Exception as e:
            logging.error(f"Server error occurred [{e}]")
            return {"message": 'Error server'}, 500

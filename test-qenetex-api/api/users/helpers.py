import random
import string

from api.extensions import db
from db.models import User, Transaction

from db.utils import session_scope


def get_addresses():
    users = db \
        .query(User.address) \
        .all()

    return [{"address": user.address,
             "incoming_transactions": db.query(Transaction).filter(Transaction.address_to == user.address).count(),
             "outgoing_transactions": db.query(Transaction).filter(Transaction.address_from == user.address).count()}
            for
            user in users]


def create_user():
    with session_scope() as session:
        address = "".join([random.choice(string.hexdigits) for x in range(16)])
        new_user = User(address=address)
        session.add(new_user)
        return new_user

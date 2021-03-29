from typing import Optional
import random

from sqlalchemy import or_

from api.extensions import db
from db.models import Transaction, User
from db.utils import session_scope


def get_transactions(address: Optional[str]):
    filters = ()

    if address:
        filters += (or_(Transaction.address_from == address, Transaction.address_to == address),)

    transactions = db \
        .query(Transaction.id, Transaction.address_from, Transaction.address_to, Transaction.date, Transaction.amount) \
        .filter(*filters) \
        .all()

    return [{"id": transaction.id, "address_from": transaction.address_from, "address_to": transaction.address_to,
             "date": transaction.date, "amount": transaction.amount} for
            transaction in transactions]


def create_transaction(address: Optional[str]):
    with session_scope() as session:
        address_from = address
        query = session.query(User)
        row_count = int(query.count())
        if not address_from:
            random_user = query.offset(int(row_count * random.random())).first()
            address_from = random_user.address
        random_user = query.offset(int(row_count * random.random())).first()
        address_to = random_user.address
        amount = random.uniform(0.01, 10000)

        new_transaction = Transaction(address_from=address_from, address_to=address_to, amount=amount)
        session.add(new_transaction)
        return new_transaction

import logging
from typing import Optional

from api.transactions.helpers import get_transactions, create_transaction


class GetTransactionsView:
    def __init__(self, address: Optional[str]):
        self.address = address

    def __call__(self):
        try:
            transactions = get_transactions(self.address)
            logging.info(
                f"User got {len(transactions)} transactions")
            return transactions

        except Exception as e:
            logging.error(f"Server error occurred [{e}]")
            return {"message": 'Error server'}, 500


class CreateTransactionsView:
    def __init__(self, address: Optional[str]):
        self.address = address

    def __call__(self):
        try:
            transaction = create_transaction(self.address)
            logging.info(
                f"Created new transaction with id {transaction.id}")
            return "Created"
        except Exception as e:
            logging.error(f"Server error occurred [{e}]")
            return {"message": 'Error server'}, 500

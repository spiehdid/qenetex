from pydantic import BaseModel
from datetime import datetime


class Transaction(BaseModel):
    id: int
    address_from: str
    address_to: str
    date: datetime
    amount: int


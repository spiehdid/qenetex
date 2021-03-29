from pydantic import BaseModel


class Address(BaseModel):
    address: str
    incoming_transactions: int
    outgoing_transactions: int


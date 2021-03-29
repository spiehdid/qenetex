from typing import List, Optional

from fastapi import APIRouter

from api.transactions.schemas import Transaction
from api.transactions.views import GetTransactionsView, CreateTransactionsView

router = APIRouter()


@router.get("/", response_model=List[Transaction])
def get_transactions(address: Optional[str] = None):
    view = GetTransactionsView(address)
    return view()


@router.post("/create")
def create_transaction(address: Optional[str] = None):
    view = CreateTransactionsView(address)
    return view()

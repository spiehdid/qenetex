from typing import List

from fastapi import APIRouter

from api.users.schemas import Address
from api.users.views import GetAddressesView, CreateUserView

router = APIRouter()


@router.get("/addresses", response_model=List[Address])
def get_addresses():
    view = GetAddressesView()
    return view()


@router.post("/create")
def create_user():
    view = CreateUserView()
    return view()

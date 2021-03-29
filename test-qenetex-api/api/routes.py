from fastapi import APIRouter

from api.users.router import router as users_router
from api.transactions.router import router as transactions_router

api_router = APIRouter()

api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(transactions_router, prefix="/transactions", tags=["transactions"])


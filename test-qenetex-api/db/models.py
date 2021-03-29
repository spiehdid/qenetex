import datetime

from sqlalchemy import Column, Integer, String, DateTime

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    address = Column(String(16), nullable=False)


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    address_from = Column(String(16), nullable=False)
    address_to = Column(String(16), nullable=False)
    date = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)
    amount = Column(Integer, nullable=False)

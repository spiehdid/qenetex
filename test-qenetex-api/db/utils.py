from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from api.utils import env_variable


def _create_alchemy_sessionmaker(postgres_url: str) -> sessionmaker:
    engine = create_engine(postgres_url, pool_size=200)
    return sessionmaker(bind=engine, expire_on_commit=False)


@contextmanager
def session_scope():
    session = create_session()

    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def create_session() -> Session:
    session = _create_alchemy_sessionmaker(env_variable('DATABASE_URL'))()
    return session

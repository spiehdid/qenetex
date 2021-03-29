from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import settings
from api.extensions import db
from api.logger import register_logger
from api.routes import api_router


def create_app():
    register_logger()

    app = FastAPI(
        title='test_api',
        docs_url="/", redoc_url='/redoc_url'
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

    app.include_router(api_router)

    return app


app = create_app()


def register_errorhandlers(app):
    def shutdown_session(exception=None):
        db.session.remove()


@app.middleware("http")
async def manage_db(request: any, call_next):
    try:
        response = await call_next(request)
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

    return response


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=settings.APP_PORT)

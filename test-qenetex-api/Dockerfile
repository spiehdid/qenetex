# Pull base image
FROM python:3.9

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/
COPY poetry.lock pyproject.toml /app/

# Install dependencies
RUN apt-get update -qy
RUN apt-get install -y gcc git libpq-dev
RUN pip install poetry
  # ...
RUN pwd
RUN poetry install

COPY . /app/

EXPOSE 8000
FROM python:3.10

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y postgresql postgresql-contrib gcc python3-dev musl-dev

COPY . . 

EXPOSE 80
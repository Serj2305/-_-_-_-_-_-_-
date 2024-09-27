FROM python:3.10

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN rm db.sqlite3; exit 0

COPY . . 

EXPOSE 80
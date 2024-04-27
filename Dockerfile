FROM python:3.11
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip intall --upgrade pip && pip install -r requirementx.txt
ADD . /code/
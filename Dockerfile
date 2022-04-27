FROM python:3.8-slim-buster

WORKDIR /app

COPY config config
COPY logs logs
COPY static static
COPY templates templates
COPY loggy.py loggy.py
COPY requirements requirements
COPY start.sh start.sh
RUN pip3 install -r requirements

CMD sh start.sh
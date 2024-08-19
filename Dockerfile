FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_ENV=production
ENV DATABASE_URL=postgresql://user:password@db:5432/zuri-trends

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "server.app:create_app()"]

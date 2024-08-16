import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///default.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = '90a09368e4cd6ebb31edcb00562d0785'

from flask import Flask
from .extensions import db, migrate
from .routes import register_blueprints

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('app.config.Config')
    app.config.from_pyfile('config.py')

    db.init_app(app)
    migrate.init_app(app, db)

    register_blueprints(app)

    return app

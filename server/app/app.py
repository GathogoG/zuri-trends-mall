from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class='server.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    migrate.init_app(app, db)

    from server.app.routes import catalog_bp, product_bp, user_bp, review_bp, wishlist_bp, cart_bp, payment_bp
    app.register_blueprint(catalog_bp, url_prefix='/catalog')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(review_bp, url_prefix='/review')
    app.register_blueprint(wishlist_bp, url_prefix='/wishlist')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(payment_bp, url_prefix='/payment')
    
    @app.before_first_request
    def create_tables():
        with app.app_context():
            db.create_all()
    
    return app

app = create_app()

manager = Manager(app)
migrate.init_app(app, db)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

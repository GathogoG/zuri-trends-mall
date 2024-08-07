from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import click

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class='server.app.config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    from server.app.routes.catalog import catalog_bp
    from server.app.routes.product import product_bp
    from server.app.routes.user import user_bp
    from server.app.routes.review import review_bp
    from server.app.routes.wishlist import wishlist_bp
    from server.app.routes.cart import cart_bp
    from server.app.routes.payment import payment_bp

    app.register_blueprint(catalog_bp, url_prefix='/catalog')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(review_bp, url_prefix='/review')
    app.register_blueprint(wishlist_bp, url_prefix='/wishlist')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(payment_bp, url_prefix='/payment')

    @app.cli.command('seed')
    @click.argument('type', default='all')
    def seed(type):
        """Seed the database."""
        from server.scripts.seed import seed_all
        if type == 'all':
            seed_all()
        else:
            click.echo(f"Unknown seed type: {type}")

    return app

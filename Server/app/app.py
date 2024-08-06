from flask import Flask
from .extensions import db, migrate
from .models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment
from .routes import catalog_bp, product_bp, user_bp, review_bp, wishlist_bp, cart_bp, payment_bp

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(catalog_bp, url_prefix='/catalog')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(review_bp, url_prefix='/review')
    app.register_blueprint(wishlist_bp, url_prefix='/wishlist')
    app.register_blueprint(cart_bp, url_prefix='/cart')
    app.register_blueprint(payment_bp, url_prefix='/payment')
    
    @app.before_first_request
    def create_tables():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='127.0.0.1', port=5000)

import sys
import os
import click
from flask import Flask
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from server.app.extensions import db
from server.app.models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment


sys.path.append(os.path.join(os.path.dirname(__file__), 'server/app'))

app = Flask(__name__)
app.config.from_object('config.Config') 
db.init_app(app)
migrate = Migrate(app, db)

@click.group()
def cli():
    """Manage CLI commands."""
    pass

def init_db():
    """Create database tables if they don't exist."""
    with app.app_context():
        db.create_all()
        print("Tables created.")  

def migrate_db():
    """Run database migrations."""
    with app.app_context():
        migrate.init_app(app, db)
        print("Migrations applied.")  
        
        from flask_migrate import upgrade
        upgrade()

def seed_catalogs():
    catalogs = [
        {'name': "Men's Apparel"},
        {'name': 'Electronics'},
        {'name': 'Home & Garden'},
        {'name': 'Sports & Outdoors'},
        {'name': 'Health & Beauty'}
    ]
    
    with app.app_context():
        for catalog in catalogs:
            if not Catalog.query.filter_by(name=catalog['name']).first():
                db.session.add(Catalog(**catalog))
        db.session.commit()
        print("Catalogs seeded.")  

def seed_products():
    products = [
        {'name': 'Men\'s T-Shirt', 'price': 19.99, 'catalog_id': 1, 'quantity': 100},
        {'name': 'Smartphone', 'price': 299.99, 'catalog_id': 2, 'quantity': 50},
        {'name': 'Garden Shovel', 'price': 29.99, 'catalog_id': 3, 'quantity': 30},
        {'name': 'Tennis Racket', 'price': 49.99, 'catalog_id': 4, 'quantity': 20},
        {'name': 'Face Cream', 'price': 15.99, 'catalog_id': 5, 'quantity': 60}
    ]
    
    with app.app_context():
        for product in products:
            if not Product.query.filter_by(name=product['name']).first():
                db.session.add(Product(**product))
        db.session.commit()
        print("Products seeded.")  

def seed_users():
    users = [
        {'name': 'John Doe', 'password': 'hashed_password1', 'email': 'john@example.com'},
        {'name': 'Jane Smith', 'password': 'hashed_password2', 'email': 'jane@example.com'}
    ]
    
    with app.app_context():
        for user in users:
            if not User.query.filter_by(email=user['email']).first():
                db.session.add(User(**user))
        db.session.commit()
        print("Users seeded.")  

def seed_reviews():
    reviews = [
        {'product_id': 1, 'user_id': 1, 'rating': 5, 'comment': 'Great T-shirt!'},
        {'product_id': 2, 'user_id': 2, 'rating': 4, 'comment': 'Good smartphone for the price.'}
    ]
    
    with app.app_context():
        for review in reviews:
            if not Review.query.filter_by(product_id=review['product_id'], user_id=review['user_id']).first():
                db.session.add(Review(**review))
        db.session.commit()
        print("Reviews seeded.")  

def seed_wishlists():
    wishlists = [
        {'user_id': 1, 'product_id': 1},
        {'user_id': 2, 'product_id': 2}
    ]
    
    with app.app_context():
        for wishlist in wishlists:
            if not Wishlist.query.filter_by(user_id=wishlist['user_id'], product_id=wishlist['product_id']).first():
                db.session.add(Wishlist(**wishlist))
        db.session.commit()
        print("Wishlists seeded.") 

def seed_carts():
    carts = [
        {'user_id': 1},
        {'user_id': 2}
    ]
    
    with app.app_context():
        for cart in carts:
            if not Cart.query.filter_by(user_id=cart['user_id']).first():
                db.session.add(Cart(**cart))
        db.session.commit()
        print("Carts seeded.") 

def seed_cart_items():
    cart_items = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 2, 'list_price': 19.99},
        {'cart_id': 2, 'product_id': 2, 'quantity': 1, 'list_price': 299.99}
    ]
    
    with app.app_context():
        for cart_item in cart_items:
            if not CartItem.query.filter_by(cart_id=cart_item['cart_id'], product_id=cart_item['product_id']).first():
                db.session.add(CartItem(**cart_item))
        db.session.commit()
        print("Cart items seeded.")  

def seed_payments():
    payments = [
        {'cart_id': 1, 'user_id': 1, 'transaction_id': 'txn_123456', 'amount': 39.98, 'status': 'Completed'},
        {'cart_id': 2, 'user_id': 2, 'transaction_id': 'txn_654321', 'amount': 299.99, 'status': 'Pending'}
    ]
    
    with app.app_context():
        for payment in payments:
            if not Payment.query.filter_by(cart_id=payment['cart_id'], user_id=payment['user_id']).first():
                db.session.add(Payment(**payment))
        db.session.commit()
        print("Payments seeded.")  

def seed_all():
    """Initialize the database, create tables, run migrations, and seed with initial data."""
    init_db()
    migrate_db()
    seed_catalogs()
    seed_products()
    seed_users()
    seed_reviews()
    seed_wishlists()
    seed_carts()
    seed_cart_items()
    seed_payments()

@cli.command("seed")
@with_appcontext
def seed():
    """Initialize the database, create tables, run migrations, and seed with initial data."""
    seed_all()

if __name__ == "__main__":
    cli()

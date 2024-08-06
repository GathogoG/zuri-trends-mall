import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, upgrade

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///zuri_trends.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment

from seed import (
    seed_catalogs,
    seed_products,
    seed_users,
    seed_reviews,
    seed_wishlists,
    seed_carts,
    seed_cart_items,
    seed_payments,
)

with app.app_context():

    if not os.path.exists('migrations'):
        os.system('flask db init')

    os.system('flask db migrate -m "Initial migration"')

    os.system('flask db upgrade')

    seed_catalogs()
    seed_products()
    seed_users()
    seed_reviews()
    seed_wishlists()
    seed_carts()
    seed_cart_items()
    seed_payments()

print("Database migrations applied and database seeded.")

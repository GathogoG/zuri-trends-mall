import sys
import os
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timezone
import uuid

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'server')))

from server.app import create_app
from server.app.models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment
from server.app.extensions import db

app = create_app()

def clear_tables():
    print("Clearing tables...")
    with app.app_context():
        try:
            db.session.execute(text('DELETE FROM user'))
            db.session.execute(text('DELETE FROM catalog'))
            db.session.execute(text('DELETE FROM product'))
            db.session.execute(text('DELETE FROM review'))
            db.session.execute(text('DELETE FROM wishlist'))
            db.session.execute(text('DELETE FROM cart'))
            db.session.execute(text('DELETE FROM cart_item'))
            db.session.execute(text('DELETE FROM payment'))
            db.session.commit()
            print("Tables cleared.")
        except Exception as e:
            print(f"An error occurred while clearing tables: {e}")
            db.session.rollback()

def seed_catalogs():
    print("Seeding catalogs...")
    catalogs = [
        {'name': 'Men\'s Apparel'},
        {'name': 'Women\'s Apparel'},
        {'name': 'Kids\' Apparel'},
        {'name': 'Accessories'},
        {'name': 'Footwear'},
        {'name': 'Formal Wear'},
        {'name': 'Casual Wear'},
        {'name': 'Outdoor Gear'},
        {'name': 'Sportswear'},
        {'name': 'Swimwear'}
    ]
    
    with app.app_context():
        for catalog in catalogs:
            db.session.add(Catalog(**catalog))
        db.session.commit()
    print("Catalogs seeded.")

def seed_products():
    print("Seeding products...")
    products = [
        {'name': 'Men\'s T-Shirt', 'price': 25.00, 'image_path': 'https://www.macys.com/shop/product/mens-t-shirt?ID=12345', 'quantity': 100, 'catalog_id': 1, 'size': 'L', 'color': 'Blue', 'description': 'Comfortable cotton t-shirt'},
        {'name': 'Men\'s Jeans', 'price': 40.00, 'image_path': 'https://www.macys.com/shop/product/mens-jeans?ID=12346', 'quantity': 50, 'catalog_id': 1, 'size': '32', 'color': 'Dark Blue', 'description': 'Stylish denim jeans'},
        {'name': 'Women\'s Dress', 'price': 60.00, 'image_path': 'https://www.macys.com/shop/product/womens-dress?ID=12347', 'quantity': 30, 'catalog_id': 2, 'size': 'M', 'color': 'Red', 'description': 'Elegant evening dress'},
        {'name': 'Women\'s Skirt', 'price': 35.00, 'image_path': 'https://www.macys.com/shop/product/womens-skirt?ID=12348', 'quantity': 40, 'catalog_id': 2, 'size': 'S', 'color': 'Black', 'description': 'Trendy skirt'},
        {'name': 'Kids\' Hoodie', 'price': 30.00, 'image_path': 'https://www.macys.com/shop/product/kids-hoodie?ID=12349', 'quantity': 70, 'catalog_id': 3, 'size': '10-12', 'color': 'Green', 'description': 'Warm and cozy hoodie'},
        {'name': 'Kids\' Shorts', 'price': 20.00, 'image_path': 'https://www.macys.com/shop/product/kids-shorts?ID=12350', 'quantity': 60, 'catalog_id': 3, 'size': '8-10', 'color': 'Yellow', 'description': 'Comfortable shorts for kids'},
        {'name': 'Leather Belt', 'price': 20.00, 'image_path': 'https://www.macys.com/shop/product/leather-belt?ID=12351', 'quantity': 80, 'catalog_id': 4, 'size': 'Adjustable', 'color': 'Brown', 'description': 'Genuine leather belt'},
        {'name': 'Sunglasses', 'price': 15.00, 'image_path': 'https://www.macys.com/shop/product/sunglasses?ID=12352', 'quantity': 100, 'catalog_id': 4, 'size': 'N/A', 'color': 'Black', 'description': 'Stylish sunglasses'},
        {'name': 'Running Shoes', 'price': 55.00, 'image_path': 'https://www.macys.com/shop/product/running-shoes?ID=12353', 'quantity': 40, 'catalog_id': 5, 'size': '10', 'color': 'White', 'description': 'Comfortable running shoes'},
        {'name': 'Formal Loafers', 'price': 70.00, 'image_path': 'https://www.macys.com/shop/product/formal-loafers?ID=12354', 'quantity': 20, 'catalog_id': 5, 'size': '9', 'color': 'Black', 'description': 'Elegant loafers for formal occasions'},
        {'name': 'Business Suit', 'price': 200.00, 'image_path': 'https://www.macys.com/shop/product/business-suit?ID=12355', 'quantity': 15, 'catalog_id': 6, 'size': 'L', 'color': 'Gray', 'description': 'Professional business suit'},
        {'name': 'Evening Gown', 'price': 150.00, 'image_path': 'https://www.macys.com/shop/product/evening-gown?ID=12356', 'quantity': 10, 'catalog_id': 6, 'size': 'M', 'color': 'Gold', 'description': 'Elegant evening gown'},
        {'name': 'Casual Shirt', 'price': 28.00, 'image_path': 'https://www.macys.com/shop/product/casual-shirt?ID=12357', 'quantity': 90, 'catalog_id': 7, 'size': 'M', 'color': 'Light Blue', 'description': 'Relaxed casual shirt'},
        {'name': 'Cargo Pants', 'price': 45.00, 'image_path': 'https://www.macys.com/shop/product/cargo-pants?ID=12358', 'quantity': 50, 'catalog_id': 7, 'size': '34', 'color': 'Khaki', 'description': 'Comfortable cargo pants'},
        {'name': 'Rain Jacket', 'price': 60.00, 'image_path': 'https://www.macys.com/shop/product/rain-jacket?ID=12359', 'quantity': 25, 'catalog_id': 8, 'size': 'L', 'color': 'Orange', 'description': 'Durable rain jacket'},
        {'name': 'Fleece Vest', 'price': 40.00, 'image_path': 'https://www.macys.com/shop/product/fleece-vest?ID=12360', 'quantity': 30, 'catalog_id': 8, 'size': 'M', 'color': 'Navy', 'description': 'Warm fleece vest'},
        {'name': 'Gym Shorts', 'price': 22.00, 'image_path': 'https://www.macys.com/shop/product/gym-shorts?ID=12361', 'quantity': 60, 'catalog_id': 9, 'size': 'L', 'color': 'Gray', 'description': 'Breathable gym shorts'},
        {'name': 'Yoga Pants', 'price': 35.00, 'image_path': 'https://www.macys.com/shop/product/yoga-pants?ID=12362', 'quantity': 40, 'catalog_id': 9, 'size': 'S', 'color': 'Black', 'description': 'Stretchable yoga pants'},
        {'name': 'Swimsuit', 'price': 50.00, 'image_path': 'https://www.macys.com/shop/product/swimsuit?ID=12363', 'quantity': 20, 'catalog_id': 10, 'size': 'M', 'color': 'Blue', 'description': 'Stylish swimsuit'},
        {'name': 'Beach Shorts', 'price': 25.00, 'image_path': 'https://www.macys.com/shop/product/beach-shorts?ID=12364', 'quantity': 30, 'catalog_id': 10, 'size': 'L', 'color': 'Turquoise', 'description': 'Comfortable beach shorts'}
    ]
    
    with app.app_context():
        for product in products:
            db.session.add(Product(**product))
        db.session.commit()
    print("Products seeded.")

def seed_users():
    print("Seeding users...")
    users = [
        {'name': 'John Doe', 'password': 'hashed_password_1', 'email': 'john.doe@example.com'},
        {'name': 'Jane Smith', 'password': 'hashed_password_2', 'email': 'jane.smith@example.com'},
        {'name': 'Emily Johnson', 'password': 'hashed_password_3', 'email': 'emily.johnson@example.com'},
        {'name': 'Michael Brown', 'password': 'hashed_password_4', 'email': 'michael.brown@example.com'}
    ]
    
    with app.app_context():
        for user in users:
            db.session.add(User(**user))
        db.session.commit()
    print("Users seeded.")

def seed_reviews():
    print("Seeding reviews...")
    reviews = [
    {'rating': 5, 'comment': 'Excellent product!', 'user_id': 1, 'product_id': 1},
    {'rating': 4, 'comment': 'Very good, but could be improved.', 'user_id': 2, 'product_id': 2},
    {'rating': 3, 'comment': 'Average quality.', 'user_id': 3, 'product_id': 3},
    {'rating': 2, 'comment': 'Not what I expected.', 'user_id': 4, 'product_id': 4},
    {'rating': 5, 'comment': 'Great value for money!', 'user_id': 5, 'product_id': 5},
    {'rating': 4, 'comment': 'Fast shipping and good packaging.', 'user_id': 6, 'product_id': 6},
    {'rating': 3, 'comment': 'The product is okay.', 'user_id': 7, 'product_id': 7},
    {'rating': 2, 'comment': 'The quality could be better.', 'user_id': 8, 'product_id': 8},
    {'rating': 1, 'comment': 'Very poor quality.', 'user_id': 9, 'product_id': 9},
    {'rating': 5, 'comment': 'Highly recommend this product!', 'user_id': 10, 'product_id': 10}
]
    
    with app.app_context():
        for review in reviews:
            db.session.add(Review(**review))
        db.session.commit()
    print("Reviews seeded.")

def seed_wishlists():
    print("Seeding wishlists...")
    wishlists = [
        {'user_id': 1, 'product_id': 1},
        {'user_id': 2, 'product_id': 2},
        {'user_id': 3, 'product_id': 3},
        {'user_id': 4, 'product_id': 4}
    ]
    
    with app.app_context():
        for wishlist in wishlists:
            db.session.add(Wishlist(**wishlist))
        db.session.commit()
    print("Wishlists seeded.")

def seed_carts():
    print("Seeding carts...")
    carts = [
        {'user_id': 1},
        {'user_id': 2},
        {'user_id': 3},
        {'user_id': 4}
    ]
    
    with app.app_context():
        for cart in carts:
            db.session.add(Cart(**cart))
        db.session.commit()
    print("Carts seeded.")

def seed_cart_items():
    print("Seeding cart items...")
    cart_items = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 2, 'list_price': 10.00},
        {'cart_id': 2, 'product_id': 2, 'quantity': 1, 'list_price': 20.00},
        {'cart_id': 3, 'product_id': 3, 'quantity': 5, 'list_price': 15.00},
        {'cart_id': 4, 'product_id': 4, 'quantity': 3, 'list_price': 25.00}
    ]
    
    with app.app_context():
        for cart_item in cart_items:
            db.session.add(CartItem(**cart_item))
        db.session.commit()
    print("Cart items seeded.")

def seed_payments():
    print("Seeding payments...")
    
    # Payment data with transaction_id included
    payments = [
        {'user_id': 1, 'cart_id': 1, 'transaction_id': str(uuid.uuid4()), 'amount': 50.00, 'status': 'Completed'},
        {'user_id': 2, 'cart_id': 2, 'transaction_id': str(uuid.uuid4()), 'amount': 40.00, 'status': 'Pending'},
        {'user_id': 3, 'cart_id': 3, 'transaction_id': str(uuid.uuid4()), 'amount': 70.00, 'status': 'Failed'},
        {'user_id': 4, 'cart_id': 4, 'transaction_id': str(uuid.uuid4()), 'amount': 30.00, 'status': 'Completed'}
    ]
    
    with app.app_context():
        for payment_data in payments:
            if 'transaction_id' not in payment_data:
                print("Missing transaction_id for payment data:", payment_data)
                continue
            
            payment = Payment(
                cart_id=payment_data['cart_id'],
                user_id=payment_data['user_id'],
                transaction_id=payment_data['transaction_id'],
                amount=payment_data['amount'],
                status=payment_data['status'],
                created_at=datetime.now(timezone.utc)  
            )
            db.session.add(payment)
        
        db.session.commit()
    
    print("Payments seeded.")

def seed_all():
    clear_tables()
    seed_catalogs()
    seed_products()
    seed_users()
    seed_reviews()
    seed_wishlists()
    seed_carts()
    seed_cart_items()
    seed_payments()

if __name__ == "__main__":
    seed_all()

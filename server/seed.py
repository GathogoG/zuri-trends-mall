from app import db
from app.models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment

def seed_catalogs():
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
    
    for catalog in catalogs:
        db.session.add(Catalog(**catalog))
    
    db.session.commit()

def seed_products():
    products = [
        {'name': 'Men\'s T-Shirt', 'price': 25.00, 'image_path': 'tshirt.jpg', 'quantity': 100, 'catalog_id': 1, 'size': 'L', 'color': 'Blue', 'description': 'Comfortable cotton t-shirt'},
        {'name': 'Men\'s Jeans', 'price': 40.00, 'image_path': 'jeans.jpg', 'quantity': 50, 'catalog_id': 1, 'size': '32', 'color': 'Dark Blue', 'description': 'Stylish denim jeans'},
        {'name': 'Women\'s Dress', 'price': 60.00, 'image_path': 'dress.jpg', 'quantity': 30, 'catalog_id': 2, 'size': 'M', 'color': 'Red', 'description': 'Elegant evening dress'},
        {'name': 'Women\'s Skirt', 'price': 35.00, 'image_path': 'skirt.jpg', 'quantity': 40, 'catalog_id': 2, 'size': 'S', 'color': 'Black', 'description': 'Trendy skirt'},
        {'name': 'Kids\' Hoodie', 'price': 30.00, 'image_path': 'hoodie.jpg', 'quantity': 70, 'catalog_id': 3, 'size': '10-12', 'color': 'Green', 'description': 'Warm and cozy hoodie'},
        {'name': 'Kids\' Shorts', 'price': 20.00, 'image_path': 'shorts.jpg', 'quantity': 60, 'catalog_id': 3, 'size': '8-10', 'color': 'Yellow', 'description': 'Comfortable shorts for kids'},
        {'name': 'Leather Belt', 'price': 20.00, 'image_path': 'belt.jpg', 'quantity': 80, 'catalog_id': 4, 'size': 'Adjustable', 'color': 'Brown', 'description': 'Genuine leather belt'},
        {'name': 'Sunglasses', 'price': 15.00, 'image_path': 'sunglasses.jpg', 'quantity': 100, 'catalog_id': 4, 'size': 'N/A', 'color': 'Black', 'description': 'Stylish sunglasses'},
        {'name': 'Running Shoes', 'price': 55.00, 'image_path': 'shoes.jpg', 'quantity': 40, 'catalog_id': 5, 'size': '10', 'color': 'White', 'description': 'Comfortable running shoes'},
        {'name': 'Formal Loafers', 'price': 70.00, 'image_path': 'loafers.jpg', 'quantity': 20, 'catalog_id': 5, 'size': '9', 'color': 'Black', 'description': 'Elegant loafers for formal occasions'},
        {'name': 'Business Suit', 'price': 200.00, 'image_path': 'suit.jpg', 'quantity': 15, 'catalog_id': 6, 'size': 'L', 'color': 'Gray', 'description': 'Professional business suit'},
        {'name': 'Evening Gown', 'price': 150.00, 'image_path': 'gown.jpg', 'quantity': 10, 'catalog_id': 6, 'size': 'M', 'color': 'Gold', 'description': 'Elegant evening gown'},
        {'name': 'Casual Shirt', 'price': 28.00, 'image_path': 'casual_shirt.jpg', 'quantity': 90, 'catalog_id': 7, 'size': 'M', 'color': 'Light Blue', 'description': 'Relaxed casual shirt'},
        {'name': 'Cargo Pants', 'price': 45.00, 'image_path': 'cargo_pants.jpg', 'quantity': 50, 'catalog_id': 7, 'size': '34', 'color': 'Khaki', 'description': 'Comfortable cargo pants'},
        {'name': 'Rain Jacket', 'price': 60.00, 'image_path': 'rain_jacket.jpg', 'quantity': 25, 'catalog_id': 8, 'size': 'L', 'color': 'Orange', 'description': 'Durable rain jacket'},
        {'name': 'Fleece Vest', 'price': 40.00, 'image_path': 'fleece_vest.jpg', 'quantity': 30, 'catalog_id': 8, 'size': 'M', 'color': 'Navy', 'description': 'Warm fleece vest'},
        {'name': 'Gym Shorts', 'price': 22.00, 'image_path': 'gym_shorts.jpg', 'quantity': 60, 'catalog_id': 9, 'size': 'L', 'color': 'Gray', 'description': 'Breathable gym shorts'},
        {'name': 'Yoga Pants', 'price': 35.00, 'image_path': 'yoga_pants.jpg', 'quantity': 40, 'catalog_id': 9, 'size': 'S', 'color': 'Black', 'description': 'Stretchable yoga pants'},
        {'name': 'Swimsuit', 'price': 50.00, 'image_path': 'swimsuit.jpg', 'quantity': 20, 'catalog_id': 10, 'size': 'M', 'color': 'Blue', 'description': 'Stylish swimsuit'},
        {'name': 'Beach Shorts', 'price': 25.00, 'image_path': 'beach_shorts.jpg', 'quantity': 30, 'catalog_id': 10, 'size': 'L', 'color': 'Turquoise', 'description': 'Comfortable beach shorts'}
    ]
    
    for product in products:
        db.session.add(Product(**product))
    
    db.session.commit()

def seed_users():
    users = [
        {'name': 'John Doe', 'password': 'hashed_password_1', 'email': 'john.doe@example.com'},
        {'name': 'Jane Smith', 'password': 'hashed_password_2', 'email': 'jane.smith@example.com'},
        {'name': 'Emily Johnson', 'password': 'hashed_password_3', 'email': 'emily.johnson@example.com'},
        {'name': 'Michael Brown', 'password': 'hashed_password_4', 'email': 'michael.brown@example.com'},
        {'name': 'Chris Davis', 'password': 'hashed_password_5', 'email': 'chris.davis@example.com'},
        {'name': 'Amanda Wilson', 'password': 'hashed_password_6', 'email': 'amanda.wilson@example.com'},
        {'name': 'Sarah Miller', 'password': 'hashed_password_7', 'email': 'sarah.miller@example.com'},
        {'name': 'James Anderson', 'password': 'hashed_password_8', 'email': 'james.anderson@example.com'},
        {'name': 'David Taylor', 'password': 'hashed_password_9', 'email': 'david.taylor@example.com'},
        {'name': 'Laura Martinez', 'password': 'hashed_password_10', 'email': 'laura.martinez@example.com'}
    ]
    
    for user in users:
        db.session.add(User(**user))
    
    db.session.commit()

def seed_reviews():
    reviews = [
        {'product_id': 1, 'user_id': 1, 'rating': 4, 'comment': 'Good quality t-shirt.'},
        {'product_id': 2, 'user_id': 2, 'rating': 5, 'comment': 'Perfect fit and great material.'},
        {'product_id': 3, 'user_id': 3, 'rating': 3, 'comment': 'The dress is nice but a bit too small.'},
        {'product_id': 4, 'user_id': 4, 'rating': 4, 'comment': 'Nice skirt, would recommend.'},
        {'product_id': 5, 'user_id': 5, 'rating': 5, 'comment': 'My child loves this hoodie.'},
        {'product_id': 6, 'user_id': 6, 'rating': 4, 'comment': 'Comfortable and great for summer.'},
        {'product_id': 7, 'user_id': 7, 'rating': 5, 'comment': 'Quality belt and stylish.'},
        {'product_id': 8, 'user_id': 8, 'rating': 4, 'comment': 'Sunglasses are cool and durable.'},
        {'product_id': 9, 'user_id': 9, 'rating': 4, 'comment': 'Perfect for running.'},
        {'product_id': 10, 'user_id': 10, 'rating': 5, 'comment': 'Stylish and comfortable loafers.'}
    ]
    
    for review in reviews:
        db.session.add(Review(**review))
    
    db.session.commit()

def seed_wishlists():
    wishlists = [
        {'user_id': 1, 'product_id': 1},
        {'user_id': 2, 'product_id': 2},
        {'user_id': 3, 'product_id': 3},
        {'user_id': 4, 'product_id': 4},
        {'user_id': 5, 'product_id': 5},
        {'user_id': 6, 'product_id': 6},
        {'user_id': 7, 'product_id': 7},
        {'user_id': 8, 'product_id': 8},
        {'user_id': 9, 'product_id': 9},
        {'user_id': 10, 'product_id': 10}
    ]
    
    for wishlist in wishlists:
        db.session.add(Wishlist(**wishlist))
    
    db.session.commit()

def seed_carts():
    carts = [
        {'user_id': 1},
        {'user_id': 2},
        {'user_id': 3},
        {'user_id': 4},
        {'user_id': 5},
        {'user_id': 6},
        {'user_id': 7},
        {'user_id': 8},
        {'user_id': 9},
        {'user_id': 10}
    ]
    
    for cart in carts:
        db.session.add(Cart(**cart))
    
    db.session.commit()

def seed_cart_items():
    cart_items = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 2, 'list_price': 25.00},
        {'cart_id': 2, 'product_id': 2, 'quantity': 1, 'list_price': 40.00},
        {'cart_id': 3, 'product_id': 3, 'quantity': 1, 'list_price': 60.00},
        {'cart_id': 4, 'product_id': 4, 'quantity': 3, 'list_price': 35.00},
        {'cart_id': 5, 'product_id': 5, 'quantity': 2, 'list_price': 30.00},
        {'cart_id': 6, 'product_id': 6, 'quantity': 1, 'list_price': 20.00},
        {'cart_id': 7, 'product_id': 7, 'quantity': 1, 'list_price': 20.00},
        {'cart_id': 8, 'product_id': 8, 'quantity': 1, 'list_price': 15.00},
        {'cart_id': 9, 'product_id': 9, 'quantity': 1, 'list_price': 55.00},
        {'cart_id': 10, 'product_id': 10, 'quantity': 1, 'list_price': 70.00}
    ]
    
    for cart_item in cart_items:
        db.session.add(CartItem(**cart_item))
    
    db.session.commit()

def seed_payments():
    payments = [
        {'cart_id': 1, 'user_id': 1, 'transaction_id': 'MPESA001', 'amount': 50.00, 'status': 'Completed'},
        {'cart_id': 2, 'user_id': 2, 'transaction_id': 'MPESA002', 'amount': 40.00, 'status': 'Completed'},
        {'cart_id': 3, 'user_id': 3, 'transaction_id': 'MPESA003', 'amount': 60.00, 'status': 'Completed'},
        {'cart_id': 4, 'user_id': 4, 'transaction_id': 'MPESA004', 'amount': 105.00, 'status': 'Completed'},
        {'cart_id': 5, 'user_id': 5, 'transaction_id': 'MPESA005', 'amount': 60.00, 'status': 'Pending'},
        {'cart_id': 6, 'user_id': 6, 'transaction_id': 'MPESA006', 'amount': 20.00, 'status': 'Completed'},
        {'cart_id': 7, 'user_id': 7, 'transaction_id': 'MPESA007', 'amount': 20.00, 'status': 'Completed'},
        {'cart_id': 8, 'user_id': 8, 'transaction_id': 'MPESA008', 'amount': 15.00, 'status': 'Pending'},
        {'cart_id': 9, 'user_id': 9, 'transaction_id': 'MPESA009', 'amount': 55.00, 'status': 'Completed'},
        {'cart_id': 10, 'user_id': 10, 'transaction_id': 'MPESA010', 'amount': 70.00, 'status': 'Completed'}
    ]
    
    for payment in payments:
        db.session.add(Payment(**payment))
    
    db.session.commit()

if __name__ == '__main__':
    seed_catalogs()
    seed_products()
    seed_users()
    seed_reviews()
    seed_wishlists()
    seed_carts()
    seed_cart_items()
    seed_payments()

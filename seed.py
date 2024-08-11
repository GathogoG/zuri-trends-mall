from server.app import create_app
from server.app.models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment
from server.app.extensions import db
from sqlalchemy.exc import IntegrityError

app = create_app()

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
        # Men's Apparel
        {'name': 'Men\'s T-Shirt', 'price': 2000.00, 'image_path': 'https://i.pinimg.com/236x/71/a0/1e/71a01ebe169f0e79275c08717b952daf.jpg', 'quantity': 100, 'catalog_id': 1, 'size': 'L', 'color': 'Blue', 'description': 'Comfortable cotton t-shirt'},
        {'name': 'Men\'s Jeans', 'price': 1500.00, 'image_path': 'https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 50, 'catalog_id': 1, 'size': '32', 'color': 'Dark Blue', 'description': 'Stylish denim jeans'},
        {'name': 'Men\'s Jacket', 'price': 3000.00, 'image_path': 'https://images.pexels.com/photos/6460791/pexels-photo-6460791.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 20, 'catalog_id': 1, 'size': 'XL', 'color': 'Black', 'description': 'Warm winter jacket'},
        
        # Women's Apparel
        {'name': 'Women\'s Dress', 'price': 4500.00, 'image_path': 'https://images.pexels.com/photos/22866393/pexels-photo-22866393/free-photo-of-women-in-dresses.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 30, 'catalog_id': 2, 'size': 'M', 'color': 'Red', 'description': 'Elegant evening dress'},
        {'name': 'Women\'s Skirt', 'price': 2000.00, 'image_path': 'https://images.pexels.com/photos/2820793/pexels-photo-2820793.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 40, 'catalog_id': 2, 'size': 'S', 'color': 'Black', 'description': 'Trendy skirt'},
        {'name': 'Women\'s Blouse', 'price': 2500.00, 'image_path': 'https://images.pexels.com/photos/6347890/pexels-photo-6347890.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 50, 'catalog_id': 2, 'size': 'M', 'color': 'White', 'description': 'Elegant blouse for casual and formal wear'},

        # Kids' Apparel
        {'name': 'Kids\' Hoodie', 'price': 2000.00, 'image_path': 'https://images.pexels.com/photos/6623811/pexels-photo-6623811.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 70, 'catalog_id': 3, 'size': '10-12', 'color': 'Green', 'description': 'Warm and cozy hoodie'},
        {'name': 'Kids\' Shorts', 'price': 1500.00, 'image_path': 'https://images.pexels.com/photos/12887269/pexels-photo-12887269.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 60, 'catalog_id': 3, 'size': '8-10', 'color': 'Yellow', 'description': 'Comfortable shorts for kids'},
        {'name': 'Kids\' T-Shirt', 'price': 1200.00, 'image_path': 'https://images.pexels.com/photos/6347892/pexels-photo-6347892.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 80, 'catalog_id': 3, 'size': '6-8', 'color': 'Red', 'description': 'Colorful kids\' t-shirt'},
        
        # Accessories
        {'name': 'Leather Belt', 'price': 800.00, 'image_path': 'https://images.pexels.com/photos/4164506/pexels-photo-4164506.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 80, 'catalog_id': 4, 'size': 'Adjustable', 'color': 'Brown', 'description': 'Genuine leather belt'},
        {'name': 'Sunglasses', 'price': 500.00, 'image_path': 'https://images.pexels.com/photos/704241/pexels-photo-704241.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 100, 'catalog_id': 4, 'size': 'N/A', 'color': 'Black', 'description': 'Stylish sunglasses'},
        {'name': 'Watch', 'price': 2500.00, 'image_path': 'https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 40, 'catalog_id': 4, 'size': 'One Size', 'color': 'Silver', 'description': 'Classic wristwatch'},

        # Footwear
        {'name': 'Running Shoes', 'price': 2500.00, 'image_path': 'https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 40, 'catalog_id': 5, 'size': '10', 'color': 'White', 'description': 'Comfortable running shoes'},
        {'name': 'Formal Loafers', 'price': 3000.00, 'image_path': 'https://images.pexels.com/photos/5669627/pexels-photo-5669627.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 20, 'catalog_id': 5, 'size': '9', 'color': 'Black', 'description': 'Elegant loafers for formal occasions'},
        {'name': 'Casual Sneakers', 'price': 2200.00, 'image_path': 'https://images.pexels.com/photos/27503503/pexels-photo-27503503/free-photo-of-coleccion-de-zapatillas.png?auto=compress&cs=tinysrgb&w=400', 'quantity': 50, 'catalog_id': 5, 'size': '11', 'color': 'Blue', 'description': 'Trendy casual sneakers'},

        # Formal Wear
        {'name': 'Business Suit', 'price': 5000.00, 'image_path': 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 15, 'catalog_id': 6, 'size': 'L', 'color': 'Gray', 'description': 'Professional business suit'},
        {'name': 'Evening Gown', 'price': 2500.00, 'image_path': 'https://images.pexels.com/photos/8347583/pexels-photo-8347583.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 10, 'catalog_id': 6, 'size': 'M', 'color': 'Gold', 'description': 'Elegant evening gown'},
        {'name': 'Dress Shirt', 'price': 1800.00, 'image_path': 'https://images.pexels.com/photos/4947543/pexels-photo-4947543.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 25, 'catalog_id': 6, 'size': 'M', 'color': 'White', 'description': 'Classic dress shirt'},

        # Casual Wear
        {'name': 'Casual Shirt', 'price': 1500.00, 'image_path': 'https://images.pexels.com/photos/6051248/pexels-photo-6051248.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 90, 'catalog_id': 7, 'size': 'M', 'color': 'Light Blue', 'description': 'Relaxed casual shirt'},
        {'name': 'Cargo Pants', 'price': 1800.00, 'image_path': 'https://images.pexels.com/photos/6069080/pexels-photo-6069080.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 50, 'catalog_id': 7, 'size': '34', 'color': 'Khaki', 'description': 'Comfortable cargo pants'},
        {'name': 'Casual Shorts', 'price': 1200.00, 'image_path': 'https://images.pexels.com/photos/5325560/pexels-photo-5325560.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 60, 'catalog_id': 7, 'size': 'L', 'color': 'Green', 'description': 'Light and comfortable casual shorts'},

        # Outdoor Gear
        {'name': 'Rain Jacket', 'price': 2500.00, 'image_path': 'https://images.pexels.com/photos/8499439/pexels-photo-8499439.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 25, 'catalog_id': 8, 'size': 'L', 'color': 'Orange', 'description': 'Durable rain jacket'},
        {'name': 'Fleece Vest', 'price': 1500.00, 'image_path': 'https://images.pexels.com/photos/6318276/pexels-photo-6318276.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 30, 'catalog_id': 8, 'size': 'M', 'color': 'Navy', 'description': 'Warm fleece vest'},
        {'name': 'Hiking Boots', 'price': 3200.00, 'image_path': 'https://images.pexels.com/photos/3075078/pexels-photo-3075078.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 20, 'catalog_id': 8, 'size': '10', 'color': 'Brown', 'description': 'Sturdy hiking boots'},

        # Sportswear
        {'name': 'Gym Shorts', 'price': 1700.00, 'image_path': 'https://images.pexels.com/photos/20240050/pexels-photo-20240050/free-photo-of-a-tattooed-muscular-man-in-sportswear-standing-at-the-gym.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 60, 'catalog_id': 9, 'size': 'L', 'color': 'Gray', 'description': 'Breathable gym shorts'},
        {'name': 'Yoga Pants', 'price': 2000.00, 'image_path': 'https://images.pexels.com/photos/6944381/pexels-photo-6944381.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 40, 'catalog_id': 9, 'size': 'S', 'color': 'Black', 'description': 'Stretchable yoga pants'},
        {'name': 'Track Jacket', 'price': 2400.00, 'image_path': 'https://images.pexels.com/photos/8455974/pexels-photo-8455974.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 35, 'catalog_id': 9, 'size': 'M', 'color': 'Blue', 'description': 'Comfortable track jacket'},

        # Swimwear
        {'name': 'Swimsuit', 'price': 2600.00, 'image_path': 'https://tisapthreads.com/cdn/shop/files/DSC01363-Edit_498846ed-4650-4f4b-b865-ae9e61a93a50_960x_crop_center.jpg?v=1716360272', 'quantity': 20, 'catalog_id': 10, 'size': 'M', 'color': 'Blue', 'description': 'Stylish swimsuit'},
        {'name': 'Beach Shorts', 'price': 1900.00, 'image_path': 'https://images.pexels.com/photos/1574898/pexels-photo-1574898.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 30, 'catalog_id': 10, 'size': 'L', 'color': 'Turquoise', 'description': 'Comfortable beach shorts'},
        {'name': 'Swim Trunks', 'price': 1500.00, 'image_path': 'https://images.pexels.com/photos/8688558/pexels-photo-8688558.jpeg?auto=compress&cs=tinysrgb&w=400', 'quantity': 40, 'catalog_id': 10, 'size': 'M', 'color': 'Red', 'description': 'Trendy swim trunks'}
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
        {'name': 'Emily Johnson', 'password': 'hashed_password_3', 'email': 'emily.johnson@example.com'}
    ]
    
    with app.app_context():
        for user in users:
            try:
                db.session.add(User(**user))
                db.session.commit()
            except IntegrityError:
                db.session.rollback()
                print(f"User with email {user['email']} already exists. Skipping.")
    print("Users seeded.")

def seed_reviews():
    print("Seeding reviews...")
    reviews = [
        {'product_id': 1, 'user_id': 1, 'rating': 4, 'comment': 'Good quality t-shirt.'},
        {'product_id': 2, 'user_id': 2, 'rating': 5, 'comment': 'Perfect fit and great material.'},
        {'product_id': 3, 'user_id': 3, 'rating': 3, 'comment': 'The dress is nice but a bit too small.'},
        {'product_id': 4, 'user_id': 4, 'rating': 4, 'comment': 'Nice skirt, would recommend.'},
        {'product_id': 5, 'user_id': 5, 'rating': 5, 'comment': 'My child loves this hoodie.'},
        {'product_id': 6, 'user_id': 6, 'rating': 4, 'comment': 'Comfortable and great for summer.'},
        {'product_id': 7, 'user_id': 7, 'rating': 5, 'comment': 'The belt is very durable.'},
        {'product_id': 8, 'user_id': 8, 'rating': 3, 'comment': 'Sunglasses are okay but not great.'},
        {'product_id': 9, 'user_id': 9, 'rating': 5, 'comment': 'Excellent shoes for running.'},
        {'product_id': 10, 'user_id': 10, 'rating': 4, 'comment': 'Very stylish loafers.'}
    ]
    
    with app.app_context():
        for review in reviews:
            db.session.add(Review(**review))
        db.session.commit()
    print("Reviews seeded.")

def seed_wishlists():
    print("Seeding wishlists...")
    wishlists = [
        {'user_id': 1, 'image_path': 'https://images.pexels.com/photos/6944381/pexels-photo-6944381.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 1},
        {'user_id': 2, 'image_path': 'https://images.pexels.com/photos/8688558/pexels-photo-8688558.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 2},
        {'user_id': 3, 'image_path': 'https://images.pexels.com/photos/1574898/pexels-photo-1574898.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 3},
        {'user_id': 4, 'image_path': 'https://images.pexels.com/photos/6318276/pexels-photo-6318276.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 4},
        {'user_id': 5, 'image_path': 'https://images.pexels.com/photos/6318276/pexels-photo-6318276.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 5},
        {'user_id': 6, 'image_path': 'https://images.pexels.com/photos/704241/pexels-photo-704241.jpeg?auto=compress&cs=tinysrgb&w=400',  'product_id': 6},
        {'user_id': 7, 'image_path': 'https://images.pexels.com/photos/704241/pexels-photo-704241.jpeg?auto=compress&cs=tinysrgb&w=400',  'product_id': 7},
        {'user_id': 8, 'image_path': 'https://images.pexels.com/photos/2820793/pexels-photo-2820793.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 8},
        {'user_id': 9, 'image_path': 'https://images.pexels.com/photos/6460791/pexels-photo-6460791.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 9},
        {'user_id': 10, 'image_path': 'https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=400', 'product_id': 10}
    ]
    
    with app.app_context():
        for wishlist in wishlists:
            db.session.add(Wishlist(**wishlist))
        db.session.commit()
    print("Wishlists seeded.")

def seed_cart_items():
    print("Seeding cart items...")
    cart_items = [
        {'cart_id': 1, 'product_id': 1, 'quantity': 1, 'list_price': 25.00},
        {'cart_id': 2, 'product_id': 2, 'quantity': 2, 'list_price': 40.00},
        {'cart_id': 3, 'product_id': 3, 'quantity': 1, 'list_price': 60.00},
        {'cart_id': 4, 'product_id': 4, 'quantity': 3, 'list_price': 35.00},
        {'cart_id': 5, 'product_id': 5, 'quantity': 1, 'list_price': 30.00},
        {'cart_id': 6, 'product_id': 6, 'quantity': 2, 'list_price': 20.00},
        {'cart_id': 7, 'product_id': 7, 'quantity': 1, 'list_price': 20.00},
        {'cart_id': 8, 'product_id': 8, 'quantity': 1, 'list_price': 15.00},
        {'cart_id': 9, 'product_id': 9, 'quantity': 1, 'list_price': 55.00},
        {'cart_id': 10, 'product_id': 10, 'quantity': 1, 'list_price': 70.00}
    ]
    
    with app.app_context():
        for cart_item in cart_items:
            db.session.add(CartItem(**cart_item))
        db.session.commit()
    print("Cart items seeded.")

def seed_carts():
    print("Seeding carts...")
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
    
    with app.app_context():
        cart_ids = {}
        for cart in carts:
            cart_instance = Cart(**cart)
            db.session.add(cart_instance)
            db.session.commit()
            cart_ids[cart_instance.user_id] = cart_instance.id
        print("Carts seeded.")
        return cart_ids

def seed_payments(cart_ids):
    print("Seeding payments...")
    payments = [
        {'user_id': 1, 'cart_id': cart_ids[1], 'transaction_id': 'txn_001', 'amount': 50.00, 'status': 'Completed'},
        {'user_id': 2, 'cart_id': cart_ids[2], 'transaction_id': 'txn_002', 'amount': 40.00, 'status': 'Completed'},
        {'user_id': 3, 'cart_id': cart_ids[3], 'transaction_id': 'txn_003', 'amount': 70.00, 'status': 'Pending'},
        {'user_id': 4, 'cart_id': cart_ids[4], 'transaction_id': 'txn_004', 'amount': 30.00, 'status': 'Completed'},
        {'user_id': 5, 'cart_id': cart_ids[5], 'transaction_id': 'txn_005', 'amount': 90.00, 'status': 'Failed'},
        {'user_id': 6, 'cart_id': cart_ids[6], 'transaction_id': 'txn_006', 'amount': 60.00, 'status': 'Completed'},
        {'user_id': 7, 'cart_id': cart_ids[7], 'transaction_id': 'txn_007', 'amount': 20.00, 'status': 'Completed'},
        {'user_id': 8, 'cart_id': cart_ids[8], 'transaction_id': 'txn_008', 'amount': 15.00, 'status': 'Completed'},
        {'user_id': 9, 'cart_id': cart_ids[9], 'transaction_id': 'txn_009', 'amount': 55.00, 'status': 'Pending'},
        {'user_id': 10, 'cart_id': cart_ids[10], 'transaction_id': 'txn_010', 'amount': 150.00, 'status': 'Completed'}
    ]
    
    with app.app_context():
        for payment in payments:
            db.session.add(Payment(**payment))
        db.session.commit()
    print("Payments seeded.")

def seed_all():
    print("Starting seed process...")
    with app.app_context():
        clear_existing_users()
        seed_catalogs()
        seed_products()
        cart_ids = seed_carts()
        seed_users()
        seed_reviews()
        seed_wishlists()
        seed_cart_items()
        seed_payments(cart_ids)
    print("Seed process completed.")

def clear_existing_users():
    print("Clearing existing users...")
    with app.app_context():
        db.session.query(User).delete()
        db.session.commit()
    print("Existing users cleared.")

if __name__ == "__main__":
    seed_all()


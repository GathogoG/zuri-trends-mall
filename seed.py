import sys
import os
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timezone
import uuid

# Add server directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

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
        {'name': 'Men\'s Apparel', 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2301935_MENS_RIB_20640_Hugo_Boss:1x1?$104_desktop$&fmt=png-alpha'},
        {'name': 'Women\'s Apparel', 'image_path': 'https://i.pinimg.com/236x/69/66/cd/6966cdeb1f52d12b543a753c931ac95b.jpg'},
        {'name': 'Kids\' Apparel', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/7/optimized/28615877_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp'},
        {'name': 'Accessories', 'image_path': 'https://shopzetu.com/cdn/shop/products/9foSr4GFhv-493607_900x.jpg?v=1707901693'},
        {'name': 'Footwear', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/3/optimized/27497253_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp'},
        {'name': 'Formal Wear', 'image_path': 'https://images.hugoboss.com/is/image/boss/hbeu50528162_072_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1723214764000&wid=1200&hei=1818&fmt=webp'},
        {'name': 'Casual Wear', 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2403574_31:1x1?$$&fmt=png-alpha'},
        {'name': 'Outdoor Gear', 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/2128661/1.jpg?1580'},
        {'name': 'Sportswear', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27913182_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp'},
        {'name': 'Swimwear', 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/2282711/1.jpg?9209'}
    ]

    with app.app_context():
        for catalog in catalogs:
            db.session.add(Catalog(**catalog))
        db.session.commit()
    print("Catalogs seeded.")

def seed_products():
    print("Seeding products...")
    products = [
        {'name': 'Men\'s T-Shirt', 'price': 2500, 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2301935_MENS_RIB_20640_Hugo_Boss:1x1?$104_desktop$&fmt=png-alpha', 'quantity': 100, 'catalog_id': 1, 'size': 'L', 'color': 'Blue', 'description': 'Comfortable cotton t-shirt'},
        {'name': 'Men\'s Jeans', 'price': 2000, 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/MensJeansStraight9617175_1499299:1x1?$104_desktop$&fmt=png-alpha', 'quantity': 50, 'catalog_id': 1, 'size': '32', 'color': 'Dark Blue', 'description': 'Stylish denim jeans'},
        {'name': 'Women\'s Dress', 'price': 6000, 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2303462_101:1x1?$106_lg_desktop$&fmt=png-alpha', 'quantity': 30, 'catalog_id': 2, 'size': 'M', 'color': 'Red', 'description': 'Elegant evening dress'},
        {'name': 'Women\'s Skirt', 'price': 3500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/1/optimized/27494581_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp', 'quantity': 40, 'catalog_id': 2, 'size': 'S', 'color': 'Black', 'description': 'Trendy skirt'},
        {'name': 'Kids\' Hoodie', 'price': 3000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/7/optimized/28615877_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 70, 'catalog_id': 3, 'size': '10-12', 'color': 'Green', 'description': 'Warm and cozy hoodie'},
        {'name': 'Kids\' Shorts', 'price': 2000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27505522_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 60, 'catalog_id': 3, 'size': '8-10', 'color': 'Yellow', 'description': 'Comfortable shorts for kids'},
        {'name': 'Leather Belt', 'price': 2000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/9392092_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 80, 'catalog_id': 4, 'size': 'Adjustable', 'color': 'Brown', 'description': 'Genuine leather belt'},
        {'name': 'Sunglasses', 'price': 1500, 'image_path': 'https://shopzetu.com/cdn/shop/products/9foSr4GFhv-493607_900x.jpg?v=1707901693', 'quantity': 100, 'catalog_id': 4, 'size': 'N/A', 'color': 'Black', 'description': 'Stylish sunglasses'},
        {'name': 'Running Shoes', 'price': 3500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/3/optimized/27497253_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp', 'quantity': 40, 'catalog_id': 5, 'size': '10', 'color': 'White', 'description': 'Comfortable running shoes'},
        {'name': 'Formal Loafers', 'price': 5000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/5/optimized/1155215_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 20, 'catalog_id': 5, 'size': '9', 'color': 'Black', 'description': 'Elegant loafers for formal occasions'},
        {'name': 'Business Suit', 'price': 5000, 'image_path': 'https://images.hugoboss.com/is/image/boss/hbeu50528162_072_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1723214764000&wid=1200&hei=1818&fmt=webp', 'quantity': 50, 'catalog_id': 6, 'size': '40', 'color': 'Navy Blue', 'description': 'Professional business suit'},
        {'name': 'Dress Shirt', 'price': 4000, 'image_path': 'https://images.hugoboss.com/is/image/boss/hbeu50461196_102_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1628642536000&wid=1200&hei=1818&fmt=webp', 'quantity': 100, 'catalog_id': 6, 'size': '16', 'color': 'White', 'description': 'Classic white dress shirt'},
        {'name': 'Polo Shirt', 'price': 3000, 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2403574_31:1x1?$$&fmt=png-alpha', 'quantity': 30, 'catalog_id': 7, 'size': 'L', 'color': 'Red', 'description': 'Casual polo shirt'},
        {'name': 'Chinos', 'price': 2500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/1/optimized/10956401_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 25, 'catalog_id': 7, 'size': '34', 'color': 'Khaki', 'description': 'Comfortable chinos for everyday wear'},
        {'name': 'Winter Jacket', 'price': 8000, 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/2128661/1.jpg?1580', 'quantity': 15, 'catalog_id': 8, 'size': 'XL', 'color': 'Black', 'description': 'Warm winter jacket for outdoor activities'},
        {'name': 'Backpack', 'price': 4000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/11974332_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 20, 'catalog_id': 8, 'size': 'One Size', 'color': 'Green', 'description': 'Durable backpack for all your outdoor needs'},
        {'name': 'Basketball Jersey', 'price': 3000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27913182_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 10, 'catalog_id': 9, 'size': 'L', 'color': 'Blue', 'description': 'High-quality basketball jersey'},
        {'name': 'Track Pants', 'price': 2500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/1/optimized/25394481_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 15, 'catalog_id': 9, 'size': 'M', 'color': 'Grey', 'description': 'Comfortable track pants for sports'},
        {'name': 'Swimsuit', 'price': 2000, 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/2282711/1.jpg?9209', 'quantity': 25, 'catalog_id': 10, 'size': 'M', 'color': 'Red', 'description': 'Stylish swimsuit for beach and pool'},
    ]

    with app.app_context():
        for product in products:
            db.session.add(Product(**product))
        db.session.commit()
    print("Products seeded.")

def seed_users():
    print("Seeding users...")
    users = [
        {'user_id': str(uuid.uuid4()), 'name': 'John Doe', 'username': 'johndoe', 'password': 'hashed_password_1', 'email': 'john.doe@example.com'},
        {'user_id': str(uuid.uuid4()), 'name': 'Jane Doe', 'username': 'janedoe', 'password': 'hashed_password_2', 'email': 'jane.doe@example.com'},
        {'user_id': str(uuid.uuid4()), 'name': 'Bob Smith', 'username': 'bobsmith', 'password': 'hashed_password_3', 'email': 'bob.smith@example.com'}
    ]

    with app.app_context():
        for user in users:
            if None in user.values():
                print(f"Skipping user with missing values: {user}")
                continue
            db.session.add(User(
                user_id=user['user_id'],
                name=user['name'],
                username=user['username'],
                password=user['password'],
                email=user['email']
            ))
        db.session.commit()
    print("Users seeded.")
def seed_reviews():
    print("Seeding reviews...")
    reviews = [
        {'rating': 5, 'user_id': 1, 'product_id': 1, 'comment': 'Great product!', 'date': datetime.now(timezone.utc)},
        {'rating': 4, 'user_id': 2, 'product_id': 2, 'comment': 'Good quality.', 'date': datetime.now(timezone.utc)},
        {'rating': 5, 'user_id': 3, 'product_id': 3, 'comment': 'Very satisfied.', 'date': datetime.now(timezone.utc)},
        {'rating': 3, 'user_id': 1, 'product_id': 4, 'comment': 'Not bad.', 'date': datetime.now(timezone.utc)},
        {'rating': 2, 'user_id': 2, 'product_id': 5, 'comment': 'Could be better.', 'date': datetime.now(timezone.utc)},
        {'rating': 5, 'user_id': 3, 'product_id': 6, 'comment': 'Excellent!', 'date': datetime.now(timezone.utc)},
        {'rating': 3, 'user_id': 1, 'product_id': 7, 'comment': 'Just okay.', 'date': datetime.now(timezone.utc)},
        {'rating': 5, 'user_id': 2, 'product_id': 8, 'comment': 'Love it!', 'date': datetime.now(timezone.utc)},
        {'rating': 2, 'user_id': 3, 'product_id': 9, 'comment': 'Not what I expected.', 'date': datetime.now(timezone.utc)},
        {'rating': 5, 'user_id': 1, 'product_id': 10, 'comment': 'Highly recommend.', 'date': datetime.now(timezone.utc)},
    ]

    with app.app_context():
        for review in reviews:
            db.session.add(Review(
                product_id=review['product_id'],
                user_id=review['user_id'],
                rating=review['rating'],
                comment=review['comment']
            ))
        db.session.commit()
    print("Reviews seeded.")
if __name__ == '__main__':
    clear_tables()
    seed_catalogs()
    seed_products()
    seed_users()
    seed_reviews()
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
        {'name': 'Men\'s Apparel', 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2301935_MENS_RIB_20640_Hugo_Boss:1x1?$104_desktop$&fmt=png-alpha'},
        {'name': 'Women\'s Apparel', 'image_path': 'https://i.pinimg.com/236x/69/66/cd/6966cdeb1f52d12b543a753c931ac95b.jpg'},
        {'name': 'Kids\' Apparel', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/7/optimized/28615877_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp'},
        {'name': 'Accessories', 'image_path': 'https://shopzetu.com/cdn/shop/products/9foSr4GFhv-493607_900x.jpg?v=1707901693'},
        {'name': 'Footwear', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/3/optimized/27497253_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp'},
        {'name': 'Formal Wear', 'image_path': 'https://images.hugoboss.com/is/image/boss/hbeu50528162_072_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1723214764000&wid=1200&hei=1818&fmt=webp'},
        {'name': 'Casual Wear', 'image_path': 'https://slimages.macysassets.com/is/image/MacysInc/C2403574_31:1x1?$$&fmt=png-alpha'},
        {'name': 'Outdoor Gear', 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/28/2128661/1.jpg?1580'},
        {'name': 'Sportswear', 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27913182_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp'},
        {'name': 'Swimwear', 'image_path': 'https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/80/2282711/1.jpg?9209'}
    ]
    
    with app.app_context():
        for catalog in catalogs:
            db.session.add(Catalog(**catalog))
        db.session.commit()
    print("Catalogs seeded.")

def seed_products():
    print("Seeding products...") 
    print("Seeding products...") 
    products = [
        {'name': 'Men\'s T-Shirt', 'price': 2500, 'image_path': 'https://images.pexels.com/photos/26360294/pexels-photo-26360294/free-photo-of-portrait-of-man-in-t-shirt.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 100, 'catalog_id': 1, 'size': 'L', 'color': 'Blue', 'description': 'Comfortable cotton t-shirt'},
        {'name': 'Men\'s Jeans', 'price': 2000, 'image_path': 'https://images.pexels.com/photos/26347645/pexels-photo-26347645/free-photo-of-man-sitting-in-jeans-and-shirt.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 50, 'catalog_id': 1, 'size': '32', 'color': 'Dark Blue', 'description': 'Stylish denim jeans'},
        {'name': 'Women\'s Dress', 'price': 6000, 'image_path': 'https://images.pexels.com/photos/8916600/pexels-photo-8916600.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 30, 'catalog_id': 2, 'size': 'M', 'color': 'Red', 'description': 'Elegant evening dress'},
        {'name': 'Women\'s Skirt', 'price': 3500, 'image_path': 'https://images.pexels.com/photos/27383322/pexels-photo-27383322/free-photo-of-model-in-yellow-top-and-denim-skirt.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 40, 'catalog_id': 2, 'size': 'S', 'color': 'Black', 'description': 'Trendy skirt'},
        {'name': 'Kids\' Hoodie', 'price': 3000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/7/optimized/28615877_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 70, 'catalog_id': 3, 'size': '10-12', 'color': 'Green', 'description': 'Warm and cozy hoodie'},
        {'name': 'Kids\' Shorts', 'price': 2000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27505522_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 60, 'catalog_id': 3, 'size': '8-10', 'color': 'Yellow', 'description': 'Comfortable shorts for kids'},
        {'name': 'Leather Belt', 'price': 2000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/9392092_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 80, 'catalog_id': 4, 'size': 'Adjustable', 'color': 'Brown', 'description': 'Genuine leather belt'},
        {'name': 'Sunglasses', 'price': 1500, 'image_path': 'https://shopzetu.com/cdn/shop/products/9foSr4GFhv-493607_900x.jpg?v=1707901693', 'quantity': 100, 'catalog_id': 4, 'size': 'N/A', 'color': 'Black', 'description': 'Stylish sunglasses'},
        {'name': 'Running Shoes', 'price': 3500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/3/optimized/27497253_fpx.tif?op_sharpen=1&wid=1200&fit=fit,1&$filtersm$&fmt=webp', 'quantity': 40, 'catalog_id': 5, 'size': '10', 'color': 'White', 'description': 'Comfortable running shoes'},
        {'name': 'Formal Loafers', 'price': 5000, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/5/optimized/1155215_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 20, 'catalog_id': 5, 'size': '9', 'color': 'Black', 'description': 'Elegant loafers for formal occasions'},
        {'name': 'Business Suit', 'price': 5000, 'image_path': 'https://images.hugoboss.com/is/image/boss/hbeu50528162_072_300?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1723214764000&wid=1200&hei=1818&fmt=webp', 'quantity': 15, 'catalog_id': 6, 'size': 'L', 'color': 'Gray', 'description': 'Professional business suit'},
        {'name': 'Evening Gown', 'price': 4500, 'image_path': 'https://images.pexels.com/photos/16101853/pexels-photo-16101853/free-photo-of-female-model-wearing-a-green-dress-posing-against-a-wall.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 10, 'catalog_id': 6, 'size': 'M', 'color': 'Gold', 'description': 'Elegant evening gown'},
        {'name': 'Casual Shirt', 'price': 2800, 'image_path': 'https://images.pexels.com/photos/13887064/pexels-photo-13887064.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 90, 'catalog_id': 7, 'size': 'M', 'color': 'Light Blue', 'description': 'Relaxed casual shirt'},
        {'name': 'Cargo Pants', 'price': 4500, 'image_path': 'https://images.pexels.com/photos/26425708/pexels-photo-26425708/free-photo-of-beautiful-smiling-woman-posing.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 50, 'catalog_id': 7, 'size': '34', 'color': 'Khaki', 'description': 'Comfortable cargo pants'},
        {'name': 'Rain Jacket', 'price': 2800, 'image_path': 'https://images.pexels.com/photos/12581576/pexels-photo-12581576.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 25, 'catalog_id': 8, 'size': 'L', 'color': 'Orange', 'description': 'Durable rain jacket'},
        {'name': 'Fleece Vest', 'price': 4200, 'image_path': 'https://images.pexels.com/photos/6318276/pexels-photo-6318276.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 30, 'catalog_id': 8, 'size': 'M', 'color': 'Navy', 'description': 'Warm fleece vest'},
        {'name': 'Gym Shorts', 'price': 2200, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/2/optimized/27913182_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 60, 'catalog_id': 9, 'size': 'L', 'color': 'Gray', 'description': 'Breathable gym shorts'},
        {'name': 'Yoga Pants', 'price': 3500, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/3/optimized/25200283_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 40, 'catalog_id': 9, 'size': 'S', 'color': 'Black', 'description': 'Flexible yoga pants'},
        {'name': 'Formal Tie', 'price': 1800, 'image_path': 'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/11464914_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1&fmt=webp', 'quantity': 75, 'catalog_id': 10, 'size': 'N/A', 'color': 'Red', 'description': 'Classic formal tie'},
        {'name': 'swimsuit', 'price': 2500, 'image_path': 'https://images.pexels.com/photos/3722173/pexels-photo-3722173.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 30, 'catalog_id': 11, 'size': 'M', 'color': 'black', 'description': 'beautiful swimwear'},
        {'name': 'Leather Gloves', 'price': 2000, 'image_path': 'https://images.pexels.com/photos/45057/pexels-photo-45057.jpeg?auto=compress&cs=tinysrgb&w=600', 'quantity': 50, 'catalog_id': 10, 'size': 'M', 'color': 'Black', 'description': 'Warm leather gloves'}
    ]


    with app.app_context():
        for product in products:
            db.session.add(Product(**product))
        db.session.commit()

if __name__ == "__main__":
    seed_products()
    print("Products seeded successfully.")
if __name__ == "__main__":
    seed_products()
    print("Products seeded successfully.")
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
    {'rating': 5, 'comment': 'Excellent product!', 'user_id': 1,'name':'Michael Jackson', 'product_id': 1},
    {'rating': 4, 'comment': 'Very good, but could be improved.', 'user_id': 2,'name':'Hamide Mstafa', 'product_id': 2},
    {'rating': 3, 'comment': 'Average quality.', 'user_id': 3,'name':'Lauryn Hill', 'product_id': 3},
    {'rating': 2, 'comment': 'Not what I expected.', 'user_id': 4,'name':'Mac de Marco', 'product_id': 4},
    {'rating': 5, 'comment': 'Great value for money!', 'user_id': 5,'name':'Steve Lacy', 'product_id': 5},
    {'rating': 4, 'comment': 'Fast shipping and good packaging.', 'user_id': 6,'name':'Bob Marley', 'product_id': 6},
    {'rating': 3, 'comment': 'The product is okay.', 'user_id': 7,'name':'Sage', 'product_id': 7},
    {'rating': 2, 'comment': 'The quality could be better.', 'user_id': 8,'name':'Peter Junior', 'product_id': 8},
    {'rating': 1, 'comment': 'Very poor quality.', 'user_id': 9,'name':'John Doe', 'product_id': 9},
    {'rating': 5, 'comment': 'Highly recommend this product!', 'user_id': 10,'name':'Ty Lil', 'product_id': 10}
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
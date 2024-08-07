from flask import Blueprint, request, jsonify
from app.models import Product
from app.extensions import db

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.as_dict() for product in products])

@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.as_dict())

@product_bp.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    product = Product(
        name=data['name'],
        price=data['price'],
        image_path=data.get('image_path'),
        quantity=data['quantity'],
        catalog_id=data['catalog_id'],
        size=data.get('size'),
        color=data.get('color'),
        description=data.get('description')
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.as_dict()), 201

@product_bp.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.get_or_404(id)
    product.name = data['name']
    product.price = data['price']
    product.image_path = data.get('image_path')
    product.quantity = data['quantity']
    product.catalog_id = data['catalog_id']
    product.size = data.get('size')
    product.color = data.get('color')
    product.description = data.get('description')
    db.session.commit()
    return jsonify(product.as_dict())

@product_bp.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return '', 204

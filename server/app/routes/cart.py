from flask import Blueprint, request, jsonify
from app.models import Cart
from app.extensions import db

cart_bp = Blueprint('cart_bp', __name__)

@cart_bp.route('/carts', methods=['GET'])
def get_carts():
    carts = Cart.query.all()
    return jsonify([cart.as_dict() for cart in carts])

@cart_bp.route('/carts/<int:id>', methods=['GET'])
def get_cart(id):
    cart = Cart.query.get_or_404(id)
    return jsonify(cart.as_dict())

@cart_bp.route('/carts', methods=['POST'])
def create_cart():
    data = request.get_json()
    cart = Cart(
        user_id=data['user_id'],
        product_id=data['product_id']
    )
    db.session.add(cart)
    db.session.commit()
    return jsonify(cart.as_dict()), 201

@cart_bp.route('/carts/<int:id>', methods=['PUT'])
def update_cart(id):
    data = request.get_json()
    cart = Cart.query.get_or_404(id)
    cart.user_id = data['user_id']
    cart.product_id = data['product_id']
    db.session.commit()
    return jsonify(cart.as_dict())

@cart_bp.route('/carts/<int:id>', methods=['DELETE'])
def delete_cart(id):
    cart = Cart.query.get_or_404(id)
    db.session.delete(cart)
    db.session.commit()
    return '', 204

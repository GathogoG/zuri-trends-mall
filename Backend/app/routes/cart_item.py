from flask import Blueprint, request, jsonify
from app.models import CartItem
from app.extensions import db

cart_item_bp = Blueprint('cart_item_bp', __name__)

@cart_item_bp.route('/cart_items', methods=['GET'])
def get_cart_items():
    cart_items = CartItem.query.all()
    return jsonify([cart_item.as_dict() for cart_item in cart_items])

@cart_item_bp.route('/cart_items/<int:id>', methods=['GET'])
def get_cart_item(id):
    cart_item = CartItem.query.get_or_404(id)
    return jsonify(cart_item.as_dict())

@cart_item_bp.route('/cart_items', methods=['POST'])
def create_cart_item():
    data = request.get_json()
    cart_item = CartItem(
        cart_id=data['cart_id'],
        product_id=data['product_id'],
        quantity=data['quantity']
    )
    db.session.add(cart_item)
    db.session.commit()
    return jsonify(cart_item.as_dict()), 201

@cart_item_bp.route('/cart_items/<int:id>', methods=['PUT'])
def update_cart_item(id):
    data = request.get_json()
    cart_item = CartItem.query.get_or_404(id)
    cart_item.cart_id = data['cart_id']
    cart_item.product_id = data['product_id']
    cart_item.quantity = data['quantity']
    db.session.commit()
    return jsonify(cart_item.as_dict())

@cart_item_bp.route('/cart_items/<int:id>', methods=['DELETE'])
def delete_cart_item(id):
    cart_item = CartItem.query.get_or_404(id)
    db.session.delete(cart_item)
    db.session.commit()
    return '', 204

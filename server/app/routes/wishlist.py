from flask import Blueprint, request, jsonify
from app.models import Wishlist
from app.extensions import db

wishlist_bp = Blueprint('wishlist_bp', __name__)

@wishlist_bp.route('/wishlists', methods=['GET'])
def get_wishlists():
    wishlists = Wishlist.query.all()
    return jsonify([wishlist.as_dict() for wishlist in wishlists])

@wishlist_bp.route('/wishlists/<int:id>', methods=['GET'])
def get_wishlist(id):
    wishlist = Wishlist.query.get_or_404(id)
    return jsonify(wishlist.as_dict())

@wishlist_bp.route('/wishlists', methods=['POST'])
def create_wishlist():
    data = request.get_json()
    wishlist = Wishlist(
        user_id=data['user_id'],
        product_id=data['product_id']
    )
    db.session.add(wishlist)
    db.session.commit()
    return jsonify(wishlist.as_dict()), 201

@wishlist_bp.route('/wishlists/<int:id>', methods=['PUT'])
def update_wishlist(id):
    data = request.get_json()
    wishlist = Wishlist.query.get_or_404(id)
    wishlist.user_id = data['user_id']
    wishlist.product_id = data['product_id']
    db.session.commit()
    return jsonify(wishlist.as_dict())

@wishlist_bp.route('/wishlists/<int:id>', methods=['DELETE'])
def delete_wishlist(id):
    wishlist = Wishlist.query.get_or_404(id)
    db.session.delete(wishlist)
    db.session.commit()
    return '', 204

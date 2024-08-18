from flask import Blueprint, request, jsonify
from server.app.models import Wishlist
from server.app.extensions import db

wishlist_bp = Blueprint('wishlist_bp', __name__)

@wishlist_bp.route('/wishlists', methods=['GET'])
def get_wishlists():
    try:
        wishlists = Wishlist.query.all()
        return jsonify([wishlist.as_dict() for wishlist in wishlists])
    except Exception as e:
        print(f"Error fetching wishlists: {e}")
        return jsonify({'error': 'Failed to fetch wishlists'}), 500

@wishlist_bp.route('/wishlists/<int:id>', methods=['GET'])
def get_wishlist(id):
    try:
        wishlist = Wishlist.query.get_or_404(id)
        return jsonify(wishlist.as_dict())
    except Exception as e:
        print(f"Error fetching wishlist with id {id}: {e}")
        return jsonify({'error': 'Failed to fetch wishlist'}), 500

@wishlist_bp.route('/wishlists', methods=['POST'])
def create_wishlist():
    data = request.get_json()
    print(f"Received data: {data}")  # Debugging line

    if not data or not all(key in data for key in ['user_id', 'product_id']):
        return jsonify({'error': 'Invalid input'}), 400

    wishlist = Wishlist(
        user_id=data['user_id'],
        product_id=data['product_id']
    )
    
    try:
        db.session.add(wishlist)
        db.session.commit()
        return jsonify(wishlist.as_dict()), 201
    except Exception as e:
        print(f"Error creating wishlist: {e}")  # Add debugging information
        db.session.rollback()
        return jsonify({'error': 'Failed to create wishlist item'}), 500

@wishlist_bp.route('/wishlists/<int:id>', methods=['PUT'])
def update_wishlist(id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    try:
        wishlist = Wishlist.query.get_or_404(id)
        wishlist.user_id = data.get('user_id', wishlist.user_id)
        wishlist.product_id = data.get('product_id', wishlist.product_id)
        db.session.commit()
        return jsonify(wishlist.as_dict())
    except Exception as e:
        print(f"Error updating wishlist with id {id}: {e}")  # Add debugging information
        db.session.rollback()
        return jsonify({'error': 'Failed to update wishlist'}), 500

@wishlist_bp.route('/wishlists/<int:id>', methods=['DELETE'])
def delete_wishlist(id):
    try:
        wishlist = Wishlist.query.get_or_404(id)
        db.session.delete(wishlist)
        db.session.commit()
        return '', 204
    except Exception as e:
        print(f"Error deleting wishlist with id {id}: {e}")  # Add debugging information
        db.session.rollback()
        return jsonify({'error': 'Failed to delete wishlist'}), 500

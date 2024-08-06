from flask import Blueprint, request, jsonify
from app.models import Review
from app.extensions import db

review_bp = Blueprint('review_bp', __name__)

@review_bp.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([review.as_dict() for review in reviews])

@review_bp.route('/reviews/<int:id>', methods=['GET'])
def get_review(id):
    review = Review.query.get_or_404(id)
    return jsonify(review.as_dict())

@review_bp.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review = Review(
        product_id=data['product_id'],
        user_id=data['user_id'],
        rating=data['rating'],
        comment=data.get('comment')
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.as_dict()), 201

@review_bp.route('/reviews/<int:id>', methods=['PUT'])
def update_review(id):
    data = request.get_json()
    review = Review.query.get_or_404(id)
    review.product_id = data['product_id']
    review.user_id = data['user_id']
    review.rating = data['rating']
    review.comment = data.get('comment')
    db.session.commit()
    return jsonify(review.as_dict())

@review_bp.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return '', 204

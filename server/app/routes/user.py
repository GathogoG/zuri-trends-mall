from flask import Blueprint, request, jsonify
from server.app.extensions import db
from server.app.models import User

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.as_dict() for user in users])

@user_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.as_dict())

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not all(key in data for key in ['name', 'password', 'email']):
        return jsonify({'error': 'Invalid input'}), 400

    user = User(
        name=data['name'],
        password=data['password'],
        email=data['email']
    )
    try:
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify(user.as_dict()), 201

@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    user = User.query.get_or_404(id)
    user.name = data.get('name', user.name)
    user.password = data.get('password', user.password)
    user.email = data.get('email', user.email)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return jsonify(user.as_dict())

@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    return '', 204

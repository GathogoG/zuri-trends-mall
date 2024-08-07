from flask import Blueprint, request, jsonify
from server.app.models import User
from server.app.extensions import db
from server.app.app import db 

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
    user = User(
        name=data['name'],
        password=data['password'],
        email=data['email']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.as_dict()), 201

@user_bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.name = data['name']
    user.password = data['password']
    user.email = data['email']
    db.session.commit()
    return jsonify(user.as_dict())

@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

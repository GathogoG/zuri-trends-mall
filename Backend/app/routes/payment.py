from flask import Blueprint, request, jsonify
from app.models import Payment
from app.extensions import db

payment_bp = Blueprint('payment_bp', __name__)

@payment_bp.route('/payments', methods=['GET'])
def get_payments():
    payments = Payment.query.all()
    return jsonify([payment.as_dict() for payment in payments])

@payment_bp.route('/payments/<int:id>', methods=['GET'])
def get_payment(id):
    payment = Payment.query.get_or_404(id)
    return jsonify(payment.as_dict())

@payment_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    payment = Payment(
        user_id=data['user_id'],
        amount=data['amount'],
        payment_method=data['payment_method'],
        status=data['status']
    )
    db.session.add(payment)
    db.session.commit()
    return jsonify(payment.as_dict()), 201

@payment_bp.route('/payments/<int:id>', methods=['PUT'])
def update_payment(id):
    data = request.get_json()
    payment = Payment.query.get_or_404(id)
    payment.user_id = data['user_id']
    payment.amount = data['amount']
    payment.payment_method = data['payment_method']
    payment.status = data['status']
    db.session.commit()
    return jsonify(payment.as_dict())

@payment_bp.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    payment = Payment.query.get_or_404(id)
    db.session.delete(payment)
    db.session.commit()
    return '', 204

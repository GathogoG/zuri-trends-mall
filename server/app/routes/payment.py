from flask import Blueprint, request, jsonify
from server.app.models import Payment
from server.app.extensions import db
from server.app.app import db 
from requests.auth import HTTPBasicAuth
import requests
import base64
import json
from datetime import datetime

payment_bp = Blueprint('payment_bp', __name__)


CONSUMER_KEY = 'yty83hjgw0EEGrxoV9j3AAQxVJL2hmjcvYMPxsjXH2ghL8AF'
CONSUMER_SECRET = 'asJhwuTM0XXBWyTJwCWgPWITuucxPoDkNiQWfeTQGgjGraLyl5KO6Ay93sxrSwIm'
BUSINESS_SHORT_CODE = '174379'
LIPA_NA_MPESA_ONLINE_PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
CALLBACK_URL = 'https://mydomain.com/path'
phonenumber ='0115743312'


def get_access_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    json_response = response.json()
    return json_response['access_token']


def lipa_na_mpesa_online(amount, phone_number, transaction_id):
    access_token = get_access_token()
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((BUSINESS_SHORT_CODE + LIPA_NA_MPESA_ONLINE_PASSKEY + timestamp).encode()).decode('utf-8')
    payload = {
        "BusinessShortCode": BUSINESS_SHORT_CODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": BUSINESS_SHORT_CODE,
        "PhoneNumber": phone_number,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": transaction_id,  
        "TransactionDesc": "Payment for goods"
    }
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    return response.json()


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
    amount = data['amount']
    phone_number = data['phone_number']
    transaction_id = data['transaction_id']  
    
 
    response = lipa_na_mpesa_online(amount, phone_number, transaction_id)
    payment_status = 'Pending'
    if response['ResponseCode'] == '0':
        payment_status = 'Successful'
    else:
        payment_status = 'Failed'
    
    payment = Payment(
        user_id=data['user_id'],
        amount=amount,
        transaction_id=transaction_id,
        status=payment_status
    )
    db.session.add(payment)
    db.session.commit()

    return jsonify({
        'payment': payment.as_dict(),
        'mpesa_response': response
    }), 201


@payment_bp.route('/payments/<int:id>', methods=['PUT'])
def update_payment(id):
    data = request.get_json()
    payment = Payment.query.get_or_404(id)
    payment.user_id = data['user_id']
    payment.amount = data['amount']
    payment.transaction_id = data['transaction_id']
    payment.status = data['status']
    db.session.commit()
    return jsonify(payment.as_dict())


@payment_bp.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    payment = Payment.query.get_or_404(id)
    db.session.delete(payment)
    db.session.commit()
    return '', 204

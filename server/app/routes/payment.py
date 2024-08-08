from flask import Blueprint, request, jsonify
<<<<<<< HEAD
<<<<<<< HEAD
from server.app.models import Payment
from server.app.extensions import db
=======
from app.models import Payment
from app.extensions import db
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======
from app.models import Payment
from app.extensions import db
>>>>>>> b7416a3 (made changes on payment.py  on main)
from requests.auth import HTTPBasicAuth
import requests
import base64
import json
from datetime import datetime
<<<<<<< HEAD
<<<<<<< HEAD
import uuid
=======
import random
import string
>>>>>>> f095982 (Made changes to the payment route)

payment_bp = Blueprint('payment_bp', __name__)

<<<<<<< HEAD
=======

>>>>>>> b7416a3 (made changes on payment.py  on main)
=======

payment_bp = Blueprint('payment_bp', __name__)


>>>>>>> b7416a3 (made changes on payment.py  on main)
CONSUMER_KEY = 'yty83hjgw0EEGrxoV9j3AAQxVJL2hmjcvYMPxsjXH2ghL8AF'
CONSUMER_SECRET = 'asJhwuTM0XXBWyTJwCWgPWITuucxPoDkNiQWfeTQGgjGraLyl5KO6Ay93sxrSwIm'
BUSINESS_SHORT_CODE = '174379'
LIPA_NA_MPESA_ONLINE_PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
<<<<<<< HEAD
<<<<<<< HEAD
CALLBACK_URL = 'https://yourdomain.com/path'
<<<<<<< HEAD
COMPANY_NAME = 'Zuri-Trends'
=======
COMPANY_NAME = 'Zuri-Trends' 

def generate_transaction_id(length=12):
    """Generate a random transaction ID."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))
>>>>>>> f095982 (Made changes to the payment route)

def get_access_token():
    try:
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
        response.raise_for_status()
        json_response = response.json()
        return json_response['access_token']
    except requests.RequestException as e:
<<<<<<< HEAD
        return jsonify({'error': str(e)}), 500

def lipa_na_mpesa_online(amount, phone_number, transaction_id):
    access_token = get_access_token()
    if isinstance(access_token, dict):  
        return access_token

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
CALLBACK_URL = 'https://mydomain.com/path'
phonenumber ='0115743312'


def get_access_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    json_response = response.json()
    return json_response['access_token']


def lipa_na_mpesa_online(amount, phone_number, transaction_id):
    access_token = get_access_token()
<<<<<<< HEAD
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======
=======
        return {'error': str(e)}, 500

>>>>>>> f095982 (Made changes to the payment route)
def lipa_na_mpesa_online(amount, phone_number):
    access_token_response = get_access_token()
    if isinstance(access_token_response, dict) and 'error' in access_token_response:
        return access_token_response
    
    access_token = access_token_response
<<<<<<< HEAD
>>>>>>> f095982 (Made changes to the payment route)
=======
>>>>>>> fb7a56d (Made changes to payment route to add random generation of user ID and Transaction ID)
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======
>>>>>>> f095982 (Made changes to the payment route)
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((BUSINESS_SHORT_CODE + LIPA_NA_MPESA_ONLINE_PASSKEY + timestamp).encode()).decode('utf-8')
    
    transaction_id = generate_transaction_id()  

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
<<<<<<< HEAD
<<<<<<< HEAD
        "AccountReference": transaction_id,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        "AccountReference": transaction_id,  
>>>>>>> b7416a3 (made changes on payment.py  on main)
        "TransactionDesc": "Payment for goods"
=======
        "TransactionDesc": f"Payment to {COMPANY_NAME} - ID: {transaction_id}, Amount: KSh {amount}"
>>>>>>> f095982 (Made changes to the payment route)
=======
        "TransactionDesc": f"Payment to {COMPANY_NAME} for Transaction ID {transaction_id} and Amount KSh {amount}"
>>>>>>> fb7a56d (Made changes to payment route to add random generation of user ID and Transaction ID)
=======
        "AccountReference": transaction_id,  
        "TransactionDesc": "Payment for goods"
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======
        "TransactionDesc": f"Payment to {COMPANY_NAME} - ID: {transaction_id}, Amount: KSh {amount}"
>>>>>>> f095982 (Made changes to the payment route)
    }
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    
>>>>>>> f095982 (Made changes to the payment route)
=======
>>>>>>> fb7a56d (Made changes to payment route to add random generation of user ID and Transaction ID)
=======
    
>>>>>>> f095982 (Made changes to the payment route)
    try:
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {'error': str(e)}
=======
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    return response.json()

<<<<<<< HEAD
>>>>>>> b7416a3 (made changes on payment.py  on main)

<<<<<<< HEAD
=======

>>>>>>> b7416a3 (made changes on payment.py  on main)
@payment_bp.route('/payments', methods=['GET'])
def get_payments():
    payments = Payment.query.all()
    return jsonify([payment.as_dict() for payment in payments])

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> b7416a3 (made changes on payment.py  on main)
=======

>>>>>>> b7416a3 (made changes on payment.py  on main)
@payment_bp.route('/payments/<int:id>', methods=['GET'])
def get_payment(id):
    payment = Payment.query.get_or_404(id)
    return jsonify(payment.as_dict())

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fb7a56d (Made changes to payment route to add random generation of user ID and Transaction ID)
@payment_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
<<<<<<< HEAD
    if not data or 'amount' not in data or 'phone_number' not in data:
=======
    if not data or not all(key in data for key in ['amount', 'phone_number', 'user_id']):
>>>>>>> f095982 (Made changes to the payment route)
        return jsonify({'error': 'Invalid input'}), 400

   
    user_id = str(uuid.uuid4())

    amount = data['amount']
    phone_number = data['phone_number']
<<<<<<< HEAD
    transaction_id = str(uuid.uuid4())  

    response = lipa_na_mpesa_online(amount, phone_number, transaction_id)
=======
    
    response = lipa_na_mpesa_online(amount, phone_number)
>>>>>>> f095982 (Made changes to the payment route)
    if 'error' in response:
        return jsonify(response), 500

    payment_status = 'Pending'
    if response.get('ResponseCode') == '0':
=======
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)

@payment_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    amount = data['amount']
    phone_number = data['phone_number']
    transaction_id = data['transaction_id']  
    
 
    response = lipa_na_mpesa_online(amount, phone_number, transaction_id)
    payment_status = 'Pending'
    if response['ResponseCode'] == '0':
<<<<<<< HEAD
>>>>>>> b7416a3 (made changes on payment.py  on main)
        payment_status = 'Successful'
    else:
        payment_status = 'Failed'

    payment = Payment(
        user_id=user_id,
=======
        payment_status = 'Successful'
    else:
        payment_status = 'Failed'
    

    transaction_id = response.get('CheckoutRequestID', generate_transaction_id())
    
    payment = Payment(
        user_id=data['user_id'],
>>>>>>> b7416a3 (made changes on payment.py  on main)
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
<<<<<<< HEAD
<<<<<<< HEAD

<<<<<<< HEAD
=======

>>>>>>> b7416a3 (made changes on payment.py  on main)
=======


>>>>>>> b7416a3 (made changes on payment.py  on main)
@payment_bp.route('/payments/<int:id>', methods=['PUT'])
def update_payment(id):
    data = request.get_json()
    payment = Payment.query.get_or_404(id)
<<<<<<< HEAD
<<<<<<< HEAD
    
    if 'user_id' in data:
        payment.user_id = data['user_id']
    if 'amount' in data:
        payment.amount = data['amount']
    if 'transaction_id' in data:
        payment.transaction_id = data['transaction_id']
    if 'status' in data:
        payment.status = data['status']
    
    db.session.commit()
    return jsonify(payment.as_dict())

=======
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
    payment.user_id = data['user_id']
    payment.amount = data['amount']
    payment.transaction_id = data['transaction_id']
    payment.status = data['status']
    db.session.commit()
    return jsonify(payment.as_dict())


<<<<<<< HEAD
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
@payment_bp.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    payment = Payment.query.get_or_404(id)
    db.session.delete(payment)
    db.session.commit()
    return '', 204
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> fb7a56d (Made changes to payment route to add random generation of user ID and Transaction ID)
=======
>>>>>>> b7416a3 (made changes on payment.py  on main)
=======

>>>>>>> f095982 (Made changes to the payment route)

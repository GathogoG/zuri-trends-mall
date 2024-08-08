from flask import Blueprint, request, jsonify
from server.app.models import Payment
from server.app.extensions import db
from requests.auth import HTTPBasicAuth
import requests
import base64
import json
from datetime import datetime
import uuid

payment_bp = Blueprint('payment_bp', __name__)

CONSUMER_KEY = 'yty83hjgw0EEGrxoV9j3AAQxVJL2hmjcvYMPxsjXH2ghL8AF'
CONSUMER_SECRET = 'asJhwuTM0XXBWyTJwCWgPWITuucxPoDkNiQWfeTQGgjGraLyl5KO6Ay93sxrSwIm'
BUSINESS_SHORT_CODE = '174379'
LIPA_NA_MPESA_ONLINE_PASSKEY = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
CALLBACK_URL = 'https://yourdomain.com/path'
COMPANY_NAME = 'Zuri-Trends'

def get_access_token():
    try:
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
        response = requests.get(url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
        response.raise_for_status()
        json_response = response.json()
        return json_response['access_token']
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

def lipa_na_mpesa_online(amount, phone_number, transaction_id):
    access_token = get_access_token()
    if isinstance(access_token, dict):  
        return access_token

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
        "TransactionDesc": f"Payment to {COMPANY_NAME} for Transaction ID {transaction_id} and Amount KSh {amount}"
    }
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    try:
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {'error': str(e)}

@payment_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    if not data or 'amount' not in data or 'phone_number' not in data:
        return jsonify({'error': 'Invalid input'}), 400

   
    user_id = str(uuid.uuid4())

    amount = data['amount']
    phone_number = data['phone_number']
    transaction_id = str(uuid.uuid4())  

    response = lipa_na_mpesa_online(amount, phone_number, transaction_id)
    if 'error' in response:
        return jsonify(response), 500

    payment_status = 'Pending'
    if response.get('ResponseCode') == '0':
        payment_status = 'Successful'
    else:
        payment_status = 'Failed'

    payment = Payment(
        user_id=user_id,
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

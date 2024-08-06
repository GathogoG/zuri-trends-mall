from flask import Blueprint, jsonify
from .models import Catalog, Product, User, Review, Wishlist, Cart, CartItem, Payment
from .extensions import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "Welcome to the E-commerce Clothing Store API"})

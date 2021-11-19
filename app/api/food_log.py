from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Food_Log, Breakfast, Lunch, Dinner

food_log_routes = Blueprint('food_log_routes', __name__)

# Get Food_log
@food_log_routes.route('/<int:user_id>', methods=['GET'])
def get_food_log(user_id):
    user_food = Food_Log.query.filter_by(user_id=user_id).all()

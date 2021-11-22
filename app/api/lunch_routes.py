from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Lunch

lunch_routes = Blueprint('lunch_routes', __name__)

# Get Breakfast
@lunch_routes.route('/<int:food_log_id>')
# @login_required
def getLunch(food_log_id):
    lunch = Lunch.query.filter_by(foodlog_id=food_log_id).first()
    # print('\n\n\n\n', lunch, '\n\n\n\n')
    return {'user_lunch': lunch.to_dict()}

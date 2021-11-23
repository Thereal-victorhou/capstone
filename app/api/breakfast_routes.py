from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Breakfast

breakfast_routes = Blueprint('breakfast_routes', __name__)

# Get Breakfast
@breakfast_routes.route('/<int:food_log_id>')
# @login_required
def getBreakfast(food_log_id):
    breakfast = Breakfast.query.filter_by(foodlog_id=food_log_id).first()
    if not breakfast:
        return {'breakfast': 'False'}
    return {'user_breakfast': breakfast.to_dict()}

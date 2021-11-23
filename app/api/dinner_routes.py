from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Dinner

dinner_routes = Blueprint('dinner_routes', __name__)

# Get Breakfast
@dinner_routes.route('/<int:food_log_id>')
# @login_required
def getDinner(food_log_id):
    dinner = Dinner.query.filter_by(foodlog_id=food_log_id).first()
    # print('\n\n\n\n', dinner.to_dict(), '\n\n\n\n')
    
    return {'user_dinner': dinner.to_dict()}

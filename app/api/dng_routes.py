from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Daily_Nutrition_Goals

# dng == daily nutrition goals
dng_routes = Blueprint('daily-nutrition-goals', __name__)

@dng_routes.route('/<int:id>', methods=['GET'])
# @login_required
def get_goals():
    goals = Daily_Nutrition_Goals.query.filter_by(user_id=user_id).all()

    return {'daily_goals': [goal.to_dict() for goal in goals]}

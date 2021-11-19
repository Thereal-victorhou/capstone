from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Daily_Nutrition_Goals
from datetime import datetime

# dng == daily nutrition goals
dng_routes = Blueprint('daily-nutrition-goals', __name__)

# Get dng for current user
@dng_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_goals(user_id):
    goals = Daily_Nutrition_Goals.query.filter_by(user_id=user_id).all()
    if not goals:
        return {"daily_goals": "False"}
    return {'daily_goals': [goal.to_dict() for goal in goals]}

# Update dng for current user
@dng_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def change_goals(user_id):
    # calories, carbohydrates, fat, protein, user_id = itemgetter("calories", "carbohydrates", "fat", "protein")(request.json)
    print("\n\n\n\n inside put route \n\n\n\n")
    updated_goal = request.json

    current_goal = Daily_Nutrition_Goals.query.filter_by(user_id=user_id).first()

    # print("\n\n\n\n", request.json, "\n\n\n\n")

    # check to see if goal already exist
    if current_goal:
        current_goal.calories = request.json["calories"]
        current_goal.carbohydrates = request.json["carbohydrates"]
        current_goal.fat = request.json["fat"]
        current_goal.protein = request.json["protein"]
        current_goal.created_at = datetime.now()
        db.session.commit()

    #return goals
    goals = Daily_Nutrition_Goals.query.filter_by(user_id=user_id).first()
    # print("\n\n\n", goals.to_dict(), "\n\n\n")
    return {'daily_goals': goals.to_dict()}

# Creating a new dng for current user
@dng_routes.route('/', methods=['POST'])
@login_required
def create_goals():
    new_goal = request.json
    goal_check = Daily_Nutrition_Goals.query.filter_by(user_id=new_goal["user_id"]).first()
    # Check to see if user already has a dng
    if not goal_check:
        dng = Daily_Nutrition_Goals(
            calories=new_goal["calories"],
            carbohydrates=new_goal["carbohydrates"],
            fat=new_goal["fat"],
            protein=new_goal["protein"],
            user_id=new_goal["user_id"],
            created_at=datetime.now())

        db.session.add(dng)
        db.session.commit()

    #return goals
    goals = Daily_Nutrition_Goals.query.filter_by(user_id=new_goal["user_id"]).first()
    # print("\n\n\n", goals.to_dict(), "\n\n\n")
    return {'daily_goals': goals.to_dict()}

# Deleting a user's dng
@dng_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_dng(user_id):
    Daily_Nutrition_Goals.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return {'daily_goals': {"userId": user_id, "msg": "User does not currently have a Daily Nutrition Goal"}}

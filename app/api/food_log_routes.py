from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Food_Log, Breakfast, Lunch, Dinner
from datetime import datetime


food_log_routes = Blueprint('food_log_routes', __name__)


# Get Food_log
@food_log_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
def get_food_log(user_id):

    user_breakfast = list(db.session.query(Breakfast).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_lunch = list(db.session.query(Lunch).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_dinner = list(db.session.query(Dinner).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())

    breakfast = [breakfast.to_dict() for breakfast in user_breakfast]
    lunch = [lunch.to_dict() for lunch in user_lunch]
    dinner = [dinner.to_dict() for dinner in user_dinner]

    if not user_breakfast:
        return {'user_food_log': [{**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}

    if not user_lunch:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**dinner[0], **dinner[1]}]}

    if not user_dinner:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}]}

    return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}


# Create new food log
@food_log_routes.route('/<int:user_id>', methods=['POST'])
# @login_required
def new_food_log(user_id):
    new_log = request.json
    current_log = Food_Log.query.filter_by(user_id=user_id, meal=new_log['meal']).all()

    if not current_log:
        nfl = Food_Log(
            name=new_log['name'],
            meal=new_log['meal'],
            user_id=new_log['user_id'],
            created_at=datetime.now())

        db.session.add(nfl)
        db.session.commit()

    user_breakfast = list(db.session.query(Breakfast).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_lunch = list(db.session.query(Lunch).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_dinner = list(db.session.query(Dinner).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())

    breakfast = [breakfast.to_dict() for breakfast in user_breakfast]
    lunch = [lunch.to_dict() for lunch in user_lunch]
    dinner = [dinner.to_dict() for dinner in user_dinner]

    if not user_breakfast:
        return {'user_food_log': [{**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}

    if not user_lunch:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**dinner[0], **dinner[1]}]}

    if not user_dinner:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}]}

    return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}


# Update current food log
@food_log_routes.route('/<int:user_id>', methods=['PUT'])
# @login_required
def update_food_log(user_id):
    updated_log = request.json
    current_log = Food_Log.query.filter_by(user_id=user_id, meal=updated_log['meal']).first()
    # print("\n\n\n\n", request.json, "\n\n\n\n")
    # print("\n\n\n\n", current_log, "\n\n\n\n")
    if current_log:
        current_log.name = updated_log['name'],
        current_log.created_at = datetime.now()
        db.session.commit()

    user_breakfast = list(db.session.query(Breakfast).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_lunch = list(db.session.query(Lunch).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())
    user_dinner = list(db.session.query(Dinner).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).first())

    breakfast = [breakfast.to_dict() for breakfast in user_breakfast]
    lunch = [lunch.to_dict() for lunch in user_lunch]
    dinner = [dinner.to_dict() for dinner in user_dinner]

    if not user_breakfast:
        return {'user_food_log': [{**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}

    if not user_lunch:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**dinner[0], **dinner[1]}]}

    if not user_dinner:
        return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}]}

    return {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}


# delete food_log
@food_log_routes.route('/<int:user_id>', methods=['DELETE'])
# @login_required
def delete_food_log(user_id):
    food_log = Food_Log.query.filter_by(user_id=user_id).all()
    # db.session.commit()
    for log in food_log:
        if log.to_dict()['meal'] == 'breakfast':
            Breakfast.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='breakfast').delete()
            db.session.commit()

        if log.to_dict()['meal'] == 'lunch':
            Lunch.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='lunch').delete()
            db.session.commit()

        if log.to_dict()['meal'] == 'dinner':
            Dinner.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='dinner').delete()
            db.session.commit()

    return {'food-log': 'False'}

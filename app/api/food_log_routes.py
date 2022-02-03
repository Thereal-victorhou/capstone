from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Food_Log, Breakfast, Lunch, Dinner, Daily_Nutrition_Goals
from datetime import datetime


food_log_routes = Blueprint('food_log_routes', __name__)

 # Dictionary Merge Helper
def merge(tup1, tup2):
    return {**tup1.to_dict(), **tup2.to_dict()}

# Breakfast Helper
def breakfast_func(user_breakfast):
    return [merge(*args) for args in user_breakfast]
# Lunch Helper
def lunch_func(user_lunch):
    return [merge(*args) for args in user_lunch]
# Dinner Helper
def dinner_func(user_dinner):
    return [merge(*args) for args in user_dinner]


# GET one foodlog
@food_log_routes.route('/one/<int:foodlog_id>', methods=['GET'])
# @login_required
def get_one_log(foodlog_id):

    one_log = Food_Log.query.filter_by(id=foodlog_id).first()
    if one_log.to_dict()['meal'] == "breakfast":
        user_breakfast = db.session.query(Breakfast).join(Food_Log).filter_by(id=foodlog_id).add_entity(Food_Log).first()
        breList = list(user_breakfast)
        return {"selected_log": {**breList[0].to_dict(), **breList[1].to_dict()}}

    if one_log.to_dict()['meal'] == "lunch":
        user_lunch = db.session.query(Lunch).join(Food_Log).filter_by(id=foodlog_id).add_entity(Food_Log).first()
        lunList = list(user_lunch)
        return {"selected_log": {**lunList[0].to_dict(), **lunList[1].to_dict()}}

    if one_log.to_dict()['meal'] == "dinner":
        user_dinner = db.session.query(Dinner).join(Food_Log).filter_by(foodlog_id=id).add_entity(Food_Log).first()
        dinList = list(user_dinner)
        return {"selected_log": {**dinList[0].to_dict(), **dinList[1].to_dict()}}

    # return {'user_food_log': 'False'}

# GET all Food_log
@food_log_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
def get_food_log(user_id):



    user_breakfast = db.session.query(Breakfast).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).all()
    user_lunch = db.session.query(Lunch).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).all()
    user_dinner = db.session.query(Dinner).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).all()

    if not user_breakfast and not user_lunch and not user_dinner:
        # print({'user_food_log': 'False'})
        return {'user_food_log': 'False'}
    # breakfast = [breakfast.to_dict() for breakfast in list(user_breakfast)]
    # lunch = [lunch.to_dict() for lunch in list(user_lunch)]
    # dinner = [dinner.to_dict() for dinner in list(user_dinner)]

    # di = db.session.query(Dinner).join(Food_Log).filter_by(user_id=user_id).add_entity(Food_Log).all()
    # print("\n\n\n\n\n", di, "\n\n\n\n")
    # di_res = [merge(*args) for args in di]
    # print("\n\n\n\n", di_res, "\n\n\n\n")

    # Breakfast
    if not user_lunch and not user_dinner:
        return {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}]}

    # Lunch
    if not user_dinner and not user_breakfast:
        return {'user_food_log': [{"lunch": lunch_func(user_lunch)}]}

    # Dinner
    if not user_breakfast and not user_lunch:
        return {'user_food_log': [{"dinner": dinner_func(user_dinner)}]}

    # Lunch & Dinner
    if not user_breakfast:
        return {'user_food_log': [{"lunch": lunch_func(user_lunch)}, {"dinner": dinner_func(user_dinner)}]}

    # Breakfast & Dinner
    if not user_lunch:
        return {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}, {"dinner": dinner_func(user_dinner)}]}

    # Breakfast & Lunch
    if not user_dinner:
        return {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}, {"lunch": lunch_func(user_lunch)}]}

    return {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}, {"lunch": lunch_func(user_lunch)}, {"dinner": dinner_func(user_dinner)}]}


# Create new food log
@food_log_routes.route('/<int:user_id>', methods=['POST'])
# @login_required
def new_food_log(user_id):
    new_log = request.json

    # Add new entry to foodlog table
    nfl = Food_Log(
        name=new_log['name'],
        meal=new_log['meal'],
        user_id=new_log['user_id'],
        created_at=datetime.now())

    db.session.add(nfl)

    # Find id of the new food_log entry to satisfy foreign key constaint in secondary table
    log = Food_Log.query.filter_by(user_id=user_id, meal=new_log['meal']).all()

    if new_log['meal'] == 'breakfast':
        nb = Breakfast(
            calories=new_log['calories'],
            carbohydrates=new_log['carbohydrates'],
            fat=new_log['fat'],
            protein=new_log['protein'],
            foodlog_id=log[len(log)-1].to_dict()['id'],
            daily_nutrition_goals_id=new_log["daily_nutrition_goals_id"])

        db.session.add(nb)

    if new_log['meal'] == 'lunch':
        nl = Lunch(
            calories=new_log['calories'],
            carbohydrates=new_log['carbohydrates'],
            fat=new_log['fat'],
            protein=new_log['protein'],
            foodlog_id=log[len(log)-1].to_dict()['id'],
            daily_nutrition_goals_id=new_log["daily_nutrition_goals_id"])

        db.session.add(nl)

    if new_log['meal'] == 'dinner':
        nd = Dinner(
            calories=new_log['calories'],
            carbohydrates=new_log['carbohydrates'],
            fat=new_log['fat'],
            protein=new_log['protein'],
            foodlog_id=log[len(log)-1].to_dict()['id'],
            daily_nutrition_goals_id=new_log["daily_nutrition_goals_id"])

        db.session.add(nd)

    db.session.commit()
    # Return user food_log and nutrition
    return get_food_log(user_id)


# Update current food log
@food_log_routes.route('/<int:user_id>', methods=['PUT'])
# @login_required
def update_food_log(user_id):
    updated_log = request.json
    current_log = Food_Log.query.filter_by(user_id=user_id, meal=updated_log['meal']).first()

    if current_log:
        current_log.name = updated_log['name'],
        current_log.created_at = datetime.now()

        if updated_log['meal'] == 'breakfast':
            current_breakfast = Breakfast.query.filter_by(foodlog_id=current_log.to_dict()['id']).first()

            current_breakfast.calories=updated_log['calories'],
            current_breakfast.carbohydrates=updated_log['carbohydrates'],
            current_breakfast.fat=updated_log['fat'],
            current_breakfast.protein=updated_log['protein'],
            current_breakfast.daily_nutrition_goals_id=updated_log["daily_nutrition_goals_id"]
            db.session.commit()

        if updated_log['meal'] == 'lunch':
            current_lunch = Lunch.query.filter_by(foodlog_id=current_log.to_dict()['id']).first()

            current_lunch.calories=updated_log['calories'],
            current_lunch.carbohydrates=updated_log['carbohydrates'],
            current_lunch.fat=updated_log['fat'],
            current_lunch.protein=updated_log['protein'],
            current_lunch.daily_nutrition_goals_id=updated_log["daily_nutrition_goals_id"]
            db.session.commit()

        if updated_log['meal'] == 'dinner':
            current_dinner = Dinner.query.filter_by(foodlog_id=current_log.to_dict()['id']).first()

            current_dinner.calories=updated_log['calories'],
            current_dinner.carbohydrates=updated_log['carbohydrates'],
            current_dinner.fat=updated_log['fat'],
            current_dinner.protein=updated_log['protein'],
            current_dinner.daily_nutrition_goals_id=updated_log["daily_nutrition_goals_id"]
            db.session.commit()

    # Return user food_log and nutrition
    return get_food_log(user_id)


# delete a single food_log
@food_log_routes.route('/<int:user_id>', methods=['DELETE'])
# @login_required
def delete_food_log(user_id):
    print('\n\n\n\n\n', user_id, '\n\n\n\n\n')
    data = request.json
    # food_log = Food_Log.query.filter_by(user_id=user_id, meal=data['meal']).all()
    bfast = Breakfast.query.filter_by(foodlog_id=data['foodLogId']).first()
    food_log = Food_Log.query.filter_by(id=data['foodLogId']).first()
    # print('\n\n\n\n\n', food_log.to_dict(), '\n\n\n\n\n')
    # print('\n\n\n\n\n', bfast.to_dict(), '\n\n\n\n\n')

    if data['meal'] == 'breakfast':
        Breakfast.query.filter_by(foodlog_id=data['foodLogId']).delete()
        Food_Log.query.filter_by(id=data['foodLogId']).delete()
        db.session.commit()

    if data['meal'] == 'lunch':
        Lunch.query.filter_by(foodlog_id=data['foodLogId']).delete()
        Food_Log.query.filter_by(id=data['foodLogId']).delete()
        db.session.commit()

    if data['meal'] == 'dinner':
        Dinner.query.filter_by(foodlog_id=data['foodLogId']).delete()
        Food_Log.query.filter_by(id=data['foodLogId']).delete()
        db.session.commit()

    return {"user_food_log": [{"foodLogId": data['foodLogId']}, {"meal": data['meal']}]}

# Delete all foodlogs for current dng
@food_log_routes.route('/all/<int:user_id>', methods=['DELETE'])
# @login_required
def delete_all_food_log(user_id):
    dng_id = Daily_Nutrition_Goals.query.filter_by(user_id=user_id).first().to_dict()['id']
    food_log = Food_Log.query.filter_by(user_id=user_id).all()
    # print('\n\n\n\n\n', food_log, '\n\n\n\n\n')
    # db.session.commit()
    for log in food_log:
        if log.to_dict()['meal'] == 'breakfast':
            Breakfast.query.filter_by(daily_nutrition_goals_id=dng_id).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='breakfast').delete()

        if log.to_dict()['meal'] == 'lunch':
            Lunch.query.filter_by(daily_nutrition_goals_id=dng_id).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='lunch').delete()

        if log.to_dict()['meal'] == 'dinner':
            Dinner.query.filter_by(daily_nutrition_goals_id=dng_id).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='dinner').delete()

    db.session.commit()
    return get_food_log(user_id)

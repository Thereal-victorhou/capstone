from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Food_Log, Breakfast, Lunch, Dinner, Daily_Nutrition_Goals
from datetime import datetime


food_log_routes = Blueprint('food_log_routes', __name__)


# Get Food_log
@food_log_routes.route('/<int:user_id>', methods=['GET'])
# @login_required
def get_food_log(user_id):

    # Dictionary Merge Helper
    def merge(tup1, tup2):
        return {**tup1.to_dict(), **tup2.to_dict()}

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

    # Breakfast Helper
    def breakfast_func(user_breakfast):
        return [merge(*args) for args in user_breakfast]
    # Lunch Helper
    def lunch_func(user_lunch):
        return [merge(*args) for args in user_lunch]
    # Dinner Helper
    def dinner_func(user_dinner):
        return [merge(*args) for args in user_dinner]

    # Breakfast
    if not user_lunch and not user_dinner:
        # breakfast = [merge(*args) for args in user_breakfast]
        # print("\n\n\n\n", {"user_food_log": [{**breakfast[0], **breakfast[1]}]}, "\n\n\n\n")
        return {'user_food_log': breakfast_func(user_breakfast)}

    # Lunch
    if not user_dinner and not user_breakfast:
        # lunch = [merge(*args) for args in user_lunch]
        # print("\n\n\n\n", {'user_food_log': [{**lunch[0], **lunch[1]}]}, "\n\n\n\n")
        return {'user_food_log': lunch_func(user_lunch)}

    # Dinner
    if not user_breakfast and not user_lunch:
        # dinner = [merge(*args) for args in user_dinner]
        # print("\n\n\n\n", {'user_food_log': [{**dinner[0], **dinner[1]}]}, "\n\n\n\n")
        return {'user_food_log': dinner_func(user_dinner)}

    # Lunch & Dinner
    if not user_breakfast:
        # lunch = [lunch.to_dict() for lunch in list(user_lunch)]
        # dinner = [dinner.to_dict() for dinner in list(user_dinner)]
        # print("\n\n\n\n", {'user_food_log': [{**lunch[0], **lunch[1]}, {**dinner[0], **dinner[1]}]}, "\n\n\n\n")
        return {'user_food_log': [{lunch_func(user_lunch), dinner_func(user_dinner)}]}

    # Breakfast & Dinner
    if not user_lunch:
        # breakfast = [breakfast.to_dict() for breakfast in list(user_breakfast)]
        # dinner = [dinner.to_dict() for dinner in list(user_dinner)]
        # print("\n\n\n\n", {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**dinner[0], **dinner[1]}]}, "\n\n\n\n")
        return {'user_food_log': [{breakfast_func(user_breakfast)}, {dinner_func(user_dinner)}]}

    # Breakfast & Lunch
    if not user_dinner:
        # breakfast = [breakfast.to_dict() for breakfast in list(user_breakfast)]
        # lunch = [lunch.to_dict() for lunch in list(user_lunch)]
        # print("\n\n\n\n", {'user_food_log': [{**breakfast[0], **breakfast[1]}, {**lunch[0], **lunch[1]}]}, "\n\n\n\n")
        return {'user_food_log': [{breakfast_func(user_breakfast)}, {lunch_func(user_lunch)}]}

    # breakfast = [breakfast.to_dict() for breakfast in list(user_breakfast)]
    # lunch = [lunch.to_dict() for lunch in list(user_lunch)]
    # dinner = [dinner.to_dict() for dinner in list(user_dinner)]

    # print("\n\n\n\n", {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}, {"lunch": lunch_func(user_lunch)}, {"dinner": dinner_func(user_dinner)}]}, "\n\n\n\n")
    return {'user_food_log': [{"breakfast": breakfast_func(user_breakfast)}, {"lunch": lunch_func(user_lunch)}, {"dinner": dinner_func(user_dinner)}]}


# Create new food log
@food_log_routes.route('/<int:user_id>', methods=['POST'])
# @login_required
def new_food_log(user_id):
    new_log = request.json
    # current_log = Food_Log.query.filter_by(user_id=user_id, meal=new_log['meal']).first()

    print("\n\n\n\n new_log ============", new_log, "\n\n\n\n")
    # print("\n\n\n\n current_log ============", current_log, "\n\n\n\n")


    # if not current_log:
    nfl = Food_Log(
        name=new_log['name'],
        meal=new_log['meal'],
        user_id=new_log['user_id'],
        created_at=datetime.now())

    db.session.add(nfl)
    # Find id of the new food_log entry to satisfy foreign key constaint in secondary table
    log = Food_Log.query.filter_by(user_id=user_id, meal=new_log['meal']).all()
    # print("\n\n\n\n log=============", log, "\n\n\n\n")

    # lg = Food_Log.query.filter_by(user_id=user_id, meal=new_log['meal']).all()
    # print("\n\n\n\n log=============", lg[len(lg)-1].to_dict(), "\n\n\n\n")

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
    food_log = Food_Log.query.filter_by(user_id=user_id, meal=data['meal']).all()
    print('\n\n\n\n\n', data, '\n\n\n\n\n')
    print('\n\n\n\n\n', food_log, '\n\n\n\n\n')
    # db.session.commit()
    for log in food_log:
        if log.to_dict()['meal'] == 'breakfast':
            bfast = Breakfast.query.filter_by(foodlog_id=log.to_dict()['id'])
            print("\n\n\n\n", {"obj": bf.to_dict() for bf in bfast}, "\n\n\n\n")
            bfastInfo = {"obj": bf.to_dict() for bf in bfast}
            foodlog_id = bfastInfo['obj']['foodlog_id']
            # print("\n\n\n\n", bfastId, "\n\n\n\n")
            Breakfast.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='breakfast').delete()
            # print(" \n\n\n\n After Delete", bfastId, "\n\n\n\n")

            db.session.commit()
            return {"user_food_log": foodlog_id}

        if log.to_dict()['meal'] == 'lunch':
            Lunch.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='lunch').delete()
            db.session.commit()
            get_food_log(user_id)
            return get_food_log(user_id)

        if log.to_dict()['meal'] == 'dinner':
            Dinner.query.filter_by(foodlog_id=log.to_dict()['id']).delete()
            Food_Log.query.filter_by(user_id=user_id, meal='dinner').delete()
            db.session.commit()
            return get_food_log(user_id)

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

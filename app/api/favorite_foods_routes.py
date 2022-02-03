from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Favorite_Foods
from datetime import datetime

favorite_foods_routes = Blueprint('favorite_foods_routes', __name__)

# GET all favorite foods
@favorite_foods_routes.route('<int:user_id>', methods=['GET'])
#@login_required
def get_fav_foods(user_id):
    cur_list = Favorite_Foods.query.filter_by(user_id=user_id).all()
    # faves = [tup[1].to_dict() for tup in cur_list]
    # print("\n\n\n\n\n\n", cur_list, '\n\n\n\n\n')
    return {'favorite_foods': [log.to_dict() for log in cur_list]}

# Add to favorite foods
@favorite_foods_routes.route('<int:user_id>', methods=['POST'])
#@login_required
def add_fav_foods(user_id):
    data = request.json
    new_fav = Favorite_Foods(
        user_id=user_id,
        foodlog_id=data['foodLogId']
    )
    db.session.add(new_fav)
    db.session.commit()

    return get_fav_foods(user_id)

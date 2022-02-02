from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Favorite_Foods, Food_Log
from datetime import datetime

favorite_foods_routes = Blueprint('favorite_foods_routes', __name__)

@favorite_foods_routes.route('<int:user_id>', methods=['GET'])
#@login_required
def get_fav_foods(user_id):
    fav_list = Favorite_Foods.query.filter_by(user_id=user_id).all()
    print("\n\n\n\n\n", fav_list, '\n\n\n\n\n')
    return {'favorite_foods': [fav.to_dict() for fav in fav_list]}

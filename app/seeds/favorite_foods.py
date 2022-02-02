from app.models import db, Favorite_Foods
from datetime import datetime

def seed_favorite_foods():
    food1 = Favorite_Foods(foodlog_id=1, created_at=datetime.now())
    food2 = Favorite_Foods(foodlog_id=2, created_at=datetime.now())
    food3 = Favorite_Foods(foodlog_id=3, created_at=datetime.now())
    food4 = Favorite_Foods(foodlog_id=4, created_at=datetime.now())

    
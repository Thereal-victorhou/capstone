from app.models import db, Favorite_Foods
from datetime import datetime

def seed_favorite_foods():
    food1 = Favorite_Foods(foodlog_id=1, user_id=1, created_at=datetime.now())
    food2 = Favorite_Foods(foodlog_id=2, user_id=1, created_at=datetime.now())
    food3 = Favorite_Foods(foodlog_id=3, user_id=1, created_at=datetime.now())
    food4 = Favorite_Foods(foodlog_id=4, user_id=1, created_at=datetime.now())

    db.session.add(food1)
    db.session.add(food2)
    db.session.add(food3)
    db.session.add(food4)

    db.session.commit()

def undo_favorite_foods():
    db.session.execute('TRUNCATE favorite_foods RESTART IDENTITY CASCADE')
    db.session.commit()

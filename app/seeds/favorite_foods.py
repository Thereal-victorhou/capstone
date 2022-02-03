from app.models import db, Favorite_Foods
from datetime import datetime

def seed_favorite_foods():
    food1 = Favorite_Foods(name='eggs and rice', calories=400, carbohydrates=36, fat=12, protein=24, user_id=1, created_at=datetime.now())
    food2 = Favorite_Foods(name='soup', calories=160, carbohydrates=3, fat=6, protein=12, user_id=1, created_at=datetime.now())
    food3 = Favorite_Foods(name='steak', calories=400, carbohydrates=0, fat=3, protein=70, user_id=1, created_at=datetime.now())
    food4 = Favorite_Foods(name='chicken and waffles', calories=560, carbohydrates=50, fat=13, protein=50, user_id=1, created_at=datetime.now())

    db.session.add(food1)
    db.session.add(food2)
    db.session.add(food3)
    db.session.add(food4)

    db.session.commit()

def undo_favorite_foods():
    db.session.execute('TRUNCATE favorite_foods RESTART IDENTITY CASCADE')
    db.session.commit()

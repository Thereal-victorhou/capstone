from app.models import db, Food_Log
from datetime import datetime

def seed_food_log():
    food1 = Food_Log(name='eggs', meal='breakfast', user_id= 1, created_at=datetime.now())
    food2 = Food_Log(name='soup', meal='lunch', user_id= 1, created_at=datetime.now())
    food3 = Food_Log(name='steak', meal='dinner', user_id= 1, created_at=datetime.now())
    food4 = Food_Log(name='pancakes', meal='breakfast', user_id= 2, created_at=datetime.now())
    food5 = Food_Log(name='tacos', meal='lunch', user_id= 2, created_at=datetime.now())
    food6 = Food_Log(name='pizza', meal='dinner', user_id= 2, created_at=datetime.now())
    food7 = Food_Log(name='cereal', meal='breakfast', user_id= 3, created_at=datetime.now())
    food8 = Food_Log(name='fried rice', meal='lunch', user_id= 3, created_at=datetime.now())
    food9 = Food_Log(name='burrito', meal='dinner', user_id= 3, created_at=datetime.now())

    db.session.add(food1)
    db.session.add(food2)
    db.session.add(food3)
    db.session.add(food4)
    db.session.add(food5)
    db.session.add(food6)
    db.session.add(food7)
    db.session.add(food8)
    db.session.add(food9)

    db.session.commit()

def undo_food_log():
    db.session.execute('TRUNCATE food_log RESTART IDENTITY CASCADE')
    db.session.commit()

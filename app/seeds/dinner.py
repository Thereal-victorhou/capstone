from app.models import db, Dinner

def seed_dinner():
    dinner1 = Dinner(calories=330, carbohydrates=0, fat=10, protein=60, foodlog_id=3, daily_nutrition_goals_id=1)
    dinner2 = Dinner(calories=700, carbohydrates=50, fat=15, protein=18, foodlog_id=6, daily_nutrition_goals_id=2)
    dinner3 = Dinner(calories=1000, carbohydrates=80, fat=28, protein=27, foodlog_id=9, daily_nutrition_goals_id=3)

    db.session.add(dinner1)
    db.session.add(dinner2)
    db.session.add(dinner3)

    db.session.commit()

def undo_dinner():
    db.session.execute('TRUNCATE dinner RESTART IDENTITY CASCADE')
    db.session.commit()

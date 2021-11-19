from app.models import db, Lunch

def seed_lunch():
    lunch1 = Lunch(calories=160, carbohydrates=3, fat=6, protein=12, foodlog_id=2, daily_nutrition_goals_id=1)
    lunch2 = Lunch(calories=270, carbohydrates=19, fat=5, protein=15, foodlog_id=5, daily_nutrition_goals_id=2)
    lunch3 = Lunch(calories=650, carbohydrates=67, fat=24, protein=20, foodlog_id=8, daily_nutrition_goals_id=3)

    db.session.add(lunch1)
    db.session.add(lunch2)
    db.session.add(lunch3)

    db.session.commit()

def undo_lunch():
    db.session.execute('TRUNCATE lunch RESTART IDENTITY CASCADE')
    db.session.commit()

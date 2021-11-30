from app.models import db, Breakfast

def seed_breakfast():
    breakfast1 = Breakfast(calories=300, carbohydrates=36, fat=12, protein=24, foodlog_id=1, daily_nutrition_goals_id=1)
    breakfast2 = Breakfast(calories=500, carbohydrates=46, fat=9, protein=1, foodlog_id=4, daily_nutrition_goals_id=2)
    breakfast3 = Breakfast(calories=300, carbohydrates=32, fat=9, protein=4, foodlog_id=7, daily_nutrition_goals_id=3)

    db.session.add(breakfast1)
    db.session.add(breakfast2)
    db.session.add(breakfast3)

    db.session.commit()

def undo_breakfast():
    db.session.execute('TRUNCATE breakfast RESTART IDENTITY CASCADE')
    db.session.commit()

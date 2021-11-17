from app.models import db, Daily_Nutrition_Goals
from datetime import datetime

def seed_daily_nutrition_goals():
    test_goals1 = Daily_Nutrition_Goals(calories=2200, carbohydrates=290, fat=62, protein=135, user_id=1, created_at=datetime.now())
    test_goals2 = Daily_Nutrition_Goals(calories=2000, carbohydrates=270, fat=50, protein=145, user_id=2, created_at=datetime.now())
    test_goals3 = Daily_Nutrition_Goals(calories=3200, carbohydrates=300, fat=70, protein=140, user_id=3, created_at=datetime.now())


    db.session.add(test_goals1)
    db.session.add(test_goals2)
    db.session.add(test_goals3)

    db.session.commit()

def undo_daily_nutrition_goals():
    db.session.execute('TRUNCATE daily_nutrition_goals RESTART IDENTITY CASCADE;')
    db.session.commit()

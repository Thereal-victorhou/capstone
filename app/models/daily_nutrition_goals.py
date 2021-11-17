from .db import db

class Daily_Nutrition_Goals(db.Model):
    __tablename__ = "daily_nutrition_goals"
    id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Integer, nullable=False)
    carbohydrates = db.Column(db.Integer, nullable=False)
    fat = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    created_at = db.Column(db.Date(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "calories": self.calories,
            "carbohydrates":self.carbohydrates,
            "fat": self.fat,
            "protein": self.protein,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

    breakfast = db.relationship("Breakfast", back_populates="daily_nutrition_goals")
    lunch = db.relationship("Lunch", back_populates="daily_nutrition_goals")
    dinner = db.relationship("Dinner", back_populates="daily_nutrition_goals")
    user = db.relationship("User", back_populates="daily_nutrition_goals")

from .db import db

class Food_Log(db.Model):
    __tablename__ = 'food_log'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    food_type = db.Column(db.String(100), nullable=False)
    meal = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(), nullable=False)

    def to_id(self):
        return {
            "id": self.id,
            "name": self.name,
            "food_type": self.food_type,
            "meal": self.meal,
            "user_id": self.user_id,
            "createdAt": self.createdAt
        }

    favorite_foods = db.relationship("Favorite_Foods", back_populates="food_log")
    breakfast = db.relationship("Breakfast", back_populates="food_log")
    lunch = db.relationship("Lunch", back_populates="food_log")
    dinner = db.relationship("Dinner", back_populates="food_log")
    user = db.relationship("User", back_populates="food_log")

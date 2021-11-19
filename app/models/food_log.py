from .db import db

class Food_Log(db.Model):
    __tablename__ = 'food_log'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    meal = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def to_id(self):
        return {
            "id": self.id,
            "name": self.name,
            "meal": self.meal,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

    favorite_foods = db.relationship("Favorite_Foods", back_populates="food_log")
    breakfast = db.relationship("Breakfast", back_populates="food_log")
    lunch = db.relationship("Lunch", back_populates="food_log")
    dinner = db.relationship("Dinner", back_populates="food_log")
    user = db.relationship("User", back_populates="food_log")

from .db import db

class Favorite_Foods(db.Model):
    __tablename__ = 'favorite_foods'

    id = db.Column(db.Integer, primary_key=True)
    foodlog_id = db.Column(db.Integer, db.ForeignKey("food_log.id"), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "foodlog_id": self.foodlog_id,
            "created_at": self.created_at
        }

    food_log = db.relationship("Food_Log", back_populates="favorite_foods")

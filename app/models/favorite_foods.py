from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite_Foods(db.Model):
    __tablename__ = 'favorite_foods'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    carbohydrates = db.Column(db.Integer, nullable=False)
    fat = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "calories": self.calories,
            "carbohydrates": self.carbohydrates,
            "fat": self.fat,
            "protein": self.protein,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

    user = db.relationship("User", back_populates="favorite_foods")

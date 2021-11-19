"""empty message

Revision ID: 38ebecdd0b45
Revises: 141801a4c853
Create Date: 2021-11-19 13:25:12.919687

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38ebecdd0b45'
down_revision = '141801a4c853'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('food_log_user_id_key', 'food_log', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('food_log_user_id_key', 'food_log', ['user_id'])
    # ### end Alembic commands ###

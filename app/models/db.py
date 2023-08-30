from flask_sqlalchemy import SQLAlchemy

# add iport adn set variable to access flask environment
import os
environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')

db = SQLAlchemy()

# add function to add a prefix to table names in production environment
def add_prefix_for_prod(attr):
    if environment == 'production':
        return f'{SCHEMA}.{attr}'
    else:
        return attr

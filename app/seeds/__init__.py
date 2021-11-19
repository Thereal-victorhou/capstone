from flask.cli import AppGroup
from .users import seed_users, undo_users
from .daily_nutrition_goals import seed_daily_nutrition_goals, undo_daily_nutrition_goals
from .food_log import seed_food_log, undo_food_log
from .breakfast import seed_breakfast, undo_breakfast
from .lunch import seed_lunch, undo_lunch
from .dinner import seed_dinner, undo_dinner


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_daily_nutrition_goals()
    seed_food_log()
    seed_breakfast()
    seed_lunch()
    seed_dinner()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_daily_nutrition_goals()
    undo_food_log()
    undo_breakfast()
    undo_lunch()
    undo_dinner()
    # Add other undo functions here

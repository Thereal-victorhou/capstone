from flask import Blueprint, jsonify, request
from flask_login import login_required

search_routes = Blueprint('search_routes', __name__)

# Live Search
@search_routes.route('/', methods=['PUT'])
def live_search():
    print("\n\n\n\n, hello from search api, \n\n\n\n\n")
    search_term = request.json

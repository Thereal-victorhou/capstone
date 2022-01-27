from flask import Blueprint, request
from flask_login import login_required

import json
import requests

search_routes = Blueprint('search_routes', __name__)

# Specific Item
@search_routes.route('/<int:user_id>', methods=['POST'])
def specific_item(user_id):
    food_name = request.json['foodName']
    # print("\n\n\n\n hello from search api, \n\n\n\n\n")
    api_url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
    headers = {'content-type': 'application/json', 'x-app-id': '58ab8b17', 'x-app-key': '613315f92586f41ac1c92e6f27b73205', 'x-remote-user-id': f'{user_id}'}
    body = {'query': food_name, 'num_servings': 1}
    res = requests.post(api_url, headers=headers, data=json.dumps(body))
    result = res.json()
    nutrients = result['foods'][0]
    print('n\n\n\n\n\n', result, '\n\n\n\n\n\n')
    # print(result['foods'][0]['nf_dietary_fiber'] == None)
    # print(result['foods'][0]['nf_total_carbohydrate'])
    # print(result['foods'][0]['nf_total_fat'])
    # print(result['foods'][0]['nf_protein'])
    if nutrients['nf_dietary_fiber'] == None:
        return {"food": nutrients['food_name'], "calories": nutrients['nf_calories'], "carbohydrates": nutrients['nf_total_carbohydrate'], "fat": nutrients['nf_total_fat'], "protein": nutrients["nf_protein"]}
    else:
        carbohydrates = nutrients['nf_total_carbohydrate'] - nutrients['nf_dietary_fiber']
        return {"food": nutrients['food_name'], "calories": nutrients['nf_calories'], "carbohydrates": carbohydrates, "fat": nutrients['nf_total_fat'], "protein": nutrients["nf_protein"]}

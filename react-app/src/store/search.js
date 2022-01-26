// Type
const GET_FOOD_ITEM = "search/GET_FOOD_ITEM";

const PUT_FOOD_ITEM = "search/PUT_FOOD_ITEM";

// Action
const getFoodItem = (food) => ({
    type: GET_FOOD_ITEM,
    food
})

const putFoodItem = (foodList) => ({
    type: PUT_FOOD_ITEM,
    foodList
})

// Thunk
export const specificFoodItem = (foodName) => async (dispatch) => {
    const res = await fetch(`api/search`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({foodName: foodName})
    })
    const result = await res.json();
    console.log(result);
}


export const searchForFoodItem = (foodName) => async (dispatch) => {
    // await fetch(`api/search/`, {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(foodName)
    // })
    // let searchRes = await res.json();
    // dispatch(putFoodItem(searchRes));
    const res = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodName}`,
        {
            headers: {
                'x-app-id': '58ab8b17',
                'x-app-key': '613315f92586f41ac1c92e6f27b73205'
            }
        }
    )
    const result = await res.json()
    // console.log("search results ==================== ",result)
    dispatch(putFoodItem(result.common));

}

// Reducer
const searchReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case PUT_FOOD_ITEM:
            newState = {};
            action.foodList.forEach(item => {
                newState[action.foodList.indexOf(item)] = item
            })
            return newState;
        default:
            return state;
    }
}

export default searchReducer;

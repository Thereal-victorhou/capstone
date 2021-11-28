// Type
const GET_FOOD_LOG = "foodlog/GET_FOOD_LOG"

// Action
const getFoodLog = (food) => ({
    type: GET_FOOD_LOG,
    food
})

// Thunk
export const userFoodLog = (userId) => async (dispatch) => {
    const res = await fetch(`api/food-log/${userId}`);
    let foodLog = await res.json();

    if (!(foodLog.food_log == "False")) {
        dispatch(getFoodLog(foodLog));
    } else {
    const err = {"user_food_log": [{msg: "No Current Food Log"}]}
        dispatch(getFoodLog(err));
    }
}
// Reducer
const foodLogReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_FOOD_LOG:
            newState = {...state}
            action.food.user_food_log.forEach(log => {
                newState[log.id] = log;
            })
            return newState;
        default:
            return state;
    }
}

export default foodLogReducer;

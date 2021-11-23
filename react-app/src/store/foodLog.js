// Type
const GET_FOOD_LOG = "foodlog/GET_FOOD_LOG"

// Action
const getFoodLog = (food) => ({
    type: GET_FOOD_LOG,
    food
})

// Thunk
export const userFoodLog = (foodLogId) => async (dispatch) => {
    const res = await fetch(`api/food-log/${foodLogId}`);
    let foodLog = await res.json();

    if (!(foodLog.food_log == "False")) {
        dispatch(getFoodLog(breakfast));
    } else {
        breakfast = {"daily_goals": [{foodLogId: foodLogId, msg: "No Current Breakfast"}]}
        dispatch(getFoodLog(breakfast));
    }
}
// Reducer

// Type
const GET_FOOD_LOG = "foodlog/GET_FOOD_LOG"

const CREATE_FOOD_LOG = "foodlog/CREATE_FOOD_LOG";

const UPDATE_FOOD_LOG = "foodlog/UPDATE_FOOD_LOG";

const DELETE_FOOD_LOG = "foodlog/DELETE_FOOD_LOG";

const DELETE_ALL_LOGS = "foodlog/DELETE_ALL_LOGS";


// Action
const getFoodLog = (food) => ({
    type: GET_FOOD_LOG,
    food
});

const newFoodLog = (food) => ({
    type: CREATE_FOOD_LOG,
    food
});

const changeFoodLog = (food) => ({
    type: UPDATE_FOOD_LOG,
    food
});
const deletefl = (food) => ({
    type: DELETE_FOOD_LOG,
    food
})

const deleteAll = (food) => ({
    type: DELETE_ALL_LOGS
})

// Thunk
// Get user foodlog
export const userFoodLog = (userId) => async (dispatch) => {
    const res = await fetch(`api/food-log/${userId}`);
    let foodLog = await res.json();

    if (!(foodLog.user_food_log === "False")) {
        dispatch(getFoodLog(foodLog));
    } else {
    const err = {"user_food_log": [{msg: "No Current Food Log"}]}
        dispatch(getFoodLog(err));
    }
}

// Create new foodlog
export const createFoodLog = (nfl) => async (dispatch) => {
    const { user_id } = nfl;
    const res = await fetch(`api/food-log/${user_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nfl)
    })
    let log = await res.json();
    if (!(log.user_food_log === 'False')){
        dispatch(newFoodLog(log))
    } else {
        log = {"user_food_log": [{msg: "No Current Food Log"}]}
        dispatch(newFoodLog(log))
    }
}

// Update new foodlog
export const updateFoodLog = (ufl) => async (dispatch) => {
    const { user_id } = ufl;
    const res = await fetch(`api/food-log/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(ufl)
    });
    let log = await res.json();
    if (!(log.user_food_log === 'False')) {
        dispatch(changeFoodLog(log))
    } else {
        log = {"user_food_log": [{msg: "No Current Food Log"}]}
        dispatch(changeFoodLog(log))
    }
}

// Delete food log
export const deleteFoodLog = ({user_id, meal}) => async (dispatch) => {
    const res = await fetch(`/api/food-log/${user_id}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({meal: meal})
    });
    const remaining = await res.json();
    // console.log("inside delete thunk==========", remaining);
    dispatch(deletefl(remaining))
};

// Delete all food logs
export const deleteAllFoodLog = (user_id) => async (dispatch) => {
    console.log("inside delete all=========", typeof user_id)
    const res = await fetch(`/api/food-log/all/${user_id}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    const remaining = await res.json();
    // console.log("inside delete thunk==========", remaining);
    dispatch(deleteAll(remaining))
};

// Reducer
const foodLogReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_FOOD_LOG || CREATE_FOOD_LOG || UPDATE_FOOD_LOG:
            newState = {...state}
            action.food.user_food_log.forEach(log => {
                newState[log.id] = log;
            })
            return newState;
        case DELETE_FOOD_LOG:
            newState = {}
            action.food.user_food_log.forEach(log => {
                newState[log.id] = log;
            })
            return newState;

        case DELETE_ALL_LOGS:
            return {};
        default:
            return state;
    }
}

export default foodLogReducer;

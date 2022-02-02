// Type
const GET_FOOD_LOG = "foodlog/GET_FOOD_LOG";

const GET_ONE_FOOD_LOG = "foodlog/GET_ONE_FOOD_LOG";

const CREATE_FOOD_LOG = "foodlog/CREATE_FOOD_LOG";

const UPDATE_FOOD_LOG = "foodlog/UPDATE_FOOD_LOG";

const DELETE_FOOD_LOG = "foodlog/DELETE_FOOD_LOG";

const DELETE_ALL_LOGS = "foodlog/DELETE_ALL_LOGS";


// Action
const getFoodLog = (food) => ({
    type: GET_FOOD_LOG,
    food
});

const getOneFoodLog = (food) => ({
    type: GET_ONE_FOOD_LOG,
    food
})

const newFoodLog = (food) => ({
    type: CREATE_FOOD_LOG,
    food
});

const changeFoodLog = (food) => ({
    type: UPDATE_FOOD_LOG,
    food
});
const deletefl = (food, idxObj) => ({
    type: DELETE_FOOD_LOG,
    food,
    idxObj
})

const deleteAll = (food) => ({
    type: DELETE_ALL_LOGS
})

// Thunk
// Get user foodlog
export const userFoodLog = (userId) => async (dispatch) => {
    const res = await fetch(`api/food-log/${userId}`);
    let foodLog = await res.json();
    // console.log(foodLog);
    if (!(foodLog.user_food_log === "False")) {
        dispatch(getFoodLog(foodLog));
    }
    // else {
    // const err = {"user_food_log": [{}]}
    //     dispatch(getFoodLog(err));
    // }
}

// Get one foodlog
export const getOneLog = (item) => async (dispatch) => {

}

// Create new foodlog
export const createFoodLog = (nfl) => async (dispatch) => {
    const { user_id } = nfl;
    // console.log("create thunk =================", nfl)
    const res = await fetch(`api/food-log/${user_id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nfl)
    })
    let log = await res.json();
    if (!(log.user_food_log === 'False')){
        dispatch(newFoodLog(log))
    }
    // else {
    //     log = {"user_food_log": [{}]}
    //     dispatch(newFoodLog(log))
    // }
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
    }
    // else {
    //     log = {"user_food_log": [{}]}
    //     dispatch(changeFoodLog(log))
    // }
}

// Delete food log
export const deleteFoodLog = (mealInfo) => async (dispatch) => {
    const { userId, breIdx, lunIdx, dinIdx } = mealInfo;
    const idxObj = {
        breIdx,
        lunIdx,
        dinIdx
    };
    console.log("index obj", idxObj)
    const res = await fetch(`/api/food-log/${userId}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealInfo)
    });
    const info = await res.json();
    // console.log("inside delete thunk==========", info);
    dispatch(deletefl(info, idxObj));
};

// Delete all food logs
export const deleteAllFoodLog = (user_id) => async (dispatch) => {
    // console.log("inside delete all=========", typeof user_id)
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
        case GET_FOOD_LOG:
            if (action.food.user_food_log === "False") {
                return state;
            }
            newState = {...state}

            newState = {...action.food.user_food_log}
            // console.log("newState========= ", newState)
            return newState;

        case CREATE_FOOD_LOG:
            newState = {...state}
            console.log(action.food)
            action.food.user_food_log.forEach(log => {
                newState[log.id] = log;
                newState[log.id] = {...newState[log.id]}
            })
            return newState;

        case UPDATE_FOOD_LOG:
            newState = {...state}
            action.food.user_food_log.forEach(log => {
                newState[log.id] = log;
            })
            return newState;

        case DELETE_FOOD_LOG:
            newState = {...state}

            if (action.food.user_food_log[1].meal === "breakfast") {
                delete newState[0].breakfast?.filter(obj => obj.foodlog_id === action.food.user_food_log[0].foodLogId);
                return newState;
            }

            if (action.food.user_food_log[1].meal === "lunch") {
                delete newState[0].lunch?.filter(obj => obj.foodlog_id === action.food.user_food_log[0].foodLogId);
                return newState;
            }

            if (action.food.user_food_log[1].meal === "dinner") {
                delete newState[0].dinner?.filter(obj => obj.foodlog_id === action.food.user_food_log[0].foodLogId);
                return newState;
            }


        case DELETE_ALL_LOGS:
            return {};
        default:
            return state;
    }
}

export default foodLogReducer;

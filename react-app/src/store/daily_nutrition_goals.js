
// Type
const GET_USER_DNG = "dng/GET_USER_DNG";

const CREATE_NEW_DNG = "dng/CREATE_NEW_DNG";

// Action
const getUserDng = (dng) => ({
    type: GET_USER_DNG,
    dng
});

const createDng = (dng) => ({
    type: CREATE_NEW_DNG,
    dng
});

// Thunk
export const userDng = (userId) => async (dispatch) => {
    const res = await fetch(`/api/dng/${userId}`);
    const dng = await res.json();
    dispatch(getUserDng(dng));
}

export const createNewDng = (newDng) => async (dispatch) => {
    const { calories, carbohydrates, fat, protein, user_id } = newDng;
    const res = await fetch(`/api/dng/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            calories,
            carbohydrates,
            fat,
            protein,
            user_id
        })
    });
    const dng = await res.json();
    dispatch(createDng(dng));
}

// Reducer
const dngReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_USER_DNG || CREATE_NEW_DNG:
            newState = {...state}
            action.dng.daily_goals.forEach(goal => {
                newState[goal.user_id] = goal
            });
            return newState;
        default:
            return state;
    }
}

export default dngReducer;

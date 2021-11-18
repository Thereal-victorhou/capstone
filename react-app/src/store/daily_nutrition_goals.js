
// Type
const GET_USER_DNG = "dng/GET_USER_DNG";

const CREATE_DNG = "dng/CREATE_DNG";

const UPDATE_DNG ="dng/UPDATE_DNG";

// Action
const getUserDng = (dng) => ({
    type: GET_USER_DNG,
    dng
});

const createDng = (dng) => ({
    type: CREATE_DNG,
    dng
});

const updateDng = (dng) => ({
    type: UPDATE_DNG,
    dng
})

// Thunk
// get user dng
export const userDng = (userId) => async (dispatch) => {
    const res = await fetch(`/api/dng/${userId}`);
    const dng = await res.json();
    dispatch(getUserDng(dng));
}
// create new dng
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
// update existing dng
export const updateCurrentDng = (modifiedDng) => async (dispatch) => {
    const { calories, carbohydrates, fat, protein, user_id } = modifiedDng;
    console.log(modifiedDng);
    const res = await fetch(`/api/dng/${user_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            calories,
            carbohydrates,
            fat,
            protein,
            user_id
        })
    })
    let dng = await res.json();
    // console.log(dng)
    if (dng) {
        dispatch(updateDng(dng));
    } else {
        dng = {"daily_goals": [{id: 0, msg: "No Current Goals"}]}
        dispatch(updateDng(dng))
    }
}

// Reducer
const dngReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_USER_DNG || CREATE_DNG || UPDATE_DNG:
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

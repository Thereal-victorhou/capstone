// type

const GET_FAVORITE_FOODS = 'favoritefoods/GET_FAVORITE_FOODS';

// action
const getFavoriteFoods = (favList) => ({
    type: GET_FAVORITE_FOODS,
    favList
})

// thunk
export const getFavList = (userId) => async (dispatch) => {
    const res = await fetch(`api/favorite-foods/${userId}`);
    const data = await res.json();
    dispatch(getFavoriteFoods(data));
}

// reducer
const favoriteFoodsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_FAVORITE_FOODS:
            newState = {...state, ...{favList: action.favList}};
            return newState;

        default:
            return state;
    }
}

export default favoriteFoodsReducer;

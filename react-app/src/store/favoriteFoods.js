// type

const GET_FAVORITE_FOODS = 'favoritefoods/GET_FAVORITE_FOODS';

const ADD_FAVORITE_FOOD = 'addfavoritefood/ADD_FAVORITE_FOOD';

// action
const getFavoriteFoods = (favList) => ({
    type: GET_FAVORITE_FOODS,
    favList
});

const addFavoriteFood = (food) => ({
    type: ADD_FAVORITE_FOOD,
    food
});

// thunk
export const getFavList = (userId) => async (dispatch) => {
    const res = await fetch(`api/favorite-foods/${userId}`);
    const data = await res.json();
    dispatch(getFavoriteFoods(data));
}

export const addFavFood = (userId, foodLogId) => async (dispatch) => {
    const res = await fetch(`api/favorite-foods/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({foodLogId: foodLogId})
    })
    const result = await res.json();
    dispatch(addFavoriteFood(result));
}

// reducer
const favoriteFoodsReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case GET_FAVORITE_FOODS:
            newState = {...state, ...{favList: action.favList}};
            return newState;
        case ADD_FAVORITE_FOOD:
            newState = {...state, ...{favList: action.favList}};
            return newState;
        default:
            return state;
    }
}

export default favoriteFoodsReducer;

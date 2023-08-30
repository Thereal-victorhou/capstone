// type

const GET_FAVORITE_FOODS = 'favoritefoods/GET_FAVORITE_FOODS';

const ADD_FAVORITE_FOOD = 'addfavoritefood/ADD_FAVORITE_FOOD';

const DELETE_FAVORITE_FOOD = 'deletefavoritefood/DELETE_FAVORITE_FOOD';

// action
const getFavoriteFoods = (favList) => ({
    type: GET_FAVORITE_FOODS,
    favList
});

const addFavoriteFood = (food) => ({
    type: ADD_FAVORITE_FOOD,
    food
});

const deleteFavoriteFood = (favId) => ({
    type: DELETE_FAVORITE_FOOD,
    favId
})

// thunk
export const getFavList = (userId) => async (dispatch) => {
    const res = await fetch(`api/favorite-foods/${userId}`);
    const data = await res.json();
    dispatch(getFavoriteFoods(data));
}

export const addFavFood = (foodObj) => async (dispatch) => {
    const { user_id } = foodObj;

    const res = await fetch(`api/favorite-foods/${user_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(foodObj)
    })
    const result = await res.json();
    dispatch(addFavoriteFood(result));
}

export const deleteFavFood = (foodObj) => async (dispatch) => {
    const { user_id } = foodObj;
    const res = await fetch(`api/favorite-foods/${user_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(foodObj)
    });
    const result = await res.json();
    dispatch(deleteFavoriteFood(result));
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
        case DELETE_FAVORITE_FOOD:
            newState = {...state}

            delete newState?.favList.favorite_foods.filter(obj => obj.id === action.favId)
            return newState;
        default:
            return state;
    }
}

export default favoriteFoodsReducer;

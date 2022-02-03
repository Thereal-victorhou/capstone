import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog, createFoodLog, updateFoodLog, deleteFoodLog } from '../../store/foodLog';
import { addFavoriteFood } from "../../store/favoriteFoods";
import { getFavList } from "../../store/favoriteFoods";
import NewFoodLogModal from '../FoodLogModal/NewFoodLogModal';
import UpdateFoodLogModal from '../FoodLogModal/UpdateFoodLogModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FoodLog = () => {

    const user = useSelector(state => state.session.user)
    const currentFoodLog = useSelector(state => Object.values(state.foodlog));
    console.log("currentFoodLog", currentFoodLog)
    const dispatch = useDispatch();
    const history = useHistory();

    const [logLocation, setLogLocation] = useState([])
    const [selectedMeal, setSelectedMeal] = useState("")
    const [mealNo, setMealNo] = useState(null)
    const [delTask, setDelTask] = useState(false)

    const [mealInfo, setMealInfo] = useState({});

    // find meal indices
    const breIdx = logLocation.indexOf('breakfast');
    const lunIdx = logLocation.indexOf('lunch');
    const dinIdx = logLocation.indexOf('dinner');

    useEffect(() =>  {
        dispatch(userDng(user?.id))
        dispatch(userFoodLog(user?.id))
        dispatch(getFavList(user?.id))

        let loArr = []
        currentFoodLog?.forEach(obj => {
            loArr.push(...Object.keys(obj))
        })
        setLogLocation(loArr)
    },[dispatch, selectedMeal])


    const handleClick = (e) => {{
        e.preventDefault();

        switch (e.target.getAttribute('name')) {
            case 'breakfast':
                setSelectedMeal('breakfast')
                setMealNo(breIdx)

                break
            case 'lunch':
                setSelectedMeal('lunch')
                setMealNo(lunIdx)
                break
            case 'dinner':
                setSelectedMeal('dinner')
                setMealNo(dinIdx)
                break
        }
    }};

    // Handle delete request
    const handleDelete = async (e) => {
        e.preventDefault();
        // console.log("meal info ==========",mealInfo);
        await dispatch(deleteFoodLog(mealInfo))
        alert("Food item has been deleted.")
        history.push('/home')
    }

    // Confirm box conditional render
    const handleConfirmationBox = (e, mealData) => {
        e.preventDefault();
        setMealInfo(mealData);

        if (!delTask) {
            document.querySelector(".confirm-background").style.display = "flex"
            document.querySelector(".container").style.display = "flex"
            setDelTask(true)
        } else {
            document.querySelector(".confirm-background").style.display = "none"
            document.querySelector(".container").style.display = "none"
            setDelTask(false)
        }
    }

    // Nutrition for Food Log item
    const eachFoodNutrition = (log) => {
        const mealData = {
            "name": log.name,
            "meal": selectedMeal,
            "dngId": log.daily_nutrition_goals_id,
            "foodLogId": log.foodlog_id,
            "selectedMealId": log.id,
            "userId": user?.id,
            "breIdx": breIdx,
            "lunIdx": lunIdx,
            "dinIdx": dinIdx
        }

        return (
            <div className="foodlog-existing-nutrition" key={log.id}>
                <div>
                    <p>{log.name}</p>
                </div>
                <div>
                    <p>{log.carbohydrates}g</p>
                </div>
                <div>
                    <p>{log.fat}g</p>
                </div>
                <div>
                    <p>{log.protein}g</p>
                </div>
                <div>
                    <p>{log.calories}</p>
                </div>
                <div>
                    <UpdateFoodLogModal
                        selectedMeal={selectedMeal}
                        mealName={log.name}
                        selectedCarb={log.carbohydrates}
                        selectedFat={log.fat}
                        selectedProtein={log.protein}
                        selectedCal={log.calories}
                        dng={log.daily_nutrition_goals_id}
                        foodLogId={log.foodlog_id}
                        selectedMealId={log.id}
                    />
                    <span className="foodlog-existing-delete" onClick={(e) => handleConfirmationBox(e, mealData)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </div>
            </div>
        )
    }

    // Conditional Rendering of Current FoodLog for Each Meal Time
    const existingFoodEntries = (meal) => {

        if (meal === "breakfast" && currentFoodLog.length > 0 && breIdx >=0) {
            return currentFoodLog[breIdx].breakfast?.map(log => eachFoodNutrition(log))
        }

        if (meal === "lunch" && currentFoodLog.length > 0 && lunIdx >=0) {
            return currentFoodLog[lunIdx].lunch?.map(log => eachFoodNutrition(log))
        }

        if (meal === "dinner" && currentFoodLog.length > 0 && dinIdx >=0) {
            return currentFoodLog[dinIdx].dinner?.map(log => eachFoodNutrition(log))
        }
        return (
            <h3>No Existing Entries</h3>
        )
    }

    return (
        <>
            <div className="foodlog-main">
                <div className="main-container">
                    <div className="foodlog-title-container">
                        <p>Food Log</p>
                        {/* {console.log(defaultLog)} */}
                    </div>
                    <div className="foodlog-top">
                        <div className={selectedMeal === "breakfast" ? "foodlog-selected-container": "foodlog-meal-container"} id="breakfast" name="breakfast" onClick={handleClick}>
                            <h3 name="breakfast">Breakfast</h3>
                        </div>
                        <div className={selectedMeal === "lunch" ? "foodlog-selected-container": "foodlog-meal-container"} id="lunch" name="lunch" onClick={handleClick}>
                            <h3 name="lunch">Lunch</h3>
                        </div>
                        <div className={selectedMeal === "dinner" ? "foodlog-selected-container": "foodlog-meal-container"} id="dinner" name="dinner" onClick={handleClick}>
                            <h3 name="dinner">Dinner</h3>
                        </div>
                    </div>
                    <div className="foodlog-mid">
                        <div className="foodlog-existing">
                            {selectedMeal && currentFoodLog[mealNo] && (
                                <>
                                    <div className="foodlog-existing-title-container">
                                        <div>Name</div>
                                        <div>Carbs</div>
                                        <div>Fat</div>
                                        <div>Protein</div>
                                        <div>Cal</div>
                                    </div>
                                    <div className="foodlog-existing-title-container-btm-brder"></div>
                                </>
                            )}
                            {selectedMeal && currentFoodLog && existingFoodEntries(selectedMeal)}
                            <div className="container">
                                <div className="confirmation-text">
                                    Do you want to remove food item?
                                </div>
                                <div className="button-container">
                                    <button
                                        className="cancel-button"
                                        onClick={handleConfirmationBox}>
                                        Cancel
                                    </button>
                                    <button
                                        className="confirmation-button"
                                        onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div
                                className="confirm-background"
                                onClick={(e) => handleConfirmationBox(e)}
                                >
                            </div>
                        </div>
                        <NewFoodLogModal selectedMeal={selectedMeal} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodLog;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog, createFoodLog, updateFoodLog } from '../../store/foodLog';

const FoodLog = () => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])

    const currentFoodLog = useSelector(state => Object.values(state.foodlog));
    const dispatch = useDispatch();

    const defaultLog = currentFoodLog ? (currentFoodLog.filter(log => log.meal === "breakfast") && currentFoodLog.filter(log => log.meal === "breakfast")[0]) : "";

    const [selectedMeal, setSelectedMeal] = useState("breakfast")
    const [errors, setErrors] = useState([]);
    const [foodName, setFoodName] = useState(defaultLog && defaultLog.name)
    const [calories, setCalories] = useState(defaultLog && defaultLog.calories);
    const [carbohydrates, setCarbohydrates] = useState(defaultLog && defaultLog.carbohydrates);
    const [fat, setFat] = useState(defaultLog && defaultLog.fat);
    const [protein, setProtein] = useState(defaultLog && defaultLog.protein);

    const curLog = currentFoodLog && currentFoodLog.filter(log => log.meal === `${selectedMeal}`)[0];

    useEffect(() => {
        dispatch(userDng(user?.id))
        dispatch(userFoodLog(user?.id))

        if (curLog) {
            console.log(curLog)
            setFoodName(curLog.name);
            setCalories(curLog.calories);
            setCarbohydrates(curLog.carbohydrates);
            setFat(curLog.fat);
            setProtein(curLog.protein);
        }

    },[dispatch, curLog && curLog.name,
        curLog && curLog.calories,
        curLog && curLog.carbohydrates,
        curLog && curLog.fat,
        curLog && curLog.protein,
        selectedMeal]
    )

    const updateFoodName = (e) => {
        setFoodName(e.target.value);
    }

    const updateCalories = (e) => {
        setCalories(e.target.value);
    }
    const updateCarbohydrates = (e) => {
        setCarbohydrates(e.target.value);
    }
    const updateFat = (e) => {
        setFat(e.target.value);
    }
    const updateProtein = (e) => {
        setProtein(e.target.value);
    }

    const handleClick = (e) => {{
        e.preventDefault();

        switch (e.target.getAttribute('name')) {
            case 'breakfast':
                setSelectedMeal('breakfast')
                break
            case 'lunch':
                setSelectedMeal('lunch')
                break
            case 'dinner':
                setSelectedMeal('dinner')
                break
        }
    }};

    const handleButton = async (e) => {
        e.preventDefault()

        switch (e.target.innerText) {
            case "Add New Item":
                await dispatch(createFoodLog({
                    "name": foodName,
                    "meal": selectedMeal,
                    "user_id": parseInt(user?.id, 10),
                    "calories": parseInt(calories, 10),
                    "carbohydrates": parseInt(carbohydrates, 10),
                    "fat": parseInt(fat, 10),
                    "protein": parseInt(protein, 10),
                    "daily_nutrition_goals_id": parseInt(currentGoal?.id, 10)
                }))
                break;
            case "Update Item":
                await dispatch(updateFoodLog({
                    "name": foodName,
                    "meal": selectedMeal,
                    "user_id": parseInt(user?.id, 10),
                    "calories": parseInt(calories, 10),
                    "carbohydrates": parseInt(carbohydrates, 10),
                    "fat": parseInt(fat, 10),
                    "protein": parseInt(protein, 10),
                    "daily_nutrition_goals_id": parseInt(currentGoal?.id, 10)
                }))
                break;
            // case "Delete Goal":
            //     await dispatch(deleteUserDng(user?.id))
            //     setCalories("");
            //     setCarbohydrates("");
            //     setFat("");
            //     setProtein("");
            //     setCounter(prev => prev + 1);
            //     break
        }
    }

    return (
        <>
            <div className="foodlog-main">
                <div className="main-container">
                    <div className="foodlog-title-container">
                        <p>Food Log</p>
                    </div>
                    <div className="foodlog-top">
                        <div className="foodlog-meal-container" id="breakfast" name="breakfast" onClick={handleClick}>
                            <h3 name="breakfast">Breakfast</h3>
                        </div>
                        <div className="foodlog-meal-container" id="lunch" name="lunch" onClick={handleClick}>
                            <h3 name="lunch">Lunch</h3>
                        </div>
                        <div className="foodlog-meal-container" id="dinner" name="dinner" onClick={handleClick}>
                            <h3 name="dinner">Dinner</h3>
                        </div>
                    </div>
                    <div className="foodlog-mid">
                        <div className="foodlog-nutrition">
                            <form className="foodlog-form">
                                <div className="foodlog-container">
                                    <label className="foodlog-calories" htmlFor="food-name">Food Name</label>
                                    <input
                                        className="food-name-input"
                                        name="food-name"
                                        type="text"
                                        value={foodName}
                                        onChange={updateFoodName}
                                    />
                                </div>
                                <div className="foodlog-container">
                                    <label className="foodlog-calories" htmlFor="calories">Calories</label>
                                    <input
                                        className="calories-input"
                                        name="calories"
                                        type="text"
                                        value={calories}
                                        onChange={updateCalories}
                                    />
                                </div>
                                <div className="foodlog-container">
                                    <label className="-carbohydrates-label" htmlFor="carbohydrates">Carbohydrates</label>
                                    <input
                                        className="carbohydrates-input"
                                        name="carbohydrates"
                                        type="text"
                                        value={carbohydrates}
                                        onChange={updateCarbohydrates}
                                    />
                                </div>
                                <div className="foodlog-container">
                                    <label className="dng-fat-label" htmlFor="fat">Fat</label>
                                    <input
                                        className="fat-input"
                                        name="fat"
                                        type="text"
                                        value={fat}
                                        onChange={updateFat}
                                    />
                                </div>
                                <div className="foodlog-container">
                                    <label className="dng-protein-label" htmlFor="protein">Protein</label>
                                    <input
                                        className="protein-input"
                                        name="protein"
                                        type="text"
                                        value={protein}
                                        onChange={updateProtein}
                                    />
                                </div>
                                <div className="foodlog-lower">
                                    <button className="foodlog-submit-btn" type="submit" onClick={handleButton}>
                                        <h4>{curLog ? "Update Item" : "Add New Item"}</h4>
                                    </button>
                                    <button className="foodlog-delete-btn" type="submit" onClick={handleButton}>
                                        <h4>Delete Item</h4>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodLog;

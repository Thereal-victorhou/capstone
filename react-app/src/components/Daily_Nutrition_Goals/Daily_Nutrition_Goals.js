import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userDng } from '../../store/daily_nutrition_goals';
import { createNewDng } from '../../store/daily_nutrition_goals';
import { updateCurrentDng } from "../../store/daily_nutrition_goals";
import { deleteUserDng } from "../../store/daily_nutrition_goals";

const DailyNutritionGoals = () => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [calories, setCalories] = useState(currentGoal ? currentGoal?.calories : "");
    const [carbohydrates, setCarbohydrates] = useState(currentGoal ? currentGoal?.carbohydrates : "");
    const [fat, setFat] = useState(currentGoal ? currentGoal?.fat : "");
    const [protein, setProtein] = useState(currentGoal ? currentGoal?.protein : "");
    const [counter, setCounter] = useState(0);


    useEffect(() => {
        dispatch(userDng(user?.id))
        if (currentGoal) {
            setCalories(currentGoal.calories);
            setCarbohydrates(currentGoal.carbohydrates);
            setFat(currentGoal.fat);
            setProtein(currentGoal.protein);
        }
    },[dispatch, currentGoal?currentGoal.calories:calories,
        currentGoal?currentGoal.carbohydrates:carbohydrates,
        currentGoal?currentGoal.fat:fat,
        currentGoal?currentGoal.protein:protein]
    )

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

    const handleButton = async (e) => {
        e.preventDefault()

        switch (e.target.innerText) {
            case "Create New Goal":
                await dispatch(createNewDng({
                    "calories": parseInt(calories, 10),
                    "carbohydrates": parseInt(carbohydrates, 10),
                    "fat": parseInt(fat, 10),
                    "protein": parseInt(protein, 10),
                    "user_id": parseInt(user?.id, 10)
                }))
                setCounter(prev => prev + 1);
                break;
            case "Update Goal":
                await dispatch(updateCurrentDng({
                    "calories": parseInt(calories, 10),
                    "carbohydrates": parseInt(carbohydrates, 10),
                    "fat": parseInt(fat, 10),
                    "protein": parseInt(protein, 10),
                    "user_id": parseInt(user?.id, 10)
                }))
                setCounter(prev => prev + 1);
                break;
            case "Delete Goal":
                await dispatch(deleteUserDng(user?.id))
                setCalories("");
                setCarbohydrates("");
                setFat("");
                setProtein("");
                setCounter(prev => prev + 1);
                break
        }
    }

    return (
        <>
            <div className="dng-main">
                {/* <div className="dng-macros-calc">
                    <h2 className="macros-calc-title">Macros Calculator</h2>
                    <div className="macros-calc-container">
                        <h2>*Macros Calculator*</h2>
                    </div>
                </div> */}
                <div className="dng-form">
                    <div className="dng-title">
                        <h2> Daily Nutrition Goals</h2>
                    </div>
                    <form className="-submit" autoComplete="off">
                        <div className="errors">
                            {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <div className="dng-container">
                            <label className="dng-calories-label" htmlFor="calories">
                                Calories
                            </label>
                            <input
                                className="calories-input"
                                name="calories"
                                type="text"
                                value={calories}
                                onChange={updateCalories}
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-carbohydrates-label" htmlFor="carbohydrates">
                                Carbohydrates (g)
                            </label>
                            <input
                                className="carbohydrates-input"
                                name="carbohydrates"
                                type="text"
                                value={carbohydrates}
                                onChange={updateCarbohydrates}
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-fat-label" htmlFor="fat">
                                Fat (g)
                            </label>
                            <input
                                className="fat-input"
                                name="fat"
                                type="text"
                                value={fat}
                                onChange={updateFat}
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-protein-label" htmlFor="protein">
                                Protein (g)
                            </label>
                            <input
                                className="protein-input"
                                name="protein"
                                type="text"
                                value={protein}
                                onChange={updateProtein}
                            />
                        </div>
                        <div className="login-lower">
                            <button className="submit-btn" type="submit" onClick={handleButton}>
                                <h4>{currentGoal?.msg !== "No Current Goals" ? "Update Goal" : "Create New Goal"}</h4>
                            </button>
                            <button className="delete-btn" type="submit" onClick={handleButton}>
                                <h4>Delete Goal</h4>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DailyNutritionGoals;

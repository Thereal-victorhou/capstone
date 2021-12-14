import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userDng } from '../../store/daily_nutrition_goals';
import { createNewDng } from '../../store/daily_nutrition_goals';
import { updateCurrentDng } from "../../store/daily_nutrition_goals";
import { deleteUserDng } from "../../store/daily_nutrition_goals";

const DailyNutritionGoals = () => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])

    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [calories, setCalories] = useState(currentGoal ? currentGoal?.calories : "");
    const [carbohydrates, setCarbohydrates] = useState(currentGoal ? currentGoal?.carbohydrates : "");
    const [fat, setFat] = useState(currentGoal ? currentGoal?.fat : "");
    const [protein, setProtein] = useState(currentGoal ? currentGoal?.protein : "");
    const [counter, setCounter] = useState(0);

    // console.log("error ==================", errors)
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
        currentGoal?currentGoal.protein:protein, counter]
    )

    useEffect(() => {
        let errArr = []
        if (currentGoal) {
            if (calories && calories.length > 0) {
                if (!(/^[0-9]+$/.test(calories))) {
                    errArr.push("Calories must be a number")
                    setErrors(errArr);
                } else {
                    errArr.pop()
                    setErrors(errArr)
                }

            } else if (!calories) {
                errArr.push("Please fill out Calories field")
                setErrors(errArr);

            }

            if (carbohydrates && carbohydrates.length > 0) {
                if (!(/^[0-9]+$/.test(carbohydrates))) {
                    errArr.push("Carbohydrates must be a number")
                    setErrors(errArr);

                } else {
                    errArr.pop()
                    setErrors(errArr)
                }

            } else if (!carbohydrates) {
                errArr.push("Please fill out Carbohydrates field")
                setErrors(errArr);

            }

            if (fat && fat.length > 0) {
                if (!(/^[0-9]+$/.test(fat))) {
                    errArr.push("Fat must be a number")
                    setErrors(errArr);

                } else {
                    errArr.pop()
                    setErrors(errArr)
                }
            } else if (!fat) {
                errArr.push("Please fill out Fat field")
                setErrors(errArr);

            }

            if (protein && protein.length > 0) {
                if (!(/^[0-9]+$/.test(protein))) {
                    errArr.push("Protein must be a number")
                    setErrors(errArr);

                } else {
                    errArr.pop()
                    setErrors(errArr)
                }

            } else if (!protein) {
                errArr.push("Please fill out Protein field")
                setErrors(errArr);

            }
        }

        // setErrors(errArr);
    },[calories, carbohydrates, fat, protein, counter])

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
                console.log(errors)
                if (!errors.length) {
                    await dispatch(createNewDng({
                        "calories": parseInt(calories, 10),
                        "carbohydrates": parseInt(carbohydrates, 10),
                        "fat": parseInt(fat, 10),
                        "protein": parseInt(protein, 10),
                        "user_id": parseInt(user?.id, 10)
                    }))
                    setCounter(prev => prev + 1);
                    alert("New Daily Nutrition Goal has been created.");
                    break;
                } else {
                    alert("Please complete Daily Nutrition Goals");
                }
                break;

            case "Update Goal":
                console.log(errors)
                if (!errors.length) {
                    await dispatch(updateCurrentDng({
                        "calories": parseInt(calories, 10),
                        "carbohydrates": parseInt(carbohydrates, 10),
                        "fat": parseInt(fat, 10),
                        "protein": parseInt(protein, 10),
                        "user_id": parseInt(user?.id, 10)
                    }))
                    alert("Exist Daily Nutrition Goal has been updated.")
                    setCounter(prev => prev + 1);
                    break;
                } else {
                    alert("Please complete Daily Nutrition Goals");
                }
                break;

            // case "Delete Goal":
            //     await dispatch(deleteUserDng(user?.id))
            //     setCalories("");
            //     setCarbohydrates("");
            //     setFat("");
            //     setProtein("");
            //     setCounter(prev => prev + 1);
            //     alert("Daily Nutrition Goal has been deleted.")
            //     setCounter(prev => prev + 1);
            //     break
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setCalories("");
        setCarbohydrates("");
        setFat("");
        setProtein("");
        alert("Food item has been deleted.");
        await dispatch(deleteUserDng(user?.id));
        history.push('/home');
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
                <div className="dng-form-container">
                    <div className="dng-title">
                        <h2> Daily Nutrition Goals</h2>
                    </div>
                    <form className="dng-form" autoComplete="off">
                        <div className="errors">
                            {errors.map((error, ind) => (
                            <div className="each-error" key={ind}>{error}</div>
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
                                <h4>{currentGoal ? "Update Goal" : "Create New Goal"}</h4>
                            </button>
                            <button className="delete-btn" type="submit" onClick={handleDelete}>
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

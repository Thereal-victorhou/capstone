import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { userDng } from '../../store/daily_nutrition_goals'

const DailyNutritionGoals = () => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [calories, setCalories] = useState("");
    const [carbohydrates, setCarbohydrates] = useState("");
    const [fat, setFat] = useState("");
    const [protein, setProtein] = useState("");

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user.id])

    useEffect(() => {
        dispatch(userDng(user.id))
    },[dispatch])

    useEffect(() => {}, [calories, carbohydrates, fat, protein])

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

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(`calories: ${calories}, carbohydrates: ${carbohydrates}, fat: ${fat}, protein: ${protein}`)
    }


    return (
        <>
            <h1>Welcome to DailyNutritionGoals Page</h1>
            {/* <h3>{`Calories: ${currentGoal.calories}`}</h3>
            <h3>{`Carbohydrates: ${currentGoal.carbohydrates}`}</h3>
            <h3>{`Fat: ${currentGoal.fat}`}</h3>
            <h3>{`Protein: ${currentGoal.protein}`}</h3> */}
            <div className="dng-form">
                <form onSubmit={onSubmit} className="-submit" autoComplete="off">
                    <div className="errors">
                        {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="dng-calories">
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
                    <div className="dng-carbohydrates">
                        <label className="dng-carbohydrates-label" htmlFor="carbohydrates">
                            Carbohydrates
                        </label>
                        <input
                            className="carbohydrates-input"
                            name="carbohydrates"
                            type="text"
                            value={carbohydrates}
                            onChange={updateCarbohydrates}
                        />
                    </div>
                    <div className="dng-fat">
                        <label className="dng-fat-label" htmlFor="fat">
                            Fat
                        </label>
                        <input
                            className="fat-input"
                            name="fat"
                            type="text"
                            value={fat}
                            onChange={updateFat}
                        />
                    </div>
                    <div className="dng-protein">
                        <label className="dng-protein-label" htmlFor="protein">
                            Protein
                        </label>
                        <input
                            className="protein-input"
                            name="protein"
                            type="text"
                            value={protein}
                            onChange={updateProtein}
                        />
                        <div className="login-lower">
                            <button className="submit-btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DailyNutritionGoals;

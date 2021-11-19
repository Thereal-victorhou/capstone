import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const FoodLog = () => {

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
    },[dispatch, calories, carbohydrates, fat, protein, counter])

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

    const handleClick = async (e) => {{
        e.preventDefault();

        switch (e.target.getAttribute('name')) {
            case 'breakfast':
                break
            case 'lunch':
                break
            case 'dinner':
                break
        }
    }};

    return (
        <>
            <div className="foodlog-main">
                <div className="foodlog-left">
                    <div className="foodlog-meal-container" name="breakfast" onClick={handleClick}>
                        <h3 name="breakfast">Breakfast</h3>
                    </div>
                    <div className="foodlog-meal-container" name="lunch" onClick={handleClick}>
                        <h3 name="lunch">Lunch</h3>
                    </div>
                    <div className="foodlog-meal-container" name="dinner" onClick={handleClick}>
                        <h3 name="dinner">Dinner</h3>
                    </div>
                </div>
                <div className="foodlog-right">
                    <div className="foodlog-nutrition">
                        <div className="meal-name">
                            <h3>*Meal Name*</h3>
                        </div>
                        <div className="food-name">
                            <h3>*Food Name*</h3>
                        </div>
                        <form className="nutrition-form">
                            <div className="foodlog-calories">
                                <label className="foodlog-calories" htmlFor="calories">Calories</label>
                                <input
                                    className="calories-input"
                                    name="calories"
                                    type="text"
                                    value={calories}
                                    onChange={updateCalories}
                                />
                            </div>
                            <div className="foodlog-carbs">
                                <label className="-carbohydrates-label" htmlFor="carbohydrates">Carbohydrates</label>
                                <input
                                    className="carbohydrates-input"
                                    name="carbohydrates"
                                    type="text"
                                    value={carbohydrates}
                                    onChange={updateCarbohydrates}
                                />
                            </div>
                            <div className="foodlog-fat">
                                <label className="dng-fat-label" htmlFor="fat">Fat</label>
                                <input
                                    className="fat-input"
                                    name="fat"
                                    type="text"
                                    value={fat}
                                    onChange={updateFat}
                                />
                            </div>
                            <div className="foodlog-protein">
                                <label className="dng-protein-label" htmlFor="protein">Protein</label>
                                <input
                                    className="protein-input"
                                    name="protein"
                                    type="text"
                                    value={protein}
                                    onChange={updateProtein}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodLog;

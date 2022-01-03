import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userDng, createNewDng, updateCurrentDng, deleteUserDng } from '../../store/daily_nutrition_goals';
import { deleteAllFoodLog } from '../../store/foodLog';

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

    const [calBool, setCalBool] = useState(false);
    const [carbBool, setCarbBool] = useState(false);
    const [fatBool, setFatBool] = useState(false);
    const [proBool, setProBool] = useState(false);

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

    // Validations
    useEffect(() => {
        let errArr = [];

        if (calBool && !calories) {
            errArr.push({msg: "Please fill out Calories field"})
            setErrors(errArr);
            // console.log("errArr====================>",errArr)
        }

        if (carbBool) {
            if (carbohydrates && carbohydrates.length > 0) {
                if(calories && (carbohydrates*4 > calories)) {
                    errArr.push({msg: "Carbohydrates cannot exceed calories", type: "carbohydrates"})
                    setErrors(errArr);
                    console.log("errArr====================>",errArr)

                } else {
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'carbohydrates'), 1))
                    setErrors(errArr)
                    console.log("errArr====================>",errArr)
                }

            } else if (!carbohydrates) {
                errArr.push({msg: "Please fill out Carbohydrates field"})
                setErrors(errArr);
                console.log("errArr====================>",errArr)

            }
        }

        if (fatBool) {
            // console.log("hello from fat")
            // console.log(fat.length)
            if (fat && fat.length > 0) {
                if (calories && (fat*9 > calories)) {
                        errArr.push({msg: "Fat cannot exceed calories", type: "fat"})
                        setErrors(errArr);
                        console.log("errArr====================>",errArr)

                }
                else {
                    // errArr.pop()
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'fat'), 1))
                    setErrors(errArr)
                    console.log("errArr====================>",errArr)
                }

            } else if (!fat) {
                errArr.push({msg: "Please fill out Fat field"})
                setErrors(errArr);
                console.log("errArr====================>",errArr)

            }
        }

        if (proBool) {
            if (protein && protein.length > 0) {
                if(calories && (protein*4 > calories)) {
                    errArr.push({msg: `Protein cannot exceed calories`, type: "protein"})
                    setErrors(errArr);
                    console.log("errArr====================>",errArr)


                } else {
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'protein'), 1))
                    setErrors(errArr)
                    console.log("errArr====================>",errArr)
                }

            } else if (!protein) {
                errArr.push({msg: "Please fill out Protein field"})
                setErrors(errArr);
                console.log("errArr====================>",errArr)

            }
        }


        if (calories && carbohydrates && fat && protein) {
            if ((carbohydrates*4 + fat*9 + protein*4) > calories){
                errArr.push({msg: `Sumn of macros cannot exceed calories`, type: "total"})
            } else {
                errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'total'), 1))
                setErrors(errArr)
                console.log("errArr====================>",errArr)
            }
        }

    },[calories, carbohydrates, fat, protein, calBool, carbBool, fatBool, proBool])

    const handleClick = (e) => {
        e.preventDefault();

        switch(e.target.name) {
            case 'calories':
                setCarbBool(false);
                setFatBool(false);
                setProBool(false);
                setCalBool(true);
                // console.log("Hello from calories.")
                break;

            case 'carbohydrates':
                setFatBool(false);
                setProBool(false);
                setCalBool(false);
                setCarbBool(true);
                // console.log("inside carbs")
                break;

            case 'fat':
                setProBool(false);
                setCalBool(false);
                setCarbBool(false);
                setFatBool(true);
                // console.log("inside fat")
                break;

            case 'protein':
                setCalBool(false);
                setCarbBool(false);
                setFatBool(false);
                setProBool(true);
                console.log("inside protein")
                break;
        }
    }

    const updateCalories = (e) => {
        if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
            setCalories(e.target.value);
        }
    }
    const updateCarbohydrates = (e) => {
        if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
            setCarbohydrates(e.target.value);
        }
    }
    const updateFat = (e) => {
        if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
            setFat(e.target.value);
        }
    }
    const updateProtein = (e) => {
        if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
            setProtein(e.target.value);
        }
    }

    const handleButton = async (e) => {
        e.preventDefault()

        switch (e.target.innerText) {
            case "Create New Goal":
                // console.log(errors)
                if (!errors.length && calories && carbohydrates && fat && protein) {
                    await dispatch(createNewDng({
                        "calories": parseInt(calories, 10),
                        "carbohydrates": parseInt(carbohydrates, 10),
                        "fat": parseInt(fat, 10),
                        "protein": parseInt(protein, 10),
                        "user_id": parseInt(user?.id, 10)
                    }))
                    setCounter(prev => prev + 1);
                    alert("New Daily Nutrition Goal has been created.");
                    history.push('/home');
                    break;
                } else {
                    alert("Please complete Daily Nutrition Goals");
                }
                break;

            case "Update Goal":
                console.log(errors)
                if (!errors.length && calories && carbohydrates && fat && protein) {
                    await dispatch(updateCurrentDng({
                        "calories": parseInt(calories, 10),
                        "carbohydrates": parseInt(carbohydrates, 10),
                        "fat": parseInt(fat, 10),
                        "protein": parseInt(protein, 10),
                        "user_id": parseInt(user?.id, 10)
                    }))
                    alert("Exist Daily Nutrition Goal has been updated.")
                    setCounter(prev => prev + 1);
                    history.push('/home');
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

    const handleDelete = async(e) => {
        e.preventDefault();

        if (currentGoal) {
            // console.log("before dispatches")
            await dispatch(deleteAllFoodLog(user?.id));
            // console.log("in between dispatches")
            await dispatch(deleteUserDng(user?.id));
            // console.log("after dispatches")
            alert("Food item has been deleted.");
            history.push('/home');

        } else {
            alert("Cannot delete Daily Nutrition Goal because it does not exist.")
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
                <div className="dng-form-container">
                    <div className="dng-title">
                        <h2> Daily Nutrition Goals</h2>
                    </div>
                    <form className="dng-form" autoComplete="off">
                        <div className="errors">
                            {errors.map((error, ind) => (
                            <div className="each-error" key={ind}>{error.msg}</div>
                            ))}
                        </div>
                        <div className="dng-container">
                            <label className="dng-calories-label" htmlFor="calories">
                                Calories
                            </label>
                            <input
                                required
                                className="calories-input"
                                name="calories"
                                type="text"
                                value={calories}
                                onChange={updateCalories}
                                onClick={handleClick}
                                maxLength="4"
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-carbohydrates-label" htmlFor="carbohydrates">
                                Carbohydrates (g)
                            </label>
                            <input
                                required
                                className="carbohydrates-input"
                                name="carbohydrates"
                                type="text"
                                value={carbohydrates}
                                onChange={updateCarbohydrates}
                                onClick={handleClick}
                                maxLength="3"
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-fat-label" htmlFor="fat">
                                Fat (g)
                            </label>
                            <input
                                required
                                className="fat-input"
                                name="fat"
                                type="text"
                                value={fat}
                                onChange={updateFat}
                                onClick={handleClick}
                                maxLength="3"
                            />
                        </div>
                        <div className="dng-container">
                            <label className="dng-protein-label" htmlFor="protein">
                                Protein (g)
                            </label>
                            <input
                                required
                                className="protein-input"
                                name="protein"
                                type="text"
                                value={protein}
                                onChange={updateProtein}
                                onClick={handleClick}
                                maxLength="3"
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

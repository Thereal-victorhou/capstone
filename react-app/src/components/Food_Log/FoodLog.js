import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog, createFoodLog, updateFoodLog, deleteFoodLog } from '../../store/foodLog';

const FoodLog = () => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])

    const currentFoodLog = useSelector(state => state.foodlog);
    // console.log("currentFoodLog", currentFoodLog)
    const dispatch = useDispatch();
    const history = useHistory();

    const defaultLog = currentFoodLog ?
        Object.values(currentFoodLog).filter(log => log.meal === "breakfast") &&
        Object.values(currentFoodLog).filter(log => log.meal === "breakfast")[0] : "";

    const [selectedMeal, setSelectedMeal] = useState(defaultLog ? "breakfast" : "")
    const [errors, setErrors] = useState([]);
    const [foodName, setFoodName] = useState(defaultLog ? defaultLog.name : "")
    const [calories, setCalories] = useState(defaultLog ? defaultLog.calories: "");
    const [carbohydrates, setCarbohydrates] = useState(defaultLog ? defaultLog.carbohydrates: "");
    const [fat, setFat] = useState(defaultLog ? defaultLog.fat: "");
    const [protein, setProtein] = useState(defaultLog ? defaultLog.protein: "");

    const [nameBool, setNameBool] = useState(false);
    const [calBool, setCalBool] = useState(false);
    const [carbBool, setCarbBool] = useState(false);
    const [fatBool, setFatBool] = useState(false);
    const [proBool, setProBool] = useState(false);

    const [count, setCount] = useState(0);

    const [curLog, setCurFoodLog] = useState({})

    useEffect(() => {
        const filtered = Object.values(currentFoodLog)?.filter(log => log.meal === `${selectedMeal}`)[0];
        setCurFoodLog(filtered);

    },[count, currentFoodLog, selectedMeal])

    useEffect(() =>  {
        if (curLog) {
            // console.log(curLog)
            setFoodName(curLog.name);
            setCalories(curLog.calories);
            setCarbohydrates(curLog.carbohydrates);
            setFat(curLog.fat);
            setProtein(curLog.protein);
            // console.log('after', curLog)

        } else {
            setFoodName("");
            setCalories("");
            setCarbohydrates("");
            setFat("");
            setProtein("");
        }
    }, [curLog])

    useEffect(() =>  {
        dispatch(userDng(user?.id))
        dispatch(userFoodLog(user?.id))

    },[dispatch, selectedMeal])

    useEffect(() => {
        let errArr = []

        if (nameBool && !foodName) {
            errArr.push({msg: "Please fill out Name field", type: 'foodName'})
            setErrors(errArr);
        } else {
            errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'foodName'), 1))
            setErrors(errArr)
        }

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


    },[foodName, calories, carbohydrates, fat, protein, nameBool, calBool, carbBool, fatBool, proBool])

    const handleBool = (e) => {
        e.preventDefault();

        switch(e.target.name) {
            case 'food-name':
                setCarbBool(false);
                setFatBool(false);
                setProBool(false);
                setCalBool(false);
                setNameBool(true);

            case 'calories':
                setNameBool(false);
                setCarbBool(false);
                setFatBool(false);
                setProBool(false);
                setCalBool(true);
                // console.log("Hello from calories.")
                break;

            case 'carbohydrates':
                setNameBool(false);
                setFatBool(false);
                setProBool(false);
                setCalBool(false);
                setCarbBool(true);
                // console.log("inside carbs")
                break;

            case 'fat':
                setNameBool(false);
                setProBool(false);
                setCalBool(false);
                setCarbBool(false);
                setFatBool(true);
                // console.log("inside fat")
                break;

            case 'protein':
                setNameBool(false);
                setCalBool(false);
                setCarbBool(false);
                setFatBool(false);
                setProBool(true);
                console.log("inside protein")
                break;
        }
    }

    const updateFoodName = (e) => {
        setFoodName(e.target.value);
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

        if (currentGoal) {
            switch (e.target.innerText) {
                case "Add New Item":
                    if (!errors.length && calories && carbohydrates && fat && protein) {
                        await dispatch(createFoodLog({
                            "name": foodName,
                            "meal": selectedMeal,
                            "user_id": parseInt(user?.id, 10),
                            "calories": parseInt(calories, 10),
                            "carbohydrates": parseInt(carbohydrates, 10),
                            "fat": parseInt(fat, 10),
                            "protein": parseInt(protein, 10),
                            "daily_nutrition_goals_id": parseInt(currentGoal?.id, 10)
                        }));
                        alert("New food item has been added.")
                        history.push('/home')
                        break;
                    } else {
                        alert(`Please complete ${selectedMeal} entry before adding item.` );
                        break;
                    }

                case "Update Item":
                    if (!errors.length && calories && carbohydrates && fat && protein) {
                        await dispatch(updateFoodLog({
                            "name": foodName,
                            "meal": selectedMeal,
                            "user_id": parseInt(user?.id, 10),
                            "calories": parseInt(calories, 10),
                            "carbohydrates": parseInt(carbohydrates, 10),
                            "fat": parseInt(fat, 10),
                            "protein": parseInt(protein, 10),
                            "daily_nutrition_goals_id": parseInt(currentGoal?.id, 10)
                        }));
                        alert("Existing food item has been updated.")
                        history.push('/home')
                        break;
                    } else {
                        alert(`Please complete ${selectedMeal} entry before updating item.` );
                        break;
                    }
            }

        } else {
            alert("A Daily Nutrition Goal must be created first.")

        }

    }


    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteFoodLog({"user_id": user?.id, "meal": selectedMeal}))
        alert("Food item has been deleted.")
        history.push('/home')
    }

    return (
        <>
            <div className="foodlog-main">
                <div className="main-container">
                    <div className="foodlog-title-container">
                        <p>Food Log</p>
                        {console.log(defaultLog)}
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
                        <div className="foodlog-nutrition">
                            <form className="foodlog-form">
                                <div className="errors">
                                    {errors.map((error, ind) => (
                                    <div className="each-error" key={ind}>{error.msg}</div>
                                    ))}
                                </div>
                                <div className="foodlog-container">
                                    <label className="foodlog-calories" htmlFor="food-name">Food Name</label>
                                    <input
                                        className="food-name-input"
                                        name="food-name"
                                        type="text"
                                        value={foodName}
                                        onChange={updateFoodName}
                                        onClick={handleBool}
                                        maxLength="20"
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
                                        onClick={handleBool}
                                        maxLength="4"
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
                                        onClick={handleBool}
                                        maxLength="3"
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
                                        onClick={handleBool}
                                        maxLength="3"
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
                                        onClick={handleBool}
                                        maxLength="3"
                                    />
                                </div>
                                <div className="foodlog-lower">
                                    <button className="foodlog-submit-btn" type="submit" onClick={handleButton}>
                                        <h4>{curLog ? "Update Item" : "Add New Item"}</h4>
                                    </button>
                                    <button className="foodlog-delete-btn" type="submit" onClick={handleDelete}>
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

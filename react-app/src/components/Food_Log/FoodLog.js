import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog, createFoodLog, updateFoodLog, deleteFoodLog } from '../../store/foodLog';
import NewFoodLogModal from '../FoodLogModal/NewFoodLogModal';
import UpdateFoodLogModal from '../FoodLogModal/UpdateFoodLogModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FoodLog = () => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])

    const currentFoodLog = useSelector(state => Object.values(state.foodlog));
    console.log("currentFoodLog", currentFoodLog)
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

    // useEffect(() => {
    //     let errArr = []

    //     if (nameBool && !foodName) {
    //         errArr.push({msg: "Please fill out Name field", type: 'foodName'})
    //         setErrors(errArr);
    //     } else {
    //         errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'foodName'), 1))
    //         setErrors(errArr)
    //     }

    //     if (calBool && !calories) {
    //         errArr.push({msg: "Please fill out Calories field"})
    //         setErrors(errArr);
    //         // console.log("errArr====================>",errArr)
    //     }


    //     if (carbBool) {
    //         if (carbohydrates && carbohydrates.length > 0) {
    //             if(calories && (carbohydrates*4 > calories)) {
    //                 errArr.push({msg: "Carbohydrates cannot exceed calories", type: "carbohydrates"})
    //                 setErrors(errArr);
    //                 console.log("errArr====================>",errArr)

    //             } else {
    //                 errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'carbohydrates'), 1))
    //                 setErrors(errArr)
    //                 console.log("errArr====================>",errArr)
    //             }

    //         } else if (!carbohydrates) {
    //             errArr.push({msg: "Please fill out Carbohydrates field"})
    //             setErrors(errArr);
    //             console.log("errArr====================>",errArr)

    //         }
    //     }

    //     if (fatBool) {
    //         // console.log("hello from fat")
    //         // console.log(fat.length)
    //         if (fat && fat.length > 0) {
    //             if (calories && (fat*9 > calories)) {
    //                     errArr.push({msg: "Fat cannot exceed calories", type: "fat"})
    //                     setErrors(errArr);
    //                     console.log("errArr====================>",errArr)

    //             }
    //             else {
    //                 // errArr.pop()
    //                 errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'fat'), 1))
    //                 setErrors(errArr)
    //                 console.log("errArr====================>",errArr)
    //             }

    //         } else if (!fat) {
    //             errArr.push({msg: "Please fill out Fat field"})
    //             setErrors(errArr);
    //             console.log("errArr====================>",errArr)

    //         }
    //     }

    //     if (proBool) {
    //         if (protein && protein.length > 0) {
    //             if(calories && (protein*4 > calories)) {
    //                 errArr.push({msg: `Protein cannot exceed calories`, type: "protein"})
    //                 setErrors(errArr);
    //                 console.log("errArr====================>",errArr)


    //             } else {
    //                 errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'protein'), 1))
    //                 setErrors(errArr)
    //                 console.log("errArr====================>",errArr)
    //             }

    //         } else if (!protein) {
    //             errArr.push({msg: "Please fill out Protein field"})
    //             setErrors(errArr);
    //             console.log("errArr====================>",errArr)

    //         }
    //     }


    //     if (calories && carbohydrates && fat && protein) {
    //         if ((carbohydrates*4 + fat*9 + protein*4) > calories){
    //             errArr.push({msg: `Sumn of macros cannot exceed calories`, type: "total"})
    //         } else {
    //             errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'total'), 1))
    //             setErrors(errArr)
    //             console.log("errArr====================>",errArr)
    //         }
    //     }


    // },[foodName, calories, carbohydrates, fat, protein, nameBool, calBool, carbBool, fatBool, proBool])

    // const handleBool = (e) => {
    //     e.preventDefault();

    //     switch(e.target.name) {
    //         case 'food-name':
    //             setCarbBool(false);
    //             setFatBool(false);
    //             setProBool(false);
    //             setCalBool(false);
    //             setNameBool(true);

    //         case 'calories':
    //             setNameBool(false);
    //             setCarbBool(false);
    //             setFatBool(false);
    //             setProBool(false);
    //             setCalBool(true);
    //             // console.log("Hello from calories.")
    //             break;

    //         case 'carbohydrates':
    //             setNameBool(false);
    //             setFatBool(false);
    //             setProBool(false);
    //             setCalBool(false);
    //             setCarbBool(true);
    //             // console.log("inside carbs")
    //             break;

    //         case 'fat':
    //             setNameBool(false);
    //             setProBool(false);
    //             setCalBool(false);
    //             setCarbBool(false);
    //             setFatBool(true);
    //             // console.log("inside fat")
    //             break;

    //         case 'protein':
    //             setNameBool(false);
    //             setCalBool(false);
    //             setCarbBool(false);
    //             setFatBool(false);
    //             setProBool(true);
    //             console.log("inside protein")
    //             break;
    //     }
    // }

    // const updateFoodName = (e) => {
    //     setFoodName(e.target.value);
    // }

    // const updateCalories = (e) => {
    //     if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
    //         setCalories(e.target.value);
    //     }
    // }
    // const updateCarbohydrates = (e) => {
    //     if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
    //         setCarbohydrates(e.target.value);
    //     }
    // }
    // const updateFat = (e) => {
    //     if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
    //         setFat(e.target.value);
    //     }
    // }
    // const updateProtein = (e) => {
    //     if (e.target.value === '' || (/^[0-9]+$/.test(e.target.value))) {
    //         setProtein(e.target.value);
    //     }
    // }

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


    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteFoodLog({"user_id": user?.id, "meal": selectedMeal}))
        alert("Food item has been deleted.")
        history.push('/home')
    }

    // Nutrition for Food Log item
    const eachFoodNutrition = (log) => {
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
                    <UpdateFoodLogModal selectedMeal={selectedMeal}/>
                    <span className="foodlog-existing-delete">
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </div>
            </div>
        )
    }

    // Conditional Rendering of Current FoodLog for Each Meal
    const existingFoodEntries = (meal) => {
        if (meal === "breakfast") {
            return currentFoodLog[0].breakfast?.map(log => eachFoodNutrition(log))
        }
        if (meal === "lunch") {
            return currentFoodLog[1].lunch?.map(log => eachFoodNutrition(log))
        }
        if (meal === "dinner") {
            return currentFoodLog[2].dinner?.map(log => eachFoodNutrition(log))
        }
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
                            {selectedMeal && (
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
                        </div>
                        <NewFoodLogModal selectedMeal={selectedMeal}/>
                        {/* <div className="foodlog-lower">
                            <button className="foodlog-submit-btn" type="submit" onClick={handleUpdate}>
                                <h4>Update Item</h4>
                            </button>
                            <button className="foodlog-delete-btn" type="submit" onClick={handleDelete}>
                                <h4>Delete Item</h4>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodLog;

import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog, createFoodLog, updateFoodLog, deleteFoodLog } from '../../store/foodLog';
import { searchForFoodItem } from '../../store/search';
import { specificFoodItem } from "../../store/search";

const AddFood = ({ selectedMeal }) => {

    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])
    const currentFoodLog = useSelector(state => state.foodlog);
    const currentSearchResults = useSelector(state => Object.values(state.search));

    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [foodName, setFoodName] = useState("")
    const [calories, setCalories] = useState("");
    const [carbohydrates, setCarbohydrates] = useState("");
    const [fat, setFat] = useState("");
    const [protein, setProtein] = useState("");

    const [nameBool, setNameBool] = useState(false);
    const [calBool, setCalBool] = useState(false);
    const [carbBool, setCarbBool] = useState(false);
    const [fatBool, setFatBool] = useState(false);
    const [proBool, setProBool] = useState(false);

    const [search, setSearch] = useState("");

    // const [curLog, setCurFoodLog] = useState({})

    // useEffect(() => {
    //     const filtered = Object.values(currentFoodLog)?.filter(log => log.meal === `${selectedMeal}`)[0];
    //     setCurFoodLog(filtered);

    // },[currentFoodLog, selectedMeal])

    const precisionTwo = (num) => {
        return +(Math.round(num + "e+2") + "e-2")
    }

    useEffect(() =>  {
        if (currentSearchResults && currentSearchResults.length > 20) {
            // console.log("Inside current UseEffect")
            // console.log('=========', currentSearchResults[currentSearchResults.length-1])
            const currentlySelected = currentSearchResults[currentSearchResults.length-1]
            setFoodName(currentlySelected.food);
            setCalories(parseInt(precisionTwo(currentlySelected.calories)), 10);
            setCarbohydrates(parseInt(precisionTwo(currentlySelected.carbohydrates)), 10);
            setFat(parseInt(precisionTwo(currentlySelected.fat)), 10);
            setProtein(parseInt(precisionTwo(currentlySelected.protein)), 10);
        }
    }, [currentSearchResults])

    // Input Validations
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
                    // console.log("errArr====================>",errArr)

                } else {
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'carbohydrates'), 1))
                    setErrors(errArr)
                    // console.log("errArr====================>",errArr)
                }

            } else if (!carbohydrates) {
                errArr.push({msg: "Please fill out Carbohydrates field"})
                setErrors(errArr);
                // console.log("errArr====================>",errArr)
            }
        }

        if (fatBool) {
            // console.log("hello from fat")
            // console.log(fat.length)
            if (fat && fat.length > 0) {
                if (calories && (fat*9 > calories)) {
                        errArr.push({msg: "Fat cannot exceed calories", type: "fat"})
                        setErrors(errArr);
                        // console.log("errArr====================>",errArr)

                }
                else {
                    // errArr.pop()
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'fat'), 1))
                    setErrors(errArr)
                    // console.log("errArr====================>",errArr)
                }

            } else if (!fat) {
                errArr.push({msg: "Please fill out Fat field"})
                setErrors(errArr);
                // console.log("errArr====================>",errArr)
            }
        }

        if (proBool) {
            if (protein && protein.length > 0) {
                if(calories && (protein*4 > calories)) {
                    errArr.push({msg: `Protein cannot exceed calories`, type: "protein"})
                    setErrors(errArr);
                    // console.log("errArr====================>",errArr)


                } else {
                    errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'protein'), 1))
                    setErrors(errArr)
                    // console.log("errArr====================>",errArr)
                }

            } else if (!protein) {
                errArr.push({msg: "Please fill out Protein field"})
                setErrors(errArr);
                // console.log("errArr====================>",errArr)

            }
        }


        if (calories && carbohydrates && fat && protein) {
            if ((carbohydrates*4 + fat*9 + protein*4) > calories){
                errArr.push({msg: `Sumn of macros cannot exceed calories`, type: "total"})
            } else {
                errArr.forEach(obj => errArr.splice(errArr.indexOf(obj.type === 'total'), 1))
                setErrors(errArr)
                // console.log("errArr====================>",errArr)
            }
        }
    },[foodName, calories, carbohydrates, fat, protein, nameBool, calBool, carbBool, fatBool, proBool])

    // Live search
    useEffect(() => {
        if (search.length > 0) {
            dispatch(searchForFoodItem(search))
        }
    }, [search])


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
                // console.log("inside protein")
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

    const handleButton = async (e) => {
        e.preventDefault()

        if (currentGoal) {
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
                return;
            } else {
                alert(`Please complete ${selectedMeal} entry before adding item.` );
                return;
            }

        } else {
            alert("A Daily Nutrition Goal must be created first.")
        }

    }

    const searchForSpecificItem = async(e) => {
        e.preventDefault();
        await dispatch(specificFoodItem(e.target.innerText))
    }

    return (
        <div className="new-modal-main">
            <div className="modal-title">
                <h1>{`New ${selectedMeal.replace(selectedMeal.split('')[0], selectedMeal.split('')[0].toUpperCase())} Item`}</h1>
            </div>
            <div className="foodlog-modal-main">
                <div className="search-container">
                    <input className="search-bar" placeholder="Search for food..." value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    {/* <button className='testing-search' onClick={searchForItem}>search</button> */}
                    <div className="search-results">
                        {search.length > 0 && currentSearchResults?.length > 0 && currentSearchResults?.map((res) => (
                            <div className="result-box" key={currentSearchResults?.indexOf(res)} value={res?.food_name} onClick={searchForSpecificItem}>
                                <p>{res?.food_name}</p>
                            </div>
                            )
                            )}
                    </div>
                    <div className="favorite-foodlist">
                        <h3>Favorites</h3>
                    </div>
                </div>
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
                            maxLength="5"
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
                            maxLength="5"
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
                            maxLength="5"
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
                            maxLength="5"
                        />
                    </div>
                    <div className="foodlog-lower">
                        <button className="foodlog-submit-btn" type="submit" onClick={handleButton}>
                            <h4>Add to favorite</h4>
                        </button>
                        <button className="foodlog-submit-btn" type="submit" onClick={handleButton}>
                            <h4>Add New Item</h4>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddFood;

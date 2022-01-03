
import React from 'react';
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog } from '../../store/foodLog';
import Navigation from '../Splash/Navigation';
import './Home.css';

const Home = () => {
    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])
    const foodlog = useSelector(state => Object.values(state.foodlog));

    const [remCal, setRemCal] = useState(0)
    const [foodCal, setFoodCal] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    const history = useHistory();
    const dispatch = useDispatch();

    // Rounding Helper Function
    const precisionTwo = (num) => {
        return +(Math.round(num + "e+2") + "e-2")
    }

    useEffect(() => {
        dispatch(userDng(user?.id));
        dispatch(userFoodLog(user?.id));
    }, [dispatch])


    useEffect(() => {
        if (foodlog) {
            // let emptyObj = foodlog[1];
            // console.log(emptyObj)
            // if (emptyObj === null) {
            //     setFoodCal(foodlog[0]?.calories)
            // }
            const calArr = [];
            const carbArr = [];
            const fatArr = [];
            const proArr = [];

            // Find total calories
            foodlog.forEach(log => calArr.push(log.calories));
            const totalCal = calArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            setFoodCal(totalCal)

            // Find total carbs
            foodlog.forEach(log => carbArr.push(log.carbohydrates));
            const totalCarbs = carbArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            setCarbohydrates(totalCarbs)
            console.log(totalCarbs)

            // Find total fats
            foodlog.forEach(log => fatArr.push(log.fat));
            const totalFat = fatArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            setFat(totalFat)
            console.log(totalFat)

            // Find total protein
            foodlog.forEach(log => proArr.push(log.protein));
            const totalProtein = proArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            setProtein(totalProtein)
            console.log(totalProtein)

            if (currentGoal) {
                if (!totalCal) {
                    setRemCal(currentGoal.calories)
                } else {
                    setRemCal(currentGoal.calories - totalCal)
                }
                const carbBar = document.querySelector(".carb-bar");
                carbBar.style.width = '0%';
                carbBar.style.width = `${precisionTwo((carbohydrates*4/currentGoal.calories) * 100)}%`;

                const fatBar = document.querySelector(".fat-bar");
                fatBar.style.width = "0%";
                fatBar.style.width = `${precisionTwo((fat*4/currentGoal.calories) * 100)}%`;

                const proBar = document.querySelector(".protein-bar");
                proBar.style.width = "0%";
                proBar.style.width = `${precisionTwo((protein*4/currentGoal.calories) * 100)}%`;
                proBar.style.borderRight = '2px solid rgb(205,205,205)';


            }
        }
    },[remCal, currentGoal, foodlog, foodCal])

    const handleClick = (e) => {
        e.preventDefault();

        if (currentGoal) {
            history.push('/food-log')
        } else {
            alert('Please create a Daily Nutrition Goal before adding food items')
        }
    };

    return (
        <div className="home-main">
            <div className="home-container">
                <div className="home-summary">
                    <p className="home-title">Your Daily Summary</p>
                    <div className="streak-tracker">
                        <p className="streak-count">1</p>
                        <p className="streak-text">DAY STREAK</p>
                    </div>
                </div>
                <div className="home-mid">
                    <div className="home-mid-left">
                        <div className="home-avatar">

                        </div>
                    </div>
                    <div className="home-mid-right">
                        <div className="calories-remaining">
                            <p>Calories Remaining</p>
                            <NavLink to='/daily-nutrition-goals' className="dng-link">Change</NavLink>
                        </div>
                        <div className="rem-cal">
                            <p>{remCal ? remCal : 0}</p>
                            <button onClick={handleClick}>Add Food</button>
                        </div>
                        <div className="energy-calculation">
                            <div className="energy-top">
                                <div className="cal-goal">
                                    <p className="cal-dng">{currentGoal ? currentGoal?.calories: 0}</p>
                                    <p className="cal-goal-text">GOAL</p>
                                </div>
                                <div className="current-food">
                                    <p className="cur-food">{foodCal ? foodCal : 0}</p>
                                    <p className="cur-food-text">FOOD</p>
                                </div>
                            </div>
                            <div className="energy-bottom">
                                <div className="energy-title">
                                    <p>Today's Progress</p>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="carb-bar"></div>
                                    <div className="fat-bar"></div>
                                    <div className="protein-bar"></div>
                                </div>
                                <div className="macros-container">
                                    <p>Daily Macros %</p>
                                    <div className="macros-breakdown">
                                        <div className="carb-box-container">
                                            <div className="carb-box"></div>
                                            <p>Carbs: {currentGoal ? precisionTwo((carbohydrates*4/currentGoal.calories) * 100) : 0}%</p>
                                        </div>
                                        <div className="fat-box-container">
                                            <div className="fat-box"></div>
                                            <p>Fats: {currentGoal ? precisionTwo((fat*9/currentGoal.calories) * 100) : 0}%</p>
                                        </div>
                                        <div className="pro-box-container">
                                            <div className="pro-box"></div>
                                            <p>Protein: {currentGoal ? precisionTwo((protein*4/currentGoal.calories) * 100) : 0}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

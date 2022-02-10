
import React from 'react';
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog } from '../../store/foodLog';
import Navigation from '../Splash/Navigation';
import './Home.css';

const Home = () => {
    const user = useSelector(state => state.session.user);
    const currentGoal = useSelector(state => state.dng[user?.id]);
    const foodlog = useSelector(state => Object.values(state.foodlog));

    const [remCal, setRemCal] = useState(0);
    const [foodCal, setFoodCal] = useState(0);
    const [carbohydrates, setCarbohydrates] = useState(0);
    const [fat, setFat] = useState(0);
    const [protein, setProtein] = useState(0);

    const [logLocation, setLogLocation] = useState([])
    const [breIdx, setBreIdx] = useState(-1);
    const [lunIdx, setLunIdx] = useState(-1);
    const [dinIdx, setDinIdx] = useState(-1);
    const [count, setCount] = useState(0);


    const [carbProg, setCarbProg] = useState(0);

    const history = useHistory();
    const dispatch = useDispatch();

    // Rounding Helper Function
    const precisionTwo = (num) => {
        return +(Math.round(num + "e+2") + "e-2")
    }

    const valueTransform = async (num) => {
        let currNum = 0;
        console.log("num=======", num)
        while (currNum <= num) {
            return new Promise((resolve, reject) => {
                setCarbProg(currNum)
                setTimeout(() => {
                    resolve(currNum + 0.01);
                }, 1);
            }).then(res => res);
        }
    }

    // find meal indices
    const breakfastIdx = logLocation.indexOf('breakfast');
    const lunchIdx = logLocation.indexOf('lunch');
    const dinnerIdx = logLocation.indexOf('dinner');

    useEffect(() => {
        dispatch(userDng(user?.id));
        dispatch(userFoodLog(user?.id));

        let loArr = []
        foodlog?.forEach(obj => {
            loArr.push(...Object.keys(obj))
        })
        setLogLocation(loArr)

    }, [dispatch])

    useEffect(() => {
        if (foodlog) {

            setBreIdx(breakfastIdx)
            setLunIdx(lunchIdx)
            setDinIdx(dinnerIdx)

            const totalCalArr = [];
            const totalCarbArr = [];
            const totalFatArr = [];
            const totalProArr = [];

            const breakfastCalArr = [];
            const breakfastCarbArr = [];
            const breakfastFatArr = [];
            const breakfastProArr = [];

            const lunchCalArr = [];
            const lunchCarbArr = [];
            const lunchFatArr = [];
            const lunchProArr = [];

            const dinnerCalArr = [];
            const dinnerCarbArr = [];
            const dinnerFatArr = [];
            const dinnerProArr = [];



            if (breIdx >= 0) {
                // Find breakfast calories
                foodlog[breIdx].breakfast?.forEach(log => breakfastCalArr.push(log.calories));
                const breakfastCal = breakfastCalArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalCalArr.push(breakfastCal);
                // Find breakfast carbs
                foodlog[breIdx].breakfast?.forEach(log => breakfastCarbArr.push(log.carbohydrates));
                const breakfastCarbs = breakfastCarbArr.reduce((previousValue, currentValue) => previousValue + currentValue, breIdx);
                totalCarbArr.push(breakfastCarbs);
                // Find breakfast fats
                foodlog[breIdx].breakfast?.forEach(log => breakfastFatArr.push(log.fat));
                const breakfastFat = breakfastFatArr.reduce((previousValue, currentValue) => previousValue + currentValue, breIdx);
                totalFatArr.push(breakfastFat);
                // Find breakfast protein
                foodlog[breIdx].breakfast?.forEach(log => breakfastProArr.push(log.protein));
                const breakfastProtein = breakfastProArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalProArr.push(breakfastProtein);
            }

            if (lunIdx >=0) {
                // Find lunch calories
                foodlog[lunIdx].lunch?.forEach(log => lunchCalArr.push(log.calories));
                const lunchCal = lunchCalArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalCalArr.push(lunchCal);
                // Find lunch carbs
                foodlog[lunIdx].lunch?.forEach(log => lunchCarbArr.push(log.carbohydrates));
                const lunchCarbs = lunchCarbArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalCarbArr.push(lunchCarbs);
                // Find lunch fats
                foodlog[lunIdx].lunch?.forEach(log => lunchFatArr.push(log.fat));
                const lunchFat = lunchFatArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalFatArr.push(lunchFat);
                // Find lunch protein
                foodlog[lunIdx].lunch?.forEach(log => lunchProArr.push(log.protein));
                const lunchProtein = lunchProArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalProArr.push(lunchProtein);
            }

            if (dinIdx >=0) {
                // Find breakfast calories
                foodlog[dinIdx].dinner?.forEach(log => dinnerCalArr.push(log.calories));
                const dinnerCal = dinnerCalArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalCalArr.push(dinnerCal);
                // Find breakfast carbs
                foodlog[dinIdx].dinner?.forEach(log => dinnerCarbArr.push(log.carbohydrates));
                const dinnerCarbs = dinnerCarbArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalCarbArr.push(dinnerCarbs);
                // Find breakfast fats
                foodlog[dinIdx].dinner?.forEach(log => dinnerFatArr.push(log.fat));
                const dinnerFat = dinnerFatArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalFatArr.push(dinnerFat);
                // Find breakfast protein
                foodlog[dinIdx].dinner?.forEach(log => dinnerProArr.push(log.protein));
                const dinnerProtein = dinnerProArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                totalProArr.push(dinnerProtein);
            }


            const totalCal = totalCalArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            const totalCarb = totalCarbArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            const totalFat = totalFatArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            const totalPro = totalProArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

            setFoodCal(totalCal);
            setCarbohydrates(totalCarb);
            setFat(totalFat);
            setProtein(totalPro);


            if (currentGoal) {
                if (!totalCal) {
                    setRemCal(currentGoal.calories)
                } else {
                    setRemCal(currentGoal.calories - totalCal)
                }

                // Animation helper
                const progressAnimation = (progress) => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(progress + 0.1);
                        }, 12);
                    }).then(res => res);
                };

                const carbBar = document.querySelector(".carb-bar");
                carbBar.style.width = '0%';

                const fatBar = document.querySelector(".fat-bar");
                fatBar.style.width = "0%";

                const proBar = document.querySelector(".protein-bar");
                proBar.style.width = "0%";

                if (carbohydrates && fat && protein) {
                    const carbPercent = precisionTwo((carbohydrates*4/currentGoal.calories) * 100);
                    const fatPercent = precisionTwo((fat*9/currentGoal.calories) * 100);
                    const proPercent = precisionTwo((protein*4/currentGoal.calories) * 100);

                    const carbBarFunc = async () => {
                        let progress = 0;
                        while (progress < carbPercent + 0.1) {
                            carbBar.style.width = `${progress}%`;
                            progress = await progressAnimation(progress);
                        }

                    }

                    const fatBarFunc = async () => {
                        let progress = 0;
                        while (progress < fatPercent + 0.1) {
                            fatBar.style.width = `${progress}%`;
                            progress = await progressAnimation(progress);
                        }

                    }

                    const proBarFunc = async () => {
                        let progress = 0;
                        while (progress < proPercent + 0.01) {
                        proBar.style.width = `${progress}%`;
                        progress = await progressAnimation(progress);

                        }
                    }

                    (async () => {
                        await carbBarFunc();
                        await fatBarFunc();
                        await proBarFunc();
                    })()

                }
                // carbBar.style.width = `${precisionTwo((carbohydrates*4/currentGoal.calories) * 100)}%`;

                if (fat) {


                }
                // fatBar.style.width = `${precisionTwo((fat*4/currentGoal.calories) * 100)}%`;

                if (protein) {

                }
                // proBar.style.width = `${precisionTwo((protein*4/currentGoal.calories) * 100)}%`;
                proBar.style.borderRight = '2px solid rgb(205,205,205)';
            }
        }
    },[remCal, currentGoal, foodlog, foodCal, breIdx, lunIdx, dinIdx])

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

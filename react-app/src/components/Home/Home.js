import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import { userDng } from '../../store/daily_nutrition_goals';
import { userFoodLog } from '../../store/foodLog';
import './Home.css';

const Home = () => {
    const [remCal, setRemCal] = useState(0)
    const [foodCal, setFoodCal] = useState(0);
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const currentGoal = useSelector(state => state.dng[user?.id])
    const foodlog = useSelector(state => Object.values(state.foodlog));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userDng(user?.id));
        dispatch(userFoodLog(user?.id));
    }, [])

    useEffect(() => {
        if (foodlog) {
            const calArr = [];
            foodlog.forEach(log => calArr.push(log.calories));
            const totalCal = calArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            setFoodCal(totalCal)
            if (currentGoal) {
                setRemCal(currentGoal.calories - totalCal)
                const progressBar = document.querySelector(".progress-bar");
                progressBar.style.width = '0%';
                progressBar.style.width = `${(totalCal / currentGoal.calories) * 100}%`;
                progressBar.style.borderRight = '2px solid rgb(205,205,205)';
            }
        }
    },[remCal, currentGoal, foodlog, foodCal])

    const handleClick = () => history.push('/food-log');

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
                            <p>{remCal}</p>
                            <button onClick={handleClick}>Add Food</button>
                        </div>
                        <div className="energy-calculation">
                            <div className="energy-top">
                                <div className="cal-goal">
                                    <p className="cal-dng">{currentGoal && currentGoal?.calories}</p>
                                    <p className="cal-goal-text">GOAL</p>
                                </div>
                                <div className="current-food">
                                    <p className="cur-food">{foodCal}</p>
                                    <p className="cur-food-text">FOOD</p>
                                </div>
                            </div>
                            <div className="energy-bottom">
                                <div className="energy-title">
                                    <p>Today's Progress</p>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar"></div>
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

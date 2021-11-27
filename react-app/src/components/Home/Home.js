import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
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
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

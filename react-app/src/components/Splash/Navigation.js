import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory} from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';

const Navigation = () => {
    const user = useSelector((state) => state.session.user);
    const currentGoal = useSelector(state => state.dng[user?.id]);
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        if (!currentGoal) {
            alert('Please create a Daily Nutrition Goal before adding a new food.')
        } else {
            history.push('/food-log')
        }

    }

    return (
        <div className="combined-bar">
            <div className="navbar">
                <h2 className="lom-title">LeanOnMe</h2>
                <div className="nav-right">
                {!user ? (
                    <>
                    <NavLink to="/login" className="login">
                        Log In
                    </NavLink>
                    <p className="link-divider">|</p>
                    <NavLink to="/sign-up" className="signup">
                        Sign Up
                    </NavLink>
                    </>
                ) : (
                    // <NavLink to="/home" className="signup">
                    //   Logout
                    // </NavLink>
                    <div className="nav-greeting-container">
                    <p className="nav-greeting">{user?.username}</p>
                    <LogoutButton />
                    </div>
                )}
                </div>
            </div>
            <div className="nav-bottom">
                {/* <div className="links-container">
                    <NavLink to={user ? "/home": "/login"} className="home-link" id="home">HOME</NavLink>
                    <NavLink to={user ? "/daily-nutrition-goals": "/login"} className="home-link" id="dng">DAILY NUTRITION GOALS</NavLink>
                    <NavLink to={user ? "/food-log": "/login"} className="home-link" id="foodlog">FOOD LOG</NavLink>
                </div> */}

                <div className="links-container">

                    {user ?
                        <>
                            <NavLink to="/home" className="home-link" id="home">HOME</NavLink>
                            <NavLink to="/daily-nutrition-goals" className="home-link" id="dng">DAILY NUTRITION GOALS</NavLink>
                            <button onClick={handleClick} className="home-link-btn" id="foodlog">FOOD LOG</button>
                        </>
                    :
                        <>
                            <NavLink to="/login" className="home-link" id="home">HOME</NavLink>
                            <NavLink to="/login" className="home-link" id="dng">DAILY NUTRITION GOALS</NavLink>
                            <NavLink to="/login" className="home-link" id="foodlog">FOOD LOG</NavLink>
                        </>
                    }

                </div>

            </div>
        </div>
    );
};

export default Navigation;

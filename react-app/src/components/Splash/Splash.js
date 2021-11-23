import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Splash = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="landing"
        style={{ backgroundImage:`url(http://hfhealthyliving.org/wp-content/uploads/2017/01/heart_healthy_post.jpg)`,
                backgroundSize: 'cover' }}
    >
      <div className="landing-top">
        <div className="landing-top-left">
          <p className="landing-top-text">
            Fitness starts <br />
            with what you <br />
            eat.
          </p>
          <p className="landing-top-desc">
          Take control of your goals. Track calories, break down ingredients, and log activities with LeanOnMe.
          </p>
          <div className="landing-signup">
            <div className="landing-signup-left">
              {!user ? (
                <NavLink to="/signup" className="landing-signup-btn">
                  START FOR FREE
                </NavLink>
              ) : (
                <NavLink to="/home" className="landing-signup-btn">
                  Learn More
                </NavLink>
              )}
            </div>
          </div>
            <div className="landing-login">
                <p>Already have an account?
                    <NavLink to="/login" className="landing-login-link"> Login</NavLink>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;

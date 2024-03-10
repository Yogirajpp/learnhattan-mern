import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Implement sign-out logic here
    // For example, clearing local storage and updating authentication state
    navigate('/');
  };

  return (
    <>
      {/* Navigation menu */}
      <nav className="my-nav">
        <div className="container">
          <div className="flex items-center justify-between header">
            <div className="logo">
              <Link to="/">
                <img src="/assets/images/logo2.png" alt="Learnhattan" />
              </Link>
            </div>

            <div className="nav-links">
              <Link to="/">Home</Link>
              <a href="#about">About</a>
              <a href="#cta">Community</a>
              <a href="#footer">Contact</a>
            </div>

            <div>
              {/* Conditionally render either Sign up or Sign out button */}
              {isLoggedIn ? (
                <div className='Signup'>
                  <button className='Btn' onClick={handleSignOut}>Sign out</button>
                </div>
              ) : (
                <Link to="/register" className="Signup">
                  <button className='Btn'>Sign up</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr />
    </>
  )
}

// Props validation
Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navigation;

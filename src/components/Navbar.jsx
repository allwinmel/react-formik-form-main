import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';


function Navbar() {

    const [currentLocation, setCurrentLocation] = useState('');
    const location = useLocation();
    const username = localStorage.getItem('name');

    useEffect(() => {
        setCurrentLocation(location.pathname);
      }, [location]);

      const handleLogout = () => {
        localStorage.setItem('isLoggedin','false');
        toast.success('User Logged Out Successfully!');
        window.location.href = '/login';
      };

  const shouldShowLogin = !['/login', '/dashboard'].includes(location.pathname);
  const shouldShowRegister = !['/register', '/dashboard'].includes(location.pathname);
  const shouldShowdashboard=!['/','/register','/login'].includes(location.pathname);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
      <Link to="/">
        <img
          src="/images/logoimg.svg"
          height="60"
          width="100"
          className="navbar-brand round rounded-circle"
          alt="Brand Logo"
        />
      </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          {shouldShowRegister && (
            <li className="nav-item mr-5">
              <Link to="/register" className="nav-link">
                <h4>Register <i className="fa-solid fa-user-plus"></i></h4>
              </Link>
            </li>
            )}
            {shouldShowLogin && (
            <li className="nav-item mr-5">
              <Link to="/login" className="nav-link">
                <h4>Login <i className="fa-solid fa-right-to-bracket"></i></h4>
              </Link>
            </li>
            )}
            {shouldShowdashboard && (
                <>
            <li className="nav-item ml-2">
              <h4><Link to="/dashboard" className="nav-link">Dashboard <i className="fa-solid fa-gauge"></i></Link></h4>
            </li>
            <li className="nav-item ml-2">
              <h4><Link to="/dashboard" className="nav-link">{username} <i className="fa-solid fa-user-secret"></i></Link></h4>
            </li>
            <li className="nav-item">
            <h4><Link to="/login" className="nav-link" onClick={handleLogout}>Logout <i className="fa-solid fa-power-off"></i></Link></h4>
            </li>
            </>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
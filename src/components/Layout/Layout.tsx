import React, { useState } from 'react';
import "./Layout.scss"
import BackIcon from '../../assets/back-icon.svg'
import MenuIcon from '../../assets/menu-icon.svg'
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/Auth/AuthContext';



const Layout: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();


  const onSignOut = () => {
    auth.signout(() => {
      navigate("/login");
    })
  }

  return (
    <>
      <nav className="navbar flex-container space-between">
        <button className='back-btn' onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" />
          <span>Back</span>
        </button>
        <button className='menu-btn' onClick={() => setShowMenu(!showMenu)}>
          <img src={MenuIcon} alt="Back" />
        </button>
      </nav>

      {showMenu &&
        <div className="menu">

          {location.pathname !== '/groups' &&
            [<button key={0} className="menu-item" onClick={() => null}>New Session</button>,
            <button key={1} className="menu-item" onClick={() => null}>Close Month</button>,
            <button key={2} className="menu-item" onClick={() => null}>View Payouts</button>]}

          <button className="menu-item" onClick={() => onSignOut()}>Sign out</button>
        </div>
      }
      <main><Outlet /></main>
    </>
  )
}

export default Layout;
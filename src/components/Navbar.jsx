import { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import useCustomizer from '../hooks/useCustomizer';
import { CartContext } from '../context/CartContext';
import { FaShoppingBag } from "react-icons/fa";
import axios from 'axios';

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mobileMenu } = useCustomizer();
  const { cart } = useContext(CartContext); 
  const [logoUrl, setLogoUrl] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const mobile = document.querySelector(".nav-links");
    if (isOpen && mobile) {
      mobile.style.backgroundColor = mobileMenu;
    } else {
      mobile.style.backgroundColor = 'transparent';
    } 
  }, [isOpen, mobileMenu])
  
  useEffect(() => {
    const fetchNavLogo = async () => {
        try {
            const response = await axios.get(`${baseUrl}wp-json/custom/v1/nav-logo`); 
            if (response.status === 200) {
                const data = response.data;
                console.log(response.data);
                setLogoUrl(data[0]); 
            } else {
                console.error('Failed to fetch logo URL');
            }
        } catch (error) {
            console.error('Error fetching logo URL', error);
        }
    };

    fetchNavLogo();
  }, []);

  return (
    <header>
      <nav className= {`navbar ${isOpen ? "menu-open" : ""}`}  >
        <NavLink to="/" className="logo">
          <img src={logoUrl} alt='Community Cat Coalition Logo' />
        </NavLink>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`bar bar1 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar2 ${isOpen ? "toggle" : ""}`}></div>
          <div className={`bar bar3 ${isOpen ? "toggle" : ""}`}></div>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
          </li>
           
          <li>
            <NavLink to='/articles' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
            Articles
            </NavLink>
          </li>

          <li>
            <NavLink to='/contact' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              Volunteer / Contact Us 
            </NavLink>
          </li>

          <li>
            <NavLink to='/store' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
            Shop / Donations
            </NavLink>
          </li>

          {cart.length > 0 && (
            <li>
              <NavLink to='/Cart' onClick={closeMenu} className={({isActive}) => (isActive ? 'active-link' : '')}>
              <p>Cart <FaShoppingBag />({cart.reduce((acc, item) => acc + item.quantity, 0)})</p> 
              </NavLink>
            </li>
          )}
          
        </ul>
      </nav>
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;

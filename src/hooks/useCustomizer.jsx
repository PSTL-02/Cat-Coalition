import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_WP_BASEURL;

const useCustomizer = () => {
  const [bgColor, setBgColor] = useState('');
  const [navColour, setNavColour] = useState('');
  const [mobileMenu, setMobileMenu] = useState('');
  const [btnColour, setBtnColour] = useState('');
  
  useEffect(() => {
    axios
      .get(`${baseUrl}wp-json/custom-theme/v1/customizer-settings`)
      .then((response) => {
        const { backgroundColor, navbarColor, mobileMenu, buttonColour} = response.data;
        setBgColor(backgroundColor);
        setNavColour(navbarColor);
        setMobileMenu(mobileMenu);
        setBtnColour(buttonColour);
      })
      .catch((error) => {
        console.error('Error fetching customizer settings:', error);
      });
  }, [baseUrl]);

  return {bgColor, navColour, mobileMenu, btnColour};
};

export default useCustomizer;
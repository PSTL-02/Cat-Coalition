import { HashRouter } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'
import useCustomizer from './hooks/useCustomizer';

import Navbar from './components/Navbar';
import Links from './components/Links'
import Footer from './components/Footer';

const App = () => {
  const {bgColor, navColour, btnColour} = useCustomizer();

  useEffect(() => {
    document.body.style.backgroundColor = `#${bgColor}`;
    document.querySelector("nav").style.backgroundColor = navColour;
    document.querySelector("footer").style.backgroundColor = navColour;
    document.querySelector("button").style.backgroundColor = btnColour;

  }, [bgColor, navColour, btnColour]);
  
  return (
  <HashRouter>
    <Navbar/>
    <Links/>
    <Footer/>
  </HashRouter>
  )
}

export default App

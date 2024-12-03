import React from 'react'
import { AiOutlineFacebook } from "react-icons/ai";


const Footer = () => {
  return (
    <>
      <footer>
        {/* Left Section: Logo and Copyright */}
        <div className="left">
          <img src="/Blacklogo.png" alt="Community Cat Coalition Logo" />
          <p>©2024</p>
        </div>

        {/* Right Section: Contact Details */}
        <div className="right">
          <div>
            <a href="https://www.facebook.com/cccauckland">
              <AiOutlineFacebook />
            </a>
          </div>
          <div>
            <p>Community Cat Coalition</p>
            <p>PO Box 15903, New Lynn</p>
            <p>Auckland 0640</p>
          </div>
        </div>
      </footer>
    </>

  )
}

export default Footer

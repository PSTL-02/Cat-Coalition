import { useState } from "react";
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import toast, { Toaster } from "react-hot-toast";
import emailjs from 'emailjs-com';

const SERVICE_ID = import.meta.env.VITE_EMAIL_JS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID
const USER_ID = import.meta.env.VITE_EMAIL_JS_USER_ID 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
        .send(
            SERVICE_ID,
            TEMPLATE_ID,
            formData,
            USER_ID
        )
        .then(
            (response) => {
                toast.success('Success.', {
                    style: {
                      border: '5px solid #89CFF0',
                      padding: '16px',
                      color: '#333',
                    },
                    iconTheme: {
                      primary: '#E6E6FA',
                      secondary: '#333',
                    },
                  });
                setFormData({name: '', email: '', phone:'', subject: '', message: ''});
            },
            (error) => {
                toast.error('Failed to send message. Please try again');
            }
        );
  };


  return (
    <>
    <Toaster position="top-center"/>
    <Seo
        title="Volunteer/Contact - Community Cat Coalition"
        description="Come contact us at Community Cat Coalition "
        url={window.location.href}
      />

      <PageHeader title="VOLUNTEER / CONTACT US " image_url="/Header/Contact-header.png"/>

      <div className="VolunteerContact">
        {/* Volunteer Section */}
        <div className="Volunteer">
          <h3>Volunteer</h3>
          <p>
            CCC members are often looking for volunteers who would be willing and
            able to help them on occasion or regularly. There are several areas
            where volunteers are needed:
          </p>
          <br />
          <p className="bold">
            Colony care (need to be over 18 and have own transport)
          </p>
          <ul>
            <li>
              Feeding community cat colonies, usually as part of a roster
            </li>
            <li>
              Helping the colony manager with trapping and vet visits on occasion
            </li>
          </ul>
          <br />
          <p className="bold">Foster Care</p>
          <ul>
            <li>Fostering cats or kittens as they are prepared for adoption</li>
          </ul>
          <br />
          <p className="bold">TNR</p>
          <ul>
            <li>
              Helping members with trap neuter return or kitten rescue operations
            </li>
          </ul>
          <br />
          <p className="bold">Administration</p>
          <ul>
            <li>
              Assisting all CCC members by helping to make the organization run
              more efficiently.
            </li>
            <li>
              Volunteers are needed to help with a range of administrative tasks.
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="Contact">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Contact Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

    </>

  )
}

export default Contact

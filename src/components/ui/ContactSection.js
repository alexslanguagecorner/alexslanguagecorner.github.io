import React from "react";
import "./ContactSection.scss";

const ContactSection = () => {
  return (
    <div id="contact-section" className="contact-section">
      <div className="contact-tagline">
        <h3>Contact me to schedule a lesson or about anything I could possibly do for you, as I also offer translation services.</h3>
        <h2>You can reach me via:</h2>
      </div>
      <div className="contact-menu">
        <div className="email-card contact-card hero-card">
          <h3>E-mail</h3>
          <p>
            Send me a message with files:
            <a href="mailto:ola.tlumaczenia@gmail.com">ola.tlumaczenia@gmail.com</a>
          </p>
        </div>
        <div className="phone-card contact-card hero-card">
          <h3>Phone</h3>
          <p>
            Call me or text me: 
            <a href="tel:0048799051">+48 799 051 </a>
          </p>
        </div>

        <div className="facebook-card contact-card hero-card">
          <h3>Facebook</h3>
          <a href="https://www.facebook.com/share/1c5QE6A1M5/?mibextid=wwXlfr"> 
          Alex's Language Corner Profile</a>
        </div>
      </div>
      <div className="sub-about"></div>
    </div>
  );
};

export default ContactSection;

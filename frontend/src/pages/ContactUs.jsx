import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.subject.trim() && form.message.trim()) {
      setSubmitted(true);
      setForm({ subject: "", message: "" });
    }
  };

  return (
    <div className="contact-container">
      <h2>📞 Contact Us</h2>
      <p>Have questions? Reach out to us!</p>

      {/* Contact Form */}
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="subject"
            placeholder="Enter Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Enter Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
        {submitted && (
          <p className="success-msg">✅ Message Sent Successfully!</p>
        )}
      </div>

      {/* Contact Details */}
      <div className="contact-info">
        <h3>📧 Contact Information</h3>
        <p>
          <strong>Email:</strong> contact@fitness-tracker.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (817) 123-4567
        </p>
      </div>

      {/* Map & Address */}
      <div className="map-container">
        <h3>📍 Visit Us</h3>
        <p>NH Hall, Arlington, UTA 76013</p>
        <iframe
          title="UTA Conference Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.3130214450934!2d-97.11652718481535!3d32.731228180975775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7ded58b5282f%3A0x86a3cfcf8f63f5ff!2sNH%20Hall%2C%20University%20of%20Texas%20at%20Arlington%2C%20Arlington%2C%20TX%2076013%2C%20USA!5e0!3m2!1sen!2sin!4v1649078607593!5m2!1sen!2sin"
          width="100%"
          height="300"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

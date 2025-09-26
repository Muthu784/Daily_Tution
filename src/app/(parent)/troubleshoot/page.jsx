import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import './troubleshoot.css';

const Troubleshoot = () => {
  const { user } = useAuth();
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Contact form submitted:', contactForm);
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const toggleAccordion = (index) => {
    setExpandedAccordion(expandedAccordion === index ? null : index);
  };

  const commonIssues = [
    {
      title: "Can't Access Dashboard",
      content: "If you're having trouble accessing the dashboard, try clearing your browser cache and cookies. Make sure you're using the correct login credentials."
    },
    {
      title: "Payment Issues",
      content: "For payment-related problems, verify that your payment method is up to date and has sufficient funds. Check your email for any payment confirmation messages."
    },
    {
      title: "Technical Problems",
      content: "If you're experiencing technical issues, try refreshing the page or using a different browser. Make sure your internet connection is stable."
    }
  ];

  return (
    <div className="troubleshoot-container">
      <h1 className="page-title">Troubleshooting Guide</h1>

      <div className="common-issues-section">
        <h2>Common Issues</h2>
        {commonIssues.map((issue, index) => (
          <div key={index} className="accordion">
            <button 
              className={`accordion-header ${expandedAccordion === index ? 'active' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              {issue.title}
              <span className="accordion-icon">{expandedAccordion === index ? '−' : '+'}</span>
            </button>
            {expandedAccordion === index && (
              <div className="accordion-content">
                <p>{issue.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="contact-form-section">
        <h2>Need Additional Help?</h2>
        <p>If you couldn't find a solution to your problem, please fill out the form below and our support team will get back to you as soon as possible.</p>
        
        <form onSubmit={handleContactSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contactForm.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
          
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact-info-section">
        <h2>Contact Information</h2>
        <p>For urgent matters, you can reach our support team at:</p>
        <div className="contact-details">
          <p><strong>Email:</strong> contact.dailytuition@gmail.com</p>
          <p><strong>Phone:</strong>+1 647-988-7328</p>
          <p><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST</p>
        </div>
      </div>
    </div>
  );
};

export default Troubleshoot;
import React from 'react';
import './ContactUs.css'; // Import the stylesheet for styling

function ContactUs() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-info">
                <p><strong>Phone Number:</strong> 0115743313</p>
                <p><strong>Email:</strong> zuritrends@gmail.com</p>
                <p><strong>Location:</strong> Nairobi, along Ngong Road</p>
            </div>

            <div className="about-us">
                <h2>About Us</h2>
                <p>
                    Welcome to Zuri Trends Mall, your number one source for all things fashion. 
                    We're dedicated to providing you with the best of clothing and accessories, 
                    with a focus on dependability, customer service, and uniqueness.
                </p>
                <p>
                    We hope you enjoy our products as much as we enjoy offering them to you. 
                    If you have any questions or comments, please don't hesitate to contact us.
                </p>
                <img 
                    src="https://i.pinimg.com/236x/c2/0b/fb/c20bfb9a1b56503d3acabc50fb4dbb08.jpg" 
                    alt="Zuri Trends Mall" 
                    className="about-image"
                />
            </div>
        </div>
    );
}

export default ContactUs;

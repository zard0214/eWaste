import React, {useState} from 'react';
import Alert from "react-s-alert";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HelpAndContact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showAnswers, setShowAnswers] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);

     // Function to toggle answer visibility
     const toggleAnswer = (index) => {
        setShowAnswers(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    

    const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !message) {
        Alert.error('Please fill out all fields.');
        return;
    }
    setIsLoading(true);

    setTimeout(() => {
        Alert.success('Thank you for your response. Our team will contact you within some days regarding your query.');
        setName('');
        setEmail('');
        setMessage('');
        setIsLoading(false);
    }, 1000); // Adjust delay as needed
};

    // Function to copy email address to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        Alert.success('Email copied to clipboard!');
    };

    return (

        <div className="container" style={styles.container}>
          <h1 className="display-4" style={styles.mainHeading} >Get in Touch</h1>
            <p className="lead" style={styles.paragraph}>Welcome to our help and contact page. If you have any questions, concerns, or feedback regarding our e-waste recycling services, feel free to reach out to us using the contact information below.</p>
            
            <div className="mb-4" style={styles.contactInfo}>
                <h2>Contact Information</h2>
                <p>Email: info@ewaste.com <span style={styles.copySymbol} onClick={() => copyToClipboard('info@ewaste.com')}>&#x2398;</span></p>
                <p>Phone: +44 144 999 7200</p>
                <p>Address: 123 E-Waste, Sheffield , United Kingdom S3 7RD</p>
            </div>

            <div style={styles.faqSection}>
                <h2>Frequently Asked Questions (FAQs)</h2>
                <ul style={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <li key={index} style={styles.faqItem}>
                            <div style={styles.faqQuestion} onClick={() => toggleAnswer(index)}>
                                <strong>Q: {faq.question}</strong>
                                {showAnswers[index] ? <span style={styles.arrow}>▲</span> : <span style={styles.arrow}>▼</span>}
                            </div>
                            {showAnswers[index] && <p style={styles.faqAnswer}><strong>A:</strong> {faq.answer}</p>}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-4" style={styles.contactFormSection}>
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group" style={styles.messageContainer}>
                        <label htmlFor="message" style={styles.label}>Message:</label>
                        <textarea 
                            className="form-control" 
                            id="message" 
                            rows="6" 
                            placeholder="Enter your message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            style={styles.textArea}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {isLoading && <p>Submitting...</p>}
                </form>
            </div>
        </div>
    );
};


const faqs = [
    {
        question: 'How can I schedule a pickup for my e-waste?',
        answer: 'You can schedule a pickup by filling out the form on our website or by contacting us directly via email or phone.'
    },
    {
        question: 'What types of electronics do you accept for recycling?',
        answer: 'We accept a wide range of electronics including computers, laptops, smartphones, tablets, TVs, and more. Please refer to our website for a comprehensive list.'
    },
    {
        question: 'Is there a fee for recycling my e-waste?',
        answer: 'Our e-waste recycling services are free for individual consumers. However, there may be fees associated with corporate or bulk recycling services. Please contact us for more information.'
    },
    {
        question: 'Do you accept large appliances for recycling?',
        answer: 'No, not yet. We only accept electronic devices like phones, consoles, TVs, tablets, etc.'
    },
    {
        question: 'What is the process for recycling my e-waste?',
        answer: 'The process involves scheduling a pickup, dropping off your e-waste at the designated location, and receiving a receipt for your contribution to e-waste recycling.'
    },
    {
        question: 'How can I track the status of my e-waste recycling?',
        answer: 'After scheduling a pickup, you will receive an email with a tracking link. You can use this link to track the status of your e-waste recycling.'
    }
];

const styles = {

    messageContainer: {
        marginBottom: '20px',
    },
    label: {
        fontSize: '20px',
        marginBottom: '10px',
        display: 'block',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical',
    },
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
    },
    mainHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '45px',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '18px',
        marginBottom: '20px',
    },
    contactInfo: {
        marginBottom: '20px',
    },
    faqSection: {
        marginBottom: '20px',
    },
    faqHeading: {
        fontSize: '24px',
        marginBottom: '15px',
    },
    faqList: {
        listStyleType: 'none',
        padding: 0,
    },
    faqItem: {
        marginBottom: '15px',
    },
    faqQuestion: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    questionText: {
        fontSize: '20px',
    },
    answerText: {
        marginLeft: '20px',
    },
    arrow: {
        marginLeft: '5px',
    },
    copySymbol: {
        marginLeft: '5px',
        cursor: 'pointer',
    },
};

export default HelpAndContact;
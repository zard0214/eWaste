import background from "../img/background.jpg"
import background2 from "../img/introduction-2.jpg"
import background3 from "../img/introduction-1.jpg"
import background4 from "../img/introduction-3.jpg"
import "./Introduction.css"

export default function Introduction(){
    const handleHomepage = function (){
        window.location.href='/re-homepage';
    }
    const handleMenu = function (){
        window.location.href='/recycle_menu';
    }
    const handleRecycle = function (){
        const isLogin = localStorage.getItem('userId');

        const url = isLogin? '/addDevice': "/login";

        window.location.href=url;
    }
    return(
        <div className="section">
            <div className="intro-header">
                <h1>Ewaste</h1>
                <div className="intro-menu">
                    <h3 onClick={handleHomepage}><b>Get Started</b></h3>
                </div>
                <img src={background2} alt="" id="background-img"/>
            </div>
            <div className="intro-info">
                <h1>Recycle your electronic devices</h1>
                <h4>We are committed to helping you handle electronic devices that are no longer in use, protecting the
                    environment, and promoting sustainable development.</h4>
                <button className="btn btn-light mt-5" id="intro-button"
                        onClick={handleMenu}>Check the Recycle Menu
                </button>
                <img src={background} alt="" id="background-img"/>
            </div>
            <div className="intro-info">
                <h1>Data Retrieval Service</h1>
                <h4>We offer data retrieval service to help you safely process personal data from old devices.
                    Whether it's retrieving data from hard drives, phones, tablets, or other devices, we can provide you
                    with the solution you need. Protect your privacy and security at EWaste!</h4>
                <button className="btn btn-light mt-5" id="intro-button"
                        onClick={handleMenu}>Submit Service Request
                </button>
                <img src={background3} alt="" id="background-img"/>
            </div>
            <div className="intro-info">
                <h1>Cannot find your device?</h1>
                <h4>You can fill in detailed device information, including model, brand, year, and so on. Our professional team will evaluate the value of the equipment based on the information you provide and provide you with appropriate recycling solutions.</h4>
                <button className="btn btn-light mt-5" id="intro-button"
                        onClick={handleRecycle}>Submit Service Request
                </button>
                <img src={background4} alt="" id="background-img"/>
            </div>
        </div>
    )
}

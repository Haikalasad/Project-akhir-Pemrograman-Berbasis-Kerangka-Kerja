import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styling/footer.css'; 

const Footer = () => {
    return (
        <footer>
            <div className="column">
                <p><b>Need Help?</b></p>
                <ul>
                    <li><Link to="../about">About Us</Link></li>
                    <li><Link to="../explore">Recommended Kost</Link></li>
                </ul>
            </div>
            <div className="column">
                <p><b>Contact Info</b></p>
                <a href='#'><p>Phone: 0712-3640-1236</p></a>
                <a href='#'><p>Email: kostkusby@gmail.com</p></a>
            </div>
            <div className="column">
                <p><b>Follow Us</b></p>
                <ul>
                    <li className="d-flex align-items-center">
                        <a href='#'><img src="../assets/facebook.png" alt="Facebook" className="mr-2" /></a>
                        <a href='#'><p className="ml-2">Kostku</p></a>
                    </li>
                    <li className="d-flex align-items-center">
                        <a href='#'><img src="../assets/twitter.png" alt="Twitter" className="mr-2" /></a>
                        <a href='#'><p className="ml-2">Kostmurah_sby</p></a>
                    </li>
                    <li className="d-flex align-items-center">
                        <a href='#'><img src="../assets/instagram.png" alt="Instagram" className="mr-2" /></a>
                        <a href=''><p className="ml-2">Kostku_sby</p></a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
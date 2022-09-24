import './Layouts.css'
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

function Footer() {
    return (
        <footer>

            <div>
                <a href='https://www.linkedin.com/in/jeandson-barros-1aa133221/' >
                    <BsLinkedin />
                </a>
                <a href='https://github.com/JeandsonBarros' >
                    <BsGithub />
                </a>
                <a href='https://www.instagram.com/jeandsonbarros/'>
                    <BsInstagram />
                </a>
            </div>

            <span>Created by Jeandson Barros. &copy; 2022</span>
            
        </footer>
    );
}

export default Footer;
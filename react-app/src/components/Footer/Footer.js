
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-main">
            <div className="github">

            </div>
            <div className="about-me">
                <a href="https://www.linkedin.com/in/victor-hou-a77b3a223/" target="_blank" className="linkedin">
                  <img
                    className="linkedin-img"
                    src="https://icon-library.com/images/linkedin-icon-logo/linkedin-icon-logo-9.jpg"
                  />
                </a>
                <p>!© 2021 LeanOnMe. All Rights Reserved.</p>
                <a className="linkedin" href="https://github.com/Thereal-victorhou/lean-on-me" target="_blank">
                  <img
                    className="linkedin-img"
                    src="https://cdn.dribbble.com/users/6569/screenshots/16742885/media/361dccdf11984b210043e69cb871fc93.png?compress=1&resize=400x300"
                  />
                </a>
            </div>
        </div>
    )
}

export default Footer;

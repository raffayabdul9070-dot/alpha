import logo from '../assets/alpha-logo.png';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__mark">
          <img src={logo} alt="Alpha" />
        </div>
        <p className="footer__copy">© {year} Alpha. All rights reserved.</p>
        <div className="footer__links">
          <a href="#services">Services</a>
          <a href="#stack">Stack</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

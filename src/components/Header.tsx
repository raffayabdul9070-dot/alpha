import { useEffect, useState } from 'react';
import logo from '../assets/alpha-logo.png';
import './Header.css';

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Stack', href: '#stack' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ onOpenContact }: { onOpenContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['top', 'services', 'stack', 'process', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="#top" className="header__mark" aria-label="Alpha — home">
          <img src={logo} alt="Alpha" />
        </a>

        <nav className="header__nav" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>

        <button className="header__cta" onClick={onOpenContact}>
          Start a Project
        </button>

        <button
          className={`header__toggle ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="header__mobile" role="menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            className="header__mobile-cta"
            onClick={() => {
              setOpen(false);
              onOpenContact();
            }}
          >
            Start a Project
          </button>
        </div>
      )}
    </header>
  );
}

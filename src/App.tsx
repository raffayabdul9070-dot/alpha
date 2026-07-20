import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureBar from './components/FeatureBar';
import Services from './components/Services';
import TechStack from './components/TechStack';
import WhyChoose from './components/WhyChoose';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <>
      <Header onOpenContact={openContact} />
      <main>
        <Hero onOpenContact={openContact} />
        <FeatureBar />
        <Services />
        <TechStack />
        <WhyChoose />
        <Process />
        <Contact onOpenContact={openContact} />
      </main>
      <Footer onOpenContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

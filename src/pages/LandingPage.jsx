import { useRef } from 'react';
import Hero from '../components/Hero'
import Store from '../components/Store'

const LandingPage = () => {
  const heroRef = useRef(null);

  const scrollToStore = () => {
    heroRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
        <Hero scrollToStore={scrollToStore} />
        <Store ref={heroRef}/>
    </>
  )
}

export default LandingPage
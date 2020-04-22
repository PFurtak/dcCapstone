import React, { useContext, useEffect } from 'react';
import { scrollTo } from '../Utils';
import Intro2 from './sections/Intro2';
import TopBar from './sections/TopBar1';
import Services1 from './sections/Services1';
import Portfolio1 from './sections/Protfolio1';
import Testimonial1 from './sections/Testimonial1';
import CallToAction1 from './sections/CallToAction1';
import Pricing1 from './sections/Pricing1';
import Contact1 from './sections/Contact1';
import Footer1 from './sections/Footer1';
import AuthContext from '../context/auth/authContext';

const Landing1 = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  const componentWillUnmount = () => {
    scrollTo('root');
  };
  return (
    <div className='landing'>
      <TopBar />
      <Intro2 />
      <Services1 />
      <CallToAction1 />
      <Footer1 />
    </div>
  );
};

export default Landing1;

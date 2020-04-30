import React, { useContext, useEffect } from 'react';
import Intro2 from './sections/Intro2';
import TopBar from './sections/TopBar1';
import Services1 from './sections/Services1';
import CallToAction1 from './sections/CallToAction1';

import Footer1 from './sections/Footer1';

const Landing1 = () => {
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

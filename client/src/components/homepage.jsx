<<<<<<< HEAD
import React, { Component } from 'react';
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
import InputFund from './InputFund';
=======
import React, { Component } from "react";
import { scrollTo } from "../Utils";
import Intro2 from "./sections/Intro2";
import TopBar from "./sections/TopBar1";
import Services1 from "./sections/Services1";
import Portfolio1 from "./sections/Protfolio1";
import Testimonial1 from "./sections/Testimonial1";
import CallToAction1 from "./sections/CallToAction1";
import Pricing1 from "./sections/Pricing1";
import Contact1 from "./sections/Contact1";
import Footer1 from "./sections/Footer1";
>>>>>>> a181a6c54e78d1150aba48897c82ad8bba41f972

class Landing1 extends Component {
  state = {};
  componentWillUnmount() {
    scrollTo("root");
  }
  render() {
    return (
      <div className="landing">
        <TopBar />
        <Intro2 />
        <Services1 />
        <CallToAction1 />
<<<<<<< HEAD
        <Pricing1 />
        <Contact1 />
        <InputFund/>
=======
>>>>>>> a181a6c54e78d1150aba48897c82ad8bba41f972
        <Footer1 />
      </div>
    );
  }
}

export default Landing1;

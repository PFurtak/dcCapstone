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

<<<<<<< HEAD
function HomePage() {
<<<<<<< HEAD
    return (
        <div>
            <NavBar />
            <h1>
                HomePage
            </h1>
        </div> 
    )
=======
  return (
    <div>
      <NavBar />
      <h1>HomePage</h1>
    </div>
  );
>>>>>>> 357d0287095d48435a1f01beaba182478f287b18
=======
class Landing1 extends Component {
  state = {};
  componentWillUnmount() {
    scrollTo('root');
  }
  render() {
    return (
      <div className='landing'>
        <TopBar />
        <Intro2 />
        <Portfolio1 />
        <Services1 />
        <Testimonial1 />
        <CallToAction1 />
        <Pricing1 />
        <Contact1 />
        <Footer1 />
      </div>
    );
  }
>>>>>>> 6745d74501d18c2e7e7c19351d8e98de339ddd50
}

export default Landing1;

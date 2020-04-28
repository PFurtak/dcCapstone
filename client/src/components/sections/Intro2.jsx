import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';

class Intro2 extends Component {
  state = {};
  render() {
    return (
      <section
        className='section section-intro1 section-intro2'
        id='intro2'
        style={{
          background:
            'url(./assets/images/home-bg-black.png) center center/cover no-repeat',
        }}>
        <div className='container'>
          <div className='text-center'>
            <div className='section-intro1__subtitle mb-24 text-secondary'>
              Stonks JS
            </div>
            <h1 className='section-intro1__title'>
              Build and track your dream fund.
            </h1>
            <p className='intro1__description'>
              The most powerful tool to build and track your own market index
              funds. Sign up now for free to start tracking.
            </p>
            <div>
              <Button
                className='bg-white'
                variant='contained'
                size='large'
                aria-label='Buy'
                href='/signup'>
                <ShowChartIcon className='mr-16' />
                Sign up
              </Button>
            </div>
          </div>
          <div className='section-intro2__product text-center'>
            <img src='./assets/images/screenshots/landing-intro.png' alt='' />
          </div>
        </div>
      </section>
    );
  }
}

export default Intro2;

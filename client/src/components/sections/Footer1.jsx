import React, { Component } from 'react';
import { Grid, Icon } from '@material-ui/core';

class Footer1 extends Component {
  state = {};
  render() {
    return (
      <div className='section-footer1 light-dark' id='footer1'>
        <div className='container'>
          <Grid container>
            <Grid item lg={6} md={6} sm={12}>
              <div className='footer1__about'>
                <h4>About Us</h4>
                <p>
                  Founded by three Web Developers in Atlanta, Georgia. Stonks.js
                  aims to be the best and most versatile index tool out there.
                </p>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <div className='footer1__contact'>
                <h4>Contact</h4>
                <div className='px-16 my-32'>
                  <Icon className='footer1__contact__icon'>mail</Icon>
                  <div className='pl-16'>
                    <h5 className='m-0 p-0'>Email</h5>
                    <p className='m-0 p-0'>Admin@stonksjs.com</p>
                  </div>
                </div>
                <div className='px-16 mt-32'>
                  <Icon className='footer1__contact__icon'>location_on</Icon>
                  <div className='pl-16'>
                    <h5 className='m-0 p-0'>Atlanta, Georgia</h5>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} md={3} sm={12}>
              <div className='footer1__disclaimer'>
                <h4>Disclaimer</h4>
                <p>
                  Inspired by historical events and characters. This work of
                  fiction was designed, developed and produced by a
                  multicultural team of various religious faiths and beliefs.
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Footer1;

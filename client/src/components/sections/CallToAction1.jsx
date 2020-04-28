import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class CallToAction1 extends Component {
  state = {};
  render() {
    let { bg } = this.props;
    return (
      <div
        className='section section-cta1'
        id='cta1'
        style={{
          background: `url(${
            bg || './assets/images/home-bg-black.png'
          }) center center/cover no-repeat`,
        }}>
        <div className='container'>
          <Grid
            container
            spacing={24}
            direction='row'
            alignItems='center'
            justify='flex-start'>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <h2>Join now!</h2>
              <p>
                Dont miss out, sign up now to start building your own funds!
              </p>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} className='text-center'>
              <Button size='large' href='/signup' variant='contained'>
                Sign Up Now
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default CallToAction1;

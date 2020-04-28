import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Icon } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListIcon from '@material-ui/icons/List';

class Services1 extends Component {
  state = {};

  serviceList = [
    {
      icon: 'account_balance',
      title: 'Market Information',
      text:
        'Get real time market data, and historical data, from thousands of symbols. ',
    },
    {
      icon: 'list',
      title: 'Customization',
      text:
        "Create your own index funds from symbols that you're interested in, or select one of our premade funds.",
    },
    {
      icon: 'trending_up',
      title: 'Tracking',
      text:
        'Track your funds and see how they perform historically, as well as the underlying symbols.',
    },
    {
      icon: 'dashboard',
      title: 'Interactive Dashboard',
      text:
        'Easily track all of your information in real time once logged in from our custom client dashboard.',
    },
  ];

  render() {
    return (
      <section className='section section-service1 light-gray' id='service1'>
        <div className='container'>
          <div className='section__header'>
            <h2>What we do</h2>
            <p>
              We provide market information at the enterprise level. See real
              time market information, as well as the ability to create your own
              index funds, and track their historical performance.{' '}
            </p>
          </div>

          <Grid container spacing={24} alignContent='stretch'>
            {this.serviceList.map((service) => (
              <Grid item md={3} sm={6} key={service.title}>
                <Card className='service1__card service__card card'>
                  <CardContent className='service1__card__content'>
                    <div>
                      <div className='text-center mb-16'>
                        <Icon className='card__icon-64'>{service.icon}</Icon>
                      </div>
                      <h3 className='font-light'>{service.title}</h3>
                      <p>{service.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    );
  }
}

export default Services1;

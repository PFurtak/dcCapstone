import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce, classList } from '../../Utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';

class TopBar extends Component {
  state = {
    isTop: true,
    isClosed: true,
  };
  handleScrollRef;

  componentDidMount() {
    if (window) {
      this.handleScrollRef = this.handleScroll();
      window.addEventListener('scroll', this.handleScrollRef);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScrollRef);
    }
  }

  handleScroll() {
    return debounce(() => {
      if (window) {
        let isTop = window.scrollY < 100;
        if (isTop !== this.state.isTop) {
          this.setState({ isTop });
        }
      }
    }, 20);
  }

  close = () => {
    this.setState({ isClosed: true });
  };

  render() {
    let toggleIcon = this.state.isClosed ? 'menu' : 'close';
    return (
      <div className='landing'>
        <section
          className={classList({
            header: true,
            'header-fixed': !this.state.isTop,
            closed: this.state.isClosed,
          })}>
          <div className='container header-container'>
            <div className='brand'>
              <Typography variant='h4'>
                <Link to='/'>Stonks.js</Link>
              </Typography>
            </div>

            <div className='m-auto' />
            <ul className='navigation'>
              <li>
                <Link to='/signup'>
                  <AssignmentIcon className='mr-16' />
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to='login'>
                  <VpnKeyIcon className='mr-16' /> Log In
                </Link>
              </li>
            </ul>
            <IconButton
              className='header__toggle'
              onClick={() => {
                this.setState({ isClosed: !this.state.isClosed });
              }}>
              <Icon>{toggleIcon}</Icon>
            </IconButton>
          </div>
        </section>
      </div>
    );
  }
}

export default TopBar;

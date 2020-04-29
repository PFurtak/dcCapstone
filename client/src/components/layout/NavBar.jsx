import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import FundContext from '../../context/funds/fundContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const fundContext = useContext(FundContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearFunds } = fundContext;

  const onLogout = () => {
    logout();
    clearFunds();
  };

  const authLinks = (
    <Fragment>
      <li>
        <a href='/dashboard'>
          <span className='hide-sm'> Dashboard</span>
        </a>
      </li>
      <li>
        <a href='/createfund'>
          <span className='hide-sm'> Create Fund</span>
        </a>
      </li>
      <li>
        <a onClick={onLogout} href='/login'>
          <span className='hide-sm'> Sign out</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/signup'> Sign Up </Link>{' '}
      </li>
      <li>
        <Link to='/login'> Login </Link>{' '}
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'> {title}</Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'STONKS.JS',
};

export default Navbar;

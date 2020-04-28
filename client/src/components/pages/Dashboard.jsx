import React, { useContext, useEffect } from 'react';
import DashNav from '../layout/DashNav';
import AuthContext from '../../context/auth/authContext';
import FundContext from '../../context/funds/fundContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const fundContext = useContext(FundContext);

  const { getFunds } = fundContext;
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getFunds();

    //eslint-disable-next-line
  }, []);

  return <DashNav />;
};

export default Dashboard;

import React, { useContext, useEffect } from 'react';
import DashNav from '../layout/DashNav';
import AuthContext from '../../context/auth/authContext';
import FundContext from '../../context/funds/fundContext';
import MainChart from '../MainChart';

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

  return (
    <div>
      <DashNav />;
      <MainChart />
    </div>
  );
};

export default Dashboard;

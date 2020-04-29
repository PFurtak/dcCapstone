import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import FundContext from '../../context/funds/fundContext';
import MainChart from '../MainChart';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const fundContext = useContext(FundContext);

  const { getFunds } = fundContext;
  const { loadUser, setLoading } = authContext;

  useEffect(() => {
    setLoading();
    loadUser();
    getFunds();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <MainChart />
    </div>
  );
};

export default Dashboard;

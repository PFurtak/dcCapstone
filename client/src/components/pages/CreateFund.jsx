import React, { useContext, useEffect } from 'react';
import DashNav from '../layout/DashNav';
import AuthContext from '../../context/auth/authContext';

const CreateFund = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();

    //eslint-disable-next-line
  }, []);

  return <DashNav />;
};

export default CreateFund;

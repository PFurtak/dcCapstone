import React, { useContext, useEffect } from 'react';
import DashNav from '../layout/DashNav';
import AuthContext from '../../context/auth/authContext';
import InputFund from '../InputFund';

const CreateFund = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <DashNav />
      <InputFund />
    </div>
  );
};

export default CreateFund;

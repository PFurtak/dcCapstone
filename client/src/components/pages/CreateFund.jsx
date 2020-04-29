import React, { useContext, useEffect } from 'react';
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
      <InputFund />
    </div>
  );
};

export default CreateFund;

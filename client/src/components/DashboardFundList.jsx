import React, { useContext } from 'react';
import FundContext from '../context/funds/fundContext';
import IndividualFund from './IndividualFund';

const DashBoardFundList = (props) => {
  const fundContext = useContext(FundContext);
  const { funds } = fundContext;

  return (
    <>
      {funds.map((fund) => (
        <IndividualFund key={fund._id} fund={fund} />
      ))}
    </>
  );
};

export default DashBoardFundList;

import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import MaterialTable from 'material-table';

const FundTable = (props) => {
  const fundContext = useContext(FundContext);
  const { fund, tableData } = props;

  const getLatestPrice = async (symbol) => {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    let data = await response.json();
    console.log('current' + data);
    return data;
  };

  const data = tableData;
  const columns = [
    { title: 'Security', field: 'security' },
    { title: 'Ticker', field: 'ticker' },
    { title: 'Last Price', field: 'lastPrice', type: 'numeric' },
    { title: 'Shares', field: 'shares', type: 'numeric' },
    { title: 'Basis Per Share', field: 'priceWhenAdded', type: 'numeric' },
    { title: 'Total Basis', field: 'originalInvestment', type: 'currency' },
    { title: 'Date When Added', field: 'dateWhenAdded', type: 'date' },
    { title: 'Value', field: 'dollarValue', type: 'currency' },
    { title: 'Total Gain', field: 'totalGain', type: 'currency' },
    { title: 'Total Gain %', field: 'totalGainPercent', type: 'numeric' },
    { title: 'Allocation', field: 'allocation', type: 'numberic' },
  ];

  return (
    <>
      <MaterialTable
        title={fund.fundname}
        columns={columns}
        data={tableData}
        options={{
          cellStyle: {
            textAlign: 'center',
          },
          headerStyle: {
            textAlign: 'center',
            backgroundColor: '#DEC38E',
            color: '#FFF',
          },
          rowStyle: (rowData) => {
            if (rowData.security === 'Total') {
              return {
                backgroundColor: 'black',
                color: 'white',
              };
            }
            return {};
          },
        }}
      />
    </>
  );
};

export default FundTable;

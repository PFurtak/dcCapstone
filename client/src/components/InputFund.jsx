import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import TableFooter from '@material-ui/core/TableFooter';

const InputFund = () => {
  const [fundInput, setFundInput] = useState({
    input: '',
    searchArray: [],
    quote: 0,
    pickedSecurity: {},
    amountToInvest: 0,
    shareAmount: 0,
    columns: [
      { title: 'Security', field: 'security' },
      { title: 'Ticker', field: 'ticker' },
      { title: 'Last Price', field: 'lastPrice', type: 'numeric' },
      { title: 'Amount', field: 'amount', type: 'numeric' },
      { title: 'Price When Added', field: 'priceWhenAdded', type: 'numeric' },
      { title: 'Date When Added', field: 'dateWhenAdded', type: 'date' },
    ],
    data: [],
    fundName: '',
  });

  const {
    input,
    searchArray,
    quote,
    pickedSecurity,
    amountToInvest,
    shareAmount,
    fundName,
    data,
  } = fundInput;

  const getQuote = async () => {
    const res = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${input}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    await setFundInput({
      input: res.data,
    });
  };

  const searchInput = async () => {
    const res = await axios.get(
      `https://cloud.iexapis.com/stable/search/${input}?token=sk_2fac0c511a7f481e85a5f5928838a339`
    );
    await setFundInput({
      ...fundInput,
      searchArray: res.data,
    });
  };

  useEffect(() => {
    searchInput();
  }, [input]);

  const autoComplete = async (event) => {
    await setFundInput({
      ...fundInput,
      input: event.target.value,
    });
  };

  const setInput = async (param) => {
    await setFundInput({
      input: param.symbol,
      pickedSecurity: param,
    });
  };

  const amountToInvestInput = (event) => {
    setFundInput({
      amountToInvest: event.target.value,
    });
    calculateShareAmount();
  };

  const calculateShareAmount = () => {
    const numberOfShares = amountToInvest / quote;
    setFundInput({
      shareAmount: numberOfShares,
    });
  };

  const onFundAdd = () => {
    const newData = {
      security: pickedSecurity.securityName,
      ticker: input,
      lastPrice: quote,
      amount: amountToInvest,
      priceWhenAdded: quote,
      dateWhenAdded: new Date(),
    };
    setFundInput({
      data: [...data, newData],
    });
  };

  const setFundName = (event) => {
    setFundInput({
      fundName: event.target.value,
    });
  };

  return (
    <div style={{ width: 800 }}>
      <TextField
        id='fundName'
        label='Name your Fund'
        variant='outlined'
        onChange={setFundName}
      />
      <Autocomplete
        id='stockInput'
        onChange={setInput}
        onInputChange={autoComplete}
        // onSelect={getQuote}
        options={searchArray}
        getOptionLabel={(stock) => stock.symbol + ' ' + stock.securityName}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Select Company Ticker'
            margin='normal'
            variant='outlined'
          />
        )}
      />
      <br />
      <TextField
        id='lastPrice'
        label='Last Price'
        value={quote}
        InputProps={{
          readOnly: true,
        }}
        variant='outlined'
      />
      <br />
      <br />
      <TextField
        id='amountToInvest'
        label='Amount to Invest'
        variant='outlined'
        onChange={amountToInvestInput}
      />
      <br />
      <br />
      <TextField
        id='amountOfShares'
        label='Amount of Shares'
        variant='outlined'
        InputProps={{
          readOnly: true,
        }}
        value={shareAmount}
      />
      <br />
      <br />
      <Button onClick={onFundAdd} variant='contained' color='primary'>
        Add Security
      </Button>
      <MaterialTable
        title={fundName}
        columns={fundInput.columns}
        data={data}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setFundInput((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
      <Button variant='contained' color='primary'>
        Save Fund
      </Button>
    </div>
  );
};

export default InputFund;

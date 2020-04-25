import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import TableFooter from '@material-ui/core/TableFooter';

const InputFund = () => {
  const [input, setInput] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [quote, setQuote] = useState(0);
  const [pickedSecurity, setPickedSecurity] = useState({});
  const [pickedSymbol, setPickedSymbol] = useState('');
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [shareAmount, setShareAmount] = useState(0);
  const [data, setData] = useState([]);
  const [fundName, setFundName] = useState('');

  const columns = [
    { title: 'Security', field: 'security' },
    { title: 'Ticker', field: 'ticker' },
    { title: 'Amount', field: 'amount', type: 'numeric' },
    { title: 'Price When Added', field: 'priceWhenAdded', type: 'numeric' },
    { title: 'Date When Added', field: 'dateWhenAdded', type: 'date' },
  ];

  const handleInput = async (event) => {
    setInput(event.target.value);
  };

  const getQuote = async (event, newValue) => {
    try {
      setInput(newValue.symbol);
      setPickedSymbol(newValue.symbol);
      setPickedSecurity(newValue.securityName);
    } catch {}
    const response = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${input}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    const data = response.data;
    setQuote(response.data);
  };

  useEffect(
    function effectFunction() {
      async function getSearch() {
        const response = await axios.get(
          `https://cloud.iexapis.com/stable/search/${input}?token=pk_135e66691d174c4291a33989af3f52c9`
        );
        const data = await response.data;
        setSearchArray(data);
      }
      getSearch();
    },
    [input]
  );

  useEffect(
    function effectFunction() {
      async function getQuotes() {
        const response = await axios.get(
          `https://cloud.iexapis.com/stable/stock/${pickedSymbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
        );
        const data = await response.data;
        setQuote(data);
      }
      getQuotes();
    },
    [pickedSymbol]
  );

  useEffect(
    function effectFunction() {
      async function shareAmountSetter() {
        setShareAmount(amountToInvest / quote);
      }
      shareAmountSetter();
    },
    [amountToInvest]
  );

  const fundAdd = () => {
    const newData = {
      security: pickedSecurity,
      ticker: pickedSymbol,
      amount: amountToInvest,
      priceWhenAdded: quote,
      dateWhenAdded: new Date(),
    };
    setData([...data, newData]);
  };

  return (
    <div style={{ width: 800 }}>
      <TextField
        id='fundName'
        label='Name your Fund'
        variant='outlined'
        onChange={(e) => setFundName(e.target.value)}
      />
      <Autocomplete
        id='stockInput'
        onInputChange={handleInput}
        onChange={getQuote}
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
        onChange={(e) => setAmountToInvest(parseFloat(e.target.value))}
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
      <Button onClick={fundAdd} variant='contained' color='primary'>
        Add Security
      </Button>
      <MaterialTable
        title={fundName}
        columns={columns}
        data={data}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setData((prevState) => {
                  console.log(prevState);
                  const thedata = [...prevState];
                  thedata.splice(thedata.indexOf(oldData), 1);
                  return thedata;
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

import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

const InputFund = () => {
  const fundContext = useContext(FundContext);
  const { addFund } = fundContext;

  const [input, setInput] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [quote, setQuote] = useState(0);
  const [pickedSecurity, setPickedSecurity] = useState({});
  const [pickedSymbol, setPickedSymbol] = useState('');
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [shareAmount, setShareAmount] = useState(0);
  const [data, setData] = useState([]);
  const [fundName, setFundName] = useState('');
  const [showTable, setShowTable] = useState(true);

  const [fund, setFunds] = useState({
    fundname: '',
    funds: [
      {
        fundname: '',
        security: '',
        ticker: '',
        amount: 0,
        priceWhenAdded: 0,
        dateWhenAdded: new Date(),
      },
    ],
  });

  const postToDB = (e) => {
    setShowTable(false);
    let finalFundData = data;
    for (var i = 0; i < finalFundData.length; i++) {
      delete finalFundData[i].tableData;
    }
    let finalFinalFundData = { fundname: fundName, stocks: data };
    console.log(finalFinalFundData);
    addFund(finalFinalFundData);
  };

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

  const setProperInput = (event, newValue) => {
    try {
      setInput(newValue.symbol);
      setPickedSymbol(newValue.symbol);
      setPickedSecurity(newValue.securityName);
    } catch {}
  };

  useEffect(
    function effectFunction() {
      async function getQuotes() {
        fetch(
          `https://cloud.iexapis.com/stable/stock/${pickedSymbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
        )
          .then((res) => res.json())
          .then((data) => {
            setQuote(data);
          });
      }
      getQuotes();
    },
    [pickedSymbol]
  );

  const reloadTable = (event) => {
    setShowTable(true);
    setData([]);
    setFundName('');
  };

  useEffect(
    function effectFunction() {
      function getSearch() {
        fetch(
          `https://cloud.iexapis.com/stable/search/${input}?token=pk_135e66691d174c4291a33989af3f52c9`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchArray(data);
          })
          .catch((err) => console.log(err));

        setSearchArray(data);
      }
      getSearch();
    },
    [input]
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
    setFunds({ ...data, newData });
  };

  return (
    <div style={{ width: 800 }}>
      <TextField
        id='fundName'
        label='Name your Fund'
        variant='outlined'
        name={fundName}
        onChange={(e) => setFundName(e.target.value)}
      />
      <Autocomplete
        id='stockInput'
        onInputChange={handleInput}
        onChange={setProperInput}
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

      {/* {this.state.showGraph ?
           <LookupChart {...this.state} /> :
           null
        } */}
      {showTable ? (
        <>
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
          />{' '}
          <Button onClick={postToDB} variant='contained' color='primary'>
            Save Fund
          </Button>{' '}
        </>
      ) : (
        <>
          <h1> Fund Saved </h1>
          <Button onClick={reloadTable} variant='contained' color='primary'>
            Create Fund
          </Button>
        </>
      )}
    </div>
  );
};

export default InputFund;

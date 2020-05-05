import React, { useContext, useEffect, useState } from "react";
import FundContext from "../context/funds/fundContext";
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";
import TableFooter from "@material-ui/core/TableFooter";
import { GreenButton } from "./styledComponents";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    "&$cssFocused": {
      color: "#2F2F2F",
    },
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#2F2F2F", //focused
      color: "#2F2F2F",
    },
  },
  notchedOutline: {},
  cssFocused: {},
  error: {},
  disabled: {},
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InputFund = () => {
  const fundContext = useContext(FundContext);
  const { addFund, getFunds } = fundContext;

  const [input, setInput] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [quote, setQuote] = useState(0);
  const [pickedSecurity, setPickedSecurity] = useState({});
  const [pickedSymbol, setPickedSymbol] = useState("");
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [shareAmount, setShareAmount] = useState(0);
  const [data, setData] = useState([]);
  const [fundName, setFundName] = useState("");
  const [showTable, setShowTable] = useState(true);
  const classes = useStyles();

  const [fund, setFunds] = useState({
    fundname: "",
    funds: [
      {
        fundname: "",
        security: "",
        ticker: "",
        amount: 0,
        shares: 0,
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
    { title: "Security", field: "security" },
    { title: "Ticker", field: "ticker" },
    { title: "Amount", field: "amount", type: "numeric" },
    { title: "Shares", field: "shares", type: "numeric" },
    { title: "Price When Added", field: "priceWhenAdded", type: "numeric" },
    { title: "Date When Added", field: "dateWhenAdded", type: "date" },
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
        try {
          let response = await fetch(
            `https://cloud.iexapis.com/stable/stock/${pickedSymbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`
          );
          let data = await response.json();
          setQuote(data);
        } catch {
          let newResponse = await fetch(
            `https://cloud.iexapis.com/stable/stock/${pickedSymbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
          );
          let newData = await newResponse.json();
          setQuote(newData);
        }
      }
      getQuotes();
    },
    [pickedSymbol]
  );

  const reloadTable = (event) => {
    setShowTable(true);
    setData([]);
    setFundName("");
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
      shares: shareAmount,
      priceWhenAdded: quote,
      dateWhenAdded: new Date(),
    };
    setData([...data, newData]);
    setFunds({ ...data, newData });
    setAmountToInvest(parseFloat(0));
    setShareAmount(0);
  };

  return (
    <div style={{ width: 800 }}>
      <TextField
        id="fundName"
        label="Name your Fund"
        variant="outlined"
        name={fundName}
        onChange={(e) => setFundName(e.target.value)}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
      />
      <Autocomplete
        id="stockInput"
        onInputChange={handleInput}
        onChange={setProperInput}
        options={searchArray}
        getOptionLabel={(stock) => stock.symbol + " " + stock.securityName}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Company Ticker"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
          />
        )}
      />
      <br />
      <TextField
        id="lastPrice"
        label="Last Price"
        value={quote}
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        id="amountToInvest"
        label="Amount to Invest"
        variant="outlined"
        onChange={(e) => setAmountToInvest(parseFloat(e.target.value))}
      />
      <br />
      <br />
      <TextField
        id="amountOfShares"
        label="Amount of Shares"
        variant="outlined"
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          readOnly: true,
        }}
        value={amountToInvest > 0 ? shareAmount : 0}
      />
      <br />
      <br />
      <GreenButton onClick={fundAdd} variant="contained" color="primary">
        Add Security
      </GreenButton>

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
          />{" "}
          <GreenButton onClick={postToDB} variant="contained" color="primary">
            Save Fund
          </GreenButton>{" "}
        </>
      ) : (
        <>
          <Alert severity="success">Fund Saved</Alert>
          <GreenButton
            onClick={reloadTable}
            variant="contained"
            color="primary"
          >
            Create Fund
          </GreenButton>
        </>
      )}
    </div>
  );
};

export default InputFund;

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AreaChart, PieChart } from 'react-chartkick';
import 'chart.js';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FundContext from '../context/funds/fundContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { GreenButton } from './styledComponents';

const useStyles = makeStyles({
  cssLabel: {
    '&$cssFocused': {
      color: '#2F2F2F',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#2F2F2F', //focused
      color: '#2F2F2F',
    },
  },
  notchedOutline: {},
  cssFocused: {},
  error: {},
  disabled: {},
  root: {
    minWidth: 275,
    marginTop: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SymbolChart = () => {
  const classes = useStyles();
  const [spchartData, setspChartData] = useState([]);
  const [naschartData, setnasChartData] = useState([]);
  const [spchartMin, setspchartMin] = useState(0);
  const [input, setInput] = useState('');
  const [searchArray, setSearchArray] = useState([]);
  const [quote, setQuote] = useState(0);
  const [pickedSecurity, setPickedSecurity] = useState({});
  const [pickedSymbol, setPickedSymbol] = useState('');
  const [data, setData] = useState([]);
  const [symbolName, setSymbolName] = useState('');
  const [symbolCall, setSymbolCall] = useState('');

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInput = async (event) => {
    setInput(event.target.value);
  };

  const setProperInput = (event, newValue) => {
    try {
      setInput(newValue.symbol);
      setPickedSymbol(newValue.symbol);
      setPickedSecurity(newValue.securityName);
      setspChartData([]);
    } catch {}
  };

  const getSymbolInformation = () => {
    try {
      setSymbolCall(pickedSymbol);
    } catch {}
  };

  useEffect(
    function effectFunction() {
      async function getData() {
        try {
          const res = await fetch(
            `https://cloud.iexapis.com/stable/stock/${symbolCall}/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9`
          ).then((res) => res.json());

          let spchartData = res;
          spchartData = spchartData.reduce(function (r, e) {
            if (e.average !== null) {
              r[e.label] = e.average;
            }
            return r;
          }, {});
          let minArray = Object.values(spchartData);
          let min = Math.round(Math.min(...minArray) - 3);
          await setspchartMin(min);
          await setspChartData(spchartData);
          await setspChartData(spchartData);
        } catch {}
      }
      getData();
    },
    [symbolCall]
  );

  useEffect(
    function effectFunction() {
      function getSearch() {
        fetch(
          `https://cloud.iexapis.com/stable/search/${input}?token=pk_135e66691d174c4291a33989af3f52c9`
        )
          .then((res) => res.json())
          .then((data) => {
            setSearchArray(data);
            setSymbolName(data[0].securityName);
          })
          .catch((err) => console.log(err));

        setSearchArray(data);
      }
      getSearch();
    },
    [input]
  );

  return (
    <Card className={classes.root} id='mainChartCard'>
      <CardContent>
        <h1 className='title'>{symbolName}</h1>
        <div style={{ width: 500 }}>
          <Autocomplete
            id='stockInput'
            onInputChange={handleInput}
            options={searchArray}
            onChange={setProperInput}
            getOptionLabel={(stock) => stock.symbol + ' ' + stock.securityName}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select Company Ticker'
                margin='normal'
                variant='outlined'
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
              />
            )}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
          <GreenButton
            variant='contained'
            color='primary'
            onClick={getSymbolInformation}>
            Get Information
          </GreenButton>
        </div>
        <AreaChart
          data={spchartData}
          min={spchartMin}
          points={false}
          xtitle='Time of day'
          ytitle='Average Price'
          colors={['#D7A02B', '#D7A02B']}
          library={{
            animation: { duration: 1500, easing: 'linear' },
            scales: {
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 20,
                    stepSize: 1,
                  },
                },
              ],
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default SymbolChart;

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

//Remove
const axios = require('axios');

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

const MainChart = () => {
  const classes = useStyles();
  const [spchartData, setspChartData] = useState([]);
  const [naschartData, setnasChartData] = useState([]);
  const [diachartData, setdiaChartData] = useState([]);
  const [spchartMin, setspchartMin] = useState(0);
  const [diachartMin, setdiachartMin] = useState(0);
  const [naschartMin, setnaschartMin] = useState(0);

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(async () => {
    try {
      //fetch
      const res = await axios.get(
        'https://cloud.iexapis.com/stable/stock/spy/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9'
      );

      let spchartData = res.data;
      spchartData = spchartData.reduce(function (r, e) {
        if (e.average !== null) {
          r[e.label] = e.average;
        }
        return r;
      }, {});
      let minArray = Object.values(spchartData);
      let min = Math.min(...minArray) - 3;
      await setspchartMin(min);
      await setspChartData(spchartData);
    } catch {}
  }, []);
  console.log(spchartData);

  useEffect(async () => {
    try {
      //fetch
      const res = await axios.get(
        'https://cloud.iexapis.com/stable/stock/qqq/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9'
      );
      let naschartData = res.data;
      naschartData = naschartData.reduce(function (r, e) {
        if (e.average !== null) {
          r[e.label] = e.average;
        }
        return r;
      }, {});
      let minArray = Object.values(naschartData);
      let min = Math.min(...minArray) - 3;
      await setnaschartMin(min);
      await setnasChartData(naschartData);
    } catch {}
  }, []);
  console.log(naschartData);

  useEffect(async () => {
    try {
      //fetch
      const res = await axios.get(
        'https://cloud.iexapis.com/stable/stock/dia/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9'
      );
      const minutes = [];
      const prices = [];
      let diachartData = res.data;
      diachartData = diachartData.reduce(function (r, e) {
        if (e.average !== null) {
          r[e.label] = e.average;
        }
        return r;
      }, {});
      let minArray = Object.values(diachartData);
      let min = Math.min(...minArray) - 3;
      await setdiachartMin(min);
      await setdiaChartData(diachartData);
    } catch {}
  }, []);
  console.log(diachartData);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  const [tabvalue, settabValue] = React.useState(0);

  const handletabChange = (event, newValue) => {
    settabValue(newValue);
  };

  return (
    <Card className={classes.root}>
      <Tabs
        value={tabvalue}
        indicatorColor='primary'
        textColor='primary'
        onChange={handletabChange}
        aria-label='disabled tabs example'>
        <Tab label='S&P 500' />
        <Tab label='NASDAQ' />
        <Tab label='DOW' />
      </Tabs>
      <TabPanel value={tabvalue} index={0}>
        <CardContent>
          <h1 className='title'>S&P 500</h1>
          <AreaChart
            data={spchartData}
            min={spchartMin}
            points={false}
            xtitle='Time of day'
            ytitle='Average Price'
            colors={['#D7A02B', '#D7A02B']}
            library={{
              animation: { easing: 'easeOutQuad' },
            }}
          />
        </CardContent>
      </TabPanel>
      <TabPanel value={tabvalue} index={1}>
        <CardContent>
          <h1 className='title'>NASDAQ</h1>
          <AreaChart
            data={naschartData}
            min={naschartMin}
            points={false}
            xtitle='Time of day'
            ytitle='Average Price'
            colors={['#D7A02B', '#D7A02B']}
            library={{
              animation: { easing: 'easeOutQuad' },
            }}
          />
        </CardContent>
      </TabPanel>
      <TabPanel value={tabvalue} index={2}>
        <CardContent>
          <h1 className='title'>DOW</h1>
          <AreaChart
            data={diachartData}
            min={diachartMin}
            points={false}
            xtitle='Time of day'
            ytitle='Average Price'
            colors={['#D7A02B', '#D7A02B']}
            library={{
              animation: { easing: 'easeOutQuad' },
            }}
          />
        </CardContent>
      </TabPanel>
    </Card>
  );
};

export default MainChart;

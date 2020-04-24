import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AreaChart, PieChart } from "react-chartkick";
import "chart.js";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const axios = require("axios");

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
  const [ naschartData, setnasChartData] = useState([]);
  const [ diachartData, setdiaChartData] = useState([]);

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://cloud.iexapis.com/stable/stock/spy/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9"
      );
      const minutes = [];
      const prices = [];
      JSON.stringify(res.data, (key, value) => {
        if (key === "label") minutes.push(value);
        return value;
      });
      JSON.stringify(res.data, (key, value) => {
        if ((value !== null)&&(key === "average")) prices.push(value);
        return value;
      });
      let spchartData = {};
      let i;
      for (i = 0; i < minutes.length; i++) {
        spchartData[minutes[i]] = prices[i];
      }
      await setspChartData({
        spchartData: spchartData,
      });
    } catch {}
  }, []);
  console.log(spchartData.spchartData);

  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://cloud.iexapis.com/stable/stock/qqq/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9"
      );
      const minutes = [];
      const prices = [];
      JSON.stringify(res.data, (key, value) => {
        if (key === "label") minutes.push(value);
        return value;
      });
      JSON.stringify(res.data, (key, value) => {
        if ((value !== null)&&(key === "average"))prices.push(value);
        return value;
      });
      let naschartData = {};
      let i;
      for (i = 0; i < minutes.length; i++) {
        naschartData[minutes[i]] = prices[i];
      }
      await setnasChartData({
        naschartData: naschartData,
      });
    } catch {}
  }, []);
  console.log(naschartData.naschartData);

  useEffect(async () => {
    try {
      const res = await axios.get(
        "https://cloud.iexapis.com/stable/stock/dia/intraday-prices?token=pk_135e66691d174c4291a33989af3f52c9"
      );
      const minutes = [];
      const prices = [];
      JSON.stringify(res.data, (key, value) => {
        if (key === "label") minutes.push(value);
        return value;
      });
      JSON.stringify(res.data, (key, value) => {
        if ((value !== null)&&(key === "marketAverage"))prices.push(value);
        return value;
      });
      let diachartData = {};
      let i;
      for (i = 0; i < minutes.length; i++) {
        diachartData[minutes[i]] = prices[i];
      }
      await setdiaChartData({
        diachartData: diachartData,
      });
    } catch {}
  }, []);
  console.log(diachartData.diachartData);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
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
        indicatorColor="primary"
        textColor="primary"
        onChange={handletabChange}
        aria-label="disabled tabs example"
      >
        <Tab label="S&P 500" />
        <Tab label="NASDAQ" />
        <Tab label="DOW" />
      </Tabs>
      <TabPanel value={tabvalue} index={0}>
      <CardContent>
        <h1 className="title">S&P 500</h1>
        <AreaChart
          data={spchartData.spchartData}
          min={278}
          points={false}
          xtitle="Time of day"
          ytitle="Average Price"
          colors={["#D7A02B", "#D7A02B"]}
          library={{
            animation: { easing: "easeOutQuad" },
          }}
        />
      </CardContent>
      </TabPanel>
      <TabPanel value={tabvalue} index={1}>
      <CardContent>
        <h1 className="title">NASDAQ</h1>
        <AreaChart
          data={naschartData.naschartData}
          min={210}
          points={false}
          xtitle="Time of day"
          ytitle="Average Price"
          colors={["#D7A02B", "#D7A02B"]}
          library={{
            animation: { easing: "easeOutQuad" },
          }}
        />
      </CardContent>
      </TabPanel>
      <TabPanel value={tabvalue} index={2}>
      <CardContent>
        <h1 className="title">DOW</h1>
        <AreaChart
          data={diachartData.diachartData}
          min={230}
          points={false}
          xtitle="Time of day"
          ytitle="Average Price"
          colors={["#D7A02B", "#D7A02B"]}
          library={{
            animation: { easing: "easeOutQuad" },
          }}
        />
      </CardContent>
      </TabPanel>
    </Card>
  );
};

export default MainChart;
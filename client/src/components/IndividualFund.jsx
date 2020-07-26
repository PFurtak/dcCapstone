import React, { useContext, useEffect, useState } from "react";
import FundContext from "../context/funds/fundContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PortfolioValue from "./PortfolioValue";
import PortfolioGains from "./PortfolioGain";
import DailyGain from "./DailyGain";
import FundTable from "./fundTable";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1150,
    marginTop: 25,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const IndividualFund = (props) => {
  const [tableData, setTableData] = useState([]);
  const fundContext = useContext(FundContext);
  const { funds } = fundContext;
  const { fund } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getLatestPrice = async (symbol) => {
    try {
      let response = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`
      );
      let data = await response.json();
      return data;
    } catch {
      let newResponse = await fetch(
        `https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
      );
      let newData = await newResponse.json();
      return newData;
    }
  };

  const getOpeningPrice = async (symbol) => {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote/previousClose?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    let data = await response.json();
    data = data;
    return data;
  };

  useEffect(async function buildTable() {
    let fundObj = {};
    let totObj = {
      security: "Total",
      dollarValue: 0,
      originalInvestment: 0,
      totalGain: 0,
      totalGainPercent: 0,
      dayGain: 0,
      dayGainPercent: 0,
    };
    let tempArray = [];
    for (const stock of fund.stocks) {
      fundObj = {
        security: stock.security,
        ticker: stock.ticker,
        priceWhenAdded: stock.priceWhenAdded,
        amount: stock.amount,
        shares: stock.shares,
        dateWhenAdded: stock.dateWhenAdded,
        lastPrice: await getLatestPrice(stock.ticker),
      };
      fundObj.originalInvestment = fundObj.priceWhenAdded * stock.shares;
      fundObj.dollarValue = fundObj.lastPrice * stock.shares;
      fundObj.totalGain = fundObj.dollarValue - fundObj.originalInvestment;
      fundObj.totalGainPercent =
        ((fundObj.dollarValue - fundObj.originalInvestment) /
          fundObj.originalInvestment) *
        100;
      fundObj.dayGain =
        fundObj.lastPrice - (await getOpeningPrice(stock.ticker));
      fundObj.dayGainPercent =
        (fundObj.dayGain / (await getOpeningPrice(stock.ticker))) * 100;
      totObj.totalGain += fundObj.totalGain;
      totObj.originalInvestment += fundObj.originalInvestment;
      totObj.dollarValue += fundObj.lastPrice * stock.shares;

      tempArray.push(fundObj);
    }

    totObj.totalGainPercent =
      ((totObj.dollarValue - totObj.originalInvestment) /
        totObj.originalInvestment) *
      100;

    tempArray.map((stock) => {
      stock.shares = parseFloat(stock.shares).toFixed(4);
      stock.totalGainPercent =
        parseFloat(stock.totalGainPercent).toFixed(2) + "%";
    });
    tempArray.push(totObj);
    tempArray.map((stock) => {
      stock.allocation = (stock.dollarValue / totObj.dollarValue) * 100;
      stock.allocation = parseFloat(stock.allocation).toFixed(2) + "%";
      stock.totalGainPercent = parseFloat(stock.totalGainPercent).toFixed(2);
      stock.dayGainPercent = parseFloat(stock.dayGainPercent).toFixed(2) + "%";
    });
    setTableData(tempArray);
  }, []);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={fund.fundname} subheader={fund.fundname} />
        <CardContent>
          <div>
            <PortfolioValue fund={fund} />
            <PortfolioGains fund={fund} />
            <DailyGain fund={fund} />
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <FundTable fund={fund} tableData={tableData} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default IndividualFund;

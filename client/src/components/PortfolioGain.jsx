import React, { useContext, useEffect, useState } from "react";
import FundContext from "../context/funds/fundContext";

const PortfolioGains = (props) => {
  const fundContext = useContext(FundContext);
  const { funds } = fundContext;
  const { fund } = props;
  const [portfolioGains, setPortfolioGains] = useState(0);
  const [portfolioGainsDollar, setPortfolioGainsDollar] = useState(0);

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

  useEffect(async function getPortfolioGains() {
    let oldvalue = 0;
    let portvalue = 0;
    let portgain = 0;
    for (const stock of fund.stocks) {
      oldvalue += stock.shares * stock.priceWhenAdded;
      portvalue += stock.shares * (await getLatestPrice(stock.ticker));
    }
    portgain = ((portvalue - oldvalue) / oldvalue) * 100;
    setPortfolioGains(portgain);
    setPortfolioGainsDollar(portvalue - oldvalue);
  }, []);

  let gainStyle = {
    color: "green",
  };

  let lossStyle = {
    color: "red",
  };
  return (
    <div>
      {portfolioGains > 0 ? (
        <p>
          {" "}
          portfolio gain:{" "}
          <span style={gainStyle}>
            {parseFloat(portfolioGains).toFixed(2)}%
          </span>
        </p>
      ) : (
        <p>
          {" "}
          portfolio gain:{" "}
          <span style={lossStyle}>
            {parseFloat(portfolioGains).toFixed(2)}%
          </span>
        </p>
      )}
      {portfolioGainsDollar > 0 ? (
        <p>
          Net portfolio gain:
          <span style={gainStyle}>
            ${parseFloat(portfolioGainsDollar).toFixed(2)}
          </span>
        </p>
      ) : (
        <p>
          Net portfolio gain:
          <span style={lossStyle}>
            ${parseFloat(portfolioGainsDollar).toFixed(2)}
          </span>
        </p>
      )}
    </div>
  );
};

export default PortfolioGains;

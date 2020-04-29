import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';



const PortfolioGains = props => {
    const fundContext = useContext(FundContext);
    const { funds } = fundContext;
    const{fund }= props
    const [portfolioGains, setPortfolioGains] = useState(0);

  


    const getLatestPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        return data          
    }

    useEffect(
          async function getPortfolioGains() {
            let oldvalue = 0; 
            let portvalue = 0; 
            let portgain = 0; 
            for (const stock of fund.stocks){
              oldvalue += stock.shares * stock.priceWhenAdded
              portvalue += stock.shares * await getLatestPrice(stock.ticker)
            }
            portgain = ((portvalue - oldvalue) / oldvalue) * 100
            setPortfolioGains(portgain)},
        []
      );
    
    return (
    
    
        <div>
        <p> portfolio gain: {portfolioGains}%</p>
        </div>
     
    )
 }

export default PortfolioGains; 



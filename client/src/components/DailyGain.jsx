import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';



const DailyGain = props => {
    const fundContext = useContext(FundContext);
    const { funds } = fundContext;
    const{fund }= props
    const [dailyGains, setDailyGains] = useState(0);

  


    const getOpeningPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/previousClose?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        data = data
        return data          
    }

    const getLatestPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        console.log("current" + data)
        return data          
    }


    useEffect(
          async function getPortfolioGains() {
            let oldvalue = 0; 
            let portvalue = 0; 
            let portgain = 0; 
            for (const stock of fund.stocks){
              oldvalue += stock.shares * await getOpeningPrice(stock.ticker)
              portvalue += stock.shares * await getLatestPrice(stock.ticker)

            }
            portgain = ((portvalue - oldvalue) / oldvalue) * 100
            setDailyGains(portgain)},
        []
      );
    
    return (
    
    
        <div>
        <p> Today's gain: {dailyGains}%</p>
        </div>
     
    )
 }

export default DailyGain; 



import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';



const PortfolioValue = props => {
    const fundContext = useContext(FundContext);
    const { funds } = fundContext;
    const{fund }= props
    const [portfolioValue, setportfolioValue] = useState(0);

  


    const getLatestPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        return data          
    }

    useEffect(
          async function getPortfolioValue() {
            let portvalue = 0; 
            for (const stock of fund.stocks){
              portvalue += stock.shares * await getLatestPrice(stock.ticker)
              console.log(stock.ticker)
            }
            setportfolioValue(portvalue)},
        []
      );
    
    return (
    
    
        <div>
        <p> portfolio value: {portfolioValue} </p>
        </div>
     
    )
 }

export default PortfolioValue; 

// const getPortfolioValue = async () => {
//     let portvalue = 0; 
//     for (const stock of fund.stocks){
//       portvalue += stock.shares * await getLatestPrice(stock.ticker)
//       console.log("hello")
//     }
//     setportfolioValue(portvalue) 
//     }

import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

const FundTable = props => {

    const fundContext = useContext(FundContext);
    const{fund, tableData}= props
    // const[data, setData] = useState([]); 


    const getLatestPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        console.log("current" + data)
        return data          
    }


    const data = tableData; 
    const columns = [
        { title: 'Security', field: 'security' },
        { title: 'Ticker', field: 'ticker' },
        { title: 'Last Price', field: 'lastPrice', type: 'numeric' },
        // {title: "Day Gain", field: "dayGain", type: "currency"}, 
        // {title: "Day Gain %", field: "dayGainPercent", type: "numeric"}, 
        { title: 'Shares', field: 'shares', type: 'numeric' },
        { title: 'Basis Per Share', field: 'priceWhenAdded', type: 'numeric' },
        {title: 'Total Basis', field:"originalInvestment", type: 'currency'},
        { title: 'Date When Added', field: 'dateWhenAdded', type: 'date' },
        { title: 'Value', field: 'dollarValue', type: 'currency' },
        {title: "Total Gain", field: 'totalGain', type: 'currency'},
        {title: "Total Gain %", field: 'totalGainPercent', type: 'numeric'},
        {title: 'Allocation', field: 'allocation', type: 'numberic'}
      ];

//       useEffect( 
//     async function buildFundTable() {
//       let data =  Promise.all(fund.stocks.map(async stock => {
//         return { 
//             security: stock.security, 
//             ticker: stock.ticker,
//             lastPrice: await getLatestPrice(stock.ticker), 
//             priceWhenAdded: stock.priceWhenAdded
//         }
//     } ))
//     setData(data)
//     ;
// }, [])

// useEffect(
//     async function buildTable() { 
//         fund.stocks.forEach(async stock => {
//              let fundObj = {
//                 security: stock.security, 
//                 ticker: stock.ticker
//             }
//             fundObj.lastPrice = await getLatestPrice(stock.ticker)
//             setData(data.push(fundObj))
//             console.log(data)
//         })
//     }, []
// )
// console.log(data)




// const promises = fund.stocks.map( stock => getLatestPrice(stock.ticker));
// console.log(promises)

// await Promise.all(promises)
// .then(function(values) {
//   values.forEach(value => {
//       fundObj.lastPrice = value; 
//       setData([...data, fundObj])
//   })
// })
// .catch(err => {
//     console.error(err);
// }); 
    // let data = [{
    //     security: "apple", 
    //     ticker: "aapl",
    //     lastPrice: 1000, 
    //     priceWhenAdded: 5
    // }]



    return(
        <>
        <MaterialTable
        title={fund.fundname}
        columns={columns}
        data={tableData}
        // editable={{
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setData((prevState) => {
        //           console.log(prevState);
        //           const thedata = [...prevState];
        //           thedata.splice(thedata.indexOf(oldData), 1);
        //           return thedata;
        //         });
        //       }, 600);
        //     }),
        // }}
        options={{
            cellStyle: {
                textAlign: 'center',
                },
            headerStyle: {
                textAlign: 'center',
                backgroundColor: '#DEC38E',
                color: '#FFF'
                }, 
                rowStyle: rowData => {
                    if(rowData.security === "Total") {
                      return {
                          backgroundColor: 'black',
                          color: 'white', 
                        };
                    }
                    
                    return {};
                  }
          }}
      />
      </>
    )


}

export default FundTable; 
import React, {Component} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import TableFooter from '@material-ui/core/TableFooter';




class InputFund extends Component {
   
    state = {
        test: 4334,
        input: "",
        searchArray: [], 
        quote: 0, 
        pickedSecurity: {}, 
        amountToInvest: 0,
        shareAmount: 0, 
        columns: [
            { title: 'Security', field: 'security' },
            { title: 'Ticker', field: 'ticker' },
            { title: 'Last Price', field: 'lastPrice', type: 'numeric' },
            {  title: 'Amount', field: 'amount', type: 'numeric' },
            {  title: 'Price When Added', field: 'priceWhenAdded', type: 'numeric' },
            {  title: 'Allocation %', field: 'allocation', type: 'numeric'},


          ],
        totalAmountToInvest: 0,
        data: []


    }

    getQuote = async()=> {
        const { input} = this.state
        const response = await fetch(`https://cloud.iexapis.com/stable/stock/${input}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        const data = await response.json();
        await this.setState({
            quote: data
        })

    }

    searchInput = async()=>{
        const { input} = this.state
        const response = await fetch(`https://cloud.iexapis.com/stable/search/${input}?token=sk_2fac0c511a7f481e85a5f5928838a339`);
        const data = await response.json();
        await this.setState({
            searchArray: data
        })

    }
  
     autoComplete = async(event) => {
        await this.setState({
            input: event.target.value
          }, this.searchInput);
     
      }

      setInput = param => {
          
            this.setState({
              input: param.symbol,
              pickedSecurity: param
          })
      }

      amountToInvestInput =  event => {
        this.setState({
            amountToInvest: parseFloat(event.target.value),
        }, this.calculateShareAmount)
        
      }
      
      
      calculateShareAmount(){
        const {amountToInvest, quote} = this.state
        const numberOfShares= amountToInvest / quote; 
        this.setState({
            shareAmount: numberOfShares,

        })

      }

      setTotalAmountToInvest(){
        const {input, quote, pickedSecurity, shareAmount, amountToInvest, data, totalAmountToInvest} = this.state;
          this.setState({
              totalAmountToInvest: totalAmountToInvest + amountToInvest
          })
      }

      setNewData(){
        const {input, quote, pickedSecurity, shareAmount, amountToInvest, data, totalAmountToInvest} = this.state;
        const newData = { 
            security: pickedSecurity.securityName, 
            ticker: input, 
            lastPrice: quote, 
            amount: amountToInvest,
            priceWhenAdded: quote, 
            allocation: amountToInvest /totalAmountToInvest
          }
          return newData;
      }

      onFundAdd = async () =>{
          const {input, quote, pickedSecurity, shareAmount, amountToInvest, data, totalAmountToInvest} = this.state;
           await this.setTotalAmountToInvest() 
            const newData = await this.setNewData()
            const sum = {
                amount: amountToInvest
            }
           this.setState({
            data: [...data, newData],
           })

        }
      
    render(){
        const {searchArray, quote, shareAmount} = this.state;
        return(
            <div style={{ width: 800 }}>
                <Autocomplete
                id="stockInput"
                onChange={(event, newValue) => {
                    this.setInput(newValue);
                  }}
                onInputChange={this.autoComplete}
                onSelect={this.getQuote}
                options={searchArray}
                getOptionLabel={(stock)=> stock.symbol + " " + stock.securityName}
                renderInput={(params) => (
                    <TextField 
                    {...params} 
                    label="Select Company Ticker" 
                    margin="normal" 
                    variant="outlined" 
                    />
                )}
                />
                <br/>
                <TextField
                    id="lastPrice"
                    label="Last Price"
                    value={quote}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                />
                <br/>
                <br/>
                <TextField
                    id="amountToInvest"
                    label="Amount to Invest"
                    variant="outlined"
                    onChange={this.amountToInvestInput}
                />
                    <br/>
                <br/>
                <TextField
                    id="amountOfShares"
                    label="Amount of Shares"
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
                    value={shareAmount}
                />
                  <br/>
                <br/>
                <Button onClick={this.onFundAdd} variant="contained" color="primary">
                    Add Security 
                </Button>
                <form> 
                <MaterialTable
                    title="Fund Name"
                    columns={this.state.columns}
                    data={this.state.data}
                    options={{
                        exportButton: true
                      }}
                    editable={{
                        onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                            }, 600);
                        }),
                    }}
                 >                       


            </MaterialTable>
            </form>
                </div>
        )
    }
}

export default InputFund; 
import React, { useContext, useEffect, useState } from 'react';
import FundContext from '../context/funds/fundContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { get } from 'mongoose';
import PortfolioValue from './PortfolioValue'; 




const useStyles = makeStyles((theme) => ({
    root: {
    //   maxWidth: 345,
    marginBottom: 25, 
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

}));

const IndividualFund = props => {
    const fundContext = useContext(FundContext);
    const { funds } = fundContext;
    const{fund }= props
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const getLatestPrice = async(symbol) => {
        let response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`)
        let data = await response.json()
        return data          
    }


//     const getPortfolioValue = async () => {
//       let portvalue; 
//       let currentPrice;
//       fund.stocks.forEach(async(stock)=> ( 
//           currentPrice = await getLatestPrice(stock.ticker), 
//           console.log(currentPrice + "*" + stock.shares),
//           portvalue = currentPrice * stock.shares
//          ))  
//          return portvalue    
// }

    
    const getPortfolioValue = async () => {
        let portvalue = 0; 
        let currentPrice;
        // for(let i =0; i < fund.stocks.length; i++){
        //   console.log(fund.stocks[i].shares + "*" + await getLatestPrice(fund.stocks[i].ticker))
        //   portvalue += (fund.stocks[i].shares * await getLatestPrice(fund.stocks[i].ticker))
        //   console.log(portvalue)
        // }
        for (const stock of fund.stocks){
          portvalue += stock.shares * await getLatestPrice(stock.ticker)
          console.log (portvalue)
        }
        return portvalue; 
        }
  



    return (
        <>
      <Card className={classes.root}>
      <CardHeader
        title={fund.fundname}
        subheader={fund.fundname}
      />
      <CardContent>
          {fund.stocks.map(stock=> ( 
        <Typography key={stock._id} variant="body2" color="textSecondary" component="p">
          {stock.security}
        </Typography>
        ))}
        <div>
       <PortfolioValue fund={fund}/>
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
          <Typography paragraph>Method:</Typography>

          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
      </>
       
    )
 }

export default IndividualFund; 
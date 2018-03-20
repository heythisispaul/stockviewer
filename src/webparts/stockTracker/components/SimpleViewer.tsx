import * as React from 'react';
import styles from './StockTracker.module.scss';
import { IStockTrackerProps } from './IStockTrackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';

export default class StockTracker extends React.Component<IStockTrackerProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      stockTime: "",
      Recentclose: ""
      
    }
  }
  public render(): React.ReactElement<IStockTrackerProps> { 
    return (
        <p>Hello! Your stock is { this.props.stock } and the value is ${ this.state.Recentclose }</p>
    )
  }

  public componentDidMount(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.stock}&interval=5min&outputsize=compact&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (5min)"];
      let recent = Object.keys(data)[0];
      console.log(recent.toLocaleString() + ": " + JSON.stringify(data[recent]));
      console.log(data[recent]["4. close"]);
      return this.setState({
        stockTime: recent,
        Recentclose: parseFloat(data[recent]["4. close"]).toFixed(2)
      })
    })
  }
}
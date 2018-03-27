import * as React from 'react';
import styles from './StockTracker.module.scss';
import { IStockTrackerProps } from './IStockTrackerProps';
import { IStockTrackerState } from './IStockTrackerState';
import { escape } from '@microsoft/sp-lodash-subset';
import GraphViewer from './GraphViewer';
import axios from 'axios';
import Configure from './Configure';
import CaughtError from './CaughtError';

export default class StockTracker extends React.Component<IStockTrackerProps, IStockTrackerState> {
  constructor(props) {
    super(props);

    this.state = {
      stockTime: "",
      recentClose: "",
      yesterdayClose: "",
      graphTimes: "",
      graphValues: "",
      errorCaught: false
    };
  }

  private getChartData(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.stock}&interval=15min&outputsize=full&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (15min)"];
      let graphTimes = Object.keys(data);      
      let values = graphTimes.map((e) => {
        let vals = data[e]["4. close"];
        return parseFloat(vals).toFixed(2);
      });
      return this.setState({
        graphTimes: graphTimes.slice(0, 100).reverse(),
        graphValues: values.slice(0, 100).reverse()
      });
    });
  }
  private getStock(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.stock}&interval=1min&outputsize=compact&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (1min)"];
      let recent = Object.keys(data)[0];
      console.log('updated at ' + new Date());
      return this.setState({
        stockTime: recent.toLocaleString(),
        recentClose: parseFloat(data[recent]["4. close"]).toFixed(2),
        errorCaught: false
      });
    })
    .catch((err) => {
      console.log("err: "+ err);
      this.setState({
        errorCaught: true
      });
    });
  }

  private getLastClose(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.props.stock}&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (Daily)"];
      let last = Object.keys(data)[1];
      return this.setState({
        yesterdayClose: parseFloat(data[last]["4. close"]).toFixed(2)
      });
    });
  }
  
  public render(): React.ReactElement<IStockTrackerProps> {
    if (this.state.errorCaught == true) {
      return  <CaughtError />;
    }
  
    if ( this.props.style == '1' || this.props.style == '2') {
      return <GraphViewer 
      stock = { this.props.stock } 
      stockTime = { this.state.stockTime } 
      recentClose = { this.state.recentClose } 
      title = { this.props.title } 
      yesterdayclose = { this.state.yesterdayClose }
      graphTimes = { this.state.graphTimes } 
      graphValues = { this.state.graphValues }
      style = { this.props.style } />
    }
    else {
      return <Configure />;
    }
  }

  public componentDidMount() {
    if (this.props.stock) {
      this.getStock();
      this.getLastClose();
      this.getChartData();
  }
  //this should probably get cut off on unmounting.
  setInterval(() => {
    this.getStock();
  }, 61000);
}

  public componentWillReceiveProps(props) {
      this.getStock();
      this.getLastClose();
      this.getChartData();
  }
}

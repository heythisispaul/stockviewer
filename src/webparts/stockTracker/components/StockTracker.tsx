import * as React from 'react';
import styles from './StockTracker.module.scss';
import { IStockTrackerProps } from './IStockTrackerProps';
import { IStockTrackerState } from './IStockTrackerState';
import { escape } from '@microsoft/sp-lodash-subset';
import SimpleViewer from './SimpleViewer';
import axios from 'axios';

export default class StockTracker extends React.Component<IStockTrackerProps, IStockTrackerState> {
  constructor(props) {
    super(props);

    this.state = {
      stockTime: "",
      recentClose: "",
      yesterdayClose: ""
    }
  }

  private getStock(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.stock}&interval=1min&outputsize=compact&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (1min)"];
      let recent = Object.keys(data)[0];
      return this.setState({
        stockTime: recent,
        recentClose: parseFloat(data[recent]["4. close"]).toFixed(2)
      })
    })
    .catch((err) => {
      console.log("err: "+ err);
    })
  }

  private getLastClose(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.props.stock}&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (Daily)"];
      let last = Object.keys(data)[1];
      return this.setState({
        yesterdayClose: parseFloat(data[last]["4. close"]).toFixed(2)
      })
    })
  }
  
  public render(): React.ReactElement<IStockTrackerProps> {
    return (
      <div ref="stockDisplay">
      { this.props.style == '1' 
      ? <SimpleViewer stock = { this.props.stock } stockTime = { this.state.stockTime } recentClose = { this.state.recentClose } title = { this.props.title } yesterdayclose = { this.state.yesterdayClose }/> 
      : "You've Selected Graph but you're thing is worth " + this.state.recentClose}
      </div>

      // <div className={ styles.stockTracker }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }

  public componentDidMount() {
    if (this.props.stock) {
      this.getStock();
      this.getLastClose();
  }
  //this should probably get cut off on unmounting.
  setInterval(() => {
    console.log("stock updated at " + new Date());
    this.getStock();
  }, 61000);
}

  public componentWillReceiveProps(props) {
    setTimeout(() => {
      this.getStock();
    }, 750);
  }
}

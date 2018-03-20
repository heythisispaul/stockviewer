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
      recentClose: undefined
    }

  }
  public render(): React.ReactElement<IStockTrackerProps> {
    return (
      <div ref="stockDisplay">
      { this.props.style == '1' ? <SimpleViewer stock = { this.props.stock } stockTime = { this.state.stockTime } recentClose = { this.state.recentClose }/> : "You've Selected Graph but you're thing is worth " + this.state.recentClose}
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
  public componentDidMount(): void {
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.props.stock}&interval=5min&outputsize=compact&apikey=${this.props.APIkey}`)
    .then((res) => {
      let data = res.data["Time Series (5min)"];
      let recent = Object.keys(data)[0];
      console.log(data);
      console.log(recent.toLocaleString() + ": " + JSON.stringify(data[recent]));
      console.log(data[recent]["4. close"]);
      return this.setState({
        stockTime: recent,
        recentClose: parseFloat(data[recent]["4. close"]).toFixed(2)
      })
    })
  }
}

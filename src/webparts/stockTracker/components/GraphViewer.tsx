import * as React from 'react';
import styles from './StockTracker.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Chart from 'chart.js';
import { IGraphViewerProps } from './IGraphViewerProps';
import { Line } from 'react-chartjs-2';
import {
    Spinner,
    SpinnerSize
  } from 'office-ui-fabric-react/lib/Spinner';
import { initializeIcons } from '@uifabric/icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

initializeIcons();

function percentFormat(a, b) {
  let num = a / b * 100;
  if (num < 0) {
    let pos = Math.abs(num);
    return `(${pos.toFixed(2)}%)`;
  }
  return `${num.toFixed(2)}%`;
}

export default class GraphViewer extends React.Component<IGraphViewerProps, {}> {
    
    public render(): React.ReactElement<IGraphViewerProps> {
        let diff =  this.props.recentClose - this.props.yesterdayclose;
        let data = {
            labels: this.props.graphTimes,
            datasets: [{
                label: `${this.props.stock} Value in USD`,
                data: this.props.graphValues,
            }]
        };

        if (!this.props.graphValues || !this.props.graphTimes) {
            return <Spinner size={ SpinnerSize.large }/>;
        }

        return (
            <div className = { styles.stockTracker }>
            <div className = { styles.container }>
              <div className = { styles.row }>
                <div className ={ styles.column }>
                  <div>
                    <span className = { styles.title }>{ this.props.title }</span>
                  </div>
                 <div className = { styles.title }>{ this.props.stock }<span className={styles.currency}> { this.props.stockTime }</span></div>
                 <div ref="stockInfo">
                  <span className = { styles.stock }>${ this.props.recentClose } </span>
                  <span className = { styles.currency }>USD </span> 
                  <span className= { diff > 0 ? styles.greater : styles.lesser }> {diff >= 0 ? <Icon iconName='ArrowUpRight8' /> : <Icon iconName='ArrowDownRight8' />}</span>
                    <span className= { diff >= 0 ? styles.greater : styles.lesser }> { diff.toFixed(2) }</span>
                    <span className= { diff >= 0 ? styles.greater : styles.lesser }> { percentFormat(diff, this.props.yesterdayclose) }</span>
                  </div>
                </div>
                { this.props.style == '2' ? <Line data={ data }/> : null }
              </div>
            </div>
          </div>
        );
    }
}
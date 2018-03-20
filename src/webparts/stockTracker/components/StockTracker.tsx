import * as React from 'react';
import styles from './StockTracker.module.scss';
import { IStockTrackerProps } from './IStockTrackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SimpleViewer from './SimpleViewer';

export default class StockTracker extends React.Component<IStockTrackerProps, {}> {
  public render(): React.ReactElement<IStockTrackerProps> {
    return (
      <div ref="stockDisplay">
      { this.props.style == '1' ? <SimpleViewer {...this.props}/> : "You've Selected Graph"}
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
}

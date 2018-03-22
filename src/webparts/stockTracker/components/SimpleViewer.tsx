import * as React from 'react';
import styles from './StockTracker.module.scss';
import { ISimpleViewerProps } from './ISimpleViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
import { initializeIcons } from '@uifabric/icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

initializeIcons();
// This component will just contain the render method:
//The graph choice will be it's own component using chart.js to make that. 
export default class StockTracker extends React.Component<ISimpleViewerProps, {}> {
  public render(): React.ReactElement<ISimpleViewerProps> {
    let diff =  this.props.recentClose - this.props.yesterdayclose;
    return (
      <div className = { styles.stockTracker }>
        <div className = { styles.container }>
          <div className = { styles.row }>
            <div className ={ styles.column }>
              <div>
                <span className = { styles.title }>{ this.props.title }</span>
              </div>
             <span className = { styles.subTitle }>{ this.props.stock }</span>
             <div className = { styles.subTitle }>Hello! Your stock is { this.props.stock } and the value is <span className = { diff > 0 ? styles.greater : styles.lesser }>
               { this.props.recentClose }</span> {diff > 0 ? <Icon iconName='ArrowUpRight8'/> : <Icon iconName='ArrowDownRight8'/>} 
                and yesterday's close was ${ this.props.yesterdayclose } for a difference of ${ diff.toFixed(2) }</div>
            </div>
          </div>
        </div>
        
      </div>     
    
      // <div className={ styles.stockTracker }>
      //   <div className={ styles.container }>
      //     <div className={ styles.row }>
      //       <div className={ styles.column }>
      //         <span className={ styles.title }>Welcome to SharePoint!</span>
      //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={ styles.description }>{escape(this.props.recentClose)}</p>
      //         <a href="https://aka.ms/spfx" className={ styles.button }>
      //           <span className={ styles.label }>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
}
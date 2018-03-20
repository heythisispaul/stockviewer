import * as React from 'react';
import styles from './StockTracker.module.scss';
import { ISimpleViewerProps } from './ISimpleViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
// This component will just contain the render method:
//The graph choice will be it's own component using chart.js to make that. 
export default class StockTracker extends React.Component<ISimpleViewerProps, {}> {
  public render(): React.ReactElement<ISimpleViewerProps> { 
    return (
        <p>Hello! Your stock is { this.props.stock } and the value is ${ this.props.recentClose }</p>
    )
  }
}
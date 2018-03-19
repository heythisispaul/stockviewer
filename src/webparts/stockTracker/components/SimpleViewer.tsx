import * as React from 'react';
import styles from './StockTracker.module.scss';
import { ISimpleViewerProps } from './ISimpleViewerProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class StockTracker extends React.Component<ISimpleViewerProps, {}> {
  public render(): React.ReactElement<ISimpleViewerProps> { 
    return (
        <p>Hello! Your stock is { this.props.stock }</p>
    )
  }
}
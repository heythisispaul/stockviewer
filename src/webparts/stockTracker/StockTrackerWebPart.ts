import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

import * as strings from 'StockTrackerWebPartStrings';
import StockTracker from './components/StockTracker';
import { IStockTrackerProps } from './components/IStockTrackerProps';

export interface IStockTrackerWebPartProps {
  stock: string;
  APIkey: string;
  style: string;
}

export default class StockTrackerWebPart extends BaseClientSideWebPart<IStockTrackerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStockTrackerProps > = React.createElement(
      StockTracker,
      {
        stock: this.properties.stock,
        APIkey: this.properties.APIkey,
        style: this.properties.style
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: `This webpart is powered by <a href='https://www.alphavantage.co/'>Alpha Vantage</a> and you will need an API Key to use it. Get one free at their website.`
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('stock', {
                  label: "Stock Symbol"
                }),
                PropertyPaneTextField('APIkey', {
                  label: "Alpha Vantage API Key"
                }),
                PropertyPaneDropdown('style', {
                  label: "View",
                  options: [
                    {key: '1', text: 'Compact'},
                    {key: '2', text: "Graph"}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

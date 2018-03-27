import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneCustomField,
  PropertyPaneButton
} from '@microsoft/sp-webpart-base';

import * as strings from 'StockTrackerWebPartStrings';
import StockTracker from './components/StockTracker';
import { IStockTrackerProps } from './components/IStockTrackerProps';

export interface IStockTrackerWebPartProps {
  stock: string;
  APIkey: string;
  style: string;
  title: string;
}

export default class StockTrackerWebPart extends BaseClientSideWebPart<IStockTrackerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStockTrackerProps > = React.createElement(
      StockTracker,
      {
        stock: this.properties.stock,
        APIkey: this.properties.APIkey,
        style: this.properties.style,
        title: this.properties.title
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected AlphaV(domElement: HTMLElement) {
    domElement.innerHTML = `
    <div>
      This webpart is powered by Alpha Vantage and requires an API key be entered before use. You can get one for free on their <a href="https://www.alphavantage.co/support/#api-key">website.</a>
    </div>
    `
  }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: `Stock Tracker`
          },
          groups: [
            {
              groupName: "Configuration",
              groupFields: [
                PropertyPaneCustomField({
                  onRender: this.AlphaV,
                  key: 'alphaV'
                }),
                PropertyPaneTextField('title', {
                  label: "Company/Title"
                }),
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

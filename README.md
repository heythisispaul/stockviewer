# RSS Reader SharePoint Webpart

## Summary
This webpart allows you to include pricing and value information for a stock of your choice onto a site page in the modern SharePoint experience. This web part pulls data every 60 seconds from [Alpha Vantage](https://www.alphavantage.co/) once it has been mounted to a page. It requires an API Key to get started. Alpha Vantage provides them for free and all it takes is an email to [get one](https://www.alphavantage.co/support/#api-key).

Both the 'Compact' view and the 'Graph' view will show you the most recent data compared to the value of the stock at end-of-day of the previous business day. This is demonstrated with an arrow icon, and green/red text that show the difference in USD of the two values and percentage of the total difference. 

The 'Graph' view is pulling the 100 most recent snapshots of 15 minute intervals. These values are displayed on a graph powered by everyone's favorite: [Charts.js.](http://www.chartjs.org/)

This webpart has been built in React 15.6 and SPFx 1.4.1 so if you're happy with it's current configuration and just want to start using it yourself, just download the `stocks.sppkg` file in the `sharepoint/solution` folder and upload it to your tenant. 


![Demo](./Assets/stockviewer.gif)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
Stock Tracker|Paul Richard

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 24, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`
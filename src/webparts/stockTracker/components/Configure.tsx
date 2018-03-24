import * as React from 'react'
import styles from './StockTracker.module.scss';
interface WelcomeProps {
    name: string,
   }

const Configure: React.SFC = (props) => {
 return (
    <div className = { styles.stockTracker }>
    <div className = { styles.container }>
      <div className = { styles.row }>
        <div className ={ styles.column }>
          <div>
            <span className = { styles.title }>Configure the webpart to get started.</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
 )
}

export default Configure;
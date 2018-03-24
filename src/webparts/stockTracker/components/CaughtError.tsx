import * as React from 'react'
import styles from './StockTracker.module.scss';
import { initializeIcons } from '@uifabric/icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const CaughtError: React.SFC = (props) => {
 return (
    <div className = { styles.stockTracker }>
      <div className = { styles.container }>
        <div className = { styles.row }>
          <div className ={ styles.column }>
          <div>
             <Icon className = { styles.error } iconName='Error' />
          </div>
           <div>
            <span className = { styles.title }>Sorry, it looks like we were unable to get your stock information at this time.</span>
          </div>
        </div>
      </div>
    </div>
  </div>  
 )
}

export default CaughtError;
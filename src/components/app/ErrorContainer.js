import styles from './styles/ErrorContainer.module.css'
import { LuRotateCw } from 'react-icons/lu';


export const ErrorContainer = ({ error, refresh }) => {
  return (
    <div className={styles.box}>
      <p>
        <strong>Error: </strong>
        <em>{ error }</em>
      </p>
      <button title='Reload data' onClick={refresh}>
        <LuRotateCw />
      </button>
    </div>
  )
}

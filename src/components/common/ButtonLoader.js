import styles from './styles/ButtonLoader.module.css';


export const ButtonLoader = ({ loaderStyle }) => {
  const cssClass = loaderStyle === 'dark'? styles.dark: styles.light;

  return (
    <div className={`${styles.loader} ${cssClass}`} data-loader></div>
  );
}

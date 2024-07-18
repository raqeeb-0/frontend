import styles from './styles/Page.module.css';


export const Page = ({ children }) => {
  return (
    <main className={styles.pageLayout}>
      { children }
    </main>
  );
}

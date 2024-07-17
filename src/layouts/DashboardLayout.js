import styles from './styles/DashboardLayout.module.css';
import { TopNav } from '../components/app';
import { RequireAuth } from '../components/auth';


export const DashboardLayout = (props) => {
  const { username, isEmptyList, children } = props;

  return (
    <RequireAuth>
      <div className={styles.page}>
        <TopNav
          username={username}
          isEmptyList={isEmptyList}
        />
        <main className={styles.main}>
          { children }
        </main>
      </div>
    </RequireAuth>
  );
}

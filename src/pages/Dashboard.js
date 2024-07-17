import styles from './styles/Dashboard.module.css';
import {
  Link
} from 'react-router-dom';
import { DashboardLayout } from '../layouts';
import {
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  Notification,
  ActionsMenu,
  SearchInput,
  PageHeader
} from '../components/common';
import { useAuth } from '../hooks/common';


export const Dashboard = () => {
  const { isLoading: isFetchingUser } = useAuth();

  const isLoading = isFetchingUser/* || isFetchingOrgs*/;

  return (
    isLoading
      ?<Loader />
      :<DashboardLayout>
          <PageHeader value='Overview' />
          <SearchInput />
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th style={{width: '3rem'}}></th>
                <th> Organization name </th>
                <th style={{width: '6rem'}}> Created At </th>
                <th style={{width: '4rem'}}></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>

      </DashboardLayout>
  );
}

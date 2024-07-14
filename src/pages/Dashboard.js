import styles from './styles/Dashboard.module.css';
import {
  Link,
  useLoaderData
} from 'react-router-dom';
import { DashboardLayout } from '../layouts';
import {
  EmptyListPlaceholder
} from '../components/app';
import {
  Notification,
  ActionsMenu,
  SearchInput,
  PageHeader
} from '../components/common';
import { useGetUser } from '../hooks/users';
import { useGetOrgs } from '../hooks/orgs';
import { useNotify } from '../hooks/common';


export const Dashboard = () => {
  const {
    user,
    refreshUser,
    error: userError,
    isLoading: isFetchingUser
  } = useGetUser();
  const {
    orgs,
    refreshOrgs,
    error: orgsError,
    isLoading: isFetchingOrgs
  } = useGetOrgs();


  const isLoading = isFetchingUser || isFetchingOrgs;

  return (
    isLoading
      ?<h1> Loading ... </h1>
      :<DashboardLayout username={user.userName}>
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
             {
               orgs.map((org, index) => {
                return (
                <tr key={index + 1} className={styles.tr}>
                  <td style={{textAlign: 'center'}}>
                    { index + 1 }
                  </td>
                  <td>
                    <Link to='/app' className={styles.name}>
                      { org.name }
                    </Link>
                  </td>
                  <td>
                    { org.createdAt.split('T')[0] }
                  </td>
                  <td style={{
                    textAlign: 'center',
                    position: 'relative',
                  }}>
                    <ActionsMenu
                      updatePath={`/organizations/${org.id}/edit`}
                      deletePath={`/organizations/${org.id}/delete`}
                    />
                  </td>
                </tr>
                );
              })
            }
            </tbody>
          </table>
          {
            orgs.length === 0 &&
            <EmptyListPlaceholder listName='organization' />
          }
      </DashboardLayout>
  );
}

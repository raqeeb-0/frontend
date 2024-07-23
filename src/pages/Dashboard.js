import styles from './styles/Dashboard.module.css';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../layouts';
import {
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  ActionsMenu,
  SearchInput,
  PageHeader
} from '../components/common';
import { useGetOrgs, useSelectOrg } from '../hooks/orgs';


export const Dashboard = () => {
  const { orgs, isLoading: isFetchingOrgs } = useGetOrgs();
  const { handleSelectOrg, isLoading: isSelectingOrg } = useSelectOrg();

  const deleteHandler = () => {};

  const isLoading = isFetchingOrgs;

  const handleClick = (e) => 
    handleSelectOrg(e.currentTarget.getAttribute('data-id'));

  return ( 
    <DashboardLayout isEmptyList={orgs.length === 0}>
      { isLoading? <Loader />
          :<>
          <PageHeader value='Overview' />
          <SearchInput resourceName='organizations' />
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
                    <button
                      data-id={org.id}
                      className={styles.name}
                      onClick={handleClick}
                      disabled={isSelectingOrg}
                    >
                      { org.name }
                    </button>
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
                      data={{ id: org.id }}
                      handleDelete={deleteHandler}
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
            <EmptyListPlaceholder
              listName='organizations'
              link={{
                path: '/organizations/create',
                name: 'Create Organization',
              }}
            />
          }
          </>
      }
    </DashboardLayout>
  );
}

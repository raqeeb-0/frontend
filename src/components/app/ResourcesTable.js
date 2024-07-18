import styles from './styles/ResourcesTable.module.css';
import { Link } from 'react-router-dom';
import { ActionsMenu } from '../common';


export const ResourcesTable = (props) => {
  const { resourceName, resources } = props;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{width: '3rem'}}></th>
          {
            resources.length > 0 && Object.keys(resources[0])
              .map((field) => {
                if (field === 'id') return
                if (field === 'name') {
                  return (
                    <th key={field} className={styles.capital}>
                      {resourceName} {field}
                    </th>
                  );
                }
                return (
                  <th
                    key={field}
                    style={{minWidth: '6rem'}}
                  >
                    {field}
                  </th>
                );
              })
          }
          <th style={{width: '4rem'}}></th>
        </tr>
      </thead>
      <tbody>
      {
        resources.length > 0 && resources.map((resource, index) => {
          return (
          <tr key={index + 1}>
            <td style={{textAlign: 'center'}}>
              { index + 1 }
            </td>
            {
              Object.keys(resource).map((key) => {
                if (key === 'id') return
                else if (key === 'name') {
                  return (
                    <td key={key}>
                      <Link
                        to={`/app/${resourceName}s/${resource.id}`}
                        className={styles.name}
                      >
                        { resource[key] }
                      </Link>
                    </td>
                  );
                } else if (key === 'createdAt') {
                  return <td key={key}> { resource[key].split('T')[0] } </td>
                } else {
                  return <td key={key}> { resource[key] } </td>
                }
              })
            }
            <td style={{
              textAlign: 'center',
              position: 'relative',
            }}>
              <ActionsMenu
                updatePath={`/app/${resourceName}s/${resource.id}/edit`}
                deletePath={`/app/${resourceName}s/${resource.id}/delete`}
              />
            </td>
          </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}

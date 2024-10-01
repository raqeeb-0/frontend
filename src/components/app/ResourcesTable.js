import styles from './styles/ResourcesTable.module.css';
import { Link } from 'react-router-dom';
import { ActionsMenu } from '../common';


export const ResourcesTable = (props) => {
  const { resourceName, resourcePath, resources, handleDelete } = props;
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {
            resources.length > 0 && Object.keys(resources[0])
              .map((field) => {
                if (field === 'id') return null
                else if (field === 'name' || field ==='ID') {
                  return (
                    <th key={field}>
                      {resourceName} {field}
                    </th>
                  );
                } else {
                  return (
                    <th key={field}>
                      {field}
                    </th>
                  );
                }
              })
          }
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
        resources.length > 0 && resources.map((resource, index) => {
          return (
          <tr key={index + 1}>
            <td>
              { index + 1 }
            </td>
            {
              Object.keys(resource).map((key) => {
                if (key === 'id') return null
                else if (key === 'name' || key === 'ID') {
                  return (
                    <td key={key}>
                      <Link
                        to={`${resource.id}`}
                        className={styles.resourceLink}
                        onClick={(e) => e.preventDefault()}
                      >
                        { resource[key] }
                      </Link>
                    </td>
                  );
                } else {
                  return (
                    <td key={key}>
                      { resource[key] }
                    </td>
                  );
                }
              })
            }
            <td>
              <ActionsMenu
                updatePath={`${resource.id}/edit`}
                data={{ id: resource.id }}
                handleDelete={handleDelete}
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

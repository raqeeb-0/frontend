import styles from './styles/Sidebar.module.css';
import { MdOutlineWarehouse } from 'react-icons/md';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdAssignmentAdd } from 'react-icons/md';
import { SideNav } from './SideNav';
import { Link } from 'react-router-dom';


export const Sidebar = ({ isOpen }) => {
  const materials = [
    {
      path: '/app/materials/items',
      name: 'Items',
      icon: <MdOutlineWarehouse />,
    },
    {
      path: '/app/materials/categories',
      name: 'Categories',
      icon: <MdOutlineWarehouse />,
    }
  ];

  const widthClass = isOpen? styles.opened: styles.closed;

  return (
    <aside className={`${styles.sidebar} ${widthClass}`}>
      <Link to='/dashboard' className={styles.header}>
        <img
          src={process.env.PUBLIC_URL + '/logo192name.png'}
          alt='logo'
          width='128'
          height='64'
        />
      </Link>
      <ul className={styles.list}>
        <li>
          <SideNav
            panelLink={{
              path: '/app/materials',
              name: 'Materials',
              icon: <MdOutlineWarehouse />
            }}
            linksList={materials}
          />
        </li>

        <li>
          <SideNav
            panelLink={{
              path: '/app/products',
              name: 'materials',
              icon: <MdOutlineWarehouse />
            }}
          />
        </li>
      </ul>
    </aside>
  );
}

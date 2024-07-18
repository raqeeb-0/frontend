import styles from './styles/Sidebar.module.css';
import { MdOutlineWarehouse } from 'react-icons/md';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdAssignmentAdd } from 'react-icons/md';
import { SideNav } from './SideNav';
import { Link } from 'react-router-dom';


const Header = ({ logoImage, brandName }) => {
  const logoPath = process.env.PUBLIC_URL + logoImage;
  return (
    <Link to='/dashboard' className={styles.header}>
      <img
        src={ logoPath }
        alt='logo'
        width='128'
        height='64'
        style={{objectFit: 'cover'}}
      />
    </Link>

  );
}


export const Sidebar = ({ isOpen }) => {
  const paths = [
    '/app/materials',
    '/app/products',
    '/app/production-orders'
  ];

  const icons = [
    <MdOutlineWarehouse />,
    <MdOutlineInventory2 />,
    <MdAssignmentAdd />
  ];

  const linkNames = [
    'Materials',
    'Products',
    'Production Orders'
  ];

  return (
    <aside className={styles.sidebar} style={{width: isOpen? '280px': '75px'}}>
      <Header
        logoImage='logo192name.png'
      />
      <SideNav
        paths={paths}
        icons={icons}
        linkNames={linkNames}
      />
    </aside>
  );
}

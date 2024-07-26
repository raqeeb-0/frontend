import styles from './styles/Sidebar.module.css';
import { SideNav } from './SideNav';
import { Link, NavLink } from 'react-router-dom';
import { LuWarehouse } from 'react-icons/lu';
import { LuClipboardList } from 'react-icons/lu';
import { LuTruck } from 'react-icons/lu';
import { LuTrendingDown } from 'react-icons/lu';
import { LuCircleDollarSign } from 'react-icons/lu';
import { LuUsers2 } from 'react-icons/lu';
import { LuPackagePlus } from 'react-icons/lu';
import { LuPackage } from 'react-icons/lu';
import { LuLayoutGrid } from 'react-icons/lu';
import { LuLayers } from 'react-icons/lu';
import { LuBoxes } from 'react-icons/lu';
import { LuPackageOpen } from 'react-icons/lu';


export const Sidebar = ({ isOpen }) => {
  const common = [
    {
      path: '/app/purchases',
      name: 'Purchasing',
      icon: <LuClipboardList />,
    },
    {
      path: '/app/sales',
      name: 'Sales',
      icon: <LuCircleDollarSign />,
    },
    {
      path: '/app/production-orders',
      name: 'Production Orders',
      icon: <LuPackagePlus />,
    },
    {
      path: '/app/suppliers',
      name: 'Suppliers',
      icon: <LuTruck />,
    },
    {
      path: '/app/customers',
      name: 'Customers',
      icon: <LuUsers2 />,
    }
  ]

  const materials = [
    {
      path: '/app/materials/items',
      name: 'Items',
      icon: <LuLayers />,
    },
    {
      path: '/app/materials/categories',
      name: 'Categories',
      icon: <LuLayoutGrid />,
    }
  ];

  const expenses = [
    {
      path: '/app/expenses/units',
      name: 'Units',
      icon: <LuBoxes />,
    },
    {
      path: '/app/expenses/categories',
      name: 'Categories',
      icon: <LuLayoutGrid />,
    }
  ];

  const products = [
    {
      path: '/app/products/items',
      name: 'Items',
      icon: <LuPackageOpen />,
    },
    {
      path: '/app/products/categories',
      name: 'Categories',
      icon: <LuLayoutGrid />,
    }
  ];

  const handleNavLink = ({ isActive }) => {
    const activeClass = isActive? styles.active: '';
    return `${activeClass} ${styles.link}`;
  }

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
        {
          common.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={handleNavLink}
                  title={link.name}
                >
                  { link.icon }{ link.name }
                </NavLink>
              </li>
            );
          })
        }
        <li>
          <SideNav
            panelLink={{
              path: '/app/materials',
              name: 'Materials',
              icon: <LuWarehouse />
            }}
            panelList={materials}
          />
        </li>
        <li>
          <SideNav
            panelLink={{
              path: '/app/expenses',
              name: 'Expenses',
              icon: <LuTrendingDown />
            }}
            panelList={expenses}
          />
        </li>
        <li>
          <SideNav
            panelLink={{
              path: '/app/products',
              name: 'Products',
              icon: <LuPackage />
            }}
            panelList={products}
          />
        </li>
      </ul>
    </aside>
  );
}

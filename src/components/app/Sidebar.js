import styles from './styles/Sidebar.module.css';
import {
  LuBoxes,
  LuTruck,
  LuLayers,
  LuUsers2,
  LuPackage,
  LuWarehouse,
  LuLayoutGrid,
  LuPackagePlus,
  LuPackageOpen,
  LuTrendingDown,
  LuClipboardList,
  LuCircleDollarSign
} from 'react-icons/lu';
import { SideNav } from './SideNav';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';


const purchasing = [
  {
    path: '/app/material-purchases',
    name: 'Materials',
    icon: <LuLayers />,
  },
  {
    path: '/app/expense-purchases',
    name: 'Expenses',
    icon: <LuBoxes />,
  }
];

const common = [
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
];

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

const panels = [
  {
    title: 'Materials',
    icon: <LuWarehouse />,
    list: materials,
  },
  {
    title: 'Expenses',
    icon: <LuTrendingDown />,
    list: expenses,
  },
  {
    title: 'Products',
    icon: <LuPackage />,
    list: products,
  }
];

const logoUrl = `${process.env.PUBLIC_URL}/logo192name.png`;

export const Sidebar = ({ isOpen }) => {
  const [activePanel, setActivePanel] = useState(null);

  const handlePanelClick = (panelIndex) => {
    setActivePanel(activePanel === panelIndex ? null : panelIndex);
  }

  const handlePanelFocus = (panelIndex) => {
    setActivePanel(panelIndex);
  }

  const handleNavLinkStyle = ({ isActive }) => {
    const activeClass = isActive? styles.active: '';
    return `${activeClass} ${styles.link}`;
  }

  const sidebarWidth = isOpen? styles.opened: styles.closed;

  return (
    <aside className={`${styles.sidebar} ${sidebarWidth}`}>
      <Link to='/organizations/overview' className={styles.header}>
        <img
          src={logoUrl}
          alt='logo'
          width='128'
          height='64'
        />
      </Link>
      <ul className={styles.list}>
        <li>
          <SideNav
            panelHeader={{
              title: 'Purchasing',
              icon: <LuClipboardList />,
            }}
            panelList={purchasing}
            isActive={activePanel === 0}
            onClick={() => handlePanelClick(0)}
            onFocus={() => handlePanelFocus(0)}
          />
        </li>
        {
          common.map((link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={handleNavLinkStyle}
                  title={link.name}
                  onClick={() => setActivePanel(null)}
                >
                  { link.icon }{ link.name }
                </NavLink>
              </li>
            );
          })
        }
        {
          panels.map((panel, index) => {
            const idx = index + 1;
            return (
              <li key={idx}>
                <SideNav
                  panelHeader={{
                    title: panel.title,
                    icon: panel.icon,
                  }}
                  panelList={panel.list}
                  isActive={activePanel === idx}
                  onClick={() => handlePanelClick(idx)}
                  onFocus={() => handlePanelFocus(idx)}
                />
              </li>
            )
          })
        }
      </ul>
    </aside>
  );
}

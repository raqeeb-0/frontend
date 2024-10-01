import styles from './styles/Sidebar.module.css';
import {
  LuTags,
  LuBoxes,
  LuTruck,
  LuLayers,
  LuUsers2,
  LuPackage,
  LuWarehouse,
  LuLayoutList,
  LuLayoutGrid,
  LuPackagePlus,
  LuPackageOpen,
  LuClipboardList,
  LuCircleDollarSign
} from 'react-icons/lu';
import { SideNav } from './SideNav';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';


const common = [
  {
    path: 'purchasing',
    name: 'Purchasing',
    icon: <LuClipboardList />,
  },
  {
    path: 'sales',
    name: 'Sales',
    icon: <LuCircleDollarSign />,
  },
  {
    path: 'production-orders',
    name: 'Production Orders',
    icon: <LuPackagePlus />,
  },
  {
    path: 'suppliers',
    name: 'Suppliers',
    icon: <LuTruck />,
  },
  {
    path: 'customers',
    name: 'Customers',
    icon: <LuUsers2 />,
  }
];

const inventory = [
  {
    path: 'inventory/material-stock',
    name: 'Material Stock',
    icon: <LuLayers />,
  },
  {
    path: 'inventory/product-inventory',
    name: 'Product Inventory',
    icon: <LuPackageOpen />,
  }
]

const purchaseItems = [
  {
    path: 'purchase-items/list',
    name: 'List',
    icon: <LuLayoutList />,
  },
  {
    path: 'purchase-items/categories',
    name: 'Categories',
    icon: <LuLayoutGrid />,
  }
];

const products = [
  {
    path: 'products/list',
    name: 'List',
    icon: <LuLayoutList />,
  },
  {
    path: 'products/categories',
    name: 'Categories',
    icon: <LuTags />,
  }
];

const panels = [
  {
    title: 'Inventory',
    icon: <LuWarehouse />,
    list: inventory,
  },
  {
    title: 'Purchase Items',
    icon: <LuBoxes />,
    list: purchaseItems,
  },
  {
    title: 'Products',
    icon: <LuPackage />,
    list: products,
  }
];

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
          src='/logo192name.png'
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
            return (
              <li key={index}>
                <SideNav
                  panelHeader={{
                    title: panel.title,
                    icon: panel.icon,
                  }}
                  panelList={panel.list}
                  isActive={activePanel === index}
                  onClick={() => handlePanelClick(index)}
                  onFocus={() => handlePanelFocus(index)}
                />
              </li>
            )
          })
        }
      </ul>
    </aside>
  );
}

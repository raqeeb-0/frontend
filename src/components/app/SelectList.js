import styles from './styles/SelectList.module.css';
import { useMemo, useRef } from 'react';


export const SelectList = (props) => {
  const {
    items,
    inputRef,
    isActive,
    setIsActive,
    selectedItems,
    setSelectedItems
  } = props;

  const itemRef = useRef();
  const assignRef = (index) => !index && { ref: itemRef };
  
  const handleListItemClick = (option) => {
    const newSelectedOptions = [...selectedItems];
    newSelectedOptions.push({
      id: option.id,
      name: option.name,
      quantity: ''
    });
    setSelectedItems(newSelectedOptions);
  }
  
  const handleListItemKeyDown = (e, option) => {
    if (e.key === 'Enter') {
      handleListItemClick(option);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsActive(false);
      inputRef.current.focus();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (itemRef.current.previousElementSibling) {
        itemRef.current = itemRef.current.previousElementSibling;
        itemRef.current.focus();
      }
    }
    if(e.key === 'ArrowDown') {
      e.preventDefault();
      if (itemRef.current.nextElementSibling) {
        itemRef.current = itemRef.current.nextElementSibling;
        itemRef.current.focus();
      }
    }
  }
  
  const activeStatus = isActive ? styles.active : styles.inactive;
  
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      !selectedItems.find(selected => selected.id === item.id)
    );
  }, [items, selectedItems]);
  
  if (filteredItems.length === 0) {
    return (
      <ul className={`${styles.list} ${activeStatus}`}>
        <div style={{ textAlign: 'center' }}>List is empty</div>
      </ul>
    )
  }

  return (
    <ul className={`${styles.list} ${activeStatus}`}>
      {
        filteredItems.map((option, index) => {
          return (
            <li
              key={index}
              {...assignRef(index)}
              value={option.id}
              onClick={() => handleListItemClick(option)}
              onKeyDown={(e) => handleListItemKeyDown(e, option)}
              tabIndex={0}
            >
              { option.name }
            </li>
          );
        })
      }
    </ul>
  );
}

import styles from './styles/SelectMultiple.module.css';
import { useState, useRef } from 'react';
import { useOutsideClick } from '../../hooks/common';


export const SelectMultiple = (props) => {
  const { label, options, handleChange } = props;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef();
  const listRef = useRef();
  const activeStatus = isVisible? styles.active: styles.inactive;

  useOutsideClick({
    ref: listRef,
    handler: () => setIsVisible(false)
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    inputRef.current.focus();
    isVisible?
      setIsVisible(false):
      setIsVisible(true);
  }

  const handleDeleteItem = (e, option) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter((currentOption) =>
      currentOption.id !== option.id);
    setSelectedOptions(newSelectedOptions);
  }

  const handleListItemClick = (option) => {
    for (let i = 0; i < selectedOptions.length; i++) {
      if (option.id === selectedOptions[i].id) return;
    }
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.push(option);
    setSelectedOptions(newSelectedOptions);
  }

  const filteredOptions = options.filter(option =>
    !selectedOptions.includes(option));

  return (
    <div className={styles.container} ref={listRef}>
      <label className={styles.label}>
        <span>{ label }</span>
        <div
          className={styles.input}
          onClick={handleInputClick}
          ref={inputRef}
          tabIndex={0}
        >
          {
            selectedOptions.length !== 0 &&
              selectedOptions.map((option, index) => {
                return (
                  <div key={index}>
                    <input
                      type='number'
                      className={styles.numInput}
                      data-id={option?.id}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span
                       onClick={(e) => handleDeleteItem(e, option)}
                    >
                      { option?.name }
                    </span>
                  </div>
                );
              })
          }
        </div>
      </label>
      {
        filteredOptions.length !== 0 &&
          <div className={`${styles.list} ${activeStatus}`}>
            <ul>
            {
              filteredOptions.map((option, index) => {
                return (
                  <li
                    key={index}
                    value={option.id}
                    onClick={(e) => handleListItemClick(option, index)}
                  >
                    { option.name }
                  </li>
                );
              })
            }
            </ul>
          </div>
      }
    </div>
  );
}

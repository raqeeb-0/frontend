import styles from './styles/SelectMultiple.module.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import {
  useBlockHeight,
  useOutsideClick
} from '../../hooks';
import { LuXCircle } from 'react-icons/lu';
import { SelectList } from './SelectList';


const NumInput = (props) => {
  const { index, data, handleChange, handleDelete } = props;
  const [value, setValue] = useState(String(data.quantity) || '');
  const MINWIDTH = 4;
  const MAXWIDTH = 16;

  return (
    <>
      <input
        id={data.id}
        type='number'
        className={styles.numInput}
        value={value}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e, index);
        }}
        style={{
          width: `${
            Math.min(Math.max(value.length + 2, MINWIDTH), MAXWIDTH)
          }ch`
        }}
      />
      <label htmlFor={data.id} onClick={(e) => e.stopPropagation()}>
        { data.name }
      </label>
      <LuXCircle onClick={(e) => handleDelete(e, data)} />
    </>
  );
}

export const SelectMultiple = (props) => {
  const {
    id,
    error,
    registerObj,
    label,
    options,
    defaultValue
  } = props;
  const [selectedOptions, setSelectedOptions] =
    useState(defaultValue || []);
  const [isListActive, setIsListActive] = useState(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const errorRef = useRef();
  const { height: errorHeight } = useBlockHeight({
    blockInnerText: error,
    ref: errorRef,
  });

  const handleChange = (e, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = {
      ...selectedOptions[index],
      quantity: parseFloat(e.target.value),
    }
    setSelectedOptions(newSelectedOptions);
  }

  useOutsideClick({
    ref: containerRef,
    handler: () => setIsListActive(false)
  });

  useEffect(() => {
    if (options.length === selectedOptions.length) {
      inputRef.current.focus();
    }
  }, [selectedOptions]);

  const handleInputClick = (e) => {
    e.stopPropagation();
    setIsListActive(!isListActive);
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Escape' && isListActive) {
      e.preventDefault();
      setIsListActive(false);
    }
    if (e.key === 'Enter') {
      handleInputClick(e);
    }
  }

  const handleDeleteItem = (e, option) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter((currentOption) =>
      currentOption.id !== option.id);
    setSelectedOptions(newSelectedOptions);
  }

  const refinedOptions = useMemo(() => {
    return options.map(option => {
        if (!('id' in option && 'name' in option)) {
          throw new Error('Not a valid option');
        }
        return { id: option.id, name: option.name };
      });
  }, [options]);

  return (
    <div className={styles.group} ref={containerRef}>
      <span
        htmlFor={id} ref={inputRef}
        onClick={handleInputClick}
        className={styles.label}
      >
        { label }
      </span>
      <input
        type='hidden'
        value={
          selectedOptions.length !== 0
          ? JSON.stringify(selectedOptions)
          : ''
        }
        {...registerObj}
      />
      <ul
        id={id}
        className={styles.inputList}
        onClick={handleInputClick}
        onFocus={registerObj.onFocus}
        onKeyDown={handleInputKeyDown}
        aria-label={label}
        ref={inputRef}
        tabIndex={0}
      >
        {
          selectedOptions.length !== 0 &&
            selectedOptions.map((option, index) => {
              return (
                <li key={index}>
                  <NumInput
                    index={index}
                    data={option}
                    handleChange={handleChange}
                    handleDelete={handleDeleteItem}
                  />
                </li>
              );
            })
        }
      </ul>
      <SelectList
        isActive={isListActive}
        setIsActive={setIsListActive}
        inputRef={inputRef}
        items={refinedOptions}
        selectedItems={selectedOptions}
        setSelectedItems={setSelectedOptions}
      />
      <span
        ref={errorRef}
        className={`${styles.error} ${error? styles.show: styles.hide}`}
        style={{ height: `${errorHeight}px` }}
      >
        { error }
      </span>
    </div>
  );
}

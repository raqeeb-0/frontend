import styles from './styles/SelectMultiple.module.css';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useOutsideClick } from '../../hooks/common';
import { LuXCircle } from 'react-icons/lu';


const NumInput = (props) => {
  const { index, data, handleChange, handleDelete } = props;
  const [value, setValue] = useState(String(data.count) || '');
  const MINWIDTH = 4;
  const MAXWIDTH = 16;

  // useEffect(() => {
  //   setValue(String(data.count));
  // }, [data.count]);

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
  const { id, registerObj, label, options, defaultValue } = props;
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef();
  const containerRef = useRef();
  const activeStatus = isVisible ? styles.active : styles.inactive;

  useEffect(() => {
    // console.log(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    // console.log("rerender toggled");
  });

  const handleChange = (e, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = {
      ...selectedOptions[index],
      count: parseFloat(e.target.value),
    }
    setSelectedOptions(newSelectedOptions);
  }

  useOutsideClick({
    ref: containerRef,
    handler: () => setIsVisible(false)
  });

  const handleListClick = (e) => {
    e.stopPropagation();
    isVisible
    ? setIsVisible(false)
    : setIsVisible(true);
  }

  const handleListKeyDown = (e) => {
    if (e.key === 'Tab' && isVisible) {
      e.preventDefault();
      setIsVisible(false);
    }
    if (e.key === 'Enter') {
      handleListClick(e);
    }
  }

  const handleDeleteItem = (e, option) => {
    e.stopPropagation();
    const newSelectedOptions = selectedOptions.filter((currentOption) =>
      currentOption.id !== option.id);
    setSelectedOptions(newSelectedOptions);
  }

  const handleListItemClick = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.push({
      id: option.id,
      name: option.name,
      count: ''
    });
    setSelectedOptions(newSelectedOptions);
  }

  const handleListItemKeyDown = (e, option) => {
    if (e.key === 'Enter') {
      handleListItemClick(option);
    }
  }

  const refinedOptions = useMemo(() => {
    return options.map(option => {
        if (!('id' in option && 'name' in option)) {
          throw new Error('Not a valid option');
        }
        return { id: option.id, name: option.name };
      });
  }, [options]);

  const filteredOptions = useMemo(() => {
    return refinedOptions.filter(option =>
      !selectedOptions.find(selected => selected.id === option.id)
    );
  }, [refinedOptions, selectedOptions]);

  return (
    <>
    <div className={styles.group} ref={containerRef}>
      <span
        htmlFor={id} ref={inputRef}
        onClick={handleListClick}
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
        onClick={handleListClick}
        onFocus={registerObj.onFocus}
        onKeyDown={handleListKeyDown}
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
      <ul className={`${styles.list} ${activeStatus}`}>
        {
          filteredOptions.length === 0
          ? <li style={{ textAlign: 'center' }}>List is empty</li>
          : filteredOptions.map((option, index) => {
              return (
                <li
                  key={index}
                  value={option.id}
                  onClick={() => handleListItemClick(option, index)}
                  onKeyDown={(e) => handleListItemKeyDown(e, option)}
                >
                  { option.name }
                </li>
              );
            })
        }
      </ul>
    </div>
    </>
  );
}

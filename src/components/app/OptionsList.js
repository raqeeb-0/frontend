export const OptionsList = ({ options }) => {
  return options.map((option, index) => {
    return (
      <option
        key={index}
        value={option.id? option.id: option}
      >
        { option.name? option.name: option }
      </option>
    );
  });
}

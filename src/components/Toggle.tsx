const Toggle = (props: {
  id: string;
  name: string;
  value: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label htmlFor={props.id}>
      <input
        type="checkbox"
        name={props.name}
        id={props.id}
        checked={props.value}
        onChange={props.onChange}
        readOnly
      />
    </label>
  );
};

export default Toggle;

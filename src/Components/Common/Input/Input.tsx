type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function Input({ onChange, value, ...other }: InputProps) {
  return <input onChange={onChange} value={value} {...other} />;
}

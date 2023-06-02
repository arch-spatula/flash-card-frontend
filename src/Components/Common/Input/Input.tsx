type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: React.HTMLInputTypeAttribute;
  value: string;
};

export function Input({ onChange, type = 'text', value }: InputProps) {
  return <input type={type} onChange={onChange} value={value} />;
}

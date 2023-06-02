type ButtonProps = {
  text: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export function Button({ text, type }: ButtonProps) {
  return <button type={type}>{text}</button>;
}

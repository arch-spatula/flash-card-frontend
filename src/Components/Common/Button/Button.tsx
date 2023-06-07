type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ children, onClick, ...other }: ButtonProps) {
  return (
    <button onClick={onClick} {...other}>
      {children}
    </button>
  );
}

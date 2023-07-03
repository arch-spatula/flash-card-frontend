export function OutSideProvider({
  children: component,
  isOpen,
}: {
  children: JSX.Element;
  isOpen: boolean;
}) {
  return <>{isOpen && component}</>;
}

export default function BoxComponent({ children, className }) {
  return (
    <div className={`border border-blue-400 p-4 m-2 shadow-md ${className}`}>
      {children}
    </div>
  );
}

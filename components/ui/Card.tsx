export default function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg shadow-md bg-white dark:bg-slate-900 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

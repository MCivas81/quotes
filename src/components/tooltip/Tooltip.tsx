import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="group flex">
      {children}
      <span className="absolute -top-9 right-0 scale-0 rounded bg-slate-700 p-2 text-xs text-white transition-all duration-300 group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;

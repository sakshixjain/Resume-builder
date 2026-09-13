import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  className,
  children,
  required,
  ...props
}) => {
  return (
    <label
      className={cn(
        "block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-cyan-400 ml-1">*</span>}
    </label>
  );
};

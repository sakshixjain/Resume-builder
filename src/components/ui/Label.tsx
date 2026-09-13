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
        "block text-[11px] font-semibold text-slate-700 mb-1 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 font-bold ml-0.5">*</span>}
    </label>
  );
};


import React from "react";
import { cn } from "./index";

const Input = React.forwardRef(({ className, type, error, touched, ...props }, ref) => {
  // Determine the error class based on touched and error props
  const errorClass = touched && error ? "border-red-500 ring-red-500" : "";

  return (
    <div>
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          errorClass,
          className
        )}
        ref={ref}
        {...props}
      />
      {touched && error && (
        <div className="mt-1 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };

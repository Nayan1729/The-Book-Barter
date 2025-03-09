import React from "react";
import { cn } from "./index";

const Textarea = React.forwardRef(({ error, touched, className, ...props }, ref) => {
  const baseClasses =
    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  
  const errorClasses = touched && error 
    ? "border-red-500 focus-visible:ring-red-500" 
    : "";

  return (
    <>
    <textarea
      ref={ref}
      className={cn(baseClasses, errorClasses, className)}
      {...props}
    />
    {touched && error && (
        <div className="mt-1 text-sm text-red-500">{error}</div>
      )}
  </>
  );
});

export default Textarea;

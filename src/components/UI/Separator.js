import React from "react";

export function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}) {
  const baseStyles = "bg-gray-200 dark:bg-gray-700";
  const orientationStyles =
    orientation === "horizontal" ? "h-px w-full" : "h-full w-px";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`${baseStyles} ${orientationStyles} ${className}`}
      {...props}
    />
  );
}

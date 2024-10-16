export const Spinner = ({
  className = "",
  variant = "primary",
  size = "md",
}) => {
  let variantClasses = "";
  let sizeClasses = "";

  // Handling variant classes
  if (variant === "primary") {
    variantClasses = "border-blue-500 border-t-blue-900";
  } else if (variant === "secondary") {
    variantClasses = "border-gray-200 border-t-gray-600";
  } else if (variant === "super") {
    variantClasses = "border-gray-200 border-t-pink-600";
  } else if (variant === "danger") {
    variantClasses = "border-red-200 border-t-red-600";
  } else if (variant === "follow") {
    variantClasses = "border-primary-900/70 border-t-red-600";
  } else if (variant === "lens") {
    variantClasses = "border-yellow-300 border-t-red-400";
  }

  // Handling size classes
  if (size === "xs") {
    sizeClasses = "h-4 w-4 border-[2px]";
  } else if (size === "sm") {
    sizeClasses = "h-5 w-5 border-2";
  } else if (size === "md") {
    sizeClasses = "h-8 w-8 border-[3px]";
  } else if (size === "lg") {
    sizeClasses = "h-10 w-10 border-4";
  }

  // Combining all classes
  const combinedClasses = `${variantClasses} ${sizeClasses} animate-spin rounded-full ${className}`;

  return <div className={combinedClasses} />;
};

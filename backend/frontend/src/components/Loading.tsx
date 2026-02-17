import React from "react";

type SpinnerProps = {
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ className = "" }) => {
  return (
    <span
      className={`inline-block h-5 w-5 rounded-full border-2 border-white border-t-blue-700 animate-spin ${className}`}
      aria-label="Loading"
      role="status"
    />
  );
};

export default Spinner;

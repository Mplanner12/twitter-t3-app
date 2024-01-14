import React from "react";
import { VscRefresh } from "react-icons/vsc";

type LoadingSpinnerProps = {
  Big?: boolean;
};

export const LoadingSpinner = ({ Big = false }: LoadingSpinnerProps) => {
  const sizeClasses = Big ? "w-16 w-16" : "w-10 h-10";
  return (
    <div className="flex justify-center p-2">
      <VscRefresh className={` animate-spin ${sizeClasses} `} />;
    </div>
  );
};

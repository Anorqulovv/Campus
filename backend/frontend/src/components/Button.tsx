import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  extraClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  extraClass = "",
}) => {
  return (
    <button
      type={type}
      className={`mt-4 py-3 bg-linear-to-r from-[#4A9FF5] to-[#357ABD] text-white rounded-xl font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(74,159,245,0.4)] active:scale-[0.98] ${extraClass}`}
    >
      {children}
    </button>
  );
};

export default Button;


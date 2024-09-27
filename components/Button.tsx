import { images } from "@/constant";
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#F58509] p-3 rounded-full text-white font-semibold"
      type="submit"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const GoogleButton = () => {
  return (
    <button className="flex items-center justify-center w-full mb-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
      <img
        src="assets/images/google-icon.svg"
        alt="Google"
        className="w-6 h-6 mr-2"
      />
      Sign in with Google
    </button>
  );
};

export default Button;

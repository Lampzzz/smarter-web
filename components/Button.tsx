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

export const GoogleButton = ({ label }) => {
  return (
    <button className="flex items-center justify-center w-full mb-4 p-3 border rounded-full bg-gray-100 hover:bg-gray-200">
      <img
        src={images.googleIcon.src as string}
        alt="Google"
        className="w-6 h-6 mr-2"
      />
      {label}
    </button>
  );
};

export default Button;

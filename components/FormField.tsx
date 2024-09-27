import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
  icon?: React.ReactNode; // More specific type for the icon
  error?: string;
  label?: string; // Optional label prop for accessibility
}

const FormField: React.FC<FormFieldProps> = ({
  type = "text",
  placeholder,
  icon,
  error,
  label,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <div className="flex items-center border rounded-lg">
        {/* {icon && <span className="p-2">{icon}</span>}{" "} */}
        {/* Optional icon rendering */}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-grow p-3 outline-none"
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;

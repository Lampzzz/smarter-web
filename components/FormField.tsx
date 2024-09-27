interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string;
  label?: string;
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
    <div className="flex items-center mb-4 w-full rounded-full px-3 border bg-[#FCFCFC]">
      <img src={icon as string} className="w-6 h-6 mr-2 bg-[#FCFCFC]" />

      <input
        type={type}
        placeholder={placeholder}
        className="flex-grow p-3 outline-none"
        {...props}
      />
    </div>
  );
};

export default FormField;

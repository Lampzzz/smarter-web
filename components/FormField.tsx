import { FormFieldProps } from "@/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
}) => {
  return (
    <div className="flex items-center mb-4 w-full rounded-full px-3 border bg-[#FCFCFC]">
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="flex-grow p-3 outline-none"
      />
      {error && (
        <span className="text-red-500 text-sm">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default FormField;

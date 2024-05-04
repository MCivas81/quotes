import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomTextareaProps {
  label?: string;
  rows: number;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  errorMessages?: Record<string, string> | undefined;
  placeholder?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  label,
  rows,
  register,
  error,
  errorMessages,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={register.name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={register.name}
          rows={rows}
          placeholder={placeholder}
          className={`w-full cursor-default rounded-md border-0 bg-white px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6 
          ${error && "ring-red-500 focus:ring-red-500"}`}
          {...register}
        />
      </div>
      {error && (
        <span className="block text-xs text-red-500">
          {errorMessages && errorMessages[error.type] ? errorMessages[error.type] : "Invalid input"}
        </span>
      )}
    </div>
  );
};

export default CustomTextarea;

import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface CustomInputProps {
  type: string;
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  errorMessages?: Record<string, string> | undefined;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  label,
  register,
  error,
  errorMessages,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isTypePassword = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="custom-input">
      {label && (
        <label
          htmlFor={register.name}
          className="mb-1 block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={register.name}
          autoComplete="on"
          type={isTypePassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`relative h-10 w-full cursor-default rounded-md border-0 bg-white px-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6 
          ${error && "ring-red-500 focus:ring-red-500"} 
          ${isTypePassword && "pr-10"}`}
          {...register}
        />
        {isTypePassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-900 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && (
        <span className="mt-1 block text-xs text-red-500">
          {errorMessages && errorMessages[error.type] ? errorMessages[error.type] : "Invalid input"}
        </span>
      )}
    </div>
  );
};

export default CustomInput;

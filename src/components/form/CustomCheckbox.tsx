import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomCheckboxProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
}
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, register, error }) => {
  return (
    <div className="space-y-5">
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={register.name}
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-0 focus:ring-offset-0 
            ${error && "border-red-500"}`}
            {...register}
          />
        </div>
        <div className="ml-3 text-xs leading-6">
          <label htmlFor={register.name} className="font-medium text-gray-900">
            {label}
          </label>
          {error && <span className="block text-xs text-red-500">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default CustomCheckbox;

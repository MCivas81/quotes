import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { OptionSelect } from "../../models/Form/Form.model";
import { FieldError } from "react-hook-form";

interface CustomMultipleSelectProps {
  field: {
    name: string;
    value: OptionSelect[];
    onChange: (value: OptionSelect[]) => void;
  };
  error: FieldError | undefined;
  options: OptionSelect[];
  label?: string;
  disabled?: boolean;
  defaultValue: OptionSelect[];
  isSubmitted: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CustomMultipleSelect: React.FC<CustomMultipleSelectProps> = ({
  field,
  error,
  options,
  label,
  disabled,
  defaultValue,
  isSubmitted,
}) => {
  const [selected, setSelected] = useState<OptionSelect[]>(defaultValue);

  useEffect(() => {
    if (isSubmitted) {
      setSelected(defaultValue);
    }
  }, [defaultValue, isSubmitted]);

  return (
    <Listbox
      value={selected}
      onChange={(value) => {
        field.onChange(value);
        setSelected(value);
      }}
      disabled={disabled}
      multiple
    >
      {({ open }) => (
        <>
          <Listbox.Label
            htmlFor={field.name}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button
              id={field.name}
              className={`relative h-10 w-full cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6 
              ${error && "ring-red-500 focus:ring-red-500"}`}
            >
              <span className="block truncate">
                {field.value?.length > 0
                  ? field.value.map((item) => item.name).join(", ")
                  : "Seleziona"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {open ? (
                  <FaChevronUp className="text-gray-900" aria-hidden="true" />
                ) : (
                  <FaChevronDown className="text-gray-900" aria-hidden="true" />
                )}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-cyan-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-cyan-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <FaCheck aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          {error && <span className="mt-1 block text-xs text-red-500">Required field</span>}
        </>
      )}
    </Listbox>
  );
};

export default CustomMultipleSelect;

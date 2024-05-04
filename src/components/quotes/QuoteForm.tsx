import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomTextarea from "../form/CustomTextarea";
import CustomInput from "../form/CustomInput";

interface FormValues {
  quote: string;
  author: string;
}

const QuoteForm: React.FC<{ onSave: (quote: string, author: string) => void }> = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    if (isValid) {
      console.log(data);
      onSave(data.quote, data.author);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-md bg-gray-100 p-4 shadow-md"
    >
      <CustomTextarea
        placeholder="Enter your quote..."
        rows={3}
        register={{
          ...register("quote", {
            required: true,
          }),
        }}
        error={errors.quote}
        errorMessages={{
          required: "Campo obbligatorio",
        }}
      />
      <CustomInput
        placeholder="Author (optional)"
        type={"text"}
        register={{ ...register("author") }}
        error={errors.author}
      />
      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
        Save Quote
      </button>
    </form>
  );
};

export default QuoteForm;

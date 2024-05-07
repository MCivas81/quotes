import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomTextarea from "../form/CustomTextarea";
import CustomInput from "../form/CustomInput";
import { QuoteFormValues } from "../../models/Quote/Quote.model";

const QuoteForm: React.FC<{ onSave: (quote: string, author: string) => void }> = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<QuoteFormValues>();

  const onSubmit: SubmitHandler<QuoteFormValues> = (data: QuoteFormValues) => {
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
      className="space-y-4 rounded-md bg-slate-100 p-4 shadow-md border border-slate-300"
    >
      <CustomTextarea
        placeholder="Enter your quote..."
        rows={4}
        register={{
          ...register("quote", {
            required: true,
          }),
        }}
        error={errors.quote}
        errorMessages={{
          required: "Required field",
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

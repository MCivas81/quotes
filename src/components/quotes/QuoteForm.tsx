import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomTextarea from "../form/CustomTextarea";
import CustomInput from "../form/CustomInput";
import { QuoteFormValues } from "../../types/Quote";
import { useAppDispatch } from "../../state/hooks";
import { addQuote } from "../../state/reducers/quotesSlice";

const QuoteForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<QuoteFormValues>();

  const handleSaveQuote = (quote: string, author: string) => {
    dispatch(addQuote({ id: String(Date.now()), text: quote, author }));
  };

  const onSubmit: SubmitHandler<QuoteFormValues> = (data: QuoteFormValues) => {
    if (isValid) {
      handleSaveQuote(data.quote, data.author);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      data-testid="quote-form"
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 rounded-md border border-slate-300 bg-slate-200 shadow-md"
    >
      <div className="space-y-4 border p-4 sm:p-6">
        <CustomTextarea
          placeholder="Enter a quote..."
          rows={3}
          register={{
            ...register("quote", {
              required: true,
            }),
          }}
          error={errors.quote}
          errorMessages={{
            required: "This field is required",
          }}
        />
        <CustomInput
          placeholder="Author (optional)"
          type={"text"}
          register={{ ...register("author") }}
          error={errors.author}
        />
        <div className="flex justify-end">
          <button type="submit" className="btn-primary w-1/3" disabled={isSubmitting}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default QuoteForm;

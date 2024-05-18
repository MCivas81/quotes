import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomInput from "../components/form/CustomInput";
import { useAppDispatch } from "../state/hooks";
import Spinner from "../components/layouts/spinner/Spinner";
import { login } from "../state/authAction";
import logo from "../assets/main-logo.png";
import { LoginFormValues } from "../types/Auth";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
    if (!isValid) return;

    setLoading(true);
    setError(null);
    try {
      await dispatch(login(data.email, data.password));
    } catch (error: any) {
      let errorMessage = "Login failed. Please try again.";
      if (error.response && error.response.status === 401) {
        errorMessage = "Invalid email or password.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-fill min-h-screen justify-center bg-[url('assets/login-bg.jpg')] bg-center bg-no-repeat sm:flex sm:items-center">
      <div className="mx-auto w-full max-w-sm space-y-6 px-8 pb-8 pt-12 drop-shadow-md sm:rounded-lg sm:bg-white sm:bg-opacity-30 sm:shadow-md sm:backdrop-blur-md">
        <div className="flex flex-shrink-0 items-center justify-center space-x-4 pb-4">
          <img className="h-20 w-auto" src={logo} alt="company_logo" />
          <p className="text-4xl font-semibold text-cyan-600">Quotes</p>
        </div>
        {error && (
          <span className="block rounded-lg bg-red-100 p-3 text-center text-sm text-red-600">
            {error}
          </span>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="col-span-1">
              <CustomInput
                type={"email"}
                register={{
                  ...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  }),
                }}
                label={"Email"}
                error={errors.email}
                errorMessages={{
                  required: "This field is required",
                  pattern: "Invalid email format",
                }}
              />
            </div>
            <div className="col-span-1">
              <CustomInput
                type={"password"}
                register={{
                  ...register("password", {
                    required: true,
                  }),
                }}
                label={"Password"}
                error={errors.password}
                errorMessages={{
                  required: "This field is required",
                }}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

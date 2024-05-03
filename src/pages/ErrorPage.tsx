import { useRouteError } from "react-router-dom";

interface Error {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-6 bg-red-50">
      <div>
        <h1 className="text-5xl font-bold text-red-700">Oops!</h1>
        <p className="mt-6 text-xl font-medium text-red-600">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-md mt-2 text-red-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

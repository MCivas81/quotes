import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-3xl font-bold">Unauthorized</h1>
      <p className="mb-8 text-gray-600 text-center">You do not have access to the requested page.</p>
      <div>
        <button
          onClick={goBack}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;

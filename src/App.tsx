import { Provider } from "react-redux";
import { store } from "./state/store";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import QuotingPage from "./pages/QuotingPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import UserProfile from "./pages/UserProfile";
import RequireAuth from "./components/auth/RequireAuth ";
import Unauthorized from "./pages/Unauthorized";

const ROLES = {
  Customer: "customer",
  Admin: "admin",
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <RootLayout />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/quotes",
          element: (
            <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]}>
              <QuotingPage />
            </RequireAuth>
          ),
        },
        {
          path: "/user-profile",
          element: <UserProfile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

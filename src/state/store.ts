import { Middleware, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import quotesReducer from "./reducers/quotesSlice";

const localStorageMiddleware: Middleware<object, any> = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const authState = getState().auth;
    localStorage.setItem("applicationState", JSON.stringify({ auth: authState }));
    return result;
  };
};

const reHydrateStore = (): object | undefined => {
  const serializedState = localStorage.getItem("applicationState");

  if (serializedState !== null) {
    return JSON.parse(serializedState);
  }
};

export const store = configureStore({
  reducer: { auth: authReducer, quotes: quotesReducer },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

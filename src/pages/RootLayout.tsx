import { Outlet } from "react-router-dom";
import NavBar from "../components/layouts/Navbar/NavBar";

export default function RootLayout() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
    </div>
  );
}

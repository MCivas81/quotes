import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/NavBar";

export default function RootLayout() {
  return (
    <div className="h-screen sm:overflow-hidden">
      <NavBar />
      <main className="h-[calc(100%-64px)] sm:overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

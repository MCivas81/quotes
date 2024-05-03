import { Outlet } from "react-router-dom";
import NavBar from "./Navbar/NavBar";

export default function RootLayout() {
  return (
    <div className="h-screen md:overflow-hidden">
      <NavBar />
      <main className="h-[calc(100%-64px)] md:overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

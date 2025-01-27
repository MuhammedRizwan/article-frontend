import { Outlet } from "react-router-dom";
import NavBar from "./page_component/nav_bar";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <main >
        <Outlet />
      </main>
    </div>
  );
}

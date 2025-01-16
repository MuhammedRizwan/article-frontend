import NavBar from "./page_component/nav_bar";

export default function Layout({ children }:{children: React.ReactNode}) {
    return (
      <div>
        <NavBar />
        <main>{children}</main>
      </div>
    );
  }
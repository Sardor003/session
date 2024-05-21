import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

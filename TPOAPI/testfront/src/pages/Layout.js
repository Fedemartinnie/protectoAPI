import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Components/AppBar";
import Footer from "../Components/Footer"; // Importa el componente Footer

const Layout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <hr />
      <Outlet />
      <Footer /> {/* Agrega el componente Footer al final del layout */}
    </div>
  );
}

export default Layout;
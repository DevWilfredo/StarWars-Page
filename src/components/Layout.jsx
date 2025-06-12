import Starfield from "react-starfield";
import Navbar from "./Navbar";
import DatabankSearch from "./DatabankSerach";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <main className="text-white">
        <Navbar />
        <DatabankSearch />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;

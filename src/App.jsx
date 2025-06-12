import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import LaserLoader from "./components/LaserLoader";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { isLoading } = useAppContext();
  if(isLoading) return <LaserLoader/>
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:type/:id/details" element={<Details />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

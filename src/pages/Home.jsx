import Grid from "../components/Grid";
import HeaderComponent from "../components/HeaderComponent";

const Home = () => {
  return (
    <>
      <HeaderComponent type="People" />
      <Grid type="people" />

      <HeaderComponent type="Vehicles" />
      <Grid type="vehicles" />
      <HeaderComponent type="Planets" />
      <Grid type="planets" />
    </>
  );
};

export default Home;

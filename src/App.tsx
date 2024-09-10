import "./App.css";
import Grid from "./components/grid";
import Header from "./components/header";

const App = () => (
  <>
    <Header />
    <Grid
      cards={[
        { value: "apple" },
        { value: "banana" },
        { value: "cherry" },
        { value: "apple" },
        { value: "banana" },
        { value: "cherry" },
        { value: "apple" },
        { value: "banana" },
        { value: "cherry" },
        { value: "apple" },
        { value: "banana" },
        { value: "cherry" },
        { value: "apple" },
        { value: "banana" },
        { value: "cherry" },
      ]}
    />
  </>
);

export default App;

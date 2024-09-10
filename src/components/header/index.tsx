import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MyApp</h1>
      </div>
      <div className="reset">
        <button onClick={() => console.log("Reset clicked")}>Reset</button>
      </div>
    </header>
  );
};

export default Header;

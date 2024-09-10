import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MyApp</h1>
      </div>
      <div>
        <button onClick={() => console.log('Reset clicked')}><h1>Reset</h1></button>
      </div>
    </header>
  );
};

export default Header;
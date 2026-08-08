import "../styles/LeftNavbar.css";

function Navbar() {
  return (
    <>
      <section id="left-navbar">
        <div className="pages-group">
          <a href="/dashboard">Dashboard</a>
          <a href="/transaction">Transactions</a>
          <a href="/budget">Budgets & Categories</a>
          <a href="/analytics">Analytics</a>
        </div>
        <div className="profile">
          <a href="/profile">Profile</a>
        </div>
      </section>
    </>
  );
}

export default Navbar;

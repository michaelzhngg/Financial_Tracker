import { NavLink } from "react-router-dom";
import "../styles/TopNavbar.css";

function Navbar() {
  return (
    <section id="top-navbar">
      <div className="title">
        <h3>FINANCIAL TRACKER</h3>
      </div>

      <div className="pages-group">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Dashboard
        </NavLink>

        <NavLink to="/transaction" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Transactions
        </NavLink>

        <NavLink to="/budget" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Budgets & Categories
        </NavLink>

        <NavLink to="/analytics" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Analytics
        </NavLink>
      </div>

      <div className="profile">
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </div>
    </section>
  );
}

export default Navbar;

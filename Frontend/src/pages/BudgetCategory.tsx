import TopNavbar from "../components/TopNavbar.tsx";
import "../styles/BudgetCategory.css";

function BudgetCategory() {
  return (
    <>
      <section id="screen">
        <TopNavbar />
        <h1>This is Budget & Category page</h1>
        <a href="/">back</a>
      </section>
    </>
  );
}

export default BudgetCategory;

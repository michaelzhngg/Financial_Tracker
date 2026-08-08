import "../styles/Transaction.css";
import TopNavbar from "../components/TopNavbar.tsx";

function Transaction() {
  return (
    <>
      <section id="screen">
        <TopNavbar />
        <h1>This is transaction page</h1>
        <a href="/">back</a>
      </section>
    </>
  );
}

export default Transaction;

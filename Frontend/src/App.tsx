import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Transaction from "./pages/Transaction.tsx";
import BudgetCategory from "./pages/BudgetCategory.tsx";
import Analytics from "./pages/Analytics.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Transcation page */}
        <Route path="transaction" element={<Transaction />} />

        {/* Budget & Category */}
        <Route path="/budget" element={<BudgetCategory />} />

        {/* Analytics page */}
        <Route path="/analytics" element={<Analytics />} />

        {/* Profile page */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

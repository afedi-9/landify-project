import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./index.css"

// Import pages
import Dashboard from "./app/dashboard/page"
import Tokenize from "./app/tokenize/page"
import Mapping from "./app/mapping/page"
import Properties from "./app/properties/page"
import Transactions from "./app/transactions/page"
import Settings from "./app/settings/page"
import SignIn from "./app/auth/signin/page"
import SignUp from "./app/auth/signup/page"
import ForgotPassword from "./app/auth/forgot-password/page"

function App() {
  // Mock authentication state
  const isAuthenticated = true

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/signin" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/signin" />} />
        <Route path="/tokenize" element={isAuthenticated ? <Tokenize /> : <Navigate to="/auth/signin" />} />
        <Route path="/mapping" element={isAuthenticated ? <Mapping /> : <Navigate to="/auth/signin" />} />
        <Route path="/properties" element={isAuthenticated ? <Properties /> : <Navigate to="/auth/signin" />} />
        <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/auth/signin" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/auth/signin" />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import { AppSidebar } from "./components/app-sidebar"
import HomePage from "./pages/home"
import DashboardPage from "./pages/dashboard"
import MappingPage from "./pages/mapping"
import TokenizePage from "./pages/tokenize"
import ContractSigningPage from "./pages/tokenize/contract/[id]"
import PropertiesPage from "./pages/properties"
import TransactionsPage from "./pages/transactions"
import SettingsPage from "./pages/settings"
import SignInPage from "./pages/auth/signin"
import SignUpPage from "./pages/auth/signup"
import ForgotPasswordPage from "./pages/auth/forgot-password"
import ProtectedRoute from "./components/protected-route"

function App() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/signin" element={<SignInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mapping"
            element={
              <ProtectedRoute>
                <MappingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tokenize"
            element={
              <ProtectedRoute>
                <TokenizePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tokenize/contract/:id"
            element={
              <ProtectedRoute>
                <ContractSigningPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <PropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App

import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./components/register-page";
import { StartPage } from "./components/start-page";
import { LoginPage } from "./components/login-page";
import { CampaignListAndCreate } from "./components/campaign-list-and-create";
import { CampaignDetailsAndEmails } from "./components/campaign-details-and-emails";
import { UserProfile } from "./components/user-profile";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { state } = useAuth();
  const user = state.user;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/register"
              element={!user ? <RegisterPage /> : <Navigate to="/campaigns" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/campaigns" />}
            />

            <Route
              path="/campaigns"
              element={
                user ? <CampaignListAndCreate /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/campaign-detail/:id"
              element={
                user ? <CampaignDetailsAndEmails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

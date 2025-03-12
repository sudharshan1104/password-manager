import "./styles/HomeApp.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomeContent,
  LoginForm,
  SignupForm,
  Totp,
  ForgotPassword,
  ResetPassword,
  Logout,
  CreateVault,
  VskPasswordGenerator,
} from "./pages";

import {
  Settings,
  SettingsMyAccount,
  Settings2Fa,
  SettingsIrreversible,
  SettingsExportData,
} from "./pages/";
import { VskAllItems, VskFavorites, VskTrash } from "./pages";
import { AuthProvider, RequireAuth } from "./Context";
import NoPage from "./pages/General/NoPage";
import ConnectionStatus from "../ConnectionStatus";

const App = () => {
  return (
    <>
      <ConnectionStatus />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<HomeContent />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/login-totp" element={<Totp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:emailId/:token"
              element={<ResetPassword />}
            />
            <Route
              path="/vault/all-items"
              element={
                <RequireAuth>
                  <VskAllItems />
                </RequireAuth>
              }
            />
            <Route
              path="/vault/fav"
              element={
                <RequireAuth>
                  <VskFavorites />
                </RequireAuth>
              }
            />
            <Route
              path="/vault/trash"
              element={
                <RequireAuth>
                  <VskTrash />
                </RequireAuth>
              }
            />
            <Route
              path="/password-generator"
              element={
                <RequireAuth>
                  <VskPasswordGenerator />
                </RequireAuth>
              }
            />
            <Route
              path="/vault-create"
              element={
                <RequireAuth>
                  <CreateVault />
                </RequireAuth>
              }
            />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/unlock" element={<Unlock />} /> */}
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
            <Route
              path="/settings/myaccount"
              element={
                <RequireAuth>
                  <SettingsMyAccount />
                </RequireAuth>
              }
            />
            <Route
              path="/settings/2fa"
              element={
                <RequireAuth>
                  <Settings2Fa />
                </RequireAuth>
              }
            />
            <Route
              path="/settings/irreversible-action"
              element={
                <RequireAuth>
                  <SettingsIrreversible />
                </RequireAuth>
              }
            />
            <Route
              path="/settings/export-data"
              element={
                <RequireAuth>
                  <SettingsExportData />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./routes/ROUTES";
import LoginRenderer from "./util/LoginRenderer";
import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserPage from "./pages/user/UserPage";
import AddNewInternship from "./pages/internship/add-new/AddNewInternship";
import InternshipList from "./pages/internship/page/list/InternshipList";
import InternshipPage from "./pages/internship/page/product-specific/InternshipPage";
import { useState } from "react";
import { AppContext } from "./context/context";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoutes from "./security/ProtectedRoutes";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatchSearchEvent = (actionType, payload) => {
    switch (actionType) {
      case "SET":
        setSearchQuery(payload.query);
        return;
      case "CLEAR":
        setSearchQuery("");
        return;
      default:
        return;
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ dispatchSearchEvent, searchQuery }}>
        <Routes>
          <Route path={NavigationRoutes.RENDERER} element={<LoginRenderer />} />
          <Route path={NavigationRoutes.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={NavigationRoutes.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
          <Route path={NavigationRoutes.REGISTER} element={<Register />} />
          <Route path={NavigationRoutes.INTERNSHIPS} element={<InternshipList />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={NavigationRoutes.INTERNSHIP}>
              <Route path=":name" element={<InternshipPage />} />
            </Route>
            <Route path={NavigationRoutes.NEW_INTERNSHIP} element={<AddNewInternship />} />
            <Route path={NavigationRoutes.USER} element={<UserPage />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import { NavigationRoutes } from "./routes/ROUTES";
import HomePage from "./pages/home/HomePage";
import Register from "./pages/auth/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

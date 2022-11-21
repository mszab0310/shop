import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import { NavigationRoutes } from "./routes/ROUTES";
import HomePage from "./pages/home/HomePage";
import Register from "./pages/Login/Register";

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

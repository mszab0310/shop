import { Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./routes/ROUTES";
import HomePage from "./pages/home/HomePage";
import Register from "./pages/auth/Register";
import LoginRenderer from "./pages/util/LoginRenderer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={NavigationRoutes.LOGIN} element={<LoginRenderer />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

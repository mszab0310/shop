import { Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./routes/ROUTES";
import HomePage from "./pages/home/HomePage";
import Register from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import LoginRenderer from "./pages/util/LoginRenderer";
import ProductPage from "./pages/product/ProductPage";
import UserPage from "./pages/user/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={NavigationRoutes.RENDERER} element={<LoginRenderer />} />
        <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
        <Route path={NavigationRoutes.PRODUCT} element={<ProductPage />} />
        <Route path={NavigationRoutes.USER} element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

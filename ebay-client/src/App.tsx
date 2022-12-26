import { Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./routes/ROUTES";
import LoginRenderer from "./util/LoginRenderer";
import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/page/ProductPage";
import UserPage from "./pages/user/UserPage";
import AddNewProduct from "./pages/product/add-new/AddNewProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={NavigationRoutes.RENDERER} element={<LoginRenderer />} />
        <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
        <Route path={NavigationRoutes.PRODUCT} element={<ProductPage />} />
        <Route path={NavigationRoutes.NEW_PRODUCT} element={<AddNewProduct />} />
        <Route path={NavigationRoutes.USER} element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

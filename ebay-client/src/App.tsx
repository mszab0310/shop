import { Route, Routes } from "react-router-dom";
import { NavigationRoutes } from "./routes/ROUTES";
import LoginRenderer from "./util/LoginRenderer";
import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/HomePage";
import UserPage from "./pages/user/UserPage";
import AddNewProduct from "./pages/product/add-new/AddNewProduct";
import ProductsList from "./pages/product/page/list/ProductsList";
import ProductPage from "./pages/product/page/product-specific/ProductPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={NavigationRoutes.RENDERER} element={<LoginRenderer />} />
        <Route path={NavigationRoutes.LOGIN} element={<LoginPage />} />
        <Route path={NavigationRoutes.REGISTER} element={<Register />} />
        <Route path={NavigationRoutes.HOME} element={<HomePage />} />
        <Route path={NavigationRoutes.PRODUCTS} element={<ProductsList />} />
        <Route path={NavigationRoutes.PRODUCT}>
          <Route path=":name" element={<ProductPage />} />
        </Route>
        <Route path={NavigationRoutes.NEW_PRODUCT} element={<AddNewProduct />} />
        <Route path={NavigationRoutes.USER} element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.scss";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { Modal } from "./components/Modal/Modal";
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePage } from "./pages/ProfilePage/Profile";
import { getMyUser } from "./storage/slices/userSlice";
import {
  fetchProducts,
  searchProductsByQuery,
} from "./storage/slices/productsSlice";
import { parseJwt } from "./utils/utils";
import { ChartPage } from "./pages/ChartPage/ChartPage";
import { BasketPage } from "./pages/BasketPage/BasketPage";
import { useLocation } from "react-router";

function App() {
  const [isAuthorized, setAuth] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useSelector((s) => s.products);
  const debounceValueInApp = useDebounce(search);
  const location = useLocation();

  useEffect(() => {
    if (debounceValueInApp === null) {
      return;
    }
    dispatch(searchProductsByQuery(debounceValueInApp));
  }, [debounceValueInApp, dispatch]);

  useEffect(() => {
    if (!isAuthorized) return;

    dispatch(getMyUser()).then(() => dispatch(fetchProducts()));
  }, [dispatch, isAuthorized]);

  useEffect(() => {
    const token = parseJwt(localStorage.getItem("token"));
    if (token && new Date() < new Date(token?.exp * 1e3)) {
      setAuth(true);
    } else {
      setModalActive(true);
      if (!["/login", "/register", "/reset-pass"].includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <div className={`app__light inner-example`}>
      <Header
        setModalActive={setModalActive}
        isAuthorized={isAuthorized}
      ></Header>

      <main className="container content ">
        {isAuthorized ? (
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/basket" element={<BasketPage />} />

            <Route
              path="/profile"
              element={
                <ProfilePage
                  setAuth={setAuth}
                  setModalActive={setModalActive}
                />
              }
            />

            <Route path="/chart" element={<ChartPage />} />
            <Route path="*" element={<div>Страница не найдена</div>} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route
              path="/register"
              element={
                <Modal
                  modalActive={modalActive}
                  setModalActive={setModalActive}
                >
                  <RegisterForm />
                </Modal>
              }
            />
            <Route
              path="/login"
              element={
                <Modal
                  modalActive={modalActive}
                  setModalActive={setModalActive}
                >
                  <LoginForm />
                </Modal>
              }
            />
            <Route
              path="/reset-pass"
              element={
                <Modal
                  modalActive={modalActive}
                  setModalActive={setModalActive}
                >
                  <ResetPass />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

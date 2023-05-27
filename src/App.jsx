/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";
import { CardList } from "./components/CardList/CardList";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { api } from "./utils/api";
import { useDebounce } from "./hooks/hooks";
import { Product } from "./components/Product/Product";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { RouterAuth } from "./router/Router";
import { UserContext } from "./context/userContext";
import { CardsContext } from "./context/cardContext";
import { ThemeContext } from "./context/themeContext";
import { filteredCards, findLiked } from "./utils/utils";
import {
  CHEAPEST,
  EXPENSIVE,
  NEWEST,
  POPULAR,
  RATE,
  SALE,
} from "./constants/constants";
import { AntdPage } from "./pages/AntdPage/AntdPage";
import { Form } from "./components/Form/Form";
import { RegistrationForm } from "./components/Form/RegistrationForm";
import { Modal } from "./components/Modal/Modal";
import { LoginForm } from "./components/Auth/Login/Login";
import { RegisterForm } from "./components/Auth/Register/Register";
import { ResetPass } from "./components/Auth/ResetPass/ResetPass";

function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = React.useState({});
  const [isAuthorized, setAuth] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(true);
  const [modalActive, setModalActive] = useState(false);

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = useCallback(async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    setCards((s) => [
      ...s.map((e) => (e._id === updatedCard?._id ? updatedCard : e)),
    ]);

    wasLiked
      ? // setFavorites/ delete
        setFavorites((state) => state.filter((f) => f._id !== updatedCard._id))
      : // setFavorites/ add
        setFavorites((state) => [updatedCard, ...state]);

    return wasLiked;
  }, []);

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return res / reviews.length;
  };

  const onSort = (sortId) => {
    switch (sortId) {
      case CHEAPEST:
        return setCards((state) => [
          ...state.sort((a, b) => a.price - b.price),
        ]);
      case EXPENSIVE:
        return setCards((state) => [
          ...state.sort((a, b) => b.price - a.price),
        ]);
      case POPULAR:
        return setCards((state) => [
          ...state.sort((a, b) => b.likes.length - a.likes.length),
        ]);
      case NEWEST:
        return setCards((state) => [
          ...state.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          ),
        ]);
      case SALE:
        return setCards((state) => [
          ...state.sort((a, b) => b.discount - a.discount),
        ]);
      case RATE:
        return setCards((state) => [
          ...state.sort(
            (a, b) => productRating(b.reviews) - productRating(a.reviews)
          ),
        ]);
      default:
        return setCards((state) => [
          ...state.sort((a, b) => a.price - b.price),
        ]);
    }
  };

  useEffect(() => {
    if (debounceValueInApp === undefined) {
      return;
    }
    api
      .searchProducts(debounceValueInApp)
      .then((data) => setCards(filteredCards(data)));
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, data]) => {
        setUser(userData);
        const filtered = filteredCards(data.products);
        setCards(filtered);
        const fav = filtered.filter((e) => findLiked(e, userData._id));
        // const fav = filtered.filter(e => e.likes.some(el => el === userData._id));
        setFavorites(fav);
      }
    );
  }, []);

  const cardsValue = {
    handleLike: handleProductLike,
    cards: cards,
    search,
    favorites,
    onSort,
    setModalActive,
    productRating,
    user,
  };

  const authRoutes = (
    <>
      <Route
        path="/register"
        element={
          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <RegisterForm />
          </Modal>
        }
      />
      <Route
        path="/login"
        element={
          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <LoginForm />
          </Modal>
        }
      />
      <Route
        path="/reset-pass"
        element={
          <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ResetPass />
          </Modal>
        }
      />
    </>
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, []);

  return (
    <div className={`app__${theme ? "light" : "dark"} inner-example`}>
      <ThemeContext.Provider value={theme}>
        <CardsContext.Provider value={cardsValue}>
          <UserContext.Provider value={user}>
            <Header setSearch={setSearch} favorites={favorites}></Header>

            <main className="container content ">
              {isAuthorized ? (
                <Routes>
                  <Route path="/" element={<CatalogPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/product/:id" element={<ProductPage />}></Route>
                  {authRoutes}
                  <Route path="/stylebook" element={<AntdPage />} />
                  <Route path="*" element={<div>NOT FOUND 404</div>} />
                </Routes>
              ) : (
                <Navigate to={"/not-found"} />
              )}
            </main>
            <Footer />
          </UserContext.Provider>
        </CardsContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

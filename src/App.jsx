import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { api } from "./utils/api";
import { useDebounce } from "./hooks/hooks";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
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

function App() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [user, setUser] = React.useState({});
  const [isAuthorized, setAuth] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState(true);

  const debounceValueInApp = useDebounce(search);

  const handleProductLike = async (product, wasLiked) => {
    const updatedCard = await api.changeProductLike(product._id, wasLiked);
    const index = cards.findIndex((e) => e._id === updatedCard._id);
    if (index !== -1) {
      setCards((state) => [
        ...state.slice(0, index),
        updatedCard,
        ...state.slice(index + 1),
      ]);
    }
    wasLiked
      ? setFavorites((state) => state.filter((f) => f._id !== updatedCard._id))
      : setFavorites((state) => [updatedCard, ...state]);
  };

  const productRating = (reviews) => {
    if (!reviews || !reviews.length) {
      return 0;
    }
    const res = reviews.reduce((acc, el) => (acc += el.rating), 0);
    return res / reviews.length;
  };

  const onSort = (sortId) => {
    if (sortId === CHEAPEST) {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
      return;
    }
    if (sortId === EXPENSIVE) {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
      return;
    }
    if (sortId === POPULAR) {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
      return;
    }
    if (sortId === NEWEST) {
      const newCards = cards.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCards([...newCards]);
      return;
    }

    if (sortId === SALE) {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards]);
      return;
    }
    if (sortId === RATE) {
      const newCards = cards.sort(
        (a, b) => productRating(b.reviews) - productRating(a.reviews)
      );
      setCards([...newCards]);
      return;
    }
  };

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
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
  };

  return (
    <div>
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

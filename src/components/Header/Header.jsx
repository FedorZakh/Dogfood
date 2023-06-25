import "./index.css";

import { ReactComponent as LogoSvg } from "../Logo/logo.svg";
import { Search } from "../Search/Search";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as Basket } from "./img/basket.svg";
import { ReactComponent as Profile } from "./img/profile.svg";
import { ReactComponent as Like } from "../Card/img/like.svg";
import { useSelector } from "react-redux";

export const Header = ({ setModalActive, isAuthorized }) => {
  const { favorites } = useSelector((s) => s.products);
  const basket = useSelector((state) => state.basket.goods);
  const location = useLocation();
  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to={"/"}>
            <LogoSvg className="logo" />
          </Link>
          {location.pathname === "/" && <Search />}
          <div className="header__icons">
            <Link className="header__fav" to={"/favorites"}>
              <Like className="header__like" />
              {!!favorites.length && (
                <span className="header__bubble">{favorites.length}</span>
              )}
            </Link>

            <Link className="link" to={"/basket"}>
              <Basket className="header__icon" />
              {!!basket.length && (
                <span className="header__basket">{basket.length}</span>
              )}
            </Link>
            {isAuthorized ? (
              <Link className="link" to={"/profile"}>
                Профиль
              </Link>
            ) : (
              <Link to={"/login"} onClick={() => setModalActive(true)}>
                <Profile className="header__icon" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

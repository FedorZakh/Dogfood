import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footerlinks">
        <Link to={"/"}>Каталог</Link>
        <Link to={"*"}>Акции</Link>
        <Link to={"*"}>Новости</Link>
        <Link to={"*"}>Отзывы</Link>
      </div>
      <div className="footerlinks">
        <Link to={"/basket"}>Оплата и доставка</Link>
        <Link to={"*"}>Часто спрашивают</Link>
        <Link to={"*"}>Обратная связь</Link>
        <Link to={"*"}>Контакты</Link>
      </div>
      <div className="footercontacts">
        <span>Мы на связи</span>
        <div className="footercontacts-phone">
          <span>8(999) 00-00-00</span>
          <span>dogfood@mail.ru</span>
        </div>
      </div>
    </div>
  );
};

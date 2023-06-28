import React from "react";
import "./footer.scss";
import { Logo } from "../Logo/Logo";
import { ReactComponent as VK } from "../img/vk.svg";
import { ReactComponent as Instagram } from "../img/instagram.svg";
import { ReactComponent as TG } from "../img/tg.svg";
import { ReactComponent as VB } from "../img/vb.svg";
export const Footer = () => {
  return (
    <div className="footer">
      <Logo />

      <div className="footerlinks">
        <a href="/">Каталог</a>
        <a href="/">Акции</a>
        <a href="/">Новости</a>
        <a href="/">Отзывы</a>
      </div>
      <div className="footerlinks">
        <a href="/">Оплата и доставка</a>
        <a href="/">Часто спрашивают</a>
        <a href="/">Обратная связь</a>
        <a href="/">Контакты</a>
      </div>
      <div className="footercontacts">
        <span>Мы на связи</span>
        <div className="footercontacts">
          <span>8(999) 00-00-00</span>
          <span>dogfood@mail.ru</span>
        </div>
        <div className="social">
          <a href="/">
            <VK />
          </a>
          <a href="/">
            <Instagram />
          </a>
          <a href="/">
            <TG />
          </a>
          <a href="/">
            <VB />
          </a>
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { CardList } from "../../components/CardList/CardList";
import "./index.css";
import { CardsContext } from "../../context/cardContext";
import {
  CHEAPEST,
  EXPENSIVE,
  NEWEST,
  POPULAR,
  RATE,
  SALE,
} from "../../constants/constants";
import { Select } from "antd";
import { getEndings } from "../../utils/utils";

export const CatalogPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { cards, onSort, search } = useContext(CardsContext);

  const sortedItems = [
    { id: POPULAR, title: "Популярные" },
    { id: NEWEST },
    { id: CHEAPEST },
    { id: RATE },
    { id: EXPENSIVE },
    { id: SALE },
  ];

  const optionsSize = [
    {
      value: 10,
      label: "10",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  const optionsPage = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
  ];

  const handleChangeSize = (e) => {
    setPageSize(e);
  };
  const handleChangePage = (e) => {
    setPage(e);
  };

  useEffect(() => {}, [page, pageSize]);

  return (
    <>
      {search && (
        <p className="search">
          {" "}
          По запросу <b>{search}</b> {cards.length === 1 ? "найден" : "найдено"}{" "}
          {cards.length}
          {getEndings(cards.length)}
        </p>
      )}
      <div className="sort-cards">
        {sortedItems.map((e) => (
          <span className="sort-item" key={e.id} onClick={() => onSort(e.id)}>
            {e.id}
          </span>
        ))}
      </div>
      <CardList cards={cards} />

      <div>
        <span>Размер страницы</span>
        <Select
          defaultValue={10}
          style={{ width: 120 }}
          onChange={handleChangeSize}
          options={optionsSize}
        />
      </div>
      <div>
        <span>Номер страницы</span>
        <Select
          defaultValue={1}
          style={{ width: 120 }}
          onChange={handleChangePage}
          options={optionsPage}
        />
      </div>
    </>
  );
};

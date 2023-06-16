import React, { useEffect, useState } from "react";
import { CardList } from "../../components/CardList/CardList";
import "./index.css";
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
import { useDispatch, useSelector } from "react-redux";
import { sortedProducts } from "../../storage/slices/productsSlice";

export const CatalogPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { products, search } = useSelector((s) => s.products);
  const dispatch = useDispatch();

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
          По запросу <b>{search}</b>{" "}
          {products.length === 1 ? "найден" : "найдено"} {products.length}
          {getEndings(products.length)}
        </p>
      )}
      <div className="sort-cards">
        {sortedItems.map((e) => (
          <span
            className="sort-item"
            key={e.id}
            onClick={() => dispatch(sortedProducts(e.id))}
          >
            {e.id}
          </span>
        ))}
      </div>
      <CardList cards={products} />

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

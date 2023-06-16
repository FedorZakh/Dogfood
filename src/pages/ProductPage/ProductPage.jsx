import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../../components/Product/Product";
import { api } from "../../utils/api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChangeProductLike } from "../../storage/slices/productsSlice";
import { openNotification } from "../../components/Notification/Notification";

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (id) {
      api.getProductById(id).then((data) => setProduct(data));
    }
  }, [id]);

  const onProductLike = useCallback(
    (item, wasLiked) => {
      dispatch(fetchChangeProductLike({ product: item, wasLiked: wasLiked }));
      if (wasLiked) {
        const filteredLikes = item.likes.filter((e) => e !== user?._id);
        setProduct((s) => ({ ...s, likes: filteredLikes }));
      } else {
        const addLikes = [...item.likes, user?._id];
        setProduct((s) => ({ ...s, likes: addLikes }));
      }
    },
    [dispatch, user?._id]
  );

  const sendReview = useCallback(
    async (data) => {
      try {
        const result = await api.addProductReview(product._id, data);
        setProduct(() => ({ ...result }));
        openNotification("success", "Успешно", "Вы вошли");
      } catch (error) {
        openNotification("error", "Ошибка", "Ваш отзыв не удалось отправить");
      }
    },
    [product._id]
  );

  const onDeleteReview = useCallback(
    async (id) => {
      api
        .deleteProductReview(product._id, id)
        .then((data) => setProduct(() => ({ ...data })))
        .catch(() => console.log("err"));
    },
    [product._id]
  );

  return (
    <>
      {!!Object.keys(product).length ? (
        <Product
          product={product}
          onProductLike={onProductLike}
          sendReview={sendReview}
          onDeleteReview={onDeleteReview}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

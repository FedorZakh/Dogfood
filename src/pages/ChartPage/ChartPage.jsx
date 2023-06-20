import { useEffect, useMemo } from "react";
import * as echarts from "echarts";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "../../storage/slices/productsSlice";
import { productRating } from "../../utils/utils";

export const ChartPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((s) => s.products);

  const chartData = useMemo(() => {
    const category = products.map((e) => e.name);
    const likes = products.map((e) => e.likes.length);
    const reviews = products.map((e) => e.reviews.length);
    const price = products.map((e) => e.price);
    const rating = products.map((e) => productRating(e.reviews));

    return {
      category,
      likes,
      reviews,
      price,
      rating,
    };
  }, [products]);

  useEffect(() => {
    if (products?.length) {
      dispatch(getChartData());
    }
  }, [dispatch, products]);

  useEffect(() => {
    const option = {
      title: {
        text: "top likes chart",
      },
      legend: {},
      tooltip: {},
      xAxis: {
        type: "category",
        data: chartData.category,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: chartData.likes,
          type: "bar",
          color: "lightblue",
        },
        {
          data: chartData.reviews,
          type: "bar",
          color: "lightgreen",
        },
        {
          data: chartData.rating,
          type: "line",
          color: "red",
        },
      ],
    };

    const chartDom = document.getElementById("chartId");
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
  }, [chartData]);

  return (
    <div>
      <div id="chartId" style={{ width: "700px", height: "700px" }}></div>
    </div>
  );
};

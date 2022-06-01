import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Statistic, Image } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Loading from "./Loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CryptoDetail = () => {
  const params = useParams();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_API_KEY + `&ids=${params.id}`,
    })
      .then((response) => {
        setLoading(false);
        setChartData(response.data);
      })
      .catch((error) => console.log(error));
  });

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const data = {
    labels: ["High Price / Current Price"],
    datasets: [
      {
        label: "High",
        data: chartData?.map((x) => x.high),
        backgroundColor: "rgb(76, 51, 152)",
      },
      {
        label: "Current Price",
        data: chartData?.map((x) => x.price),
        backgroundColor: "#ffd300",
      },
    ],
  };

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={48}>
        {loading ? (
          <Loading />
        ) : (
          chartData.map((item) => (
            <>
              <Col span={6}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Image
                    width={50}
                    src={item.logo_url}
                    style={{ display: "flex" }}
                  />
                  <Statistic
                    title={"Price Change (1d)"}
                    value={item["1d"].price_change_pct}
                    precision={4}
                    valueStyle={{
                      color:
                        item["1d"].price_change_pct < 0 ? "red" : "#3f8600",
                    }}
                    prefix={
                      item["1d"].price_change_pct < 0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )
                    }
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Image
                    width={50}
                    src={item.logo_url}
                    style={{ display: "flex" }}
                  />
                  <Statistic
                    title={"Price Change (7d)"}
                    value={item["7d"].price_change_pct}
                    precision={4}
                    valueStyle={{
                      color:
                        item["7d"].price_change_pct < 0 ? "red" : "#3f8600",
                    }}
                    prefix={
                      item["7d"].price_change_pct < 0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )
                    }
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Image
                    width={50}
                    src={item.logo_url}
                    style={{ display: "flex" }}
                  />
                  <Statistic
                    title={"Overall Ranking"}
                    value={item.rank}
                    precision={0}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              <Col span={6}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Image
                    width={50}
                    src={item.logo_url}
                    style={{ display: "flex" }}
                  />
                  <Statistic
                    title={"Market Cap"}
                    value={item.market_cap}
                    precision={2}
                    valueStyle={{
                      color: item.market_cap < 0 ? "red" : "#3f8600",
                    }}
                    prefix={
                      item.market_cap < 0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )
                    }
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={6} style={{ marginTop: 40 }}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Bar key={data} options={options} data={data} />
                </Card>
              </Col>
              <Col span={6} style={{ marginTop: 40 }}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Line key={data} options={options} data={data} />
                </Card>
              </Col>
              <Col span={6} style={{ marginTop: 40 }}>
                <Card style={{ borderRadius: 10 }} className="col-chart">
                  <Pie key={data} options={options} data={data} />
                </Card>
              </Col>
              <Col span={6} style={{ marginTop: 40 }}>
                <Card
                  style={{ borderRadius: 10, height: 200 }}
                  className="col-chart"
                >
                  <Image
                    width={50}
                    src={item.logo_url}
                    style={{ display: "flex" }}
                  />
                  <Statistic
                    title={"Price"}
                    value={item.price}
                    precision={2}
                    valueStyle={{
                      color: item.price < 0 ? "red" : "#3f8600",
                    }}
                    prefix={
                      item.price < 0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )
                    }
                  />
                </Card>
              </Col>
            </>
          ))
        )}
      </Row>
    </div>
  );
};

export default CryptoDetail;

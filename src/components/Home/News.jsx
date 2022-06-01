import React, { useState } from "react";
import axios from "axios";
import { Divider, Row, Col, Card, Image, Badge } from "antd";

const News = () => {
  const [news, setNews] = useState([]);

  axios({
    method: "get",
    url: ``,
  })
    .then((response) => {
      setNews(response.data.data);
    })
    .catch((error) => console.log(error));

  // {
  //   news.map(item => console.log(item.multimedia[0].url))
  // }
  return (
    <>
      <Divider orientation="left">Crypto News</Divider>
      <Row gutter={12}>
        {news.map((item) => (
          <>
            <Col
              key={item.id}
              className="gutter-row"
              span={6}
              style={{ marginTop: 10, padding: 10 }}
            >
              <Card
                title={item.title}
                extra={<a href={item.url}>More</a>}
                style={{ width: 400, height: 520, borderRadius: 10 }}
              >
                <p>{item.description}</p>
                <Badge.Ribbon text={item.published_at} color="green">
                  <Image
                    src={item.image}
                    width={150}
                    style={{ borderRadius: 10, marginTop: 10 }}
                  />
                </Badge.Ribbon>
                <span>{item.source}</span>
              </Card>
            </Col>
          </>
        ))}
      </Row>
    </>
  );
};

export default News;

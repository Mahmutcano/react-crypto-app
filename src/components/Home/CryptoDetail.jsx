import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CryptoDetail = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_API_KEY + `&ids=${params.id}`,
    })
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <>
      {loading
        ? "Loading"
        : data.map((item) => (
            <div>
              <h1>
                <img
                  src={item.logo_url}
                  style={{ width: 50, padding: 10, marginBottom: 4 }}
                />
                {item.name}
              </h1>
            </div>
          ))}
    </>
  );
};

export default CryptoDetail;

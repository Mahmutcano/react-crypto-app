import React, { useState, useRef } from "react";
import { Typography, Table, Space, Button, Input } from "antd";
import axios from "axios";
import millify from "millify";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
const { Title } = Typography;

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  axios({
    method: "get",
    url: process.env.REACT_APP_API_KEY,
  })
    .then((response) => {
      setLoading(false);
      setData(
        response.data.map((item) => ({
          Name: item.name,
          Price: `$${millify(item.price, {
            precision: 7,
            lowercase: true
          })}`,
          Logo: item.logo_url,
          Market: `$${millify(item.market_cap)}`,
          High: `$${millify(item.high)}`,
          Detail: item.id
        }))
      );
    })
    .catch((error) => console.log(error));

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Logo",
      dataIndex: "Logo",
      width: 50,
      key: "Logo",
      render: (logo) => <img src={`${logo}`} style={{ width: 30 }} />,
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      ...getColumnSearchProps("Name"),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      ...getColumnSearchProps("Price"),
      sorter: (a, b) => a.Price.length - b.Price.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Market Cap",
      dataIndex: "Market",
      key: "Market",
    },
    {
      title: "Most High (All Time)",
      dataIndex: "High",
      key: "High",
      ...getColumnSearchProps("High"),
      sorter: (a, b) => a.High.length - b.High.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: 'Detail',
      dataIndex: 'Detail',
      key: 'Detail',
      render: (link) => <a href={`/crypto/${link}`}>Detail</a>,
    }
  ];

  return (
    <>
      <Title level={1} className="home-title">
        Top Cryptocurrencies by Market Cap
      </Title>
      {loading ? (
        "Loading"
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          style={{
            background: "rgb(0, 21, 41)",
            padding: 20,
            borderRadius: 10,
            cursor: 'pointer',
          }}
        />
      )}
    </>
  );
};

export default Homepage;

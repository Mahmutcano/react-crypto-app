import {
  Homepage,
  Exchanges,
  Cryptocurrencies,
  News,
  Navbar,
  CryptoDetail
} from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route
                  exact
                  path="/crypto/:id"
                  element={<CryptoDetail />}
                />
                <Route exact path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import NftDetail from "./pages/NftDetail";
import "./App.css";
import Minting from "./components/Minting";
import Spinner from "./components/Spinner";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 양천구 루트 도메인으로 접속할 경우 다른 페이지로 접속돼서 경로 추가해 줬음*/}
          <Route path="/nft" element={<AdminHome />} />
          <Route path="/nft/detail/:tokenid" element={<NftDetail />} />
          <Route path="/detail/:tokenid" element={<NftDetail />} />
          <Route path="/minting" element={<Minting />}></Route>
          <Route path="/nft/spinner" element={<Spinner />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

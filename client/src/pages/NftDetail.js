import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import Web3 from "web3";
import Rmsoft from "../abis/Rmsoft.json";
import Minting from "../components/Minting";
import "bootstrap/dist/css/bootstrap.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NftItem from "../components/NftItem";
import NftList from "../components/NftList";
import imgdata from "../components/ImgData.json";
dotenv.config();

const NftDetail = () => {
  const [data, setData] = useState({
    token_id: "",
    hash: "",
    send_from: "",
    send_to: "",
    tx_hash: "",
    created_at: "",
    file_type: "",
    title: "",
  });

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <button type="button" className="slick-next"></button>,
    prevArrow: <button type="button" className="slick-prev"></button>,
  };

  const [loaded, setLoaded] = useState(false);
  const [nftList, setNftList] = useState([]);
  const { tokenid } = useParams();

  console.log(tokenid);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/detail/${tokenid}`)
      .then((response) => {
        const res = response.data[0];
        console.log(res);
        setData({ ...res });

        setLoaded(true);
        // console.log(res);
      })
      .catch((err) => {
        alert(`message: ${err.message}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/nfts`)
      .then((response) => {
        const res = response.data[0];

        console.log(res);
        setNftList({ ...res });
      })
      .catch((err) => {
        alert(`message: ${err.message}`);
      });
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(nftList);
  });

  const nftArray = Object.values(nftList);
  console.log(nftArray);

  //styledcomponents
  const Detail = styled.div`
    width: 100%;
    padding: 0 auto;
    @media (min-width: 1900px) and (max-width: 2500px) {
      width: 200%;
    }
  `;
  const DetailContainer = styled.section`
    position: relative;
    margin: 2rem auto;
    padding: 0 auto;
    justify-contents: center;
    border: 1px solid black;
    display: flex;
    width: 100%;
    @media (min-width: 1900px) and (max-width: 2500px) {
      position: relative;
      width: 1400px;
      margin: 2rem auto;
      display: flex;
    }
  `;
  const LeftImg = styled.div`
    float: left
    width: 40%;
    margin-top: 4.5rem;
    box-sizing: border-box;
    padding-right: 3rem;
    padding-left: 3.8rem;
    border-radius: 9px;
    border: none;
    @media (min-width: 1900px) and (max-width: 2500px) {
      padding-left:7.2rem;
    }
  `;
  const RightInfo = styled.div`
    float: right;
    width: 55%;
    margin-top: 1rem;
    padding: 2.3rem 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    border: none;
    padding-right: 6rem;
  `;

  const ItemName = styled.div`
    float: left;
  `;

  const Td = styled.td`
    padding-left: 0.3rem;
    padding-right: 1.6rem;
  `;

  const Styledslider = styled(Slider)`
    width: 1296px;
    margin: 0 7rem;
    padding: 2rem 3rem;
    padding-right: 0.2rem;
    border: 1px solid black;
    .slider-wrapper {
      display: flex;
    }
    .slick-prev:before,
    .slick-next:before {
      color: black;
    }
    .slick-dots {
      padding-right: 6rem;
    }

    @media (min-width: 1900px) and (max-width: 2500px) {
      position: relative;
      width: 1400px;
      margin: 0 19rem;
      padding: 2rem 3rem;
      padding-left: 6rem;
      .slider-wrapper {
        display: flex;
      }
      .slick-dots {
        padding-right: 12rem;
      }
    }
  `;

  // let ImgData = imgdata.data.map((detail) => {
  //   return (
  //     <div key={detail.id}>
  //       <img src={detail.url} width={"200px"} height={"200px"} />
  //     </div>
  //   );
  // });

  let ImgData = nftArray.map((detail) => {
    return (
      <div key={detail.tokenId}>
        <img
          src={`${process.env.REACT_APP_IPFS_ACCESS_API}/${detail.hash}`}
          width={"200px"}
          height={"200px"}
        />
      </div>
    );
  });

  return (
    <div>
      <Header />
      <Detail className="container w-full ">
        <DetailContainer className="py-16">
          <LeftImg className="w-1/2 relative float-left">
            {(loaded && data.file_type === "pdf") ||
            (loaded && data.file_type === "glb") ||
            (loaded && data.file_type === "mp4") ? (
              <div className="img-wrap">
                <img
                  width={"400px"}
                  height={"400px"}
                  src={`${process.env.PUBLIC_URL}/imgs/${data.file_type}.png`}
                  alt="NFT_Image_Detail"
                  className="nftimg"
                />
              </div>
            ) : (
              <div className="img-wrap">
                <img
                  width={"400px"}
                  height={"400px"}
                  src={`${process.env.REACT_APP_IPFS_ACCESS_API}/${data.hash}`}
                  alt="NFT_Image_Detail"
                  className="nftimg"
                  decoding="async"
                />
              </div>
            )}
          </LeftImg>
          <RightInfo className="lg:pl-11 lg:py-4 mt-6 lg:mt-0 float-right relative bg-white text-black">
            <div className="nfttitle">
              <h2>{data.title}</h2>
            </div>
            <br></br>
            <div>
              {/* // className="bg-white text-black"
            // style={{ borderRadius: "12px" }} */}
            </div>
            <div className="py-0 nft-desc">
              <div className="minter">
                <p>{Rmsoft.contractName}</p>
              </div>
              <hr className="desc-line"></hr>
              <div className="desc">
                <p>{`${data.send_from}`}</p>

                <a
                  href={`http://dev-rm-seoul.iptime.org:58080/ipfs/${data.hash}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    style={{ width: "20px", height: "20px", color: "#dedede" }}
                  >
                    <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                  </svg>
                </a>
              </div>
            </div>
            <br></br>
            <div className="text-start detail-info">
              {/* <p>{`Mint ID: ${data.tx_hash}`}</p>
              <p>{`From: ${data.send_from}`}</p>
              <p>{`To: ${data.send_to}`}</p>
              <p>{`Released: ${data.created_at}`}</p>  */}
              <table className="border-2 border-black">
                <tr className="border border-black">
                  <th className="border border-black px-2">Format</th>
                  <Td>{`${data.file_type}`}</Td>
                </tr>
                <tr className="border border-black">
                  <th className="border border-black px-2">Mint ID</th>
                  <Td>{`${data.tx_hash}`}</Td>
                </tr>
                <tr className="border border-black">
                  <th className="border border-black px-2">From</th>
                  <Td>{`${data.hash}`}</Td>
                </tr>
                <tr className="border border-black">
                  <th className="border border-black px-2">To</th>
                  <Td>{`${data.send_to}`}</Td>
                </tr>
                <tr className="border border-black">
                  <th className="border border-black px-2">Released</th>
                  <Td>{`${data.created_at}`}</Td>
                </tr>
              </table>
            </div>
            <div className="linkdiv">
              <p>
                <a
                  href={`http://dev-rm-seoul.iptime.org:53002/detail/${data.token_id}`}
                >
                  {" "}
                  http://dev-rm-seoul.iptime.org:53002/detail/
                  {`${data.token_id}`}
                </a>
              </p>
            </div>
          </RightInfo>
        </DetailContainer>
      </Detail>
      {/* 슬라이더 */}
      <div>
        <div className="slider-wrapper text-black flex">
          <Styledslider {...settings}>{ImgData}</Styledslider>
          {/* <NftList nftList={nftList} /> */}
        </div>
      </div>
    </div>
  );
};

export default NftDetail;

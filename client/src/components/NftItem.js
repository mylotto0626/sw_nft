import dotenv from "dotenv";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import styled from "styled-components";
import NftDetail from "../pages/NftDetail";
import Minting from "./Minting";
dotenv.config();

const NftItem = ({ tokenId, hash, fileType, created_at, from, title,account }) => {
  const navigate = useNavigate();

  const detailHandler = () => {
    navigate(`${"/detail/" + tokenId}`);
  };

  return (
    <div className="nftitem">
      <Card
        className="carditem"
        onClick={detailHandler}
        style={{
          width: "300px",
          height: "300px",
          margin: "20px 20px",
          color: "black",
          overflow: "hidden",
          border: "2px solid #ccc",
        }}
      >
        {fileType === "pdf" || fileType === "glb" || fileType === "mp4" ? (
          <div>
            <CardImg
              width={"200px"}
              height={"200px"}
              className="carditem"
              src={require(`../imgs/${fileType}.png`).default}
              alt="NFT_Image_Detail"
            />
            <CardBody>
              <CardTitle className="cardtitle">제목 : {title}</CardTitle>
              <CardSubtitle>날짜 : {created_at}</CardSubtitle>
            </CardBody>
          </div>
        ) : (
          <div>
            <CardImg
              width={"200px"}
              height={"200px"}
              className="carditem"
              src={`${process.env.REACT_APP_IPFS_ACCESS_API}/${hash}`}
              alt="NFT_Image_Detail"
            />
            <CardBody className="cardbody">
              <CardTitle className="cardtitle">제목 : {title}</CardTitle>
              <CardSubtitle>날짜 : {created_at}</CardSubtitle>
            </CardBody>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NftItem;

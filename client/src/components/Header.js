import React from "react";
import styled from "styled-components";

const Mintbutton = styled.button`
  border-radius: 7px;
  color: white;
  background-color: #000;
  width: 120px;
  height: 40px;
  border: 1px solid #ffffff;
  margin-right: 3rem;
`;
const NavHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #000;
  height: 4.5rem;
  width: 100%;
  align-items: center;
`;
const Img = styled.img`
  width: 90px;
  height: 100%;
  margin-left: 3rem;
`;

const Logotext = styled.span`
  padding-left:0.7rem;
  font-size: 33px;
  font-weight: bold;
  font-family:font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
`;

const Minttext = styled.span`
  font-size: 29px;
  font-family:font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
`;

function Header(props) {
  return (
    <NavHeader className="">
      <h1 className="justify-start flex">
        <a href="/nft">
          <Img src={require(`../imgs/rmsoftlogo.webp`).default} alt="."></Img>
        </a>
        <Logotext className=" font-semibold text-base">NFT</Logotext>
      </h1>
      <div className="ml-auto">
        <Mintbutton>
          <a
            href="/minting"
            className="text-white no-underline"
            style={{ textDecoration: "none" }}
          >
            <Minttext>Mint</Minttext>
          </a>
        </Mintbutton>
      </div>
    </NavHeader>
  );
}

export default Header;

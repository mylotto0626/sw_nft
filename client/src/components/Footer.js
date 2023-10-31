import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  display: flex;
  background-color: #dcdcdc;
  width: 100%;
  height: 100px;
  justify-content: center;
  padding-top: 30px;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Ftext = styled.p`
  color: black;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
`;

function Footer(props) {
  return (
    <FooterDiv>
      <div className="flex ">
        <div className="flex column">
          <Ftext>
            <span style={{ paddingRight: "18px" }}>
              {" "}
              대표전화 : 02-859-0884
            </span>
            <span style={{ paddingRight: "18px" }}> 대표이사 : 최광훈 </span>
            <span> 사업자 등록번호 : 108-81-99034</span>
          </Ftext>
          <Ftext>
            06651) 서울특별시 서초구 서초중앙로 63-6 RM서초빌딩 8층 /
            Seochojungang-ro, Seocho-gu, Republic of Korea
          </Ftext>
        </div>
      </div>
    </FooterDiv>
  );
}

export default Footer;

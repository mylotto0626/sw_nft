import React, { useState, useEffect } from "react";
import dotenv, { parse } from "dotenv";
import Web3 from "web3";
import Rmsoft from "../abis/Rmsoft.json";
import NftDetail from "../pages/NftDetail";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import Spinner from "./Spinner";
import NftList from "./NftList";

const cors = require("cors");

cors();

dotenv.config();

const MintDiv = styled.div`
  // width: 650px;
  width: 50%;
  border: 1px solid #ccc;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 28px;
  float: left;
  margin-left: 3rem;
  border-radius: 2%;
  margin-top: 3rem;
  @media (min-width: 1900px) and (max-width: 2500px) {
    width: 40%;
    margin-left: 9rem;
  }
`;

const FileText = styled.div`
  margin-top: -5rem;
  line-height: 0.5rem;
`;

const SelectDiv = styled.div`
  color: black;
  font-size: 13px;
  line-height: 0.6;
`;

const TextDiv = styled.div`
  box-sizing: border-box;
  float: right;
  margin: 0 auto;
  // border: 1px solid #ccc;
  padding: 28px;
  width: 40%;
  margin-right: 3rem;
  border-radius: 2%;
  margin-top: 1.5rem;
  @media (min-width: 1900px) and (max-width: 2500px) {
    width: 40%;
    margin-right: 9rem;
  }
`;

const Imgdiv = styled.div`
  text-align: center;
  cursor: pointer;
  // border: 3px dashed rgb(204, 204, 204);
  border: 1px solid #ccc;
  border-radius: 5%;
  height: 500px;
  width: 700px;
  margin: 0 auto;
  transition: background-color 0.2s ease-in-out 0s;
`;

const Delbtn = styled.button`
  margin-top: 2rem;
  background-color: #6698cb;
  color: white;
  border: none;
  border-radius: 9%;
  padding: 0.4rem 1rem;
`;

const Opacitydiv = styled.div`
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.6);
  inset: 0px;
`;

const Mintbtn = styled.button`
  border: none;
  background-color: #6698cb;
  color: white;
  width: 60px;
  height: 35px;
  border-radius: 7px;
  margin-top:12px;
  margin-right:0.5rem;
}
`;

const Listbtn = styled.button`
  border: none;
  background-color: #6698cb;
  color: white;
  width: 60px;
  height: 35px;
  border-radius: 7px;
  margin-left: 0.8rem;
`;

// const Textarea = tw.textarea`
// block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
// `;

function Minting(props) {
  const [account, setAccount] = useState("");
  const [nftList, setNftList] = useState([]);
  // const [nftDetail, setNftdetail] = useState([]);
  const [buffer, setBuffer] = useState(null);
  const [fileType, setFileType] = useState(false);
  const [yangcheonContract, setYangcheoncontract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [nfttext, setNfttext] = useState("");
  const [data, setData] = useState("");
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [linknum, setLinknum] = useState(1);
  const [savednum, setSavednum] = useState(1);
  const [nfttitle, setNfttitle] = useState("");
  const [titledata, setTitledata] = useState("");

  //드래그7
  const [dragging, setDragging] = useState(false);

  const ipfsClient = require("ipfs-http-client");

  const ipfs = ipfsClient({
    host: process.env.REACT_APP_IPFS_HOST,
    port: process.env.REACT_APP_IPFS_UPLOAD_PORT,
    protocol: "http", //환경변수 넣으니까 url에 'host'로 읽어들여 에러남 ->'http'://localhost:5001
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("메타마스크 사용해 주세요");
    }
  };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    // console.log(accounts[0]);

    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    const yangcheonNetworkData = Rmsoft.networks[networkId];
    if (yangcheonNetworkData) {
      //양천 contract
      const yangcheonAbi = Rmsoft.abi;
      const yangcheonContractAddress = yangcheonNetworkData.address;
      const yangcheonContract = new web3.eth.Contract(
        yangcheonAbi,
        yangcheonContractAddress
      );

      setYangcheoncontract(yangcheonContract);
      // console.log(yangcheonContract);

      // const nftArray = await yangcheonContract.methods
      //   .getMyNft(this.state.account)
      //   .call();
      // // Web3.eth.getBlock("latest").then(console.log);
      // console.log(account.slice(2));
      // this.setState({ nftList: [...this.state.nftList, ...nftArray] });
    } else {
      window.alert("감지된 네트워크에 스마트 컨트랙트가 배포되지 않았다");
    }
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  function infoHandler(event) {
    const value = event.target.value;
    setNfttext(value);
  }

  useEffect(() => {
    setData(nfttext);
  }, [nfttext]);

  function titleHandler(event) {
    const value = event.target.value;
    setNfttitle(value);
  }

  useEffect(() => {
    setTitledata(nfttitle);
  }, [nfttitle]);

  const captureFile = (event) => {
    event.preventDefault();
    // console.log("file captured...");
    //이벤트에서 파일 가져오기
    const file = event.target.files[0];
    // console.log(file);
    // console.log(file.name);

    const filename = file.name.trim();
    setFilename(filename);

    const fileType = filename.slice(-3);
    setFileType(fileType);

    const reader = new window.FileReader();
    //파일 -> 버퍼로 변환
    reader.readAsArrayBuffer(file);
    //FileReader.onloadend: 읽기 동작이 끝났을 때마다 발생
    reader.onloadend = () => {
      // Buffer(): 버퍼로 변환
      console.log("buffer ", Buffer(reader.result));
      //버퍼로 변환된 형식을 실제로 사용해야 함
      //기본적으로 파일을 처리했으며 ipfs에 저장해야 한다 따라서 파일을 업로드할 때마다 위 처럼 2단계 프로세스로 처리
      setBuffer(Buffer(reader.result));
      setFilename(URL.createObjectURL(file));

      console.log("filename ", filename);

      alert("파일 업로드 완료. 민팅 하세요.");
    };
  };

  const dragFile = (event) => {
    event.preventDefault();
    // console.log("file captured...");
    //이벤트에서 파일 가져오기
    const file = event.dataTransfer.files[0];
    // console.log(file);
    // console.log(file.name);

    const filename = file.name.trim();
    setFilename(filename);

    const fileType = filename.slice(-3);
    setFileType(fileType);

    const reader = new window.FileReader();
    //파일 -> 버퍼로 변환
    reader.readAsArrayBuffer(file);
    //FileReader.onloadend: 읽기 동작이 끝났을 때마다 발생
    reader.onloadend = () => {
      // Buffer(): 버퍼로 변환
      console.log("buffer ", Buffer(reader.result));
      //버퍼로 변환된 형식을 실제로 사용해야 함
      //기본적으로 파일을 처리했으며 ipfs에 저장해야 한다 따라서 파일을 업로드할 때마다 위 처럼 2단계 프로세스로 처리
      setBuffer(Buffer(reader.result));
      setFilename(URL.createObjectURL(file));

      alert("파일 업로드 완료. 민팅 하세요.");
    };
  };

  const handleDelete = (e) => {
    if (filename !== "") {
      URL.revokeObjectURL(filename);
      setFilename("");
    }
  };
  useEffect(() => {
    setFilename(filename);
  }, [filename]);

  let imgHashValue;
  const minting = async (event) => {
    event.preventDefault();
    setLoading((loading) => !loading);
    console.log("로딩 상태", loading);

    const { path } = await ipfs.add(buffer);
    const mintResult = await yangcheonContract.methods.mint(path).send({
      from: account,
      maxPriorityFeePerGas: "0x0000000000000000000000000000000000000000",
    });

    const txHash = mintResult.transactionHash;
    const tokenId = mintResult.events.Transfer.returnValues.tokenId;
    const from = mintResult.from;
    const to = mintResult.to;

    axios
      .post(
        `${process.env.REACT_APP_SERVER_API}`,
        {
          account: account.slice(2),
          tokenId: tokenId,
          hash: path,
          from: data,
          to: to,
          txHash: txHash,
          fileType: fileType,
          title: titledata,
        },
        {
          headers: {
            Accept: "*/*",
          },
        }
      )

      .then((res) => {
        alert("민팅 완료");

        // console.log(res);
        // console.log(this.state.nftList.length);
        window.location.replace("/nft");
      })
      .catch((err) => {
        // console.log(err);
        alert(`message: ${err.message}`);
      });
    setLinknum(linknum + 1);

    // setImagehash(...imageHash);
  };

  // console.log("다음 숫자", linknum[0]);

  useEffect(() => {
    const savedValue = localStorage.getItem("linknum");

    if (savedValue) {
      setLinknum(parseInt(savedValue));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("linknum", linknum);
  }, [linknum]);

  return (
    <div className=" box-border flex flex-col">
      {!loading ? (
        <section
          className="flex flex-col items-center mx-auto"
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          <MintDiv>
            <header className="flex-col flex box-border text-black">
              <h1 className="title">NFT 생성</h1>
            </header>
            <p className="caution">
              아이템이 발행된 후에는 해당 정보를 변경할 수 없습니다
            </p>
            <form onSubmit={minting}>
              <input
                type="file"
                accept="image/gif image/png image/jpg video/mp4 .pdf .glb"
                onDragOver={(e) => e.preventDefault()}
                onDrop={dragFile}
                onChange={captureFile}
                // style={{ marginBottom: "1rem" }}
                id="input-file"
                style={{ display: "none" }}
              ></input>
              {filename !== "" ? (
                <Imgdiv>
                  <div className="imgPreview">
                    <img
                      alt="."
                      src={`${filename}`}
                      className="fileimg"
                      width={"300px"}
                      height={"300px"}
                      style={{ textAlign: "center" }}
                    ></img>
                  </div>
                  <Delbtn onClick={handleDelete}>제거</Delbtn>
                </Imgdiv>
              ) : (
                <Imgdiv
                  id="filediv"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={dragFile}
                >
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    size="sm"
                    style={{ color: "#cccccc" }}
                    className="img-icon"
                  ></FontAwesomeIcon>
                  {/* <div className="opacity color-div"></div> */}
                  <FileText>
                    <p className="text-black fileDrag">
                      미디어 파일 끌어다 놓기
                    </p>
                    <label htmlFor="input-file" className="file-button">
                      파일 선택
                    </label>
                    <SelectDiv>
                      <p>최대 크기 50MB</p>
                      <p>JPG, PNG, GIF, SVG, MP4</p>
                    </SelectDiv>
                  </FileText>
                </Imgdiv>
              )}
            </form>
          </MintDiv>
          <TextDiv>
            <div className="">
              <form onSubmit={minting}>
                <div class="mb-3 border border-black px-4 pb-4">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label text-black mt-3 text"
                  >
                    제목 *
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={nfttitle}
                    onChange={titleHandler}
                  />
                </div>

                <div class="mb-3 border border-black px-4 pb-4">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label text-black mt-3 text"
                  >
                    설명
                  </label>{" "}
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Example textarea
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={nfttext}
                    onChange={infoHandler}
                    placeholder="설명을 입력하세요"
                  ></textarea>
                </div>
                <div class="mb-3 border border-black px-4 pb-4">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label text-black mt-3 text"
                  >
                    외부 링크
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={`http://dev-rm-seoul.iptime.org:53001/detail/${localStorage.getItem(
                      "linknum"
                    )}`}
                  />
                </div>
                <div class="mb-3 border border-black px-4 pb-4">
                  <label
                    for="exampleFormControlInput1"
                    className="form-label text-black mt-3 text"
                  >
                    제작자 *
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={Rmsoft.contractName}
                  />
                </div>
                <div className="submit">
                  <Mintbtn className=" bg-cyan-700" type="submit">
                    민팅
                  </Mintbtn>
                  <Listbtn>
                    <a
                      href="/nft"
                      className=" no-underline text-white"
                      style={{ textDecoration: "none" }}
                    >
                      목록
                    </a>
                  </Listbtn>
                </div>
              </form>
            </div>
          </TextDiv>
        </section>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Minting;

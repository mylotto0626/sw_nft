import React, { Component } from "react";
import dotenv from "dotenv";
import Web3 from "web3";
import Yangcheon from "../abis/Yangcheon.json";
import "bootstrap/dist/css/bootstrap.css";
import NftList from "./NftList";
import axios from "axios";
import Spinner from "./Spinner";
import Header from "./Header";
import Footer from "./Footer";

dotenv.config();

// const ipfsClient = require("ipfs-http-client");
// //연결

// const ipfs = ipfsClient({
//   host: process.env.REACT_APP_IPFS_HOST,
//   port: process.env.REACT_APP_IPFS_UPLOAD_PORT,
//   protocol: "http", //환경변수 넣으니까 url에 'host'로 읽어들여 에러남 ->'http'://localhost:5001
// });

class AdminHome extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      yangcheonContract: null,
      nftList: [],
      loading: false,
      fileType: "",
    };
  }
  //프론트(애플리케이션)을 블록체인에 연결하는 함수
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("메타마스크 사용해 주세요");
    }
  }

  //account, network, smart contract(abi, contract address 필요), imghash 가져오기
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();

    // console.log(accounts[0]);

    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();

    const yangcheonNetworkData = Yangcheon.networks[networkId];
    if (yangcheonNetworkData) {
      //양천 contract
      const yangcheonAbi = Yangcheon.abi;
      const yangcheonContractAddress = yangcheonNetworkData.address;
      const yangcheonContract = new web3.eth.Contract(
        yangcheonAbi,
        yangcheonContractAddress
      );

      this.setState({ yangcheonContract: yangcheonContract });
      // console.log(yangcheonContract);

      // const nftArray = await yangcheonContract.methods
      //   .getMyNft(this.state.account)
      //   .call();
      // Web3.eth.getBlock("latest").then(console.log);
      console.log(this.state.account.slice(2));
      axios
        .get(`${process.env.REACT_APP_SERVER_API}/nfts`)
        .then((response) => {
          const res = response.data[0];

          // console.log(res);
          this.setState({ nftList: res });
        })
        .catch((err) => {
          alert(`message: ${err.message}`);
        });

      // this.setState({ nftList: [...this.state.nftList, ...nftArray] });
    } else {
      window.alert("감지된 네트워크에 스마트 컨트랙트가 배포되지 않았다");
    }
  }

  render() {
    return (
      <div className="adminhome">
        <Header />
        <h2 className="itemnum">{this.state.nftList.length}개의 아이템</h2>

        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="nftlist-container">
            <NftList nftList={this.state.nftList} />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default AdminHome;

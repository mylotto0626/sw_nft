// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Rmsoft is ERC721Enumerable{
    
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("RmSoft","RM"){}

    //tokenId => ipfs
    mapping(uint => string) public tokenURIs;

    function tokenURI(uint _tokenId) override public view returns (string memory){
        return tokenURIs[_tokenId];
    }


    function mint(string memory _tokenURI) public returns (uint256){
        //tokenId 1증가
        _tokenIds.increment();
        
        //토큰id
        uint256 tokenId = _tokenIds.current();
        //id와 _tokenURI(=ipfs) 매핑   -> 얘가 먼저? 민팅이 먼저?(실패할수도이시난)
        tokenURIs[tokenId] = _tokenURI;

        //민팅
        _mint(msg.sender, tokenId);
        
        return tokenId;
    }

    struct NftTokenData {
        uint256 nftTokenId;
        string nftTokenURI;
    }


    //내 NFT들 조회
    function getMyNft(address _nftTokenOwner) view public returns(NftTokenData[] memory){
         uint256 totalBalance = balanceOf(_nftTokenOwner);
        //  NftTokenData struct를 배열로 사용
         NftTokenData[] memory nftTokenData = new NftTokenData[](totalBalance);
        
         for(uint256 i = 0; i < totalBalance; i++){
             uint256 nftTokenId = tokenOfOwnerByIndex(_nftTokenOwner, i); //소유자가 소유한 토큰 ID를 반환
             string memory nftTokenURI = tokenURI(nftTokenId);
             nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
         }
         return nftTokenData;
    }



}
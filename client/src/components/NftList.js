import NftItem from "./NftItem";
import "bootstrap/dist/css/bootstrap.css";
import { CardGroup } from "reactstrap";

const NftList = ({ nftList }) => {
  console.log(nftList);
  return (
    <div className="nftlist">
      <CardGroup className="" style={{ marginBottom: "9rem" }}>
        {nftList.map((nft) => (
          <NftItem
            key={nft.token_id}
            tokenId={nft.token_id}
            hash={nft.hash}
            fileType={nft.file_type}
            created_at={nft.created_at}
            from={nft.send_from}
            title={nft.title}
            account={nft.account}
          />
        ))}
      </CardGroup>
    </div>
  );
};

//안넘어왔을경우
NftList.defaultProps = {
  nftList: [],
};

export default NftList;

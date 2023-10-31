const express = require("express");
const connection = require("./config/database"); //connection을 이 파일에서 불러오겠다
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");

app.use(cors());
//라우터

app.get("/detail/:tokenid", async (req, res) => {
  const { tokenid } = req.params;
  connection.query(
    `SELECT token_id, hash, send_from, send_to ,tx_hash, file_type, title, date_format(created_at,'%Y년 %m월 %d일') AS created_at FROM nfts WHERE token_id = ${tokenid}`,
    (error, rows) => {
      if (error) throw error;
      res.send(JSON.stringify(rows));
    }
  );
});

app.get("/nfts", async (req, res) => {

  connection.query(
    `SELECT token_id, hash, file_type, send_from, title, date_format(created_at,'%Y년 %m월 %d일') AS created_at FROM nfts`,
    (error, rows) => {
      if (error) throw error;
      res.send([rows]);
    }
  );
});

app.post("/", (req, res) => {
  const {
    account,
    tokenId,
    hash,
    from,
    to,
    txHash,
    fileType,
    title,
  } = req.body;
  connection.query(
    `INSERT INTO nfts(token_id,account, hash, send_from, send_to ,tx_hash,file_type,title) VALUES(${tokenId}, '${account}','${hash}','${from}','${to}','${txHash}','${fileType}','${title}')`,
    (error, rows) => {
      if (error) throw error;

      res.sendStatus(200);
    }
  );
});

app.post("/minting", (req, res) => {
  const { account, tokenId, hash, from, to, txHash, fileType } = req.body;
  connection.query(
    `INSERT INTO nfts(token_id,account, hash, send_from, send_to ,tx_hash,file_type,title) VALUES(${tokenId}, '${account}','${hash}','${from}','${to}','${txHash}','${fileType}','${title}')`,
    (error, rows) => {
      if (error) throw error;

      res.sendStatus(200);
    }
  );
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});

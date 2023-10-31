const mysql = require("mysql");

require("dotenv").config({ path: ".env" });

//db 커넥션 생성
const connection = mysql.createConnection({
  //mysql 접속 설정
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});
//db 접속
connection.connect();

module.exports = connection;

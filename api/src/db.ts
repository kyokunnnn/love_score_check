import mysql from "mysql2/promise"; // mysql2 の Promise ベースの API を使用
import dotenv from "dotenv";

dotenv.config(); // .env ファイルの環境変数を読み込む
console.log("DB_HOST:", process.env.DB_HOST); 

// MySQL データベース接続設定
const pool = mysql.createPool({
  host: process.env.DB_HOST, // .env から取得
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
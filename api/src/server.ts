import express from "express";
import cors from "cors";
import routes from "./routes/index"; // すべてのルートを一括読み込み

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 📌 ルーティングを適用
app.use("/api", routes);

// 📌 サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
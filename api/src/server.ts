import 'dotenv/config';  // 一番最初に.envを展開
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import routes from "./routes/index";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ALB/Cloudflare 等の後ろに置くとき、正しいクライアントIPを使えるようにする
app.set("trust proxy", 1);

// セキュリティ系ヘッダを自動付与。開発中はCSPをオフ、本番でオンにする
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
  })
);

// 許可するフロントのオリジン（URL）をホワイトリストで制御。
// const allowlist = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
//   .split(",")
//   .map((s) => s.trim());
  app.use(
    cors({
      origin: true, // 何でも許可
      credentials: true,
    })
  );
  

// クエリ/ボディの重複キー汚染を防止（?role=user&role=admin対策）
app.use(hpp());

// 巨大ボディでのDoSを防ぐ（必要に応じて調整）。
app.use(express.json({ limit: "64kb" }));

// IPあたりのリクエスト回数を制限（ブルートフォース/連打対策）
app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: true, legacyHeaders: false }));

// ルーティングを適用
app.use("/api", routes);

// 404 ハンドラより前に置く
app.get("/healthz", (_req, res) => {
  res.status(200).type("text/plain").send("ok");
});

// 未定義ルートは統一して{ error: "Not Found" }で返す。
const notFound: express.RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Not Found" });
};
app.use(notFound);

// エラーハンドラ（4引数＆型を明示）
const errorHandler: express.ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof (err as any)?.status === "number" ? (err as any).status : 500;
  const msg =
    process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : (err as any)?.message ?? "Error";
  res.status(status).json({ error: msg });
};
app.use(errorHandler);

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

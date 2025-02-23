
// データベースの作成
CREATE DATABASE love_score_checker;

// データベースを使う
USE love_score_checker;

// テーブル作成
// questionsテーブル
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT, -- クイズID
  name VARCHAR(255) NOT NULL,
  category INT NOT NULL, --カテゴリーID(外部キー)
  status INT NOT NULL,  -- ステータス（例: 1=公開, 0=非公開）
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用（NULLなら削除されていない）
  FOREIGN KEY (category) REFERENCES category(id) ON DELETE CASCADE
);

// answersテーブル
CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT, -- アンサーID
  name VARCHAR(255) NOT NULL,
  category INT NOT NULL,  --カテゴリーID(外部キー)
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用（NULLなら削除されていない）
  FOREIGN KEY (category) REFERENCES category(id) ON DELETE CASCADE
);

// categoriesテーブル
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT, -- カテゴリーID
  name VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL  -- ソフトデリート用（NULLなら削除されていない）
);

// quiz_choicesテーブル
CREATE TABLE quiz_choices (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 選択肢ID
  quiz_id INT NOT NULL, -- クイズID(外部キー)
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用（NULLなら削除されていない）
  FOREIGN KEY (quiz_id) REFERENCES questions(id) ON DELETE CASCADE
);

// quiz_resultsテーブル
CREATE TABLE quiz_results (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 解答履歴ID
  quiz_id INT NOT NULL, -- クイズID(外部キー)
  selected_choice_id INT NOT NULL,  -- 選択肢ID(外部キー)
  is_correct BOOLEAN NOT NULL,  -- 正解か否か
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 解答日時
  session_id VARCHAR(50) NOT NULL, --セッションID
  FOREIGN KEY (quiz_id) REFERENCES questions(id) ON DELETE CASCADE
  FOREIGN KEY (selected_choice_id) REFERENCES quiz_choices(id) ON DELETE CASCADE
);

// site_feedbacksテーブル
CREATE TABLE site_feedbacks (
  id INT PRIMARY KEY AUTO_INCREMENT, -- フィードバックID
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),,  -- 評価(1~5)
  user_id INT NOT NULL,  -- まだ未定(外部キー)
  comment_text TEXT, -- 本文
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- フィードバックした日時
);

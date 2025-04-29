-- テーブル作成
-- categoriesテーブル
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT, -- カテゴリーID
  name VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL  -- ソフトデリート用（NULLなら削除されていない）
);

-- questionsテーブル
CREATE TABLE questions (
  id INT PRIMARY KEY AUTO_INCREMENT, -- クイズID
  text VARCHAR(255) NOT NULL,
  category INT NOT NULL, -- カテゴリーID(外部キー)
  status INT NOT NULL,  -- ステータス（例: 1=公開, 0=非公開）
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用（NULLなら削除されていない）
  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE
);

-- answersテーブル
-- 答えの確認を出す画面で表示 ※選択肢ではない
CREATE TABLE answers (
  id INT PRIMARY KEY AUTO_INCREMENT, -- アンサーID
  quiz_id INT NOT NULL, -- クイズID(外部キー)
  text VARCHAR(255) NOT NULL,
  category INT NOT NULL, -- カテゴリーID(外部キー)
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用（NULLなら削除されていない）
  FOREIGN KEY (quiz_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (category) REFERENCES categories(id) ON DELETE CASCADE
);

-- quiz_choicesテーブル
-- 選択肢
CREATE TABLE quiz_choices (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 選択肢ID
  quiz_id INT NOT NULL, -- クイズID(外部キー)
  choice_text VARCHAR(255) NOT NULL, -- 選択肢の文章
  is_correct BOOLEAN NOT NULL,  -- 正解か否か(正解1,不正解0)
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 作成日時
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新日時
  deletedAt TIMESTAMP NULL,  -- ソフトデリート用
  FOREIGN KEY (quiz_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- quiz_resultsテーブル
CREATE TABLE quiz_results (
  id INT PRIMARY KEY AUTO_INCREMENT, -- 解答履歴ID
  quiz_id INT NOT NULL, -- クイズID(外部キー)
  selected_choice_id INT NOT NULL,  -- 選択肢ID(外部キー)
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 解答日時
  session_id VARCHAR(50) NULL, -- セッションID(開発段階なのでNULL良い)
  FOREIGN KEY (quiz_id) REFERENCES questions(id) ON DELETE CASCADE,
  FOREIGN KEY (selected_choice_id) REFERENCES quiz_choices(id) ON DELETE CASCADE
);

-- site_feedbacksテーブル
CREATE TABLE site_feedbacks (
  id INT PRIMARY KEY AUTO_INCREMENT, -- フィードバックID
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),  -- 評価(1~5)
  user_name VARCHAR(50), -- ユーザー名
  user_id INT NOT NULL,  -- まだ未定(外部キー)
  comment_text TEXT, -- 本文
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- フィードバックした日時
);


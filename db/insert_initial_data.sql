// イニシャルデータの投入SQL
// categoriesテーブル

INSERT INTO categories (name) VALUES
('street'),
('club'),
('matching'),
('other');

SELECT * FROM categories;

// questionsテーブル
INSERT INTO questions (text, category, status) VALUES
('初めましての待ち合わせには早めに到着する?', 4, 0),
('2人で声をかける時は左右から挟み込むように話しかける', 1, 0),
('自分の鍛えられた身体の写真をプロフィールに使うべき？', 3, 0),
('クラブでは踊りまくる方が良い？', 4, 0);

SELECT * FROM questions;

// answersテーブル
// 正解を表示するテーブル
INSERT INTO answers (quiz_id, category, text) VALUES
(1, 4, '早く到着するとその日をとても楽しみにしていた感が出て非モテ感が出てしまう為'),
(2, 1, '挟み込まれた女性は左右に知らない男性がいて怖いと感じることが少なからずある為');

SELECT * FROM answers;

// quiz_choicesテーブル
// 選択肢を管理するテーブル
INSERT INTO quiz_choices (quiz_id, choice_text) VALUES
(1, '5分前に到着する'),
(1, '30分前に到着する'),
(1, '5分遅れで到着する'),
(1, '30分遅れで到着する');

SELECT * FROM quiz_choices;

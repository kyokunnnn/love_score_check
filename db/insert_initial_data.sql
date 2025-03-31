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
('2人(コンビ)で声をかける時にやってはいけないことは？', 1, 0),
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
(1, '30分遅れで到着する'),
(2, '左右から挟み込むように声をかける'),
(2, '真正面から2人で声をかける'),
(2, '左右どちらか片側から2人で声をかける'),
(2, '最初に片方が声を賭けに行ってからその後もう一人が声をかけに行く');

SELECT * FROM quiz_choices;

// quiz_resultsテーブル
// クイズ結果を管理するテーブル
INSERT INTO quiz_results (quiz_id, selected_choice_id, is_correct) VALUES
(1, 3, true),
(2, 2, false);

SELECT * FROM quiz_results;
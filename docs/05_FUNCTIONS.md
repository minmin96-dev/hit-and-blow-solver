# 関数一覧

## 目的

本ドキュメントでは、各 JavaScript ファイルに定義されている主要な関数の役割をまとめる。

詳細なアルゴリズムではなく、どの関数が何を担当しているかを把握することを目的とする。

---

# solver.js

|関数|役割|
|---|---|
|generateCandidates()|ゲームルールに応じて候補一覧を生成する|
|generateCandidatesNoDuplicate()|重複なしルールの候補を生成する|
|generateCandidatesAllowDuplicate()|重複ありルールの候補を生成する（現在は未実装）|
|judgeHitBlow()|Hit・Blowを判定する|
|filterCandidates()|Hit・Blow結果から候補を絞り込む|
|validateResult()|入力されたHit・Blowがルール上あり得る値か判定する|

---

# script.js

|関数|役割|
|---|---|
|rebuildCandidates()|履歴から候補一覧を再計算する|
|setupResultInput()|Hit・Blow入力欄のイベントを設定する|

### 主なイベント

- 確定ボタン
- 候補表示ボタン
- ヒートマップ表示ボタン

---

# render.js

|関数|役割|
|---|---|
|render()|画面全体を再描画する|
|renderGuessArea()|予想入力エリアを描画する|
|renderColorPalette()|カラーパレットを描画する|
|renderCandidateCount()|残り候補数を表示する|
|createColorCircle()|色を丸で表示する共通部品を生成する|

---

# history.js

|関数|役割|
|---|---|
|renderHistory()|履歴一覧を描画する|
|loadHistory()|履歴内容を入力欄へ読み込む|
|renderConfirmButton()|「確定」「修正反映」の表示を切り替える|

---

# candidate.js

|関数|役割|
|---|---|
|renderCandidateList()|候補一覧を描画する|

---

# heatmap.js

|関数|役割|
|---|---|
|calculateHeatmap()|各桁・各色の出現率を計算する|
|renderHeatmap()|ヒートマップを描画する|

---

# test.js

## テスト内容

- Hit判定
- Blow判定
- 重複色判定
- 候補絞り込み
- 候補生成

ブラウザのコンソールから実行し、期待値との一致を確認する。

---

# 補足

各描画関数は gameState を参照して画面を更新する。

状態変更後は render() を呼び出すことで画面全体の整合性を保つ設計としている。
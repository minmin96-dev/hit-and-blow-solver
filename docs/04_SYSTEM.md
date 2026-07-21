# システム設計書

## システム構成

本アプリケーションは HTML・CSS・JavaScript のみで構成されたフロントエンドアプリケーションである。

サーバー通信は行わず、すべての処理はブラウザ上で完結する。

---

# ディレクトリ構成

```
hit-and-blow-solver
├── index.html
├── README.md
├── css
│   └── style.css
├── js
│   ├── solver.js
│   ├── script.js
│   ├── render.js
│   ├── history.js
│   ├── candidate.js
│   ├── heatmap.js
│   └── test.js
└── docs
```

---

# 各ファイルの役割

|ファイル|役割|
|---|---|
|index.html|画面レイアウト|
|style.css|画面デザイン・レスポンシブ対応|
|solver.js|Hit&Blow判定・候補生成・候補絞り込み|
|script.js|ゲーム全体の制御・イベント処理|
|render.js|結果入力エリア・カラーパレット描画|
|history.js|履歴表示・履歴修正|
|candidate.js|候補一覧表示|
|heatmap.js|ヒートマップ表示|
|test.js|ロジック動作確認|

---

# モジュール構成

```
script.js
│
├── render.js
├── history.js
├── candidate.js
├── heatmap.js
└── solver.js
```

script.js が中心となり、各画面描画モジュールを呼び出す構成となっている。

---

# gameState

ゲーム全体の状態は gameState オブジェクトで一元管理する。

|プロパティ|内容|
|---|---|
|candidates|現在の候補一覧|
|history|入力履歴|
|guess|現在入力中の予想|
|editingIndex|入力中スロット|
|editingHistoryIndex|修正対象履歴|
|hit|現在入力中Hit|
|blow|現在入力中Blow|
|showCandidates|候補一覧表示状態|
|showHeatmap|ヒートマップ表示状態|

---

# データ管理方針

- 状態は gameState に集約する
- 描画処理は gameState を参照する
- 画面を書き換える場合は render() を呼び出す
- DOM操作は必要最小限にする

---

# 処理概要

## 初期表示

```
render()
    ↓
各描画関数実行
```

---

## 結果入力

```
色入力
    ↓
Hit入力
    ↓
Blow入力
    ↓
確定
    ↓
history追加
    ↓
候補再計算
    ↓
render()
```

---

## 履歴修正

```
修正ボタン
    ↓
履歴読込
    ↓
内容修正
    ↓
修正反映
    ↓
候補再計算
    ↓
render()
```

---

# 設計方針

- 状態管理と描画を分離する
- 共通処理は関数化する
- 描画処理をモジュール分割する
- 保守性・可読性を重視する
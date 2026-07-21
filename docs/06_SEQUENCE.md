# 処理シーケンス

## 目的

ユーザー操作から画面更新までの処理の流れをまとめる。

---

# アプリ起動

```
ページ表示
    │
    ▼
script.js 読み込み
    │
    ▼
gameState 初期化
    │
    ▼
render()
    │
    ▼
画面表示
```

---

# 結果入力

```
色選択
    │
    ▼
guess 更新
    │
    ▼
Hit・Blow入力
    │
    ▼
確定ボタン押下
    │
    ▼
validateResult()
    │
    ▼
history追加
    │
    ▼
rebuildCandidates()
    │
    ▼
filterCandidates()
    │
    ▼
gameState 更新
    │
    ▼
render()
```

---

# 履歴修正

```
修正ボタン
    │
    ▼
loadHistory()
    │
    ▼
入力内容編集
    │
    ▼
修正反映
    │
    ▼
history更新
    │
    ▼
rebuildCandidates()
    │
    ▼
render()
```

---

# 候補一覧表示

```
候補を見る
    │
    ▼
showCandidates切替
    │
    ▼
render()
    │
    ▼
renderCandidateList()
```

---

# ヒートマップ表示

```
ヒートマップを見る
    │
    ▼
showHeatmap切替
    │
    ▼
calculateHeatmap()
    │
    ▼
renderHeatmap()
```

---

# 全体イメージ

```
ユーザー操作
      │
      ▼
 gameState更新
      │
      ▼
 候補再計算
      │
      ▼
 render()
      │
      ▼
 各描画関数
      │
      ▼
 画面更新
```

本アプリケーションは gameState を中心とした状態管理を採用しており、
状態変更後に render() を実行することで画面全体の整合性を保っている。
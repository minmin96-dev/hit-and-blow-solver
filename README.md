# Hit & Blow Solver for 世界のアソビ大全51

ブラウザ上で動作する Hit & Blow ソルバーです。

世界のアソビ大全51のヒットアンドブローに対応しており、
入力した履歴から残り候補を絞り込み、ヒートマップを表示できます。

---

## リンク

- 🌐 デモ：https://minmin96-dev.github.io/hit-and-blow-solver/
- 📦 GitHub：https://github.com/minmin96-dev/hit-and-blow-solver

---

## スクリーンショット

### PC

![PC画面](docs/images/03-1_screenimage_pc.png)

### スマートフォン

![スマホ画面](docs/images/03-2_screenimage_smartphone.jpg)

---

## 主な機能

- 4色入力
- Hit / Blow入力
- 候補自動絞り込み
- 候補一覧表示
- ヒートマップ表示
- 履歴表示
- 履歴修正
- 不正入力チェック

---

## 使用方法

1. 予想した4色を入力
2. Hit・Blowを入力
3. 「確定」を押す
4. 候補一覧・ヒートマップを参考に次の手を考える

履歴を修正したい場合は、
「修正」→「修正反映」で更新できます。

---

## 動作環境

- Google Chrome
- Microsoft Edge

JavaScript が有効なブラウザで動作します。

---

## フォルダ構成

```
HitBlowSolver/
├─ css/
├─ js/
├─ docs/
├─ index.html
└─ README.md
```

---

## ドキュメント

設計資料は docs フォルダにまとめています。

|ファイル|内容|
|---|---|
|01_CHANGELOG.md|更新履歴|
|02_OVERVIEW.md|システム概要|
|03_SCREEN.md|画面仕様|
|04_SYSTEM.md|システム構成|
|05_FUNCTIONS.md|関数一覧|
|06_SEQUENCE.md|処理シーケンス|
|07_ALGORITHM.md|アルゴリズム仕様|
|08_FUTURE.md|今後の拡張計画|

---

## 技術構成

- HTML
- CSS
- JavaScript（Vanilla JS）

ライブラリやフレームワークは使用していません。

---

## 今後の予定

現在検討している機能

- 重複ありルール対応
- 最適手提案
- GitHub Pages公開

詳細は

docs/08_FUTURE.md

を参照してください。

---

## ライセンス

個人学習・ポートフォリオ目的で作成。

## 開発背景

世界のアソビ大全51のヒットアンドブローを遊ぶ中で、  
「残り候補数を自動で計算することが可能なのでは」と思ったことが本ツールを作るきっかけです。

また、生成AI（ChatGPT）を活用したプログラミングがどこまで実用的に開発へ活かせるのか  
自分自身で挑戦してみたいという思いもありました。

そのため、本プロジェクトでは  
設計から実装、リファクタリング、ドキュメント作成までChatGPTと対話しながら進め、  
ブラウザ上で手軽に利用できる解析ツールとして完成させました。

## 工夫した点

- ロジックとUIを分離した構成
- gameStateによる状態管理
- 関数ごとの責務分割
- ドキュメント整備を並行して実施
- スマートフォン表示にも対応
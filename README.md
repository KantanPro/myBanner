# myBanner

WordPress サイト向けのバナー広告表示プラグインです。

リポジトリ: https://github.com/KantanPro/myBanner

## 概要

- プラグイン名: myBanner
- フォルダ名: `myBanner`
- 対象: 任意の WordPress サイト

## 機能

- 複数バナーの登録とローテーション表示
- PC・スマホ用画像の切り替え（767px 以下）
- ショートコード `[my_banner]` で任意の場所に表示
- ウィジェット「myBanner」（外観 > ウィジェット）
- Gutenberg ブロック「myBanner」で本文の任意位置に挿入

## セットアップ

1. WordPress 管理画面で `myBanner` を有効化
2. 管理画面左メニューの `myBanner` を開く
3. バナー画像・リンク URL 等を設定して保存

## 表示方法

### 1) ウィジェット

1. **外観 > ウィジェット** を開く
2. **myBanner** をサイドバー・インデックス上下等のウィジェットエリアに追加
3. バナー内容は **myBanner** メニューで管理

### 2) ショートコード

```
[my_banner]
```

追加クラス:

```
[my_banner class="my-custom-class"]
```

### 3) Gutenberg ブロック

1. ブロックエディターで **+** をクリック
2. **myBanner** ブロックを検索して挿入
3. バナー内容は **myBanner** メニューで管理

## ファイル構成

```
myBanner/
├── myBanner.php
├── css/my-banner-frontend.css
├── js/my-banner-admin.js
├── js/my-banner-frontend.js
└── blocks/my-banner/
    ├── block.json
    ├── index.js
    └── editor.css
```

## 変更履歴

### 1.0.3

- フロントページ・投稿インデックスへの自動表示機能を廃止（ウィジェットで代替）
- 自動表示位置の設定を廃止

### 1.0.2

- 「フロントページで自動表示」「投稿インデックスで自動表示」に有効時の動作説明を追加

### 1.0.1

- リリース ZIP 出力先を myBanner_TEST_UP に変更
- GitHub Release（zipball フォールバック）向けのタグ付けリリース

### 1.0.0

- ktp-banner をベースに KantanPro 依存機能を削除し、一般販売向け myBanner として初版リリース

=== myBanner ===
Contributors: mybanner
Tags: banner, advertisement, widget, shortcode, block
Requires at least: 5.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

WordPress サイト向けのバナー広告表示プラグインです。

== Description ==

myBanner は、WordPress サイトにバナー広告を表示するための汎用プラグインです。

* 複数バナーの登録とローテーション表示
* PC・スマホ用画像の切り替え（767px 以下）
* ショートコード `[my_banner]`
* ウィジェット「myBanner」
* Gutenberg ブロック「myBanner」

== Installation ==

1. プラグインを `wp-content/plugins/myBanner` に配置します。
2. WordPress 管理画面でプラグインを有効化します。
3. 管理画面左メニューの「myBanner」でバナー内容を保存します。

== Frequently Asked Questions ==

= バナーが表示されない =

* myBanner が有効化されている
* 「有効化」にチェックが入っている
* バナー画像 URL が登録されている
* ウィジェット・ショートコード `[my_banner]`・Gutenberg ブロックのいずれかで表示場所を配置している

== Changelog ==

= 1.0.3 =
* フロントページ・投稿インデックスへの自動表示機能を廃止（ウィジェットで代替）
* 自動表示位置の設定を廃止

= 1.0.2 =
* 「フロントページで自動表示」「投稿インデックスで自動表示」に有効時の動作説明を追加

= 1.0.1 =
* リリース ZIP 出力先を myBanner_TEST_UP に変更
* GitHub Release（zipball フォールバック）向けのタグ付けリリース

= 1.0.0 =
* ktp-banner をベースに KantanPro 依存機能を削除し、一般販売向け myBanner として初版リリース
* ウィジェット・ショートコード `[my_banner]`・Gutenberg ブロックに対応

=== myBanner ===
Contributors: mybanner
Tags: banner, advertisement, widget, shortcode, block
Requires at least: 5.8
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

WordPress サイト向けのバナー広告表示プラグインです。

== Description ==

myBanner は、WordPress サイトにバナー広告を表示するための汎用プラグインです。

* 複数バナーの登録とローテーション表示
* PC・スマホ用画像の切り替え（767px 以下）
* フロントページ・投稿インデックスへの自動表示（任意）
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
* 自動表示を使う場合は「フロントページで自動表示」または「投稿インデックスで自動表示」をオンにする
* 固定ページ等に表示する場合は `[my_banner]` ショートコード、ウィジェット、またはブロックを配置する

== Changelog ==

= 1.0.1 =
* リリース ZIP 出力先を myBanner_TEST_UP に変更
* GitHub Release（zipball フォールバック）向けのタグ付けリリース

= 1.0.0 =
* ktp-banner をベースに KantanPro 依存機能を削除し、一般販売向け myBanner として初版リリース
* フロントページ・投稿インデックスへの自動表示設定を追加
* ウィジェット・ショートコード `[my_banner]`・Gutenberg ブロックに対応

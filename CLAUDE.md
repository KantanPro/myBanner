# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**myBanner** — a generic WordPress rotating-banner-ad plugin for **general resale on any WordPress site**. GitHub: `KantanPro/myBanner`.

This is a fork of **KTP Banner** (`wordpress/wp-content/plugins/ktp-banner`) with all KantanPro-specific integration removed (no edition detection, no KantanPro admin-screen notice, no shortcode-output fallback insertion into KantanPro tabs). Treat it as a **separate product** — don't reintroduce KantanPro-coupling here, and don't conflate it with KantanPro/KantanProEX/KantanBiz. If you're fixing a generic banner bug (rotation, widget, block, image handling) that isn't KantanPro-specific, consider whether the same fix is needed in `ktp-banner` too.

## Display surfaces

- Shortcode `[my_banner class="..."]`
- Widget "myBanner" (Appearance → Widgets)
- Gutenberg block `blocks/my-banner/`

Multiple banners can be registered with rotation and separate PC/mobile images (auto-switch at ≤767px). There is **no automatic front-page/post-index insertion** — that existed briefly (see `README.md` changelog 1.0.2) and was removed in 1.0.3 in favor of the widget; don't re-add automatic full-site placement without checking why it was pulled.

## Architecture

Single-file plugin: `myBanner.php` (~2200 lines) contains the whole `My_Banner_Plugin` singleton (option key `my_banner_options`) — settings page, shortcode/widget/block registration, and rendering all together. `css/my-banner-frontend.css` and `js/my-banner-{admin,frontend}.js` are the only other runtime files; `blocks/my-banner/` holds the Gutenberg block (`block.json` + `index.js` + `editor.css`, plain JS, no build step).

## Commands

```bash
./create_release_zip.sh   # build release zip (output: myBanner_TEST_UP)
```

No automated test suite — verify manually in a WordPress install (rotation timing, mobile image swap at the 767px breakpoint, widget/shortcode/block all rendering the same managed content).

## Commit messages

Always write commit messages in Japanese, concise form like `〇〇を追加` / `〇〇を修正` / `〇〇のバグを修正` — never English one-liners.

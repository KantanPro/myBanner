#!/usr/bin/env bash
set -euo pipefail

# myBanner リリースZIP作成スクリプト
PLUGIN_SLUG="myBanner"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="${SCRIPT_DIR}"
OUTPUT_DIR="/Users/kantanpro/Desktop/myBanner_TEST_UP"

if [[ ! -f "${PLUGIN_DIR}/myBanner.php" ]]; then
  echo "Error: ${PLUGIN_DIR}/myBanner.php が見つかりません。"
  exit 1
fi

VERSION="$(sed -n 's/^ \* Version: \(.*\)$/\1/p' "${PLUGIN_DIR}/myBanner.php" | head -n 1 | tr -d '\r')"
if [[ -z "${VERSION}" ]]; then
  echo "Error: バージョンを myBanner.php から取得できませんでした。"
  exit 1
fi

mkdir -p "${OUTPUT_DIR}"
ZIP_NAME="${PLUGIN_SLUG}-${VERSION}.zip"
ZIP_PATH="${OUTPUT_DIR}/${ZIP_NAME}"

rm -f "${ZIP_PATH}"

(
  cd "$(dirname "${PLUGIN_DIR}")"
  zip -r "${ZIP_PATH}" "${PLUGIN_SLUG}" \
    -x "${PLUGIN_SLUG}/.git/*" \
    -x "${PLUGIN_SLUG}/.git" \
    -x "${PLUGIN_SLUG}/.DS_Store" \
    -x "${PLUGIN_SLUG}/*/.DS_Store"
)

echo "Created: ${ZIP_PATH}"

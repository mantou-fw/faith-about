# Echo — Astro starter + Bun

以 [faithli-dev/astro-starter](https://github.com/faithli-dev/astro-starter) 為基礎，將上一版 Echo 還原整合為真正的 Astro 7 專案。保留 Cloudflare Workers adapter、SEO、runtime sitemap、Partytown 與 Bearnie UI 層。

## 啟動

需要 Bun 1.3.14+，以及 starter CLI 使用的 Node 22.18+。

```bash
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 4322 --ignore-lock
```

本機預覽：<http://127.0.0.1:4322/>。`--ignore-lock` 在 agent 環境保持前景運行；一般終端亦可直接 `bun run dev`。

```bash
bun run check
bun run build
bun test
```

測試會檢查建置輸出，因此請先 build。Astro check 目前不支援 starter 指定的 TypeScript 7，已改為支援的 TypeScript 6.0.3。

## 內容與架構

- `src/pages/`：22 個原生 `.astro` 頁面，全部 prerender。
- `src/layouts/BaseLayout.astro`：沿用 starter 的 SEO，加入共用 Header/Footer、React islands 及 Astro ClientRouter。
- `src/components/site/echo/`：頁面組合與共用站點元件。
- `src/components/echo/`：從公開前端復原的 React 行為模組，改由新 Astro build 執行 SSR 與 hydration。
- `src/components/ui/echo/`：既有 Echo React/Radix primitives 的公開介面；原有 Bearnie Astro primitives 保留在原 UI 層。
- `src/content/echo/`：可讀 JSON props 與文章／靜態內容 HTML。修改資料會同時更新 SSR 及互動內容。
- `public/images/`、`public/_astro/fonts/`：本地素材；`public/echo.css`：參考網站已編譯樣式。
- `src/pages/sitemap.xml.ts`：沿用 starter 的 runtime sitemap，包含全部 22 個 URL。

頁面包含首頁、Projects、About、Articles、14 個項目詳情及 4 篇文章。深色模式、分類篩選、橫幅關閉、文章連結／程式碼複製、電影／車輛圖片預覽與頁面切換均已驗證。

## 設定與部署

複製 `.env.example` 為 `.env`，將 `SITE_URL` 改為正式網域。`PUBLIC_GOOGLE_TAG_ID` 留空時不載入分析追蹤。

Cloudflare adapter 和 `bun run deploy` 沿用 starter。正式部署需要你的 Cloudflare 設定；這次交付未部署或推送遠端。Bun 是本專案的套件管理流程，Cloudflare Workers 是正式服務 runtime。

## 驗證與來源

`design-qa.md`、`qa/` 提供桌面／手機檢查和原版左右比對。測試驗證 22 個 Astro 建置頁面、資源參照與 runtime sitemap。

參考來源：<https://echo-astro-template.vercel.app/>。這是公開前端重建，包含復原的 JavaScript、CSS、圖片、字型與內容；並非取得原作者未公開的 `.astro`／TSX 原始碼。新的路由、layout 和 Astro integration 是這次整合建立。原始 JS runtime、React bundle 與 hydration renderer 已由安裝的 React 和 `@astrojs/react` 取代。

Starter 的 MIT 授權保留。Echo 素材／復原程式碼的來源與授權獨立於 starter，詳見 `THIRD_PARTY_NOTICES.md`。

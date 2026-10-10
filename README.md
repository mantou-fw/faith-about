# Mantou / Faith — Astro + Bun portfolio

以 [faithli-dev/astro-starter](https://github.com/faithli-dev/astro-starter) 為基礎，保留 Echo 版面、Cloudflare Workers adapter、SEO、runtime sitemap、Partytown 與 Bearnie UI 層。

## 啟動

需要 Bun 1.3.14+，以及 starter CLI 使用的 Node 22.18+。

```bash
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 4322 --ignore-lock
```

本機預覽：[Mantou / Faith](http://127.0.0.1:4322/)。一般終端亦可直接 `bun run dev`。

```bash
bun run check
bun run build
bun test
```

測試檢查建置輸出，請先 build。Astro check 目前不支援 starter 指定的 TypeScript 7，使用 TypeScript 6.0.3。

## 修改個人資料

`src/data/portfolio.json` 集中管理名稱、頭像、GitHub、自我介紹、tech stack 及 7 個 projects。新增 project 後，詳情頁和 sitemap 自動按資料生成，毋須另加路由檔。

- 名稱 **Mantou / Faith**、全部 7 個公開 repositories、頭像來自使用者確認。
- 簡介及技術按公開 README、package manifest 與網站內容整理；Bun 是使用者指定的本專案工作流程。
- 未提供公開 email、職稱或工作經歷，目前只使用 GitHub 作聯絡入口。
- Project 封面是名稱識別圖，不是產品截圖。

## 內容與架構

- `src/pages/`：首頁、Projects、About，另以 `[slug].astro` 生成 7 個 project 詳情，共 10 個靜態頁面。
- `src/data/routes.ts`：從 portfolio 資料產生 route metadata，供 sitemap 與測試共用。
- `src/layouts/BaseLayout.astro`：SEO、共用 Header/Footer、React islands 及 Astro ClientRouter。
- `src/components/site/echo/`：個人化內容與頁面組合。
- `src/components/echo/`：Echo 復原 React 行為；分類和導航已個人化。
- `src/components/ui/echo/`：Echo React/Radix controls 公開介面；native Astro tech cards 使用 `@/components/ui` 的 Bearnie Card。
- `src/content/echo/` 及未使用的舊 React/頁面組合：保留原版重建來源記錄，沒有發佈 template 的虛構項目／文章路由。
- `public/images/portfolio/`：使用者原圖和 repository 封面。

## 設定

複製 `.env.example` 為 `.env`，將 `SITE_URL` 改為正式網域。`PUBLIC_GOOGLE_TAG_ID` 留空時不載入分析追蹤。

Cloudflare adapter 和 deploy 指令沿用 starter；本次未部署或推送遠端。Bun 是套件管理流程，Cloudflare Workers 是正式服務 runtime。

## 驗證與來源

個人化檢查見 `docs/personalization-review.md`。`design-qa.md` 與 `qa/` 記錄之前 Echo 重建的原版比對，並非個人化後的逐像素比對；`preview.jpg` 是目前個人化首頁。

[faithli-dev 公開 GitHub](https://github.com/faithli-dev) 的 repo descriptions、README、package manifests 與兩個 AWS GitHub Pages 網站是內容依據。公開資料核對日期：2026-10-10。

[Echo 參考網站](https://echo-astro-template.vercel.app/) 是版面與復原前端素材來源；未取得原作者未公開的 `.astro`／TSX。React、renderer 與路由由目前 Astro 專案提供。

Starter 的 MIT 授權保留。Echo 素材／復原程式碼來源與授權獨立於 starter，詳見 `THIRD_PARTY_NOTICES.md`。

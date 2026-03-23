# 🌐 Synchro Official Hub
The Single Source of Truth for Vibe Coders.

這是一個使用 Synchro Stack 自身構建的官方網站與動態文檔系統。它不僅展示了架構的優勢，還整合了 GSD (Get Shit Done) 規格驅動開發原則，實現了一個具備「零幻覺」開發體驗的內容管理平台。


## ✨ 核心特性 (Core Features)
L-Shaped Documentation: 專業級 /docs 佈局，包含導航側邊欄與極簡 Markdown 渲染。
GSD Native: 內建 GSD Spec-driven Development 專章，教導如何利用型別邊界約束 AI。
Dynamic CMS: 透過 /admin/login 進入後台，直接編輯教學博文，即時更新文檔。
Type-Safe Fullstack: 前後端完全透過 Hono RPC 聯動，確保管理後台與 API 的數據 100% 同步。
Future-Dark UI: 基於 Tailwind CSS 的極簡未來感設計，專為工程師審美打造。
## 🏗 專案結構 (Project Structure)
```bash
.
├── apps/
│   ├── frontend/           # React Router v7 官網、文檔、Admin 後台
│   └── backend/            # Hono API (處理 Docs CRUD 與 Auth)
├── packages/
│   └── shared/             # Zod Schemas (文檔結構與用戶驗證的唯一真相)
├── docs/                   # 靜態 Markdown 備份與 GSD 規範說明
└── .gsd/                   # GSD 框架配置文件
    └── SPEC.md             # 本站點的開發規格與進度追蹤
```

## 🤖 Synchro x GSD 整合 (The Vibe)
本專案深度實踐了 GSD 規格驅動開發：
規格先行 (Spec-Driven)：所有功能開發（如 Admin 編輯器）皆先在 .gsd/SPEC.md 定義。
型別防護 (Type-Safe Guardrail)：AI 代理在開發過程中，必須遵守 packages/shared 中的 Zod 定義。若 AI 產生幻覺（例如偽造 API 欄位），Hono RPC 將導致編譯失敗，強迫 AI 自我修正。
Vibe Coding 流程：
Talk -> Plan -> Code -> Verify (透過 GSD 流程指令)。

## 🚀 快速啟動 (Quick Start)
1. 安裝環境
    確保你已安裝 Bun。
    ```bash
    bun install
    ```

2. 啟動資料庫
    使用 Docker 啟動 PostgreSQL。
    ```bash
    docker-compose up -d
    ```

3. 運行開發模式
    同時啟動前端官網與後端 API。
    ```bash
    bun run dev
    ```

4. 訪問路徑
官網首頁: http://localhost:3000
文檔中心: http://localhost:3000/docs
後台管理: http://localhost:3000/admin/login

## 📝 管理與編輯 (Admin & CMS)
進入 /admin/login 使用預設管理員帳號登入。
在後台介面中使用 Markdown 編寫新的教學文章或更新 GSD 指南。
儲存後，前端 /docs 頁面將透過 TanStack Query 自動重新抓取並渲染最新內容。

## 📜 授權 (License)
採用 MIT License。歡迎參與這場關於 Vibe Coding 與 Zero-Hallucination 的開發革命。
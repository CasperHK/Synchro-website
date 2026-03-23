請為 Synchro 生成一個具備側邊欄與主內容區的 文檔頁面 (Documentation Layout), under `/docs`。
佈局要求：
側邊選單 (Side Menu)：
Introduction: Welcome to Synchro, The Vibe Coding Philosophy.
Quick Start: Installation (Bun), First Sync.
GSD Integration: Spec-Driven Development Principal, Using .gsd/SPEC.md with Synchro.
Core Concepts: Hono RPC (Type-Safe Routes), Shared Zod Schemas (SSOT), Database with Prisma.
Project Structure: apps/ vs packages/, Deployment with Docker.
主內容區 (Main Content)：使用清晰的 Markdown 渲染風格。
重點說明：詳細描述 Synchro 如何讓 AI 代理（Agents）在 GSD 工作流中保持 100% 確定性。
代碼區塊：展示 packages/shared 中的 Zod 定義如何同步影響前後端。
互動性：側邊欄需具備滾動偵測（Active Link），右上角有全文搜索框（Search Bar）。
風格：極簡黑魂，程式碼高亮使用 VS Code Dark Plus 主題。

請為 Synchro 構建一個功能齊全的 /docs 系統，採用 L-型佈局 (L-shaped Layout)。
設計規格：
頂部導航欄 (Top Bar)：Logo, Search, GitHub Link, 以及一個顯眼的 『Start Vibe Coding』 按鈕。
左側選單 (Left Sidebar)：導覽目錄，需包含：
Getting Started: 快速安裝、環境設定。
Core Concepts: Hono RPC 深入解析、Shared Zod 真相來源。
GSD Integration: 專章介紹：Spec-Driven Development Principle (GSD 規格驅動開發)。
Folder Structure: 拆解 apps/ 與 packages/ 的邏輯。
主內容區 (Main Content)：位於右側，支持 Markdown 渲染，具有現代感的代碼高亮。
GSD 專章內容要求：詳細描述如何將 Synchro 的 Type-safety 注入 GSD 的 SPEC.md 流程中，強調這套 Stack 是如何作為 AI 的『物理限制』來杜絕幻覺。
Admin 登入與編輯：
實現 /admin/login 頁面（使用 Synchro 的 Zod 驗證）。
提供一個後台編輯界面，允許管理員透過 Markdown 編輯器 直接更新 /docs 中的教學文章（Blog-style posts）。
數據流：Frontend (React Router v7) -> Hono API (RPC) -> Prisma (PostgreSQL)。

--- 

文件內容精選：GSD 整合章節 (Content for Docs)
在生成文檔時，請確保 AI 寫入以下這段核心邏輯：
"Why Synchro is GSD-Native:"
Spec as Source: Your .gsd/SPEC.md defines the vibe; our Shared Schema enforces the reality.
Zero-Hallucination Loop: When your GSD agent executes a task, Synchro's 100% type-safety acts as an invisible guardrail, instantly failing the task if the AI hallucinate a non-existent field.

Synchro x GSD: The Engineering of Certainty"
規格先行 (Spec-Driven)：開發始於 .gsd/SPEC.md。Synchro 的 Shared Packages 是規格的具體化，確保 AI 代理在編碼前先對齊 Schema。
型別作為邊界 (Type as Boundary)：在 Vibe Coding 過程中，Synchro 的全域型別約束充當了 GSD 的自動驗證器。如果 AI 試圖生成違反規格的代碼，編譯器會立即攔截，將修復成本降至零。

---

實作指南：
Authentication: 使用 Lucia Auth 或簡單的 JWT 配合 Hono 實現。
Editor: 集成一個輕量級 Markdown 編輯器（如 react-markdown-editor-lite）。
Dynamic Routing: /docs/:slug 應從數據庫動態讀取文章內容。
Tech Stack: 強制使用 Synchro 原生架構（Hono RPC + TanStack Query）來開發這個後台管理功能，以展示 Stack 的強大之處。
請扮演一位資深全端工程師與 UX 設計師。為我的技術棧 'Synchro' 製作一個現代化、具未來感且新手友善的官方網站。
專案名稱： Synchro
核心標語： 「單一真相來源，徹底終結 AI 幻覺。」
視覺風格： 參考 Vercel 或 Linear 的極簡黑魂風格（Dark Mode），高對比度、大量留白、精緻的排版。
網站內容結構（繁體中文）：
Hero Section： 標題要震撼有力，例如「Synchro：專為 AI 時代設計的零幻覺全端架構」。副標題強調「透過 100% 型別安全，將 AI 從不穩定的助手轉化為精準的工程師」。
核心哲學 (Core Philosophy)： 用三個卡片展示：
單一真相來源：Schema 共享，無同步成本。
極致型別安全： 從後端到前端，錯誤無所遁形。
AI 協作優先： 強制規範，杜絕 AI 隨機生成代碼。
技術棧清單： 使用現代化的圖標標記 Bun, React Router v7, Hono, Prisma, Zod。
新手友善範例： 展示一個簡單的代碼對比。左邊是「傳統混亂的 API 調用」，右邊是「Synchro 的自動補全與型別校驗」。
專案結構預覽： 使用樹狀結構圖展示 apps/ 與 packages/ 的整潔配置。
CTA： 「停止猜測，開始同步。立即在 GitHub 上獲取模板。」
技術要求：
使用 React + Tailwind CSS。
字體建議使用 'Inter' 或系統預設的黑體。
文案口吻要專業、充滿未來感，且必須讓新手感到『只要用這套，我也不會寫錯代碼』的安心感。

請為 Synchro 官網編寫一個具備未來感的 React 動態背景組件。
設計要求：
深色背景 (Dark Mode)：主色調為 #050505。
動態網格 (Animated Grid)：背景有一個若隱若現的 3D 網格，隨著滑鼠移動有微小的傾斜效果。
同步粒子流 (Synchro Particles)：畫面中有少量的發光粒子（Cyber Cyan 或 Electric Blue），它們沿著網格線做直線運動，象徵『型別安全且有序的資料流』。
毛玻璃效果 (Glassmorphism)：前景卡片後方要有模糊濾鏡。
技術棧：請使用 framer-motion 處理動畫，並確保效能流暢（使用 canvas或優化過的 svg）。
新手友善：代碼結構要清晰，並加上繁體中文註解。


---

🚀 Synchro：AI 時代的「零幻覺」全端架構
Synchro 不僅僅是一個 Web Stack，它是為 Vibe Coding 而生的基礎設施。當你與 AI（如 Claude Code, Cursor）協作時，Synchro 提供的強大約束力，能確保 AI 的「靈感（Vibe）」始終運行在「型別（Type）」的鐵軌上。
為什麼 Synchro 是 Vibe Coding 的核心？
Vibe Coding 的核心在於快速迭代與意圖表達。然而，傳統架構常因 AI 無法感知後端變化而導致「幻覺」與「斷層」。
消除溝通阻力：當你告訴 AI 「新增一個用戶標籤功能」，AI 不需要去猜測 API 路徑或欄位名稱。在 Synchro 中，Hono RPC 讓 AI 自動獲得全域型別補全。
確保意圖一致性：透過 Single Source of Truth (SSOT)，你修改了 shared/schema，整個架構（前後端）會立即同步，AI 生成的前端代碼若不符合規格，編譯器將直接擋下，杜絕任何「胡言亂語」。
深度整合：GSD 規格驅動開發 (Spec-Driven Development)
Synchro 旨在完美融入 GSD 工作流，將開發從「試錯」轉向「確定性交付」。
1. 規格即代碼 (Spec as Source)
在 GSD 框架中，.gsd/SPEC.md 定義了任務目標。Synchro 的 Packages/Shared 層次結構充當了這個規格的實體體現。AI 代理會先修改 Shared Zod Schema，這便是落實 GSD 的「規劃（Plan）」階段。
2. 原子化任務執行 (Atomic Task Execution)
GSD 強調將任務切分為小片（Slices）。
Synchro 的優勢：因為有 RPC 模式，一個 Slice 的開發（例如新增 API 到渲染畫面）可以在單次上下文視窗中完成，AI 能夠同時理解路由定義與前端調用，這正是 GSD 追求的「一次性搞定（Get Shit Done）」。
3. 自動化驗證循環 (Auto-Verification Loop)
GSD 的最後一環是 /gsd:verify。
強大支撐：由於 Synchro 是 100% Type-Safe，GSD 代理只需執行 tsc 或 bun check，即可在毫秒內驗證 AI 生成的代碼是否偏離了原始規格。如果型別不匹配，GSD 會立即引導 AI 進行自我修正，實現無人值守的開發循環。
未來感的開發體驗
「在 Synchro 中，AI 不是在猜測你的後端，而是在讀取你的靈魂（Schema）。」
這套架構讓開發者能專注於 "The Vibe" (產品的創意與邏輯)，而將 "The Shit" (繁瑣的膠水碼與型別同步) 交給 Synchro 與 GSD 自動處理。


---

Please complete the README.md of this Synchro official website.
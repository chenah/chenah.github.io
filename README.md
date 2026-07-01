# CHEN Guang — Personal Homepage / 个人主页

陈光 (CHEN Guang) 的个人主页。深色 × 荧光青柠、巨型字体、全幅纵向滚动，
带平滑滚动 (Lenis)、加载入场、滚动揭示、视差与磁性交互等动效，灵感源自现代
运动员/创作者官网风格。

A personal homepage for AI applications researcher CHEN Guang — a black × neon-lime,
big-type, full-bleed scrolling site with smooth scrolling (Lenis), load
intro, scroll reveals, parallax and magnetic interactions.

## 技术栈 / Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **motion** (Framer Motion) — 入场 / 视差 / 磁性动效
- **lenis** — 惯性平滑滚动
- 输出为**静态站点** (`output: "export"`)，可直接托管到 GitHub Pages

## 本地开发 / Local Development

```bash
npm install
npm run dev        # http://localhost:3000
```

其他脚本 / Other scripts:

```bash
npm run build      # 生产构建 + 静态导出到 out/
npm run typecheck  # tsc --noEmit
npm run lint
```

## 修改内容 / Editing Content

所有文案（中英双语）集中在一个数据源里，改这里即可全站同步：

- **`src/lib/content.ts`** — 姓名、简介、论文、经历、项目、联系方式等
- `src/app/globals.css` — 配色（`--lime` 主色）与字体变量
- `src/components/*` — 各区块组件（Hero / About / Publications / …）

## 部署到 GitHub Pages / Deploy

`next build` 会在 `out/` 生成纯静态文件。`.github/workflows/deploy.yml` 已配置好：
每次 push 到 `main` 分支时自动构建并发布到 GitHub Pages（免费）。

**首次启用只需两步（在 GitHub 网页操作，一次性）：**

1. 仓库改名为 `<你的用户名>.github.io`（Settings → 顶部 Rename），
   这样站点会发布在根域名 `https://<用户名>.github.io/`。
   如果保留原仓库名，会发布在 `https://<用户名>.github.io/<仓库名>/`，
   此时需要在 `next.config.ts` 里加回 `basePath`/`assetPrefix`。
2. 仓库 Settings → Pages → **Build and deployment → Source** 选择
   **"GitHub Actions"**（不是 "Deploy from a branch"）。

设置好之后，以后每次 `git push` 到 `main` 都会自动重新构建部署，无需手动操作。
也可以在仓库的 Actions 标签页手动触发 "Deploy to GitHub Pages" 工作流。

若之后购买了自定义域名，在 `public/CNAME` 文件里写入域名（如 `example.com`），
并同步更新 `public/robots.txt` / `public/sitemap.xml` 里的域名。

## 备注 / Notes

- `legacy/` 保留了迁移前的纯静态 HTML/CSS 版本（`index.html` / `style.css`）。
- `.claude/skills/clone-website/` 保留了 “克隆网站” 技能，供后续参考使用。

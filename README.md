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

`next build` 会在 `out/` 生成纯静态文件。

1. **用户主页**（仓库名为 `<用户名>.github.io`）：无需额外配置，直接发布 `out/`。
2. **项目主页**（其它仓库名）：在 `next.config.ts` 设置
   `basePath` / `assetPrefix` 为 `"/<仓库名>"`，再发布 `out/`。

可用 GitHub Actions 自动构建并发布 `out/` 到 Pages。

## 备注 / Notes

- `legacy/` 保留了迁移前的纯静态 HTML/CSS 版本（`index.html` / `style.css`）。
- `.claude/skills/clone-website/` 保留了 “克隆网站” 技能，供后续参考使用。

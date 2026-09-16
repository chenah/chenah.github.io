# CHEN Guang — Personal Homepage

陈光的 AI 与人机交互研究主页。深炭色、暖白排版和荧光橙构成统一视觉系统，保留论文、项目、学术经历及联系方式。

## 交互设计

- 首屏 Canvas 粒子雕塑，支持 Tide / Orbit / Sphere 平滑变形、鼠标涟漪、水面流光与局部连线。
- 香港—广州双城互动线描：维港、轮渡、中银大厦与广州塔、珠江，通过城市按钮切换，对应 PolyU / SCUT 经历。
- 分层文字入场、滚动揭示、磁性按钮和轻量透视悬停。
- 可用键盘切换的研究流程、可放大的原始论文图片、按年份和标题／作者／期刊搜索的论文索引。
- 响应式导航、学术时间轴和直接连接邮件、Google Scholar、GitHub 的联系区域。
- 全局动效暂停按钮，遵循系统 `prefers-reduced-motion`；离开视口或后台时暂停粒子渲染，城市插画离屏暂停。
- 站内链接统一平滑滚动，保留键盘焦点、浏览器历史与减少动效模式。

## 开发

Node.js 24+，Next.js 16、React 19、TypeScript、Tailwind CSS 4、Motion 与 Lenis。

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run dev` 默认启动在 http://localhost:3000。生产构建静态导出至 `out/`，沿用仓库的 GitHub Pages 发布流程。

## 内容和样式

- `src/lib/content.ts`：个人信息、2026-09-16 核查的 Scholar 数据快照（6 篇论文／45 次引用／h-index 2）、论文、项目、经历和联系方式。引用数量不会自动更新；页面标注核查日期。
- `docs/research/scholar-update.md`：Scholar 与出版社核查来源、年份差异和更新方法。论文主链接使用 DOI / arXiv，保留原始 Scholar 链接。
- `src/components/Hero.tsx` / `NeuralField.tsx`：首屏和实时粒子。
- `src/components/CityAtlas.tsx`：香港、广州原生 SVG 城市插画与切换交互。
- `src/components/Providers.tsx` / `motion-primitives.tsx`：共享动效偏好和交互基础组件。
- `src/components/*.module.css`：各区域的响应式样式。
- `src/app/globals.css`：字体、全局配色、可访问性及动效降级。
- `public/figures/`：项目所使用的原始论文图片。

本次设计在现有仓库中完成；只有执行推送并触发部署流程后，线上 GitHub Pages 才会更新。

# CHEN Guang - Personal Homepage

个人主页 / Personal Homepage

## 预览 / Preview

本地预览：直接在浏览器中打开 `index.html` 文件即可。

## 部署到 GitHub Pages / Deploy to GitHub Pages

### 步骤 1: 创建 GitHub 仓库

1. 登录 GitHub
2. 创建一个新仓库，仓库名必须是 `你的用户名.github.io`（例如：`chenguang.github.io`）
3. 不要勾选 "Add a README file"（因为本地已有文件）

### 步骤 2: 推送代码到 GitHub

```bash
# 在项目目录下执行
git init
git add .
git commit -m "Initial commit: personal homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

### 步骤 3: 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 Settings → Pages
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支，点击 Save

### 步骤 4: 访问你的网站

几分钟后，你的网站将在 `https://你的用户名.github.io` 上线！

## 自定义内容 / Customize Content

编辑 `index.html` 文件，修改以下占位符：

- `[你的职位/专业]` - 你的职位或专业
- `[你的学校/公司]` - 你的学校或公司
- `[添加更多技能]` - 添加你的技能标签
- `your.email@example.com` - 你的邮箱
- `yourusername` - 你的 GitHub/LinkedIn 用户名

## 文件结构 / File Structure

```
├── index.html    # 主页面
├── style.css     # 样式文件
└── README.md     # 说明文档
```

## 技术栈 / Tech Stack

- HTML5
- CSS3
- 响应式设计
- 无需任何框架，纯静态页面

# AI Playground - Scotch Atlas

一个集成了 OpenAI GPT 对话功能的静态网站，使用 Cloudflare Pages Functions 作为后端代理，确保 API Key 安全。

## 🚀 部署到 Cloudflare Pages

### 1. 推送代码到 GitHub

```bash
git add .
git commit -m "Add Cloudflare Pages Functions for secure API proxy"
git push origin main
```

### 2. 在 Cloudflare Pages 中配置环境变量

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入你的 Pages 项目（`ai-playground`）
3. 点击 **Settings** → **Environment variables**
4. 添加以下环境变量：

   **变量名：** `OPENAI_API_KEY`  
   **值：** 你的 OpenAI API Key（格式：`sk-...`）  
   **环境：** Production（以及 Preview 如果需要）

5. 点击 **Save**

### 3. 重新部署

- 如果代码已推送，Cloudflare Pages 会自动重新部署
- 或者手动触发：**Deployments** → **Retry deployment**

## 📁 项目结构

```
AI_playground/
├── functions/
│   └── api/
│       └── chat.js          # Cloudflare Pages Function（后端代理）
├── index.html               # 主页面
├── dataset.json             # 数据集（GPT 参考数据）
├── config.js                # 配置文件（仅模型设置）
└── .gitignore              # Git 忽略文件
```

## 🔒 安全说明

- ✅ **API Key 安全**：API Key 存储在 Cloudflare Pages 的环境变量中，不会暴露给前端
- ✅ **后端代理**：所有 OpenAI API 请求通过 `/api/chat` 端点代理
- ✅ **无需前端配置**：用户无需输入 API Key，可直接使用

## 🧪 本地测试

### 使用本地服务器（不包含 Functions）

本地测试时，Functions 不会运行。你可以：

1. **临时修改前端代码**：在 `index.html` 中临时将 `API_ENDPOINT` 改为直接调用 OpenAI API（仅用于本地测试）

2. **使用 Wrangler 本地开发**（推荐）：
   ```bash
   npm install -g wrangler
   wrangler pages dev
   ```
   然后设置环境变量：
   ```bash
   wrangler pages secret put OPENAI_API_KEY
   ```

## 📝 配置说明

### config.js

```javascript
const CONFIG = {
  OPENAI_MODEL: 'gpt-4o-mini',  // 可选：使用的模型
};
```

### 环境变量

在 Cloudflare Pages 中设置：
- `OPENAI_API_KEY`: 你的 OpenAI API Key

## 🎯 功能特性

- ✅ 使用 `dataset.json` 作为 GPT 的参考数据
- ✅ 严格限制 GPT 只使用数据集中的信息
- ✅ 流式响应，实时显示回复
- ✅ API Key 安全存储在服务器端

## 📚 相关文档

- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [OpenAI API Documentation](https://platform.openai.com/docs)


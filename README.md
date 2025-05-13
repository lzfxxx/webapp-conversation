# Conversation Web App Template

本项目基于 [Next.js](https://nextjs.org/)，适合快速搭建对话类 Web 应用。

## 新增功能说明

- **使用次数限制**：每个用户（基于 session_id）每周最多可使用 20 次，超出后将被限制访问。
- **品牌与 Logo 可自定义**：已支持替换为浙江大学 logo 和"浙大教学助手"品牌名。
- **HTML 预览区支持新页面打开**：每个 HTML 预览 iframe 区域可一键新开标签页查看完整内容。
- **本地文件存储**：使用次数记录保存在 `data/usage.json`，需保证该文件有写权限。

## 配置方法

1. 新建 `.env.local`，内容参考 `.env.example`：
```
# APP ID: This is the unique identifier for your app. You can find it in the app's detail page URL. 
# For example, in the URL `https://cloud.dify.ai/app/xxx/workflow`, the value `xxx` is your APP ID.
NEXT_PUBLIC_APP_ID=

# APP API Key: This is the key used to authenticate your app's API requests. 
# You can generate it on the app's "API Access" page by clicking the "API Key" button in the top-right corner.
NEXT_PUBLIC_APP_KEY=

# APP URL: This is the API's base URL. If you're using the Dify cloud service, set it to: https://api.dify.ai/v1.
NEXT_PUBLIC_API_URL=
```
2. 详细品牌信息、标题等可在 `config/index.ts` 配置：
```js
export const APP_INFO: AppInfo = {
  title: '浙大教学助手',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'zh-Hans'
}

export const isShowPrompt = true
export const promptTemplate = ''
```

## 启动方式

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)

## Docker 部署

```bash
docker build . -t <DOCKER_HUB_REPO>/webapp-conversation:latest
docker run -p 3000:3000 <DOCKER_HUB_REPO>/webapp-conversation:latest
```

## 其他说明

- 若需自定义 logo，请替换 `public/zju_logo.png` 并修改相关组件。
- 使用次数限制依赖 `data/usage.json`，如部署到无状态环境请自行实现持久化。
- 详细 Next.js 用法请参考官方文档。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

> ⚠️ If you are using [Vercel Hobby](https://vercel.com/pricing), your message will be truncated due to the limitation of vercel.


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

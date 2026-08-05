# Shopify 本地开发项目

## 已确认的目标

- Shopify 店铺：`a0pifv-0b.myshopify.com`（后台显示为“我的商店”）
- 线上主题：`Rise`（ID `183325196585`）
- 安全开发副本：`Rise - Local Development 2026-08-05`（ID `183371628841`，未发布）
- Dev Dashboard 组织：`我的商店`（ID `229106033`）
- App：`My Store Custom App Dev`
- App Dev Store：`my-store-custom-app-dev-2026-08-05.myshopify.com`（Basic 测试套餐，含测试数据）

线上主题没有被发布、覆盖或直接用于日常开发。

## 目录

```text
shopify-project/
├── .nvmrc          # Node.js 22
├── app/            # React Router + TypeScript Shopify App
└── theme/          # Rise 未发布副本的本地主题代码
```

## 首次打开终端

```bash
cd /Users/tianchuang/Documents/Codex/2026-08-05/referenced-chatgpt-conversation-this-is-an/outputs/shopify-project
nvm use
shopify auth login
```

不要把访问令牌、店铺密码或 `.env` 文件提交到 Git。

## 主题开发

```bash
cd /Users/tianchuang/Documents/Codex/2026-08-05/referenced-chatgpt-conversation-this-is-an/outputs/shopify-project/theme
nvm use
shopify theme check
shopify theme dev \
  --store my-store-custom-app-dev-2026-08-05.myshopify.com
```

此命令会在新 Dev Store 中创建临时 development theme，不会发布或覆盖主题。Dev Store 启用了前台密码保护；启动 `theme dev` 时，CLI 会在终端中安全地提示输入该测试店铺的前台密码。不要把密码写进命令、脚本或 Git。

如果需要直接预览原店铺中的未发布副本，可改用：

```bash
shopify theme dev \
  --store a0pifv-0b.myshopify.com \
  --theme 183371628841
```

## App 开发

```bash
cd /Users/tianchuang/Documents/Codex/2026-08-05/referenced-chatgpt-conversation-this-is-an/outputs/shopify-project/app
nvm use
npm install
npm run typecheck
npm run build
shopify app dev \
  --store my-store-custom-app-dev-2026-08-05.myshopify.com
```

App 已获得以下权限，且只在新建的 Dev Store 中用于开发测试：

- `write_products`
- `write_metaobjects`
- `write_metaobject_definitions`

Shopify CLI 默认通过临时 Cloudflare 隧道提供 HTTPS 预览。如果 Chrome 显示 `ERR_CONNECTION_CLOSED`，而 CLI 仍显示 `Ready`，通常是本机代理阻止了 `trycloudflare.com`；App 服务和隧道可以继续从终端验证。若要完全绕过隧道，需要另行安装并信任本地开发证书。

## 已完成验证

- Node.js 22 LTS、npm、Git 2.50.1、Shopify CLI 4.6.0 可用。
- 主题代码已从未发布副本拉取；Theme Check 检查 169 个文件，0 个错误、8 个原主题警告。
- App 依赖已安装，TypeScript 类型检查通过。
- App 配置校验通过，React Router 生产构建通过。
- Prisma SQLite 数据库已初始化，迁移状态正常。
- `theme dev` 已分别对原店铺副本和新 Dev Store 验证到安全的店铺密码输入步骤；需要在本机终端交互输入前台密码后开始预览。
- `app dev` 已关联新 Dev Store，并达到 `Ready, watching for changes` 状态；代理、GraphiQL、Prisma 与 React Router 均已启动。

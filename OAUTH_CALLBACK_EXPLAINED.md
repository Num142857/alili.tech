# Authorization Callback URL 详解

## 什么是 Authorization Callback URL？

**Authorization callback URL**（授权回调 URL）是 GitHub OAuth 授权流程中的一个关键配置。

### 工作流程

1. 用户访问 `https://alili.tech/admin/`
2. 点击 "Login with GitHub"
3. 跳转到 GitHub 授权页面
4. 用户授权后，GitHub 会重定向回你的网站
5. **回调 URL 就是 GitHub 重定向的目标地址**

## 为什么必须是 `/admin/`？

因为你的 Decap CMS 入口文件在：
```
static/admin/index.html
```

Hugo 会将 `static/` 目录下的文件直接复制到网站根目录，所以：
- 文件路径：`static/admin/index.html`
- 访问 URL：`https://alili.tech/admin/` 或 `https://alili.tech/admin/index.html`

## 正确的配置值

### 生产环境（正式网站）
```
https://alili.tech/admin/
```

### 本地开发环境（可选）
如果你想在本地测试，可以创建第二个 OAuth App：
```
http://localhost:1313/admin/
```

## 常见错误

### ❌ 错误示例
```
https://alili.tech/admin          # 缺少末尾斜杠
https://alili.tech/               # 不是 CMS 入口
https://alili.tech/admin/index.html  # 虽然可以工作，但不推荐
```

### ✅ 正确示例
```
https://alili.tech/admin/
```

## 如何验证配置是否正确？

1. 创建 OAuth App 后，访问：`https://alili.tech/admin/`
2. 点击 "Login with GitHub"
3. 如果授权后能正常跳转回 CMS 界面，说明配置正确
4. 如果出现 "redirect_uri_mismatch" 错误，说明回调 URL 配置错误

## 修改回调 URL

如果填错了，可以编辑已创建的 OAuth App：
1. 访问：https://github.com/settings/developers/oauth_apps
2. 点击你的 OAuth App
3. 点击 "Edit" 或直接修改 "Authorization callback URL"
4. 保存更改

## 技术细节

- GitHub OAuth 会验证回调 URL 是否与注册的完全匹配
- 必须包含协议（`https://`）
- 必须包含完整域名
- 路径必须精确匹配（包括末尾斜杠）
- 不支持通配符或正则表达式


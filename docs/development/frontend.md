---
title: 前端开发
---

# 子应用前端开发

如果你对自强 Auth 前端有什么问题或建议，欢迎给自强 Auth [提 issue](https://github.com/ZiqiangStudio/zq_auth_frontend/issues)

## 说明

1. 子应用前端需要接入自强 Auth 页面，用户在自强 Auth 页面进行登录、注册、认证操作
2. 子应用通过自强 Auth 页面获取到 code 之后，需要将 code 传入子应用后端获取用户信息，前端无法直接通过 code 获取用户信息
3. 子应用无法自定义自强 Auth UI/UX，如果自强 Auth UI/UX 无法满足业务需要，可以通过自强 Auth API 接口自行接入自强 Auth。参考[API文档](https://console-docs.apipost.cn/preview/aa7462561f5a5202/d7b7f62f186a37d9)、[自强 Auth 前端源码](https://github.com/ZiqiangStudio/zq_auth_frontend)

## 接入方式

1. Web 打开新页面接入：在 web 中通过 `window.open` 打开自强 Auth 页面，同时 `window` 监听 `message` 事件。Auth 登录或认证成功后会向 `window` 发送 `message`。参考[示例](https://github.com/ZiqiangStudio/zq_auth_frontend/blob/master/examples/h5/index.html)
2. Web 或 App 重定向接入：在 web 或 app 中重定向到自强 Auth 页面并传入 `redirect-uri`。Auth 登录或认证成功后会重定向到 `redirect-uri` 并在 `query` 中携带回调数据。
3. 小程序 web-view 接入：在小程序中通过 `web-view` 打开自强 Auth 页面，同时监听 `web-view` 的 `message` 事件。Auth 登录或认证成功后会向小程序发送 `message` 并回退。参考[示例](https://github.com/ZiqiangStudio/zq_auth_frontend/tree/master/examples/wxapp/pages/login-webview)

::: warning 接入注意事项
1. 小程序接入时建议检查传递给 `web-view` 的URL中是否含有中文，如果有，请使用 `encodeURIComponent()` 进行编码URL，避免出现一些[问题](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html#Bug-Tip)
2. 小程序接入时，需要保证小程序已获得**非个人主体身份**，并在小程序内使用 `web-view` 组件进行接入，在登录时需要跳转到**单独的 `web-view` 页**，参考[示例](https://github.com/ZiqiangStudio/zq_auth_frontend/blob/master/examples/wxapp/pages/login-webview/login-webview.wxml)。因为在登录或认证成功后页面会主动回退到前一页，参考[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
:::

::: tip
网页向小程序 postMessage 时，会在以下特定时机触发并收到消息：小程序后退、组件销毁、分享、复制链接
:::

## 页面参数

页面通过 `query` 传参，参数类型均为字符串 string。

::: danger
目前只支持子应用**直接访问** [/login](https://cas.ziqiang.net.cn/login) 页面，直接访问其他页面可能会导致未知的后果。
:::

### 登录页面

```
https://cas.ziqiang.net.cn/login
```

| 参数 | 必填/默认值 | 合法值 | 说明 |
| --- | --- | --- | --- |
| app-name | **必填** | 子应用英文名 | 用于生成对应的 code |
| app-logo | **必填** | 子应用 logo url | 用于在自强 Auth 页面展示，待 [此issue](https://github.com/ZiqiangStudio/zq_auth_backend/issues/4) close 之后无需填写 |
| wxapp | false | true/false | 是否是微信小程序。在微信小程序模式下打开会通过 wxsdk 返回数据，同时会隐藏页面内回退按钮 |
| certify-only | false | true/false | 是否只进行认证，不进行登录。仅认证时，返回数据格式为 `{ is_certified: true }`，暂时不支持 `response-type` |
| redirect-uri | 无 | 登录成功后跳转地址 | 登录成功后的回调页面 |
| response-type | code | 登录成功后返回字段名 | |
| state | 无 | 登录成功后跳转时传参 | 仅重定向接入 |
| manually | false | true/false | 是否禁止自动登录 |

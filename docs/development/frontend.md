---
title: 前端开发
---

# 子应用前端开发

## 说明

1. 子应用前端需要展示自强 Auth 页面，用户在自强 Auth 页面进行登录、注册、认证操作
2. 子应用前端需要在登录页面中填写`app_name`、`app_logo`、`callback_url`，以便自强 Auth 页面展示，具体格式为

```
https://cas.ziqiang.net.cn/login?app-name=&app-logo=&callback_url
```

其中：
- app_name：子应用英文名，用于生成对应的 code
- app_logo：子应用 logo url，用于在自强 Auth 页面展示
- callback_url：子应用登录成功后的回调地址，用于自强 Auth 页面登录成功后重定向到子应用并传送code
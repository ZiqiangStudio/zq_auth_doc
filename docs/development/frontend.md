---
title: 前端开发
---

# 子应用前端开发

## 说明

1. 子应用前端需要展示自强 Auth 页面，用户在自强 Auth 页面进行登录、注册、认证操作

## 页面参数

### login页面

```
https://cas.ziqiang.net.cn/login
```

其中：
| 参数 | 值 | 说明 |
| --- | --- | --- |
| app_name | 【必填】子应用英文名 | 用于生成对应的 code |
| app_logo | 【必填】子应用 logo url | 用于在自强 Auth 页面展示 |
| wxapp | 【默认False】True/False | 是否是微信小程序 |
| certify-only | 【默认False】True/False | 是否只进行认证，不进行登录 |
| redirect-uri | 【默认为空】跳转地址 | 登录成功后的回调页面 |
| response-type | 【默认code】 | |
| state | 【默认为空】 | |

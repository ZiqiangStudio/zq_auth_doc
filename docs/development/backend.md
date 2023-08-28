---
title: 后端开发
---

# 子应用后端开发

## 说明

1. 所有后端所需接口可在 [ApiPost](https://console-docs.apipost.cn/preview/aa7462561f5a5202/d7b7f62f186a37d9) 中查看
   ::: warning
   本页面接口可能更新不及时，请以 ApiPost 的文档为准
   :::
2. 目前提供了一些简单的 SDK 用于简化开发，可在 [SDK](/sdk/) 中查看

## 接口

### APP 登录

后端需要在本地凭借 `app_key`, `app_secret` 向自强 Auth 平台获取 `zq_auth token`([接口详情](https://console-docs.apipost.cn/preview/aa7462561f5a5202/d7b7f62f186a37d9?target_id=f3dd4470-fee8-4bcf-a9f1-7570c4392068))，用于后续访问自强 Auth 平台的接口

- 请求

```http request
POST https://api.cas.ziqiang.net.cn/sso/union-id/

{
    "app_key": "App Key",
    "app_secret": "App Secret"
}
```

- 响应

```json5
{
  "code": "00000",
  "detail": "",
  "msg": "",
  "data": {
    "id": 9,  // app id
    "username": "app name",  // app 英文标识
    "name": "项目中文名",
    "expire_time": "2023-03-07T09:16:15.844900Z",  // access token 过期时间
    "access": "xxx.xxx.xxx",  // access token
    "refresh": "xxx.xxx.xxx",  // refresh token，使用方法请参考 ApiPost 文档
  }
}
```

### union_id 获取

子应用前端获取到 `code` 后，需要调用子应用后端的登录接口，子应用后端凭借 `code` 向自强 Auth 平台获取 `union_id`([接口详情](https://console-docs.apipost.cn/preview/aa7462561f5a5202/d7b7f62f186a37d9?target_id=7e2e0cec-8b99-47bf-8a64-67d98d0a4799))，用于后续获取用户信息

子应用后端获取到 `union id` 后，可以在本地数据库中查找到对应的用户，并做登录操作，登录成功后生成 `app token`，并返回给子应用前端

- 请求

```http request
POST https://api.cas.ziqiang.net.cn/sso/union-id/

Authentication: Bearer ${zq_auth token}

{
    "code": "临时code"
}
```

- 响应

```json5
{
  "code": "00000",
  "detail": "",
  "msg": "",
  "data": {
    "union_id": "xxx"  // 用户 union_id
  }
}
```

### 用户信息获取

子应用后端可以通过 `union id` 获取用户信息([接口详情](https://console-docs.apipost.cn/preview/aa7462561f5a5202/d7b7f62f186a37d9?target_id=7e2e0cec-8b99-47bf-8a64-67d98d0a4799))，用于更新用户信息

- 请求

```http request
GET https://api.cas.ziqiang.net.cn/users/${union_id}/?detail=false

Authentication: Bearer ${zq_auth token}

```

detail: 是否返回用户详细信息，默认为 false，即仅返回 `is_certified` 和 `certify_time` 字段

- 正常响应

```json5
{
  "code": "00000",
  "detail": "",
  "msg": "",
  "data": {
    "name": "测试",  // 用户姓名
    "student_id": "2020302100000",  // 用户学号
    "phone": "18312341233",  // 用户手机号
    "is_certified": true,  // 用户是否通过学生认证
    "certify_time": "2023-03-07T16:51:00+08:00",  // 用户认证时间，未认证为 null
    "update_time": "2023-03-07T16:51:43.569624+08:00"  // 用户信息更新时间
  }
}
```

- union id无效（用户注销或解除学生认证） (404)

```json5
{
  "code": "A0514",
  "detail": "请求资源不存在",
  "msg": "请求资源不存在",
  "data": {
    "eid": null,
    "time": "2023-03-07T10:38:59.000682Z",
    "details": null
  }
}
```

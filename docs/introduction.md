---
title: 介绍
---

# 什么是自强 Auth

自强 Auth 是一个基于学生信息的统一认证服务，旨在为第三方应用（下称`子应用`）提供便捷的学生统一认证服务。

## Motivation

在自强项目开发中，每个子应用都要准备一套用户注册登录接口、用户信息更新接口，用户在使用每个自强应用时都需要重新注册，填写个人信息。若应用需要进行学生身份认证，用户还需要多次进行认证操作。

为了简化后端开发以及提升用户体验，我们仿照[微信小程序用户认证](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
以及[武大 CAS 登录服务](https://cas.whu.edu.cn/)制作了`自强 Auth` 统一认证服务平台：

- 为后端提供统一登录接口，统一用户标识，以及用户必要身份信息
- 为用户提供统一登录界面及账户，一个账户登录多个应用，一次认证享受多个应用服务

## 术语

为了方便理解，我们在这里定义一些术语：

### 应用

- 自强 Auth：统一认证服务平台，本项目
- 子应用：使用`自强 Auth`服务的应用，例如`招新小程序`、`赛道友你`等
- App Name：`子应用标识`，即`子应用`的英文名，例如 `zq_recruitment`, `zq_teamup` 等
- App Key：`子应用`在`自强 Auth`平台的唯一标识，由`自强 Auth`平台生成（类似于登录用户名）
- App Secret：`子应用`在`自强 Auth`平台的密钥，由`自强 Auth`平台生成（类似于登录密码）
- App Logo：`子应用`在`自强 Auth`平台的图标，用于在`自强 Auth`平台展示
- Zq_Auth Token：jwt token，`子应用`在`自强 Auth`平台的访问令牌，用于`子应用`访问`自强 Auth`平台的接口
- APP Token：jwt token，`子应用`自身的访问令牌，用于`子应用`前端访问自身后端的接口

### 用户

- `用户`：使用`自强 Auth`服务的用户，即`子应用`的用户
- `用户信息`：`用户`在`自强 Auth`平台中登记的个人信息，包括`姓名`、`学号`、`手机号`、`是否通过学生认证`等
- `UnionId`：`用户`在`自强 Auth`平台的唯一标识，格式为不含 `-` 的 `UUID` 字符串，子应用需要保存`UnionId`，以便后续获取用户信息
- `Code`：`用户`在`自强 Auth`平台的临时登录凭证，有效期为 5 分钟，子应用凭借 `Code` 获取`UnionId`

## 服务流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant AppFront as 子应用前端
    participant AuthFront as 自强 Auth 前端
    participant AppBack as 子应用后端
    participant AuthBack as 自强 Auth 后端
    
    AppBack ->> AuthBack: 子应用登录
    AuthBack -->> AppBack: zq_auth token
    
    User ->> AppFront: 请求登录
    AppFront ->> AppFront: 根据 app_name, app_logo, callback_url <br/> 计算登录页面
    AppFront ->> AuthFront: 请求登录页面
    AuthFront -->> User: 展示自强 Auth 登录页面
    
    alt 进行注册、认证操作
    User ->> AuthFront: 注册、认证
    AuthFront ->> AuthBack: 进行注册、认证操作
    AuthBack -->> AuthFront: 返回注册、认证结果
    AuthFront -->> User: 展示注册、认证结果
    end
    
    User ->> AuthFront: 输入登录凭证
    AuthFront ->> AuthBack: 进行自强 Auth 登录
    AuthBack -->> AuthFront: 发送临时 code
    AuthFront -->> AppFront: 重定向到 <br/> callback_url?code=临时code
    AppFront ->> AppBack: 调用 APP 后端登录接口 <br/> 发送临时 code
    AppBack ->> AuthBack: APP 调用 /sso/union-id/ 接口 <br/> 发送临时 code
    AuthBack -->> AppBack: 返回 union_id
    AppBack ->> AppBack: 获取用户信息 <br/> 生成 app token及相关信息
    AppBack -->> AppFront: 返回 app token 及登录信息
    AppFront ->> User: 登录成功 
```


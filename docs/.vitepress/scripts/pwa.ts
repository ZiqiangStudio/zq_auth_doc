// https://vite-pwa-org.netlify.app/

import {VitePWAOptions} from "vite-plugin-pwa";
import {description, title} from "./meta";

const pwa: Partial<VitePWAOptions> = {
  outDir: ".vitepress/dist", // 输出目录
  registerType: "autoUpdate", // 注册类型为自动更新
  includeManifestIcons: false, // 不包含清单图标
  manifest: {
    id: "/", // 清单 ID
    name: title, // 应用名称
    short_name: title, // 应用的短名称
    description: description, // 应用的描述
    theme_color: "#ffffff", // 主题颜色
    icons: [
      {
        src: "/images/pwa-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/images/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
  workbox: {
    globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,woff2}"], // 匹配需要缓存的文件类型
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, // 匹配需要缓存的 Google 字体
        handler: "CacheFirst", // 缓存优先策略
        options: {
          cacheName: "google-fonts-cache", // 缓存名称
          expiration: {
            maxEntries: 10, // 最大缓存条目数
            maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
          },
          cacheableResponse: {
            statuses: [0, 200], // 缓存的响应状态码
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i, // 匹配需要缓存的 Google 字体
        handler: "CacheFirst", // 缓存优先策略
        options: {
          cacheName: "gstatic-fonts-cache", // 缓存名称
          expiration: {
            maxEntries: 10, // 最大缓存条目数
            maxAgeSeconds: 60 * 60 * 24 * 365, // 缓存有效期，365天
          },
          cacheableResponse: {
            statuses: [0, 200], // 缓存的响应状态码
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i, // 匹配需要缓存的 jsdelivr 图片
        handler: "NetworkFirst", // 网络优先策略
        options: {
          cacheName: "jsdelivr-images-cache", // 缓存名称
          expiration: {
            maxEntries: 10, // 最大缓存条目数
            maxAgeSeconds: 60 * 60 * 24 * 7, // 缓存有效期，7天
          },
          cacheableResponse: {
            statuses: [0, 200], // 缓存的响应状态码
          },
        },
      },
    ],
  },
}

export default pwa;
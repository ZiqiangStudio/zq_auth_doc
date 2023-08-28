import { withMermaid } from "vitepress-plugin-mermaid";
import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import {description, title} from "./scripts/meta";
import pwa from "./scripts/pwa";
import head from "./scripts/head";
import {
  generateSiteMap,
  generateSitemapJsonUrlLinks,
  generateTodaySitemapTxtUrlLinks
} from "./scripts/sitemap";
import themeConfig from "./scripts/theme";

export default withPwa(
  withMermaid(
    defineConfig({
      lang: 'zh-cn',
      title: title,
      description: description,
      pwa,
      head,
      vite: {
        server: {
          port: 4000,
          host: '127.0.0.1'
        },
      },
      lastUpdated: true,
      themeConfig,
      async buildEnd(siteConfig) {
        // 生成sitemap.xml
        await generateSiteMap(siteConfig);
        // 生成sitemap.json
        generateSitemapJsonUrlLinks(siteConfig);
        // 生成today-sitemap.txt
        generateTodaySitemapTxtUrlLinks(siteConfig);
      },
  })))
import {withMermaid} from "vitepress-plugin-mermaid";
import {defineConfig} from "vitepress";

export default withMermaid(
  defineConfig({
    lang: 'zh-cn',
    title: '自强 Auth',
    description: '自强账号统一认证服务',
    head: [
      ['link', {rel: 'icon', href: '/favicon.ico', type: 'image/png'}],
      [
        'link',
        {
          rel: 'alternate icon',
          href: '/favicon.ico',
          type: 'image/png',
          sizes: '16x16'
        }
      ],
      ['meta', {name: 'author', content: 'Nagico@自强Studio'}],
      ['link', {rel: 'mask-icon', href: '/favicon.ico', color: '#ffffff'}],
      [
        'link',
        {rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180'}
      ],
    ],
    vite: {
      server: {
        port: 4000,
        host: '127.0.0.1'
      },
    },
    lastUpdated: true,
    themeConfig: {
      lastUpdatedText: '上次更新于',
      footer: {
        message:
          '<a target="_blank" href="https://beian.miit.gov.cn/">鄂ICP备20004406号-1</a>',
        copyright: ` © 2022-2023 <a target="_blank" href="https://ziqiang.net.cn/">武汉大学自强网络文化工作室</a> 保留所有权利。`
      },
      logo: '/icon/logo.svg',
      editLink: {
        pattern:
          'https://github.com/ZiqiangStudio/zq_auth_doc/tree/master/packages/blogpress/:path',
        text: '去 GitHub 上编辑内容'
      },
      socialLinks: [
        {icon: 'github', link: 'https://github.com/ZiqiangStudio/zq_auth_doc'}
      ],
      nav: [
        {text: '首页', link: '/'},
        {text: '介绍', link: '/introduction'},
        {
          text: '开发指南',
          items: [
            {text: '应用接入', link: '/development/'},
            {text: '前端开发', link: '/development/frontend'},
            {text: '后端开发', link: '/development/backend'},
          ]
        },
        {
          text: 'SDK',
          items: [
            {text: 'SDK介绍', link: '/sdk/'},
            {text: 'Python SDK', link: '/sdk/python'},
          ]
        }]
    },
  }))
import {DefaultTheme} from "vitepress";

const nav: DefaultTheme.NavItem[] = [
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

export default nav
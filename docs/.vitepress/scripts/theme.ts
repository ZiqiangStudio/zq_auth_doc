import {DefaultTheme} from "vitepress";
import nav from "./sidebar";
import {github} from "./meta"
import algolia from "./algolia"

const themeConfig: DefaultTheme.Config = {
  lastUpdatedText: '上次更新于',
  footer: {
    message:
      '<a target="_blank" href="https://beian.miit.gov.cn/">鄂ICP备20004406号-1</a>',
    copyright: ` © 2022-2023 <a target="_blank" href="https://ziqiang.net.cn/">武汉大学自强网络文化工作室</a> 保留所有权利。`
  },
  logo: '/images/logo.svg',
  editLink: {
    pattern:
      `${github}/blob/master/docs/:path`,
    text: '去 GitHub 上编辑内容'
  },
  socialLinks: [
    {icon: 'github', link: github}
  ],
  nav,
  search: {
    provider: 'algolia',
    options: algolia
  }
}

export default themeConfig
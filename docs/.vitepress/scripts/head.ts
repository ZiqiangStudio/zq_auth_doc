import {HeadConfig} from "vitepress";
import {developerName, keywords} from "./meta";

const head: HeadConfig[] = [
  ["meta", { name: "referrer", content: "no-referrer-when-downgrade" }],
  ["meta", { name: "keywords", content: keywords }],
  ["meta", { name: "application-name", content: developerName }],
  ["meta", { name: "apple-mobile-web-app-title", content: developerName }],
  [
    "meta",
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ],
  ['meta', {name: 'author', content: developerName}],
  ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  ['link', {rel: 'mask-icon', href: '/favicon.ico', color: '#ffffff'}],
  [
    'link',
    {rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180'}
  ],
];

export default head;
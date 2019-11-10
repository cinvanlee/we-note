import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavHubService {
    sites = [
        {
            title: '技术文档',
            links: [
                { title: 'MDN', url: 'https://developer.mozilla.org/zh-CN/' },
                { title: 'jQuery', url: 'http://hemin.cn/jq/' },
                { title: 'Lodash', url: 'https://www.lodashjs.com/docs/latest' },
                { title: 'Moment', url: 'http://momentjs.cn/docs/' },
                { title: 'Enzyme', url: 'https://airbnb.io/enzyme/' },
                { title: '微信小程序', url: 'https://developers.weixin.qq.com/miniprogram/dev/api/' },
                { title: 'uni-app', url: 'https://uniapp.dcloud.io/' },
                { title: 'Node.js', url: 'http://nodejs.cn/api/' },
                { title: 'Ant Design', url: 'https://ant.design/docs/react/introduce-cn' },
                { title: 'Element UI', url: 'https://element.eleme.io/#/zh-CN/component/installation' },
                { title: 'Weex', url: 'https://weex.apache.org/zh/docs/api/weex-variable.html' }
            ]
        },
        {
            title: '社区',
            links: [
                { title: 'Github', url: 'https://github.com/' },
                { title: 'Github Trending', url: 'https://github.com/trending' },
                { title: 'Gist', url: 'https://gist.github.com/' },
                { title: 'v2ex', url: 'https://www.v2ex.com/' },
                { title: 'CNode', url: 'https://cnodejs.org/' },
                { title: 'Medium', url: 'https://medium.com/' },
                { title: 'Stack Overflow', url: 'https://stackoverflow.com/' },
                { title: 'SegmentFault', url: 'https://segmentfault.com/' }
            ]
        },
        {
            title: '前端周刊',
            links: [
                { title: '奇舞周刊', url: 'https://weekly.75team.com/' },
                { title: '阮一峰周刊', url: 'http://www.ruanyifeng.com/blog/weekly/' },
                { title: 'JS Weekly', url: 'https://javascriptweekly.com/issues' },
                { title: 'Pony Foo Weekly', url: 'https://ponyfoo.com/weekly' },
                { title: 'CSS Weekly', url: 'https://css-weekly.com/archives/' },
                { title: 'JS Kicks', url: 'https://javascriptkicks.com/stories' },
                { title: 'Frontend Focus', url: 'https://frontendfoc.us/issues' },
                { title: '编程书籍', url: 'https://github.com/justjavac/free-programming-books-zh_CN' }
            ]
        },
        {
            title: '技术博客',
            links: [
                { title: '阮一峰', url: 'http://www.ruanyifeng.com/blog/javascript/' },
                { title: '王垠', url: 'http://www.yinwang.org/' },
                { title: '张鑫旭', url: 'https://www.zhangxinxu.com/' },
                { title: '纯洁的微笑', url: 'http://www.ityouknow.com/' },
                { title: '廖雪峰', url: 'https://www.liaoxuefeng.com/' },
                { title: '现代简明魔法', url: 'http://www.nowamagic.net/' },
                { title: '囧克斯', url: 'https://jiongks.name/' },
                { title: '百度EFE', url: 'https://efe.baidu.com/' },
                { title: '', url: '' }
            ]
        },
        {
            title: '技术团队',
            links: [
                { title: '美团技术团队', url: 'https://tech.meituan.com/' },
                { title: '博客园团队', url: 'https://www.cnblogs.com/cmt' },
                { title: 'Daily JS', url: 'https://medium.com/dailyjs' },
                { title: 'Echo JS', url: 'https://www.echojs.com/' },
                { title: '阿里中间件团队', url: 'http://jm.taobao.org/' },
                { title: '有赞技术团队', url: 'https://tech.youzan.com/' },
                { title: '淘宝技术团队', url: 'https://fed.taobao.org/' },
                { title: '凹凸实验室', url: 'https://aotu.io/' }
            ]
        }
    ];

    constructor() {
    }
}

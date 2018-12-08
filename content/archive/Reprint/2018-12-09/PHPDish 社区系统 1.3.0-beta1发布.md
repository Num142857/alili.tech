---
title: 'PHPDish 社区系统 1.3.0-beta1发布' 
date: 2018-12-09 2:30:08
hidden: true
slug: lwfk0wapcsd
categories: [reprint]
---

{{< raw >}}

                    
<p>经过小半个月的调整与开发现在 PHPDish 迎来了新一个测试版本 1.3.0-beta1； 这个版本主要以优化代码为主，使代码结构看起来更健康更合理，更新内容如下：</p>
<p>Fixed:</p>
<ul>
<li>修复电子书阅读目录显示不正确的问题</li>
<li>修复电子书页面错误</li>
<li>修改文案</li>
<li>调整有赞支付sdk为beta版</li>
<li>修复用户的电子书与话题数量字段不准确的问题</li>
<li>修复艾特楼主楼主会收到提醒的问题</li>
<li>修复部分接口暴露过多字段的问题</li>
</ul>
<p>Added:</p>
<ul>
<li>增加模板函数，允许在模板里直接获取相关数据</li>
<li>增加多主题模板支持</li>
<li>增加插件支持</li>
<li>数据模型层优化，将实体元格式从 annotation 调整为 xml</li>
<li>增加支持电子书目录顺序调整</li>
<li>新增主题列表打印命令与主题资源安装命令</li>
<li>优化部分 bundle 的别名</li>
<li>从核心代码抽离每日一首歌的功能到插件，如果需要的话安装该插件即可</li>
<li>增加找回密码流程</li>
<li>增加话题/回复/文章/评论点赞功能</li>
<li>优化文章页数据库查询</li>
<li>提取注册提醒的内容和发信人到参数配置</li>
<li>优化搜索业务逻辑，为实现在插件中提供搜索服务做基础</li>
<li>迁移升级 algolia 搜索依赖到最新版本</li>
<li>优化代码结构，将大多数不会变的代码提取到底层</li>
</ul>
<p>本版本新增了模板函数、主题以及插件支持，这也意味着 PHPDish 开始支持功能扩展以及模板开发工作；开发手册看这里:<br><a href="https://www.phpdish.com/books/docs/summary" rel="nofollow noreferrer" target="_blank">PHPDish 开发手册</a></p>
<p>官网: <a href="https://www.phpdish.com" rel="nofollow noreferrer" target="_blank">https://www.phpdish.com</a><br>Github: <a href="https://github.com/slince/phpdish" rel="nofollow noreferrer" target="_blank">https://github.com/slince/php...</a><br>Gitee: <a href="https://gitee.com/slince/phpdish" rel="nofollow noreferrer" target="_blank">https://gitee.com/slince/phpdish</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PHPDish 社区系统 1.3.0-beta1发布

## 原文链接
[https://segmentfault.com/a/1190000013876436](https://segmentfault.com/a/1190000013876436)


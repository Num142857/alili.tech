---
title: '用vue简单实现知乎日报' 
date: 2019-02-06 2:30:09
hidden: true
slug: wrkud8yfv6
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">用vue简单实现知乎日报</h1>
<h4>
<strong>前言</strong>：</h4>
<h5>想用vue构建知乎日报原因很简单，作为一个vue小白很需要亲手做个项目来提升提及以及更加深入了解vue，也希望这个小项目能给刚学习vue的同学一点启发。</h5>
<hr>
<h4>
<strong>准备工作</strong>：</h4>
<h5>首先要找到知乎日报的api，这里感谢 @<a href="https://github.com/izzyleung/ZhihuDailyPurify" rel="nofollow noreferrer" target="_blank">izzyleung</a> 总结的知乎日报api以及说明 因为原来的api不支持跨域嘛，需要自己代理这些api并允许跨域，这里我只代理了8个接口，接口以及参见本项目github的<a href="https://github.com/GaryChangCN/zhihu-daily-byVuejs/blob/master/server/readme.md" rel="nofollow noreferrer" target="_blank">readme</a>。之后再用nginx来反向代理接口。</h5>
<h4>
<strong>开发过程</strong>：</h4>
<h5>项目参考了vue官方提供的参考项目，使用了 <code>vue-router</code> 和 <code>vue-resource</code> 这两个插件，并且使用了<code>vue-cli</code> 这个脚手架工具来搭建webpack项目。之后就可以正式开发了，UI我大致模仿了知乎日报安卓客户端的UI但是没有实现其全部功能，以后会慢慢完善。对于vue的核心，组件部分，我这里写了6个组件，分别是导航栏组件、侧边栏组件、主页组件、轮播组件、主题列表组件、文章组件，考虑到要模仿客户端UI，这里组件样式全是用sass/css写的。我这里偷懒，响应式布局只写了最外面的container在屏幕宽度大于640px时候宽度调整为640px并且水平居中，所以建议在手机或F12手机模式下浏览demo，另外由于采用了flex布局，请使用现代浏览器。之后就是规划路由啦，然后做做简单的CSS3动画效果，demo就完工了，之后把demo上传到我1M带宽的小水管服务器上，静态文件挂在七牛云上，解决。</h5>
<h5>（<strong>Tips</strong>：使用sublime的同学可以下载vue syntax highlight 这个插件来语法高亮.vue文件，但是，当你把&lt;style&gt;加上lang=”sass ”时，emmet语法会失效，我的解决方式是sublime右下角暂时更改语法模式为html，另外格式化.vue代码用HTML-CSS-JS Prettify插件并在其配置文件中加上vue即可）。</h5>
<h4>
<strong>图片防盗链</strong>：</h4>
<h5>当我遇到知乎日报图片防盗链时候我是拒绝的，因为一直提示<code>403</code>，我不能确定是<code>webpack-dev-server</code>出问题还是<code>nginx</code>出问题或者是知乎封了我等等，后来发现如果我挂上ss，或者直接本地打开项目文件，图片是能正常打开的，然后我就意识到是防盗链问题，我的解决方式是用node来转发这些图片并更改请求<code>referer</code>头为www.zhihu.com然后问题就解决了，这里有个<strong>花絮</strong>：开始我把node <code>http.Request</code> 里面url对象的pathname写成了pathnnme然而我还没有发现导致返回的图片一直是本图片仅限在知乎内使用balabala的，我以为是服务器ip被封都放弃了，在上次检查时发现了这个bug然后图片就能正常显示了。</h5>
<hr>
<h4>
<strong>项目地址</strong>：</h4>
<p><a href="http://zhihu.garychang.cn" rel="nofollow noreferrer" target="_blank">Demo</a> <a href="http://zhihu.garychang.cn" rel="nofollow noreferrer" target="_blank">http://zhihu.garychang.cn</a> <br><a href="https://github.com/GaryChangCN/zhihu-daily-byVuejs" rel="nofollow noreferrer" target="_blank">Github</a> <a href="https://github.com/GaryChangCN/zhihu-daily-byVuejs" rel="nofollow noreferrer" target="_blank">https://github.com/GaryChangC...</a></p>
<hr>
<h4>
<strong>部分截图</strong> ：</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006111177" src="https://static.alili.tech/img/remote/1460000006111177" alt="1" title="1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000006765073" src="https://static.alili.tech/img/remote/1460000006765073" alt="1" title="1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000006111181" src="https://static.alili.tech/img/remote/1460000006111181" alt="1" title="1" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue简单实现知乎日报

## 原文链接
[https://segmentfault.com/a/1190000006095301](https://segmentfault.com/a/1190000006095301)


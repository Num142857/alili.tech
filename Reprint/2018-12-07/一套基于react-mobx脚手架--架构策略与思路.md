---
title: '一套基于react-mobx脚手架--架构策略与思路' 
date: 2018-12-07 2:30:10
hidden: true
slug: nr14p77zb
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">初衷</h3>
<p>刚入职一家公司，接手了前端工作。之前的架构采用gulp(task)-runWebpack的架构。本地起Caddy服务器。由于gulp跑webpack在dev开发时，是编译成静态文件写入硬盘。并且没有采用HMR（这个显然不是必要的）。起服务需要Caddy，并没有使用node server等。由于我确实不会使用Caddy等原因。打算重新搭建一套脚手架，达到尽量使用node解决。并提升性能开发。</p>
<h3 id="articleHeader1">脚手架地址</h3>
<p><a href="https://github.com/edwardxyt/edward-react-mobx" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/edwardxyt/edward-react-mobx" rel="nofollow noreferrer" target="_blank">https://github.com/edwardxyt/...</a><br>求求大爷们给个star吧！！！！！！<br>本篇文章只是在开发脚手架时候的思路，具体的使用方法请看<a href="https://github.com/edwardxyt/edward-react-mobx/blob/master/README.md" rel="nofollow noreferrer" target="_blank">ReadMe</a></p>
<h3 id="articleHeader2">待解决问题</h3>
<ol>
<li>环境有 development' 'production' 'test'。要根据环境判断是否开启debug，是否生成source-map,是否压缩等，</li>
<li>多项目，一套架构可以多入口，分别编译。因为公司有3条产品线。每一条里面还有多专题。web和wap页。所以一套脚手架要能支持多项目。</li>
<li>配置文件，要统一。并支持本地覆盖。</li>
<li>index.html要更强大。所以在这里要使用handlebars。</li>
<li>按需加载。SPA必做优化项。</li>
<li>ajax的封装也很重要。</li>
<li>编译策略（打包策略）。</li>
<li>工具函数库。</li>
<li>UI库。</li>
</ol>
<h3 id="articleHeader3">解决办法与思路（与上面列表对应）</h3>
<ol>
<li>在开发模式下，只有development，不压缩混淆代码，开启debug。开启Vconsole。<br>   这里使用dev-webpack-server。启动热替换和代理（代理用于本地使用<a href="https://github.com/Marak/Faker.js" rel="nofollow noreferrer" target="_blank">faker</a>与<a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a>）编译模式下要考虑production或者test 两者都是正式代码，区别在于是否开启debug和console。</li>
<li>考虑到多入口，我的解决方案是npm run dev --xxx 既传参数，并且--xxx和src的目录结构一样。在启动时候就可以确定要开发的某个项目的某个专题了。</li>
<li>我喜欢统一配置文件，好处在于管理脚手架只修改这里就可以了。<br>   策略：多次使用的字段提取到配置文件里。如果只使用一次，但有可能变动的字段提取到配置文件里。其他不变字段不提取，写死于webpack.config里。</li>
<li>使用handlebars的好处在于初始化项目时，增加了扩展性，而不是在jsx写入扩展，比如统计meta等。</li>
<li>react-router4 的按需加载不是很友善。这里引用了<a href="https://github.com/sanyuelanv/react-mobx-project" rel="nofollow noreferrer" target="_blank">sanyuelanv</a>的案例以及按需加载。这样在庞大的项目首次加载也不会很多。提升性能。很关键。</li>
<li>这里使用了<a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">axios</a>建议使用req和res的拦截器，它有四次可以覆盖配置传参数的生命周期。建议使用实例化。可以统一错误处理。统一响应格式。</li>
<li>开发模式development下、不压缩、不混淆、开启debug。<br>   编译模式test下、开启debug、压缩代码、开启source-map。<br>   编译模式production下、压缩混淆。开启兼容。提取合并css。提取合并JS。待发布正式服务器。</li>
<li>工具款使用了lodash和ramda习惯用什么你自己选择</li>
<li>antd 和 antd-mobile两个库。会根据你启动时候传入的 --MOBILE=true来分别加载。</li>
</ol>
<h3 id="articleHeader4">简化易读</h3>
<p>有些人喜欢把 webpack 做成 base.config、然后合并对象。生成对应的 development' or 'production'。但是我并不喜欢这种方式 首先模式下 只有 3 种 development' or 'production' 'test'。然后解耦的也并不是很多。且不易于读。我的策略是 不提取 baseConfg，只做整体项目的配置文件。这样易读 易于修改。</p>
<h3 id="articleHeader5">最后请求</h3>
<p>给个star、给个star、给个star、给个star、给个star、给个star、给个star、给个star、给个star、</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一套基于react-mobx脚手架--架构策略与思路

## 原文链接
[https://segmentfault.com/a/1190000014116015](https://segmentfault.com/a/1190000014116015)


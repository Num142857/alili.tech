---
title: '【推荐】开源项目minapp－重新定义微信小程序的开发' 
date: 2018-12-12 2:30:10
hidden: true
slug: o140ok3ry4i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">minapp</h1>
<p><strong>重新定义微信小程序的开发</strong></p>
<blockquote>官网：<a href="https://qiu8310.github.io/minapp/" rel="nofollow noreferrer" target="_blank">https://qiu8310.github.io/minapp/</a><p>作者：<a href="https://github.com/qiu8310" rel="nofollow noreferrer" target="_blank">Mora</a></p>
</blockquote>
<h1 id="articleHeader1">minapp</h1>
<p><strong>重新定义微信小程序的开发</strong></p>
<h2 id="articleHeader2">使用</h2>
<ol>
<li>用 npm 安装命令行工具： <code>npm install -g @minapp/cli --registry "https://registry.npmjs.org/"</code> （避免从淘宝镜像上安装，它上面的还是老版本，已经给他们提了一个 <a href="https://github.com/cnpm/cnpm/issues/243" rel="nofollow noreferrer" target="_blank">issue</a>）</li>
<li>初始化项目：<code>minapp init &lt;你要创建项目的文件夹&gt;</code> (同时支持创建 js 和 ts 项目)</li>
<li>安装两个 vscode 插件：<a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode" rel="nofollow noreferrer" target="_blank">minapp</a> 和 <a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode" rel="nofollow noreferrer" target="_blank">dot-template</a>（可选，但建议安装）</li>
</ol>
<h2 id="articleHeader3">功能概览（在 vscode 编辑器下）</h2>
<h3 id="articleHeader4">wx 所有接口都有智能的提醒，同时包括接口的参数，和返回值</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510490?w=996&amp;h=440" src="https://static.alili.tech/img/remote/1460000013510490?w=996&amp;h=440" alt="wx接口示例" title="wx接口示例" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">提供一个 promise 版的 wx 接口 wxp，和 wx 一样，只是它会将 wx 中所有需要 success/fail/complete 三个参数的函数 promise 化</h3>
<ul>
<li>wxp 中也支持使用 success 回调</li>
<li>wxp 给 Promise 添加了一个 finally 方法；如，你可以这样用 <code>wxp.getUserInfo().finally(() =&gt; { /* do something */ })</code>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510491?w=996&amp;h=394" src="https://static.alili.tech/img/remote/1460000013510491?w=996&amp;h=394" alt="wxp示例" title="wxp示例" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">集成 mobx，可以非常方便的修改全局数据，并自动更新当前页面状态</h3>
<ul>
<li>注入 Store 只需要在 appify 函数中添加 Store 对象即可</li>
<li>Page 和 Component 中都默认注入了 Store 对象，你可以使用 <code>this.store</code> 获取</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510492?w=996&amp;h=514" src="https://static.alili.tech/img/remote/1460000013510492?w=996&amp;h=514" alt="mobx" title="mobx" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">wxml 模板语言支持语法高亮，组件智能提示，组件属性智能提示（需要安装 vscode 插件 <a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode" rel="nofollow noreferrer" target="_blank">minapp</a>）</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510493?w=996&amp;h=460" src="https://static.alili.tech/img/remote/1460000013510493?w=996&amp;h=460" alt="wxml" title="wxml" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">json 文件支持自动提示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510494?w=996&amp;h=460" src="https://static.alili.tech/img/remote/1460000013510494?w=996&amp;h=460" alt="json" title="json" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">新建一个 page 文件夹时，自动生成相关文件（需要安装 vscode 插件 <a href="https://marketplace.visualstudio.com/items?itemName=qiu8310.dot-template-vscode" rel="nofollow noreferrer" target="_blank">dot-template</a>）</h3>
<ul>
<li>自动为你创建相关的同名的文件，包括 js/json/wxml/scss，并且这些模板文件你可以随时在 .dtpl 文件夹下修改</li>
<li>自动将新建的 page 路径注入到 app.json 文件夹中</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510495?w=996&amp;h=546" src="https://static.alili.tech/img/remote/1460000013510495?w=996&amp;h=546" alt="新建 Page 示例" title="新建 Page 示例" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">小程序 Page 中支持函数自动提示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510496?w=996&amp;h=440" src="https://static.alili.tech/img/remote/1460000013510496?w=996&amp;h=440" alt="Page 中的函数自动提示示例" title="Page 中的函数自动提示示例" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">同理，新建组件文件夹时，也会创建相关的文件；同时组件中的生命周期函数也会自动提示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013510497" src="https://static.alili.tech/img/remote/1460000013510497" alt="Component 示例" title="Component 示例" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">关于此仓库说明</h2>
<p>这不是一个项目，是有好几个项目组合而成的，用的是 <a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">lerna</a> 开发工具，其它项目在 <a>packages 目录下</a>，这里对其中的几个主要项目做个简要概述</p>
<ul>
<li>
</li>
<li>
</li>
<li>
</li>
<li>
</li>
<li>
</li>
<li>
</li>
<li>
</li>
</ul>
<h2 id="articleHeader13">TODO</h2>
<ul>
<li>[ ] 小程序中的静态资源自动上传到 七牛 (完成我的 file-uploader 组件)</li>
<li>[ ] 实现类似于 vue 的功能，可以将所有文件写在一个页面上</li>
<li>[ ] webpack 升级到 4.0</li>
<li>[ ] 写一个小程序的自动化测试框架</li>
</ul>
<blockquote>下一篇：作者亲著，重新定义微信小程序开发 —— 上篇</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【推荐】开源项目minapp－重新定义微信小程序的开发

## 原文链接
[https://segmentfault.com/a/1190000013510485](https://segmentfault.com/a/1190000013510485)


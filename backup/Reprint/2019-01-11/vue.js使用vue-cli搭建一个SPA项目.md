---
title: 'vue.js使用vue-cli搭建一个SPA项目' 
date: 2019-01-11 2:30:08
hidden: true
slug: 1u7ji465d6k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">WHY</h1>
<p>之所以写这篇如何运用脚手架自动化构建出一个项目的大架构，主要是面向想入门vue的小伙伴。之前，我第一次接触vue，一直摸不着头脑，想在网上搜个接地气的教程都找不到。SO，我以如何搭建结构为开始，向想入门vue的童鞋们把我仅有的力量贡献出来，随后我会持续更新vue如何与ui框架结合使用；在低版本ie如何运用vwjs将其打包为桌面应用以及我在实际开发的过程中踩过的各种坑。欢迎大家观看与互相交流哦。</p>
<h1 id="articleHeader1">HOW</h1>
<p>话不多说，切入主题</p>
<h3 id="articleHeader2">1.首先，你的电脑需要nodejs环境，如果没有，点击下面链接去下载吧。</h3>
<blockquote><p><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">点我进入node官网</a><br><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a><br>安装完毕之后在命令窗口执行  <code>node -v</code></p></blockquote>
<p>如果执行完毕后会出现node的版本号就ok了   <code>v6.10.1</code></p>
<h3 id="articleHeader3">2.安装脚手架vue-cli</h3>
<blockquote><p>在命令窗口执行 <code>npm install -g vue-cli</code></p></blockquote>
<p>安装完毕之后在命令窗口执行  <code>vue -V</code> -----大写V哦<br>如果执行完毕后会出现cli的版本号就ok了</p>
<h3 id="articleHeader4">3.在你的项目目录下初始化一个webpack配置的项目</h3>
<blockquote>
<p>在命令窗口执行 <code>vue init webpack name</code>    -------name是你的项目名称<br>执行命令后会有 <code>?Project name &lt;name&gt;</code>   --------输入项目名称，回车</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                        `Project description` -----------输入你的项目描述，回车" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">                        `Project description` -----------输入你的项目描述，回车</code></pre>
<p><code>Author</code>  -----------顾名思义，输入作者名，回车</p>
</blockquote>
<p><code>Vue build</code> ----------- 必须回车啊<br><code>Install vue-router?&lt;y/n&gt; </code> ----------是否需要vue-router,做项目有路由啊，输入y，回车<br><code>Use ESLint to lint your code ?&lt;y/n&gt;</code> --------是否需要ESlint检验你的代码格式，个人建议，如果不太了解ESlint，或者你的开发团队不需要这个东东，最好n，否则他的检验标准会让你很无语，当然，你可以通过配置去除你不需要的代码格式校验，随你喽，要就y，不要就n，回车<br><code>Setup unit tests with Karma + Mocha? (y/n)</code> ----------是否安装单元测试，看你的需求喽，一般情况没有就n，回车<br><code>Setup e2e tests with Nightwatch(y/n)? </code>  -----------是否安装e2e测试，同上，回车</p>
<h3 id="articleHeader5">4.在你新建好的项目目录下install安装所有需要的模板</h3>
<blockquote><p>在命令窗口执行<code>npm install</code>-------它会根据package.json文件里依赖的所有模块进行安装，回车之后你就静静的wait,其实据说用yarn会快一点，我在工作中leader要求用yarn，不过俩者用法差不多，有兴趣的话可以去看看哦</p></blockquote>
<h3 id="articleHeader6">5.运行你的项目</h3>
<blockquote><p>在命令窗口执行<code>npm run dev</code> ----现在你的项目就运行起来了</p></blockquote>
<h1 id="articleHeader7">PIC</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919788?w=525&amp;h=283" src="https://static.alili.tech/img/remote/1460000009919788?w=525&amp;h=283" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919789" src="https://static.alili.tech/img/remote/1460000009919789" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919790?w=487&amp;h=398" src="https://static.alili.tech/img/remote/1460000009919790?w=487&amp;h=398" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<blockquote><p>*注意，一定要在你初始化好的项目下进行操作，否则会有很多WARN，当然，你的构建也会失败，之前我粗心踩过这个坑。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919791?w=573&amp;h=414" src="https://static.alili.tech/img/remote/1460000009919791?w=573&amp;h=414" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<blockquote><p>网页中有上面的样子，你就成功啦</p></blockquote>
<h1 id="articleHeader8">github小项目</h1>
<blockquote><p>在工作间隙一直在写这个小项目，感兴趣的小伙伴可以去clone下来交流指正，记得star哦<br>git地址   <a href="https://github.com/PaiDaXingSWK/elema.git" rel="nofollow noreferrer" target="_blank">https://github.com/PaiDaXingSWK/elema.git</a></p></blockquote>
<h4>项目已经完成效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919792?w=720&amp;h=1280" src="https://static.alili.tech/img/remote/1460000009919792?w=720&amp;h=1280" alt="664758838702543093.jpg" title="664758838702543093.jpg" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009919793?w=720&amp;h=1280" src="https://static.alili.tech/img/remote/1460000009919793?w=720&amp;h=1280" alt="770906538369325923.jpg" title="770906538369325923.jpg" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">END</h1>
<blockquote><p>稍后我会带着想入门vue的童鞋进行深一步的演练，真心希望大家入门vue不会像我之前一样痛苦，当然，后续我也会在空余时间完成一个小项目在我的github与大家互相交流,欢迎大家关注，收藏，指正，一起学习交流</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js使用vue-cli搭建一个SPA项目

## 原文链接
[https://segmentfault.com/a/1190000009919783](https://segmentfault.com/a/1190000009919783)


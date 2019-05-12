---
title: 'Vue 全家桶 + Electron 开发的一个跨三端的应用' 
date: 2019-01-11 2:30:08
hidden: true
slug: m0ysi0xjk9h
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895508?w=2266&amp;h=1202" src="https://static.alili.tech/img/remote/1460000009895508?w=2266&amp;h=1202" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>GitHub Repo：<a href="https://github.com/halfrost/vue-objccn" rel="nofollow noreferrer" target="_blank">vue-objccn</a></p>
<p>Follow: <a href="https://github.com/halfrost" rel="nofollow noreferrer" target="_blank">halfrost · GitHub</a></p>
</blockquote>
<p>项目地址：<a href="https://github.com/halfrost/vue-objccn" rel="nofollow noreferrer" target="_blank">https://github.com/halfrost/vue-objccn</a></p>
<p>利用 Vue.js 实现 <a href="https://objccn.io/" rel="nofollow noreferrer" target="_blank">objc中国</a> 的跨平台全栈应用</p>
<ul>
<li><p>✅ 桌面应用，支持 Mac、Linux、Windows 三个平台</p></li>
<li><p>✅ Web 应用，支持 桌面浏览器 和 手机浏览器</p></li>
<li><p>✅ 手机 App，目前只支持了 Cordova 框架，支持 iOS 和 Android 两个平台</p></li>
<li><p>❌ 手机原生 App，打算用 Weex 框架，同样一起支持 iOS 和 Android 两个平台</p></li>
</ul>
<blockquote><p>注：此项目纯属个人瞎搞，请大家支持 喵神(@onevcat)，支持 <a href="https://objccn.io/" rel="nofollow noreferrer" target="_blank">Objc中国</a>。</p></blockquote>
<h1 id="articleHeader0">前言</h1>
<h2 id="articleHeader1">一.关于我</h2>
<p>我是一名全职的 iOS 开发者，非前端开发者。由于接触了 Weex 开发，从而接触到了 Vue.js。</p>
<h2 id="articleHeader2">二.为什么会写这个项目？</h2>
<ol>
<li><p>最开始有这个想法的时候是来自一个网友，他在我的博客上问我，网上有没有写的比较好的 demo ？我说尤大写的那个 Hacker News 是最好的。后来网友就是，楼主能写一个么？我当时回答暂时不行。其实这事我一直记在心里。</p></li>
<li><p>今年5月19号，GitHub 使用 Electron 重写了 macOS 和 Windows 的客户端，加上近些年跨端开发越来越火，对于一些公司来说，Web 和 app 应该都是需要的，app 还需要 iOS 和 Android 两个平台，再有甚者还要开发小程序，桌面级的应用虽然少，但是用 Electron 一样可以一起开发了。自己也萌生了想要跃跃欲试的念头。</p></li>
<li><p>由于接触到了 Vue.js，当然不想停留在初级，想进阶，尤大给出了建议，就是多实践，多练。为了加快进阶的步伐，自己私下就找项目练。</p></li>
<li><p>至于为何选择 Objc 中国，理由其实很简单，因为我是 iOS 开发者。在 iOS 开发者中，Objc 基本上人尽皆知（有不知道的？），喵神也基本上人尽皆知，我个人很崇拜喵神，所以就选了 Objc 中国来写。</p></li>
<li><p>因为爱 ... ...</p></li>
</ol>
<h2 id="articleHeader3">三.这次为何跨端开发没有weex？</h2>
<p>这次在我写完项目以后，发现 Vue 的代码直接转换成 Weex 的项目，是无法实现的，好多报错。而且不是一下子能都修复好。我相信是我使用姿势的问题，不是 Weex 的问题。对了，Weex 又发布新版本了，接下来有时间的话就把 Weex 版的也做一遍开源。</p>
<p>好了，进入正题，说项目：</p>
<hr>
<h1 id="articleHeader4">技术栈和主要框架</h1>
<p>?    Vue 全家桶：vue2 + vuex + vue-router + webpack  <br>?    ES6     <br>?    网络请求：axios  <br>?    页面相应式框架：bootstrap，element-ui  <br>✏️    后台：express  <br>?    代码高亮：highlight.js  <br>?    数据库：lowdb  <br>?    markdown解析器：vue-markdown  <br>?    表单验证：vee-validate  <br>?    跨平台框架：Electron</p>
<h1 id="articleHeader5">?项目构建</h1>
<p>由于喵神的 Objc 网站是直接返回 html，所以想进行模拟网络请求返回数据，就只能自己搭建一个后台，写 api 返回数据了。</p>
<p>我利用 Express 把后台搭建在 8081端口上，并写好路由，请求会转到8080，开启服务器的时候也会自动开启后台。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
# install dependencies 安装依赖
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8080
npm run start

# build for production with minification 打包
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# 打包 Mac 应用
npm run build:mac

# 打包 Linux 应用
npm run build:linux

# 打包 Win 应用
npm run build:win

# 打包 Cordova 应用
npm run build:app
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">
<span class="hljs-comment"># install dependencies 安装依赖</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run start

<span class="hljs-comment"># build for production with minification 打包</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report

<span class="hljs-comment"># run unit tests</span>
npm run unit

<span class="hljs-comment"># run e2e tests</span>
npm run e2e

<span class="hljs-comment"># run all tests</span>
npm <span class="hljs-built_in">test</span>

<span class="hljs-comment"># 打包 Mac 应用</span>
npm run build:mac

<span class="hljs-comment"># 打包 Linux 应用</span>
npm run build:linux

<span class="hljs-comment"># 打包 Win 应用</span>
npm run build:win

<span class="hljs-comment"># 打包 Cordova 应用</span>
npm run build:app
</code></pre>
<p>这里要单独说一下 Cordova 的打包方式，它比桌面端的稍微特殊一点。<br>我在项目中放了一个 Makefile，可以根据这个来做。</p>
<ol><li><p>首先全局安装 cordova 命令</p></li></ol>
<blockquote><p>npm install -g cordova</p></blockquote>
<ol><li><p>再输入下面的命令，生成 app 项目目录</p></li></ol>
<blockquote><p>cordova create app com.vueobjccn vueobjccn</p></blockquote>
<ol><li><p>进入到 app 文件夹中</p></li></ol>
<blockquote><p>cd app</p></blockquote>
<ol><li><p>添加对应的平台</p></li></ol>
<blockquote><p>cordova platform add ios  <br>cordova platform add android</p></blockquote>
<ol><li><p>运行项目</p></li></ol>
<blockquote><p>cordova run ios  <br>cordova run android</p></blockquote>
<p>Cordova 只生成了一个壳的 app，里面具体的内容还是读取的网页，在生成的对应的应用里面有一个 www 的文件夹，这个文件夹里面就是要加载页面。JavaScript 打包之后是会生成 www 的文件夹，只要去替换 Cordova 对应平台里面的 www 文件夹里面的内容即可。</p>
<p>额外说几句，在 app 发展到现在这么成熟的时代，如果构建一个大的 app，用 Cordova 框架去做，不用原生，不做任何优化，用户体验确实不如原生的快。我这次就专门打包体验了 Cordova app，没有做任何优化，打包出来就用，如果是挑剔的用户，放在当今各大 app 接近完美的体验度相比来说，确实会感到满足感略低。如果真的要前端开发 app ，给2个建议，如果是用 Cordova 框架，一定要尽量优化优化，不如性能不如原生。如果想有接近原生的体验，那么可以考虑用 React Native 或者 Weex。</p>
<h1 id="articleHeader6">? 跨平台开发</h1>
<p>JavaScript 跨平台开发打包成桌面级应用，主要用 Electron 框架。这里需要在 devDependencies 里面安装好 "electron"、"electron-builder"、"electron-packager" 这三个。其他的路径配置在 webpack 里面配置好即可。</p>
<p>关于 Cordova 的安装，确实可以吐槽一点网络的问题。如果你在一个翻墙环境很差的地方，真的很痛苦。比如之前在一个翻墙环境很差的情况下全局安装 Cordova ，各种报错，就算是换了 cnpm 完全安装了以后，添加 iOS 平台以后以后会报一个 co 文件找不到的问题，感觉是 cnpm 没有把命令安装完整。后来我回到家里，翻墙网络很好，npm install 一下子就安装好了。不过有个小插曲：Cordova iOS 4.4.0 template 如果报错，就多安装几次，原因还是翻墙的原因，没有 catch 到。</p>
<p>还有可能会遇到下面这个错误：</p>
<blockquote><p>"Error: Cannot find module 'config-chain'" when running 'ionic start'</p></blockquote>
<p>这个错误就用 sudo 命令重新尝试一遍原命令就好了。</p>
<p>最终打包完成会在 dist 的文件夹中。</p>
<p>接下来展示一下这个跨三端的应用在各个平台下的表现：</p>
<p>先展示一下 Web 端</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895439?w=1240&amp;h=698" src="https://static.alili.tech/img/remote/1460000009895439?w=1240&amp;h=698" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895440?w=1240&amp;h=698" src="https://static.alili.tech/img/remote/1460000009895440?w=1240&amp;h=698" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895441?w=1240&amp;h=698" src="https://static.alili.tech/img/remote/1460000009895441?w=1240&amp;h=698" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895442?w=1240&amp;h=698" src="https://static.alili.tech/img/remote/1460000009895442?w=1240&amp;h=698" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895443?w=1240&amp;h=698" src="https://static.alili.tech/img/remote/1460000009895443?w=1240&amp;h=698" alt="" title="" style="cursor: pointer;"></span></p>
<p>再展示一下在手机浏览器上的效果：</p>
<p>Android平台</p>
<p>Nexus 5x 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895444?w=459&amp;h=927" src="https://static.alili.tech/img/remote/1460000009895444?w=459&amp;h=927" alt="" title="" style="cursor: pointer;"></span></p>
<p>Nexus 6P 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895445?w=449&amp;h=926" src="https://static.alili.tech/img/remote/1460000009895445?w=449&amp;h=926" alt="" title="" style="cursor: pointer;"></span></p>
<p>iOS 平台</p>
<p>iPhone 5 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895446?w=375&amp;h=799" src="https://static.alili.tech/img/remote/1460000009895446?w=375&amp;h=799" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>iPhone 7 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895447?w=439&amp;h=892" src="https://static.alili.tech/img/remote/1460000009895447?w=439&amp;h=892" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>iPhone 7 Plus 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895448?w=461&amp;h=926" src="https://static.alili.tech/img/remote/1460000009895448?w=461&amp;h=926" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>iPad 的 Web</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895449?w=647&amp;h=927" src="https://static.alili.tech/img/remote/1460000009895449?w=647&amp;h=927" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>接着再看看 Mac 端上的表现：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895450?w=1240&amp;h=1044" src="https://static.alili.tech/img/remote/1460000009895450?w=1240&amp;h=1044" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895451?w=1240&amp;h=1044" src="https://static.alili.tech/img/remote/1460000009895451?w=1240&amp;h=1044" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895452?w=1240&amp;h=1044" src="https://static.alili.tech/img/remote/1460000009895452?w=1240&amp;h=1044" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895453?w=1240&amp;h=1044" src="https://static.alili.tech/img/remote/1460000009895453?w=1240&amp;h=1044" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后看看 Cordova 的效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895454?w=526&amp;h=870" src="https://static.alili.tech/img/remote/1460000009895454?w=526&amp;h=870" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895455?w=526&amp;h=870" src="https://static.alili.tech/img/remote/1460000009895455?w=526&amp;h=870" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895456?w=526&amp;h=870" src="https://static.alili.tech/img/remote/1460000009895456?w=526&amp;h=870" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895457?w=795&amp;h=1045" src="https://static.alili.tech/img/remote/1460000009895457?w=795&amp;h=1045" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895458?w=795&amp;h=1045" src="https://static.alili.tech/img/remote/1460000009895458?w=795&amp;h=1045" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895459?w=795&amp;h=1045" src="https://static.alili.tech/img/remote/1460000009895459?w=795&amp;h=1045" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">?功能展示</h1>
<p>用 Vue.js 搭建一个 Web 页面很快。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895460" src="https://static.alili.tech/img/remote/1460000009895460" alt="" title="" style="cursor: pointer;"></span></p>
<p>看看 Vuex 管理状态的方便。登录状态保存在 state 里面，全局都会获取到。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895461?w=1905&amp;h=973" src="https://static.alili.tech/img/remote/1460000009895461?w=1905&amp;h=973" alt="" title="" style="cursor: pointer;"></span></p>
<p>一旦用户没有登录，点击购买电子书的时候，判断没有用户登录都会跳转到登录页面。</p>
<p>还有一点值得说的是，由于这是一个 SPA ，所以里面的路由都用 Router-link 实现的，而没有选用 a 标签的跳转，效果就是跳转并不用去请求数据，秒跳。这个用户体验真的很爽。</p>
<p>&lt;router-link&gt; 比起写死的 <a> 会好一些，理由如下：</a></p>
<p>无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。</p>
<p>在 HTML5 history 模式下，router-link 会拦截点击事件，让浏览器不再重新加载页面。</p>
<p>当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写（基路径）了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895462?w=1905&amp;h=973" src="https://static.alili.tech/img/remote/1460000009895462?w=1905&amp;h=973" alt="" title="" style="cursor: pointer;"></span></p>
<p>登出页面同理，一旦用户登出，所有显示用户名的地方都会变成登录，navigationBar 上的购物车也一并消失。用 Vuex 管理状态，挺好的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895463?w=1905&amp;h=973" src="https://static.alili.tech/img/remote/1460000009895463?w=1905&amp;h=973" alt="" title="" style="cursor: pointer;"></span></p>
<p>这就是 email 的表单验证了，没有太多的技术含量。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895464?w=1905&amp;h=973" src="https://static.alili.tech/img/remote/1460000009895464?w=1905&amp;h=973" alt="" title="" style="cursor: pointer;"></span></p>
<p>这里是购物车页面，这里用到了 MVVM 页面的绑定的思想，页面上4个按钮，点任意一个按钮都会立即改变下面的总价。关于 Vue.js 的 MVVM 实现思想值得 iOSer 们学习。</p>
<p>接下来这个是 iPhone 的 Safari 上的表现，速度还可以。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895465" src="https://static.alili.tech/img/remote/1460000009895465" alt="" title="" style="cursor: pointer;"></span></p>
<p>在跨平台的这几个应用中，体验最好的，我觉得还是 Mac 的应用。使用起来满意度非常高。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895466" src="https://static.alili.tech/img/remote/1460000009895466" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后就是 Cordova 框架搭建的 手机 app，体验度不高，具体如何，看图吧，总之不优化的 Cordova ，对于挑剔的我来说，我是不满意的。</p>
<p>iPhone 上的应用</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895467" src="https://static.alili.tech/img/remote/1460000009895467" alt="" title="" style="cursor: pointer;"></span></p>
<p>iPad 上的应用</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009895468" src="https://static.alili.tech/img/remote/1460000009895468" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">?项目完成之后的感想</h1>
<p>先安利一下 element-ui 这个项目，用它来搭建项目，真的很快，页面很快就可以搭建完成，开发 Vue.js 的同学一定有听过这个库。节约出来的大把时间可以把更多的精力放在业务开发上面。</p>
<p>大家都在说现在是大前端时代，移动开发和前端融合是必然。但是两个平台的开发其实还是有很多的不同，我在经历过前端的开发和 iOS 开发以后，感想还是很多的，前端和 iOS 是有很多可以相互学习的地方，两者也各有优缺点。接下来我打算写写这些方面的系列文章。前端的工程化，组件化，路由，MVVM，分别和 iOS 这边各有哪些优缺点，相互可以学习些什么。（感觉给自己挖了一个大坑）</p>
<h1 id="articleHeader9">?Feature</h1>
<p>有时间就支持 Weex ，把这个 Vue.js 的改成一个完整的 Weex 的应用，变成原生以后，性能一定不会差。这样跨平台开发就应该全了。</p>
<h1 id="articleHeader10"><span style="font-weight:normal;">❗</span>️勘误</h1>
<p>如果在项目中发现了有什么不解或者发现了 bug，欢迎提交 PR 或者 issue，欢迎大神们多多指点小弟???</p>
<h1 id="articleHeader11"><span style="font-weight:normal;">♥</span>️感谢</h1>
<p>如果喜欢这个项目，欢迎Star！</p>
<hr>
<h1 id="articleHeader12">?LICENSE</h1>
<p>GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007</p>
<p>Copyright (C) 2007 Free Software Foundation, Inc. <a href="http://fsf.org/" rel="nofollow noreferrer" target="_blank">http://fsf.org/</a><br>Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 全家桶 + Electron 开发的一个跨三端的应用

## 原文链接
[https://segmentfault.com/a/1190000009895434](https://segmentfault.com/a/1190000009895434)


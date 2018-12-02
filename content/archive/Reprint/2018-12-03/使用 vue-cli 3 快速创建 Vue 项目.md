---
title: '使用 vue-cli 3 快速创建 Vue 项目' 
date: 2018-12-03 2:30:08
hidden: true
slug: gq0yzj3c08d
categories: [reprint]
---

{{< raw >}}

                    
<p>为了便于 Vue 项目的管理， Vue 团队官方开发了 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer">vue-cli</a> 工具。</p>
<p>本文将带您使用 vue-cli 快速创建一个 Vue 项目。</p>
<h1>本地安装 vue-cli</h1>
<p>使用 npm 全局安装 vue-cli ：</p>
<pre><code>npm i -g @vue/cli@3.0.0-beta.6</code></pre>
<h1>创建项目</h1>
<p>执行：</p>
<pre><code>vue create my-project</code></pre>
<p>会弹出如下界面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627088" src="https://static.alili.tech/img/remote/1460000014627088" alt="选择套餐" title="选择套餐"></span></p>
<p>此处有两个选择：</p>
<ul>
<li>
<code>default (babel, eslint)</code> 默认套餐，提供 <a href="https://babeljs.io/" rel="nofollow noreferrer">babel</a> 和 <a href="https://eslint.org/" rel="nofollow noreferrer">eslint</a> 支持。</li>
<li>
<code>Manually select features</code> 自己去选择需要的功能，提供更多的特性选择。比如如果想要支持 TypeScript ，就应该选择这一项。</li>
</ul>
<p>可以使用<code>上下方向键</code>来切换选项。如果只需要 babel 和 eslint 支持，那么选择第一项，就完事了，静静等待 vue 初始化项目。</p>
<p>如果想要更多的支持，就选择第二项：切换到第二项，按下 enter 键选中，弹出如下界面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627089" src="https://static.alili.tech/img/remote/1460000014627089" alt="选择特性支持" title="选择特性支持"></span></p>
<p>vue-cli 内置支持了8个功能特性，可以多选：使用方向键在特性选项之间切换，使用空格键选中当前特性，使用 a 键切换选择所有，使用 i 键翻转选项。</p>
<p>对于每一项的功能，此处做个简单描述：</p>
<ul>
<li>
<code>TypeScript</code> 支持使用 TypeScript 书写源码。</li>
<li>
<code>Progressive Web App (PWA) Support</code> <a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer">PWA</a> 支持。</li>
<li>
<code>Router</code> 支持 <a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer">vue-router</a> 。</li>
<li>
<code>Vuex</code> 支持 <a href="https://vuex.vuejs.org/zh-cn/intro.html" rel="nofollow noreferrer">vuex</a> 。</li>
<li>
<code>CSS Pre-processors</code> 支持 CSS 预处理器。</li>
<li>
<code>Linter / Formatter</code> 支持代码风格检查和格式化。</li>
<li>
<code>Unit Testing</code> 支持单元测试。</li>
<li>
<code>E2E Testing</code> 支持 E2E 测试。</li>
</ul>
<p>那么基于开发常见的项目，同时兼顾项目健壮性的原则，本次选择如下特性支持：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627090" src="https://static.alili.tech/img/remote/1460000014627090" alt="特性选项" title="特性选项"></span></p>
<p>按下 enter 键确认选择，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627091" src="https://static.alili.tech/img/remote/1460000014627091" alt="image.png" title="image.png"></span></p>
<p>这里是让选择在开发 Vue 组件时，要不要使用 class 风格的写法。为了更方便地使用 TypeScript ，此处选择 Y ：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627092" src="https://static.alili.tech/img/remote/1460000014627092" alt="使用 class 风格的 Vue 组件开发方式" title="使用 class 风格的 Vue 组件开发方式"></span></p>
<p>按 enter 键，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627093" src="https://static.alili.tech/img/remote/1460000014627093" alt="image.png" title="image.png"></span></p>
<p>这个选项的意思是要不要使用 babel 工具自动为转换后的 TypeScript 代码注入 polyfiills 。如果实在搞不清楚具体是什么意思，可以先不用管，直接选择 Y ，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627094" src="https://static.alili.tech/img/remote/1460000014627094" alt="选择 CSS 预处理器" title="选择 CSS 预处理器"></span></p>
<p>这里就是说我们在项目里面需要支持何种动态样式语言，此处提供了三个选项：</p>
<ul>
<li><a href="https://sass-lang.com/" rel="nofollow noreferrer">SCSS/SASS</a></li>
<li><a href="http://lesscss.org/" rel="nofollow noreferrer">LESS</a></li>
<li><a href="http://stylus-lang.com/" rel="nofollow noreferrer">Stylus</a></li>
</ul>
<p>此处选择 LESS ，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627095" src="https://static.alili.tech/img/remote/1460000014627095" alt="单测工具" title="单测工具"></span></p>
<p>选择单元测试工具，直接选择现在比较火的 Jest ，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627096" src="https://static.alili.tech/img/remote/1460000014627096" alt="配置文件位置" title="配置文件位置"></span></p>
<p>这一步就是要选择配置文件的位置了。对于 Babel 、 PostCSS 等，都可以有自己的配置文件： .babelrc 、 .postcssrc 等等，同时也可以把配置信息放在 package.json 里面。此处出于对编辑器（ Visual Studio Code ）的友好支持（编辑器一般默认会在项目根目录下寻找配置文件），选择把配置文件放在外面，选择 <code>In dedicated config files</code> ，进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627097" src="https://static.alili.tech/img/remote/1460000014627097" alt="presets" title="presets"></span></p>
<p>这个就是问要不要把当前的这一系列选项配置保存起来，方便下一次创建项目时复用。对于 MAC ，保存的配置信息会放在 ~/.vuerc 里面。</p>
<p>我这里就选择 n 了，然后进入下一步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627098" src="https://static.alili.tech/img/remote/1460000014627098" alt="registry" title="registry"></span></p>
<p>这里是选择 npm registry ，在中国的话，就直接使用默认的淘宝镜像就行了。</p>
<p>选完之后， vue-cli 就根据前面选择的内容，开始初始化项目了。</p>
<h1>启动项目</h1>
<p>初始完之后，进入到项目根目录：</p>
<pre><code>cd my-project</code></pre>
<p>启动项目：</p>
<pre><code>npm run serve</code></pre>
<p>稍等一会儿，可以看到自动在浏览器中打开了如下界面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014627099" src="https://static.alili.tech/img/remote/1460000014627099" alt="界面" title="界面"></span></p>
<h1>打包上线</h1>
<p>在开发完项目之后，就应该打包上线了。 vue-cli 也提供了打包的命令，在项目根目录下执行：</p>
<pre><code>npm run build</code></pre>
<p>执行完之后，可以看到在项目根目录下多出了一个 dist 目录，该目录下就是打包好的所有静态资源，直接部署到静态资源服务器就好了。</p>
<p>实际上，在部署的时候要注意，假设静态服务器的域名是 <code>http://static.baidu.com</code> ，那么对应到访问 <code>&lt;项目根目录&gt;/dist/index.html</code> 的 URL 一定要是 <code>http://static.baidu.com/index.html</code> ，其他的静态资源以此类推。</p>
<h1>单元测试</h1>
<p>执行：</p>
<pre><code>npm run test</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 vue-cli 3 快速创建 Vue 项目

## 原文链接
[https://segmentfault.com/a/1190000014627083](https://segmentfault.com/a/1190000014627083)


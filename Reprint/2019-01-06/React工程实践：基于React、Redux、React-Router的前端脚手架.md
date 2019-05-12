---
title: 'React工程实践：基于React、Redux、React-Router的前端脚手架' 
date: 2019-01-06 2:30:10
hidden: true
slug: ueu70758raj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>项目地址: <a href="https://github.com/YutHelloWorld/vortex-react" rel="nofollow noreferrer" target="_blank">https://github.com/YutHelloWo...</a></p></blockquote>
<p>基于<a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a>、<a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a>、<a href="https://github.com/ReactTraining/react-router/tree/v3/docs" rel="nofollow noreferrer" target="_blank">React-Router@3.x</a>、<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a>和<a href="https://reactstrap.github.io/" rel="nofollow noreferrer" target="_blank">reactstrap</a>的前端脚手架。</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li><a>前言</a></li>
<li><a>特性</a></li>
<li><a>环境</a></li>
<li><a>开始</a></li>
<li><a>工程结构</a></li>
<li><a>开发调试</a></li>
<li><a>单元测试</a></li>
<li><a>静态部署</a></li>
<li><a>相关文档</a></li>
<li><a>致谢</a></li>
</ul>
<h2 id="articleHeader1">前言</h2>
<p>如果你是一个Reat初学者，这个项目可以是很好的教程。如果你在计划使用React技术栈创建一个大型SPA，那么这个项目正好适合你。如果这个项目对你有帮助，请不吝啬的给于star或者watch支持。</p>
<h2 id="articleHeader2">特性</h2>
<ul>
<li><a href="https://babeljs.io/learn-es2015/" rel="nofollow noreferrer" target="_blank">ES2015</a></li>
<li><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">Webpack</a></li>
<li><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a></li>
<li><a href="https://github.com/ReactTraining/react-router/tree/v3/docs" rel="nofollow noreferrer" target="_blank">React-router</a></li>
<li><a href="https://reactstrap.github.io/" rel="nofollow noreferrer" target="_blank">reactstrap</a></li>
<li><a href="http://eslint.cn/" rel="nofollow noreferrer" target="_blank">Eslint</a></li>
<li><a href="http://expressjs.com/" rel="nofollow noreferrer" target="_blank">Express</a></li>
<li><a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a></li>
<li><a href="https://karma-runner.github.io/1.0/index.html" rel="nofollow noreferrer" target="_blank">Karma</a></li>
</ul>
<h3 id="articleHeader3">数据流</h3>
<p><span class="img-wrap"><img data-src="/img/bVRQRK?w=1205&amp;h=618" src="https://static.alili.tech/img/bVRQRK?w=1205&amp;h=618" alt="redux" title="redux" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">环境</h2>
<ul>
<li>node <code>^5.0.0</code>
</li>
<li>yarn <code>^0.23.0</code> or npm <code>^3.0.0</code>
</li>
</ul>
<h2 id="articleHeader5">开始</h2>
<p>在确认你的开发环境是以上<a>环境配置</a>，就开始可以基于这个脚手架创建你的应用了:</p>
<p>首先，克隆这个工程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/yuthelloworld/vortex-react.git <my-project-name>
$ cd <my-project-name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git <span class="hljs-built_in">clone</span> https://github.com/yuthelloworld/vortex-react.git &lt;my-project-name&gt;
$ <span class="hljs-built_in">cd</span> &lt;my-project-name&gt;</code></pre>
<p>然后，安装工程依赖。推荐使用<a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">cnpm</a>或<a href="https://yarnpkg.com/" rel="nofollow noreferrer" target="_blank">Yarn</a>，这样可以节约你安装依赖的所需的时间，避免出现一些莫名奇妙的错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn  # Install project dependencies (or `npm install` or `cnpm install`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ yarn  <span class="hljs-comment"># Install project dependencies (or `npm install` or `cnpm install`)</span></code></pre>
<p>最后，使用命令<code>yarn start</code>或者<code>npm start</code>来启动该应用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn start  # Start the development server (or `npm start`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ yarn start  <span class="hljs-comment"># Start the development server (or `npm start`)</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVRWUz?w=1572&amp;h=1150" src="https://static.alili.tech/img/bVRWUz?w=1572&amp;h=1150" alt="start" title="start" style="cursor: pointer; display: inline;"></span></p>
<p>这里还有一些其他的处理命令:</p>
<table>
<thead><tr>
<th>
<code>yarn &lt;script&gt;</code> &nbsp;</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>start</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>启动并热更新 <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>
</td>
</tr>
<tr>
<td>
<code>build</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>构建到目录 ./dist</td>
</tr>
<tr>
<td>
<code>test</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>通过Karma执行单元测试</td>
</tr>
<tr>
<td>
<code>test:watch</code> &nbsp; &nbsp; &nbsp;</td>
<td>代码改变时通过监控模式重新执行单元测试</td>
</tr>
<tr>
<td>
<code>lint</code> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>代码检查</td>
</tr>
<tr>
<td>
<code>lint:fix</code> &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>代码检查并修复</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader6">工程结构</h2>
<p><span class="img-wrap"><img data-src="/img/bVRWUs?w=1164&amp;h=852" src="https://static.alili.tech/img/bVRWUs?w=1164&amp;h=852" alt="vortex-react" title="vortex-react" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── build &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 打包配置
├── public &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 公共静态资源
├── server &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # express服务
│ &nbsp; └── main.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 服务入口js
├── src &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 应用源文件
│ &nbsp; ├── index.html &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # html模板
│ &nbsp; ├── main.js &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 程序启动和渲染
│ &nbsp; ├── normalize.js &nbsp; &nbsp; &nbsp; &nbsp; # 浏览器的兼容和垫片
│ &nbsp; ├── components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 全局可复用组件
│ &nbsp; ├── layouts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 主页布局
│ &nbsp; │ &nbsp; └── PageLayout &nbsp; &nbsp; &nbsp; # 导航
│ &nbsp; ├── routes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 动态路由
│ &nbsp; │ &nbsp; ├── index.js &nbsp; &nbsp; &nbsp; &nbsp; # 主路由
│ &nbsp; │ &nbsp; ├── Home &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 子路由Home
│ &nbsp; │ &nbsp; │ &nbsp; ├── index.js &nbsp; &nbsp; # 路由定义和异步加载
│ &nbsp; │ &nbsp; │ &nbsp; ├── assets &nbsp; &nbsp; &nbsp; # 组件的静态文件
│ &nbsp; │ &nbsp; │ &nbsp; ├── components &nbsp; # 展示组件
│ &nbsp; │ &nbsp; │ &nbsp; └── routes ** &nbsp;  # 子路由
│ &nbsp; │ &nbsp; └── Counter &nbsp; &nbsp; &nbsp; &nbsp;  # 子路由Couner
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── index.js &nbsp; &nbsp; # 路由定义
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── container &nbsp;  # 容器组件
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── modules &nbsp; &nbsp;  # module(reducers/constants/actions)
│ &nbsp; │ &nbsp; &nbsp; &nbsp; └── routes ** &nbsp;  # 子路由
│ &nbsp; ├── store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # Redux相关模块
│ &nbsp; │ &nbsp; ├── createStore.js &nbsp; # 创建和使用redux store
│ &nbsp; │ &nbsp; └── reducers.js &nbsp; &nbsp;  # Reducer的注册和注入
│ &nbsp; └── styles &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # 样式表
└── tests &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  # 单元测试" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.
├── <span class="hljs-keyword">build </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 打包配置</span>
├── public &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 公共静态资源</span>
├── server &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># express服务</span>
│ &nbsp; └── main.<span class="hljs-keyword">js </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 服务入口js</span>
├── src &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 应用源文件</span>
│ &nbsp; ├── index.html &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># html模板</span>
│ &nbsp; ├── main.<span class="hljs-keyword">js </span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 程序启动和渲染</span>
│ &nbsp; ├── <span class="hljs-keyword">normalize.js </span>&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 浏览器的兼容和垫片</span>
│ &nbsp; ├── components &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 全局可复用组件</span>
│ &nbsp; ├── layouts &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 主页布局</span>
│ &nbsp; │ &nbsp; └── PageLayout &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 导航</span>
│ &nbsp; ├── routes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 动态路由</span>
│ &nbsp; │ &nbsp; ├── index.<span class="hljs-keyword">js </span>&nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 主路由</span>
│ &nbsp; │ &nbsp; ├── Home &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 子路由Home</span>
│ &nbsp; │ &nbsp; │ &nbsp; ├── index.<span class="hljs-keyword">js </span>&nbsp; &nbsp; <span class="hljs-comment"># 路由定义和异步加载</span>
│ &nbsp; │ &nbsp; │ &nbsp; ├── assets &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 组件的静态文件</span>
│ &nbsp; │ &nbsp; │ &nbsp; ├── components &nbsp; <span class="hljs-comment"># 展示组件</span>
│ &nbsp; │ &nbsp; │ &nbsp; └── routes ** &nbsp;  <span class="hljs-comment"># 子路由</span>
│ &nbsp; │ &nbsp; └── Counter &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 子路由Couner</span>
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── index.<span class="hljs-keyword">js </span>&nbsp; &nbsp; <span class="hljs-comment"># 路由定义</span>
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── container &nbsp;  <span class="hljs-comment"># 容器组件</span>
│ &nbsp; │ &nbsp; &nbsp; &nbsp; ├── modules &nbsp; &nbsp;  <span class="hljs-comment"># module(reducers/constants/actions)</span>
│ &nbsp; │ &nbsp; &nbsp; &nbsp; └── routes ** &nbsp;  <span class="hljs-comment"># 子路由</span>
│ &nbsp; ├── store &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># Redux相关模块</span>
│ &nbsp; │ &nbsp; ├── createStore.<span class="hljs-keyword">js </span>&nbsp; <span class="hljs-comment"># 创建和使用redux store</span>
│ &nbsp; │ &nbsp; └── reducers.<span class="hljs-keyword">js </span>&nbsp; &nbsp;  <span class="hljs-comment"># Reducer的注册和注入</span>
│ &nbsp; └── styles &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span class="hljs-comment"># 样式表</span>
└── tests &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  <span class="hljs-comment"># 单元测试</span></code></pre>
<h2 id="articleHeader7">开发调试</h2>
<p>在开发环境，采用了web-dev-middleware和web-hot-middleware。代码实时热更新。</p>
<h3 id="articleHeader8">Redux DevTools</h3>
<p>强烈推荐安装谷歌浏览器插件<a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd" rel="nofollow noreferrer" target="_blank">Redux DevTools Chrome Extension</a>,来查看整个应用的状态时光穿梭。<br><span class="img-wrap"><img data-src="/img/bVRWVi?w=2100&amp;h=1754" src="https://static.alili.tech/img/bVRWVi?w=2100&amp;h=1754" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">路由</h3>
<p>我们使用<code>React-router</code>的<a href="https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute" rel="nofollow noreferrer" target="_blank">plainRoute</a>来定义应用的逻辑单元。</p>
<h2 id="articleHeader10">单元测试</h2>
<p>新增一个单元测试，你只需在<code>./tests</code>中创建<code>.spec.js</code>文件。</p>
<h2 id="articleHeader11">静态部署</h2>
<p>如果你通过<code>nginx</code> web 服务来启动应用，请确保路由指向<code>~/dist/index.html</code>，然后让react-router处理剩下的事，更多参考<a href="https://github.com/ReactTraining/react-router/blob/v3/docs/guides/Histories.md#configuring-your-server" rel="nofollow noreferrer" target="_blank">这个文档</a>。Express在脚手架中用于扩展服务和代理API。</p>
<h2 id="articleHeader12">相关文档</h2>
<p><a href="https://github.com/YutHelloWorld/Blog/issues/1" rel="nofollow noreferrer" target="_blank">知识地图</a></p>
<h2 id="articleHeader13">致谢</h2>
<p>欢迎给这个项目提<a href="https://github.com/YutHelloWorld/vortex-react/pulls" rel="nofollow noreferrer" target="_blank">PR</a>或者<a href="https://github.com/YutHelloWorld/vortex-react/issues" rel="nofollow noreferrer" target="_blank">issues</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React工程实践：基于React、Redux、React-Router的前端脚手架

## 原文链接
[https://segmentfault.com/a/1190000010435547](https://segmentfault.com/a/1190000010435547)


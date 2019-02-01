---
title: '服务端渲染的React手脚架。完美使用 React, Redux, and React-Router！最好用的脚手架' 
date: 2019-02-02 2:30:10
hidden: true
slug: tvv1g58zxb9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><a href="https://github.com/bodyno/universal-react-starter-kit" rel="nofollow noreferrer" target="_blank">Universal React Starter Kit</a></h1>
<p><strong>服务端渲染</strong>的React手脚架</p>
<p>这个启动包的设计是为了让你使用一整套最新最酷的前端技术，所有都是可配置，富特性，基于webpack已经提供代码热加载，使用sass预处理css，单元测试，代码覆盖率报告，代码分割等等更多。</p>
<p>这个项目最主要的目的是尽可能果断的保留。目的不是要你一定按照这个结构去完成你的项目，谐在使前端开发更健壮，更简单还有最重要的是更快乐。你可以获得以下的所有特性！</p>
<p>最后，如果没有大家的贡献，这个项目是不可能如此健壮的，所以，谢谢大家。</p>
<p>觉得不错的话，请Star一下本项目，这是对作者最大的支持。</p>
<p>所有相关库已准备好，随时等待调用。</p>
<h2 id="articleHeader1">特性</h2>
<ul>
<li><p><a href="https://github.com/facebook/react" rel="nofollow noreferrer" target="_blank">react</a></p></li>
<li><p><a href="https://github.com/rackt/redux" rel="nofollow noreferrer" target="_blank">redux</a></p></li>
<li><p><a href="https://github.com/rackt/react-router" rel="nofollow noreferrer" target="_blank">react-router</a></p></li>
<li><p><a href="https://github.com/rackt/react-router-redux" rel="nofollow noreferrer" target="_blank">react-router-redux</a></p></li>
<li><p><a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a></p></li>
<li><p><a href="https://github.com/babel/babel" rel="nofollow noreferrer" target="_blank">babel</a></p></li>
<li><p><a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">koa</a></p></li>
<li><p><a href="https://github.com/karma-runner/karma" rel="nofollow noreferrer" target="_blank">karma</a></p></li>
<li><p><a href="http://eslint.org" rel="nofollow noreferrer" target="_blank">eslint</a></p></li>
</ul>
<h2 id="articleHeader2">需求配置</h2>
<ul>
<li><p>node <code>^4.5.0</code></p></li>
<li><p>npm <code>^3.0.0</code></p></li>
</ul>
<h2 id="articleHeader3">开始</h2>
<p>确认好你的环境配置，然后就可以开始以下步骤。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/bodyno/react-starter-kit.git
$ cd react-starter-kit
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git <span class="hljs-built_in">clone</span> https://github.com/bodyno/react-starter-kit.git
$ <span class="hljs-built_in">cd</span> react-starter-kit
$ npm install                   <span class="hljs-comment"># Install project dependencies</span>
$ npm start                     <span class="hljs-comment"># Compile and launch</span></code></pre>
<p>如果一切顺利，你会看到如下:</p>
<p>&lt;img src="<a href="http://i.imgur.com/zR7VRG6.png?2%22" rel="nofollow noreferrer" target="_blank">http://i.imgur.com/zR7VRG6.pn...</a> /&gt;</p>
<p>开发过程中，你用得最多的会是<code>npm start</code>，但是这里还有很多其它的处理：</p>
<table>
<thead><tr>
<th><code>npm run &lt;script&gt;</code></th>
<th>解释</th>
</tr></thead>
<tbody>
<tr>
<td><code>start</code></td>
<td>服务启动在3000端口，代码热替换开启。</td>
</tr>
<tr>
<td><code>compile</code></td>
<td>编译程序到dist目录下（默认目录~/dist）。</td>
</tr>
<tr>
<td><code>dev</code></td>
<td>与<code>npm start</code>相同, 但是启动nodemon守护进程。</td>
</tr>
<tr>
<td><code>dev:no-debug</code></td>
<td>与<code>npm run dev</code> 但是禁用devtool（开发工具）。</td>
</tr>
<tr>
<td><code>test</code></td>
<td>开启Karma测试并生成覆盖率报告。</td>
</tr>
<tr>
<td><code>test:dev</code></td>
<td>开启Karma测试并监听改变随时重新测试，但是生成覆盖率报告。</td>
</tr>
<tr>
<td><code>deploy</code></td>
<td>启动代码检查，测试，如果成功，编译到dist目录下。</td>
</tr>
<tr>
<td><code>deploy:dev</code></td>
<td>与<code>deploy</code>相同，但是<code>NODE_ENV</code>值为"development"。</td>
</tr>
<tr>
<td><code>deploy:prod</code></td>
<td>与<code>deploy</code>相同，但是<code>NODE_ENV</code>值为"production"。</td>
</tr>
<tr>
<td><code>lint</code></td>
<td>检查所有.js文件是否规范。</td>
</tr>
<tr>
<td><code>lint:fix</code></td>
<td>检查所有.js文件是否规范并修复它们。 <a href="http://eslint.org/docs/user-guide/command-line-interface.html#fix" rel="nofollow noreferrer" target="_blank">更多</a>
</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader4">程序目录</h2>
<p>这个项目的结构使用的是 <strong>fractal(不规则碎片形：适合大型项目)</strong>*，方法的分组主要是依照特性而不是文件类型。注意，这个目录结构只是一个指引，并不一定要按这个来。这种结构谐在让程序更容易扩展，想了解更多请<a href="https://github.com/justingreenberg" rel="nofollow noreferrer" target="_blank">点击这里</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── bin                      # 启动脚本
├── blueprints               # redux-cli的蓝图
├── build                    # 所有打包配置项
│   └── webpack              # webpack的指定环境配置文件
├── config                   # 项目配置文件
├── server                   # Koa 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── layouts              # 主页结构
│   ├── static               # 静态文件(不要到处imported源文件)
│   ├── styles               # 程序样式
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
└── tests                    # 单元测试" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>.
├── <span class="hljs-keyword">bin </span>                     <span class="hljs-comment"># 启动脚本</span>
├── <span class="hljs-keyword">blueprints </span>              <span class="hljs-comment"># redux-cli的蓝图</span>
├── <span class="hljs-keyword">build </span>                   <span class="hljs-comment"># 所有打包配置项</span>
│   └── webpack              <span class="hljs-comment"># webpack的指定环境配置文件</span>
├── <span class="hljs-built_in">config</span>                   <span class="hljs-comment"># 项目配置文件</span>
├── server                   <span class="hljs-comment"># Koa 程序 (使用 webpack 中间件)</span>
│   └── main.<span class="hljs-keyword">js </span>             <span class="hljs-comment"># 服务端程序入口文件</span>
├── src                      <span class="hljs-comment"># 程序源文件</span>
│   ├── main.<span class="hljs-keyword">js </span>             <span class="hljs-comment"># 程序启动和渲染</span>
│   ├── components           <span class="hljs-comment"># 全局可复用的表现组件(Presentational Components)</span>
│   ├── containers           <span class="hljs-comment"># 全局可复用的容器组件</span>
│   ├── layouts              <span class="hljs-comment"># 主页结构</span>
│   ├── static               <span class="hljs-comment"># 静态文件(不要到处imported源文件)</span>
│   ├── styles               <span class="hljs-comment"># 程序样式</span>
│   ├── store                <span class="hljs-comment"># Redux指定块</span>
│   │   ├── createStore.<span class="hljs-keyword">js </span>  <span class="hljs-comment"># 创建和使用redux store</span>
│   │   └── reducers.<span class="hljs-keyword">js </span>     <span class="hljs-comment"># Reducer注册和注入</span>
│   └── routes               <span class="hljs-comment"># 主路由和异步分割点</span>
│       ├── index.<span class="hljs-keyword">js </span>        <span class="hljs-comment"># 用store启动主程序路由</span>
│       ├── Root.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 为上下文providers包住组件</span>
│       └── Home             <span class="hljs-comment"># 不规则路由</span>
│           ├── index.<span class="hljs-keyword">js </span>    <span class="hljs-comment"># 路由定义和代码异步分割</span>
│           ├── assets       <span class="hljs-comment"># 组件引入的静态资源</span>
│           ├── components   <span class="hljs-comment"># 直观React组件</span>
│           ├── container    <span class="hljs-comment"># 连接actions和store</span>
│           ├── modules      <span class="hljs-comment"># reducers/constants/actions的集合</span>
│           └── routes **    <span class="hljs-comment"># 不规则子路由(** 可选择的)</span>
└── tests                    <span class="hljs-comment"># 单元测试</span></code></pre>
<h2 id="articleHeader5">样式</h2>
<p>所有的css和sass都支持会被预处理。只要被引入，都会经过<a href="https://github.com/postcss/postcss" rel="nofollow noreferrer" target="_blank">PostCSS</a>压缩，加前缀。在生产环境下会提取到一个css文件下。</p>
<h2 id="articleHeader6">服务端</h2>
<p>这个项目的服务端使用Koa。需要注意的是，只有一个目的那就是提供了<code>webpack-dev-middleware</code> 和 <code>webpack-hot-middleware</code>（代码热替换）。使用自定义的Koa程序替换<a href="https://github.com/webpack/webpack-dev-server" rel="nofollow noreferrer" target="_blank">webpack-dev-server</a>，让它更容易实现universal 渲染和为了不使这个包过于庞大。</p>
<h2 id="articleHeader7">打包优化</h2>
<p>Babel被配置<a href="https://www.npmjs.com/package/babel-plugin-transform-runtime" rel="nofollow noreferrer" target="_blank">babel-plugin-transform-runtime</a>可以让代码更优化。另外，在生产环境，我们使用<a href="https://github.com/thejameskyle/babel-react-optimize" rel="nofollow noreferrer" target="_blank">react-optimize</a>来优化React代码。</p>
<p>在生产环境下，webpack会导出一个css文件并压缩Javascript，并把js模块优化到最好的性能。</p>
<h2 id="articleHeader8">静态部署</h2>
<p>如果你正在使用nginx处理程序，确保所有的路由都直接指向 <code>~/dist/index.html</code> 文件，然后让react-router处理剩下的事。如果你不是很确定应该怎么做，<a href="https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server" rel="nofollow noreferrer" target="_blank">文档在这里</a>。Express在脚手架中用于扩展服务和代理API，或者其它你想要做的事，这完全取决于你。</p>
<h2 id="articleHeader9">谢谢大家</h2>
<p>如果没有大家的贡献，这个项目是不可能诞生的， 感谢所有为这个项目做出贡献的人。</p>
<p><a href="https://github.com/bodyno/universal-react-starter-kit" rel="nofollow noreferrer" target="_blank">链接在这里</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
服务端渲染的React手脚架。完美使用 React, Redux, and React-Router！最好用的脚手架

## 原文链接
[https://segmentfault.com/a/1190000007229598](https://segmentfault.com/a/1190000007229598)


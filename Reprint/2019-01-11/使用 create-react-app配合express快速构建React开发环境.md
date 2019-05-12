---
title: '使用 create-react-app配合express快速构建React开发环境' 
date: 2019-01-11 2:30:08
hidden: true
slug: gk1j6oantng
categories: [reprint]
---

{{< raw >}}

                    
<p>最近临时接了一个项目，需要快速搭建前后端环境，因为脱离团队使用的框架来做，所以首选了一个比较成熟的方案来快速启动 react 环境，省却了许多配置 webpack 的烦恼。</p>
<h2 id="articleHeader0">脚手架介绍</h2>
<p>在这个环境下，Facebook 提供了一套不需要配置的 React 开发方案，即<a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a>。这个脚手架已经做好了基础 webpack 配置，带有自动更新，错误提示等等功能，仅仅需要创建，启动就可以快速开发。</p>
<p>这时也不得不提前端社区的另一个崛起者：<a href="https://yarnpkg.com/lang/zh-hans/" rel="nofollow noreferrer" target="_blank">yarn</a>。</p>
<p>Yarn与 npm 一样，是一款 NodeJS 包管理工具。 为何要选择使用 yarn 呢？官网的描述是：</p>
<blockquote>
<p>Yarn 会缓存它下载的每个包，所以不需要重复下载。它还能并行化操作以最大化资源利用率，所以安装速度之快前所未有。</p>
<p>Yarn 在每个安装包的代码执行前使用校验码验证包的完整性。</p>
<p>Yarn 使用一个格式详尽但简洁的 lockfile 和一个精确的算法来安装，能够保证在一个系统上的运行的安装过程也会以同样的方式运行在其他系统上。</p>
</blockquote>
<p>选用 Yarn 的原因也是因为他的速度提升比npm 要快，使用<code>yarn add &lt;package-name&gt;</code> ，<code>yarn remove &lt;package-name&gt;</code> 增删 node 包（对应<code>npm install</code>和<code>npm uninstall</code>）.</p>
<p>另一点是，yarn 在更新之后，集成了<code>create</code>, 通过<code>yarn create</code>，可以快速启动一个项目。</p>
<ul>
<li><p><code>yarn create react-app my-app</code></p></li>
<li><p><code>yarn create react-native-app my-app</code></p></li>
<li><p><code>yarn create next-app my-app</code></p></li>
</ul>
<hr>
<h2 id="articleHeader1">如何使用</h2>
<p>假设我们需要创建一个<code>demo-app</code>项目：</p>
<ol>
<li>
<p>创建目录<code>yarn create react-app demo-app</code></p>
<ul>
<li><p>稍等片刻，yarn 会为我们创建一个目录，拉取依赖，wepack 的配置通过 yarn 来调用，可以看到目录结构很干净<br><span class="img-wrap"><img data-src="https://ws4.sinaimg.cn/large/006tKfTcgy1fgroyjkljij30m8064gni.jpg" src="https://static.alili.techhttps://ws4.sinaimg.cn/large/006tKfTcgy1fgroyjkljij30m8064gni.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>安装完后会有清晰的提示<br><span class="img-wrap"><img data-src="https://ws3.sinaimg.cn/large/006tKfTcgy1fgrozi4bv8j30l10goqat.jpg" src="https://static.alili.techhttps://ws3.sinaimg.cn/large/006tKfTcgy1fgrozi4bv8j30l10goqat.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
</li>
<li>
<p>开始开发：<code>cd demo-app &amp;&amp; yarn start</code></p>
<ul>
<li><p>这时会启动一个默认端口为3000的页面，如果端口冲突，会提示你是否选用另一个端口</p></li>
<li><p>进入<code>src</code>目录开始开发即可<br><span class="img-wrap"><img data-src="https://ws1.sinaimg.cn/large/006tKfTcgy1fgrp0lcmknj30f30go40l.jpg" src="https://static.alili.techhttps://ws1.sinaimg.cn/large/006tKfTcgy1fgrp0lcmknj30f30go40l.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
</li>
<li>
<p>开发完成后需要发布时，运行<code>yarn build</code>进行编译，发布<code>build</code>目录</p>
<ul>
<li><p>创建完成会自动生成<code>build</code>文件夹，将 js,css 文件放入 static 目录中<br><span class="img-wrap"><img data-src="https://ws4.sinaimg.cn/large/006tKfTcgy1fgrp1mx800j30m807bact.jpg" src="https://static.alili.techhttps://ws4.sinaimg.cn/large/006tKfTcgy1fgrp1mx800j30m807bact.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>发布<code>build</code>目录即可</p></li>
</ul>
</li>
</ol>
<p>三部曲完成，中间省略了非常多配置问题，给需要快速构建项目带来了极大的便利性。当然，默认配置也许不能够满足所有需求，<code>create-react-app</code>也提供了 抛出所有配置项的<code>yarn eject</code>供给开发者使用，如果需要到调整 webpack 的内容，就需要使用到这个命令。不过这样也会导致不能再回滚。官方的更新比较快，如果不是必要的情况建议直接使用内置的行为。</p>
<hr>
<h2 id="articleHeader2">配合 Express 构建 server 端应用</h2>
<p>如果在项目开发过程中需要 express 构建server 端应用，那么开发模式就需要有小调整。</p>
<ol>
<li>
<p>首先创建一个叫<code>server</code>的文件夹和初始化 <code>package.json</code>文件：</p>
<ul><li><p><code>mkdir server &amp;&amp; cd server &amp;&amp; yarn init</code></p></li></ul>
</li>
<li>
<p>增加依赖包</p>
<ul>
<li><p><code>yarn add express body-parser nodemon babel-cli babel-preset-es2015</code></p></li>
<li><p>主要用到<code>express</code>, <code>body-parser</code>, <code>nodemon</code>（检测node.js 改动并自动重启，适用于开发阶段）,<code>babel-cli</code>和<code>babel-preset-es2015</code>(以便使用 es6开发)</p></li>
</ul>
</li>
<li>
<p>修改<code>package.json</code>，增加<code>npm scripts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   &quot;scripts&quot;: {
     &quot;start&quot;: &quot;nodemon --exec babel-node -- ./server.js&quot;,
     &quot;build&quot;: &quot;babel ./server.js --out-file server-compiled.js&quot;,
     &quot;serve&quot;: &quot;node server-compiled.js&quot;
   }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> {
   <span class="hljs-string">"scripts"</span>: {
     <span class="hljs-string">"start"</span>: <span class="hljs-string">"nodemon --exec babel-node -- ./server.js"</span>,
     <span class="hljs-string">"build"</span>: <span class="hljs-string">"babel ./server.js --out-file server-compiled.js"</span>,
     <span class="hljs-string">"serve"</span>: <span class="hljs-string">"node server-compiled.js"</span>
   }
 }</code></pre>
<ul>
<li><p>这里使用<code>nodemon</code>在开发阶段检测node.js 改动并自动重启</p></li>
<li><p>发布<code>build</code>的时候则通过 <code>babel</code>编译成 es5的文件</p></li>
</ul>
</li>
</ol>
<p><code>create-react-app</code>会启动一个静态资源服务器，那么同时需要进行 server 端的时候需要怎么做呢？</p>
<p>我们回过头来去修改一下<code>demo-app</code>目录下的<code>package.json</code>。</p>
<p><code>create-react-app</code>会默认添加好4段<code>scripts</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;react-scripts start&quot;,
    &quot;build&quot;: &quot;react-scripts build&quot;,
    &quot;test&quot;: &quot;react-scripts test --env=jsdom&quot;,
    &quot;eject&quot;: &quot;react-scripts eject&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code class="javas"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"react-scripts start"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"react-scripts build"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"react-scripts test --env=jsdom"</span>,
    <span class="hljs-string">"eject"</span>: <span class="hljs-string">"react-scripts eject"</span>
  }</code></pre>
<p>我们需要对 <code>start</code>和<code>build</code>做调整，以便可以同时启动前端开发页面以及后端服务。在这里引入<code>concurrently</code>这个包来执行两条命令：</p>
<p><code>yarn add concurrently</code></p>
<p>package.json:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;react-start&quot;: &quot;react-scripts start&quot;,
    &quot;start&quot;: &quot;concurrently 'yarn react-start' 'cd server &amp;&amp; yarn start'&quot;,
    &quot;react-build&quot;: &quot;react-scripts build&quot;,
    &quot;build&quot;: &quot;concurrently 'yarn react-build' 'cd server &amp;&amp; yarn build'&quot;,
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"react-start"</span>: <span class="hljs-string">"react-scripts start"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"concurrently 'yarn react-start' 'cd server &amp;&amp; yarn start'"</span>,
    <span class="hljs-string">"react-build"</span>: <span class="hljs-string">"react-scripts build"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"concurrently 'yarn react-build' 'cd server &amp;&amp; yarn build'"</span>,
  },</code></pre>
<p>这样，我们只要执行<code>yarn start</code>会同步启动 webpack 以及 server文件夹下的 nodeman.</p>
<p><span class="img-wrap"><img data-src="https://ws3.sinaimg.cn/large/006tKfTcgy1fgrp3bkhzzj30m80do459.jpg" src="https://static.alili.techhttps://ws3.sinaimg.cn/large/006tKfTcgy1fgrp3bkhzzj30m80do459.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<h4>Proxy</h4>
<p>如果我们在前端页面用使用<code>fetch(/api/data)</code>这样 请求，默认是会发送到create-react-app 启动的 <code>localhost:3000/api/data</code>去的，无法达到目的。为了指向 server 端，需要指定<code>proxy</code>:</p>
<p>假设 server 端 express 启动了5000端口，则需要在<code>package.json</code>中增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;proxy&quot;: &quot;http://127.0.0.1:5000&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"proxy"</span>: <span class="hljs-string">"http://127.0.0.1:5000"</span></code></pre>
<p>这时当你使用<code>fetch(/api/data)</code>请求，则会指向到<code>localhost:5000/api/data</code></p>
<p>轻松的开始开发吧~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 create-react-app配合express快速构建React开发环境

## 原文链接
[https://segmentfault.com/a/1190000009857965](https://segmentfault.com/a/1190000009857965)


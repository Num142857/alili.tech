---
title: 'Vue.js + LeanCloud（node.js）前后端分离开发样板' 
date: 2019-02-07 2:30:16
hidden: true
slug: 1vcgrf8l7h9
categories: [reprint]
---

{{< raw >}}

                    
<p>如果对您有帮助的话，欢迎 star~ <a href="https://github.com/jiangjiu/vue-leancloud-boilerplate" rel="nofollow noreferrer" target="_blank">我的github 地址</a></p>
<blockquote><p>另外现在用命令行部署 leancloud 有点问题，async/await 会报错，但是使用 git 部署不会,所以还是使用<code>lean deploy -g</code> 进行部署吧~</p></blockquote>
<p>LeanCloud 作为国内领先的 Baas 云服务提供者，简化了很多相对复杂的操作，使得前端工程师 hold 住一个完整项目变得简单。</p>
<blockquote><p>通过 LeanEngine 云引擎部署前后端代码，配合高效的数据存储完全解放了生产力，尤其是2015年 LeanCloud 推出的 LeanEngine-Full-Stack 解决方案，它整合了当前 Web 技术的通用方案，并与 LeanEngine 紧密结合，将基础架构、自动化构建、国际化方案等底层技术解决方案组织成一个整体。用户可以通过最简单的方式，直接开始业务开发，不必再纠结那些底层的技术选型了。</p></blockquote>
<p>但是，<strong>这个项目已经好久没有更新过了。。。</strong>最新的 LeanEngine 云引擎都升级到3.0，很多 api 都有变化，之前的全栈项目却是没人维护了。</p>
<p>最近学习 Vue.js 感觉真的好用，所以配合最新的云引擎写一个 boilerplate，作为以后快速开发的模板工具。</p>
<h2 id="articleHeader0">主要技术栈</h2>
<ul>
<li><p>语言方面，整套方案使用 ES6标准的 JavaScript 代码进行开发。</p></li>
<li><p>Server 端运行环境基于 LeanEngine Node.js 环境，依赖安装通过 npm，服务框架主要基于 Express 4.x。</p></li>
<li><p>前端取了个巧，直接使用了尤雨溪大大的 Vue-cli 生成。</p></li>
</ul>
<p>前后端完全分离，服务端设置了跨域，前端项目提出去也是 OK 的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── public          // LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此
├── server-modules  // 服务器端代码模块目录
│    ├── app            // LeanEngine 服务端代码主入口
│    ├── api-router     // API 接口路由配置
│    ├── tool           // 工具方法
│    └── hello          // 示例代码
├── fe                       // Web 前端项目目录
│    ├── build          // 前端开发环境
│    ├── config         // 配置文件
│    └── src            // 源码目录
└── server       // LeanEngine 的环境配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">.
├── public          <span class="hljs-comment">// LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此</span>
├── server-modules  <span class="hljs-comment">// 服务器端代码模块目录</span>
│    ├── app            <span class="hljs-comment">// LeanEngine 服务端代码主入口</span>
│    ├── api-router     <span class="hljs-comment">// API 接口路由配置</span>
│    ├── tool           <span class="hljs-comment">// 工具方法</span>
│    └── hello          <span class="hljs-comment">// 示例代码</span>
├── fe                       <span class="hljs-comment">// Web 前端项目目录</span>
│    ├── build          <span class="hljs-comment">// 前端开发环境</span>
│    ├── config         <span class="hljs-comment">// 配置文件</span>
│    └── src            <span class="hljs-comment">// 源码目录</span>
└── server       <span class="hljs-comment">// LeanEngine 的环境配置</span></code></pre>
<h2 id="articleHeader1">使用方式</h2>
<p>如果没有使用过，并不了解 LeanCloud 或 LeanEngine，先到<a href="http://leancloud.cn" rel="nofollow noreferrer" target="_blank">官网</a>中了解。</p>
<p>首先确认本机已经安装 <a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a> 运行环境和 <a href="https://leancloud.cn/docs/cloud_code_commandline.html" rel="nofollow noreferrer" target="_blank">LeanCloud 命令行工具</a>，之后按照以下方式开始您的开发：</p>
<p>git clone 本项目后</p>
<ul>
<li>
<p>在该项目<code>根目录</code>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install  // 安装服务端环境依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">$ npm install  <span class="hljs-comment">// 安装服务端环境依赖</span></code></pre>
</li>
<li>
<p>在 <code>fe 目录</code>中执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install  // 安装前端环境依赖" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">$ npm install  <span class="hljs-comment">// 安装前端环境依赖</span></code></pre>
</li>
</ul>
<h2 id="articleHeader2">调试</h2>
<ul>
<li>
<p>在<code>根目录</code>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ lean up" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>lean up</code></pre>
<p>运行服务器端环境，通过 <code>http://localhost:3000/</code> 可以测试</p>
</li>
<li>
<p>在 <code>fe 目录</code>中执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$  npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$  npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>运行 web 前端环境，通过 <code>http://localhost:8080</code> 可以调试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build // 前端资源压缩并发布到根目录 public文件夹中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm run build <span class="hljs-comment">// 前端资源压缩并发布到根目录 public文件夹中</span></code></pre>
</li>
<li><p>开发时需要同时运行这两个任务（开两个 terminal），就可以同时调试 Server 与 Web</p></li>
</ul>
<p>更多关于 LeanCloud 构建部署的命令可以在<a href="http://leancloud.cn" rel="nofollow noreferrer" target="_blank">LeanCloud官网</a>找到。</p>
<h2 id="articleHeader3">参考资料</h2>
<ul>
<li><p><a href="https://github.com/leancloud/LeanEngine-Full-Stack" rel="nofollow noreferrer" target="_blank">LeanEngine-Full-Stack</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></p></li>
</ul>
<h2 id="articleHeader4">协议</h2>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js + LeanCloud（node.js）前后端分离开发样板

## 原文链接
[https://segmentfault.com/a/1190000005873737](https://segmentfault.com/a/1190000005873737)


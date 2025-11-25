---
title: '? 阿里云前端工程化工具 Dawn 正式开源!' 
date: 2019-01-02 2:30:08
hidden: true
slug: 2q3ttqp2xu7
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011006491" src="https://static.alili.tech/img/remote/1460000011006491" alt="Banner" title="Banner" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">Dawn</h1>
<p>Dawn 取「黎明、破晓」之意，原为「阿里云·业务运营团队」内部的前端构建和工程化工具，现已完全开源。它通过 pipeline 和 middleware 将开发过程抽象为相对固定的阶段和有限的操作，简化并统一了开发人员的日常构建与开发相关的工作。</p>
<p><a href="https://github.com/alibaba/dawn/blob/master/LICENSE.md" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011006492" src="https://static.alili.tech/img/remote/1460000011006492" alt="npm" title="npm" style="cursor: pointer; display: inline;"></span></a>  <a href="https://www.npmjs.com/package/dawn" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011006493" src="https://static.alili.tech/img/remote/1460000011006493" alt="NPM Version" title="NPM Version" style="cursor: pointer; display: inline;"></span></a>  <a href="https://www.travis-ci.org/alibaba/dawn" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011006494" src="https://static.alili.tech/img/remote/1460000011006494" alt="Build Status" title="Build Status" style="cursor: pointer; display: inline;"></span></a>  <a href="https://coveralls.io/github/alibaba/dawn?branch=dev" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011006495" src="https://static.alili.tech/img/remote/1460000011006495" alt="Coverage Status" title="Coverage Status" style="cursor: pointer;"></span></a>  <a href="https://www.npmjs.com/package/dawn" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000011006496" src="https://static.alili.tech/img/remote/1460000011006496" alt="npm" title="npm" style="cursor: pointer; display: inline;"></span></a></p>
<p>项目地址：<a href="https://github.com/alibaba/dawn" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/dawn</a> （感兴趣请赏个 Star）</p>
<h2 id="articleHeader1">特点</h2>
<ul>
<li><p>采用中间件技术，封装常用功能，易于扩展，方便重用</p></li>
<li><p>支持 pipeline 让多个 task 协同完成构建任务</p></li>
<li><p>简单、一致的命令行接口，易于开发人员使用</p></li>
<li><p>根据模板快速生成项目工程结构</p></li>
<li><p>支持基于「中心服务」管理中件间和工程模板</p></li>
<li><p>支持搭建私有中心服务，并统一下发构建规则，易于团队统一管理</p></li>
</ul>
<h2 id="articleHeader2">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install dawn -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="sh" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> dawn -g</code></pre>
<h2 id="articleHeader3">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 1. 创建 &amp; 初始化
$ dn init -t front

# 2. 开发 &amp; 实时编译
$ dn dev

# 3. 语法检查 &amp; 测试
$ dn test

# 4. 构建 &amp; 打包
$ dn build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="sh"><span class="hljs-comment"># 1. 创建 &amp; 初始化</span>
<span class="hljs-variable">$ </span>dn init -t front

<span class="hljs-comment"># 2. 开发 &amp; 实时编译</span>
<span class="hljs-variable">$ </span>dn dev

<span class="hljs-comment"># 3. 语法检查 &amp; 测试</span>
<span class="hljs-variable">$ </span>dn test

<span class="hljs-comment"># 4. 构建 &amp; 打包</span>
<span class="hljs-variable">$ </span>dn build</code></pre>
<h2 id="articleHeader4">示例（.dawn.yml 或 .dawn 目录）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 启动开发服务
dev:
  - name: webpack
    entry: ./src/*.js
    template: ./assets/*.html
    watch: true
  - name: server
    port: 8001
    
# 直接构建
buid:
  - name: webpack
    entry: ./src/*.js
    template: ./assets/*.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="yml"><span class="hljs-comment"># 启动开发服务</span>
<span class="hljs-attr">dev:</span>
<span class="hljs-attr">  - name:</span> <span class="hljs-string">webpack</span>
<span class="hljs-attr">    entry:</span> <span class="hljs-string">./src/*.js</span>
<span class="hljs-attr">    template:</span> <span class="hljs-string">./assets/*.html</span>
<span class="hljs-attr">    watch:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  - name:</span> <span class="hljs-string">server</span>
<span class="hljs-attr">    port:</span> <span class="hljs-number">8001</span>
    
<span class="hljs-comment"># 直接构建</span>
<span class="hljs-attr">buid:</span>
<span class="hljs-attr">  - name:</span> <span class="hljs-string">webpack</span>
<span class="hljs-attr">    entry:</span> <span class="hljs-string">./src/*.js</span>
<span class="hljs-attr">    template:</span> <span class="hljs-string">./assets/*.html</span></code></pre>
<h2 id="articleHeader5">文档</h2>
<ul>
<li><p>使用入门：<a href="https://alibaba.github.io/dawn/docs/" rel="nofollow noreferrer" target="_blank">getting-started.md</a></p></li>
<li><p>配置 Pipeline：<a href="https://alibaba.github.io/dawn/docs/#!/zh/guide/pipeline" rel="nofollow noreferrer" target="_blank">pipeline.md</a></p></li>
<li><p>中件间：<a href="https://alibaba.github.io/dawn/docs/#!/zh/guide/middleware" rel="nofollow noreferrer" target="_blank">middleware.md</a></p></li>
<li><p>更多文档：<a href="https://alibaba.github.io/dawn/docs/" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/dawn/docs/</a></p></li>
</ul>
<p>-- end --</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
? 阿里云前端工程化工具 Dawn 正式开源!

## 原文链接
[https://segmentfault.com/a/1190000011006486](https://segmentfault.com/a/1190000011006486)


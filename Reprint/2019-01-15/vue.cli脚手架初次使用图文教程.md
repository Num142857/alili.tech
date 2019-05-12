---
title: 'vue.cli脚手架初次使用图文教程' 
date: 2019-01-15 2:30:12
hidden: true
slug: u3grnpm1zn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue-cli作用</h2>
<p>vue-cli作为vue的脚手架，可以帮助我们在实际开发中自动生成vue.js的模板工程。</p>
<h2 id="articleHeader1">vue-cli使用</h2>
<p><strong>!!前提：需要vue和webpack</strong></p>
<ol>
<li>
<p>安装全局vue-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install vue-<span class="hljs-keyword">cli</span> -g</code></pre>
</li>
<li>
<p>初始化，生成项目模板（my_project是项目名，自己随意）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack my_project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue</span> init webpack my_project</code></pre>
</li>
<li>
<p>进入生成的项目文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd my_project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> my_project</code></pre>
</li>
<li>
<p>初始化，安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
</li>
</ol>
<h5><strong>安装完成，目录树：</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVM9d5?w=209&amp;h=387" src="https://static.alili.tech/img/bVM9d5?w=209&amp;h=387" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>run：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>浏览器会自动打开到<a href="http://localhost:8080/#/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/#/</a> ，会看到欢迎页：</p>
<p><span class="img-wrap"><img data-src="/img/bVM9fE?w=300&amp;h=152" src="https://static.alili.tech/img/bVM9fE?w=300&amp;h=152" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面是在本地运行，服务器上运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>生成静态文件：</p>
<p><span class="img-wrap"><img data-src="/img/bVM9lK?w=300&amp;h=307" src="https://static.alili.tech/img/bVM9lK?w=300&amp;h=307" alt="打开dist文件" title="打开dist文件" style="cursor: pointer; display: inline;"></span></p>
<p>打开dist文件夹下新生成的index.html文件，会发现页面空白，打开控制台会发现页面中引用的css和js文件都找不到：<br><span class="img-wrap"><img data-src="/img/bVM9h8?w=768&amp;h=111" src="https://static.alili.tech/img/bVM9h8?w=768&amp;h=111" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>说明引用路径错了，需要手动修改：</p>
<p>进入config/index.js</p>
<p>原配置中的引用路径是’/’（根目录）：<br><span class="img-wrap"><img data-src="/img/bVM9mu?w=300&amp;h=151" src="https://static.alili.tech/img/bVM9mu?w=300&amp;h=151" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>修改为’./’（当前目录）：<br><span class="img-wrap"><img data-src="/img/bVM9mD?w=300&amp;h=148" src="https://static.alili.tech/img/bVM9mD?w=300&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>run：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>Done:<br><span class="img-wrap"><img data-src="/img/bVM9fE?w=300&amp;h=152" src="https://static.alili.tech/img/bVM9fE?w=300&amp;h=152" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.cli脚手架初次使用图文教程

## 原文链接
[https://segmentfault.com/a/1190000009291545](https://segmentfault.com/a/1190000009291545)


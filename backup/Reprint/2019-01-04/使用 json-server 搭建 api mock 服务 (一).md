---
title: '使用 json-server 搭建 api mock 服务 (一)' 
date: 2019-01-04 2:30:11
hidden: true
slug: 2eeweuxgjbk
categories: [reprint]
---

{{< raw >}}

                    
<p>在前端开发过程中，如果后端接口还没有提供，前端拿不到数据一些交互行为的代码可能就没法继续写，这时我们通常自己造一些数据来让页面流程走下去，最近项目切换到vue框架开发，发现json-server能很好的解决接口mock的问题</p>
<p><a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server官方地址</a></p>
<h4>安装</h4>
<p><code>$ npm install json-server -g</code> </p>
<p>启动json-server<br><code>$ json-server --watch db.json</code></p>
<p>通过官方的例子你可以发现<br><code>json-server</code>其实是在你访问接口时，返回<code>db.json</code>里面的对应的<code>key</code>的值<br>例如：你访问 <code>http://localhost:3000/posts/</code> 返回<code>db.json</code>里面的<code>json.posts</code></p>
<p>那么问题来了<br>1.如果我们要模拟的接口非常多，要一个一个的往<code>db.json</code>里面添加吗，其他前端人员也会修改到这个文件，每次合并代码都要考虑冲突问题，而且这个文件会变得非常庞大，难以维护<br>2.如果我的接口是<code>http://localhost:3000/a/b</code>，<code>http://localhost:3000/a/b/c</code> 怎么解决</p>
<p>本文就主要探讨下这两个问题的解决方案：</p>
<p>1，修改<code>package.json</code>里面的<code>npm run mock</code> 对应的命令为 <code>json-server mock/index.js</code><br>在项目中建立mock文件夹，文件夹下建立<code>index.js</code>（名字随意）文件，<br>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function () {
  return {
    a: ['接口a的返回数据'],
    b: ['接口b的返回数据']
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">a</span>: [<span class="hljs-string">'接口a的返回数据'</span>],
    <span class="hljs-attr">b</span>: [<span class="hljs-string">'接口b的返回数据'</span>]
  }
}</code></pre>
<p>此时启动<code>npm run mock</code>，访问<code>http://localhost:3000/a</code>，可以获得想要的结果<br>2，在mock文件夹下新建几个js文件，例如我新建了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└─ mock
   │─ test                  
   │  ├─ a.js
   │  └─ b.js
   └─ test2
      ├─ c.js
      └─ d.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">└─ mock
   │─ <span class="hljs-built_in">test</span>                  
   │  ├─ a.js
   │  └─ b.js
   └─ <span class="hljs-built_in">test</span>2
      ├─ c.js
      └─ d.js</code></pre>
<p>举例其中一个a.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  url: 'a',
  title: '',
  type: 'GET',
  decs: '',
  query: {
    a: '1'
  },
  res: {
    ret: 1,
    result: [
      {
        a: '2',
        b: '3',
        c: '4'
      }
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">url</span>: <span class="hljs-string">'a'</span>,
  <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">type</span>: <span class="hljs-string">'GET'</span>,
  <span class="hljs-attr">decs</span>: <span class="hljs-string">''</span>,
  <span class="hljs-attr">query</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-string">'1'</span>
  },
  <span class="hljs-attr">res</span>: {
    <span class="hljs-attr">ret</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">result</span>: [
      {
        <span class="hljs-attr">a</span>: <span class="hljs-string">'2'</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">'3'</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-string">'4'</span>
      }
    ]
  }
}
</code></pre>
<p>修改index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Path = require('path')
let glob = require('glob')

// 读取所有API文件
const apiFiles = glob.sync(Path.resolve(__dirname, './') + '/**/*.js', {
  nodir: true
})
let data = {}
// 输出所有api文件 i从1开始 跳过index.js
for (let i = 1, l = apiFiles.length; i < l; i++) {
  let api = require(apiFiles[i])
  if (api.url) {
    data[api.url] = api.res
  }
}
module.exports = function () {
  return data
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> Path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">let</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)

<span class="hljs-comment">// 读取所有API文件</span>
<span class="hljs-keyword">const</span> apiFiles = glob.sync(Path.resolve(__dirname, <span class="hljs-string">'./'</span>) + <span class="hljs-string">'/**/*.js'</span>, {
  <span class="hljs-attr">nodir</span>: <span class="hljs-literal">true</span>
})
<span class="hljs-keyword">let</span> data = {}
<span class="hljs-comment">// 输出所有api文件 i从1开始 跳过index.js</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>, l = apiFiles.length; i &lt; l; i++) {
  <span class="hljs-keyword">let</span> api = <span class="hljs-built_in">require</span>(apiFiles[i])
  <span class="hljs-keyword">if</span> (api.url) {
    data[api.url] = api.res
  }
}
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> data
}</code></pre>
<p>然后启动mock，你会看到控制台打印</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Resources
  http://localhost:8083/a
  http://localhost:8083/b
  http://localhost:8083/c
  http://localhost:8083/d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>Resources
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//localhost:8083/a</span>
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//localhost:8083/b</span>
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//localhost:8083/c</span>
<span class="hljs-symbol">  http:</span><span class="hljs-comment">//localhost:8083/d</span></code></pre>
<p>成功的实现了每个api分离，添加一个api我们只需要复制一个js文件，删除和修改也只是改动我们自己的文件，不会影响到团队其他成员</p>
<h4>第二个问题：如果我的api路径类似 <code>a/b</code>，<code>a/b/c</code>怎么办</h4>
<p>修改index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Path = require('path')
let glob = require('glob')

const apiFiles = glob.sync(Path.resolve(__dirname, './') + '/**/*.js', {
  nodir: true
})
let data = {}
for (let i = 1, l = apiFiles.length; i < l; i++) {
  let api = require(apiFiles[i])
  if (api.url) {
    data[api.url.replace(/\//g, '_')] = api.res
  }
}
module.exports = function () {
  return data
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> Path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">let</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)

<span class="hljs-keyword">const</span> apiFiles = glob.sync(Path.resolve(__dirname, <span class="hljs-string">'./'</span>) + <span class="hljs-string">'/**/*.js'</span>, {
  <span class="hljs-attr">nodir</span>: <span class="hljs-literal">true</span>
})
<span class="hljs-keyword">let</span> data = {}
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>, l = apiFiles.length; i &lt; l; i++) {
  <span class="hljs-keyword">let</span> api = <span class="hljs-built_in">require</span>(apiFiles[i])
  <span class="hljs-keyword">if</span> (api.url) {
    data[api.url.replace(<span class="hljs-regexp">/\//g</span>, <span class="hljs-string">'_'</span>)] = api.res
  }
}
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> data
}
</code></pre>
<p>启动mock服务，我们会看到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Resources
  http://localhost:8083/a
  http://localhost:8083/a_b
  http://localhost:8083/a_b_c
  http://localhost:8083/a_b_c_d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">Resources
  http://localhost:8083/a
  http://localhost:8083/a_b
  http://localhost:8083/a_b_c
  http://localhost:8083/a_b_c_d</code></pre>
<p>然后在项目根目录下添加<code>json-server.json</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;port&quot;: &quot;8888&quot;,
    &quot;routes&quot;: &quot;./mock/routes.json&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"port"</span>: <span class="hljs-string">"8888"</span>,
    <span class="hljs-attr">"routes"</span>: <span class="hljs-string">"./mock/routes.json"</span>
}
</code></pre>
<p>在mock文件夹下添加routes.json文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;/*/*/*/*/*&quot;: &quot;/$1_$2_$3_$4_$5&quot;,
  &quot;/*/*/*/*&quot;: &quot;/$1_$2_$3_$4&quot;,
  &quot;/*/*/*&quot;: &quot;/$1_$2_$3&quot;,
  &quot;/*/*&quot;: &quot;/$1_$2&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>{
  <span class="hljs-string">"/*/*/*/*/*"</span>: <span class="hljs-string">"/<span class="hljs-variable">$1_</span><span class="hljs-variable">$2_</span><span class="hljs-variable">$3_</span><span class="hljs-variable">$4_</span><span class="hljs-variable">$5</span>"</span>,
  <span class="hljs-string">"/*/*/*/*"</span>: <span class="hljs-string">"/<span class="hljs-variable">$1_</span><span class="hljs-variable">$2_</span><span class="hljs-variable">$3_</span><span class="hljs-variable">$4</span>"</span>,
  <span class="hljs-string">"/*/*/*"</span>: <span class="hljs-string">"/<span class="hljs-variable">$1_</span><span class="hljs-variable">$2_</span><span class="hljs-variable">$3</span>"</span>,
  <span class="hljs-string">"/*/*"</span>: <span class="hljs-string">"/<span class="hljs-variable">$1_</span><span class="hljs-variable">$2</span>"</span>
}</code></pre>
<p>这样我们就将每次请求的路径类似 <code>a/b/c/d/e</code>转换成了<code>a_b_c_d_e</code></p>
<p>启动mock服务，然后访问路径<code>localhost:8888/a/b/c/d/e</code>,完美</p>
<p>最后贴一下本文中所用到的文件的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└─ mock
│  │─ test             # 文件夹1           
│  │  ├─ a.js          # api1
|  │  └─ b.js          # api2
|  ├─ test2            # 文件夹2
|  │  ├─ c.js          # api3
|  │  └─ d.js          # api4
|  ├─ index.js         # 出口文件
|  └─ routers.json     # 路径转换配置文件
├─ json-server.json    # 端口等配置
└─ package.json        # 项目配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">└─ mock
│  │─ <span class="hljs-built_in">test</span>             <span class="hljs-comment"># 文件夹1           </span>
│  │  ├─ a.js          <span class="hljs-comment"># api1</span>
|  │  └─ b.js          <span class="hljs-comment"># api2</span>
|  ├─ <span class="hljs-built_in">test</span>2            <span class="hljs-comment"># 文件夹2</span>
|  │  ├─ c.js          <span class="hljs-comment"># api3</span>
|  │  └─ d.js          <span class="hljs-comment"># api4</span>
|  ├─ index.js         <span class="hljs-comment"># 出口文件</span>
|  └─ routers.json     <span class="hljs-comment"># 路径转换配置文件</span>
├─ json-server.json    <span class="hljs-comment"># 端口等配置</span>
└─ package.json        <span class="hljs-comment"># 项目配置</span></code></pre>
<p>本文系作者搭建mock服务的一点心得，如有关于搭建mock服务的优雅的解决方案，欢迎各路大神与作者沟通交流，欢迎指正本文中的错误</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 json-server 搭建 api mock 服务 (一)

## 原文链接
[https://segmentfault.com/a/1190000010629595](https://segmentfault.com/a/1190000010629595)


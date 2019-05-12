---
title: '如何发布第一个属于自己的npm包' 
date: 2018-12-09 2:30:08
hidden: true
slug: qvanrrke00r
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是NPM？</h2>
<p>NPM是随同NodeJS一起安装的javascript包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：</p>
<ol>
<li>允许用户从NPM服务器下载别人编写的第三方包到本地使用。</li>
<li>允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。</li>
<li>允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。</li>
</ol>
<h2 id="articleHeader1">发布前的准备</h2>
<h3 id="articleHeader2">1. 注册一个npm账号</h3>
<p>前往<a href="http://npmjs.org/" rel="nofollow noreferrer" target="_blank">NPM官网</a>进行注册</p>
<h3 id="articleHeader3">2. 创建一个简单的包</h3>
<p>在本地创建一个项目文件夹sugars_demo (名字自己取，不要和NPM上已有的包名重复冲突就好)<br>然后通过终端进入文件夹（路径每个人不一样）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd sugars_demo
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> sugars_demo
</code></pre>
<p>接着可以通过命令创建一个包信息管理文件package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init
</code></pre>
<p>一路回车或根据包的内容来填写相关信息后，package.json内容大概如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;sugars_demo&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;A demo&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  },
  &quot;repository&quot;: {
    &quot;type&quot;: &quot;git&quot;,
    &quot;url&quot;: &quot;&quot;
  },
  &quot;keywords&quot;: [
    &quot;sugars&quot;,
    &quot;demo&quot;
  ],
  &quot;author&quot;: {
    &quot;name&quot;: &quot;sugars&quot;,
    &quot;email&quot;: &quot;343166031@qq.com&quot;
  },
  &quot;license&quot;: &quot;MIT&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"sugars_demo"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A demo"</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
  },
  <span class="hljs-attr">"repository"</span>: {
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">""</span>
  },
  <span class="hljs-attr">"keywords"</span>: [
    <span class="hljs-string">"sugars"</span>,
    <span class="hljs-string">"demo"</span>
  ],
  <span class="hljs-attr">"author"</span>: {
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"sugars"</span>,
    <span class="hljs-attr">"email"</span>: <span class="hljs-string">"343166031@qq.com"</span>
  },
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>
}
</code></pre>
<p>接着在sugars_demo文件夹里创建一个index.js文件，然后简单敲几行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function (global, factory) {
  typeof exports === 'object' &amp;&amp; typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' &amp;&amp; define.amd ? define(factory) :
      global.moduleName = factory()
}(this, (function () {
  var test = {
    sayHi: function () {
      console.log('hi');
    }
  };

  return test
})))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">global, factory</span>) </span>{
  <span class="hljs-keyword">typeof</span> exports === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> !== <span class="hljs-string">'undefined'</span> ? <span class="hljs-built_in">module</span>.exports = factory() :
    <span class="hljs-keyword">typeof</span> define === <span class="hljs-string">'function'</span> &amp;&amp; define.amd ? define(factory) :
      global.moduleName = factory()
}(<span class="hljs-keyword">this</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> test = {
    <span class="hljs-attr">sayHi</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hi'</span>);
    }
  };

  <span class="hljs-keyword">return</span> test
})))
</code></pre>
<p>到这里一个简单的包就创建好了。<br>如果想再完善一下的话，还可以在包根目录下创建README.md文件，里面可以写一些关于包的介绍信息，最后发布后会展示在NPM官网上。</p>
<h2 id="articleHeader4">开始发布创建好的包</h2>
<p>使用终端命令行<br>如果是第一次发布包，执行以下命令，然后输入前面注册好的NPM账号，密码和邮箱，将提示创建成功</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">npm</span> <span class="hljs-keyword">adduser
</span></code></pre>
<p>如果不是第一次发布包，执行以下命令进行登录，同样输入NPM账号，密码和邮箱</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm login
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> login
</code></pre>
<p><strong>注意：npm adduser成功的时候默认你已经登陆了，所以不需要再进行npm login了</strong>   </p>
<p>接着先进入项目文件夹下，然后输入以下命令进行发布</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> publish

</code></pre>
<p>当终端显示如下面的信息时，就代表版本号为1.0.0的包发布成功啦！前往NPM官网就可以查到你的包了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myMacBook-Pro:sugars_demo sugars$ npm publish
+ sugars_demo@1.0.0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>myMacBook-<span class="hljs-symbol">Pro:</span>sugars_demo sugars<span class="hljs-variable">$ </span>npm publish
+ sugars_demo<span class="hljs-variable">@1</span>.<span class="hljs-number">0</span>.<span class="hljs-number">0</span>
</code></pre>
<p>如果遇到显示以下信息，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ERR publish 403

You do not have permission to publish 'bootstrap'.Are you logged in as
the corrent user?:bootstrap
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>npm ERR publish <span class="hljs-number">403</span>

You <span class="hljs-built_in">do</span> <span class="hljs-keyword">not</span> have permission <span class="hljs-built_in">to</span> publish <span class="hljs-string">'bootstrap'</span>.Are you logged <span class="hljs-keyword">in</span> <span class="hljs-keyword">as</span>
<span class="hljs-keyword">the</span> corrent user?:bootstrap
</code></pre>
<p>意思就是你没有权限发布名为“bootstrap”的包，显然这个鼎鼎有名的包已经有人发布了，所以你只能另取它名。</p>
<h2 id="articleHeader5">更新已经发布的包</h2>
<p>更新包的操作和发布包的操作其实是一样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> publish
</code></pre>
<p>但要注意的是，每次更新时，必须修改版本号后才能更新，比如将1.0.0修改为1.0.1后就能进行更新发布了。<br>这里的包版本号有一套规则，采用的是<a href="https://semver.org/lang/zh-CN/" rel="nofollow noreferrer" target="_blank">semver</a>（语义化版本），通俗点意思就是版本号：大改.中改.小改</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何发布第一个属于自己的npm包

## 原文链接
[https://segmentfault.com/a/1190000013940567](https://segmentfault.com/a/1190000013940567)


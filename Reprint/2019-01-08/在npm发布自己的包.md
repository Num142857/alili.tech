---
title: '在npm发布自己的包' 
date: 2019-01-08 2:30:11
hidden: true
slug: oq8xf0a0f18
categories: [reprint]
---

{{< raw >}}

                    
<p>今天通过一个简单的列子来演示怎么在npm发布自己的包。</p>
<h5>你需要先下载安装<a href="https://nodejs.org/" rel="nofollow noreferrer" target="_blank">node.js</a>
</h5>
<h3 id="articleHeader0">发布包</h3>
<p>1 新建个文件夹，这里命名为<code>test110</code>，，<br>2 然后再在<code>test110</code>下新建一个lib文件夹。<br>3 创建<code>package.json</code>,在<code>test110</code>文件夹下，右键选择<code>git bash here</code>输入命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>然后<code>name</code>输入<code>test110</code>，然后一路回车，最后<code>ctrl + c</code>结束,</p>
<p>4 创建<code>readme.md</code>文件，在<code>test110</code>文件夹下,在新建一个<code>readme.md</code>文件（这是一个介绍你包的文件<code>makdown</code>文件），随便输入点什么，如<code>这是我的第一个npm包</code>。<br>5 在lib文件夹下新建新建一个<code>test.js</code>文件，输入如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {
    fu : function() {
        console.log( '这是我的第一个npm包' );
    };
}
module.exports = a; // 把a暴漏出去" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = {
    <span class="hljs-attr">fu</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log( <span class="hljs-string">'这是我的第一个npm包'</span> );
    };
}
<span class="hljs-built_in">module</span>.exports = a; <span class="hljs-comment">// 把a暴漏出去</span></code></pre>
<p>6 在<code>test110文件夹</code>下新建一个<code>index.js文件</code>（主入口文件），输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = require( './lib/test.js' );
module.exports = a; //把a暴漏出去" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">require</span>( <span class="hljs-string">'./lib/test.js'</span> );
<span class="hljs-built_in">module</span>.exports = a; <span class="hljs-comment">//把a暴漏出去</span></code></pre>
<p>7 包文件已经ok,结构如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-test110
    -lib
        -test.js
    -index.js
    -package.json
    -readme.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>-test110
    -<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
        -test.js
    -index.js
    -package.json
    -readme.md</code></pre>
<p>8 创建npm账号，两种方式</p>
<p>第一种:打开<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a> 注册</p>
<p>第二种：命令行注册，输入如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm adduser" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> adduser</code></pre>
<p>依次输入用户名，密码，邮箱就注册成功了。注册成功会自动登录，所以现在已经在本地登录成功。<br>如果你已经有<code>npm</code>账号可通过与哦如下命名登录，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> login</code></pre>
<p>输入用户名，密码就可登陆成功。</p>
<p>9 发布包，在<code>test110文件夹</code>下，右键选择<code>git bash here</code>，输入如下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> publish</code></pre>
<p>就可发布成功，注意发布必须是登录状态下。</p>
<p>10 这时你就可以在<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm官网</a> ,通过在搜索框中输入<code>test110</code>来查询到你刚才发布的包了。<br>11 更新包，你修改过包里的js文件时，同时还得修改package.json里version的版本号后才可重新发布。</p>
<h3 id="articleHeader1">应用包</h3>
<p>1 这时你新建个文件夹（如<code>test</code>）就可以通过以下命令下载你发布的包了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install test110" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">test</span>110</code></pre>
<p>2 然后，在<code>test文件夹</code>下新建<code>in.js</code>文件，输入如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var test110 = require( 'test110' );
test110.fu();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>var <span class="hljs-built_in">test</span>110 = require( <span class="hljs-string">'test110'</span> );
<span class="hljs-built_in">test</span>110.fu();</code></pre>
<p>3 在<code>test文件夹</code>,右键选择<code>git bash here</code>,输入如下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node in.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">in</span>.js</code></pre>
<p>就可以输出<code>这是我的第一个npm包</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在npm发布自己的包

## 原文链接
[https://segmentfault.com/a/1190000010224751](https://segmentfault.com/a/1190000010224751)


---
title: 'npm常用命令及参数详解' 
date: 2018-12-25 2:30:11
hidden: true
slug: 6lpvd12ta9a
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>NPM命令详解</strong><br>平时工作中经常用npm安装，每次用的时候有些命令都要去查一次，这次就自己把这些命令整理下，让自己可以多记住一些。<br>对于还不知道NPM是什么的同学请自行google吧  这里我就不多BB了，主要记录一下NPM几个常用命令和参数的意思</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> packagename</code></pre>
<p>安装模块如不指定版本号 默认会安装最新的版本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename 0.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">packagename</span> 0<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span></code></pre>
<p>安装指定版本的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>这个命令会在当前目录生成一个package.json文件，这个文件中会记录一些关于项目的信息，比如：项目的作者，git地址，入口文件、命令设置、项目名称和版本号等等，一般情况下这个文件是必须要有的，方便后续的项目添加和其他开发人员的使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename --save 或 -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> packagename <span class="hljs-comment">--save 或 -S</span></code></pre>
<p>--save、-S参数意思是把模块的版本信息保存到dependencies（生产环境依赖）中，即你的package.json文件的dependencies字段中；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename --save-dev 或 -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install packagename --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> 或 -D</code></pre>
<p>--save-dev 、 -D参数意思是吧模块版本信息保存到devDependencies（开发环境依赖）中，即你的package.json文件的devDependencies字段中；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename --save-optional 或 -O" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">npm install packagename --<span class="hljs-keyword">save</span>-<span class="hljs-keyword">optional</span> 或 -O</code></pre>
<p>--save-optional 、 -O参数意思是把模块安装到optionalDependencies（可选环境依赖）中，即你的package.json文件的optionalDependencies字段中。（本人菜鸟一枚，一直也没理解这个，不过看到了就记录一下吧，万一哪天用到了，说不准就懂了......）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename --save-exact 或 -E" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> packagename <span class="hljs-comment">--save-exact 或 -E</span></code></pre>
<p>--save-exact 、 -E参数的意思是精确的安装指定版本的模块，细心的同学会发现dependencies字段里每个模块版本号前面的^不见鸟。。。</p>
<p>如果你打开的是别人的项目，这个时候一般是没有任何依赖包的，但是所以需要的包已在package.json里面写好了，这个时候我们就可以使用<code>npm install</code>来安装所有项目中需要的依赖包了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install packagename -g 或 --global" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install packagename -g 或 --<span class="hljs-built_in">global</span></code></pre>
<p>安装全局的模块（不加参数的时候默认安装本地模块）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm list 或 npm ll 或 npm la 或 npm ls" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> list 或 <span class="hljs-built_in">npm</span> ll 或 <span class="hljs-built_in">npm</span> la 或 <span class="hljs-built_in">npm</span> ls</code></pre>
<p>查看所有已经安装的模块  <code>ll</code> 、 <code>ls</code> 、 <code>la</code> 三个命令意思都一样 但是列表的展示方式不一样  喜欢用哪个就看个人喜好了,不懂的同学可以每个都去试下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall packagename [options]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm uninstall packagename <span class="hljs-string">[options]</span></code></pre>
<p>卸载已经安装的模块，后面的options参数意思与安装时候的意思一样,与这个命令相同的还有<code>npm remove </code>、<code>npm rm</code>、<code>npm r</code> 、 <code>npm un</code> 、 <code>npm unlink</code> 这几个命令功能和<code>npm uninstall</code>基本一样，个人觉得没什么区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm outdated" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> outdated</code></pre>
<p>这个命令会列出所有已经过时了的模块，对于已经过时了的模块可以使用下面的命令去更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm update [-g]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">npm update <span class="hljs-string">[-g]</span></code></pre>
<p>更新已经安装的模块(或全局的模块)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm help '命令'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">help</span> <span class="hljs-string">'命令'</span></code></pre>
<p>查看某条命令的详细帮助</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm root" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> root</code></pre>
<p>查看命令的绝对路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-built_in">config</span> </code></pre>
<p>设置npm命令的配置路径，这个命令一般用于设置代理，毕竟大部分都是国外的模块，不过个人还是比较喜欢用<code>cnpm</code> 这个命令是用的淘宝的镜像，用法与npm一样，速度还可以。</p>
<p>除去以上的这些命令外，经常还能见到一些<code>npm start</code>、<code>npm deploy</code>、 <code>npm build</code>等等之类的命令，这些一般都是在package.json 中自定义的一些启动、重启、停止服务之类的命令。可以在package.json文件的scripts字段里自定义。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;: &quot;webpack&quot;,
    &quot;start&quot;: &quot;webpack-dev-server main.js,
    &quot;deploy&quot;: &quot;set NODE_ENV=production&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
    <span class="hljs-string">"start"</span>: "webpack-dev-server main.js,
    <span class="hljs-string">"deploy"</span>: <span class="hljs-string">"set NODE_ENV=production"</span>
  }</code></pre>
<p>关于package.json的详细文档，有兴趣的同学可以参考<a href="https://github.com/ericdum/mujiang.info/issues/6/" rel="nofollow noreferrer" target="_blank">《package.json中文文档》</a>；</p>
<p>以上便是本次npm一些命令和参数的记录了，有疑问或者发现有错误的地方可在下方留言。喜欢的同学可以动动鼠标点个赞哦！ 祝您工作顺利。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
npm常用命令及参数详解

## 原文链接
[https://segmentfault.com/a/1190000012099112](https://segmentfault.com/a/1190000012099112)


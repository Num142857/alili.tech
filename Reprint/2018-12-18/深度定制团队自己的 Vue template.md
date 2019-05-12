---
title: '深度定制团队自己的 Vue template' 
date: 2018-12-18 2:30:10
hidden: true
slug: uf2qq7b0tis
categories: [reprint]
---

{{< raw >}}

                    
<p>众所周知，使用 <code>vue-cli</code> 可以快速初始化一个基于 <code>Vue.js</code> 的项目，官方提供了 <code>webpack</code>、<code>pwa</code>、<code>browserify-simple</code> 等<a href="https://github.com/vuejs-templates" rel="nofollow noreferrer" target="_blank">常用 templates</a>。</p>
<p>当开发一个独立项目的时候，使用官方提供的 <code>template</code> 确实非常方便，省去了繁琐的依赖安装配置、<code>webpack</code> 配置，甚至连项目结构也不用多加考虑。</p>
<p>但是，当我们需要开发多个系统，每个系统相对独立但又有一些配置、依赖或逻辑相互通用的时候（例如集群的多后台系统），每次使用官方提供的 <code>template</code> 初始化项目之后，都需要进一步调整（添加依赖、修改配置、增加通用组件等等），这显然是十分麻烦的。<br>本着<del>懒惰是第一生产力</del>的初衷，我们需要定制一份自己的 <code>template</code>，以便我们...额...偷懒哈~<br><span class="img-wrap"><img data-src="/img/bV1X7R?w=78&amp;h=97" src="https://static.alili.tech/img/bV1X7R?w=78&amp;h=97" alt="hehe" title="hehe" style="cursor: pointer; display: inline;"></span></p>
<p>在开始定制我们自己的 <code>Vue template</code> 前，我们需要了解一些前置知识：</p>
<h3 id="articleHeader0"><strong>前置知识</strong></h3>
<ol>
<li>
<p>模板结构<br>　　首先我们先来了解模板的主要结构，模板结构很简单，主要包括两个部分：</p>
<ul>
<li>template 该目录用于存放模板文件，初始化项目生成的文件来自于此。</li>
<li>meta.js / meta.json 用于描述初始化项目时命令行的交互动作。</li>
</ul>
</li>
<li>
<a href="https://github.com/segmentio/metalsmith" rel="nofollow noreferrer" target="_blank">Metalsmith</a><br>　　<code>Metalsmith</code> 在渲染项目文件流程中角色相当于 <code>gulp.js</code>，可以通过添加一些插件对构建文件进行处理，如重命名、合并等。</li>
<li>
<p><a href="https://github.com/flipxfx/download-git-repo" rel="nofollow noreferrer" target="_blank">download-git-repo</a><br>　　使用 <code>vue-cli</code> 初始化项目时会使用该工具来下载目标仓库。默认的 <code>webpack</code> 等模板直接下载 <code>vue-templates</code> 中对应的模板仓库。<br>　　自定义的模板也可以是一个 GitHub 仓库，使用如下命令来初始化项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init username/repo my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vue init username/repo my-project</code></pre>
<blockquote>其中 <code>username</code> 为自定义模板仓库所在的 GitHub 用户或组织名，<code>repo</code> 为仓库名。</blockquote>
</li>
<li>
<p><a href="https://github.com/SBoudrias/Inquirer.js#question" rel="nofollow noreferrer" target="_blank">Inquirer.js</a><br>　　<code>vue-cli</code> 在模板仓库下载完成后，将通过 <code>Inquirer.js</code> 根据模板仓库中的 <code>meta.js</code> 或 <code>meta.json</code> 文件中的设置，与用户进行一些简单的交互以确定项目的一些细节，如下图：<br><span class="img-wrap"><img data-src="/img/bV1X7N?w=1036&amp;h=1582" src="https://static.alili.tech/img/bV1X7N?w=1036&amp;h=1582" alt="cli-perview" title="cli-perview" style="cursor: pointer; display: inline;"></span></p>
<blockquote>该交互配置是可选的，当项目中<strong>没有</strong> <code>meta.js</code> 或 <code>meta.json</code> 文件时，模板仓库下载完成后将直接进入模板构建阶段。</blockquote>
</li>
<li>
<a href="https://github.com/wycats/handlebars.js/" rel="nofollow noreferrer" target="_blank">Handlebars.js</a><br>　　在通过命令行交互确定了项目初始化的细节后，就该进入最后一道工序，按照模板初始化我们的项目啦！\(≧▽≦)/ <br>　　这里 <code>vue-cli</code> 选用的是 <code>Handlebars.js</code> —— 一个简单高效的语义化模板构建引擎。</li>
</ol>
<p>　　画了一张图，更有助于理清这些依赖在 <code>vue-cli</code> 初始化项目时的相互关联：<br><span class="img-wrap"><img data-src="/img/bV1X79?w=889&amp;h=517" src="https://static.alili.tech/img/bV1X79?w=889&amp;h=517" alt="vue-cli-process" title="vue-cli-process" style="cursor: pointer;"></span></p>
<blockquote>定制模板主要围绕着<strong>命令行交互</strong>（<code>Inquirer.js</code>）与<strong>模板文件开发</strong>（<code>Handlebars.js</code>）这两部分。</blockquote>
<h3 id="articleHeader1">meta.js 配置文件（Inquirer.js）</h3>
<p>　　由于 <code>meta.js</code> 相当于模板项目的配置文件（虽然非必选），所以这里先看看它主要能干些啥。<br>　　设置都在 <code>meta.js</code> 或 <code>meta.json</code> 中配置，推荐使用 <code>meta.js</code>，更灵活一些。以下也将以 <code>meta.js</code> 进行展开说明。<br>　　<code>meta.js</code> 一共可包含如下几个字段，简单列一下各字段功能：</p>
<ul>
<li>
<code>helpers</code> : 自定义 <code>Handlebars.js</code> 的辅助函数</li>
<li>
<code>prompts</code> : 基于 <code>Inquirer.js</code> 的命令行交互配置</li>
<li>
<code>filters</code> : 根据命令行交互的结果过滤将要渲染的项目文件</li>
<li>
<code>metalsmith</code> : 配置 <code>Metalsmith</code> 插件，文件会像 <code>gulp.js</code> 中的 <code>pipe</code> 一样依次经过各个插件处理</li>
<li>
<code>completeMessage</code> : 将模板渲染为项目后，输出一些提示信息，取值为字符串</li>
<li>
<code>complete</code> : 与 <code>completeMessage</code> 功能相同，二选其一，取值为函数，函数最后需返回输出的字符串</li>
</ul>
<h3 id="articleHeader2">命令行交互（Inquirer.js）</h3>
<p>　　命令行交互主要是 <code>meta.js</code> 中 <code>prompts</code> 字段的配置，详细的配置可以阅读 <code>Inquirer.js</code> 的 <a href="https://github.com/SBoudrias/Inquirer.js/#question" rel="nofollow noreferrer" target="_blank">README.md</a>，这里说一下常用的交互配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// meta.js
module.export = {
  // ...
  &quot;prompts&quot;: {
    &quot;isCustomName&quot;: {
      &quot;type&quot;   : &quot;confirm&quot;,
      &quot;message&quot;: &quot;是否自定义系统名称？&quot;,
    },
    &quot;sysName&quot;: {
      &quot;type&quot;    : &quot;input&quot;,
      &quot;when&quot;    : &quot;isCustomName&quot;,
      &quot;default&quot; : &quot;默认系统名称&quot;,
      &quot;message&quot; : &quot;请输入系统名称:&quot;,
      &quot;required&quot;: true,
      &quot;validate&quot;: function (val) {
        if (!val) return '(✘) 请输入系统名称，该名称将设为 index.html 的 title';
        return true;
      },
    },
    // ...
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// meta.js</span>
<span class="hljs-built_in">module</span>.export = {
  <span class="hljs-comment">// ...</span>
  <span class="hljs-string">"prompts"</span>: {
    <span class="hljs-string">"isCustomName"</span>: {
      <span class="hljs-string">"type"</span>   : <span class="hljs-string">"confirm"</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"是否自定义系统名称？"</span>,
    },
    <span class="hljs-string">"sysName"</span>: {
      <span class="hljs-string">"type"</span>    : <span class="hljs-string">"input"</span>,
      <span class="hljs-string">"when"</span>    : <span class="hljs-string">"isCustomName"</span>,
      <span class="hljs-string">"default"</span> : <span class="hljs-string">"默认系统名称"</span>,
      <span class="hljs-string">"message"</span> : <span class="hljs-string">"请输入系统名称:"</span>,
      <span class="hljs-string">"required"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">"validate"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
        <span class="hljs-keyword">if</span> (!val) <span class="hljs-keyword">return</span> <span class="hljs-string">'(✘) 请输入系统名称，该名称将设为 index.html 的 title'</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      },
    },
    <span class="hljs-comment">// ...</span>
  },
}</code></pre>
<p>字段说明：</p>
<ul>
<li>
<code>isCustomName</code> 与 <code>sysName</code> : 交互字段名称，<strong>可在后续条件交互或模板渲染时通过该字段读取到交互结果</strong>
</li>
<li>
<code>type</code> : 交互类型，有 <code>input</code>, <code>confirm</code>, <code>list</code>, <code>rawlist</code>, <code>expand</code>, <code>checkbox</code>, <code>password</code>, <code>editor</code> 八种类型</li>
<li>
<code>message</code> : 交互的提示信息</li>
<li>
<code>when</code> : 进行该条件交互的先决条件，在该例子中，<code>sysName</code> 这个交互动作只在 <code>isCustomName</code> 交互结果为真时才会出现</li>
<li>
<code>default</code> : 默认值，当用户输入为空时，交互结果即为此值</li>
<li>
<code>required</code> : 默认为 <code>false</code>，该值是否为必填项</li>
<li>
<code>validate</code> : 输入验证函数</li>
</ul>
<blockquote>注：示例中 <code>default</code> <code>required</code> <code>validate</code> 三个字段存在逻辑问题，仅为举例方便放到一起。</blockquote>
<h3 id="articleHeader3">模板基本语法（Handlebars.js）</h3>
<p>　　在模板编写中，我们可以用 <code>Mustache</code> 语法在任何文本类型的文件中输出在命令行交互中得到的一些数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// dev.js
export default {
  //...
  token: '"{{"token"}}"',
  //...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// dev.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">//...</span>
  token: <span class="hljs-string">'"{{"token"}}"'</span>,
  <span class="hljs-comment">//...</span>
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>"{{"sysName"}}"</title>
  </head>
  <!-- ... -->
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>"{{"sysName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>　　以 <code>{%raw%}"{{"xxx"}}"{%endraw%}</code> 即为一个 <code>Mustache</code> 句法标记。以上例子中 <code>token</code> 与 <code>sysName</code> 为匹配命令行交互数据对应的键名。</p>
<blockquote>对 <code>vue</code> 有过了解的都知道，在模板标签中直接输出实例上的数据也是用的 <code>Mustache</code> 语法。<br>如果定制 <code>vue template</code> 模板时不对这些数据做相应处理，在最终输出由模板初始化的项目时，这些与命令行交互得到的数据无法匹配的 <code>Mustache</code> 句法标记会被移除。<br>此时我们需要使用反斜杠 <code>\{%raw%}"{{"xxx"}}"{%endraw%}</code> 或者 <code>{%raw%}"{{"{xxx"}}"}{%endraw%}</code> 来跳过 <code>Handlebars</code> 的处理，直接输出 <code>{%raw%}"{{"xxx"}}"{%endraw%}</code>
</blockquote>
<h3 id="articleHeader4">模板渲染时的辅助函数（Handlebars.js）</h3>
<p>　　<code>vue-cli</code> 中为 <code>Handlebars</code> 预置了 <code>if_eq</code> 与 <code>unless_eq</code> 辅助函数，用于使用交互所得数据来处理模板中是否渲染的两种逻辑关系，此外 <code>Handlebars</code> 中还内置了 <code>if</code>、<code>unless</code>、<code>each</code> 等 <a href="http://handlebarsjs.com/builtin_helpers.html" rel="nofollow noreferrer" target="_blank">辅助函数</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// sys.js
export default {
  "{{"#if_eq projType 'admin'"}}"
  id: "{{"#if_eq sysId ''"}}"undefined"{{"else"}}""{{"sysId"}}""{{"/if_eq"}}",
  "{{"/if_eq"}}"
  name: '"{{"sysName"}}"',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// sys.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  "{{"#if_eq projType <span class="hljs-string">'admin'</span>"}}"
  id: "{{"#if_eq sysId <span class="hljs-string">''</span>"}}"<span class="hljs-literal">undefined</span>"{{"<span class="hljs-keyword">else</span>"}}""{{"sysId"}}""{{"/if_eq"}}",
  "{{"/if_eq"}}"
  name: <span class="hljs-string">'"{{"sysName"}}"'</span>,
};</code></pre>
<p>　　如上，这里用了 <code>if_eq</code> 辅助函数，<code>projType</code> 代表将要匹配的键，<code>'admin'</code> 代表将要匹配的值。这个键值来自于在命令行界面与用户交互的操作结果。该栗子中，当命令行交互数据中 <code>CLI[projType] == 'admin'</code> 时，将在 <code>sys.js</code> 文件的导出数据中输出 <code>id</code> 字段；<code>id</code> 的值来自一个嵌套的 <code>if_eq</code> 辅助函数，当 <code>CLI[sysId] == ''</code> 时，<code>id</code> 将被设置为 <code>undefined</code> 否则 （<code>{%raw%}"{{"else"}}"{%endraw%}</code>）输出 <code>CLI[sysId]</code> 命令行交互所得数据中的 <code>sysId</code>。</p>
<blockquote>辅助函数使用语法： <code>{%raw%}"{{"{%endraw%}#</code> + <code>函数名</code> + ' '（空格）+ <code>以空格分隔的参数列表</code> + <code>"}}"</code><br>以空格分隔的参数列表：未用引号包裹的参数名将被将为自动取值为命令行交互结果中对应的数据</blockquote>
<h3 id="articleHeader5">自定义辅助函数（Handlebars.js）</h3>
<p>　　有时候现有的辅助函数可能不能满足我们的需求，通过 <code>mate.js</code> 中的 <code>helpers</code> 字段我们可以自定义辅助函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mate.js
module.exports = {
  &quot;helpers&quot;: {
    &quot;neither&quot;: function (k, v1, v2, options) {
      if (k !== v1 &amp;&amp; k !== v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
  },
  //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// mate.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">"helpers"</span>: {
    <span class="hljs-string">"neither"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">k, v1, v2, options</span>) </span>{
      <span class="hljs-keyword">if</span> (k !== v1 &amp;&amp; k !== v2) {
        <span class="hljs-keyword">return</span> options.fn(<span class="hljs-keyword">this</span>);
      }
      <span class="hljs-keyword">return</span> options.inverse(<span class="hljs-keyword">this</span>);
    },
  },
  <span class="hljs-comment">//...</span>
}</code></pre>
<p>　　辅助函数可以接受若干的参数，最后一个参数 <code>options</code> 为辅助函数的钩子，调用 <code>options.fn(this)</code> 即输出该辅助函数运算结果为真时的内容，反之调用 <code>options.inverse(this)</code> 则输出 <code>{%raw%}"{{"else"}}"{%endraw%}</code> 的内容（如果有的话）。<br>　　现在我们可以在模板中直接使用 <code>neither</code> 辅助函数了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"#neigher sysType 'admin' 'mobile'"}}"
isAdmin  = false
isMobile = false
"{{"else"}}"
isAdminOrMobile = true
"{{"/neigher"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">"{{"#neigher sysType <span class="hljs-string">'admin'</span> <span class="hljs-string">'mobile'</span>"}}"
isAdmin  = <span class="hljs-literal">false</span>
isMobile = <span class="hljs-literal">false</span>
"{{"<span class="hljs-keyword">else</span>"}}"
isAdminOrMobile = <span class="hljs-literal">true</span>
"{{"/neigher"}}"</code></pre>
<h3 id="articleHeader6">按条件过滤渲染文件</h3>
<p>　　辅助函数只可以控制文件内一部分内容的输出与否，有时候我们需要根据交互结果控制某些文件本身是否输出。<br>　　在 <code>mate.js</code> 中的 <code>filters</code> 字段中进行相应的设置，就可以达到控制文件输出的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //...
  &quot;filters&quot;: {
    &quot;project/config/test.env.js&quot;: &quot;unit || e2e&quot;,
    &quot;project/src/router/**/*&quot;: &quot;router&quot;
  },
  //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//...</span>
  <span class="hljs-string">"filters"</span>: {
    <span class="hljs-string">"project/config/test.env.js"</span>: <span class="hljs-string">"unit || e2e"</span>,
    <span class="hljs-string">"project/src/router/**/*"</span>: <span class="hljs-string">"router"</span>
  },
  <span class="hljs-comment">//...</span>
}</code></pre>
<p>　　<code>filters</code> 中<strong>键名</strong>是要控制输出的文件的路径，可使用字面量，也可使用 <a href="https://github.com/isaacs/minimatch" rel="nofollow noreferrer" target="_blank">简化的 glob 表达式</a>。键名对应的值为命令行交互中得到的数据。</p>
<h3 id="articleHeader7">渲染时文件的操作</h3>
<p>　　在模板项目比较复杂或是有特殊需求的时候，比如：</p>
<ul>
<li>按照条件不同需要渲染两个文件名相同但内容完全不同的文件</li>
<li>模板模块化，多个模板文件拼接渲染为一个项目文件</li>
<li>使用 GZip 压缩一些非源码资源</li>
</ul>
<p>　　可以通过 <code>mate.js</code> 中的 <code>metalsmith</code> 字段配置相关插件来实现丰富的文件操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var renamer = require('metalsmith-renamer')
module.exports = {
  //...
  &quot;metalsmith&quot;: function(metalsmith, opts, helpers) {
    metalsmith.use(renamer({
      index: {
        pattern: 'project/**/+(Mobile|Admin)Index.vue',
        rename: function(fileName) {
          return 'Index.vue';
        }
      },
      config: {
        pattern: 'project/src/+(mobile|admin)Config.js',
        rename: 'config.js'
      },
      //...
    }))
  },
  //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> renamer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'metalsmith-renamer'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//...</span>
  <span class="hljs-string">"metalsmith"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">metalsmith, opts, helpers</span>) </span>{
    metalsmith.use(renamer({
      <span class="hljs-attr">index</span>: {
        <span class="hljs-attr">pattern</span>: <span class="hljs-string">'project/**/+(Mobile|Admin)Index.vue'</span>,
        <span class="hljs-attr">rename</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName</span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-string">'Index.vue'</span>;
        }
      },
      <span class="hljs-attr">config</span>: {
        <span class="hljs-attr">pattern</span>: <span class="hljs-string">'project/src/+(mobile|admin)Config.js'</span>,
        <span class="hljs-attr">rename</span>: <span class="hljs-string">'config.js'</span>
      },
      <span class="hljs-comment">//...</span>
    }))
  },
  <span class="hljs-comment">//...</span>
}</code></pre>
<p>　 以上是 <code>metalsmith-renamer</code> 插件的简单使用，更多插件可以在<a href="http://www.metalsmith.io/#the-community-plugins" rel="nofollow noreferrer" target="_blank">这里</a>查找</p>
<blockquote>使用 <code>metalsmith</code> 插件请注意：由于 <code>vue-cli</code> 在下载完成模板仓库后并没有 <code>npm install</code> 安装模板的项目依赖这一操作，所以在打包模板仓库的时候也需要将依赖目录 <code>node_modules</code> 一同打包，<code>metalsmith</code> 的插件都很精简，一般不会有什么嵌套依赖。不过还是建议在使用前查看一下插件的相关 <code>Github</code> 仓库。</blockquote>
<p>　　关于 <code>vue</code> 项目模板的开发涉及到的问题差不多就介绍完了，为自己或团队开发一份专属的 <code>Vue Template</code> 吧！</p>
<blockquote>原文: <a href="https://blog.beard.ink/JavaScript/%E6%B7%B1%E5%BA%A6%E5%AE%9A%E5%88%B6%E5%9B%A2%E9%98%9F%E8%87%AA%E5%B7%B1%E7%9A%84-Vue-template/" rel="nofollow noreferrer" target="_blank">深度定制团队自己的 Vue template</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深度定制团队自己的 Vue template

## 原文链接
[https://segmentfault.com/a/1190000012823487](https://segmentfault.com/a/1190000012823487)


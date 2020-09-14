---
title: '我不能再忍受你的代码风格了！——JSCS' 
date: 2019-02-11 2:30:49
hidden: true
slug: pr1u6bulvps
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>无论人数多少，代码都应该同出一门。</p></blockquote>
<p>JavaScript 或者 Node 的语法本身很弱，在teamwork 和大型项目开发的时候，技术选型时往往选择了 typescript 或者加入 Facebook 的 flow 工具。但是对于代码风格，确实难以统一江山。</p>
<p>每个开发者会有自己的开发习惯，自己喜欢的编辑器，代码风格更加是千差万别。进入 Team work 之后，团队管理的第一件事情就是定义规范，文件命名，目录结构，代码风格。<a href="https://github.com/MZMonster/doc" rel="nofollow noreferrer" target="_blank">就像这样</a></p>
<p><span class="img-wrap"><img data-src="/img/bVveni" src="https://static.alili.tech/img/bVveni" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后会组织多次会议，一起学习研究规范, 一次又一次。然后在 code review 的时候指出，这里不符合规范，那边命名有问题。时间久了，大家对于规范的印象和要求就弱了。如果有新员工入职，那他又得重新学一遍代码风格规范，谁知道，新员工对团队代码风格接受和学习得怎么样呢？代码风格的问题一直困扰了很久。</p>
<p>当然我们也做了很多尝试，比较加入 jshint、grunt 编译的时候，执行 css、js 检查。更加丧心变狂的是，加入了 .git/pre-commit ，在 git 提交的时候，必须通过预检查，才能提交。这种方式过于粗暴，可配置的内容也不够灵活。只能恶心一下自己，并没有在开发团队推广起来。</p>
<p>来的不早也不晚，JSCS 恰巧就这样出现了。从来没有见过这么强大的代码格式化和风格统一工具。</p>
<p>正如官方介绍：</p>
<blockquote><p><a href="http://jscs.info/" rel="nofollow noreferrer" target="_blank">JSCS</a> is a code style linter/formatter for programmatically enforcing your style guide. You can configure JSCS for your project/company using over 150 validation rules, including presets from popular style guides like jQuery, Airbnb, Google, and more.</p></blockquote>
<h3 id="articleHeader0">优点</h3>
<ol>
<li><p><a href="http://jscs.info/" rel="nofollow noreferrer" target="_blank">JSCS</a> 有超过150种代码验证规则。</p></li>
<li><p>你可以预设像 Google、Airbnb 等公司的代码风格。</p></li>
<li><p>JSCS 可以帮你检查，甚至按照你的预设风格格式化代码。当执行 <code>jscs app/ --fix</code> 的时候，项目的代码风格立马和 Airbnb 保持一致了，我还像个没见过世面的人一样惊叹了一番。</p></li>
<li><p>支持  ES2015, JSX, Flow 等。它可以验证任何有效的 babel 代码</p></li>
<li><p>支持绝大多数开发工具和环境。Grunt Task、Atom、Sublime Text、Intellij IDEA、WebStrom、RubyMine 等等。所有工具的<a href="http://jscs.info/overview#friendly-packages" rel="nofollow noreferrer" target="_blank">安装办法</a></p></li>
<li><p>自动生成你的代码风格的配置文件。<code>jscs --auto-configure src</code> 。比如：我的团队代码风格很牛掰，不需要引入其他的代码风格，那这一行命令，就可以让所有风格统一起来。</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVvenm" src="https://static.alili.tech/img/bVvenm" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVvenn" src="https://static.alili.tech/img/bVvenn" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你要知道，Airbnb 的 javascript 代码风格在 github 里有3.4W+ star。 <a href="https://github.com/airbnb/javascript" rel="nofollow noreferrer" target="_blank">https://github.com/airbnb/javascript</a></p>
<p>学会 Airbnb 的代码规范，意味着你的代码风格已经走在了<strong>世界第一行列</strong>。代码功底没到第一线，至少代码风格提上来了，值得你装逼了。少年，激动吧。</p>
<p><span class="img-wrap"><img data-src="/img/bVvens" src="https://static.alili.tech/img/bVvens" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这份文档涵盖了 js 的所有方法面面，对于 web 开发再合适不过了。</p>
<h2 id="articleHeader1">上手</h2>
<h3 id="articleHeader2">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install jscs -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jscs </span>-g</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jscs path[ path[...]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code style="word-break: break-word; white-space: initial;">jscs <span class="hljs-built_in">path</span>[ <span class="hljs-built_in">path</span>[...]]</code></pre>
<p>你也可以注入到 JSCS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat myfile.js | jscs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">cat myfile.js <span class="hljs-string">| jscs</span></code></pre>
<h3 id="articleHeader3">进阶</h3>
<p>开发工具可以自动读取项目中的 <code>.jscsrc</code> 文件，来进行 JSCS 检查，并且 <strong>格式化好你的代码</strong> 。配置文件举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 使用 jquery 编码风格规范
  &quot;preset&quot;: &quot;airbnb&quot;,
  &quot;fix&quot;: true,
  &quot;maxErrors&quot;: 50,
  &quot;fileExtensions&quot;: [&quot;.js&quot;, &quot;.jsx&quot;],
  &quot;excludeFiles&quot;: []

  // 改变 requireCurlyBraces 规则
  //&quot;requireCurlyBraces&quot;: null // or false

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  // 使用 jquery 编码风格规范
  <span class="hljs-string">"preset"</span>: <span class="hljs-string">"airbnb"</span>,
  <span class="hljs-string">"fix"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"maxErrors"</span>: <span class="hljs-number">50</span>,
  <span class="hljs-string">"fileExtensions"</span>: [<span class="hljs-string">".js"</span>, <span class="hljs-string">".jsx"</span>],
  <span class="hljs-string">"excludeFiles"</span>: []

  // 改变 requireCurlyBraces 规则
  //<span class="hljs-string">"requireCurlyBraces"</span>: null // or <span class="hljs-literal">false</span>

}</code></pre>
<h3 id="articleHeader4">常用配置</h3>
<ol>
<li><p>preset （用预置规则进行规则预设）</p></li>
<li><p>fix (true|false) 是否自动修复风格</p></li>
<li><p>additionalRules （附加规则）</p></li>
<li><p>excludeFiles （对指定文件或目录禁用风格检查,默认排除 <code>node_modules</code> 文件夹）<code>"excludeFiles": ["folder_to_exclude/**", "src/!(bar|foo)"]</code></p></li>
<li><p>fileExtensions （验证文件后缀名） <code>"fileExtensions": [".js", ".jsx"]</code></p></li>
<li><p>maxErrors （设置错误要报告的最大数目，默认50）</p></li>
<li><p>esnext 默认的。对于es2015的支持</p></li>
<li><p>es3 过时了，不要管了</p></li>
<li><p>verbose (true|false)（为有错误的信息添加规则名称）</p></li>
<li><p>errorFilter （默认 false, 否则配置路径） （确定是否报告错误的筛选器函数）</p></li>
</ol>
<h3 id="articleHeader5">错入容忍</h3>
<p>你可以书写默写规则，让 JSCS 容忍某些错误。所有的规则都可以在这里查到：<a href="http://jscs.info/rules" rel="nofollow noreferrer" target="_blank">http://jscs.info/rules</a></p>
<ol>
<li>
<p>可以直接设置规则为 null ,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;preset&quot;: &quot;jquery&quot;,
    &quot;requireCurlyBraces&quot;: null
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"preset"</span>: <span class="hljs-string">"jquery"</span>,
    <span class="hljs-attr">"requireCurlyBraces"</span>: <span class="hljs-literal">null</span>
}</code></pre>
</li>
<li>
<p>禁用所有规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = b;

// jscs:disable
var c = d; // 在这行及之后的所有错误都将被忽略

// jscs:enable
var e = f; // 在这行及之后的所有错误都将被报告" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> a = b;

<span class="hljs-comment">// jscs:disable</span>
<span class="hljs-keyword">var</span> <span class="hljs-built_in">c</span> = d; <span class="hljs-comment">// 在这行及之后的所有错误都将被忽略</span>

<span class="hljs-comment">// jscs:enable</span>
<span class="hljs-keyword">var</span> e = f; <span class="hljs-comment">// 在这行及之后的所有错误都将被报告</span></code></pre>
</li>
<li>
<p>禁用特定的规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jscs:disable requireCurlyBraces
if (x) y(); // 在这行及之后的所有 requireCurlyBraces 错误都将被忽略

// jscs:enable requireCurlyBraces
if (z) a(); // 在这行及之后的所有错误包括requireCurlyBraces 错误都将被报告" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// jscs:disable requireCurlyBraces</span>
<span class="hljs-keyword">if</span> <span class="hljs-comment">(x)</span> y<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有 requireCurlyBraces 错误都将被忽略</span>

<span class="hljs-comment">// jscs:enable requireCurlyBraces</span>
<span class="hljs-keyword">if</span> <span class="hljs-comment">(z)</span> a<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有错误包括requireCurlyBraces 错误都将被报告</span></code></pre>
</li>
<li>
<p>对单行进行特定规则忽略</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (x) y(); // jscs:ignore requireCurlyBraces
 if (z) a();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code> <span class="hljs-keyword">if</span> <span class="hljs-comment">(x)</span> y<span class="hljs-comment">()</span>; <span class="hljs-comment">// jscs:ignore requireCurlyBraces</span>
 <span class="hljs-keyword">if</span> <span class="hljs-comment">(z)</span> a<span class="hljs-comment">()</span>;</code></pre>
</li>
<li>
<p>禁用一个特定规则后，你可以启用所有规则，该规则将重新启用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // jscs:disable requireCurlyBraces
    if (x) y(); // 在这行及之后的所有 requireCurlyBraces 错误都将被忽略

    // jscs:enable
    if (z) a(); // 在这行及之后的所有错误包括 requireCurlyBraces 错误都将被报告" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>    <span class="hljs-comment">// jscs:disable requireCurlyBraces</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(x)</span> y<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有 requireCurlyBraces 错误都将被忽略</span>

    <span class="hljs-comment">// jscs:enable</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(z)</span> a<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有错误包括 requireCurlyBraces 错误都将被报告</span></code></pre>
</li>
<li>
<p>你可以同时禁用多个规则，并逐步重新启用它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // jscs:disable requireCurlyBraces, requireDotNotation
    if (x['a']) y(); // 在这行及之后的所有 requireCurlyBraces 或 requireDotNotation 错误都将被忽略

    // jscs:enable requireCurlyBraces
    if (z['a']) a(); // 在这行及之后的所有错误包括 requireDotNotation 错误都将被报告，但 requireCurlyBraces 错误将被忽略

    // jscs:enable requireDotNotation
    if (z['a']) a(); // 在这行及之后的所有错误都将被报告" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>    <span class="hljs-comment">// jscs:disable requireCurlyBraces, requireDotNotation</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(x['a'])</span> y<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有 requireCurlyBraces 或 requireDotNotation 错误都将被忽略</span>

    <span class="hljs-comment">// jscs:enable requireCurlyBraces</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(z['a'])</span> a<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有错误包括 requireDotNotation 错误都将被报告，但 requireCurlyBraces 错误将被忽略</span>

    <span class="hljs-comment">// jscs:enable requireDotNotation</span>
    <span class="hljs-keyword">if</span> <span class="hljs-comment">(z['a'])</span> a<span class="hljs-comment">()</span>; <span class="hljs-comment">// 在这行及之后的所有错误都将被报告</span></code></pre>
</li>
<li>
<p>为某个文件禁用所有规则<br>在文件第一行写上:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jscs:disable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// jscs:disable</span></code></pre>
</li>
</ol>
<p>如果 JSCS 还不能满足你和你团队对代码风格的要求，麻烦告知一个更好的办法给我！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我不能再忍受你的代码风格了！——JSCS

## 原文链接
[https://segmentfault.com/a/1190000005021098](https://segmentfault.com/a/1190000005021098)


---
title: 'HTML编码规范建议' 
date: 2019-01-10 2:30:08
hidden: true
slug: 3mmybd8czfp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>这段时间在整理前端部分代码规范，初步想法是从HTML、CSS、Javascipt、项目文件目录四部分是整理。之前已经整理完了<a href="https://segmentfault.com/a/1190000009951469?_ea=2108730">CSS编码规范</a>，有兴趣可以了解下</p></blockquote>
<h2 id="articleHeader0">1. 代码风格</h2>
<h3 id="articleHeader1">1.1缩进与换行</h3>
<h4>[强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。</h4>
<p>解释： <br>对于非 HTML 标签之间的缩进，比如 script 或 style 标签内容缩进，与 script 或 style 标签的缩进同级。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
/* 样式内容的第一级缩进与所属的 style 标签对齐 */
ul {
    padding: 0;
}
</style>
<ul>
    <li>first</li>
    <li>second</li>
</ul>
<script>
// 脚本代码的第一级缩进与所属的 script 标签对齐
require(['app'], function (app) {
    app.init();
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-comment">/* 样式内容的第一级缩进与所属的 style 标签对齐 */</span>
<span class="hljs-selector-tag">ul</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 脚本代码的第一级缩进与所属的 script 标签对齐</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'app'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">app</span>) </span>{
    app.init();
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>[建议] 每行不得超过 120 个字符。</h4>
<p>解释：<br>过长的代码不容易阅读与维护。但是考虑到 HTML 的特殊性，不做硬性要求。</p>
<h3 id="articleHeader2">1.2命名</h3>
<h4>[强制] class 必须单词全字母小写，单词间以 - 分隔。</h4>
<h4>[强制] class 必须代表相应模块或部件的内容或功能，不得以样式信息进行命名。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<div class=&quot;sidebar&quot;></div>

<!-- bad -->
<div class=&quot;left&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sidebar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>[强制] 元素 id 必须保证页面唯一。</h4>
<p>解释：<br>同一个页面中，不同的元素包含相同的 id，不符合 id 的属性含义。并且使用 document.getElementById 时可能导致难以追查的问题。</p>
<h4>[强制] 禁止为了 hook 脚本，创建无样式信息的 class。</h4>
<p>解释：<br>不允许 class 只用于让 JavaScript 选择某些元素，class 应该具有明确的语义和样式。否则容易导致 CSS class 泛滥。<br>使用 id、属性选择作为 hook 是更好的方式。</p>
<h4>[强制] 同一页面，应避免使用相同的 name 与 id。</h4>
<p>解释：<br>IE 浏览器会混淆元素的 <code>id</code> 和 <code>name</code> 属性， <code>document.getElementById</code> 可能获得不期望的元素。所以在对元素的 id 与 name属性的命名需要非常小心。<br>一个比较好的实践是，为 <code>id</code> 和 <code>name</code> 使用不同的命名法。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input name=&quot;foo&quot;>
<div id=&quot;foo&quot;></div>
<script>
    // IE6 将显示 INPUT
    alert(document.getElementById('foo').tagName);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"foo"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"foo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// IE6 将显示 INPUT</span>
    alert(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'foo'</span>).tagName);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>[建议] id 建议单词全字母小写，单词间以 <code>_</code> 分隔。同项目必须保持风格一致。</h4>
<h4>[建议] id、class 命名，在避免冲突并描述清楚的前提下尽可能短。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<div id=&quot;nav&quot;></div>
<!-- bad -->
<div id=&quot;navigation&quot;></div>
<!-- good -->
<p class=&quot;comment&quot;></p>
<!-- bad -->
<p class=&quot;com&quot;></p>

<!-- good -->
<span class=&quot;author&quot;></span>
<!-- bad -->
<span class=&quot;red&quot;></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"navigation"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"com"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"author"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"red"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h3 id="articleHeader3">1.3 标签</h3>
<h4>[强制] 标签名必须使用小写字母。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<p>Hello StyleGuide!</p>
<!-- bad -->
<P>Hello StyleGuide!</P>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello StyleGuide!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">P</span>&gt;</span>Hello StyleGuide!<span class="hljs-tag">&lt;/<span class="hljs-name">P</span>&gt;</span></code></pre>
<h4>[强制] 对于无需自闭合的标签，不允许自闭合。</h4>
<p>解释：<br>常见无需自闭合标签有 <code>input</code>、<code>br</code>、<code>img</code>等。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<input type=&quot;text&quot; name=&quot;title&quot;>
<!-- bad -->
<input type=&quot;text&quot; name=&quot;title&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span> /&gt;</span></code></pre>
<h4>[强制] 对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签。</h4>
<p>解释：<br>对代码体积要求非常严苛的场景，可以例外。比如：第三方页面使用的投放系统。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<ul>
    <li>first</li>
    <li>second</li>
</ul>
<!-- bad -->
<ul>
    <li>first
    <li>second
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>first<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>second<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>first
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>second
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h4>[强制] 标签使用必须符合标签嵌套规则。</h4>
<p>解释：<br>比如 div 不得置于 p 中，tbody 必须置于 table 中。<br>详细的标签嵌套规则参见<a>HTML DTD</a>中的 Elements 定义部分。</p>
<h4>[建议] HTML 标签的使用应该遵循标签的语义。</h4>
<p>解释：<br>下面是常见标签语义</p>
<ul>
<li><p>p - 段落</p></li>
<li><p>h1,h2,h3,h4,h5,h6 - 层级标题</p></li>
<li><p>strong,em - 强调</p></li>
<li><p>abbr - 缩写</p></li>
<li><p>blockquote - 一段或长篇引用</p></li>
<li><p>ul - 无序列表</p></li>
<li><p>ol - 有序列表</p></li>
<li><p>dl,dt,dd - 定义列表</p></li>
</ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<p>Esprima serves as an important <strong>building block</strong> for some JavaScript language tools.</p>
<!-- bad -->
<div>Esprima serves as an important <span class=&quot;strong&quot;>building block</span> for some JavaScript language tools.</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Esprima serves as an important <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>building block<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span> for some JavaScript language tools.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Esprima serves as an important <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"strong"</span>&gt;</span>building block<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> for some JavaScript language tools.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>[建议] 在 CSS 可以实现相同需求的情况下不得使用表格进行布局。</h4>
<p>解释：<br>在兼容性允许的情况下应尽量保持语义正确性。对网格对齐和拉伸性有严格要求的场景允许例外，如多列复杂表单。</p>
<h4>[建议] 标签的使用应尽量简洁，减少不必要的标签。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<img class=&quot;avatar&quot; src=&quot;image.png&quot;>
<!-- bad -->
<span class=&quot;avatar&quot;>
    <img src=&quot;image.png&quot;>
</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image.png"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image.png"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h3 id="articleHeader4">1.4 属性</h3>
<h4>[强制] 属性名必须使用小写字母，自定义属性视情况定。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<table cellspacing=&quot;0&quot;>...</table>
<!-- bad -->
<table cellSpacing=&quot;0&quot;>...</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">cellspacing</span>=<span class="hljs-string">"0"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">cellSpacing</span>=<span class="hljs-string">"0"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>[强制] 属性值必须用双引号包围.自定义属性视情况定。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<script src=&quot;esl.js&quot;></script>
<!-- bad -->
<script src='esl.js'></script>
<script src=esl.js></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"esl.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'esl.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">esl.js</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>[建议] 布尔类型的属性，建议不添加属性值。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; disabled>
<input type=&quot;checkbox&quot; value=&quot;1&quot; checked>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">disabled</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">checked</span>&gt;</span></code></pre>
<h4>[建议] 自定义属性建议以 xxx- 为前缀，推荐使用 data-。</h4>
<p>解释：<br>使用前缀有助于区分自定义属性和标准定义的属性。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ol data-ui-type=&quot;Select&quot;></ol>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">data-ui-type</span>=<span class="hljs-string">"Select"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<h2 id="articleHeader5">2.Head</h2>
<h3 id="articleHeader6">2.1 DOCTYPE</h3>
<h4>[强制] 使用 HTML5 的 doctype 来启用标准模式，建议使用大写的 DOCTYPE。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span></code></pre>
<h4>[建议] 启用 IE Edge 模式。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=Edge&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=Edge"</span>&gt;</span></code></pre>
<h4>[建议] 在 html 标签上设置正确的 lang 属性。</h4>
<p>解释：<br>有助于提高页面的可访问性，如：让语音合成工具确定其所应该采用的发音，令翻译工具确定其翻译语言等。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html lang=&quot;zh-CN&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-CN"</span>&gt;</span></code></pre>
<h3 id="articleHeader7">2.2 编码</h3>
<p>[强制] 页面必须使用精简形式，明确指定字符编码。指定字符编码的 meta 必须是 head 的第一个直接子元素。<br>解释：<br>见<a href="http://www.qianduan.net/html5-charset-can-it.html" rel="nofollow noreferrer" target="_blank">HTML5 Charset</a>能用吗 一文。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        ......
    </head>
    <body>
        ......
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        ......
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        ......
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader8">2.3 title</h3>
<h4>[强制] 页面必须包含 title 标签声明标题。</h4>
<h4>[强制] title 必须作为 head 的直接子元素，并紧随 charset 声明之后。</h4>
<p>解释：<br>title 中如果包含 ASCII 之外的字符，浏览器需要知道字符编码类型才能进行解码，否则可能导致乱码。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>页面标题</title>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<h3 id="articleHeader9">2.4favicon</h3>
<h4>[强制] 保证 favicon 可访问。</h4>
<p>解释：<br>在未指定 favicon 时，大多数浏览器会请求 Web Server 根目录下的 favicon.ico 。为了保证 favicon 可访问，避免 404，必须遵循以下两种方法之一：</p>
<ol>
<li><p>在 Web Server 根目录放置 favicon.ico 文件。</p></li>
<li><p>使用 link 指定 favicon。</p></li>
</ol>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;shortcut icon&quot; href=&quot;path/to/favicon.ico&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"path/to/favicon.ico"</span>&gt;</span></code></pre>
<h3 id="articleHeader10">2.5 CSS 和 JavaScript 引入</h3>
<h4>[强制] 引入 CSS 时必须指明 rel="stylesheet"。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;page.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"page.css"</span>&gt;</span></code></pre>
<h4>[建议] 引入 CSS 和 JavaScript 时无须指明 type 属性。</h4>
<p>解释：<br>text/css 和 text/javascript 是 type 的默认值。</p>
<h4>[建议] 在 head 中引入页面需要的所有 CSS 资源。</h4>
<p>解释：<br>在页面渲染的过程中，新的CSS可能导致元素的样式重新计算和绘制，页面闪烁。</p>
<h4>[建议] JavaScript 应当放在页面末尾，或采用异步加载。</h4>
<p>解释： <br>将 script 放在页面中间将阻断页面的渲染。出于性能方面的考虑，如非必要，请遵守此条建议。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <!-- a lot of elements -->
    <script src=&quot;init-behavior.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- a lot of elements --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"init-behavior.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h3 id="articleHeader11">2.6 viewport</h3>
<h4>[建议] 若页面欲对移动设备友好，需指定页面的 viewport。</h4>
<p>解释：<br>viewport meta tag 可以设置可视区域的宽度和初始缩放大小，避免在移动设备上出现页面展示不正常。</p>
<p>比如，在页面宽度小于 980px 时，若需 iOS 设备友好，应当设置 viewport 的 width 值来适应你的页面宽度。同时因为不同移动设备分辨率不同，在设置时，应当使用 device-width 和 device-height 变量。</p>
<p>另外，为了使 viewport 正常工作，在页面内容样式布局设计上也要做相应调整，如避免绝对定位等。关于 viewport 的更多介绍，可以参见<a href="https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html#//apple_ref/doc/uid/TP40006509-SW26" rel="nofollow noreferrer" target="_blank">Safari Web Content Guide的介绍</a></p>
<h3 id="articleHeader12">2.7 IE Style Fixed</h3>
<h4>[建议] 为兼容IE9及以下浏览器样式，有必要在head中使用CSS if IE条件注释。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--[if lt IE 9]>
<html lang=&quot;en&quot; class=&quot;ie8&quot;>
<![endif]-->
<!--[if gt IE 8]>
<html lang=&quot;en&quot;>
<![endif]-->
<!-- IE8 fixed -->
<!--[if lt IE 9]>
<link rel=&quot;stylesheet&quot; href=&quot;<?php echo STATICURL; ?>/css/iefix.css?<?php echo VERHASH; ?>&quot;/>
<![endif]-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--[if lt IE 9]&gt;
&lt;html lang="en" class="ie8"&gt;
&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!--[if gt IE 8]&gt;
&lt;html lang="en"&gt;
&lt;![endif]--&gt;</span>
<span class="hljs-comment">&lt;!-- IE8 fixed --&gt;</span>
<span class="hljs-comment">&lt;!--[if lt IE 9]&gt;
&lt;link rel="stylesheet" href="&lt;?php echo STATICURL; ?&gt;/css/iefix.css?&lt;?php echo VERHASH; ?&gt;"/&gt;
&lt;![endif]--&gt;</span></code></pre>
<h2 id="articleHeader13">3. 图片</h2>
<h4>[强制] 禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。</h4>
<p>解释：<br>src 取值为空，会导致部分浏览器重新加载一次当前页面，参考：<a href="https://developer.yahoo.com/performance/rules.html#emptysrc" rel="nofollow noreferrer" target="_blank">https://developer.yahoo.com/performance/rules.html#emptysrc</a></p>
<h4>[建议] 避免为 img 添加不必要的 title 属性。</h4>
<h4>[建议] 为重要图片添加 alt 属性。</h4>
<p>解释：<br>可以提高图片加载失败时的用户体验。</p>
<h4>[建议] 添加 width 和 height 属性，以避免页面抖动。</h4>
<h4>[建议] 有下载需求的图片采用 img 标签实现，无下载需求的图片采用 CSS 背景图实现。</h4>
<p>解释：</p>
<ol>
<li><p>产品 logo、用户头像、用户产生的图片等有潜在下载需求的图片，以 img 形式实现，能方便用户下载。</p></li>
<li><p>无下载需求的图片，比如：icon、背景、代码使用的图片等，尽可能采用 CSS 背景图实现。</p></li>
</ol>
<h2 id="articleHeader14">4. 表单</h2>
<h3 id="articleHeader15">4.1 控件标题</h3>
<h4>[强制] 有文本标题的控件必须使用 label 标签将其与其标题相关联。</h4>
<p>解释：<br>有两种方式：</p>
<ol>
<li><p>将控件置于 label 内。</p></li>
<li><p>label 的 for 属性指向控件的 id。</p></li>
</ol>
<p>推荐使用第一种，减少不必要的 id。如果 DOM 结构不允许直接嵌套，则应使用第二种。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<label><input type=&quot;checkbox&quot; name=&quot;confirm&quot; value=&quot;on&quot;> 我已确认上述条款</label>
<label for=&quot;username&quot;>用户名：</label> <input type=&quot;textbox&quot; name=&quot;username&quot; id=&quot;username&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"confirm"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"on"</span>&gt;</span> 我已确认上述条款<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"username"</span>&gt;</span>用户名：<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"textbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username"</span>&gt;</span></code></pre>
<h3 id="articleHeader16">4.2 按钮</h3>
<h4>[强制] 使用 button 元素时必须指明 type 属性值。</h4>
<p>解释：<br>button 元素的默认 type 为 submit，如果被置于 form 元素中，点击后将导致表单提交。为显示区分其作用方便理解，必须给出 type 属性。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button type=&quot;submit&quot;>提交</button>
<button type=&quot;button&quot;>取消</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<h4>[建议] 尽量不要使用按钮类元素的 name 属性。</h4>
<p>解释：<br>由于浏览器兼容性问题，使用按钮的 name 属性会带来许多难以发现的问题。具体情况可参考<a href="http://w3help.org/zh-cn/causes/CM2001" rel="nofollow noreferrer" target="_blank">此文</a></p>
<h3 id="articleHeader17">4.3可访问性</h3>
<h4>[建议] 负责主要功能的按钮在 DOM 中的顺序应靠前。</h4>
<p>解释：<br>负责主要功能的按钮应相对靠前，以提高可访问性。如果在 CSS 中指定了 float: right 则可能导致视觉上主按钮在前，而 DOM 中主按钮靠后的情况。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<style>
.buttons .button-group {
    float: right;
}
</style>
<div class=&quot;buttons&quot;>
    <div class=&quot;button-group&quot;>
        <button type=&quot;submit&quot;>提交</button>
        <button type=&quot;button&quot;>取消</button>
    </div>
</div>
<!-- bad -->
<style>
.buttons button {
    float: right;
}
</style>
<div class=&quot;buttons&quot;>
    <button type=&quot;button&quot;>取消</button>
    <button type=&quot;submit&quot;>提交</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-class">.button-group</span> {
    <span class="hljs-attribute">float</span>: right;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.buttons</span> <span class="hljs-selector-tag">button</span> {
    <span class="hljs-attribute">float</span>: right;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"buttons"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>提交<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>[建议] 当使用 JavaScript 进行表单提交时，如果条件允许，应使原生提交功能正常工作。</h4>
<p>解释：<br>当浏览器 JS 运行错误或关闭 JS 时，提交功能将无法工作。如果正确指定了 form 元素的 action 属性和表单控件的 name 属性时，提交仍可继续进行。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;/login&quot; method=&quot;post&quot;>
     <p><input name=&quot;username&quot; type=&quot;text&quot; placeholder=&quot;用户名&quot;></p>
     <p><input name=&quot;password&quot; type=&quot;password&quot; placeholder=&quot;密码&quot;></p>
</form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"/login"</span> <span class="hljs-attr">method</span>=<span class="hljs-string">"post"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"用户名"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"密码"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<h4>[建议] 在针对移动设备开发的页面时，根据内容类型指定输入框的 type 属性。</h4>
<p>解释：<br>根据内容类型指定输入框类型，能获得能友好的输入体验。<br>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;date&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"date"</span>&gt;</span></code></pre>
<h2 id="articleHeader18">5. 多媒体</h2>
<h4>[建议] 当在现代浏览器中使用 audio 以及 video 标签来播放音频、视频时，应当注意格式。</h4>
<p>解释：<br>音频应尽可能覆盖到如下格式：</p>
<ul>
<li><p>MP3</p></li>
<li><p>WAV</p></li>
<li><p>Ogg</p></li>
</ul>
<p>视频应尽可能覆盖到如下格式：</p>
<ul>
<li><p>MP4</p></li>
<li><p>WebM</p></li>
<li><p>Ogg</p></li>
</ul>
<h4>[建议] 在支持 HTML5 的浏览器中优先使用 audio 和 video 标签来定义音视频元素。</h4>
<h4>[建议] 只在必要的时候开启音视频的自动播放。</h4>
<h4>[建议] 在 object 标签内部提供指示浏览器不支持该标签的说明。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<object width=&quot;100&quot; height=&quot;50&quot; data=&quot;something.swf&quot;>DO NOT SUPPORT THIS TAG</object>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">object</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"something.swf"</span>&gt;</span>DO NOT SUPPORT THIS TAG<span class="hljs-tag">&lt;/<span class="hljs-name">object</span>&gt;</span></code></pre>
<h2 id="articleHeader19">6. 模板中的 HTML</h2>
<h4>[建议] 模板代码的缩进优先保证 HTML 代码的缩进规则。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
{if $display == true}
<div>
    <ul>
    {foreach $item_list as $item}
        <li>{$item.name}<li>
    {/foreach}
    </ul>
</div>
{/if}
<!-- bad -->
{if $display == true}
    <div>
        <ul>
    {foreach $item_list as $item}
        <li>{$item.name}<li>
    {/foreach}
        </ul>
    </div>
{/if}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
{if $display == true}
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    {foreach $item_list as $item}
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{$item.name}<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    {/foreach}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
{/if}
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
{if $display == true}
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    {foreach $item_list as $item}
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{$item.name}<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
    {/foreach}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
{/if}</code></pre>
<h4>[建议] 模板代码应以保证 HTML 单个标签语法的正确性为基本原则。</h4>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- good -->
<li class=&quot;{if $item.type_id == $current_type}focus{/if}&quot;>{ $item.type_name }</li>
<!-- bad -->
<li {if $item.type_id == $current_type} class=&quot;focus&quot;{/if}>{ $item.type_name }</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- good --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"{if $item.type_id == $current_type}focus{/if}"</span>&gt;</span>{ $item.type_name }<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-comment">&lt;!-- bad --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> {<span class="hljs-attr">if</span> $<span class="hljs-attr">item.type_id</span> == <span class="hljs-string">$current_type}</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"focus"</span>{/<span class="hljs-attr">if</span>}&gt;</span>{ $item.type_name }<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML编码规范建议

## 原文链接
[https://segmentfault.com/a/1190000009954345](https://segmentfault.com/a/1190000009954345)


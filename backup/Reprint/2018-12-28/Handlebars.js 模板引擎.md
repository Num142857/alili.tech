---
title: 'Handlebars.js 模板引擎' 
date: 2018-12-28 2:30:11
hidden: true
slug: d3dt9g71l5e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p><code>Handlebars</code> 让你能够有能力高效地容易地创立语义化的模版。<code>Handlebars</code>兼容<code>Mustache</code>语法，在大多数情况下它可以读取<code>Mustache</code>的语法并在你当前模板中使用。具体点击<a href="https://github.com/wycats/handlebars.js#differences-between-handlebarsjs-and-mustache" rel="nofollow noreferrer" target="_blank">这里</a></p>
<h2 id="articleHeader1">安装</h2>
<ol>
<li><a href="http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars-v4.0.11.js" rel="nofollow noreferrer" target="_blank">下载</a></li>
<li><code>npm install --save handlebars</code></li>
<li><code>bower install --save handlebars</code></li>
</ol>
<p><a href="http://handlebarsjs.com./installation.html" rel="nofollow noreferrer" target="_blank">具体参考</a></p>
<h2 id="articleHeader2">开始使用</h2>
<p><code>Handlebars</code> 模板看起来就像嵌套<code>handlebars</code>表达式的规范的HTML。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>"{{"title"}}"</h1>
  <div class=&quot;body&quot;>
    "{{"body"}}"
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entry"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"body"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>handlebars</code>表达式:    <code>"{{" cnt "}}"</code><br>你也可以通过<code>&lt;script&gt;</code>标签包裹<code>handlebars</code>表达式传递模板给浏览器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id=&quot;entry-template&quot; type=&quot;text/x-handlebars-template&quot;>
  <div class=&quot;entry&quot;>
    <h1>"{{"title"}}"</h1>
    <div class=&quot;body&quot;>
      "{{"body"}}"
    </div>
  </div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"entry-template"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-handlebars-template"</span>&gt;</span><span class="javascript">
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"entry"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span></span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
      </span></span></span><span class="hljs-template-variable">"{{"body"}}"</span><span class="xml"><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<blockquote><p>你必须把模板放在<code>&lt;script&gt;</code>标签里，这很重要。不要直接把它放在HTML中否则HTML的解析会改变模板内容。</p></blockquote>
<p>在<code>JavaScript</code>中，使用<code>Handlebars.compile</code>来编译模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source   = $(&quot;#entry-template&quot;).html();
var template = Handlebars.compile(source);
// ‘entry-template’就是包裹模板的script的id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var <span class="hljs-keyword">source</span>   = $(<span class="hljs-string">"#entry-template"</span>).html();
var template = Handlebars.<span class="hljs-keyword">compile</span>(<span class="hljs-keyword">source</span>);
<span class="hljs-comment">// ‘entry-template’就是包裹模板的script的id</span></code></pre>
<blockquote><p>注意这种方法在产品应用中不推荐使用。更好的方法是预编译你的模版。这将使要求的运行库更小，模板不必在浏览器中编译，显著地节省了时间。这在移动设备上尤为重要。</p></blockquote>
<p>在JavaScript中，使用Handlebars.compile()方法来预编译模板 例如：(这是一套规则)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用jquery获取模板
var tpl   =  $(&quot;#tpl&quot;).html();
//原生方法
var source = document.getElementById('#tpl').innerHTML;
//预编译模板
var template = Handlebars.compile(source);
//模拟json数据
var context = { name: &quot;zhaoshuai&quot;, content: &quot;learn Handlebars&quot;};
//匹配json内容
var html = template(context);
//输入模板
$(body).html(html);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//用jquery获取模板</span>
<span class="hljs-keyword">var</span> tpl   =  $(<span class="hljs-string">"#tpl"</span>).html();
<span class="hljs-comment">//原生方法</span>
<span class="hljs-keyword">var</span> source = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'#tpl'</span>).innerHTML;
<span class="hljs-comment">//预编译模板</span>
<span class="hljs-keyword">var</span> template = Handlebars.compile(source);
<span class="hljs-comment">//模拟json数据</span>
<span class="hljs-keyword">var</span> context = { <span class="hljs-attr">name</span>: <span class="hljs-string">"zhaoshuai"</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">"learn Handlebars"</span>};
<span class="hljs-comment">//匹配json内容</span>
<span class="hljs-keyword">var</span> html = template(context);
<span class="hljs-comment">//输入模板</span>
$(body).html(html);
</code></pre>
<p>通过解析<code>context</code>处理<code>handlebars模板</code>获取<code>HTML内容</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var context = {title: &quot;My New Post&quot;, body: &quot;This is my first post!&quot;};
var html    = template(context);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">context</span> = {<span class="hljs-built_in">title</span>: <span class="hljs-string">"My New Post"</span>, body: <span class="hljs-string">"This is my first post!"</span>};
<span class="hljs-built_in">var</span> html    = template(<span class="hljs-built_in">context</span>);</code></pre>
<p>输出html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>My New Post</h1>
  <div class=&quot;body&quot;>
    This is my first post!
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"entry"</span>&gt;
  &lt;h1&gt;My New Post&lt;/h1&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"body"</span>&gt;
    This <span class="hljs-keyword">is</span> <span class="hljs-keyword">my</span> <span class="hljs-keyword">first</span> post!
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h2 id="articleHeader3">HTML转码</h2>
<p><code>Handlebars</code> 的转码HTML值通过<code>"{{"expression"}}"</code>返回. 如果你不想handlebars转码一个值的话，使用<code>"{{"{expression"}}"}</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>"{{"title"}}"</h1>
  <div class=&quot;body&quot;>
    "{{"{body"}}"}
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entry"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"{body"}}"</span><span class="xml">}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>上下文内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  title: &quot;All about <p> Tags&quot;,
  body: &quot;<p>This is a post about &amp;lt;p&amp;gt; tags</p>&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">title</span>: <span class="hljs-string">"All about &lt;p&gt; Tags"</span>,
  body: <span class="hljs-string">"&lt;p&gt;This is a post about &amp;lt;p&amp;gt; tags&lt;/p&gt;"</span>
}</code></pre>
<p>输出:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>All About &amp;lt;p&amp;gt; Tags</h1>
  <div class=&quot;body&quot;>
    <p>This is a post about &amp;lt;p&amp;gt; tags</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;div class="entry"&gt;</span>
  <span class="hljs-params">&lt;h1&gt;</span>All About <span class="hljs-variable">&amp;lt</span>;p<span class="hljs-variable">&amp;gt</span>; Tags<span class="hljs-params">&lt;/h1&gt;</span>
  <span class="hljs-params">&lt;div class="body"&gt;</span>
    <span class="hljs-params">&lt;p&gt;</span>This is a post about <span class="hljs-variable">&amp;lt</span>;p<span class="hljs-variable">&amp;gt</span>; tags<span class="hljs-params">&lt;/p&gt;</span>
  <span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span></code></pre>
<p><code>Handlebars</code> 不会转义 <code>Handlebars.SafeString</code>. 如果你写了输出本身所含HTML的辅助 <code>helper</code>， 你其实想返回一个新的<code>Handlebars.SafeString</code>.在这种情况下，你想手动拼接参数.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Handlebars.registerHelper('link', function(text, url) {
  text = Handlebars.Utils.escapeExpression(text);
  url  = Handlebars.Utils.escapeExpression(url); 
  var result = '<a href=&quot;' + url + '&quot;>' + text + '</a>';    
  return new Handlebars.SafeString(result);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Handlebars.registerHelper(<span class="hljs-string">'link'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">text, url</span>) </span>{
  text = Handlebars.Utils.escapeExpression(text);
  <span class="hljs-built_in">url</span>  = Handlebars.Utils.escapeExpression(<span class="hljs-built_in">url</span>); 
  <span class="hljs-built_in">var</span> result = <span class="hljs-string">'&lt;a href="'</span> + <span class="hljs-built_in">url</span> + <span class="hljs-string">'"&gt;'</span> + text + <span class="hljs-string">'&lt;/a&gt;'</span>;    
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Handlebars.SafeString(result);
});</code></pre>
<p>这样可以避免字符串被转码，正确响应参数，即使你不适用<code>"{{"{</code>也不会被转码。</p>
<h2 id="articleHeader4">块级表达式</h2>
<p>块级表达式 允许你定义一个可以触发一个与当前不同的上下文来替换模板的相应内容的helper。这些块级辅助helper通过在helper的名字前加<code>#</code>并在结束时名字前加<code>/</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"#list people"}}""{{"firstName"}}" "{{"lastName"}}""{{"/list"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code style="word-break: break-word; white-space: initial;">"{{"#list people"}}""{{"firstName"}}" "{{"lastName"}}""{{"/list"}}"</code></pre>
<p>渲染context:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  people: [
    {firstName: &quot;Yehuda&quot;, lastName: &quot;Katz&quot;},
    {firstName: &quot;Carl&quot;, lastName: &quot;Lerche&quot;},
    {firstName: &quot;Alan&quot;, lastName: &quot;Johnson&quot;}
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">people</span>: [
    {firstName: <span class="hljs-string">"Yehuda"</span>, lastName: <span class="hljs-string">"Katz"</span>},
    {<span class="hljs-attribute">firstName</span>: <span class="hljs-string">"Carl"</span>, lastName: <span class="hljs-string">"Lerche"</span>},
    {<span class="hljs-attribute">firstName</span>: <span class="hljs-string">"Alan"</span>, lastName: <span class="hljs-string">"Johnson"</span>}
  ]
}</code></pre>
<p>我们会创建一个叫<code>list</code>的helper输出HTML列表。该列表以<code>people</code>为第一个参数，哈希选项为第二个参数。这些选项里包含一条名为fn的属性，在handlebars模板中通过这些属性名获取值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Handlebars.registerHelper('list', function(items, options) {
  var out = &quot;<ul>&quot;;

  for(var i=0, l=items.length; i<l; i++) {
    out = out + &quot;<li>&quot; + options.fn(items[i]) + &quot;</li>&quot;;
  }

  return out + &quot;</ul>&quot;;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Handlebars.registerHelper(<span class="hljs-string">'list'</span>, function(items, options) {
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">out</span> = <span class="hljs-string">"&lt;ul&gt;"</span>;

  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>, l=items.length; i&lt;l; i++) {
    <span class="hljs-keyword">out</span> = <span class="hljs-keyword">out</span> + <span class="hljs-string">"&lt;li&gt;"</span> + options.fn(items[i]) + <span class="hljs-string">"&lt;/li&gt;"</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">out</span> + <span class="hljs-string">"&lt;/ul&gt;"</span>;
});</code></pre>
<p>渲染结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li>Yehuda Katz</li>
  <li>Carl Lerche</li>
  <li>Alan Johnson</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Yehuda Katz<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Carl Lerche<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Alan Johnson<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>块级辅助helper有很多特点，例如可以创建一个<code>else</code>部分.因为当你调用<code>options.fn(context)</code>时块级helper的内容已经被转码过，所以handlebars不会再去转码helper的内容。</p>
<h2 id="articleHeader5">handler 的路径</h2>
<p><code>Handlebars</code> 支持简单的路径，就像 <code>Mustache</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"name"}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span></code></pre>
<p>Handlebars 也支持嵌套的属性，比如对象的属性.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;entry&quot;>
  <h1>"{{"title"}}"</h1>
  <h2>By "{{"author.name"}}"</h2>

  <div class=&quot;body&quot;>
    "{{"body"}}"
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entry"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>By </span><span class="hljs-template-variable">"{{"author.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"body"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>模板工作的对象context：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var context = {
  title: &quot;My First Blog Post!&quot;,
  author: {
    id: 47,
    name: &quot;Yehuda Katz&quot;
  },
  body: &quot;My first post. Wheeeee!&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var context = {
<span class="hljs-symbol">  title:</span> <span class="hljs-string">"My First Blog Post!"</span>,
<span class="hljs-symbol">  author:</span> {
<span class="hljs-symbol">    id:</span> <span class="hljs-number">47</span>,
<span class="hljs-symbol">    name:</span> <span class="hljs-string">"Yehuda Katz"</span>
  },
<span class="hljs-symbol">  body:</span> <span class="hljs-string">"My first post. Wheeeee!"</span>
};</code></pre>
<p>这使得使用<code>handlebars</code>模板处理<code>JSON</code>字符串成为可能。内嵌的handlebars的路径也包括<code>../</code>语法，相当于当前路径的父级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>Comments</h1>

<div id=&quot;comments&quot;>
  "{{"#each comments"}}"
  <h2><a href=&quot;/posts/"{{"../permalink"}}"#"{{"id"}}"&quot;>"{{"title"}}"</a></h2>
  <div>"{{"body"}}"</div>
  "{{"/each"}}"
</div>

"{{"permalink"}}"
"{{"#each comments"}}"
  "{{"../permalink"}}"

  "{{"#if title"}}"
    "{{"../permalink"}}"
  "{{"/if"}}"
"{{"/each"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Comments<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"comments"</span>&gt;</span>
  </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> comments"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/posts/</span></span></span><span class="hljs-template-variable">"{{"../permalink"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">#</span></span></span><span class="hljs-template-variable">"{{"id"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{"body"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span><span class="hljs-template-variable">"{{"permalink"}}"</span><span class="xml">
</span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> comments"}}"</span><span class="xml">
  </span><span class="hljs-template-variable">"{{"../permalink"}}"</span><span class="xml">

  </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span> title"}}"</span><span class="xml">
    </span><span class="hljs-template-variable">"{{"../permalink"}}"</span><span class="xml">
  </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>"}}"</span><span class="xml">
</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span></code><span class="xml"></span></pre>
<p>这里例子中引用了相同的<code>permalink</code>即使他们在不同的块中。这种行为是新的，handlebars4支持。</p>
<h2 id="articleHeader6">Handlebars的内置块表达式（Block helper）</h2>
<ol>
<li>
<p>each block helper<br>你可以使用内置的<code>"{{"#each"}}"</code> helper遍历列表块内容，用this来引用遍历的元素 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <ul>  
     "{{"#each name"}}"
         <li>"{{"this"}}"</li>
     "{{"/each"}}"
 </ul>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>  
     </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> name"}}"</span><span class="xml">
         <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"this"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>  </span></code></pre>
<p>对应适用的json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
     name: [&quot;html&quot;,&quot;css&quot;,&quot;javascript&quot;]
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> {
     <span class="hljs-attribute">name</span>: [<span class="hljs-string">"html"</span>,<span class="hljs-string">"css"</span>,<span class="hljs-string">"javascript"</span>]
 };</code></pre>
<p>这里的this指的是数组里的每一项元素，和上面的Block很像，但原理是不一样的这里的name是数组，而内置的each就是为了遍历数组用的，更复杂的数据也同样适用。</p>
</li>
<li>
<p>if else block helper<br><code>"{{"#if"}}"</code>就你使用JavaScript一样，你可以指定条件渲染DOM，如果它的参数返回<code>false，undefined, null, "" 或者 [] (a "falsy" value)</code>, Handlebar将不会渲染DOM，如果存在<code>"{{"#else"}}"</code>则执行<code>"{{"#else"}}"</code>后面的渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" "{{"#if list"}}"
 <ul id=&quot;list&quot;>  
     "{{"#each list"}}"
         <li>"{{"this"}}"</li>
     "{{"/each"}}"
 </ul>  
 "{{"else"}}"
     <p>"{{"error"}}"</p>
 "{{"/if"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"> </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">if</span></span> list"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list"</span>&gt;</span>  
     </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> list"}}"</span><span class="xml">
         <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"this"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>  
 </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">else</span>"}}"</span><span class="xml">
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"error"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>"}}"</span></code><span class="xml"></span></pre>
<p>对应适用json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = {info:['HTML5','CSS3',&quot;WebGL&quot;],&quot;error&quot;:&quot;数据取出错误&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = {info:[<span class="hljs-string">'HTML5'</span>,<span class="hljs-string">'CSS3'</span>,<span class="hljs-string">"WebGL"</span>],<span class="hljs-string">"error"</span>:<span class="hljs-string">"数据取出错误"</span>}</code></pre>
<p>这里<code>"{{"#if"}}"</code>判断是否存在list数组，如果存在则遍历list，如果不存在输出错误信息</p>
</li>
<li>
<p>unless block helper<br>  "{{"#unless"}}"这个语法是反向的if语法也就是当判断的值为false时他会渲染DOM 例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" "{{"#unless data"}}"
 <ul id=&quot;list&quot;>  
     "{{"#each list"}}"
         <li>"{{"this"}}"</li>
     "{{"/each"}}"
 </ul>  
 "{{"else"}}"
     <p>"{{"error"}}"</p>
 "{{"/unless"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"> </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">unless</span></span> data"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list"</span>&gt;</span>  
     </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">each</span></span> list"}}"</span><span class="xml">
         <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span><span class="hljs-template-variable">"{{"this"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
     </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>  
 </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">else</span>"}}"</span><span class="xml">
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"error"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">unless</span></span>"}}"</span></code><span class="xml"></span></pre>
</li>
<li>
<p>with block helper<br>"{{"#with"}}"一般情况下，Handlebars模板会在编译的阶段的时候进行context传递和赋值。使用with的方法，我们可以将context转移到数据的一个section里面（如果你的数据包含section）。 这个方法在操作复杂的template时候非常有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;entry&quot;>  
   <h1>"{{"title"}}"</h1>
   "{{"#with author"}}"
   <h2>By "{{"firstName"}}" "{{"lastName"}}"</h2>
   "{{"/with"}}"
 </div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"entry"</span>&gt;</span>  
   <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
   </span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">with</span></span> author"}}"</span><span class="xml">
   <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>By </span><span class="hljs-template-variable">"{{"firstName"}}"</span><span class="xml"> </span><span class="hljs-template-variable">"{{"lastName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
   </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">with</span></span>"}}"</span><span class="xml">
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  </span></code></pre>
<p>对应适用json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
   title: &quot;My first post!&quot;,
   author: {
     firstName: &quot;Charles&quot;,
     lastName: &quot;Jolley&quot;
   }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> {
   <span class="hljs-attribute">title</span>: <span class="hljs-string">"My first post!"</span>,
   author: {
     firstName: <span class="hljs-string">"Charles"</span>,
     lastName: <span class="hljs-string">"Jolley"</span>
   }
 }
</code></pre>
</li>
</ol>
<h2 id="articleHeader7">Handlebar的注释（comments）</h2>
<p>Handlebars也可以使用注释写法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"! handlebars comments "}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>"{{"! handlebars comments "}}"
</code></pre>
<h2 id="articleHeader8">Handlebars的访问（Path）</h2>
<p>Handlebar支持路径和mustache,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性 <br>可以通过.来访问属性也可以使用../,来访问父级属性。 例如:（使用.访问的例子）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h1>"{{"author.id"}}"</h1>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"author.id"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>  </span></code></pre>
<p>对应json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  title: &quot;My First Blog Post!&quot;,
  author: {
    id: 47,
    name: &quot;Yehuda Katz&quot;
  },
  body: &quot;My first post. Wheeeee!&quot;
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
<span class="hljs-symbol">  title:</span> <span class="hljs-string">"My First Blog Post!"</span>,
<span class="hljs-symbol">  author:</span> {
<span class="hljs-symbol">    id:</span> <span class="hljs-number">47</span>,
<span class="hljs-symbol">    name:</span> <span class="hljs-string">"Yehuda Katz"</span>
  },
<span class="hljs-symbol">  body:</span> <span class="hljs-string">"My first post. Wheeeee!"</span>
  };</code></pre>
<p>例如：（使用../访问）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"#with person"}}"
    <h1>"{{"../company.name"}}"</h1>
"{{"/with"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"></span><span class="hljs-template-tag">"{{"#<span class="hljs-name"><span class="hljs-builtin-name">with</span></span> person"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"../company.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">with</span></span>"}}"</span></code><span class="xml"></span></pre>
<p>对应适用json数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;person&quot;:
    { &quot;name&quot;: &quot;Alan&quot; },
        company:
    {&quot;name&quot;: &quot;Rad, Inc.&quot; }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    <span class="hljs-string">"person"</span>:
    { <span class="hljs-string">"name"</span>: <span class="hljs-string">"Alan"</span> },
        company:
    {<span class="hljs-string">"name"</span>: <span class="hljs-string">"Rad, Inc."</span> }
}<span class="hljs-comment">;</span>
</code></pre>
<h2 id="articleHeader9">自定义helper</h2>
<p>Handlebars，可以从任何上下文可以访问在一个模板，你可以使用Handlebars.registerHelper()方法来注册一个helper。</p>
<h2 id="articleHeader10">调试技巧</h2>
<p>把下面一段"debug helper"加载到你的JavaScript代码里,然后在模板文件里通过"{{"debug"}}"或是"{{"debug someValue"}}"方便调试数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Handlebars.registerHelper(&quot;debug&quot;, function(optionalValue) {  
  console.log(&quot;Current Context&quot;);
  console.log(&quot;====================&quot;);
  console.log(this);
  if (optionalValue) {
    console.log(&quot;Value&quot;);
    console.log(&quot;====================&quot;);
    console.log(optionalValue);
  }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Handlebars.registerHelper(<span class="hljs-string">"debug"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">optionalValue</span>) </span>{  
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Current Context"</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"===================="</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">if</span> (optionalValue) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Value"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"===================="</span>);
    <span class="hljs-built_in">console</span>.log(optionalValue);
  }
});
</code></pre>
<h2 id="articleHeader11">handlebars的jquery插件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function($) {
    var compiled = {};
    $.fn.handlebars = function(template, data) {
        if (template instanceof jQuery) {
            template = $(template).html();
        }
    compiled[template] = Handlebars.compile(template);
    this.html(compiled[template](data));
    };
})(jQuery);
$('#content').handlebars($('#template'), { name: &quot;Alan&quot; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$</span>) </span>{
    <span class="hljs-keyword">var</span> compiled = {};
    $.fn.handlebars = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">template, data</span>) </span>{
        <span class="hljs-keyword">if</span> (template <span class="hljs-keyword">instanceof</span> jQuery) {
            template = $(template).html();
        }
    compiled[template] = Handlebars.compile(template);
    <span class="hljs-keyword">this</span>.html(compiled[template](data));
    };
})(jQuery);
$(<span class="hljs-string">'#content'</span>).handlebars($(<span class="hljs-string">'#template'</span>), { <span class="hljs-attr">name</span>: <span class="hljs-string">"Alan"</span> });</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Handlebars.js 模板引擎

## 原文链接
[https://segmentfault.com/a/1190000011631575](https://segmentfault.com/a/1190000011631575)


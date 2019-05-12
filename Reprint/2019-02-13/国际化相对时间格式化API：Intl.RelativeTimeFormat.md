---
title: '国际化相对时间格式化API：Intl.RelativeTimeFormat' 
date: 2019-02-13 2:31:23
hidden: true
slug: t3m8c0fwo6s
categories: [reprint]
---

{{< raw >}}

                    
<p>原文：<a href="https://developers.google.com/web/updates/2018/10/intl-relativetimeformat" rel="nofollow noreferrer" target="_blank">The Intl.RelativeTimeFormat API</a>  <br>作者：<a href="https://twitter.com/mathias" rel="nofollow noreferrer" target="_blank">Mathias Bynens(@mathias)</a></p>
<p>现代 Web 应用程序通常使用“昨天”，“42秒前”或“3个月”之类的短语，而不是完整的日期和时间戳。这种相对时间格式已经变得非常普遍，以至于几个流行的库都实现了本地化格式化的函数。（例如 <a href="https://momentjs.com" rel="nofollow noreferrer" target="_blank">Moment.js</a>，<a href="https://github.com/globalizejs/globalize" rel="nofollow noreferrer" target="_blank">Globalize</a> 和 <a href="https://date-fns.org/docs/" rel="nofollow noreferrer" target="_blank">date-fns</a>。）</p>
<p>实现本地化相对时间格式化的一个问题是，您需要为每种语言提供习惯词或短语列表（例如“昨天”或“上一季度”）。<a href="http://cldr.unicode.org" rel="nofollow noreferrer" target="_blank">Unicode CLDR</a> 提供了此数据，但要在 JavaScript 中使用它，必须将其嵌入到库代码中一起提供。遗憾的是，这无疑会增加这些库的包大小，这会影响到脚本的加载时间、解析/编译成本和内存消耗。</p>
<p>全新的 <code>Intl.RelativeTimeFormat</code> API 将此负担转移到了 JavaScript 引擎，JavaScript 引擎可以提供语言环境数据并使其直接供 JavaScript 开发人员使用。 <code>Intl.RelativeTimeFormat</code> 在不牺牲性能的情况下实现相对时间的本地化格式化。</p>
<h2 id="articleHeader0">用法与示例</h2>
<p>以下示例展示了如何使用英语创建相对时间格式化程序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rtf = new Intl.RelativeTimeFormat('en');

rtf.format(3.14, 'second');
// → 'in 3.14 seconds'

rtf.format(-15, 'minute');
// → '15 minutes ago'

rtf.format(8, 'hour');
// → 'in 8 hours'

rtf.format(-2, 'day');
// → '2 days ago'

rtf.format(3, 'week');
// → 'in 3 weeks'

rtf.format(-5, 'month');
// → '5 months ago'

rtf.format(2, 'quarter');
// → 'in 2 quarters'

rtf.format(-42, 'year');
// → '42 years ago'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rtf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.RelativeTimeFormat(<span class="hljs-string">'en'</span>);

rtf.format(<span class="hljs-number">3.14</span>, <span class="hljs-string">'second'</span>);
<span class="hljs-comment">// → 'in 3.14 seconds'</span>

rtf.format(<span class="hljs-number">-15</span>, <span class="hljs-string">'minute'</span>);
<span class="hljs-comment">// → '15 minutes ago'</span>

rtf.format(<span class="hljs-number">8</span>, <span class="hljs-string">'hour'</span>);
<span class="hljs-comment">// → 'in 8 hours'</span>

rtf.format(<span class="hljs-number">-2</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '2 days ago'</span>

rtf.format(<span class="hljs-number">3</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → 'in 3 weeks'</span>

rtf.format(<span class="hljs-number">-5</span>, <span class="hljs-string">'month'</span>);
<span class="hljs-comment">// → '5 months ago'</span>

rtf.format(<span class="hljs-number">2</span>, <span class="hljs-string">'quarter'</span>);
<span class="hljs-comment">// → 'in 2 quarters'</span>

rtf.format(<span class="hljs-number">-42</span>, <span class="hljs-string">'year'</span>);
<span class="hljs-comment">// → '42 years ago'</span></code></pre>
<p>需要注意的是传递给 <code>Intl.RelativeTimeFormat</code> 构造函数的参数必须是<a href="https://tools.ietf.org/html/rfc5646" rel="nofollow noreferrer" target="_blank">一个 BCP 47 语言标记</a>，或者是<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation" rel="nofollow noreferrer" target="_blank">一个包括多个语言标记的数组</a>。</p>
<p>以下是使用其他语言（汉语简体中文）的示例：（译注：原文是西班牙语）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rtf = new Intl.RelativeTimeFormat('zh'); // 或 'zh-Hans-CN'

rtf.format(3.14, 'second');
// → '3.14秒钟后'

rtf.format(-15, 'minute');
// → '15分钟前'

rtf.format(8, 'hour');
// → '8小时后'

rtf.format(-2, 'day');
// → '2天前'

rtf.format(3, 'week');
// → '3周后'

rtf.format(-5, 'month');
// → '5个月前'

rtf.format(2, 'quarter');
// → '2个季度后'

rtf.format(-42, 'year');
// → '42年前'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rtf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.RelativeTimeFormat(<span class="hljs-string">'zh'</span>); <span class="hljs-comment">// 或 'zh-Hans-CN'</span>

rtf.format(<span class="hljs-number">3.14</span>, <span class="hljs-string">'second'</span>);
<span class="hljs-comment">// → '3.14秒钟后'</span>

rtf.format(<span class="hljs-number">-15</span>, <span class="hljs-string">'minute'</span>);
<span class="hljs-comment">// → '15分钟前'</span>

rtf.format(<span class="hljs-number">8</span>, <span class="hljs-string">'hour'</span>);
<span class="hljs-comment">// → '8小时后'</span>

rtf.format(<span class="hljs-number">-2</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '2天前'</span>

rtf.format(<span class="hljs-number">3</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '3周后'</span>

rtf.format(<span class="hljs-number">-5</span>, <span class="hljs-string">'month'</span>);
<span class="hljs-comment">// → '5个月前'</span>

rtf.format(<span class="hljs-number">2</span>, <span class="hljs-string">'quarter'</span>);
<span class="hljs-comment">// → '2个季度后'</span>

rtf.format(<span class="hljs-number">-42</span>, <span class="hljs-string">'year'</span>);
<span class="hljs-comment">// → '42年前'</span></code></pre>
<p>此外，<code>Intl.RelativeTimeFormat</code> 构造函数还接受一个可选 <code>options</code> 参数，该参数可以对输出进行细粒度控制。为了说明灵活性，让我们根据默认设置查看更多输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个简体中文相对时间格式化示例，使用默认设置。
// 在这个例子中，我们将默认参数显式的传进去
const rtf = new Intl.RelativeTimeFormat('zh', {
 localeMatcher: 'best fit', // 其他值: 'lookup'
 style: 'long', // 其他值: 'short' 或 'narrow'
 numeric: 'always', // 其他值: 'auto'
});

rtf.format(-1, 'day');
// → '1天前'

rtf.format(0, 'day');
// → '0天后'

rtf.format(1, 'day');
// → '1天后'

rtf.format(-1, 'week');
// → '1周前'

rtf.format(0, 'week');
// → '0周后'

rtf.format(1, 'week');
// → '1周后'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建一个简体中文相对时间格式化示例，使用默认设置。</span>
<span class="hljs-comment">// 在这个例子中，我们将默认参数显式的传进去</span>
<span class="hljs-keyword">const</span> rtf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.RelativeTimeFormat(<span class="hljs-string">'zh'</span>, {
 <span class="hljs-attr">localeMatcher</span>: <span class="hljs-string">'best fit'</span>, <span class="hljs-comment">// 其他值: 'lookup'</span>
 style: <span class="hljs-string">'long'</span>, <span class="hljs-comment">// 其他值: 'short' 或 'narrow'</span>
 numeric: <span class="hljs-string">'always'</span>, <span class="hljs-comment">// 其他值: 'auto'</span>
});

rtf.format(<span class="hljs-number">-1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '1天前'</span>

rtf.format(<span class="hljs-number">0</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '0天后'</span>

rtf.format(<span class="hljs-number">1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '1天后'</span>

rtf.format(<span class="hljs-number">-1</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '1周前'</span>

rtf.format(<span class="hljs-number">0</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '0周后'</span>

rtf.format(<span class="hljs-number">1</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '1周后'</span></code></pre>
<p>您可能已经注意到上面的格式化程序生成了字符串 <code>'1天前'</code> 而不是 <code>'昨天'</code>，还有显得比较弱智的 <code>'0周后'</code> 而不是 <code>'本周'</code>。发生这种情况是因为默认情况下，格式化程序使用数值进行输出。</p>
<p>要更改此行为，请将 <code>numeric</code> 选项设置为 <code>'auto'</code>（默认值是 <code>'always'</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rtf = new Intl.RelativeTimeFormat('zh', { numeric: 'auto' });

rtf.format(-1, 'day');
// → '昨天'

rtf.format(-2, 'day');
// → '前天'

rtf.format(0, 'day');
// → '今天'

rtf.format(1, 'day');
// → '明天'

rtf.format(2, 'day');
// → '后天'

rtf.format(-1, 'week');
// → '上周'

rtf.format(0, 'week');
// → '本周'

rtf.format(1, 'week');
// → '下周'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rtf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.RelativeTimeFormat(<span class="hljs-string">'zh'</span>, { <span class="hljs-attr">numeric</span>: <span class="hljs-string">'auto'</span> });

rtf.format(<span class="hljs-number">-1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '昨天'</span>

rtf.format(<span class="hljs-number">-2</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '前天'</span>

rtf.format(<span class="hljs-number">0</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '今天'</span>

rtf.format(<span class="hljs-number">1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '明天'</span>

rtf.format(<span class="hljs-number">2</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '后天'</span>

rtf.format(<span class="hljs-number">-1</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '上周'</span>

rtf.format(<span class="hljs-number">0</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '本周'</span>

rtf.format(<span class="hljs-number">1</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '下周'</span></code></pre>
<p>Analogous to other <code>Intl</code> classes, <code>Intl.RelativeTimeFormat</code> has a <code>formatToParts</code> method in addition to the format method. Although format covers the most common use case, <code>formatToParts</code> can be helpful if you need access to the individual parts of the generated output:</p>
<p>与其他 <code>Intl</code> 类一样，<code>Intl.RelativeTimeFormat</code> 除了 <code>format</code> 方法之外，还有一个 <code>formatToParts</code> 方法。虽然 <code>format</code> 涵盖了最常见的用例，但如果您需要访问生成的输出的各个部分，<code>formatToParts</code> 会很有帮助：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rtf = new Intl.RelativeTimeFormat('zh', { numeric: 'auto' });

rtf.format(-1, 'day');
// → '昨天'

rtf.formatToParts(-1, 'day');
// → [{ type: 'literal', value: '昨天' }]

rtf.format(3, 'week');
// → '3周后'

rtf.formatToParts(3, 'week');
// → [
//  { type: 'integer', value: '3', unit: 'week' },
//  { type: 'literal', value: '周后' }
// ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> rtf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Intl</span>.RelativeTimeFormat(<span class="hljs-string">'zh'</span>, { <span class="hljs-attr">numeric</span>: <span class="hljs-string">'auto'</span> });

rtf.format(<span class="hljs-number">-1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → '昨天'</span>

rtf.formatToParts(<span class="hljs-number">-1</span>, <span class="hljs-string">'day'</span>);
<span class="hljs-comment">// → [{ type: 'literal', value: '昨天' }]</span>

rtf.format(<span class="hljs-number">3</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → '3周后'</span>

rtf.formatToParts(<span class="hljs-number">3</span>, <span class="hljs-string">'week'</span>);
<span class="hljs-comment">// → [</span>
<span class="hljs-comment">//  { type: 'integer', value: '3', unit: 'week' },</span>
<span class="hljs-comment">//  { type: 'literal', value: '周后' }</span>
<span class="hljs-comment">// ]</span></code></pre>
<p>有关其余选项及其行为的详细信息，请参阅 <a href="https://github.com/tc39/proposal-intl-relative-time#api" rel="nofollow noreferrer" target="_blank">API docs in the proposal repository</a>.</p>
<h2 id="articleHeader1">结论</h2>
<p><code>Intl.RelativeTimeFormat</code> 默认情况下在 V8 v7.1.179 和 Chrome 71 中可用。随着此 API 变得更加广泛可用，您将发现诸如 <a href="https://momentjs.com" rel="nofollow noreferrer" target="_blank">Moment.js</a>、<a href="https://github.com/globalizejs/globalize" rel="nofollow noreferrer" target="_blank">Globalize</a>、<a href="https://date-fns.org/docs/" rel="nofollow noreferrer" target="_blank">date-fns</a> 之类的库，会从代码库中移除对硬编码 CLDR 数据库的依赖性，而使用本机相对时间格式化功能，从而提高加载时性能、分析和编译时性能、运行时性能和内存使用。</p>
<h2 id="articleHeader2">相关链接</h2>
<ul>
<li><a href="http://tc39.github.io/proposal-intl-relative-time/" rel="nofollow noreferrer" target="_blank">Intl.RelativeTimeFormat Spec Proposal</a></li>
<li><a href="http://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html" rel="nofollow noreferrer" target="_blank">The ECMAScript Internationalization API</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
国际化相对时间格式化API：Intl.RelativeTimeFormat

## 原文链接
[https://segmentfault.com/a/1190000016769252](https://segmentfault.com/a/1190000016769252)


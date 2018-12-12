---
title: 'Luxon 初步介绍(Moment 团队日期另一个类库)' 
date: 2018-12-13 2:30:07
hidden: true
slug: bm6ubyv4i0b
categories: [reprint]
---

{{< raw >}}

                    
<p>我不是 Moment 的深度用户, 只是日常会遇到一些时间格式化的需求,<br>之前用的都是 Moment, 不过对 Moment 的 mutable API 感到有些不舒服,<br>同事介绍过 Luxon,  里边用不可变数据的风格设计的 API, 所以就试试.<br>GitHub 上星星很多, 请放心食用  <a href="https://github.com/moment/luxon" rel="nofollow noreferrer" target="_blank">https://github.com/moment/luxon</a></p>
<p>Luxon 是 Moment 项目的某个维护者开发的, 按照他个人想法进行了改进,<br>除了不可变性, 使用的工具做了更新, 也尝试到时区做了更好的一些调整,<br>具体要看作者原文说明了 <a href="https://moment.github.io/luxon/docs/manual/why.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<h3 id="articleHeader0">Luxon 和 Moment 的区别</h3>
<p>文档有详细描述 <a href="https://moment.github.io/luxon/docs/manual/moment.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a><br>最明显的一个例子, 就是不可变性(Immutability), 比如在 Moment 当中修改时间:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var m1 = moment();
var m2 = m1.add(1, 'hours');
m1.valueOf() === m2.valueOf(); //=> true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> m1 = moment();
<span class="hljs-keyword">var</span> m2 = m1.add(<span class="hljs-number">1</span>, <span class="hljs-string">'hours'</span>);
m1.valueOf() === m2.valueOf(); <span class="hljs-comment">//=&gt; true</span></code></pre>
<p>原来的对象是会被修改的. 但是在 Luxon 当中旧的对象会保持不变:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d1 = DateTime.local();
var d2 = d1.plus({ hours: 1 });
d1.valueOf() === d2.valueOf(); //=> false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> d1 = DateTime.local();
<span class="hljs-keyword">var</span> d2 = d1.plus({ <span class="hljs-attr">hours</span>: <span class="hljs-number">1</span> });
d1.valueOf() === d2.valueOf(); <span class="hljs-comment">//=&gt; false</span></code></pre>
<p>这样, 基于旧的时间推移计算出新的时间的时候, 不用担心旧的数据被意外修改了.</p>
<p>在 API 风格上也有不小的调整. 比如例子当中就是 <code>DateTime</code> 这个对象了,<br>总体感觉 Luxon 命名相对啰嗦一点, 可能是为了更准确吧.</p>
<p>可能觉得好的一点就是比如读取 <code>m.year</code> 用了 Getter 接口, 这个更简单一点.<br>在上面的链接当中有详细的描述 <a href="https://moment.github.io/luxon/docs/manual/moment.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<p>另外专门看了下代码体积, 看上去是更大了. 反正两个都挺大的...<br><a href="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js" rel="nofollow noreferrer" target="_blank">https://cdnjs.cloudflare.com/...</a><br><a href="https://moment.github.io/luxon/global/luxon.min.js" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<h3 id="articleHeader1">引用代码</h3>
<p>Luxon 当中主要从 <code>DateTime</code> 开始调用, 根据平台不同写法不一样,<br>主要还是用 ES6 的语法引用 <code>DateTime</code> 对象吧:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var DateTime = luxon.DateTime;
const { DateTime } = require('luxon');

import { DateTime } from 'luxon';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> DateTime = luxon.DateTime;
<span class="hljs-keyword">const</span> { DateTime } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'luxon'</span>);

<span class="hljs-keyword">import</span> { DateTime } <span class="hljs-keyword">from</span> <span class="hljs-string">'luxon'</span>;</code></pre>
<p>如果是在 ClojureScript 当中, 借助 shadow-cljs, 可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(ns app (:require [&quot;luxon&quot; :refer [DateTime]]))

(.log js/console (.local DateTime))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="clojure hljs"><code class="clojure">(<span class="hljs-name"><span class="hljs-builtin-name">ns</span></span> app (<span class="hljs-symbol">:require</span> [<span class="hljs-string">"luxon"</span> <span class="hljs-symbol">:refer</span> [DateTime]]))

(<span class="hljs-name">.log</span> js/console (<span class="hljs-name">.local</span> DateTime))</code></pre>
<h3 id="articleHeader2">创建日期的对象</h3>
<p>Luxon 当中需要区分开很多的写法, 针对不用的格式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DateTime.local() // 类似 Date.now()
DateTime.fromISO(String)
DateTime.fromObject(Object) // fromJSDate(date: Date, options: Object): DateTime
DateTime.fromMillis(Number)
DateTime.fromJSDate(Date)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">DateTime.local() <span class="hljs-comment">// 类似 Date.now()</span>
DateTime.fromISO(<span class="hljs-built_in">String</span>)
DateTime.fromObject(<span class="hljs-built_in">Object</span>) <span class="hljs-comment">// fromJSDate(date: Date, options: Object): DateTime</span>
DateTime.fromMillis(<span class="hljs-built_in">Number</span>)
DateTime.fromJSDate(<span class="hljs-built_in">Date</span>)</code></pre>
<p>实际调用的结果比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="coffee> DateTime.local()
DateTime {
  ts: 2018-02-21T14:44:35.186+08:00,
  zone: Asia/Shanghai,
  locale: en-US }

coffee> date = new Date
2018-02-21T06:45:13.151Z

coffee> DateTime.fromJSDate(date)
DateTime {
  ts: 2018-02-21T14:45:13.151+08:00,
  zone: Asia/Shanghai,
  locale: en-US }

coffee> str = date.toISOString()
'2018-02-21T06:45:13.151Z'

coffee> DateTime.fromISO str
DateTime {
  ts: 2018-02-21T14:45:13.151+08:00,
  zone: Asia/Shanghai,
  locale: en-US }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code class="coffee">coffee&gt; DateTime.local()
DateTime {
  ts: 2018<span class="hljs-string">-02</span><span class="hljs-string">-21</span>T14:44:35.186<span class="hljs-string">+08</span>:00,
  zone: Asia/Shanghai,
  locale: en-US }

coffee&gt; date = new Date
2018<span class="hljs-string">-02</span><span class="hljs-string">-21</span>T06:45:13.151Z

coffee&gt; DateTime.fromJSDate(date)
DateTime {
  ts: 2018<span class="hljs-string">-02</span><span class="hljs-string">-21</span>T14:45:13.151<span class="hljs-string">+08</span>:00,
  zone: Asia/Shanghai,
  locale: en-US }

coffee&gt; str = date.toISOString()
'2018<span class="hljs-string">-02</span><span class="hljs-string">-21</span>T06:45:13.151Z'

coffee&gt; DateTime.fromISO str
DateTime {
  ts: 2018<span class="hljs-string">-02</span><span class="hljs-string">-21</span>T14:45:13.151<span class="hljs-string">+08</span>:00,
  zone: Asia/Shanghai,
  locale: en-US }</code></pre>
<p>再具体一些的用法, 可以去翻 API 文档:<br><a href="https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromISO" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<h3 id="articleHeader3">格式化日期</h3>
<p>内置格式没有怎么研究, 需要看上去业务不大用到, 提供格式尽管不少,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dt.toISO();         //=> '2017-04-20T11:32:00.000-04:00'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">dt.toISO();         <span class="hljs-comment">//=&gt; '2017-04-20T11:32:00.000-04:00'</span></code></pre>
<p>日期的格式化通过 <code>dt.toFormat</code> 方法来完成, 类似 <code>m.format</code>,<br>细节有些小的区别, 但是参考着文档来写吧:<br><a href="https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DateTime.local().toFormat(&quot;HH 'hours and' mm 'minutes'&quot;) //=> '20 hours and 55 minutes'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">DateTime.local().toFormat(<span class="hljs-string">"HH 'hours and' mm 'minutes'"</span>) <span class="hljs-comment">//=&gt; '20 hours and 55 minutes'</span></code></pre>
<h3 id="articleHeader4">日期的操作</h3>
<p>请参考文档 <a href="https://moment.github.io/luxon/docs/manual/math.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DateTime.local(2017, 2, 13).plus({ months: 1 }).toISODate() //=> '2017-03-13'
d1 < d2 // is d1 before d2?
d1.hasSame(d2, 'milllisecond'); // equivalent to `+d1 === +d2`
d1.hasSame(d2, 'minute');       // both DateTimes are in the same minute (and hour, day, month, etc)
d1.hasSame(d2, 'year');         // etc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">DateTime.local(<span class="hljs-number">2017</span>, <span class="hljs-number">2</span>, <span class="hljs-number">13</span>).plus({ <span class="hljs-attr">months</span>: <span class="hljs-number">1</span> }).toISODate() <span class="hljs-comment">//=&gt; '2017-03-13'</span>
d1 &lt; d2 <span class="hljs-comment">// is d1 before d2?</span>
d1.hasSame(d2, <span class="hljs-string">'milllisecond'</span>); <span class="hljs-comment">// equivalent to `+d1 === +d2`</span>
d1.hasSame(d2, <span class="hljs-string">'minute'</span>);       <span class="hljs-comment">// both DateTimes are in the same minute (and hour, day, month, etc)</span>
d1.hasSame(d2, <span class="hljs-string">'year'</span>);         <span class="hljs-comment">// etc</span></code></pre>
<p>Luxon 里有专门关于 Duration 的计算, 不大熟悉, 我就直接抄几个例子过一下了...<br><a href="https://moment.github.io/luxon/docs/manual/math.html#duration-math" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dur = Duration.fromObject({ days: 3, hours: 6})
dur.as('minutes')       //=> 4680" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> dur = Duration.fromObject({ <span class="hljs-attr">days</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">hours</span>: <span class="hljs-number">6</span>})
dur.as(<span class="hljs-string">'minutes'</span>)       <span class="hljs-comment">//=&gt; 4680</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var end = DateTime.fromISO('2017-03-13');
var start = DateTime.fromISO('2017-02-13');

var diffInMonths = end.diff(start, 'months');
diffInMonths.toObject(); //=> { months: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> end = DateTime.fromISO(<span class="hljs-string">'2017-03-13'</span>);
<span class="hljs-keyword">var</span> start = DateTime.fromISO(<span class="hljs-string">'2017-02-13'</span>);

<span class="hljs-keyword">var</span> diffInMonths = end.diff(start, <span class="hljs-string">'months'</span>);
diffInMonths.toObject(); <span class="hljs-comment">//=&gt; { months: 1 }</span></code></pre>
<h3 id="articleHeader5">其他</h3>
<p>我能想到还有的一个功能是多语言, 因为 Moment 里就容易用到.<br>翻了文档没有翻到, 只有一些通过操作系统 API 处理多语言的描述, 不了解...<br><a href="https://moment.github.io/luxon/docs/manual/intl.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>
<p>关于时区, Luxon 当中直接有支持, 看上去内容挺多, 然而不了解...<br><a href="https://moment.github.io/luxon/docs/manual/zones.html" rel="nofollow noreferrer" target="_blank">https://moment.github.io/luxo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Luxon 初步介绍(Moment 团队日期另一个类库)

## 原文链接
[https://segmentfault.com/a/1190000013315000](https://segmentfault.com/a/1190000013315000)


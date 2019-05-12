---
title: 'now.js 0.1.0 发布了' 
date: 2018-12-23 2:30:07
hidden: true
slug: scudm30pzx
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">now.js是什么</h2>
<p><code>now.js</code>是一个javascript的时间操作小工具，类似<a href="https://github.com/date-fns/date-fns" rel="nofollow noreferrer" target="_blank">date-fns</a>和<a href="https://github.com/moment/moment" rel="nofollow noreferrer" target="_blank">moment</a>。</p>
<h2 id="articleHeader1">长啥样</h2>
<p>简单的把示例放这，更多用法请到<a href="https://github.com/hongmaoxiao/now" rel="nofollow noreferrer" target="_blank">github</a>去发现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Now from 'now.js'; // for node(browser do not need this)

now = new Now()

now.format() // &quot;2017-11-20T22:23:00+08:00&quot;
now.format('YYYY-MM-DD HH:mm:ss.SSS') // &quot;2017-11-20 22:23:00.285&quot;
now.format(&quot;dddd, MMMM Do YYYY, h:mm:ss a&quot;) // &quot;Monday, November 20th 2017, 10:23:00 pm&quot;

now.locale('zh-cn') // support 118 languages
now.format(&quot;dddd, MMMM Do YYYY, h:mm:ss a&quot;) // &quot;星期一, 十一月 20日 2017, 10:23:00 晚上&quot;
now.elapse() // &quot;10 天前&quot;
// same as
now.timeAgo() // &quot;10 天前&quot;

// monday
now.monday() // &quot;2017-11-20 00:00:00&quot;

// isMonday
now.isMonday() // true

// isBefore
now.isBefore(new Date(2020, 10, 11)) // true

// isLeapYear
now.isLeapYear() // false
now.isLeapYear(2008) // true

// between
now.between(new Date(2008, 10, 10), new Date(2018, 10, 10)) // true

// UTC
now.UTC().format() // &quot;2017-11-20T22:23:00+00:00&quot;

now.beginningOfMinute()   // &quot;2017-11-20 22:23:00&quot;
now.beginningOfHour()     // &quot;2017-11-20 22:00:00&quot;
now.beginningOfDay()      // &quot;2017-11-20 00:00:00&quot;
now.beginningOfWeek()     // &quot;2017-11-19 00:00:00&quot;
now.firstDayMonday = true // Set Monday as first day, default is Sunday
now.beginningOfWeek()     // &quot;2017-11-20 00:00:00&quot;
now.beginningOfMonth()    // &quot;2017-11-01 00:00:00&quot;
now.beginningOfQuarter()  // &quot;2017-10-01 00:00:00&quot;
now.beginningOfYear()     // &quot;2017-01-01 00:00:00&quot;

now.endOfMinute()         // &quot;2017-11-20 22:23:59.999&quot;
now.endOfHour()           // &quot;2017-11-20 22:59:59.999&quot;
now.endOfDay()            // &quot;2017-11-20 23:59:59.999&quot;
now.endOfWeek()           // &quot;2017-11-25 23:59:59.999&quot;
now.firstDayMonday = true // Set Monday as first day, default is Sunday
now.endOfWeek()           // &quot;2017-11-26 23:59:59.999&quot;
now.endOfMonth()          // &quot;2017-11-30 23:59:59.999&quot;
now.endOfQuarter()        // &quot;2017-12-31 23:59:59.999&quot;
now.endOfYear()           // &quot;2017-12-31 23:59:59.999&quot;

All the above functions return String type. You can pass 'self' to return Now instance:

var beginningOfMinute = now.beginningOfMinute('self') // return Now instance
beginningOfMinute.format('ddd, Ah') // &quot;Mon, PM10&quot;
beginningOfMinute.format('LLLL') // &quot;Monday, November 20, 2017 10:23 PM&quot;
beginningOfMinute.isMonday() // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Now <span class="hljs-keyword">from</span> <span class="hljs-string">'now.js'</span>; <span class="hljs-comment">// for node(browser do not need this)</span>

now = <span class="hljs-keyword">new</span> Now()

now.format() <span class="hljs-comment">// "2017-11-20T22:23:00+08:00"</span>
now.format(<span class="hljs-string">'YYYY-MM-DD HH:mm:ss.SSS'</span>) <span class="hljs-comment">// "2017-11-20 22:23:00.285"</span>
now.format(<span class="hljs-string">"dddd, MMMM Do YYYY, h:mm:ss a"</span>) <span class="hljs-comment">// "Monday, November 20th 2017, 10:23:00 pm"</span>

now.locale(<span class="hljs-string">'zh-cn'</span>) <span class="hljs-comment">// support 118 languages</span>
now.format(<span class="hljs-string">"dddd, MMMM Do YYYY, h:mm:ss a"</span>) <span class="hljs-comment">// "星期一, 十一月 20日 2017, 10:23:00 晚上"</span>
now.elapse() <span class="hljs-comment">// "10 天前"</span>
<span class="hljs-comment">// same as</span>
now.timeAgo() <span class="hljs-comment">// "10 天前"</span>

<span class="hljs-comment">// monday</span>
now.monday() <span class="hljs-comment">// "2017-11-20 00:00:00"</span>

<span class="hljs-comment">// isMonday</span>
now.isMonday() <span class="hljs-comment">// true</span>

<span class="hljs-comment">// isBefore</span>
now.isBefore(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2020</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>)) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// isLeapYear</span>
now.isLeapYear() <span class="hljs-comment">// false</span>
now.isLeapYear(<span class="hljs-number">2008</span>) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// between</span>
now.between(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2008</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>), <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2018</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>)) <span class="hljs-comment">// true</span>

<span class="hljs-comment">// UTC</span>
now.UTC().format() <span class="hljs-comment">// "2017-11-20T22:23:00+00:00"</span>

now.beginningOfMinute()   <span class="hljs-comment">// "2017-11-20 22:23:00"</span>
now.beginningOfHour()     <span class="hljs-comment">// "2017-11-20 22:00:00"</span>
now.beginningOfDay()      <span class="hljs-comment">// "2017-11-20 00:00:00"</span>
now.beginningOfWeek()     <span class="hljs-comment">// "2017-11-19 00:00:00"</span>
now.firstDayMonday = <span class="hljs-literal">true</span> <span class="hljs-comment">// Set Monday as first day, default is Sunday</span>
now.beginningOfWeek()     <span class="hljs-comment">// "2017-11-20 00:00:00"</span>
now.beginningOfMonth()    <span class="hljs-comment">// "2017-11-01 00:00:00"</span>
now.beginningOfQuarter()  <span class="hljs-comment">// "2017-10-01 00:00:00"</span>
now.beginningOfYear()     <span class="hljs-comment">// "2017-01-01 00:00:00"</span>

now.endOfMinute()         <span class="hljs-comment">// "2017-11-20 22:23:59.999"</span>
now.endOfHour()           <span class="hljs-comment">// "2017-11-20 22:59:59.999"</span>
now.endOfDay()            <span class="hljs-comment">// "2017-11-20 23:59:59.999"</span>
now.endOfWeek()           <span class="hljs-comment">// "2017-11-25 23:59:59.999"</span>
now.firstDayMonday = <span class="hljs-literal">true</span> <span class="hljs-comment">// Set Monday as first day, default is Sunday</span>
now.endOfWeek()           <span class="hljs-comment">// "2017-11-26 23:59:59.999"</span>
now.endOfMonth()          <span class="hljs-comment">// "2017-11-30 23:59:59.999"</span>
now.endOfQuarter()        <span class="hljs-comment">// "2017-12-31 23:59:59.999"</span>
now.endOfYear()           <span class="hljs-comment">// "2017-12-31 23:59:59.999"</span>

All the above functions <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span> type. You can pass <span class="hljs-string">'self'</span> to <span class="hljs-keyword">return</span> Now instance:

<span class="hljs-keyword">var</span> beginningOfMinute = now.beginningOfMinute(<span class="hljs-string">'self'</span>) <span class="hljs-comment">// return Now instance</span>
beginningOfMinute.format(<span class="hljs-string">'ddd, Ah'</span>) <span class="hljs-comment">// "Mon, PM10"</span>
beginningOfMinute.format(<span class="hljs-string">'LLLL'</span>) <span class="hljs-comment">// "Monday, November 20, 2017 10:23 PM"</span>
beginningOfMinute.isMonday() <span class="hljs-comment">// true</span>
</code></pre>
<h2 id="articleHeader2">为什么要写这个库</h2>
<p>因为学习<a href="https://github.com/jashkenas/underscore" rel="nofollow noreferrer" target="_blank">underscore</a>源码的过程中，感觉无聊。想写个库调剂一下，当做学习的机会。<br><br>我是照着<code>underscore</code>源码一个个commit敲的.代码放在<a href="https://github.com/hongmaoxiao/underscore_source" rel="nofollow noreferrer" target="_blank">这里</a>，刚看了一眼，有668次commit，两个月，敲到了1.4.3版本，可能还没到一半。<br><br>敲久了有点无聊。想动手写一个库作为调剂。碰巧之前做防健忘短信提醒的时候是用go写的后台，用了<a href="https://github.com/jinzhu/gorm" rel="nofollow noreferrer" target="_blank">gorm</a>，在作者<code>jinzhu</code>的github主页上发现了<a href="https://github.com/jinzhu/now" rel="nofollow noreferrer" target="_blank">now</a>，是一个go的时间帮助库，觉得很有意思。clone之，学之。<br><br>偷了<code>now</code>的思想。造一个javascript版的就显得很容易。很快我就写完了除了<code>Parse </code>和<code>MustParse </code>之外的所有方法。跟原库对比一下。觉得now.js就是个玩具。这不怪我，javascript对时间处理的支持远不如go。比如go原生支持<code>format</code>、字符串解析成时间以及<code>Duration</code>等等。<br><br>想着加上<code>format</code>。该怎么去写？立马就想到的方法是平时经常写的根据不同条件做字符串拼接。确实是个方法。但得多少switch case才能涵盖所有情况，想想都可怕。显然这是最蠢也是工作量最大的方法。<br><br>不会，那就借鉴别人的。github上发现了date-fns和moment，支持i18n国际化。</p>
<p>date-fns:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { formatRelative } from 'date-fns'
import { es, ru } from 'date-fns/esm/locale'

formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
//=> &quot;el viernes pasado a las 19:26&quot;

formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })
//=> &quot;в прошлую пятницу в 19:26&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { formatRelative } <span class="hljs-keyword">from</span> <span class="hljs-string">'date-fns'</span>
<span class="hljs-keyword">import</span> { es, ru } <span class="hljs-keyword">from</span> <span class="hljs-string">'date-fns/esm/locale'</span>

formatRelative(subDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">3</span>), <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), { <span class="hljs-attr">locale</span>: es })
<span class="hljs-comment">//=&gt; "el viernes pasado a las 19:26"</span>

formatRelative(subDays(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-number">3</span>), <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), { <span class="hljs-attr">locale</span>: ru })
<span class="hljs-comment">//=&gt; "в прошлую пятницу в 19:26"</span></code></pre>
<p>moment:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment.locale('fr');
moment(1316116057189).fromNow(); // il y a une heure
moment.locale('en');
moment(1316116057189).fromNow(); // an hour ago" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">moment.locale(<span class="hljs-string">'fr'</span>);
moment(<span class="hljs-number">1316116057189</span>).fromNow(); <span class="hljs-comment">// il y a une heure</span>
moment.locale(<span class="hljs-string">'en'</span>);
moment(<span class="hljs-number">1316116057189</span>).fromNow(); <span class="hljs-comment">// an hour ago</span></code></pre>
<p>我的审美告诉我应该选择moment，调用一次locale()，这之后的format都是基于该locale的。当然它也还支持每次单独指定locale的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment.duration(1, &quot;minutes&quot;).locale(&quot;en&quot;).humanize(); // a minute
moment.duration(1, &quot;minutes&quot;).locale(&quot;fr&quot;).humanize(); // une minute
moment.duration(1, &quot;minutes&quot;).locale(&quot;es&quot;).humanize(); // un minuto" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">moment.duration(<span class="hljs-number">1</span>, <span class="hljs-string">"minutes"</span>).locale(<span class="hljs-string">"en"</span>).humanize(); <span class="hljs-comment">// a minute</span>
moment.duration(<span class="hljs-number">1</span>, <span class="hljs-string">"minutes"</span>).locale(<span class="hljs-string">"fr"</span>).humanize(); <span class="hljs-comment">// une minute</span>
moment.duration(<span class="hljs-number">1</span>, <span class="hljs-string">"minutes"</span>).locale(<span class="hljs-string">"es"</span>).humanize(); <span class="hljs-comment">// un minuto</span></code></pre>
<p>进一步学习发现moment的format和i18n国际化高度耦合。要用它的i18n意味着基本上也得用它的format。当然i18n也不是核心的moment库作者写的，他们也精通不了那么多国家的语言，那都是github上许许多多人贡献的。开源就有这好处。看下LICENCE是MIT的，代码可用，抄。<br><br>now.js也是MIT协议的，负罪感少了点(其实MIT协议是相当宽松的，就算你拿它代码去商业化也是没有问题的)。况且我写库的主要目的是为了学习。<br><br>开干！虽说是抄，毕竟代码要整合到我的库，直接复制粘贴是不行的。所有的代码细节未必都需要全知道，但看懂整体运行的逻辑是必须的，下点功夫，整合成功，开源。</p>
<h2 id="articleHeader3">思维脑图</h2>
<p><strong>moment:</strong><br><br><span class="img-wrap"><img data-src="https://fengxiaomao.com/upload/moment.png" src="https://static.alili.techhttps://fengxiaomao.com/upload/moment.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然，moment的东西不止上图这些，我只取了一部分来画。<br><br><br><strong>now.js:</strong><br><br><span class="img-wrap"><img data-src="https://fengxiaomao.com/upload/now.js.png" src="https://static.alili.techhttps://fengxiaomao.com/upload/now.js.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>now.js的Duration和moment的不一样，现在还不支持单独使用，只是给内部方法<code>elapse</code>使用，以后可能会支持单独使用。</p>
<h2 id="articleHeader4">对比</h2>
<ol>
<li>moment是大而全，now.js是刚够用。</li>
<li>moment的parse相当强大，now.js就暂时不支持了，只支持和<code>new Date(args)</code>相同的<code>args</code>参数类型。不过<code>format</code>应该都基本上和moment的一样，不过测试用例现在还没有写太全，如果谁用了并且发现bug，可以到<a href="https://github.com/hongmaoxiao/now" rel="nofollow noreferrer" target="_blank">github</a>去提issues。不胜感激。<br>
</li>
<li>moment是页面一加载的时候会把所有的i18n都初始化了，这点我个人认为不好，加载时间长，网络情况不好的时候，差不多需要10秒我才能在devtool上调试（当然这也包括官网加载的其他很多东西）。now.js只加载默认的，需要的时候按需加载。</li>
<li>moment做什么操作前都要检测一下date是否合法的（isvalid）。now.js在parse的时候如果不合法就直接抛出错误，以免后续没玩没了的检测。当然这可能损失了用户友好性，但是对减少代码量是很有帮助的。</li>
</ol>
<h2 id="articleHeader5">结语</h2>
<p>这个库不是我一个人写的，是许多开源工作者共同完成的。感谢moment的所有开源贡献者，我从中学习了很多东西。后续还会继续研究moment的代码细节，偷偷它的思想。<br><br><br><strong>写代码什么最重要？思想最重要！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
now.js 0.1.0 发布了

## 原文链接
[https://segmentfault.com/a/1190000012270796](https://segmentfault.com/a/1190000012270796)


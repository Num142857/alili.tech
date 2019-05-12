---
title: '也许是最简洁好用的timeago.js库了' 
date: 2019-02-08 2:30:41
hidden: true
slug: ixpx703one9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">timeago.js</h3>
<p>Github地址：<a href="https://github.com/hustcc/timeago.js" rel="nofollow noreferrer" target="_blank">https://github.com/hustcc/timeago.js</a></p>
<p>项目主页：<a href="http://timeago.org/" rel="nofollow noreferrer" target="_blank">http://timeago.org/</a></p>
<blockquote><p><strong>timeago.js</strong> 是一个非常简洁、轻量级、小于 <code>2kb</code> 的很简洁的Javascript库，用来将datetime时间转化成类似于<code>*** 时间前</code>的描述字符串，例如：“3小时前”。</p></blockquote>
<ul>
<li><p>本地化支持，默认自带中文和英文语言，基本够用；</p></li>
<li><p>之前 xxx 时间前、xxx 时间后；</p></li>
<li><p>支持npm方式和浏览器script方式；</p></li>
<li><p>测试用例完善，执行良好；</p></li>
</ul>
<p>关于Python的版本，可以看 <a href="https://github.com/hustcc/timeago" rel="nofollow noreferrer" target="_blank">timeago</a>.</p>
<p><a href="https://travis-ci.org/hustcc/timeago.js" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000005788908" src="https://static.alili.tech/img/remote/1460000005788908" alt="Build Status" title="Build Status" style="cursor: pointer;"></span></a> <a href="https://www.npmjs.com/package/timeago.js" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000005788907" src="https://static.alili.tech/img/remote/1460000005788907" alt="npm" title="npm" style="cursor: pointer;"></span></a> <a href="https://www.npmjs.com/package/timeago.js" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000005788909" src="https://static.alili.tech/img/remote/1460000005788909" alt="npm" title="npm" style="cursor: pointer;"></span></a> <a href="https://www.npmjs.com/package/timeago.js" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000006788034" src="https://static.alili.tech/img/remote/1460000006788034" alt="npm" title="npm" style="cursor: pointer;"></span></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="刚刚
12秒前
3分钟前
2小时前
24天前
6月前
3年前

12秒后
3分钟后
2小时后
24天后
6月后
3年后" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>刚刚
<span class="hljs-number">12</span>秒前
<span class="hljs-number">3</span>分钟前
<span class="hljs-number">2</span>小时前
<span class="hljs-number">24</span>天前
<span class="hljs-number">6</span>月前
<span class="hljs-number">3</span>年前

<span class="hljs-number">12</span>秒后
<span class="hljs-number">3</span>分钟后
<span class="hljs-number">2</span>小时后
<span class="hljs-number">24</span>天后
<span class="hljs-number">6</span>月后
<span class="hljs-number">3</span>年后</code></pre>
<h3 id="articleHeader1">使用方法</h3>
<p><strong> 1. 下载 timeago.js </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install timeago.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="sh" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> timeago.js</code></pre>
<p><strong> 2. 引入 timeago.js </strong></p>
<p>使用import引入，然后可以得到一个全局变量: <code>timeago</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import timeago from 'timeago.js';

// 或者

var timeago = require(&quot;timeago.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> timeago <span class="hljs-keyword">from</span> <span class="hljs-string">'timeago.js'</span>;

<span class="hljs-comment">// 或者</span>

<span class="hljs-keyword">var</span> timeago = <span class="hljs-built_in">require</span>(<span class="hljs-string">"timeago.js"</span>);</code></pre>
<p>或者直接通过 <code>script</code> 标签引入到html文件中.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;dist/timeago.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;script src=<span class="hljs-string">"dist/timeago.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><strong> 3. 使用 <code>timeago</code> 类 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeago = timeago();
timeago.format('2016-06-12')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timeago = timeago();
timeago.format(<span class="hljs-string">'2016-06-12'</span>)</code></pre>
<h3 id="articleHeader2">高级特性使用</h3>
<p><strong> 1. 本地化 </strong></p>
<p>默认的语言是英文 <strong><code>en</code></strong>, 这个库自带语言有 <code>en</code> and <code>zh_CN</code> （英文和中文）.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeago = timeago();
timeago.format('2016-06-12', 'zh_CN');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timeago = timeago();
timeago.format(<span class="hljs-string">'2016-06-12'</span>, <span class="hljs-string">'zh_CN'</span>);</code></pre>
<p><strong> 2. 注册本地语言 </strong></p>
<p>你可以自己自定义注册 <code>register</code> 你自己的语言. 如下所示，所有的键值都必须存在，不然可能会出错. e.g.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 本地化的字典样式
var test_local_dict = {
  'JUST_NOW': [&quot;just now&quot;, &quot;a while&quot;],
  'SECOND_AGO': [&quot;%s seconds ago&quot;, &quot;in %s seconds&quot;],
  'A_MINUTE_AGO': [&quot;1 minute ago&quot;, &quot;in 1 minute&quot;],
  'MINUTES_AGO': [&quot;%s minutes ago&quot;, &quot;in %s minutes&quot;],
  'AN_HOUR_AGO': [&quot;1 hour ago&quot;, &quot;in 1 hour&quot;],
  'HOURS_AGO': [&quot;%s hours ago&quot;, &quot;in %s hours&quot;],
  'A_DAY_AGO': [&quot;1 day ago&quot;, &quot;in 1 day&quot;],
  'DAYS_AGO': [&quot;%s days ago&quot;, &quot;in %s days&quot;],
  'A_MONTH_AGO': [&quot;1 month ago&quot;, &quot;in 1 month&quot;],
  'MONTHS_AGO': [&quot;%s months ago&quot;, &quot;in %s months&quot;],
  'A_YEAR_AGO': [&quot;1 year ago&quot;, &quot;in 1 year&quot;],
  'YEARS_AGO': [&quot;%s years ago&quot;, &quot;in %s years&quot;]
}

var timeago = timeago();
timeago.register('test_local', test_local_dict);

timeago.format('2016-06-12', 'test_local');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 本地化的字典样式</span>
<span class="hljs-keyword">var</span> test_local_dict = {
  <span class="hljs-string">'JUST_NOW'</span>: [<span class="hljs-string">"just now"</span>, <span class="hljs-string">"a while"</span>],
  <span class="hljs-string">'SECOND_AGO'</span>: [<span class="hljs-string">"%s seconds ago"</span>, <span class="hljs-string">"in %s seconds"</span>],
  <span class="hljs-string">'A_MINUTE_AGO'</span>: [<span class="hljs-string">"1 minute ago"</span>, <span class="hljs-string">"in 1 minute"</span>],
  <span class="hljs-string">'MINUTES_AGO'</span>: [<span class="hljs-string">"%s minutes ago"</span>, <span class="hljs-string">"in %s minutes"</span>],
  <span class="hljs-string">'AN_HOUR_AGO'</span>: [<span class="hljs-string">"1 hour ago"</span>, <span class="hljs-string">"in 1 hour"</span>],
  <span class="hljs-string">'HOURS_AGO'</span>: [<span class="hljs-string">"%s hours ago"</span>, <span class="hljs-string">"in %s hours"</span>],
  <span class="hljs-string">'A_DAY_AGO'</span>: [<span class="hljs-string">"1 day ago"</span>, <span class="hljs-string">"in 1 day"</span>],
  <span class="hljs-string">'DAYS_AGO'</span>: [<span class="hljs-string">"%s days ago"</span>, <span class="hljs-string">"in %s days"</span>],
  <span class="hljs-string">'A_MONTH_AGO'</span>: [<span class="hljs-string">"1 month ago"</span>, <span class="hljs-string">"in 1 month"</span>],
  <span class="hljs-string">'MONTHS_AGO'</span>: [<span class="hljs-string">"%s months ago"</span>, <span class="hljs-string">"in %s months"</span>],
  <span class="hljs-string">'A_YEAR_AGO'</span>: [<span class="hljs-string">"1 year ago"</span>, <span class="hljs-string">"in 1 year"</span>],
  <span class="hljs-string">'YEARS_AGO'</span>: [<span class="hljs-string">"%s years ago"</span>, <span class="hljs-string">"in %s years"</span>]
}

<span class="hljs-keyword">var</span> timeago = timeago();
timeago.register(<span class="hljs-string">'test_local'</span>, test_local_dict);

timeago.format(<span class="hljs-string">'2016-06-12'</span>, <span class="hljs-string">'test_local'</span>);</code></pre>
<p><strong> 3. 设置相对日期 </strong></p>
<p><code>timeago</code> 默认是相对于当前事件的，当然也可以自己设置相对的时间，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timeago = timeago('2016-06-10 12:12:12'); // 在这里设置相对时间
timeago.format('2016-06-12', 'zh_CN');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> timeago = timeago(<span class="hljs-string">'2016-06-10 12:12:12'</span>); <span class="hljs-comment">// 在这里设置相对时间</span>
timeago.format(<span class="hljs-string">'2016-06-12'</span>, <span class="hljs-string">'zh_CN'</span>);</code></pre>
<p><strong> 4. 格式化时间戳 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timeago().format(new Date().getTime() - 11 * 1000 * 60 * 60); // will get '11 hours ago'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">timeago().format(new Date().getTime() - <span class="hljs-number">11</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>); <span class="hljs-comment">// will get '11 hours ago'</span></code></pre>
<h3 id="articleHeader3">TODO</h3>
<ul><li><p>一个网站的展示页面</p></li></ul>
<h3 id="articleHeader4">LICENSE</h3>
<p>MIT</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
也许是最简洁好用的timeago.js库了

## 原文链接
[https://segmentfault.com/a/1190000005788904](https://segmentfault.com/a/1190000005788904)


---
title: 'JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法' 
date: 2018-12-01 2:30:12
hidden: true
slug: 8zfcgvta59b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">方法一：</h2>
<p>使用Javascript语言，将时间戳转换为类似新浪微博的时间的表示方法。<br>要求转换规则：<br>1分钟以内显示为：刚刚<br>1小时以内显示为：N分钟前<br>当天以内显示为：今天 N点N分（如：今天 22:33）<br>昨天时间显示为：昨天 N点N分（如：昨天 10:15）<br>当年以内显示为：N月N日 N点N分（如：02月03日 09:33）<br>今年以前显示为：N年N月N日 N点N分（如：2000年09月18日 15:59）</p>
<p>自定义的转换函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timestampFormat( timestamp ) {
    function zeroize( num ) {
        return (String(num).length == 1 ? '0' : '') + num;
    }
 
    var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
    var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
 
    var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
    var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象
 
    var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
    var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
 
    if ( timestampDiff < 60 ) { // 一分钟以内
        return &quot;刚刚&quot;;
    } else if( timestampDiff < 3600 ) { // 一小时前之内
        return Math.floor( timestampDiff / 60 ) + &quot;分钟前&quot;;
    } else if ( curDate.getFullYear() == Y &amp;&amp; curDate.getMonth()+1 == m &amp;&amp; curDate.getDate() == d ) {
        return '今天' + zeroize(H) + ':' + zeroize(i);
    } else {
        var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
        if ( newDate.getFullYear() == Y &amp;&amp; newDate.getMonth()+1 == m &amp;&amp; newDate.getDate() == d ) {
            return '昨天' + zeroize(H) + ':' + zeroize(i);
        } else if ( curDate.getFullYear() == Y ) {
            return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        } else {
            return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timestampFormat</span>(<span class="hljs-params"> timestamp </span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">zeroize</span>(<span class="hljs-params"> num </span>) </span>{
        <span class="hljs-keyword">return</span> (<span class="hljs-built_in">String</span>(num).length == <span class="hljs-number">1</span> ? <span class="hljs-string">'0'</span> : <span class="hljs-string">''</span>) + num;
    }
 
    <span class="hljs-keyword">var</span> curTimestamp = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() / <span class="hljs-number">1000</span>); <span class="hljs-comment">//当前时间戳</span>
    <span class="hljs-keyword">var</span> timestampDiff = curTimestamp - timestamp; <span class="hljs-comment">// 参数时间戳与当前时间戳相差秒数</span>
 
    <span class="hljs-keyword">var</span> curDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>( curTimestamp * <span class="hljs-number">1000</span> ); <span class="hljs-comment">// 当前时间日期对象</span>
    <span class="hljs-keyword">var</span> tmDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>( timestamp * <span class="hljs-number">1000</span> );  <span class="hljs-comment">// 参数时间戳转换成的日期对象</span>
 
    <span class="hljs-keyword">var</span> Y = tmDate.getFullYear(), m = tmDate.getMonth() + <span class="hljs-number">1</span>, d = tmDate.getDate();
    <span class="hljs-keyword">var</span> H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();
 
    <span class="hljs-keyword">if</span> ( timestampDiff &lt; <span class="hljs-number">60</span> ) { <span class="hljs-comment">// 一分钟以内</span>
        <span class="hljs-keyword">return</span> <span class="hljs-string">"刚刚"</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( timestampDiff &lt; <span class="hljs-number">3600</span> ) { <span class="hljs-comment">// 一小时前之内</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor( timestampDiff / <span class="hljs-number">60</span> ) + <span class="hljs-string">"分钟前"</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( curDate.getFullYear() == Y &amp;&amp; curDate.getMonth()+<span class="hljs-number">1</span> == m &amp;&amp; curDate.getDate() == d ) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'今天'</span> + zeroize(H) + <span class="hljs-string">':'</span> + zeroize(i);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> newDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>( (curTimestamp - <span class="hljs-number">86400</span>) * <span class="hljs-number">1000</span> ); <span class="hljs-comment">// 参数中的时间戳加一天转换成的日期对象</span>
        <span class="hljs-keyword">if</span> ( newDate.getFullYear() == Y &amp;&amp; newDate.getMonth()+<span class="hljs-number">1</span> == m &amp;&amp; newDate.getDate() == d ) {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'昨天'</span> + zeroize(H) + <span class="hljs-string">':'</span> + zeroize(i);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( curDate.getFullYear() == Y ) {
            <span class="hljs-keyword">return</span>  zeroize(m) + <span class="hljs-string">'月'</span> + zeroize(d) + <span class="hljs-string">'日 '</span> + zeroize(H) + <span class="hljs-string">':'</span> + zeroize(i);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span>  Y + <span class="hljs-string">'年'</span> + zeroize(m) + <span class="hljs-string">'月'</span> + zeroize(d) + <span class="hljs-string">'日 '</span> + zeroize(H) + <span class="hljs-string">':'</span> + zeroize(i);
        }
    }
}</code></pre>
<p>参数的时间不能大于当前时间，大于当前时间会返回“刚刚”。</p>
<p>用法展示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timestampFormat(1326170770); //2012年01月10日 12:46
timestampFormat(Date.parse('2016-10-11 15:26:10')/1000); //刚刚
timestampFormat(Date.parse('2016-10-11 15:10:10')/1000); //16分钟前
timestampFormat(Date.parse('2016-10-11 10:10:10')/1000); //今天10:10
timestampFormat(Date.parse('2016-10-10 10:10:10')/1000); //昨天10:10
timestampFormat(Date.parse('2016-02-10 10:10:10')/1000); //02月10日 10:10
timestampFormat(Date.parse('2012-10-10 10:10:10')/1000); //2012年10月10日 10:10

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">timestampFormat</span>(<span class="hljs-number">1326170770</span>); <span class="hljs-comment">//2012年01月10日 12:46</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2016-10-11 15:26:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//刚刚</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2016-10-11 15:10:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//16分钟前</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2016-10-11 10:10:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//今天10:10</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2016-10-10 10:10:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//昨天10:10</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2016-02-10 10:10:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//02月10日 10:10</span>
<span class="hljs-selector-tag">timestampFormat</span>(Date.parse(<span class="hljs-string">'2012-10-10 10:10:10'</span>)/<span class="hljs-number">1000</span>); <span class="hljs-comment">//2012年10月10日 10:10</span>

</code></pre>
<h2 id="articleHeader1">方法二</h2>
<p>在新浪微博首页看到每条微博后边显示的时间并不是标准的年-月-日格式，而是经过换算的时间差，如：发表于5分钟前、发表于“2小时前”，比起标准的时间显示格式，貌似更加直观和人性化。要实现类似功能，用JS就可以，实现方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//JavaScript函数：
var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;
function getDateDiff(dateTimeStamp){
var now = new Date().getTime();
var diffValue = now - dateTimeStamp;
if(diffValue < 0){
 //若日期不符则弹出窗口告之
 //alert(&quot;结束日期不能小于开始日期！&quot;);
 }
var monthC =diffValue/month;
var weekC =diffValue/(7*day);
var dayC =diffValue/day;
var hourC =diffValue/hour;
var minC =diffValue/minute;
if(monthC>=1){
 result=&quot;发表于&quot; + parseInt(monthC) + &quot;个月前&quot;;
 }
 else if(weekC>=1){
 result=&quot;发表于&quot; + parseInt(weekC) + &quot;周前&quot;;
 }
 else if(dayC>=1){
 result=&quot;发表于&quot;+ parseInt(dayC) +&quot;天前&quot;;
 }
 else if(hourC>=1){
 result=&quot;发表于&quot;+ parseInt(hourC) +&quot;个小时前&quot;;
 }
 else if(minC>=1){
 result=&quot;发表于&quot;+ parseInt(minC) +&quot;分钟前&quot;;
 }else
 result=&quot;刚刚发表&quot;;
return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//JavaScript函数：</span>
<span class="hljs-keyword">var</span> minute = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span>;
<span class="hljs-keyword">var</span> hour = minute * <span class="hljs-number">60</span>;
<span class="hljs-keyword">var</span> day = hour * <span class="hljs-number">24</span>;
<span class="hljs-keyword">var</span> halfamonth = day * <span class="hljs-number">15</span>;
<span class="hljs-keyword">var</span> month = day * <span class="hljs-number">30</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDateDiff</span>(<span class="hljs-params">dateTimeStamp</span>)</span>{
<span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
<span class="hljs-keyword">var</span> diffValue = now - dateTimeStamp;
<span class="hljs-keyword">if</span>(diffValue &lt; <span class="hljs-number">0</span>){
 <span class="hljs-comment">//若日期不符则弹出窗口告之</span>
 <span class="hljs-comment">//alert("结束日期不能小于开始日期！");</span>
 }
<span class="hljs-keyword">var</span> monthC =diffValue/month;
<span class="hljs-keyword">var</span> weekC =diffValue/(<span class="hljs-number">7</span>*day);
<span class="hljs-keyword">var</span> dayC =diffValue/day;
<span class="hljs-keyword">var</span> hourC =diffValue/hour;
<span class="hljs-keyword">var</span> minC =diffValue/minute;
<span class="hljs-keyword">if</span>(monthC&gt;=<span class="hljs-number">1</span>){
 result=<span class="hljs-string">"发表于"</span> + <span class="hljs-built_in">parseInt</span>(monthC) + <span class="hljs-string">"个月前"</span>;
 }
 <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(weekC&gt;=<span class="hljs-number">1</span>){
 result=<span class="hljs-string">"发表于"</span> + <span class="hljs-built_in">parseInt</span>(weekC) + <span class="hljs-string">"周前"</span>;
 }
 <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(dayC&gt;=<span class="hljs-number">1</span>){
 result=<span class="hljs-string">"发表于"</span>+ <span class="hljs-built_in">parseInt</span>(dayC) +<span class="hljs-string">"天前"</span>;
 }
 <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(hourC&gt;=<span class="hljs-number">1</span>){
 result=<span class="hljs-string">"发表于"</span>+ <span class="hljs-built_in">parseInt</span>(hourC) +<span class="hljs-string">"个小时前"</span>;
 }
 <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(minC&gt;=<span class="hljs-number">1</span>){
 result=<span class="hljs-string">"发表于"</span>+ <span class="hljs-built_in">parseInt</span>(minC) +<span class="hljs-string">"分钟前"</span>;
 }<span class="hljs-keyword">else</span>
 result=<span class="hljs-string">"刚刚发表"</span>;
<span class="hljs-keyword">return</span> result;
}</code></pre>
<p>若你得到的时间格式不是时间戳，可以使用下面的JavaScript函数把字符串转换为时间戳, 本函数的功能相当于JS版的strtotime：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js函数代码：字符串转换为时间戳
function getDateTimeStamp(dateStr){
 return Date.parse(dateStr.replace(/-/gi,&quot;/&quot;));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//js函数代码：字符串转换为时间戳</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDateTimeStamp</span>(<span class="hljs-params">dateStr</span>)</span>{
 <span class="hljs-keyword">return</span> <span class="hljs-built_in">Date</span>.parse(dateStr.replace(<span class="hljs-regexp">/-/gi</span>,<span class="hljs-string">"/"</span>));
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS将时间戳转换为刚刚、N分钟前、今天几点几分、昨天几点几分等表示法

## 原文链接
[https://segmentfault.com/a/1190000014795596](https://segmentfault.com/a/1190000014795596)


---
title: 'JavaScript 时间与日期处理实战:你肯定被坑过' 
date: 2019-01-31 2:31:16
hidden: true
slug: krb1zm7x38j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>本部分的知识图谱请参考<a href="https://github.com/wxyyxc1992/Coder-Knowledge-Graph/blob/master/pl/basic/ds/ds.zh.md#%E6%97%B6%E9%97%B4%E6%97%A5%E6%9C%9F%E7%B1%BB%E5%9E%8B" rel="nofollow noreferrer" target="_blank">编程语言知识图谱-时间与日期</a>。<br><span class="img-wrap"><img data-src="/img/remote/1460000007581725?w=1516&amp;h=720" src="https://static.alili.tech/img/remote/1460000007581725?w=1516&amp;h=720" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>本文<a href="https://segmentfault.com/a/1190000007581722">JavaScript 时间与日期处理实战:你肯定被坑过</a>从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>中 <a href="https://github.com/wxyyxc1992/web-frontend-practice-handbook/blob/master/Syntax/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript 入门与最佳实践</a>系列文章。</p>
</blockquote>
<h1 id="articleHeader0">JavaScript DateTime</h1>
<h2 id="articleHeader1">标准时间</h2>
<p>GMT即「格林威治标准时间」(Greenwich Mean Time，简称G.M.T.)，指位于英国伦敦郊区的皇家格林威治天文台的标准时间，因为本初子午线被定义为通过那里的经线。然而由于地球的不规则自转，导致GMT时间有误差，因此目前已不被当作标准时间使用。UTC是最主要的世界时间标准，是经过平均太阳时(以格林威治时间GMT为准)、地轴运动修正后的新时标以及以「秒」为单位的国际原子时所综合精算而成的时间。UTC比GMT来得更加精准。其误差值必须保持在0.9秒以内，若大于0.9秒则由位于巴黎的国际地球自转事务中央局发布闰秒，使UTC与地球自转周期一致。不过日常使用中，GMT与UTC的功能与精确度是没有差别的。协调世界时区会使用“Z”来表示。而在航空上，所有使用的时间划一规定是协调世界时。而且Z在无线电中应读作“Zulu”（可参见北约音标字母），协调世界时也会被称为“Zulu time”。</p>
<h3 id="articleHeader2">TimeZone&amp;UTC Offsets:时区与偏移</h3>
<p>人们经常会把时区与UTC偏移量搞混，UTC偏移量代表了某个具体的时间值与UTC时间之间的差异，通常用HH:mm形式表述。而TimeZone则表示某个地理区域，某个TimeZone中往往会包含多个偏移量，而多个时区可能在一年的某些时间有相同的偏移量。譬如America/Chicago, America/Denver, 以及 America/Belize在一年中不同的时间都会包含 -06:00 这个偏移。</p>
<h3 id="articleHeader3">时间戳</h3>
<p>Unix时间戳表示当前时间到1970年1月1日00:00:00 UTC对应的秒数。注意，JavaScript内的时间戳指的是当前时间到1970年1月1日00:00:00 UTC对应的毫秒数，和unix时间戳不是一个概念，后者表示秒数，差了1000倍。</p>
<h2 id="articleHeader4">时间数字字符串格式</h2>
<h3 id="articleHeader5">RFC2822</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="YYYY/MM/DD HH:MM:SS ± timezone(时区用4位数字表示)
// eg 1992/02/12 12:23:22+0800" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>YYYY<span class="hljs-regexp">/MM/</span>DD <span class="hljs-string">HH:</span><span class="hljs-string">MM:</span>SS ± timezone(时区用<span class="hljs-number">4</span>位数字表示)
<span class="hljs-comment">// eg 1992/02/12 12:23:22+0800</span></code></pre>
<h3 id="articleHeader6">ISO 8601</h3>
<p>国际标准化组织的国际标准ISO 8601是日期和时间的表示方法，全称为《数据存储和交换形式·信息交换·日期和时间的表示方法》。目前最新为第三版ISO8601:2004，第一版为ISO8601:1988，第二版为ISO8601:2000。年由4位数组成，以公历公元1年为0001年，以公元前1年为0000年，公元前2年为-0001年，其他以此类推。应用其他纪年法要换算成公历，但如果发送和接受信息的双方有共同一致同意的其他纪年法，可以自行应用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="YYYY-MM-DDThh:mm:ss ± timezone(时区用HH:MM表示)
1997-07-16T08:20:30Z
// “Z”表示UTC标准时区，即&quot;00:00&quot;,所以这里表示零时区的`1997年7月16日08时20分30秒`
//转换成位于东八区的北京时间则为`1997年7月17日16时20分30秒`
1997-07-16T19:20:30+01:00
// 表示东一区的1997年7月16日19时20秒30分，转换成UTC标准时间的话是1997-07-16T18:20:30Z" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>YYYY-MM-<span class="hljs-string">DDThh:</span><span class="hljs-string">mm:</span>ss ± timezone(时区用<span class="hljs-string">HH:</span>MM表示)
<span class="hljs-number">1997</span><span class="hljs-number">-07</span><span class="hljs-number">-16</span><span class="hljs-string">T08:</span><span class="hljs-number">20</span>:<span class="hljs-number">30</span>Z
<span class="hljs-comment">// “Z”表示UTC标准时区，即"00:00",所以这里表示零时区的`1997年7月16日08时20分30秒`</span>
<span class="hljs-comment">//转换成位于东八区的北京时间则为`1997年7月17日16时20分30秒`</span>
<span class="hljs-number">1997</span><span class="hljs-number">-07</span><span class="hljs-number">-16</span><span class="hljs-string">T19:</span><span class="hljs-number">20</span>:<span class="hljs-number">30</span>+<span class="hljs-number">01</span>:<span class="hljs-number">00</span>
<span class="hljs-comment">// 表示东一区的1997年7月16日19时20秒30分，转换成UTC标准时间的话是1997-07-16T18:20:30Z</span></code></pre>
<h2 id="articleHeader7">Reference</h2>
<ul>
<li><p><a href="http://chitanda.me/2015/08/21/the-trivia-of-js-date-function/" rel="nofollow noreferrer" target="_blank">JS原生Date类型方法的一些冷知识</a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/stdlib/date.html#toc4" rel="nofollow noreferrer" target="_blank">阮一峰 JavaScript标准参考教程 Date对象</a></p></li>
</ul>
<h1 id="articleHeader8">Date</h1>
<p>JavaScript为我们提供了不是很好用的Date对象作为时间日期对象，Date()直接返回当前时间字符串，不管参数是number还是任何string。而new Date()则是会根据参数来返回对应的值，无参数的时候，返回当前时间的字符串形式；有参数的时候返回参数所对应时间的字符串。new Date()对参数不管是格式还是内容都要求,且只返回字符串,标准的构造Date对象的方法有:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不带new操作符，像一个函数一样调用。它将忽略所有传入的参数，并返回当前日期和时间的一个字符串表示。
new Date();
// 可接受一个数字参数，该参数表示设定时间与1970年1月1日0点之间的毫秒数。
new Date(value);
// 可接受一个字符串参数，参数形式类似于Date.parse()方法。但parse()方法返回的是一个数字，而Date()函数返回的是一个对象。
new Date(dateString);
// 可接受参数形式类似于Date.UTC()方法的参数，但Date.UTC()方法返回是一个毫秒数，且是UTC时间，而Date()函数返回是一个对象，且是本地时间。
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
---------------------------------------------------------------------------------------------------------------------
year：四位年份，如果写成两位数，则加上1900
month：表示月份，0表示一月，11表示12月
date：表示日期，1到31
hour：表示小时，0到23
minute：表示分钟，0到59
second：表示秒钟，0到59
ms：表示毫秒，0到999" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 不带new操作符，像一个函数一样调用。它将忽略所有传入的参数，并返回当前日期和时间的一个字符串表示。</span>
new Date();
<span class="hljs-comment">// 可接受一个数字参数，该参数表示设定时间与1970年1月1日0点之间的毫秒数。</span>
new Date(value);
<span class="hljs-comment">// 可接受一个字符串参数，参数形式类似于Date.parse()方法。但parse()方法返回的是一个数字，而Date()函数返回的是一个对象。</span>
new Date(dateString);
<span class="hljs-comment">// 可接受参数形式类似于Date.UTC()方法的参数，但Date.UTC()方法返回是一个毫秒数，且是UTC时间，而Date()函数返回是一个对象，且是本地时间。</span>
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
---------------------------------------------------------------------------------------------------------------------
year：四位年份，如果写成两位数，则加上<span class="hljs-number">1900</span>
month：表示月份，<span class="hljs-number">0</span>表示一月，<span class="hljs-number">11</span>表示<span class="hljs-number">12</span>月
date：表示日期，<span class="hljs-number">1</span>到<span class="hljs-number">31</span>
hour：表示小时，<span class="hljs-number">0</span>到<span class="hljs-number">23</span>
minute：表示分钟，<span class="hljs-number">0</span>到<span class="hljs-number">59</span>
second：表示秒钟，<span class="hljs-number">0</span>到<span class="hljs-number">59</span>
ms：表示毫秒，<span class="hljs-number">0</span>到<span class="hljs-number">999</span></code></pre>
<p>这里需要注意的是，<strong>月份month参数，其计数方式从0开始，而天day参数，其计数方式从1开始</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Date();
//Fri Aug 21 2015 15:51:55 GMT+0800 (中国标准时间)
new Date(1293879600000);
new Date('2011-01-01T11:00:00')
new Date('2011/01/01 11:00:00')
new Date(2011,0,1,11,0,0)
new Date('jan 01 2011,11 11:00:00')
new Date('Sat Jan 01 2011 11:00:00')
//Sat Jan 01 2011 11:00:00 GMT+0800 (中国标准时间)
new Date('sss');
new Date('2011/01/01T11:00:00');
new Date('2011-01-01-11:00:00')
new Date('1293879600000');
//Invalid Date
new Date('2011-01-01T11:00:00')-new Date('1992/02/11 12:00:12')
//596069988000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>();
<span class="hljs-comment">//Fri Aug 21 2015 15:51:55 GMT+0800 (中国标准时间)</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-number">1293879600000</span>);
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2011-01-01T11:00:00'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2011/01/01 11:00:00'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-number">2011</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">11</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'jan 01 2011,11 11:00:00'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'Sat Jan 01 2011 11:00:00'</span>)
<span class="hljs-comment">//Sat Jan 01 2011 11:00:00 GMT+0800 (中国标准时间)</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'sss'</span>);
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2011/01/01T11:00:00'</span>);
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2011-01-01-11:00:00'</span>)
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'1293879600000'</span>);
<span class="hljs-comment">//Invalid Date</span>
<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2011-01-01T11:00:00'</span>)-<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'1992/02/11 12:00:12'</span>)
<span class="hljs-comment">//596069988000</span></code></pre>
<h2 id="articleHeader9">Parse:解析</h2>
<h3 id="articleHeader10">TimeStamp:时间戳</h3>
<p>如果需要从当前的时间对象获取其相应的时间戳，我们可以使用getTime或者valueOf()，返回距离1970年1月1日0点的毫秒数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date1 = new Date(2007,0,1);
var date2 = new Date(2007,1,1);
console.log(date1 > date2);//false
console.log(date1 < date2);//true
// ECMAScript5新增了now()方法，该方法返回当前时间距离1970年1月1日0点UTC的毫秒数。该方法不支持传递参数
Date.now = function(){
    return (new Date()).getTime()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> date1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2007</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> date2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2007</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(date1 &gt; date2);<span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(date1 &lt; date2);<span class="hljs-comment">//true</span>
<span class="hljs-comment">// ECMAScript5新增了now()方法，该方法返回当前时间距离1970年1月1日0点UTC的毫秒数。该方法不支持传递参数</span>
<span class="hljs-built_in">Date</span>.now = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime()
}</code></pre>
<p>另外Date对象还有一个静态方法同样返回给定日期的毫秒数。但其参数并不是一个字符串，而是分别代表年、月、日、时、分、秒、毫秒的数字参数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Date.UTC(1970));//NaN
console.log(Date.UTC(1970,0));//0
console.log(Date.UTC(1970,0,2));//86400000
console.log(Date.UTC(1970,0,1,1));//3600000
console.log(Date.UTC(1970,0,1,1,59));//714000
console.log(Date.UTC(1970,0,1,1,59,30));//717000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.log(Date.UTC(<span class="hljs-number">1970</span>));<span class="hljs-comment">//NaN</span>
console.log(Date.UTC(<span class="hljs-number">1970</span>,<span class="hljs-number">0</span>));<span class="hljs-comment">//0</span>
console.log(Date.UTC(<span class="hljs-number">1970</span>,<span class="hljs-number">0</span>,<span class="hljs-number">2</span>));<span class="hljs-comment">//86400000</span>
console.log(Date.UTC(<span class="hljs-number">1970</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>));<span class="hljs-comment">//3600000</span>
console.log(Date.UTC(<span class="hljs-number">1970</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">59</span>));<span class="hljs-comment">//714000</span>
console.log(Date.UTC(<span class="hljs-number">1970</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">59</span>,<span class="hljs-number">30</span>));<span class="hljs-comment">//717000</span></code></pre>
<p>还是需要强调下，JavaScript内的时间戳指的是当前时间到1970年1月1日00:00:00 UTC对应的毫秒数，和unix时间戳不是一个概念，后者表示秒数，差了1000倍。<code>new Date(timestamp)</code>中的时间戳必须是<code>number</code>格式，<code>string</code>会返回<code>Invalid Date</code>。所以比如<code>new Date('11111111')</code>这种写法是错的。</p>
<h3 id="articleHeader11">DateTimeString:时间日期字符串</h3>
<p>JavaScript原生Date对于时间字符串的解析真的是槽点满满，假设我们希望以DD/MM/YYYY的格式进行解析，那么它是无法识别的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Date('01/12/2016'); //December 1 2016 in DD/MM/YYYY format
//&quot;Tue Jan 12 2016 00:00:00 GMT-0600 (Central Standard Time)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var a = new Date(<span class="hljs-string">'01/12/2016'</span>); <span class="hljs-regexp">//</span>December <span class="hljs-number">1</span> <span class="hljs-number">2016</span> <span class="hljs-keyword">in</span> DD<span class="hljs-regexp">/MM/</span>YYYY format
<span class="hljs-regexp">//</span><span class="hljs-string">"Tue Jan 12 2016 00:00:00 GMT-0600 (Central Standard Time)"</span></code></pre>
<p>另外，在ES5的标准中，其对ISO 8601标准的字符串进行了一个神奇的断言:所有没有提供时区的字符串默认为标准时区。换言之，你会发现你解析出来的时间和你预期中的不一样，而且它打印的时候是按照本地时区又进行了转换:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//US local format
var a = new Date('1/1/2016'); 
//&quot;Fri Jan 01 2016 00:00:00 GMT-0600 (Central Standard Time)&quot;

//ISO 8601
var a = new Date('2016-01-01');
//&quot;Thu Dec 31 2015 18:00:00 GMT-0600 (Central Standard Time)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//US local format</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'1/1/2016'</span>); 
<span class="hljs-comment">//"Fri Jan 01 2016 00:00:00 GMT-0600 (Central Standard Time)"</span>

<span class="hljs-comment">//ISO 8601</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'2016-01-01'</span>);
<span class="hljs-comment">//"Thu Dec 31 2015 18:00:00 GMT-0600 (Central Standard Time)"</span></code></pre>
<p>ES 2015标准中则是修复了该Bug，不过还是会让人觉得头大，毕竟你不知道你代码的最终运行环境会是ES5还是ES6。Date对象也有一个parse方法，用于解析一个日期字符串，参数是一个包含待解析的日期和时间的字符串，返回从1970年1月1日0点到给定日期的毫秒数。该方法会根据日期时间字符串格式规则来解析字符串的格式，除了标准格式外，以下格式也支持。如果字符串无法识别，将返回NaN。</p>
<ul>
<li><p>'月/日/年' 如6/13/2004</p></li>
<li><p>'月 日,年' 如January 12,2004或Jan 12,2004</p></li>
<li><p>'星期 月 日 年 时:分:秒 时区' Tue May 25 2004 00:00:00 GMT-0700</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Date.parse('6/13/2004'));//1087056000000
console.log(Date.parse('January 12,2004'));//1073836800000
console.log(Date.parse('Tue May 25 2004 00:00:00 GMT-0700'));//1085468400000
console.log(Date.parse('2004-05-25T00:00:00'));//1085443200000
console.log(Date.parse('2016'));//1451606400000
console.log(Date.parse('T00:00:00'));//NaN
console.log(Date.parse());//NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">6</span>/<span class="hljs-number">13</span>/<span class="hljs-number">2004</span>'));<span class="hljs-comment">//1087056000000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('January <span class="hljs-number">12</span>,<span class="hljs-number">2004</span>'));<span class="hljs-comment">//1073836800000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('Tue May <span class="hljs-number">25</span> <span class="hljs-number">2004</span> <span class="hljs-number">00</span>:<span class="hljs-number">00</span>:<span class="hljs-number">00</span> GMT<span class="hljs-number">-0700</span>'));<span class="hljs-comment">//1085468400000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">2004</span><span class="hljs-number">-05</span><span class="hljs-number">-25</span>T00:<span class="hljs-number">00</span>:<span class="hljs-number">00</span>'));<span class="hljs-comment">//1085443200000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">2016</span>'));<span class="hljs-comment">//1451606400000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('T00:<span class="hljs-number">00</span>:<span class="hljs-number">00</span>'));<span class="hljs-comment">//NaN</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>());<span class="hljs-comment">//NaN</span></code></pre>
<p>在ECMAScript5中，如果使用标准的日期时间字符串格式规则的字符串中，数学前有前置0，则会解析为UTC时间，时间没有前置0，则会解析为本地时间。其他情况一般都会解析为本地时间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Date.parse('7/12/2016'));//1468252800000
console.log(Date.parse('2016-7-12'));//1468252800000
console.log(Date.parse('2016-07-12'));//1468281600000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">7</span>/<span class="hljs-number">12</span>/<span class="hljs-number">2016</span>'));<span class="hljs-comment">//1468252800000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">2016</span><span class="hljs-number">-7</span><span class="hljs-number">-12</span>'));<span class="hljs-comment">//1468252800000</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Date</span>.<span class="hljs-built_in">parse</span>('<span class="hljs-number">2016</span><span class="hljs-number">-07</span><span class="hljs-number">-12</span>'));<span class="hljs-comment">//1468281600000</span></code></pre>
<h2 id="articleHeader12">Manipulate:时间对象操作</h2>
<h3 id="articleHeader13">Get&amp;Set</h3>
<p>Date对象提供了一系列get*方法，用来获取实例对象某个方面的值。具体的Get函数列表详见附录:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = new Date('January 6, 2013');

d.getDate() // 6
d.getMonth() // 0
d.getYear() // 113
d.getFullYear() // 2013
d.getTimezoneOffset() // -480" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> d = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>('<span class="hljs-type">January</span> <span class="hljs-number">6</span>, <span class="hljs-number">2013</span>');

<span class="hljs-title">d</span>.<span class="hljs-title">getDate</span>() <span class="hljs-comment">// 6</span>
<span class="hljs-title">d</span>.<span class="hljs-title">getMonth</span>() <span class="hljs-comment">// 0</span>
<span class="hljs-title">d</span>.<span class="hljs-title">getYear</span>() <span class="hljs-comment">// 113</span>
<span class="hljs-title">d</span>.<span class="hljs-title">getFullYear</span>() <span class="hljs-comment">// 2013</span>
<span class="hljs-title">d</span>.<span class="hljs-title">getTimezoneOffset</span>() <span class="hljs-comment">// -480</span></span></code></pre>
<p>同样的，Date对象还提供了一系列的Set方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d1 = new Date('January 6, 2013');

d1.setDate(32) // 1359648000000
d1 // Fri Feb 01 2013 00:00:00 GMT+0800 (CST)

var d2 = new Date ('January 6, 2013');

d.setDate(-1) // 1356796800000
d // Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'January 6, 2013'</span>);

d1.setDate(<span class="hljs-number">32</span>) <span class="hljs-comment">// 1359648000000</span>
d1 <span class="hljs-comment">// Fri Feb 01 2013 00:00:00 GMT+0800 (CST)</span>

<span class="hljs-keyword">var</span> d2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span> (<span class="hljs-string">'January 6, 2013'</span>);

d.setDate(<span class="hljs-number">-1</span>) <span class="hljs-comment">// 1356796800000</span>
d <span class="hljs-comment">// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)</span>
</code></pre>
<h3 id="articleHeader14">Add&amp;Subtract</h3>
<p>我们可以巧用Set方法的特性，set*方法的参数都会自动折算。以setDate为例，如果参数超过当月的最大天数，则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d1 = new Date('January 6, 2013');

d1.setDate(32) // 1359648000000
d1 // Fri Feb 01 2013 00:00:00 GMT+0800 (CST)

var d2 = new Date ('January 6, 2013');

d.setDate(-1) // 1356796800000
d // Sun Dec 30 2012 00:00:00 GMT+0800 (CST)

var d = new Date();

// 将日期向后推1000天
d.setDate( d.getDate() + 1000 );

// 将时间设为6小时后
d.setHours(d.getHours() + 6);

// 将年份设为去年
d.setFullYear(d.getFullYear() - 1);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-string">'January 6, 2013'</span>);

d1.setDate(<span class="hljs-number">32</span>) <span class="hljs-comment">// 1359648000000</span>
d1 <span class="hljs-comment">// Fri Feb 01 2013 00:00:00 GMT+0800 (CST)</span>

<span class="hljs-keyword">var</span> d2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span> (<span class="hljs-string">'January 6, 2013'</span>);

d.setDate(<span class="hljs-number">-1</span>) <span class="hljs-comment">// 1356796800000</span>
d <span class="hljs-comment">// Sun Dec 30 2012 00:00:00 GMT+0800 (CST)</span>

<span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>();

<span class="hljs-comment">// 将日期向后推1000天</span>
d.setDate( d.getDate() + <span class="hljs-number">1000</span> );

<span class="hljs-comment">// 将时间设为6小时后</span>
d.setHours(d.getHours() + <span class="hljs-number">6</span>);

<span class="hljs-comment">// 将年份设为去年</span>
d.setFullYear(d.getFullYear() - <span class="hljs-number">1</span>);
</code></pre>
<h3 id="articleHeader15">Diff:计算差值</h3>
<p>类型转换时，Date对象的实例如果转为数值，则等于对应的毫秒数；如果转为字符串，则等于对应的日期字符串。所以，两个日期对象进行减法运算，返回的就是它们间隔的毫秒数；进行加法运算，返回的就是连接后的两个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d1 = new Date(2000, 2, 1);

var d2 = new Date(2000, 3, 1);

d2 - d1
// 2678400000
d2 + d1
// &quot;Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> d1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-number">2000</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>);

<span class="hljs-keyword">var</span> d2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(<span class="hljs-number">2000</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>);

d2 - d1
<span class="hljs-comment">// 2678400000</span>
d2 + d1
<span class="hljs-comment">// "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"</span></code></pre>
<h2 id="articleHeader16">Display:时间展示</h2>
<h3 id="articleHeader17">Format:格式化</h3>
<p>Date对象提供了一系列的<code>to*</code>方法来支持从Date对象转化为字符串，具体的函数列表详见附录:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = new Date(2013, 0, 1);

d.toString()
// &quot;Tue Jan 01 2013 00:00:00 GMT+0800 (CST)&quot;

d.toUTCString()
// &quot;Mon, 31 Dec 2012 16:00:00 GMT&quot;

d.toISOString()
// &quot;2012-12-31T16:00:00.000Z&quot;

d.toJSON()
// &quot;2012-12-31T16:00:00.000Z&quot;

d.toDateString() // &quot;Tue Jan 01 2013&quot;

d.toTimeString() // &quot;00:00:00 GMT+0800 (CST)&quot;

d.toLocaleDateString()
// 中文版浏览器为&quot;2013年1月1日&quot;
// 英文版浏览器为&quot;1/1/2013&quot;

d.toLocaleTimeString()
// 中文版浏览器为&quot;上午12:00:00&quot;
// 英文版浏览器为&quot;12:00:00 AM&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> d = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>(<span class="hljs-number">2013</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>);

<span class="hljs-title">d</span>.<span class="hljs-title">toString</span>()
<span class="hljs-comment">// "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toUTCString</span>()
<span class="hljs-comment">// "Mon, 31 Dec 2012 16:00:00 GMT"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toISOString</span>()
<span class="hljs-comment">// "2012-12-31T16:00:00.000Z"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toJSON</span>()
<span class="hljs-comment">// "2012-12-31T16:00:00.000Z"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toDateString</span>() <span class="hljs-comment">// "Tue Jan 01 2013"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toTimeString</span>() <span class="hljs-comment">// "00:00:00 GMT+0800 (CST)"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toLocaleDateString</span>()
<span class="hljs-comment">// 中文版浏览器为"2013年1月1日"</span>
<span class="hljs-comment">// 英文版浏览器为"1/1/2013"</span>

<span class="hljs-title">d</span>.<span class="hljs-title">toLocaleTimeString</span>()
<span class="hljs-comment">// 中文版浏览器为"上午12:00:00"</span>
<span class="hljs-comment">// 英文版浏览器为"12:00:00 AM"</span></span></code></pre>
<h3 id="articleHeader18">Durations:时长</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const nMS = 1320; //以毫秒单位表示的差值时间
var nD = Math.floor(nMS/(1000 * 60 * 60 * 24));
var nH = Math.floor(nMS/(1000*60*60)) % 24;
var nM = Math.floor(nMS/(1000*60)) % 60;
var nS = Math.floor(nMS/1000) % 60;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const nMS = <span class="hljs-number">1320</span>; <span class="hljs-comment">//以毫秒单位表示的差值时间</span>
var nD = Math.floor(nMS/(<span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>));
var nH = Math.floor(nMS/(<span class="hljs-number">1000</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>)) % <span class="hljs-number">24</span>;
var nM = Math.floor(nMS/(<span class="hljs-number">1000</span>*<span class="hljs-number">60</span>)) % <span class="hljs-number">60</span>;
var nS = Math.floor(nMS/<span class="hljs-number">1000</span>) % <span class="hljs-number">60</span>;</code></pre>
<h3 id="articleHeader19">i18n:国际化</h3>
<p>浏览器获取当前用户所在的时区等信息只和系统的日期和时间设置里的时区以及时间有关。区域和语言设置影响的是浏览器默认时间函数(Date.prototype.toLocaleString等)显示的格式，不会对时区等有影响。Date有个Date.prototype.toLocaleString()方法可以将时间字符串返回用户本地字符串格式，这个方法还有两个子方法Date.prototype.toLocaleDateString和Date.prototype.toLocaleTimeString，这两个方法返回值分别表示日期和时间，加一起就是Date.prototype.toLocaleString的结果。这个方法的默认参数会对时间字符串做一次转换，将其转换成用户当前所在时区的时间，并按照对应的系统设置时间格式返回字符串结果。然而不同浏览器对用户本地所使用的语言格式的判断依据是不同的。</p>
<ul><li><p>IE:获取系统当前的区域和语言-格式中设置的格式，依照其对应的格式来显示当前时间结果;IE浏览器实时查询该系统设置（即你在浏览器窗口打开后去更改系统设置也会引起返回格式变化）。假设系统语言为 ja-JP，系统unicode语言为zh-CN日期格式为nl-NL,浏览器语言设置（accept-language)为de,浏览器界面语言为en-US（其他条件不变，浏览器界面语言改为zh-CN的时候结果也是一样)，</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.navigator.language
//&quot;nl-NL&quot;
window.navigator.systemLanguage
//&quot;zh-CN&quot;(设置中的非unicode程序所使用语言选项)
window.navigator.userLanguage
//&quot;nl-NL&quot;
window.navigator.browserLanguage
//&quot;ja-JP&quot;（系统菜单界面语言）
window.navigator.languages
//undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>window<span class="hljs-selector-class">.navigator</span><span class="hljs-selector-class">.language</span>
<span class="hljs-comment">//"nl-NL"</span>
window<span class="hljs-selector-class">.navigator</span><span class="hljs-selector-class">.systemLanguage</span>
<span class="hljs-comment">//"zh-CN"(设置中的非unicode程序所使用语言选项)</span>
window<span class="hljs-selector-class">.navigator</span><span class="hljs-selector-class">.userLanguage</span>
<span class="hljs-comment">//"nl-NL"</span>
window<span class="hljs-selector-class">.navigator</span><span class="hljs-selector-class">.browserLanguage</span>
<span class="hljs-comment">//"ja-JP"（系统菜单界面语言）</span>
window<span class="hljs-selector-class">.navigator</span><span class="hljs-selector-class">.languages</span>
<span class="hljs-comment">//undefined</span></code></pre>
<ul><li><p>FF：获取方式和结果与IE浏览器相同，区别在于FF只会在浏览器进程第一次启动的时候获取一次系统设置，中间不管怎么系统设置怎么变化，FF都无法获取到当前系统设置。除非重启FF浏览器。当浏览器界面语言为zh-CN,accept-language首位为en-US的时候：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.navigator.language
//'en-US'
window.navigator.languages
//[&quot;en-US&quot;, &quot;zh-CN&quot;, &quot;de&quot;, &quot;zh&quot;, &quot;en&quot;]
//当界面语言改为&quot;en-US&quot;,`accept-language`首位为`zh-CN`的时候
window.navigator.language
//'zh-CN'（`accept-language`首选值)
window.navigator.languages
//[&quot;zh-CN&quot;, &quot;de&quot;, &quot;zh&quot;, &quot;en-US&quot;, &quot;en&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">window</span>.navigator.language
<span class="hljs-regexp">//</span><span class="hljs-string">'en-US'</span>
<span class="hljs-built_in">window</span>.navigator.languages
<span class="hljs-regexp">//</span>[<span class="hljs-string">"en-US"</span>, <span class="hljs-string">"zh-CN"</span>, <span class="hljs-string">"de"</span>, <span class="hljs-string">"zh"</span>, <span class="hljs-string">"en"</span>]
<span class="hljs-regexp">//</span>当界面语言改为<span class="hljs-string">"en-US"</span>,`<span class="javascript">accept-language</span>`首位为`<span class="javascript">zh-CN</span>`的时候
<span class="hljs-built_in">window</span>.navigator.language
<span class="hljs-regexp">//</span><span class="hljs-string">'zh-CN'</span>（`<span class="javascript">accept-language</span>`首选值)
<span class="hljs-built_in">window</span>.navigator.languages
<span class="hljs-regexp">//</span>[<span class="hljs-string">"zh-CN"</span>, <span class="hljs-string">"de"</span>, <span class="hljs-string">"zh"</span>, <span class="hljs-string">"en-US"</span>, <span class="hljs-string">"en"</span>]</code></pre>
<ul><li><p>Chrome:获取方式和以上两个都不同。chrome无视系统的区域和语言-格式格式，只依照自己浏览器的界面设置的菜单语言来处理。(比如英文界面则按系统’en-US’格式返回字符串，中文界面则按系统’zh-CN’格式返回结果)。当浏览器界面语言为zh-CN,accept-language首位为en-US的时候：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.navigator.language
//'zh-CN'
window.navigator.languages
//[&quot;en-US&quot;, &quot;en&quot;, &quot;zh-CN&quot;, &quot;zh&quot;, &quot;ja&quot;, &quot;zh-TW&quot;, &quot;de-LI&quot;, &quot;de&quot;, &quot;pl&quot;]
//当界面语言改为&quot;en-US&quot;时
window.navigator.language
//'en-US'（浏览器界面语言)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>window.navigator.language
<span class="hljs-regexp">//</span><span class="hljs-string">'zh-CN'</span>
window.navigator.languages
<span class="hljs-regexp">//</span>[<span class="hljs-string">"en-US"</span>, <span class="hljs-string">"en"</span>, <span class="hljs-string">"zh-CN"</span>, <span class="hljs-string">"zh"</span>, <span class="hljs-string">"ja"</span>, <span class="hljs-string">"zh-TW"</span>, <span class="hljs-string">"de-LI"</span>, <span class="hljs-string">"de"</span>, <span class="hljs-string">"pl"</span>]
<span class="hljs-regexp">//</span>当界面语言改为<span class="hljs-string">"en-US"</span>时
window.navigator.language
<span class="hljs-regexp">//</span><span class="hljs-string">'en-US'</span>（浏览器界面语言)</code></pre>
<h2 id="articleHeader20">Calendar:日历操作</h2>
<h1 id="articleHeader21"><a href="http://momentjs.com/guides/" rel="nofollow noreferrer" target="_blank">Moment.js</a></h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007581726?w=1566&amp;h=660" src="https://static.alili.tech/img/remote/1460000007581726?w=1566&amp;h=660" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Moment.js为JavaScript Date对象提供了封装与统一好的API接口，并且提供了更多的功能。首先需要了解的是，Moment提供的moment对象是可变的，即当我们对该对象执行类似于增减或者设置的时候，其对象本身的值会发生变化，譬如下面这段代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = moment('2016-01-01'); 
var b = a.add(1, 'week'); 
a.format();
&quot;2016-01-08T00:00:00-06:00&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> a = moment(<span class="hljs-string">'2016-01-01'</span>); 
<span class="hljs-keyword">var</span> b = a.<span class="hljs-keyword">add</span>(<span class="hljs-number">1</span>, <span class="hljs-string">'week'</span>); 
a.format();
<span class="hljs-string">"2016-01-08T00:00:00-06:00"</span></code></pre>
<p>而如果我们不希望改变原有的值，特别是在需要创建多个时间日期对象的时候，我们可以利用clone方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = moment('2016-01-01'); 
var b = a.clone().add(1, 'week'); 
a.format();
&quot;2016-01-01T00:00:00-06:00&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> a = moment(<span class="hljs-string">'2016-01-01'</span>); 
<span class="hljs-keyword">var</span> b = a.clone().<span class="hljs-keyword">add</span>(<span class="hljs-number">1</span>, <span class="hljs-string">'week'</span>); 
a.format();
<span class="hljs-string">"2016-01-01T00:00:00-06:00"</span></code></pre>
<p>笔者是习惯在Webpack中进行打包，类似于Node下的安装方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装
npm install moment
//使用
var moment = require('moment');
moment().format();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">//安装</span>
npm install <span class="hljs-built_in">moment</span>
<span class="hljs-comment">//使用</span>
var <span class="hljs-built_in">moment</span> = require('<span class="hljs-built_in">moment</span>');
<span class="hljs-built_in">moment</span>().<span class="hljs-keyword">format</span>();</code></pre>
<p>如果你需要引入某个语言包，那么可以用如下方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var moment = require('moment');
require('moment/locale/cs');
console.log(moment.locale()); // cs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> moment = <span class="hljs-keyword">require</span>(<span class="hljs-string">'moment'</span>);
<span class="hljs-keyword">require</span>(<span class="hljs-string">'moment/locale/cs'</span>);
console.<span class="hljs-keyword">log</span>(moment.<span class="hljs-built_in">locale</span>()); <span class="hljs-comment">// cs</span></code></pre>
<h2 id="articleHeader22">Parse</h2>
<h3 id="articleHeader23">TimeStamp</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//毫秒
var day = moment(1318781876406);
//秒
var day = moment.unix(1318781876);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//毫秒</span>
<span class="hljs-keyword">var</span> day = moment(<span class="hljs-number">1318781876406</span>);
<span class="hljs-comment">//秒</span>
<span class="hljs-keyword">var</span> day = moment.unix(<span class="hljs-number">1318781876</span>);</code></pre>
<h3 id="articleHeader24">DateTimeString</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment(&quot;2010-10-20 4:30&quot;,       &quot;YYYY-MM-DD HH:mm&quot;);   // parsed as 4:30 local time
moment(&quot;2010-10-20 4:30 +0000&quot;, &quot;YYYY-MM-DD HH:mm Z&quot;); // parsed as 4:30 UTC

moment(&quot;2010 13&quot;,           &quot;YYYY MM&quot;).isValid();     // false (not a real month)
moment(&quot;2010 11 31&quot;,        &quot;YYYY MM DD&quot;).isValid();  // false (not a real day)
moment(&quot;2010 2 29&quot;,         &quot;YYYY MM DD&quot;).isValid();  // false (not a leap year)
moment(&quot;2010 notamonth 29&quot;, &quot;YYYY MMM DD&quot;).isValid(); // false (not a real month name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010-10-20 4:30"</span>,       <span class="hljs-string">"YYYY-MM-DD HH:mm"</span>);   <span class="hljs-comment">// parsed as 4:30 local time</span>
<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010-10-20 4:30 +0000"</span>, <span class="hljs-string">"YYYY-MM-DD HH:mm Z"</span>); <span class="hljs-comment">// parsed as 4:30 UTC</span>

<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010 13"</span>,           <span class="hljs-string">"YYYY MM"</span>)<span class="hljs-selector-class">.isValid</span>();     <span class="hljs-comment">// false (not a real month)</span>
<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010 11 31"</span>,        <span class="hljs-string">"YYYY MM DD"</span>)<span class="hljs-selector-class">.isValid</span>();  <span class="hljs-comment">// false (not a real day)</span>
<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010 2 29"</span>,         <span class="hljs-string">"YYYY MM DD"</span>)<span class="hljs-selector-class">.isValid</span>();  <span class="hljs-comment">// false (not a leap year)</span>
<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">"2010 notamonth 29"</span>, <span class="hljs-string">"YYYY MMM DD"</span>)<span class="hljs-selector-class">.isValid</span>(); <span class="hljs-comment">// false (not a real month name)</span></code></pre>
<h2 id="articleHeader25">Manipulate</h2>
<h3 id="articleHeader26">Get/Set</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().seconds(30) === new Date().setSeconds(30);
moment().seconds()   === new Date().getSeconds();

moment().get('year');
moment().get('month');  // 0 to 11
moment().get('date');
moment().get('hour');
moment().get('minute');
moment().get('second');
moment().get('millisecond');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code>moment().seconds(<span class="hljs-number">30</span>) === <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Date</span>().<span class="hljs-title">setSeconds</span>(<span class="hljs-number">30</span>);
<span class="hljs-title">moment</span>().<span class="hljs-title">seconds</span>()   === <span class="hljs-title">new</span> <span class="hljs-title">Date</span>().<span class="hljs-title">getSeconds</span>();

<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('year');
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('month');  <span class="hljs-comment">// 0 to 11</span>
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('date');
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('hour');
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('minute');
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('second');
<span class="hljs-title">moment</span>().<span class="hljs-title">get</span>('millisecond');</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().set('year', 2013);
moment().set('month', 3);  // April
moment().set('date', 1);
moment().set('hour', 13);
moment().set('minute', 20);
moment().set('second', 30);
moment().set('millisecond', 123);

moment().set({'year': 2013, 'month': 3});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'year'</span>, <span class="hljs-number">2013</span>);
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'month'</span>, <span class="hljs-number">3</span>);  <span class="hljs-comment">// April</span>
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'date'</span>, <span class="hljs-number">1</span>);
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'hour'</span>, <span class="hljs-number">13</span>);
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'minute'</span>, <span class="hljs-number">20</span>);
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'second'</span>, <span class="hljs-number">30</span>);
moment().<span class="hljs-keyword">set</span>(<span class="hljs-string">'millisecond'</span>, <span class="hljs-number">123</span>);

moment().<span class="hljs-keyword">set</span>({<span class="hljs-string">'year'</span>: <span class="hljs-number">2013</span>, <span class="hljs-string">'month'</span>: <span class="hljs-number">3</span>});</code></pre>
<h3 id="articleHeader27">Add&amp;Subtract</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().add(Number, String);
moment().add(Duration);
moment().add(Object);

moment().add(7, 'days');

moment().subtract(Number, String);
moment().subtract(Duration);
moment().subtract(Object);

moment().subtract(7, 'days');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.add</span>(Number, String);
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.add</span>(Duration);
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.add</span>(Object);

<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.add</span>(<span class="hljs-number">7</span>, <span class="hljs-string">'days'</span>);

<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.subtract</span>(Number, String);
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.subtract</span>(Duration);
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.subtract</span>(Object);

<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.subtract</span>(<span class="hljs-number">7</span>, <span class="hljs-string">'days'</span>);</code></pre>
<h3 id="articleHeader28">Comparison</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().isBefore(Moment|String|Number|Date|Array);
moment().isBefore(Moment|String|Number|Date|Array, String);

moment('2010-10-20').isBefore('2010-12-31', 'year'); // false
moment('2010-10-20').isBefore('2011-01-01', 'year'); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>moment().isBefore(Moment|<span class="hljs-built_in">String</span>|<span class="hljs-built_in">Number</span>|<span class="hljs-built_in">Date</span>|<span class="hljs-built_in">Array</span>);
moment().isBefore(Moment|<span class="hljs-built_in">String</span>|<span class="hljs-built_in">Number</span>|<span class="hljs-built_in">Date</span>|<span class="hljs-built_in">Array</span>, <span class="hljs-built_in">String</span>);

moment(<span class="hljs-string">'2010-10-20'</span>).isBefore(<span class="hljs-string">'2010-12-31'</span>, <span class="hljs-string">'year'</span>); <span class="hljs-comment">// false</span>
moment(<span class="hljs-string">'2010-10-20'</span>).isBefore(<span class="hljs-string">'2011-01-01'</span>, <span class="hljs-string">'year'</span>); <span class="hljs-comment">// true</span></code></pre>
<h3 id="articleHeader29">Diff</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().diff(Moment|String|Number|Date|Array);
moment().diff(Moment|String|Number|Date|Array, String);
moment().diff(Moment|String|Number|Date|Array, String, Boolean);

var a = moment([2007, 0, 29]);
var b = moment([2007, 0, 28]);
a.diff(b, 'days') // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>moment().diff(Moment|<span class="hljs-built_in">String</span>|<span class="hljs-built_in">Number</span>|<span class="hljs-built_in">Date</span>|<span class="hljs-built_in">Array</span>);
moment().diff(Moment|<span class="hljs-built_in">String</span>|<span class="hljs-built_in">Number</span>|<span class="hljs-built_in">Date</span>|<span class="hljs-built_in">Array</span>, <span class="hljs-built_in">String</span>);
moment().diff(Moment|<span class="hljs-built_in">String</span>|<span class="hljs-built_in">Number</span>|<span class="hljs-built_in">Date</span>|<span class="hljs-built_in">Array</span>, <span class="hljs-built_in">String</span>, <span class="hljs-built_in">Boolean</span>);

<span class="hljs-keyword">var</span> a = moment([<span class="hljs-number">2007</span>, <span class="hljs-number">0</span>, <span class="hljs-number">29</span>]);
<span class="hljs-keyword">var</span> b = moment([<span class="hljs-number">2007</span>, <span class="hljs-number">0</span>, <span class="hljs-number">28</span>]);
a.diff(b, <span class="hljs-string">'days'</span>) <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader30">Display</h2>
<h3 id="articleHeader31">Format</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment().format();                                // &quot;2014-09-08T08:02:17-05:00&quot; (ISO 8601)
moment().format(&quot;dddd, MMMM Do YYYY, h:mm:ss a&quot;); // &quot;Sunday, February 14th 2010, 3:25:50 pm&quot;
moment().format(&quot;ddd, hA&quot;);                       // &quot;Sun, 3PM&quot;
moment('gibberish').format('YYYY MM DD');         // &quot;Invalid date&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.format</span>();                                <span class="hljs-comment">// "2014-09-08T08:02:17-05:00" (ISO 8601)</span>
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.format</span>(<span class="hljs-string">"dddd, MMMM Do YYYY, h:mm:ss a"</span>); <span class="hljs-comment">// "Sunday, February 14th 2010, 3:25:50 pm"</span>
<span class="hljs-selector-tag">moment</span>()<span class="hljs-selector-class">.format</span>(<span class="hljs-string">"ddd, hA"</span>);                       <span class="hljs-comment">// "Sun, 3PM"</span>
<span class="hljs-selector-tag">moment</span>(<span class="hljs-string">'gibberish'</span>)<span class="hljs-selector-class">.format</span>(<span class="hljs-string">'YYYY MM DD'</span>);         <span class="hljs-comment">// "Invalid date"</span></code></pre>
<h3 id="articleHeader32">Relative Format</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment([2007, 0, 29]).fromNow();     // 4 years ago
moment([2007, 0, 29]).fromNow(true); // 4 years" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>moment([<span class="hljs-number">2007</span>, <span class="hljs-number">0</span>, <span class="hljs-number">29</span>]).fromNow();     <span class="hljs-comment">// 4 years ago</span>
moment([<span class="hljs-number">2007</span>, <span class="hljs-number">0</span>, <span class="hljs-number">29</span>]).fromNow(true); <span class="hljs-comment">// 4 years</span></code></pre>
<h3 id="articleHeader33">Duration</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moment.duration(1, &quot;minutes&quot;).humanize(); // a minute
moment.duration(2, &quot;minutes&quot;).humanize(); // 2 minutes
moment.duration(24, &quot;hours&quot;).humanize();  // a day" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">moment</span><span class="hljs-selector-class">.duration</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"minutes"</span>)<span class="hljs-selector-class">.humanize</span>(); <span class="hljs-comment">// a minute</span>
<span class="hljs-selector-tag">moment</span><span class="hljs-selector-class">.duration</span>(<span class="hljs-number">2</span>, <span class="hljs-string">"minutes"</span>)<span class="hljs-selector-class">.humanize</span>(); <span class="hljs-comment">// 2 minutes</span>
<span class="hljs-selector-tag">moment</span><span class="hljs-selector-class">.duration</span>(<span class="hljs-number">24</span>, <span class="hljs-string">"hours"</span>)<span class="hljs-selector-class">.humanize</span>();  <span class="hljs-comment">// a day</span></code></pre>
<h3 id="articleHeader34">i18n</h3>
<h1 id="articleHeader35">附录</h1>
<h2 id="articleHeader36">Date APIs</h2>
<p>Date 对象用于处理日期和时间。其核心的方法如下列表所示:</p>
<table>
<thead><tr>
<th>方法</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_Date.asp" rel="nofollow noreferrer" target="_blank">Date()</a></td>
<td>返回当日的日期和时间。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getDate.asp" rel="nofollow noreferrer" target="_blank">getDate()</a></td>
<td>从 Date 对象返回一个月中的某一天 (1 ~ 31)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getDay.asp" rel="nofollow noreferrer" target="_blank">getDay()</a></td>
<td>从 Date 对象返回一周中的某一天 (0 ~ 6)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getMonth.asp" rel="nofollow noreferrer" target="_blank">getMonth()</a></td>
<td>从 Date 对象返回月份 (0 ~ 11)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getFullYear.asp" rel="nofollow noreferrer" target="_blank">getFullYear()</a></td>
<td>从 Date 对象以四位数字返回年份。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getYear.asp" rel="nofollow noreferrer" target="_blank">getYear()</a></td>
<td>请使用 getFullYear() 方法代替。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getHours.asp" rel="nofollow noreferrer" target="_blank">getHours()</a></td>
<td>返回 Date 对象的小时 (0 ~ 23)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getMinutes.asp" rel="nofollow noreferrer" target="_blank">getMinutes()</a></td>
<td>返回 Date 对象的分钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getSeconds.asp" rel="nofollow noreferrer" target="_blank">getSeconds()</a></td>
<td>返回 Date 对象的秒数 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getMilliseconds.asp" rel="nofollow noreferrer" target="_blank">getMilliseconds()</a></td>
<td>返回 Date 对象的毫秒(0 ~ 999)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getTime.asp" rel="nofollow noreferrer" target="_blank">getTime()</a></td>
<td>返回 1970 年 1 月 1 日至今的毫秒数。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp" rel="nofollow noreferrer" target="_blank">getTimezoneOffset()</a></td>
<td>返回本地时间与格林威治标准时间 (GMT) 的分钟差。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCDate.asp" rel="nofollow noreferrer" target="_blank">getUTCDate()</a></td>
<td>根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCDay.asp" rel="nofollow noreferrer" target="_blank">getUTCDay()</a></td>
<td>根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCMonth.asp" rel="nofollow noreferrer" target="_blank">getUTCMonth()</a></td>
<td>根据世界时从 Date 对象返回月份 (0 ~ 11)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCFullYear.asp" rel="nofollow noreferrer" target="_blank">getUTCFullYear()</a></td>
<td>根据世界时从 Date 对象返回四位数的年份。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCHours.asp" rel="nofollow noreferrer" target="_blank">getUTCHours()</a></td>
<td>根据世界时返回 Date 对象的小时 (0 ~ 23)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCMinutes.asp" rel="nofollow noreferrer" target="_blank">getUTCMinutes()</a></td>
<td>根据世界时返回 Date 对象的分钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCSeconds.asp" rel="nofollow noreferrer" target="_blank">getUTCSeconds()</a></td>
<td>根据世界时返回 Date 对象的秒钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_getUTCMilliseconds.asp" rel="nofollow noreferrer" target="_blank">getUTCMilliseconds()</a></td>
<td>根据世界时返回 Date 对象的毫秒(0 ~ 999)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_parse.asp" rel="nofollow noreferrer" target="_blank">parse()</a></td>
<td>返回1970年1月1日午夜到指定日期（字符串）的毫秒数。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setDate.asp" rel="nofollow noreferrer" target="_blank">setDate()</a></td>
<td>设置 Date 对象中月的某一天 (1 ~ 31)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setMonth.asp" rel="nofollow noreferrer" target="_blank">setMonth()</a></td>
<td>设置 Date 对象中月份 (0 ~ 11)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setFullYear.asp" rel="nofollow noreferrer" target="_blank">setFullYear()</a></td>
<td>设置 Date 对象中的年份（四位数字）。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setYear.asp" rel="nofollow noreferrer" target="_blank">setYear()</a></td>
<td>请使用 setFullYear() 方法代替。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setHours.asp" rel="nofollow noreferrer" target="_blank">setHours()</a></td>
<td>设置 Date 对象中的小时 (0 ~ 23)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setMinutes.asp" rel="nofollow noreferrer" target="_blank">setMinutes()</a></td>
<td>设置 Date 对象中的分钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setSeconds.asp" rel="nofollow noreferrer" target="_blank">setSeconds()</a></td>
<td>设置 Date 对象中的秒钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setMilliseconds.asp" rel="nofollow noreferrer" target="_blank">setMilliseconds()</a></td>
<td>设置 Date 对象中的毫秒 (0 ~ 999)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setTime.asp" rel="nofollow noreferrer" target="_blank">setTime()</a></td>
<td>以毫秒设置 Date 对象。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCDate.asp" rel="nofollow noreferrer" target="_blank">setUTCDate()</a></td>
<td>根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCMonth.asp" rel="nofollow noreferrer" target="_blank">setUTCMonth()</a></td>
<td>根据世界时设置 Date 对象中的月份 (0 ~ 11)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCFullYear.asp" rel="nofollow noreferrer" target="_blank">setUTCFullYear()</a></td>
<td>根据世界时设置 Date 对象中的年份（四位数字）。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setutchours.asp" rel="nofollow noreferrer" target="_blank">setUTCHours()</a></td>
<td>根据世界时设置 Date 对象中的小时 (0 ~ 23)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCMinutes.asp" rel="nofollow noreferrer" target="_blank">setUTCMinutes()</a></td>
<td>根据世界时设置 Date 对象中的分钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCSeconds.asp" rel="nofollow noreferrer" target="_blank">setUTCSeconds()</a></td>
<td>根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_setUTCMilliseconds.asp" rel="nofollow noreferrer" target="_blank">setUTCMilliseconds()</a></td>
<td>根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_tosource_boolean.asp" rel="nofollow noreferrer" target="_blank">toSource()</a></td>
<td>返回该对象的源代码。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toString_date.asp" rel="nofollow noreferrer" target="_blank">toString()</a></td>
<td>把 Date 对象转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toTimeString.asp" rel="nofollow noreferrer" target="_blank">toTimeString()</a></td>
<td>把 Date 对象的时间部分转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toDateString.asp" rel="nofollow noreferrer" target="_blank">toDateString()</a></td>
<td>把 Date 对象的日期部分转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toGMTString.asp" rel="nofollow noreferrer" target="_blank">toGMTString()</a></td>
<td>请使用 toUTCString() 方法代替。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toUTCString.asp" rel="nofollow noreferrer" target="_blank">toUTCString()</a></td>
<td>根据世界时，把 Date 对象转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toLocaleString.asp" rel="nofollow noreferrer" target="_blank">toLocaleString()</a></td>
<td>根据本地时间格式，把 Date 对象转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toLocaleTimeString.asp" rel="nofollow noreferrer" target="_blank">toLocaleTimeString()</a></td>
<td>根据本地时间格式，把 Date 对象的时间部分转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_toLocaleDateString.asp" rel="nofollow noreferrer" target="_blank">toLocaleDateString()</a></td>
<td>根据本地时间格式，把 Date 对象的日期部分转换为字符串。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_utc.asp" rel="nofollow noreferrer" target="_blank">UTC()</a></td>
<td>根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。</td>
</tr>
<tr>
<td><a href="http://www.w3school.com.cn/jsref/jsref_valueOf_date.asp" rel="nofollow noreferrer" target="_blank">valueOf()</a></td>
<td>返回 Date 对象的原始值。</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader37">时间日期格式参数</h2>
<p>（1）年月日</p>
<table>
<thead><tr>
<th>Input</th>
<th>Example</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td><code>YYYY</code></td>
<td><code>2014</code></td>
<td>4 or 2 digit year</td>
</tr>
<tr>
<td><code>YY</code></td>
<td><code>14</code></td>
<td>2 digit year</td>
</tr>
<tr>
<td><code>Y</code></td>
<td><code>-25</code></td>
<td>Year with any number of digits and sign</td>
</tr>
<tr>
<td><code>Q</code></td>
<td><code>1..4</code></td>
<td>Quarter of year. Sets month to first month in quarter.</td>
</tr>
<tr>
<td><code>M MM</code></td>
<td><code>1..12</code></td>
<td>Month number</td>
</tr>
<tr>
<td><code>MMM MMMM</code></td>
<td><code>Jan..December</code></td>
<td>Month name in locale set by <code>moment.locale()</code>
</td>
</tr>
<tr>
<td><code>D DD</code></td>
<td><code>1..31</code></td>
<td>Day of month</td>
</tr>
<tr>
<td><code>Do</code></td>
<td><code>1st..31st</code></td>
<td>Day of month with ordinal</td>
</tr>
<tr>
<td><code>DDD DDDD</code></td>
<td><code>1..365</code></td>
<td>Day of year</td>
</tr>
<tr>
<td><code>X</code></td>
<td><code>1410715640.579</code></td>
<td>Unix timestamp</td>
</tr>
<tr>
<td><code>x</code></td>
<td><code>1410715640579</code></td>
<td>Unix ms timestamp</td>
</tr>
</tbody>
</table>
<p>（2）时分秒</p>
<table>
<thead><tr>
<th>Input</th>
<th>Example</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td><code>H HH</code></td>
<td><code>0..23</code></td>
<td>24 hour time</td>
</tr>
<tr>
<td><code>h hh</code></td>
<td><code>1..12</code></td>
<td>12 hour time used with <code>a A</code>.</td>
</tr>
<tr>
<td><code>a A</code></td>
<td><code>am pm</code></td>
<td>Post or ante meridiem (Note the one character <code>a p</code> are also considered valid)</td>
</tr>
<tr>
<td><code>m mm</code></td>
<td><code>0..59</code></td>
<td>Minutes</td>
</tr>
<tr>
<td><code>s ss</code></td>
<td><code>0..59</code></td>
<td>Seconds</td>
</tr>
<tr>
<td><code>S SS SSS</code></td>
<td><code>0..999</code></td>
<td>Fractional seconds</td>
</tr>
<tr>
<td><code>Z ZZ</code></td>
<td><code>+12:00</code></td>
<td>Offset from UTC as <code>+-HH:mm</code>, <code>+-HHmm</code>, or <code>Z</code>
</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 时间与日期处理实战:你肯定被坑过

## 原文链接
[https://segmentfault.com/a/1190000007581722](https://segmentfault.com/a/1190000007581722)


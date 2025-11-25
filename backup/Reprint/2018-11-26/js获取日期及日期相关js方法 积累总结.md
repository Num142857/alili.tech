---
title: 'js获取日期及日期相关js方法 积累总结' 
date: 2018-11-26 2:30:10
hidden: true
slug: q5ibrxerav
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">js&#x83B7;&#x53D6;&#x65E5;&#x671F;</h2><p>&#x5E38;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var date = new Date();//&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;
    var year = date.getFullYear();//&#x83B7;&#x53D6;&#x5B8C;&#x6574;&#x7684;&#x5E74;&#x4EFD;(4&#x4F4D;)
    var month = date.getMonth();//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6708;&#x4EFD;(0-11,0&#x4EE3;&#x8868;1&#x6708;)
    var nowDate = date.getDate();//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;(1-31)
    var day = date.getDay();//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x661F;&#x671F;X(0-6,0&#x4EE3;&#x8868;&#x661F;&#x671F;&#x5929;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>();<span class="hljs-comment">//&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;</span>
    <span class="hljs-built_in">var</span> year = <span class="hljs-built_in">date</span>.getFullYear();<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5B8C;&#x6574;&#x7684;&#x5E74;&#x4EFD;(4&#x4F4D;)</span>
    <span class="hljs-built_in">var</span> month = <span class="hljs-built_in">date</span>.getMonth();<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6708;&#x4EFD;(0-11,0&#x4EE3;&#x8868;1&#x6708;)</span>
    <span class="hljs-built_in">var</span> nowDate = <span class="hljs-built_in">date</span>.getDate();<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;(1-31)</span>
    <span class="hljs-built_in">var</span> day = <span class="hljs-built_in">date</span>.getDay();<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x661F;&#x671F;X(0-6,0&#x4EE3;&#x8868;&#x661F;&#x671F;&#x5929;)</span></code></pre><p>&#x66F4;&#x591A;&#x8BF7;&#x70B9;&#x51FB;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date" rel="nofollow noreferrer" target="_blank">JavaScript &#x6807;&#x51C6;&#x5E93; Date</a>&#x6216;&#x53C2;&#x8003;&#x4E2D;&#x7B2C;&#x4E00;&#x7BC7;&#x3002;</p><h2 id="articleHeader1">&#x65E5;&#x671F;&#x7684;&#x76F8;&#x5173;&#x65B9;&#x6CD5;</h2><h3 id="articleHeader2">&#x683C;&#x5F0F;&#x5316;&#x65E5;&#x671F;</h3><p>1&#x3001;yyyy-MM-dd</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x683C;&#x5F0F;&#x5316;&#x65E5;&#x671F;&#xFF1A;yyyy-MM-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
 
    if (mymonth &lt; 10) {
        mymonth = &quot;0&quot; + mymonth;
    }
    if (myweekday &lt; 10) {
        myweekday = &quot;0&quot; + myweekday;
    }
    return (myyear + &quot;-&quot; + mymonth + &quot;-&quot; + myweekday);//&#x60F3;&#x8981;&#x4EC0;&#x4E48;&#x683C;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#x968F;&#x4FBF;&#x81EA;&#x5DF1;&#x62FC;
}

var date = new Date();
//date
//Mon Jun 25 2018 15:32:38 GMT+0800 (&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;)
formatDate(date);
//&quot;2018-06-25&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//&#x683C;&#x5F0F;&#x5316;&#x65E5;&#x671F;&#xFF1A;yyyy-MM-dd</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">date</span>) </span>{
    <span class="hljs-built_in">var</span> myyear = <span class="hljs-built_in">date</span>.getFullYear();
    <span class="hljs-built_in">var</span> mymonth = <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>;
    <span class="hljs-built_in">var</span> myweekday = <span class="hljs-built_in">date</span>.getDate();
 
    <span class="hljs-keyword">if</span> (mymonth &lt; <span class="hljs-number">10</span>) {
        mymonth = <span class="hljs-string">&quot;0&quot;</span> + mymonth;
    }
    <span class="hljs-keyword">if</span> (myweekday &lt; <span class="hljs-number">10</span>) {
        myweekday = <span class="hljs-string">&quot;0&quot;</span> + myweekday;
    }
    <span class="hljs-keyword">return</span> (myyear + <span class="hljs-string">&quot;-&quot;</span> + mymonth + <span class="hljs-string">&quot;-&quot;</span> + myweekday);<span class="hljs-comment">//&#x60F3;&#x8981;&#x4EC0;&#x4E48;&#x683C;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#x968F;&#x4FBF;&#x81EA;&#x5DF1;&#x62FC;</span>
}

<span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-comment">//date</span>
<span class="hljs-comment">//Mon Jun 25 2018 15:32:38 GMT+0800 (&#x4E2D;&#x56FD;&#x6807;&#x51C6;&#x65F6;&#x95F4;)</span>
formatDate(<span class="hljs-built_in">date</span>);
<span class="hljs-comment">//&quot;2018-06-25&quot;</span></code></pre><p>&#x6216;&#x8005; <a href="https://segmentfault.com/q/1010000015380440">js&#x6807;&#x51C6;&#x65F6;&#x95F4;&#x683C;&#x5F0F;&#x5316;</a>&#x4E2D;@joy&#x94B0;&#x7684;&#x56DE;&#x7B54;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatDate(dateArg) {
    const date = new Date(dateArg);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formatMonth = month &lt; 10 ? `0${month}` : month;
    const formatDay = day &lt; 10 ? `0${day}` : day;

    return `${year}-${formatMonth}-${formatDay}`
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">dateArg</span>) </span>{
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(dateArg);
    <span class="hljs-keyword">const</span> year = <span class="hljs-built_in">date</span>.getFullYear();
    <span class="hljs-keyword">const</span> month = <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">const</span> day = <span class="hljs-built_in">date</span>.getDate();
    <span class="hljs-keyword">const</span> formatMonth = month &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">`0<span class="hljs-subst">${month}</span>`</span> : month;
    <span class="hljs-keyword">const</span> formatDay = day &lt; <span class="hljs-number">10</span> ? <span class="hljs-string">`0<span class="hljs-subst">${day}</span>`</span> : day;

    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${year}</span>-<span class="hljs-subst">${formatMonth}</span>-<span class="hljs-subst">${formatDay}</span>`</span>
}
</code></pre><p>2&#x3001;xx &#x5E74; xx &#x6708; xx &#x65E5; xx &#x65F6; xx &#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;&#x671F; &#x65F6;&#x95F4;
function todayTime() {
        var date = new Date();
        var curYear = date.getFullYear();
        var curMonth = date.getMonth() + 1;
        var curDate = date.getDate();
        if(curMonth&lt;10){
                curMonth = &apos;0&apos; + curMonth;
        }
        if(curDate&lt;10){
                curDate = &apos;0&apos; + curDate;
        }    
        var curHours = date.getHours();
        var curMinutes = date.getMinutes();
        var curtime = curYear + &apos; &#x5E74; &apos; + curMonth + &apos; &#x6708; &apos; + curDate +&apos; &#x65E5;&apos; + curHours + &apos;&#x65F6; &apos; + curMinutes + &apos;&#x5206; &apos;;
        return curtime;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;&#x671F; &#x65F6;&#x95F4;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todayTime</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-built_in">var</span> curYear = <span class="hljs-built_in">date</span>.getFullYear();
        <span class="hljs-built_in">var</span> curMonth = <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>;
        <span class="hljs-built_in">var</span> curDate = <span class="hljs-built_in">date</span>.getDate();
        <span class="hljs-keyword">if</span>(curMonth&lt;<span class="hljs-number">10</span>){
                curMonth = <span class="hljs-string">&apos;0&apos;</span> + curMonth;
        }
        <span class="hljs-keyword">if</span>(curDate&lt;<span class="hljs-number">10</span>){
                curDate = <span class="hljs-string">&apos;0&apos;</span> + curDate;
        }    
        <span class="hljs-built_in">var</span> curHours = <span class="hljs-built_in">date</span>.getHours();
        <span class="hljs-built_in">var</span> curMinutes = <span class="hljs-built_in">date</span>.getMinutes();
        <span class="hljs-built_in">var</span> curtime = curYear + <span class="hljs-string">&apos; &#x5E74; &apos;</span> + curMonth + <span class="hljs-string">&apos; &#x6708; &apos;</span> + curDate +<span class="hljs-string">&apos; &#x65E5;&apos;</span> + curHours + <span class="hljs-string">&apos;&#x65F6; &apos;</span> + curMinutes + <span class="hljs-string">&apos;&#x5206; &apos;</span>;
        <span class="hljs-keyword">return</span> curtime;
}</code></pre><p>3&#x3001;&#x82F1;&#x6587;&#x683C;&#x5F0F;&#x65E5;&#x671F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;&#x671F; &#x82F1;&#x6587;
function todayTimeEn() {
        var dt = new Date();
        var m = new Array(&quot;January&quot;, &quot;February&quot;, &quot;March&quot;, &quot;April&quot;, &quot;May&quot;, &quot;June&quot;, &quot;July&quot;, &quot;August&quot;, &quot;September&quot;, &quot;October&quot;, &quot;November&quot;, &quot;December&quot;);
        mn = dt.getMonth();
        dn = dt.getDate();
        if(dn&lt;10){
                dn = &apos;0&apos; + dn;
        }
        var curtime = m[mn] + &quot; &quot; + dn + &quot;, &quot; + dt.getFullYear();
        return curtime;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;&#x671F; &#x82F1;&#x6587;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todayTimeEn</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> dt = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-string">&quot;January&quot;</span>, <span class="hljs-string">&quot;February&quot;</span>, <span class="hljs-string">&quot;March&quot;</span>, <span class="hljs-string">&quot;April&quot;</span>, <span class="hljs-string">&quot;May&quot;</span>, <span class="hljs-string">&quot;June&quot;</span>, <span class="hljs-string">&quot;July&quot;</span>, <span class="hljs-string">&quot;August&quot;</span>, <span class="hljs-string">&quot;September&quot;</span>, <span class="hljs-string">&quot;October&quot;</span>, <span class="hljs-string">&quot;November&quot;</span>, <span class="hljs-string">&quot;December&quot;</span>);
        mn = dt.getMonth();
        dn = dt.getDate();
        <span class="hljs-keyword">if</span>(dn&lt;<span class="hljs-number">10</span>){
                dn = <span class="hljs-string">&apos;0&apos;</span> + dn;
        }
        <span class="hljs-keyword">var</span> curtime = m[mn] + <span class="hljs-string">&quot; &quot;</span> + dn + <span class="hljs-string">&quot;, &quot;</span> + dt.getFullYear();
        <span class="hljs-keyword">return</span> curtime;
}</code></pre><h3 id="articleHeader3">&#x5468;&#x3001;&#x6708; &#x76F8;&#x5173;&#x7684;&#x65E5;&#x671F;&#x65B9;&#x6CD5;</h3><p>1&#x3001;&#x4E00;&#x5468; &#x3001;&#x672C;&#x5468;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8FD1;&#x4E03;&#x5929;&#x7684;&#x65E5;&#x671F;
function setDate() {
            var now = new Date();
            //&#x4E00;&#x5929;&#x7684;&#x6BEB;&#x79D2;&#x6570;
            var millisecond = 1000 * 60 * 60 * 24;
            var end= new Date(now.getTime() - (7 * millisecond));
 
            var beginDate = formatDate(now);
            var endDate = formatDate(end);
            console.log(&quot;beginDate&#xFF1A;&quot;+beginDate);
            console.log(&quot;endDate &#xFF1A;&quot;+endDate );
 }
 
//&#x672C;&#x5468;&#x65E5;&#x671F; (&#x53D6;&#x5468;&#x4E00;&#x4E3A;&#x7B2C;&#x4E00;&#x5929;&#x3001;&#x5468;&#x65E5;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x5929;)
function weekDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var nowDate = date.getDate();
        var day = date.getDay();
        var beginDate = new Date(year, month, nowDate - day + 1);
        var endDate = new Date(year, month, nowDate + (6 - day) + 1);
        beginDate = formatDate(beginDate);
        endDate = formatDate(endDate);
        console.log(&quot;beginDate&#xFF1A;&quot;+beginDate);
        console.log(&quot;endDate &#xFF1A;&quot;+endDate );
    }
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//&#x8FD1;&#x4E03;&#x5929;&#x7684;&#x65E5;&#x671F;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setDate</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
            <span class="hljs-comment">//&#x4E00;&#x5929;&#x7684;&#x6BEB;&#x79D2;&#x6570;</span>
            <span class="hljs-built_in">var</span> millisecond = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">24</span>;
            <span class="hljs-built_in">var</span> end= <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(now.getTime() - (<span class="hljs-number">7</span> * millisecond));
 
            <span class="hljs-built_in">var</span> beginDate = formatDate(now);
            <span class="hljs-built_in">var</span> endDate = formatDate(end);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;beginDate&#xFF1A;&quot;</span>+beginDate);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;endDate &#xFF1A;&quot;</span>+endDate );
 }
 
<span class="hljs-comment">//&#x672C;&#x5468;&#x65E5;&#x671F; (&#x53D6;&#x5468;&#x4E00;&#x4E3A;&#x7B2C;&#x4E00;&#x5929;&#x3001;&#x5468;&#x65E5;&#x4E3A;&#x6700;&#x540E;&#x4E00;&#x5929;)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">weekDate</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-built_in">var</span> year = <span class="hljs-built_in">date</span>.getFullYear();
        <span class="hljs-built_in">var</span> month = <span class="hljs-built_in">date</span>.getMonth();
        <span class="hljs-built_in">var</span> nowDate = <span class="hljs-built_in">date</span>.getDate();
        <span class="hljs-built_in">var</span> day = <span class="hljs-built_in">date</span>.getDay();
        <span class="hljs-built_in">var</span> beginDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(year, month, nowDate - day + <span class="hljs-number">1</span>);
        <span class="hljs-built_in">var</span> endDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(year, month, nowDate + (<span class="hljs-number">6</span> - day) + <span class="hljs-number">1</span>);
        beginDate = formatDate(beginDate);
        endDate = formatDate(endDate);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;beginDate&#xFF1A;&quot;</span>+beginDate);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;endDate &#xFF1A;&quot;</span>+endDate );
    }
 </code></pre><p>2&#x3001; &#x6708;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    //&#x672C;&#x6708;&#x65E5;&#x671F;
    function monthDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        if (month &lt; 10) {
            month = &quot;0&quot; + month;
        }
        var day = getDaysInOneMonth(year, month);
        var beginDate = year + &quot;-&quot; + month + &quot;-01&quot;;
        var endDate = year + &quot;-&quot; + month + &quot;-&quot; + day;
        console.log(&quot;beginDate&#xFF1A;&quot;+beginDate);
        console.log(&quot;endDate &#xFF1A;&quot;+endDate );
    }
 
    //&#x83B7;&#x53D6;&#x67D0;&#x6708;&#x5929;&#x6570;
    function getDaysInOneMonth(year, month) {
        month = parseInt(month, 10);
        var d = new Date(year, month, 0);
        return d.getDate();
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code>
    //&#x672C;&#x6708;&#x65E5;&#x671F;
    function monthDate() {
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = new <span class="hljs-built_in">Date</span>();
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">year</span> = date.getFullYear();
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">month</span> = date.getMonth() + <span class="hljs-number">1</span>;
        <span class="hljs-built_in">if</span> (<span class="hljs-built_in">month</span> &lt; <span class="hljs-number">10</span>) {
            <span class="hljs-built_in">month</span> = <span class="hljs-string">&quot;0&quot;</span> + <span class="hljs-built_in">month</span>;
        }
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">day</span> = getDaysInOneMonth(<span class="hljs-built_in">year</span>, <span class="hljs-built_in">month</span>);
        <span class="hljs-built_in">var</span> beginDate = <span class="hljs-built_in">year</span> + <span class="hljs-string">&quot;-&quot;</span> + <span class="hljs-built_in">month</span> + <span class="hljs-string">&quot;-01&quot;</span>;
        <span class="hljs-built_in">var</span> endDate = <span class="hljs-built_in">year</span> + <span class="hljs-string">&quot;-&quot;</span> + <span class="hljs-built_in">month</span> + <span class="hljs-string">&quot;-&quot;</span> + <span class="hljs-built_in">day</span>;
        console.log(<span class="hljs-string">&quot;beginDate&#xFF1A;&quot;</span>+beginDate);
        console.log(<span class="hljs-string">&quot;endDate &#xFF1A;&quot;</span>+endDate );
    }
 
    //&#x83B7;&#x53D6;&#x67D0;&#x6708;&#x5929;&#x6570;
    function getDaysInOneMonth(<span class="hljs-built_in">year</span>, <span class="hljs-built_in">month</span>) {
        <span class="hljs-built_in">month</span> = parseInt(<span class="hljs-built_in">month</span>, <span class="hljs-number">10</span>);
        <span class="hljs-built_in">var</span> d = new <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">year</span>, <span class="hljs-built_in">month</span>, <span class="hljs-number">0</span>);
        return d.getDate();
    }</code></pre><h3 id="articleHeader4">&#x83B7;&#x53D6;&#x524D;&#x5929;&#x3001;&#x6628;&#x5929;&#x3001;&#x4ECA;&#x5929;&#x3001;&#x660E;&#x5929;&#x3001;&#x540E;&#x5929;&#x7684;&#x65F6;&#x95F4;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//&#x83B7;&#x53D6;AddDayCount&#x5929;&#x540E;&#x7684;&#x65E5;&#x671F;
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x65E5;&#x671F;
    var d = dd.getDate();
    return y+&quot;-&quot;+m+&quot;-&quot;+d;
}
console.log(&quot;&#x524D;&#x5929;&#xFF1A;&quot;+GetDateStr(-2));
console.log(&quot;&#x6628;&#x5929;&#xFF1A;&quot;+GetDateStr(-1));
console.log(&quot;&#x4ECA;&#x5929;&#xFF1A;&quot;+GetDateStr(0));
console.log(&quot;&#x660E;&#x5929;&#xFF1A;&quot;+GetDateStr(1));
console.log(&quot;&#x540E;&#x5929;&#xFF1A;&quot;+GetDateStr(2));
console.log(&quot;&#x5927;&#x540E;&#x5929;&#xFF1A;&quot;+GetDateStr(3));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetDateStr</span>(<span class="hljs-params">AddDayCount</span>) </span>{
    <span class="hljs-keyword">var</span> dd = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    dd.setDate(dd.getDate()+AddDayCount);<span class="hljs-comment">//&#x83B7;&#x53D6;AddDayCount&#x5929;&#x540E;&#x7684;&#x65E5;&#x671F;</span>
    <span class="hljs-keyword">var</span> y = dd.getFullYear();
    <span class="hljs-keyword">var</span> m = dd.getMonth()+<span class="hljs-number">1</span>;<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x6708;&#x4EFD;&#x7684;&#x65E5;&#x671F;</span>
    <span class="hljs-keyword">var</span> d = dd.getDate();
    <span class="hljs-keyword">return</span> y+<span class="hljs-string">&quot;-&quot;</span>+m+<span class="hljs-string">&quot;-&quot;</span>+d;
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x524D;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">-2</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6628;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">-1</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x4ECA;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">0</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x660E;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">1</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x540E;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">2</span>));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5927;&#x540E;&#x5929;&#xFF1A;&quot;</span>+GetDateStr(<span class="hljs-number">3</span>));</code></pre><h3 id="articleHeader5">&#x83B7;&#x53D6;&#x8D77;&#x59CB;&#x65F6;&#x95F4;&#x7B97;&#x8D77;&#x7B2C;n&#x5468;&#x7684;&#x65E5;&#x671F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function weeks_enddate(startdate,n){
    var date = new Date(startdate);
    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * n);//&#x7B2C;n&#x5468;&#xFF0C;1&#x3001;2&#x3001;3&#x3001;4.....
    return formatDate(date);
}

//&#x793A;&#x4F8B;&#xFF1A;
var startdate = &apos;2018-06-27&apos;;//&#x6216;&#x8005; var startdate= new Date()&#x8FD9;&#x6837;&#x5199;&#x4E5F;&#x884C;&#x7684;
var week_num = 2;//n&#x662F;&#x4ECE;1&#x5F00;&#x59CB;&#x7684;&#x6574;&#x6570;&#x5373;&#x53EF;
var enddate = weeks_enddate(startdate,week_num);
console.log(&quot;enddate &#xFF1A;&quot;+enddate );
//enddate &#xFF1A;2018-07-11" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">weeks_enddate</span>(<span class="hljs-params">startdate,n</span>)</span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(startdate);
    <span class="hljs-built_in">date</span>.setTime(<span class="hljs-built_in">date</span>.getTime() + <span class="hljs-number">3600</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">24</span> * <span class="hljs-number">7</span> * n);<span class="hljs-comment">//&#x7B2C;n&#x5468;&#xFF0C;1&#x3001;2&#x3001;3&#x3001;4.....</span>
    <span class="hljs-keyword">return</span> formatDate(<span class="hljs-built_in">date</span>);
}

<span class="hljs-comment">//&#x793A;&#x4F8B;&#xFF1A;</span>
<span class="hljs-built_in">var</span> startdate = <span class="hljs-string">&apos;2018-06-27&apos;</span>;<span class="hljs-comment">//&#x6216;&#x8005; var startdate= new Date()&#x8FD9;&#x6837;&#x5199;&#x4E5F;&#x884C;&#x7684;</span>
<span class="hljs-built_in">var</span> week_num = <span class="hljs-number">2</span>;<span class="hljs-comment">//n&#x662F;&#x4ECE;1&#x5F00;&#x59CB;&#x7684;&#x6574;&#x6570;&#x5373;&#x53EF;</span>
<span class="hljs-built_in">var</span> enddate = weeks_enddate(startdate,week_num);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;enddate &#xFF1A;&quot;</span>+enddate );
<span class="hljs-comment">//enddate &#xFF1A;2018-07-11</span></code></pre><p>&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#xFF0C;&#x7A0D;&#x52A0;&#x4FEE;&#x6539;&#xFF0C;&#x5373;&#x53EF;&#x5B8C;&#x6210;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4EE5;&#x5468;&#x4E00;&#x4E3A;&#x4E00;&#x5468;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x7B97;&#xFF0C;&#x83B7;&#x53D6;&#x4EE5;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#x6240;&#x5728;&#x5468;&#x4E3A;&#x7B2C;&#x4E00;&#x5468;&#x7B97;&#x8D77;&#x7684;&#x7B2C;n&#x5468;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;
function weeks_enddate(startdate,n){//startdate&#x4E3A;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#xFF0C;&#x7B2C;n&#x5468;
    var date = new Date(startdate);
    var year = date.getFullYear();
    var month = date.getMonth();
    var nowDate = date.getDate();
    var day = date.getDay();
    if(day &gt; 0){
        date = new Date(year, month, nowDate + (6 - day) + 1);
    }    
    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * (n-1));//&#x7B2C;n&#x5468;
    return formatDate(date);
}

//&#x793A;&#x4F8B;&#xFF1A;
var startdate = &apos;2018-08-10&apos;; 
var n = 3;//&#x7B2C;3&#x5468;
weeks_enddate(startdate,n);//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-08-26&quot;&#xFF0C;&#x4EE5;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#x6240;&#x5728;&#x5468;&#x7B97;&#x4E3A;&#x7B2C;&#x4E00;&#x5468;&#x83B7;&#x53D6;&#x7B2C;&#x4E09;&#x5468;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;

//&#x793A;&#x4F8B;&#xFF1A;
var startdate = &apos;2018-08-10&apos;; 
var n = 0;
weeks_enddate(startdate,n);//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-08-05&quot;&#xFF0C;&#x4E0A;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;

//&#x793A;&#x4F8B;&#xFF1A;
var startdate = &apos;2018-08-10&apos;; 
var n = -1;
weeks_enddate(startdate,n);//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-07-29&quot;&#xFF0C;&#x4E0A;&#x4E0A;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-comment">//&#x4EE5;&#x5468;&#x4E00;&#x4E3A;&#x4E00;&#x5468;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x7B97;&#xFF0C;&#x83B7;&#x53D6;&#x4EE5;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#x6240;&#x5728;&#x5468;&#x4E3A;&#x7B2C;&#x4E00;&#x5468;&#x7B97;&#x8D77;&#x7684;&#x7B2C;n&#x5468;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">weeks_enddate</span>(<span class="hljs-params">startdate,n</span>)</span>{<span class="hljs-comment">//startdate&#x4E3A;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#xFF0C;&#x7B2C;n&#x5468;</span>
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(startdate);
    <span class="hljs-built_in">var</span> year = <span class="hljs-built_in">date</span>.getFullYear();
    <span class="hljs-built_in">var</span> month = <span class="hljs-built_in">date</span>.getMonth();
    <span class="hljs-built_in">var</span> nowDate = <span class="hljs-built_in">date</span>.getDate();
    <span class="hljs-built_in">var</span> day = <span class="hljs-built_in">date</span>.getDay();
    <span class="hljs-keyword">if</span>(day &gt; <span class="hljs-number">0</span>){
        <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(year, month, nowDate + (<span class="hljs-number">6</span> - day) + <span class="hljs-number">1</span>);
    }    
    <span class="hljs-built_in">date</span>.setTime(<span class="hljs-built_in">date</span>.getTime() + <span class="hljs-number">3600</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">24</span> * <span class="hljs-number">7</span> * (n<span class="hljs-number">-1</span>));<span class="hljs-comment">//&#x7B2C;n&#x5468;</span>
    <span class="hljs-keyword">return</span> formatDate(<span class="hljs-built_in">date</span>);
}

<span class="hljs-comment">//&#x793A;&#x4F8B;&#xFF1A;</span>
<span class="hljs-built_in">var</span> startdate = <span class="hljs-string">&apos;2018-08-10&apos;</span>; 
<span class="hljs-built_in">var</span> n = <span class="hljs-number">3</span>;<span class="hljs-comment">//&#x7B2C;3&#x5468;</span>
weeks_enddate(startdate,n);<span class="hljs-comment">//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-08-26&quot;&#xFF0C;&#x4EE5;&#x5F00;&#x59CB;&#x65E5;&#x671F;&#x6240;&#x5728;&#x5468;&#x7B97;&#x4E3A;&#x7B2C;&#x4E00;&#x5468;&#x83B7;&#x53D6;&#x7B2C;&#x4E09;&#x5468;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;</span>

<span class="hljs-comment">//&#x793A;&#x4F8B;&#xFF1A;</span>
<span class="hljs-built_in">var</span> startdate = <span class="hljs-string">&apos;2018-08-10&apos;</span>; 
<span class="hljs-built_in">var</span> n = <span class="hljs-number">0</span>;
weeks_enddate(startdate,n);<span class="hljs-comment">//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-08-05&quot;&#xFF0C;&#x4E0A;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;</span>

<span class="hljs-comment">//&#x793A;&#x4F8B;&#xFF1A;</span>
<span class="hljs-built_in">var</span> startdate = <span class="hljs-string">&apos;2018-08-10&apos;</span>; 
<span class="hljs-built_in">var</span> n = <span class="hljs-number">-1</span>;
weeks_enddate(startdate,n);<span class="hljs-comment">//&#x6267;&#x884C;&#x7ED3;&#x679C;&#x4E3A;&quot;2018-07-29&quot;&#xFF0C;&#x4E0A;&#x4E0A;&#x5468;&#x65E5;&#x7684;&#x65E5;&#x671F;</span></code></pre><h2 id="articleHeader6">&#x76F8;&#x5173;&#x53C2;&#x8003;</h2><p><a href="http://www.cnblogs.com/carekee/articles/1678041.html" rel="nofollow noreferrer" target="_blank">Js&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65E5;&#x671F;&#x65F6;&#x95F4;&#x53CA;&#x5176;&#x5B83;&#x64CD;&#x4F5C;</a><br><a href="http://blog.163.com/pepsl@126/blog/static/5439330820121911458135/" rel="nofollow noreferrer" target="_blank">js&#x5C06;&#x65E5;&#x671F;&#x8F6C;&#x6362;&#x4E3A;&#x82F1;&#x6587;&#x683C;&#x5F0F;</a><br><a href="http://www.cnblogs.com/gengaixue/archive/2011/07/05/2098299.html" rel="nofollow noreferrer" target="_blank">js &#x83B7;&#x53D6;&#x524D;&#x5929;&#x3001;&#x6628;&#x5929;&#x3001;&#x4ECA;&#x5929;&#x3001;&#x660E;&#x5929;&#x3001;&#x540E;&#x5929;&#x7684;&#x65F6;&#x95F4;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js获取日期及日期相关js方法 积累总结

## 原文链接
[https://segmentfault.com/a/1190000015381362](https://segmentfault.com/a/1190000015381362)


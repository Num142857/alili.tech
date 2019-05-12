---
title: 'javascript 总结（常用工具类的封装）' 
date: 2018-12-15 2:30:11
hidden: true
slug: slr66g1qr4e
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="因为工作中经常用到这些方法，所有便把这些方法进行了总结。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>因为工作中经常用到这些方法，所有便把这些方法进行了总结。
</code></pre>
<h2 id="articleHeader1">JavaScript</h2>
<h3 id="articleHeader2">1. type 类型判断</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="isString (o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

isNumber (o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

isBoolean (o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

isFunction (o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

isNull (o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

isUndefined (o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

isObj (o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

isDate (o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

isRegExp (o) { //是否正则
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

isError (o) { //是否错误对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

isSymbol (o) { //是否Symbol函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

isPromise (o) { //是否Promise对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

isSet (o) { //是否Set对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}



isFalse (o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
        return false
}

isTrue (o) {
    return !this.isFalse(o)
}

isIos () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return &quot;Android&quot;;
        return false
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return &quot;iPhone&quot;;
        return true
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return &quot;iPad&quot;;
        return false
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return &quot;Windows Phone&quot;;
        return false
    }else{
        return false
    }
}

isPC () { //是否为PC端
    var userAgentInfo = navigator.userAgent;
    var Agents = [&quot;Android&quot;, &quot;iPhone&quot;,
                &quot;SymbianOS&quot;, &quot;Windows Phone&quot;,
                &quot;iPad&quot;, &quot;iPod&quot;];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

browserType(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf(&quot;Opera&quot;) > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf(&quot;compatible&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;MSIE&quot;) > -1 &amp;&amp; !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 &amp;&amp; userAgent.indexOf(&quot;rv:11.0&quot;) > -1;
    var isEdge = userAgent.indexOf(&quot;Edge&quot;) > -1 &amp;&amp; !isIE; //判断是否IE的Edge浏览器  
    var isFF = userAgent.indexOf(&quot;Firefox&quot;) > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf(&quot;Safari&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;Chrome&quot;) == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf(&quot;Chrome&quot;) > -1 &amp;&amp; userAgent.indexOf(&quot;Safari&quot;) > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp(&quot;MSIE (\\d+\\.\\d+);&quot;);
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp[&quot;$1&quot;]);
        if(fIEVersion == 7) return &quot;IE7&quot;
        else if(fIEVersion == 8) return &quot;IE8&quot;;
        else if(fIEVersion == 9) return &quot;IE9&quot;;
        else if(fIEVersion == 10) return &quot;IE10&quot;;
        else return &quot;IE7以下&quot;//IE版本过低
    }
    if (isIE11) return 'IE11';
    if (isEdge) return &quot;Edge&quot;;
    if (isFF) return &quot;FF&quot;;
    if (isOpera) return &quot;Opera&quot;;
    if (isSafari) return &quot;Safari&quot;;
    if (isChrome) return &quot;Chrome&quot;;
}

checkStr (str, type) {
    switch (type) {
        case 'phone':   //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel':     //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card':    //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal':  //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ':      //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email':   //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money':   //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL':     //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(str)
        case 'IP':      //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date':    //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
        case 'number':  //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':   //小写
            return /^[a-z]+$/.test(str);
        case 'upper':   //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML':    //HTML标记
            return /<(&quot;[^&quot;]*&quot;|'[^']*'|[^'&quot;>])*>/.test(str);
        default:
            return true;
    }
    
    // 严格的身份证校验
    isCardID(sId) {
        if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
            alert('你输入的身份证长度或格式错误')
            return false
        }
        //身份证城市
        var aCity={11:&quot;北京&quot;,12:&quot;天津&quot;,13:&quot;河北&quot;,14:&quot;山西&quot;,15:&quot;内蒙古&quot;,21:&quot;辽宁&quot;,22:&quot;吉林&quot;,23:&quot;黑龙江&quot;,31:&quot;上海&quot;,32:&quot;江苏&quot;,33:&quot;浙江&quot;,34:&quot;安徽&quot;,35:&quot;福建&quot;,36:&quot;江西&quot;,37:&quot;山东&quot;,41:&quot;河南&quot;,42:&quot;湖北&quot;,43:&quot;湖南&quot;,44:&quot;广东&quot;,45:&quot;广西&quot;,46:&quot;海南&quot;,50:&quot;重庆&quot;,51:&quot;四川&quot;,52:&quot;贵州&quot;,53:&quot;云南&quot;,54:&quot;西藏&quot;,61:&quot;陕西&quot;,62:&quot;甘肃&quot;,63:&quot;青海&quot;,64:&quot;宁夏&quot;,65:&quot;新疆&quot;,71:&quot;台湾&quot;,81:&quot;香港&quot;,82:&quot;澳门&quot;,91:&quot;国外&quot;};
        if(!aCity[parseInt(sId.substr(0,2))]) { 
            alert('你的身份证地区非法')
            return false
        }

        // 出生日期验证
        var sBirthday=(sId.substr(6,4)+&quot;-&quot;+Number(sId.substr(10,2))+&quot;-&quot;+Number(sId.substr(12,2))).replace(/-/g,&quot;/&quot;),
            d = new Date(sBirthday)
        if(sBirthday != (d.getFullYear()+&quot;/&quot;+ (d.getMonth()+1) + &quot;/&quot; + d.getDate())) {
            alert('身份证上的出生日期非法')
            return false
        }

        // 身份证号码校验
        var sum = 0,
            weights =  [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            codes = &quot;10X98765432&quot;
        for (var i = 0; i < sId.length - 1; i++) {
            sum += sId[i] * weights[i];
        }
        var last = codes[sum % 11]; //计算出来的最后一位身份证号码
        if (sId[sId.length-1] != last) { 
            alert('你输入的身份证号非法')
            return false
        }
        
        return true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>isString (o) { <span class="hljs-comment">//是否字符串</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'String'</span>
}

isNumber (o) { <span class="hljs-comment">//是否数字</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Number'</span>
}

isBoolean (o) { <span class="hljs-comment">//是否boolean</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Boolean'</span>
}

isFunction (o) { <span class="hljs-comment">//是否函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Function'</span>
}

isNull (o) { <span class="hljs-comment">//是否为null</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Null'</span>
}

isUndefined (o) { <span class="hljs-comment">//是否undefined</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Undefined'</span>
}

isObj (o) { <span class="hljs-comment">//是否对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Object'</span>
}

isArray (o) { <span class="hljs-comment">//是否数组</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Array'</span>
}

isDate (o) { <span class="hljs-comment">//是否时间</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Date'</span>
}

isRegExp (o) { <span class="hljs-comment">//是否正则</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'RegExp'</span>
}

isError (o) { <span class="hljs-comment">//是否错误对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Error'</span>
}

isSymbol (o) { <span class="hljs-comment">//是否Symbol函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Symbol'</span>
}

isPromise (o) { <span class="hljs-comment">//是否Promise对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Promise'</span>
}

isSet (o) { <span class="hljs-comment">//是否Set对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.toString.call(o).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Set'</span>
}



isFalse (o) {
    <span class="hljs-keyword">if</span> (!o || o === <span class="hljs-string">'null'</span> || o === <span class="hljs-string">'undefined'</span> || o === <span class="hljs-string">'false'</span> || o === <span class="hljs-string">'NaN'</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

isTrue (o) {
    <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.isFalse(o)
}

isIos () {
    <span class="hljs-keyword">var</span> u = navigator.userAgent;
    <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//安卓手机</span>
        <span class="hljs-comment">// return "Android";</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//苹果手机</span>
        <span class="hljs-comment">// return "iPhone";</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//iPad</span>
        <span class="hljs-comment">// return "iPad";</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (u.indexOf(<span class="hljs-string">'Windows Phone'</span>) &gt; <span class="hljs-number">-1</span>) {<span class="hljs-comment">//winphone手机</span>
        <span class="hljs-comment">// return "Windows Phone";</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
}

isPC () { <span class="hljs-comment">//是否为PC端</span>
    <span class="hljs-keyword">var</span> userAgentInfo = navigator.userAgent;
    <span class="hljs-keyword">var</span> Agents = [<span class="hljs-string">"Android"</span>, <span class="hljs-string">"iPhone"</span>,
                <span class="hljs-string">"SymbianOS"</span>, <span class="hljs-string">"Windows Phone"</span>,
                <span class="hljs-string">"iPad"</span>, <span class="hljs-string">"iPod"</span>];
    <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> v = <span class="hljs-number">0</span>; v &lt; Agents.length; v++) {
        <span class="hljs-keyword">if</span> (userAgentInfo.indexOf(Agents[v]) &gt; <span class="hljs-number">0</span>) {
            flag = <span class="hljs-literal">false</span>;
            <span class="hljs-keyword">break</span>;
        }
    }
    <span class="hljs-keyword">return</span> flag;
}

browserType(){
    <span class="hljs-keyword">var</span> userAgent = navigator.userAgent; <span class="hljs-comment">//取得浏览器的userAgent字符串</span>
    <span class="hljs-keyword">var</span> isOpera = userAgent.indexOf(<span class="hljs-string">"Opera"</span>) &gt; <span class="hljs-number">-1</span>; <span class="hljs-comment">//判断是否Opera浏览器</span>
    <span class="hljs-keyword">var</span> isIE = userAgent.indexOf(<span class="hljs-string">"compatible"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"MSIE"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; !isOpera; <span class="hljs-comment">//判断是否IE浏览器</span>
    <span class="hljs-keyword">var</span> isIE11 = userAgent.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"rv:11.0"</span>) &gt; <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">var</span> isEdge = userAgent.indexOf(<span class="hljs-string">"Edge"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; !isIE; <span class="hljs-comment">//判断是否IE的Edge浏览器  </span>
    <span class="hljs-keyword">var</span> isFF = userAgent.indexOf(<span class="hljs-string">"Firefox"</span>) &gt; <span class="hljs-number">-1</span>; <span class="hljs-comment">//判断是否Firefox浏览器</span>
    <span class="hljs-keyword">var</span> isSafari = userAgent.indexOf(<span class="hljs-string">"Safari"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"Chrome"</span>) == <span class="hljs-number">-1</span>; <span class="hljs-comment">//判断是否Safari浏览器</span>
    <span class="hljs-keyword">var</span> isChrome = userAgent.indexOf(<span class="hljs-string">"Chrome"</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; userAgent.indexOf(<span class="hljs-string">"Safari"</span>) &gt; <span class="hljs-number">-1</span>; <span class="hljs-comment">//判断Chrome浏览器</span>

    <span class="hljs-keyword">if</span> (isIE) {
        <span class="hljs-keyword">var</span> reIE = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"MSIE (\\d+\\.\\d+);"</span>);
        reIE.test(userAgent);
        <span class="hljs-keyword">var</span> fIEVersion = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-built_in">RegExp</span>[<span class="hljs-string">"$1"</span>]);
        <span class="hljs-keyword">if</span>(fIEVersion == <span class="hljs-number">7</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"IE7"</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(fIEVersion == <span class="hljs-number">8</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"IE8"</span>;
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(fIEVersion == <span class="hljs-number">9</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"IE9"</span>;
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(fIEVersion == <span class="hljs-number">10</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">"IE10"</span>;
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> <span class="hljs-string">"IE7以下"</span><span class="hljs-comment">//IE版本过低</span>
    }
    <span class="hljs-keyword">if</span> (isIE11) <span class="hljs-keyword">return</span> <span class="hljs-string">'IE11'</span>;
    <span class="hljs-keyword">if</span> (isEdge) <span class="hljs-keyword">return</span> <span class="hljs-string">"Edge"</span>;
    <span class="hljs-keyword">if</span> (isFF) <span class="hljs-keyword">return</span> <span class="hljs-string">"FF"</span>;
    <span class="hljs-keyword">if</span> (isOpera) <span class="hljs-keyword">return</span> <span class="hljs-string">"Opera"</span>;
    <span class="hljs-keyword">if</span> (isSafari) <span class="hljs-keyword">return</span> <span class="hljs-string">"Safari"</span>;
    <span class="hljs-keyword">if</span> (isChrome) <span class="hljs-keyword">return</span> <span class="hljs-string">"Chrome"</span>;
}

checkStr (str, <span class="hljs-keyword">type</span>) {
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">type</span>) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'phone'</span>:   <span class="hljs-comment">//手机号码</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^1[3|4|5|6|7|8|9][0-9]{9}$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'tel'</span>:     <span class="hljs-comment">//座机</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'card'</span>:    <span class="hljs-comment">//身份证</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'pwd'</span>:     <span class="hljs-comment">//密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[a-zA-Z]\w{5,17}$/</span>.test(str)
        <span class="hljs-keyword">case</span> <span class="hljs-string">'postal'</span>:  <span class="hljs-comment">//邮政编码</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/[1-9]\d{5}(?!\d)/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'QQ'</span>:      <span class="hljs-comment">//QQ号</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[1-9][0-9]{4,9}$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'email'</span>:   <span class="hljs-comment">//邮箱</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'money'</span>:   <span class="hljs-comment">//金额(小数点2位)</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^\d*(?:\.\d{0,2})?$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'URL'</span>:     <span class="hljs-comment">//网址</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/</span>.test(str)
        <span class="hljs-keyword">case</span> <span class="hljs-string">'IP'</span>:      <span class="hljs-comment">//IP</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'date'</span>:    <span class="hljs-comment">//日期时间</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/</span>.test(str) || <span class="hljs-regexp">/^(\d{4})\-(\d{2})\-(\d{2})$/</span>.test(str)
        <span class="hljs-keyword">case</span> <span class="hljs-string">'number'</span>:  <span class="hljs-comment">//数字</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[0-9]$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'english'</span>: <span class="hljs-comment">//英文</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[a-zA-Z]+$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'chinese'</span>: <span class="hljs-comment">//中文</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[\u4E00-\u9FA5]+$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'lower'</span>:   <span class="hljs-comment">//小写</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[a-z]+$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'upper'</span>:   <span class="hljs-comment">//大写</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/^[A-Z]+$/</span>.test(str);
        <span class="hljs-keyword">case</span> <span class="hljs-string">'HTML'</span>:    <span class="hljs-comment">//HTML标记</span>
            <span class="hljs-keyword">return</span> <span class="hljs-regexp">/&lt;("[^"]*"|'[^']*'|[^'"&gt;])*&gt;/</span>.test(str);
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    
    <span class="hljs-comment">// 严格的身份证校验</span>
    isCardID(sId) {
        <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/(^\d{15}$)|(^\d{17}(\d|X|x)$)/</span>.test(sId)) {
            alert(<span class="hljs-string">'你输入的身份证长度或格式错误'</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }
        <span class="hljs-comment">//身份证城市</span>
        <span class="hljs-keyword">var</span> aCity={<span class="hljs-number">11</span>:<span class="hljs-string">"北京"</span>,<span class="hljs-number">12</span>:<span class="hljs-string">"天津"</span>,<span class="hljs-number">13</span>:<span class="hljs-string">"河北"</span>,<span class="hljs-number">14</span>:<span class="hljs-string">"山西"</span>,<span class="hljs-number">15</span>:<span class="hljs-string">"内蒙古"</span>,<span class="hljs-number">21</span>:<span class="hljs-string">"辽宁"</span>,<span class="hljs-number">22</span>:<span class="hljs-string">"吉林"</span>,<span class="hljs-number">23</span>:<span class="hljs-string">"黑龙江"</span>,<span class="hljs-number">31</span>:<span class="hljs-string">"上海"</span>,<span class="hljs-number">32</span>:<span class="hljs-string">"江苏"</span>,<span class="hljs-number">33</span>:<span class="hljs-string">"浙江"</span>,<span class="hljs-number">34</span>:<span class="hljs-string">"安徽"</span>,<span class="hljs-number">35</span>:<span class="hljs-string">"福建"</span>,<span class="hljs-number">36</span>:<span class="hljs-string">"江西"</span>,<span class="hljs-number">37</span>:<span class="hljs-string">"山东"</span>,<span class="hljs-number">41</span>:<span class="hljs-string">"河南"</span>,<span class="hljs-number">42</span>:<span class="hljs-string">"湖北"</span>,<span class="hljs-number">43</span>:<span class="hljs-string">"湖南"</span>,<span class="hljs-number">44</span>:<span class="hljs-string">"广东"</span>,<span class="hljs-number">45</span>:<span class="hljs-string">"广西"</span>,<span class="hljs-number">46</span>:<span class="hljs-string">"海南"</span>,<span class="hljs-number">50</span>:<span class="hljs-string">"重庆"</span>,<span class="hljs-number">51</span>:<span class="hljs-string">"四川"</span>,<span class="hljs-number">52</span>:<span class="hljs-string">"贵州"</span>,<span class="hljs-number">53</span>:<span class="hljs-string">"云南"</span>,<span class="hljs-number">54</span>:<span class="hljs-string">"西藏"</span>,<span class="hljs-number">61</span>:<span class="hljs-string">"陕西"</span>,<span class="hljs-number">62</span>:<span class="hljs-string">"甘肃"</span>,<span class="hljs-number">63</span>:<span class="hljs-string">"青海"</span>,<span class="hljs-number">64</span>:<span class="hljs-string">"宁夏"</span>,<span class="hljs-number">65</span>:<span class="hljs-string">"新疆"</span>,<span class="hljs-number">71</span>:<span class="hljs-string">"台湾"</span>,<span class="hljs-number">81</span>:<span class="hljs-string">"香港"</span>,<span class="hljs-number">82</span>:<span class="hljs-string">"澳门"</span>,<span class="hljs-number">91</span>:<span class="hljs-string">"国外"</span>};
        <span class="hljs-keyword">if</span>(!aCity[<span class="hljs-built_in">parseInt</span>(sId.substr(<span class="hljs-number">0</span>,<span class="hljs-number">2</span>))]) { 
            alert(<span class="hljs-string">'你的身份证地区非法'</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }

        <span class="hljs-comment">// 出生日期验证</span>
        <span class="hljs-keyword">var</span> sBirthday=(sId.substr(<span class="hljs-number">6</span>,<span class="hljs-number">4</span>)+<span class="hljs-string">"-"</span>+<span class="hljs-built_in">Number</span>(sId.substr(<span class="hljs-number">10</span>,<span class="hljs-number">2</span>))+<span class="hljs-string">"-"</span>+<span class="hljs-built_in">Number</span>(sId.substr(<span class="hljs-number">12</span>,<span class="hljs-number">2</span>))).replace(<span class="hljs-regexp">/-/g</span>,<span class="hljs-string">"/"</span>),
            d = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(sBirthday)
        <span class="hljs-keyword">if</span>(sBirthday != (d.getFullYear()+<span class="hljs-string">"/"</span>+ (d.getMonth()+<span class="hljs-number">1</span>) + <span class="hljs-string">"/"</span> + d.getDate())) {
            alert(<span class="hljs-string">'身份证上的出生日期非法'</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }

        <span class="hljs-comment">// 身份证号码校验</span>
        <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>,
            weights =  [<span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>],
            codes = <span class="hljs-string">"10X98765432"</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; sId.length - <span class="hljs-number">1</span>; i++) {
            sum += sId[i] * weights[i];
        }
        <span class="hljs-keyword">var</span> last = codes[sum % <span class="hljs-number">11</span>]; <span class="hljs-comment">//计算出来的最后一位身份证号码</span>
        <span class="hljs-keyword">if</span> (sId[sId.length<span class="hljs-number">-1</span>] != last) { 
            alert(<span class="hljs-string">'你输入的身份证号非法'</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }
        
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
}</code></pre>
<h3 id="articleHeader3">2. Date</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 格式化时间
 * 
 * @param  {time} 时间
 * @param  {cFormat} 格式
 * @return {String} 字符串
 *
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
 */
formatTime(time, cFormat) {
    if (arguments.length === 0) return null
    if ((time + '').length === 10) {
        time = +time * 1000
    }

    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(time)
    }

    var formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        var value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 &amp;&amp; value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}


/**
 * 返回指定长度的月份集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
 * @return {Array} 数组
 * 
 * @example   getMonths('2018-1-29', 6, 1)  // ->  [&quot;2018-1&quot;, &quot;2017-12&quot;, &quot;2017-11&quot;, &quot;2017-10&quot;, &quot;2017-9&quot;, &quot;2017-8&quot;, &quot;2017-7&quot;]
 */
getMonths(time, len, direction) {
    var mm = new Date(time).getMonth(),
        yy = new Date(time).getFullYear(),
        direction = isNaN(direction) ? 3 : direction,
        index = mm;
    var cutMonth = function(index) {
        if ( index <= len &amp;&amp; index >= -len) {
            return direction === 1 ? formatPre(index).concat(cutMonth(++index)):
                direction === 2 ? formatNext(index).concat(cutMonth(++index)):formatCurr(index).concat(cutMonth(++index))
        }
        return []
    }
    var formatNext = function(i) {
        var y = Math.floor(i/12),
            m = i%12
        return [yy+y + '-' + (m+1)]
    }
    var formatPre = function(i) {
        var y = Math.ceil(i/12),
            m = i%12
        m = m===0 ? 12 : m
        return [yy-y + '-' + (13 - m)]
    }
    var formatCurr = function(i) {
        var y = Math.floor(i/12),
            yNext = Math.ceil(i/12),
            m = i%12,
            mNext = m===0 ? 12 : m
        return [yy-yNext + '-' + (13 - mNext),yy+y + '-' + (m+1)]
    }
    // 数组去重
    var unique = function(arr) {
        if ( Array.hasOwnProperty('from') ) {
            return Array.from(new Set(arr));
        }else{
            var n = {},r=[]; 
            for(var i = 0; i < arr.length; i++){
                if (!n[arr[i]]){
                    n[arr[i]] = true; 
                    r.push(arr[i]);
                }
            }
            return r;
        }
    }
    return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function(t1, t2){
        return new Date(t1).getTime() - new Date(t2).getTime()
    }))
}



/**
 * 返回指定长度的天数集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
 * @return {Array} 数组
 *
 * @example date.getDays('2018-1-29', 6) // -> [&quot;2018-1-26&quot;, &quot;2018-1-27&quot;, &quot;2018-1-28&quot;, &quot;2018-1-29&quot;, &quot;2018-1-30&quot;, &quot;2018-1-31&quot;, &quot;2018-2-1&quot;]
 */
getDays(time, len, diretion) {
    var tt = new Date(time)
    var getDay = function(day) {
        var t = new Date(time)
        t.setDate(t.getDate() + day)
        var m = t.getMonth()+1
        return t.getFullYear()+'-'+m+'-'+t.getDate()
    }
    var arr = []
    if (diretion === 1) {
        for (var i = 1; i <= len; i++) {
            arr.unshift(getDay(-i))
        }
    }else if(diretion === 2) {
        for (var i = 1; i <= len; i++) {
            arr.push(getDay(i))
        }
    }else {
        for (var i = 1; i <= len; i++) {
            arr.unshift(getDay(-i))
        }
        arr.push(tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate())
        for (var i = 1; i <= len; i++) {
            arr.push(getDay(i))
        }
    }
    return diretion === 1 ? arr.concat([tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()]) : 
        diretion === 2 ? [tt.getFullYear()+'-'+(tt.getMonth()+1)+'-'+tt.getDate()].concat(arr) : arr
}


/**
 * @param  {s} 秒数
 * @return {String} 字符串 
 *
 * @example formatHMS(3610) // -> 1h0m10s
 */
formatHMS (s) {
    var str = ''
    if (s > 3600) {
        str = Math.floor(s/3600)+'h'+Math.floor(s%3600/60)+'m'+s%60+'s'
    }else if(s > 60) {
        str = Math.floor(s/60)+'m'+s%60+'s'
    }else{
        str = s%60+'s'
    }
    return str
}

/*获取某月有多少天*/
getMonthOfDay (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var mouth = date.getMonth() + 1
    var days

    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
        days = (year%4==0 &amp;&amp; year%100==0 &amp;&amp; year%400==0) || (year%4==0 &amp;&amp; year%100!=0) ? 28 : 29
    } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
    } else {
        //其他月份，天数为：30.
        days = 30
    }
    return days
}

/*获取某年有多少天*/
getYearOfDay (time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var lastDayYear = this.getLastDayOfYear(time);
    var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime())/1000;
    return Math.ceil(numSecond/(24*3600));
}

/*获取某年的第一天*/
getFirstDayOfYear (time) {
    var year = new Date(time).getFullYear();
    return year + &quot;-01-01 00:00:00&quot;;
}

/*获取某年最后一天*/
getLastDayOfYear (time) {
    var year = new Date(time).getFullYear();
    var dateString = year + &quot;-12-01 00:00:00&quot;;
    var endDay = this.getMonthOfDay(dateString);
    return year + &quot;-12-&quot; + endDay + &quot; 23:59:59&quot;;
}

/*获取某个日期是当年中的第几天*/
getDayOfYear (time) {
    var firstDayYear = this.getFirstDayOfYear(time);
    var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime())/1000;
    return Math.ceil(numSecond/(24*3600));
}

/*获取某个日期在这一年的第几周*/
getDayOfYearWeek (time) {
    var numdays = this.getDayOfYear(time);
    return Math.ceil(numdays / 7);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * 格式化时间
 * 
 * @param  {time} 时间
 * @param  {cFormat} 格式
 * @return {String} 字符串
 *
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -&gt; 2018/01/29 00:00:00
 */</span>
formatTime(time, cFormat) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    <span class="hljs-keyword">if</span> ((time + <span class="hljs-string">''</span>).length === <span class="hljs-number">10</span>) {
        time = +time * <span class="hljs-number">1000</span>
    }

    <span class="hljs-built_in">var</span> format = cFormat || <span class="hljs-string">'{y}-{m}-{d} {h}:{i}:{s}'</span>, <span class="hljs-built_in">date</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> time === <span class="hljs-string">'object'</span>) {
        <span class="hljs-built_in">date</span> = time
    } <span class="hljs-title">else</span> {
        <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time)
    }

    <span class="hljs-built_in">var</span> formatObj = {
        <span class="hljs-attribute">y</span>: <span class="hljs-built_in">date</span>.getFullYear(),
        <span class="hljs-attribute">m</span>: <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>,
        <span class="hljs-attribute">d</span>: <span class="hljs-built_in">date</span>.getDate(),
        <span class="hljs-attribute">h</span>: <span class="hljs-built_in">date</span>.getHours(),
        <span class="hljs-attribute">i</span>: <span class="hljs-built_in">date</span>.getMinutes(),
        <span class="hljs-attribute">s</span>: <span class="hljs-built_in">date</span>.getSeconds(),
        <span class="hljs-attribute">a</span>: <span class="hljs-built_in">date</span>.getDay()
    }
    <span class="hljs-built_in">var</span> time_str = format.replace(<span class="hljs-regexp">/{(y|m|d|h|i|s|a)+}/g</span>, (result, key) =&gt; {
        <span class="hljs-built_in">var</span> value = formatObj[key]
        <span class="hljs-keyword">if</span> (key === <span class="hljs-string">'a'</span>) <span class="hljs-keyword">return</span> [<span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>, <span class="hljs-string">'四'</span>, <span class="hljs-string">'五'</span>, <span class="hljs-string">'六'</span>, <span class="hljs-string">'日'</span>][value - <span class="hljs-number">1</span>]
        <span class="hljs-keyword">if</span> (result.length &gt; <span class="hljs-number">0</span> &amp;&amp; value &lt; <span class="hljs-number">10</span>) {
            value = <span class="hljs-string">'0'</span> + value
        }
        <span class="hljs-keyword">return</span> value || <span class="hljs-number">0</span>
    })
    <span class="hljs-keyword">return</span> time_str
}


<span class="hljs-comment">/**
 * 返回指定长度的月份集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
 * @return {Array} 数组
 * 
 * @example   getMonths('2018-1-29', 6, 1)  // -&gt;  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
 */</span>
getMonths(time, len, direction) {
    <span class="hljs-built_in">var</span> mm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time).getMonth(),
        yy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time).getFullYear(),
        direction = <span class="hljs-built_in">isNaN</span>(direction) ? <span class="hljs-number">3</span> : direction,
        index = mm;
    <span class="hljs-built_in">var</span> cutMonth = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index</span>) </span>{
        <span class="hljs-keyword">if</span> ( index &lt;= len &amp;&amp; index &gt;= -len) {
            <span class="hljs-keyword">return</span> direction === <span class="hljs-number">1</span> ? formatPre(index).concat(cutMonth(++index)):
                direction === <span class="hljs-number">2</span> ? formatNext(index).concat(cutMonth(++index)):formatCurr(index).concat(cutMonth(++index))
        }
        <span class="hljs-keyword">return</span> []
    }
    <span class="hljs-built_in">var</span> formatNext = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
        <span class="hljs-built_in">var</span> y = <span class="hljs-built_in">Math</span>.floor(i/<span class="hljs-number">12</span>),
            m = i%<span class="hljs-number">12</span>
        <span class="hljs-keyword">return</span> [yy+y + <span class="hljs-string">'-'</span> + (m+<span class="hljs-number">1</span>)]
    }
    <span class="hljs-built_in">var</span> formatPre = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
        <span class="hljs-built_in">var</span> y = <span class="hljs-built_in">Math</span>.ceil(i/<span class="hljs-number">12</span>),
            m = i%<span class="hljs-number">12</span>
        m = m===<span class="hljs-number">0</span> ? <span class="hljs-number">12</span> : m
        <span class="hljs-keyword">return</span> [yy-y + <span class="hljs-string">'-'</span> + (<span class="hljs-number">13</span> - m)]
    }
    <span class="hljs-built_in">var</span> formatCurr = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i</span>) </span>{
        <span class="hljs-built_in">var</span> y = <span class="hljs-built_in">Math</span>.floor(i/<span class="hljs-number">12</span>),
            yNext = <span class="hljs-built_in">Math</span>.ceil(i/<span class="hljs-number">12</span>),
            m = i%<span class="hljs-number">12</span>,
            mNext = m===<span class="hljs-number">0</span> ? <span class="hljs-number">12</span> : m
        <span class="hljs-keyword">return</span> [yy-yNext + <span class="hljs-string">'-'</span> + (<span class="hljs-number">13</span> - mNext),yy+y + <span class="hljs-string">'-'</span> + (m+<span class="hljs-number">1</span>)]
    }
    <span class="hljs-comment">// 数组去重</span>
    <span class="hljs-built_in">var</span> unique = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr</span>) </span>{
        <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">Array</span>.hasOwnProperty(<span class="hljs-string">'from'</span>) ) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr));
        }<span class="hljs-title">else</span>{
            <span class="hljs-built_in">var</span> n = {},r=[]; 
            <span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
                <span class="hljs-keyword">if</span> (!n[arr[i]]){
                    n[arr[i]] = <span class="hljs-literal">true</span>; 
                    r.push(arr[i]);
                }
            }
            <span class="hljs-keyword">return</span> r;
        }
    }
    <span class="hljs-keyword">return</span> direction !== <span class="hljs-number">3</span> ? cutMonth(index) : unique(cutMonth(index).sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t1, t2</span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(t1).getTime() - <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(t2).getTime()
    }))
}



<span class="hljs-comment">/**
 * 返回指定长度的天数集合
 * 
 * @param  {time} 时间
 * @param  {len} 长度
 * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
 * @return {Array} 数组
 *
 * @example date.getDays('2018-1-29', 6) // -&gt; ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
 */</span>
getDays(time, len, diretion) {
    <span class="hljs-built_in">var</span> tt = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time)
    <span class="hljs-built_in">var</span> getDay = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">day</span>) </span>{
        <span class="hljs-built_in">var</span> t = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time)
        t.setDate(t.getDate() + day)
        <span class="hljs-built_in">var</span> m = t.getMonth()+<span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> t.getFullYear()+<span class="hljs-string">'-'</span>+m+<span class="hljs-string">'-'</span>+t.getDate()
    }
    <span class="hljs-built_in">var</span> arr = []
    <span class="hljs-keyword">if</span> (diretion === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt;= len; i++) {
            arr.unshift(getDay(-i))
        }
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(diretion === <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt;= len; i++) {
            arr.push(getDay(i))
        }
    }<span class="hljs-title">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt;= len; i++) {
            arr.unshift(getDay(-i))
        }
        arr.push(tt.getFullYear()+<span class="hljs-string">'-'</span>+(tt.getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">'-'</span>+tt.getDate())
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt;= len; i++) {
            arr.push(getDay(i))
        }
    }
    <span class="hljs-keyword">return</span> diretion === <span class="hljs-number">1</span> ? arr.concat([tt.getFullYear()+<span class="hljs-string">'-'</span>+(tt.getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">'-'</span>+tt.getDate()]) : 
        diretion === <span class="hljs-number">2</span> ? [tt.getFullYear()+<span class="hljs-string">'-'</span>+(tt.getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">'-'</span>+tt.getDate()].concat(arr) : arr
}


<span class="hljs-comment">/**
 * @param  {s} 秒数
 * @return {String} 字符串 
 *
 * @example formatHMS(3610) // -&gt; 1h0m10s
 */</span>
formatHMS (s) {
    <span class="hljs-built_in">var</span> str = <span class="hljs-string">''</span>
    <span class="hljs-keyword">if</span> (s &gt; <span class="hljs-number">3600</span>) {
        str = <span class="hljs-built_in">Math</span>.floor(s/<span class="hljs-number">3600</span>)+<span class="hljs-string">'h'</span>+<span class="hljs-built_in">Math</span>.floor(s%<span class="hljs-number">3600</span>/<span class="hljs-number">60</span>)+<span class="hljs-string">'m'</span>+s%<span class="hljs-number">60</span>+<span class="hljs-string">'s'</span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(s &gt; <span class="hljs-number">60</span>) {
        str = <span class="hljs-built_in">Math</span>.floor(s/<span class="hljs-number">60</span>)+<span class="hljs-string">'m'</span>+s%<span class="hljs-number">60</span>+<span class="hljs-string">'s'</span>
    }<span class="hljs-title">else</span>{
        str = s%<span class="hljs-number">60</span>+<span class="hljs-string">'s'</span>
    }
    <span class="hljs-keyword">return</span> str
}

<span class="hljs-comment">/*获取某月有多少天*/</span>
getMonthOfDay (time) {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time)
    <span class="hljs-built_in">var</span> year = <span class="hljs-built_in">date</span>.getFullYear()
    <span class="hljs-built_in">var</span> mouth = <span class="hljs-built_in">date</span>.getMonth() + <span class="hljs-number">1</span>
    <span class="hljs-built_in">var</span> days

    <span class="hljs-comment">//当月份为二月时，根据闰年还是非闰年判断天数</span>
    <span class="hljs-keyword">if</span> (mouth == <span class="hljs-number">2</span>) {
        days = (year%<span class="hljs-number">4</span>==<span class="hljs-number">0</span> &amp;&amp; year%<span class="hljs-number">100</span>==<span class="hljs-number">0</span> &amp;&amp; year%<span class="hljs-number">400</span>==<span class="hljs-number">0</span>) || (year%<span class="hljs-number">4</span>==<span class="hljs-number">0</span> &amp;&amp; year%<span class="hljs-number">100</span>!=<span class="hljs-number">0</span>) ? <span class="hljs-number">28</span> : <span class="hljs-number">29</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (mouth == <span class="hljs-number">1</span> || mouth == <span class="hljs-number">3</span> || mouth == <span class="hljs-number">5</span> || mouth == <span class="hljs-number">7</span> || mouth == <span class="hljs-number">8</span> || mouth == <span class="hljs-number">10</span> || mouth == <span class="hljs-number">12</span>) {
        <span class="hljs-comment">//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；</span>
        days = <span class="hljs-number">31</span>
    } <span class="hljs-title">else</span> {
        <span class="hljs-comment">//其他月份，天数为：30.</span>
        days = <span class="hljs-number">30</span>
    }
    <span class="hljs-keyword">return</span> days
}

<span class="hljs-comment">/*获取某年有多少天*/</span>
getYearOfDay (time) {
    <span class="hljs-built_in">var</span> firstDayYear = <span class="hljs-keyword">this</span>.getFirstDayOfYear(time);
    <span class="hljs-built_in">var</span> lastDayYear = <span class="hljs-keyword">this</span>.getLastDayOfYear(time);
    <span class="hljs-built_in">var</span> numSecond = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(lastDayYear).getTime() - <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(firstDayYear).getTime())/<span class="hljs-number">1000</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(numSecond/(<span class="hljs-number">24</span>*<span class="hljs-number">3600</span>));
}

<span class="hljs-comment">/*获取某年的第一天*/</span>
getFirstDayOfYear (time) {
    <span class="hljs-built_in">var</span> year = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time).getFullYear();
    <span class="hljs-keyword">return</span> year + <span class="hljs-string">"-01-01 00:00:00"</span>;
}

<span class="hljs-comment">/*获取某年最后一天*/</span>
getLastDayOfYear (time) {
    <span class="hljs-built_in">var</span> year = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time).getFullYear();
    <span class="hljs-built_in">var</span> dateString = year + <span class="hljs-string">"-12-01 00:00:00"</span>;
    <span class="hljs-built_in">var</span> endDay = <span class="hljs-keyword">this</span>.getMonthOfDay(dateString);
    <span class="hljs-keyword">return</span> year + <span class="hljs-string">"-12-"</span> + endDay + <span class="hljs-string">" 23:59:59"</span>;
}

<span class="hljs-comment">/*获取某个日期是当年中的第几天*/</span>
getDayOfYear (time) {
    <span class="hljs-built_in">var</span> firstDayYear = <span class="hljs-keyword">this</span>.getFirstDayOfYear(time);
    <span class="hljs-built_in">var</span> numSecond = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(time).getTime() - <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(firstDayYear).getTime())/<span class="hljs-number">1000</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(numSecond/(<span class="hljs-number">24</span>*<span class="hljs-number">3600</span>));
}

<span class="hljs-comment">/*获取某个日期在这一年的第几周*/</span>
getDayOfYearWeek (time) {
    <span class="hljs-built_in">var</span> numdays = <span class="hljs-keyword">this</span>.getDayOfYear(time);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(numdays / <span class="hljs-number">7</span>);
}</code></pre>
<h3 id="articleHeader4">3. Array</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*判断一个元素是否在数组中*/
contains (arr, val) {
    return arr.indexOf(val) != -1 ? true : false;
}


/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @return {undefined}
 */
each (arr, fn) {
    fn = fn || Function;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < arr.length; i++) {
        var res = fn.apply(arr, [arr[i], i].concat(args));
        if(res != null) a.push(res);
    }
}

/**
 * @param  {arr} 数组
 * @param  {fn} 回调函数
 * @param  {thisObj} this指向
 * @return {Array} 
 */
map (arr, fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for(var i = 0, j = arr.length; i < j; ++i) {
        var res = fn.call(scope, arr[i], i, this);
        if(res != null) a.push(res);
    }
    return a;
}


/**
 * @param  {arr} 数组
 * @param  {type} 1：从小到大   2：从大到小   3：随机
 * @return {Array}
 */
sort (arr, type = 1) {
    return arr.sort( (a, b) => {
        switch(type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}

/*去重*/
unique (arr) {
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr));
    }else{
        var n = {},r=[]; 
        for(var i = 0; i < arr.length; i++){
            if (!n[arr[i]]){
                n[arr[i]] = true; 
                r.push(arr[i]);
            }
        }
        return r;
    }
    // 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能,暂时没找到替代的方法。。。
    /* 正确排重
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr))
    }else{
        var r = [], NaNBol = true
        for(var i=0; i < arr.length; i++) {
            if (arr[i] !== arr[i]) {
                if (NaNBol &amp;&amp; r.indexOf(arr[i]) === -1) {
                    r.push(arr[i])
                    NaNBol = false
                }
            }else{
                if(r.indexOf(arr[i]) === -1) r.push(arr[i])
            }
        }
        return r
    }

     */
}


/*求两个集合的并集*/
union (a, b) {
    var newArr = a.concat(b);
    return this.unique(newArr);
}

/*求两个集合的交集*/
intersect (a, b) {
    var _this = this;
    a = this.unique(a);
    return this.map(a, function(o) {
        return _this.contains(b, o) ? o : null;
    });
}

/*删除其中一个元素*/
remove (arr, ele) {
    var index = arr.indexOf(ele);
    if(index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

/*将类数组转换为数组的方法*/
formArray (ary) {
    var arr = [];
    if(Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    };
    return arr;
}

/*最大值*/
max (arr) {
    return Math.max.apply(null, arr);
}

/*最小值*/
min (arr) {
    return Math.min.apply(null, arr);
}

/*求和*/
sum (arr) {
    return arr.reduce( (pre, cur) => {
        return pre + cur
    })
}

/*平均值*/
average (arr) {
    return this.sum(arr)/arr.length
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/*判断一个元素是否在数组中*/</span>
contains (arr, <span class="hljs-keyword">val</span>) {
    <span class="hljs-keyword">return</span> arr.indexOf(<span class="hljs-keyword">val</span>) != <span class="hljs-number">-1</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
}


<span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span>  {arr} 数组
 * <span class="hljs-doctag">@param</span>  {fn} 回调函数
 * <span class="hljs-doctag">@return</span> {undefined}
 */</span>
each (arr, fn) {
    fn = fn || Function;
    <span class="hljs-keyword">var</span> a = [];
    <span class="hljs-keyword">var</span> args = Array.prototype.slice.call(arguments, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">var</span> res = fn.apply(arr, [arr[i], i].concat(args));
        <span class="hljs-keyword">if</span>(res != <span class="hljs-literal">null</span>) a.push(res);
    }
}

<span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span>  {arr} 数组
 * <span class="hljs-doctag">@param</span>  {fn} 回调函数
 * <span class="hljs-doctag">@param</span>  {thisObj} this指向
 * <span class="hljs-doctag">@return</span> {Array} 
 */</span>
map (arr, fn, thisObj) {
    <span class="hljs-keyword">var</span> scope = thisObj || window;
    <span class="hljs-keyword">var</span> a = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, j = arr.length; i &lt; j; ++i) {
        <span class="hljs-keyword">var</span> res = fn.call(scope, arr[i], i, <span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">if</span>(res != <span class="hljs-literal">null</span>) a.push(res);
    }
    <span class="hljs-keyword">return</span> a;
}


<span class="hljs-comment">/**
 * <span class="hljs-doctag">@param</span>  {arr} 数组
 * <span class="hljs-doctag">@param</span>  {type} 1：从小到大   2：从大到小   3：随机
 * <span class="hljs-doctag">@return</span> {Array}
 */</span>
sort (arr, type = <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> arr.sort( (a, b) =&gt; {
        switch(type) {
            case <span class="hljs-number">1</span>:
                <span class="hljs-keyword">return</span> a - b;
            case <span class="hljs-number">2</span>:
                <span class="hljs-keyword">return</span> b - a;
            case <span class="hljs-number">3</span>:
                <span class="hljs-keyword">return</span> Math.random() - <span class="hljs-number">0.5</span>;
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">return</span> arr;
        }
    })
}

<span class="hljs-comment">/*去重*/</span>
unique (arr) {
    <span class="hljs-keyword">if</span> ( Array.hasOwnProperty(<span class="hljs-string">'from'</span>) ) {
        <span class="hljs-keyword">return</span> Array.from(new Set(arr));
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> n = {},r=[]; 
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
            <span class="hljs-keyword">if</span> (!n[arr[i]]){
                n[arr[i]] = <span class="hljs-literal">true</span>; 
                r.push(arr[i]);
            }
        }
        <span class="hljs-keyword">return</span> r;
    }
    <span class="hljs-comment">// 注：上面 else 里面的排重并不能区分 2 和 '2'，但能减少用indexOf带来的性能,暂时没找到替代的方法。。。</span>
    <span class="hljs-comment">/* 正确排重
    if ( Array.hasOwnProperty('from') ) {
        return Array.from(new Set(arr))
    }else{
        var r = [], NaNBol = true
        for(var i=0; i &lt; arr.length; i++) {
            if (arr[i] !== arr[i]) {
                if (NaNBol &amp;&amp; r.indexOf(arr[i]) === -1) {
                    r.push(arr[i])
                    NaNBol = false
                }
            }else{
                if(r.indexOf(arr[i]) === -1) r.push(arr[i])
            }
        }
        return r
    }

     */</span>
}


<span class="hljs-comment">/*求两个集合的并集*/</span>
union (a, b) {
    <span class="hljs-keyword">var</span> newArr = a.concat(b);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.unique(newArr);
}

<span class="hljs-comment">/*求两个集合的交集*/</span>
intersect (a, b) {
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    a = <span class="hljs-keyword">this</span>.unique(a);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.map(a, function(o) {
        <span class="hljs-keyword">return</span> _this.contains(b, o) ? o : <span class="hljs-literal">null</span>;
    });
}

<span class="hljs-comment">/*删除其中一个元素*/</span>
remove (arr, ele) {
    <span class="hljs-keyword">var</span> index = arr.indexOf(ele);
    <span class="hljs-keyword">if</span>(index &gt; <span class="hljs-number">-1</span>) {
        arr.splice(index, <span class="hljs-number">1</span>);
    }
    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-comment">/*将类数组转换为数组的方法*/</span>
formArray (ary) {
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">if</span>(Array.isArray(ary)) {
        arr = ary;
    } <span class="hljs-keyword">else</span> {
        arr = Array.prototype.slice.call(ary);
    };
    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-comment">/*最大值*/</span>
max (arr) {
    <span class="hljs-keyword">return</span> Math.max.apply(<span class="hljs-literal">null</span>, arr);
}

<span class="hljs-comment">/*最小值*/</span>
min (arr) {
    <span class="hljs-keyword">return</span> Math.min.apply(<span class="hljs-literal">null</span>, arr);
}

<span class="hljs-comment">/*求和*/</span>
sum (arr) {
    <span class="hljs-keyword">return</span> arr.reduce( (pre, cur) =&gt; {
        <span class="hljs-keyword">return</span> pre + cur
    })
}

<span class="hljs-comment">/*平均值*/</span>
average (arr) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.sum(arr)/arr.length
}</code></pre>
<h3 id="articleHeader5">4. String 字符串操作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 去除空格
 * @param  {str}
 * @param  {type} 
 *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
trim (str, type) {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, &quot;&quot;);
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, &quot;&quot;);
        case 3:
            return str.replace(/(^\s*)/g, &quot;&quot;);
        case 4:
            return str.replace(/(\s*$)/g, &quot;&quot;);
        default:
            return str;
    }
}

/**
 * @param  {str} 
 * @param  {type}
 *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return {String}
 */
changeCase (str, type) {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map( function(word){
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                }else{
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}


/*
    检测密码强度
*/
checkPwd (str) {
    var Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}

/*过滤html代码(把<>转换)*/
filterTag (str) {
    str = str.replace(/&amp;/ig, &quot;&amp;amp;&quot;);
    str = str.replace(/</ig, &quot;&amp;lt;&quot;);
    str = str.replace(/>/ig, &quot;&amp;gt;&quot;);
    str = str.replace(&quot; &quot;, &quot;&amp;nbsp;&quot;);
    return str;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">/**
 * 去除空格
 * @param  {str}
 * @param  {type} 
 *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */</span>
<span class="hljs-built_in">trim</span> (<span class="hljs-built_in">str</span>, type) {
    type = type || <span class="hljs-number">1</span>
    <span class="hljs-keyword">switch</span> (type) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/\s+/g, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/(^\s*)|(\s*$)/g, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/(^\s*)/g, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/(\s*$)/g, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>;
    }
}

<span class="hljs-comment">/**
 * @param  {str} 
 * @param  {type}
 *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return {String}
 */</span>
changeCase (<span class="hljs-built_in">str</span>, type) {
    type = type || <span class="hljs-number">4</span>
    <span class="hljs-keyword">switch</span> (type) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/\b\w+\b/g, function (word) {
                <span class="hljs-keyword">return</span> word.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toUpperCase() + word.substring(<span class="hljs-number">1</span>).toLowerCase();

            });
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.replace(/\b\w+\b/g, function (word) {
                <span class="hljs-keyword">return</span> word.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>).toLowerCase() + word.substring(<span class="hljs-number">1</span>).toUpperCase();
            });
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.<span class="hljs-built_in">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">map</span>( function(word){
                <span class="hljs-keyword">if</span> (/[a-z]/.test(word)) {
                    <span class="hljs-keyword">return</span> word.toUpperCase();
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-keyword">return</span> word.toLowerCase()
                }
            }).<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>)
        <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.toUpperCase();
        <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>.toLowerCase();
        <span class="hljs-keyword">default</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>;
    }
}


<span class="hljs-comment">/*
    检测密码强度
*/</span>
checkPwd (<span class="hljs-built_in">str</span>) {
    var Lv = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">str</span>.length &lt; <span class="hljs-number">6</span>) {
        <span class="hljs-keyword">return</span> Lv
    }
    <span class="hljs-keyword">if</span> (/[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]/.test(<span class="hljs-built_in">str</span>)) {
        Lv++
    }
    <span class="hljs-keyword">if</span> (/[a-z]/.test(<span class="hljs-built_in">str</span>)) {
        Lv++
    }
    <span class="hljs-keyword">if</span> (/[A-Z]/.test(<span class="hljs-built_in">str</span>)) {
        Lv++
    }
    <span class="hljs-keyword">if</span> (/[\.|-|_]/.test(<span class="hljs-built_in">str</span>)) {
        Lv++
    }
    <span class="hljs-keyword">return</span> Lv;
}

<span class="hljs-comment">/*过滤html代码(把&lt;&gt;转换)*/</span>
filterTag (<span class="hljs-built_in">str</span>) {
    <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(/&amp;/ig, <span class="hljs-string">"&amp;amp;"</span>);
    <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(/&lt;/ig, <span class="hljs-string">"&amp;lt;"</span>);
    <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(/&gt;/ig, <span class="hljs-string">"&amp;gt;"</span>);
    <span class="hljs-built_in">str</span> = <span class="hljs-built_in">str</span>.replace(<span class="hljs-string">" "</span>, <span class="hljs-string">"&amp;nbsp;"</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>;
}</code></pre>
<h3 id="articleHeader6">5. Number</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*随机数范围*/
random (min, max) {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ( (max+1) - min ))
    }else{
        return null;
    }
    
}

/*将阿拉伯数字翻译成中文的大写数字*/
numberToChinese (num) {
    var AA = new Array(&quot;零&quot;, &quot;一&quot;, &quot;二&quot;, &quot;三&quot;, &quot;四&quot;, &quot;五&quot;, &quot;六&quot;, &quot;七&quot;, &quot;八&quot;, &quot;九&quot;, &quot;十&quot;);
    var BB = new Array(&quot;&quot;, &quot;十&quot;, &quot;百&quot;, &quot;仟&quot;, &quot;萬&quot;, &quot;億&quot;, &quot;点&quot;, &quot;&quot;);
    var a = (&quot;&quot; + num).replace(/(^0*)/g, &quot;&quot;).split(&quot;.&quot;),
        k = 0,
        re = &quot;&quot;;
    for(var i = a[0].length - 1; i >= 0; i--) {
        switch(k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if(!new RegExp(&quot;0{4}//d{&quot; + (a[0].length - i - 1) + &quot;}$&quot;)
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if(k % 4 == 2 &amp;&amp; a[0].charAt(i + 2) != 0 &amp;&amp; a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if(a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if(a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for(var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if(re == '一十')
        re = &quot;十&quot;;
    if(re.match(/^一/) &amp;&amp; re.length == 3)
        re = re.replace(&quot;一&quot;, &quot;&quot;);
    return re;
}

/*将数字转换为大写金额*/
changeToChinese (Num) {
        //判断如果传递进来的不是字符的话转换为字符
        if(typeof Num == &quot;number&quot;) {
            Num = new String(Num);
        };
        Num = Num.replace(/,/g, &quot;&quot;) //替换tomoney()中的“,”
        Num = Num.replace(/ /g, &quot;&quot;) //替换tomoney()中的空格
        Num = Num.replace(/￥/g, &quot;&quot;) //替换掉可能出现的￥字符
        if(isNaN(Num)) { //验证输入的字符是否为数字
            //alert(&quot;请检查小写金额是否正确&quot;);
            return &quot;&quot;;
        };
        //字符处理完毕后开始转换，采用前后两部分分别转换
        var part = String(Num).split(&quot;.&quot;);
        var newchar = &quot;&quot;;
        //小数点前进行转化
        for(var i = part[0].length - 1; i >= 0; i--) {
            if(part[0].length > 10) {
                return &quot;&quot;;
                //若数量超过拾亿单位，提示
            }
            var tmpnewchar = &quot;&quot;
            var perchar = part[0].charAt(i);
            switch(perchar) {
                case &quot;0&quot;:
                    tmpnewchar = &quot;零&quot; + tmpnewchar;
                    break;
                case &quot;1&quot;:
                    tmpnewchar = &quot;壹&quot; + tmpnewchar;
                    break;
                case &quot;2&quot;:
                    tmpnewchar = &quot;贰&quot; + tmpnewchar;
                    break;
                case &quot;3&quot;:
                    tmpnewchar = &quot;叁&quot; + tmpnewchar;
                    break;
                case &quot;4&quot;:
                    tmpnewchar = &quot;肆&quot; + tmpnewchar;
                    break;
                case &quot;5&quot;:
                    tmpnewchar = &quot;伍&quot; + tmpnewchar;
                    break;
                case &quot;6&quot;:
                    tmpnewchar = &quot;陆&quot; + tmpnewchar;
                    break;
                case &quot;7&quot;:
                    tmpnewchar = &quot;柒&quot; + tmpnewchar;
                    break;
                case &quot;8&quot;:
                    tmpnewchar = &quot;捌&quot; + tmpnewchar;
                    break;
                case &quot;9&quot;:
                    tmpnewchar = &quot;玖&quot; + tmpnewchar;
                    break;
            }
            switch(part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar + &quot;元&quot;;
                    break;
                case 1:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;拾&quot;;
                    break;
                case 2:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;佰&quot;;
                    break;
                case 3:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;仟&quot;;
                    break;
                case 4:
                    tmpnewchar = tmpnewchar + &quot;万&quot;;
                    break;
                case 5:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;拾&quot;;
                    break;
                case 6:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;佰&quot;;
                    break;
                case 7:
                    if(perchar != 0) tmpnewchar = tmpnewchar + &quot;仟&quot;;
                    break;
                case 8:
                    tmpnewchar = tmpnewchar + &quot;亿&quot;;
                    break;
                case 9:
                    tmpnewchar = tmpnewchar + &quot;拾&quot;;
                    break;
            }
            var newchar = tmpnewchar + newchar;
        }
        //小数点之后进行转化
        if(Num.indexOf(&quot;.&quot;) != -1) {
            if(part[1].length > 2) {
                // alert(&quot;小数点之后只能保留两位,系统将自动截断&quot;);
                part[1] = part[1].substr(0, 2)
            }
            for(i = 0; i < part[1].length; i++) {
                tmpnewchar = &quot;&quot;
                perchar = part[1].charAt(i)
                switch(perchar) {
                    case &quot;0&quot;:
                        tmpnewchar = &quot;零&quot; + tmpnewchar;
                        break;
                    case &quot;1&quot;:
                        tmpnewchar = &quot;壹&quot; + tmpnewchar;
                        break;
                    case &quot;2&quot;:
                        tmpnewchar = &quot;贰&quot; + tmpnewchar;
                        break;
                    case &quot;3&quot;:
                        tmpnewchar = &quot;叁&quot; + tmpnewchar;
                        break;
                    case &quot;4&quot;:
                        tmpnewchar = &quot;肆&quot; + tmpnewchar;
                        break;
                    case &quot;5&quot;:
                        tmpnewchar = &quot;伍&quot; + tmpnewchar;
                        break;
                    case &quot;6&quot;:
                        tmpnewchar = &quot;陆&quot; + tmpnewchar;
                        break;
                    case &quot;7&quot;:
                        tmpnewchar = &quot;柒&quot; + tmpnewchar;
                        break;
                    case &quot;8&quot;:
                        tmpnewchar = &quot;捌&quot; + tmpnewchar;
                        break;
                    case &quot;9&quot;:
                        tmpnewchar = &quot;玖&quot; + tmpnewchar;
                        break;
                }
                if(i == 0) tmpnewchar = tmpnewchar + &quot;角&quot;;
                if(i == 1) tmpnewchar = tmpnewchar + &quot;分&quot;;
                newchar = newchar + tmpnewchar;
            }
        }
        //替换所有无用汉字
        while(newchar.search(&quot;零零&quot;) != -1)
            newchar = newchar.replace(&quot;零零&quot;, &quot;零&quot;);
        newchar = newchar.replace(&quot;零亿&quot;, &quot;亿&quot;);
        newchar = newchar.replace(&quot;亿万&quot;, &quot;亿&quot;);
        newchar = newchar.replace(&quot;零万&quot;, &quot;万&quot;);
        newchar = newchar.replace(&quot;零元&quot;, &quot;元&quot;);
        newchar = newchar.replace(&quot;零角&quot;, &quot;&quot;);
        newchar = newchar.replace(&quot;零分&quot;, &quot;&quot;);
        if(newchar.charAt(newchar.length - 1) == &quot;元&quot;) {
            newchar = newchar + &quot;整&quot;
        }
        return newchar;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">/*随机数范围*/</span>
random (min, max) {
    <span class="hljs-keyword">if</span> (arguments.length === <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> Math.floor(min + Math.random() * ( (max+<span class="hljs-number">1</span>) - min ))
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
    
}

<span class="hljs-comment">/*将阿拉伯数字翻译成中文的大写数字*/</span>
numberToChinese (num) {
    <span class="hljs-keyword">var</span> AA = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-string">"零"</span>, <span class="hljs-string">"一"</span>, <span class="hljs-string">"二"</span>, <span class="hljs-string">"三"</span>, <span class="hljs-string">"四"</span>, <span class="hljs-string">"五"</span>, <span class="hljs-string">"六"</span>, <span class="hljs-string">"七"</span>, <span class="hljs-string">"八"</span>, <span class="hljs-string">"九"</span>, <span class="hljs-string">"十"</span>);
    <span class="hljs-keyword">var</span> BB = <span class="hljs-keyword">new</span> <span class="hljs-type">Array</span>(<span class="hljs-string">""</span>, <span class="hljs-string">"十"</span>, <span class="hljs-string">"百"</span>, <span class="hljs-string">"仟"</span>, <span class="hljs-string">"萬"</span>, <span class="hljs-string">"億"</span>, <span class="hljs-string">"点"</span>, <span class="hljs-string">""</span>);
    <span class="hljs-keyword">var</span> a = (<span class="hljs-string">""</span> + num).replace(/(^<span class="hljs-number">0</span>*)/g, <span class="hljs-string">""</span>).split(<span class="hljs-string">"."</span>),
        k = <span class="hljs-number">0</span>,
        re = <span class="hljs-string">""</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = a[<span class="hljs-number">0</span>].length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
        <span class="hljs-keyword">switch</span>(k) {
            <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:<span class="hljs-type"></span>
                re = BB[<span class="hljs-number">7</span>] + re;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:<span class="hljs-type"></span>
                <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">new</span> <span class="hljs-type">RegExp</span>(<span class="hljs-string">"0{4}//d{"</span> + (a[<span class="hljs-number">0</span>].length - i - <span class="hljs-number">1</span>) + <span class="hljs-string">"}$"</span>)
                    .test(a[<span class="hljs-number">0</span>]))
                    re = BB[<span class="hljs-number">4</span>] + re;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:<span class="hljs-type"></span>
                re = BB[<span class="hljs-number">5</span>] + re;
                BB[<span class="hljs-number">7</span>] = BB[<span class="hljs-number">5</span>];
                k = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">break</span>;
        }
        <span class="hljs-keyword">if</span>(k % <span class="hljs-number">4</span> == <span class="hljs-number">2</span> &amp;&amp; a[<span class="hljs-number">0</span>].charAt(i + <span class="hljs-number">2</span>) != <span class="hljs-number">0</span> &amp;&amp; a[<span class="hljs-number">0</span>].charAt(i + <span class="hljs-number">1</span>) == <span class="hljs-number">0</span>)
            re = AA[<span class="hljs-number">0</span>] + re;
        <span class="hljs-keyword">if</span>(a[<span class="hljs-number">0</span>].charAt(i) != <span class="hljs-number">0</span>)
            re = AA[a[<span class="hljs-number">0</span>].charAt(i)] + BB[k % <span class="hljs-number">4</span>] + re;
        k++;
    }

    <span class="hljs-keyword">if</span>(a.length &gt; <span class="hljs-number">1</span>) <span class="hljs-comment">// 加上小数部分(如果有小数部分)</span>
    {
        re += BB[<span class="hljs-number">6</span>];
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; a[<span class="hljs-number">1</span>].length; i++)
            re += AA[a[<span class="hljs-number">1</span>].charAt(i)];
    }
    <span class="hljs-keyword">if</span>(re == <span class="hljs-string">'一十'</span>)
        re = <span class="hljs-string">"十"</span>;
    <span class="hljs-keyword">if</span>(re.match(/^一/) &amp;&amp; re.length == <span class="hljs-number">3</span>)
        re = re.replace(<span class="hljs-string">"一"</span>, <span class="hljs-string">""</span>);
    <span class="hljs-keyword">return</span> re;
}

<span class="hljs-comment">/*将数字转换为大写金额*/</span>
changeToChinese (Num) {
        <span class="hljs-comment">//判断如果传递进来的不是字符的话转换为字符</span>
        <span class="hljs-keyword">if</span>(typeof Num == <span class="hljs-string">"number"</span>) {
            Num = <span class="hljs-keyword">new</span> <span class="hljs-type">String</span>(Num);
        };
        Num = Num.replace(/,/g, <span class="hljs-string">""</span>) <span class="hljs-comment">//替换tomoney()中的“,”</span>
        Num = Num.replace(/ /g, <span class="hljs-string">""</span>) <span class="hljs-comment">//替换tomoney()中的空格</span>
        Num = Num.replace(/￥/g, <span class="hljs-string">""</span>) <span class="hljs-comment">//替换掉可能出现的￥字符</span>
        <span class="hljs-keyword">if</span>(isNaN(Num)) { <span class="hljs-comment">//验证输入的字符是否为数字</span>
            <span class="hljs-comment">//alert("请检查小写金额是否正确");</span>
            <span class="hljs-keyword">return</span> <span class="hljs-string">""</span>;
        };
        <span class="hljs-comment">//字符处理完毕后开始转换，采用前后两部分分别转换</span>
        <span class="hljs-keyword">var</span> part = <span class="hljs-keyword">String</span>(Num).split(<span class="hljs-string">"."</span>);
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-string">""</span>;
        <span class="hljs-comment">//小数点前进行转化</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = part[<span class="hljs-number">0</span>].length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
            <span class="hljs-keyword">if</span>(part[<span class="hljs-number">0</span>].length &gt; <span class="hljs-number">10</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-string">""</span>;
                <span class="hljs-comment">//若数量超过拾亿单位，提示</span>
            }
            <span class="hljs-keyword">var</span> tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">""</span>
            <span class="hljs-keyword">var</span> perchar = part[<span class="hljs-number">0</span>].charAt(i);
            <span class="hljs-keyword">switch</span>(perchar) {
                <span class="hljs-keyword">case</span> <span class="hljs-string">"0"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"零"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"1"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"壹"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"2"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"贰"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"3"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"叁"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"4"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"肆"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"5"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"伍"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"6"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"陆"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"7"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"柒"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"8"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"捌"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"9"</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"玖"</span> + tmpnew<span class="hljs-type">char</span>;
                    <span class="hljs-keyword">break</span>;
            }
            <span class="hljs-keyword">switch</span>(part[<span class="hljs-number">0</span>].length - i - <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"元"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"拾"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"佰"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"仟"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"万"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"拾"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"佰"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:<span class="hljs-type"></span>
                    <span class="hljs-keyword">if</span>(perchar != <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"仟"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"亿"</span>;
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-number">9</span>:<span class="hljs-type"></span>
                    tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"拾"</span>;
                    <span class="hljs-keyword">break</span>;
            }
            <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-keyword">new</span><span class="hljs-type">char</span>;
        }
        <span class="hljs-comment">//小数点之后进行转化</span>
        <span class="hljs-keyword">if</span>(Num.indexOf(<span class="hljs-string">"."</span>) != <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">if</span>(part[<span class="hljs-number">1</span>].length &gt; <span class="hljs-number">2</span>) {
                <span class="hljs-comment">// alert("小数点之后只能保留两位,系统将自动截断");</span>
                part[<span class="hljs-number">1</span>] = part[<span class="hljs-number">1</span>].substr(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
            }
            <span class="hljs-keyword">for</span>(i = <span class="hljs-number">0</span>; i &lt; part[<span class="hljs-number">1</span>].length; i++) {
                tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">""</span>
                perchar = part[<span class="hljs-number">1</span>].charAt(i)
                <span class="hljs-keyword">switch</span>(perchar) {
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"0"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"零"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"1"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"壹"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"2"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"贰"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"3"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"叁"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"4"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"肆"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"5"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"伍"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"6"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"陆"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"7"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"柒"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"8"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"捌"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                    <span class="hljs-keyword">case</span> <span class="hljs-string">"9"</span>:<span class="hljs-type"></span>
                        tmpnew<span class="hljs-type">char</span> = <span class="hljs-string">"玖"</span> + tmpnew<span class="hljs-type">char</span>;
                        <span class="hljs-keyword">break</span>;
                }
                <span class="hljs-keyword">if</span>(i == <span class="hljs-number">0</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"角"</span>;
                <span class="hljs-keyword">if</span>(i == <span class="hljs-number">1</span>) tmpnew<span class="hljs-type">char</span> = tmpnew<span class="hljs-type">char</span> + <span class="hljs-string">"分"</span>;
                <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span> + tmpnew<span class="hljs-type">char</span>;
            }
        }
        <span class="hljs-comment">//替换所有无用汉字</span>
        <span class="hljs-keyword">while</span>(<span class="hljs-keyword">new</span><span class="hljs-type">char</span>.search(<span class="hljs-string">"零零"</span>) != <span class="hljs-number">-1</span>)
            <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零零"</span>, <span class="hljs-string">"零"</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零亿"</span>, <span class="hljs-string">"亿"</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"亿万"</span>, <span class="hljs-string">"亿"</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零万"</span>, <span class="hljs-string">"万"</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零元"</span>, <span class="hljs-string">"元"</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零角"</span>, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span>.replace(<span class="hljs-string">"零分"</span>, <span class="hljs-string">""</span>);
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">new</span><span class="hljs-type">char</span>.charAt(<span class="hljs-keyword">new</span><span class="hljs-type">char</span>.length - <span class="hljs-number">1</span>) == <span class="hljs-string">"元"</span>) {
            <span class="hljs-keyword">new</span><span class="hljs-type">char</span> = <span class="hljs-keyword">new</span><span class="hljs-type">char</span> + <span class="hljs-string">"整"</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">char</span>;
    }</code></pre>
<h3 id="articleHeader7">6. Http</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param  {setting}
 */
ajax(setting){
    //设置参数的初始值
    var opts={
        method: (setting.method || &quot;GET&quot;).toUpperCase(), //请求方式
        url: setting.url || &quot;&quot;, // 请求地址
        async: setting.async || true, // 是否异步
        dataType: setting.dataType || &quot;json&quot;, // 解析方式
        data: setting.data || &quot;&quot;, // 参数
        success: setting.success || function(){}, // 请求成功回调
        error: setting.error || function(){} // 请求失败回调
    }

    // 参数格式化
    function params_format (obj) {
        var str = ''
        for (var i in obj) {
            str += i + '=' + obj[i] + '&amp;'
        }
        return str.split('').slice(0, -1).join('')
    }

    // 创建ajax对象
    var xhr=new XMLHttpRequest();

    // 连接服务器open(方法GET/POST，请求地址， 异步传输)
    if(opts.method == 'GET'){
        xhr.open(opts.method, opts.url + &quot;?&quot; + params_format(opts.data), opts.async);
        xhr.send();
    }else{
        xhr.open(opts.method, opts.url, opts.async);
        xhr.setRequestHeader(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded&quot;);
        xhr.send(opts.data);
    }
    
    /*
    ** 每当readyState改变时，就会触发onreadystatechange事件
    ** readyState属性存储有XMLHttpRequest的状态信息
    ** 0 ：请求未初始化
    ** 1 ：服务器连接已建立
    ** 2 ：请求已接受
    ** 3 : 请求处理中
    ** 4 ：请求已完成，且相应就绪
    */
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 &amp;&amp; (xhr.status === 200 || xhr.status === 304)) {
            switch(opts.dataType){
                case &quot;json&quot;:
                    var json = JSON.parse(xhr.responseText);
                    opts.success(json);
                    break;
                case &quot;xml&quot;:
                    opts.success(xhr.responseXML);
                    break;
                default:
                    opts.success(xhr.responseText);
                    break;
            }
        }
    }

    xhr.onerror = function(err) {
        opts.error(err);
    }
}

/**
 * @param  {url}
 * @param  {setting}
 * @return {Promise}
 */
fetch(url, setting) {
    //设置参数的初始值
    let opts={
        method: (setting.method || 'GET').toUpperCase(), //请求方式
        headers : setting.headers  || {}, // 请求头设置
        credentials : setting.credentials  || true, // 设置cookie是否一起发送
        body: setting.body || {},
        mode : setting.mode  || 'no-cors', // 可以设置 cors, no-cors, same-origin
        redirect : setting.redirect  || 'follow', // follow, error, manual
        cache : setting.cache  || 'default' // 设置 cache 模式 (default, reload, no-cache)
    }
    let dataType = setting.dataType || &quot;json&quot;, // 解析方式  
        data = setting.data || &quot;&quot; // 参数

    // 参数格式化
    function params_format (obj) {
        var str = ''
        for (var i in obj) {
            str += `${i}=${obj[i]}&amp;`
        }
        return str.split('').slice(0, -1).join('')
    }

    if (opts.method === 'GET') {
        url = url + (data?`?${params_format(data)}`:'')
    }else{
        setting.body = data || {}
    }

    return new Promise( (resolve, reject) => {
        fetch(url, opts).then( async res => {
            let data = dataType === 'text' ? await res.text() :
                dataType === 'blob' ? await res.blob() : await res.json() 
            resolve(data)
        }).catch( e => {
            reject(e)
        })
    })
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @param  {setting}
 */</span>
ajax(setting){
    <span class="hljs-comment">//设置参数的初始值</span>
    <span class="hljs-keyword">var</span> opts={
        <span class="hljs-attr">method</span>: (setting.method || <span class="hljs-string">"GET"</span>).toUpperCase(), <span class="hljs-comment">//请求方式</span>
        url: setting.url || <span class="hljs-string">""</span>, <span class="hljs-comment">// 请求地址</span>
        <span class="hljs-keyword">async</span>: setting.async || <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否异步</span>
        dataType: setting.dataType || <span class="hljs-string">"json"</span>, <span class="hljs-comment">// 解析方式</span>
        data: setting.data || <span class="hljs-string">""</span>, <span class="hljs-comment">// 参数</span>
        success: setting.success || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-comment">// 请求成功回调</span>
        error: setting.error || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{} <span class="hljs-comment">// 请求失败回调</span>
    }

    <span class="hljs-comment">// 参数格式化</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">params_format</span> (<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj) {
            str += i + <span class="hljs-string">'='</span> + obj[i] + <span class="hljs-string">'&amp;'</span>
        }
        <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>).join(<span class="hljs-string">''</span>)
    }

    <span class="hljs-comment">// 创建ajax对象</span>
    <span class="hljs-keyword">var</span> xhr=<span class="hljs-keyword">new</span> XMLHttpRequest();

    <span class="hljs-comment">// 连接服务器open(方法GET/POST，请求地址， 异步传输)</span>
    <span class="hljs-keyword">if</span>(opts.method == <span class="hljs-string">'GET'</span>){
        xhr.open(opts.method, opts.url + <span class="hljs-string">"?"</span> + params_format(opts.data), opts.async);
        xhr.send();
    }<span class="hljs-keyword">else</span>{
        xhr.open(opts.method, opts.url, opts.async);
        xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);
        xhr.send(opts.data);
    }
    
    <span class="hljs-comment">/*
    ** 每当readyState改变时，就会触发onreadystatechange事件
    ** readyState属性存储有XMLHttpRequest的状态信息
    ** 0 ：请求未初始化
    ** 1 ：服务器连接已建立
    ** 2 ：请求已接受
    ** 3 : 请求处理中
    ** 4 ：请求已完成，且相应就绪
    */</span>
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span> &amp;&amp; (xhr.status === <span class="hljs-number">200</span> || xhr.status === <span class="hljs-number">304</span>)) {
            <span class="hljs-keyword">switch</span>(opts.dataType){
                <span class="hljs-keyword">case</span> <span class="hljs-string">"json"</span>:
                    <span class="hljs-keyword">var</span> json = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText);
                    opts.success(json);
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">case</span> <span class="hljs-string">"xml"</span>:
                    opts.success(xhr.responseXML);
                    <span class="hljs-keyword">break</span>;
                <span class="hljs-keyword">default</span>:
                    opts.success(xhr.responseText);
                    <span class="hljs-keyword">break</span>;
            }
        }
    }

    xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
        opts.error(err);
    }
}

<span class="hljs-comment">/**
 * @param  {url}
 * @param  {setting}
 * @return {Promise}
 */</span>
fetch(url, setting) {
    <span class="hljs-comment">//设置参数的初始值</span>
    <span class="hljs-keyword">let</span> opts={
        <span class="hljs-attr">method</span>: (setting.method || <span class="hljs-string">'GET'</span>).toUpperCase(), <span class="hljs-comment">//请求方式</span>
        headers : setting.headers  || {}, <span class="hljs-comment">// 请求头设置</span>
        credentials : setting.credentials  || <span class="hljs-literal">true</span>, <span class="hljs-comment">// 设置cookie是否一起发送</span>
        body: setting.body || {},
        <span class="hljs-attr">mode</span> : setting.mode  || <span class="hljs-string">'no-cors'</span>, <span class="hljs-comment">// 可以设置 cors, no-cors, same-origin</span>
        redirect : setting.redirect  || <span class="hljs-string">'follow'</span>, <span class="hljs-comment">// follow, error, manual</span>
        cache : setting.cache  || <span class="hljs-string">'default'</span> <span class="hljs-comment">// 设置 cache 模式 (default, reload, no-cache)</span>
    }
    <span class="hljs-keyword">let</span> dataType = setting.dataType || <span class="hljs-string">"json"</span>, <span class="hljs-comment">// 解析方式  </span>
        data = setting.data || <span class="hljs-string">""</span> <span class="hljs-comment">// 参数</span>

    <span class="hljs-comment">// 参数格式化</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">params_format</span> (<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> str = <span class="hljs-string">''</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj) {
            str += <span class="hljs-string">`<span class="hljs-subst">${i}</span>=<span class="hljs-subst">${obj[i]}</span>&amp;`</span>
        }
        <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>).join(<span class="hljs-string">''</span>)
    }

    <span class="hljs-keyword">if</span> (opts.method === <span class="hljs-string">'GET'</span>) {
        url = url + (data?<span class="hljs-string">`?<span class="hljs-subst">${params_format(data)}</span>`</span>:<span class="hljs-string">''</span>)
    }<span class="hljs-keyword">else</span>{
        setting.body = data || {}
    }

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        fetch(url, opts).then( <span class="hljs-keyword">async</span> res =&gt; {
            <span class="hljs-keyword">let</span> data = dataType === <span class="hljs-string">'text'</span> ? <span class="hljs-keyword">await</span> res.text() :
                dataType === <span class="hljs-string">'blob'</span> ? <span class="hljs-keyword">await</span> res.blob() : <span class="hljs-keyword">await</span> res.json() 
            resolve(data)
        }).catch( <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
            reject(e)
        })
    })
    
}</code></pre>
<h3 id="articleHeader8">7. DOM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ (selector){ 
    var type = selector.substring(0, 1);
    if (type === '#') {
        if (document.querySelecotor) return document.querySelector(selector)
            return document.getElementById(selector.substring(1))
        
    }else if (type === '.') {
        if (document.querySelecotorAll) return document.querySelectorAll(selector)
            return document.getElementsByClassName(selector.substring(1))
    }else{
        return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
    }
} 

/*检测类名*/
hasClass (ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
}

/*添加类名*/
addClass (ele, name) {
    if (!this.hasClass(ele, name)) ele.className += &quot; &quot; + name;
}

/*删除类名*/
removeClass (ele, name) {
    if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}

/*替换类名*/
replaceClass (ele, newName, oldName) {
    this.removeClass(ele, oldName);
    this.addClass(ele, newName);
}

/*获取兄弟节点*/
siblings (ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children,eleMatch = []; 
    for(var i = 0, len = chid.length; i < len; i ++){ 
        if(chid[i] != ele){ 
            eleMatch.push(chid[i]); 
        } 
    } 
    return eleMatch;
}

/*获取行间样式属性*/
getByStyle (obj,name){
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    }else{
        return  getComputedStyle(obj,false)[name];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>$ (selector){ 
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">type</span> = selector.substring(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">'#'</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.querySelecotor) <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.querySelector(selector)
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.getElementById(selector.substring(<span class="hljs-number">1</span>))
        
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> === <span class="hljs-string">'.'</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.querySelecotorAll) <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.querySelectorAll(selector)
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>.getElementsByClassName(selector.substring(<span class="hljs-number">1</span>))
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">document</span>[<span class="hljs-string">'querySelectorAll'</span> ? <span class="hljs-string">'querySelectorAll'</span>:<span class="hljs-string">'getElementsByTagName'</span>](selector)
    }
} 

<span class="hljs-comment">/*检测类名*/</span>
hasClass (ele, name) {
    <span class="hljs-keyword">return</span> ele.className.match(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(\\s|^)'</span> + name + <span class="hljs-string">'(\\s|$)'</span>));
}

<span class="hljs-comment">/*添加类名*/</span>
addClass (ele, name) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.hasClass(ele, name)) ele.className += <span class="hljs-string">" "</span> + name;
}

<span class="hljs-comment">/*删除类名*/</span>
removeClass (ele, name) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hasClass(ele, name)) {
        <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'(\\s|^)'</span> + name + <span class="hljs-string">'(\\s|$)'</span>);
        ele.className = ele.className.replace(reg, <span class="hljs-string">''</span>);
    }
}

<span class="hljs-comment">/*替换类名*/</span>
replaceClass (ele, newName, oldName) {
    <span class="hljs-keyword">this</span>.removeClass(ele, oldName);
    <span class="hljs-keyword">this</span>.addClass(ele, newName);
}

<span class="hljs-comment">/*获取兄弟节点*/</span>
siblings (ele) {
    <span class="hljs-built_in">console</span>.log(ele.parentNode)
    <span class="hljs-keyword">var</span> chid = ele.parentNode.children,eleMatch = []; 
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = chid.length; i &lt; len; i ++){ 
        <span class="hljs-keyword">if</span>(chid[i] != ele){ 
            eleMatch.push(chid[i]); 
        } 
    } 
    <span class="hljs-keyword">return</span> eleMatch;
}

<span class="hljs-comment">/*获取行间样式属性*/</span>
getByStyle (obj,name){
    <span class="hljs-keyword">if</span>(obj.currentStyle){
        <span class="hljs-keyword">return</span>  obj.currentStyle[name];
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span>  getComputedStyle(obj,<span class="hljs-literal">false</span>)[name];
    }
}</code></pre>
<h3 id="articleHeader9">8. Storage 储存操作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class StorageFn {
    constructor () {
        this.ls = window.localStorage;
        this.ss = window.sessionStorage;
    }

    /*-----------------cookie---------------------*/
    /*设置cookie*/
    setCookie (name, value, day) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for (var i in setting) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + day);
                document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
            }
        }else{
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = name + '=' + value + ';expires=' + oDate;
        }
        
    }

    /*获取cookie*/
    getCookie (name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    }

    /*删除cookie*/
    removeCookie (name) {
        this.setCookie(name, 1, -1);
    }


    /*-----------------localStorage---------------------*/
    /*设置localStorage*/
    setLocal(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for(var i in setting){
                this.ls.setItem(i, JSON.stringify(setting[i]))
            }
        }else{
            this.ls.setItem(key, JSON.stringify(val))
        }
        
    }

    /*获取localStorage*/
    getLocal(key) {
        if (key) return JSON.parse(this.ls.getItem(key))
        return null;
        
    }

    /*移除localStorage*/
    removeLocal(key) {
        this.ls.removeItem(key)
    }

    /*移除所有localStorage*/
    clearLocal() {
        this.ls.clear()
    }


    /*-----------------sessionStorage---------------------*/
    /*设置sessionStorage*/
    setSession(key, val) {
        var setting = arguments[0];
        if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object'){
            for(var i in setting){
                this.ss.setItem(i, JSON.stringify(setting[i]))
            }
        }else{
            this.ss.setItem(key, JSON.stringify(val))
        }
        
    }

    /*获取sessionStorage*/
    getSession(key) {
        if (key) return JSON.parse(this.ss.getItem(key))
        return null;
        
    }

    /*移除sessionStorage*/
    removeSession(key) {
        this.ss.removeItem(key)
    }

    /*移除所有sessionStorage*/
    clearSession() {
        this.ss.clear()
    }

    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StorageFn</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
        <span class="hljs-keyword">this</span>.ls = window.localStorage;
        <span class="hljs-keyword">this</span>.ss = window.sessionStorage;
    }

    <span class="hljs-comment">/*-----------------cookie---------------------*/</span>
    <span class="hljs-comment">/*设置cookie*/</span>
    setCookie (name, value, day) {
        <span class="hljs-keyword">var</span> setting = arguments[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (Object.prototype.toString.call(setting).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Object'</span>){
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> setting) {
                <span class="hljs-keyword">var</span> oDate = new Date();
                oDate.setDate(oDate.getDate() + day);
                document.cookie = i + <span class="hljs-string">'='</span> + setting[i] + <span class="hljs-string">';expires='</span> + oDate;
            }
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">var</span> oDate = new Date();
            oDate.setDate(oDate.getDate() + day);
            document.cookie = name + <span class="hljs-string">'='</span> + value + <span class="hljs-string">';expires='</span> + oDate;
        }
        
    }

    <span class="hljs-comment">/*获取cookie*/</span>
    getCookie (name) {
        <span class="hljs-keyword">var</span> arr = document.cookie.split(<span class="hljs-string">'; '</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
            <span class="hljs-keyword">var</span> arr2 = arr[i].split(<span class="hljs-string">'='</span>);
            <span class="hljs-keyword">if</span> (arr2[<span class="hljs-number">0</span>] == name) {
                <span class="hljs-keyword">return</span> arr2[<span class="hljs-number">1</span>];
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }

    <span class="hljs-comment">/*删除cookie*/</span>
    removeCookie (name) {
        <span class="hljs-keyword">this</span>.setCookie(name, <span class="hljs-number">1</span>, <span class="hljs-number">-1</span>);
    }


    <span class="hljs-comment">/*-----------------localStorage---------------------*/</span>
    <span class="hljs-comment">/*设置localStorage*/</span>
    setLocal(key, <span class="hljs-keyword">val</span>) {
        <span class="hljs-keyword">var</span> setting = arguments[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (Object.prototype.toString.call(setting).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Object'</span>){
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> setting){
                <span class="hljs-keyword">this</span>.ls.setItem(i, JSON.stringify(setting[i]))
            }
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.ls.setItem(key, JSON.stringify(<span class="hljs-keyword">val</span>))
        }
        
    }

    <span class="hljs-comment">/*获取localStorage*/</span>
    getLocal(key) {
        <span class="hljs-keyword">if</span> (key) <span class="hljs-keyword">return</span> JSON.parse(<span class="hljs-keyword">this</span>.ls.getItem(key))
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        
    }

    <span class="hljs-comment">/*移除localStorage*/</span>
    removeLocal(key) {
        <span class="hljs-keyword">this</span>.ls.removeItem(key)
    }

    <span class="hljs-comment">/*移除所有localStorage*/</span>
    clearLocal() {
        <span class="hljs-keyword">this</span>.ls.clear()
    }


    <span class="hljs-comment">/*-----------------sessionStorage---------------------*/</span>
    <span class="hljs-comment">/*设置sessionStorage*/</span>
    setSession(key, <span class="hljs-keyword">val</span>) {
        <span class="hljs-keyword">var</span> setting = arguments[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (Object.prototype.toString.call(setting).slice(<span class="hljs-number">8</span>, <span class="hljs-number">-1</span>) === <span class="hljs-string">'Object'</span>){
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> setting){
                <span class="hljs-keyword">this</span>.ss.setItem(i, JSON.stringify(setting[i]))
            }
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.ss.setItem(key, JSON.stringify(<span class="hljs-keyword">val</span>))
        }
        
    }

    <span class="hljs-comment">/*获取sessionStorage*/</span>
    getSession(key) {
        <span class="hljs-keyword">if</span> (key) <span class="hljs-keyword">return</span> JSON.parse(<span class="hljs-keyword">this</span>.ss.getItem(key))
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        
    }

    <span class="hljs-comment">/*移除sessionStorage*/</span>
    removeSession(key) {
        <span class="hljs-keyword">this</span>.ss.removeItem(key)
    }

    <span class="hljs-comment">/*移除所有sessionStorage*/</span>
    clearSession() {
        <span class="hljs-keyword">this</span>.ss.clear()
    }

    
}</code></pre>
<h3 id="articleHeader10">9. Other 其它操作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*获取网址参数*/
getURL(name){
    var reg = new RegExp(&quot;(^|&amp;)&quot;+ name +&quot;=([^&amp;]*)(&amp;|$)&quot;);
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if(r!=null) return  r[2]; return null;
}

/*获取全部url参数,并转换成json对象*/
getUrlAllParams (url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&amp;'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

/*删除url指定参数，返回url*/
delParamsUrl(url, name){
    var baseUrl = url.split('?')[0] + '?';
    var query = url.split('?')[1];
    if (query.indexOf(name)>-1) {
        var obj = {}
        var arr = query.split(&quot;&amp;&quot;);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(&quot;=&quot;);
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\&quot;\{\}]/g,&quot;&quot;).replace(/\:/g,&quot;=&quot;).replace(/\,/g,&quot;&amp;&quot;);
        return url
    }else{
        return url;
    }
}

/*获取十六进制随机颜色*/
getRandomColor () {
    return '#' + (function(h) {
        return new Array(7 - h.length).join(&quot;0&quot;) + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
}

/*图片加载*/
imgLoadAll(arr,callback){
    var arrImg = []; 
    for (var i = 0; i < arr.length; i++) {
        var img = new Image();
        img.src = arr[i];
        img.onload = function(){
            arrImg.push(this);
            if (arrImg.length == arr.length) {
                callback &amp;&amp; callback();
            }
        }
    }
}

/*音频加载*/
loadAudio(src, callback) {
    var audio = new Audio(src);
    audio.onloadedmetadata = callback;
    audio.src = src;
}

/*DOM转字符串*/
domToStirng(htmlDOM){
    var div= document.createElement(&quot;div&quot;);
    div.appendChild(htmlDOM);
    return div.innerHTML
}

/*字符串转DOM*/
stringToDom(htmlString){
    var div= document.createElement(&quot;div&quot;);
    div.innerHTML=htmlString;
    return div.children[0];
}


/**
 * 光标所在位置插入字符，并设置光标位置
 * 
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
setCursorPosition (dom,val,posLen) {
    var cursorPosition = 0;
    if(dom.selectionStart){
        cursorPosition = dom.selectionStart;
    }
    this.insertAtCursor(dom,val);
    dom.focus();
    console.log(posLen)
    dom.setSelectionRange(dom.value.length,cursorPosition + (posLen || val.length));
}

/*光标所在位置插入字符*/
insertAtCursor(dom, val) {
    if (document.selection){
        dom.focus();
        sel = document.selection.createRange();
        sel.text = val;
        sel.select();
    }else if (dom.selectionStart || dom.selectionStart == '0'){
        let startPos = dom.selectionStart;
        let endPos = dom.selectionEnd;
        let restoreTop = dom.scrollTop;
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);
        if (restoreTop > 0){
            dom.scrollTop = restoreTop;
        }
        dom.focus();
        dom.selectionStart = startPos + val.length;
        dom.selectionEnd = startPos + val.length;
    } else {
        dom.value += val;
        dom.focus();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/*获取网址参数*/</span>
getURL(name){
    <span class="hljs-built_in">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span>+ name +<span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
    <span class="hljs-built_in">var</span> r = <span class="hljs-built_in">decodeURI</span>(<span class="hljs-built_in">window</span>.location.search).substr(<span class="hljs-number">1</span>).match(reg);
    <span class="hljs-keyword">if</span>(r!=<span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>  r[<span class="hljs-number">2</span>]; <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">/*获取全部url参数,并转换成json对象*/</span>
getUrlAllParams (<span class="hljs-built_in">url</span>) {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">url</span> ? <span class="hljs-attribute">url</span> : <span class="hljs-built_in">window</span>.location.href;
    <span class="hljs-built_in">var</span> _pa = <span class="hljs-built_in">url</span>.substring(<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">'?'</span>) + <span class="hljs-number">1</span>),
        _arrS = _pa.split(<span class="hljs-string">'&amp;'</span>),
        _rs = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>, _len = _arrS.length; i &lt; _len; i++) {
        <span class="hljs-built_in">var</span> pos = _arrS[i].indexOf(<span class="hljs-string">'='</span>);
        <span class="hljs-keyword">if</span> (pos == <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">continue</span>;
        }
        <span class="hljs-built_in">var</span> name = _arrS[i].substring(<span class="hljs-number">0</span>, pos),
            value = <span class="hljs-built_in">window</span>.decodeURIComponent(_arrS[i].substring(pos + <span class="hljs-number">1</span>));
        _rs[name] = value;
    }
    <span class="hljs-keyword">return</span> _rs;
}

<span class="hljs-comment">/*删除url指定参数，返回url*/</span>
delParamsUrl(<span class="hljs-built_in">url</span>, name){
    <span class="hljs-built_in">var</span> baseUrl = <span class="hljs-built_in">url</span>.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">0</span>] + <span class="hljs-string">'?'</span>;
    <span class="hljs-built_in">var</span> query = <span class="hljs-built_in">url</span>.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">if</span> (query.indexOf(name)&gt;<span class="hljs-number">-1</span>) {
        <span class="hljs-built_in">var</span> obj = {}
        <span class="hljs-built_in">var</span> arr = query.split(<span class="hljs-string">"&amp;"</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
            arr[i] = arr[i].split(<span class="hljs-string">"="</span>);
            obj[arr[i][<span class="hljs-number">0</span>]] = arr[i][<span class="hljs-number">1</span>];
        };
        <span class="hljs-keyword">delete</span> obj[name];
        <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = baseUrl + <span class="hljs-built_in">JSON</span>.stringify(obj).replace(<span class="hljs-regexp">/[\"\{\}]/g</span>,<span class="hljs-string">""</span>).replace(<span class="hljs-regexp">/\:/g</span>,<span class="hljs-string">"="</span>).replace(<span class="hljs-regexp">/\,/g</span>,<span class="hljs-string">"&amp;"</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">url</span>
    }<span class="hljs-title">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">url</span>;
    }
}

<span class="hljs-comment">/*获取十六进制随机颜色*/</span>
getRandomColor () {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'#'</span> + (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">7</span> - h.length).join(<span class="hljs-string">"0"</span>) + h;
    })((<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">0x1000000</span> &lt;&lt; <span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>));
}

<span class="hljs-comment">/*图片加载*/</span>
imgLoadAll(arr,callback){
    <span class="hljs-built_in">var</span> arrImg = []; 
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-built_in">var</span> img = <span class="hljs-keyword">new</span> Image();
        img.src = arr[i];
        img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            arrImg.push(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">if</span> (arrImg.length == arr.length) {
                callback &amp;&amp; callback();
            }
        }
    }
}

<span class="hljs-comment">/*音频加载*/</span>
loadAudio(src, callback) {
    <span class="hljs-built_in">var</span> audio = <span class="hljs-keyword">new</span> Audio(src);
    audio.onloadedmetadata = callback;
    audio.src = src;
}

<span class="hljs-comment">/*DOM转字符串*/</span>
domToStirng(htmlDOM){
    <span class="hljs-built_in">var</span> div= <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
    div.appendChild(htmlDOM);
    <span class="hljs-keyword">return</span> div.innerHTML
}

<span class="hljs-comment">/*字符串转DOM*/</span>
stringToDom(htmlString){
    <span class="hljs-built_in">var</span> div= <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"div"</span>);
    div.innerHTML=htmlString;
    <span class="hljs-keyword">return</span> div.children[<span class="hljs-number">0</span>];
}


<span class="hljs-comment">/**
 * 光标所在位置插入字符，并设置光标位置
 * 
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */</span>
setCursorPosition (dom,val,posLen) {
    <span class="hljs-built_in">var</span> cursorPosition = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span>(dom.selectionStart){
        cursorPosition = dom.selectionStart;
    }
    <span class="hljs-keyword">this</span>.insertAtCursor(dom,val);
    dom.focus();
    <span class="hljs-built_in">console</span>.log(posLen)
    dom.setSelectionRange(dom.value.length,cursorPosition + (posLen || val.length));
}

<span class="hljs-comment">/*光标所在位置插入字符*/</span>
insertAtCursor(dom, val) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.selection){
        dom.focus();
        sel = <span class="hljs-built_in">document</span>.selection.createRange();
        sel.text = val;
        sel.select();
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dom.selectionStart || dom.selectionStart == <span class="hljs-string">'0'</span>){
        <span class="hljs-keyword">let</span> startPos = dom.selectionStart;
        <span class="hljs-keyword">let</span> endPos = dom.selectionEnd;
        <span class="hljs-keyword">let</span> restoreTop = dom.scrollTop;
        dom.value = dom.value.substring(<span class="hljs-number">0</span>, startPos) + val + dom.value.substring(endPos, dom.value.length);
        <span class="hljs-keyword">if</span> (restoreTop &gt; <span class="hljs-number">0</span>){
            dom.scrollTop = restoreTop;
        }
        dom.focus();
        dom.selectionStart = startPos + val.length;
        dom.selectionEnd = startPos + val.length;
    } <span class="hljs-title">else</span> {
        dom.value += val;
        dom.focus();
    }
}</code></pre>
<h2 id="articleHeader11">CSS</h2>
<h3 id="articleHeader12">1. pc-reset PC样式初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* normalize.css */

html {
  line-height: 1.15;
  /* 1 */
  -ms-text-size-adjust: 100%;
  /* 2 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

body {
  margin: 0;
}

article,
aside,
footer,
header,
nav,
section {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

figcaption,
figure,
main {
  /* 1 */
  display: block;
}

figure {
  margin: 1em 40px;
}

hr {
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

a {
  background-color: transparent;
  /* 1 */
  -webkit-text-decoration-skip: objects;
  /* 2 */
}

abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  text-decoration: underline dotted;
  /* 2 */
}

b,
strong {
  font-weight: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

dfn {
  font-style: italic;
}

mark {
  background-color: #ff0;
  color: #000;
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

audio,
video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

button,
input,
optgroup,
select,
textarea {
  font-family: sans-serif;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

button,
input {
  /* 1 */
  overflow: visible;
}

button,
select {
  /* 1 */
  text-transform: none;
}

button,
html [type=&quot;button&quot;],

/* 1 */

[type=&quot;reset&quot;],
[type=&quot;submit&quot;] {
  -webkit-appearance: button;
  /* 2 */
}

button::-moz-focus-inner,
[type=&quot;button&quot;]::-moz-focus-inner,
[type=&quot;reset&quot;]::-moz-focus-inner,
[type=&quot;submit&quot;]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type=&quot;button&quot;]:-moz-focusring,
[type=&quot;reset&quot;]:-moz-focusring,
[type=&quot;submit&quot;]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

progress {
  display: inline-block;
  /* 1 */
  vertical-align: baseline;
  /* 2 */
}

textarea {
  overflow: auto;
}

[type=&quot;checkbox&quot;],
[type=&quot;radio&quot;] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

[type=&quot;number&quot;]::-webkit-inner-spin-button,
[type=&quot;number&quot;]::-webkit-outer-spin-button {
  height: auto;
}

[type=&quot;search&quot;] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

[type=&quot;search&quot;]::-webkit-search-cancel-button,
[type=&quot;search&quot;]::-webkit-search-decoration {
  -webkit-appearance: none;
}

 ::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

details,

/* 1 */

menu {
  display: block;
}

summary {
  display: list-item;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}


/* reset */

html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* normalize.css */</span>

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.15</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">-ms-text-size-adjust</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">-webkit-text-size-adjust</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">article</span>,
<span class="hljs-selector-tag">aside</span>,
<span class="hljs-selector-tag">footer</span>,
<span class="hljs-selector-tag">header</span>,
<span class="hljs-selector-tag">nav</span>,
<span class="hljs-selector-tag">section</span> {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.67em</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">figcaption</span>,
<span class="hljs-selector-tag">figure</span>,
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">figure</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-tag">hr</span> {
  <span class="hljs-attribute">box-sizing</span>: content-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">overflow</span>: visible;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">pre</span> {
  <span class="hljs-attribute">font-family</span>: monospace, monospace;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">background-color</span>: transparent;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">-webkit-text-decoration-skip</span>: objects;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">abbr</span><span class="hljs-selector-attr">[title]</span> {
  <span class="hljs-attribute">border-bottom</span>: none;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">text-decoration</span>: underline;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">text-decoration</span>: underline dotted;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">b</span>,
<span class="hljs-selector-tag">strong</span> {
  <span class="hljs-attribute">font-weight</span>: inherit;
}

<span class="hljs-selector-tag">b</span>,
<span class="hljs-selector-tag">strong</span> {
  <span class="hljs-attribute">font-weight</span>: bolder;
}

<span class="hljs-selector-tag">code</span>,
<span class="hljs-selector-tag">kbd</span>,
<span class="hljs-selector-tag">samp</span> {
  <span class="hljs-attribute">font-family</span>: monospace, monospace;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">dfn</span> {
  <span class="hljs-attribute">font-style</span>: italic;
}

<span class="hljs-selector-tag">mark</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff0</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}

<span class="hljs-selector-tag">small</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">80%</span>;
}

<span class="hljs-selector-tag">sub</span>,
<span class="hljs-selector-tag">sup</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">75%</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">vertical-align</span>: baseline;
}

<span class="hljs-selector-tag">sub</span> {
  <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">0.25em</span>;
}

<span class="hljs-selector-tag">sup</span> {
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.5em</span>;
}

<span class="hljs-selector-tag">audio</span>,
<span class="hljs-selector-tag">video</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}

<span class="hljs-selector-tag">audio</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[controls]</span>) {
  <span class="hljs-attribute">display</span>: none;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">border-style</span>: none;
}

<span class="hljs-selector-tag">svg</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:root)</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">optgroup</span>,
<span class="hljs-selector-tag">select</span>,
<span class="hljs-selector-tag">textarea</span> {
  <span class="hljs-attribute">font-family</span>: sans-serif;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.15</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">input</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">overflow</span>: visible;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">select</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">text-transform</span>: none;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">html</span> <span class="hljs-selector-attr">[type="button"]</span>,

<span class="hljs-comment">/* 1 */</span>

<span class="hljs-selector-attr">[type="reset"]</span>,
<span class="hljs-selector-attr">[type="submit"]</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: button;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="button"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="reset"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="submit"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span> {
  <span class="hljs-attribute">border-style</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="button"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="reset"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="submit"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span> {
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">1px</span> dotted ButtonText;
}

<span class="hljs-selector-tag">fieldset</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.35em</span> <span class="hljs-number">0.75em</span> <span class="hljs-number">0.625em</span>;
}

<span class="hljs-selector-tag">legend</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">color</span>: inherit;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 3 */</span>
  <span class="hljs-attribute">white-space</span>: normal;
  <span class="hljs-comment">/* 1 */</span>
}

<span class="hljs-selector-tag">progress</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">vertical-align</span>: baseline;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">textarea</span> {
  <span class="hljs-attribute">overflow</span>: auto;
}

<span class="hljs-selector-attr">[type="checkbox"]</span>,
<span class="hljs-selector-attr">[type="radio"]</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-attr">[type="number"]</span><span class="hljs-selector-pseudo">::-webkit-inner-spin-button</span>,
<span class="hljs-selector-attr">[type="number"]</span><span class="hljs-selector-pseudo">::-webkit-outer-spin-button</span> {
  <span class="hljs-attribute">height</span>: auto;
}

<span class="hljs-selector-attr">[type="search"]</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: textfield;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">outline-offset</span>: -<span class="hljs-number">2px</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-cancel-button</span>,
<span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-decoration</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: none;
}

 <span class="hljs-selector-pseudo">::-webkit-file-upload-button</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: button;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font</span>: inherit;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">details</span>,

<span class="hljs-comment">/* 1 */</span>

<span class="hljs-selector-tag">menu</span> {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">summary</span> {
  <span class="hljs-attribute">display</span>: list-item;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}

<span class="hljs-selector-tag">template</span> {
  <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-selector-attr">[hidden]</span> {
  <span class="hljs-attribute">display</span>: none;
}


<span class="hljs-comment">/* reset */</span>

<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-tag">h3</span>,
<span class="hljs-selector-tag">h4</span>,
<span class="hljs-selector-tag">h5</span>,
<span class="hljs-selector-tag">h6</span>,
<span class="hljs-selector-tag">div</span>,
<span class="hljs-selector-tag">dl</span>,
<span class="hljs-selector-tag">dt</span>,
<span class="hljs-selector-tag">dd</span>,
<span class="hljs-selector-tag">ul</span>,
<span class="hljs-selector-tag">ol</span>,
<span class="hljs-selector-tag">li</span>,
<span class="hljs-selector-tag">p</span>,
<span class="hljs-selector-tag">blockquote</span>,
<span class="hljs-selector-tag">pre</span>,
<span class="hljs-selector-tag">hr</span>,
<span class="hljs-selector-tag">figure</span>,
<span class="hljs-selector-tag">table</span>,
<span class="hljs-selector-tag">caption</span>,
<span class="hljs-selector-tag">th</span>,
<span class="hljs-selector-tag">td</span>,
<span class="hljs-selector-tag">form</span>,
<span class="hljs-selector-tag">fieldset</span>,
<span class="hljs-selector-tag">legend</span>,
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">textarea</span>,
<span class="hljs-selector-tag">menu</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
</code></pre>
<h3 id="articleHeader13">2. Phone-reset</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* normalize.css */

html {
  line-height: 1.15;
  /* 1 */
  -ms-text-size-adjust: 100%;
  /* 2 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

body {
  margin: 0;
}

article,
aside,
footer,
header,
nav,
section {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

figcaption,
figure,
main {
  /* 1 */
  display: block;
}

figure {
  margin: 1em 40px;
}

hr {
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

a {
  background-color: transparent;
  /* 1 */
  -webkit-text-decoration-skip: objects;
  /* 2 */
}

abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  text-decoration: underline dotted;
  /* 2 */
}

b,
strong {
  font-weight: inherit;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

dfn {
  font-style: italic;
}

mark {
  background-color: #ff0;
  color: #000;
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

audio,
video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

button,
input,
optgroup,
select,
textarea {
  font-family: sans-serif;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

button,
input {
  /* 1 */
  overflow: visible;
}

button,
select {
  /* 1 */
  text-transform: none;
}

button,
html [type=&quot;button&quot;],

/* 1 */

[type=&quot;reset&quot;],
[type=&quot;submit&quot;] {
  -webkit-appearance: button;
  /* 2 */
}

button::-moz-focus-inner,
[type=&quot;button&quot;]::-moz-focus-inner,
[type=&quot;reset&quot;]::-moz-focus-inner,
[type=&quot;submit&quot;]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type=&quot;button&quot;]:-moz-focusring,
[type=&quot;reset&quot;]:-moz-focusring,
[type=&quot;submit&quot;]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

progress {
  display: inline-block;
  /* 1 */
  vertical-align: baseline;
  /* 2 */
}

textarea {
  overflow: auto;
}

[type=&quot;checkbox&quot;],
[type=&quot;radio&quot;] {
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

[type=&quot;number&quot;]::-webkit-inner-spin-button,
[type=&quot;number&quot;]::-webkit-outer-spin-button {
  height: auto;
}

[type=&quot;search&quot;] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

[type=&quot;search&quot;]::-webkit-search-cancel-button,
[type=&quot;search&quot;]::-webkit-search-decoration {
  -webkit-appearance: none;
}

 ::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

details,

/* 1 */

menu {
  display: block;
}

summary {
  display: list-item;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}


/* reset */

html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
div,
dl,
dt,
dd,
ul,
ol,
li,
p,
blockquote,
pre,
hr,
figure,
table,
caption,
th,
td,
form,
fieldset,
legend,
input,
button,
textarea,
menu {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  /* 禁止选中文本 */
  -webkit-user-select: none;
  user-select: none;
  font: Oswald, 'Open Sans', Helvetica, Arial, sans-serif
}


/* 禁止长按链接与图片弹出菜单 */

a,
img {
  -webkit-touch-callout: none;
}


/*ios android去除自带阴影的样式*/

a,
input {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

input[type=&quot;text&quot;] {
  -webkit-appearance: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* normalize.css */</span>

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.15</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">-ms-text-size-adjust</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">-webkit-text-size-adjust</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">article</span>,
<span class="hljs-selector-tag">aside</span>,
<span class="hljs-selector-tag">footer</span>,
<span class="hljs-selector-tag">header</span>,
<span class="hljs-selector-tag">nav</span>,
<span class="hljs-selector-tag">section</span> {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">h1</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0.67em</span> <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">figcaption</span>,
<span class="hljs-selector-tag">figure</span>,
<span class="hljs-selector-tag">main</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">figure</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">1em</span> <span class="hljs-number">40px</span>;
}

<span class="hljs-selector-tag">hr</span> {
  <span class="hljs-attribute">box-sizing</span>: content-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">overflow</span>: visible;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">pre</span> {
  <span class="hljs-attribute">font-family</span>: monospace, monospace;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">background-color</span>: transparent;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">-webkit-text-decoration-skip</span>: objects;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">abbr</span><span class="hljs-selector-attr">[title]</span> {
  <span class="hljs-attribute">border-bottom</span>: none;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">text-decoration</span>: underline;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">text-decoration</span>: underline dotted;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">b</span>,
<span class="hljs-selector-tag">strong</span> {
  <span class="hljs-attribute">font-weight</span>: inherit;
}

<span class="hljs-selector-tag">b</span>,
<span class="hljs-selector-tag">strong</span> {
  <span class="hljs-attribute">font-weight</span>: bolder;
}

<span class="hljs-selector-tag">code</span>,
<span class="hljs-selector-tag">kbd</span>,
<span class="hljs-selector-tag">samp</span> {
  <span class="hljs-attribute">font-family</span>: monospace, monospace;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1em</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">dfn</span> {
  <span class="hljs-attribute">font-style</span>: italic;
}

<span class="hljs-selector-tag">mark</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ff0</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}

<span class="hljs-selector-tag">small</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">80%</span>;
}

<span class="hljs-selector-tag">sub</span>,
<span class="hljs-selector-tag">sup</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">75%</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">vertical-align</span>: baseline;
}

<span class="hljs-selector-tag">sub</span> {
  <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">0.25em</span>;
}

<span class="hljs-selector-tag">sup</span> {
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">0.5em</span>;
}

<span class="hljs-selector-tag">audio</span>,
<span class="hljs-selector-tag">video</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}

<span class="hljs-selector-tag">audio</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-attr">[controls]</span>) {
  <span class="hljs-attribute">display</span>: none;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">border-style</span>: none;
}

<span class="hljs-selector-tag">svg</span><span class="hljs-selector-pseudo">:not(</span><span class="hljs-selector-pseudo">:root)</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">optgroup</span>,
<span class="hljs-selector-tag">select</span>,
<span class="hljs-selector-tag">textarea</span> {
  <span class="hljs-attribute">font-family</span>: sans-serif;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.15</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">input</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">overflow</span>: visible;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">select</span> {
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">text-transform</span>: none;
}

<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">html</span> <span class="hljs-selector-attr">[type="button"]</span>,

<span class="hljs-comment">/* 1 */</span>

<span class="hljs-selector-attr">[type="reset"]</span>,
<span class="hljs-selector-attr">[type="submit"]</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: button;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="button"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="reset"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span>,
<span class="hljs-selector-attr">[type="submit"]</span><span class="hljs-selector-pseudo">::-moz-focus-inner</span> {
  <span class="hljs-attribute">border-style</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="button"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="reset"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span>,
<span class="hljs-selector-attr">[type="submit"]</span><span class="hljs-selector-pseudo">:-moz-focusring</span> {
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">1px</span> dotted ButtonText;
}

<span class="hljs-selector-tag">fieldset</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.35em</span> <span class="hljs-number">0.75em</span> <span class="hljs-number">0.625em</span>;
}

<span class="hljs-selector-tag">legend</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">color</span>: inherit;
  <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 3 */</span>
  <span class="hljs-attribute">white-space</span>: normal;
  <span class="hljs-comment">/* 1 */</span>
}

<span class="hljs-selector-tag">progress</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">vertical-align</span>: baseline;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">textarea</span> {
  <span class="hljs-attribute">overflow</span>: auto;
}

<span class="hljs-selector-attr">[type="checkbox"]</span>,
<span class="hljs-selector-attr">[type="radio"]</span> {
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-attr">[type="number"]</span><span class="hljs-selector-pseudo">::-webkit-inner-spin-button</span>,
<span class="hljs-selector-attr">[type="number"]</span><span class="hljs-selector-pseudo">::-webkit-outer-spin-button</span> {
  <span class="hljs-attribute">height</span>: auto;
}

<span class="hljs-selector-attr">[type="search"]</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: textfield;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">outline-offset</span>: -<span class="hljs-number">2px</span>;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-cancel-button</span>,
<span class="hljs-selector-attr">[type="search"]</span><span class="hljs-selector-pseudo">::-webkit-search-decoration</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: none;
}

 <span class="hljs-selector-pseudo">::-webkit-file-upload-button</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: button;
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">font</span>: inherit;
  <span class="hljs-comment">/* 2 */</span>
}

<span class="hljs-selector-tag">details</span>,

<span class="hljs-comment">/* 1 */</span>

<span class="hljs-selector-tag">menu</span> {
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-tag">summary</span> {
  <span class="hljs-attribute">display</span>: list-item;
}

<span class="hljs-selector-tag">canvas</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}

<span class="hljs-selector-tag">template</span> {
  <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-selector-attr">[hidden]</span> {
  <span class="hljs-attribute">display</span>: none;
}


<span class="hljs-comment">/* reset */</span>

<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span>,
<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-tag">h3</span>,
<span class="hljs-selector-tag">h4</span>,
<span class="hljs-selector-tag">h5</span>,
<span class="hljs-selector-tag">h6</span>,
<span class="hljs-selector-tag">div</span>,
<span class="hljs-selector-tag">dl</span>,
<span class="hljs-selector-tag">dt</span>,
<span class="hljs-selector-tag">dd</span>,
<span class="hljs-selector-tag">ul</span>,
<span class="hljs-selector-tag">ol</span>,
<span class="hljs-selector-tag">li</span>,
<span class="hljs-selector-tag">p</span>,
<span class="hljs-selector-tag">blockquote</span>,
<span class="hljs-selector-tag">pre</span>,
<span class="hljs-selector-tag">hr</span>,
<span class="hljs-selector-tag">figure</span>,
<span class="hljs-selector-tag">table</span>,
<span class="hljs-selector-tag">caption</span>,
<span class="hljs-selector-tag">th</span>,
<span class="hljs-selector-tag">td</span>,
<span class="hljs-selector-tag">form</span>,
<span class="hljs-selector-tag">fieldset</span>,
<span class="hljs-selector-tag">legend</span>,
<span class="hljs-selector-tag">input</span>,
<span class="hljs-selector-tag">button</span>,
<span class="hljs-selector-tag">textarea</span>,
<span class="hljs-selector-tag">menu</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}

<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-comment">/* 禁止选中文本 */</span>
  <span class="hljs-attribute">-webkit-user-select</span>: none;
  <span class="hljs-attribute">user-select</span>: none;
  <span class="hljs-attribute">font</span>: Oswald, <span class="hljs-string">'Open Sans'</span>, Helvetica, Arial, sans-serif
}


<span class="hljs-comment">/* 禁止长按链接与图片弹出菜单 */</span>

<span class="hljs-selector-tag">a</span>,
<span class="hljs-selector-tag">img</span> {
  <span class="hljs-attribute">-webkit-touch-callout</span>: none;
}


<span class="hljs-comment">/*ios android去除自带阴影的样式*/</span>

<span class="hljs-selector-tag">a</span>,
<span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0);
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type="text"]</span> {
  <span class="hljs-attribute">-webkit-appearance</span>: none;
}</code></pre>
<h3 id="articleHeader14">3. 公共样式提取</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 禁止选中文本 */
.usn{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
}
/* 浮动 */
.fl { float: left; }
.fr { float: right; }
.cf { zoom: 1; }
.cf:after {
    content:&quot;.&quot;;
    display:block;
    clear:both;
    visibility:hidden;
    height:0;
    overflow:hidden;
}

/* 元素类型 */
.db { display: block; }
.dn { display: none; }
.di { display: inline }
.dib {display: inline-block;}
.transparent { opacity: 0 }


/*文字排版、颜色*/
.f12 { font-size:12px }
.f14 { font-size:14px }
.f16 { font-size:16px }
.f18 { font-size:18px }
.f20 { font-size:20px }
.fb { font-weight:bold }
.fn { font-weight:normal }
.t2 { text-indent:2em }
.red,a.red { color:#cc0031 }
.darkblue,a.darkblue { color:#039 }
.gray,a.gray { color:#878787 }
.lh150 { line-height:150% }
.lh180 { line-height:180% }
.lh200 { line-height:200% }
.unl { text-decoration:underline; }
.no_unl { text-decoration:none; }
.tl { text-align: left; }
.tc { text-align: center; }
.tr { text-align: right; }
.tj { text-align: justify; text-justify: inter-ideograph; }
.wn { /* 强制不换行 */
    word-wrap:normal;
    white-space:nowrap;
}
.wb { /* 强制换行 */
    white-space:normal;
    word-wrap:break-word;
    word-break:break-all;
}
.wp { /* 保持空白序列*/
    overflow:hidden;text-align:left;white-space:pre-wrap;word-wrap:break-word;word-break:break-all;
}
.wes { /* 多出部分用省略号表示 , 用于一行 */
    overflow:hidden;
    word-wrap:normal;
    white-space:nowrap;
    text-overflow:ellipsis;
}
.wes-2 { /* 适用于webkit内核和移动端 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
} 
.wes-3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
.wes-4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

/* 溢出样式 */
.ofh { overflow: hidden; }
.ofs {overflow: scroll; }
.ofa {overflow: auto; }
.ofv {overflow: visible; }

/* 定位方式 */
.ps {position: static; }
.pr {position: relative;zoom:1; }
.pa {position: absolute; }
.pf {position: fixed; }


/* 垂直对齐方式 */
.vt {vertical-align: top; }
.vm {vertical-align: middle; }
.vb {vertical-align: bottom; }


/* 鼠标样式 */
.csd {cursor: default; }
.csp {cursor: pointer; }
.csh {cursor: help; }
.csm {cursor: move; }

/* flex布局 */
.df-sb {
    display:flex;
    align-items: center;
    justify-content: space-between;
}
.df-sa {
    display:flex;
    align-items: center;
    justify-content: space-around;
}

/* 垂直居中 */
.df-c {
    display: flex;
    align-items: center;
    justify-content: center;
}
.tb-c {
    text-align:center;
    display:table-cell;
    vertical-align:middle;
}
.ts-c {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
}
.ts-mc {
    position: absolute;
    left: 0;right: 0;
    bottom: 0; top: 0;
    margin: auto;
}

/* 辅助 */
.mask-fixed-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left:0;top:0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 999;
}
.bg-cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.bg-cover-all {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 禁止选中文本 */</span>
<span class="hljs-selector-class">.usn</span>{
    <span class="hljs-attribute">-webkit-user-select</span>:none;
    <span class="hljs-attribute">-moz-user-select</span>:none;
    <span class="hljs-attribute">-ms-user-select</span>:none;
    <span class="hljs-attribute">-o-user-select</span>:none;
    <span class="hljs-attribute">user-select</span>:none;
}
<span class="hljs-comment">/* 浮动 */</span>
<span class="hljs-selector-class">.fl</span> { <span class="hljs-attribute">float</span>: left; }
<span class="hljs-selector-class">.fr</span> { <span class="hljs-attribute">float</span>: right; }
<span class="hljs-selector-class">.cf</span> { <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>; }
<span class="hljs-selector-class">.cf</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>:<span class="hljs-string">"."</span>;
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">clear</span>:both;
    <span class="hljs-attribute">visibility</span>:hidden;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>:hidden;
}

<span class="hljs-comment">/* 元素类型 */</span>
<span class="hljs-selector-class">.db</span> { <span class="hljs-attribute">display</span>: block; }
<span class="hljs-selector-class">.dn</span> { <span class="hljs-attribute">display</span>: none; }
<span class="hljs-selector-class">.di</span> { <span class="hljs-attribute">display</span>: inline }
<span class="hljs-selector-class">.dib</span> {<span class="hljs-attribute">display</span>: inline-block;}
<span class="hljs-selector-class">.transparent</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span> }


<span class="hljs-comment">/*文字排版、颜色*/</span>
<span class="hljs-selector-class">.f12</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span> }
<span class="hljs-selector-class">.f14</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">14px</span> }
<span class="hljs-selector-class">.f16</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span> }
<span class="hljs-selector-class">.f18</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span> }
<span class="hljs-selector-class">.f20</span> { <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span> }
<span class="hljs-selector-class">.fb</span> { <span class="hljs-attribute">font-weight</span>:bold }
<span class="hljs-selector-class">.fn</span> { <span class="hljs-attribute">font-weight</span>:normal }
<span class="hljs-selector-class">.t2</span> { <span class="hljs-attribute">text-indent</span>:<span class="hljs-number">2em</span> }
<span class="hljs-selector-class">.red</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.red</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#cc0031</span> }
<span class="hljs-selector-class">.darkblue</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.darkblue</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#039</span> }
<span class="hljs-selector-class">.gray</span>,<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.gray</span> { <span class="hljs-attribute">color</span>:<span class="hljs-number">#878787</span> }
<span class="hljs-selector-class">.lh150</span> { <span class="hljs-attribute">line-height</span>:<span class="hljs-number">150%</span> }
<span class="hljs-selector-class">.lh180</span> { <span class="hljs-attribute">line-height</span>:<span class="hljs-number">180%</span> }
<span class="hljs-selector-class">.lh200</span> { <span class="hljs-attribute">line-height</span>:<span class="hljs-number">200%</span> }
<span class="hljs-selector-class">.unl</span> { <span class="hljs-attribute">text-decoration</span>:underline; }
<span class="hljs-selector-class">.no_unl</span> { <span class="hljs-attribute">text-decoration</span>:none; }
<span class="hljs-selector-class">.tl</span> { <span class="hljs-attribute">text-align</span>: left; }
<span class="hljs-selector-class">.tc</span> { <span class="hljs-attribute">text-align</span>: center; }
<span class="hljs-selector-class">.tr</span> { <span class="hljs-attribute">text-align</span>: right; }
<span class="hljs-selector-class">.tj</span> { <span class="hljs-attribute">text-align</span>: justify; <span class="hljs-attribute">text-justify</span>: inter-ideograph; }
<span class="hljs-selector-class">.wn</span> { <span class="hljs-comment">/* 强制不换行 */</span>
    <span class="hljs-attribute">word-wrap</span>:normal;
    <span class="hljs-attribute">white-space</span>:nowrap;
}
<span class="hljs-selector-class">.wb</span> { <span class="hljs-comment">/* 强制换行 */</span>
    <span class="hljs-attribute">white-space</span>:normal;
    <span class="hljs-attribute">word-wrap</span>:break-word;
    <span class="hljs-attribute">word-break</span>:break-all;
}
<span class="hljs-selector-class">.wp</span> { <span class="hljs-comment">/* 保持空白序列*/</span>
    <span class="hljs-attribute">overflow</span>:hidden;<span class="hljs-attribute">text-align</span>:left;<span class="hljs-attribute">white-space</span>:pre-wrap;<span class="hljs-attribute">word-wrap</span>:break-word;<span class="hljs-attribute">word-break</span>:break-all;
}
<span class="hljs-selector-class">.wes</span> { <span class="hljs-comment">/* 多出部分用省略号表示 , 用于一行 */</span>
    <span class="hljs-attribute">overflow</span>:hidden;
    <span class="hljs-attribute">word-wrap</span>:normal;
    <span class="hljs-attribute">white-space</span>:nowrap;
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
}
<span class="hljs-selector-class">.wes-2</span> { <span class="hljs-comment">/* 适用于webkit内核和移动端 */</span>
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
} 
<span class="hljs-selector-class">.wes-3</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.wes-4</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">4</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}

<span class="hljs-comment">/* 溢出样式 */</span>
<span class="hljs-selector-class">.ofh</span> { <span class="hljs-attribute">overflow</span>: hidden; }
<span class="hljs-selector-class">.ofs</span> {<span class="hljs-attribute">overflow</span>: scroll; }
<span class="hljs-selector-class">.ofa</span> {<span class="hljs-attribute">overflow</span>: auto; }
<span class="hljs-selector-class">.ofv</span> {<span class="hljs-attribute">overflow</span>: visible; }

<span class="hljs-comment">/* 定位方式 */</span>
<span class="hljs-selector-class">.ps</span> {<span class="hljs-attribute">position</span>: static; }
<span class="hljs-selector-class">.pr</span> {<span class="hljs-attribute">position</span>: relative;<span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>; }
<span class="hljs-selector-class">.pa</span> {<span class="hljs-attribute">position</span>: absolute; }
<span class="hljs-selector-class">.pf</span> {<span class="hljs-attribute">position</span>: fixed; }


<span class="hljs-comment">/* 垂直对齐方式 */</span>
<span class="hljs-selector-class">.vt</span> {<span class="hljs-attribute">vertical-align</span>: top; }
<span class="hljs-selector-class">.vm</span> {<span class="hljs-attribute">vertical-align</span>: middle; }
<span class="hljs-selector-class">.vb</span> {<span class="hljs-attribute">vertical-align</span>: bottom; }


<span class="hljs-comment">/* 鼠标样式 */</span>
<span class="hljs-selector-class">.csd</span> {<span class="hljs-attribute">cursor</span>: default; }
<span class="hljs-selector-class">.csp</span> {<span class="hljs-attribute">cursor</span>: pointer; }
<span class="hljs-selector-class">.csh</span> {<span class="hljs-attribute">cursor</span>: help; }
<span class="hljs-selector-class">.csm</span> {<span class="hljs-attribute">cursor</span>: move; }

<span class="hljs-comment">/* flex布局 */</span>
<span class="hljs-selector-class">.df-sb</span> {
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.df-sa</span> {
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: space-around;
}

<span class="hljs-comment">/* 垂直居中 */</span>
<span class="hljs-selector-class">.df-c</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.tb-c</span> {
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">display</span>:table-cell;
    <span class="hljs-attribute">vertical-align</span>:middle;
}
<span class="hljs-selector-class">.ts-c</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}
<span class="hljs-selector-class">.ts-mc</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}

<span class="hljs-comment">/* 辅助 */</span>
<span class="hljs-selector-class">.mask-fixed-wrapper</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.65);
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">999</span>;
}
<span class="hljs-selector-class">.bg-cover</span> {
    <span class="hljs-attribute">background-size</span>: cover;
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-position</span>: center center;
}
<span class="hljs-selector-class">.bg-cover-all</span> {
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background-repeat</span>: no-repeat;
    <span class="hljs-attribute">background-position</span>: center center;
}</code></pre>
<hr>
<p><strong>以上都是经常用到的方法</strong></p>
<blockquote>
<a href="https://github.com/cd-dongzi/utils" rel="nofollow noreferrer" target="_blank">github地址</a><br><a href="http://dzblog.cn/article/5a6f48afad4db304be1e7a5f" rel="nofollow noreferrer" target="_blank">博客地址</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 总结（常用工具类的封装）

## 原文链接
[https://segmentfault.com/a/1190000013041329](https://segmentfault.com/a/1190000013041329)


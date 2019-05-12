---
title: 'javascript有用的代码片段' 
date: 2018-12-02 2:30:15
hidden: true
slug: 2ntopcgr63y
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript有用的代码片段</h2>
<h3 id="articleHeader1">小数取整</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = 1.234;
~~x    //1
x >>   //1
x | 0  //1
Math.floor(x)  //1

const y = -1.4;
x >>   //-1
Math.floor(y)   //-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> x = <span class="hljs-number">1.234</span>;
~~x    <span class="hljs-comment">//1</span>
x &gt;&gt;   <span class="hljs-comment">//1</span>
x | <span class="hljs-number">0</span>  <span class="hljs-comment">//1</span>
<span class="hljs-built_in">Math</span>.floor(x)  <span class="hljs-comment">//1</span>

<span class="hljs-keyword">const</span> y = <span class="hljs-number">-1.4</span>;
x &gt;&gt;   <span class="hljs-comment">//-1</span>
<span class="hljs-built_in">Math</span>.floor(y)   <span class="hljs-comment">//-2</span></code></pre>
<blockquote>按位运算符直接去掉小数，<code>Math.floor()</code>向下取整，返回的数小于等于原来的数。</blockquote>
<h3 id="articleHeader2">生成n位随机数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getRandom = n => Math.random().toString().slice(-n);
getRandom(6)   //6位随机数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> getRandom = <span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-built_in">Math</span>.random().toString().slice(-n);
getRandom(<span class="hljs-number">6</span>)   <span class="hljs-comment">//6位随机数</span></code></pre>
<h3 id="articleHeader3">生成16进制颜色</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colorCode = '#' +('00000' +(Math .random()* 0x1000000 << 0).toString(16)).slice(- 6);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> colorCode = <span class="hljs-string">'#'</span> +(<span class="hljs-string">'00000'</span> +(<span class="hljs-built_in">Math</span> .random()* <span class="hljs-number">0x1000000</span> &lt;&lt; <span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>)).slice(- <span class="hljs-number">6</span>);</code></pre>
<h3 id="articleHeader4">n到m间随机整数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let randomNum = (n,m) => Math.floor(Math.random()*(m-n) + n);
randomNum(2,10)   //2-10之间的整数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> randomNum = <span class="hljs-function">(<span class="hljs-params">n,m</span>) =&gt;</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*(m-n) + n);
randomNum(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>)   <span class="hljs-comment">//2-10之间的整数</span></code></pre>
<blockquote>生成n到m间的随机整数，不包括m，n和m可以为负数。</blockquote>
<h3 id="articleHeader5">驼峰命名转下划线</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let humpToUnderline = str => str.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase();
humpToUnderline('helloWorld');  //hello_world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> humpToUnderline = <span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> str.match(<span class="hljs-regexp">/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g</span>).join(<span class="hljs-string">'_'</span>).toLowerCase();
humpToUnderline(<span class="hljs-string">'helloWorld'</span>);  <span class="hljs-comment">//hello_world</span></code></pre>
<h3 id="articleHeader6">url参数转json</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let urlToJson = url => {
    let json = {};
    if (!!!url) return json;
    let data = url.split('?')[1] ? url.split('?')[1].split('&amp;') : [];
    for(let i=0; i<data.length; i++) {
        let k = data[i].split('=');
        k[0] &amp;&amp; (json[k[0]] = k[1] || '');
    }
    return json;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> urlToJson = <span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> json = {};
    <span class="hljs-keyword">if</span> (!!!url) <span class="hljs-keyword">return</span> json;
    <span class="hljs-keyword">let</span> data = url.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>] ? url.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>].split(<span class="hljs-string">'&amp;'</span>) : [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;data.length; i++) {
        <span class="hljs-keyword">let</span> k = data[i].split(<span class="hljs-string">'='</span>);
        k[<span class="hljs-number">0</span>] &amp;&amp; (json[k[<span class="hljs-number">0</span>]] = k[<span class="hljs-number">1</span>] || <span class="hljs-string">''</span>);
    }
    <span class="hljs-keyword">return</span> json;
}</code></pre>
<h3 id="articleHeader7">获取url中的参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let getUrlData = name => {
    let reg = new RegExp(&quot;(^|&amp;)&quot; + name + &quot;=([^&amp;]*)(&amp;|$)&quot;);
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> getUrlData = <span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span> + name + <span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
    <span class="hljs-keyword">let</span> r = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).match(reg);
    <span class="hljs-keyword">if</span> (r != <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-built_in">decodeURI</span>(r[<span class="hljs-number">2</span>]);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}</code></pre>
<h3 id="articleHeader8">n维数组转1维数组</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let flatten = arr => JSON.parse(`[${JSON.stringify(arr).replace(/\[|]/g, '')}]`);
let flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
let flatten = a => Array.isArray(a) ? [].concat(...a.map(flatten)) : a;

flatten([1,[2,3,[3,4],5])  //[1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> flatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-string">`[<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(arr).replace(<span class="hljs-regexp">/\[|]/g</span>, <span class="hljs-string">''</span>)}</span>]`</span>);
<span class="hljs-keyword">let</span> flatten = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> arr.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.concat(<span class="hljs-built_in">Array</span>.isArray(b) ? flatten(b) : b), []);
<span class="hljs-keyword">let</span> flatten = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">Array</span>.isArray(a) ? [].concat(...a.map(flatten)) : a;

flatten([<span class="hljs-number">1</span>,[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,[<span class="hljs-number">3</span>,<span class="hljs-number">4</span>],<span class="hljs-number">5</span>])  <span class="hljs-comment">//[1,2,3,4,5]</span></code></pre>
<h3 id="articleHeader9">n维数组展开成字符串</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,3,[4,[72,'a','d'],3,[6,'c'],d]];

arr+'';
arr.toString();
arr.join();
JSON.stringify(arr).replace(/\[|\]/g,'');

//'1,3,4,72,&quot;a&quot;,&quot;d&quot;,3,6,&quot;c&quot;'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,[<span class="hljs-number">4</span>,[<span class="hljs-number">72</span>,<span class="hljs-string">'a'</span>,<span class="hljs-string">'d'</span>],<span class="hljs-number">3</span>,[<span class="hljs-number">6</span>,<span class="hljs-string">'c'</span>],d]];

arr+<span class="hljs-string">''</span>;
arr.toString();
arr.join();
<span class="hljs-built_in">JSON</span>.stringify(arr).replace(<span class="hljs-regexp">/\[|\]/g</span>,<span class="hljs-string">''</span>);

<span class="hljs-comment">//'1,3,4,72,"a","d",3,6,"c"'</span></code></pre>
<h3 id="articleHeader10">时间格式化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//时间格式化
function format1(x, y) {
    let i = 0;
    var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
        console.log(++i);
        return ((v.length > 1 ? &quot;0&quot; : &quot;&quot;) + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
}

format1(new Date(), 'yyyy-MM-dd h:m:s');   //2018-01-22 9:38:10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//时间格式化</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">format1</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> z = {
        <span class="hljs-attr">y</span>: x.getFullYear(),
        <span class="hljs-attr">M</span>: x.getMonth() + <span class="hljs-number">1</span>,
        <span class="hljs-attr">d</span>: x.getDate(),
        <span class="hljs-attr">h</span>: x.getHours(),
        <span class="hljs-attr">m</span>: x.getMinutes(),
        <span class="hljs-attr">s</span>: x.getSeconds()
    };
    <span class="hljs-keyword">return</span> y.replace(<span class="hljs-regexp">/(y+|M+|d+|h+|m+|s+)/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
        <span class="hljs-built_in">console</span>.log(++i);
        <span class="hljs-keyword">return</span> ((v.length &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">"0"</span> : <span class="hljs-string">""</span>) + <span class="hljs-built_in">eval</span>(<span class="hljs-string">'z.'</span> + v.slice(<span class="hljs-number">-1</span>))).slice(-(v.length &gt; <span class="hljs-number">2</span> ? v.length : <span class="hljs-number">2</span>))
    });
}

format1(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">'yyyy-MM-dd h:m:s'</span>);   <span class="hljs-comment">//2018-01-22 9:38:10</span></code></pre>
<h3 id="articleHeader11">统计文字个数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//统计文字个数
function wordCount(data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  var m = data.match(pattern);
  var count = 0;
  if( m === null ) return count;
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

var text = '统计文字个数';
// console.log(wordCount(text)); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//统计文字个数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wordCount</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g</span>;
  <span class="hljs-keyword">var</span> m = data.match(pattern);
  <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span>( m === <span class="hljs-literal">null</span> ) <span class="hljs-keyword">return</span> count;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; m.length; i++) {
    <span class="hljs-keyword">if</span> (m[i].charCodeAt(<span class="hljs-number">0</span>) &gt;= <span class="hljs-number">0x4E00</span>) {
      count += m[i].length;
    } <span class="hljs-keyword">else</span> {
      count += <span class="hljs-number">1</span>;
    }
  }
  <span class="hljs-keyword">return</span> count;
}

<span class="hljs-keyword">var</span> text = <span class="hljs-string">'统计文字个数'</span>;
<span class="hljs-comment">// console.log(wordCount(text)); // 6</span></code></pre>
<h3 id="articleHeader12">格式化数字</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//法一
function formatNum (str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//法二
function formatNum (str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//法一</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNum</span> (<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/\B(?=(\d{3})+(?!\d))/g</span>, <span class="hljs-string">','</span>);
}

<span class="hljs-comment">//法二</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNum</span> (<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).reverse().reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, index</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> ((index % <span class="hljs-number">3</span>) ? next : (next + <span class="hljs-string">','</span>)) + prev
    })
}</code></pre>
<h3 id="articleHeader13">检测质数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPrime(n) {
    return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPrime</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">return</span> !(<span class="hljs-regexp">/^.?$|^(..+?)\1+$/</span>).test(<span class="hljs-string">'1'</span>.repeat(n))
}</code></pre>
<h3 id="articleHeader14">统计字符出现的次数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function strTimes (str) {
    return str.split('').reduce((p,n) => (p[n]++ || (p[n]=1) ,p), {});   
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">strTimes</span> (<span class="hljs-params">str</span>) </span>{
    <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).reduce(<span class="hljs-function">(<span class="hljs-params">p,n</span>) =&gt;</span> (p[n]++ || (p[n]=<span class="hljs-number">1</span>) ,p), {});   
}    </code></pre>
<h3 id="articleHeader15">评级</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let grade = rate => &quot;★★★★★☆☆☆☆☆&quot;.slice(5 - rate, 10 - rate);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> grade = <span class="hljs-function"><span class="hljs-params">rate</span> =&gt;</span> <span class="hljs-string">"★★★★★☆☆☆☆☆"</span>.slice(<span class="hljs-number">5</span> - rate, <span class="hljs-number">10</span> - rate);</code></pre>
<h3 id="articleHeader16">字符串类型的数字转数字</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = '1';
+a   //1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> a = <span class="hljs-string">'1'</span>;
+a   <span class="hljs-comment">//1;</span></code></pre>
<blockquote>
<code>+a</code> 可以理解为<code>Number(a)</code>，将一个变量转成数字。布尔值返回0或1，<code>undefined</code>返回<code>NaN</code>，数字直接返回，<code>null</code>返回0，对于字符串，将其转换为十进制数值，会忽略前面的0（16进制除外），空字符串返回0，浮点数会返回浮点数值。其他格式字符串（无论是否数字开头，返回NaN，字符串中好几个小数点，返回<code>NaN</code>。</blockquote>
<h3 id="articleHeader17">数组去重复</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...new Set(arr)]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[...new <span class="hljs-built_in">Set</span>(arr)]</code></pre>
<p>更多更详细的<a href="https://segmentfault.com/a/1190000014674987">数组去重方法</a>。</p>
<h3 id="articleHeader18">获取时间戳</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(new Date()).getTime();
(new Date).getTime();
new Date().getTime();
+new Date();
Date.now();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();
(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime();
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">Date</span>.now();</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript有用的代码片段

## 原文链接
[https://segmentfault.com/a/1190000014707962](https://segmentfault.com/a/1190000014707962)


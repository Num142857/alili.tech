---
title: 'JavaScript有用的代码片段和trick' 
date: 2018-12-28 2:30:11
hidden: true
slug: 0a8dns6i20pr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文内容来自知乎<a href="https://www.zhihu.com/question/46943112" rel="nofollow noreferrer" target="_blank">《有哪些短小却令人惊叹的 JavaScript 代码？》</a>和文章<a href="https://github.com/jawil/blog/issues/24" rel="nofollow noreferrer" target="_blank">《这些JavaScript编程黑科技，装逼指南，高逼格代码，让你惊叹不已》</a>，同时也汇集了部分网上其它来源的内容。</blockquote>
<h2 id="articleHeader0">浮点数取整</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const x = 123.4545;
x >> 0; // 123
~~x; // 123
x | 0; // 123
Math.floor(x); // 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> x = <span class="hljs-number">123.4545</span>;
x &gt;&gt; <span class="hljs-number">0</span>; <span class="hljs-comment">// 123</span>
~~x; <span class="hljs-comment">// 123</span>
x | <span class="hljs-number">0</span>; <span class="hljs-comment">// 123</span>
<span class="hljs-built_in">Math</span>.floor(x); <span class="hljs-comment">// 123</span></code></pre>
<blockquote>
<p>注意：前三种方法只适用于32个位整数，对于负数的处理上和<code>Math.floor</code>是不同的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Math.floor(-12.53); // -13
-12.53 | 0; // -12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">-12.53</span>); <span class="hljs-comment">// -13</span>
<span class="hljs-number">-12.53</span> | <span class="hljs-number">0</span>; <span class="hljs-comment">// -12</span></code></pre>
</blockquote>
<h2 id="articleHeader1">生成6位数字验证码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一
('000000' + Math.floor(Math.random() *  999999)).slice(-6);

// 方法二
Math.random().toString().slice(-6);

// 方法三
Math.random().toFixed(6).slice(-6);

// 方法四
'' + Math.floor(Math.random() * 999999);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法一</span>
(<span class="hljs-string">'000000'</span> + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() *  <span class="hljs-number">999999</span>)).slice(<span class="hljs-number">-6</span>);

<span class="hljs-comment">// 方法二</span>
<span class="hljs-built_in">Math</span>.random().toString().slice(<span class="hljs-number">-6</span>);

<span class="hljs-comment">// 方法三</span>
<span class="hljs-built_in">Math</span>.random().toFixed(<span class="hljs-number">6</span>).slice(<span class="hljs-number">-6</span>);

<span class="hljs-comment">// 方法四</span>
<span class="hljs-string">''</span> + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">999999</span>);</code></pre>
<h2 id="articleHeader2">16进制颜色代码生成</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  return '#'+('00000'+
    (Math.random()*0x1000000<<0).toString(16)).slice(-6);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'#'</span>+(<span class="hljs-string">'00000'</span>+
    (<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">0x1000000</span>&lt;&lt;<span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>)).slice(<span class="hljs-number">-6</span>);
})();</code></pre>
<h2 id="articleHeader3">驼峰命名转下划线</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'componentMapModelRegistry'.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase(); // component_map_model_registry" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'componentMapModelRegistry'</span>.match(<span class="hljs-regexp">/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g</span>).join(<span class="hljs-string">'_'</span>).toLowerCase(); <span class="hljs-comment">// component_map_model_registry</span></code></pre>
<h2 id="articleHeader4">url查询参数转json格式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6
const query = (search = '') => ((querystring = '') => (q => (querystring.split('&amp;').forEach(item => (kv => kv[0] &amp;&amp; (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1]);

// 对应ES5实现
var query = function(search) {
  if (search === void 0) { search = ''; }
  return (function(querystring) {
    if (querystring === void 0) { querystring = ''; }
    return (function(q) {
      return (querystring.split('&amp;').forEach(function(item) {
        return (function(kv) {
          return kv[0] &amp;&amp; (q[kv[0]] = kv[1]);
        })(item.split('='));
      }), q);
    })({});
  })(search.split('?')[1]);
};

query('?key1=value1&amp;key2=value2'); // es6.html:14 {key1: &quot;value1&quot;, key2: &quot;value2&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6</span>
<span class="hljs-keyword">const</span> query = <span class="hljs-function">(<span class="hljs-params">search = <span class="hljs-string">''</span></span>) =&gt;</span> (<span class="hljs-function">(<span class="hljs-params">querystring = <span class="hljs-string">''</span></span>) =&gt;</span> (<span class="hljs-function"><span class="hljs-params">q</span> =&gt;</span> (querystring.split(<span class="hljs-string">'&amp;'</span>).forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> (<span class="hljs-function"><span class="hljs-params">kv</span> =&gt;</span> kv[<span class="hljs-number">0</span>] &amp;&amp; (q[kv[<span class="hljs-number">0</span>]] = kv[<span class="hljs-number">1</span>]))(item.split(<span class="hljs-string">'='</span>))), q))({}))(search.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>]);

<span class="hljs-comment">// 对应ES5实现</span>
<span class="hljs-keyword">var</span> query = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">search</span>) </span>{
  <span class="hljs-keyword">if</span> (search === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) { search = <span class="hljs-string">''</span>; }
  <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">querystring</span>) </span>{
    <span class="hljs-keyword">if</span> (querystring === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) { querystring = <span class="hljs-string">''</span>; }
    <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">q</span>) </span>{
      <span class="hljs-keyword">return</span> (querystring.split(<span class="hljs-string">'&amp;'</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">return</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">kv</span>) </span>{
          <span class="hljs-keyword">return</span> kv[<span class="hljs-number">0</span>] &amp;&amp; (q[kv[<span class="hljs-number">0</span>]] = kv[<span class="hljs-number">1</span>]);
        })(item.split(<span class="hljs-string">'='</span>));
      }), q);
    })({});
  })(search.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>]);
};

query(<span class="hljs-string">'?key1=value1&amp;key2=value2'</span>); <span class="hljs-comment">// es6.html:14 {key1: "value1", key2: "value2"}</span></code></pre>
<h2 id="articleHeader5">获取URL参数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getQueryString(key){
  var reg = new RegExp(&quot;(^|&amp;)&quot;+ key +&quot;=([^&amp;]*)(&amp;|$)&quot;);
  var r = window.location.search.substr(1).match(reg);
  if(r!=null){
      return  unescape(r[2]);
  }
  return null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getQueryString</span>(<span class="hljs-params">key</span>)</span>{
  <span class="hljs-keyword">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^|&amp;)"</span>+ key +<span class="hljs-string">"=([^&amp;]*)(&amp;|$)"</span>);
  <span class="hljs-keyword">var</span> r = <span class="hljs-built_in">window</span>.location.search.substr(<span class="hljs-number">1</span>).match(reg);
  <span class="hljs-keyword">if</span>(r!=<span class="hljs-literal">null</span>){
      <span class="hljs-keyword">return</span>  <span class="hljs-built_in">unescape</span>(r[<span class="hljs-number">2</span>]);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}</code></pre>
<h2 id="articleHeader6">n维数组展开成一维数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = [1, [2, 3], ['4', 5, ['6',7,[8]]], [9], 10];

// 方法一
// 限制：数组项不能出现`,`，同时数组项全部变成了字符数字
foo.toString().split(','); // [&quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;, &quot;10&quot;]

// 方法二
// 转换后数组项全部变成数字了
eval('[' + foo + ']'); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 方法三，使用ES6展开操作符
// 写法太过麻烦，太过死板
[1, ...[2, 3], ...['4', 5, ...['6',7,...[8]]], ...[9], 10]; // [1, 2, 3, &quot;4&quot;, 5, &quot;6&quot;, 7, 8, 9, 10]

// 方法四
JSON.parse(`[${JSON.stringify(foo).replace(/\[|]/g, '')}]`); // [1, 2, 3, &quot;4&quot;, 5, &quot;6&quot;, 7, 8, 9, 10]

// 方法五
const flatten = (ary) => ary.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
flatten(foo); // [1, 2, 3, &quot;4&quot;, 5, &quot;6&quot;, 7, 8, 9, 10]

// 方法六
function flatten(a) {
  return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}
flatten(foo); // [1, 2, 3, &quot;4&quot;, 5, &quot;6&quot;, 7, 8, 9, 10]

// 方法七
var flatten = function(arr) {
  var result = [];
  var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
      var item = a[i];
      if (typeof item !== 'number') {
        yield * flat(item);
      } else {
        yield item;
      }
    }
  }

  for (var f of flat(arr)) {
    result.push(f);
  }

  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = [<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], [<span class="hljs-string">'4'</span>, <span class="hljs-number">5</span>, [<span class="hljs-string">'6'</span>,<span class="hljs-number">7</span>,[<span class="hljs-number">8</span>]]], [<span class="hljs-number">9</span>], <span class="hljs-number">10</span>];

<span class="hljs-comment">// 方法一</span>
<span class="hljs-comment">// 限制：数组项不能出现`,`，同时数组项全部变成了字符数字</span>
foo.toString().split(<span class="hljs-string">','</span>); <span class="hljs-comment">// ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]</span>

<span class="hljs-comment">// 方法二</span>
<span class="hljs-comment">// 转换后数组项全部变成数字了</span>
<span class="hljs-built_in">eval</span>(<span class="hljs-string">'['</span> + foo + <span class="hljs-string">']'</span>); <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>

<span class="hljs-comment">// 方法三，使用ES6展开操作符</span>
<span class="hljs-comment">// 写法太过麻烦，太过死板</span>
[<span class="hljs-number">1</span>, ...[<span class="hljs-number">2</span>, <span class="hljs-number">3</span>], ...[<span class="hljs-string">'4'</span>, <span class="hljs-number">5</span>, ...[<span class="hljs-string">'6'</span>,<span class="hljs-number">7</span>,...[<span class="hljs-number">8</span>]]], ...[<span class="hljs-number">9</span>], <span class="hljs-number">10</span>]; <span class="hljs-comment">// [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]</span>

<span class="hljs-comment">// 方法四</span>
<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-string">`[<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(foo).replace(<span class="hljs-regexp">/\[|]/g</span>, <span class="hljs-string">''</span>)}</span>]`</span>); <span class="hljs-comment">// [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]</span>

<span class="hljs-comment">// 方法五</span>
<span class="hljs-keyword">const</span> flatten = <span class="hljs-function">(<span class="hljs-params">ary</span>) =&gt;</span> ary.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.concat(<span class="hljs-built_in">Array</span>.isArray(b) ? flatten(b) : b), []);
flatten(foo); <span class="hljs-comment">// [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]</span>

<span class="hljs-comment">// 方法六</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flatten</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.isArray(a) ? [].concat(...a.map(flatten)) : a;
}
flatten(foo); <span class="hljs-comment">// [1, 2, 3, "4", 5, "6", 7, 8, 9, 10]</span>

<span class="hljs-comment">// 方法七</span>
<span class="hljs-keyword">var</span> flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">var</span> result = [];
  <span class="hljs-keyword">var</span> flat = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">var</span> length = a.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
      <span class="hljs-keyword">var</span> item = a[i];
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> item !== <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">yield</span> * flat(item);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">yield</span> item;
      }
    }
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> f <span class="hljs-keyword">of</span> flat(arr)) {
    result.push(f);
  }

  <span class="hljs-keyword">return</span> result;
}</code></pre>
<blockquote>注：更多方法请参考<a href="https://stackoverflow.com/questions/27266550/how-to-flatten-nested-array-in-javascript" rel="nofollow noreferrer" target="_blank">《How to flatten nested array in JavaScript?》</a>
</blockquote>
<h2 id="articleHeader7">日期格式化</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一
function format1(x, y) {
  var z = {
    y: x.getFullYear(),
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  };
  return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
    return ((v.length > 1 ? &quot;0&quot; : &quot;&quot;) + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
  });
}

format1(new Date(), 'yy-M-d h:m:s'); // 17-10-14 22:14:41

// 方法二
Date.prototype.format = function (fmt) { 
  var o = {
    &quot;M+&quot;: this.getMonth() + 1, //月份 
    &quot;d+&quot;: this.getDate(), //日 
    &quot;h+&quot;: this.getHours(), //小时 
    &quot;m+&quot;: this.getMinutes(), //分 
    &quot;s+&quot;: this.getSeconds(), //秒 
    &quot;q+&quot;: Math.floor((this.getMonth() + 3) / 3), //季度 
    &quot;S&quot;: this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + &quot;&quot;).substr(4 - RegExp.$1.length));
  } 
  for (var k in o){
    if (new RegExp(&quot;(&quot; + k + &quot;)&quot;).test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((&quot;00&quot; + o[k]).substr((&quot;&quot; + o[k]).length)));
    }
  }     
  return fmt;
}

new Date().format('yy-M-d h:m:s'); // 17-10-14 22:18:17" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法一</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">format1</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">var</span> z = {
    <span class="hljs-attr">y</span>: x.getFullYear(),
    <span class="hljs-attr">M</span>: x.getMonth() + <span class="hljs-number">1</span>,
    <span class="hljs-attr">d</span>: x.getDate(),
    <span class="hljs-attr">h</span>: x.getHours(),
    <span class="hljs-attr">m</span>: x.getMinutes(),
    <span class="hljs-attr">s</span>: x.getSeconds()
  };
  <span class="hljs-keyword">return</span> y.replace(<span class="hljs-regexp">/(y+|M+|d+|h+|m+|s+)/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>) </span>{
    <span class="hljs-keyword">return</span> ((v.length &gt; <span class="hljs-number">1</span> ? <span class="hljs-string">"0"</span> : <span class="hljs-string">""</span>) + <span class="hljs-built_in">eval</span>(<span class="hljs-string">'z.'</span> + v.slice(<span class="hljs-number">-1</span>))).slice(-(v.length &gt; <span class="hljs-number">2</span> ? v.length : <span class="hljs-number">2</span>))
  });
}

format1(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), <span class="hljs-string">'yy-M-d h:m:s'</span>); <span class="hljs-comment">// 17-10-14 22:14:41</span>

<span class="hljs-comment">// 方法二</span>
<span class="hljs-built_in">Date</span>.prototype.format = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fmt</span>) </span>{ 
  <span class="hljs-keyword">var</span> o = {
    <span class="hljs-string">"M+"</span>: <span class="hljs-keyword">this</span>.getMonth() + <span class="hljs-number">1</span>, <span class="hljs-comment">//月份 </span>
    <span class="hljs-string">"d+"</span>: <span class="hljs-keyword">this</span>.getDate(), <span class="hljs-comment">//日 </span>
    <span class="hljs-string">"h+"</span>: <span class="hljs-keyword">this</span>.getHours(), <span class="hljs-comment">//小时 </span>
    <span class="hljs-string">"m+"</span>: <span class="hljs-keyword">this</span>.getMinutes(), <span class="hljs-comment">//分 </span>
    <span class="hljs-string">"s+"</span>: <span class="hljs-keyword">this</span>.getSeconds(), <span class="hljs-comment">//秒 </span>
    <span class="hljs-string">"q+"</span>: <span class="hljs-built_in">Math</span>.floor((<span class="hljs-keyword">this</span>.getMonth() + <span class="hljs-number">3</span>) / <span class="hljs-number">3</span>), <span class="hljs-comment">//季度 </span>
    <span class="hljs-string">"S"</span>: <span class="hljs-keyword">this</span>.getMilliseconds() <span class="hljs-comment">//毫秒 </span>
  };
  <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/(y+)/</span>.test(fmt)){
    fmt = fmt.replace(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, (<span class="hljs-keyword">this</span>.getFullYear() + <span class="hljs-string">""</span>).substr(<span class="hljs-number">4</span> - <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>length));
  } 
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> o){
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"("</span> + k + <span class="hljs-string">")"</span>).test(fmt)){
      fmt = fmt.replace(<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, (<span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1.</span>length == <span class="hljs-number">1</span>) ? (o[k]) : ((<span class="hljs-string">"00"</span> + o[k]).substr((<span class="hljs-string">""</span> + o[k]).length)));
    }
  }     
  <span class="hljs-keyword">return</span> fmt;
}

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().format(<span class="hljs-string">'yy-M-d h:m:s'</span>); <span class="hljs-comment">// 17-10-14 22:18:17</span></code></pre>
<h2 id="articleHeader8">统计文字个数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function wordCount(data) {
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

var text = '贷款买房，也意味着你能给自己的资产加杠杆，能够撬动更多的钱，来孳生更多的财务性收入。';
wordCount(text); // 38" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wordCount</span>(<span class="hljs-params">data</span>) </span>{
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

<span class="hljs-keyword">var</span> text = <span class="hljs-string">'贷款买房，也意味着你能给自己的资产加杠杆，能够撬动更多的钱，来孳生更多的财务性收入。'</span>;
wordCount(text); <span class="hljs-comment">// 38</span></code></pre>
<h2 id="articleHeader9">特殊字符转义</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function htmlspecialchars (str) {
  var str = str.toString().replace(/&amp;/g, &quot;&amp;amp;&quot;).replace(/</g, &quot;&amp;lt;&quot;).replace(/>/g, &quot;&amp;gt;&quot;).replace(/&quot;/g, '&amp;quot;');
  return str;
}

htmlspecialchars('&amp;jfkds<>'); // &quot;&amp;amp;jfkds&amp;lt;&amp;gt;&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">htmlspecialchars</span> (<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">var</span> str = str.toString().replace(<span class="hljs-regexp">/&amp;/g</span>, <span class="hljs-string">"&amp;amp;"</span>).replace(<span class="hljs-regexp">/&lt;/g</span>, <span class="hljs-string">"&amp;lt;"</span>).replace(<span class="hljs-regexp">/&gt;/g</span>, <span class="hljs-string">"&amp;gt;"</span>).replace(<span class="hljs-regexp">/"/g</span>, <span class="hljs-string">'&amp;quot;'</span>);
  <span class="hljs-keyword">return</span> str;
}

htmlspecialchars(<span class="hljs-string">'&amp;jfkds&lt;&gt;'</span>); <span class="hljs-comment">// "&amp;amp;jfkds&amp;lt;&amp;gt;"</span></code></pre>
<h2 id="articleHeader10">动态插入js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function injectScript(src) {
    var s, t;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">injectScript</span>(<span class="hljs-params">src</span>) </span>{
    <span class="hljs-keyword">var</span> s, t;
    s = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    s.type = <span class="hljs-string">'text/javascript'</span>;
    s.async = <span class="hljs-literal">true</span>;
    s.src = src;
    t = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'script'</span>)[<span class="hljs-number">0</span>];
    t.parentNode.insertBefore(s, t);
}</code></pre>
<h2 id="articleHeader11">格式化数量</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一
function formatNum (num, n) {
  if (typeof num == &quot;number&quot;) {
    num = String(num.toFixed(n || 0));
    var re = /(-?\d+)(\d{3})/;
    while (re.test(num)) num = num.replace(re, &quot;$1,$2&quot;);
    return num;
  }
  return num;
}

formatNum(2313123, 3); // &quot;2,313,123.000&quot;

// 方法二
'2313123'.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // &quot;2,313,123&quot;

// 方法三
function formatNum(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  });
}

formatNum('2313323'); // &quot;2,313,323&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法一</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNum</span> (<span class="hljs-params">num, n</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> num == <span class="hljs-string">"number"</span>) {
    num = <span class="hljs-built_in">String</span>(num.toFixed(n || <span class="hljs-number">0</span>));
    <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/(-?\d+)(\d{3})/</span>;
    <span class="hljs-keyword">while</span> (re.test(num)) num = num.replace(re, <span class="hljs-string">"$1,$2"</span>);
    <span class="hljs-keyword">return</span> num;
  }
  <span class="hljs-keyword">return</span> num;
}

formatNum(<span class="hljs-number">2313123</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// "2,313,123.000"</span>

<span class="hljs-comment">// 方法二</span>
<span class="hljs-string">'2313123'</span>.replace(<span class="hljs-regexp">/\B(?=(\d{3})+(?!\d))/g</span>, <span class="hljs-string">','</span>); <span class="hljs-comment">// "2,313,123"</span>

<span class="hljs-comment">// 方法三</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatNum</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).reverse().reduce(<span class="hljs-function">(<span class="hljs-params">prev, next, index</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> ((index % <span class="hljs-number">3</span>) ? next : (next + <span class="hljs-string">','</span>)) + prev
  });
}

formatNum(<span class="hljs-string">'2313323'</span>); <span class="hljs-comment">// "2,313,323"</span></code></pre>
<h2 id="articleHeader12">身份证验证</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function chechCHNCardId(sNo) {
  if (!this.regExpTest(sNo, /^[0-9]{17}[X0-9]$/)) {
    return false;
  }
  sNo = sNo.toString();

  var a, b, c;
  a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10;
  a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4;
  a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6;
  a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9;
  a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8;
  a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2;
  b = a % 11;

  if (b == 2) {
    c = sNo.substr(17, 1).toUpperCase();
  } else {
    c = parseInt(sNo.substr(17, 1));
  }

  switch (b) {
    case 0:
      if (c != 1) {
        return false;
      }
      break;
    case 1:
      if (c != 0) {
        return false;
      }
      break;
    case 2:
      if (c != &quot;X&quot;) {
        return false;
      }
      break;
    case 3:
      if (c != 9) {
        return false;
      }
      break;
    case 4:
      if (c != 8) {
        return false;
      }
      break;
    case 5:
      if (c != 7) {
        return false;
      }
      break;
    case 6:
      if (c != 6) {
        return false;
      }
      break;
    case 7:
      if (c != 5) {
        return false;
      }
      break;
    case 8:
      if (c != 4) {
        return false;
      }
      break;
    case 9:
      if (c != 3) {
        return false;
      }
      break;
    case 10:
      if (c != 2) {
        return false;
      };
  }
  return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chechCHNCardId</span>(<span class="hljs-params">sNo</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.regExpTest(sNo, /^[<span class="hljs-number">0</span><span class="hljs-number">-9</span>]{<span class="hljs-number">17</span>}[X0<span class="hljs-number">-9</span>]$/)) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  sNo = sNo.toString();

  <span class="hljs-keyword">var</span> a, b, c;
  a = <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">7</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">9</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">2</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">10</span>;
  a = a + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">5</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">4</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">8</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">5</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">4</span>;
  a = a + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">6</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">2</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">1</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">8</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">6</span>;
  a = a + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">9</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">3</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">10</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">7</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">11</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">9</span>;
  a = a + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">12</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">10</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">13</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">5</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">14</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">8</span>;
  a = a + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">15</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">4</span> + <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">16</span>, <span class="hljs-number">1</span>)) * <span class="hljs-number">2</span>;
  b = a % <span class="hljs-number">11</span>;

  <span class="hljs-keyword">if</span> (b == <span class="hljs-number">2</span>) {
    c = sNo.substr(<span class="hljs-number">17</span>, <span class="hljs-number">1</span>).toUpperCase();
  } <span class="hljs-keyword">else</span> {
    c = <span class="hljs-built_in">parseInt</span>(sNo.substr(<span class="hljs-number">17</span>, <span class="hljs-number">1</span>));
  }

  <span class="hljs-keyword">switch</span> (b) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-string">"X"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">9</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">8</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">7</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">6</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">5</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">8</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">9</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">10</span>:
      <span class="hljs-keyword">if</span> (c != <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      };
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<h2 id="articleHeader13">测试质数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isPrime(n) {
  return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isPrime</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">return</span> !(<span class="hljs-regexp">/^.?$|^(..+?)\1+$/</span>).test(<span class="hljs-string">'1'</span>.repeat(n))
}</code></pre>
<h2 id="articleHeader14">统计字符串中相同字符出现的次数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = 'abcdaabc';

var info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = <span class="hljs-string">'abcdaabc'</span>;

<span class="hljs-keyword">var</span> info = arr
    .split(<span class="hljs-string">''</span>)
    .reduce(<span class="hljs-function">(<span class="hljs-params">p, k</span>) =&gt;</span> (p[k]++ || (p[k] = <span class="hljs-number">1</span>), p), {});

<span class="hljs-built_in">console</span>.log(info); <span class="hljs-comment">//{ a: 3, b: 2, c: 2, d: 1 }</span></code></pre>
<h2 id="articleHeader15">使用<code>void 0</code>来解决<code>undefined</code>被污染问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undefined = 1;
!!undefined; // true
!!void(0); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-literal">undefined</span> = <span class="hljs-number">1</span>;
!!<span class="hljs-literal">undefined</span>; <span class="hljs-comment">// true</span>
!!<span class="hljs-keyword">void</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// false</span></code></pre>
<h2 id="articleHeader16">单行写一个评级组件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;★★★★★☆☆☆☆☆&quot;.slice(5 - rate, 10 - rate); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"★★★★★☆☆☆☆☆"</span>.slice(<span class="hljs-number">5</span> - rate, <span class="hljs-number">10</span> - rate); </code></pre>
<h2 id="articleHeader17">JavaScript 错误处理的方式的正确姿势</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
    something
} catch (e) {
    window.location.href =
        &quot;http://stackoverflow.com/search?q=[js]+&quot; +
        e.message;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
    something
} <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">window</span>.location.href =
        <span class="hljs-string">"http://stackoverflow.com/search?q=[js]+"</span> +
        e.message;
}</code></pre>
<h2 id="articleHeader18">匿名函数自执行写法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="( function() {}() );
( function() {} )();
[ function() {}() ];

~ function() {}();
! function() {}();
+ function() {}();
- function() {}();

delete function() {}();
typeof function() {}();
void function() {}();
new function() {}();
new function() {};

var f = function() {}();

1, function() {}();
1 ^ function() {}();
1 > function() {}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}() );
( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{} )();
[ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}() ];

~ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
! <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
+ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
- <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();

<span class="hljs-keyword">delete</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-keyword">void</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};

<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();

<span class="hljs-number">1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-number">1</span> ^ <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();
<span class="hljs-number">1</span> &gt; <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}();</code></pre>
<h2 id="articleHeader19">两个整数交换数值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 20, b = 30;
a ^= b;
b ^= a;
a ^= b;

a; // 30
b; // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>, b = <span class="hljs-number">30</span>;
a ^= b;
b ^= a;
a ^= b;

a; <span class="hljs-comment">// 30</span>
b; <span class="hljs-comment">// 20</span></code></pre>
<h2 id="articleHeader20">数字字符转数字</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = '1';
+a; // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-string">'1'</span>;
+a; <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader21">最短的代码实现数组去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...new Set([1, &quot;1&quot;, 2, 1, 1, 3])]; // [1, &quot;1&quot;, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[...new <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>, <span class="hljs-string">"1"</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>])]; <span class="hljs-comment">// [1, "1", 2, 3]</span></code></pre>
<h2 id="articleHeader22">用最短的代码实现一个长度为m(6)且值都n(8)的数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array(6).fill(8); // [8, 8, 8, 8, 8, 8]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>(<span class="hljs-number">6</span>).fill(<span class="hljs-number">8</span>); <span class="hljs-comment">// [8, 8, 8, 8, 8, 8]</span></code></pre>
<h2 id="articleHeader23">将argruments对象转换成数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var argArray = Array.prototype.slice.call(arguments);

// ES6：
var argArray = Array.from(arguments)

// or
var argArray = [...arguments];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> argArray = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);

<span class="hljs-comment">// ES6：</span>
<span class="hljs-keyword">var</span> argArray = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>)

<span class="hljs-comment">// or</span>
<span class="hljs-keyword">var</span> argArray = [...arguments];</code></pre>
<h2 id="articleHeader24">获取日期时间缀</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取指定时间的时间缀
new Date().getTime();
(new Date()).getTime();
(new Date).getTime();
// 获取当前的时间缀
Date.now();
// 日期显示转换为数字
+new Date();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取指定时间的时间缀</span>
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()).getTime();
(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime();
<span class="hljs-comment">// 获取当前的时间缀</span>
<span class="hljs-built_in">Date</span>.now();
<span class="hljs-comment">// 日期显示转换为数字</span>
+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();</code></pre>
<h2 id="articleHeader25">使用<code>~x.indexOf('y')</code>来简化<code>x.indexOf('y') &gt; -1</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = 'hello world';
if (str.indexOf('lo') > -1) {
  // ...
}

if (~str.indexOf('lo')) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> str = <span class="hljs-string">'hello world'</span>;
<span class="hljs-keyword">if</span> (str.indexOf(<span class="hljs-string">'lo'</span>) &gt; <span class="hljs-number">-1</span>) {
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">if</span> (~str.indexOf(<span class="hljs-string">'lo'</span>)) {
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h2 id="articleHeader26">
<code>parseInt()</code> or <code>Number()</code>
</h2>
<p>两者的差别之处在于<strong>解析</strong>和<strong>转换</strong>两者之间的理解。</p>
<p>解析<strong>允许</strong>字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换<strong>不允许</strong>出现非数字字符，否者会失败并返回NaN。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = '520';
var b = '520px';

Number(a); // 520
parseInt(a); // 520

Number(b); // NaN
parseInt(b); // 520" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-string">'520'</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-string">'520px'</span>;

<span class="hljs-built_in">Number</span>(a); <span class="hljs-comment">// 520</span>
<span class="hljs-built_in">parseInt</span>(a); <span class="hljs-comment">// 520</span>

<span class="hljs-built_in">Number</span>(b); <span class="hljs-comment">// NaN</span>
<span class="hljs-built_in">parseInt</span>(b); <span class="hljs-comment">// 520</span></code></pre>
<p><code>parseInt</code>方法第二个参数用于指定转换的基数，ES5默认为10进制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parseInt('10', 2); // 2
parseInt('10', 8); // 8
parseInt('10', 10); // 10
parseInt('10', 16);  // 16" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'10'</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'10'</span>, <span class="hljs-number">8</span>); <span class="hljs-comment">// 8</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'10'</span>, <span class="hljs-number">10</span>); <span class="hljs-comment">// 10</span>
<span class="hljs-built_in">parseInt</span>(<span class="hljs-string">'10'</span>, <span class="hljs-number">16</span>);  <span class="hljs-comment">// 16</span></code></pre>
<p>对于网上<code>parseInt(0.0000008)</code>的结果为什么为8，原因在于0.0000008转换成字符为"8e-7"，然后根据<code>parseInt</code>的解析规则自然得到"8"这个结果。</p>
<h2 id="articleHeader27">
<code>+</code>拼接操作，<code>+x</code> or <code>String(x)</code>？</h2>
<p>+运算符可用于数字加法，同时也可以用于字符串拼接。如果+的其中一个操作符是字符串(或者通过 隐式强制转换可以得到字符串)，则执行字符串拼接；否者执行数字加法。</p>
<p>需要注意的时对于数组而言，不能通过<code>valueOf()</code>方法得到简单基本类型值，于是转而调用<code>toString()</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2] + [3, 4]; // &quot;1,23,4&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>] + [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]; <span class="hljs-comment">// "1,23,4"</span></code></pre>
<p>对于对象同样会先调用<code>valueOf()</code>方法，然后通过<code>toString()</code>方法返回对象的字符串表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {};
a + 123; // &quot;[object Object]123&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = {};
a + <span class="hljs-number">123</span>; <span class="hljs-comment">// "[object Object]123"</span></code></pre>
<p>对于<code>a + ""</code>隐式转换和<code>String(a)</code>显示转换有一个细微的差别：<code>a + ''</code>会对a调用<code>valueOf()</code>方法，而<code>String()</code>直接调用<code>toString()</code>方法。大多数情况下我们不会考虑这个问题，除非真遇到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a  = {
  valueOf: function() { return 42; },
  toString: function() { return 4; }
}

a + ''; // 42
String(a); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a  = {
  <span class="hljs-attr">valueOf</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">42</span>; },
  <span class="hljs-attr">toString</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">4</span>; }
}

a + <span class="hljs-string">''</span>; <span class="hljs-comment">// 42</span>
<span class="hljs-built_in">String</span>(a); <span class="hljs-comment">// 4</span></code></pre>
<h2 id="articleHeader28">判断对象的实例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法一: ES3
function Person(name, age) {
  if (!(this instanceof Person)) {
    return new Person(name, age);
  }
  this.name = name;
  this.age = age;
}

// 方法二: ES5
function Person(name, age) {
  var self = this instanceof Person ? this : Object.create(Person.prototype);
  self.name = name;
  self.age = age;

  return self;
}

// 方法三：ES6
function Person(name, age) {
  if (!new.target) {
    throw 'Peron must called with new';
  }
  this.name = name;
  this.age = age;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法一: ES3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Person)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Person(name, age);
  }
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
}

<span class="hljs-comment">// 方法二: ES5</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Person ? <span class="hljs-keyword">this</span> : <span class="hljs-built_in">Object</span>.create(Person.prototype);
  self.name = name;
  self.age = age;

  <span class="hljs-keyword">return</span> self;
}

<span class="hljs-comment">// 方法三：ES6</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">new</span>.target) {
    <span class="hljs-keyword">throw</span> <span class="hljs-string">'Peron must called with new'</span>;
  }
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age;
}</code></pre>
<h2 id="articleHeader29">数据安全类型检查</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对象
function isObject(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'';
}

// 数组
function isArray(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array';
}

// 函数
function isFunction(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Function';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>// 对象
<span class="hljs-keyword">function</span> <span class="hljs-title">isObject</span>(value) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.toString.call(value).slice(8,</span> -<span class="hljs-number">1</span>) === <span class="hljs-symbol">'Object</span>'';
}

// 数组
<span class="hljs-keyword">function</span> <span class="hljs-title">isArray</span>(value) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.toString.call(value).slice(8,</span> -<span class="hljs-number">1</span>) === <span class="hljs-symbol">'Array</span>';
}

// 函数
<span class="hljs-keyword">function</span> <span class="hljs-title">isFunction</span>(value) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.toString.call(value).slice(8,</span> -<span class="hljs-number">1</span>) === <span class="hljs-symbol">'Function</span>';
}</code></pre>
<h2 id="articleHeader30">让数字的字面值看起来像对象</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.toString(); // Uncaught SyntaxError: Invalid or unexpected token

2..toString(); // 第二个点号可以正常解析
2 .toString(); // 注意点号前面的空格
(2).toString(); // 2先被计算" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-number">2.</span>toString(); <span class="hljs-comment">// Uncaught SyntaxError: Invalid or unexpected token</span>

<span class="hljs-number">2.</span>.toString(); <span class="hljs-comment">// 第二个点号可以正常解析</span>
<span class="hljs-number">2</span> .toString(); <span class="hljs-comment">// 注意点号前面的空格</span>
(<span class="hljs-number">2</span>).toString(); <span class="hljs-comment">// 2先被计算</span></code></pre>
<h2 id="articleHeader31">对象可计算属性名(仅在ES6中)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var suffix = ' name';
var person = {
  ['first' + suffix]: 'Nicholas',
  ['last' + suffix]: 'Zakas'
}

person['first name']; // &quot;Nicholas&quot;
person['last name']; // &quot;Zakas&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> suffix = <span class="hljs-string">' name'</span>;
<span class="hljs-keyword">var</span> person = {
  [<span class="hljs-string">'first'</span> + suffix]: <span class="hljs-string">'Nicholas'</span>,
  [<span class="hljs-string">'last'</span> + suffix]: <span class="hljs-string">'Zakas'</span>
}

person[<span class="hljs-string">'first name'</span>]; <span class="hljs-comment">// "Nicholas"</span>
person[<span class="hljs-string">'last name'</span>]; <span class="hljs-comment">// "Zakas"</span></code></pre>
<h2 id="articleHeader32">数字四舍五入</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// v: 值，p: 精度
function (v, p) {
  p = Math.pow(10, p >>> 31 ? 0 : p | 0)
  v *= p;
  return (v + 0.5 + (v >> 31) | 0) / p
}

round(123.45353, 2); // 123.45" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// v: 值，p: 精度</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v, p</span>) </span>{
  p = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, p &gt;&gt;&gt; <span class="hljs-number">31</span> ? <span class="hljs-number">0</span> : p | <span class="hljs-number">0</span>)
  v *= p;
  <span class="hljs-keyword">return</span> (v + <span class="hljs-number">0.5</span> + (v &gt;&gt; <span class="hljs-number">31</span>) | <span class="hljs-number">0</span>) / p
}

round(<span class="hljs-number">123.45353</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 123.45</span></code></pre>
<h2 id="articleHeader33">在浏览器中根据url下载文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function download(url) {
  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  if (isChrome || isSafari) {
    var link = document.createElement('a');
    link.href = url;

    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }

    if (document.createEvent) {
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  window.open(url, '_self');
  return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">download</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">var</span> isChrome = navigator.userAgent.toLowerCase().indexOf(<span class="hljs-string">'chrome'</span>) &gt; <span class="hljs-number">-1</span>;
  <span class="hljs-keyword">var</span> isSafari = navigator.userAgent.toLowerCase().indexOf(<span class="hljs-string">'safari'</span>) &gt; <span class="hljs-number">-1</span>;

  <span class="hljs-keyword">if</span> (isChrome || isSafari) {
    <span class="hljs-keyword">var</span> link = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>);
    link.href = url;

    <span class="hljs-keyword">if</span> (link.download !== <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">var</span> fileName = url.substring(url.lastIndexOf(<span class="hljs-string">'/'</span>) + <span class="hljs-number">1</span>, url.length);
      link.download = fileName;
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.createEvent) {
      <span class="hljs-keyword">var</span> e = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">'MouseEvents'</span>);
      e.initEvent(<span class="hljs-string">'click'</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
      link.dispatchEvent(e);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
  }

  <span class="hljs-keyword">if</span> (url.indexOf(<span class="hljs-string">'?'</span>) === <span class="hljs-number">-1</span>) {
    url += <span class="hljs-string">'?download'</span>;
  }

  <span class="hljs-built_in">window</span>.open(url, <span class="hljs-string">'_self'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<h2 id="articleHeader34">快速生成UUID</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function uuid() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r &amp; 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

uuid(); // &quot;33f7f26656cb-499b-b73e-89a921a59ba6&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uuid</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> d = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
  <span class="hljs-keyword">var</span> uuid = <span class="hljs-string">'xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'</span>.replace(<span class="hljs-regexp">/[xy]/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{
    <span class="hljs-keyword">var</span> r = (d + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">16</span>) % <span class="hljs-number">16</span> | <span class="hljs-number">0</span>;
    d = <span class="hljs-built_in">Math</span>.floor(d / <span class="hljs-number">16</span>);
    <span class="hljs-keyword">return</span> (c == <span class="hljs-string">'x'</span> ? r : (r &amp; <span class="hljs-number">0x3</span> | <span class="hljs-number">0x8</span>)).toString(<span class="hljs-number">16</span>);
  });
  <span class="hljs-keyword">return</span> uuid;
};

uuid(); <span class="hljs-comment">// "33f7f26656cb-499b-b73e-89a921a59ba6"</span></code></pre>
<h2 id="articleHeader35">JavaScript浮点数精度问题</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isEqual(n1, n2, epsilon) {
  epsilon = epsilon == undefined ? 10 : epsilon; // 默认精度为10
  return n1.toFixed(epsilon) === n2.toFixed(epsilon);
}

0.1 + 0.2; // 0.30000000000000004
isEqual(0.1 + 0.2, 0.3); // true

0.7 + 0.1 + 99.1 + 0.1; // 99.99999999999999
isEqual(0.7 + 0.1 + 99.1 + 0.1, 100); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isEqual</span>(<span class="hljs-params">n1, n2, epsilon</span>) </span>{
  epsilon = epsilon == <span class="hljs-literal">undefined</span> ? <span class="hljs-number">10</span> : epsilon; <span class="hljs-comment">// 默认精度为10</span>
  <span class="hljs-keyword">return</span> n1.toFixed(epsilon) === n2.toFixed(epsilon);
}

<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>; <span class="hljs-comment">// 0.30000000000000004</span>
isEqual(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>); <span class="hljs-comment">// true</span>

<span class="hljs-number">0.7</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">99.1</span> + <span class="hljs-number">0.1</span>; <span class="hljs-comment">// 99.99999999999999</span>
isEqual(<span class="hljs-number">0.7</span> + <span class="hljs-number">0.1</span> + <span class="hljs-number">99.1</span> + <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>); <span class="hljs-comment">// true</span></code></pre>
<h2 id="articleHeader36">格式化表单数据</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatParam(obj) {
  var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

  for(name in obj) {
    value = obj[name];

    if(value instanceof Array) {
      for(i=0; i<value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formatParam(innerObj) + '&amp;';
      }
    }
    else if(value instanceof Object) {
      for(subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formatParam(innerObj) + '&amp;';
      }
    }
    else if(value !== undefined &amp;&amp; value !== null)
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&amp;';
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

var param = {
  name: 'jenemy',
  likes: [0, 1, 3],
  memberCard: [
    { title: '1', id: 1 },
    { title: '2', id: 2 }
  ]
}

formatParam(param); // &quot;name=12&amp;likes%5B0%5D=0&amp;likes%5B1%5D=1&amp;likes%5B2%5D=3&amp;memberCard%5B0%5D%5Btitle%5D=1&amp;memberCard%5B0%5D%5Bid%5D=1&amp;memberCard%5B1%5D%5Btitle%5D=2&amp;memberCard%5B1%5D%5Bid%5D=2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatParam</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">var</span> query = <span class="hljs-string">''</span>, name, value, fullSubName, subName, subValue, innerObj, i;

  <span class="hljs-keyword">for</span>(name <span class="hljs-keyword">in</span> obj) {
    value = obj[name];

    <span class="hljs-keyword">if</span>(value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>) {
      <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>; i&lt;value.length; ++i) {
        subValue = value[i];
        fullSubName = name + <span class="hljs-string">'['</span> + i + <span class="hljs-string">']'</span>;
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formatParam(innerObj) + <span class="hljs-string">'&amp;'</span>;
      }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(value <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) {
      <span class="hljs-keyword">for</span>(subName <span class="hljs-keyword">in</span> value) {
        subValue = value[subName];
        fullSubName = name + <span class="hljs-string">'['</span> + subName + <span class="hljs-string">']'</span>;
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += formatParam(innerObj) + <span class="hljs-string">'&amp;'</span>;
      }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(value !== <span class="hljs-literal">undefined</span> &amp;&amp; value !== <span class="hljs-literal">null</span>)
      query += <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(value) + <span class="hljs-string">'&amp;'</span>;
  }
  <span class="hljs-keyword">return</span> query.length ? query.substr(<span class="hljs-number">0</span>, query.length - <span class="hljs-number">1</span>) : query;
}

<span class="hljs-keyword">var</span> param = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'jenemy'</span>,
  <span class="hljs-attr">likes</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>],
  <span class="hljs-attr">memberCard</span>: [
    { <span class="hljs-attr">title</span>: <span class="hljs-string">'1'</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> },
    { <span class="hljs-attr">title</span>: <span class="hljs-string">'2'</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2</span> }
  ]
}

formatParam(param); <span class="hljs-comment">// "name=12&amp;likes%5B0%5D=0&amp;likes%5B1%5D=1&amp;likes%5B2%5D=3&amp;memberCard%5B0%5D%5Btitle%5D=1&amp;memberCard%5B0%5D%5Bid%5D=1&amp;memberCard%5B1%5D%5Btitle%5D=2&amp;memberCard%5B1%5D%5Bid%5D=2"</span></code></pre>
<h2 id="articleHeader37">创建指定长度非空数组</h2>
<p>在JavaScript中可以通过<code>new Array(3)</code>的形式创建一个长度为3的空数组。在老的Chrome中其值为[undefined x 3]，在最新的Chrome中为[empty x 3]，即空单元数组。在老Chrome中，相当于显示使用<code>[undefined, undefined, undefined]</code>的方式创建长度为3的数组。</p>
<p>但是，两者在调用<code>map()</code>方法的结果是明显不同的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Array(3);
var b = [undefined, undefined, undefined];

a.map((v, i) => i); // [empty × 3]
b.map((v, i) => i); // [0, 1, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">3</span>);
<span class="hljs-keyword">var</span> b = [<span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>];

a.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> i); <span class="hljs-comment">// [empty × 3]</span>
b.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> i); <span class="hljs-comment">// [0, 1, 2]</span></code></pre>
<p>多数情况我们期望创建的是包含<code>undefined</code>值的指定长度的空数组，可以通过下面这种方法来达到目的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = Array.apply(null, { length: 3 });

a; // [undefined, undefined, undefined]
a.map((v, i) => i); // [0, 1, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Array</span>.apply(<span class="hljs-literal">null</span>, { <span class="hljs-attr">length</span>: <span class="hljs-number">3</span> });

a; <span class="hljs-comment">// [undefined, undefined, undefined]</span>
a.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> i); <span class="hljs-comment">// [0, 1, 2]</span></code></pre>
<p>总之，尽量不要创建和使用空单元数组。</p>
<h2 id="articleHeader38">debounce方法</h2>
<p><code>debounce()</code>方法用来延迟执行函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var debounce = function (func, threshold, execAsap) {
  var timeout;

  return function debounced() {
    var obj = this, args = arguments;
    function delayed() {
      if (!execAsap)
        func.apply(obj, args);
      timeout = null;
    };

    if (timeout)
      clearTimeout(timeout);
    else if (execAsap)
      func.apply(obj, args);

    timeout = setTimeout(delayed, threshold || 100);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> debounce = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">func, threshold, execAsap</span>) </span>{
  <span class="hljs-keyword">var</span> timeout;

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounced</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">this</span>, args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">delayed</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (!execAsap)
        func.apply(obj, args);
      timeout = <span class="hljs-literal">null</span>;
    };

    <span class="hljs-keyword">if</span> (timeout)
      clearTimeout(timeout);
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (execAsap)
      func.apply(obj, args);

    timeout = setTimeout(delayed, threshold || <span class="hljs-number">100</span>);
  };
}</code></pre>
<h2 id="articleHeader39">判断客户端</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var browser = {
    v: (function() {
        var u = navigator.userAgent,
            app = navigator.appVersion,
            p = navigator.platform;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 &amp;&amp; u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            UCB: u.match(/UCBrowser/i) == &quot;UCBrowser&quot;,
            QQB: u.match(/MQQBrowser/i) == &quot;MQQBrowser&quot;,
            win: p.indexOf('Win') > -1, //判断是否是WIN操作系统
            mac: p.indexOf('Mac') > -1 //判断是否是Mac操作系统
        };
    })()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> browser = {
    <span class="hljs-attr">v</span>: (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> u = navigator.userAgent,
            app = navigator.appVersion,
            p = navigator.platform;
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">trident</span>: u.indexOf(<span class="hljs-string">'Trident'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//IE内核</span>
            presto: u.indexOf(<span class="hljs-string">'Presto'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//opera内核</span>
            webKit: u.indexOf(<span class="hljs-string">'AppleWebKit'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//苹果、谷歌内核</span>
            gecko: u.indexOf(<span class="hljs-string">'Gecko'</span>) &gt; <span class="hljs-number">-1</span> &amp;&amp; u.indexOf(<span class="hljs-string">'KHTML'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//火狐内核</span>
            mobile: !!u.match(<span class="hljs-regexp">/AppleWebKit.*Mobile.*/</span>), <span class="hljs-comment">//是否为移动终端</span>
            ios: !!u.match(<span class="hljs-regexp">/i[^;]+;( U;)? CPU.+Mac OS X/</span>), <span class="hljs-comment">//ios终端</span>
            android: u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Linux'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//android终端或uc浏览器</span>
            iPhone: u.indexOf(<span class="hljs-string">'iPhone'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否为iPhone或者QQHD浏览器</span>
            iPad: u.indexOf(<span class="hljs-string">'iPad'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否iPad</span>
            weixin: u.indexOf(<span class="hljs-string">'MicroMessenger'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否微信</span>
            webApp: u.indexOf(<span class="hljs-string">'Safari'</span>) == <span class="hljs-number">-1</span>, <span class="hljs-comment">//是否web应该程序，没有头部与底部</span>
            UCB: u.match(<span class="hljs-regexp">/UCBrowser/i</span>) == <span class="hljs-string">"UCBrowser"</span>,
            <span class="hljs-attr">QQB</span>: u.match(<span class="hljs-regexp">/MQQBrowser/i</span>) == <span class="hljs-string">"MQQBrowser"</span>,
            <span class="hljs-attr">win</span>: p.indexOf(<span class="hljs-string">'Win'</span>) &gt; <span class="hljs-number">-1</span>, <span class="hljs-comment">//判断是否是WIN操作系统</span>
            mac: p.indexOf(<span class="hljs-string">'Mac'</span>) &gt; <span class="hljs-number">-1</span> <span class="hljs-comment">//判断是否是Mac操作系统</span>
        };
    })()
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript有用的代码片段和trick

## 原文链接
[https://segmentfault.com/a/1190000011557368](https://segmentfault.com/a/1190000011557368)


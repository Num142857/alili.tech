---
title: '一篇文章吃透Jsonp' 
date: 2018-12-17 2:30:06
hidden: true
slug: g35xsd5r1z
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>最近因为工作的缘故，几乎把市面上所有Jsonp库都下载了一遍，却发现没有百分百让我满意的，最后自己手动改写了<a href="https://www.npmjs.com/package/jsonp" rel="nofollow noreferrer" target="_blank">Jsonp</a>，才符合了要求，也因此有了这篇文章。本文示例详实，代码简单，想弄明白Jsonp, 这一篇文章就够了。</p>
<h3 id="articleHeader1">什么是Jsonp</h3>
<p>因为AJAX收到<a href="https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy" rel="nofollow noreferrer" target="_blank">浏览器同源策略</a>的限制，导致在跨域上有心无力，经常需要后台同学的帮助。而在浏览器中，所有带有src的标签都是不受同源策略限制的，如image, script。Jsonp上就是利用了script标签的这个特点，来实现跨域的。</p>
<p>其中，<strong>Jsonp和AJAX的原理完全不同，只不过Jquery带了个很不好的头，把两个东西封装在一起了，所以经常让新的同学混淆了。</strong></p>
<blockquote>Jsonp的原理：script src<br>AJAX的原理：xhr</blockquote>
<p>举一个最简单的Jsonp的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>Jsonp简单示例</title>
</head>

<body>
</body>
<script type=&quot;text/javascript&quot;>
    // Jsonp回调
    function jsonCallback(data) {
        console.log(data);
    }

    //添加<script>标签的方法
    function addScriptTag(src) {
        var script = document.createElement('script');
        script.setAttribute(&quot;type&quot;, &quot;text/javascript&quot;);
        script.src = src;
        document.body.appendChild(script);
    }

    // 向后台发起请求（链接是胡乱写的）
    addScriptTag('http://www.qq.com/getJsonp?callback=jsonCallback')
</script>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Jsonp简单示例<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// Jsonp回调</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonCallback</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }

    <span class="hljs-comment">//添加&lt;script&gt;标签的方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addScriptTag</span>(<span class="hljs-params">src</span>) </span>{
        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        script.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text/javascript"</span>);
        script.src = src;
        <span class="hljs-built_in">document</span>.body.appendChild(script);
    }

    <span class="hljs-comment">// 向后台发起请求（链接是胡乱写的）</span>
    addScriptTag(<span class="hljs-string">'http://www.qq.com/getJsonp?callback=jsonCallback'</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><code>http://www.qq.com/getJsonp?callback=jsonCallback</code>这个链接返回的内容应该是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jsonpCallback({
    msg: success
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">jsonpCallback</span>({
    <span class="hljs-attribute">msg</span>: success
})</code></pre>
<p>这样，相当于后台调用了前台提前写好的callback函数，将要返回的数据当做callback函数的参数传入，这样前端就拿到后台传回来的数据了。</p>
<h3 id="articleHeader2">改写Jsonp</h3>
<p>但是坦白来说，单纯的拿到数据并不能让我们满意。一个合适的请求函数，必然包含对成功、失败、超时的处理，就像我们上面写的那个简单示例，一旦出现异常，就不能让我们满意了。</p>
<p>在这一点上不得不说Jquery做的很好，Jquery的Jsonp函数包含了对各种情况的处理，还伪造了一个http状态码的返回。</p>
<blockquote>Jsonp和AJAX不同，是拿不到状态码的，但是Jquery对于所有的错误都赋予了一个404的状态码，也是机智</blockquote>
<p>对比其他的组件库（axios-jsonp, axios-jsonp-pro, jsonp, fetch=jsonp-es6）, 要不就是完全没有对超时的处理，要不然就是把错误和超时混成一谭，更有甚者，有些都不能自定义callback函数的名字。这简直太过分了。</p>
<p>那我为什么不选择Jquery呢？因为太大了，webpack引入JQuery后瞬间大了80K, 而且单独将Jsonp打包出来也有70K的样子，而我的源码只有20K，这是我不能接受的。</p>
<p><a href="https://www.npmjs.com/package/jsonp" rel="nofollow noreferrer" target="_blank">jsonp</a>这个组件的问题是没有对错误的处理，理解了Jsonp的原理，我们能很容易的添加上这块的逻辑，以下是添加后的源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop(){}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || (prefix + (count++));

  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;


  if (timeout) {
    timer = setTimeout(function(){
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup(){
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }

  function cancel(){
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function(data){
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&amp;' : '?') + param + '=' + enc(id);
  url = url.replace('?&amp;', '?');

  // create script
  script = document.createElement('script');
  script.src = url;
  
  // 添加对错误的处理
  script.onerror = function (evt) {
      if (fn) fn(new Error('Error'));
      if (timer) clearTimeout(timer)
  }
  target.parentNode.insertBefore(script, target);

  return cancel;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/**
 * Module exports.
 */</span>

<span class="hljs-built_in">module</span>.exports = jsonp;

<span class="hljs-comment">/**
 * Callback index.
 */</span>

<span class="hljs-built_in">var</span> count = <span class="hljs-number">0</span>;

<span class="hljs-comment">/**
 * Noop function.
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">noop</span>(<span class="hljs-params"></span>)</span>{}

<span class="hljs-comment">/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonp</span>(<span class="hljs-params">url, opts, fn</span>)</span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-string">'function'</span> == <span class="hljs-keyword">typeof</span> opts) {
    fn = opts;
    opts = {};
  }
  <span class="hljs-keyword">if</span> (!opts) opts = {};

  <span class="hljs-built_in">var</span> prefix = opts.prefix || <span class="hljs-string">'__jp'</span>;

  <span class="hljs-comment">// use the callback name that was passed if one was provided.</span>
  <span class="hljs-comment">// otherwise generate a unique name by incrementing our counter.</span>
  <span class="hljs-built_in">var</span> id = opts.name || (prefix + (count++));

  <span class="hljs-built_in">var</span> param = opts.param || <span class="hljs-string">'callback'</span>;
  <span class="hljs-built_in">var</span> timeout = <span class="hljs-literal">null</span> != opts.timeout ? <span class="hljs-attribute">opts.timeout</span> : <span class="hljs-number">60000</span>;
  <span class="hljs-built_in">var</span> enc = <span class="hljs-built_in">encodeURIComponent</span>;
  <span class="hljs-built_in">var</span> target = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'script'</span>)[<span class="hljs-number">0</span>] || <span class="hljs-built_in">document</span>.head;
  <span class="hljs-built_in">var</span> script;
  <span class="hljs-built_in">var</span> timer;


  <span class="hljs-keyword">if</span> (timeout) {
    timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      cleanup();
      <span class="hljs-keyword">if</span> (fn) fn(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Timeout'</span>));
    }, timeout);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanup</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (script.parentNode) script.parentNode.removeChild(script);
    <span class="hljs-built_in">window</span>[id] = noop;
    <span class="hljs-keyword">if</span> (timer) clearTimeout(timer);
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>[id]) {
      cleanup();
    }
  }

  <span class="hljs-built_in">window</span>[id] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    cleanup();
    <span class="hljs-keyword">if</span> (fn) fn(<span class="hljs-literal">null</span>, data);
  };

  <span class="hljs-comment">// add qs component</span>
  <span class="hljs-built_in">url</span> += (~<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">'?'</span>) ? <span class="hljs-string">'&amp;'</span> : <span class="hljs-string">'?'</span>) + param + <span class="hljs-string">'='</span> + enc(id);
  <span class="hljs-built_in">url</span> = <span class="hljs-built_in">url</span>.replace(<span class="hljs-string">'?&amp;'</span>, <span class="hljs-string">'?'</span>);

  <span class="hljs-comment">// create script</span>
  script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
  script.src = <span class="hljs-built_in">url</span>;
  
  <span class="hljs-comment">// 添加对错误的处理</span>
  script.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
      <span class="hljs-keyword">if</span> (fn) fn(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Error'</span>));
      <span class="hljs-keyword">if</span> (timer) clearTimeout(timer)
  }
  target.parentNode.insertBefore(script, target);

  <span class="hljs-keyword">return</span> cancel;
}
</code></pre>
<p>因为大部分是人家的代码，我也就不班门弄斧了，<strong>有需要的可以直接npm install jsonp, 然后比对node_modules/jsonp/index.js进行修改</strong>；有需要对Jsonp有更详细的处理的，也可以在我的基础上继续添加。</p>
<h3 id="articleHeader3">总结</h3>
<p><strong>Jsonp的本质就是创建一个回调函数，然后在远程服务上调用这个函数并且将JSON数据形式作为参数传递，完成回调。</strong>比起另外两种后台无感知的跨域方案：image src、fetch no-cor，Jsonp可以对错误和超时进行处理，也能对后台返回的数据进行分析；而对于AJAX，Jsonp免去了后台添加跨域头的烦恼，后台的改动较小，一次写好，终生受用（跨域头还要不断维护白名单）。这三种方案都有各自的使用场景，要在不同的场景进行恰当的选用，以上。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章吃透Jsonp

## 原文链接
[https://segmentfault.com/a/1190000012922875](https://segmentfault.com/a/1190000012922875)


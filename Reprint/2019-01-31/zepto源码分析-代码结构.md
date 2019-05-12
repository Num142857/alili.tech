---
title: 'zepto源码分析-代码结构' 
date: 2019-01-31 2:31:16
hidden: true
slug: c39a72kv7na
categories: [reprint]
---

{{< raw >}}

                    
<p>本来想学习一下jQuery的源码，但由于jQuery的源码有10000多行，设计相当复杂，所以决定从zepto开始，分析一个成熟的框架的代码结构及执行步骤。</p>
<p>网上也有很多zepto的源码分析，有的给源码添加注释，有的谈与jQuery的不同，但是都没有系统的讲解<strong>zepto框架的代码结构及初始化Zepto对象的过程</strong>。</p>
<h2 id="articleHeader0">准备</h2>
<p>默认你已经对面向对象有一定的了解，本文是边实践边写的，虽有些乱，但好处是为大家提供了分析的思路。</p>
<p><a href="http://zeptojs.com/" rel="nofollow noreferrer" target="_blank">英文文档</a>、 <a href="http://www.css88.com/doc/zeptojs_api/" rel="nofollow noreferrer" target="_blank">中文文档</a></p>
<p>注意在文中<code>$</code>变量表示一个函数对象，而<code>$()</code>表示执行函数，他会返回另一个对象。</p>
<h2 id="articleHeader1">从文档入手分析<code>$</code>
</h2>
<p>在文档中可以看到有两类方法，其中一类是没有<code>$</code>前缀，例如<code>addClass</code>,这些方法都有一个共同的特点，操作DOM或BOM。还有一类是有前缀的例如<code>$.trim</code>，这一类方法无关平台，只是封装了一些常用的方法，可以看作ECMA层级的方法，与浏览器无关。</p>
<p>我们分别打印，看以下log日志</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
    <p id=&quot;person&quot;>
        <span></span>
    </p>
</body>
</html>
<!-- 之后的代码中也使用这个html文档 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"person"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 之后的代码中也使用这个html文档 --&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log($.prototype);
console.log($(&quot;#person&quot;));
console.log($);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log($.prototype);
<span class="hljs-built_in">console</span>.log($(<span class="hljs-string">"#person"</span>));
<span class="hljs-built_in">console</span>.log($);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVFHju?w=1262&amp;h=408" src="https://static.alili.tech/img/bVFHju?w=1262&amp;h=408" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>结果如上图，展开绿色1即可看到所有前缀的方法，展开图中2可看到所有的不带前缀的方法。图中3返回的是一个函数。</p>
<p>1中的结果可以看出像<code>$.trim</code>这类方法保存在<code>$.prototype</code>的构造函数中，也就是在<code>$</code>中，但是<code>$</code>打印出来的是却一个函数，为了解决这中迷惑性，以下代码重现了这种情况，可以看出，<code>$</code>确实是一个函数，只是这个函数多了一些特定的方法。<code>$.trim</code>只是<code>$</code>的一个属性。</p>
<p>2中的方法都在对象的原型函数中，因为它执行了<code>$()</code>函数返回了一个对象<code>Z</code>，该对象的原型中包含一些类似于<code>addClass</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var good = (function() {
  var g;
  var log = function(text){
    console.log(text);
  }
  g = function(){console.log(&quot;666&quot;);}
  g.log = log;
  return g;
})();
console.log(good.log(&quot;Are you OK?&quot;));// Are you OK?
console.log(good);// function(){console.log(&quot;666&quot;);}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> good = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> g;
  <span class="hljs-keyword">var</span> log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">text</span>)</span>{
    <span class="hljs-built_in">console</span>.log(text);
  }
  g = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"666"</span>);}
  g.log = log;
  <span class="hljs-keyword">return</span> g;
})();
<span class="hljs-built_in">console</span>.log(good.log(<span class="hljs-string">"Are you OK?"</span>));<span class="hljs-comment">// Are you OK?</span>
<span class="hljs-built_in">console</span>.log(good);<span class="hljs-comment">// function(){console.log("666");}</span></code></pre>
<p>写到这里突然想起来console对象还有个dir方法，<code>console.dir($)</code>清晰明了。-_-||<br>补充一张动图<br><span class="img-wrap"><img data-src="/img/bVFHlq?w=679&amp;h=432" src="https://static.alili.tech/img/bVFHlq?w=679&amp;h=432" alt="执行结果" title="执行结果" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">这种写法的好处</h3>
<p>我认为这种写法的好处有，调用<code>$()</code>后返回的对象是一个新对象，就没有类似<code>$.trim</code>这类方法，且<code>addClass</code>这类方法都在原型函数中，更能节省内存。</p>
<p>不执行<code>$</code>函数对象，只是调用其函数中的特定属性，该对象只会创建一次（在引入zepto时就已经初始化了），同样不会浪费内存。</p>
<p>两种类型的方法共用同一个变量名，减少命名冲突的可能，封装更彻底。</p>
<hr>
<p>下面开始自上而下的分析源码，层层剥离，使脉络清晰。</p>
<h2 id="articleHeader3">一、闭包返回与全局变量</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Zepto = (function() {
  return $
})()

window.Zepto = Zepto
window.$ === undefined &amp;&amp; (window.$ = Zepto)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Zepto = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> $
})()

<span class="hljs-built_in">window</span>.Zepto = Zepto
<span class="hljs-built_in">window</span>.$ === <span class="hljs-literal">undefined</span> &amp;&amp; (<span class="hljs-built_in">window</span>.$ = Zepto)</code></pre>
<p>吐槽一下源码中不写分号，总感觉怪怪的。</p>
<p>使用自执行匿名函数返回<code>$</code>传递给<code>Zepto</code>。然后把<code>Zepto</code>和<code>$</code>作为<code>window</code>的属性。</p>
<p>这样对外只有两个或一个变量可以使用，不会污染全局环境，如果命名冲突，只需改源码中最后两行即可。</p>
<h2 id="articleHeader4">二、核心架构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Zepto = (function() {
    var $,zepto = {};
    $.trim = function(str) {
        return str == null ? &quot;&quot; : String.prototype.trim.call(str)
    }
    $ = function(selector, context){
        return zepto.init(selector, context)
    }
    $.fn = {
        addClass: function(name){
            // 省略
        }
        // 省略
    }
    zepto.Z.prototype = Z.prototype = $.fn
    $.zepto = zepto
    return $
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Zepto = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> $,zepto = {};
    $.trim = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>) </span>{
        <span class="hljs-keyword">return</span> str == <span class="hljs-literal">null</span> ? <span class="hljs-string">""</span> : <span class="hljs-built_in">String</span>.prototype.trim.call(str)
    }
    $ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, context</span>)</span>{
        <span class="hljs-keyword">return</span> zepto.init(selector, context)
    }
    $.fn = {
        <span class="hljs-attr">addClass</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
            <span class="hljs-comment">// 省略</span>
        }
        <span class="hljs-comment">// 省略</span>
    }
    zepto.Z.prototype = Z.prototype = $.fn
    $.zepto = zepto
    <span class="hljs-keyword">return</span> $
})()</code></pre>
<p>在此可以看到$.trim与addClass与其他变量或属性的关系，去除这两个属性后就是第二层的架构，如下。</p>
<ol>
<li>
<p><code>var $,zepto = {};</code></p>
<ul><li><p>初始化了一个<code>$</code>变量和<code>zepto</code>对象，注意这里是小写</p></li></ul>
</li>
<li>
<p><code>$</code>函数</p>
<ul><li><p>这个函数调用<code>zepto.init</code>方法，返回对象，在之后会讲解。</p></li></ul>
</li>
<li>
<p>添加<code>$.fn</code>对象</p>
<ul><li><p>它拥有<strong>Zepto对象</strong>上所有可用的方法（官方文档），这里可能有误解，应该是拥有由<code>$()</code>返回的对象的所有方法，里面的方法在<code>$("#person").prototype</code>中看到过</p></li></ul>
</li>
<li>
<p><code>zepto.Z.prototype = Z.prototype = $.fn</code></p>
<ul>
<li><p><code>Z.prototype = $.fn</code>如果你仔细观察开始时的<code>$("#person")</code>返回的对象其实就是Z，那么经过<code>$()</code>返回的对象的原型指向了拥有大量方法的<code>$.fn</code>对象，所以才可以在<code>$("#person").prototype</code>中看到过<code>addClass</code>方法</p></li>
<li><p>然后是<code>zepto.Z.prototype = $.fn</code>，请参考<a href="https://segmentfault.com/q/1010000005782663">zepto源码中关于zepto.Z.prototype = $.fn的问题</a></p></li>
</ul>
</li>
<li>
<p><code>$.zepto = zepto</code></p>
<ul><li><p>不知道为什么有这一句，似乎是可以通过$.zepto访问内部的方法，例如<code>$.zepto.isZ($("#person"))</code>。又或许是想将其封装为<code>$</code>的属性。</p></li></ul>
</li>
<li><p><code>return $</code></p></li>
</ol>
<p>可以清楚的看到内部的结构，<code>$.fn</code>、<code>$.zepto</code>、<code>$.trim</code>都作为$对象的属性存在，如果调用<code>$()</code>函数，返回的Z对象就拥有指定的原型链<code>Z.prototype = $.fn</code>。</p>
<p>那么问题又来了：<code>zepto.init</code>方法是做什么的？执行<code>$()</code>函数返回的是什么对象？</p>
<h2 id="articleHeader5">三、框架的入口：<code>zepto.init</code>
</h2>
<p>还是先上源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ = function(selector, context){
    return zepto.init(selector, context)
}
zepto.init = function(selector, context) {
    var dom
    if (!selector) return zepto.Z()// 如果是$()或$(&quot;&quot;)则执行
    else if (typeof selector == 'string') {// 如果传入的是字符串
        selector = selector.trim()// 去除收尾空白符
        if (selector[0] == '<' &amp;&amp; fragmentRE.test(selector))// 如果传入的字符串是以<开头且符合HTML代码规则（用了正则表达式），即创建元素
            dom = zepto.fragment(selector, RegExp.$1, context), selector = null// 创建一个DOM对象
        else if (context !== undefined) return $(context).find(selector)// 这里其实是一种讨巧的办法，我相信jQuery中肯定不会这么写，目的是实现在指定范围内查找[context]元素
        else dom = zepto.qsa(document, selector)// 调用zepto.qsa解析字符串，返回一个DOM数组
    }
    else if (isFunction(selector)) return $(document).ready(selector)// 很简单，如果是函数，则在文档就绪后执行
    else if (zepto.isZ(selector)) return selector// 如果是一个zepto对象，直接返回
    else {
        if (isArray(selector)) dom = compact(selector)// 如果是数组，调用compact返回一个数组，最后经Z变成类数组对象，我想这里是把几个DOM对象作为数组的参数传入，返回一个类数组对象
        else if (isObject(selector))// 如果是一个对象，将其包含在数组之内，如p = document.getElementById(&quot;#p&quot;);$(p);
            dom = [selector], selector = null
        else if (fragmentRE.test(selector))// 不知道是干嘛的
            dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
        else if (context !== undefined) return $(context).find(selector)
        else dom = zepto.qsa(document, selector)
    }
    return zepto.Z(dom, selector)// 可以看这里，无论以上过程经历了什么，都要经过此函数，目的是将数组转化为类数组对象。
}
zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
}
/**
 * 一个构造函数，将dom对象中的属性和方法都复制到this下，并添加了两个属性，length和selector，这个函数的目的是将DOM对象转化为供zepto使用的类数组对象
 */
function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
}
zepto.fragment = function(html, name, properties) {
    // 这里的代码就不展开了，其作用是返回一个DOM对象，若$()中传入第二个参数，则将其属性添加给创建的DOM对象
    return dom
}
zepto.qsa = function(element, selector){
    // 这里也不展开代码，又兴趣的可以直接看源码，很简单，无非是根据传入的选择符分别调用getElementByID、getElementsByTagName、getElementsByClassName、querySelectorAll等方法，返回一个数组，数组的值即是DOM对象，这就是最核心的选择器，有点坑爹。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, context</span>)</span>{
    <span class="hljs-keyword">return</span> zepto.init(selector, context)
}
zepto.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, context</span>) </span>{
    <span class="hljs-keyword">var</span> dom
    <span class="hljs-keyword">if</span> (!selector) <span class="hljs-keyword">return</span> zepto.Z()<span class="hljs-comment">// 如果是$()或$("")则执行</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> selector == <span class="hljs-string">'string'</span>) {<span class="hljs-comment">// 如果传入的是字符串</span>
        selector = selector.trim()<span class="hljs-comment">// 去除收尾空白符</span>
        <span class="hljs-keyword">if</span> (selector[<span class="hljs-number">0</span>] == <span class="hljs-string">'&lt;'</span> &amp;&amp; fragmentRE.test(selector))<span class="hljs-comment">// 如果传入的字符串是以&lt;开头且符合HTML代码规则（用了正则表达式），即创建元素</span>
            dom = zepto.fragment(selector, <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, context), selector = <span class="hljs-literal">null</span><span class="hljs-comment">// 创建一个DOM对象</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (context !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> $(context).find(selector)<span class="hljs-comment">// 这里其实是一种讨巧的办法，我相信jQuery中肯定不会这么写，目的是实现在指定范围内查找[context]元素</span>
        <span class="hljs-keyword">else</span> dom = zepto.qsa(<span class="hljs-built_in">document</span>, selector)<span class="hljs-comment">// 调用zepto.qsa解析字符串，返回一个DOM数组</span>
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isFunction(selector)) <span class="hljs-keyword">return</span> $(<span class="hljs-built_in">document</span>).ready(selector)<span class="hljs-comment">// 很简单，如果是函数，则在文档就绪后执行</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (zepto.isZ(selector)) <span class="hljs-keyword">return</span> selector<span class="hljs-comment">// 如果是一个zepto对象，直接返回</span>
    <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (isArray(selector)) dom = compact(selector)<span class="hljs-comment">// 如果是数组，调用compact返回一个数组，最后经Z变成类数组对象，我想这里是把几个DOM对象作为数组的参数传入，返回一个类数组对象</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isObject(selector))<span class="hljs-comment">// 如果是一个对象，将其包含在数组之内，如p = document.getElementById("#p");$(p);</span>
            dom = [selector], selector = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (fragmentRE.test(selector))<span class="hljs-comment">// 不知道是干嘛的</span>
            dom = zepto.fragment(selector.trim(), <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>, context), selector = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (context !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> $(context).find(selector)
        <span class="hljs-keyword">else</span> dom = zepto.qsa(<span class="hljs-built_in">document</span>, selector)
    }
    <span class="hljs-keyword">return</span> zepto.Z(dom, selector)<span class="hljs-comment">// 可以看这里，无论以上过程经历了什么，都要经过此函数，目的是将数组转化为类数组对象。</span>
}
zepto.Z = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom, selector</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Z(dom, selector)
}
<span class="hljs-comment">/**
 * 一个构造函数，将dom对象中的属性和方法都复制到this下，并添加了两个属性，length和selector，这个函数的目的是将DOM对象转化为供zepto使用的类数组对象
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Z</span>(<span class="hljs-params">dom, selector</span>) </span>{
    <span class="hljs-keyword">var</span> i, len = dom ? dom.length : <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; len; i++) <span class="hljs-keyword">this</span>[i] = dom[i]
    <span class="hljs-keyword">this</span>.length = len
    <span class="hljs-keyword">this</span>.selector = selector || <span class="hljs-string">''</span>
}
zepto.fragment = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html, name, properties</span>) </span>{
    <span class="hljs-comment">// 这里的代码就不展开了，其作用是返回一个DOM对象，若$()中传入第二个参数，则将其属性添加给创建的DOM对象</span>
    <span class="hljs-keyword">return</span> dom
}
zepto.qsa = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, selector</span>)</span>{
    <span class="hljs-comment">// 这里也不展开代码，又兴趣的可以直接看源码，很简单，无非是根据传入的选择符分别调用getElementByID、getElementsByTagName、getElementsByClassName、querySelectorAll等方法，返回一个数组，数组的值即是DOM对象，这就是最核心的选择器，有点坑爹。</span>
}</code></pre>
<p>这一段代码是zepto的核心代码，是使用zepto的入口，这里还是从文档入手比较好理解。</p>
<blockquote><p>Zepto集合是一个类似数组的对象，它具有链式方法来操作它指向的DOM节点，除了$(Zepto)对象上的直接方法外(如$.extend)，文档对象中的所有方法都是集合方法。</p></blockquote>
<p>上一句可以告诉我们：Zepto集合是一个类似数组的对象即是之前<code>$("#person")</code>返回的对象。文档中所有不带前缀的方法叫做<strong>集合方法</strong>。</p>
<p>再来看方法的调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(selector, [context])      // 在指定范围内查找[context]元素，类似$(context).find(selector)，例如$(&quot;.logo&quot;,&quot;.header&quot;)，只选取.header类中的.logo类
$(<Zepto collection>)       // 这里应该是指传入zepto对象，如：var a = $(&quot;a&quot;);$(a);
$(<DOM nodes>)              // 选取所有页面中的div元素,如：$('div')
$(htmlString)               // 创建一个元素，如：$(&quot;<p>Hello</p>&quot;)
$(htmlString, attributes)   // 创建带有属性的元素，$(&quot;<p />&quot;, { text:&quot;Hello&quot;, id:&quot;greeting&quot;, css:{color:'darkblue'} })
Zepto(function($){ ... })   // 当页面ready的时候，执行回调
// 还有写文档中没有
$()或$(&quot;&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smalltalk"><code><span class="hljs-string">$(</span>selector, [context])      // 在指定范围内查找[context]元素，类似<span class="hljs-string">$(</span>context).find(selector)，例如<span class="hljs-string">$(</span><span class="hljs-comment">".logo"</span>,<span class="hljs-comment">".header"</span>)，只选取.header类中的.logo类
<span class="hljs-string">$(</span>&lt;<span class="hljs-type">Zepto</span> collection&gt;)       // 这里应该是指传入zepto对象，如：var a = <span class="hljs-string">$(</span><span class="hljs-comment">"a"</span>);<span class="hljs-string">$(</span>a);
<span class="hljs-string">$(</span>&lt;<span class="hljs-type">DOM</span> nodes&gt;)              // 选取所有页面中的div元素,如：<span class="hljs-string">$(</span><span class="hljs-string">'div'</span>)
<span class="hljs-string">$(</span>htmlString)               // 创建一个元素，如：<span class="hljs-string">$(</span><span class="hljs-comment">"&lt;p&gt;Hello&lt;/p&gt;"</span>)
<span class="hljs-string">$(</span>htmlString, attributes)   // 创建带有属性的元素，<span class="hljs-string">$(</span><span class="hljs-comment">"&lt;p /&gt;"</span>, { text:<span class="hljs-comment">"Hello"</span>, id:<span class="hljs-comment">"greeting"</span>, css:{color:<span class="hljs-string">'darkblue'</span>} })
<span class="hljs-type">Zepto</span>(function(<span class="hljs-string">$)</span>{ ... })   // 当页面ready的时候，执行回调
// 还有写文档中没有
<span class="hljs-string">$(</span>)或<span class="hljs-string">$(</span><span class="hljs-comment">""</span>)</code></pre>
<p>至于为什么调用Z()函数返回的对象都以Z为对象名呢？看这段小代码就可以明白</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Z(){
  this.name = 666;
}
z = new Z();
console.log(z);// 返回的对象名为Z" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Z</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.name = <span class="hljs-number">666</span>;
}
z = <span class="hljs-keyword">new</span> Z();
<span class="hljs-built_in">console</span>.log(z);<span class="hljs-comment">// 返回的对象名为Z</span></code></pre>
<p>这个过程比较复杂，建议你亲自动手试一试，还是以<code>$("#person")</code>为例，用Chrome在这一行打断点，然后步进，我看能不能做个flash图。<br><span class="img-wrap"><img data-src="/img/bVFHnj?w=730&amp;h=515" src="https://static.alili.tech/img/bVFHnj?w=730&amp;h=515" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>如果你仔细观察，这一层的核心源码最后大部分都有return返回，最终<code>$()</code>也会返回对象，整个过程其实是对向<code>$()</code>中传入的参数进行处理运算，最终返回一个zepto自己创造的对象，然后用于后续操作。</p>
<hr>
<h2 id="articleHeader6">总结</h2>
<p>zepto的源码对一般的熟练面向对象的人来说是非常简单的，对于有面向对象概念没有写过的人来说是那种踮起脚尖能得到的难度。最开始想学习jQuery源码，但看了一点觉得太复杂，于是投机取巧看zepto，也是完全理不清头绪啊，知道上个星期天找到了一种方法，写一端小代码，然后在Chrome里步进调试，看函数之间的依赖关系法，看函数的传入值，返回值，了解这个函数是做什么用的。最后慢慢的理清头绪。这篇文章在星期一就开始写，一直到星期四才算完成。</p>
<p><strong><code>$</code>(或<code>Zepto</code>)是一个函数对象，但他包含了一些特定的属性(方法)。可以直接调用这些属性(方法)，这些属性(方法)大都与浏览器无关。也可以执行<code>$</code>函数，执行后返回一个类数组对象，这个对象的原型中包含一些操作DOM的方法，向原型中添加属性(方法)，所有的对象都可以访问到。执行<code>$</code>函数是zepto的关键代码，其目的是根据传入函数的变量值，加工处理成类数组对象并返回，用于后续操作。</strong></p>
<p>同时发表在我的博客：<a href="http://liuzhenbase.com/zepto-source-code.html" rel="nofollow noreferrer" target="_blank">《zepto源码分析-代码结构》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
zepto源码分析-代码结构

## 原文链接
[https://segmentfault.com/a/1190000007515865](https://segmentfault.com/a/1190000007515865)


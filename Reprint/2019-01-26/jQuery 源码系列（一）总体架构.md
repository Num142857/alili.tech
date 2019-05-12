---
title: 'jQuery 源码系列（一）总体架构' 
date: 2019-01-26 2:30:18
hidden: true
slug: hfszvrcjmqm
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎来<a href="https://segmentfault.com/blog/yuren">我的专栏</a>查看系列文章。</p>
<p>决定你走多远的是基础，jQuery 源码分析，向长者膜拜！ </p>
<p>我虽然接触 jQuery 很久了，但也只是局限于表面使用的层次，碰到一些问题，找到 jQuery 的解决办法，然后使用。<strong>显然</strong>，这种做法的弊端就是，无论你怎么学，都只能是个小白。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008365624?w=690&amp;h=368" src="https://static.alili.tech/img/remote/1460000008365624?w=690&amp;h=368" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当我建立这个项目的时候，就表示，我要改变这一切了，做一些人想做，憧憬去做，但从没踏入第一步的事情，学习 jQuery 源码。</p>
<p>到目前为止，jQuery 的<a href="https://github.com/jquery/jquery" rel="nofollow noreferrer" target="_blank">贡献者团队</a>共 256 名成员，6000 多条 commits，可想而知，jQuery 是一个多么庞大的项目。jQuery <a href="https://jquery.com/" rel="nofollow noreferrer" target="_blank">官方</a>的版本目前是 v3.1.1，已经衍生出 jQueryUI、jQueryMobile 等多个项目。</p>
<p>虽然我在前端爬摸打滚一年多，自认基础不是很好，在没有外界帮助的情况下，直接阅读项目源码太难了，所以在边参考遍实践的过程中写下来这个项目。</p>
<p><strong>首先</strong>，先推荐一个 jQuery 的<a href="http://james.padolsey.com/jquery/" rel="nofollow noreferrer" target="_blank">源码查询</a>网站，这个网站给初学者非常大的帮助，不仅能查找不同版本的 jQuery 源码，还能索引函数，功能简直吊炸天。</p>
<p>另外，推荐两个分析 jQuery 的博客：</p>
<blockquote>
<p><a href="http://www.cnblogs.com/aaronjs/p/3279314.html" rel="nofollow noreferrer" target="_blank">jQuery源码分析系列</a></p>
<p><a href="http://www.cnblogs.com/nuysoft/archive/2011/11/14/2248023.html" rel="nofollow noreferrer" target="_blank">原创 jQuery1.6.1源码分析系列（停止更新）</a></p>
</blockquote>
<p>这两个博客给我了很大的帮助，谢谢。</p>
<p>另外还有下面的网址，让我在如何使用 jQuery 上得心应手：</p>
<blockquote><p><a href="http://www.css88.com/jqapi-1.9/" rel="nofollow noreferrer" target="_blank">jQuery API 中文文档</a></p></blockquote>
<h2 id="articleHeader0">jQuery 总体架构</h2>
<p>首先，jQuery 是一个开发框架，它的火爆程度已经无法用言语来形容，当你随便打开一个网站，一半以上直接使用了 jQuery。或许，早几年，一个前端工程师，只要会写 jQuery，就可以无忧工作。虽说最近 react、vue 很火，但 jQuery 中许多精彩的方法和逻辑值得每一个前端人员学习。</p>
<p>和其众多的框架一样，总要把接口放到外面来调用，内部往往是一个闭包，避免环境变量的污染。</p>
<p>先来看看 jQuery 使用上的几大特点：</p>
<ol>
<li><p>$('#id') 函数方式直接生成 jQuery 对象</p></li>
<li><p>$('#id').css().html().hide() 链式调用</p></li>
</ol>
<p>关于链式调用，我想有点基础都很容易实现，函数结尾 return this 即可，主要来介绍一下无 new 实现创建对象。</p>
<h2 id="articleHeader1">无 new 函数实现</h2>
<p>下面是一个普通的函数，很显然，会陷入死循环：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(){
  return new jQuery();
}
jQuery.prototype = {
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery();
}
jQuery.prototype = {
  ...
}</code></pre>
<p>这个死循环来的太突然，jQuery() 会创建一个 new jQuery，new jQuery 又会创建一个 new jQuery...</p>
<p>jQuery 用一个 init 函数来代替直接 new 函数名的方式，还要考虑到 jQuery 中分离作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(){
  return new jQuery.prototype.init();
}
jQuery.prototype = {
  constructor: jQuery,
  init: function(){
    this.jquery = 1.0;
    return this;
  },
  jquery: 2.0,
  each: function(){
    console.log('each');
    return this;
  }
}
jQuery().jquery //1.0
jQuery.prototype.jquery //2.0

jQuery().each() // error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.prototype.init();
}
jQuery.prototype = {
  <span class="hljs-attr">constructor</span>: jQuery,
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.jquery = <span class="hljs-number">1.0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  },
  <span class="hljs-attr">jquery</span>: <span class="hljs-number">2.0</span>,
  <span class="hljs-attr">each</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'each'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}
jQuery().jquery <span class="hljs-comment">//1.0</span>
jQuery.prototype.jquery <span class="hljs-comment">//2.0</span>

jQuery().each() <span class="hljs-comment">// error</span></code></pre>
<p>上面看似运行正常，但是问题出在 <code>jQuery().each() // error</code>，访问不到 each 函数。实际上，<code>new jQuery.prototype.init()</code> 返回到是谁的实例？是 init 这个函数的实例，所以 init 函数中的 this 就没了意义。</p>
<p>那么，如果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jq = jQuery();
jq.__proto__ === jQuery.prototype;
jq.each === jQuery.prototype.each;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jq = jQuery();
jq.__proto__ === jQuery.prototype;
jq.each === jQuery.prototype.each;</code></pre>
<p>如果可以实现上面的 proto 的指向问题，原型函数调用问题就解决了，<strong>但实际上</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jq = jQuery();
jq.__proto__ === jQuery.prototype.init.prototype; //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jq = jQuery();
jq.__proto__ === jQuery.prototype.init.prototype; <span class="hljs-comment">//true</span></code></pre>
<p>实际上，jq 的 proto 是指向 init 函数的原型，<strong>所以</strong>，我们可以把 <code>jQuery.prototype.init.prototype = jQuery.prototype</code>，这个时候，函数调用就顺理成章了，而且使用的都是引用，指向的都是同一个 prototype 对象，也不需要担心循环问题。实际上，jQuery 就是这么干的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(){
  return new jQuery.prototype.init();
}
jQuery.prototype = {
  constructor: jQuery,
  init: function(){
    this.jquery = 1.0;
    return this;
  },
  jquery: 2.0,
  each: function(){
    console.log('each');
    return this;
  }
}
jQuery.prototype.init.prototype = jQuery.prototype;
jQuery().each() //'each'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.prototype.init();
}
jQuery.prototype = {
  <span class="hljs-attr">constructor</span>: jQuery,
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.jquery = <span class="hljs-number">1.0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  },
  <span class="hljs-attr">jquery</span>: <span class="hljs-number">2.0</span>,
  <span class="hljs-attr">each</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'each'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}
jQuery.prototype.init.prototype = jQuery.prototype;
jQuery().each() <span class="hljs-comment">//'each'</span></code></pre>
<h2 id="articleHeader2">jQuery 内部结构图</h2>
<p>在说内部图之前，先说下 <code>jQuery.fn</code>，它实际上是 prototype 的一个引用，指向 jQuery.prototype 的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(){
  return new jQuery.prototype.init();
}
jQuery.fn = jQuery.prototype = {
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.prototype.init();
}
jQuery.fn = jQuery.prototype = {
  ...
}</code></pre>
<p>那么为什么要用 fn 指向 prototype？我本人查阅了一些资料，貌似还是下面的回答比较中肯：简介。你不觉得 fn 比 prototype 好写多了吗。</p>
<p>借用网上的一张图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008365625?w=690&amp;h=554" src="https://static.alili.tech/img/remote/1460000008365625?w=690&amp;h=554" alt="jquery 内部结构图" title="jquery 内部结构图" style="cursor: pointer; display: inline;"></span></p>
<p>从这张图中可以看出，window 对象上有两个公共的接口，分别是 $ 和 jQuery：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.jQuery = window.$ = jQuery;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.jQuery = <span class="hljs-built_in">window</span>.$ = jQuery;</code></pre>
<p><code>jQuery.extend</code> 方法是一个对象拷贝的方法，包括深拷贝，后面会详细讲解源码，暂时先放一边。</p>
<p>下面的关系可能会有些乱，但是仔细看了前面的介绍，应该能看懂。fn 就是 prototype，所以 jQuery 的 fn 和 prototype 属性指向 fn 对象，而 init 函数本身就是 jQuery.prototype 中的方法，且 init 函数的 prototype 原型指向 fn。</p>
<h2 id="articleHeader3">链式调用</h2>
<p>链式调用的好处，就是写出来的代码非常简洁，而且代码返回的都是同一个对象，提高代码效率。</p>
<p>前面已经说了，在没有返回值的原型函数后面添加 return this：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(){
  return new jQuery.fn.init();
}
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  init: function(){
    this.jquery = 3.0;
    return this;
  },
  each: function(){
    console.log('each');
    return this;
  }
}
jQuery.fn.init.prototype = jQuery.fn;
jQuery().each().each();
// 'each'
// 'each'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.fn.init();
}
jQuery.fn = jQuery.prototype = {
  <span class="hljs-attr">constructor</span>: jQuery,
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.jquery = <span class="hljs-number">3.0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  },
  <span class="hljs-attr">each</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'each'</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
}
jQuery.fn.init.prototype = jQuery.fn;
jQuery().each().each();
<span class="hljs-comment">// 'each'</span>
<span class="hljs-comment">// 'each'</span></code></pre>
<h2 id="articleHeader4">extend</h2>
<p>jQuery 中一个重要的函数便是 extend，既可以对本身 jQuery 的属性和方法进行扩张，又可以对原型的属性和方法进行扩展。</p>
<p>先来说下 extend 函数的功能，大概有两种，如果参数只有一个 object，即表示将这个对象扩展到 jQuery 的命名空间中，也就是所谓的 jQuery 的扩展。如果函数接收了多个 object，则表示一种属性拷贝，将后面多个对象的属性全拷贝到第一个对象上，这其中，还包括深拷贝，即非引用拷贝，第一个参数如果是 true 则表示深拷贝。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.extend(target);// jQuery 的扩展
jQuery.extend(target, obj1, obj2,..);//浅拷贝 
jQuery.extend(true, target, obj1, obj2,..);//深拷贝 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.extend(target);<span class="hljs-comment">// jQuery 的扩展</span>
jQuery.extend(target, obj1, obj2,..);<span class="hljs-comment">//浅拷贝 </span>
jQuery.extend(<span class="hljs-literal">true</span>, target, obj1, obj2,..);<span class="hljs-comment">//深拷贝 </span></code></pre>
<p>以下是 jQuery 3 之后的 extend 函数源码，自己做了注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.extend = jQuery.fn.extend = function () {
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // 判断是否为深拷贝
  if (typeof target === &quot;boolean&quot;) {
    deep = target;

    // 参数后移
    target = arguments[i] || {};
    i++;
  }

  // 处理 target 是字符串或奇怪的情况，isFunction(target) 可以判断 target 是否为函数
  if (typeof target !== &quot;object&quot; &amp;&amp; !jQuery.isFunction(target)) {
    target = {};
  }

  // 判断是否 jQuery 的扩展
  if (i === length) {
    target = this; // this 做一个标记，可以指向 jQuery，也可以指向 jQuery.fn
    i--;
  }

  for (; i < length; i++) {

    // null/undefined 判断
    if ((options = arguments[i]) != null) {

      // 这里已经统一了，无论前面函数的参数怎样，现在的任务就是 target 是目标对象，options 是被拷贝对象
      for (name in options) {
        src = target[name];
        copy = options[name];

        // 防止死循环，跳过自身情况
        if (target === copy) {
          continue;
        }

        // 深拷贝，且被拷贝对象是 object 或 array
        // 这是深拷贝的重点
        if (deep &amp;&amp; copy &amp;&amp; (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          // 说明被拷贝对象是数组
          if (copyIsArray) {
            copyIsArray = false;
            clone = src &amp;&amp; Array.isArray(src) ? src : [];
          // 被拷贝对象是 object
          } else {
            clone = src &amp;&amp; jQuery.isPlainObject(src) ? src : {};
          }

          // 递归拷贝子属性
          target[name] = jQuery.extend(deep, clone, copy);

          // 常规变量，直接 =
        } else if (copy !== undefined) {
            target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> options, name, src, copy, copyIsArray, clone, target = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] || {},
    i = <span class="hljs-number">1</span>,
    length = <span class="hljs-built_in">arguments</span>.length,
    deep = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// 判断是否为深拷贝</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target === <span class="hljs-string">"boolean"</span>) {
    deep = target;

    <span class="hljs-comment">// 参数后移</span>
    target = <span class="hljs-built_in">arguments</span>[i] || {};
    i++;
  }

  <span class="hljs-comment">// 处理 target 是字符串或奇怪的情况，isFunction(target) 可以判断 target 是否为函数</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">"object"</span> &amp;&amp; !jQuery.isFunction(target)) {
    target = {};
  }

  <span class="hljs-comment">// 判断是否 jQuery 的扩展</span>
  <span class="hljs-keyword">if</span> (i === length) {
    target = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// this 做一个标记，可以指向 jQuery，也可以指向 jQuery.fn</span>
    i--;
  }

  <span class="hljs-keyword">for</span> (; i &lt; length; i++) {

    <span class="hljs-comment">// null/undefined 判断</span>
    <span class="hljs-keyword">if</span> ((options = <span class="hljs-built_in">arguments</span>[i]) != <span class="hljs-literal">null</span>) {

      <span class="hljs-comment">// 这里已经统一了，无论前面函数的参数怎样，现在的任务就是 target 是目标对象，options 是被拷贝对象</span>
      <span class="hljs-keyword">for</span> (name <span class="hljs-keyword">in</span> options) {
        src = target[name];
        copy = options[name];

        <span class="hljs-comment">// 防止死循环，跳过自身情况</span>
        <span class="hljs-keyword">if</span> (target === copy) {
          <span class="hljs-keyword">continue</span>;
        }

        <span class="hljs-comment">// 深拷贝，且被拷贝对象是 object 或 array</span>
        <span class="hljs-comment">// 这是深拷贝的重点</span>
        <span class="hljs-keyword">if</span> (deep &amp;&amp; copy &amp;&amp; (jQuery.isPlainObject(copy) || (copyIsArray = <span class="hljs-built_in">Array</span>.isArray(copy)))) {
          <span class="hljs-comment">// 说明被拷贝对象是数组</span>
          <span class="hljs-keyword">if</span> (copyIsArray) {
            copyIsArray = <span class="hljs-literal">false</span>;
            clone = src &amp;&amp; <span class="hljs-built_in">Array</span>.isArray(src) ? src : [];
          <span class="hljs-comment">// 被拷贝对象是 object</span>
          } <span class="hljs-keyword">else</span> {
            clone = src &amp;&amp; jQuery.isPlainObject(src) ? src : {};
          }

          <span class="hljs-comment">// 递归拷贝子属性</span>
          target[name] = jQuery.extend(deep, clone, copy);

          <span class="hljs-comment">// 常规变量，直接 =</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (copy !== <span class="hljs-literal">undefined</span>) {
            target[name] = copy;
        }
      }
    }
  }

  <span class="hljs-comment">// Return the modified object</span>
  <span class="hljs-keyword">return</span> target;
}</code></pre>
<p>extend 函数符合 jQuery 中的参数处理规范，算是比较标准的一个。jQuery 对于参数的处理很有一套，总是喜欢错位来使得每一个位置上的变量和它们的名字一样，各司其职。比如 target 是目标对象，如果第一个参数是 boolean 型的，就对 deep 赋值 target，并把 target 向后移一位；如果参数对象只有一个，即对 jQuery 的扩展，就令 target 赋值 this，当前指针 i 减一。</p>
<p>这种方法逻辑虽然很复杂，但是带来一个非常大的优势：后面的处理逻辑只需要一个就可以。target 就是我们要拷贝的目标，options 就是要拷贝的对象，逻辑又显得非常的清晰。</p>
<p>extend 函数还需要主要一点，<code>jQuery.extend = jQuery.fn.extend</code>，不仅 jQuery 对象又这个函数，连原型也有，那么如何区分对象是扩展到哪里了呢，又是如何实现的？</p>
<p>其实这一切都要借助与 javascript 中 this 的动态性，<code>target = this</code>，代码就放在那里，谁去执行，this 就会指向谁，就会在它的属性上扩展。</p>
<h2 id="articleHeader5">由 extend 衍生的函数</h2>
<p>再看 extend 源码，里面有一些函数，只是看名字知道了它是干什么的，我专门挑出来，找到它们的源码。</p>
<h3 id="articleHeader6">jQuery.isFunction 源码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.isFunction = function (obj) {
    return jQuery.type(obj) === &quot;function&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.isFunction = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">return</span> jQuery.type(obj) === <span class="hljs-string">"function"</span>;
}</code></pre>
<p>这也太简单了些。这里又要引出 jQuery 里一个重要的函数 <code>jQuery.type</code>，这个函数用于类型判断。</p>
<p>首先，为什么传统的 typeof 不用？因为不好用（此处应有一个哭脸）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof(42) === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Despite being &quot;Not-A-Number&quot;
typeof Number(1) === 'number'; // but never use this form!

// Strings
typeof &quot;&quot; === 'string';
typeof &quot;bla&quot; === 'string';
typeof (typeof 1) === 'string'; // typeof always returns a string
typeof String(&quot;abc&quot;) === 'string'; // but never use this form!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // but never use this form!

// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// Objects
typeof {a:1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// The following is confusing. Don't use!
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String(&quot;abc&quot;) === 'object';

// Functions
typeof function(){} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';

// This stands since the beginning of JavaScript
typeof null === 'object';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Numbers</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-number">37</span> === <span class="hljs-string">'number'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-number">3.14</span> === <span class="hljs-string">'number'</span>;
<span class="hljs-keyword">typeof</span>(<span class="hljs-number">42</span>) === <span class="hljs-string">'number'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Math</span>.LN2 === <span class="hljs-string">'number'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">Infinity</span> === <span class="hljs-string">'number'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">NaN</span> === <span class="hljs-string">'number'</span>; <span class="hljs-comment">// Despite being "Not-A-Number"</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>) === <span class="hljs-string">'number'</span>; <span class="hljs-comment">// but never use this form!</span>

<span class="hljs-comment">// Strings</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-string">""</span> === <span class="hljs-string">'string'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-string">"bla"</span> === <span class="hljs-string">'string'</span>;
<span class="hljs-keyword">typeof</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-number">1</span>) === <span class="hljs-string">'string'</span>; <span class="hljs-comment">// typeof always returns a string</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"abc"</span>) === <span class="hljs-string">'string'</span>; <span class="hljs-comment">// but never use this form!</span>

<span class="hljs-comment">// Booleans</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span> === <span class="hljs-string">'boolean'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">false</span> === <span class="hljs-string">'boolean'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">true</span>) === <span class="hljs-string">'boolean'</span>; <span class="hljs-comment">// but never use this form!</span>

<span class="hljs-comment">// Symbols</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>() === <span class="hljs-string">'symbol'</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'foo'</span>) === <span class="hljs-string">'symbol'</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Symbol</span>.iterator === <span class="hljs-string">'symbol'</span>

<span class="hljs-comment">// Undefined</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span> === <span class="hljs-string">'undefined'</span>;
<span class="hljs-keyword">typeof</span> declaredButUndefinedVariable === <span class="hljs-string">'undefined'</span>;
<span class="hljs-keyword">typeof</span> undeclaredVariable === <span class="hljs-string">'undefined'</span>; 

<span class="hljs-comment">// Objects</span>
<span class="hljs-keyword">typeof</span> {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>} === <span class="hljs-string">'object'</span>;

<span class="hljs-comment">// use Array.isArray or Object.prototype.toString.call</span>
<span class="hljs-comment">// to differentiate regular objects from arrays</span>
<span class="hljs-keyword">typeof</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>] === <span class="hljs-string">'object'</span>;

<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() === <span class="hljs-string">'object'</span>;

<span class="hljs-comment">// The following is confusing. Don't use!</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-literal">true</span>) === <span class="hljs-string">'object'</span>; 
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>) === <span class="hljs-string">'object'</span>; 
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"abc"</span>) === <span class="hljs-string">'object'</span>;

<span class="hljs-comment">// Functions</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{} === <span class="hljs-string">'function'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">C</span> </span>{} === <span class="hljs-string">'function'</span>;
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Math</span>.sin === <span class="hljs-string">'function'</span>;

<span class="hljs-comment">// This stands since the beginning of JavaScript</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span> === <span class="hljs-string">'object'</span>;</code></pre>
<p>可以看得出来，对于一些 new 对象，比如 <code>new Number(1)</code>，也会返回 object。具体请参考<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" rel="nofollow noreferrer" target="_blank">typeof MDN</a>。</p>
<p>网上有两种解决方法（有效性未经考证，请相信 jQuery 的方法），一种是用 <code>constructor.name</code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor" rel="nofollow noreferrer" target="_blank">Object.prototype.constructor MDN</a>，一种是用 <code>Object.prototype.toString.call()</code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString" rel="nofollow noreferrer" target="_blank">Object.prototype.toString()</a>，最终 jQuery 选择了后者。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var n1 = 1;
n1.constructor.name;//&quot;Number&quot;
var n2 = new Number(1);
n2.constructor.name;//&quot;Number&quot;

var toString = Object.prototype.toString;
toString.call(n1);//&quot;[object Number]&quot;
toString.call(n2);//&quot;[object Number]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> n1 = <span class="hljs-number">1</span>;
n1.constructor.name;<span class="hljs-comment">//"Number"</span>
<span class="hljs-keyword">var</span> n2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(<span class="hljs-number">1</span>);
n2.constructor.name;<span class="hljs-comment">//"Number"</span>

<span class="hljs-keyword">var</span> toString = <span class="hljs-built_in">Object</span>.prototype.toString;
toString.call(n1);<span class="hljs-comment">//"[object Number]"</span>
toString.call(n2);<span class="hljs-comment">//"[object Number]"</span></code></pre>
<p>以上属于科普，原理不多阐述，接下来继续看源码 <code>jQuery.type</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个对象是用来将 toString 函数返回的字符串转成
var class2type = {
    &quot;[object Boolean]&quot;: &quot;boolean&quot;,
    &quot;[object Number]&quot;: &quot;number&quot;,
    &quot;[object String]&quot;: &quot;string&quot;,
    &quot;[object Function]&quot;: &quot;function&quot;,
    &quot;[object Array]&quot;: &quot;array&quot;,
    &quot;[object Date]&quot;: &quot;date&quot;,
    &quot;[object RegExp]&quot;: &quot;regexp&quot;,
    &quot;[object Object]&quot;: &quot;object&quot;,
    &quot;[object Error]&quot;: &quot;error&quot;,
    &quot;[object Symbol]&quot;: &quot;symbol&quot;
}
var toString = Object.prototype.toString;

jQuery.type = function (obj) {
    if (obj == null) {
        return obj + &quot;&quot;;
    }
    return 
      typeof obj === &quot;object&quot; || typeof obj === &quot;function&quot; ? 
        class2type[toString.call(obj)] || &quot;object&quot; : 
        typeof obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这个对象是用来将 toString 函数返回的字符串转成</span>
<span class="hljs-keyword">var</span> class2type = {
    <span class="hljs-string">"[object Boolean]"</span>: <span class="hljs-string">"boolean"</span>,
    <span class="hljs-string">"[object Number]"</span>: <span class="hljs-string">"number"</span>,
    <span class="hljs-string">"[object String]"</span>: <span class="hljs-string">"string"</span>,
    <span class="hljs-string">"[object Function]"</span>: <span class="hljs-string">"function"</span>,
    <span class="hljs-string">"[object Array]"</span>: <span class="hljs-string">"array"</span>,
    <span class="hljs-string">"[object Date]"</span>: <span class="hljs-string">"date"</span>,
    <span class="hljs-string">"[object RegExp]"</span>: <span class="hljs-string">"regexp"</span>,
    <span class="hljs-string">"[object Object]"</span>: <span class="hljs-string">"object"</span>,
    <span class="hljs-string">"[object Error]"</span>: <span class="hljs-string">"error"</span>,
    <span class="hljs-string">"[object Symbol]"</span>: <span class="hljs-string">"symbol"</span>
}
<span class="hljs-keyword">var</span> toString = <span class="hljs-built_in">Object</span>.prototype.toString;

jQuery.type = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">if</span> (obj == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> obj + <span class="hljs-string">""</span>;
    }
    <span class="hljs-keyword">return</span> 
      <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> obj === <span class="hljs-string">"function"</span> ? 
        class2type[toString.call(obj)] || <span class="hljs-string">"object"</span> : 
        <span class="hljs-keyword">typeof</span> obj;
}</code></pre>
<p>因为 jQuery 用的是 toString 方法，所以需要有一个 class2type 的对象用来转换。</p>
<h3 id="articleHeader7">jQuery.isPlainObject</h3>
<p>这个函数用来判断对象是否是一个纯粹的对象，：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getProto = Object.getPrototypeOf;//获取父对象
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call( Object );

jQuery.isPlainObject = function (obj) {
    var proto, Ctor;

    // 排除 underfined、null 和非 object 情况
    if (!obj || toString.call(obj) !== &quot;[object Object]&quot;) {
        return false;
    }

    proto = getProto(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = hasOwn.call(proto, &quot;constructor&quot;) &amp;&amp; proto.constructor;
    return typeof Ctor === &quot;function&quot; &amp;&amp; fnToString.call(Ctor) === ObjectFunctionString;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getProto = <span class="hljs-built_in">Object</span>.getPrototypeOf;<span class="hljs-comment">//获取父对象</span>
<span class="hljs-keyword">var</span> hasOwn = class2type.hasOwnProperty;
<span class="hljs-keyword">var</span> fnToString = hasOwn.toString;
<span class="hljs-keyword">var</span> ObjectFunctionString = fnToString.call( <span class="hljs-built_in">Object</span> );

jQuery.isPlainObject = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> proto, Ctor;

    <span class="hljs-comment">// 排除 underfined、null 和非 object 情况</span>
    <span class="hljs-keyword">if</span> (!obj || toString.call(obj) !== <span class="hljs-string">"[object Object]"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    proto = getProto(obj);

    <span class="hljs-comment">// Objects with no prototype (e.g., `Object.create( null )`) are plain</span>
    <span class="hljs-keyword">if</span> (!proto) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-comment">// Objects with prototype are plain iff they were constructed by a global Object function</span>
    Ctor = hasOwn.call(proto, <span class="hljs-string">"constructor"</span>) &amp;&amp; proto.constructor;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> Ctor === <span class="hljs-string">"function"</span> &amp;&amp; fnToString.call(Ctor) === ObjectFunctionString;
}</code></pre>
<p>看一下效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.isPlainObject({});// true
jQuery.isPlainObject({ a: 1 });// true
jQuery.isPlainObject(new Object());// true

jQuery.isPlainObject([]);// false
jQuery.isPlainObject(new String('a'));// false
jQuery.isPlainObject(function(){});// false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.isPlainObject({});<span class="hljs-comment">// true</span>
jQuery.isPlainObject({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> });<span class="hljs-comment">// true</span>
jQuery.isPlainObject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>());<span class="hljs-comment">// true</span>

jQuery.isPlainObject([]);<span class="hljs-comment">// false</span>
jQuery.isPlainObject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">'a'</span>));<span class="hljs-comment">// false</span>
jQuery.isPlainObject(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});<span class="hljs-comment">// false</span></code></pre>
<p>除了这几个函数之外，还有个 <code>Array.isArray()</code>，这个真的不用介绍了吧。</p>
<h2 id="articleHeader8">总结</h2>
<p>总结还是多说一点的好，现在已经基本理清 jQuery 内部的情况了？no，还差一点，看下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(window) {
  // jQuery 变量，用闭包避免环境污染
  var jQuery = (function() {
    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    };

    // 一些变量声明

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
          // 下章会重点讨论
        }

        // 原型方法
    };

    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.extend = jQuery.fn.extend = function() {};//已介绍

    jQuery.extend({
        // 一堆静态属性和方法
        // 用 extend 绑定，而不是直接在 jQuery 上写
    });

    return jQuery;
  })();

  // 工具方法 Utilities
  // 回调函数列表 Callbacks Object
  // 异步队列 Defferred Object
  // 浏览器功能测试 Support
  // 数据缓存 Data
  // 队列 Queue
  // 属性操作 Attributes
  // 事件系统 Events
  // 选择器 Sizzle
  // DOM遍历 Traversing
  // 样式操作 CSS（计算样式、内联样式）
  // 异步请求 Ajax
  // 动画 Effects
  // 坐标 Offset、尺寸 Dimensions

  window.jQuery = window.$ = jQuery;
})(window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">window</span>) </span>{
  <span class="hljs-comment">// jQuery 变量，用闭包避免环境污染</span>
  <span class="hljs-keyword">var</span> jQuery = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, context</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.fn.init(selector, context, rootjQuery);
    };

    <span class="hljs-comment">// 一些变量声明</span>

    jQuery.fn = jQuery.prototype = {
        <span class="hljs-attr">constructor</span>: jQuery,
        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, context, rootjQuery</span>) </span>{
          <span class="hljs-comment">// 下章会重点讨论</span>
        }

        <span class="hljs-comment">// 原型方法</span>
    };

    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{};<span class="hljs-comment">//已介绍</span>

    jQuery.extend({
        <span class="hljs-comment">// 一堆静态属性和方法</span>
        <span class="hljs-comment">// 用 extend 绑定，而不是直接在 jQuery 上写</span>
    });

    <span class="hljs-keyword">return</span> jQuery;
  })();

  <span class="hljs-comment">// 工具方法 Utilities</span>
  <span class="hljs-comment">// 回调函数列表 Callbacks Object</span>
  <span class="hljs-comment">// 异步队列 Defferred Object</span>
  <span class="hljs-comment">// 浏览器功能测试 Support</span>
  <span class="hljs-comment">// 数据缓存 Data</span>
  <span class="hljs-comment">// 队列 Queue</span>
  <span class="hljs-comment">// 属性操作 Attributes</span>
  <span class="hljs-comment">// 事件系统 Events</span>
  <span class="hljs-comment">// 选择器 Sizzle</span>
  <span class="hljs-comment">// DOM遍历 Traversing</span>
  <span class="hljs-comment">// 样式操作 CSS（计算样式、内联样式）</span>
  <span class="hljs-comment">// 异步请求 Ajax</span>
  <span class="hljs-comment">// 动画 Effects</span>
  <span class="hljs-comment">// 坐标 Offset、尺寸 Dimensions</span>

  <span class="hljs-built_in">window</span>.jQuery = <span class="hljs-built_in">window</span>.$ = jQuery;
})(<span class="hljs-built_in">window</span>);</code></pre>
<p>可以看出 jQuery 很巧妙的整体布局思路，对于属性方法和原型方法等区分，防止变量污染等，都做的非常好。阅读框架源码只是开头，有趣的还在后面。</p>
<h2 id="articleHeader9">参考</h2>
<blockquote><p><a href="http://www.cnblogs.com/aaronjs/p/3278578.html" rel="nofollow noreferrer" target="_blank">jQuery 2.0.3 源码分析core - 整体架构</a><br><a href="http://www.cnblogs.com/yiyang/p/4959373.html" rel="nofollow noreferrer" target="_blank">《jQuery源码解析》读书笔记（第二章：构造jQuery对象）</a><br><a href="http://www.365mini.com/page/jquery_isplainobject.htm" rel="nofollow noreferrer" target="_blank">jQuery.isPlainObject() 函数详解</a></p></blockquote>
<p>本文在 github 上的<a href="https://github.com/songjinzhong/JQuerySource" rel="nofollow noreferrer" target="_blank">源码地址</a>，欢迎来 star。</p>
<p>欢迎来<a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">我的博客</a>交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 源码系列（一）总体架构

## 原文链接
[https://segmentfault.com/a/1190000008365621](https://segmentfault.com/a/1190000008365621)


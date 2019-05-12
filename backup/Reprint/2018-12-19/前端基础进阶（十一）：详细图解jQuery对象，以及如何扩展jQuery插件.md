---
title: '前端基础进阶（十一）：详细图解jQuery对象，以及如何扩展jQuery插件' 
date: 2018-12-19 2:30:08
hidden: true
slug: aiff4ut7rhf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749398" src="https://static.alili.tech/img/remote/1460000008749398" alt="配图与本文无关" title="配图与本文无关" style="cursor: pointer; display: inline;"></span></p>
<p>早几年学习前端，大家都非常热衷于研究jQuery源码。我还记得当初从jQuery源码中学到一星半点应用技巧的时候常会有一种发自内心的惊叹，“原来JavaScript居然可以这样用！”</p>
<p>虽然随着前端的发展，另外几种前端框架的崛起，jQuery慢慢变得不再是必须。因此大家对于jQuery的热情低了很多。但是许多从jQuery中学到的技巧用在实际开发中仍然非常好用。简单的了解它也有助于我们更加深入的理解JavaScript。</p>
<p>这篇文章的主要目的就是跟大家分享一下，jquery对象是如何封装的。算是对于大家进一步学习jQuery源码的一个抛砖引玉。</p>
<p>使用jQuery对象时，我们这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明一个jQuery对象
$('.target')

// 获取元素的css属性
$('.target').css('width')

// 获取元素的位置信息
$('.target').offset()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 声明一个jQuery对象</span>
$(<span class="hljs-string">'.target'</span>)

<span class="hljs-comment">// 获取元素的css属性</span>
$(<span class="hljs-string">'.target'</span>).css(<span class="hljs-string">'width'</span>)

<span class="hljs-comment">// 获取元素的位置信息</span>
$(<span class="hljs-string">'.target'</span>).offset()</code></pre>
<p>在使用之初可能会有许多疑问，比如$是怎么回事？为什么不用new就可以直接声明一个对象等等。后来了解之后，才知道原来这正是jQuery对象创建的巧妙之处。</p>
<p>先直接用代码展示出来，再用图跟大家解释是怎么回事。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";
(function(ROOT) {

    // 构造函数
    var jQuery = function(selector) {

        // 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        version: '1.0.0',

        init: function(selector) {
            // 在jquery中这里有一个复杂的判断，但是这里我做了简化
            var elem, selector;
             elem = document.querySelector(selector);
            this[0] = elem;

            // 在jquery中返回一个由所有原型属性方法组成的数组，我们这里简化，直接返回this即可
            // return jQuery.makeArray(selector, this);
            return this;
        },

        // 在原型上添加一堆方法
        toArray: function() {},
        get: function() {},
        each: function() {},
        ready: function() {},
        first: function() {},
        slice: function() {}
        // ... ...
    }

    jQuery.fn.init.prototype = jQuery.fn;

    // 实现jQuery的两种扩展方式
    jQuery.extend = jQuery.fn.extend = function(options) {

        // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
        var target = this;
        var copy;

        for(name in options) {
            copy = options[name];
            target[name] = copy;
        }
        return target;
    }

    // jQuery中利用上面实现的扩展机制，添加了许多方法，其中

    // 直接添加在构造函数上，被称为工具方法
    jQuery.extend({
        isFunction: function() {},
        type: function() {},
        parseHTML: function() {},
        parseJSON: function() {},
        ajax: function() {}
        // ...
    })

    // 添加到原型上
    jQuery.fn.extend({
        queue: function() {},
        promise: function() {},
        attr: function() {},
        prop: function() {},
        addClass: function() {},
        removeClass: function() {},
        val: function() {},
        css: function() {}
        // ...
    })

    // $符号的由来，实际上它就是jQuery，一个简化的写法，在这里我们还可以替换成其他可用字符
    ROOT.jQuery = ROOT.$ = jQuery;

})(window);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ROOT</span>) </span>{

    <span class="hljs-comment">// 构造函数</span>
    <span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector</span>) </span>{

        <span class="hljs-comment">// 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        <span class="hljs-attr">constructor</span>: jQuery,

        <span class="hljs-attr">version</span>: <span class="hljs-string">'1.0.0'</span>,

        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector</span>) </span>{
            <span class="hljs-comment">// 在jquery中这里有一个复杂的判断，但是这里我做了简化</span>
            <span class="hljs-keyword">var</span> elem, selector;
             elem = <span class="hljs-built_in">document</span>.querySelector(selector);
            <span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>] = elem;

            <span class="hljs-comment">// 在jquery中返回一个由所有原型属性方法组成的数组，我们这里简化，直接返回this即可</span>
            <span class="hljs-comment">// return jQuery.makeArray(selector, this);</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
        },

        <span class="hljs-comment">// 在原型上添加一堆方法</span>
        toArray: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">each</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">ready</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">first</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">slice</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
        <span class="hljs-comment">// ... ...</span>
    }

    jQuery.fn.init.prototype = jQuery.fn;

    <span class="hljs-comment">// 实现jQuery的两种扩展方式</span>
    jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{

        <span class="hljs-comment">// 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了</span>
        <span class="hljs-keyword">var</span> target = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> copy;

        <span class="hljs-keyword">for</span>(name <span class="hljs-keyword">in</span> options) {
            copy = options[name];
            target[name] = copy;
        }
        <span class="hljs-keyword">return</span> target;
    }

    <span class="hljs-comment">// jQuery中利用上面实现的扩展机制，添加了许多方法，其中</span>

    <span class="hljs-comment">// 直接添加在构造函数上，被称为工具方法</span>
    jQuery.extend({
        <span class="hljs-attr">isFunction</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">type</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">parseHTML</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">parseJSON</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">ajax</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
        <span class="hljs-comment">// ...</span>
    })

    <span class="hljs-comment">// 添加到原型上</span>
    jQuery.fn.extend({
        <span class="hljs-attr">queue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">promise</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">attr</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">prop</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">addClass</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">removeClass</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">val</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">css</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
        <span class="hljs-comment">// ...</span>
    })

    <span class="hljs-comment">// $符号的由来，实际上它就是jQuery，一个简化的写法，在这里我们还可以替换成其他可用字符</span>
    ROOT.jQuery = ROOT.$ = jQuery;

})(<span class="hljs-built_in">window</span>);
</code></pre>
<p>在上面的代码中，我封装了一个简化版的jQuery对象。它向大家简单展示了jQuery的整体框架情况。如果了解了整体框架，那么大家去读jQuery源码，就会变得非常轻松。</p>
<p>我们在代码中可以看到，jQuery自身对于原型的处理使用了一些巧妙的语法，比如<code>jQuery.fn = jQuery.prototype</code>，<code>jQuery.fn.init.prototype = jQuery.fn;</code>等，这几句正式jQuery对象的关键所在，下面我用图给大家展示一下这中间的逻辑是怎么回事。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749399" src="https://static.alili.tech/img/remote/1460000008749399" alt="jQuery对象核心图" title="jQuery对象核心图" style="cursor: pointer; display: inline;"></span></p>
<p><strong> 对象封装分析 </strong></p>
<p>在上面的实现中，代码首先在jQuery构造函数中声明了一个fn属性，并将其指向了原型<code>jQuery.prototype</code>。并在原型中添加了init方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.fn = jQuery.prototype = {
    init: {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.fn = jQuery.prototype = {
    <span class="hljs-attr">init</span>: {}
}</code></pre>
<p>之后又将init的原型，指向了jQuery.prototype。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.fn.init.prototype = jQuery.fn;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">jQuery.fn.init.prototype = jQuery.fn;</code></pre>
<p>而在构造函数jQuery中，返回了init的实例对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jQuery = function(selector) {

    // 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
    return new jQuery.fn.init(selector)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jQuery = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector</span>) </span>{

    <span class="hljs-comment">// 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery.fn.init(selector)
}</code></pre>
<p>最后对外暴露入口时，将字符<code>$</code>与<code>jQuery</code>对等起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ROOT.jQuery = ROOT.$ = jQuery;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ROOT.jQuery = ROOT.$ = jQuery;</code></pre>
<p>因此当我们直接使用<code>$('#test')</code>创建一个对象时，实际上是创建了一个init的实例，这里的正真构造函数是原型中的init方法。</p>
<p><strong>注意：</strong>许多对jQuery内部实现不太了解的盆友，在使用jQuery时常常会毫无节制使用<code>$()</code>，比如对于同一个元素的不同操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var width = parseInt($('#test').css('width'));
if(width > 20) {
    $('#test').css('backgroundColor', 'red');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> width = <span class="hljs-built_in">parseInt</span>($(<span class="hljs-string">'#test'</span>).css(<span class="hljs-string">'width'</span>));
<span class="hljs-keyword">if</span>(width &gt; <span class="hljs-number">20</span>) {
    $(<span class="hljs-string">'#test'</span>).css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'red'</span>);
}</code></pre>
<p>通过我们上面的一系列分析，我们知道每当我们执行<code>$()</code>时，就会重新生成一个init的实例对象，因此当我们这样没有节制的使用jQuery时是非常不正确的，虽然看上去方便了一些，但是对于内存的消耗是非常大的。正确的做法是既然是同一个对象，那么就用一个变量保存起来后续使用即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $test = $('#test');
var width = parseInt($test.css('width'));
if(width > 20) {
    $test.css('backgroundColor', 'red');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> $test = $(<span class="hljs-string">'#test'</span>);
<span class="hljs-keyword">var</span> width = <span class="hljs-built_in">parseInt</span>($test.css(<span class="hljs-string">'width'</span>));
<span class="hljs-keyword">if</span>(width &gt; <span class="hljs-number">20</span>) {
    $test.css(<span class="hljs-string">'backgroundColor'</span>, <span class="hljs-string">'red'</span>);
}</code></pre>
<p><strong>扩展方法分析</strong></p>
<p>在上面的代码实现中，我还简单实现了两个扩展方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.extend = jQuery.fn.extend = function(options) {

    // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
    var target = this;
    var copy;

    for(name in options) {
        copy = options[name];
        target[name] = copy;
    }
    return target;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{

    <span class="hljs-comment">// 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了</span>
    <span class="hljs-keyword">var</span> target = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> copy;

    <span class="hljs-keyword">for</span>(name <span class="hljs-keyword">in</span> options) {
        copy = options[name];
        target[name] = copy;
    }
    <span class="hljs-keyword">return</span> target;
}</code></pre>
<p>要理解它的实现，我们首先要明确的知道this的指向。如果你搞不清楚，可以回头去看看我们之前关于this指向的讲解。传入的参数options对象为一个<code>key: value</code>模式的对象，我通过<code>for in</code>遍历options，将key作为jQuery的新属性，value作为该新属性所对应的新方法，分别添加到jQuery方法和jQuery.fn中。</p>
<p>也就是说，当我们通过<code>jQuery.extend</code>扩展jQuery时，方法被添加到了jQuery构造函数中，而当我们通过<code>jQuery.fn.extend</code>扩展jQuery时，方法被添加到了jQuery原型中。</p>
<p>上面的例子中，我也简单展示了在jQuery内部，许多方法的实现都是通过这两个扩展方法来完成的。</p>
<blockquote>当我们通过上面的知识了解了jQuery的大体框架之后，那么我们对于jQuery的学习就可以具体到诸如css/val/attr等方法是如何实现这样的程度，那么源码学习起来就会轻松很多，也会节约更多的时间。也给一些对于源码敬而远之的朋友提供了一个学习的可能。</blockquote>
<p>有一个朋友留言给我，说她被静态方法，工具方法和实例方法这几个概念困扰了很久，到底他们有什么区别？</p>
<p>其实在上一篇文章中，关于封装一个对象，我跟大家分享了一个非常非常干货，但是却只有少数几个读者老爷get到的知识，那就是在封装对象时，属性和方法可以具体放置的三个位置，并且对于这三个位置的不同做了一个详细的解读。</p>
<p>而在实现jQuery扩展方法的想法中，一部分方法需要扩展到jQuery构造函数中，一部分方法需要扩展到原型中，当我们通读jQuery源码，还发现有一些方法放在了模块作用域中，至于为什么会有这样的区别，建议大家回过头去读读前一篇文章。</p>
<p>而放在构造函数中的方法，因为我们在使用时，不需要声明一个实例对象就可以直接使用，因此这样的方法常常被叫做工具方法，或者所谓的静态方法。工具方法在使用时因为不用创建新的实例，因此相对而言效率会高很多，但是并不节省内存。</p>
<p>而工具方法的特性也和工具一词非常贴近，他们与实例的自身属性毫无关联，仅仅只是实现一些通用的功能，我们可以通过<code>$.each</code>与<code>$('div').each</code>这2个方法来体会工具方法与实例方法的不同之处。</p>
<p>在实际开发中，我们运用得非常多的一个工具库就是<code>lodash.js</code>，大家如果时间充裕一定要去学习一下他的使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax()
$.isFunction()
$.each()
... ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$.ajax()
$.isFunction()
$.each()
... ...</code></pre>
<p>而放在原型中的方法，在使用时必须创建了一个新的实例对象才能访问，因此这样的方法叫做实例方法。也正是由于必须创建了一个实例之后才能访问，所以他的使用成本会比工具方法高很多。但是节省了内存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#test').css()
$('#test').attr()
$('div').each()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'#test'</span>).css()
$(<span class="hljs-string">'#test'</span>).attr()
$(<span class="hljs-string">'div'</span>).each()</code></pre>
<p>这样，那位同学的疑问就很简单的被搞定了。我们在学习的时候，一定不要过分去纠结一些概念，而要明白具体怎么回事儿，那么学习这件事情就不会在一些奇奇怪怪的地方卡住了。</p>
<p>所以通过<code>$.extend</code>扩展的方法，其实就是对工具方法的扩展，而通过<code>$.fn.extend</code>扩展的方法，就是对于实例方法的扩展。那么我们在使用的时候就知道如何准确的去使用自己扩展的方法了。</p>
<p><strong>jQuery插件的实现</strong></p>
<p>我在初级阶段的时候，觉得要自己编写一个jQuery插件是一件高大上的事情，可望不可即。但是通过对于上面的理解，我就知道扩展jQuery插件其实是一件我们自己也可以完成的事情。</p>
<p>在前面我跟大家分享了jQuery如何实现，以及他们的方法如何扩展，并且前一篇文章分享了拖拽对象的具体实现。所以建议大家暂时不要阅读下去，自己动手尝试将拖拽扩展成为jQuery的一个实例方法，那么这就是一个jQuery插件了。</p>
<p>具体也没有什么可多说的了，大家看了代码就可以明白一切。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Drag对象简化代码，完整源码可在上一篇文章中查看
;
(function() {

    // 构造
    function Drag(selector) {}


    // 原型
    Drag.prototype = {
        constructor: Drag,

        init: function() {
            // 初始时需要做些什么事情
            this.setDrag();
        },

        // 稍作改造，仅用于获取当前元素的属性，类似于getName
        getStyle: function(property) {},

        // 用来获取当前元素的位置信息，注意与之前的不同之处
        getPosition: function() {},

        // 用来设置当前元素的位置
        setPostion: function(pos) {},

        // 该方法用来绑定事件
        setDrag: function() {}
    }

    // 一种对外暴露的方式
    window.Drag = Drag;
})();

// 通过扩展方法将拖拽扩展为jQuery的一个实例方法
(function ($) {
  $.fn.extend({
    becomeDrag: function () {
      new Drag(this[0]);
      return this;   // 注意：为了保证jQuery所有的方法都能够链式访问，每一个方法的最后都需要返回this，即返回jQuery实例
    }
  })
})(jQuery);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Drag对象简化代码，完整源码可在上一篇文章中查看</span>
;
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">// 构造</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Drag</span>(<span class="hljs-params">selector</span>) </span>{}


    <span class="hljs-comment">// 原型</span>
    Drag.prototype = {
        <span class="hljs-attr">constructor</span>: Drag,

        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 初始时需要做些什么事情</span>
            <span class="hljs-keyword">this</span>.setDrag();
        },

        <span class="hljs-comment">// 稍作改造，仅用于获取当前元素的属性，类似于getName</span>
        getStyle: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">property</span>) </span>{},

        <span class="hljs-comment">// 用来获取当前元素的位置信息，注意与之前的不同之处</span>
        getPosition: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},

        <span class="hljs-comment">// 用来设置当前元素的位置</span>
        setPostion: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">pos</span>) </span>{},

        <span class="hljs-comment">// 该方法用来绑定事件</span>
        setDrag: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    }

    <span class="hljs-comment">// 一种对外暴露的方式</span>
    <span class="hljs-built_in">window</span>.Drag = Drag;
})();

<span class="hljs-comment">// 通过扩展方法将拖拽扩展为jQuery的一个实例方法</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$</span>) </span>{
  $.fn.extend({
    <span class="hljs-attr">becomeDrag</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">new</span> Drag(<span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>]);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;   <span class="hljs-comment">// 注意：为了保证jQuery所有的方法都能够链式访问，每一个方法的最后都需要返回this，即返回jQuery实例</span>
    }
  })
})(jQuery);</code></pre>
<p><strong>后续文章内容一个大概预想</strong></p>
<p>去年年末的时候就有了想要将JavaScript基础知识总结一下的这样一个想法，可是JavaScript基础知识确实并非全部是层层递进的关系，有很多碎片化的东西，所以之前一直没有找到一个合适的整理方法。</p>
<p>直到在segmentfault中我在给题主建议如何快速学习一门诸如react/vue这样的流行框架时，找到了一个好一点的思路，于是就有了这样一系列文章，虽然它并不全面，很多知识没有涉及到，但是其实我是围绕最终通过模块化来构建自己代码这样一个思路来总结的，因此这系列文章能够解决大家最核心的问题。</p>
<p>这系列文章，算是对于大家学习方向的一个具体的，切实可行的一个指引，而非简单的通过鸡汤的方式告诉你应该如何学习。所以，想要学习这些知识的朋友，赶紧来公众号关注我吧！！！！</p>
<p><a href="https://segmentfault.com/a/1190000012646488">前端基础进阶系列目录</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础进阶（十一）：详细图解jQuery对象，以及如何扩展jQuery插件

## 原文链接
[https://segmentfault.com/a/1190000012646349](https://segmentfault.com/a/1190000012646349)


---
title: '搞懂JavaScript的Function.prototype.bind[译]' 
date: 2019-02-12 2:30:12
hidden: true
slug: 92n51oyjrma
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">搞懂JavaScript的Function.prototype.bind[译]</h1>
<blockquote><p><a href="https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/" rel="nofollow noreferrer" target="_blank">Ben Howdle</a></p></blockquote>
<p>binding可能是初学Javascript的人最不关心的函数，当你意识到需要『保持this在其他函数中的上下文』，实际上你需要的是Function.prototype.bind()。</p>
<p>你第一次碰到问题的时候，你可能倾向于把this赋值给一个变量，你就可以在上下文改变的时候，也可以使用。许多人选择self,_this或者context来命名。这些都不会被用到，这样做也没什么问题，但是这里有更好的办法，专门解决这个问题。</p>
<blockquote><p>我愿意为作用域做任何事，但我不会that = this</p></blockquote>
<p>— Jake Archibald (@jaffathecake) February 20, 2013</p>
<h2 id="articleHeader1">我们真正在寻求解决的问题是什么？</h2>
<p>看看这段代码，把上下文赋值给一个变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myObj = {

    specialFunction: function () {

    },

    anotherSpecialFunction: function () {

    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> myObj = {

    specialFunction: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    },

    anotherSpecialFunction: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    },

    getAsyncData: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(cb)</span> </span>{
        cb();
    },

    render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.getAsyncData(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();</code></pre>
<p>如果上面直接用this.specialFunction(),结果是一个错误信息：</p>
<blockquote><p>Uncaught TypeError: Object [object global] has no method 'specialFunction'</p></blockquote>
<p>当回调的时候，我们需要保持myObj的上下文引用。使用that.specialFunction()，让我们用that的上下文且正确执行函数。然而，用Function.prototype.bind()可以简化一些。</p>
<p>重写例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function () {

    this.getAsyncData(function () {

        this.specialFunction();

        this.anotherSpecialFunction();

    }.bind(this));

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

    <span class="hljs-keyword">this</span>.getAsyncData(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

        <span class="hljs-keyword">this</span>.specialFunction();

        <span class="hljs-keyword">this</span>.anotherSpecialFunction();

    }.bind(<span class="hljs-keyword">this</span>));

}</code></pre>
<h2 id="articleHeader2">我们刚做了什么？</h2>
<p>.bind()就是创建了一个新函数，当我们呼叫时，把他的this赋值。所以我们可以传递我们的上下文，this（指向myObj），传递进.bind()函数。当回调执行的时候，this指向myObj。</p>
<p>如果我们对Function.prototype.bind()的内部实现有兴致，请看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">scope</span>) </span>{
    <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> fn.apply(scope);
    };
}</code></pre>
<p>一个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    x: 3
}

var bar = function(){
    console.log(this.x);
}

bar(); // undefined

var boundFunc = bar.bind(foo);

boundFunc(); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">3</span>
}

<span class="hljs-keyword">var</span> bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
}

bar(); <span class="hljs-comment">// undefined</span>

<span class="hljs-keyword">var</span> boundFunc = bar.bind(foo);

boundFunc(); <span class="hljs-comment">// 3</span></code></pre>
<h2 id="articleHeader3">浏览器兼容性</h2>
<table>
<thead><tr>
<th>Browser</th>
<th>Version support</th>
</tr></thead>
<tbody>
<tr>
<td>Chrome</td>
<td>7</td>
</tr>
<tr>
<td>Firefox (Gecko)</td>
<td>4.0 (2)</td>
</tr>
<tr>
<td>IE</td>
<td>9</td>
</tr>
<tr>
<td>Opera</td>
<td>11.60</td>
</tr>
<tr>
<td>Safari</td>
<td>5.1.4</td>
</tr>
</tbody>
</table>
<p>如你所见，不幸的是，不支持ie8以下（啥也不说了）。<br>幸运的是，MDN为那些原生不支持.bind()的浏览器提供了解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== &quot;function&quot;) {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError(&quot;Function.prototype.bind - what is trying to be bound is not callable&quot;);
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP &amp;&amp; oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Function</span>.prototype.bind) {
  <span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">oThis</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span> !== <span class="hljs-string">"function"</span>) {
      <span class="hljs-comment">// closest thing possible to the ECMAScript 5 internal IsCallable function</span>
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Function.prototype.bind - what is trying to be bound is not callable"</span>);
    }

    <span class="hljs-keyword">var</span> aArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>),
        fToBind = <span class="hljs-keyword">this</span>,
        fNOP = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{},
        fBound = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> fToBind.apply(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> fNOP &amp;&amp; oThis
                                 ? <span class="hljs-keyword">this</span>
                                 : oThis,
                               aArgs.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)));
        };

    fNOP.prototype = <span class="hljs-keyword">this</span>.prototype;
    fBound.prototype = <span class="hljs-keyword">new</span> fNOP();

    <span class="hljs-keyword">return</span> fBound;
  };
}</code></pre>
<h2 id="articleHeader4">使用方式</h2>
<p>学习东西时候，我发现有效的方式不是认真的去学习概念，而是去看怎么使用到现在的工作中。如果顺利的话，下面某些例子可以被用到你的代码中解决你面对的问题。</p>
<h4>点击事件处理</h4>
<p>其中一个用处是追踪点击（点击后执行一个动作），需要我们在一个对象中储存信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var logger = {
    x: 0,
    updateCount: function(){
        this.x++;
        console.log(this.x);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> logger = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">updateCount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.x++;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);
    }
}</code></pre>
<p>我们写click事件处理，然后呼叫logger中的updateCount()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('button').addEventListener('click',logger.updateCount);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'button'</span>).addEventListener(<span class="hljs-string">'click'</span>,logger.updateCount);</code></pre>
<p>但我们造了一个不必要的匿名函数，保持this的正确指向。<br>简化一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('button').addEventListener('click', logger.updateCount.bind(logger));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'button'</span>).addEventListener(<span class="hljs-string">'click'</span>, logger.updateCount.bind(logger));</code></pre>
<p>刚才我们用了.bind()创造一个新函数然后把作用域绑定到logger对象上。</p>
<h4>时间间隔函数</h4>
<p>如果你以前用过模板引擎（handlebars）或者MV*框架，那你应该意识到一个问题的发生，当你呼叫渲染模板，立刻想进入新的DOM节点。<br>假设我们尝试实例一个jQuery插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myView = {

    template: '/* a template string containing our <select /> */',

    $el: $('#content'),

    afterRender: function () {
        this.$el.find('select').myPlugin();
    },

    render: function () {
        this.$el.html(this.template());
        this.afterRender();
    }
}

myView.render();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> myView = {

    <span class="hljs-attr">template</span>: <span class="hljs-string">'/* a template string containing our &lt;select /&gt; */'</span>,

    <span class="hljs-attr">$el</span>: $(<span class="hljs-string">'#content'</span>),

    <span class="hljs-attr">afterRender</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.$el.find(<span class="hljs-string">'select'</span>).myPlugin();
    },

    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.$el.html(<span class="hljs-keyword">this</span>.template());
        <span class="hljs-keyword">this</span>.afterRender();
    }
}

myView.render();</code></pre>
<p>你会发现这可用，但并不总是可用的。这就是问题所在。这就像是老鼠赛跑：不管发生什么，第一个到达获得胜利。有时候是render，有时候是插件的实例（instantiation）。</p>
<p>目前，一个不为人知，我们可以用小hack---setTimeout（）。<br>需要重写一下，一旦Dom节点出现，我们就可以安全的实例我们的JQuery插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//

    afterRender: function () {
        this.$el.find('select').myPlugin();
    },

    render: function () {
        this.$el.html(this.template());
        setTimeout(this.afterRender, 0);
    }

//" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//</span>

    afterRender: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.$el.find(<span class="hljs-string">'select'</span>).myPlugin();
    },

    render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.$el.html(<span class="hljs-keyword">this</span>.template());
        setTimeout(<span class="hljs-keyword">this</span>.afterRender, <span class="hljs-number">0</span>);
    }

<span class="hljs-comment">//</span></code></pre>
<p>可是，我们会看到.afterRender()没有被找到。<br>咋办？把我们.bind()加进去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//

    afterRender: function () {
        this.$el.find('select').myPlugin();
    },

    render: function () {
        this.$el.html(this.template());
        setTimeout(this.afterRender.bind(this), 0);
    }

//" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//</span>

    afterRender: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.$el.find(<span class="hljs-string">'select'</span>).myPlugin();
    },

    render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.$el.html(<span class="hljs-keyword">this</span>.template());
        setTimeout(<span class="hljs-keyword">this</span>.afterRender.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">0</span>);
    }

<span class="hljs-comment">//</span></code></pre>
<p>现在afterRender（）可以在正确的上下文中执行了。</p>
<h4>整合事件绑定和QUERYSELECTORALL</h4>
<p>DOM API一个重大提高就是querySelector，querySelectorAll和classList API等等。</p>
<p>然而，并没有原生添加事件到多个节点（nodeList）的方式。所以，我们最终偷窃了forEach函数，来自Array.prototype，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.forEach.call(document.querySelectorAll('.klasses'), function(el){
    el.addEventListener('click', someFunction);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'.klasses'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
    el.addEventListener(<span class="hljs-string">'click'</span>, someFunction);
});</code></pre>
<p>更好一点，用.bind():</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var unboundForEach = Array.prototype.forEach,
    forEach = Function.prototype.call.bind(unboundForEach);

forEach(document.querySelectorAll('.klasses'), function (el) {
    el.addEventListener('click', someFunction);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> unboundForEach = <span class="hljs-keyword">Array</span>.prototype.<span class="hljs-keyword">forEach</span>,
    <span class="hljs-keyword">forEach</span> = <span class="hljs-function"><span class="hljs-keyword">Function</span>.<span class="hljs-title">prototype</span>.<span class="hljs-title">call</span>.<span class="hljs-title">bind</span><span class="hljs-params">(unboundForEach)</span></span>;

<span class="hljs-keyword">forEach</span>(document.querySelectorAll(<span class="hljs-string">'.klasses'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> </span>{
    el.addEventListener(<span class="hljs-string">'click'</span>, someFunction);
});</code></pre>
<p>现在我们有了小巧的方法来循环多个dom节点。</p>
<h2 id="articleHeader5">总结</h2>
<p>如你所见，.bind()函数可以用来完成各种目的，同时简化代码。希望这个概述能让你的代码能使用.bind()，利用好变化的this这个特征。</p>
<p>『能力有限，如有疑问，纰漏，速指出，感谢你』</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
搞懂JavaScript的Function.prototype.bind[译]

## 原文链接
[https://segmentfault.com/a/1190000004640916](https://segmentfault.com/a/1190000004640916)


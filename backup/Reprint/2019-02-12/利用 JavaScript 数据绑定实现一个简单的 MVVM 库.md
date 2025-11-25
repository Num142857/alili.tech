---
title: '利用 JavaScript 数据绑定实现一个简单的 MVVM 库' 
date: 2019-02-12 2:30:12
hidden: true
slug: v0zwmlt9l0e
categories: [reprint]
---

{{< raw >}}

                    
<p>MVVM 是 Web 前端一种非常流行的开发模式，利用 MVVM 可以使我们的代码更专注于处理业务逻辑而不是去关心 DOM 操作。目前著名的 MVVM 框架有 vue, avalon , angular 等，这些框架各有千秋，但是实现的思想大致上是相同的：数据绑定 + 视图刷新。出于好奇和一颗愿意折腾的心，我自己也沿着这个方向写了一个最简单的 MVVM 库 ( mvvm.js )，总共 2000 多行代码，指令的命名和用法与 vue 相似，在这里分享一下实现的原理以及我的代码组织思路。</p>
<h1 id="articleHeader0">思路整理</h1>
<p>MVVM 在概念上是真正将视图与数据逻辑分离的模式，ViewModel 是整个模式的重点。要实现 ViewModel 就需要将数据模型（Model）和视图（View）关联起来，整个实现思路可以简单的总结成 5 点：</p>
<ol>
<li><p>实现一个 Compiler 对元素的每个节点进行指令的扫描和提取；</p></li>
<li><p>实现一个 Parser 去解析元素上的指令，能够把指令的意图通过某个刷新函数更新到 dom 上（中间可能需要一个专门负责视图刷新的模块）比如解析节点 <code>&lt;p v-show="isShow"&gt;&lt;/p&gt;</code> 时先取得 Model 中 isShow 的值，再根据 isShow 更改 <code>node.style.display</code> 从而控制元素的显示和隐藏;</p></li>
<li><p>实现一个 Watcher 能将 Parser 中每条指令的刷新函数和对应 Model 的字段联系起来；</p></li>
<li><p>实现一个 Observer 使得能够对对象的所有字段进行值的变化监测，一旦发生变化时可以拿到最新的值并触发通知回调；</p></li>
<li><p>利用 Observer 在 Watcher 中建立一个对 Model 的监听 ，当 Model 中的一个值发生变化时，监听被触发，Watcher 拿到新值后调用在步骤 2 中关联的那个刷新函数，就可以实现数据变化的同时刷新视图的目的。</p></li>
</ol>
<h1 id="articleHeader1">效果示例</h1>
<p>首先粗看下最终的使用示例，与其他 MVVM 框架的实例化大同小异：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;mobile-list&quot;>
    <h1 v-text=&quot;title&quot;></h1>
    <ul>
        <li v-for=&quot;item in brands&quot;>
            <b v-text=&quot;item.name&quot;></b>
            <span v-show=&quot;showRank&quot;>Rank: "{{"item.rank"}}"</span>
        </li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mobile-list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in brands"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">b</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"item.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showRank"</span>&gt;</span>Rank: "{{"item.rank"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var element = document.querySelector('#mobile-list');
var vm = new MVVM(element, {
    'title'   : 'Mobile List',
    'showRank': true,
    'brands'  : [
        {'name': 'Apple', 'rank': 1},
        {'name': 'Galaxy', 'rank': 2},
        {'name': 'OPPO', 'rank': 3}
    ]
});

vm.set('title', 'Top 3 Mobile Rank List'); // => <h1>Top 3 Mobile Rank List</h1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#mobile-list'</span>);
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> MVVM(element, {
    <span class="hljs-string">'title'</span>   : <span class="hljs-string">'Mobile List'</span>,
    <span class="hljs-string">'showRank'</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">'brands'</span>  : [
        {<span class="hljs-string">'name'</span>: <span class="hljs-string">'Apple'</span>, <span class="hljs-string">'rank'</span>: <span class="hljs-number">1</span>},
        {<span class="hljs-string">'name'</span>: <span class="hljs-string">'Galaxy'</span>, <span class="hljs-string">'rank'</span>: <span class="hljs-number">2</span>},
        {<span class="hljs-string">'name'</span>: <span class="hljs-string">'OPPO'</span>, <span class="hljs-string">'rank'</span>: <span class="hljs-number">3</span>}
    ]
});

vm.set(<span class="hljs-string">'title'</span>, <span class="hljs-string">'Top 3 Mobile Rank List'</span>); <span class="hljs-comment">// =&gt; &lt;h1&gt;Top 3 Mobile Rank List&lt;/h1&gt;</span></code></pre>
<h1 id="articleHeader2">模块划分</h1>
<p>我把 MVVM 分成了五个模块去实现： 编译模块 Compiler 、解析模块 Parser 、视图刷新模块 Updater 、数据订阅模块 Watcher 和 数据监听模块 Observer 。流程可以简述为：Compiler 编译好指令后将指令信息交给解析器 Parser 解析，Parser 更新初始值并向 Watcher 订阅数据的变化，Observer 监测到数据的变化然后反馈给 Watcher ，Watcher 再将变化结果通知 Updater 找到对应的刷新函数进行视图的刷新。</p>
<p>上述流程如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVuvga" src="https://static.alili.tech/img/bVuvga" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>下文就介绍下这五个模块实现的基本原理（代码只贴重点部分，完整的实现请到我的<a href="https://github.com/tangbc/sugar" rel="nofollow noreferrer" target="_blank"> Github </a> 翻阅）</p>
<h2 id="articleHeader3">1. 编译模块 Compiler</h2>
<p>Compiler 的职责主要是对元素的每个节点进行指令的扫描和提取。因为编译和解析的过程会多次遍历整个节点树，所以为了提高编译效率在 MVVM 构造函数内部先将 <code>element</code> 转成一个文档碎片形式的副本 <code>fragment</code> 编译对象是这个文档碎片而不应该是目标元素，待全部节点编译完成后再将文档碎片添加回到原来的真实节点中。</p>
<p><code>vm.complieElement</code> 实现了对元素所有节点的扫描和指令提取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.complieElement = function(fragment, root) {
    var node, childNodes = fragment.childNodes;
    // 扫描子节点
    for (var i = 0; i < childNodes.length; i++) {
        node = childNodes[i];
        if (this.hasDirective(node)) {
            this.$unCompileNodes.push(node);
        }
        // 递归扫描子节点的子节点
        if (node.childNodes.length) {
            this.complieElement(node, false);
        }
    }
    // 扫描完成，编译所有含有指令的节点
    if (root) {
        this.compileAllNodes();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vm.complieElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fragment, root</span>) </span>{
    <span class="hljs-keyword">var</span> node, childNodes = fragment.childNodes;
    <span class="hljs-comment">// 扫描子节点</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; childNodes.length; i++) {
        node = childNodes[i];
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hasDirective(node)) {
            <span class="hljs-keyword">this</span>.$unCompileNodes.push(node);
        }
        <span class="hljs-comment">// 递归扫描子节点的子节点</span>
        <span class="hljs-keyword">if</span> (node.childNodes.length) {
            <span class="hljs-keyword">this</span>.complieElement(node, <span class="hljs-literal">false</span>);
        }
    }
    <span class="hljs-comment">// 扫描完成，编译所有含有指令的节点</span>
    <span class="hljs-keyword">if</span> (root) {
        <span class="hljs-keyword">this</span>.compileAllNodes();
    }
}</code></pre>
<p><code>vm.compileAllNodes</code> 方法将会对 <code>this.$unCompileNodes</code> 中的每个节点进行编译（将指令信息交给 Parser ），编译完一个节点后就从缓存队列中移除它，同时检查 <code>this.$unCompileNodes.length</code> 当 length === 0 时说明全部编译完成，可以将文档碎片追加到真实节点上了。</p>
<h2 id="articleHeader4">2. 指令解析模块 Parser</h2>
<p>当编译器 Compiler 把每个节点的指令提取出来后就可以给到解析器解析了。每一个指令都有不同的解析方法，所有指令的解析方法只要做好两件事：一是将数据值更新到视图上（初始状态），二是将刷新函数订阅到 Model 的变化监测中。这里以解析 <code>v-text</code> 为例描述一个指令的大致解析方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parser.parseVText = function(node, model) {
    // 取得 Model 中定义的初始值 
    var text = this.$model[model];
    // 更新节点的文本
    node.textContent = text;
    // 对应的刷新函数：
    // updater.updateNodeTextContent(node, text);
    
    // 在 watcher 中订阅 model 的变化
    watcher.watch(model, function(last, old) {
        node.textContent = last;
        // updater.updateNodeTextContent(node, text);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">parser.parseVText = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, model</span>) </span>{
    <span class="hljs-comment">// 取得 Model 中定义的初始值 </span>
    <span class="hljs-keyword">var</span> text = <span class="hljs-keyword">this</span>.$model[model];
    <span class="hljs-comment">// 更新节点的文本</span>
    node.textContent = text;
    <span class="hljs-comment">// 对应的刷新函数：</span>
    <span class="hljs-comment">// updater.updateNodeTextContent(node, text);</span>
    
    <span class="hljs-comment">// 在 watcher 中订阅 model 的变化</span>
    watcher.watch(model, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">last, old</span>) </span>{
        node.textContent = last;
        <span class="hljs-comment">// updater.updateNodeTextContent(node, text);</span>
    });
}</code></pre>
<h2 id="articleHeader5">3. 数据订阅模块 Watcher</h2>
<p>上个例子，Watcher 提供了一个 <code>watch</code> 方法来对数据变化进行订阅，一个参数是模型字段 model 另一个是回调函数，回调函数是要通过 Observer 来触发的，参数传入新值 last 和 旧值 old , Watcher 拿到新值后就可以找到 model 对应的回调（刷新函数）进行更新视图了。model 和 刷新函数是一对多的关系，即一个 model 可以有任意多个处理它的回调函数（刷新函数），比如：<code>v-text="title"</code> 和 <code>v-html="title"</code> 两个指令共用一个数据模型字段。</p>
<p>添加数据订阅 <code>watcher.watch</code> 实现方式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watcher.watch = function(field, callback, context) {
    var callbacks = this.$watchCallbacks;

    if (!Object.hasOwnProperty.call(this.$model, field)) {
        console.warn('The field: ' + field + ' does not exist in model!');
        return;
    }

    // 建立缓存回调函数的数组
    if (!callbacks[field]) {
        callbacks[field] = [];
    }
    // 缓存回调函数
    callbacks[field].push([callback, context]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watcher.watch = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">field, callback, context</span>) </span>{
    <span class="hljs-keyword">var</span> callbacks = <span class="hljs-keyword">this</span>.$watchCallbacks;

    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Object</span>.hasOwnProperty.call(<span class="hljs-keyword">this</span>.$model, field)) {
        <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'The field: '</span> + field + <span class="hljs-string">' does not exist in model!'</span>);
        <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// 建立缓存回调函数的数组</span>
    <span class="hljs-keyword">if</span> (!callbacks[field]) {
        callbacks[field] = [];
    }
    <span class="hljs-comment">// 缓存回调函数</span>
    callbacks[field].push([callback, context]);
}</code></pre>
<p>当数据模型的 field 字段发生改变时，Watcher 就会触发缓存数组中订阅了 field 的所有回调。</p>
<h2 id="articleHeader6">4. 数据监听模块 Observer</h2>
<p>Observer 是整个 mvvm 实现的核心基础，看过有一篇文章说 O.o (Object.observe) 将会引爆数据绑定革命，给前端带来巨大影响力，不过很可惜，ES7 草案已经将 O.o 给废弃了！目前也没有浏览器支持！所幸的是还有 <code>Object.defineProperty</code> 通过拦截对象属性的存取描述符(get 和 set) 可以模拟一个简单的 Observer :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 拦截 object 的 prop 属性的 get 和 set 方法
Object.defineProperty(object, prop, {
    get: function() {
        return this.getValue(object, prop);
    },

    set: function(newValue) {
        var oldValue = this.getValue(object, prop);
        if (newValue !== oldValue) {
            this.setValue(object, newValue, prop);
            // 触发变化回调
            this.triggerChange(prop, newValue, oldValue);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 拦截 object 的 prop 属性的 get 和 set 方法</span>
<span class="hljs-built_in">Object</span>.defineProperty(object, prop, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getValue(object, prop);
    },

    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>) </span>{
        <span class="hljs-keyword">var</span> oldValue = <span class="hljs-keyword">this</span>.getValue(object, prop);
        <span class="hljs-keyword">if</span> (newValue !== oldValue) {
            <span class="hljs-keyword">this</span>.setValue(object, newValue, prop);
            <span class="hljs-comment">// 触发变化回调</span>
            <span class="hljs-keyword">this</span>.triggerChange(prop, newValue, oldValue);
        }
    }
});</code></pre>
<p>然后还有个问题就是数组操作 ( push, shift 等) 该如何监测？所有的 MVVM 框架都是通过重写该数组的原型来实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observer.rewriteArrayMethods = function(array) {
    var self = this;
    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto);
    var methods = 'push|pop|shift|unshift|splice|sort|reverse'.split('|');
    
    methods.forEach(function(method) {
        Object.defineProperty(arrayMethods, method, function() {
            var i = arguments.length;
            var original = arrayProto[method];
            
            var args = new Array(i);
            while (i--) {
                args[i] = arguments[i];
            }
            
            var result = original.apply(this, args);

            // 触发回调
            self.triggerChange(this, method);

            return result;
        });
    });
    
    array.__proto__ = arrayMethods;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">observer.rewriteArrayMethods = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array</span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> arrayProto = <span class="hljs-built_in">Array</span>.prototype;
    <span class="hljs-keyword">var</span> arrayMethods = <span class="hljs-built_in">Object</span>.create(arrayProto);
    <span class="hljs-keyword">var</span> methods = <span class="hljs-string">'push|pop|shift|unshift|splice|sort|reverse'</span>.split(<span class="hljs-string">'|'</span>);
    
    methods.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
        <span class="hljs-built_in">Object</span>.defineProperty(arrayMethods, method, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> i = <span class="hljs-built_in">arguments</span>.length;
            <span class="hljs-keyword">var</span> original = arrayProto[method];
            
            <span class="hljs-keyword">var</span> args = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i);
            <span class="hljs-keyword">while</span> (i--) {
                args[i] = <span class="hljs-built_in">arguments</span>[i];
            }
            
            <span class="hljs-keyword">var</span> result = original.apply(<span class="hljs-keyword">this</span>, args);

            <span class="hljs-comment">// 触发回调</span>
            self.triggerChange(<span class="hljs-keyword">this</span>, method);

            <span class="hljs-keyword">return</span> result;
        });
    });
    
    array.__proto__ = arrayMethods;
}
</code></pre>
<p>这个实现方式是从 vue 中参考来的，觉得用的很妙，不过数组的 length 属性是不能够被监听到的，所以在 MVVM 中应避免操作 <code>array.length</code></p>
<h2 id="articleHeader7">5. 视图刷新模块 Updater</h2>
<p>Updater 在五个模块中是最简单的，只需要负责每个指令对应的刷新函数即可。其他四个模块经过一系列的折腾，把最后的成果交给到 Updater 进行视图或者事件的更新，比如 <code>v-text</code> 的刷新函数为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updater.updateNodeTextContent = function(node, text) {
    node.textContent = text;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">updater.updateNodeTextContent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, text</span>) </span>{
    node.textContent = text;
}</code></pre>
<p><code>v-bind:style</code> 的刷新函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updater.updateNodeStyle = function(node, propperty, value) {
    node.style[propperty] = value;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">updater.updateNodeStyle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node, propperty, value</span>) </span>{
    node.style[propperty] = value;
}</code></pre>
<h1 id="articleHeader8">双向数据绑定的实现</h1>
<p>表单元素的双向数据绑定是 MVVM 的一个最大特点之一：</p>
<p><span class="img-wrap"><img data-src="/img/bVuvzB" src="https://static.alili.tech/img/bVuvzB" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其实这个神奇的功能实现原理也很简单，要做的只有两件事：一是数据变化的时候更新表单值，二是反过来表单值变化的时候更新数据，这样数据的值就和表单的值绑在了一起。</p>
<p><strong>数据变化更新表单值</strong> 利用前面说的 Watcher 模块很容易就可以做到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watcher.watch(model, function(last, old) {
    input.value = last;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watcher.watch(model, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">last, old</span>) </span>{
    input.value = last;
});</code></pre>
<p><strong>表单变化更新数据</strong> 只需要实时监听表单的值得变化事件并更新数据模型对应字段即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var model = this.$model;
input.addEventListenr('change', function() {
    model[field] = this.value;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> model = <span class="hljs-keyword">this</span>.$model;
input.addEventListenr(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    model[field] = <span class="hljs-keyword">this</span>.value;
});</code></pre>
<p>其他表单 radio, checkbox 和 select 都是一样的原理。</p>
<p>以上，整个流程以及每个模块的基本实现思路都讲完了，语言表达能力不太好，如有说的不对写的不好的地方，希望大家能够批评指正！</p>
<h1 id="articleHeader9">结语</h1>
<p>折腾这个简单的 mvvm.js 是因为原来自己的框架项目中用的是 vue.js 但是只是用到了它的指令系统，一大堆功能只用到四分之一左右，就想着只是实现 data-binding 和 view-refresh 就够了，结果没找这样的 javascript 库，所以我自己就造了这么一个轮子。</p>
<p>虽说功能和稳定性远不如 vue 等流行 MVVM 框架，代码实现可能也比较粗糙，但是通过造这个轮子还是增长了很多知识的 ~ 进步在于折腾嘛！</p>
<p>目前我的 mvvm.js 只是实现了最本的功能，以后我会继续完善、健壮它，如有兴趣欢迎一起探讨和改进~</p>
<p>源代码传送门: <a href="https://github.com/tangbc/sugar" rel="nofollow noreferrer" target="_blank">https://github.com/tangbc/sugar</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用 JavaScript 数据绑定实现一个简单的 MVVM 库

## 原文链接
[https://segmentfault.com/a/1190000004847657](https://segmentfault.com/a/1190000004847657)


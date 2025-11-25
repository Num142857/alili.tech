---
title: 'JavaScript专题之jQuery通用遍历方法each的实现' 
date: 2019-01-05 2:30:11
hidden: true
slug: cmlfyaw6yif
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十一篇，讲解 jQuery 通用遍历方法 each 的实现</p></blockquote>
<h2 id="articleHeader0">each介绍</h2>
<p>jQuery 的 each 方法，作为一个通用遍历方法，可用于遍历对象和数组。</p>
<p>语法为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.each(object, [callback])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">jQuery.each(object, [callback])</code></pre>
<p>回调函数拥有两个参数：第一个为对象的成员或数组的索引，第二个为对应变量或内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 遍历数组
$.each( [0,1,2], function(i, n){
    console.log( &quot;Item #&quot; + i + &quot;: &quot; + n );
});

// Item #0: 0
// Item #1: 1
// Item #2: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 遍历数组</span>
$.each( [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, n</span>)</span>{
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"Item #"</span> + i + <span class="hljs-string">": "</span> + n );
});

<span class="hljs-comment">// Item #0: 0</span>
<span class="hljs-comment">// Item #1: 1</span>
<span class="hljs-comment">// Item #2: 2</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 遍历对象
$.each({ name: &quot;John&quot;, lang: &quot;JS&quot; }, function(i, n) {
    console.log(&quot;Name: &quot; + i + &quot;, Value: &quot; + n);
});
// Name: name, Value: John
// Name: lang, Value: JS" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 遍历对象</span>
$.each({ <span class="hljs-attr">name</span>: <span class="hljs-string">"John"</span>, <span class="hljs-attr">lang</span>: <span class="hljs-string">"JS"</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Name: "</span> + i + <span class="hljs-string">", Value: "</span> + n);
});
<span class="hljs-comment">// Name: name, Value: John</span>
<span class="hljs-comment">// Name: lang, Value: JS</span></code></pre>
<h2 id="articleHeader1">退出循环</h2>
<p>尽管 ES5 提供了 forEach 方法，但是 forEach 没有办法中止或者跳出 forEach 循环，除了抛出一个异常。但是对于 jQuery 的 each 函数，如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.each( [0, 1, 2, 3, 4, 5], function(i, n){
    if (i > 2) return false;
    console.log( &quot;Item #&quot; + i + &quot;: &quot; + n );
});

// Item #0: 0
// Item #1: 1
// Item #2: 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.each( [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, n</span>)</span>{
    <span class="hljs-keyword">if</span> (i &gt; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"Item #"</span> + i + <span class="hljs-string">": "</span> + n );
});

<span class="hljs-comment">// Item #0: 0</span>
<span class="hljs-comment">// Item #1: 1</span>
<span class="hljs-comment">// Item #2: 2</span></code></pre>
<h2 id="articleHeader2">第一版</h2>
<p>那么我们该怎么实现这样一个 each 方法呢？</p>
<p>首先，我们肯定要根据参数的类型进行判断，如果是数组，就调用 for 循环，如果是对象，就使用 for in 循环，有一个例外是类数组对象，对于类数组对象，我们依然可以使用 for 循环。</p>
<p>更多关于类数组对象的知识，我们可以查看<a href="https://github.com/mqyqingfeng/Blog/issues/14" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类数组对象与arguments》</a></p>
<p>那么又该如何判断类数组对象和数组呢？实际上，我们在<a href="https://github.com/mqyqingfeng/Blog/issues/30" rel="nofollow noreferrer" target="_blank">《JavaScript专题之类型判断(下)》</a>就讲过jQuery 数组和类数组对象判断函数 isArrayLike 的实现。</p>
<p>所以，我们可以轻松写出第一版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
function each(obj, callback) {
    var length, i = 0;

    if ( isArrayLike(obj) ) {
        length = obj.length;
        for ( ; i < length; i++ ) {
            callback(i, obj[i])
        }
    } else {
        for ( i in obj ) {
            callback(i, obj[i])
        }
    }

    return obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 第一版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each</span>(<span class="hljs-params">obj, callback</span>) </span>{
    <span class="hljs-keyword">var</span> length, i = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">if</span> ( isArrayLike(obj) ) {
        length = obj.length;
        <span class="hljs-keyword">for</span> ( ; i &lt; length; i++ ) {
            callback(i, obj[i])
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> ( i <span class="hljs-keyword">in</span> obj ) {
            callback(i, obj[i])
        }
    }

    <span class="hljs-keyword">return</span> obj;
}</code></pre>
<h2 id="articleHeader3">中止循环</h2>
<p>现在已经可以遍历对象和数组了，但是依然有一个效果没有实现，就是中止循环，按照 jQuery each 的实现，当回调函数返回 false 的时候，我们就中止循环。这个实现起来也很简单：</p>
<p>我们只用把：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback(i, obj[i])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">callback(i, obj[i])</code></pre>
<p>替换成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (callback(i, obj[i]) === false) {
    break;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (callback(i, obj[i]) === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">break</span>;
}</code></pre>
<p>轻松实现中止循环的功能。</p>
<h2 id="articleHeader4">this</h2>
<p>我们在实际的开发中，我们有时会在 callback 函数中用到 this，先举个不怎么恰当的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 我们给每个人添加一个 age 属性，age 的值为 18 + index
var person = [
    {name: 'kevin'},
    {name: 'daisy'}
]
$.each(person, function(index, item){
    this.age = 18 + index;
})

console.log(person)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 我们给每个人添加一个 age 属性，age 的值为 18 + index</span>
<span class="hljs-keyword">var</span> person = [
    {<span class="hljs-attr">name</span>: <span class="hljs-string">'kevin'</span>},
    {<span class="hljs-attr">name</span>: <span class="hljs-string">'daisy'</span>}
]
$.each(person, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, item</span>)</span>{
    <span class="hljs-keyword">this</span>.age = <span class="hljs-number">18</span> + index;
})

<span class="hljs-built_in">console</span>.log(person)</code></pre>
<p>这个时候，我们就希望 this 能指向当前遍历的元素，然后给每个元素添加 age 属性。</p>
<p>指定 this，我们可以使用 call 或者 apply，其实也很简单：</p>
<p>我们把：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (callback(i, obj[i]) === false) {
    break;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (callback(i, obj[i]) === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">break</span>;
}</code></pre>
<p>替换成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (callback.call(obj[i], i, obj[i]) === false) {
    break;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (callback.call(obj[i], i, obj[i]) === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">break</span>;
}</code></pre>
<p>关于 this，我们再举个常用的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.each($(&quot;p&quot;), function(){
   $(this).hover(function(){ ... });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.each($(<span class="hljs-string">"p"</span>), <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   $(<span class="hljs-keyword">this</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ ... });
})</code></pre>
<p>虽然我们经常会这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;p&quot;).each(function(){
    $(this).hover(function(){ ... });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">"p"</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ ... });
})</code></pre>
<p>但是因为 $("p").each() 方法是定义在 jQuery 函数的 prototype 对象上面的，而 $.data()方法是定义 jQuery 函数上面的，调用的时候不从复杂的 jQuery 对象上调用，速度快得多。所以我们推荐使用第一种写法。</p>
<p>回到第一种写法上，就是因为将 this 指向了当前 DOM 元素，我们才能使用 $(this)将当前 DOM 元素包装成 jQuery 对象，优雅的使用 hover 方法。</p>
<p>所以最终的 each 源码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function each(obj, callback) {
    var length, i = 0;

    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each</span>(<span class="hljs-params">obj, callback</span>) </span>{
    <span class="hljs-keyword">var</span> length, i = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">if</span> (isArrayLike(obj)) {
        length = obj.length;
        <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
            <span class="hljs-keyword">if</span> (callback.call(obj[i], i, obj[i]) === <span class="hljs-literal">false</span>) {
                <span class="hljs-keyword">break</span>;
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (i <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (callback.call(obj[i], i, obj[i]) === <span class="hljs-literal">false</span>) {
                <span class="hljs-keyword">break</span>;
            }
        }
    }

    <span class="hljs-keyword">return</span> obj;
}</code></pre>
<h2 id="articleHeader5">性能比较</h2>
<p>我们在性能上比较下 for 循环和 each 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('for')
var i = 0;
for (; i < arr.length; i++) {
    i += arr[i];
}
console.timeEnd('for')


console.time('each')
var j = 0;
$.each(arr, function(index, item){
    j += item;
})
console.timeEnd('each')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.from({<span class="hljs-attr">length</span>: <span class="hljs-number">1000000</span>}, (v, i) =&gt; i);

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'for'</span>)
<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (; i &lt; arr.length; i++) {
    i += arr[i];
}
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'for'</span>)


<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'each'</span>)
<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;
$.each(arr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, item</span>)</span>{
    j += item;
})
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'each'</span>)</code></pre>
<p>这里显示一次运算的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010480401" src="https://static.alili.tech/img/remote/1460000010480401" alt="性能比较" title="性能比较" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以看出，for 循环的性能是明显好于 each 函数的，each 函数本质上也是用的 for 循环，到底是慢在了哪里呢？</p>
<p>我们再看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function each(obj, callback) {
    var i = 0;
    var length = obj.length
    for (; i < length; i++) {
        value = callback(i, obj[i]);
    }
}

function eachWithCall(obj, callback) {
    var i = 0;
    var length = obj.length
    for (; i < length; i++) {
        value = callback.call(obj[i], i, obj[i]);
    }
}

var arr = Array.from({length: 1000000}, (v, i) => i);

console.time('each')
var i = 0;
each(arr, function(index, item){
    i += item;
})
console.timeEnd('each')


console.time('eachWithCall')
var j = 0;
eachWithCall(arr, function(index, item){
    j += item;
})
console.timeEnd('eachWithCall')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each</span>(<span class="hljs-params">obj, callback</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> length = obj.length
    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        value = callback(i, obj[i]);
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">eachWithCall</span>(<span class="hljs-params">obj, callback</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> length = obj.length
    <span class="hljs-keyword">for</span> (; i &lt; length; i++) {
        value = callback.call(obj[i], i, obj[i]);
    }
}

<span class="hljs-keyword">var</span> arr = <span class="hljs-built_in">Array</span>.from({<span class="hljs-attr">length</span>: <span class="hljs-number">1000000</span>}, (v, i) =&gt; i);

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'each'</span>)
<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
each(arr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, item</span>)</span>{
    i += item;
})
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'each'</span>)


<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'eachWithCall'</span>)
<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;
eachWithCall(arr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, item</span>)</span>{
    j += item;
})
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'eachWithCall'</span>)</code></pre>
<p>这里显示一次运算的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010480402" src="https://static.alili.tech/img/remote/1460000010480402" alt="性能比较" title="性能比较" style="cursor: pointer; display: inline;"></span></p>
<p>each 函数和 eachWithCall 函数唯一的区别就是 eachWithCall 调用了 call，从结果我们可以推测出，call 会导致性能损失，但也正是 call 的存在，我们才能将 this 指向循环中当前的元素。</p>
<p>有舍有得吧。</p>
<h2 id="articleHeader6">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之jQuery通用遍历方法each的实现

## 原文链接
[https://segmentfault.com/a/1190000010480396](https://segmentfault.com/a/1190000010480396)


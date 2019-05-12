---
title: 'JS的深浅拷贝' 
date: 2018-12-30 2:30:10
hidden: true
slug: sg4mo0vwjr
categories: [reprint]
---

{{< raw >}}

                    
<p>一直想梳理下工作中经常会用到的深拷贝的内容，然而遍览了许多的文章，却发现对深拷贝并没有一个通用的完美实现方式。因为对深拷贝的定义不同，实现时的<code>edge case</code>过多，在深拷贝的时候会出现循环引用等问题，导致JS内部并没有实现深拷贝，但是我们可以来探究一下深拷贝到底有多复杂，各种实现方式的优缺点，同时参考下常用库对其的实现。</p>
<h2 id="articleHeader0">引用类型</h2>
<p>之所以会出现深浅拷贝的问题，实质上是由于JS对基本类型和引用类型的处理不同。基本类型指的是简单的数据段，而引用类型指的是一个对象，而JS不允许我们直接操作内存中的地址，也就是不能操作对象的内存空间，所以，我们对对象的操作都只是在操作它的引用而已。</p>
<p>在复制时也是一样，如果我们复制一个基本类型的值时，会创建一个新值，并把它保存在新的变量的位置上。而如果我们复制一个引用类型时，同样会把变量中的值复制一份放到新的变量空间里，但此时复制的东西并不是对象本身，而是指向该对象的指针。所以我们复制引用类型后，两个变量其实指向同一个对象，改变其中一个对象，会影响到另外一个。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 10;
var obj = {
    name: 'Nicholas'
}

var num2 = num;
var obj2 = obj;

obj.name = 'Lee';
obj2.name; // 'Lee'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    name: <span class="hljs-string">'Nicholas'</span>
}

<span class="hljs-keyword">var</span> num2 = <span class="hljs-built_in">num</span>;
<span class="hljs-keyword">var</span> obj2 = obj;

obj.name = <span class="hljs-string">'Lee'</span>;
obj2.name; <span class="hljs-comment">// 'Lee'</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVZYl?w=613&amp;h=249" src="https://static.alili.tech/img/bVVZYl?w=613&amp;h=249" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到我们的obj和obj2都保存了一个指向该对象的指针，所有的操作都是对该引用的操作，所以对对象的修改会影响其他的复制对象。</p>
<h2 id="articleHeader1">浅拷贝</h2>
<p>如果我们要复制对象的所有属性都不是引用类型时，就可以使用浅拷贝，实现方式就是遍历并复制，最后返回新的对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shallowCopy(obj) {
    var copy = {};
    // 只复制可遍历的属性
    for (key in obj) {
        // 只复制本身拥有的属性
        if (obj.hasOwnProperty(key)) {
            copy[key] = obj[key];
        }
    }
    return copy;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function shallowCopy(obj) {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">copy</span> = {};
    // 只复制可遍历的属性
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">key</span> <span class="hljs-keyword">in</span> obj) {
        // 只复制本身拥有的属性
        <span class="hljs-keyword">if</span> (obj.hasOwnProperty(<span class="hljs-built_in">key</span>)) {
            <span class="hljs-built_in">copy</span>[<span class="hljs-built_in">key</span>] = obj[<span class="hljs-built_in">key</span>];
        }
    }
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">copy</span>;
}</code></pre>
<p>如上面所说，我们使用浅拷贝会复制所有引用对象的指针，而不是具体的值，所以使用时一定要明确自己的需求，同时，浅拷贝的实现也是最简单的。</p>
<p>JS内部实现了浅拷贝，如<code>Object.assign()</code>，其中第一个参数是我们最终复制的目标对象，后面的所有参数是我们的即将复制的源对象，支持对象或数组，一般调用的方式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var newObj = Object.assign({}, originObj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Obj</span> = Object.assign({}, originObj);</code></pre>
<p>这样我们就得到了一个新的浅拷贝对象。另外<code>[].slice()</code>方法可以视为数组对象的浅拷贝。</p>
<h2 id="articleHeader2">深拷贝</h2>
<p>如果我们需要复制一个拥有所有属性和方法的新对象，就要用到深拷贝，JS并没有内置深拷贝方法，主要是因为：</p>
<ol>
<li>深拷贝怎么定义？我们怎么处理原型？怎么区分可拷贝的对象？原生DOM/BOM对象怎么拷贝？函数是新建还是引用？这些edge case太多导致我们无法统一概念，造出大家都满意的深拷贝方法来。</li>
<li>内部循环引用怎么处理，是不是保存每个遍历过的对象列表，每次进行对比，然后再造一个循环引用来？这样带来的性能消耗可以接受吗。</li>
</ol>
<p>解释一些常见的问题概念，防止有些同学不明白我们在讲什么。比如循环引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
obj.b = obj;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var obj = {}<span class="hljs-comment">;</span>
obj.<span class="hljs-keyword">b </span>= obj<span class="hljs-comment">;</span>
</code></pre>
<p>这样当我们深拷贝obj对象时，就会循环的遍历b属性，直到栈溢出。<br>我们的解决方案为建立一个集合<code>[]</code>，每次遍历对象进行比较，如果<code>[]</code>中已存在，则证明出现了循环引用或者相同引用，我们直接返回该对象已复制的引用即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let hasObj = [];
function referCopy(obj) {
    let copy = {};
    hasObj.push(obj);
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            let index = hasObj.indexOf(obj[i]);
            if (index > -1) {
                console.log('存在循环引用或属性引用了相同对象');
                // 如果已存在，证明引用了相同对象，那么无论是循环引用还是重复引用，我们返回引用就可以了
                copy[i] = hasObj[index];
            } else {
                copy[i] = referCopy(obj[i]);
            }
        } else {
            copy[i] = obj[i];
        }
    }
    return copy;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> hasObj = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">referCopy</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">let</span> copy = {};
    hasObj.push(obj);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> obj) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> obj[i] === <span class="hljs-string">'object'</span>) {
            <span class="hljs-keyword">let</span> index = hasObj.indexOf(obj[i]);
            <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'存在循环引用或属性引用了相同对象'</span>);
                <span class="hljs-comment">// 如果已存在，证明引用了相同对象，那么无论是循环引用还是重复引用，我们返回引用就可以了</span>
                copy[i] = hasObj[index];
            } <span class="hljs-keyword">else</span> {
                copy[i] = referCopy(obj[i]);
            }
        } <span class="hljs-keyword">else</span> {
            copy[i] = obj[i];
        }
    }
    <span class="hljs-keyword">return</span> copy;
}</code></pre>
<p>处理原型和区分可拷贝的对象：我们一般使用<code>function.prototype</code>指代原型，使用<code>obj.__proto__</code>指代原型链，使用<code>enumerable</code>属性表示是否可以被<code>for ... in</code>等遍历，使用<code>hasOwnProperty</code>来查询是否是本身元素。在原型链和可遍历属性和自身属性之间存在交集，但都不相等，我们应该如何判断哪些属性应该被复制呢？</p>
<p>函数的处理：函数拥有一些内在属性，但我们一般不修改这些属性，所以函数一般直接引用其地址即可。但是拥有一些存取器属性的函数我们怎么处理？是复制值还是复制存取描述符？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age: 10,
    get age() {
        return this.age;
    },
    set age(age) {
        this.age = age;
    }
};
var obj2 = $.extend(true, {}, obj);

obj2; // {age: 10}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> obj = {
    age: <span class="hljs-number">10</span>,
    <span class="hljs-keyword">get</span> age() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
    },
    <span class="hljs-keyword">set</span> age(age) {
        <span class="hljs-keyword">this</span>.age = age;
    }
};
<span class="hljs-keyword">var</span> obj2 = $.extend(<span class="hljs-literal">true</span>, {}, obj);

obj2; <span class="hljs-comment">// {age: 10}</span></code></pre>
<p>这个是我们想要的结果吗？大部分场景下不是吧，比如我要复制一个已有的Vue对象。当然我们也有解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function copy(obj) {
    var copy = {};
    for (var i in obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, i);
        // 检测是否为存取描述符
        if (desc.set || desc.get) {
            Object.defineProperty(copy, i, {
                get: desc.get,
                set: desc.set,
                configuarable: desc.configuarable,
                enumerable: true
            });
        // 否则为数据描述符，则复用下面的深拷贝方法，此处简写
        } else {
            copy[i] = obj[i];
        }
    }
    return copy;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function <span class="hljs-keyword">copy</span>(obj) {
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">copy</span> = {};
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj) {
        let <span class="hljs-keyword">desc</span> = Object.getOwnPropertyDescriptor(obj, i);
        <span class="hljs-comment">// 检测是否为存取描述符</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">desc</span>.<span class="hljs-keyword">set</span> || <span class="hljs-keyword">desc</span>.get) {
            Object.defineProperty(<span class="hljs-keyword">copy</span>, i, {
                get: <span class="hljs-keyword">desc</span>.get,
                <span class="hljs-keyword">set</span>: <span class="hljs-keyword">desc</span>.<span class="hljs-keyword">set</span>,
                configuarable: <span class="hljs-keyword">desc</span>.configuarable,
                enumerable: true
            });
        <span class="hljs-comment">// 否则为数据描述符，则复用下面的深拷贝方法，此处简写</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">copy</span>[i] = obj[i];
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">copy</span>;
}</code></pre>
<p>虽然边界条件很多，但是不同的框架和库都对该方法进行了实现，只不过定义不同，实现方式也不同，如<code>jQuery.extend()</code>只复制可枚举的属性，不继承原型链，函数复制引用，内部循环引用不处理。而lodash实现的就更为优秀，它实现了<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm" rel="nofollow noreferrer" target="_blank"><code>结构化克隆算法</code></a>。<br>该算法的优点是：</p>
<ol>
<li>可以复制 RegExp 对象。</li>
<li>可以复制 Blob、File 以及 FileList 对象。</li>
<li>可以复制 ImageData 对象。CanvasPixelArray 的克隆粒度将会跟原始对象相同，并且复制出来相同的像素数据。</li>
<li>可以正确的复制有循环引用的对象</li>
</ol>
<p>依然存在的缺陷是：</p>
<ol>
<li>Error 以及 Function 对象是不能被结构化克隆算法复制的；如果你尝试这样子去做，这会导致抛出 DATA_CLONE_ERR 的异常。</li>
<li>企图去克隆 DOM 节点同样会抛出 DATA_CLONE_ERROR 异常。</li>
<li>
<p>对象的某些特定参数也不会被保留</p>
<ul>
<li>RegExp 对象的 lastIndex 字段不会被保留</li>
<li>属性描述符，setters 以及 getters（以及其他类似元数据的功能）同样不会被复制。例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write，因为这是默认的情况下。</li>
<li>原形链上的属性也不会被追踪以及复制。</li>
</ul>
</li>
</ol>
<p>我们先来看看常规的深拷贝，它跟浅拷贝的区别在于，当我们发现对象的属性是引用类型时，进行递归遍历复制，直到遍历完所有属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var deepClone = function(currobj){
    if(typeof currobj !== 'object'){
        return currobj;
    }
    if(currobj instanceof Array){
        var newobj = [];
    }else{
        var newobj = {}
    }
    for(var key in currobj){
        if(typeof currobj[key] !== 'object'){
            // 不是引用类型，则复制值
            newobj[key] = currobj[key];
        }else{
            // 引用类型，则递归遍历复制对象
            newobj[key] = deepClone(currobj[key])    
        }
    }
    return newobj
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> deepClone = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(currobj){
    <span class="hljs-keyword">if</span>(typeof currobj !== <span class="hljs-string">'object'</span>){
        <span class="hljs-keyword">return</span> currobj;
    }
    <span class="hljs-keyword">if</span>(currobj instanceof <span class="hljs-keyword">Array</span>){
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">obj</span> = [];
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">obj</span> = {}
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> currobj){
        <span class="hljs-keyword">if</span>(typeof currobj[key] !== <span class="hljs-string">'object'</span>){
            <span class="hljs-comment">// 不是引用类型，则复制值</span>
            <span class="hljs-keyword">new</span><span class="hljs-type">obj</span>[key] = currobj[key];
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// 引用类型，则递归遍历复制对象</span>
            <span class="hljs-keyword">new</span><span class="hljs-type">obj</span>[key] = deepClone(currobj[key])    
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">obj</span>
}</code></pre>
<p>这个的主要问题就是不处理循环引用，不处理对象原型，函数依然是引用类型。上面描述过的复杂问题依然存在，可以说是最简陋但是日常工作够用的深拷贝方式。</p>
<p>另外还有一种方式是使用JSON序列化，巧妙但是限制更多：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用JSON内置方法先序列化为字符串再解析还原成对象
newObj = JSON.parse(JSON.stringify(obj));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 调用JSON内置方法先序列化为字符串再解析还原成对象</span>
<span class="hljs-keyword">new</span><span class="hljs-type">Obj</span> = JSON.parse(JSON.stringify(obj));</code></pre>
<p>JSON是一种表示结构化数据的格式，只支持简单值、对象和数组三种类型，不支持变量、函数或对象实例。所以我们工作中可以使用它解决常见问题，但也要注意其短板：函数会丢失，原型链会丢失，以及上面说到的所有缺陷。</p>
<h2 id="articleHeader3">库实现</h2>
<p>上面的两种方式可以满足大部分场景的需求，如果有更复杂的需求，可以自己实现。现在我们可以看一些框架和库的解决方案，下面拿经典的jQuery和lodash的源码看下，它们的优缺点上面都说过了：</p>
<h4>jQuery.extend()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 进行深度复制，如果第一个参数为true则深度复制，如果目标对象不合法，则抛弃并重构为{}空对象，如果只有一个参数则功能为扩展jQuery对象
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    // 第一个参数可以为true来确定进行深度复制
    if ( typeof target === &quot;boolean&quot; ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    // 如果目标对象不合法，则强行重构为{}空对象，抛弃原有的
    if ( typeof target !== &quot;object&quot; &amp;&amp; !jQuery.isFunction( target ) ) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    // 如果只有一个参数，扩展jQuery对象
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        // 只处理有值的对象
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                // 阻止最简单形式的循环引用
                // var obj={}, obj2={a:obj}; $.extend(true, obj, obj2); 就会形成复制的对象循环引用obj
                if ( target === copy ) {
                    continue;
                }
                // 如果为深度复制，则新建[]和{}空数组或空对象，递归本函数进行复制
                // Recurse if we're merging plain objects or arrays
                if ( deep &amp;&amp; copy &amp;&amp; ( jQuery.isPlainObject( copy ) ||
                    ( copyIsArray = Array.isArray( copy ) ) ) ) {

                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src &amp;&amp; Array.isArray( src ) ? src : [];

                    } else {
                        clone = src &amp;&amp; jQuery.isPlainObject( src ) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 进行深度复制，如果第一个参数为true则深度复制，如果目标对象不合法，则抛弃并重构为{}空对象，如果只有一个参数则功能为扩展jQuery对象</span>
jQuery.extend = jQuery.fn.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> options, name, src, copy, copyIsArray, clone,
        target = <span class="hljs-built_in">arguments</span>[ <span class="hljs-number">0</span> ] || {},
        i = <span class="hljs-number">1</span>,
        length = <span class="hljs-built_in">arguments</span>.length,
        deep = <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// Handle a deep copy situation</span>
    <span class="hljs-comment">// 第一个参数可以为true来确定进行深度复制</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> target === <span class="hljs-string">"boolean"</span> ) {
        deep = target;

        <span class="hljs-comment">// Skip the boolean and the target</span>
        target = <span class="hljs-built_in">arguments</span>[ i ] || {};
        i++;
    }

    <span class="hljs-comment">// Handle case when target is a string or something (possible in deep copy)</span>
    <span class="hljs-comment">// 如果目标对象不合法，则强行重构为{}空对象，抛弃原有的</span>
    <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> target !== <span class="hljs-string">"object"</span> &amp;&amp; !jQuery.isFunction( target ) ) {
        target = {};
    }

    <span class="hljs-comment">// Extend jQuery itself if only one argument is passed</span>
    <span class="hljs-comment">// 如果只有一个参数，扩展jQuery对象</span>
    <span class="hljs-keyword">if</span> ( i === length ) {
        target = <span class="hljs-keyword">this</span>;
        i--;
    }

    <span class="hljs-keyword">for</span> ( ; i &lt; length; i++ ) {

        <span class="hljs-comment">// Only deal with non-null/undefined values</span>
        <span class="hljs-comment">// 只处理有值的对象</span>
        <span class="hljs-keyword">if</span> ( ( options = <span class="hljs-built_in">arguments</span>[ i ] ) != <span class="hljs-literal">null</span> ) {

            <span class="hljs-comment">// Extend the base object</span>
            <span class="hljs-keyword">for</span> ( name <span class="hljs-keyword">in</span> options ) {
                src = target[ name ];
                copy = options[ name ];

                <span class="hljs-comment">// Prevent never-ending loop</span>
                <span class="hljs-comment">// 阻止最简单形式的循环引用</span>
                <span class="hljs-comment">// var obj={}, obj2={a:obj}; $.extend(true, obj, obj2); 就会形成复制的对象循环引用obj</span>
                <span class="hljs-keyword">if</span> ( target === copy ) {
                    <span class="hljs-keyword">continue</span>;
                }
                <span class="hljs-comment">// 如果为深度复制，则新建[]和{}空数组或空对象，递归本函数进行复制</span>
                <span class="hljs-comment">// Recurse if we're merging plain objects or arrays</span>
                <span class="hljs-keyword">if</span> ( deep &amp;&amp; copy &amp;&amp; ( jQuery.isPlainObject( copy ) ||
                    ( copyIsArray = <span class="hljs-built_in">Array</span>.isArray( copy ) ) ) ) {

                    <span class="hljs-keyword">if</span> ( copyIsArray ) {
                        copyIsArray = <span class="hljs-literal">false</span>;
                        clone = src &amp;&amp; <span class="hljs-built_in">Array</span>.isArray( src ) ? src : [];

                    } <span class="hljs-keyword">else</span> {
                        clone = src &amp;&amp; jQuery.isPlainObject( src ) ? src : {};
                    }

                    <span class="hljs-comment">// Never move original objects, clone them</span>
                    target[ name ] = jQuery.extend( deep, clone, copy );

                <span class="hljs-comment">// Don't bring in undefined values</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( copy !== <span class="hljs-literal">undefined</span> ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    <span class="hljs-comment">// Return the modified object</span>
    <span class="hljs-keyword">return</span> target;
};</code></pre>
<h4>lodash _.baseClone()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, bitmask, customizer, key, object, stack) {
      var result,
          isDeep = bitmask &amp; CLONE_DEEP_FLAG,
          isFlat = bitmask &amp; CLONE_FLAT_FLAG,
          isFull = bitmask &amp; CLONE_SYMBOLS_FLAG;

      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc &amp;&amp; !object)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(value);
          if (!isDeep) {
            return isFlat
              ? copySymbolsIn(value, baseAssignIn(result, value))
              : copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      var keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      var props = isArr ? undefined : keysFunc(value);
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
      return result;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">/**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} bitmask The bitmask flags.
     *  1 - Deep clone
     *  2 - Flatten inherited properties
     *  4 - Clone symbols
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */</span>
    <span class="hljs-function">function <span class="hljs-title">baseClone</span>(<span class="hljs-params"><span class="hljs-keyword">value</span>, bitmask, customizer, key, <span class="hljs-keyword">object</span>, stack</span>) </span>{
      <span class="hljs-keyword">var</span> result,
          isDeep = bitmask &amp; CLONE_DEEP_FLAG,
          isFlat = bitmask &amp; CLONE_FLAT_FLAG,
          isFull = bitmask &amp; CLONE_SYMBOLS_FLAG;

      <span class="hljs-keyword">if</span> (customizer) {
        result = <span class="hljs-keyword">object</span> ? customizer(<span class="hljs-keyword">value</span>, key, <span class="hljs-keyword">object</span>, stack) : customizer(<span class="hljs-keyword">value</span>);
      }
      <span class="hljs-keyword">if</span> (result !== undefined) {
        <span class="hljs-keyword">return</span> result;
      }
      <span class="hljs-keyword">if</span> (!isObject(<span class="hljs-keyword">value</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>;
      }
      <span class="hljs-keyword">var</span> isArr = isArray(<span class="hljs-keyword">value</span>);
      <span class="hljs-keyword">if</span> (isArr) {
        result = initCloneArray(<span class="hljs-keyword">value</span>);
        <span class="hljs-keyword">if</span> (!isDeep) {
          <span class="hljs-keyword">return</span> copyArray(<span class="hljs-keyword">value</span>, result);
        }
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">var</span> tag = getTag(<span class="hljs-keyword">value</span>),
            isFunc = tag == funcTag || tag == genTag;

        <span class="hljs-keyword">if</span> (isBuffer(<span class="hljs-keyword">value</span>)) {
          <span class="hljs-keyword">return</span> cloneBuffer(<span class="hljs-keyword">value</span>, isDeep);
        }
        <span class="hljs-keyword">if</span> (tag == objectTag || tag == argsTag || (isFunc &amp;&amp; !<span class="hljs-keyword">object</span>)) {
          result = (isFlat || isFunc) ? {} : initCloneObject(<span class="hljs-keyword">value</span>);
          <span class="hljs-keyword">if</span> (!isDeep) {
            <span class="hljs-keyword">return</span> isFlat
              ? copySymbolsIn(<span class="hljs-keyword">value</span>, baseAssignIn(result, <span class="hljs-keyword">value</span>))
              : copySymbols(<span class="hljs-keyword">value</span>, baseAssign(result, <span class="hljs-keyword">value</span>));
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">if</span> (!cloneableTags[tag]) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">object</span> ? <span class="hljs-keyword">value</span> : {};
          }
          result = initCloneByTag(<span class="hljs-keyword">value</span>, tag, baseClone, isDeep);
        }
      }
      <span class="hljs-comment">// Check for circular references and return its corresponding clone.</span>
      stack || (stack = <span class="hljs-keyword">new</span> Stack);
      <span class="hljs-keyword">var</span> stacked = stack.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">value</span>);
      <span class="hljs-keyword">if</span> (stacked) {
        <span class="hljs-keyword">return</span> stacked;
      }
      stack.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">value</span>, result);

      <span class="hljs-keyword">var</span> keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys);

      <span class="hljs-keyword">var</span> props = isArr ? undefined : keysFunc(<span class="hljs-keyword">value</span>);
      arrayEach(props || <span class="hljs-keyword">value</span>, function(subValue, key) {
        <span class="hljs-keyword">if</span> (props) {
          key = subValue;
          subValue = <span class="hljs-keyword">value</span>[key];
        }
        <span class="hljs-comment">// Recursively populate clone (susceptible to call stack limits).</span>
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, <span class="hljs-keyword">value</span>, stack));
      });
      <span class="hljs-keyword">return</span> result;
    }</code></pre>
<h2 id="articleHeader4">参考资料</h2>
<ol>
<li>知乎 JS的深拷贝和浅拷贝： <a href="https://www.zhihu.com/question/23031215" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a>
</li>
<li>Javascript之深拷贝： <a href="https://aepkill.github.io/2016/10/28/Javascript%E4%B9%8B%E6%B7%B1%E6%8B%B7%E8%B4%9D/" rel="nofollow noreferrer" target="_blank">https://aepkill.github.io/201...</a>
</li>
<li>js对象克隆之谜：<a href="http://b-sirius.me/2017/08/26/js%E5%AF%B9%E8%B1%A1%E5%85%8B%E9%9A%86%E4%B9%8B%E8%B0%9C/" rel="nofollow noreferrer" target="_blank">http://b-sirius.me/2017/08/26...</a>
</li>
<li>知乎 JS如何完整实现深度Clone对象：<a href="https://www.zhihu.com/question/47746441" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a>
</li>
<li>github lodash源码：<a href="https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L11101" rel="nofollow noreferrer" target="_blank">https://github.com/lodash/lod...</a>
</li>
<li>MDN 结构化克隆算法：<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>
</li>
<li>jQuery v3.2.1 源码</li>
<li>JavaScript高级程序设计 第4章（变量、作用域和内存问题）、第20章（JSON）</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS的深浅拷贝

## 原文链接
[https://segmentfault.com/a/1190000011403163](https://segmentfault.com/a/1190000011403163)


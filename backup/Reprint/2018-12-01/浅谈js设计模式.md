---
title: '浅谈js设计模式' 
date: 2018-12-01 2:30:12
hidden: true
slug: smddy3sjwkc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">策略模式</h2>
<blockquote>定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。目的是将算法的使用与算法的实现分离开来。</blockquote>
<p>一个基于策略模式的程序至少由两部分组成：</p>
<ol>
<li>一组策略类，策略类封装了具体的算法，并且负责具体的计算过程。</li>
<li>环境类Context, Context接受客户的请求，随后把请求委托给某一个策略类。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        validator = {
            validate: function (value, type) {
                switch (type) {
                    case 'isNonEmpty ':
                        {
                            return true; // NonEmpty 验证结果
                        }
                    case 'isNumber ':
                        {
                            return true; // Number 验证结果
                            break;
                        }
                    case 'isAlphaNum ':
                        {
                            return true; // AlphaNum 验证结果
                        }
                    default:
                        {
                            return true;
                        }
                }
            }
        };
        //  测试
        alert(validator.validate(&quot;123&quot;, &quot;isNonEmpty&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">        validator = {
            <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, type</span>) </span>{
                <span class="hljs-keyword">switch</span> (type) {
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'isNonEmpty '</span>:
                        {
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// NonEmpty 验证结果</span>
                        }
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'isNumber '</span>:
                        {
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// Number 验证结果</span>
                            <span class="hljs-keyword">break</span>;
                        }
                    <span class="hljs-keyword">case</span> <span class="hljs-string">'isAlphaNum '</span>:
                        {
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>; <span class="hljs-comment">// AlphaNum 验证结果</span>
                        }
                    <span class="hljs-keyword">default</span>:
                        {
                            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                        }
                }
            }
        };
        <span class="hljs-comment">//  测试</span>
        alert(validator.validate(<span class="hljs-string">"123"</span>, <span class="hljs-string">"isNonEmpty"</span>));</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var validator = {

    // 所有可以的验证规则处理类存放的地方，后面会单独定义
    types: {},

    // 验证类型所对应的错误消息
    messages: [],

    // 当然需要使用的验证类型
    config: {},

    // 暴露的公开验证方法
    // 传入的参数是 key => value对
    validate: function (data) {

        var i, msg, type, checker, result_ok;

        // 清空所有的错误信息
        this.messages = [];

        for (i in data) {
            if (data.hasOwnProperty(i)) {

                type = this.config[i];  // 根据key查询是否有存在的验证规则
                checker = this.types[type]; // 获取验证规则的验证类

                if (!type) {
                    continue; // 如果验证规则不存在，则不处理
                }
                if (!checker) { // 如果验证规则类不存在，抛出异常
                    throw {
                        name: &quot;ValidationError&quot;,
                        message: &quot;No handler to validate type &quot; + type
                    };
                }

                result_ok = checker.validate(data[i]); // 使用查到到的单个验证类进行验证
                if (!result_ok) {
                    msg = &quot;Invalid value for *&quot; + i + &quot;*, &quot; + checker.instructions;
                    this.messages.push(msg);
                }
            }
        }
        return this.hasErrors();
    },

    // helper
    hasErrors: function () {
        return this.messages.length !== 0;
    }
};





// 验证给定的值是否不为空
validator.types.isNonEmpty = {
    validate: function (value) {
        return value !== &quot;&quot;;
    },
    instructions: &quot;传入的值不能为空&quot;
};

// 验证给定的值是否是数字
validator.types.isNumber = {
    validate: function (value) {
        return !isNaN(value);
    },
    instructions: &quot;传入的值只能是合法的数字，例如：1, 3.14 or 2010&quot;
};

// 验证给定的值是否只是字母或数字
validator.types.isAlphaNum = {
    validate: function (value) {
        return !/[^a-z0-9]/i.test(value);
    },
    instructions: &quot;传入的值只能保护字母和数字，不能包含特殊字符&quot;
};



var data = {
    first_name: &quot;Tom&quot;,
    last_name: &quot;Xu&quot;,
    age: &quot;unknown&quot;,
    username: &quot;TomXu&quot;
};
//该对象的作用是检查验证类型是否存在
validator.config = {
    first_name: 'isNonEmpty',
    age: 'isNumber',
    username: 'isAlphaNum'
};


validator.validate(data);

if (validator.hasErrors()) {
    console.log(validator.messages.join(&quot;\n&quot;));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> validator = {

    <span class="hljs-comment">// 所有可以的验证规则处理类存放的地方，后面会单独定义</span>
    types: {},

    <span class="hljs-comment">// 验证类型所对应的错误消息</span>
    messages: [],

    <span class="hljs-comment">// 当然需要使用的验证类型</span>
    config: {},

    <span class="hljs-comment">// 暴露的公开验证方法</span>
    <span class="hljs-comment">// 传入的参数是 key =&gt; value对</span>
    validate: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{

        <span class="hljs-keyword">var</span> i, msg, type, checker, result_ok;

        <span class="hljs-comment">// 清空所有的错误信息</span>
        <span class="hljs-keyword">this</span>.messages = [];

        <span class="hljs-keyword">for</span> (i <span class="hljs-keyword">in</span> data) {
            <span class="hljs-keyword">if</span> (data.hasOwnProperty(i)) {

                type = <span class="hljs-keyword">this</span>.config[i];  <span class="hljs-comment">// 根据key查询是否有存在的验证规则</span>
                checker = <span class="hljs-keyword">this</span>.types[type]; <span class="hljs-comment">// 获取验证规则的验证类</span>

                <span class="hljs-keyword">if</span> (!type) {
                    <span class="hljs-keyword">continue</span>; <span class="hljs-comment">// 如果验证规则不存在，则不处理</span>
                }
                <span class="hljs-keyword">if</span> (!checker) { <span class="hljs-comment">// 如果验证规则类不存在，抛出异常</span>
                    <span class="hljs-keyword">throw</span> {
                        <span class="hljs-attr">name</span>: <span class="hljs-string">"ValidationError"</span>,
                        <span class="hljs-attr">message</span>: <span class="hljs-string">"No handler to validate type "</span> + type
                    };
                }

                result_ok = checker.validate(data[i]); <span class="hljs-comment">// 使用查到到的单个验证类进行验证</span>
                <span class="hljs-keyword">if</span> (!result_ok) {
                    msg = <span class="hljs-string">"Invalid value for *"</span> + i + <span class="hljs-string">"*, "</span> + checker.instructions;
                    <span class="hljs-keyword">this</span>.messages.push(msg);
                }
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hasErrors();
    },

    <span class="hljs-comment">// helper</span>
    hasErrors: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.messages.length !== <span class="hljs-number">0</span>;
    }
};





<span class="hljs-comment">// 验证给定的值是否不为空</span>
validator.types.isNonEmpty = {
    <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value !== <span class="hljs-string">""</span>;
    },
    <span class="hljs-attr">instructions</span>: <span class="hljs-string">"传入的值不能为空"</span>
};

<span class="hljs-comment">// 验证给定的值是否是数字</span>
validator.types.isNumber = {
    <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> !<span class="hljs-built_in">isNaN</span>(value);
    },
    <span class="hljs-attr">instructions</span>: <span class="hljs-string">"传入的值只能是合法的数字，例如：1, 3.14 or 2010"</span>
};

<span class="hljs-comment">// 验证给定的值是否只是字母或数字</span>
validator.types.isAlphaNum = {
    <span class="hljs-attr">validate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> !<span class="hljs-regexp">/[^a-z0-9]/i</span>.test(value);
    },
    <span class="hljs-attr">instructions</span>: <span class="hljs-string">"传入的值只能保护字母和数字，不能包含特殊字符"</span>
};



<span class="hljs-keyword">var</span> data = {
    <span class="hljs-attr">first_name</span>: <span class="hljs-string">"Tom"</span>,
    <span class="hljs-attr">last_name</span>: <span class="hljs-string">"Xu"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">"unknown"</span>,
    <span class="hljs-attr">username</span>: <span class="hljs-string">"TomXu"</span>
};
<span class="hljs-comment">//该对象的作用是检查验证类型是否存在</span>
validator.config = {
    <span class="hljs-attr">first_name</span>: <span class="hljs-string">'isNonEmpty'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">'isNumber'</span>,
    <span class="hljs-attr">username</span>: <span class="hljs-string">'isAlphaNum'</span>
};


validator.validate(data);

<span class="hljs-keyword">if</span> (validator.hasErrors()) {
    <span class="hljs-built_in">console</span>.log(validator.messages.join(<span class="hljs-string">"\n"</span>));
}</code></pre>
<p>通过策略模式，消除了大片的条件分支语句。将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。同时，算法还可以复用在其他地方，从而避免许多重复的复制粘贴工作。</p>
<h2 id="articleHeader1">代理模式</h2>
<blockquote>代理模式为一个对象提供一种代理以控制对这个对象的访问。</blockquote>
<p>虚拟代理是我们最常用的代理模式,它把一些开销很大的对象，延迟到真正需要用到这个对象的时候才去创建</p>
<p>虚拟代理实现图片预加载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addImg = (function(){
    var img = document.createElement('img');
    document.body.appendChild(img);
    return { 
        setSrc: function(src){
            img.src = src;
        }
    }
})();
var proxyAddImg = (function(){
    var img = new Image();
    img.onload = function(){
        addImg.setSrc(this.src);
    }
    return { 
        setSrc: function(src){
            addImg.setSrc('loading.gif'); 
            img.src = src;
        }
    }
})();
proxyAddImg.setSrc('demo.png'); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> addImg = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
    <span class="hljs-built_in">document</span>.body.appendChild(img);
    <span class="hljs-keyword">return</span> { 
        <span class="hljs-attr">setSrc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">src</span>)</span>{
            img.src = src;
        }
    }
})();
<span class="hljs-keyword">var</span> proxyAddImg = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> Image();
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        addImg.setSrc(<span class="hljs-keyword">this</span>.src);
    }
    <span class="hljs-keyword">return</span> { 
        <span class="hljs-attr">setSrc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">src</span>)</span>{
            addImg.setSrc(<span class="hljs-string">'loading.gif'</span>); 
            img.src = src;
        }
    }
})();
proxyAddImg.setSrc(<span class="hljs-string">'demo.png'</span>); </code></pre>
<p>虚拟代理合并Http请求<br>我们可以通过一个代理函数来收集一段时间之内的请求，最后把请求合并到一起发送给服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var proxySynData = (function(){
    var cache = [], //缓存我们需要同步的内容
        timer; //定时器
    return function(ID){
        if(!timer){ //定时器不存在就创建
            timer = setTimeout(function(){
                synData(cache.join()); //同步合并后的数据
                cache.length = 0; //清空缓存
                clearTimeout(timer); //清除定时器
                timer = null; //方便垃圾回收
            }, 2000);
        }
        cache.push(ID); //存入缓存
    }
})();
var list = document.getElementsByTagName('input');
for(var i = 0, item; item = list[i]; i++){
    item.onclick = function(){
        if(this.checked){
            proxySynData(this.id);
        }
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> proxySynData = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> cache = [], <span class="hljs-comment">//缓存我们需要同步的内容</span>
        timer; <span class="hljs-comment">//定时器</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ID</span>)</span>{
        <span class="hljs-keyword">if</span>(!timer){ <span class="hljs-comment">//定时器不存在就创建</span>
            timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                synData(cache.join()); <span class="hljs-comment">//同步合并后的数据</span>
                cache.length = <span class="hljs-number">0</span>; <span class="hljs-comment">//清空缓存</span>
                clearTimeout(timer); <span class="hljs-comment">//清除定时器</span>
                timer = <span class="hljs-literal">null</span>; <span class="hljs-comment">//方便垃圾回收</span>
            }, <span class="hljs-number">2000</span>);
        }
        cache.push(ID); <span class="hljs-comment">//存入缓存</span>
    }
})();
<span class="hljs-keyword">var</span> list = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'input'</span>);
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, item; item = list[i]; i++){
    item.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.checked){
            proxySynData(<span class="hljs-keyword">this</span>.id);
        }
    };
}</code></pre>
<p>缓存代理<br>缓存代理就很好理解了，可以缓存一些开销很大的运算结果;如果你第二次执行函数的时候，传递了同样的参数，那么就直接使用缓存的结果,如果运算量很大，这可是不小的优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = function(){
    var sum = 0;
    for(var i = 0, l = arguments.length; i < l; i++){
        sum += arguments[i];
    }
    return sum;
};
var proxyAdd = (function(){
    var cache = {}; //缓存运算结果的缓存对象
    return function(){
        var args = Array.prototype.join.call(arguments);//把参数用逗号组成一个字符串作为“键”
        if(cache.hasOwnProperty(args)){//等价 args in cache
            console.log('使用缓存结果');
            return cache[args];//直接使用缓存对象的“值”
        }
        console.log('计算结果');
        return cache[args] = add.apply(this,arguments);//使用本体函数计算结果并加入缓存
    }
})();
console.log(proxyAdd(1,2,3,4,5)); //15
console.log(proxyAdd(1,2,3,4,5)); //15
console.log(proxyAdd(1,2,3,4,5)); //15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = <span class="hljs-built_in">arguments</span>.length; i &lt; l; i++){
        sum += <span class="hljs-built_in">arguments</span>[i];
    }
    <span class="hljs-keyword">return</span> sum;
};
<span class="hljs-keyword">var</span> proxyAdd = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> cache = {}; <span class="hljs-comment">//缓存运算结果的缓存对象</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.join.call(<span class="hljs-built_in">arguments</span>);<span class="hljs-comment">//把参数用逗号组成一个字符串作为“键”</span>
        <span class="hljs-keyword">if</span>(cache.hasOwnProperty(args)){<span class="hljs-comment">//等价 args in cache</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'使用缓存结果'</span>);
            <span class="hljs-keyword">return</span> cache[args];<span class="hljs-comment">//直接使用缓存对象的“值”</span>
        }
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'计算结果'</span>);
        <span class="hljs-keyword">return</span> cache[args] = add.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);<span class="hljs-comment">//使用本体函数计算结果并加入缓存</span>
    }
})();
<span class="hljs-built_in">console</span>.log(proxyAdd(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>)); <span class="hljs-comment">//15</span>
<span class="hljs-built_in">console</span>.log(proxyAdd(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>)); <span class="hljs-comment">//15</span>
<span class="hljs-built_in">console</span>.log(proxyAdd(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>)); <span class="hljs-comment">//15</span></code></pre>
<h2 id="articleHeader2">观察者模式</h2>
<blockquote>观察者模式又叫发布-订阅模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。</blockquote>
<p>定义一个事件对象，它有以下功能</p>
<ol>
<li>监听事件（订阅公众号）</li>
<li>触发事件（公众号发布）</li>
<li>移除事件（取订公众号）</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// subscription.js
var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// subscription.js</span>
<span class="hljs-keyword">var</span> CLEARED = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> nullListeners = {
  <span class="hljs-attr">notify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notify</span>(<span class="hljs-params"></span>) </span>{}
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createListenerCollection</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// the current/next pattern is copied from redux's createStore code.</span>
  <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> refactor+expose that code to be reusable here?</span>
  <span class="hljs-keyword">var</span> current = [];
  <span class="hljs-keyword">var</span> next = [];

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">clear</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clear</span>(<span class="hljs-params"></span>) </span>{
      next = CLEARED;
      current = CLEARED;
    },
    <span class="hljs-attr">notify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notify</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> listeners = current = next;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
        listeners[i]();
      }
    },
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> next;
    },
    <span class="hljs-attr">subscribe</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">listener</span>) </span>{
      <span class="hljs-keyword">var</span> isSubscribed = <span class="hljs-literal">true</span>;
      <span class="hljs-keyword">if</span> (next === current) next = current.slice();
      next.push(listener);

      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (!isSubscribed || current === CLEARED) <span class="hljs-keyword">return</span>;
        isSubscribed = <span class="hljs-literal">false</span>;

        <span class="hljs-keyword">if</span> (next === current) next = current.slice();
        next.splice(next.indexOf(listener), <span class="hljs-number">1</span>);
      };
    }
  };
}

<span class="hljs-keyword">var</span> Subscription = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Subscription</span>(<span class="hljs-params">store, parentSub, onStateChange</span>) </span>{
    _classCallCheck(<span class="hljs-keyword">this</span>, Subscription);

    <span class="hljs-keyword">this</span>.store = store;
    <span class="hljs-keyword">this</span>.parentSub = parentSub;
    <span class="hljs-keyword">this</span>.onStateChange = onStateChange;
    <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addNestedSub</span>(<span class="hljs-params">listener</span>) </span>{
    <span class="hljs-keyword">this</span>.trySubscribe();
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notifyNestedSubs</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.listeners.notify();
  };

  Subscription.prototype.isSubscribed = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSubscribed</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Boolean</span>(<span class="hljs-keyword">this</span>.unsubscribe);
  };

  Subscription.prototype.trySubscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trySubscribe</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.unsubscribe) {
      <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-keyword">this</span>.parentSub ? <span class="hljs-keyword">this</span>.parentSub.addNestedSub(<span class="hljs-keyword">this</span>.onStateChange) : <span class="hljs-keyword">this</span>.store.subscribe(<span class="hljs-keyword">this</span>.onStateChange);

      <span class="hljs-keyword">this</span>.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryUnsubscribe</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.unsubscribe) {
      <span class="hljs-keyword">this</span>.unsubscribe();
      <span class="hljs-keyword">this</span>.unsubscribe = <span class="hljs-literal">null</span>;
      <span class="hljs-keyword">this</span>.listeners.clear();
      <span class="hljs-keyword">this</span>.listeners = nullListeners;
    }
  };

  <span class="hljs-keyword">return</span> Subscription;
}();</code></pre>
<p>Redux采用了观察者模式</p>
<h4>createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware))</h4>
<p>返回值：<br>(1) dispatch(action): 用于action的分发，改变store里面的state<br>(2) subscribe(listener): 注册listener，store里面state发生改变后，执行该listener。返回unsubscrib()方法，用于注销当前listener。<br>(3) getState(): 读取store里面的state<br>(4) replaceReducer(): 替换reducer，改变state修改的逻辑</p>
<p>所以store内部维护listener数组，用于存储所有通过store.subscribe注册的listener；当store tree更新后，依次执行数组中的listener</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    了
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">subscribe</span>(<span class="hljs-params">listener</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> listener !== <span class="hljs-string">'function'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Expected listener to be a function.'</span>);
    }

    <span class="hljs-keyword">var</span> isSubscribed = <span class="hljs-literal">true</span>;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    了
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unsubscribe</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (!isSubscribed) {
        <span class="hljs-keyword">return</span>;
      }

      isSubscribed = <span class="hljs-literal">false</span>;

      ensureCanMutateNextListeners();
      <span class="hljs-keyword">var</span> index = nextListeners.indexOf(listener);
      nextListeners.splice(index, <span class="hljs-number">1</span>);
    };
  }</code></pre>
<p>dispatch方法主要完成两件事：<br>1、根据action查询reducer中变更state的方法，更新store tree<br>2、变更store tree后，依次执行listener中所有响应函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined &quot;type&quot; property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    //循环遍历，执行listener，通知数据改变
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">if</span> (!(<span class="hljs-number">0</span>, _isPlainObject2[<span class="hljs-string">'default'</span>])(action)) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Actions must be plain objects. '</span> + <span class="hljs-string">'Use custom middleware for async actions.'</span>);
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action.type === <span class="hljs-string">'undefined'</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Actions may not have an undefined "type" property. '</span> + <span class="hljs-string">'Have you misspelled a constant?'</span>);
    }

    <span class="hljs-keyword">if</span> (isDispatching) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Reducers may not dispatch actions.'</span>);
    }

    <span class="hljs-keyword">try</span> {
      isDispatching = <span class="hljs-literal">true</span>;
      currentState = currentReducer(currentState, action);
    } <span class="hljs-keyword">finally</span> {
      isDispatching = <span class="hljs-literal">false</span>;
    }
    <span class="hljs-comment">//循环遍历，执行listener，通知数据改变</span>
    <span class="hljs-keyword">var</span> listeners = currentListeners = nextListeners;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; listeners.length; i++) {
      <span class="hljs-keyword">var</span> listener = listeners[i];
      listener();
    }

    <span class="hljs-keyword">return</span> action;
  }</code></pre>
<h4>在redux中，我们用connect()方法将react中的UI组件与redux的状态、事件关联起来。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var Connect = function (_Component) {
      _inherits(Connect, _Component);
      /*
      * 构造函数中，构造一个订阅对象，属性有this.store,方法this.onStateChange.bind(this)
      */
      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        (0, _invariant2.default)(_this.store, 'Could not find &quot;' + storeKey + '&quot; in either the context or props of ' + ('&quot;' + displayName + '&quot;. Either wrap the root component in a <Provider>, ') + ('or explicitly pass &quot;' + storeKey + '&quot; as a prop to &quot;' + displayName + '&quot;.'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      ···
      // 调用store.subscribe(listener)注册监听方法，对store的变化进行订阅，当store变化的时候，更新渲染view
      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;
        this.subscription.trySubscribe(); // //实际调用this.store.subscribe(this.onStateChange);
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };
       ···

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe(); // 取消订阅
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };
        ···
      //初始化订阅逻辑
      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new _Subscription2.default(this.store, parentSub, this.onStateChange.bind(this));  //调用的是Subscription.js中方法,向store内部注册一个listener---this.onStateChange.bind(this)

        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

    ···

      return Connect;
    }(_react.Component);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> Connect = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_Component</span>) </span>{
      _inherits(Connect, _Component);
      <span class="hljs-comment">/*
      * 构造函数中，构造一个订阅对象，属性有this.store,方法this.onStateChange.bind(this)
      */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Connect</span>(<span class="hljs-params">props, context</span>) </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, Connect);

        <span class="hljs-keyword">var</span> _this = _possibleConstructorReturn(<span class="hljs-keyword">this</span>, _Component.call(<span class="hljs-keyword">this</span>, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = <span class="hljs-number">0</span>;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = <span class="hljs-built_in">Boolean</span>(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        (<span class="hljs-number">0</span>, _invariant2.default)(_this.store, <span class="hljs-string">'Could not find "'</span> + storeKey + <span class="hljs-string">'" in either the context or props of '</span> + (<span class="hljs-string">'"'</span> + displayName + <span class="hljs-string">'". Either wrap the root component in a &lt;Provider&gt;, '</span>) + (<span class="hljs-string">'or explicitly pass "'</span> + storeKey + <span class="hljs-string">'" as a prop to "'</span> + displayName + <span class="hljs-string">'".'</span>));

        _this.initSelector();
        _this.initSubscription();
        <span class="hljs-keyword">return</span> _this;
      }

      ···
      <span class="hljs-comment">// 调用store.subscribe(listener)注册监听方法，对store的变化进行订阅，当store变化的时候，更新渲染view</span>
      Connect.prototype.componentDidMount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentDidMount</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (!shouldHandleStateChanges) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">this</span>.subscription.trySubscribe(); <span class="hljs-comment">// //实际调用this.store.subscribe(this.onStateChange);</span>
        <span class="hljs-keyword">this</span>.selector.run(<span class="hljs-keyword">this</span>.props);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selector.shouldComponentUpdate) <span class="hljs-keyword">this</span>.forceUpdate();
      };
       ···

      Connect.prototype.componentWillUnmount = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">componentWillUnmount</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.subscription) <span class="hljs-keyword">this</span>.subscription.tryUnsubscribe(); <span class="hljs-comment">// 取消订阅</span>
        <span class="hljs-keyword">this</span>.subscription = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.notifyNestedSubs = noop;
        <span class="hljs-keyword">this</span>.store = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.selector.run = noop;
        <span class="hljs-keyword">this</span>.selector.shouldComponentUpdate = <span class="hljs-literal">false</span>;
      };
        ···
      <span class="hljs-comment">//初始化订阅逻辑</span>
      Connect.prototype.initSubscription = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initSubscription</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (!shouldHandleStateChanges) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">var</span> parentSub = (<span class="hljs-keyword">this</span>.propsMode ? <span class="hljs-keyword">this</span>.props : <span class="hljs-keyword">this</span>.context)[subscriptionKey];
        <span class="hljs-keyword">this</span>.subscription = <span class="hljs-keyword">new</span> _Subscription2.default(<span class="hljs-keyword">this</span>.store, parentSub, <span class="hljs-keyword">this</span>.onStateChange.bind(<span class="hljs-keyword">this</span>));  <span class="hljs-comment">//调用的是Subscription.js中方法,向store内部注册一个listener---this.onStateChange.bind(this)</span>

        <span class="hljs-keyword">this</span>.notifyNestedSubs = <span class="hljs-keyword">this</span>.subscription.notifyNestedSubs.bind(<span class="hljs-keyword">this</span>.subscription);
      };

      Connect.prototype.onStateChange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onStateChange</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.selector.run(<span class="hljs-keyword">this</span>.props);

        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.selector.shouldComponentUpdate) {
          <span class="hljs-keyword">this</span>.notifyNestedSubs();
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.componentDidUpdate = <span class="hljs-keyword">this</span>.notifyNestedSubsOnComponentDidUpdate;
          <span class="hljs-keyword">this</span>.setState(dummyState);
        }
      };

    ···

      <span class="hljs-keyword">return</span> Connect;
    }(_react.Component);
</code></pre>
<h2 id="articleHeader3">装饰者模式</h2>
<blockquote>在不改变对象自身的基础上，在程序运行期间给对象动态地添加一些额外职责</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给window绑定onload事件
window.onload = function() {
    alert(1)
}

var _onload = window.onload || function(){}  //维护中间变量，但是如果装饰链太长，或需要的装饰函数太多，这些中间变量的数量就会越来越多

window.onload = function() {
    _onload()
    alert(2)
}

//可能会存在this被劫持问题
var getId = document.getElementById; //全局函数，this指向window
document.getElementById = function(ID){
    console.log(1);
    return getId(ID);
}
document.getElementById('demo'); //this预期指向document

//需要手动把document当做上下文this传入getId" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 给window绑定onload事件</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-number">1</span>)
}

<span class="hljs-keyword">var</span> _onload = <span class="hljs-built_in">window</span>.onload || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}  <span class="hljs-comment">//维护中间变量，但是如果装饰链太长，或需要的装饰函数太多，这些中间变量的数量就会越来越多</span>

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    _onload()
    alert(<span class="hljs-number">2</span>)
}

<span class="hljs-comment">//可能会存在this被劫持问题</span>
<span class="hljs-keyword">var</span> getId = <span class="hljs-built_in">document</span>.getElementById; <span class="hljs-comment">//全局函数，this指向window</span>
<span class="hljs-built_in">document</span>.getElementById = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ID</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> getId(ID);
}
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'demo'</span>); <span class="hljs-comment">//this预期指向document</span>

<span class="hljs-comment">//需要手动把document当做上下文this传入getId</span></code></pre>
<h3 id="articleHeader4">AOP装饰函数</h3>
<blockquote>AOP（Aspect Oriented Programming）面向切面编程 <br>把一些与核心业务逻辑无关的功能抽离出来 <br>再通过“动态织入”方式掺入业务逻辑模块</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 前置装饰
Function.prototype.before = function(beforeFunc){
    var that = this; //保存原函数的引用
    return function(){ //返回了了包含原函数和新函数的代理函数
        beforeFunc.apply(this, arguments); // 执行新函数
        return that.apply(this, arguments); //执行原函数并返回原函数的执行结果
    }
}

document.getElementById = document.getElementById.before(function() {
    alet(1)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 前置装饰</span>
<span class="hljs-built_in">Function</span>.prototype.before = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">beforeFunc</span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>; <span class="hljs-comment">//保存原函数的引用</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//返回了了包含原函数和新函数的代理函数</span>
        beforeFunc.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>); <span class="hljs-comment">// 执行新函数</span>
        <span class="hljs-keyword">return</span> that.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>); <span class="hljs-comment">//执行原函数并返回原函数的执行结果</span>
    }
}

<span class="hljs-built_in">document</span>.getElementById = <span class="hljs-built_in">document</span>.getElementById.before(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alet(<span class="hljs-number">1</span>)
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义一个组件
class Home extends Component {
    //....
}

//以往从状态树取出对应的数据，通过props传给组件使用通过react-redux自带的connect()方法
export default connect(state => ({todos: state.todos}))(Home);

//使用装饰器的话就变成这样，好像没那么复杂
@connect(state => ({ todos: state.todos }))
class Home extends React.Component {
    //....
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义一个组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">//....</span>
}

<span class="hljs-comment">//以往从状态树取出对应的数据，通过props传给组件使用通过react-redux自带的connect()方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({<span class="hljs-attr">todos</span>: state.todos}))(Home);

<span class="hljs-comment">//使用装饰器的话就变成这样，好像没那么复杂</span>
@connect(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({ <span class="hljs-attr">todos</span>: state.todos }))
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">//....</span>
}</code></pre>
<h2 id="articleHeader5">适配器模式</h2>
<p>适配器模式是作为两个不兼容的接口之间的桥梁，它结合了两个独立接口的功能。</p>
<p>假设我们正在编写一个渲染广东省地图的页面，目前从第三方资源里获得了广东省的所有城市以及它们所对应的ID,并且成功地渲染到页面中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getGuangdongCity = function () {
    var GuangdongCity = [
       {
          name:'shenzhen',
          id  : '11'
       },
       {
         name:'guangzhou',
         id:12
       }
  ];
  return GuangdongCity;
};

var render  = function (fn) {
    console.log('starting render Guangdong map');
    document.write(JSON.stringify(fn()));
};
/* var GuangdongCity = {
//                      shenzhen:11,
//                      guangzhou:12,
//                      zhuhai:13
//                     };
*/
var addressAdapter = function (oldAddressfn) {
var address = {},
    oldAddress = oldAddressfn();
    for(var i = 0 , c; c = oldAddress[i++];){
        address[c.name] = c.id;  //此处我们遍历老数据把它们添加到空对象中然后返回这个对象
    }
    return function () {
        return address;
    }
};
render(addressAdapter(getGuangdongCity));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getGuangdongCity = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> GuangdongCity = [
       {
          <span class="hljs-attr">name</span>:<span class="hljs-string">'shenzhen'</span>,
          <span class="hljs-attr">id</span>  : <span class="hljs-string">'11'</span>
       },
       {
         <span class="hljs-attr">name</span>:<span class="hljs-string">'guangzhou'</span>,
         <span class="hljs-attr">id</span>:<span class="hljs-number">12</span>
       }
  ];
  <span class="hljs-keyword">return</span> GuangdongCity;
};

<span class="hljs-keyword">var</span> render  = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'starting render Guangdong map'</span>);
    <span class="hljs-built_in">document</span>.write(<span class="hljs-built_in">JSON</span>.stringify(fn()));
};
<span class="hljs-comment">/* var GuangdongCity = {
//                      shenzhen:11,
//                      guangzhou:12,
//                      zhuhai:13
//                     };
*/</span>
<span class="hljs-keyword">var</span> addressAdapter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">oldAddressfn</span>) </span>{
<span class="hljs-keyword">var</span> address = {},
    oldAddress = oldAddressfn();
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> , c; c = oldAddress[i++];){
        address[c.name] = c.id;  <span class="hljs-comment">//此处我们遍历老数据把它们添加到空对象中然后返回这个对象</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> address;
    }
};
render(addressAdapter(getGuangdongCity));
</code></pre>
<p>使用适配器模式可以解决参数类型有些许不一致造成的问题。</p>
<p>redux为了和react适配，所有有 mapStateToProps()这个函数来把state转为Props外部状态，这样就可以从外部又回到组件内了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈js设计模式

## 原文链接
[https://segmentfault.com/a/1190000014801625](https://segmentfault.com/a/1190000014801625)


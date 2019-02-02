---
title: 'js对象监听实现' 
date: 2019-02-03 2:30:40
hidden: true
slug: zk0b8vdixn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>随着前端交互复杂度的提升,各类框架如angular,react,vue等也层出不穷,这些框架一个比较重要的技术点就是数据绑定。数据的监听有较多的实现方案,本文将粗略的描述一番,并对其中一个兼容性较好的深入分析。</p>
<h1 id="articleHeader1">实现方案简介</h1>
<p>目前对象的监听可行的方案:</p>
<ul>
<li><p>脏检查: 需要遍历scope对象树里的$watch数组,使用不当容易造成性能问题</p></li>
<li><p>ES5 object.defineproperty: 除ie8部分支持 其他基本都完全支持</p></li>
<li><p>ES7 object.observe : 已经移除(<a href="https://esdiscuss.org/topic/an-update-on-object-observe" rel="nofollow noreferrer" target="_blank">缘由</a>)出ES7草案</p></li>
<li><p>gecko object.watch :目前只有基于gecko的浏览器如火狐支持,官方建议仅供调试用</p></li>
<li><p>ES6 Proxy: 目前支持较差,babel也暂不支持转化</p></li>
</ul>
<p>ES5现代浏览器基本都支持了,OK，本文将介绍目前支持度最好的object.defineproperty 的Setters 和    Getters方式</p>
<h1 id="articleHeader2">object.defineproperty介绍</h1>
<h2 id="articleHeader3">简洁的介绍</h2>
<p>它属于es5规范,有两种定义属性:</p>
<ul>
<li><p>一种是 数据属性 包含Writable,Enumerable,Configurable</p></li>
<li><p>一种是 访问器属性 包含get 和set</p></li>
</ul>
<p>数据属性的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.key='static';
//等效于
Object.defineProperty(obj, &quot;key&quot;, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: &quot;static&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">obj.key='static';</span>
<span class="hljs-string">//等效于</span>
<span class="hljs-string">Object.defineProperty(obj,</span> <span class="hljs-string">"key"</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  writable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  value:</span> <span class="hljs-string">"static"</span>
<span class="hljs-string">});</span></code></pre>
<p>访问器属性例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    temperature:'test'
};
var temperature='';
Object.defineProperty(obj, 'temperature', {
    get: function() {
        return temperature+'-----after';
    },
    set: function(value) {
        temperature = value;
    }
})
obj.temperature='Test';
//Test-----after
console.log(obj.temperature);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {
    temperature:<span class="hljs-string">'test'</span>
};
<span class="hljs-keyword">var</span> temperature=<span class="hljs-string">''</span>;
Object.defineProperty(obj, <span class="hljs-string">'temperature'</span>, {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> temperature+<span class="hljs-string">'-----after'</span>;
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span> </span>{
        temperature = value;
    }
})
obj.temperature=<span class="hljs-string">'Test'</span>;
<span class="hljs-comment">//Test-----after</span>
console.log(obj.temperature);
</code></pre>
<h2 id="articleHeader4">详细的介绍</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">火狐开发者</a></p>
<h1 id="articleHeader5">实现监听的思路</h1>
<ol>
<li><p>将需要监听对象/数组 obj和回调函数callback传入构造函数,this.callback = callback 存储回调函数</p></li>
<li><p>遍历对象/数组obj,通过Object.defineProperty将属性全部定义一遍。在set函数里面添加callback函数,设置val值。get函数返回val。</p></li>
<li><p>判断对应的obj[key]是否为对象,是则进入第二步,否则继续遍历</p></li>
<li><p>遍历结束之后判断该对象是否为数组,是则对操作数组函数如push,pop,shift,unshift等进行封装,操作数组前调用callback函数</p></li>
</ol>
<h2 id="articleHeader6">数组的封装</h2>
<p>比较复杂的是数组的封装，结构如下：<br>新建一个对象newProto,继承Array的原型,并在newProto上面封装push,pop等数组操作方法,再将传入的array对象的原型设置为newProto。</p>
<h3 id="articleHeader7">对应图</h3>
<p><span class="img-wrap"><img data-src="/img/bVC9j2?w=490&amp;h=258" src="https://static.alili.tech/img/bVC9j2?w=490&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">路径的定位</h2>
<p>在获取数据变化的同时,定位该变化数据在原始根对象的位置,以数组表示如:<br>如[ 'a', 'dd', 'ddd' ] 表示对象obj.a.dd.ddd的属性改变<br>实现:每个遍历对象属性都通过path.slice(0)的方式复制入参数组path,生成新数组tpath,给tpath数组push对应的对象属性key,最后在执行set的回调函数时候将tpath当参数传入</p>
<h1 id="articleHeader9">带注释代码</h1>
<p>watch.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 *
 * @param obj 需要监听的对象或数组
 * @param callback 当对应属性变化的时候触发的回调函数
 * @constructor
 */
function Watch(obj, callback) {
    this.callback = callback;
    //监听_obj对象 判断是否为对象,如果是数组,则对数组对应的原型进行封装
    //path代表相应属性在原始对象的位置,以数组表示. 如[ 'a', 'dd', 'ddd' ] 表示对象obj.a.dd.ddd的属性改变
    this.observe = function (_obj, path) {
        var type=Object.prototype.toString.call(_obj);
        if (type== '[object Object]'||type== '[object Array]') {
            this.observeObj(_obj, path);
            if (type == '[object Array]') {
                this.cloneArray(_obj, path);
            }
        }
    };

    //遍历对象obj,设置set,get属性,set属性能触发callback函数,并将val的值改为newVal
    //遍历结束后再次调用observe函数 判断val是否为对象,如果是则在对val进行遍历设置set,get
    this.observeObj = function (obj, path) {
        var t = this;
        Object.keys(obj).forEach(function (prop) {
            var val = obj[prop];
            var tpath = path.slice(0);
            tpath.push(prop);
            Object.defineProperty(obj, prop, {
                get: function () {
                    return val;
                },
                set: function (newVal) {
                    t.callback(tpath, newVal, val);
                    val = newVal;
                }
            });
            t.observe(val, tpath);
        });
    };

    //通过对特定数组的原型中间放一个newProto原型,该原型继承于Array的原型,但是对push,pop等数组操作属性进行封装
    this.cloneArray = function (a_array, path) {
        var ORP = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
        var arrayProto = Array.prototype;
        var newProto = Object.create(arrayProto);
        var t = this;
        ORP.forEach(function (prop) {
            Object.defineProperty(newProto, prop, {
                value: function (newVal) {
                    path.push(prop);
                    t.callback(path, newVal);
                    arrayProto[prop].apply(a_array, arguments);
                },
                enumerable: false,
                configurable: true,
                writable: true
            });
        });
        a_array.__proto__ = newProto;
    };

    //开始监听obj对象,初始path为[]
    this.observe(obj, []);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 *
 * @param obj 需要监听的对象或数组
 * @param callback 当对应属性变化的时候触发的回调函数
 * @constructor
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watch</span>(<span class="hljs-params">obj, callback</span>) </span>{
    <span class="hljs-keyword">this</span>.callback = callback;
    <span class="hljs-comment">//监听_obj对象 判断是否为对象,如果是数组,则对数组对应的原型进行封装</span>
    <span class="hljs-comment">//path代表相应属性在原始对象的位置,以数组表示. 如[ 'a', 'dd', 'ddd' ] 表示对象obj.a.dd.ddd的属性改变</span>
    <span class="hljs-keyword">this</span>.observe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_obj, path</span>) </span>{
        <span class="hljs-keyword">var</span> type=<span class="hljs-built_in">Object</span>.prototype.toString.call(_obj);
        <span class="hljs-keyword">if</span> (type== <span class="hljs-string">'[object Object]'</span>||type== <span class="hljs-string">'[object Array]'</span>) {
            <span class="hljs-keyword">this</span>.observeObj(_obj, path);
            <span class="hljs-keyword">if</span> (type == <span class="hljs-string">'[object Array]'</span>) {
                <span class="hljs-keyword">this</span>.cloneArray(_obj, path);
            }
        }
    };

    <span class="hljs-comment">//遍历对象obj,设置set,get属性,set属性能触发callback函数,并将val的值改为newVal</span>
    <span class="hljs-comment">//遍历结束后再次调用observe函数 判断val是否为对象,如果是则在对val进行遍历设置set,get</span>
    <span class="hljs-keyword">this</span>.observeObj = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, path</span>) </span>{
        <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">this</span>;
        <span class="hljs-built_in">Object</span>.keys(obj).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prop</span>) </span>{
            <span class="hljs-keyword">var</span> val = obj[prop];
            <span class="hljs-keyword">var</span> tpath = path.slice(<span class="hljs-number">0</span>);
            tpath.push(prop);
            <span class="hljs-built_in">Object</span>.defineProperty(obj, prop, {
                <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">return</span> val;
                },
                <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
                    t.callback(tpath, newVal, val);
                    val = newVal;
                }
            });
            t.observe(val, tpath);
        });
    };

    <span class="hljs-comment">//通过对特定数组的原型中间放一个newProto原型,该原型继承于Array的原型,但是对push,pop等数组操作属性进行封装</span>
    <span class="hljs-keyword">this</span>.cloneArray = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a_array, path</span>) </span>{
        <span class="hljs-keyword">var</span> ORP = [<span class="hljs-string">'push'</span>, <span class="hljs-string">'pop'</span>, <span class="hljs-string">'shift'</span>, <span class="hljs-string">'unshift'</span>, <span class="hljs-string">'splice'</span>, <span class="hljs-string">'sort'</span>, <span class="hljs-string">'reverse'</span>];
        <span class="hljs-keyword">var</span> arrayProto = <span class="hljs-built_in">Array</span>.prototype;
        <span class="hljs-keyword">var</span> newProto = <span class="hljs-built_in">Object</span>.create(arrayProto);
        <span class="hljs-keyword">var</span> t = <span class="hljs-keyword">this</span>;
        ORP.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prop</span>) </span>{
            <span class="hljs-built_in">Object</span>.defineProperty(newProto, prop, {
                <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
                    path.push(prop);
                    t.callback(path, newVal);
                    arrayProto[prop].apply(a_array, <span class="hljs-built_in">arguments</span>);
                },
                <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">writable</span>: <span class="hljs-literal">true</span>
            });
        });
        a_array.__proto__ = newProto;
    };

    <span class="hljs-comment">//开始监听obj对象,初始path为[]</span>
    <span class="hljs-keyword">this</span>.observe(obj, []);
}
</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<ul>
    <li>
        <a href=&quot;javascript:void(0)&quot; onClick=&quot;dataOne()&quot;>
            将obj b属性改变
        </a>
    </li>
    <li>
        <a href=&quot;javascript:void(0)&quot; onClick=&quot;dataTwo()&quot;>
            将obj a属性的dd属性的ddd属性改变
        </a>
    </li>
    <li>
        <a href=&quot;javascript:void(0)&quot; onClick=&quot;dataThree()&quot;>
            将obj a属性的g属性数组第一个值的a属性改变
        </a>
    </li>
    <li>
        <a href=&quot;javascript:void(0)&quot; onClick=&quot;dataFour()&quot;>
            将obj a属性的g属性数组push新的值
        </a>
    </li>
</ul>

<div id=&quot;path&quot;>
</div>
<div id=&quot;old-val&quot;>
</div>
<div id=&quot;new-val&quot;>
</div>
</body>
<script src=&quot;../src/watch.js&quot;></script>
<script>
    var obj = {
        a: {e: 4, f: 5, g: [{a: 1, b: 2}, [3, 4]], dd: {ddd: 1"}}",
        b: 2,
        c: 3
    };

    new Watch(obj, call);
    function call(path, newVal, oldVal) {
        document.getElementById('path').innerHTML='路径:'+path;
        document.getElementById('old-val').innerHTML='新的值:'+newVal;
        document.getElementById('new-val').innerHTML='老的值:'+oldVal;
    }

    function dataOne() {
        obj.b = Math.floor(Math.random()*10);
    }

    function dataTwo() {
        obj.a.dd.ddd = Math.floor(Math.random()*10);
    }

    function dataThree() {
        obj.a.g[0].a=Math.floor(Math.random()*10);
    }

    function dataFour() {
        obj.a.g.push(Math.floor(Math.random()*10));
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">"dataOne()"</span>&gt;</span>
            将obj b属性改变
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">"dataTwo()"</span>&gt;</span>
            将obj a属性的dd属性的ddd属性改变
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">"dataThree()"</span>&gt;</span>
            将obj a属性的g属性数组第一个值的a属性改变
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">"dataFour()"</span>&gt;</span>
            将obj a属性的g属性数组push新的值
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"path"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"old-val"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"new-val"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../src/watch.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">a</span>: {<span class="hljs-attr">e</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">f</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">g</span>: [{<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>}, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]], <span class="hljs-attr">dd</span>: {<span class="hljs-attr">ddd</span>: <span class="hljs-number">1</span>"}}",
        <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
    };

    <span class="hljs-keyword">new</span> Watch(obj, call);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">call</span>(<span class="hljs-params">path, newVal, oldVal</span>) </span>{
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'path'</span>).innerHTML=<span class="hljs-string">'路径:'</span>+path;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'old-val'</span>).innerHTML=<span class="hljs-string">'新的值:'</span>+newVal;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'new-val'</span>).innerHTML=<span class="hljs-string">'老的值:'</span>+oldVal;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataOne</span>(<span class="hljs-params"></span>) </span>{
        obj.b = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataTwo</span>(<span class="hljs-params"></span>) </span>{
        obj.a.dd.ddd = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataThree</span>(<span class="hljs-params"></span>) </span>{
        obj.a.g[<span class="hljs-number">0</span>].a=<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>);
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataFour</span>(<span class="hljs-params"></span>) </span>{
        obj.a.g.push(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>));
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h1 id="articleHeader10">效果图</h1>
<p><span class="img-wrap"><img data-src="/img/bVC9OW?w=790&amp;h=752" src="https://static.alili.tech/img/bVC9OW?w=790&amp;h=752" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader11">代码地址</h1>
<p><a href="https://github.com/laughing-pic-zhu/watch" rel="nofollow noreferrer" target="_blank">完整代码地址</a></p>
<h1 id="articleHeader12">流程图</h1>
<p>具体流程的复杂度基于监听对象的深度,所以下图只对父对象做流程分析<br><span class="img-wrap"><img data-src="/img/bVC9qf?w=460&amp;h=607" src="https://static.alili.tech/img/bVC9qf?w=460&amp;h=607" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader13">归纳</h1>
<ul>
<li><p>通过定义对象内部属性的setter和getter方法,对将要变化的属性进行拦截代理,在变化前执行预设的回调函数来达到对象监听的目的。</p></li>
<li><p>数组则在对象监听之外额外在数组对象上的原型链上加一层原型对象,来拦截掉push,pop等方法,然后在执行预设的回调函数</p></li>
</ul>
<h1 id="articleHeader14">最后</h1>
<p>本文有什么不完善的地方,或者流程图有待改进的地方,敬请斧正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js对象监听实现

## 原文链接
[https://segmentfault.com/a/1190000006910230](https://segmentfault.com/a/1190000006910230)


---
title: '浅析vue的双向数据绑定' 
date: 2018-12-05 2:30:09
hidden: true
slug: ehu2316sxkp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1.原理</h1>
<p>vue的双向数据绑定的原理相信大家都十分了解；主要是通过ES5的<code>Object对象的defineProperty属性；重写data的set和get函数</code>来实现的</p>
<blockquote>所以接下来不使用ES6进行实际的代码开发；过程中如果函数使用父级<code>this</code>的情况；还是使用<code>显示缓存中间变量</code>和<code>闭包</code>来处理；<em>原因是箭头函数没有独立的<code>执行上下文this</code>；所以箭头函数内部出现<code>this</code>对象会直接访问父级；所以也能看出箭头函数是无法完全替代function的使用场景的；比如我们需要独立的<code>this</code>或者<code>argument</code>的时候</em>
</blockquote>
<h2 id="articleHeader1">1.2 defineProperty是什么</h2>
<p>语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(obj, prop, descriptor)
参数：
    obj：必要的目标对象
    prop：必要的需要定义或者修改的属性名
    descriptor：必要的目标属性全部拥有的属性
返回值：
返回传入的第一个函数；即第一个参数obj" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Object.defineProperty(obj, <span class="hljs-keyword">prop</span>, descriptor)
参数：
    obj：必要的目标对象
    <span class="hljs-keyword">prop</span>：必要的需要定义或者修改的属性名
    descriptor：必要的目标属性全部拥有的属性
返回值：
返回传入的第一个函数；即第一个参数obj</code></pre>
<p>该方法允许精确的添加或者修改对象的属性；通过赋值来添加的普通属性会创建在属性枚举期间显示（<code>fon...in；object.key</code>）；这些添加的值可以被改变也可以删除；也可以给这个属性设置一些特性；比如是否只读不可写；目前提供两种形式：<code>数据描述（set；get；value;writable;enumerable;confingurable）和存取器描述（set；get）</code></p>
<h4>数据描述</h4>
<p>当修改或者定义对象的某个属性的时候；给这个属性添加一些特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name:'xiangha'
}
// 对象已有的属性添加特性描述
Object.defineProperty(obj,'name',{
   configurable:true | false, // 如果是false则不可以删除
   enumerable:true | false, // 如果为false则在枚举时候会忽略
   value:'任意类型的值,默认undefined'
   writable:true | false // 如果为false则不可采用数据运算符进行赋值
});
但是存在一个交叉；如果wrirable为true；而configurable为false的时候；所以需要枚举处理enumerable为false
--- 我是一个writable栗子 ---
var obj = {};
Object.defineProperty(obj,'val',{
    value:'xiangha',
    writable:false, // false
    enumerable:true,
    configurable:true
});
obj.val = '书记'; // 这个时候是更改不了a的
--- 我是一个configurable栗子 ---
var obj = {};
Object.defineProperty(obj,'val',{
    value:'xiangha',
    writable:true, // true
    enumerable:true,
    configurable:false  // false
});
obj.val = '书记'; // 这个时候是val发生了改变
delete obj.val 会返回false；并且val没有删除
--- 我是一个enumerable栗子 --- 
var obj = {};
Object.defineProperty(obj,'val',{
    value:'xiangha',
    writable:true,
    enumerable:false, // false
    configurable:true
});
for(var i in obj){
    console.log(obj[i]) // 没有具体值
}

综上：对于我们有影响主要是configurable控制是否可以删除；writable控制是否可以修改赋值；enumerable是否可以枚举
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    name:</span><span class="hljs-string">'xiangha'</span>
<span class="hljs-string">}</span>
<span class="hljs-string">//</span> <span class="hljs-string">对象已有的属性添加特性描述</span>
<span class="hljs-string">Object.defineProperty(obj,'name',{</span>
<span class="hljs-attr">   configurable:</span><span class="hljs-literal">true</span> <span class="hljs-string">| false, // 如果是false则不可以删除
</span><span class="hljs-attr">   enumerable:</span><span class="hljs-literal">true</span> <span class="hljs-string">| false, // 如果为false则在枚举时候会忽略
</span><span class="hljs-attr">   value:</span><span class="hljs-string">'任意类型的值,默认undefined'</span>
<span class="hljs-attr">   writable:</span><span class="hljs-literal">true</span> <span class="hljs-string">| false // 如果为false则不可采用数据运算符进行赋值
});
但是存在一个交叉；如果wrirable为true；而configurable为false的时候；所以需要枚举处理enumerable为false
--- 我是一个writable栗子 ---
var obj = {};
Object.defineProperty(obj,'val',{
</span><span class="hljs-attr">    value:</span><span class="hljs-string">'xiangha'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">    enumerable:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    configurable:</span><span class="hljs-literal">true</span>
<span class="hljs-string">});</span>
<span class="hljs-string">obj.val</span> <span class="hljs-string">=</span> <span class="hljs-string">'书记'</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">这个时候是更改不了a的</span>
<span class="hljs-bullet">-</span><span class="hljs-bullet">--</span> <span class="hljs-string">我是一个configurable栗子</span> <span class="hljs-meta">---</span>
<span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>
<span class="hljs-string">Object.defineProperty(obj,'val',{</span>
<span class="hljs-attr">    value:</span><span class="hljs-string">'xiangha'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">    enumerable:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    configurable:</span><span class="hljs-literal">false</span>  <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-string">});</span>
<span class="hljs-string">obj.val</span> <span class="hljs-string">=</span> <span class="hljs-string">'书记'</span><span class="hljs-string">;</span> <span class="hljs-string">//</span> <span class="hljs-string">这个时候是val发生了改变</span>
<span class="hljs-string">delete</span> <span class="hljs-string">obj.val</span> <span class="hljs-string">会返回false；并且val没有删除</span>
<span class="hljs-bullet">-</span><span class="hljs-bullet">--</span> <span class="hljs-string">我是一个enumerable栗子</span> <span class="hljs-meta">---</span> 
<span class="hljs-string">var</span> <span class="hljs-string">obj</span> <span class="hljs-string">=</span> <span class="hljs-string">{};</span>
<span class="hljs-string">Object.defineProperty(obj,'val',{</span>
<span class="hljs-attr">    value:</span><span class="hljs-string">'xiangha'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    writable:</span><span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    enumerable:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">    configurable:</span><span class="hljs-literal">true</span>
<span class="hljs-string">});</span>
<span class="hljs-string">for(var</span> <span class="hljs-string">i</span> <span class="hljs-string">in</span> <span class="hljs-string">obj){</span>
    <span class="hljs-string">console.log(obj[i])</span> <span class="hljs-string">//</span> <span class="hljs-string">没有具体值</span>
<span class="hljs-string">}</span>

<span class="hljs-string">综上：对于我们有影响主要是configurable控制是否可以删除；writable控制是否可以修改赋值；enumerable是否可以枚举</span>
</code></pre>
<p>所以说一旦使用Object.defineProperty()给对象添加属性；那么如果不设置属性的特性；则默认值都为false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {}; 
Object.defineProperty(obj,'name',{}); // 定义了心属性name后；这个属性的特性的值都为false；这就导致name这个是不能重写不能枚举不能再次设置特性的
obj.name = '书记'; 
console.log(obj.name); // undefined
for(var i in obj){
    console.log(obj[i])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> obj = <span class="hljs-comment">{}</span>; 
<span class="hljs-keyword">Object</span>.defineProperty(obj,<span class="hljs-string">'name'</span>,<span class="hljs-comment">{}</span>); <span class="hljs-comment">// 定义了心属性name后；这个属性的特性的值都为false；这就导致name这个是不能重写不能枚举不能再次设置特性的</span>
obj.<span class="hljs-keyword">name</span> = <span class="hljs-string">'书记'</span>; 
console.log(obj.<span class="hljs-keyword">name</span>); <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> obj)<span class="hljs-comment">{
    console.log(obj[i])
}</span></code></pre>
<p>总结特性：</p>
<ul>
<li>value：设置属性的值</li>
<li>writable ['raɪtəbl] ：值是否可以重写</li>
<li>enumerable [ɪ'nju:mərəbəl]：目标属性是否可以被枚举</li>
<li>configurable [kən'fɪgərəbl]：目标属性是否可以被删除是否可以再次修改特性</li>
</ul>
<h4>存取器描述</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperty(obj,'name',{
    get:function(){} | undefined,
    set:function(){} | undefined,
    configuracble:true | false,
    enumerable:true | false
})
注意：当前使用了setter和getter方法；不允许使用writable和value两个属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj = {};
Object.defineProperty(obj,<span class="hljs-string">'name'</span>,{
    <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{} | <span class="hljs-literal">undefined</span>,
    <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{} | <span class="hljs-literal">undefined</span>,
    configuracble:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>,
    enumerable:<span class="hljs-literal">true</span> | <span class="hljs-literal">false</span>
})
注意：当前使用了setter和getter方法；不允许使用writable和value两个属性</code></pre>
<p><strong>gettet&amp;&amp; setter</strong><br>当设置获取对象的某个属性的时候；可以提供getter和setter方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
var value = 'xiangha';
Object.defineProperty(obj,'name',{
    get:function(){
        // 获取值触发
        return value
    }，
    set：function(val){
        // 设置值的时候触发；设置的新值通过参数val拿到
        value = val；
    }
});
console.log(obj.name); // xiangha
obj.name = '书记';
console,.log(obj.name); // 书记" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">var</span> value = <span class="hljs-string">'xiangha'</span>;
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">'name'</span>,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 获取值触发</span>
        <span class="hljs-keyword">return</span> value
    }，
    set：<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val</span>)</span>{
        <span class="hljs-comment">// 设置值的时候触发；设置的新值通过参数val拿到</span>
        value = val；
    }
});
<span class="hljs-built_in">console</span>.log(obj.name); <span class="hljs-comment">// xiangha</span>
obj.name = <span class="hljs-string">'书记'</span>;
<span class="hljs-built_in">console</span>,.log(obj.name); <span class="hljs-comment">// 书记</span></code></pre>
<p><strong>get和set不是必须成对出现对；任写一个就行；如果不设置set和get方法；则为undefined</strong></p>
<p>哈哈；前戏终于铺垫完成了</p>
<blockquote>
<p>补充：如果使用vue开发项目；尝试去打印<code>data</code>对象的时候；会发现data内的每一个属性都有get和set属性方法；这里说明一下vue和angular的双向数据绑定不同</p>
<ul>
<li>angular是用脏数据检测；Model发生改变的时候；会检测所有视图是否绑定了相关的数据；再更新视图</li>
<li>vue是使用的发布订阅模式；点对点的绑定数据</li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/img/remote/1460000014274845?w=730&amp;h=390">网上图</a></p>
<h1 id="articleHeader2">2.实现</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <form>
      <input type=&quot;text&quot;  v-model=&quot;number&quot;>
      <button type=&quot;button&quot; v-click=&quot;increment&quot;>增加</button>
    </form>
    <h3 v-bind=&quot;number&quot;></h3>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>  <span class="hljs-attr">v-model</span>=<span class="hljs-string">"number"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-click</span>=<span class="hljs-string">"increment"</span>&gt;</span>增加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"number"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>页面很简单；包含：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 一个input，使用v-model指令
2. 一个button，使用v-click指令
3. 一个h3，使用v-bind指令。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>一个input，使用v-model指令
<span class="hljs-bullet">2. </span>一个button，使用v-click指令
<span class="hljs-bullet">3. </span>一个h3，使用v-bind指令。</code></pre>
<p>我们最后也会类似vue对方式来实现双向数据绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new xhVue({
      el:'#app',
      data: {
        number: 0
      },
      methods: {
        increment: function() {
          this.number ++;
        },
      }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> xhVue({
      el:<span class="hljs-string">'#app'</span>,
      data: {
        number: <span class="hljs-number">0</span>
      },
      methods: {
        increment: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
          <span class="hljs-keyword">this</span>.number ++;
        },
      }
    })</code></pre>
<h4>2.1 定义</h4>
<p>首先我们需要定义一个xhVue的构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function xhVue(options){
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhVue</span><span class="hljs-params">(options)</span></span>{
    
}</code></pre>
<h4>2.2 添加</h4>
<p>为了初始化这个构造函数；给其添加一个_init属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function xhVue(options){
    this._init(options);
}
xhVue.prototype._init = function(options){
    this.$options = options; // options为使用时传入的结构体；包括el，data，methods等
    this.$el = document.querySelector(options.el); // el就是#app，this.$el是id为app的Element元素
    this.$data = options.data; // this.$data = {number:0}
    this.$methods = options.methods; // increment
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>function xhVue(<span class="hljs-keyword">options</span>){
    <span class="hljs-keyword">this</span>._init(<span class="hljs-keyword">options</span>);
}
xhVue.prototype._init = function(<span class="hljs-keyword">options</span>){
    <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span> = <span class="hljs-keyword">options</span>; <span class="hljs-comment">// options为使用时传入的结构体；包括el，data，methods等</span>
    <span class="hljs-keyword">this</span>.$el = document.querySelector(<span class="hljs-keyword">options</span>.el); <span class="hljs-comment">// el就是#app，this.$el是id为app的Element元素</span>
    <span class="hljs-keyword">this</span>.$data = <span class="hljs-keyword">options</span>.data; <span class="hljs-comment">// this.$data = {number:0}</span>
    <span class="hljs-keyword">this</span>.$methods = <span class="hljs-keyword">options</span>.methods; <span class="hljs-comment">// increment</span>
}</code></pre>
<h4>2.3 改造升级</h4>
<p>改造<code>_init</code>函数；并且实现<code>_xhob</code>函数；对data进行处理；重写set和get函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhVue.prototype._xhob = function(obj){ // obj = {number:0}
    var value;
    for(key in obj){
        if(obj.hasOwnProperty(ket)){
            value = obj[key];
            if(typeof value === 'object'){
                this._xhob(value);
            }
            Object.defineProperty(this.$data,key,{
                enumerable:true,
                configurable:true,
                get:function(){
                    return value;
                },
                set:function(newVal){
                    if(value !== newVal){
                        value = newVal;
                    }
                }
            })
        }
    }
}
xhVue.prototype._init = function(options){
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$method = options.methods;
    this._xhob(this.$data);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>xhVue.prototype._xhob = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span></span>{ <span class="hljs-comment">// obj = {number:0}</span>
    <span class="hljs-keyword">var</span> value;
    <span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> obj){
        <span class="hljs-keyword">if</span>(obj.hasOwnProperty(ket)){
            value = obj[key];
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>){
                <span class="hljs-keyword">this</span>._xhob(value);
            }
            Object.defineProperty(<span class="hljs-keyword">this</span>.$data,key,{
                enumerable:<span class="hljs-literal">true</span>,
                configurable:<span class="hljs-literal">true</span>,
                <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                    <span class="hljs-keyword">return</span> value;
                },
                <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newVal)</span></span>{
                    <span class="hljs-keyword">if</span>(value !== newVal){
                        value = newVal;
                    }
                }
            })
        }
    }
}
xhVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(options)</span></span>{
    <span class="hljs-keyword">this</span>.$options = options;
    <span class="hljs-keyword">this</span>.$el = document.querySelector(options.el);
    <span class="hljs-keyword">this</span>.$data = options.data;
    <span class="hljs-keyword">this</span>.$method = options.methods;
    <span class="hljs-keyword">this</span>._xhob(<span class="hljs-keyword">this</span>.$data);
}</code></pre>
<h4>2.4 xhWatcher</h4>
<p>指令类watcher；用来绑定更新函数；实现对DOM更新</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function xhWatcher(name,el,vm,exp,attr){
    this.name = name; // 指令名称；对于文本节点；例如text
    this.el = el; // 指令对应DOM元素
    this.vm = vm; // 指令所属vue实例
    this.exp = exp; // 指令对应的值；例如number
    this.attr = attr; // 绑定的属性值；例如innerHTML
    this.update();
}
xhWatcher.prototype.update = function(){
    this.el[this.attr] = this.vm.$data[this.exp];
    // 例如h3的innerHTML = this.data.number;当numner改变则会触发本update方法；保证对应的DOM实时更新
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function xhWatcher(name,el,vm,exp,attr){
    <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// 指令名称；对于文本节点；例如text</span>
    <span class="hljs-keyword">this</span>.el = el; <span class="hljs-comment">// 指令对应DOM元素</span>
    <span class="hljs-keyword">this</span>.vm = vm; <span class="hljs-comment">// 指令所属vue实例</span>
    <span class="hljs-keyword">this</span>.exp = exp; <span class="hljs-comment">// 指令对应的值；例如number</span>
    <span class="hljs-keyword">this</span>.attr = attr; <span class="hljs-comment">// 绑定的属性值；例如innerHTML</span>
    <span class="hljs-keyword">this</span>.update();
}
xhWatcher.prototype.update = function(){
    <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$<span class="hljs-keyword">data</span>[<span class="hljs-keyword">this</span>.exp];
    <span class="hljs-comment">// 例如h3的innerHTML = this.data.number;当numner改变则会触发本update方法；保证对应的DOM实时更新</span>
}</code></pre>
<h4>2.5 完善_init和_xhob</h4>
<p>继续完善_init和_xhob函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给init的时候增加一个对象来存储model和view的映射关系；也就是我们前面定义的xhWatcher的实例；当model发生变化时；我们会触发其中的指令另其更新；保证了view也同时更新
xhVue.prototype._init = function(options){
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$method = options.methods;
    
    this._binding = {}; // _binding
    this._xhob(this.$data);
}
// 通过init出来的_binding
xhVue.prototype._xhob = function(obj){ // obj = {number:0}
    var value;
    for(key in obj){
        if(obj.hasOwnProperty(ket)){
            this._binding[key] = {
                // _binding = {number:_directives:[]}
                _directives = []
            }
            value = obj[key];
            if(typeof value === 'object'){
                this._xhob(value);
            }
            var binding = this._binding[key];
            Object.defineProperty(this.$data,key,{
                enumerable:true,
                configurable:true,
                get:function(){
                    return value;
                },
                set:function(newVal){
                    if(value !== newVal){
                        value = newVal;
                        // 当number改变时；触发_binding[number]._directives中已绑定的xhWatcher更新
                        binding._directives.forEach(function(item){
                           item.update(); 
                        });
                    }
                }
            })
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 给init的时候增加一个对象来存储model和view的映射关系；也就是我们前面定义的xhWatcher的实例；当model发生变化时；我们会触发其中的指令另其更新；保证了view也同时更新</span>
xhVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(options)</span></span>{
    <span class="hljs-keyword">this</span>.$options = options;
    <span class="hljs-keyword">this</span>.$el = document.querySelector(options.el);
    <span class="hljs-keyword">this</span>.$data = options.data;
    <span class="hljs-keyword">this</span>.$method = options.methods;
    
    <span class="hljs-keyword">this</span>._binding = {}; <span class="hljs-comment">// _binding</span>
    <span class="hljs-keyword">this</span>._xhob(<span class="hljs-keyword">this</span>.$data);
}
<span class="hljs-comment">// 通过init出来的_binding</span>
xhVue.prototype._xhob = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span></span>{ <span class="hljs-comment">// obj = {number:0}</span>
    <span class="hljs-keyword">var</span> value;
    <span class="hljs-keyword">for</span>(key <span class="hljs-keyword">in</span> obj){
        <span class="hljs-keyword">if</span>(obj.hasOwnProperty(ket)){
            <span class="hljs-keyword">this</span>._binding[key] = {
                <span class="hljs-comment">// _binding = {number:_directives:[]}</span>
                _directives = []
            }
            value = obj[key];
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>){
                <span class="hljs-keyword">this</span>._xhob(value);
            }
            <span class="hljs-keyword">var</span> binding = <span class="hljs-keyword">this</span>._binding[key];
            Object.defineProperty(<span class="hljs-keyword">this</span>.$data,key,{
                enumerable:<span class="hljs-literal">true</span>,
                configurable:<span class="hljs-literal">true</span>,
                <span class="hljs-keyword">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                    <span class="hljs-keyword">return</span> value;
                },
                <span class="hljs-keyword">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newVal)</span></span>{
                    <span class="hljs-keyword">if</span>(value !== newVal){
                        value = newVal;
                        <span class="hljs-comment">// 当number改变时；触发_binding[number]._directives中已绑定的xhWatcher更新</span>
                        binding._directives.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
                           item.update(); 
                        });
                    }
                }
            })
        }
    }
}</code></pre>
<h4>2.6 解析指令</h4>
<p>怎么才能将view与model绑定；我们定义一个_xhcomplie函数来解析我们的指令（v-bind；v-model；v-clickde）并这这个过程中对view和model进行绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhVue.prototype._xhcompile = function (root) {
    // root是id为app的element的元素；也就是根元素
    var _this = this;
    var nodes = root.children;
    for (var i = 0,len = nodes.length; i < len; i++) {
        var node = nodes[i];
        if (node.children.length) {
            // 所有元素进行处理
            this._xhcompile(node)
        };
        // 如果有v-click属性；我们监听他的click事件；触发increment事件，即number++
        if (node.hasAttribute('v-click')) {
            node.onclick = (function () {
                var attrVal = nodes[i].getAttribute('v-click');
                // bind让data的作用域与methods函数的作用域保持一致
                return _this.$method[attrVal].bind(_this.$data);
            })();
        };
        // 如果有v-model属性；并且元素是input或者textrea；我们监听他的input事件
        if (node.hasAttribute('v-model') &amp;&amp; (node.tagName = 'INPUT' || node.tagName == 'TEXTAREA')) {
            node.addEventListener('input', (function (key) {
                var attrVal = node.getAttribute('v-model');
                _this._binding[attrVal]._directives.push(new xhWatcher(
                    'input', 
                    node, 
                    _this,
                    attrVal, 
                    'value'
                ));
                return function () {
                    // 让number的值和node的value保持一致；就实现了双向数据绑定
                    _this.$data[attrVal] = nodes[key].value
                }
            })(i));
        };
        // 如果有v-bind属性；我们要让node的值实时更新为data中number的值
        if (node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal]._directives.push(new xhWatcher(
                'text', 
                node, 
                _this,
                attrVal,
                'innerHTML'
            ))
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>xhVue.prototype._xhcompile = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(root)</span> </span>{
    <span class="hljs-comment">// root是id为app的element的元素；也就是根元素</span>
    <span class="hljs-keyword">var</span> _this = this;
    <span class="hljs-keyword">var</span> nodes = root.children;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,len = nodes.length; i &lt; len; i++) {
        <span class="hljs-keyword">var</span> node = nodes[i];
        <span class="hljs-keyword">if</span> (node.children.length) {
            <span class="hljs-comment">// 所有元素进行处理</span>
            this._xhcompile(node)
        };
        <span class="hljs-comment">// 如果有v-click属性；我们监听他的click事件；触发increment事件，即number++</span>
        <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-click'</span>)) {
            node.onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">var</span> attrVal = nodes[i].getAttribute(<span class="hljs-string">'v-click'</span>);
                <span class="hljs-comment">// bind让data的作用域与methods函数的作用域保持一致</span>
                <span class="hljs-keyword">return</span> _this.$method[attrVal].bind(_this.$data);
            })();
        };
        <span class="hljs-comment">// 如果有v-model属性；并且元素是input或者textrea；我们监听他的input事件</span>
        <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-model'</span>) &amp;&amp; (node.tagName = <span class="hljs-string">'INPUT'</span> || node.tagName == <span class="hljs-string">'TEXTAREA'</span>)) {
            node.addEventListener(<span class="hljs-string">'input'</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(key)</span> </span>{
                <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">'v-model'</span>);
                _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> xhWatcher(
                    <span class="hljs-string">'input'</span>, 
                    node, 
                    _this,
                    attrVal, 
                    <span class="hljs-string">'value'</span>
                ));
                <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    <span class="hljs-comment">// 让number的值和node的value保持一致；就实现了双向数据绑定</span>
                    _this.$data[attrVal] = nodes[key].value
                }
            })(i));
        };
        <span class="hljs-comment">// 如果有v-bind属性；我们要让node的值实时更新为data中number的值</span>
        <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-bind'</span>)) {
            <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">'v-bind'</span>);
            _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> xhWatcher(
                <span class="hljs-string">'text'</span>, 
                node, 
                _this,
                attrVal,
                <span class="hljs-string">'innerHTML'</span>
            ))
        }
    }
}</code></pre>
<p>并且将解析函数也加到_init函数中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhVue.prototype._init = function(options){
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$method = options.methods;
    
    this._binding = {}; // _binding
    this._xhob(this.$data);
    this._xhcompile(this.$el);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>xhVue.prototype._init = function(options){
    <span class="hljs-keyword">this</span>.$options = options;
    <span class="hljs-keyword">this</span>.$el = document.querySelector(options.el);
    <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">data</span> = options.<span class="hljs-keyword">data</span>;
    <span class="hljs-keyword">this</span>.$method = options.methods;
    
    <span class="hljs-keyword">this</span>._binding = {}; <span class="hljs-comment">// _binding</span>
    <span class="hljs-keyword">this</span>._xhob(<span class="hljs-keyword">this</span>.$<span class="hljs-keyword">data</span>);
    <span class="hljs-keyword">this</span>._xhcompile(<span class="hljs-keyword">this</span>.$el);
}</code></pre>
<h1 id="articleHeader3">最后</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
</head>
<body>
    <div id=&quot;app&quot;>
        <form>
            <input type=&quot;text&quot; v-model=&quot;number&quot;>
            <button type=&quot;button&quot; v-click=&quot;increment&quot;>增加</button>
        </form>
        <h3 v-bind=&quot;number&quot;></h3>
    </div>
</body>
<script>
    function xhVue(options) {
        this._init(options);
    }
    xhVue.prototype._init = function (options) {
        this.$options = options;
        this.$el = document.querySelector(options.el);
        this.$data = options.data;
        this.$method = options.methods;

        this._binding = {}; // _binding
        this._xhob(this.$data);
        this._xhcompile(this.$el);
    }

    xhVue.prototype._xhob = function (obj) {
        var value;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                this._binding[key] = {
                    _directives: []
                }
                value = obj[key];
                if (typeof value === 'object') {
                    this._xhob(value);
                }
                var binding = this._binding[key];
                Object.defineProperty(this.$data, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        console.log(`get${value}`)
                        return value;
                    },
                    set: function (newVal) {
                        if (value !== newVal) {
                            value = newVal;
                            console.log(`set${newVal}`)
                            // 当number改变时；触发_binding[number]._directives中已绑定的xhWatcher更新
                            binding._directives.forEach(function (item) {
                                item.update();
                            });
                        }
                    }
                })
            }
        }
    }

    xhVue.prototype._xhcompile = function (root) {
        // root是id为app的element的元素；也就是根元素
        var _this = this;
        var nodes = root.children;
        for (var i = 0, len = nodes.length; i < len; i++) {
            var node = nodes[i];
            if (node.children.length) {
                // 所有元素进行处理
                this._xhcompile(node)
            };
            // 如果有v-click属性；我们监听他的click事件；触发increment事件，即number++
            if (node.hasAttribute('v-click')) {
                node.onclick = (function () {
                    var attrVal = node.getAttribute('v-click');
                    console.log(attrVal);
                    // bind让data的作用域与method函数的作用域保持一致
                    return _this.$method[attrVal].bind(_this.$data);
                })();
            };
            // 如果有v-model属性；并且元素是input或者textrea；我们监听他的input事件
            if (node.hasAttribute('v-model') &amp;&amp; (node.tagName = 'INPUT' || node.tagName == 'TEXTAREA')) {
                node.addEventListener('input', (function (key) {
                    var attrVal = node.getAttribute('v-model');
                    _this._binding[attrVal]._directives.push(new xhWatcher(
                        'input',
                        node,
                        _this,
                        attrVal,
                        'value'
                    ));
                    return function () {
                        // 让number的值和node的value保持一致；就实现了双向数据绑定
                        _this.$data[attrVal] = nodes[key].value
                    }
                })(i));
            };
            // 如果有v-bind属性；我们要让node的值实时更新为data中number的值
            if (node.hasAttribute('v-bind')) {
                var attrVal = node.getAttribute('v-bind');
                _this._binding[attrVal]._directives.push(new xhWatcher(
                    'text',
                    node,
                    _this,
                    attrVal,
                    'innerHTML'
                ))
            }
        }
    }

    function xhWatcher(name, el, vm, exp, attr) {
        this.name = name; // 指令名称；对于文本节点；例如text
        this.el = el; // 指令对应DOM元素
        this.vm = vm; // 指令所属vue实例
        this.exp = exp; // 指令对应的值；例如number
        this.attr = attr; // 绑定的属性值；例如innerHTML
        this.update();
    }
    xhWatcher.prototype.update = function () {
        this.el[this.attr] = this.vm.$data[this.exp];
        // 例如h3的innerHTML = this.data.number;当numner改变则会触发本update方法；保证对应的DOM实时更新
    }
    var app = new xhVue({
        el: '#app',
        data: {
            number: 0
        },
        methods: {
            increment: function () {
                this.number++;
            }
        }
    });
</script>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"number"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-click</span>=<span class="hljs-string">"increment"</span>&gt;</span>增加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"number"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhVue</span>(<span class="hljs-params">options</span>) </span>{
        <span class="hljs-keyword">this</span>._init(options);
    }
    xhVue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
        <span class="hljs-keyword">this</span>.$options = options;
        <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el);
        <span class="hljs-keyword">this</span>.$data = options.data;
        <span class="hljs-keyword">this</span>.$method = options.methods;

        <span class="hljs-keyword">this</span>._binding = {}; <span class="hljs-comment">// _binding</span>
        <span class="hljs-keyword">this</span>._xhob(<span class="hljs-keyword">this</span>.$data);
        <span class="hljs-keyword">this</span>._xhcompile(<span class="hljs-keyword">this</span>.$el);
    }

    xhVue.prototype._xhob = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> value;
        <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> obj) {
            <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)) {
                <span class="hljs-keyword">this</span>._binding[key] = {
                    <span class="hljs-attr">_directives</span>: []
                }
                value = obj[key];
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>) {
                    <span class="hljs-keyword">this</span>._xhob(value);
                }
                <span class="hljs-keyword">var</span> binding = <span class="hljs-keyword">this</span>._binding[key];
                <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-keyword">this</span>.$data, key, {
                    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`get<span class="hljs-subst">${value}</span>`</span>)
                        <span class="hljs-keyword">return</span> value;
                    },
                    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
                        <span class="hljs-keyword">if</span> (value !== newVal) {
                            value = newVal;
                            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`set<span class="hljs-subst">${newVal}</span>`</span>)
                            <span class="hljs-comment">// 当number改变时；触发_binding[number]._directives中已绑定的xhWatcher更新</span>
                            binding._directives.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
                                item.update();
                            });
                        }
                    }
                })
            }
        }
    }

    xhVue.prototype._xhcompile = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root</span>) </span>{
        <span class="hljs-comment">// root是id为app的element的元素；也就是根元素</span>
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">var</span> nodes = root.children;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = nodes.length; i &lt; len; i++) {
            <span class="hljs-keyword">var</span> node = nodes[i];
            <span class="hljs-keyword">if</span> (node.children.length) {
                <span class="hljs-comment">// 所有元素进行处理</span>
                <span class="hljs-keyword">this</span>._xhcompile(node)
            };
            <span class="hljs-comment">// 如果有v-click属性；我们监听他的click事件；触发increment事件，即number++</span>
            <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-click'</span>)) {
                node.onclick = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">'v-click'</span>);
                    <span class="hljs-built_in">console</span>.log(attrVal);
                    <span class="hljs-comment">// bind让data的作用域与method函数的作用域保持一致</span>
                    <span class="hljs-keyword">return</span> _this.$method[attrVal].bind(_this.$data);
                })();
            };
            <span class="hljs-comment">// 如果有v-model属性；并且元素是input或者textrea；我们监听他的input事件</span>
            <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-model'</span>) &amp;&amp; (node.tagName = <span class="hljs-string">'INPUT'</span> || node.tagName == <span class="hljs-string">'TEXTAREA'</span>)) {
                node.addEventListener(<span class="hljs-string">'input'</span>, (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
                    <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">'v-model'</span>);
                    _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> xhWatcher(
                        <span class="hljs-string">'input'</span>,
                        node,
                        _this,
                        attrVal,
                        <span class="hljs-string">'value'</span>
                    ));
                    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">// 让number的值和node的value保持一致；就实现了双向数据绑定</span>
                        _this.$data[attrVal] = nodes[key].value
                    }
                })(i));
            };
            <span class="hljs-comment">// 如果有v-bind属性；我们要让node的值实时更新为data中number的值</span>
            <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-bind'</span>)) {
                <span class="hljs-keyword">var</span> attrVal = node.getAttribute(<span class="hljs-string">'v-bind'</span>);
                _this._binding[attrVal]._directives.push(<span class="hljs-keyword">new</span> xhWatcher(
                    <span class="hljs-string">'text'</span>,
                    node,
                    _this,
                    attrVal,
                    <span class="hljs-string">'innerHTML'</span>
                ))
            }
        }
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhWatcher</span>(<span class="hljs-params">name, el, vm, exp, attr</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name; <span class="hljs-comment">// 指令名称；对于文本节点；例如text</span>
        <span class="hljs-keyword">this</span>.el = el; <span class="hljs-comment">// 指令对应DOM元素</span>
        <span class="hljs-keyword">this</span>.vm = vm; <span class="hljs-comment">// 指令所属vue实例</span>
        <span class="hljs-keyword">this</span>.exp = exp; <span class="hljs-comment">// 指令对应的值；例如number</span>
        <span class="hljs-keyword">this</span>.attr = attr; <span class="hljs-comment">// 绑定的属性值；例如innerHTML</span>
        <span class="hljs-keyword">this</span>.update();
    }
    xhWatcher.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$data[<span class="hljs-keyword">this</span>.exp];
        <span class="hljs-comment">// 例如h3的innerHTML = this.data.number;当numner改变则会触发本update方法；保证对应的DOM实时更新</span>
    }
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> xhVue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-attr">number</span>: <span class="hljs-number">0</span>
        },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-attr">increment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">this</span>.number++;
            }
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>所有的代码；复制到编辑器就可查看效果了～～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析vue的双向数据绑定

## 原文链接
[https://segmentfault.com/a/1190000014423018](https://segmentfault.com/a/1190000014423018)


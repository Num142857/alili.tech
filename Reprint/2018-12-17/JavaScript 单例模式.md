---
title: 'JavaScript 单例模式' 
date: 2018-12-17 2:30:07
hidden: true
slug: y7tyiink8yo
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">定义</h3>
<p>确保一个类仅有一个实例，并提供一个访问它的全局访问点。</p>
<h3 id="articleHeader1">单例模式使用的场景</h3>
<p>比如线程池、全局缓存等。我们所熟知的浏览器的window对象就是一个单例，在JavaScript开发中，对于这种只需要一个的对象，我们的实现往往使用单例。</p>
<h3 id="articleHeader2">实现单例模式 （不透明的）</h3>
<p>一般我们是这样实现单例的，用一个变量来标志当前的类已经创建过对象，如果下次获取当前类的实例时，直接返回之前创建的对象即可。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个类
function Singleton(name) {
    this.name = name;
    this.instance = null;
}
// 原型扩展类的一个方法getName()
Singleton.prototype.getName = function() {
    console.log(this.name)
};
// 获取类的实例
Singleton.getInstance = function(name) {
    if(!this.instance) {
        this.instance = new Singleton(name);
    }
    return this.instance
};

// 获取对象1
var a = Singleton.getInstance('a');
// 获取对象2
var b = Singleton.getInstance('b');
// 进行比较
console.log(a === b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 定义一个类</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Singleton</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.instance = <span class="hljs-literal">null</span>;
}
<span class="hljs-comment">// 原型扩展类的一个方法getName()</span>
Singleton.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
};
<span class="hljs-comment">// 获取类的实例</span>
Singleton.getInstance = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.instance) {
        <span class="hljs-keyword">this</span>.instance = <span class="hljs-keyword">new</span> Singleton(name);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.instance
};

<span class="hljs-comment">// 获取对象1</span>
<span class="hljs-keyword">var</span> a = Singleton.getInstance(<span class="hljs-string">'a'</span>);
<span class="hljs-comment">// 获取对象2</span>
<span class="hljs-keyword">var</span> b = Singleton.getInstance(<span class="hljs-string">'b'</span>);
<span class="hljs-comment">// 进行比较</span>
<span class="hljs-built_in">console</span>.log(a === b);</code></pre>
<p>我们也可以使用闭包来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Singleton(name) {
    this.name = name;
}
// 原型扩展类的一个方法getName()
Singleton.prototype.getName = function() {
    console.log(this.name)
};
// 获取类的实例
Singleton.getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance
    }        
})();

// 获取对象1
var a = Singleton.getInstance('a');
// 获取对象2
var b = Singleton.getInstance('b');
// 进行比较
console.log(a === b);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Singleton</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
}
<span class="hljs-comment">// 原型扩展类的一个方法getName()</span>
Singleton.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
};
<span class="hljs-comment">// 获取类的实例</span>
Singleton.getInstance = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> instance = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.instance) {
            <span class="hljs-keyword">this</span>.instance = <span class="hljs-keyword">new</span> Singleton(name);
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.instance
    }        
})();

<span class="hljs-comment">// 获取对象1</span>
<span class="hljs-keyword">var</span> a = Singleton.getInstance(<span class="hljs-string">'a'</span>);
<span class="hljs-comment">// 获取对象2</span>
<span class="hljs-keyword">var</span> b = Singleton.getInstance(<span class="hljs-string">'b'</span>);
<span class="hljs-comment">// 进行比较</span>
<span class="hljs-built_in">console</span>.log(a === b);</code></pre>
<p>这个单例实现获取对象的方式经常见于新手的写法，这种方式获取对象虽然简单，但是这种实现方式不透明。知道的人可以通过 <code>Singleton.getInstance()</code> 获取对象，不知道的需要研究代码的实现，这样不好。这与我们常见的用 <code>new</code> 关键字来获取对象有出入，实际意义不大。</p>
<h3 id="articleHeader3">实现单例模式 （透明的）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Singleton = (function(){
    var instance;
    var CreateSingleton = function (name) {
        this.name = name;

        if(instance) {
            return instance;
        }
        // 打印实例名字
        this.getName();

        // instance = this;
        // return instance;
        return instance = this;
    }
    // 获取实例的名字
    CreateSingleton.prototype.getName = function() {
        console.log(this.name)
    }

    return CreateSingleton;
})();
// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a===b);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Singleton = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> instance;
    <span class="hljs-keyword">var</span> CreateSingleton = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;

        <span class="hljs-keyword">if</span>(instance) {
            <span class="hljs-keyword">return</span> instance;
        }
        <span class="hljs-comment">// 打印实例名字</span>
        <span class="hljs-keyword">this</span>.getName();

        <span class="hljs-comment">// instance = this;</span>
        <span class="hljs-comment">// return instance;</span>
        <span class="hljs-keyword">return</span> instance = <span class="hljs-keyword">this</span>;
    }
    <span class="hljs-comment">// 获取实例的名字</span>
    CreateSingleton.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
    }

    <span class="hljs-keyword">return</span> CreateSingleton;
})();
<span class="hljs-comment">// 创建实例对象1</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> Singleton(<span class="hljs-string">'a'</span>);
<span class="hljs-comment">// 创建实例对象2</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> Singleton(<span class="hljs-string">'b'</span>);

<span class="hljs-built_in">console</span>.log(a===b);
</code></pre>
<p>这种单例模式我以前用过一次，但是使用起来很别扭，我也见过别人用这种方式实现过走马灯的效果，因为走马灯在我们的应用中绝大多数只有一个。</p>
<p>这里先说一下为什么感觉不对劲，因为在这个单例的构造函数中一共干了两件事，一个是创建对象并打印实例名字，另一个是保证只有一个实例对象。这样代码量大的化不方便管理，应该尽量做到职责单一。</p>
<p>我们通常会将代码改成下面这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 单例构造函数
function CreateSingleton (name) {
    this.name = name;
    this.getName();
};

// 获取实例的名字
CreateSingleton.prototype.getName = function() {
    console.log(this.name)
};
// 单例对象
var Singleton = (function(){
    var instance;
    return function (name) {
        if(!instance) {
            instance = new CreateSingleton(name);
        }
        return instance;
    }
})();

// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a===b);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 单例构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CreateSingleton</span> (<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.getName();
};

<span class="hljs-comment">// 获取实例的名字</span>
CreateSingleton.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
};
<span class="hljs-comment">// 单例对象</span>
<span class="hljs-keyword">var</span> Singleton = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> instance;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">if</span>(!instance) {
            instance = <span class="hljs-keyword">new</span> CreateSingleton(name);
        }
        <span class="hljs-keyword">return</span> instance;
    }
})();

<span class="hljs-comment">// 创建实例对象1</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> Singleton(<span class="hljs-string">'a'</span>);
<span class="hljs-comment">// 创建实例对象2</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> Singleton(<span class="hljs-string">'b'</span>);

<span class="hljs-built_in">console</span>.log(a===b);
</code></pre>
<p>这种实现方式我们就比较熟悉了，我们在开发中经常会使用中间类，通过它来实现原类所不具有的特殊功能。有的人把这种实现方式叫做代理，这的确是单例模式的一种应用，稍后将在代理模式进行详解。</p>
<p>说了这么多我们还是在围绕着传统的单例模式实现在进行讲解，那么具有JavaScript特色的单例模式是什么呢。</p>
<h3 id="articleHeader4">JavaScript单例模式</h3>
<p>在我们的开发中，很多同学可能并不知道单例到底是什么，应该如何使用单例，但是他们所写的代码却刚好满足了单例模式的要求。如要实现一个登陆弹窗，不管那个页面或者在页面的那个地方单击登陆按钮，都会弹出登录窗。一些同学就会写一个全局的对象来实现登陆窗口功能，是的，这样的确可以实现所要求的登陆效果，也符合单例模式的要求，但是这种实现其实是一个巧合，或者一个美丽的错误。由于全局对象，或者说全局变量正好符合单例的能够全局访问，而且是唯一的。但是我们都知道，全局变量是可以被覆盖的，特别是对于初级开发人员来说，刚开始不管定义什么基本都是全局的，这样的好处是方便访问，坏处是一不留意就会引起冲突，特别是在做一个团队合作的大项目时，所以成熟的有经验的开发人员尽量减少全局的声明。</p>
<p>而在开发中我们避免全局变量污染的通常做法如下：</p>
<ul>
<li>全局命名空间</li>
<li>使用闭包</li>
</ul>
<p>它们的共同点是都可以定义自己的成员、存储数据。区别是全局命名空间的所有方法和属性都是公共的，而闭包可以实现方法和属性的私有化。</p>
<h3 id="articleHeader5">惰性单例模式</h3>
<p>说实话，在我下决心学习设计模式之前我并不知道，单例模式还分惰性单例模式，直到我看了曾探大神的《JvaScript设计模式与开发实践》后才知道了还有惰性单例模式，那么什么是惰性单例模式呢？在说惰性单例模式之前，请允许我先说一个我们都知道的lazyload加载图片，它就是惰性加载，只当含有图片资源的dom元素出现在媒体设备的可视区时，图片资源才会被加载，这种加载模式就是惰性加载；还有就是下拉刷新资源也是惰性加载，当你触发下拉刷新事件资源才会被加载等。而惰性单例模式的原理也是这样的，只有当触发创建实例对象时，实例对象才会被创建。这样的实例对象创建方式在开发中很有必要的。</p>
<p>就如同我们刚开始介绍的用 <code>Singleton.getInstance</code> 创建实例对象一样，虽然这种方式实现了惰性单例，但是正如我们刚开始说的那样这并不是一个好的实现方式。下面就来介绍一个好的实现方式。</p>
<p>遮罩层相信大家对它都不陌生。它在开发中比较常见，实现起来也比较简单。在每个人的开发中实现的方式不尽相同。这个最好的实现方式还是用单例模式。有的人实现直接在页面中加入一个div然后设置display为none，这样不管我们是否使用遮罩层页面都会加载这个div，如果是多个页面就是多个div的开销；也有的人使用js创建一个div，当需要时就用将其加入到body中，如果不需要就删除，这样频繁地操作dom对页面的性能也是一种消耗；还有的人是在前一种的基础上用一个标识符来判断，当遮罩层是第一次出现就向页面添加，不需要时隐藏，如果不是就是用前一次的添加的。</p>
<p>实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html

<button id=&quot;btn&quot;>click it</button>

// js
var createMask = (function() {
    var mask;
    return function() {
        if(!mask) {
            // 创建div元素
            var mask = document.createElement('div');
            // 设置样式
            mask.style.position = 'fixed';
            mask.style.top = '0';
            mask.style.right = '0';
            mask.style.bottom = '0';
            mask.style.left = '0';
            mask.style.opacity = '';
            mask.style.display = 'none';
            document.body.appendChild(mask);
        }

        return mask;
    }        
})();

document.getElementById('btn').onclick = function() {
    var maskLayer = createMask();
    maskLayer.style.display = 'block';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// html</span>

&lt;button id=<span class="hljs-string">"btn"</span>&gt;click it&lt;/button&gt;

<span class="hljs-comment">// js</span>
<span class="hljs-keyword">var</span> createMask = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> mask;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span>(!mask) {
            <span class="hljs-comment">// 创建div元素</span>
            <span class="hljs-keyword">var</span> mask = document.createElement(<span class="hljs-string">'div'</span>);
            <span class="hljs-comment">// 设置样式</span>
            mask.style.position = <span class="hljs-string">'fixed'</span>;
            mask.style.top = <span class="hljs-string">'0'</span>;
            mask.style.right = <span class="hljs-string">'0'</span>;
            mask.style.bottom = <span class="hljs-string">'0'</span>;
            mask.style.left = <span class="hljs-string">'0'</span>;
            mask.style.opacity = <span class="hljs-string">''</span>;
            mask.style.display = <span class="hljs-string">'none'</span>;
            document.body.appendChild(mask);
        }

        <span class="hljs-keyword">return</span> mask;
    }        
})();

document.getElementById(<span class="hljs-string">'btn'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> maskLayer = createMask();
    maskLayer.style.display = <span class="hljs-string">'block'</span>;
}</code></pre>
<p>我们发现在开发中并不会单独使用遮罩层，遮罩层和弹出窗是经常结合在一起使用，前面我们提到过登陆弹窗使用单例模式实现也是最适合的。那么我们是不是要将上面的代码拷贝一份呢？当然我们还有好的实现方式，那就是将上面单例中代码变化的部分和不变的部分，分离开来。</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var singleton = function(fn) {
    var instance;
    return function() {
        return instance || (instance = fn.apply(this, arguments));
    }
};
// 创建遮罩层
var createMask = function(){
    // 创建div元素
    var mask = document.createElement('div');
    // 设置样式
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.right = '0';
    mask.style.bottom = '0';
    mask.style.left = '0';
    mask.style.opacity = 'o.75';
    mask.style.backgroundColor = '#000';
    mask.style.display = 'none';
    mask.style.zIndex = '98';
    document.body.appendChild(mask);
    // 单击隐藏遮罩层
    mask.onclick = function(){
        this.style.display = 'none';
    }
    return mask;
};

// 创建登陆窗口
var createLogin = function() {
    // 创建div元素
    var login = document.createElement('div');
    // 设置样式
    login.style.position = 'fixed';
    login.style.top = '50%';
    login.style.left = '50%';
    login.style.zIndex = '100';
    login.style.display = 'none';
    login.style.padding = '50px 80px';
    login.style.backgroundColor = '#fff';
    login.style.border = '1px solid #ccc';
    login.style.borderRadius = '6px';

    login.innerHTML = 'login it';

    document.body.appendChild(login);

    return login;
};

document.getElementById('btn').onclick = function() {
    var oMask = singleton(createMask)();
    oMask.style.display = 'block';
    var oLogin = singleton(createLogin)();
    oLogin.style.display = 'block';
    var w = parseInt(oLogin.clientWidth);
    var h = parseInt(oLogin.clientHeight);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> singleton = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> instance;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> instance || (instance = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>));
    }
};
<span class="hljs-comment">// 创建遮罩层</span>
<span class="hljs-keyword">var</span> createMask = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 创建div元素</span>
    <span class="hljs-keyword">var</span> mask = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    <span class="hljs-comment">// 设置样式</span>
    mask.style.position = <span class="hljs-string">'fixed'</span>;
    mask.style.top = <span class="hljs-string">'0'</span>;
    mask.style.right = <span class="hljs-string">'0'</span>;
    mask.style.bottom = <span class="hljs-string">'0'</span>;
    mask.style.left = <span class="hljs-string">'0'</span>;
    mask.style.opacity = <span class="hljs-string">'o.75'</span>;
    mask.style.backgroundColor = <span class="hljs-string">'#000'</span>;
    mask.style.display = <span class="hljs-string">'none'</span>;
    mask.style.zIndex = <span class="hljs-string">'98'</span>;
    <span class="hljs-built_in">document</span>.body.appendChild(mask);
    <span class="hljs-comment">// 单击隐藏遮罩层</span>
    mask.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.style.display = <span class="hljs-string">'none'</span>;
    }
    <span class="hljs-keyword">return</span> mask;
};

<span class="hljs-comment">// 创建登陆窗口</span>
<span class="hljs-keyword">var</span> createLogin = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 创建div元素</span>
    <span class="hljs-keyword">var</span> login = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    <span class="hljs-comment">// 设置样式</span>
    login.style.position = <span class="hljs-string">'fixed'</span>;
    login.style.top = <span class="hljs-string">'50%'</span>;
    login.style.left = <span class="hljs-string">'50%'</span>;
    login.style.zIndex = <span class="hljs-string">'100'</span>;
    login.style.display = <span class="hljs-string">'none'</span>;
    login.style.padding = <span class="hljs-string">'50px 80px'</span>;
    login.style.backgroundColor = <span class="hljs-string">'#fff'</span>;
    login.style.border = <span class="hljs-string">'1px solid #ccc'</span>;
    login.style.borderRadius = <span class="hljs-string">'6px'</span>;

    login.innerHTML = <span class="hljs-string">'login it'</span>;

    <span class="hljs-built_in">document</span>.body.appendChild(login);

    <span class="hljs-keyword">return</span> login;
};

<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> oMask = singleton(createMask)();
    oMask.style.display = <span class="hljs-string">'block'</span>;
    <span class="hljs-keyword">var</span> oLogin = singleton(createLogin)();
    oLogin.style.display = <span class="hljs-string">'block'</span>;
    <span class="hljs-keyword">var</span> w = <span class="hljs-built_in">parseInt</span>(oLogin.clientWidth);
    <span class="hljs-keyword">var</span> h = <span class="hljs-built_in">parseInt</span>(oLogin.clientHeight);
}
</code></pre>
<p>在上面的实现中将单例模式的惰性实现部分提取出来，实现了惰性实现代码的复用，其中使用apply改变改变了fn内的this指向，使用 <code>||</code> 预算简化代码的书写。</p>
<p><a href="https://github.com/lvzhenbang/article/blob/master/design-pattern/index.md" rel="nofollow noreferrer" target="_blank">设计模式相关文章</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 单例模式

## 原文链接
[https://segmentfault.com/a/1190000012842251](https://segmentfault.com/a/1190000012842251)


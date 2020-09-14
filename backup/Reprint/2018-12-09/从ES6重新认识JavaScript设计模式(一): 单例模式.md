---
title: '从ES6重新认识JavaScript设计模式(一): 单例模式' 
date: 2018-12-09 2:30:08
hidden: true
slug: ar5tdqnfyvi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 什么是单例模式?</h2>
<p>单例模式是一种十分常用但却相对而言比较简单的单例模式。它是指在一个类只能有一个实例，即使多次实例化该类，也只返回第一次实例化后的实例对象。单例模式不仅能减少不必要的内存开销, 并且在减少全局的函数和变量冲突也具有重要的意义。</p>
<h3 id="articleHeader1">1.1 最简单的单例模式</h3>
<p>就算你对于单例模式的概念还比较模糊，但是我相信你肯定已经使用过单例模式了。我们来看一下下面的一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let timeTool = {
  name: '处理时间工具库',
  getISODate: function() {},
  getUTCDate: function() {}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> timeTool = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'处理时间工具库'</span>,
  <span class="hljs-attr">getISODate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
  <span class="hljs-attr">getUTCDate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
}</code></pre>
<p>以对象字面量创建对象的方式在JS开发中很常见。上面的对象是一个处理时间的工具库, 以对象字面量的方式来封装了一些方法处理时间格式。全局只暴露了一个<code>timeTool</code>对象, 在需要使用时, 只需要采用<code>timeTool.getISODate()</code>调用即可。<code>timeTool</code>对象就是单例模式的体现。在JavaScript创建对象的方式十分灵活, 可以直接通过对象字面量的方式实例化一个对象, 而其他面向对象的语言必须使用类进行实例化。所以，这里的<code>timeTool</code>就已经是一个实例， 且ES6中<code>let</code>和<code>const</code>不允许重复声明的特性，确保了<code>timeTool</code>不能被重新覆盖。</p>
<h3 id="articleHeader2">1.2 惰性单例</h3>
<p>采用对象字面量创建单例只能适用于简单的应用场景，一旦该对象十分复杂，那么创建对象本身就需要一定的耗时，且该对象可能需要有一些私有变量和私有方法。此时使用对象字面创建单例就不再行得通了，我们还是需要采用构造函数的方式实例化对象。下面就是使用立即执行函数和构造函数的方式改造上面的<code>timeTool</code>工具库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let timeTool = (function() {
  let _instance = null;
  
  function init() {
    //私有变量
    let now = new Date();
    //公用属性和方法
    this.name = '处理时间工具库',
    this.getISODate = function() {
      return now.toISOString();
    }
    this.getUTCDate = function() {
      return now.toUTCString();
    }
  }
  
  return function() {
    if(!_instance) {
      _instance = new init();
    }
    return _instance;
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> timeTool = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> _instance = <span class="hljs-literal">null</span>;
  
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//私有变量</span>
    <span class="hljs-keyword">let</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-comment">//公用属性和方法</span>
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'处理时间工具库'</span>,
    <span class="hljs-keyword">this</span>.getISODate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> now.toISOString();
    }
    <span class="hljs-keyword">this</span>.getUTCDate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> now.toUTCString();
    }
  }
  
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(!_instance) {
      _instance = <span class="hljs-keyword">new</span> init();
    }
    <span class="hljs-keyword">return</span> _instance;
  }
})()</code></pre>
<p>上面的<code>timeTool</code>实际上是一个函数，<code>_instance</code>作为实例对象最开始赋值为<code>null</code>，<code>init</code>函数是其构造函数，用于实例化对象，立即执行函数返回的是匿名函数用于判断实例是否创建，只有当调用<code>timeTool()</code>时进行实例的实例化，这就是惰性单例的应用，不在js加载时就进行实例化创建， 而是在需要的时候再进行单例的创建。 如果再次调用， 那么返回的永远是第一次实例化后的实例对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let instance1 = timeTool();
let instance2 = timeTool();
console.log(instance1 === instance2); //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> instance1 = timeTool();
<span class="hljs-keyword">let</span> instance2 = timeTool();
<span class="hljs-built_in">console</span>.log(instance1 === instance2); <span class="hljs-comment">//true</span></code></pre>
<h2 id="articleHeader3">2. 单例模式的应用场景</h2>
<h3 id="articleHeader4">2.1 命名空间</h3>
<p>一个项目常常不只一个程序员进行开发和维护, 然后一个程序员很难去弄清楚另一个程序员暴露在的项目中的全局变量和方法。如果将变量和方法都暴露在全局中, 变量冲突是在所难免的。就想下面的故事一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//开发者A写了一大段js代码
function addNumber () {}


//开发者B开始写js代码
var addNumber = '';

//A重新维护该js代码
addNumber(); //Uncaught TypeError: addNumber is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//开发者A写了一大段js代码</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addNumber</span> (<span class="hljs-params"></span>) </span>{}


<span class="hljs-comment">//开发者B开始写js代码</span>
<span class="hljs-keyword">var</span> addNumber = <span class="hljs-string">''</span>;

<span class="hljs-comment">//A重新维护该js代码</span>
addNumber(); <span class="hljs-comment">//Uncaught TypeError: addNumber is not a function</span></code></pre>
<p>命名空间就是用来解决全局变量冲突的问题，我们完全可以只暴露一个对象名，将变量作为该对象的属性，将方法作为该对象的方法，这样就能大大减少全局变量的个数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//开发者A写了一大段js代码
let devA = {
  addNumber() { }
}

//开发者B开始写js代码
let devB = {
  add: ''
}

//A重新维护该js代码
devA.addNumber();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//开发者A写了一大段js代码</span>
<span class="hljs-keyword">let</span> devA = {
  addNumber() { }
}

<span class="hljs-comment">//开发者B开始写js代码</span>
<span class="hljs-keyword">let</span> devB = {
  <span class="hljs-attr">add</span>: <span class="hljs-string">''</span>
}

<span class="hljs-comment">//A重新维护该js代码</span>
devA.addNumber();</code></pre>
<p>上面代码中，<code>devA</code>和<code>devB</code>就是两个命名空间，采用命名空间可以有效减少全局变量的数量，以此解决变量冲突的发生。</p>
<h3 id="articleHeader5">2.2 管理模块</h3>
<p>上面说到的<code>timeTool</code>对象是一个只用来处理时间的工具库，但是实际开发过程中的库可能会有多种多样的功能，例如处理ajax请求,操作dom或者处理事件。这个时候单例模式还可以用来管理代码库中的各个模块，例如下面的代码所示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var devA = (function(){
  //ajax模块
  var ajax = {
    get: function(api, obj) {console.log('ajax get调用')},
    post: function(api, obj) {}
  }

  //dom模块
  var dom = {
    get: function() {},
    create: function() {}
  }
  
  //event模块
  var event = {
    add: function() {},
    remove: function() {}
  }

  return {
    ajax: ajax,
    dom: dom,
    event: event
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> devA = (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-comment">//ajax模块</span>
  <span class="hljs-keyword">var</span> ajax = {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(api, obj)</span> </span>{console.log(<span class="hljs-string">'ajax get调用'</span>)},
    post: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(api, obj)</span> </span>{}
  }

  <span class="hljs-comment">//dom模块</span>
  <span class="hljs-keyword">var</span> dom = {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{},
    create: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{}
  }
  
  <span class="hljs-comment">//event模块</span>
  <span class="hljs-keyword">var</span> event = {
    add: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{},
    remove: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{}
  }

  <span class="hljs-keyword">return</span> {
    ajax: ajax,
    dom: dom,
    event: event
  }
})()</code></pre>
<p>上面的代码库中有<code>ajax</code>,<code>dom</code>和<code>event</code>三个模块，用同一个命名空间<code>devA</code>来管理。在进行相应操作的时候，只需要<code>devA.ajax.get()</code>进行调用即可。这样可以让库的功能更加清晰。</p>
<h2 id="articleHeader6">3. ES6中的单例模式</h2>
<h3 id="articleHeader7">3.1 ES6创建对象</h3>
<p>ES6中创建对象时引入了<code>class</code>和<code>constructor</code>用来创建对象。下面我们来使用ES6的语法实例化苹果公司</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Apple {
  constructor(name, creator, products) {
    this.name = name;
    this.creator = creator;
    this.products = products;
  }
}

let appleCompany = new Apple('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
let copyApple = new Apple('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod']);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Apple</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, creator, products) {
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.creator = creator;
    <span class="hljs-keyword">this</span>.products = products;
  }
}

<span class="hljs-keyword">let</span> appleCompany = <span class="hljs-keyword">new</span> Apple(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'乔布斯'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>]);
<span class="hljs-keyword">let</span> copyApple = <span class="hljs-keyword">new</span> Apple(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'阿辉'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>]);</code></pre>
<h3 id="articleHeader8">3.2 ES6中创建单例模式</h3>
<p>苹果这么伟大的公司明显有且只有一个, 就是乔爷爷创建的那个, 哪能容别人进行复制？所以<code>appleCompany</code>应该是一个单例, 现在我们使用ES6的语法将<code>constructor</code>改写为单例模式的构造器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SingletonApple {
  constructor(name, creator, products) {
    //首次使用构造器实例
    if (!SingletonApple.instance) {
      this.name = name;
      this.creator = creator;
      this.products = products;
      //将this挂载到SingletonApple这个类的instance属性上
      SingletonApple.instance = this;
    }
    return SingletonApple.instance;
  }
}

let appleCompany = new SingletonApple('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
let copyApple = new SingletonApple('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod']);

console.log(appleCompany === copyApple);  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SingletonApple</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, creator, products) {
    <span class="hljs-comment">//首次使用构造器实例</span>
    <span class="hljs-keyword">if</span> (!SingletonApple.instance) {
      <span class="hljs-keyword">this</span>.name = name;
      <span class="hljs-keyword">this</span>.creator = creator;
      <span class="hljs-keyword">this</span>.products = products;
      <span class="hljs-comment">//将this挂载到SingletonApple这个类的instance属性上</span>
      SingletonApple.instance = <span class="hljs-keyword">this</span>;
    }
    <span class="hljs-keyword">return</span> SingletonApple.instance;
  }
}

<span class="hljs-keyword">let</span> appleCompany = <span class="hljs-keyword">new</span> SingletonApple(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'乔布斯'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>]);
<span class="hljs-keyword">let</span> copyApple = <span class="hljs-keyword">new</span> SingletonApple(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'阿辉'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>]);

<span class="hljs-built_in">console</span>.log(appleCompany === copyApple);  <span class="hljs-comment">//true</span></code></pre>
<h3 id="articleHeader9">3.3 ES6的静态方法优化代码</h3>
<p>ES6中提供了为<code>class</code>提供了<code>static</code>关键字定义静态方法， 我们可以将<code>constructor</code>中判断是否实例化的逻辑放入一个静态方法<code>getInstance</code>中，调用该静态方法获取实例， <code>constructor</code>中只包需含实例化所需的代码，这样能增强代码的可读性、结构更加优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SingletonApple {
  constructor(name, creator, products) {
      this.name = name;
      this.creator = creator;
      this.products = products;
  }
  //静态方法
  static getInstance(name, creator, products) {
    if(!this.instance) {
      this.instance = new SingletonApple(name, creator, products);
    }
    return this.instance;
  }
}

let appleCompany = SingletonApple.getInstance('苹果公司', '乔布斯', ['iPhone', 'iMac', 'iPad', 'iPod']);
let copyApple = SingletonApple.getInstance('苹果公司', '阿辉', ['iPhone', 'iMac', 'iPad', 'iPod'])

console.log(appleCompany === copyApple); //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SingletonApple</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, creator, products) {
      <span class="hljs-keyword">this</span>.name = name;
      <span class="hljs-keyword">this</span>.creator = creator;
      <span class="hljs-keyword">this</span>.products = products;
  }
  <span class="hljs-comment">//静态方法</span>
  <span class="hljs-keyword">static</span> getInstance(name, creator, products) {
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.instance) {
      <span class="hljs-keyword">this</span>.instance = <span class="hljs-keyword">new</span> SingletonApple(name, creator, products);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.instance;
  }
}

<span class="hljs-keyword">let</span> appleCompany = SingletonApple.getInstance(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'乔布斯'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>]);
<span class="hljs-keyword">let</span> copyApple = SingletonApple.getInstance(<span class="hljs-string">'苹果公司'</span>, <span class="hljs-string">'阿辉'</span>, [<span class="hljs-string">'iPhone'</span>, <span class="hljs-string">'iMac'</span>, <span class="hljs-string">'iPad'</span>, <span class="hljs-string">'iPod'</span>])

<span class="hljs-built_in">console</span>.log(appleCompany === copyApple); <span class="hljs-comment">//true</span></code></pre>
<h2 id="articleHeader10">4. 单例模式的项目实战应用</h2>
<h3 id="articleHeader11">4.1 实现登陆弹框</h3>
<p>登陆弹框在项目中是一个比较经典的单例模式，因为对于大部分网站不需要用户必须登陆才能浏览，所以登陆操作的弹框可以在用户点击登陆按钮后再进行创建。而且登陆框永远只有一个，不会出现多个登陆弹框的情况，也就意味着再次点击登陆按钮后返回的永远是一个登录框的实例。</p>
<p>现在来梳理一下我登陆弹框的流程，在来进行代码的实现：</p>
<ol>
<li>给顶部导航模块的登陆按钮注册点击事件</li>
<li>登陆按钮点击后JS动态创建遮罩层和登陆弹框</li>
<li>遮罩层和登陆弹框插入到页面中</li>
<li>给登陆框中的关闭按钮注册事件, 用于关闭遮罩层和弹框</li>
<li>给登陆框中的输入框添加校验(此步骤略)</li>
<li>给登陆框中的确定按钮添加事件,用于Ajax请求(此步骤略)</li>
<li>给登陆框中的清空按钮添加事件，用于清空输入框（此步骤略）</li>
</ol>
<p>因为5，6是登陆框的实际项目逻辑， 和单例模式关系不大。下面的项目实战代码只实现1 - 4步，其余步骤读者可自行进行扩展练习。完整的代码可在 <a href="https://codepen.io/LITANGHUI/project/editor/Axbnbb" rel="nofollow noreferrer" target="_blank">CodePen</a><button class="btn btn-xs btn-default ml10 preview" data-url="LITANGHUI/project/editor/Axbnbb" data-typeid="3">点击预览</button>中进行查看。</p>
<h4>4.1.1 给页面添加顶部导航栏的HTML代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <nav class=&quot;top-bar&quot;>
    <div class=&quot;top-bar_left&quot;>
      LTH BLOG
    </div>
    <div class=&quot;top-bar_right&quot;>
      <div class=&quot;login-btn&quot;>登陆</div>
      <div class=&quot;signin-btn&quot;>注册</div>
    </div>
  </nav>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML">  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top-bar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top-bar_left"</span>&gt;</span>
      LTH BLOG
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"top-bar_right"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login-btn"</span>&gt;</span>登陆<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"signin-btn"</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span></code></pre>
<h4>4.1.2 使用ES6的语法创建Login类</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Login {

  //构造器
  constructor() {
    this.init();
  }

  //初始化方法
  init() {
    //新建div
    let mask = document.createElement('div');
    //添加样式
    mask.classList.add('mask-layer');
    //添加模板字符串
    mask.innerHTML = 
    `
    <div class=&quot;login-wrapper&quot;>
      <div class=&quot;login-title&quot;>
        <div class=&quot;title-text&quot;>登录框</div>
        <div class=&quot;close-btn&quot;>×</div>
      </div>
      <div class=&quot;username-input user-input&quot;>
        <span class=&quot;login-text&quot;>用户名:</span>
        <input type=&quot;text&quot;>
      </div>
      <div class=&quot;pwd-input user-input&quot;>
        <span class=&quot;login-text&quot;>密码:</span>
        <input type=&quot;password&quot;>
      </div>
      <div class=&quot;btn-wrapper&quot;>
        <button class=&quot;confrim-btn&quot;>确定</button>
        <button class=&quot;clear-btn&quot;>清空</button>
      </div>
    </div>
    `;
    //插入元素
    document.body.insertBefore(mask, document.body.childNodes[0]);

    //注册关闭登录框事件
    Login.addCloseLoginEvent();
  }

  //静态方法: 获取元素
  static getLoginDom(cls) {
    return  document.querySelector(cls);
  }

  //静态方法: 注册关闭登录框事件
  static addCloseLoginEvent() {
    this.getLoginDom('.close-btn').addEventListener('click', () => {
      //给遮罩层添加style, 用于隐藏遮罩层
      this.getLoginDom('.mask-layer').style = &quot;display: none&quot;;
    })
  }

  //静态方法: 获取实例(单例)
  static getInstance() {
    if(!this.instance) {
      this.instance = new Login();
    } else {
      //移除遮罩层style, 用于显示遮罩层
      this.getLoginDom('.mask-layer').removeAttribute('style');
    }
    return this.instance;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> </span>{

  <span class="hljs-comment">//构造器</span>
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.init();
  }

  <span class="hljs-comment">//初始化方法</span>
  init() {
    <span class="hljs-comment">//新建div</span>
    <span class="hljs-keyword">let</span> mask = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    <span class="hljs-comment">//添加样式</span>
    mask.classList.add(<span class="hljs-string">'mask-layer'</span>);
    <span class="hljs-comment">//添加模板字符串</span>
    mask.innerHTML = 
    <span class="hljs-string">`
    &lt;div class="login-wrapper"&gt;
      &lt;div class="login-title"&gt;
        &lt;div class="title-text"&gt;登录框&lt;/div&gt;
        &lt;div class="close-btn"&gt;×&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="username-input user-input"&gt;
        &lt;span class="login-text"&gt;用户名:&lt;/span&gt;
        &lt;input type="text"&gt;
      &lt;/div&gt;
      &lt;div class="pwd-input user-input"&gt;
        &lt;span class="login-text"&gt;密码:&lt;/span&gt;
        &lt;input type="password"&gt;
      &lt;/div&gt;
      &lt;div class="btn-wrapper"&gt;
        &lt;button class="confrim-btn"&gt;确定&lt;/button&gt;
        &lt;button class="clear-btn"&gt;清空&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    `</span>;
    <span class="hljs-comment">//插入元素</span>
    <span class="hljs-built_in">document</span>.body.insertBefore(mask, <span class="hljs-built_in">document</span>.body.childNodes[<span class="hljs-number">0</span>]);

    <span class="hljs-comment">//注册关闭登录框事件</span>
    Login.addCloseLoginEvent();
  }

  <span class="hljs-comment">//静态方法: 获取元素</span>
  <span class="hljs-keyword">static</span> getLoginDom(cls) {
    <span class="hljs-keyword">return</span>  <span class="hljs-built_in">document</span>.querySelector(cls);
  }

  <span class="hljs-comment">//静态方法: 注册关闭登录框事件</span>
  <span class="hljs-keyword">static</span> addCloseLoginEvent() {
    <span class="hljs-keyword">this</span>.getLoginDom(<span class="hljs-string">'.close-btn'</span>).addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
      <span class="hljs-comment">//给遮罩层添加style, 用于隐藏遮罩层</span>
      <span class="hljs-keyword">this</span>.getLoginDom(<span class="hljs-string">'.mask-layer'</span>).style = <span class="hljs-string">"display: none"</span>;
    })
  }

  <span class="hljs-comment">//静态方法: 获取实例(单例)</span>
  <span class="hljs-keyword">static</span> getInstance() {
    <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.instance) {
      <span class="hljs-keyword">this</span>.instance = <span class="hljs-keyword">new</span> Login();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//移除遮罩层style, 用于显示遮罩层</span>
      <span class="hljs-keyword">this</span>.getLoginDom(<span class="hljs-string">'.mask-layer'</span>).removeAttribute(<span class="hljs-string">'style'</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.instance;
  }
}</code></pre>
<h4>4.1.3 给登陆按钮添加注册点击事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注册点击事件
Login.getLoginDom('.login-btn').addEventListener('click', () => {
  Login.getInstance();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//注册点击事件</span>
Login.getLoginDom(<span class="hljs-string">'.login-btn'</span>).addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
  Login.getInstance();
})</code></pre>
<h4>4.1.4 效果演示</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013864949" src="https://static.alili.tech/img/remote/1460000013864949" alt="单例效果展示.gif-36.8kB" title="单例效果展示.gif-36.8kB" style="cursor: pointer; display: inline;"></span></p>
<blockquote>完整的项目代码见: <a href="https://codepen.io/LITANGHUI/project/editor/Axbnbb" rel="nofollow noreferrer" target="_blank">CodePen(单例模式案例——登录框)</a><button class="btn btn-xs btn-default ml10 preview" data-url="LITANGHUI/project/editor/Axbnbb" data-typeid="3">点击预览</button>
</blockquote>
<p>上面的登陆框的实现中，我们只创建了一个<code>Login</code>的类, 但是却实现了一个并不简单的登陆功能。在第一次点击登陆按钮的时候，我们调用<code>Login.getInstance()</code>实例化了一个登陆框，且在之后的点击中，并没有重新创建新的登陆框，只是移除掉了<code>"display: none"</code>这个样式来显示登陆框，节省了内存开销。</p>
<h2 id="articleHeader12">总结</h2>
<p>单例模式虽然简单，但是在项目中的应用场景却是相当多的，单例模式的核心是<strong>确保只有一个实例， 并提供全局访问。</strong>就像我们只需要一个浏览器的<code>window</code>对象, jQuery的<code>$</code>对象而不再需要第二个。 由于JavaScript代码书写方式十分灵活, 这也导致了如果没有严格的规范的情况下，大型的项目中JavaScript不利于多人协同开发， 使用单例模式进行命名空间，管理模块是一个很好的开发习惯，能够有效的解决协同开发变量冲突的问题。灵活使用单例模式，也能够减少不必要的内存开销，提高用于体验。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式(一): 单例模式

## 原文链接
[https://segmentfault.com/a/1190000013864944](https://segmentfault.com/a/1190000013864944)


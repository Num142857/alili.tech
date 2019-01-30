---
title: '聊一聊ES6中class的使用' 
date: 2019-01-31 2:31:16
hidden: true
slug: gjfc6xx5jfl
categories: [reprint]
---

{{< raw >}}

                    
<p>javascript传统做法是当生成一个对象实例，需要定义构造函数，然后通过new的方式完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function StdInfo(){
    this.name = &quot;job&quot;;            
    this.age = 30;            
}

StdInfo.prototype.getNames = function (){
    console.log(&quot;name：&quot;+this.name);               
}
//得到一个学员信息对象
var p = new StdInfo()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">StdInfo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"job"</span>;            
    <span class="hljs-keyword">this</span>.age = <span class="hljs-number">30</span>;            
}

StdInfo.prototype.getNames = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"name："</span>+<span class="hljs-keyword">this</span>.name);               
}
<span class="hljs-comment">//得到一个学员信息对象</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> StdInfo()</code></pre>
<p>javacript中只有对象，没有类。它是是基于原型的语言，原型对象是新对象的模板，它将自身的属性共享给新对象。这样的写法和传统面向对象语言差异很大，很容易让新手感到困惑。</p>
<h2 id="articleHeader0">定义类</h2>
<p>到了ES6添加了类，作为对象的模板。通过<strong>class</strong>来定义一个类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类
class StdInfo {
    constructor(){
       this.name = &quot;job&quot;;            
       this.age = 30;      
    }
    //定义在类中的方法不需要添加function
    getNames(){
       console.log(&quot;name：&quot;+this.name);      
    }
}
//使用new的方式得到一个实例对象
var p = new StdInfo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
       <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"job"</span>;            
       <span class="hljs-keyword">this</span>.age = <span class="hljs-number">30</span>;      
    }
    <span class="hljs-comment">//定义在类中的方法不需要添加function</span>
    getNames(){
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"name："</span>+<span class="hljs-keyword">this</span>.name);      
    }
}
<span class="hljs-comment">//使用new的方式得到一个实例对象</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> StdInfo();</code></pre>
<p>上面的写法更加清晰、更像面向对象编程的语法，看起来也更容易理解。</p>
<p>定义的类只是语法糖，目的是让我们用更简洁明了的语法创建对象及处理相关的继承。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类
class StdInfo {
    //...
}
console.log(typeof  StdInfo);  //function

console.log(StdInfo === StdInfo.prototype.constructor);  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span> </span>{
    <span class="hljs-comment">//...</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span>  StdInfo);  <span class="hljs-comment">//function</span>

<span class="hljs-built_in">console</span>.log(StdInfo === StdInfo.prototype.constructor);  <span class="hljs-comment">//true</span></code></pre>
<p>从上面的测试中可以看出来，类的类型就是一个函数，是一个“特殊函数”，指向的是构造函数。</p>
<p>函数的定义方式有函数声明和函数表达式两种，类的定义方式也有两种，分别是：<strong>类声明</strong>和<strong>类表达式</strong>。</p>
<h3 id="articleHeader1">类声明</h3>
<p>类声明是定义类的一种方式，使用关键字<strong>class</strong>，后面跟上类名，然后就是一对大括号。把这一类需要定义的方法放在大括号中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类，可以省略constructor
class StdInfo {
    getNames(){
        console.log(&quot;name：&quot;+this.name);
    }
}
// -------------------------------------
//定义类，加上constructor
class StdInfo {
    //使用new定义实例对象时，自动调用这个函数，传入参数
    constructor(name,age){
       this.name = name;            
       this.age = age;      
    }
    
    getNames(){
       console.log(&quot;name：&quot;+this.name);      
    }
}
//定义实例对象时，传入参数
var p = new StdInfo(&quot;job&quot;,30)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//定义类，可以省略constructor</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span> </span>{
    getNames(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"name："</span>+<span class="hljs-keyword">this</span>.name);
    }
}
<span class="hljs-comment">// -------------------------------------</span>
<span class="hljs-comment">//定义类，加上constructor</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span> </span>{
    <span class="hljs-comment">//使用new定义实例对象时，自动调用这个函数，传入参数</span>
    <span class="hljs-keyword">constructor</span>(name,age){
       <span class="hljs-keyword">this</span>.name = name;            
       <span class="hljs-keyword">this</span>.age = age;      
    }
    
    getNames(){
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"name："</span>+<span class="hljs-keyword">this</span>.name);      
    }
}
<span class="hljs-comment">//定义实例对象时，传入参数</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> StdInfo(<span class="hljs-string">"job"</span>,<span class="hljs-number">30</span>)
</code></pre>
<p><strong>constructor</strong>是一个默认方法，使用<strong>new</strong>来定义实例对象时，自动执行<strong>constructor</strong>函数，传入所需要的参数,执行完<strong>constructor</strong>后自动返回实例对象。</p>
<p>一个类中只能有一个<strong>constructor</strong>函数，定义多个会报错。</p>
<p><strong>constructor</strong>中的this指向新创建的实例对象，利用this往新创建的实例对象扩展属性。</p>
<p>在定义实例对象时，不需要在初始化阶段做一些事，可以不用显示的写<strong>constructor</strong>函数。如果没有显式定义，一个空的constructor方法会被默认添加，<em>constructor(){}</em></p>
<h3 id="articleHeader2">类表达式</h3>
<p>类表达式是定义类的另一种形式，类似于函数表达式，把一个函数作为值赋给变量。可以把定义的类赋值给一个变量，这时候变量就为类名。<strong>class</strong>关键字之后的类名可有可无，如果存在，则只能在类内部使用。</p>
<p>定义类 class后面有类名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const People = class StdInfo {
    constructor(){
        console.log(StdInfo);  //可以打印出值，是一个函数
    }
}

new People();
new StdInfo();  //报错，StdInfo is not defined；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">const</span> People = <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span> </span>{
    <span class="hljs-keyword">constructor</span>(){
        <span class="hljs-built_in">console</span>.log(StdInfo);  <span class="hljs-comment">//可以打印出值，是一个函数</span>
    }
}

<span class="hljs-keyword">new</span> People();
<span class="hljs-keyword">new</span> StdInfo();  <span class="hljs-comment">//报错，StdInfo is not defined；</span></code></pre>
<p>定义类 class后面没有类名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const People = class {
    constructor(){

    }
}

new People();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> People = <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
    <span class="hljs-keyword">constructor</span>(){

    }
}

<span class="hljs-keyword">new</span> People();</code></pre>
<p>立即执行的类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p = new class {
    constructor(name,age){
        console.log(name,age);
    }
}(&quot;job&quot;,30)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-class"><span class="hljs-keyword">class</span> </span>{
    <span class="hljs-keyword">constructor</span>(name,age){
        <span class="hljs-built_in">console</span>.log(name,age);
    }
}(<span class="hljs-string">"job"</span>,<span class="hljs-number">30</span>)</code></pre>
<p>立即执行的类，在类前要加上<strong>new</strong>。<strong>p</strong>为类的实例对象。</p>
<h3 id="articleHeader3">不存在变量提升</h3>
<p>定义类不存在变量提升，只能先定义类后使用，跟函数声明有区别的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//-----函数声明-------
//定义前可以先使用，因为函数声明提升的缘故，调用合法。
func();
function func(){}

//-----定义类---------------
new StdInfo();  //报错，StdInfo is not defined
class StdInfo{}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//-----函数声明-------</span>
<span class="hljs-comment">//定义前可以先使用，因为函数声明提升的缘故，调用合法。</span>
func();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{}

<span class="hljs-comment">//-----定义类---------------</span>
<span class="hljs-keyword">new</span> StdInfo();  <span class="hljs-comment">//报错，StdInfo is not defined</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StdInfo</span></span>{}</code></pre>
<h2 id="articleHeader4">extends继承</h2>
<p>使用<strong>extends</strong>关键字实现类之间的继承。这比在ES5中使用继承要方便很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类父类
class Parent {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    speakSometing(){
        console.log(&quot;I can speek chinese&quot;);
    }
}
//定义子类，继承父类
class Child extends Parent {
    coding(){
        console.log(&quot;coding javascript&quot;);
    }
}

var c = new Child();

//可以调用父类的方法
c.speakSometing(); // I can speek chinese" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="javasript"><span class="hljs-comment">//定义类父类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    constructor(name,age){
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }

    speakSometing(){
        console.log(<span class="hljs-string">"I can speek chinese"</span>);
    }
}
<span class="hljs-comment">//定义子类，继承父类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent</span> </span>{
    coding(){
        console.log(<span class="hljs-string">"coding javascript"</span>);
    }
}

<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> <span class="hljs-type">Child</span>();

<span class="hljs-comment">//可以调用父类的方法</span>
c.speakSometing(); <span class="hljs-comment">// I can speek chinese</span></code></pre>
<p>使用继承的方式，子类就拥有了父类的方法。</p>
<p>如果子类中有<strong>constructor</strong>构造函数，则必须使用调用<strong>super</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类父类
class Parent {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    speakSometing(){
        console.log(&quot;I can speek chinese&quot;);
    }
}
//定义子类，继承父类
class Child extends Parent {
    constructor(name,age){
        //不调super()，则会报错  this is not defined

        //必须调用super
        super(name,age);
    }

    coding(){
        console.log(&quot;coding javascript&quot;);
    }
}

var c = new Child(&quot;job&quot;,30);

//可以调用父类的方法
c.speakSometing(); // I can speek chinese" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义类父类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>(name,age){
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }

    speakSometing(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I can speek chinese"</span>);
    }
}
<span class="hljs-comment">//定义子类，继承父类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Parent</span> </span>{
    <span class="hljs-keyword">constructor</span>(name,age){
        <span class="hljs-comment">//不调super()，则会报错  this is not defined</span>

        <span class="hljs-comment">//必须调用super</span>
        <span class="hljs-keyword">super</span>(name,age);
    }

    coding(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"coding javascript"</span>);
    }
}

<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> Child(<span class="hljs-string">"job"</span>,<span class="hljs-number">30</span>);

<span class="hljs-comment">//可以调用父类的方法</span>
c.speakSometing(); <span class="hljs-comment">// I can speek chinese</span></code></pre>
<p>子类必须在constructor方法中调用super方法，否则新建实例时会报错(<em>this is not defined</em>)。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。</p>
<p>以上是对ES6中类的简单总结学习，欢迎一起讨论。</p>
<p>参考：<br><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes</a></p>
<p><a href="http://es6.ruanyifeng.com/#docs/class" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/class</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
聊一聊ES6中class的使用

## 原文链接
[https://segmentfault.com/a/1190000007537173](https://segmentfault.com/a/1190000007537173)


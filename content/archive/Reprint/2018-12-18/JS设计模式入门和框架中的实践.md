---
title: 'JS设计模式入门和框架中的实践' 
date: 2018-12-18 2:30:10
hidden: true
slug: icx3q8d4ro
categories: [reprint]
---

{{< raw >}}

                    
<p>本文为<a href="https://jirengu.com" rel="nofollow noreferrer" target="_blank">饥人谷讲师slashhuang</a>原创文章</p>
<p>在编写JS代码的过程中，运用一定的设计模式可以让我们的代码更加优雅、灵活。</p>
<p>下面笔者就结合诸如redux的subscribe、ES6的class、vue里面的$dispatch、jquery里面的on/off来给大家简单介绍下设计模式在这些库、语法和框架中的使用。</p>
<h2 id="articleHeader0">设计模式解决的问题</h2>
<blockquote>设计模式并不是很玄乎的知识，很多同学在编写JS代码的时候已经在不经意间用了不少设计模式了。<p>笔者认为把设计模式单独抽象出来探讨，就和算法中抽象出来冒泡、排序一样，是为了描述一种常用的JS pattern。</p>
<p>通过研习这类pattern，让模式来指导我们的代码结构及JS算法。</p>
</blockquote>
<h2 id="articleHeader1">一些常用的设计模式概述</h2>
<p><strong>1、observer [观察者模式]</strong></p>
<p>根据状态的变化主动触发观察者队列、hashMap的回调行为</p>
<p>一个简单的观察者模式代码实践</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class StateTracker{
        constructor(){
            this.observers = [];
            this.internalState= 10;
        }
        // 改变内部状态，触发状态的观察者列表
        change(val){
            this.internalState= val;
            this.observers.forEach(observer=>observer(val));
        }// 注册观察者
        registerObserver(ObserverFn){
            this.obserers.push(ObserverFn)
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StateTracker</span></span>{
        <span class="hljs-keyword">constructor</span>(){
            <span class="hljs-keyword">this</span>.observers = [];
            <span class="hljs-keyword">this</span>.internalState= <span class="hljs-number">10</span>;
        }
        <span class="hljs-comment">// 改变内部状态，触发状态的观察者列表</span>
        change(<span class="hljs-keyword">val</span>){
            <span class="hljs-keyword">this</span>.internalState= <span class="hljs-keyword">val</span>;
            <span class="hljs-keyword">this</span>.observers.forEach(observer=&gt;observer(<span class="hljs-keyword">val</span>));
        }<span class="hljs-comment">// 注册观察者</span>
        registerObserver(ObserverFn){
            <span class="hljs-keyword">this</span>.obserers.push(ObserverFn)
        }
    }</code></pre>
<p><strong>2、publish/subscribe [订阅发布模式]</strong></p>
<blockquote>在代码模块的共享访问空间存储hashMap的topic/callback形式。<p>添加on/off/trigger等接口实现挂载、移除、触发等动作。</p>
<p>一个简单的订阅发布模式代码实践</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class PubSubHandler{
        constructor(){
            this.eventPool = {};
        }
        //移除
        off(topicName){
            delete this.observers[topicName]
        }
        //发布
        trigger(topicName,...args){
            this.eventPool[topicName] &amp;&amp; 
            this.eventPool[topicName].forEach(callback=>callback(...args));
        }
        //订阅
        on(topicName,callback){
            let topic = this.eventPool[topicName] ;
            if(!topic){
                this.eventPool[topicName] =[]
            }
            this.eventPool[topicName].push(callback)
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PubSubHandler</span></span>{
        <span class="hljs-keyword">constructor</span>(){
            <span class="hljs-keyword">this</span>.eventPool = {};
        }
        <span class="hljs-comment">//移除</span>
        off(topicName){
            delete <span class="hljs-keyword">this</span>.observers[topicName]
        }
        <span class="hljs-comment">//发布</span>
        trigger(topicName,...args){
            <span class="hljs-keyword">this</span>.eventPool[topicName] &amp;&amp; 
            <span class="hljs-keyword">this</span>.eventPool[topicName].forEach(callback=&gt;callback(...args));
        }
        <span class="hljs-comment">//订阅</span>
        on(topicName,callback){
            let topic = <span class="hljs-keyword">this</span>.eventPool[topicName] ;
            <span class="hljs-keyword">if</span>(!topic){
                <span class="hljs-keyword">this</span>.eventPool[topicName] =[]
            }
            <span class="hljs-keyword">this</span>.eventPool[topicName].push(callback)
        }
    }</code></pre>
<p><strong>3、singleton[单例模式]</strong></p>
<blockquote>构造函数的实例只有一个，一般是通过闭包存储内部实例，通过接口访问内部实例。<p>一个简单的单例模式代码实践</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var singleton = ()=>{
        var instance;
        var createInstance = ()=>{
            this.a = 1;
            this.b = 2;
        }// 单例模式方法入口
        return {
            getInstance:()=>{
                if(!instance){
                    instance = createInstance();
                }
                return instance;
            }
        }
    }
    var test = singleton();
    test.getInstance() == test.getInstance() //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> singleton = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">var</span> instance;
        <span class="hljs-keyword">var</span> createInstance = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1</span>;
            <span class="hljs-keyword">this</span>.b = <span class="hljs-number">2</span>;
        }<span class="hljs-comment">// 单例模式方法入口</span>
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">getInstance</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-keyword">if</span>(!instance){
                    instance = createInstance();
                }
                <span class="hljs-keyword">return</span> instance;
            }
        }
    }
    <span class="hljs-keyword">var</span> test = singleton();
    test.getInstance() == test.getInstance() <span class="hljs-comment">//true</span></code></pre>
<p><strong>4、decorator装饰者模式</strong></p>
<blockquote>这个模式就是在原有的对象上面装饰更多行为，并且保持变量名不变。<p>用过ES7的@decorator或者python等语言的，应该对decorator不陌生的。</p>
<p>一个简单的装饰者模式代码实践</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function decorator(sourceObj,decortorFn){
        decortorFn(sourceObj);
        return sourceObj
    }
    var d = {a:1};
    // d变为了{a:1,b:1}
    d = decorator(d,(d)=>{d.b=1});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decorator</span><span class="hljs-params">(sourceObj,decortorFn)</span></span>{
        decortorFn(sourceObj);
        <span class="hljs-keyword">return</span> sourceObj
    }
    <span class="hljs-keyword">var</span> d = {a:<span class="hljs-number">1</span>};
    <span class="hljs-comment">// d变为了{a:1,b:1}</span>
    d = decorator(d,(d)=&gt;{d.b=<span class="hljs-number">1</span>});</code></pre>
<p><strong>5、mixin混合模式</strong></p>
<blockquote>这个模式和decorator有点类似，只是它的功能更加垂直。<p>就是在原有的对象上面增加、覆盖对象的行为。</p>
<p>相比于extends、Object.assign等方法，mixin模式更富有表现力。</p>
<p>mixin模式不能一概而论，可能依据不同的数据类型有不同的mixin策略，比如vue.mixin</p>
<p>一个简单的混合模式代码实践</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    class StateTracker{
        constructor(){
            this.raw = {
                a:1,
                b:2
            }
        }// 混合模式方法入口
        mixin(obj){
            Object.assign(this.raw,obj)
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    class StateTracker{
        constructor(){
            this<span class="hljs-selector-class">.raw</span> = {
                <span class="hljs-selector-tag">a</span>:<span class="hljs-number">1</span>,
                <span class="hljs-selector-tag">b</span>:<span class="hljs-number">2</span>
            }
        }<span class="hljs-comment">// 混合模式方法入口</span>
        mixin(obj){
            Object.assign(this<span class="hljs-selector-class">.raw</span>,obj)
        }
    }</code></pre>
<blockquote>笔者暂时先介绍这么多设计模式。<p>下面就针对常用的框架、语法、库等来说明这些设计模式的应用。</p>
</blockquote>
<h2 id="articleHeader2">observer模式在redux中的使用示例代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var store = createStore(reducer,initialState);
    //注册redux store，存储在 nextListeners数组
    var test = store.subscribe(()=>{console.log('我注册了！')});
    // 取消注册监听
    test.unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> store = createStore(reducer,initialState);
    <span class="hljs-comment">//注册redux store，存储在 nextListeners数组</span>
    <span class="hljs-keyword">var</span> test = store.subscribe(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我注册了！'</span>)});
    <span class="hljs-comment">// 取消注册监听</span>
    test.unsubscribe();</code></pre>
<h2 id="articleHeader3">publish/subscribe在jquery中的使用示例代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(document).on('hello',()=>{console.log('hello')})
    $(document).trigger('hello');
    $(document).off('hello')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    $(<span class="hljs-built_in">document</span>).<span class="hljs-literal">on</span>(<span class="hljs-string">'hello'</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>)})
    $(<span class="hljs-built_in">document</span>).trigger(<span class="hljs-string">'hello'</span>);
    $(<span class="hljs-built_in">document</span>).<span class="hljs-literal">off</span>(<span class="hljs-string">'hello'</span>)</code></pre>
<h2 id="articleHeader4">decorator模式在react-redux中的实践</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //装饰器
    @connect(state=>state)
    class Container extends Component{
        render(){
            return JSON.stringify(this.props)   
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>    <span class="hljs-comment">//装饰器</span>
    <span class="hljs-meta">@connect</span>(state=&gt;state)
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
        render(){
            <span class="hljs-keyword">return</span> <span class="hljs-type">JSON</span>.stringify(<span class="hljs-keyword">this</span>.props)   
        }
    }</code></pre>
<h2 id="articleHeader5">总结</h2>
<blockquote>关于设计模式在前端框架或库的实践，我这边写的是比较简略的， 可能没有写过相关代码的同学不是特别好理解，有相关疑问的同学可以在文末直接提问。<p>希望本文能够对大家学习和了解设计模式的概念有所了解</p>
<p>本文首发于笔者的<a href="https://github.com/slashhuang/blog/blob/master/essays/design-patterns.md" rel="nofollow noreferrer" target="_blank">github blog</a></p>
<p><a href="https://github.com/slashhuang/design-patterns-tutorial" rel="nofollow noreferrer" target="_blank">github设计模式教程代码地址</a></p>
</blockquote>
<p>加微信号: astak10或者长按识别下方二维码进入前端技术交流群 ，暗号：写代码啦</p>
<p>每日一题，每周资源推荐，精彩博客推荐，工作、笔试、面试经验交流解答，免费直播课，群友轻分享... ，数不尽的福利免费送</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012605904?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000012605904?w=200&amp;h=200" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS设计模式入门和框架中的实践

## 原文链接
[https://segmentfault.com/a/1190000012814591](https://segmentfault.com/a/1190000012814591)


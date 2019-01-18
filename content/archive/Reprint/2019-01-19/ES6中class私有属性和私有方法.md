---
title: 'ES6中class私有属性和私有方法' 
date: 2019-01-19 2:30:10
hidden: true
slug: 09vt69zeeoac
categories: [reprint]
---

{{< raw >}}

                    
<p>ES6新增的class语法非常帅，但是围绕这个新的语法糖，在class中如何实现静态属性、私有属性、私有方法的问题，成为了大家探讨的话题。本文打算绕过现有的weakmap、symbol的方案，从最简单的实践中抽取出满足要求的方案。</p>
<h1 id="articleHeader0">静态属性</h1>
<p>静态方法非常好实现，就是在普通方法名前面添加static关键字。那么静态属性呢？其实也可以通过static关键字来处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyClass {
    static get name() {
        return 'my name'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> {
    <span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-keyword">get</span> <span class="hljs-title">name</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'my name'</span>
    }
}</code></pre>
<p>这样就可以使用MyClass.name获取静态属性值了。而且因为没有设置setter，所以这个静态属性值还不能被改变。当然，你也可以把setter加上去。</p>
<h1 id="articleHeader1">私有属性</h1>
<p>首先要搞明白“私有属性”意味着几层意思，不是说形式上满足需求就可以，而是要从代码的机理上实现“私有”效果：</p>
<blockquote><p>1 class内部不同方法间可以使用，因此this要指向实例化对象（必须）<br>2 不能被外部访问，因此实例化对象person.name既不能获得值，也不能设定值，应该返回undefined，甚至应该在实例化之后，并不知道有name这个属性存在，开发者甚至可以自己再person.name = 'new name'动态去创建一个非私有属性（必须）<br>3 不能被继承，因此extends后子类不具备该属性（必须）<br>4 方便的调用方式，比如类this._name形式（备选）</p></blockquote>
<p>上面这些应该是作为私有属性的主要条件，如果连这些都不满足，很难谈得上叫“私有属性”。</p>
<p>实现方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var attributions = {}
function get(that, key) {
    return attributions[that] &amp;&amp; attributions[that][key]
}
function set(that, key, value) {
    if(!attributions[that]) attributions[that] = {}
    attributions[that][key] = value
}

class MyClass {
    set() {
        set(this, 'name', 'my name')
    }
    get() {
        let name = get(this, 'name')
        console.log(name)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>var attributions = {}
function <span class="hljs-keyword">get</span>(<span class="hljs-keyword">that</span>, key) {
<span class="hljs-built_in">    return</span> attributions[<span class="hljs-keyword">that</span>] &amp;&amp; attributions[<span class="hljs-keyword">that</span>][key]
}
function <span class="hljs-keyword">set</span>(<span class="hljs-keyword">that</span>, key, value) {
    <span class="hljs-keyword">if</span>(!attributions[<span class="hljs-keyword">that</span>]) attributions[<span class="hljs-keyword">that</span>] = {}
    attributions[<span class="hljs-keyword">that</span>][key] = value
}

<span class="hljs-built_in">class</span> MyClass {
    <span class="hljs-keyword">set</span>() {
        <span class="hljs-keyword">set</span>(this, '<span class="hljs-built_in">name</span>', '<span class="hljs-keyword">my</span> <span class="hljs-built_in">name</span>')
    }
    <span class="hljs-keyword">get</span>() {
        let <span class="hljs-built_in">name</span> = <span class="hljs-keyword">get</span>(this, '<span class="hljs-built_in">name</span>')
        console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>)
    }
}</code></pre>
<p>在类外面有一个辅助对象attributions，两个辅助函数set, get。它们将不被实例化对象直接访问，因此是一个相对封闭的空间，外部完全无法访问set, get函数操作的内容，但对于类的实例化对象而已，确实有自己对应的属性内容，因此，这种方案，可以代替类内部的私有属性的功能。</p>
<h1 id="articleHeader2">私有方法</h1>
<p>理论上讲，私有属性和私有方法的区别是，私有方法是函数。因此，实际上，上面私有属性的实现过程中已经实现了私有方法，就是上面的set, get两个辅助函数，这两个函数帮助类完成一些操作，同时对于每一个实例化对象而言都可以设置对应的值，而且也不会被外部获取。</p>
<h1 id="articleHeader3">getter和setter的实现</h1>
<p>现在很多类实现了getter和setter，将内部的数据管理和自身的属性分开，改变数据和改变属性是两回事。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events = {}
var data = {}
class MyClass {
    on(event, handler) {
        if(!events[event]) events[event] = []
        events[event].push(handler)
    }
    trigger(event, params = []) {
        let evts = events[event]
        if(Array.isArray(evts)) evts.forEach(callback => {
            if(typeof callback === 'function') {
                if(Array.isArray(params)) callback.apply(this, params)
                else callback.call(this, params)
            }
        })
    }
    get(key) {
        return data[this] &amp;&amp; data[this][key]
    }
    set(key, value, notify = true) {
        if(!data[this]) data[this] = {}
        data[this][key] = value
        if(notify) {
            this.trigger('change:' + key, value)
        }
    }
    call(factory, ...args) {
        factory.apply(this, args)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> events = {}
<span class="hljs-keyword">var</span> data = {}
<span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> {
    <span class="hljs-keyword">on</span>(<span class="hljs-keyword">event</span>, handler) {
        <span class="hljs-keyword">if</span>(!events[<span class="hljs-keyword">event</span>]) events[<span class="hljs-keyword">event</span>] = []
        events[<span class="hljs-keyword">event</span>].push(handler)
    }
    trigger(<span class="hljs-keyword">event</span>, <span class="hljs-keyword">params</span> = []) {
        <span class="hljs-keyword">let</span> evts = events[<span class="hljs-keyword">event</span>]
        <span class="hljs-keyword">if</span>(Array.isArray(evts)) evts.forEach(callback =&gt; {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">'function'</span>) {
                <span class="hljs-keyword">if</span>(Array.isArray(<span class="hljs-keyword">params</span>)) callback.apply(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">params</span>)
                <span class="hljs-keyword">else</span> callback.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">params</span>)
            }
        })
    }
    <span class="hljs-keyword">get</span>(key) {
        <span class="hljs-keyword">return</span> data[<span class="hljs-keyword">this</span>] &amp;&amp; data[<span class="hljs-keyword">this</span>][key]
    }
    <span class="hljs-keyword">set</span>(key, <span class="hljs-keyword">value</span>, notify = <span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">if</span>(!data[<span class="hljs-keyword">this</span>]) data[<span class="hljs-keyword">this</span>] = {}
        data[<span class="hljs-keyword">this</span>][key] = <span class="hljs-function"><span class="hljs-keyword">value</span>
        <span class="hljs-title">if</span>(<span class="hljs-params">notify</span>) </span>{
            <span class="hljs-keyword">this</span>.trigger(<span class="hljs-string">'change:'</span> + key, <span class="hljs-keyword">value</span>)
        }
    }
    call(factory, ...args) {
        factory.apply(<span class="hljs-keyword">this</span>, args)
    }
}</code></pre>
<p>上面的类中定义了我们最常用的on, trigger, get, set, call这几个方法。使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new MyClass()
a.on('change:name', value => console.log(value))
a.set('name', 'my value')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>var <span class="hljs-keyword">a</span> = <span class="hljs-built_in">new</span> MyClass()
<span class="hljs-keyword">a</span>.on(<span class="hljs-string">'change:name'</span>, <span class="hljs-built_in">value</span> =&gt; console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">value</span>))
<span class="hljs-keyword">a</span>.<span class="hljs-built_in">set</span>(<span class="hljs-string">'name'</span>, <span class="hljs-string">'my value'</span>)</code></pre>
<p>这样不仅可以有效的管理组织自己的数据，而且还可以通过绑定，实现数据变化的监听。</p>
<hr>
<p>求个兼职，如果您有web开发方面的需要，可以联系我，生活不容易，且行且珍惜。<br>我的个人博客 <a href="http://www.tangshuang.net" rel="nofollow noreferrer" target="_blank">www.tangshuang.net</a> 这里就不留信息了，请在博客留言，我会联系你</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6中class私有属性和私有方法

## 原文链接
[https://segmentfault.com/a/1190000008606016](https://segmentfault.com/a/1190000008606016)


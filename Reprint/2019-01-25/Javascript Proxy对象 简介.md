---
title: 'Javascript Proxy对象 简介' 
date: 2019-01-25 2:30:23
hidden: true
slug: 8x2p8kdm04b
categories: [reprint]
---

{{< raw >}}

            <h1><center>Javascript Proxy对象</center></h1>
<h2><center>改变你操作对象的方式</center></h2>
<p><img src="http://p0.qhimg.com/t0155939497b6ee9df3.png" alt=""></p>
<blockquote>
<p>Proxies 是Javasript对象的中间件</p>
</blockquote>
<p>...或者说至少是那种很早的版本。</p>
<p>ES6 中引入Proxies，让你可以自定义<code>Object</code>的基本操作。例如，<code>get</code>就是<code>Object</code>的基础操作方法。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const obj</span> = {
   val: 10
};

</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">obj</span><span class="hljs-selector-class">.val</span>);

</code></pre><p>这里，<code>console.log()</code>表达式在对象<code>obj</code>上执行<code>get</code>方法来获取<code>val</code>的值。</p>
<p>另一个对象的基本操作方法是 <code>set</code>。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">const obj</span> = {
   val: 10
};

</code></pre><pre><code class="hljs abnf">obj.val2 = <span class="hljs-number">20</span><span class="hljs-comment">;</span>

</code></pre><p>这里，<code>set</code>方法用来给对象<code>obj</code>设置一个新的值。</p>
<hr>
<h3>如何创建Proxy?</h3>
<pre><code class="hljs aspectj"><span class="hljs-keyword">const</span> proxiedObject = <span class="hljs-keyword">new</span> Proxy(initialObj, <span class="hljs-keyword">handler</span>);

</code></pre><p>调用Proxy构造函数，<code>new Proxy()</code>将返回一个对象，不仅包含了<code>initialObj</code>里的值，而且其基本操作（如<code>get</code> 和 <code>set</code>）现在可以通过<code>handler</code>对象来指定一些自定义逻辑。</p>
<p>我们写个例子来理解这个概念，</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> handler = {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A value has been accessed'</span>);
    }
}

<span class="hljs-keyword">const</span> initialObj = {
    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
    name</span>: <span class="hljs-string">'Foo Bar'</span>
}

<span class="hljs-keyword">const</span> proxiedObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(initialObj, handler);

<span class="hljs-built_in">console</span>.log(proxiedObj.name);
</code></pre>
<p>现在，如果我们没有构造一个Proxy对象，执行第14行的<code>console.log(proxiedObj.name)</code>会在控制台输出 “Foo Bar”。</p>
<p>不过现在我们定义了一个Proxy，并在第三行<code>get</code>方法中定义了一些自定义逻辑。</p>
<p>现在执行<code>console.log(proxiedObj.name)</code>会在控制台输出 “A value has been accessed”。</p>
<p><img src="http://p0.qhimg.com/t018c664821dd8b3c59.png" alt=""></p>
<p>仔细看，你会发现控制台中实际上有两条记录。 “A value has been accessed” 和 <code>undefined</code>。 为什么？?</p>
<p><code>get</code>运算符的默认实现是返回Object中存储的值。由于我们将它重写为只记录一条语句，该值永远不会返回，因此第14行的<code>console.log()</code>输出<code>undefined</code>。</p>
<p>让我们来解决这个问题！</p>
<p><code>get</code>运算符有两个参数 - 对象本身和被访问的属性。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> handler = {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, prop</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A value has been accessed'</span>);
        <span class="hljs-keyword">return</span> obj[prop]; <span class="hljs-comment">// 返回访问的key在obj的值</span>
    }
}

<span class="hljs-keyword">const</span> initialObj = {
    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
    name</span>: <span class="hljs-string">'Foo Bar'</span>
}

<span class="hljs-keyword">const</span> proxiedObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(initialObj, handler);

<span class="hljs-built_in">console</span>.log(proxiedObj.name);
</code></pre>
<center>返回属性值</center>


<p><img src="http://p0.qhimg.com/t01d390aefe3fc2aab1.png" alt=""></p>
<center>返回属性值 --- 控制台的输出</center>

<p>好多了吧! ?</p>
<p>我们为<code>get</code>提供的自定义覆盖被称为“拦截器”（大概基于<a href="https://en.wikipedia.org/wiki/Trap_%28computing%29">操作系统拦截</a>的概念）。 <code>handler</code>对象基本上是一个包含一组“拦截”的对象，每当访问对象属性时都会被触发。</p>
<p>我们给<code>set</code>也添加一个“拦截器”。 我们将做同样的事情 - 任何时候设置一个值，我们将记录被修改的属性，以及为该键设置的值。</p>
<p><code>set</code>操作符有三个参数 - 对象本身，被访问的属性和为该属性设置的值。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> handler = {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, prop</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'A value has been accessed'</span>);
        <span class="hljs-keyword">return</span> obj[prop];
    },
    <span class="hljs-attribute">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, prop, value</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${prop}</span> is being set to <span class="hljs-subst">${value}</span>`</span>);
    }
}

<span class="hljs-keyword">const</span> initialObj = {
    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
    name</span>: <span class="hljs-string">'Foo Bar'</span>
}

<span class="hljs-keyword">const</span> proxiedObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(initialObj, handler);

proxiedObj.age = <span class="hljs-number">24</span>
</code></pre>
<center>添加<code>set</code> “拦截器”</center>

<p>这里，在第18行进行的访问将触发第6行定义的功能，该功能将记录正在访问的属性和正在设置的值。</p>
<p><img src="http://p0.qhimg.com/t0128ad6db32ab4ded7.png" alt=""></p>
<center><code>Set</code> “拦截器” —— 控制台的输出</center>

<hr>
<h3>一个真实的例子</h3>
<p>假设我们有一个定义叫person的对象</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> person = {
   <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
   name</span>: <span class="hljs-string">'Foo Bar'</span>
};

</code></pre><p>如果我们想让这个对象的id属性是一个私有属性呢？ 没人能够通过person.id访问这个属性，如果有人这样做，我们需要抛出一个错误。 我们将如何做到这一点？</p>
<p>让Proxies来拯救吧！??‍?</p>
<p>我们所需要做的就是给这个对象创建一个Proxy，并覆盖<code>get</code>运算符来阻止我们访问<code>id</code>属性！</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> handler = {
    <span class="hljs-attribute">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, prop</span>) </span>{
        <span class="hljs-keyword">if</span> (prop === <span class="hljs-string">'id'</span>) { <span class="hljs-comment">// Check if the id is being accessed</span>
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Cannot access private properties!'</span>); <span class="hljs-comment">// Throw an error</span>
        } <span class="hljs-title">else</span> {
            <span class="hljs-keyword">return</span> obj[prop]; <span class="hljs-comment">// If it's not the id property, return it as usual</span>
        }
    }
}

<span class="hljs-keyword">const</span> person = {
    <span class="hljs-attribute">id:</span><span class="hljs-string"> 1,
    name</span>: <span class="hljs-string">'Foo Bar'</span>
}

<span class="hljs-keyword">const</span> proxiedPerson = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(person, handler);

<span class="hljs-built_in">console</span>.log(proxiedPerson.id);
</code></pre>
<center>阻止访问私有属性</center>

<p>这里，在我们给<code>get</code>创建的“拦截器”，我们检查被访问的属性是否是<code>id</code>属性，如果是的话，我们会抛出一个错误。 否则，我们照常返回值。</p>
<p><img src="http://p0.qhimg.com/t01b04fc77b1c186a9e.png" alt=""></p>
<center>私有属性 — 控制台输出</center>

<hr>
<p>另一个极好的用例是校验。 通过设置<code>set</code>“拦截器”，我们可以在设置值之前添加自定义验证。 如果该值不符合验证，我们可以抛出一个错误！</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> handler = {
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, prop, value</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">'string'</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Only string values can be stored in this object!'</span>);
        } <span class="hljs-keyword">else</span> {
            obj[prop] = value;
        }
    }
}

<span class="hljs-keyword">const</span> obj = {};

<span class="hljs-keyword">const</span> proxiedObj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, handler);

<span class="hljs-built_in">console</span>.log(proxiedObj); <span class="hljs-comment">// This will log an empty object</span>
proxiedObj.name = <span class="hljs-string">'Foo Bar'</span>; <span class="hljs-comment">// This should be allowed</span>
<span class="hljs-built_in">console</span>.log(proxiedObj); <span class="hljs-comment">// This will log an object with the name property set</span>

proxiedObj.age = <span class="hljs-number">24</span>; <span class="hljs-comment">// This will throw an error.</span>
</code></pre>
<center>自定义对象的属性校验</center>

<p><img src="http://p0.qhimg.com/t01e98aebce5a46df5a.png" alt=""></p>
<center>自定义校验 - 控制台输出</center>

<hr>
<p>在上面的例子中，我们已经看到了<code>get</code>和<code>set</code>“陷阱”。 实际上可以设置更多的“陷阱”。 你可以在这里找到<a href="https://docs.microsoft.com/en-us/scripting/javascript/reference/proxy-object-javascript">整个列表</a>。</p>
<p>Proxy对象只是在阅读<a href="https://davidwalsh.name/watch-object-changes?utm_source=blog.campvanilla.com">关于它们的这篇文章</a>之后才进入我的视野，我已经可以在我每天写的代码中看到它们的用处了！</p>
<p>如果你之前在项目或工作中使用过Proxies，我很乐意听到！?</p>
<p>～最后～</p>
<hr>
<p>如果您觉得这篇文章对您有用，请点个赞?!</p>
<p>在什么地方卡住了，需要更多的帮助，还是只想打个招呼？ 在<a href="https://hashnode.com/@abinavseelan">Hashnode</a> 给我直接发问题，或者在<a href="https://twitter.com/AbinavSeelan">Twitter</a>上Call我。 你也可以在<a href="https://github.com/abinavseelan/">Github</a>上找到我。?</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript Proxy对象 简介

## 原文链接
[https://www.zcfy.cc/article/an-intro-to-javascript-proxy-objects-camp-vanilla](https://www.zcfy.cc/article/an-intro-to-javascript-proxy-objects-camp-vanilla)


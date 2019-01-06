---
title: '使用 Proxy 实现简单的 MVVM 模型' 
date: 2019-01-06 2:30:10
hidden: true
slug: intcmuqtk4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">绑定实现的历史</h2>
<p>绑定的基础是 <code>propertyChange</code> 事件。如何得知 <code>viewModel</code> 成员值的改变一直是开发 <code>MVVM</code> 框架的首要问题。主流框架的处理有一下三大类：</p>
<ol><li>另外开发一套 API。典型框架：Backbone.js</li></ol>
<p>Backbone 有自己的 <a href="http://www.css88.com/doc/backbone/#Model" rel="nofollow noreferrer" target="_blank">模型类</a> 和 <a href="http://www.css88.com/doc/backbone/#Collection" rel="nofollow noreferrer" target="_blank">集合类</a>。这样做虽然框架开发简单运行效率也高，但开发者不得不使用这套 API 操作 viewModel，导致上手复杂、代码繁琐。</p>
<ol><li>脏检查机制。典型框架：angularjs</li></ol>
<p>特点是直接使用 JS 原生操作对象的语法操作 viewModel，开发者上手简单、代码简单。但脏检查机制随之带来的就是性能问题。这点在我另外的一篇博文 《<a href="https://my.oschina.net/u/724721/blog/912190" rel="nofollow noreferrer" target="_blank">Angular 1 深度解析：脏数据检查与 angular 性能优化</a>》 有详细讲解这里不另加赘述。</p>
<ol><li>替换属性。典型框架：vuejs<br>vuejs 把开发者定义的 viewModel 对象（即 data 函数返回的对象）中所有的（除某些前缀开头的）成员替换为属性。这样既可以使用 JS 原生操作对象的语法，又是主动触发 <code>propertyChange</code> 事件，效率也高。但这种方法也有一些限制，后文会分析。</li></ol>
<h2 id="articleHeader1"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe" rel="nofollow noreferrer" target="_blank">Object.observe</a></h2>
<p>Object.observe 是谷歌对于简化双向绑定机制的尝试，在 Chrome 49 中引入。然而由于性能等问题，并没有被其他各大浏览器及 ES 标准所接受。挣扎了一段时间后谷歌 Chrome 团队宣布收回 Object.observe 的提议，并在 Chrome 50 中完全删除了 Object.observe 实现。</p>
<h2 id="articleHeader2"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">Proxy</a></h2>
<p>Proxy（代理）是 ES2015 加入的新特性，用于对某些基本操作定义自定义行为，类似于其他语言中的面向切面编程。它的其中一个作用就是用于（部分）替代 Object.observe 以实现双向绑定。</p>
<p>例如有一个对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let viewModel = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> viewModel = {};</code></pre>
<p>可以构造对应的代理类实现对 viewModel 的属性赋值操作的监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="viewModel = new Proxy(viewModel, {
  set(obj, prop, value) {
    if (obj[prop] !== value) {
      obj[prop] = value;
      console.log(`${prop} 属性被改为 ${value}`);
    }
    return true;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">viewModel = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(viewModel, {
  set(obj, prop, value) {
    <span class="hljs-keyword">if</span> (obj[prop] !== value) {
      obj[prop] = value;
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${prop}</span> 属性被改为 <span class="hljs-subst">${value}</span>`</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
});</code></pre>
<p>这时所有对 viewModel 的属性赋值的操作都不会直接生效，而是将这个操作转发给 <code>Proxy</code> 中注册的 <code>set</code> 方法，其中的参数 <code>obj</code> 是原始对象（注意不能直接用 a，否则还会触发代理函数，造成无限递归），<code>prop</code> 是被赋值的属性名，<code>value</code> 是待赋的值。<br>如果有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="viewModel.test = 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">viewModel.test = <span class="hljs-number">1</span>;</code></pre>
<p>这时就会输出 <code>test 属性被改为 1</code>。</p>
<h2 id="articleHeader3">用 Proxy 实现简单的单向绑定。</h2>
<p>有了 <code>Proxy</code> 就可以得知 <code>viewModel</code> 中属性的变更了，还需要更新页面上绑定此属性的元素。</p>
<p>简单起见，我们用 <code>this</code> 表示 <code>viewModel</code> 本身，使用 <code>this.XXX</code> 就表示依赖 <code>XXX</code> 属性。有 DOM 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div my-bind=&quot;'str1 + str2 = ' + (this.str1 + this.str2)&quot;></div>
  <div my-bind=&quot;'num1 - num2 = ' + (this.num1 - this.num2)&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">my-bind</span>=<span class="hljs-string">"'str1 + str2 = ' + (this.str1 + this.str2)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">my-bind</span>=<span class="hljs-string">"'num1 - num2 = ' + (this.num1 - this.num2)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>首先要获得所有使用了单向绑定的元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bindingElements = [...document.querySelectorAll('[my-bind]')];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> bindingElements = [...document.querySelectorAll(<span class="hljs-string">'[my-bind]'</span>)];</code></pre>
<p>获取绑定表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindingElements.forEach(el => {
  const expression = el.getAttribute('my-bind');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">bindingElements.forEach(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> expression = el.getAttribute(<span class="hljs-string">'my-bind'</span>);
});</code></pre>
<p>由于获得的表达式是个字符串，需要构造一个函数去执行它，得到表达式的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const expression = el.getAttribute('my-bind');
const result = new Function('&quot;use strict&quot;;\nreturn ' + expression).call(viewModel);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> expression = el.getAttribute(<span class="hljs-string">'my-bind'</span>);
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'"use strict";\nreturn '</span> + expression).call(viewModel);</code></pre>
<p>代码中会动态创建一个函数，内容就是将字符串解析执行后将其结果返回（类似 eval，但更安全）。将结果放到页面上就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.textContent = result;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">el.textContent = result;</code></pre>
<p>与上文的 <code>viewModel</code> 结合起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bindingElements = [...document.querySelectorAll('[my-bind]')];

window.viewModel = new Proxy({}, { // 设置全局变量方便调试
  set(obj, prop, value) {
    if (obj[prop] !== value) {
      obj[prop] = value;

      bindingElements.forEach(el => {
        const expression = el.getAttribute('my-bind');
        const result = new Function('&quot;use strict&quot;;\nreturn ' + expression)
          .call(obj);
        el.textContent = result;
      });
    }
    return true;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> bindingElements = [...document.querySelectorAll(<span class="hljs-string">'[my-bind]'</span>)];

<span class="hljs-built_in">window</span>.viewModel = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, { <span class="hljs-comment">// 设置全局变量方便调试</span>
  set(obj, prop, value) {
    <span class="hljs-keyword">if</span> (obj[prop] !== value) {
      obj[prop] = value;

      bindingElements.forEach(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> expression = el.getAttribute(<span class="hljs-string">'my-bind'</span>);
        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'"use strict";\nreturn '</span> + expression)
          .call(obj);
        el.textContent = result;
      });
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
});</code></pre>
<p>如果实际放在浏览器中运行的话，改变 <code>viewModel</code> 中属性的值就会触发页面的更新。</p>
<p>示例中写了循环会更新所有绑定元素，比较好的方式是只更新对当前变更属性有依赖的元素。这时就要分析绑定表达式的属性依赖。<br>简单起见可以使用正则表达式解析属性依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let match;
while (match = /this(?:\.(\w+))+/g.exec(expression)) {
  match[1] // 属性依赖
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> match;
<span class="hljs-keyword">while</span> (match = <span class="hljs-regexp">/this(?:\.(\w+))+/g</span>.exec(expression)) {
  match[<span class="hljs-number">1</span>] <span class="hljs-comment">// 属性依赖</span>
}</code></pre>
<h2 id="articleHeader4">添加事件绑定</h2>
<p>事件绑定即绑定原生事件，在事件触发时执行绑定表达式，表达式调用 <code>viewModel</code> 中的某个回调函数。</p>
<p>以 <code>click</code> 事件为例。依然是获取所有绑定了 <code>click</code> 事件的元素，并执行表达式（表达式的值被丢弃）。与单项绑定不同的是：执行表达式需要传入事件的 event 参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...document.querySelectorAll('[my-click]')].forEach(el => {
  const expression = el.getAttribute('my-click');
  const fn = new Function('$event', '&quot;use strict&quot;;\n' + expression);
  el.addEventListener('click', event => {
    fn.call(viewModel, event);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[...document.querySelectorAll(<span class="hljs-string">'[my-click]'</span>)].forEach(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> expression = el.getAttribute(<span class="hljs-string">'my-click'</span>);
  <span class="hljs-keyword">const</span> fn = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">'$event'</span>, <span class="hljs-string">'"use strict";\n'</span> + expression);
  el.addEventListener(<span class="hljs-string">'click'</span>, event =&gt; {
    fn.call(viewModel, event);
  });
});</code></pre>
<p><code>Function</code> 对象的构造函数，前 n-1 个参数是生成的函数对象的参数名，最后一个是函数体。代码中构造了包含一个 <code>$event</code> 参数的函数，函数体就是直接执行绑定表达式。</p>
<h2 id="articleHeader5">双向绑定</h2>
<p>双向绑定就是单项绑定和事件绑定的结合体。绑定元素的 <code>input</code> 事件来修改 <code>viewModel</code> 的属性，然后再单项绑定元素的 <code>value</code> 属性修改元素的值。</p>
<p>这里是一个较为完整的示例：<a href="http://sandbox.runjs.cn/show/7wqpuofo" rel="nofollow noreferrer" target="_blank">http://sandbox.runjs.cn/show/...</a>。完整的代码放在我的 <a href="https://github.com/CarterLi/TestMvvm" rel="nofollow noreferrer" target="_blank">GitHub</a> 仓库</p>
<h2 id="articleHeader6">使用 Proxy 实现双向绑定的优缺点</h2>
<p>相较于 vuejs 的属性替换，Proxy 实现的绑定至少有如下三个优点：</p>
<ul><li>无需预先定义待绑定的属性。</li></ul>
<p>vuejs 要做属性（getter, setter 方法）替换，首先需要知道有哪些属性需要替换，这样导致必须预先定义需要替换的属性，也就是 vuejs 中的 data 方法。vuejs 中 data 方法必须定义完整所有绑定属性，否则对应绑定不能正常工作。  <br><a href="https://cn.vuejs.org/v2/guide/reactivity.html#" rel="nofollow noreferrer" target="_blank">Vue 不能检测到对象属性的添加或删除</a>：<code>Property or method "XXX" is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option.</code><br>而 <code>Proxy</code> 不需要，因为它监听的是整个对象。</p>
<ul><li>对数组相性良好。</li></ul>
<p>虽说数组里的方法可以替换（push、pop等），<a href="https://cn.vuejs.org/v2/guide/list.html#" rel="nofollow noreferrer" target="_blank">但是数组下标却不能替换为属性，以致必须搞出一个 set 方法用于对数组下标赋值</a>。</p>
<ul><li>更容易调试的 viewModel 对象。</li></ul>
<p>由于 vuejs 把对象中的所有成员全部替换成了属性，如果想直接用 Chrome 的原生调试工具查看属性值，你不得不挨个去点属性后面的 <code>(...)</code>：因为获取属性的值其实是执行了属性的 <code>get</code> 方法，执行一个方法可能会产生副作用，Chrome 把这个决定权留给开发者。  <br><code>Proxy</code> 对象不需要。<code>Proxy</code> 的 <code>set</code> 方法只是一层包装，<code>Proxy</code> 对象自身维护原始对象的值，自然也可以直接拿出原始值给开发者看。查看一个 <code>Proxy</code> 对象，只需要展开其内置属性 <code>[[Target]]</code> 即可看到原始对象的所有成员的值。你甚至还可以看到包装原始对象的哪些 <code>get</code>、<code>set</code> 函数——如果你感兴趣的话。</p>
<p>虽说使用 <code>Proxy</code> 实现双向绑定的优点很明显，但是缺点也很明显：<code>Proxy</code> 是 <code>ES2015</code> 的特性，它<strong>无法被编译为 ES5，也无法 Polyfill</strong>。IE 自然全军覆没；其他各大浏览器实现的时间也较晚：Chrome 49、Safari 10。浏览器兼容性极大的限制了 <code>Proxy</code> 的使用。但是我相信，随着时间的推移，基于 <code>Proxy</code> 的前端 <code>MVVM</code> 框架也会出现在开发者眼前。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Proxy 实现简单的 MVVM 模型

## 原文链接
[https://segmentfault.com/a/1190000010433537](https://segmentfault.com/a/1190000010433537)


---
title: 'Web Components 是个什么样的东西' 
date: 2019-02-04 2:30:58
hidden: true
slug: n7579nb2drc
categories: [reprint]
---

{{< raw >}}

                    
<p>前端组件化这个主题相关的内容已经火了很久很久，angular 刚出来时的 <code>Directive</code> 到 angular2 的 <code>components</code>，还有 React 的 <code>components</code> 等等，无一不是前端组件化的一种实现和探索，但是提上议程的 Web Components 标准是个怎样的东西，相关的一些框架或者类库，如 React，Angular2，甚至是 x-tag，polymer 现在实现的组件化的东西和 Web Components 标准差别在哪里？我花时间努力地把现有的 <a href="https://github.com/w3c/webcomponents" rel="nofollow noreferrer" target="_blank">W3C Web Components</a> 文档看了下，然后坚强地写下这些记录。</p>
<p>首先我们需要知道，Web Components 包括了四个部分：</p>
<ul>
<li><p><a href="https://w3c.github.io/webcomponents/spec/custom/" rel="nofollow noreferrer" target="_blank">Custom Elements</a></p></li>
<li><p><a href="https://w3c.github.io/webcomponents/spec/imports/" rel="nofollow noreferrer" target="_blank">HTML Imports</a></p></li>
<li><p><a href="https://html.spec.whatwg.org/multipage/scripting.html#the-template-element" rel="nofollow noreferrer" target="_blank">HTML Templates</a></p></li>
<li><p><a href="https://w3c.github.io/webcomponents/spec/shadow/" rel="nofollow noreferrer" target="_blank">Shadow DOM</a></p></li>
</ul>
<p>这四部分有机地组合在一起，才是 Web Components。</p>
<p>可以用自定义的标签来引入组件是前端组件化的基础，在页面引用 HTML 文件和 HTML 模板是用于支撑编写组件视图和组件资源管理，而 Shadow DOM 则是隔离组件间代码的冲突和影响。</p>
<p>下边分别是每一部分的笔记内容。</p>
<h2 id="articleHeader0">Custom Elements</h2>
<h3 id="articleHeader1">概述</h3>
<p>Custom Elements 顾名思义，是提供一种方式让开发者可以自定义 HTML 元素，包括特定的组成，样式和行为。支持 Web Components 标准的浏览器会提供一系列 API 给开发者用于创建自定义的元素，或者扩展现有元素。</p>
<p>这一项标准的草案还处于不稳定的状态，时有更新，API 还会有所变化，下边的笔记以 <a href="https://www.w3.org/TR/2016/WD-custom-elements-20160226/" rel="nofollow noreferrer" target="_blank">Cutsom Elements 2016.02.26</a> 这个版本为准，因为在最新的 chrome 浏览器已经是可以工作的了，这样可以使用 demo 来做尝试，最后我会再简单写一下最新文档和这个的区别。</p>
<h3 id="articleHeader2">registerElement</h3>
<p>首先，我们可以尝试在 chrome 控制台输入 <code>HTMLInputElement</code>，可以看到是有这么一个东西的，这个理解为 input DOM 元素实例化时的构造函数，基础的是 <code>HTMLElement</code>。</p>
<p>Web Components 标准提出提供这么一个接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.registerElement('x-foo', {
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {      
      value: function() { ... }
    },
    ...
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.registerElement(<span class="hljs-string">'x-foo'</span>, {
  <span class="hljs-attr">prototype</span>: <span class="hljs-built_in">Object</span>.create(HTMLElement.prototype, {
    <span class="hljs-attr">createdCallback</span>: {      
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... }
    },
    ...
  })
})</code></pre>
<p>你可以使用 <code>document.registerElement</code> 来注册一个标签，标准中为了提供 namesapce 的支持，防止冲突，规定标签类型（也可以理解为名字）需要使用 <code>-</code> 连接。同时，不能是以下这一些：</p>
<ul>
<li><p>annotation-xml</p></li>
<li><p>color-profile</p></li>
<li><p>font-face</p></li>
<li><p>font-face-src</p></li>
<li><p>font-face-uri</p></li>
<li><p>font-face-format</p></li>
<li><p>font-face-name</p></li>
<li><p>missing-glyph</p></li>
</ul>
<p>第二个参数是标签相关的配置，主要是提供一个 <code>prototype</code>，这个原型对象是以 <code>HTMLElement</code> 等的原型为基础创建的对象。然后你便可以在 HTML 中去使用自定义的标签。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <x-foo></x-foo>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">x-foo</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">x-foo</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>是不是嗅到了 React 的味道？好吧，React 说它自己主要不是做这个事情的。</p>
<h3 id="articleHeader3">生命周期和回调</h3>
<p>在这个 API 的基础上，Web Components 标准提供了一系列控制自定义元素的方法。我们来一一看下：</p>
<p>一个自定义元素会经历以下这些生命周期：</p>
<ul>
<li><p>注册前创建</p></li>
<li><p>注册自定义元素定义</p></li>
<li><p>在注册后创建元素实例</p></li>
<li><p>元素插入到 document 中</p></li>
<li><p>元素从 document 中移除</p></li>
<li><p>元素的属性变化时</p></li>
</ul>
<p>这个是很重要的内容，开发者可以在注册新的自定义元素时指定对应的生命周期回调来为自定义元素添加各种自定义的行为，这些生命周期回调包括了：</p>
<ul>
<li><p>createdCallback<br>  自定义元素注册后，在实例化之后会调用，通常多用于做元素的初始化，如插入子元素，绑定事件等。</p></li>
<li><p>attachedCallback<br>  元素插入到 document 时触发。</p></li>
<li><p>detachedCallback<br>  元素从 document 中移除时触发，可能会用于做类似 destroy 之类的事情。</p></li>
<li><p>attributeChangedCallback<br>  元素属性变化时触发，可以用于从外到内的通信。外部通过修改元素的属性来让内部获取相关的数据并且执行对应的操作。</p></li>
</ul>
<p>这个回调在不同情况下有对应不同的参数：</p>
<ul>
<li><p>设置属性时，参数列表是：属性名称，null，值，命名空间</p></li>
<li><p>修改属性时，参数列表是：属性名称，旧值，新值，命名空间</p></li>
<li><p>删除属性时，参数列表是：属性名称，旧值，null，命名空间</p></li>
</ul>
<p>好了，就上边了解到的基础上，假设我们要创建一个自定义的 <code>button-hello</code> 按钮，点击时会 <code>alert('hello world')</code>，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.registerElement('button-hello', {
  prototype: Object.create(HTMLButtonElement.prototype, {
    createdCallback: {
      value: function createdCallback() {
        this.innerHTML = '<button>hello world</button>'
        this.addEventListener('click', () => {
          alert('hello world')
        })
      }
    }
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.registerElement(<span class="hljs-string">'button-hello'</span>, {
  <span class="hljs-attr">prototype</span>: <span class="hljs-built_in">Object</span>.create(HTMLButtonElement.prototype, {
    <span class="hljs-attr">createdCallback</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createdCallback</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.innerHTML = <span class="hljs-string">'&lt;button&gt;hello world&lt;/button&gt;'</span>
        <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
          alert(<span class="hljs-string">'hello world'</span>)
        })
      }
    }
  })
})</code></pre>
<blockquote><p>要留意上述代码执行之后才能使用 <code>&lt;button-hello&gt;&lt;/button-hello&gt;</code></p></blockquote>
<h3 id="articleHeader4">扩展原有元素</h3>
<p>其实，如果我们需要一个按钮，完全不需要重新自定义一个元素，Web Components 标准提供了一种扩展现有标签的方式，把上边的代码调整一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.registerElement('button-hello', {
  prototype: Object.create(HTMLButtonElement.prototype, {
    createdCallback: {
      value: function createdCallback() {
        this.addEventListener('click', () => {
          alert('hello world')
        })
      }
    }
  }),
  extends: 'button'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.registerElement(<span class="hljs-string">'button-hello'</span>, {
  <span class="hljs-attr">prototype</span>: <span class="hljs-built_in">Object</span>.create(HTMLButtonElement.prototype, {
    <span class="hljs-attr">createdCallback</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createdCallback</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
          alert(<span class="hljs-string">'hello world'</span>)
        })
      }
    }
  }),
  <span class="hljs-attr">extends</span>: <span class="hljs-string">'button'</span>
})</code></pre>
<p>然后在 HTML 中要这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button is=&quot;button-hello&quot;>hello world</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"button-hello"</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>使用 <code>is</code> 属性来声明一个扩展的类型，看起来也蛮酷的。生命周期和自定义元素标签的保持一致。</p>
<p>当我们需要多个标签组合成新的元素时，我们可以使用自定义的元素标签，但是如果只是需要在原有的 HTML 标签上进行扩展的话，使用 <code>is</code> 的这种元素扩展的方式就好。</p>
<p>原有的 <code>createElement</code> 和 <code>createElementNS</code>，在 Web Components 标准中也扩展成为支持元素扩展，例如要创建一个 <code>button-hello</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hello = document.createElement('button', 'button-hello')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> hello = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>, <span class="hljs-string">'button-hello'</span>)</code></pre>
<p>标准文档中还有很多细节上的内容，例如接口的参数说明和要求，回调队列的实现要求等，这些更多是对于实现这个标准的浏览器开发者的要求，这里不做详细描述了，内容很多，有兴趣的自行查阅：<a href="https://www.w3.org/TR/2016/WD-custom-elements-20160226/" rel="nofollow noreferrer" target="_blank">Cutsom Elements 2016.02.26</a>。</p>
<h3 id="articleHeader5">和最新版的区别</h3>
<p>前边我提到说文档的更新变化很快，截止至我写这个文章的时候，最新的文档是这个：<a href="https://www.w3.org/TR/custom-elements/" rel="nofollow noreferrer" target="_blank">Custom Elements 2016.07.21</a>。</p>
<p>细节不做描述了，讲讲我看到的最大变化，就是向 ES6 靠拢。大致有下边三点：</p>
<ul>
<li><p>从原本的扩展 prototype 来定义元素调整为建议使用 class extends 的方式</p></li>
<li><p>注册自定义元素接口调整，更加方便使用，传入 type 和 class 即可</p></li>
<li><p>生命周期回调调整，<code>createdCallback</code> 直接用 class 的 <code>constructor</code></p></li>
</ul>
<p>前两个点，我们直接看下代码，原本的代码按照新的标准，应该调整为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ButtonHelloElement extends HTMLButtonElement {
  constructor() {
    super()

    this.addEventListener('click', () => {
      alert('hello world')
    })
  }
}

customElements.define('button-hello', ButtonHelloElement, { extends: 'button' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ButtonHelloElement</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HTMLButtonElement</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
      alert(<span class="hljs-string">'hello world'</span>)
    })
  }
}

customElements.define(<span class="hljs-string">'button-hello'</span>, ButtonHelloElement, { <span class="hljs-attr">extends</span>: <span class="hljs-string">'button'</span> })</code></pre>
<p>从代码上看会感觉更加 OO，编写上也比原本要显得方便一些，原本的生命周期回调是调整为新的：</p>
<ul>
<li><p>constructor in class 作用相当于原本的 createdCallback</p></li>
<li><p>connectedCallback 作用相当于 attachedCallback</p></li>
<li><p>disconnectedCallback 作用相当于 detachedCallback</p></li>
<li><p>adoptedCallback 使用 <code>document.adoptNode(node)</code> 时触发</p></li>
<li><p>attributeChangedCallback 和原本保持一致</p></li>
</ul>
<p>connect 事件和插入元素到 document 有些许区别，主要就是插入元素到 document 时，元素状态会变成 <code>connected</code>，这时会触发 connectedCallback，disconnect 亦是如此。</p>
<h2 id="articleHeader6">HTML Imports</h2>
<h3 id="articleHeader7">概述</h3>
<p>HTML Imports 是一种在 HTMLs 中引用以及复用其他的 HTML 文档的方式。这个 Import 很漂亮，可以简单理解为我们常见的模板中的 <code>include</code> 之类的作用。</p>
<p>我们最常见的引入一个 css 文件的方式是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;/css/master.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/css/master.css"</span>&gt;</span></code></pre>
<p>Web Components 现在提供多了一个这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;import&quot; href=&quot;/components/header.html&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"import"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/components/header.html"</span>&gt;</span></code></pre>
<h3 id="articleHeader8">HTMLLinkElement</h3>
<p>原本的 <code>link</code> 标签在添加了 HTML Import 之后，多了一个只读的 <code>import</code> 属性，当出现下边两种情况时，这个属性为 <code>null</code>：</p>
<ul>
<li><p>该 <code>link</code> 不是用来 import 一个 HTML 的。</p></li>
<li><p>该 <code>link</code> 元素不在 document 中。</p></li>
</ul>
<p>否则，这个属性会返回一个表示引入的 HTML 文件的文档对象，类似于 <code>document</code>。比如说，在上边的代码基础上，可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const link = document.querySelector('link[rel=import]')
const header = link.import;

const pulse = header.querySelector('div.logo');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> link = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'link[rel=import]'</span>)
<span class="hljs-keyword">const</span> header = link.import;

<span class="hljs-keyword">const</span> pulse = header.querySelector(<span class="hljs-string">'div.logo'</span>);</code></pre>
<h3 id="articleHeader9">阻塞式</h3>
<p>我们要知道的是，默认的 <code>link</code> 加载是阻塞式的，除非你给他添加一个 <code>async</code> 标识。</p>
<blockquote><p>阻塞式从某种程度上讲是有必要的，当你 improt 的是一个完整的自定义组件并且需要在主 HTML 中用标签直接使用时，非阻塞的就会出现错误了，因为标签还没有被注册。</p></blockquote>
<h3 id="articleHeader10">document</h3>
<p>有一点值得留意的是，在 import 的 HTML 中，我们编写的 script 里边的 <code>document</code> 是指向 import 这个 HTML 的主 HTML 的 document。</p>
<p>如果我们要获取 import 的 HTML 的 document 的话，得这么来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const d = document.currentScript.ownerDocument" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> d = <span class="hljs-built_in">document</span>.currentScript.ownerDocument</code></pre>
<p>这样设计是因为 import 进来的 HTML 需要用到主 HTML 的 document。例如我们上边提到的 <code>registerElement</code>。</p>
<p>在一个被 import 的 HTML 文件中使用下边三个方法会抛出一个 <a href="https://html.spec.whatwg.org/multipage/infrastructure.html#invalidstateerror" rel="nofollow noreferrer" target="_blank">InvalidStateError</a> 异常：</p>
<ul>
<li><p>document.open()</p></li>
<li><p>document.write()</p></li>
<li><p>document.close()</p></li>
</ul>
<p>对于 HTML Import，标准文档中还有很大一部分内容是关于多个依赖加载的处理算法的，在这里就不详述了，有机会的话找时间再开篇谈，这些内容是需要浏览器去实现的。</p>
<h2 id="articleHeader11">HTML Templates</h2>
<h3 id="articleHeader12">概述</h3>
<p>这个东西很简单，用过 handlebars 的人都知道有这么一个东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script id=&quot;template&quot; type=&quot;text/x-handlebars-template&quot;>
  ...
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-handlebars-template"</span>&gt;</span><span class="undefined">
  ...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>其他模板引擎也有类似的东西，那么 HTML Templates 便是把这个东西官方标准化，提供了一个 <code>template</code> 标签来存放以后需要但是暂时不渲染的 HTML 代码。</p>
<p>以后可以这么写了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;template&quot;>
  ...
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader13">接口和应用</h3>
<p>template 元素有一个只读的属性 <code>content</code>，用于返回这个 template 里边的内容，返回的结果是一个 <code>DocumentFragment</code>。</p>
<p>具体是如何使用的，直接参考官方给出的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
  <head>
    <title>Homework</title>
  <body>
    <template id=&quot;template&quot;><p>Smile!</p></template>
    <script>
      let num = 3;
      const fragment = document.getElementById('template').content.cloneNode(true);
      while (num-- > 1) {
        fragment.firstChild.before(fragment.firstChild.cloneNode(true));
        fragment.firstChild.textContent += fragment.lastChild.textContent;
      }
      document.body.appendChild(fragment);
    </script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Homework<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"template"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Smile!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">let</span> num = <span class="hljs-number">3</span>;
      <span class="hljs-keyword">const</span> fragment = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'template'</span>).content.cloneNode(<span class="hljs-literal">true</span>);
      <span class="hljs-keyword">while</span> (num-- &gt; <span class="hljs-number">1</span>) {
        fragment.firstChild.before(fragment.firstChild.cloneNode(<span class="hljs-literal">true</span>));
        fragment.firstChild.textContent += fragment.lastChild.textContent;
      }
      <span class="hljs-built_in">document</span>.body.appendChild(fragment);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>使用 <code>DocumentFragment</code> 的 clone 方法以 <code>template</code> 里的代码为基础创建一个元素节点，然后你便可以操作这个元素节点，最后在需要的时候插入到 document 中特定位置便可以了。</p>
<p>Template 相关的东西不多，而且它现在已经是纳入生效的 <a href="https://html.spec.whatwg.org/multipage/scripting.html#the-template-element" rel="nofollow noreferrer" target="_blank">标准文档</a> 中了。</p>
<p>我们接下来看看重磅的 Shadow DOM。</p>
<h2 id="articleHeader14">Shadow DOM</h2>
<h3 id="articleHeader15">概述</h3>
<p>Shadow DOM 好像提出好久了，最本质的需求是需要一个隔离组件代码作用域的东西，例如我组件代码的 CSS 不能影响其他组件之类的，而 <code>iframe</code> 又太重并且可能有各种奇怪问题。</p>
<p>可以这么说，Shadow DOM 旨在提供一种更好地组织页面元素的方式，来为日趋复杂的页面应用提供强大支持，避免代码间的相互影响。</p>
<p>看下在 chrome 它会是咋样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006763834" src="https://static.alili.tech/img/remote/1460000006763834" alt="Shadow DOM in chrome" title="Shadow DOM in chrome" style="cursor: pointer;"></span></p>
<p>我们可以通过 <code>createShadowRoot()</code> 来给一个元素节点创建 Shadow Root，这些元素类型必须是下边列表的其中一个，否则会抛出 NotSupportedError 异常。</p>
<ul>
<li><p>自定义的元素</p></li>
<li><p>article</p></li>
<li><p>aside</p></li>
<li><p>blockquote</p></li>
<li><p>body</p></li>
<li><p>div</p></li>
<li><p>header, footer</p></li>
<li><p>h1, h2, h3, h4, h5, h6</p></li>
<li><p>nav</p></li>
<li><p>p</p></li>
<li><p>section</p></li>
<li><p>span</p></li>
</ul>
<blockquote><p><code>createShadowRoot()</code> 是现在 chrome 实现的 API，来自文档：<a href="https://www.w3.org/TR/2014/WD-shadow-dom-20140617/" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/2014/WD...</a>。最新的文档 API 已经调整为 <code>attachShadow()</code>。</p></blockquote>
<p>返回的 Shadow Root 对象从 DocumentFragment 继承而来，所以可以使用相关的一些方法，例如 <code>shadowRoot.getElementById('id')</code> 来获取 Shadow DOM 里边的元素。</p>
<p>简单的使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const div = document.getElementById('id')
const shadowRoot = div.createShadowRoot()
const span = document.createElement('span')

span.textContent = 'hello world'
shadowRoot.appendChild(span)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> div = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'id'</span>)
<span class="hljs-keyword">const</span> shadowRoot = div.createShadowRoot()
<span class="hljs-keyword">const</span> span = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>)

span.textContent = <span class="hljs-string">'hello world'</span>
shadowRoot.appendChild(span)</code></pre>
<p>在这里，我把这个 div 成为是这个 Shadow DOM 的 <strong>宿主元素</strong>，下边的内容会延续使用这个称呼。</p>
<p>Shadow DOM 本身就为了代码隔离而生，所以在 document 上使用 query 时，是没法获取到 Shadow DOM 里边的元素的，需要在 Shadow Root 上做 query 才行。</p>
<p>在这里附上一个文档，里边有详细的关于新的标准和现在 blink 引擎实现的 Shadow DOM 的区别，官方上称之为 v0 和 v1：<a href="https://github.com/w3c/webcomponents/blob/gh-pages/proposals/shadow-dom-v1-in-blink.md" rel="nofollow noreferrer" target="_blank">Shadow DOM v1 in Blink</a>。</p>
<h3 id="articleHeader16">API</h3>
<p>Shadow Root 除了从 DocumentFragment 继承而来的属性和方法外，还多了另外两个属性：</p>
<ul>
<li><p>host 只读属性，用来获取这个 Shadow Root 所属的元素</p></li>
<li><p>innerHTML 用来获取或者设置里边的 HTML 字符串，和我们常用的 <code>element.innerHTML</code> 是一样的</p></li>
</ul>
<p>另外，在最新的标准文档中，元素除了上边提到的 <code>attachShadow</code> 方法之外，还多了三个属性：</p>
<ul>
<li><p>assignedSlot 只读，这个元素如果被分配到了某个 Shadow DOM 里边的 slot，那么会返回这个对应的 slot 元素</p></li>
<li><p>slot 元素的 slot 属性，用来指定 slot 的名称</p></li>
<li><p>shadowRoot 只读，元素下面对应的 Shadow Root 对象</p></li>
</ul>
<p>slot 是什么？接着看下边的内容，看完下一节的最后一部分就会明白上述内容和 slot 相关的两个 API 有什么作用。</p>
<h3 id="articleHeader17">slot</h3>
<p>slot 提供了在使用自定义标签的时候可以传递子模板给到内部使用的能力，可以简单看下 <a href="https://vuejs.org.cn/guide/components.html#" rel="nofollow noreferrer" target="_blank">Vue</a> 的一个例子。</p>
<p>我们先来看下现在 chrome 可以跑的 v0 版本，这一个版本是提供了一个 content 标签，代表了一个占位符，并且有一个 <code>select</code> 属性用来指定使用哪些子元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- component input-toggle template -->
<input type=&quot;checkbox&quot;></input>
<content select=&quot;.span&quot;></content>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- component input-toggle template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">content</span> <span class="hljs-attr">select</span>=<span class="hljs-string">".span"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span></code></pre>
<p>自定义的元素里边的子元素代码是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-toggle name=&quot;hello&quot;>
  <span>hello</span>
  <span class=&quot;span&quot;>test</span>
</input-toggle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-toggle</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hello"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"span"</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-toggle</span>&gt;</span></code></pre>
<p>那么展现的结果会和下边的代码是一样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-toggle name=&quot;hello&quot;>
  <input type=&quot;checkbox&quot;></input>
  <span class=&quot;span&quot;>test</span>
</input-toggle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-toggle</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hello"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"span"</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-toggle</span>&gt;</span></code></pre>
<p>这里只是说展现结果，实际上，<code>input-toggle</code> 里边应该是创建了一个 Shadow DOM，然后 <code>content</code> 标签引用了目标的 <code>span</code> 内容，在 chrome 看是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006745773" src="https://static.alili.tech/img/remote/1460000006745773" alt="content tag in chrome" title="content tag in chrome" style="cursor: pointer;"></span></p>
<p>然后，是最新标准中的 slot 使用方式，直接上例子代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- component input-toggle template -->
<input type=&quot;checkbox&quot;></input>
<slot name=&quot;text&quot;></slot>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- component input-toggle template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></code></pre>
<p>在自定义的元素标签是这么使用 slot 的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input-toggle name=&quot;hello&quot;>
  <input type=&quot;checkbox&quot;></input>
  <span class=&quot;span&quot; slot=&quot;text&quot;>test</span>
</input-toggle>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input-toggle</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"hello"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"span"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"text"</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">input-toggle</span>&gt;</span></code></pre>
<p>通过 <code>slot="text"</code> 的属性来让元素内部的 slot 占位符可以引用到这个元素，多个元素使用这个属性也是可以的。这样子我们便拥有了使用标签是从外部传 template 给到自定义元素的内部去使用，而且具备指定放在那里的能力。</p>
<h3 id="articleHeader18">CSS 相关</h3>
<p>因为有 Shadow DOM 的存在，所以在 CSS 上又添加了很多相关的东西，其中一部分还是属于讨论中的草案，命名之类的可能会有变更，下边提及的内容主要来自文档：<a href="https://www.w3.org/TR/css-scoping-1/#shadow-dom" rel="nofollow noreferrer" target="_blank">Shadow DOM in CSS scoping 1</a>，很多部分在 chrome 是已经实现的了，有兴趣可以写 demo 试试。</p>
<p>因为 Shadow DOM 很大程度上是为了隔离样式作用域而诞生的，主文档中的样式规则不对 Shadow DOM 里的子文档生效，子文档中的样式规则也不影响外部文档。</p>
<p>但不可避免的，在某些场景下，我们需要外部可以控制 Shadow DOM 中样式，如提供一个组件给你，有时候你会希望可以自定义它内部的一些样式，同时，Shadow DOM 中的代码有时候可能需要能够控制其所属元素的样式，甚至，组件内部可以定义上边提到的通过 slot 传递进来的 HTML 的样式。所以呢，是的，CSS 选择器中添加了几个伪类，我们一一来看下它们有什么作用。</p>
<blockquote><p>在阅读下边描述的时候，请留意一下选择器的代码是在什么位置的，Shadow DOM 内部还是外部。</p></blockquote>
<p><code>:host</code> 用于在 Shadow DOM 内部选择到其宿主元素，当它不是在 Shadow DOM 中使用时，便匹配不到任意元素。</p>
<blockquote><p>在 Shadow DOM 中的 * 选择器是无法选择到其宿主元素的。</p></blockquote>
<p><code>:host( &lt;selector&gt; )</code> 括号中是一个选择器，这个可以理解为是一个用于兼容在主文档和 Shadow DOM 中使用的方法，当这个选择器在 Shadow DOM 中时，会匹配到括号中选择器对应的宿主元素，如果不是，则匹配括号中选择器能够匹配到的元素。</p>
<p>文档中提供了一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<x-foo class=&quot;foo&quot;>
  <&quot;shadow tree&quot;>
    <div class=&quot;foo&quot;>...</div>
  </>
</x-foo>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">x-foo</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foo"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">"shadow</span> <span class="hljs-attr">tree</span>"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foo"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">x-foo</span>&gt;</span></code></pre>
<p>在这个 <code>shadow tree</code> 内部的样式代码中，会有这样的结果：</p>
<ul>
<li><p><code>:host</code> 匹配 <code>&lt;x-foo&gt;</code> 元素</p></li>
<li><p><code>x-foo</code> 匹配不到元素</p></li>
<li><p><code>.foo</code> 只匹配到 <code>&lt;div&gt;</code> 元素</p></li>
<li><p><code>.foo:host</code> 匹配不到元素</p></li>
<li><p><code>:host(.foo)</code> 匹配 <code>&lt;x-foo&gt;</code> 元素</p></li>
</ul>
<p><code>:host-context( &lt;selector&gt; )</code>，用于在 Shadow DOM 中来检测宿主元素的父级元素，如果宿主元素或者其祖先元素能够被括号中的选择器匹配到的话，那么这个伪类选择器便匹配到这个 Shadow DOM 的宿主元素。个人理解是用于在宿主元素外部元素满足一定的条件时添加样式。</p>
<p><code>::shadow</code> 这个伪类用于在 Shadow DOM 外部匹配其内部的元素，而 <code>/deep/</code> 这个标识也有同样的作用，我们来看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<x-foo>
   <&quot;shadow tree&quot;>
     <div>
       <span id=&quot;not-top&quot;>...</span>
     </div>
     <span id=&quot;top&quot;>...</span>
   </>
 </x-foo>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">x-foo</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">"shadow</span> <span class="hljs-attr">tree</span>"&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"not-top"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"top"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
   <span class="hljs-tag">&lt;/&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">x-foo</span>&gt;</span></code></pre>
<p>对于上述这一段代码的 HTML 结构，在 Shadow DOM 外部的样式代码中，会是这样的：</p>
<ul>
<li><p><code>x-foo::shadow &gt; span</code> 可以匹配到 <code>#top</code> 元素</p></li>
<li><p><code>#top</code> 匹配不到元素</p></li>
<li><p><code>x-foo /deep/ span</code> 可以匹配到 <code>#not-top</code> 和 <code>#top</code> 元素</p></li>
</ul>
<p><code>/deep/</code> 这个标识的作用和我们的 <code>&gt;</code> 选择器有点类似，只不过它是匹配其对应的 Shadow DOM 内部的，这个标识可能还会变化，例如改成 <code>&gt;&gt;</code> 或者 <code>&gt;&gt;&gt;</code> 之类的，个人感觉， <code>&gt;&gt;</code> 会更舒服。</p>
<p>最后一个，用于在 Shadow DOM 内部调整 slot 的样式，在我查阅的这个文档中，暂时是以 chrome 实现的为准，使用 <code>::content</code> 伪类，不排除有更新为 <code>::slot</code> 的可能性。我们看一个例子来了解一下，就算名称调整了也是差不多的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<x-foo>
  <div id=&quot;one&quot; class=&quot;foo&quot;>...</div>
  <div id=&quot;two&quot;>...</div>
  <div id=&quot;three&quot; class=&quot;foo&quot;>
    <div id=&quot;four&quot;>...</div>
  </div>
  <&quot;shadow tree&quot;>
    <div id=&quot;five&quot;>...</div>
    <div id=&quot;six&quot;>...</div>
    <content select=&quot;.foo&quot;></content>
  </&quot;shadow tree&quot;>
</x-foo>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">x-foo</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"one"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foo"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"two"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"three"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"foo"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"four"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">"shadow</span> <span class="hljs-attr">tree</span>"&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"five"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"six"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content</span> <span class="hljs-attr">select</span>=<span class="hljs-string">".foo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">"shadow</span> <span class="hljs-attr">tree</span>"&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">x-foo</span>&gt;</span></code></pre>
<p>在 Shadow DOM 内部的样式代码中，<code>::content div</code> 可以匹配到 <code>#one</code>，<code>#three</code> 和 <code>#four</code>，留意一下 <code>#two</code> 为什么没被匹配到，因为它没有被 content 元素选中，即不会进行引用。如果更换成 slot 的 name 引用的方式亦是同理。</p>
<p>层叠规则，按照这个文档的说法，对于两个优先级别一样的 CSS 声明，没有带 <code>!important</code> 的，在 Shadow DOM 外部声明的优先级高于在 Shadow DOM 内部的，而带有 <code>!important</code> 的，则相反。个人认为，这是提供给外部一定的控制能力，同时让内部可以限制一定的影响范围。</p>
<p>继承方面相对简单，在 Shadow DOM 内部的顶级元素样式从宿主元素继承而来。</p>
<p>至此，Web Components 四个部分介绍结束了，其中有一些细节，浏览器实现细节，还有使用上的部分细节，是没有提及的，因为详细记录的话，还会有很多东西，内容很多。当使用过程中有疑问时可以再次查阅标准文档，有机会的话会再完善这个文章。下一部分会把这四个内容组合起来，整体看下 Web Components 是怎么使用的。</p>
<h2 id="articleHeader19">Web Components</h2>
<p>Web Components 总的来说是提供一整套完善的封装机制来把 Web 组件化这个东西标准化，每个框架实现的组件都统一标准地进行输入输出，这样可以更好推动组件的复用。结合上边各个部分的内容，我们整合一起来看下应该怎么使用这个标准来实现我们的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- components/header.html -->
<template id=&quot;&quot;>
<style>
::content li {
  display: inline-block;
  padding: 20px 10px;
}
</style>
<content select=&quot;ul&quot;></content>
</template>
<script>
(function() {
  const element = Object.create(HTMLInputElement.prototype)
  const template = document.currentScript.ownerDocument.querySelector('template')

  element.createdCallback = function() {
    const shadowRoot = this.createShadowRoot()
    const clone = document.importNode(template.content, true)
    shadowRoot.appendChild(clone)

    this.addEventListener('click', function(event) {
      console.log(event.target.textContent)
    })
  }

  document.registerElement('test-header', { prototype: element })
})()
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- components/header.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-pseudo">::content</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">10px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">content</span> <span class="hljs-attr">select</span>=<span class="hljs-string">"ul"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> element = <span class="hljs-built_in">Object</span>.create(HTMLInputElement.prototype)
  <span class="hljs-keyword">const</span> template = <span class="hljs-built_in">document</span>.currentScript.ownerDocument.querySelector(<span class="hljs-string">'template'</span>)

  element.createdCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> shadowRoot = <span class="hljs-keyword">this</span>.createShadowRoot()
    <span class="hljs-keyword">const</span> clone = <span class="hljs-built_in">document</span>.importNode(template.content, <span class="hljs-literal">true</span>)
    shadowRoot.appendChild(clone)

    <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-built_in">console</span>.log(event.target.textContent)
    })
  }

  <span class="hljs-built_in">document</span>.registerElement(<span class="hljs-string">'test-header'</span>, { <span class="hljs-attr">prototype</span>: element })
})()
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这是一个简单的组件的例子，用于定义一个 <code>test-header</code>，并且给传递进来的子元素 <code>li</code> 添加了一些组件内部的样式，同时给组件绑定了一个点击事件，来打印点击目标的文本内容。</p>
<p>看下如何在一个 HTML 文件中引入并且使用一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title></title>

    <link rel=&quot;import&quot; href=&quot;components/header.html&quot;>
  </head>
  <body>
    <test-header>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </test-header>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"import"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"components/header.html"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">test-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">test-header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>一个 <code>import</code> 的 <code>&lt;link&gt;</code> 把组件的 HTML 文件引用进来，这样会执行组件中的脚本，来注册一个 <code>test-header</code> 元素，这样子我们便可以在主文档中使用这个元素的标签。</p>
<blockquote><p>上边的例子是可以在 chrome 正常运行的。</p></blockquote>
<p>所以，根据上边简单的例子可以看出，各个部分的内容是有机结合在一起，Custom Elements 提供了自定义元素和标签的能力，template 提供组件模板，import 提供了在 HTML 中合理引入组件的方式，而 Shadow DOM 则处理组件间代码隔离的问题。</p>
<p>不得不承认，Web Components 标准的提出解决了一些问题，必须交由浏览器去处理的是 Shadow DOM，在没有 Shadow DOM 的浏览器上实现代码隔离的方式多多少少有缺陷。个人我觉得组件化的各个 API 不够简洁易用，依旧有 <code>getElementById</code> 这些的味道，但是交由各个类库去简化也可以接受，而 import 功能上没问题，但是加载多个组件时性能问题还是值得商榷，标准可能需要在这个方面提供更多给浏览器的指引，例如是否有可能提供一种单一请求加载多个组件 HTML 的方式等。</p>
<p>在现在的移动化趋势中，Web Components 不仅仅是 Web 端的问题，越来越多的开发者期望以 Web 的方式去实现移动应用，而多端复用的实现渐渐是以组件的形式铺开，例如 <a href="https://github.com/facebook/react-native" rel="nofollow noreferrer" target="_blank">React Native</a> 和 <a href="https://github.com/alibaba/weex" rel="nofollow noreferrer" target="_blank">Weex</a>。所以 Web Components 的标准可能会影响到多端开发 Web 化的一个模式和发展。</p>
<p>最后，再啰嗦一句，Web Components 个人觉得还是未来发展趋势，所以才有了这个文章。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web Components 是个什么样的东西

## 原文链接
[https://segmentfault.com/a/1190000006745770](https://segmentfault.com/a/1190000006745770)


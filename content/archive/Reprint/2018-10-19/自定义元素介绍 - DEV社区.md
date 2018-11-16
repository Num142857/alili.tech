---
title: 自定义元素介绍 - DEV社区
hidden: true
categories: [reprint]
slug: 45c69746
date: 2018-10-19 00:00:00
---

{{< raw >}}

            <h2>引言</h2>
<p>自定义元素是Web组件的一个子集，在我看来这是web 开发中最酷的概念之一，自定义元素让我们能够通过原生的 web 平台来构建组件，而不是依赖于 React、Angular Vue 或者其他的中间库或者框架。</p>
<p>在这篇文章中，我会向你阐述什么是自定义元素、如何创建以及如何在页面上展示。</p>
<h2>Web组件的基础</h2>
<p>所有自定义元素都将共享一些常用方法，可以在下面的代码示例中看到：</p>
<pre><code class="hljs delphi"><span class="hljs-keyword">class</span> MyComponent extends HTMLElement <span class="hljs-comment">{
  static get observedAttributes() {
    return [];
  }</span>

  <span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(...args)</span> <span class="hljs-comment">{
    super(...args);
  }</span>

  <span class="hljs-title">connectedCallback</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>

  <span class="hljs-title">disconnectedCallback</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>

  <span class="hljs-title">adoptedCallback</span><span class="hljs-params">()</span> <span class="hljs-comment">{}</span>

  <span class="hljs-title">attributeChangedCallback</span><span class="hljs-params">(attrName, oldVal, newVal)</span> <span class="hljs-comment">{}</span>
}

<span class="hljs-title">window</span>.<span class="hljs-title">customElements</span>.<span class="hljs-title">define</span><span class="hljs-params">(<span class="hljs-string">'my-component'</span>, MyComponent)</span>;</span>


</code></pre><p>让我们分解一下这个组件里面做了哪些事情。</p>
<h3>constructor() - 构造函数</h3>
<blockquote>
<p>构造函数是最先声明的，并将所有参数通过 super 方法传递给父级。</p>
</blockquote>
<p>通常情况下，构造函数里可以放置一些事件侦听的代码，例如：</p>
<pre><code class="hljs oxygene">...
<span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(...args)</span> <span class="hljs-comment">{
    super(...args);
    this.addEventListener('click', this.handleClick);
}</span>

<span class="hljs-title">handleClick</span><span class="hljs-params">(<span class="hljs-keyword">event</span>)</span> <span class="hljs-comment">{}</span>
...


</span></code></pre><h3>connectedCallback()</h3>
<blockquote>
<p>每次将元素插入DOM时调用。</p>
</blockquote>
<p>每次将组件添加到文档中的任何位置时，它都会立即触发此方法</p>
<h3>disconnectedCallback()</h3>
<blockquote>
<p>每次从DOM中删除元素时调用。</p>
</blockquote>
<p>例如，当我们删除DOM树中的该节点或该节点的父节点时，则此函数将触发，因为该节点本身也将从上述 DOM 树中删除。</p>
<p>当元素被移动到文档的其他地方或新页面的时候，disconnectedCallback 也会被调用。</p>
<h3>adoptedCallback()</h3>
<blockquote>
<p>每次将自定义元素移动到新文档时调用。</p>
</blockquote>
<p>如果将自定义元素移动到新页面或文档中的其他位置，则将触发此回调。</p>
<h3>attributeChangedCallback(attrName, oldVal, newVal)</h3>
<blockquote>
<p>添加，删除，更新或替换元素的属性时会调用该方法</p>
</blockquote>
<p>每当元素的属性变化时，attributeChangedCallback()回调函数就会执行，除非当前属性的改变是已经被监听着的，这个时候就会调用 observedAttributes 方法。</p>
<h3>observedAttributes()</h3>
<blockquote>
<p>我们实际想要观察的自定义元素的属性会发生变化</p>
</blockquote>
<p>如您所见，observedAttributes 被设计成是一个静态方法，这明显不同于其他方法的声明，这是因为我们希望能够被任何子类/组件继承，而且我们只想声明它一次引用，注意，它是静态的（为所有继承者包括它自己）和 gettable（供参考）。</p>
<p>这个方法返回一个字符串数组，数组中的每个字符串是你想要监听的属性的名称，例如：</p>
<pre><code class="hljs cs">...
<span class="hljs-function"><span class="hljs-keyword">static</span> <span class="hljs-keyword">get</span> <span class="hljs-title">observedAttributes</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> [<span class="hljs-string">'id'</span>, <span class="hljs-string">'my-custom-attribute'</span>, <span class="hljs-string">'data-something'</span>, <span class="hljs-string">'disabled'</span>];
}
...


</code></pre><p>自定义元素规范中还有一些其他的方法，但以上这些是我们日常主要使用的方法。</p>
<h2>基本组件</h2>
<p>让我们构建一个向用户打招呼的基本组件。</p>
<h3>html 部分</h3>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Custom Elements 101<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hello-component</span> <span class="hljs-attr">data-name</span>=<span class="hljs-string">"James"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-component</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./hello-component.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>


</code></pre><h3>javascript 部分</h3>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HTMLElement</span> </span>{
  static get observedAttributes() {
    <span class="hljs-keyword">return</span> [<span class="hljs-symbol">'data</span>-name'];
  }

  <span class="hljs-comment">// custom methods</span>
  render() {
    <span class="hljs-keyword">this</span>.innerHTML = <span class="hljs-type">Hello</span> ${<span class="hljs-keyword">this</span>.name};
  }

  get name() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getAttribute(<span class="hljs-symbol">'data</span>-name');
  }

  <span class="hljs-comment">// lifecycle hooks</span>
  connectedCallback() {
    <span class="hljs-keyword">this</span>.render();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    <span class="hljs-keyword">this</span>.render();
  }
}

<span class="hljs-comment">// add into the 'real' dom as a valid tag</span>
window.customElements.define(<span class="hljs-symbol">'hello</span>-component', <span class="hljs-type">HelloComponent</span>);



</code></pre><p>加载index.html，我们可以在页面上看到“Hello James”。</p>
<p>现在，打开浏览器的开发者工具并将data-name属性更改为除James 之外的其他值。你会发现我们有内置的反应！是不是很棒？！</p>
<p>当然，这只是一个非常基本的、非最佳实践、0用例，默认教程的实现，但他给了你一个基本的入门介绍，以便我们在后面的文章中做更详细的深入。</p>
<h2>浏览器支持</h2>
<p>以下是当前对Web组件的支持以及所有支持它们的API，包括Shadow DOM，自定义元素（我们刚刚查看的内容），HTML模板和插槽以及HTML导入：</p>
<p><a href="https://res.cloudinary.com/practicaldev/image/fetch/s--ly5BsOXt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://preview.ibb.co/iFidQK/Capture.png"><img src="https://p0.ssl.qhimg.com/t011c55ae40f9358a6d.jpg" alt="Current support for Web Components APIs from the caniuse documentation at the time of writing this article"></a></p>
<h2>总结</h2>
<p>自定义元素让我们有能力在无需借助框架的情况下实现反应式的 UI 开发。它们确实为我们提供了许多挑战，其中许多将在未来展望, 但是我们可以先去尝试一下，并把其他的「Web Component 」相关规范的 API 放在一起看下，它们真的让我们能够制作出很酷、很强大、反应灵敏的元素，让我们可以用很少的东西做很多事。</p>
<h2>资料</h2>
<ul>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components - MDN</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements">Custom Elements - MDN</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM">Shadow DOM - MDN</a></p>
</li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots">HTML Templates and Slots - MDN</a></p>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/an-introduction-to-custom-elements-dev-community](https://www.zcfy.cc/article/an-introduction-to-custom-elements-dev-community)
原文标题: 自定义元素介绍 - DEV社区
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

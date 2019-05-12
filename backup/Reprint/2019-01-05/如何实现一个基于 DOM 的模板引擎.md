---
title: '如何实现一个基于 DOM 的模板引擎' 
date: 2019-01-05 2:30:10
hidden: true
slug: mxmhvbsens
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVSspq?w=4000&amp;h=2670" src="https://static.alili.tech/img/bVSspq?w=4000&amp;h=2670" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>题图：<a href="https://unsplash.com/photos/ISI5DlnYvuY" rel="nofollow noreferrer" target="_blank">Vincent Guth</a></p></blockquote>
<p>注：本文所有代码均可在本人的个人项目<a href="https://github.com/colonjs/colon" rel="nofollow noreferrer" target="_blank">colon</a>中找到，本文也同步到了<a href="https://zhuanlan.zhihu.com/p/28376182" rel="nofollow noreferrer" target="_blank">知乎专栏</a></p>
<p>可能你已经体会到了 <code>Vue</code> 所带来的便捷了，相信有一部分原因也是因为其基于 DOM 的语法简洁的模板渲染引擎。这篇文章将会介绍如何实现一个基于 DOM 的模板引擎（就像 <code>Vue</code> 的模板引擎一样）。</p>
<h2 id="articleHeader0">Preface</h2>
<p>开始之前，我们先来看一下最终的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compiled = Compile(`<h1>Hey ?, "{{" greeting "}}"</h1>`, {
    greeting: `Hello World`,
});
compiled.view // => `<h1>Hey ?, Hello World</h1>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> compiled = Compile(<span class="hljs-string">`&lt;h1&gt;Hey ?, "{{" greeting "}}"&lt;/h1&gt;`</span>, {
    <span class="hljs-attr">greeting</span>: <span class="hljs-string">`Hello World`</span>,
});
compiled.view <span class="hljs-comment">// =&gt; `&lt;h1&gt;Hey ?, Hello World&lt;/h1&gt;`</span></code></pre>
<h2 id="articleHeader1">Compile</h2>
<p>实现一个模板引擎实际上就是实现一个编译器，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compiled = Compile(template: String|Node, data: Object);
compiled.view // => compiled template" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> compiled = Compile(template: <span class="hljs-built_in">String</span>|Node, <span class="hljs-attr">data</span>: <span class="hljs-built_in">Object</span>);
compiled.view <span class="hljs-comment">// =&gt; compiled template</span></code></pre>
<p>首先，让我们来看下 <code>Compile</code> 内部是如何实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// compile.js
/**
 * template compiler
 *
 * @param {String|Node} template
 * @param {Object} data
 */
function Compile(template, data) {
    if (!(this instanceof Compile)) return new Compile(template, data);

    this.options = {};
    this.data = data;

    if (template instanceof Node) {
        this.options.template = template;
    } else if (typeof template === 'string') {
        this.options.template = domify(template);
    } else {
        console.error(`&quot;template&quot; only accept DOM node or string template`);
    }

    template = this.options.template;

    walk(template, (node, next) => {
        if (node.nodeType === 1) {
            // compile element node
            this.compile.elementNodes.call(this, node);
            return next();
        } else if (node.nodeType === 3) {
            // compile text node
            this.compile.textNodes.call(this, node);
        }
        next();
    });

    this.view = template;
    template = null;
}

Compile.compile = {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// compile.js</span>
<span class="hljs-comment">/**
 * template compiler
 *
 * @param {String|Node} template
 * @param {Object} data
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Compile</span>(<span class="hljs-params">template, data</span>) </span>{
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Compile)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Compile(template, data);

    <span class="hljs-keyword">this</span>.options = {};
    <span class="hljs-keyword">this</span>.data = data;

    <span class="hljs-keyword">if</span> (template <span class="hljs-keyword">instanceof</span> Node) {
        <span class="hljs-keyword">this</span>.options.template = template;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> template === <span class="hljs-string">'string'</span>) {
        <span class="hljs-keyword">this</span>.options.template = domify(template);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`"template" only accept DOM node or string template`</span>);
    }

    template = <span class="hljs-keyword">this</span>.options.template;

    walk(template, (node, next) =&gt; {
        <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">1</span>) {
            <span class="hljs-comment">// compile element node</span>
            <span class="hljs-keyword">this</span>.compile.elementNodes.call(<span class="hljs-keyword">this</span>, node);
            <span class="hljs-keyword">return</span> next();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">3</span>) {
            <span class="hljs-comment">// compile text node</span>
            <span class="hljs-keyword">this</span>.compile.textNodes.call(<span class="hljs-keyword">this</span>, node);
        }
        next();
    });

    <span class="hljs-keyword">this</span>.view = template;
    template = <span class="hljs-literal">null</span>;
}

Compile.compile = {};</code></pre>
<h3 id="articleHeader2">walk</h3>
<p>通过上面的代码，可以看到 <code>Compile</code> 的构造函数主要就是做了一件事 ———— 遍历 <code>template</code>，然后通过判断节点类型的不同来做不同的编译操作，这里就不介绍如何遍历 <code>template</code> 了，不明白的话可以直接看 <code>walk</code> <a href="https://github.com/colonjs/colon/blob/master/src/compile/walk.js" rel="nofollow noreferrer" target="_blank">函数的源码</a>，我们着重来看下如何编译这些不同类型的节点，以编译 <code>node.nodeType === 1</code> 的元素节点为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * compile element node
 *
 * @param {Node} node
 */
Compile.compile.elementNodes = function (node) {
    const bindSymbol = `:`;
    let attributes = [].slice.call(node.attributes),
        attrName = ``,
        attrValue = ``,
        directiveName = ``;

    attributes.map(attribute => {
        attrName = attribute.name;
        attrValue = attribute.value.trim();

        if (attrName.indexOf(bindSymbol) === 0 &amp;&amp; attrValue !== '') {
            directiveName = attrName.slice(bindSymbol.length);

            this.bindDirective({
                node,
                expression: attrValue,
                name: directiveName,
            });
            node.removeAttribute(attrName);
        } else {
            this.bindAttribute(node, attribute);
        }
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * compile element node
 *
 * @param {Node} node
 */</span>
Compile.compile.elementNodes = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">const</span> bindSymbol = <span class="hljs-string">`:`</span>;
    <span class="hljs-keyword">let</span> attributes = [].slice.call(node.attributes),
        attrName = <span class="hljs-string">``</span>,
        attrValue = <span class="hljs-string">``</span>,
        directiveName = <span class="hljs-string">``</span>;

    attributes.map(<span class="hljs-function"><span class="hljs-params">attribute</span> =&gt;</span> {
        attrName = attribute.name;
        attrValue = attribute.value.trim();

        <span class="hljs-keyword">if</span> (attrName.indexOf(bindSymbol) === <span class="hljs-number">0</span> &amp;&amp; attrValue !== <span class="hljs-string">''</span>) {
            directiveName = attrName.slice(bindSymbol.length);

            <span class="hljs-keyword">this</span>.bindDirective({
                node,
                <span class="hljs-attr">expression</span>: attrValue,
                <span class="hljs-attr">name</span>: directiveName,
            });
            node.removeAttribute(attrName);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.bindAttribute(node, attribute);
        }
    });
};</code></pre>
<p>噢忘记说了，这里我参考了 <code>Vue</code> 的指令语法，就是在带有冒号 <code>:</code> 的属性名中（当然这里也可以是任何其他你所喜欢的符号），可以直接写 JavaScript 的表达式，然后也会提供几个特殊的指令，例如 <code>:text</code>, <code>:show</code> 等等来对元素做一些不同的操作。</p>
<p>其实该函数只做了两件事：</p>
<ul>
<li><p>遍历该节点的所有属性，通过判断属性类型的不同来做不同的操作，判断的标准就是属性名是否是冒号 <code>:</code> 开头并且属性的值不为空；</p></li>
<li><p>绑定相应的指令去更新属性。</p></li>
</ul>
<h2 id="articleHeader3">Directive</h2>
<p>其次，再看一下 <code>Directive</code> 内部是如何实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import directives from './directives';
import { generate } from './compile/generate';

export default function Directive(options = {}) {
    Object.assign(this, options);
    Object.assign(this, directives[this.name]);
    this.beforeUpdate &amp;&amp; this.beforeUpdate();
    this.update &amp;&amp; this.update(generate(this.expression)(this.compile.options.data));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> directives <span class="hljs-keyword">from</span> <span class="hljs-string">'./directives'</span>;
<span class="hljs-keyword">import</span> { generate } <span class="hljs-keyword">from</span> <span class="hljs-string">'./compile/generate'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Directive</span>(<span class="hljs-params">options = {}</span>) </span>{
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, options);
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, directives[<span class="hljs-keyword">this</span>.name]);
    <span class="hljs-keyword">this</span>.beforeUpdate &amp;&amp; <span class="hljs-keyword">this</span>.beforeUpdate();
    <span class="hljs-keyword">this</span>.update &amp;&amp; <span class="hljs-keyword">this</span>.update(generate(<span class="hljs-keyword">this</span>.expression)(<span class="hljs-keyword">this</span>.compile.options.data));
}</code></pre>
<p><code>Directive</code> 做了三件事：</p>
<ul>
<li><p>注册指令（<code>Object.assign(this, directives[this.name])</code>）；</p></li>
<li><p>计算指令表达式的实际值（<code>generate(this.expression)(this.compile.options.data)</code>）；</p></li>
<li><p>把计算出来的实际值更新到 DOM 上面(<code>this.update()</code>)。</p></li>
</ul>
<p>在介绍指令之前，先看一下它的用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Compile.prototype.bindDirective = function (options) {
    new Directive({
        ...options,
        compile: this,
    });
};

Compile.prototype.bindAttribute = function (node, attribute) {
    if (!hasInterpolation(attribute.value) || attribute.value.trim() == '') return false;

    this.bindDirective({
        node,
        name: 'attribute',
        expression: parse.text(attribute.value),
        attrName: attribute.name,
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Compile.prototype.bindDirective = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    <span class="hljs-keyword">new</span> Directive({
        ...options,
        <span class="hljs-attr">compile</span>: <span class="hljs-keyword">this</span>,
    });
};

Compile.prototype.bindAttribute = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node, attribute</span>) </span>{
    <span class="hljs-keyword">if</span> (!hasInterpolation(attribute.value) || attribute.value.trim() == <span class="hljs-string">''</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">this</span>.bindDirective({
        node,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'attribute'</span>,
        <span class="hljs-attr">expression</span>: parse.text(attribute.value),
        <span class="hljs-attr">attrName</span>: attribute.name,
    });
};</code></pre>
<p><code>bindDirective</code> 对 <code>Directive</code> 做了一个非常简单的封装，接受三个必填属性：</p>
<ul>
<li><p><code>node</code>: 当前所编译的节点，在 <code>Directive</code> 的 <code>update</code> 方法中用来更新当前节点；</p></li>
<li><p><code>name</code>: 当前所绑定的指令名称，用来区分具体使用哪个指令更新器来更新视图；</p></li>
<li><p><code>expression</code>: parse 之后的 JavaScript 的表达式。</p></li>
</ul>
<h3 id="articleHeader4">updater</h3>
<p>在 <code>Directive</code> 内部我们通过 <code>Object.assign(this, directives[this.name]);</code> 来注册不同的指令，所以变量 <code>directives</code> 的值可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// directives
export default {
    // directive `:show`
    show: {
        beforeUpdate() {},
        update(show) {
            this.node.style.display = show ? `block` : `none`;
        },
    },
    // directive `:text`
    text: {
        beforeUpdate() {},
        update(value) {
            // ...
        },
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// directives</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// directive `:show`</span>
    show: {
        beforeUpdate() {},
        update(show) {
            <span class="hljs-keyword">this</span>.node.style.display = show ? <span class="hljs-string">`block`</span> : <span class="hljs-string">`none`</span>;
        },
    },
    <span class="hljs-comment">// directive `:text`</span>
    text: {
        beforeUpdate() {},
        update(value) {
            <span class="hljs-comment">// ...</span>
        },
    },
};</code></pre>
<p>所以假设某个指令的名字是 <code>show</code> 的话，那么 <code>Object.assign(this, directives[this.name]);</code> 就等同于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.assign(this, {
    beforeUpdate() {},
    update(show) {
        this.node.style.display = show ? `block` : `none`;
    },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>, {
    beforeUpdate() {},
    update(show) {
        <span class="hljs-keyword">this</span>.node.style.display = show ? <span class="hljs-string">`block`</span> : <span class="hljs-string">`none`</span>;
    },
});</code></pre>
<p>表示对于指令 <code>show</code>，指令更新器会改变该元素 <code>style</code> 的 <code>display</code> 值，从而实现对应的功能。所以你会发现，整个编译器结构设计好后，如果我们要拓展功能的话，只需简单地编写指令的更新器即可，这里再以指令 <code>text</code> 举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// directives
export default {
    // directive `:show`
    // show: { ... },
    // directive `:text`
    text: {
        update(value) {
            this.node.textContent = value;
        },
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// directives</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// directive `:show`</span>
    <span class="hljs-comment">// show: { ... },</span>
    <span class="hljs-comment">// directive `:text`</span>
    text: {
        update(value) {
            <span class="hljs-keyword">this</span>.node.textContent = value;
        },
    },
};</code></pre>
<p>有没有发现编写一个指令其实非常的简单，然后我们就可以这么使用我们的 <code>text</code> 指令了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compiled = Compile(`<h1 :text=&quot;'Hey ?, ' + greeting&quot;></h1>`, {
    greeting: `Hello World`,
});
compiled.view // => `<h1>Hey ?, Hello World</h1>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> compiled = Compile(<span class="hljs-string">`&lt;h1 :text="'Hey ?, ' + greeting"&gt;&lt;/h1&gt;`</span>, {
    <span class="hljs-attr">greeting</span>: <span class="hljs-string">`Hello World`</span>,
});
compiled.view <span class="hljs-comment">// =&gt; `&lt;h1&gt;Hey ?, Hello World&lt;/h1&gt;`</span></code></pre>
<h3 id="articleHeader5">generate</h3>
<p>讲到这里，其实还有一个非常重要的点没有提到，就是我们如何把 <code>data</code> 真实数据渲染到模板中，比如 <code>&lt;h1&gt;Hey ?, "{{" greeting "}}"&lt;/h1&gt;</code> 如何渲染成 <code>&lt;h1&gt;Hey ?, Hello World&lt;/h1&gt;</code>，通过下面三个步骤即可计算出表达式的真实数据：</p>
<ul>
<li><p>把 <code>&lt;h1&gt;Hey ?, "{{" greeting "}}"&lt;/h1&gt;</code> 解析成 <code>'Hey ?, ' + greeting</code> 这样的 JavaScript 表达式；</p></li>
<li><p>提取其中的依赖变量并取得所在 <code>data</code> 中的对应值；</p></li>
<li><p>利用 <code>new Function()</code> 来创建一个匿名函数来返回这个表达式；</p></li>
<li><p>最后通过调用这个匿名函数来返回最终计算出来的数据并通过指令的 <code>update</code> 方法更新到视图中。</p></li>
</ul>
<h4>parse text</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reference: https://github.com/vuejs/vue/blob/dev/src/compiler/parser/text-parser.js#L15-L41
const tagRE = /\{\{((?:.|\n)+?)\}\}/g;
function parse(text) {
    if (!tagRE.test(text)) return JSON.stringify(text);

    const tokens = [];
    let lastIndex = tagRE.lastIndex = 0;
    let index, matched;

    while (matched = tagRE.exec(text)) {
        index = matched.index;
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(matched[1].trim());
        lastIndex = index + matched[0].length;
    }

    if (lastIndex < text.length) tokens.push(JSON.stringify(text.slice(lastIndex)));

    return tokens.join('+');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// reference: https://github.com/vuejs/vue/blob/dev/src/compiler/parser/text-parser.js#L15-L41</span>
<span class="hljs-keyword">const</span> tagRE = <span class="hljs-regexp">/\{\{((?:.|\n)+?)\}\}/g</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parse</span>(<span class="hljs-params">text</span>) </span>{
    <span class="hljs-keyword">if</span> (!tagRE.test(text)) <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.stringify(text);

    <span class="hljs-keyword">const</span> tokens = [];
    <span class="hljs-keyword">let</span> lastIndex = tagRE.lastIndex = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> index, matched;

    <span class="hljs-keyword">while</span> (matched = tagRE.exec(text)) {
        index = matched.index;
        <span class="hljs-keyword">if</span> (index &gt; lastIndex) {
            tokens.push(<span class="hljs-built_in">JSON</span>.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(matched[<span class="hljs-number">1</span>].trim());
        lastIndex = index + matched[<span class="hljs-number">0</span>].length;
    }

    <span class="hljs-keyword">if</span> (lastIndex &lt; text.length) tokens.push(<span class="hljs-built_in">JSON</span>.stringify(text.slice(lastIndex)));

    <span class="hljs-keyword">return</span> tokens.join(<span class="hljs-string">'+'</span>);
}</code></pre>
<p>该函数我是直接参考 <code>Vue</code> 的实现，它会把含有双花括号的字符串解析成标准的 JavaScript 表达式，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parse(`Hi "{{" user.name "}}", "{{" colon "}}" is awesome.`);
// => 'Hi ' + user.name + ', ' + colon + ' is awesome.'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">parse(<span class="hljs-string">`Hi "{{" user.name "}}", "{{" colon "}}" is awesome.`</span>);
<span class="hljs-comment">// =&gt; 'Hi ' + user.name + ', ' + colon + ' is awesome.'</span></code></pre>
<h4>extract dependency</h4>
<p>我们会通过下面这个函数来提取出一个表达式中可能存在的变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dependencyRE = /&quot;[^&quot;]*&quot;|'[^']*'|\.\w*[a-zA-Z$_]\w*|\w*[a-zA-Z$_]\w*:|(\w*[a-zA-Z$_]\w*)/g;
const globals = [
    'true', 'false', 'undefined', 'null', 'NaN', 'isNaN', 'typeof', 'in',
    'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'unescape',
    'escape', 'eval', 'isFinite', 'Number', 'String', 'parseFloat', 'parseInt',
];

function extractDependencies(expression) {
    const dependencies = [];

    expression.replace(dependencyRE, (match, dependency) => {
        if (
            dependency !== undefined &amp;&amp;
            dependencies.indexOf(dependency) === -1 &amp;&amp;
            globals.indexOf(dependency) === -1
        ) {
            dependencies.push(dependency);
        }
    });

    return dependencies;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dependencyRE = <span class="hljs-regexp">/"[^"]*"|'[^']*'|\.\w*[a-zA-Z$_]\w*|\w*[a-zA-Z$_]\w*:|(\w*[a-zA-Z$_]\w*)/g</span>;
<span class="hljs-keyword">const</span> globals = [
    <span class="hljs-string">'true'</span>, <span class="hljs-string">'false'</span>, <span class="hljs-string">'undefined'</span>, <span class="hljs-string">'null'</span>, <span class="hljs-string">'NaN'</span>, <span class="hljs-string">'isNaN'</span>, <span class="hljs-string">'typeof'</span>, <span class="hljs-string">'in'</span>,
    <span class="hljs-string">'decodeURI'</span>, <span class="hljs-string">'decodeURIComponent'</span>, <span class="hljs-string">'encodeURI'</span>, <span class="hljs-string">'encodeURIComponent'</span>, <span class="hljs-string">'unescape'</span>,
    <span class="hljs-string">'escape'</span>, <span class="hljs-string">'eval'</span>, <span class="hljs-string">'isFinite'</span>, <span class="hljs-string">'Number'</span>, <span class="hljs-string">'String'</span>, <span class="hljs-string">'parseFloat'</span>, <span class="hljs-string">'parseInt'</span>,
];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extractDependencies</span>(<span class="hljs-params">expression</span>) </span>{
    <span class="hljs-keyword">const</span> dependencies = [];

    expression.replace(dependencyRE, (match, dependency) =&gt; {
        <span class="hljs-keyword">if</span> (
            dependency !== <span class="hljs-literal">undefined</span> &amp;&amp;
            dependencies.indexOf(dependency) === <span class="hljs-number">-1</span> &amp;&amp;
            globals.indexOf(dependency) === <span class="hljs-number">-1</span>
        ) {
            dependencies.push(dependency);
        }
    });

    <span class="hljs-keyword">return</span> dependencies;
}</code></pre>
<p>通过正则表达式 <code>dependencyRE</code> 匹配出可能的变量依赖后，还要进行一些对比，比如是否是全局变量等等。效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extractDependencies(`typeof String(name) === 'string'  &amp;&amp; 'Hello ' + world + '! ' + hello.split('').join('') + '.'`);
// => [&quot;name&quot;, &quot;world&quot;, &quot;hello&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">extractDependencies(<span class="hljs-string">`typeof String(name) === 'string'  &amp;&amp; 'Hello ' + world + '! ' + hello.split('').join('') + '.'`</span>);
<span class="hljs-comment">// =&gt; ["name", "world", "hello"]</span></code></pre>
<p>这正是我们需要的结果，<code>typeof</code>, <code>String</code>, <code>split</code> 和 <code>join</code> 并不是 <code>data</code> 中所依赖的变量，所以不需要被提取出来。</p>
<h4>generate</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function generate(expression) {
    const dependencies = extractDependencies(expression);
    let dependenciesCode = '';

    dependencies.map(dependency => dependenciesCode += `var ${dependency} = this.get(&quot;${dependency}&quot;); `);

    return new Function(`data`, `${dependenciesCode}return ${expression};`);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generate</span>(<span class="hljs-params">expression</span>) </span>{
    <span class="hljs-keyword">const</span> dependencies = extractDependencies(expression);
    <span class="hljs-keyword">let</span> dependenciesCode = <span class="hljs-string">''</span>;

    dependencies.map(<span class="hljs-function"><span class="hljs-params">dependency</span> =&gt;</span> dependenciesCode += <span class="hljs-string">`var <span class="hljs-subst">${dependency}</span> = this.get("<span class="hljs-subst">${dependency}</span>"); `</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">`data`</span>, <span class="hljs-string">`<span class="hljs-subst">${dependenciesCode}</span>return <span class="hljs-subst">${expression}</span>;`</span>);
}</code></pre>
<p>我们提取变量的目的就是为了在 <code>generate</code> 函数中生成相应的变量赋值的字符串便于在 <code>generate</code> 函数中使用，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Function(`data`, `
    var name = data[&quot;name&quot;];
    var world = data[&quot;world&quot;];
    var hello = data[&quot;hello&quot;];
    return typeof String(name) === 'string'  &amp;&amp; 'Hello ' + world + '! ' + hello.split('').join('') + '.';
`);

// will generated:

function anonymous(data) {
    var name = data[&quot;name&quot;];
    var world = data[&quot;world&quot;];
    var hello = data[&quot;hello&quot;];
    return typeof String(name) === 'string'  &amp;&amp; 'Hello ' + world + '! ' + hello.split('').join('') + '.';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span>(<span class="hljs-string">`data`</span>, <span class="hljs-string">`
    var name = data["name"];
    var world = data["world"];
    var hello = data["hello"];
    return typeof String(name) === 'string'  &amp;&amp; 'Hello ' + world + '! ' + hello.split('').join('') + '.';
`</span>);

<span class="hljs-comment">// will generated:</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anonymous</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> name = data[<span class="hljs-string">"name"</span>];
    <span class="hljs-keyword">var</span> world = data[<span class="hljs-string">"world"</span>];
    <span class="hljs-keyword">var</span> hello = data[<span class="hljs-string">"hello"</span>];
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">String</span>(name) === <span class="hljs-string">'string'</span>  &amp;&amp; <span class="hljs-string">'Hello '</span> + world + <span class="hljs-string">'! '</span> + hello.split(<span class="hljs-string">''</span>).join(<span class="hljs-string">''</span>) + <span class="hljs-string">'.'</span>;
}</code></pre>
<p>这样的话，只需要在调用这个匿名函数的时候传入对应的 <code>data</code> 即可获得我们想要的结果了。现在回过头来看之前的 <code>Directive</code> 部分代码应该就一目了然了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Directive {
    constructor(options = {}) {
        // ...
        this.beforeUpdate &amp;&amp; this.beforeUpdate();
        this.update &amp;&amp; this.update(generate(this.expression)(this.compile.data));
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Directive</span> </span>{
    <span class="hljs-keyword">constructor</span>(options = {}) {
        <span class="hljs-comment">// ...</span>
        <span class="hljs-keyword">this</span>.beforeUpdate &amp;&amp; <span class="hljs-keyword">this</span>.beforeUpdate();
        <span class="hljs-keyword">this</span>.update &amp;&amp; <span class="hljs-keyword">this</span>.update(generate(<span class="hljs-keyword">this</span>.expression)(<span class="hljs-keyword">this</span>.compile.data));
    }
}</code></pre>
<p><code>generate(this.expression)(this.compile.data)</code> 就是表达式经过 <code>this.compile.data</code> 计算后我们所需要的值。</p>
<h3 id="articleHeader6">compile text node</h3>
<p>我们前面只讲了如何编译 <code>node.nodeType === 1</code> 的元素节点，那么文字节点如何编译呢，其实理解了前面所讲的内容话，文字节点的编译就简单得不能再简单了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * compile text node
 *
 * @param {Node} node
 */
Compile.compile.textNodes = function (node) {
    if (node.textContent.trim() === '') return false;

    this.bindDirective({
        node,
        name: 'text',
        expression: parse.text(node.textContent),
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * compile text node
 *
 * @param {Node} node
 */</span>
Compile.compile.textNodes = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
    <span class="hljs-keyword">if</span> (node.textContent.trim() === <span class="hljs-string">''</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

    <span class="hljs-keyword">this</span>.bindDirective({
        node,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'text'</span>,
        <span class="hljs-attr">expression</span>: parse.text(node.textContent),
    });
};</code></pre>
<p>通过绑定 <code>text</code> 指令，并传入解析后的 JavaScript 表达式，在 <code>Directive</code> 内部就会计算出表达式实际的值并调用 <code>text</code> 的 <code>update</code> 函数更新视图完成渲染。</p>
<h2 id="articleHeader7">
<code>:each</code> 指令</h2>
<p>到目前为止，该模板引擎只实现了比较基本的功能，而最常见且重要的列表渲染功能还没有实现，所以我们现在要实现一个 <code>:each</code> 指令来渲染一个列表，这里可能要注意一下，不能按照前面两个指令的思路来实现，应该换一个角度来思考，列表渲染其实相当于一个「子模板」，里面的变量存在于 <code>:each</code> 指令所接收的 <code>data</code> 这个「局部作用域」中，这么说可能抽象，直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// :each updater
import Compile from 'path/to/compile.js';
export default {
    beforeUpdate() {
        this.placeholder = document.createComment(`:each`);
        this.node.parentNode.replaceChild(this.placeholder, this.node);
    },
    update() {
        if (data &amp;&amp; !Array.isArray(data)) return;

        const fragment = document.createDocumentFragment();

        data.map((item, index) => {
            const compiled = Compile(this.node.cloneNode(true), { item, index, });
            fragment.appendChild(compiled.view);
        });

        this.placeholder.parentNode.replaceChild(fragment, this.placeholder);
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// :each updater</span>
<span class="hljs-keyword">import</span> Compile <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/compile.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    beforeUpdate() {
        <span class="hljs-keyword">this</span>.placeholder = <span class="hljs-built_in">document</span>.createComment(<span class="hljs-string">`:each`</span>);
        <span class="hljs-keyword">this</span>.node.parentNode.replaceChild(<span class="hljs-keyword">this</span>.placeholder, <span class="hljs-keyword">this</span>.node);
    },
    update() {
        <span class="hljs-keyword">if</span> (data &amp;&amp; !<span class="hljs-built_in">Array</span>.isArray(data)) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">const</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();

        data.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> compiled = Compile(<span class="hljs-keyword">this</span>.node.cloneNode(<span class="hljs-literal">true</span>), { item, index, });
            fragment.appendChild(compiled.view);
        });

        <span class="hljs-keyword">this</span>.placeholder.parentNode.replaceChild(fragment, <span class="hljs-keyword">this</span>.placeholder);
    },
};</code></pre>
<p>在 <code>update</code> 之前，我们先把 <code>:each</code> 所在节点从 DOM 结构中去掉，但是要注意的是并不能直接去掉，而是要在去掉的位置插入一个 <code>comment</code> 类型的节点作为占位符，目的是为了在我们把列表数据渲染出来后，能找回原来的位置并把它插入到 DOM 中。</p>
<p>那具体如何编译这个所谓的「子模板」呢，首先，我们需要遍历 <code>:each</code> 指令所接收的 <code>Array</code> 类型的数据（目前只支持该类型，当然你也可以增加对 <code>Object</code> 类型的支持，原理是一样的）；其次，我们针对该列表的每一项数据进行一次模板的编译并把渲染后的模板插入到创建的 <code>document fragment</code> 中，当所有整个列表编译完后再把刚刚创建的 <code>comment</code> 类型的占位符替换为 <code>document fragment</code> 以完成列表的渲染。</p>
<p>此时，我们可以这么使用 <code>:each</code> 指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Compile(`<li :each=&quot;comments&quot; data-index=&quot;"{{" index "}}"&quot;>"{{" item.content "}}"</li>`, {
    comments: [{
        content: `Hello World.`,
    }, {
        content: `Just Awesome.`,
    }, {
        content: `WOW, Just WOW!`,
    }],
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Compile(<span class="hljs-string">`&lt;li :each="comments" data-index=""{{" index "}}""&gt;"{{" item.content "}}"&lt;/li&gt;`</span>, {
    <span class="hljs-attr">comments</span>: [{
        <span class="hljs-attr">content</span>: <span class="hljs-string">`Hello World.`</span>,
    }, {
        <span class="hljs-attr">content</span>: <span class="hljs-string">`Just Awesome.`</span>,
    }, {
        <span class="hljs-attr">content</span>: <span class="hljs-string">`WOW, Just WOW!`</span>,
    }],
});</code></pre>
<p>会渲染成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li data-index=&quot;0&quot;>Hello World.</li>
<li data-index=&quot;1&quot;>Just Awesome.</li>
<li data-index=&quot;2&quot;>WOW, Just WOW!</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">"0"</span>&gt;</span>Hello World.<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">"1"</span>&gt;</span>Just Awesome.<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">"2"</span>&gt;</span>WOW, Just WOW!<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>其实细心的话你会发现，模板中使用的 <code>item</code> 和 <code>index</code> 变量其实就是 <code>:each</code> 更新函数中 <code>Compile(template, data)</code> 编译器里的 <code>data</code> 值的两个 <code>key</code> 值。所以要自定义这两个变量也是非常简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// :each updater
import Compile from 'path/to/compile.js';
export default {
    beforeUpdate() {
        this.placeholder = document.createComment(`:each`);
        this.node.parentNode.replaceChild(this.placeholder, this.node);

        // parse alias
        this.itemName = `item`;
        this.indexName = `index`;
        this.dataName = this.expression;

        if (this.expression.indexOf(' in ') != -1) {
            const bracketRE = /\(((?:.|\n)+?)\)/g;
            const [item, data] = this.expression.split(' in ');
            let matched = null;

            if (matched = bracketRE.exec(item)) {
                const [item, index] = matched[1].split(',');
                index ? this.indexName = index.trim() : '';
                this.itemName = item.trim();
            } else {
                this.itemName = item.trim();
            }

            this.dataName = data.trim();
        }

        this.expression = this.dataName;
    },
    update() {
        if (data &amp;&amp; !Array.isArray(data)) return;

        const fragment = document.createDocumentFragment();

        data.map((item, index) => {
            const compiled = Compile(this.node.cloneNode(true), {
                [this.itemName]: item,
                [this.indexName]: index,
            });
            fragment.appendChild(compiled.view);
        });

        this.placeholder.parentNode.replaceChild(fragment, this.placeholder);
    },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// :each updater</span>
<span class="hljs-keyword">import</span> Compile <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/compile.js'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    beforeUpdate() {
        <span class="hljs-keyword">this</span>.placeholder = <span class="hljs-built_in">document</span>.createComment(<span class="hljs-string">`:each`</span>);
        <span class="hljs-keyword">this</span>.node.parentNode.replaceChild(<span class="hljs-keyword">this</span>.placeholder, <span class="hljs-keyword">this</span>.node);

        <span class="hljs-comment">// parse alias</span>
        <span class="hljs-keyword">this</span>.itemName = <span class="hljs-string">`item`</span>;
        <span class="hljs-keyword">this</span>.indexName = <span class="hljs-string">`index`</span>;
        <span class="hljs-keyword">this</span>.dataName = <span class="hljs-keyword">this</span>.expression;

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.expression.indexOf(<span class="hljs-string">' in '</span>) != <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">const</span> bracketRE = <span class="hljs-regexp">/\(((?:.|\n)+?)\)/g</span>;
            <span class="hljs-keyword">const</span> [item, data] = <span class="hljs-keyword">this</span>.expression.split(<span class="hljs-string">' in '</span>);
            <span class="hljs-keyword">let</span> matched = <span class="hljs-literal">null</span>;

            <span class="hljs-keyword">if</span> (matched = bracketRE.exec(item)) {
                <span class="hljs-keyword">const</span> [item, index] = matched[<span class="hljs-number">1</span>].split(<span class="hljs-string">','</span>);
                index ? <span class="hljs-keyword">this</span>.indexName = index.trim() : <span class="hljs-string">''</span>;
                <span class="hljs-keyword">this</span>.itemName = item.trim();
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.itemName = item.trim();
            }

            <span class="hljs-keyword">this</span>.dataName = data.trim();
        }

        <span class="hljs-keyword">this</span>.expression = <span class="hljs-keyword">this</span>.dataName;
    },
    update() {
        <span class="hljs-keyword">if</span> (data &amp;&amp; !<span class="hljs-built_in">Array</span>.isArray(data)) <span class="hljs-keyword">return</span>;

        <span class="hljs-keyword">const</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();

        data.map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> compiled = Compile(<span class="hljs-keyword">this</span>.node.cloneNode(<span class="hljs-literal">true</span>), {
                [<span class="hljs-keyword">this</span>.itemName]: item,
                [<span class="hljs-keyword">this</span>.indexName]: index,
            });
            fragment.appendChild(compiled.view);
        });

        <span class="hljs-keyword">this</span>.placeholder.parentNode.replaceChild(fragment, <span class="hljs-keyword">this</span>.placeholder);
    },
};</code></pre>
<p>这样一来我们就可以通过 <code>(aliasItem, aliasIndex) in items</code> 来自定义 <code>:each</code> 指令的 <code>item</code> 和 <code>index</code> 变量了，原理就是在 <code>beforeUpdate</code> 的时候去解析 <code>:each</code> 指令的表达式，提取相关的变量名，然后上面的例子就可以写成这样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Compile(`<li :each=&quot;(comment, index) in comments&quot; data-index=&quot;"{{" index "}}"&quot;>"{{" comment.content "}}"</li>`, {
    comments: [{
        content: `Hello World.`,
    }, {
        content: `Just Awesome.`,
    }, {
        content: `WOW, Just WOW!`,
    }],
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Compile(<span class="hljs-string">`&lt;li :each="(comment, index) in comments" data-index=""{{" index "}}""&gt;"{{" comment.content "}}"&lt;/li&gt;`</span>, {
    <span class="hljs-attr">comments</span>: [{
        <span class="hljs-attr">content</span>: <span class="hljs-string">`Hello World.`</span>,
    }, {
        <span class="hljs-attr">content</span>: <span class="hljs-string">`Just Awesome.`</span>,
    }, {
        <span class="hljs-attr">content</span>: <span class="hljs-string">`WOW, Just WOW!`</span>,
    }],
});</code></pre>
<h2 id="articleHeader8">Conclusion</h2>
<p>到这里，其实一个比较简单的模板引擎算是实现了，当然还有很多地方可以完善的，比如可以增加 <code>:class</code>, <code>:style</code>, <code>:if</code> 或 <code>:src</code> 等等你可以想到的指令功能，添加这些功能都是非常的简单的。</p>
<p>全篇介绍下来，整个核心无非就是遍历整个模板的节点树，其次针对每一个节点的字符串值来解析成对应的表达式，然后通过 <code>new Function()</code> 这个构造函数来计算成实际的值，最终通过指令的 <code>update</code> 函数来更新到视图上。</p>
<p>如果还是不清楚这些指令如何编写的话，可以参考我这个项目 <a href="https://github.com/colonjs/colon" rel="nofollow noreferrer" target="_blank">colon</a> 的相关源码（部分代码可能会有不影响理解的细微差别，可忽略），有任何问题都可以在 issue 上提。</p>
<p>目前有一个局限就是 DOM-based 的模板引擎只适用于浏览器端，目前笔者也正在实现兼容 Node 端的版本，思路是把字符串模板解析成 AST，然后把更新数据到 AST 上，最后再把 AST 转成字符串模板，实现出来后有空的话再来介绍一下 Node 端的实现。</p>
<p>最后，如果上面有说得不对或者有更好的实现方式的话，欢迎指出讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何实现一个基于 DOM 的模板引擎

## 原文链接
[https://segmentfault.com/a/1190000010556585](https://segmentfault.com/a/1190000010556585)


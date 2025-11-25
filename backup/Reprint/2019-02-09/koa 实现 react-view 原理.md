---
title: 'koa 实现 react-view 原理' 
date: 2019-02-09 2:30:59
hidden: true
slug: yy0fyfo853k
categories: [reprint]
---

{{< raw >}}

                    
<p>在之前我们有过一篇『React 同构实践与思考』的专栏文章，给读者实践了用 React 怎么实现同构。今天，其实讲的是在实现同构过程中看到过，可能非常容易被忽视更小的一个点 —— React View。</p>
<h2 id="articleHeader0">React View</h2>
<p>每一个 BS 架构的框架都会涉及到 View 层的展现，Koa 也不例外。我们在做 View 层的时候有两种做法，一种是做成插件形式，对于 View 来说就是模板引擎，另一种是做成中件间的形式。</p>
<p>再说到 React，常常有人说它是增强版的模板引擎。这种说法即对也不对。</p>
<p>从表象来看的确，React 可以替换变量，有条件判断，有循环判断，JSX 语法让渲染过程和 HTML 没什么两样，毕竟说到底 React 就是 JavaScript，而 React 所推崇的无状态函数，也彻彻底底把 React 变成了像是模板的样子。</p>
<p>从内在来看，React 它还是 JavaScript，它可以方便地做模块化管理，有内部状态，有自己的数据流。它可以做一部分 Controller，或者说，可以完全承担 Controller 的工作。</p>
<p>但是在服务端，我们需要模板是为了作 HTML 的同步请求，因此说地简单一些就只需要渲染成 HTML 的功能就可以了。当然，特殊的一点是，之所以让 React 作模板就是可以让服务端跑到客户端的渲染逻辑，并解决单页应用常常诟病的加载后白屏的问题。</p>
<p>言归正传，现在我们就带着 React View 怎么实现这个问题来解读源码。</p>
<h2 id="articleHeader1">React-View 源码解读</h2>
<h3 id="articleHeader2">配置</h3>
<p>配置是设计的源头之一，一切源码都可以从配置入手研究。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var defaultOptions = {
  doctype: '<!DOCTYPE html>',
  beautify: false,
  cache: process.env.NODE_ENV === 'production',
  extname: 'jsx',
  writeResp: true,
  views: path.join(__dirname, 'views'),
  internals: false
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> defaultOptions = {
  <span class="hljs-attr">doctype</span>: <span class="hljs-string">'&lt;!DOCTYPE html&gt;'</span>,
  <span class="hljs-attr">beautify</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">cache</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span>,
  <span class="hljs-attr">extname</span>: <span class="hljs-string">'jsx'</span>,
  <span class="hljs-attr">writeResp</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">views</span>: path.join(__dirname, <span class="hljs-string">'views'</span>),
  <span class="hljs-attr">internals</span>: <span class="hljs-literal">false</span>
};</code></pre>
<p>如果我们用过像 handlebars 或是 jade View，我们看到 React View 的配置与其它 View 的配置有几点不同。doctype、internals 这些配置都是其它模板引擎不会有的。</p>
<p>模板常用的配置应该是什么呢？</p>
<ol>
<li><p>viewPath，在上述配置指的是 view，就是 View 的目录在哪里，这是每一个模板插件或中间件都需要去配的。</p></li>
<li><p>extname，后缀名是什么，一般来说模板引擎都有自己独有的后缀，当然不排除可以有喜好选择的情况。比如对 React 而言，就可以写成是 <code>.jsx</code> 或 <code>.js</code> 两种不同的形式。</p></li>
<li><p>cache，我想一般模板引擎都会带 cache 功能，因为模板的解析是需要耗费资源的，而模板本身的改动的频度是非常低的。每当发布的时候，我们去刷新一次模板即可。但上述配置中的 cache 并不是指这个，我们等读源码时再来看。</p></li>
</ol>
<h3 id="articleHeader3">渲染</h3>
<p>标准的渲染过程其实非常的简单。对于 React 来说就是读取目录下的文件，像前端加载一样，require 那个文件。最后利用 ReactDOMServer 中的方法来渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var render = internals
  ? ReactDOMServer.renderToString
  : ReactDOMServer.renderToStaticMarkup;

...

var markup = options.doctype || '';
try {
  var component = require(filepath);
  // Transpiled ES6 may export components as { default: Component }
  component = component.default || component;
  markup += render(React.createElement(component, locals));
} catch (err) {
  err.code = 'REACT';
  throw err;
}

if (options.beautify) {
  // NOTE: This will screw up some things where whitespace is important, and be
  // subtly different than prod.
  markup = beautifyHTML(markup);
}

var writeResp = locals.writeResp === false
    ? false
    : (locals.writeResp || options.writeResp);
      
if (writeResp) {
  this.type = 'html';
  this.body = markup;
}

return markup" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> render = internals
  ? ReactDOMServer.renderToString
  : ReactDOMServer.renderToStaticMarkup;

...

var markup = options.doctype || <span class="hljs-string">''</span>;
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">var</span> component = <span class="hljs-built_in">require</span>(filepath);
  <span class="hljs-comment">// Transpiled ES6 may export components as { default: Component }</span>
  component = component.default || component;
  markup += render(React.createElement(component, locals));
} <span class="hljs-keyword">catch</span> (err) {
  err.code = <span class="hljs-string">'REACT'</span>;
  <span class="hljs-keyword">throw</span> err;
}

<span class="hljs-keyword">if</span> (options.beautify) {
  <span class="hljs-comment">// <span class="hljs-doctag">NOTE:</span> This will screw up some things where whitespace is important, and be</span>
  <span class="hljs-comment">// subtly different than prod.</span>
  markup = beautifyHTML(markup);
}

<span class="hljs-keyword">var</span> writeResp = locals.writeResp === <span class="hljs-literal">false</span>
    ? <span class="hljs-literal">false</span>
    : (locals.writeResp || options.writeResp);
      
<span class="hljs-keyword">if</span> (writeResp) {
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'html'</span>;
  <span class="hljs-keyword">this</span>.body = markup;
}

<span class="hljs-keyword">return</span> markup</code></pre>
<p>这里我们截取最关键的片段，正如我们预估的渲染过程一样。但我们看到，从流程上看有四个细节：</p>
<p><strong>设置 doctype 的目的</strong></p>
<p>在一般模板中我们很少看到将 doctype 放在配置中配置，但因为 React 的特殊性，让我们不得不这么做。原因很简单，React <code>render</code> 方法返回时一定需要一个包裹的元素，比如 div，ul，甚至 html，因此，我们需要手动去加 doctype。 </p>
<p><strong>渲染 React 组件</strong></p>
<p><code>renderToString</code> 和 <code>renderToStaticMarkup</code> 都是 'react-dom/server' 下的方法，与 <code>render</code> 不同，<code>render</code> 方法需要指定具体渲染到 DOM 上的节点，但那两个方法都只返回一段 HTML 字符串。这一点让 React 成为模板语言而存在。它们两个方法的区别在于：</p>
<ul>
<li><p><code>renderToString</code> 方法渲染的时候带有 <code>data-reactid</code> 属性，意味着可以做 server render，React 在前端会认识服务端渲染的内容，不会重新渲染 DOM 节点，开始执行 <code>componentDidMount</code> 继续执行后续生命周期。</p></li>
<li><p><code>renderToStaticMarkup</code> 方法渲染时没有 <code>data-reactid</code>，把 React 当做是纯模板来使用，这个时候只渲染 body 外的框架是比较合适的。</p></li>
</ul>
<p>在 <code>render</code> 方法里，我们看到 <code>React.createElement</code> 方法。是因为在服务端 <code>render</code> 方法没有 babel 编译，因此写的其实是 <code>&lt;component {...locals} /&gt;</code> 编译后的代码。</p>
<p><strong>美化 HTML</strong></p>
<p><code>options.beautify</code> 配置了我们是否要美化 HTML，默认时是关闭的。任何需要编译的模板引擎一般都会有类似的配置。在 Reat 中，因为 <code>render</code> 后的代码是一连串的字符串，返回到前台的时候都是无法阅读的代码。在有必要时，我们可以开启这个配置。</p>
<p><strong>绑定到上下文</strong></p>
<p>最后一步，尽管有一个开关控制，但我们看到最后是把内容绑定到 <code>this.body</code> 下的。 这里省略了整个实现过程是在 <code>app.context.render</code> 方法下，即是重写了 <code>app.context</code> 下的 <code>render</code> 方法，用于渲染 React。如果说 <code>app.context.render</code> 方法是 <code>function*</code>，那么我们的 react-view，就会变为中间件。</p>
<h3 id="articleHeader4">Cache</h3>
<p>我们从一开始就看到了配置中就有 cache 配置，这个 cache 是不是我们所想呢？我们来看下源代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// match function for cache clean
var match = createMatchFunction(options.views);

...

if (!options.cache) {
  cleanCache(match);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// match function for cache clean</span>
<span class="hljs-keyword">var</span> match = createMatchFunction(options.views);

...

if (!options.cache) {
  cleanCache(match);
}</code></pre>
<p>这里的 cache 指的是模板缓存么。事实上不完全是，我们来看一下 cleanCache 方法就明白了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function cleanCache(match) {
  Object.keys(require.cache).forEach(function(module) {
    if (match(require.cache[module].filename)) {
      delete require.cache[module];
    }
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cleanCache</span>(<span class="hljs-params">match</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">require</span>.cache).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
    <span class="hljs-keyword">if</span> (match(<span class="hljs-built_in">require</span>.cache[<span class="hljs-built_in">module</span>].filename)) {
      <span class="hljs-keyword">delete</span> <span class="hljs-built_in">require</span>.cache[<span class="hljs-built_in">module</span>];
    }
  });
}</code></pre>
<p>因为我们读取 React 文件用的是 <code>require</code> 方法，而在 Node 中 require 方法是有缓存的，Node 在每个第一次 Load Module 时就会将该 Module 缓存，存入全局的 _cache 中，在一般情况下我们当然需要这么做。但在模板加载这个情景下就不同了。</p>
<p>在这里的确我们全局缓存了 React 模板文件，但这个文件是编译前的文件。而我们需要缓存的是编译后的文件，也就是说 <code>markup</code> 是我们需要缓存的值。</p>
<p>在这里我们想想怎么去实现，方便起见，我们可以新增一个 <a href="https://github.com/isaacs/node-lru-cache" rel="nofollow noreferrer" target="_blank">lru-cache</a>，用它的好处是 lru 封装了很多关于 cache 时效与容量的开关。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var LRU = require(&quot;lru-cache&quot;);
var cache = LRU(this.options.cacheOptions);

...

if (options.cache &amp;&amp; cache.get(filepath)) {
  markup = cache.get(filepath);
} else {
  var markup = options.doctype || '';
  try {
    var component = require(filepath);
  } else {
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += render(React.createElement(component, locals));
    }
  } catch (err) {
    err.code = 'REACT';
    throw err;
  }

  // beautify ...
  
  if (options.cache) {
    cache.set(filepath, markup);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> LRU = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lru-cache"</span>);
<span class="hljs-keyword">var</span> cache = LRU(<span class="hljs-keyword">this</span>.options.cacheOptions);

...

if (options.cache &amp;&amp; cache.get(filepath)) {
  markup = cache.get(filepath);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">var</span> markup = options.doctype || <span class="hljs-string">''</span>;
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">var</span> component = <span class="hljs-built_in">require</span>(filepath);
  } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Transpiled ES6 may export components as { default: Component }</span>
      component = component.default || component;
      markup += render(React.createElement(component, locals));
    }
  } <span class="hljs-keyword">catch</span> (err) {
    err.code = <span class="hljs-string">'REACT'</span>;
    <span class="hljs-keyword">throw</span> err;
  }

  <span class="hljs-comment">// beautify ...</span>
  
  <span class="hljs-keyword">if</span> (options.cache) {
    cache.set(filepath, markup);
  }
}</code></pre>
<p>当然，我们现在这种情形下都需要清除 <code>require</code> 的 cache。</p>
<h3 id="articleHeader5">Babel</h3>
<p>我想很多开发者在写 React 组件的时候用的是 ES6 Class 来写的，而且会用到很多 ES6/ES7 的方法，不巧的是 Node 还不支持有些高级特性。因此就引到了一个话题，服务端怎么引用 babel？</p>
<p>在业务有 babel-node 这类解决方案，但这毕竟是一个实验性的 Node，我们不会拿生产环境去冒险。</p>
<p>在 koa/react-view 中间件内，有一段说明，它建议开发者在使用的时候加入 babel-register 作实时编译。关于这个问题，当然也可以写在中间件内，在加载模板前引入。随着 Node 对 ES6 方法支持的完善，也许有一天也用不到了。</p>
<h2 id="articleHeader6">总结</h2>
<p>其实，实现 View 非常简单，我们也从一些维度看到了设计一个 xx-view 的一般方法。在具体实现的时候，我们可以用一些更好的方法去做，比如用类来抽象 View，用 Promise 来描述过程。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa 实现 react-view 原理

## 原文链接
[https://segmentfault.com/a/1190000005345672](https://segmentfault.com/a/1190000005345672)


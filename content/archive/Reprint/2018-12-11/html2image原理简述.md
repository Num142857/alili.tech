---
title: 'html2image原理简述' 
date: 2018-12-11 2:30:10
hidden: true
slug: jmk982sw8qe
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013540928?w=1794&amp;h=648" src="https://static.alili.tech/img/remote/1460000013540928?w=1794&amp;h=648" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>看到 <a href="https://github.com/tj" rel="nofollow noreferrer" target="_blank">TJ 大神</a> star了<a href="https://github.com/tsayen/dom-to-image" rel="nofollow noreferrer" target="_blank">dom-to-image</a>，也一直很好奇<code>html</code>怎么转 <code>image</code> </p>
<p>那么就翻下源码，看下是如何实现的，其实一共就不到800行代码，还蛮容易读懂的</p>
<h2 id="articleHeader1">工作原理</h2>
<p>使用<code>svg</code>的一个特性，允许在<code>&lt;foreignobject&gt;</code>标签中包含任意的<code>html</code>内容。（主要是 <a href="https://developer.mozilla.org/zh-CN/docs/XMLSerializer" rel="nofollow noreferrer" target="_blank">XMLSerializer | MDN</a>这个<code>api</code>将<code>dom</code>转为<code>svg</code>）<br>所以，为了渲染那个<code>dom</code>节点，你需要采取以下步骤：</p>
<ol>
<li>递归 <code>clone</code> 原始的 <code>dom</code> 节点</li>
<li>获取 节点以及子节点 上的 <code>computed style</code>，并将这些样式添加进新建的style标签中（不要忘记了clone 伪元素的样式）</li>
<li>嵌入网页字体</li>
</ol>
<ul>
<li>找到所有的<code>@font-face</code>
</li>
<li>解析URL资源，并下载对应的资源</li>
<li>base64编码和内联资源 作为 <code>data:</code> URLS引用</li>
<li>把上面处理完的<code>css rules</code>全部都放进<code>&lt;style&gt;</code>中，并把标签加入到clone的节点中去</li>
</ul>
<ol><li>内嵌图片</li></ol>
<ul>
<li>内联图片src 的url 进 <code>&lt;img&gt;元素</code>
</li>
<li>背景图片 使用 background css 属性，类似fonts的使用方式</li>
</ul>
<ol>
<li>序列化 clone 的 dom 节点 为 <code>svg</code>
</li>
<li>将xml包装到<code>&lt;foreignobject&gt;</code>标签中，放入<code>svg</code>中，然后将其作为<code>data: url</code>
</li>
<li>将png内容或原始数据作为<code>uint8array</code>获取，使用svg作为源创建一个<code>img</code>标签，并将其渲染到新创建的<code>canvas</code>上，然后把<code>canvas</code>转为<code>base64</code>
</li>
<li>完成</li>
</ol>
<hr>
<h2 id="articleHeader2">核心API</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import domtoimage from 'dom-to-image'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> domtoimage <span class="hljs-keyword">from</span> <span class="hljs-string">'dom-to-image'</span></code></pre>
<p><strong>domtoimage</strong> 有如下一些方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    * toSvg (`dom` 转 `svg`)
    * toPng (`dom` 转 `png`)
    * toJpeg (`dom` 转 `jpg`)
    * toBlob (`dom` 转 `blob`)
    * toPixelData (`dom` 转 像素数据)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>    * toSvg (`dom` 转 `svg`)
    * toPng (`dom` 转 `png`)
    * toJpeg (`dom` 转 `jpg`)
    * toBlob (`dom` 转 `blob`)
    * toPixelData (`dom` 转 像素数据)
</code></pre>
<p>见名知意，名字取得非常好</p>
<p>下面我挑一个<code>toPng</code>来简单解析一下原理，其他的原理也都是类似的</p>
<hr>
<h2 id="articleHeader3">分析 toPng 原理</h2>
<blockquote>尽量挑最核心的讲，希望不会显得很繁琐，了解核心思想就好</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013540929?w=915&amp;h=404" src="https://static.alili.tech/img/remote/1460000013540929?w=915&amp;h=404" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>下面介绍几个核心函数：</p>
<ul>
<li>toPng （包装了draw函数，没啥意义）</li>
<li>Draw （dom =&gt; canvas）</li>
<li>toSvg  （dom =&gt; svg）</li>
<li>cloneNode （clone dom树和css样式）</li>
<li>makeSvgDataUri （dom =&gt; svg =&gt; data:uri）</li>
</ul>
<p>调用顺序为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="toPng 调用 Draw
Draw 调用 toSvg
toSvg 调用 cloneNode" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-keyword">to</span>Png 调用 Draw
Draw 调用 <span class="hljs-keyword">to</span>Svg
<span class="hljs-keyword">to</span>Svg 调用 cloneNode</code></pre>
<p><strong>toPng方法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 里面其实就是调用了 draw 方法，promise返回的是一个canvas对象
function toPng(node, options) {
    return draw(node, options || {})
        .then(function (canvas) {
            return canvas.toDataURL();
        });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 里面其实就是调用了 draw 方法，promise返回的是一个canvas对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toPng</span>(<span class="hljs-params">node, options</span>) </span>{
    <span class="hljs-keyword">return</span> draw(node, options || {})
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">canvas</span>) </span>{
            <span class="hljs-keyword">return</span> canvas.toDataURL();
        });
}</code></pre>
<p><strong>Draw方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw(domNode, options) {
    // 将 dom 节点转为 svg（data: url形式的svg）
    return toSvg(domNode, options)    
        // util.makeImage 将 canvas 转为 new Image(uri)
        .then(util.makeImage)
        .then(util.delay(100))
        .then(function (image) {
            var canvas = newCanvas(domNode);
            canvas.getContext('2d').drawImage(image, 0, 0);
            return canvas;
        });

    // 创建一个空的 canvas 节点
    function newCanvas(domNode) {
        var canvas = document.createElement('canvas');
        canvas.width = options.width || util.width(domNode);
        canvas.height = options.height || util.height(domNode);
          ......
        return canvas;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params">domNode, options</span>) </span>{
    <span class="hljs-comment">// 将 dom 节点转为 svg（data: url形式的svg）</span>
    <span class="hljs-keyword">return</span> toSvg(domNode, options)    
        <span class="hljs-comment">// util.makeImage 将 canvas 转为 new Image(uri)</span>
        .then(util.makeImage)
        .then(util.delay(<span class="hljs-number">100</span>))
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">image</span>) </span>{
            <span class="hljs-keyword">var</span> canvas = newCanvas(domNode);
            canvas.getContext(<span class="hljs-string">'2d'</span>).drawImage(image, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
            <span class="hljs-keyword">return</span> canvas;
        });

    <span class="hljs-comment">// 创建一个空的 canvas 节点</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newCanvas</span>(<span class="hljs-params">domNode</span>) </span>{
        <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
        canvas.width = options.width || util.width(domNode);
        canvas.height = options.height || util.height(domNode);
          ......
        return canvas;
    }
}</code></pre>
<p><strong>toSvg方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function toSvg (node, options) {
    options = options || {}
    // 设置一些默认值，如果option是空的话
    copyOptions(options)

    return (
      Promise.resolve(node)
        .then(function (node) {
          // clone dom 树
          return cloneNode(node, options.filter, true)
        })
        // 把字体相关的csstext 全部都新建一个 stylesheet 添加进去
        .then(embedFonts)
        // clone 处理图片啊，background url('')里面的资源，顺便加载好
        .then(inlineImages)
        // 把option 里面的一些 style 放进stylesheet里面
        .then(applyOptions)
        .then(function (clone) {
          // node 节点序列化成 svg
          return makeSvgDataUri(
            clone,
            // util.width 就是 getComputedStyle 获取节点的宽
            options.width || util.width(node),
            options.height || util.height(node)
          )
        })
    )
      // 设置一些默认值
    function applyOptions (clone) {
        ......
      return clone
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toSvg</span> (<span class="hljs-params">node, options</span>) </span>{
    options = options || {}
    <span class="hljs-comment">// 设置一些默认值，如果option是空的话</span>
    copyOptions(options)

    <span class="hljs-keyword">return</span> (
      <span class="hljs-built_in">Promise</span>.resolve(node)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
          <span class="hljs-comment">// clone dom 树</span>
          <span class="hljs-keyword">return</span> cloneNode(node, options.filter, <span class="hljs-literal">true</span>)
        })
        <span class="hljs-comment">// 把字体相关的csstext 全部都新建一个 stylesheet 添加进去</span>
        .then(embedFonts)
        <span class="hljs-comment">// clone 处理图片啊，background url('')里面的资源，顺便加载好</span>
        .then(inlineImages)
        <span class="hljs-comment">// 把option 里面的一些 style 放进stylesheet里面</span>
        .then(applyOptions)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">clone</span>) </span>{
          <span class="hljs-comment">// node 节点序列化成 svg</span>
          <span class="hljs-keyword">return</span> makeSvgDataUri(
            clone,
            <span class="hljs-comment">// util.width 就是 getComputedStyle 获取节点的宽</span>
            options.width || util.width(node),
            options.height || util.height(node)
          )
        })
    )
      <span class="hljs-comment">// 设置一些默认值</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyOptions</span> (<span class="hljs-params">clone</span>) </span>{
        ......
      return clone
    }
  }</code></pre>
<p><strong>cloneNode 方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function cloneNode (node, filter, root) {
    if (!root &amp;&amp; filter &amp;&amp; !filter(node)) return Promise.resolve()

    return (
      Promise.resolve(node)
        .then(makeNodeCopy)
        .then(function (clone) {
          return cloneChildren(node, clone, filter)
        })
        .then(function (clone) {
          return processClone(node, clone)
        })
    )
    // makeNodeCopy
    // 如果不是canvas 节点的话，就clone
    // 是的话，就返回 canvas转image的 img 对象
    function makeNodeCopy (node) {
      if (node instanceof HTMLCanvasElement) { return util.makeImage(node.toDataURL()) }
      return node.cloneNode(false)
    }
    // clone 子节点 （如果存在的话）
    function cloneChildren (original, clone, filter) {
      var children = original.childNodes
      if (children.length === 0) return Promise.resolve(clone)

      return cloneChildrenInOrder(clone, util.asArray(children), filter).then(
        function () {
          return clone
        }
      )
      // 递归 clone 节点
      function cloneChildrenInOrder (parent, children, filter) {
        var done = Promise.resolve()
        children.forEach(function (child) {
          done = done
            .then(function () {
              return cloneNode(child, filter)
            })
            .then(function (childClone) {
              if (childClone) parent.appendChild(childClone)
            })
        })
        return done
      }
    }
    
    // 处理添加dom的css，处理svg
    function processClone (original, clone) {
      if (!(clone instanceof Element)) return clone

      return Promise.resolve()
        // 读取节点的getComputedStyle，添加进css中
        .then(cloneStyle)
        // 获取伪类的css，添加进css
        .then(clonePseudoElements)
        // 读取 input textarea 的value
        .then(copyUserInput)
        // 设置svg 的 xmlns
        // 命名空间声明由xmlns属性提供。此属性表示<svg>标记及其子标记属于名称空间为“http://www.w3.org/2000/svg”的XML方言
        .then(fixSvg)
        .then(function () {
          return clone
        })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneNode</span> (<span class="hljs-params">node, filter, root</span>) </span>{
    <span class="hljs-keyword">if</span> (!root &amp;&amp; filter &amp;&amp; !filter(node)) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()

    <span class="hljs-keyword">return</span> (
      <span class="hljs-built_in">Promise</span>.resolve(node)
        .then(makeNodeCopy)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">clone</span>) </span>{
          <span class="hljs-keyword">return</span> cloneChildren(node, clone, filter)
        })
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">clone</span>) </span>{
          <span class="hljs-keyword">return</span> processClone(node, clone)
        })
    )
    <span class="hljs-comment">// makeNodeCopy</span>
    <span class="hljs-comment">// 如果不是canvas 节点的话，就clone</span>
    <span class="hljs-comment">// 是的话，就返回 canvas转image的 img 对象</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeNodeCopy</span> (<span class="hljs-params">node</span>) </span>{
      <span class="hljs-keyword">if</span> (node <span class="hljs-keyword">instanceof</span> HTMLCanvasElement) { <span class="hljs-keyword">return</span> util.makeImage(node.toDataURL()) }
      <span class="hljs-keyword">return</span> node.cloneNode(<span class="hljs-literal">false</span>)
    }
    <span class="hljs-comment">// clone 子节点 （如果存在的话）</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneChildren</span> (<span class="hljs-params">original, clone, filter</span>) </span>{
      <span class="hljs-keyword">var</span> children = original.childNodes
      <span class="hljs-keyword">if</span> (children.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(clone)

      <span class="hljs-keyword">return</span> cloneChildrenInOrder(clone, util.asArray(children), filter).then(
        <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> clone
        }
      )
      <span class="hljs-comment">// 递归 clone 节点</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cloneChildrenInOrder</span> (<span class="hljs-params">parent, children, filter</span>) </span>{
        <span class="hljs-keyword">var</span> done = <span class="hljs-built_in">Promise</span>.resolve()
        children.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">child</span>) </span>{
          done = done
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
              <span class="hljs-keyword">return</span> cloneNode(child, filter)
            })
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">childClone</span>) </span>{
              <span class="hljs-keyword">if</span> (childClone) parent.appendChild(childClone)
            })
        })
        <span class="hljs-keyword">return</span> done
      }
    }
    
    <span class="hljs-comment">// 处理添加dom的css，处理svg</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processClone</span> (<span class="hljs-params">original, clone</span>) </span>{
      <span class="hljs-keyword">if</span> (!(clone <span class="hljs-keyword">instanceof</span> Element)) <span class="hljs-keyword">return</span> clone

      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
        <span class="hljs-comment">// 读取节点的getComputedStyle，添加进css中</span>
        .then(cloneStyle)
        <span class="hljs-comment">// 获取伪类的css，添加进css</span>
        .then(clonePseudoElements)
        <span class="hljs-comment">// 读取 input textarea 的value</span>
        .then(copyUserInput)
        <span class="hljs-comment">// 设置svg 的 xmlns</span>
        <span class="hljs-comment">// 命名空间声明由xmlns属性提供。此属性表示&lt;svg&gt;标记及其子标记属于名称空间为“http://www.w3.org/2000/svg”的XML方言</span>
        .then(fixSvg)
        .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> clone
        })
</code></pre>
<blockquote>下面是这篇的重点 把 <code>html</code> 节点序列化成 <code>svg</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // node 节点序列化成 svg
  function makeSvgDataUri (node, width, height) {
    return Promise.resolve(node)
      .then(function (node) {
        node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')

        // XMLSerializer 对象使你能够把一个 XML 文档或 Node 对象转化或“序列化”为未解析的 XML 标记的一个字符串。
        // 要使用一个 XMLSerializer，使用不带参数的构造函数实例化它，然后调用其 serializeToString() 方法：
        return new XMLSerializer().serializeToString(node)
      })
      // escapeXhtml代码是string.replace(/#/g, '%23').replace(/\n/g, '%0A')
      .then(util.escapeXhtml)
      .then(function (xhtml) {
        return (
          '<foreignObject x=&quot;0&quot; y=&quot;0&quot; width=&quot;100%&quot; height=&quot;100%&quot;>' +
          xhtml +
          '</foreignObject>'
        )
      })
      // 变成svg
      .then(function (foreignObject) {
        return (
          '<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;' +
          width +
          '&quot; height=&quot;' +
          height +
          '&quot;>' +
          foreignObject +
          '</svg>'
        )
      })
      // 变成 data: url
      .then(function (svg) {
        return 'data:image/svg+xml;charset=utf-8,' + svg
      })
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// node 节点序列化成 svg</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeSvgDataUri</span> (<span class="hljs-params">node, width, height</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(node)
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
        node.setAttribute(<span class="hljs-string">'xmlns'</span>, <span class="hljs-string">'http://www.w3.org/1999/xhtml'</span>)

        <span class="hljs-comment">// XMLSerializer 对象使你能够把一个 XML 文档或 Node 对象转化或“序列化”为未解析的 XML 标记的一个字符串。</span>
        <span class="hljs-comment">// 要使用一个 XMLSerializer，使用不带参数的构造函数实例化它，然后调用其 serializeToString() 方法：</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> XMLSerializer().serializeToString(node)
      })
      <span class="hljs-comment">// escapeXhtml代码是string.replace(/#/g, '%23').replace(/\n/g, '%0A')</span>
      .then(util.escapeXhtml)
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">xhtml</span>) </span>{
        <span class="hljs-keyword">return</span> (
          <span class="hljs-string">'&lt;foreignObject x="0" y="0" width="100%" height="100%"&gt;'</span> +
          xhtml +
          <span class="hljs-string">'&lt;/foreignObject&gt;'</span>
        )
      })
      <span class="hljs-comment">// 变成svg</span>
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">foreignObject</span>) </span>{
        <span class="hljs-keyword">return</span> (
          <span class="hljs-string">'&lt;svg xmlns="http://www.w3.org/2000/svg" width="'</span> +
          width +
          <span class="hljs-string">'" height="'</span> +
          height +
          <span class="hljs-string">'"&gt;'</span> +
          foreignObject +
          <span class="hljs-string">'&lt;/svg&gt;'</span>
        )
      })
      <span class="hljs-comment">// 变成 data: url</span>
      .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">svg</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'data:image/svg+xml;charset=utf-8,'</span> + svg
      })
  }
</code></pre>
<h2 id="articleHeader4">参考链接</h2>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty" rel="nofollow noreferrer" target="_blank">CSSStyleDeclaration.setProperty() - Web API 接口 | MDN</a></li>
<li><a href="https://github.com/tsayen/dom-to-image" rel="nofollow noreferrer" target="_blank">dom-to-image</a></li>
<li><a href="http://www.w3school.com.cn/xmldom/dom_xmlserializer.asp" rel="nofollow noreferrer" target="_blank">XML DOM - XMLSerializer 对象</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html2image原理简述

## 原文链接
[https://segmentfault.com/a/1190000013540925](https://segmentfault.com/a/1190000013540925)


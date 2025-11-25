---
title: 'Javascript 将html转成pdf,下载,支持多页哦（html2canvas 和 jsPDF）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 5xu9zu3n74d
categories: [reprint]
---

{{< raw >}}

                    
<p>最近碰到个需求，需要把当前页面生成pdf，并下载。弄了几天，自己整理整理，记录下来，我觉得应该会有人需要 ：）</p>
<p><strong>项目源码地址</strong>：<a href="https://github.com/linwalker/render-html-to-pdf" rel="nofollow noreferrer" target="_blank">https://github.com/linwalker/...</a></p>
<h2 id="articleHeader0">html2canvas</h2>
<h4>简介</h4>
<p>我们可以直接在浏览器端使用html2canvas,对整个或局部页面进行‘截图’。但这并不是真的截图，而是通过遍历页面DOM结构，收集所有元素信息及相应样式，渲染出canvas image。</p>
<p>由于html2canvas只能将它能处理的生成canvas image，因此渲染出来的结果并不是100%与原来一致。但它不需要服务器参与，整个图片都由客户端浏览器生成，使用很方便。</p>
<h4>使用</h4>
<p>使用的API也很简洁，下面代码可以将某个元素渲染成canvas：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html2canvas(element, {
    onrendered: function(canvas) {
        // canvas is the final rendered <canvas> element
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">html2canvas(element, {
    <span class="hljs-attr">onrendered</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
        <span class="hljs-comment">// canvas is the final rendered &lt;canvas&gt; element</span>
    }
});</code></pre>
<p>通过onrendered方法，可以将生成的canvas进行回调，比如插入到页面中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html2canvas(element, {
    onrendered: function(canvas) {
       document.body.appendChild(canvas);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">html2canvas(element, {
    <span class="hljs-attr">onrendered</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
       <span class="hljs-built_in">document</span>.body.appendChild(canvas);
    }
});</code></pre>
<p>做个小例子代码如下，在线展示链接<a href="https://linwalker.github.io/render-html-to-pdf/demo1.html" rel="nofollow noreferrer" target="_blank">demo1</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
  <head>
    <title>html2canvas example</title>
    <style type=&quot;text/css&quot;>...</style>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li>one</li>
          ...
        </ul>
      </nav>
    </header>
    <section>
      <aside>
        <h3>it is a title</h3>
        <a href=&quot;&quot;>Stone Giant</a>
        ...
     </aside>
      <article>
        <img src=&quot;./Stone.png&quot;>
        <h2>Stone Giant</h2>
        <p>Coming ... </p>
        <p>以一团石头...</p>
      </article>
    </section>
    <footer>write by linwalker @2017</footer>
    <script type=&quot;text/javascript&quot; src=&quot;./html2canvas.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        html2canvas(document.body, {
          onrendered:function(canvas) {
            document.body.appendChild(canvas)
          }
        })
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>html2canvas example<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="undefined">...</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          ...
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>it is a title<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span>Stone Giant<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        ...
     <span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">article</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./Stone.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Stone Giant<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Coming ... <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>以一团石头...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>write by linwalker @2017<span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./html2canvas.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        html2canvas(<span class="hljs-built_in">document</span>.body, {
          <span class="hljs-attr">onrendered</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
            <span class="hljs-built_in">document</span>.body.appendChild(canvas)
          }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这个例子将页面body中的元素渲染成canvas，并插入到body中</p>
<h2 id="articleHeader1">jsPDF</h2>
<p>jsPDF库可以用于浏览器端生成PDF。</p>
<h4>文字生成PDF</h4>
<p>使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 默认a4大小，竖直方向，mm单位的PDF
var doc = new jsPDF();

// 添加文本‘Download PDF’
doc.text('Download PDF!', 10, 10);
doc.save('a4.pdf');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 默认a4大小，竖直方向，mm单位的PDF</span>
<span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">new</span> jsPDF();

<span class="hljs-comment">// 添加文本‘Download PDF’</span>
doc.text(<span class="hljs-string">'Download PDF!'</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
doc.save(<span class="hljs-string">'a4.pdf'</span>);</code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo2.html" rel="nofollow noreferrer" target="_blank">demo2</a></p>
<h4>图片生成PDF</h4>
<p>使用方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三个参数，第一个方向，第二个单位，第三个尺寸格式
var doc = new jsPDF('landscape','pt',[205, 115])

// 将图片转化为dataUrl
var imageData = ‘data:image/png;base64,iVBORw0KGgo...’;

doc.addImage(imageData, 'PNG', 0, 0, 205, 115);
doc.save('a4.pdf');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 三个参数，第一个方向，第二个单位，第三个尺寸格式</span>
<span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'landscape'</span>,<span class="hljs-string">'pt'</span>,[<span class="hljs-number">205</span>, <span class="hljs-number">115</span>])

<span class="hljs-comment">// 将图片转化为dataUrl</span>
<span class="hljs-keyword">var</span> imageData = ‘data:image/png;base64,iVBORw0KGgo...’;

doc.addImage(imageData, <span class="hljs-string">'PNG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">205</span>, <span class="hljs-number">115</span>);
doc.save(<span class="hljs-string">'a4.pdf'</span>);</code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo3.html" rel="nofollow noreferrer" target="_blank">demo3</a></p>
<h4>文字与图片生成PDF</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三个参数，第一个方向，第二个尺寸，第三个尺寸格式
var doc = new jsPDF('landscape','pt',[205, 155])

// 将图片转化为dataUrl
var imageData = ‘data:image/png;base64,iVBORw0KGgo...’;

//设置字体大小
doc.setFontSize(20);

//10,20这两参数控制文字距离左边，与上边的距离
doc.text('Stone', 10, 20);

// 0, 40, 控制文字距离左边，与上边的距离
doc.addImage(imageData, 'PNG', 0, 40, 205, 115);
doc.save('a4.pdf')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 三个参数，第一个方向，第二个尺寸，第三个尺寸格式</span>
<span class="hljs-keyword">var</span> doc = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">'landscape'</span>,<span class="hljs-string">'pt'</span>,[<span class="hljs-number">205</span>, <span class="hljs-number">155</span>])

<span class="hljs-comment">// 将图片转化为dataUrl</span>
<span class="hljs-keyword">var</span> imageData = ‘data:image/png;base64,iVBORw0KGgo...’;

<span class="hljs-comment">//设置字体大小</span>
doc.setFontSize(<span class="hljs-number">20</span>);

<span class="hljs-comment">//10,20这两参数控制文字距离左边，与上边的距离</span>
doc.text(<span class="hljs-string">'Stone'</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>);

<span class="hljs-comment">// 0, 40, 控制文字距离左边，与上边的距离</span>
doc.addImage(imageData, <span class="hljs-string">'PNG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">40</span>, <span class="hljs-number">205</span>, <span class="hljs-number">115</span>);
doc.save(<span class="hljs-string">'a4.pdf'</span>)</code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo4.html" rel="nofollow noreferrer" target="_blank">demo4</a></p>
<p>生成pdf需要把转化的元素添加到jsPDF实例中，也有添加html的功能，但某些元素无法生成在pdf中，因此可以使用html2canvas + jsPDF的方式将页面转成pdf。通过html2canvas将遍历页面元素，并渲染生成canvas，然后将canvas图片格式添加到jsPDF实例，生成pdf。</p>
<h2 id="articleHeader2">html2canvas + jsPDF</h2>
<h4>单页</h4>
<p>将demo1的例子修改下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;./js/jsPdf.debug.js&quot;></script>
<script type=&quot;text/javascript&quot;>
      var downPdf = document.getElementById(&quot;renderPdf&quot;);
      downPdf.onclick = function() {
          html2canvas(document.body, {
              onrendered:function(canvas) {

                  //返回图片dataURL，参数：图片格式和清晰度(0-1)
                  var pageData = canvas.toDataURL('image/jpeg', 1.0);

                  //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
                  var pdf = new jsPDF('', 'pt', 'a4');

                  //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                  pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );

                  pdf.save('stone.pdf');

              }
          })
      }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script type=<span class="hljs-string">"text/javascript"</span> src=<span class="hljs-string">"./js/jsPdf.debug.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
      <span class="hljs-keyword">var</span> downPdf = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"renderPdf"</span>);
      downPdf.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          html2canvas(<span class="hljs-built_in">document</span>.body, {
              <span class="hljs-attr">onrendered</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{

                  <span class="hljs-comment">//返回图片dataURL，参数：图片格式和清晰度(0-1)</span>
                  <span class="hljs-keyword">var</span> pageData = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>, <span class="hljs-number">1.0</span>);

                  <span class="hljs-comment">//方向默认竖直，尺寸ponits，格式a4[595.28,841.89]</span>
                  <span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">''</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>);

                  <span class="hljs-comment">//addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩</span>
                  pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">595.28</span>, <span class="hljs-number">592.28</span>/canvas.width * canvas.height );

                  pdf.save(<span class="hljs-string">'stone.pdf'</span>);

              }
          })
      }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo5.html" rel="nofollow noreferrer" target="_blank">demo5</a></p>
<p>如果页面内容根据a4比例转化后高度超过a4纸高度呢，生成的pdf会怎么样？会分页吗？</p>
<p>你可以试试，验证一下自己的想法: <a href="https://linwalker.github.io/render-html-to-pdf/demo6.html" rel="nofollow noreferrer" target="_blank">demo6</a></p>
<p>jsPDF提供了一个很有用的API，<code>addPage()</code>，我们可以通过<code>pdf.addPage()</code>，来添加一页pdf，然后通过<code>pdf.addImage(...)</code>，将图片赋予这页pdf来显示。</p>
<p>那么我们如何确定哪里分页？</p>
<p>这个问题好回答，我们可以设置一个<code>pageHeight</code>，超过这个高度的内容放入下一页pdf。</p>
<p>来捋一下思路，将html页面内容生成canvas图片，通过<code>addImage</code>将第一页图片添加到pdf中，超过一页内容，通过<code>addPage()</code>添加pdf页数,然后再通过<code>addImage</code>将下一页图片添加到pdf中。</p>
<p>嗯～，很好！巴特，难道没有发现问题吗？</p>
<p>这个方法实现的前提是 — — 我们能根据<code>pageHeight</code>先将整页内容生成的canvas图片分割成对应的小图片，然后一个萝卜一个坑，一页一页<code>addImage</code>进去。</p>
<p>What? 想一想我们的canvas是肿么来的，不用拉上去，直接看下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html2canvas(document.body, {
    onrendered:function(canvas) {
     //it is here we handle the canvas
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">html2canvas(<span class="hljs-built_in">document</span>.body, {
    <span class="hljs-attr">onrendered</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{
     <span class="hljs-comment">//it is here we handle the canvas</span>
    }
})</code></pre>
<p>这里的<code>body</code>就是要生成canvas的元素对象，一个元素生成一个canvas；那么我们需要一页一页的canvas，也就是说。。。</p>
<p>你觉得可能吗？ 我觉得不太现实，按这思路要获取页面上不同位置的DOM元素，然后通过<code>htnl2canvas(element,option)</code>来处理，先不说能不能刚好在每个<code>pageHeight</code>的位置刚好找到一个DOM元素，就算找到了，这样做累不累。</p>
<p>累的话    <br>：）可以看看下面这种方法</p>
<h4>多页</h4>
<p>我提供的思路是我们只生成一个canvas，对就一个，转化元素就是你要转成pdf内容的母元素，在这篇demo里就是<code>body</code>了；其他不变，也是超过一页内容就<code>addPage</code>，然后<code>addImage</code>,只不过这里添加的是同一个canvas。</p>
<p>当然这样做只会出现多页重复的pdf，那到底怎么实现正确分页显示。其实主要利用了jsPDF的两点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 超过jsPDF实例格式尺寸的内容不显示
（var pdf = new jsPDF('', 'pt', 'a4'); demo中就是a4纸的尺寸）
- addImage有两个参数可以控制图片在pdf中的位置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>- 超过jsPDF实例格式尺寸的内容不显示
（<span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> <span class="hljs-type">jsPDF</span>(<span class="hljs-string">''</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>); demo中就是a4纸的尺寸）
- addImage有两个参数可以控制图片在pdf中的位置
</code></pre>
<p>虽然每一页pdf上显示的图片是相同的，但我们通过调整图片的位置，产生了分页的错觉。以第二页为例，将竖直方向上的偏移设置为<code>-841.89</code>即一张a4纸的高度，又因为超过a4纸高度范围的图片不显示，所以第二页显示了图片竖直方向上[841.89,1682.78]范围内的内容，这就得到了分页的效果，以此类推。</p>
<p>还是看代码吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html2canvas(document.body, {
  onrendered:function(canvas) {

      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt', 'a4');

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
          while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if(leftHeight > 0) {
                pdf.addPage();
              }
          }
      }

      pdf.save('content.pdf');
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">html2canvas(<span class="hljs-built_in">document</span>.body, {
  <span class="hljs-attr">onrendered</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">canvas</span>) </span>{

      <span class="hljs-keyword">var</span> contentWidth = canvas.width;
      <span class="hljs-keyword">var</span> contentHeight = canvas.height;

      <span class="hljs-comment">//一页pdf显示html页面生成的canvas高度;</span>
      <span class="hljs-keyword">var</span> pageHeight = contentWidth / <span class="hljs-number">592.28</span> * <span class="hljs-number">841.89</span>;
      <span class="hljs-comment">//未生成pdf的html页面高度</span>
      <span class="hljs-keyword">var</span> leftHeight = contentHeight;
      <span class="hljs-comment">//页面偏移</span>
      <span class="hljs-keyword">var</span> position = <span class="hljs-number">0</span>;
      <span class="hljs-comment">//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高</span>
      <span class="hljs-keyword">var</span> imgWidth = <span class="hljs-number">595.28</span>;
      <span class="hljs-keyword">var</span> imgHeight = <span class="hljs-number">592.28</span>/contentWidth * contentHeight;

      <span class="hljs-keyword">var</span> pageData = canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>, <span class="hljs-number">1.0</span>);

      <span class="hljs-keyword">var</span> pdf = <span class="hljs-keyword">new</span> jsPDF(<span class="hljs-string">''</span>, <span class="hljs-string">'pt'</span>, <span class="hljs-string">'a4'</span>);

      <span class="hljs-comment">//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)</span>
      <span class="hljs-comment">//当内容未超过pdf一页显示的范围，无需分页</span>
      <span class="hljs-keyword">if</span> (leftHeight &lt; pageHeight) {
      pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, imgWidth, imgHeight );
      } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">while</span>(leftHeight &gt; <span class="hljs-number">0</span>) {
              pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">0</span>, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= <span class="hljs-number">841.89</span>;
              <span class="hljs-comment">//避免添加空白页</span>
              <span class="hljs-keyword">if</span>(leftHeight &gt; <span class="hljs-number">0</span>) {
                pdf.addPage();
              }
          }
      }

      pdf.save(<span class="hljs-string">'content.pdf'</span>);
  }
})</code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo7.html" rel="nofollow noreferrer" target="_blank">demo7</a></p>
<h4>两边留边距</h4>
<p>修改imgWidth，并且在addImage时x方向参数设置你要的边距，具体代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var imgWidth = 555.28;
var imgHeight = 555.28/contentWidth * contentHeight;
...
pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );
...
pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> imgWidth = <span class="hljs-number">555.28</span>;
<span class="hljs-keyword">var</span> imgHeight = <span class="hljs-number">555.28</span>/contentWidth * contentHeight;
...
pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">20</span>, <span class="hljs-number">0</span>, imgWidth, imgHeight );
...
pdf.addImage(pageData, <span class="hljs-string">'JPEG'</span>, <span class="hljs-number">20</span>, position, imgWidth, imgHeight);</code></pre>
<p>在线演示<a href="https://linwalker.github.io/render-html-to-pdf/demo8.html" rel="nofollow noreferrer" target="_blank">demo8</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript 将html转成pdf,下载,支持多页哦（html2canvas 和 jsPDF）

## 原文链接
[https://segmentfault.com/a/1190000009211079](https://segmentfault.com/a/1190000009211079)


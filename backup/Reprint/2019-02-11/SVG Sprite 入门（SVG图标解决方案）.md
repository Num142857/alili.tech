---
title: 'SVG Sprite 入门（SVG图标解决方案）' 
date: 2019-02-11 2:30:49
hidden: true
slug: o580jhaatc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVvef3" src="https://static.alili.tech/img/bVvef3" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关于浏览器图标解决方案，一直就有很多 <code>CSS Sprite</code>,<code>Icon Font</code>,<code>CSS Icon</code>以及<code>SVG</code>.相对而言svg矢量图标以及支持浏览器自身解析的优点，很多团队都已经在使用了。这篇文章主要说明svg图标的使用和制作。</p>
<ul>
<li><p><a href="http://events.jackpu.com/svg/index.html" rel="nofollow noreferrer" target="_blank">演示地址</a></p></li>
<li><p><a href="https://github.com/JackPu/svg-fonts" rel="nofollow noreferrer" target="_blank">代码</a></p></li>
</ul>
<h3 id="articleHeader0">SVG Sprite</h3>
<h4>传统的做法</h4>
<p>使用AI或者合并SVG图像，然后用<code>background-postion</code>;</p>
<p>打开AI，新建一个30 * 60(px)的画布，设置好网格和参考线.</p>
<p>用AI打开svg文件，然后复制路径到画布上调整大小</p>
<p><span class="img-wrap"><img data-src="/img/bVvenG" src="https://static.alili.tech/img/bVvenG" alt="ai-bg-01.jpg" title="ai-bg-01.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>其他就和css-sprite没有差异了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-bg{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(./res/svg-sprite-background.svg);
    background-size:100% 100%;
    vertical-align: middle;
}
.icon-facebook-logo{
    background-position: 0 0;
}
.icon-earth{
    background-position: 0 -30px;
}
.icon-like{
    background-position: 0 -60px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon-bg</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(./res/svg-sprite-background.svg);
    <span class="hljs-attribute">background-size</span>:<span class="hljs-number">100%</span> <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.icon-facebook-logo</span>{
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.icon-earth</span>{
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> -<span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.icon-like</span>{
    <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> -<span class="hljs-number">60px</span>;
}</code></pre>
<p>html 中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p class=&quot;btn-group&quot;>
    <a href=&quot;#&quot; class=&quot;btn btn-default&quot;><span class=&quot;icon-bg icon-facebook-logo&quot;></span></a>
    <a href=&quot;#&quot; class=&quot;btn btn-default&quot;><span class=&quot;icon-bg icon-earth&quot;></span></a>
    <a href=&quot;#&quot; class=&quot;btn btn-success&quot;><span class=&quot;icon-bg icon-like2&quot;></span></a>
</p> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-bg icon-facebook-logo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-default"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-bg icon-earth"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-bg icon-like2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span> </code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVven8" src="https://static.alili.tech/img/bVven8" alt="vued2496b2b29ace693a79940f47f21a3c06" title="vued2496b2b29ace693a79940f47f21a3c06" style="cursor: pointer; display: inline;"></span></p>
<h4>使用photoshop进行合并</h4>
<blockquote><p>可能很多图标是图形形状。</p></blockquote>
<ul>
<li><p>打开Photoshop 新建一个30 <em> 60 (px)的画布，我们计划30px </em> 30px,设置好网格或者参考线</p></li>
<li><p>用AI打开SVG文件，然后Ctrl+C 复制路径，然后复制到photoshop文档中，选择图层形状，然后再进行调整</p></li>
<li><p>选择 '文件' -&gt;'导出' -&gt; '路径到illustrator'</p></li>
<li><p>保存为SVG</p></li>
</ul>
<p>效果如下： </p>
<p><span class="img-wrap"><img data-src="/img/bVveoq" src="https://static.alili.tech/img/bVveoq" alt="vuede64a97a72dc92b054504a95030152cde" title="vuede64a97a72dc92b054504a95030152cde" style="cursor: pointer; display: inline;"></span></p>
<p>如果这样做，这似乎<strong>浪费了SVG的很多特性</strong>.</p>
<h3 id="articleHeader1">SVG Sprite的另外一种实现思路 <code>&lt;symbol&gt; +　&lt;use&gt;</code>
</h3>
<p>SVG &lt;symbol&gt;在svg中主要适用于定义可复用的符号，而这些定义在symbol元素的形状将不会被展示出来，而是通过use元素引用来显示。</p>
<p>在SVG中&lt;use&gt;可以在任何地方复用svg文件中定定义的的形，包括&lt;g&gt;和 &lt;symbol&gt;已经&lt;defs&gt;。</p>
<p>在使用 use 时，它必须要有一个id，这样 use 通过xlink:href的值找到该形状的引用。注意，一定要在前面加一个#，这样才能引用ID成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;300&quot; height=&quot;300&quot;>
      <defs>
        <g id=&quot;shape&quot;>
            <rect x=&quot;50&quot; y=&quot;50&quot; width=&quot;50&quot; height=&quot;50&quot; />
            <circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;50&quot; />
        </g>
      </defs>

      <use xlink:href=&quot;#shape&quot; x=&quot;50&quot; y=&quot;50&quot; />
      <use xlink:href=&quot;#shape&quot; x=&quot;200&quot; y=&quot;50&quot; />
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">defs</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"shape"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"50"</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"50"</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">defs</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#shape"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50"</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#shape"</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"50"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>在使用 <code>use</code> 时，它必须要有一个id,这样 <code>use</code> 通过<code>xlink:href</code>的值找到该形状的引用.注意，一定要在前面加一个#，这样才能引用ID成功。</p>
<p>首先我们使用PS+AI生成带有<code>symbol</code>的 SVG。</p>
<p>前面步骤与生成背景的图类似</p>
<p><span class="img-wrap"><img data-src="/img/bVveoP" src="https://static.alili.tech/img/bVveoP" alt="demo3-01.png" title="demo3-01.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>打开Symbols面板，在Window菜单栏中，或Shift+Ctrl+F11启用。然后，选中单个元素，点击添加。<br><span class="img-wrap"><img data-src="/img/bVveoT" src="https://static.alili.tech/img/bVveoT" alt="demo3-02.png" title="demo3-02.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>给符号命名，该名称即为引用的ID<br><span class="img-wrap"><img data-src="/img/bVvepu" src="https://static.alili.tech/img/bVvepu" alt="vuedaa1515e41b5e7a3599818c63bbdd9b88.png" title="vuedaa1515e41b5e7a3599818c63bbdd9b88.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>保存为SVG时，实际上生成的SVG代码并非我们要使用的，太过臃肿，可以到 <a href="http://www.zhangxinxu.com/sp/svg.html" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/sp/svg.html</a> 进行处理下，方便使用<a href="http://events.jackpu.com/svg/svg-code.txt" rel="nofollow noreferrer" target="_blank">查看DEMO3处理后的代码</a></p></li>
<li><p>在Html 里将SVG 放入，并隐藏;</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg style=&quot;display:none;&quot;>
    <symbol id=&quot;earth&quot; ... </path></symbol>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:none;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">symbol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"earth"</span> <span class="hljs-attr">...</span> &lt;/<span class="hljs-attr">path</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">symbol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg class=&quot;icon icon-facebook&quot;><use xlink:href=&quot;#facebook&quot;></use></svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon icon-facebook"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">use</span> <span class="hljs-attr">xlink:href</span>=<span class="hljs-string">"#facebook"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">use</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVvepQ" src="https://static.alili.tech/img/bVvepQ" alt="vued2f2040256b32bcb40da6feb1b61b1709" title="vued2f2040256b32bcb40da6feb1b61b1709" style="cursor: pointer;"></span></p>
<p>可以通过CSS去控制填充(fill)或者描边的颜色(stroke)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-blue{
        fill:#1ba1e2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon-blue</span>{
        <span class="hljs-attribute">fill</span>:<span class="hljs-number">#1ba1e2</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVverw" src="https://static.alili.tech/img/bVverw" alt="vuedbb9442f3b553f4a70f1912684aafcc51" title="vuedbb9442f3b553f4a70f1912684aafcc51" style="cursor: pointer;"></span></p>
<h4>使用 <a href="https://icomoon.io/app/" rel="nofollow noreferrer" target="_blank">icomoon</a> 制作SVG Sprite [推荐]</h4>
<p>icommon不仅可以生成icon fonts还可以生成SVG Sprite.</p>
<p><span class="img-wrap"><img data-src="/img/bVvepZ" src="https://static.alili.tech/img/bVvepZ" alt="demo4-01.png" title="demo4-01.png" style="cursor: pointer;"></span></p>
<p>文件下载完成解压可以得到的文件夹里面会有demo.html 可以直接打开源码参考使用.</p>
<p><span class="img-wrap"><img data-src="/img/bVvep5" src="https://static.alili.tech/img/bVvep5" alt="demo4-02.png" title="demo4-02.png" style="cursor: pointer;"></span></p>
<h4>使用svgstore生成SVG Sprite</h4>
<p><code>svgstore</code>是 grunt的一个插件，用于自动获取文件中的SVG文件并自动合并。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install grunt-svgstore --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install grunt-svgstore --save-dev</code></pre>
<p>安装成功后，可以在 node_modules中看到grunt-svgstore文件夹</p>
<p>可以新建一个项目，svg-demo1</p>
<p>在文件中新建一个 src 文件夹，并把需要合并的svg文件中放进去</p>
<p>然后新建package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;svg-store&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;private&quot;: true,
  &quot;devDependencies&quot;: {
    &quot;grunt&quot;: &quot;^0.4.5&quot;,
    &quot;grunt-svgstore&quot;: &quot;~0.5.0&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"svg-store"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-string">"private"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"grunt"</span>: <span class="hljs-string">"^0.4.5"</span>,
    <span class="hljs-string">"grunt-svgstore"</span>: <span class="hljs-string">"~0.5.0"</span>
  }
}</code></pre>
<p>然后新建Gruntfile.js,里面配置选项大致如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        svgstore: {
            options: {
              prefix : 'icon-', 
              svg: { 
                viewBox : '0 0 100 100',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              includedemo:true,
            },
            default : {
              files: {
                'dest/dest-svg.svg': ['src/*.svg'],
              },
            }

        }
    });
    // 载入grunt-svgstore
    grunt.loadNpmTasks('grunt-svgstore');
    // 注册任务
    grunt.registerTask('default', ['svgstore']);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">grunt</span>) </span>{
    <span class="hljs-comment">// 配置</span>
    grunt.initConfig({
        <span class="hljs-attr">svgstore</span>: {
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">prefix</span> : <span class="hljs-string">'icon-'</span>, 
              <span class="hljs-attr">svg</span>: { 
                <span class="hljs-attr">viewBox</span> : <span class="hljs-string">'0 0 100 100'</span>,
                <span class="hljs-attr">xmlns</span>: <span class="hljs-string">'http://www.w3.org/2000/svg'</span>
              },
              <span class="hljs-attr">includedemo</span>:<span class="hljs-literal">true</span>,
            },
            <span class="hljs-attr">default</span> : {
              <span class="hljs-attr">files</span>: {
                <span class="hljs-string">'dest/dest-svg.svg'</span>: [<span class="hljs-string">'src/*.svg'</span>],
              },
            }

        }
    });
    <span class="hljs-comment">// 载入grunt-svgstore</span>
    grunt.loadNpmTasks(<span class="hljs-string">'grunt-svgstore'</span>);
    <span class="hljs-comment">// 注册任务</span>
    grunt.registerTask(<span class="hljs-string">'default'</span>, [<span class="hljs-string">'svgstore'</span>]);
};</code></pre>
<p>接下来输入命令<code>npm install</code>;</p>
<p>自动加载依赖项目,再输入命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="grunt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">grunt</code></pre>
<p>这个时候可以看到一个合并的dest-svg.svg文件和一个dest-svg-demo.html文件，打开网页文件，你可以快速的使用这些svg icon了.</p>
<p>一些常见的配置说明:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="options.includedemo // 是否生成一个demo的html文件 一般还是写上比较好 
options.cleanup  //是否支持css 控制图标的fill和stroke属性等，可以传入一个数组实现自定义 ['fill','stroke-width' ...]
options.svg // 添加svg的一些属性在生成的svg文件中 viewBox: '0,0,100,100'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">options.includedemo <span class="hljs-comment">// 是否生成一个demo的html文件 一般还是写上比较好 </span>
options.cleanup  <span class="hljs-comment">//是否支持css 控制图标的fill和stroke属性等，可以传入一个数组实现自定义 ['fill','stroke-width' ...]</span>
options.svg <span class="hljs-comment">// 添加svg的一些属性在生成的svg文件中 viewBox: '0,0,100,100'</span></code></pre>
<p>更多选项:<a href="https://github.com/FWeinb/grunt-svgstore" rel="nofollow noreferrer" target="_blank">参考这里</a></p>
<h3 id="articleHeader2">小结</h3>
<p>借助第三方工具我们可以快速的制作svg sprite,相对其他方案，svg更加灵活，可控制，矢量显示等优点，在移动端以及部分pc站点上非常适用于图标解决方案。</p>
<p>扩展阅读: <a href="http://events.jackpu.com/svg/demo.html" rel="nofollow noreferrer" target="_blank">http://events.jackpu.com/svg/demo.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SVG Sprite 入门（SVG图标解决方案）

## 原文链接
[https://segmentfault.com/a/1190000005021285](https://segmentfault.com/a/1190000005021285)


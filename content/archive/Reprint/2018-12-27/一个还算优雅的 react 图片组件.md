---
title: '一个还算优雅的 react 图片组件' 
date: 2018-12-27 2:30:12
hidden: true
slug: 3kucyy3uyt2
categories: [reprint]
---

{{< raw >}}

                    
<p>写了一个还算优雅的图片组件<br>mult-transition-image-view</p>
<p>截图：<br><span class="img-wrap"><img data-src="/img/bVXv6Y?w=405&amp;h=720" src="https://static.alili.tech/img/bVXv6Y?w=405&amp;h=720" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">前言</h3>
<p>发现项目中的图片占位模块写得很不优雅，<br>找了一圈，发现没找到自己想要的图片组件。<br>于是自己写了一个。</p>
<h3 id="articleHeader1">功能简介</h3>
<p>首先它是一个比较优雅的组件：用起来不头疼。<br>第二个它能实现以下场景：</p>
<ol>
<li>没有图片的时候，显示一个占位图（可以直接用css来写背景，方便自定义）</li>
<li>希望在加载大图的时候，能先占位一张小图，然后再过渡到一张大图。类似上面的截图。</li>
</ol>
<h3 id="articleHeader2">使用方法</h3>
<p>安装npm 包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm install react-mult-transition-image-view" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    npm install react-mult-transition-image-view</code></pre>
<p>代码部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import ImageBoxView from 'react-mult-transition-image-view'

    <ImageBoxView img=&quot;#你的图片#&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    <span class="hljs-keyword">import</span> ImageBoxView <span class="hljs-keyword">from</span> <span class="hljs-string">'react-mult-transition-image-view'</span>

    &lt;ImageBoxView img=<span class="hljs-string">"#你的图片#"</span>/&gt;</code></pre>
<p>当然 你可以设置其他属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ImageBoxView
        width=&quot;320&quot;    // 
        height=&quot;200&quot;   // 宽高，会转化成 style 属性
        mode=&quot;style&quot;   // 使用 style 去显示图片（默认:img）
        img=&quot;#你要的图片#&quot;/>  // 图片路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    &lt;ImageBoxView
        <span class="hljs-built_in">width</span>=<span class="hljs-string">"320"</span>    <span class="hljs-comment">// </span>
        <span class="hljs-built_in">height</span>=<span class="hljs-string">"200"</span>   <span class="hljs-comment">// 宽高，会转化成 style 属性</span>
        mode=<span class="hljs-string">"style"</span>   <span class="hljs-comment">// 使用 style 去显示图片（默认:img）</span>
        img=<span class="hljs-string">"#你要的图片#"</span>/&gt;  <span class="hljs-comment">// 图片路径</span></code></pre>
<h4>小图过渡到大图的效果</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ImageBoxView
        animate=&quot;fade&quot; // 会触发动画样式(见下方样式部分 )
        mode=&quot;style&quot;   // 使用 style 去显示图片（默认:img）
        img={['#小图地址#', '#大图地址#']}/>  // img 传入数组形式。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>    &lt;ImageBoxView
        <span class="hljs-built_in">animate</span>=<span class="hljs-string">"fade"</span> <span class="hljs-comment">// 会触发动画样式(见下方样式部分 )</span>
        mode=<span class="hljs-string">"style"</span>   <span class="hljs-comment">// 使用 style 去显示图片（默认:img）</span>
        img={[<span class="hljs-string">'#小图地址#'</span>, <span class="hljs-string">'#大图地址#'</span>]}/&gt;  <span class="hljs-comment">// img 传入数组形式。</span></code></pre>
<h4>实现随机显示图片</h4>
<p>当有很多图片的时候，可以让图片随机时间显示，增加图片显示出来的体验<br>（一起出来真的有点丑）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ImageBoxView
        delay=&quot;100&quot;    // 延迟加载（默认：0），可以传入一个随机数
        img=&quot;#你要的图片#&quot;/>  // 图片路径" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    &lt;ImageBoxView
        <span class="hljs-built_in">delay</span>=<span class="hljs-string">"100"</span>    <span class="hljs-comment">// 延迟加载（默认：0），可以传入一个随机数</span>
        img=<span class="hljs-string">"#你要的图片#"</span>/&gt;  <span class="hljs-comment">// 图片路径</span></code></pre>
<h4>幻灯片效果</h4>
<p>因为 img 属性可以传入数组，所以 理论上可以加载很多图，实现幻灯片效果。<br>使用 wait 属性 来设置，每张图片加载后的等待时间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <ImageBoxView
        animate=&quot;fade&quot; // 会触发动画样式(见下方样式部分 )
        wait=&quot;100&quot;     // 每张图片加载完后，继续加载下一张的时间（默认：0）
        mode=&quot;style&quot;   // 使用 style 去显示图片（默认:img）
        img={['#图片1#', '#图片2#', '#图片3#']}/>  // img 传入数组形式。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>    &lt;ImageBoxView
        animate=<span class="hljs-string">"fade"</span> <span class="hljs-comment">// 会触发动画样式(见下方样式部分 )</span>
        <span class="hljs-keyword">wait</span>=<span class="hljs-string">"100"</span>     <span class="hljs-comment">// 每张图片加载完后，继续加载下一张的时间（默认：0）</span>
        mode=<span class="hljs-string">"style"</span>   <span class="hljs-comment">// 使用 style 去显示图片（默认:img）</span>
        img={[<span class="hljs-string">'#图片1#'</span>, <span class="hljs-string">'#图片2#'</span>, <span class="hljs-string">'#图片3#'</span>]}/&gt;  <span class="hljs-comment">// img 传入数组形式。</span></code></pre>
<h3 id="articleHeader3">样式部分</h3>
<p>别忘了样式部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".c-img-box{
    display:inline-block;
    width: 320px;
    height: 200px;
    background: #f7f6f5;
    position: relative;
    .img-hold{
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        img{
            width:100%;
            height:100%;
        }
        &amp;.img-animate{
            transition: opacity 0.5s;
        }
    }
    
    .img-cover{
        background: url('https://d.2dfire.com/om/images/menulist/7deb58da.default.png') no-repeat center/300px;
        background-color:#f0f0f0;
    }
    
    .img-cover,
    .img-hold,
    .img-hide{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
    }
    
    .img-hide{
        opacity: 0;
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="less hljs"><code class="less"><span class="hljs-selector-class">.c-img-box</span>{
    <span class="hljs-attribute">display</span>:inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f7f6f5</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-selector-class">.img-hold</span>{
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">background-size</span>: cover;
        <span class="hljs-attribute">background-repeat</span>: no-repeat;
        <span class="hljs-attribute">background-position</span>: center;
        <span class="hljs-selector-tag">img</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.img-animate</span>{
            <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">0.5s</span>;
        }
    }
    
    <span class="hljs-selector-class">.img-cover</span>{
        <span class="hljs-attribute">background</span>: url(<span class="hljs-string">'https://d.2dfire.com/om/images/menulist/7deb58da.default.png'</span>) no-repeat center/<span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#f0f0f0</span>;
    }
    
    <span class="hljs-selector-class">.img-cover</span>,
    <span class="hljs-selector-class">.img-hold</span>,
    <span class="hljs-selector-class">.img-hide</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-class">.img-hide</span>{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    
}</code></pre>
<h3 id="articleHeader4">TODO</h3>
<p>喜欢的就给个 star </p>
<p>github: <a href="https://github.com/qilei0529/react-mult-transition-image-view" rel="nofollow noreferrer" target="_blank">https://github.com/qilei0529/react-mult-transition-image-view</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个还算优雅的 react 图片组件

## 原文链接
[https://segmentfault.com/a/1190000011762388](https://segmentfault.com/a/1190000011762388)


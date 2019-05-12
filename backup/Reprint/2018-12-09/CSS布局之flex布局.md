---
title: 'CSS布局之flex布局' 
date: 2018-12-09 2:30:08
hidden: true
slug: 0zbtjgsda62
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近项目中涉及到手机端开发，那么flex布局是必不可少的，这里我来重新梳理一下</blockquote>
<h2 id="articleHeader0">1. 介绍</h2>
<p>flex布局也被成为伸缩盒布局，在flex布局模型中，flex容器的子元素可以在x轴或y轴上进行布局，并且子元素可以伸缩他们的大小，当容器中还有空间它们会伸展以填充容器未使用的空间，当容器空间缩小的时候，他们也会跟着缩小。</p>
<h2 id="articleHeader1">2. 应用</h2>
<h3 id="articleHeader2">2.0 基本概念</h3>
<p>主轴与交叉轴,主轴由flex-direction来定义，交叉轴是主轴的垂直方向的轴</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- flex-direction:row
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> flex-<span class="hljs-symbol">direction:</span>row
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6lTt?w=1058&amp;h=278" src="https://static.alili.tech/img/bV6lTt?w=1058&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6lT1?w=1340&amp;h=248" src="https://static.alili.tech/img/bV6lT1?w=1340&amp;h=248" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- flex-direction:column
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> flex-<span class="hljs-symbol">direction:</span>column
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6lUb?w=1326&amp;h=434" src="https://static.alili.tech/img/bV6lUb?w=1326&amp;h=434" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6lUe?w=1324&amp;h=490" src="https://static.alili.tech/img/bV6lUe?w=1324&amp;h=490" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">2.1 hello world</h3>
<p>伸缩盒布局的应用很简单，只需要为容器元素添加display: flex;即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <article class=&quot;container_1&quot;>
        <section>one</section>
        <section>
            two <br>
            two_1 <br>
            two_2 <br>    
            two_3 <br>
        </section>
        <section>three</section>
    </article>
    
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .container_1 {
            display: flex;
            justify-content: flex-start;
            /*平分容器，内容居中*/
            /*justify-content: space-around; */
            /*平分容器，内容显示在边缘，其余被空白占*/
            /*justify-content: space-between;*/
            /*内容居中*/
            /*justify-content: center;*/
        }
        .container_1 > section:nth-child(1){
            background-color: lightblue;
        }
        .container_1 > section:nth-child(2){
            background-color: pink;
        }
        .container_1 > section:nth-child(3){
            background-color: lightgreen;
        }
        .container_1 > section:nth-child(4){
            background-color: orange;
        }
    </style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container_1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>one<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
            two <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            two_1 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            two_2 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>    
            two_3 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.container_1</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">justify-content</span>: flex-start;
            <span class="hljs-comment">/*平分容器，内容居中*/</span>
            <span class="hljs-comment">/*justify-content: space-around; */</span>
            <span class="hljs-comment">/*平分容器，内容显示在边缘，其余被空白占*/</span>
            <span class="hljs-comment">/*justify-content: space-between;*/</span>
            <span class="hljs-comment">/*内容居中*/</span>
            <span class="hljs-comment">/*justify-content: center;*/</span>
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">background-color</span>: lightblue;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
            <span class="hljs-attribute">background-color</span>: pink;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">background-color</span>: lightgreen;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
            <span class="hljs-attribute">background-color</span>: orange;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<ul><li>justify-content: flex-start;如图，内容在flex容器的左侧开始排列，空白显示在右侧</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lKl?w=1242&amp;h=282" src="https://static.alili.tech/img/bV6lKl?w=1242&amp;h=282" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>justify-content: space-around; 如图，空白会被等分然后填充到子元素的左右</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lLU?w=1484&amp;h=182" src="https://static.alili.tech/img/bV6lLU?w=1484&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>justify-content: space-between; 如图，空白不会出现左右边缘,其余部分空白等分并且进行填充</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lL9?w=1486&amp;h=174" src="https://static.alili.tech/img/bV6lL9?w=1486&amp;h=174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>justify-content: center; 如图，内容居中，空白均分出现在两侧</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lMm?w=1484&amp;h=176" src="https://static.alili.tech/img/bV6lMm?w=1484&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>如果子元素的内容足够多，将如图显示</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lQd?w=1488&amp;h=768" src="https://static.alili.tech/img/bV6lQd?w=1488&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">2.2 align-items</h3>
<p>用于定义与主轴垂直方向上子元素的显示方式</p>
<ul><li>align-items: stretch; 默认值，拉伸</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lOp?w=936&amp;h=170" src="https://static.alili.tech/img/bV6lOp?w=936&amp;h=170" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>align-items: center; 不拉伸，居中显示</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lOH?w=712&amp;h=162" src="https://static.alili.tech/img/bV6lOH?w=712&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>align-items: flex-start;不拉伸，在flex布局的开始位置显示</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lOP?w=706&amp;h=176" src="https://static.alili.tech/img/bV6lOP?w=706&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>align-items: flex-end; 不拉伸，在flex布局的结束位置显示</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lPu?w=806&amp;h=174" src="https://static.alili.tech/img/bV6lPu?w=806&amp;h=174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">2.3 flex-direction</h3>
<p>定义主轴方向，默认主轴为X周，该属性的取值为 row</p>
<ul><li>flex-direction: row; 主轴为X轴</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lRm?w=1486&amp;h=404" src="https://static.alili.tech/img/bV6lRm?w=1486&amp;h=404" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>flex-direction: column; 主轴为Y轴</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lRu?w=1484&amp;h=434" src="https://static.alili.tech/img/bV6lRu?w=1484&amp;h=434" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">2.4 flex-wrap</h3>
<p>定义是否可以换行，默认值为nowrap</p>
<ul><li>flex-wrap:nowrap ,当flex item中的文本足够长的时候也不会导致其他item换行，而是调整其高度以容纳更多内容。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6l0c?w=1484&amp;h=270" src="https://static.alili.tech/img/bV6l0c?w=1484&amp;h=270" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>flex-wrap:wrap ,当flex item中的文本足够长的时候会占满整个容器，然后其他item将会导致换行</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV6lZ2?w=1490&amp;h=362" src="https://static.alili.tech/img/bV6lZ2?w=1490&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">2.5 flex-flow</h3>
<p>是flex-direction 与 flex-wrap的速写形式。例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-flow: row wrap;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">flex-flow</span>: row wrap;</code></pre>
<h3 id="articleHeader8">2.6 flex-basis 与 flex-grow</h3>
<p>这两个属性定义在flex item上，flex-basis定义了在分配多余空间之前，flex item占据的主轴空间,默认值为auto,与width类似。 flex-grow定了分配多余空间的的规则,例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .container_1 {
            margin: 0 auto;
            width: 600px;
            display: flex;
            flex-flow: row nowrap;
        }
        .container_1 > section:nth-child(1){
            background-color: lightblue;
            flex-basis: 100px;
            flex-grow: 1;
        }
        .container_1 > section:nth-child(2){
            background-color: pink;
            flex-basis: 100px;
            flex-grow: 2;
        }
        .container_1 > section:nth-child(3){
            background-color: lightgreen;
            flex-basis: 100px;
            flex-grow:1; 
        }
    </style>

    <article class=&quot;container_1&quot;>
        <section>flex is a new value  added to the CSS display property. Along with inline-flex it causes the element that it applies to to become a flex container, and the element's children to each become a flex item. The items then participate in flex layout</section>
        <section>
            two <br>
            two_1 <br>
            two_2 <br>    
            two_3 <br>
        </section>
        <section>flex is a </section>
    </article>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.container_1</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">flex-flow</span>: row nowrap;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">background-color</span>: lightblue;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
            <span class="hljs-attribute">background-color</span>: pink;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">2</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">background-color</span>: lightgreen;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">flex-grow</span>:<span class="hljs-number">1</span>; 
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container_1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>flex is a new value  added to the CSS display property. Along with inline-flex it causes the element that it applies to to become a flex container, and the element's children to each become a flex item. The items then participate in flex layout<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
            two <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            two_1 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            two_2 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>    
            two_3 <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>flex is a <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span></code></pre>
<p>从上面的样式上，我们可以看出，每个section的flex-basis 基础宽度为100px,flex容器总宽度为600px，这样，剩下的空白区域也就是300px，那么这300像素如何风格呢？这时候就要看没有flex item的flex-grow取值，该值默认为auto,但是我们这里是这么指定的，第一个第三个section为1，第二个section为2，也就是说第一个第三个section各占1/4，也就是75px,第二个section占2/4，也就是150px。所以最后第一个第三个section占175px,第二个section占250px.</p>
<p><span class="img-wrap"><img data-src="/img/bV6mjp?w=1226&amp;h=462" src="https://static.alili.tech/img/bV6mjp?w=1226&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">2.7 flex-basis 与 flex-shrink</h3>
<p>flex-shrink 同样应用到flex item元素上，与flex-grow作用相反，flex-grow表示当flex-basis的和小于flex容器宽度的时候，如何分配剩余空间进行宽度的增长。而flex-shrink表示当flex-basis的和大于flex容器宽度的时候，按照哪种比例进行缩小</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        .container_1 {
            margin: 0 auto;
            width: 600px;
            display: flex;
            flex-flow: row nowrap;
        }
        .container_1 > section:nth-child(1){
            background-color: lightblue;
            flex-basis: 300px;
            flex-grow: 1;
            flex-shrink: 1;
        }
        .container_1 > section:nth-child(2){
            background-color: pink;
            flex-basis: 300px;
            flex-grow: 2;
            flex-shrink: 2;
        }
        .container_1 > section:nth-child(3){
            background-color: lightgreen;
            flex-basis: 300px;
            flex-grow:1; 
            flex-shrink: 1;
        }
        .container_1 > section:nth-child(4){
            background-color: orange;
        }
    </style>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.container_1</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">flex-flow</span>: row nowrap;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">background-color</span>: lightblue;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">1</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
            <span class="hljs-attribute">background-color</span>: pink;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">2</span>;
            <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">2</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">background-color</span>: lightgreen;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">flex-grow</span>:<span class="hljs-number">1</span>; 
            <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">1</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
            <span class="hljs-attribute">background-color</span>: orange;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    </code></pre>
<p>flex容器的宽度为600px;而flex item加起来为900px,为了能占满flex容器，flex item必须缩小300px; 那么谁应该缩小呢？这时候要看每个flex item上flex-shrink的定义,然后计算出比例</p>
<p><span class="img-wrap"><img data-src="/img/bV6mps?w=1232&amp;h=380" src="https://static.alili.tech/img/bV6mps?w=1232&amp;h=380" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">2.7 flex速写</h3>
<p>一般情况下，我们很少使用flex-basis,flex-grow,flex-shrink,而是使用它们的速写形式flex。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex: flex-grow flex-shrink flex-basis" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">flex:</span> flex-grow flex-shrink flex-basis</code></pre>
<p>例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .container_1 > section:nth-child(1){
            background-color: lightblue;
            flex-basis: 1 1 300px;
        }
        .container_1 > section:nth-child(2){
            background-color: pink;
            flex-basis:2 2 300px;
        }
        .container_1 > section:nth-child(3){
            background-color: lightgreen;
            flex-basis:1 1 300px;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">background-color</span>: lightblue;
            <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
            <span class="hljs-attribute">background-color</span>: pink;
            <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">2</span> <span class="hljs-number">2</span> <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">background-color</span>: lightgreen;
            <span class="hljs-attribute">flex-basis</span>:<span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">300px</span>;
        }</code></pre>
<h2 id="articleHeader11">3. flex实际应用</h2>
<p>在实际开发过程中，我们经常会应用到网格布局，一般采用的是float技术，然后封装成一个网格框架进行应用，例如bootstrap的网格布局。但是网格布局也有一些缺陷，比如，它具有两个维度，行与列，再有些项目中我们希望我们的item是一维的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .container_1 {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
        }
        .container_1 > section {
            margin: .5em;
            flex: 1 1 200px;
            background-color: orange;
        }
    </style>

    <article class=&quot;container_1&quot;>
        <section>
            one <br>
            one <br>
            one <br>
            one <br>
        </section>
        <section>two</section>
        <section>three</section>
        <section>four</section>
        <section>five</section>
        <section>six</section>
        <section>seven</section>
        <section>
            one <br>
            one <br>
            one <br>
            one <br>
        </section>
        <section>two</section>
        <section>three</section>
        <section>four</section>
        <section>five</section>
        <section>six</section>
        <section>seven</section>
    </article>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.container_1</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">flex-flow</span>: row wrap;
            <span class="hljs-attribute">justify-content</span>: space-around;
        }
        <span class="hljs-selector-class">.container_1</span> &gt; <span class="hljs-selector-tag">section</span> {
            <span class="hljs-attribute">margin</span>: .<span class="hljs-number">5em</span>;
            <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span> <span class="hljs-number">1</span> <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: orange;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container_1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>four<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>five<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>six<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>seven<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
            one <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>two<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>three<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>four<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>five<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>six<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>seven<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV6qUq?w=1273&amp;h=270" src="https://static.alili.tech/img/bV6qUq?w=1273&amp;h=270" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV6qUA?w=894&amp;h=289" src="https://static.alili.tech/img/bV6qUA?w=894&amp;h=289" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当然，有些同学觉得这样可能和需求不相匹配了，因为我们的代码中flex item的宽度会发生变化，这时候只需要 flex: 0 1 200px;即可，</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS布局之flex布局

## 原文链接
[https://segmentfault.com/a/1190000013869748](https://segmentfault.com/a/1190000013869748)


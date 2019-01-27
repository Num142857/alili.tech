---
title: 'VUE高仿饿了么app' 
date: 2019-01-28 2:30:09
hidden: true
slug: fvz9beqcfku
categories: [reprint]
---

{{< raw >}}

                    
<p>VUE高仿饿了么app</p>
<h1 id="articleHeader0">VUE 搭建简介</h1>
<p>刚学习了VUE高仿饿了么app课,记录课的要点,巩固知识。<br><span class="img-wrap"><img data-src="/img/bVHU4N?w=150&amp;h=267" src="https://static.alili.tech/img/bVHU4N?w=150&amp;h=267" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVHU4Q?w=150&amp;h=267" src="https://static.alili.tech/img/bVHU4Q?w=150&amp;h=267" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVHU4T?w=150&amp;h=267" src="https://static.alili.tech/img/bVHU4T?w=150&amp;h=267" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><br><span class="img-wrap"><img data-src="/img/bVHU4V?w=150&amp;h=415" src="https://static.alili.tech/img/bVHU4V?w=150&amp;h=415" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVHU4X?w=150&amp;h=326" src="https://static.alili.tech/img/bVHU4X?w=150&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVHU41?w=150&amp;h=538" src="https://static.alili.tech/img/bVHU41?w=150&amp;h=538" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">VUE 优势</h2>
<p>Vue.js 是一个用于创建 web 交互界面的。其特点是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="简洁 HTML 模板 + JSON 数据，再创建一个 Vue 实例，就这么简单。
数据驱动 自动追踪依赖的模板表达式和计算属性。
组件化 用解耦、可复用的组件来构造界面。
轻量 ~24kb min+gzip，无依赖。
快速 精确有效的异步批量 DOM 更新。
模块友好 通过 NPM 或 Bower 安装，无缝融入你的工作流。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>简洁 HTML 模板 + <span class="hljs-keyword">JSON </span>数据，再创建一个 Vue 实例，就这么简单。
数据驱动 自动追踪依赖的模板表达式和计算属性。
组件化 用解耦、可复用的组件来构造界面。
轻量 ~<span class="hljs-number">24</span>kb min+gzip，无依赖。
快速 精确有效的异步批量 DOM 更新。
模块友好 通过 NPM 或 <span class="hljs-keyword">Bower </span>安装，无缝融入你的工作流。
</code></pre>
<h2 id="articleHeader2">VUE 搭建工具</h2>
<p>借用express + data 构建拟后台</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue 1.0
express
vue.router
vue.rescrouse
better-scroll
less
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vue <span class="hljs-number">1.0</span>
express
vue<span class="hljs-selector-class">.router</span>
vue<span class="hljs-selector-class">.rescrouse</span>
better-scroll
less
</code></pre>
<h2 id="articleHeader3">CSS 使用的要点</h2>
<h3 id="articleHeader4">1像素边框制作</h3>
<p>设备上像素 = 样式像素 * 设备缩放比例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="屏幕宽度 320px 480px 640px
缩放比例   1    1.5    2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>屏幕宽度 <span class="hljs-number">320</span>px <span class="hljs-number">480</span>px <span class="hljs-number">640</span>px
缩放比例   <span class="hljs-number">1</span>    <span class="hljs-number">1.5</span>    <span class="hljs-number">2</span>
</code></pre>
<p>当样式像素一定时,因手机有320px,640px等.各自的缩放比差异,所以设备显示像素就会有1Npx，2Npx.为保设计稿还原度,解决就是用media + scale.</p>
<p><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border(@borderColor){
    position: relative;

    &amp;::after{
        content: &quot;&quot;;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid @borderColor;
    }
}

@media (min-device-pixel-ratio: 1.5) {
    .border{

        &amp;::after{
            transform: scaleY(0.7);
        }
    }
}

@media (min-device-pixel-ratio: 2) {
    .border{

        &amp;::after{
            transform: scaleY(0.5);
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.border</span>(<span class="hljs-variable">@borderColor</span>){
    <span class="hljs-attribute">position</span>: relative;

    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">::after</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-variable">@borderColor</span>;
    }
}

<span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-device-pixel-ratio</span>: <span class="hljs-number">1.5</span>) {
    <span class="hljs-selector-class">.border</span>{

        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">::after</span>{
            <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.7</span>);
        }
    }
}

<span class="hljs-keyword">@media</span> (<span class="hljs-attribute">min-device-pixel-ratio</span>: <span class="hljs-number">2</span>) {
    <span class="hljs-selector-class">.border</span>{

        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">::after</span>{
            <span class="hljs-attribute">transform</span>: scaleY(<span class="hljs-number">0.5</span>);
        }
    }
}
</code></pre>
<p></p>
<p>通过查询它的缩放比,在媒体宽为1.5倍时, round(1px <em> 1.5 / 0.7) =  1px  在媒体宽为2倍时, round(1px </em> 2 / 0.5) =  1px.</p>
<h3 id="articleHeader5">自适应宽</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU5L?w=466&amp;h=236" src="https://static.alili.tech/img/bVHU5L?w=466&amp;h=236" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在商品路由中,导航宽度固定80px的,因为手机分辨率大小不一,所以食物详情自适应.解决就是flex布局.</p>
<p><code><br>css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/less&quot;>
    .food{
        display: flex;
        width: 100%;

        .nav{
            flex: 0 0 80px;
            width: 80px;
        }

        .foodList{
            flex: 1;
        }
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;style type="text/less"&gt;</span>
    .food{
<span class="hljs-symbol">        display:</span> flex;
<span class="hljs-symbol">        width:</span> <span class="hljs-number">100</span>%;

        .nav{
<span class="hljs-symbol">            flex:</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">80</span>px;
<span class="hljs-symbol">            width:</span> <span class="hljs-number">80</span>px;
        }

        .foodList{
<span class="hljs-symbol">            flex:</span> <span class="hljs-number">1</span>;
        }
    }
<span class="hljs-params">&lt;/style&gt;</span></code></pre>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;food&quot;>
    <section class=&quot;nav&quot;></section>
    <section class=&quot;foodList&quot;></section>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"food"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
    &lt;section <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"foodList"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p></p>
<p>在父元素设弹性布局,导航里设弹性为0,定宽为80px.商品食物详情弹性为1.就适应宽度变化.</p>
<h3 id="articleHeader6">Sticky footer</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU4Q?w=150&amp;h=267" src="https://static.alili.tech/img/bVHU4Q?w=150&amp;h=267" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>做商家弹出页时,信息高度是无法预定的,有可能溢出window高度,也可能少于window高度,但底部按钮,当信息高度少于window高度,要固定在底部40px.解决就是用sticky footer布局</p>
<p><code><br>css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/less&quot;>
    .showDetil{
        position: absolute;
        width: 100%;
        height: 100%;

        .sellerDetil{
            width: 100%;
            min-height: 100%;
            padding-bottom: 40px;
        }

        .btn{
            position: relative;
            top: -40px;
            height: 40px;
        }
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;<span class="hljs-built_in">style</span> type=<span class="hljs-string">"text/less"</span>&gt;
    .showDetil{
        <span class="hljs-built_in">position</span>: absolute;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;

        .sellerDetil{
            <span class="hljs-built_in">width</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
            <span class="hljs-built_in">min</span>-<span class="hljs-built_in">height</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
            padding-bottom: 40px;
        }

        .btn{
            <span class="hljs-built_in">position</span>: relative;
            top: -40px;
            <span class="hljs-built_in">height</span>: 40px;
        }
    }
&lt;/<span class="hljs-built_in">style</span>&gt;</code></pre>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;showDetil&quot;>
    <section class=&quot;sellerDetil&quot;></section>
    <section class=&quot;btn&quot;></section>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"showDetil"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sellerDetil"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
    &lt;section <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"btn"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p></p>
<p>父元素高相同window高,信息最小高就相同window高,按钮这时就溢出了.<br>再设置底的填充,底内边距高就是按钮的高. 按钮在用相对定位,定在信息的底填充里.<br>因信息最少高度是100%,所按钮要不钉在底部了.要不溢出.</p>
<h3 id="articleHeader7">自适相等宽高</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU6a?w=334&amp;h=389" src="https://static.alili.tech/img/bVHU6a?w=334&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在食物弹出页.设计图食物图的宽高是相等,每张图的宽高比例有可能有区别,但也要做自适应.解决就是用padding边距.</p>
<p><code><br>css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/less&quot;>
    .imgs{
        width: 100%;
        height: 0;
        position: relative;
        padding-top: 100%;

        .image{
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            left: 0;
        }
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;style type="text/less"&gt;</span>
    .imgs{
<span class="hljs-symbol">        width:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">        height:</span> <span class="hljs-number">0</span>;
<span class="hljs-symbol">        position:</span> relative;
        padding-top: <span class="hljs-number">100</span>%;

        .image{
<span class="hljs-symbol">            position:</span> absolute;
<span class="hljs-symbol">            top:</span> <span class="hljs-number">0</span>;
<span class="hljs-symbol">            width:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">            height:</span> <span class="hljs-number">100</span>%;
<span class="hljs-symbol">            left:</span> <span class="hljs-number">0</span>;
        }
    }
<span class="hljs-params">&lt;/style&gt;</span></code></pre>
<p>html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;imgs&quot;>
    <img src=&quot;...&quot; class=&quot;image&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"imgs"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"..."</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p></p>
<p>在父元素,边距的长是取决去宽的,所其宽度与边距的长是相等的.<br>在把高设为0,宽为100%,上边距100%,上边据就盒子的高.盒子是为正形.<br>子元素设宽与高为100%,那也是正形.</p>
<h2 id="articleHeader8">VUE要点</h2>
<h3 id="articleHeader9">小图标的编选</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU6q?w=509&amp;h=248" src="https://static.alili.tech/img/bVHU6q?w=509&amp;h=248" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>根据后台输出的数据,判定显示那个的图标.这vue典型的数据.驱动.解决是使用:class困绑数据</p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul>
        <li v-for=&quot;date in goods&quot;>
            <span :class=&quot;classmap[date.type]&quot;></span>
        </li>
    </ul>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"date in goods"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"classmap[date.type]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    export default{
        data() {
            return {
                classmap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
            };
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">classmap</span>: [<span class="hljs-string">'decrease'</span>, <span class="hljs-string">'discount'</span>, <span class="hljs-string">'guarantee'</span>, <span class="hljs-string">'invoice'</span>, <span class="hljs-string">'special'</span>]
            };
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/less&quot;>
.bgimg(@imgs) {
    background-image: url('@imgs+&quot;.png&quot;') 0 0 no-repeat ~'/' 100% 100%;
}
    .decrease{
        display: inline-block;
        height: 12px;
        width: 12px;
    
       .bgimg('decrease_3');
    }

     .discount{
        display: inline-block;
        height: 12px;
        width: 12px;
    
        .bgimg('discount_3');
    }

    .guarantee{
        display: inline-block;
        height: 12px;
        width: 12px;
    
        .bgimg('guarantee_3');
    }

    .invoice{
        display: inline-block;
        height: 12px;
        width: 12px;
    
        .bgimg('invoice_3');
    }

    .special{
        display: inline-block;
        height: 12px;
        width: 12px;
    
        .bgimg('special_3');
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;style type=<span class="hljs-string">"text/less"</span>&gt;
.bgimg(@imgs) {
    <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-string">'@imgs+".png"'</span>) <span class="hljs-number">0</span> <span class="hljs-number">0</span> no-repeat ~<span class="hljs-string">'/'</span> <span class="hljs-number">100</span>% <span class="hljs-number">100</span>%;
}
    .decrease{
        <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">12</span>px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">12</span>px;
    
       .bgimg(<span class="hljs-string">'decrease_3'</span>);
    }

     .discount{
        <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">12</span>px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">12</span>px;
    
        .bgimg(<span class="hljs-string">'discount_3'</span>);
    }

    .guarantee{
        <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">12</span>px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">12</span>px;
    
        .bgimg(<span class="hljs-string">'guarantee_3'</span>);
    }

    .invoice{
        <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">12</span>px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">12</span>px;
    
        .bgimg(<span class="hljs-string">'invoice_3'</span>);
    }

    .special{
        <span class="hljs-built_in">display</span>: <span class="hljs-keyword">inline</span>-block;
        <span class="hljs-built_in">height</span>: <span class="hljs-number">12</span>px;
        <span class="hljs-built_in">width</span>: <span class="hljs-number">12</span>px;
    
        .bgimg(<span class="hljs-string">'special_3'</span>);
    }
&lt;/style&gt;</code></pre>
<p></p>
<p>通过v-for,遍历数据,所以date.type得到数据并判断类型.然后通classmap数组判定绑那个class.来加图标.</p>
<h3 id="articleHeader10">小球动画</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU7a?w=466&amp;h=696" src="https://static.alili.tech/img/bVHU7a?w=466&amp;h=696" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>点击加食物时,触动小球弹出的动画,小球的落点是在车的中央.但起点是根各个节点位子而又差别的.解决使用transitions + events + dispatch事件冒泡</p>
<p>cartcontrol子组件</p>
<p><span class="img-wrap"><img data-src="/img/bVHU7h?w=143&amp;h=52" src="https://static.alili.tech/img/bVHU7h?w=143&amp;h=52" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;cartcontrol&quot;>
        <section class=&quot;cart-decrease&quot; @click.stop.prevent=&quot;decreaseCart&quot; v-show=&quot;food.count > 0&quot; transition=&quot;move&quot;></section>  
        <section class=&quot;cart-count&quot; v-show=&quot;food.count > 0&quot;>"{{"food.count"}}"</section>
        <section class=&quot;cart-add&quot; @click.stop.prevent=&quot;addCart&quot;> </section>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"cartcontrol"</span>&gt;
        &lt;<span class="hljs-selector-tag">section</span> class=<span class="hljs-string">"cart-decrease"</span> @click<span class="hljs-selector-class">.stop</span><span class="hljs-selector-class">.prevent</span>=<span class="hljs-string">"decreaseCart"</span> v-show=<span class="hljs-string">"food.count &gt; 0"</span> <span class="hljs-attribute">transition</span>=<span class="hljs-string">"move"</span>&gt;&lt;/section&gt;  
        &lt;<span class="hljs-selector-tag">section</span> class=<span class="hljs-string">"cart-count"</span> v-show=<span class="hljs-string">"food.count &gt; 0"</span>&gt;"{{"food.count"}}"&lt;/section&gt;
        &lt;<span class="hljs-selector-tag">section</span> class=<span class="hljs-string">"cart-add"</span> @click<span class="hljs-selector-class">.stop</span><span class="hljs-selector-class">.prevent</span>=<span class="hljs-string">"addCart"</span>&gt; &lt;/section&gt;
    &lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
                this.food.count = 1;
            } else {
                this.food.count++;
            };
            this.$dispatch('cart.add', event.target);
        },
        decreaseCart() {
            if (this.food.count) {
                this.food.count--;
            };
        }
    }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
export <span class="hljs-keyword">default</span> {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.food.count) {
                Vue.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>.food, <span class="hljs-string">'count'</span>, <span class="hljs-number">1</span>);
                <span class="hljs-keyword">this</span>.food.count = <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.food.count++;
            };
            <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'cart.add'</span>, event.target);
        },
        decreaseCart() {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.food.count) {
                <span class="hljs-keyword">this</span>.food.count--;
            };
        }
    }
};
&lt;/script&gt;</code></pre>
<p></p>
<p>在加食物,触发了addCart事件,设用set方法给数据加属性,并使cart.add事件冒泡出去,event.target作为事件参数,即节点冒泡出去.</p>
<p>goods父组件</p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <shop v-ref:shop :delivery-price=&quot;seller.deliveryPrice&quot; :min-price=&quot;seller.minPrice&quot; :select-foods=&quot;selectFoods&quot;></shop>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;template&gt;
    &lt;shop v-<span class="hljs-symbol">ref:</span>shop <span class="hljs-symbol">:delivery-price=<span class="hljs-string">"seller.deliveryPrice"</span></span> <span class="hljs-symbol">:min-price=<span class="hljs-string">"seller.minPrice"</span></span> <span class="hljs-symbol">:select-foods=<span class="hljs-string">"selectFoods"</span>&gt;&lt;/shop&gt;</span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    export default {
        methods: {
            _drop(target) {
                this.$refs.shop.drop(target);
            }
        },
        events: {
            'cart.add'(target) {
                this._drop(target);
            }
        },
        components: {
            shop,
            cartcontrol,
            food
        }
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">methods</span>: {
            _drop(target) {
                <span class="hljs-keyword">this</span>.$refs.shop.drop(target);
            }
        },
        <span class="hljs-attr">events</span>: {
            <span class="hljs-string">'cart.add'</span>(target) {
                <span class="hljs-keyword">this</span>._drop(target);
            }
        },
        <span class="hljs-attr">components</span>: {
            shop,
            cartcontrol,
            food
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p></p>
<p>在冒泡被events钩子监听,与触动_drop方法,通过接口获得购物车组建的事件,就把control组建event.target传入购物车组建的事件,及把control节点传入了shop组建.</p>
<p>shop组建</p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;shopcart&quot;>
        <section class=&quot;ball-container&quot;>
            <div transition=&quot;drop&quot; v-for=&quot;ball in balls&quot; v-show=&quot;ball.show&quot; class=&quot;ball&quot;>
                <div class=&quot;inner inner-hook&quot;></div>
            </div>
        </section>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shopcart"</span>&gt;
        &lt;section <span class="hljs-built_in">class</span>=<span class="hljs-string">"ball-container"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> transition=<span class="hljs-string">"drop"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"ball in balls"</span> v-show=<span class="hljs-string">"ball.show"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ball"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inner inner-hook"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/section&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    export default {
        data() {
            return {
                balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }],
                dropBalls: [],
                fold: true
            };
        },
        methods: {
            drop(el) {
                for (var i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    };
                };
            }
        },
        transitions: {
            drop: {
                beforeEnter(el) {
                    let count = this.balls.length;
                    while (count--) {
                        let ball = this.balls[count];
                        if (ball.show) {
                            let rect = ball.el.getBoundingClientRect();
                            let x = rect.left - 32;
                            let y = -(window.innerHeight - rect.top - 22);
                            el.style.display = '';
                            el.style.transform = `translate3d(0,${y}px,0)`;
                            let inner = el.getElementsByClassName('inner-hook')[0];
                            inner.style.transform = `translate3d(${x}px,0,0)`;
                        }
                    }
                },
                enter(el) {
                    let rf = el.offsetHeight;
                    this.$nextTick(() => {
                        el.style.transform = 'translate3d(0,0,0)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.transform = 'translate3d(0,0,0)';
                    });
                },
                afterEnter(el) {
                    let ball = this.dropBalls.shift();
                    if (ball) {
                        ball.show = false;
                        el.style.display = 'none';
                    };
                }
            }
        },
        components: {
            cartcontrol
        }
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">balls</span>: [
                {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                },
                {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                },
                {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                },
                {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                },
                {
                    <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                }],
                <span class="hljs-attr">dropBalls</span>: [],
                <span class="hljs-attr">fold</span>: <span class="hljs-literal">true</span>
            };
        },
        <span class="hljs-attr">methods</span>: {
            drop(el) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.balls.length; i++) {
                    <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.balls[i];
                    <span class="hljs-keyword">if</span> (!ball.show) {
                        ball.show = <span class="hljs-literal">true</span>;
                        ball.el = el;
                        <span class="hljs-keyword">this</span>.dropBalls.push(ball);
                        <span class="hljs-keyword">return</span>;
                    };
                };
            }
        },
        <span class="hljs-attr">transitions</span>: {
            <span class="hljs-attr">drop</span>: {
                beforeEnter(el) {
                    <span class="hljs-keyword">let</span> count = <span class="hljs-keyword">this</span>.balls.length;
                    <span class="hljs-keyword">while</span> (count--) {
                        <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.balls[count];
                        <span class="hljs-keyword">if</span> (ball.show) {
                            <span class="hljs-keyword">let</span> rect = ball.el.getBoundingClientRect();
                            <span class="hljs-keyword">let</span> x = rect.left - <span class="hljs-number">32</span>;
                            <span class="hljs-keyword">let</span> y = -(<span class="hljs-built_in">window</span>.innerHeight - rect.top - <span class="hljs-number">22</span>);
                            el.style.display = <span class="hljs-string">''</span>;
                            el.style.transform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${y}</span>px,0)`</span>;
                            <span class="hljs-keyword">let</span> inner = el.getElementsByClassName(<span class="hljs-string">'inner-hook'</span>)[<span class="hljs-number">0</span>];
                            inner.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${x}</span>px,0,0)`</span>;
                        }
                    }
                },
                enter(el) {
                    <span class="hljs-keyword">let</span> rf = el.offsetHeight;
                    <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                        el.style.transform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
                        <span class="hljs-keyword">let</span> inner = el.getElementsByClassName(<span class="hljs-string">'inner-hook'</span>)[<span class="hljs-number">0</span>];
                        inner.style.transform = <span class="hljs-string">'translate3d(0,0,0)'</span>;
                    });
                },
                afterEnter(el) {
                    <span class="hljs-keyword">let</span> ball = <span class="hljs-keyword">this</span>.dropBalls.shift();
                    <span class="hljs-keyword">if</span> (ball) {
                        ball.show = <span class="hljs-literal">false</span>;
                        el.style.display = <span class="hljs-string">'none'</span>;
                    };
                }
            }
        },
        <span class="hljs-attr">components</span>: {
            cartcontrol
        }
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p></p>
<p>传入节点数据,过渡执行前可插入一个beforeEnter事件,通getBoundingClientRect定位.动画执行后可插入一个afterEnter,还原小球</p>
<h3 id="articleHeader11">接后台数据</h3>
<p>与后台的配合,通过插vue.resource + express 连接得到数据</p>
<p>dev-server<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    import express from 'express';
    var app = express();

    var appData = require('../data.json');
    var seller = appData.seller;
    var goods = appData.goods;
    var ratings = appData.ratings;
    
    var apiRoutes = express.Router();
    
    apiRoutes.get('/seller', function (req, res) {
        res.json({
            errno: 0,
            data: seller
        });
    });
    
    apiRoutes.get('/goods', function (req, res) {
        res.json({
            errno: 0,
            data: goods
        });
    });
    
    apiRoutes.get('/ratings', function (req, res) {
        res.json({
            errno: 0,
            data: ratings
        });
    });
    app.use('/api', apiRoutes);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>;
    <span class="hljs-keyword">var</span> app = express();

    <span class="hljs-keyword">var</span> appData = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../data.json'</span>);
    <span class="hljs-keyword">var</span> seller = appData.seller;
    <span class="hljs-keyword">var</span> goods = appData.goods;
    <span class="hljs-keyword">var</span> ratings = appData.ratings;
    
    <span class="hljs-keyword">var</span> apiRoutes = express.Router();
    
    apiRoutes.get(<span class="hljs-string">'/seller'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
        res.json({
            <span class="hljs-attr">errno</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">data</span>: seller
        });
    });
    
    apiRoutes.get(<span class="hljs-string">'/goods'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
        res.json({
            <span class="hljs-attr">errno</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">data</span>: goods
        });
    });
    
    apiRoutes.get(<span class="hljs-string">'/ratings'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
        res.json({
            <span class="hljs-attr">errno</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">data</span>: ratings
        });
    });
    app.use(<span class="hljs-string">'/api'</span>, apiRoutes);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p></p>
<p>通过与配和框架express,连到数据。并放在api里.</p>
<p>main.js<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueResource from 'vue-resource';
Vue.use('VueResource');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>;
Vue.use(<span class="hljs-string">'VueResource'</span>);</code></pre>
<p></p>
<p>引进插件和使用,在全局也可以使用.</p>
<p>header组建<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    export default{
        created() {
            this.$http.get('/api/ratings').then((response) => {
                var response = response.body;
                if (response.errno === 0) {
                    this.ratings = response.data;
                };
            });
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        created() {
            <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/api/ratings'</span>).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
                <span class="hljs-keyword">var</span> response = response.body;
                <span class="hljs-keyword">if</span> (response.errno === <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">this</span>.ratings = response.data;
                };
            });
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p></p>
<p>在框架的钩子,及创建就通过http.get连到express发的数据,通参数response得到.body表示数据以json格式响应.注意接收数据是异步实现,如果出报错undefined,可用v-if判断,当获取数据后在渲染.</p>
<h3 id="articleHeader12">评分类换</h3>
<p><span class="img-wrap"><img data-src="/img/bVHU86?w=426&amp;h=280" src="https://static.alili.tech/img/bVHU86?w=426&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>用户的满意度有,推荐与吐槽再加上全部,就三个分页,分页通过按钮切换.如何制作呢?解决是使用v-show进判断.</p>
<p>ratingselect子组件</p>
<p><span class="img-wrap"><img data-src="/img/bVHU9d?w=426&amp;h=82" src="https://static.alili.tech/img/bVHU9d?w=426&amp;h=82" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;ratingselect&quot;>
        <div class=&quot;rating-type&quot;>
            <span @click=&quot;select(2, $event)&quot; class=&quot;block positive&quot; :class=&quot;{'active':selectType === 2}&quot;>"{{"desc.all"}}"<span class=&quot;count&quot;>"{{"ratings.length"}}"</span></span>
            <span  @click=&quot;select(0, $event)&quot; class=&quot;block positive&quot; :class=&quot;{'active':selectType === 0}&quot;>"{{"desc.positive"}}"<span class=&quot;count&quot;>"{{"positives.length"}}"</span></span>
            <span @click=&quot;select(1, $event)&quot; class=&quot;block negative&quot; :class=&quot;{'active':selectType === 1}&quot;>"{{"desc.negative"}}"<span class=&quot;count&quot;>"{{"negatives.length"}}"</span></span>
        </div>
        <div @click=&quot;toggleContent&quot; class=&quot;switch&quot; :class=&quot;{'on':onlyContent}&quot;>
            <span class=&quot;iconfont arre&quot;>&amp;#xe905;</span>
            <span class=&quot;text&quot;>只看有内容的评价</span>
        </div>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ratingselect"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rating-type"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(2, $event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block positive"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType === 2}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.all}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"ratings.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(0, $event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block positive"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType === 0}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.positive}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"positives.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"select(1, $event)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"block negative"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':selectType === 1}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span></span><span class="hljs-template-variable">"{{"desc.negative}</span><span class="xml">}<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"count"</span>&gt;</span></span><span class="hljs-template-variable">"{{"negatives.length}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleContent"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'on':onlyContent}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont arre"</span>&gt;</span>&amp;#xe905;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>只看有内容的评价<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
export default{
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
        type: Number,
        default: 2
        },
        onlyContent: {
            type: Boolean,
            default: true
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    methods: {
        select(type) {
            this.selectType = type;
            this.$dispatch('ratingtype.select', type);
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$dispatch('ratingtype.toggleContent', this.onlyContent);
        }
    }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;script <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text/javascript"</span>&gt;
export <span class="hljs-keyword">default</span>{
    props: {
        ratings: {
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">Array</span>,
            <span class="hljs-keyword">default</span>() {
                <span class="hljs-keyword">return</span> [];
            }
        },
        selectType: {
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">Number</span>,
        <span class="hljs-keyword">default</span>: <span class="hljs-number">2</span>
        },
        onlyContent: {
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">Boolean</span>,
            <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
        },
        desc: {
            <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">Object</span>,
            <span class="hljs-keyword">default</span>() {
                <span class="hljs-keyword">return</span> {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    methods: {
        select(<span class="hljs-class"><span class="hljs-keyword">type</span>) </span>{
            <span class="hljs-keyword">this</span>.selectType = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
            <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-symbol">'ratingtype</span>.select', <span class="hljs-class"><span class="hljs-keyword">type</span>)</span>;
        },
        toggleContent() {
            <span class="hljs-keyword">this</span>.onlyContent = !<span class="hljs-keyword">this</span>.onlyContent;
            <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-symbol">'ratingtype</span>.toggleContent', <span class="hljs-keyword">this</span>.onlyContent);
        }
    }
};
&lt;/script&gt;</code></pre>
<p></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="满意是为:0,不满意是为:1，全部是为:2." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">满意是为<span class="hljs-selector-pseudo">:0</span>,不满意是为<span class="hljs-selector-pseudo">:1</span>，全部是为<span class="hljs-selector-pseudo">:2.</span></code></pre>
<p>因在点击切换按钮,触发方法,通过传入参数来替换数据,数据selectType赋值等于参数.参数是自义定,然而可以在参数下功夫,然用冒泡将数据分出.</p>
<p>food父组件<br>html<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <transiton>
        <div class=&quot;rating&quot;>
            <h4 class=&quot;title&quot;>商品评价</h4>
            <ratingselect :select-type=&quot;selectType&quot; :only-content=&quot;onlyContent&quot; :desc=&quot;desc&quot; :ratings=&quot;food.ratings&quot;></ratingselect>
            <div class=&quot;rating-wrapper&quot;>
              <ul v-show=&quot;food.ratings &amp;&amp; food.ratings.length&quot;>
                <li v-for=&quot;rating in food.ratings&quot; v-show=&quot;needShow(rating.rateType,rating.text)&quot; class=&quot;rating-item&quot;>
                  <div class=&quot;user&quot;>
                    <span class=&quot;name&quot;>"{{"rating.username"}}"</span>
                    <img class=&quot;avatar&quot; width=&quot;12&quot; height=&quot;12&quot; :src=&quot;rating.avatar&quot;>
                  </div>
                  <div class=&quot;time&quot;>"{{"rating.rateTime | formatDate"}}"</div>
                  <p class=&quot;text&quot;>
                    <span v-if=&quot;rating.rateType === 0&quot; class=&quot;arrowUp iconfont&quot;>&amp;#xe901;</span>
                    <span v-if=&quot;rating.rateType === 1&quot; class=&quot;arrowDown iconfont&quot;>&amp;#xe902;</span>"{{"rating.text"}}"
                  </p>
                </li>
              </ul>
              <div class=&quot;no-rating&quot; v-show=&quot;!food.ratings || !food.ratings.length&quot;>暂无评价</div>
            </div>
        </div>
    </transiton>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transiton</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rating"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>商品评价<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ratingselect</span> <span class="hljs-attr">:select-type</span>=<span class="hljs-string">"selectType"</span> <span class="hljs-attr">:only-content</span>=<span class="hljs-string">"onlyContent"</span> <span class="hljs-attr">:desc</span>=<span class="hljs-string">"desc"</span> <span class="hljs-attr">:ratings</span>=<span class="hljs-string">"food.ratings"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ratingselect</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rating-wrapper"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"food.ratings &amp;&amp; food.ratings.length"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"rating in food.ratings"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"needShow(rating.rateType,rating.text)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rating-item"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"rating.username"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"12"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"rating.avatar"</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"time"</span>&gt;</span></span><span class="hljs-template-variable">"{{"rating.rateTime | formatDate"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"rating.rateType === 0"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrowUp iconfont"</span>&gt;</span>&amp;#xe901;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"rating.rateType === 1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"arrowDown iconfont"</span>&gt;</span>&amp;#xe902;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"rating.text"}}"</span><span class="xml">
                  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"no-rating"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!food.ratings || !food.ratings.length"</span>&gt;</span>暂无评价<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transiton</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    import Vue from 'vue';

    import ratingselect from 'components/ratings/ratingselect';

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
  
   export default {
        data() {
            return {
                showFlage: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            needShow(type, text) {
                if (this.onlyContent &amp;&amp; !text) {
                return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        events: {
            'ratingtype.select'(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            'ratingtype.toggleContent'(onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        components: {
            ratingselect
        }
    };
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>&lt;script <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;
    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

    <span class="hljs-keyword">import</span> ratingselect <span class="hljs-keyword">from</span> <span class="hljs-string">'components/ratings/ratingselect'</span>;

    <span class="hljs-keyword">const</span> POSITIVE = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> NEGATIVE = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">const</span> ALL = <span class="hljs-number">2</span>;
  
   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data() {
            <span class="hljs-keyword">return</span> {
                showFlage: <span class="hljs-literal">false</span>,
                selectType: ALL,
                onlyContent: <span class="hljs-literal">true</span>,
                desc: {
                    all: <span class="hljs-string">'全部'</span>,
                    positive: <span class="hljs-string">'推荐'</span>,
                    negative: <span class="hljs-string">'吐槽'</span>
                }
            };
        },
        methods: {
            needShow(<span class="hljs-keyword">type</span>, text) {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.onlyContent &amp;&amp; !text) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.selectType === ALL) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">type</span> === <span class="hljs-keyword">this</span>.selectType;
                }
            }
        },
        events: {
            <span class="hljs-string">'ratingtype.select'</span>(<span class="hljs-keyword">type</span>) {
                <span class="hljs-keyword">this</span>.selectType = <span class="hljs-keyword">type</span>;
                <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.scroll.refresh();
                });
            },
            <span class="hljs-string">'ratingtype.toggleContent'</span>(onlyContent) {
                <span class="hljs-keyword">this</span>.onlyContent = onlyContent;
                <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.scroll.refresh();
                });
            }
        },
        components: {
            ratingselect
        }
    };
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p></p>
<p>在事件钩子上,实行监听,把冒泡触发并赋值,数据就得到.在遍历数据,用v-show进行判断.</p>
<h2 id="articleHeader13">VUE杂项</h2>
<h3 id="articleHeader14">过渡流程</h3>
<p>只在v-if,v-show,v-for触动节点的变动效果</p>
<p>当 show 属性改变时，Vue.js 将相应地插入或删除元素，按照如下规则改变过渡的 CSS 类名：</p>
<p>如果 show 变为 false，Vue.js 将：</p>
<p>调用 beforeLeave 钩子；<br>添加 v-leave 类名到元素上以触发过渡；<br>调用 leave 钩子；<br>等待过渡结束（监听 transitionend 事件）；<br>从 DOM 中删除元素并删除 v-leave 类名；<br>调用 afterLeave 钩子。<br>如果 show 变为 true，Vue.js 将：</p>
<p>调用 beforeEnter 钩子；<br>添加 v-enter 类名到元素上；<br>把它插入 DOM；<br>调用 enter 钩子；<br>强制一次 CSS 布局，让 v-enter 确实生效。然后删除 v-enter 类名，以触发过渡，回到元素的原始状态；<br>等待过渡结束；<br>调用 afterEnter 钩子。</p>
<h3 id="articleHeader15">better-scroll</h3>
<p>节点溢满时,是设计稿没有滚动条的,要上下移动.解决使用better-scroll插件.</p>
<p><code><br>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;sellerx&quot; v-el:seller style=&quot;overflow: hidden;&quot;>
    <div class=&quot;seller-content&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"sellerx"</span> v-el:seller style=<span class="hljs-string">"overflow: hidden;"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"seller-content"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    ready() {
         this.$nextTick(() => {
             if (!this.scroll) {
                 this.scroll = new Bscroll(this.$els.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
        });
    },
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    ready() {
         <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
             <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.scroll) {
                 <span class="hljs-keyword">this</span>.scroll = <span class="hljs-keyword">new</span> Bscroll(<span class="hljs-keyword">this</span>.$els.seller, {
                    <span class="hljs-attr">click</span>: <span class="hljs-literal">true</span>
                });
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.scroll.refresh();
            }
        });
    },
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p></p>
<p>但父元素设置溢出隐藏,可用插件的移动显出子节点超的内容.要在节点放个接口,使用框架钩子,创建betterScroll事例,那藏的内容通立体相上下移.better-scroll是调用样式的translate是子节点上下引动.</p>
<h3 id="articleHeader16">less样式处理</h3>
<p>通过引入样式,有是会错误.解决使用设置标签<br><code></code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/less&quot;></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/less"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p></p>
<p>处理器会识别到标签的样式类别,编译样式.</p>
<h3 id="articleHeader17">esLint</h3>
<p>在使用eslint语法校验时,经常报错,但可以在eslintrc设置进行忽略.</p>
<h4>no mixed spaces and tabs</h4>
<p>是把标签缩进与空格捆和使用,解决是可用tab代替空格.</p>
<h4>Expected indentation of 2 space characters but found 3  indent</h4>
<p>'indent': 0,<br>'space-before-function-paren': 0<br>设置缩进空行.</p>
<h4>defined but never use</h4>
<p>可在前加注销<br>/<em> eslint-disable no-unused-vars </em>/</p>
<h2 id="articleHeader18">后序</h2>
<p>要灵活的用vue,先要处理好数据的逻辑. <br>然而要懂得基本的数据传递属性.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="子组件传给父组件-
可以用接口ref;也可以子组件的冒泡把数据传去,父组件用钩子events监听并接到数据.
父组件传给子组件-
可以在子组件props钩子,接收父组件的传递.也可以父组件用ref接口调用子组件的方法,并把数据传入方法去." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>子组件传给父组件-
可以用接口<span class="hljs-keyword">ref</span>;也可以子组件的冒泡把数据传去,父组件用钩子events监听并接到数据.
父组件传给子组件-
可以在子组件props钩子,接收父组件的传递.也可以父组件用<span class="hljs-keyword">ref</span>接口调用子组件的方法,并把数据传入方法去.</code></pre>
<p>实战是最重要.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE高仿饿了么app

## 原文链接
[https://segmentfault.com/a/1190000008045579](https://segmentfault.com/a/1190000008045579)


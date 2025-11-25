---
title: 'H5仿手Q左滑删除功能组件' 
date: 2019-02-05 2:30:09
hidden: true
slug: fnyaov465
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">背景</h3>
<p>前不久遇到一个需求，h5列表页实现左滑删除功能。</p>
<blockquote>
<p>首先对下文有关滑块的指代标识做出<strong>统一规定</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVB1hD" src="https://static.alili.tech/img/bVB1hD" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</blockquote>
<p>体验了一下手Q原生滑动功能，在此之前对于滑块的具体动效提出了几个问题。（希望大家也去观察体验一下，网上很多现成的代码都存在效果上的差异）</p>
<ol>
<li><p>控制单条li滑动还是控制li中内容块滑动</p></li>
<li><p>是否允许多条内容块同时展开</p></li>
<li><p>当列表上下滑动时，内容块是否需要收起</p></li>
</ol>
<p>在观察原生滑动功能后，对上述问题做出如下解答</p>
<ol>
<li><p>控制li中内容块滑动，通过设置层级关系使得初始状态时按钮租处于内容块之下</p></li>
<li><p>否</p></li>
<li><p>是</p></li>
</ol>
<h3 id="articleHeader1">实现</h3>
<h4>dom与css</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* html结构 */
<ul>
    <li class=&quot;sl-li&quot;>
      <div class=&quot;sl-content&quot;>
        第11金!马龙4-0张继科乒球男单夺冠成就大满贯伟业
      </div>
      <div class=&quot;sl-opts&quot;>
        <span>删除</span>
      </div>
    </li>
</ul>

/* style 此处省略部分样式 */
<style>
    .sl-li {
      height: 100%;
      position: relative;
    }
    .sl-li .sl-content {
      height: 100%;
      position: relative;
      z-index: 10;
      background-color: #fff;
    }
    .sl-li .sl-opts {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      z-index: 0;
      background-color: #F95F61;
      color: #fff;
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>/* html结构 */
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sl-li"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sl-content"</span>&gt;</span>
        第11金!马龙4-0张继科乒球男单夺冠成就大满贯伟业
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sl-opts"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>删除<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

/* style 此处省略部分样式 */
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.sl-li</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.sl-li</span> <span class="hljs-selector-class">.sl-content</span> {
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">position</span>: relative;
      <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    }
    <span class="hljs-selector-class">.sl-li</span> <span class="hljs-selector-class">.sl-opts</span> {
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F95F61</span>;
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
      <span class="hljs-attribute">display</span>: -webkit-box;
      <span class="hljs-attribute">-webkit-box-pack</span>: center;
      <span class="hljs-attribute">-webkit-box-align</span>: center;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>得到如下图的列表<br><span class="img-wrap"><img data-src="/img/bVB1ek" src="https://static.alili.tech/img/bVB1ek" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>js</h4>
<p>等我有空再细说好了 =-=大家去看源码吧。</p>
<p>最终效果：<br><span class="img-wrap"><img data-src="/img/bVB1RM" src="https://static.alili.tech/img/bVB1RM" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">组件源码</h3>
<p><a href="https://github.com/yvonnevv/Slidetoleft" rel="nofollow noreferrer" target="_blank">https://github.com/yvonnevv/S...</a></p>
<p>后话：<br>同事反馈没有给滑动开始或完成时暴露一个自定义事件的接口。。<br>恩，会进行迭代的（°ˊдˋ°）°°</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
H5仿手Q左滑删除功能组件

## 原文链接
[https://segmentfault.com/a/1190000006639568](https://segmentfault.com/a/1190000006639568)


---
title: 'CSS魔法堂：你一定误解过的Normal flow' 
date: 2019-02-12 2:30:12
hidden: true
slug: ly4zl4f9y9c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p> 刚接触CSS时经常听到看到一个词"文档流"，那到底什么是"文档流"呢？然后会看到"绝对定位和浮动定位能脱离文档流"，从这句可以看到文档流和绝对定位、浮动定位是同一个范畴的概念，再后来在W3C标准文档找到关于Absolute positioning和Float的内容，却怎么也找不到Document flow(文档流)的资料。后来终于知道是某位大神将Normal flow翻译为文档流而已。。。。。。而我更偏好它的直译"常规流"，或直接引用英文名词就好了。</p>
<h2 id="articleHeader1">Normal flow到底啥意思啊？</h2>
<p> 首先我们从名称入手，Normal flow直译为"常规流"，我们可以猜想它有以下几个特点：</p>
<ol>
<li><p>作为默认的定位模式;</p></li>
<li><p>其他定位模式均以其为基础。</p></li>
</ol>
<p> 各位都知道与定位系统的CSS属性<code>position:static|relative|absolute|fixed</code>和<code>float:none|left|right</code>，其中position的默认值是static，而float的默认值为none。而<code>position:static|relative</code>均属于Normal flow。<br> 另外单纯设置<code>position:absolute</code>效果与采用Normal flow是一样的（<a href="http://www.cnblogs.com/fsjohnhuang/p/5358587.html" rel="nofollow noreferrer" target="_blank">《CSS魔法堂：Absolute Positioning就这个样》</a>），而浮动定位也是基于Normal flow。<strong>所以我认为"脱离常规流"这一说法不完全正确，甚至让人产生误解</strong><br> 对Normal flow的地位与和其余定位模式的关系有初步认知后，必须是迫不及待地想深入它的特性和行为特征了！这就回到那个耳熟能详的的IFC和BFC了。具体请参考<a href="http://www.cnblogs.com/fsjohnhuang/p/5259121.html" rel="nofollow noreferrer" target="_blank">CSS魔法堂：重新认识Box Model、IFC、BFC和Collapsing margins</a></p>
<h2 id="articleHeader2">IFC、BFC的靠山——Normal flow</h2>
<p> 对于IFC和BFC已经有很多资料围绕它们来展开，而且我们也投入很多精力去理解它俩，但往往会忽略一个前提，那就是没有Normal flow就没有IFC、BFC。当我们采用绝对定位或浮动定位时，就没有必要再讨论IFC和BFC了。那么说绝对定位和浮动定位会让元素产生新的BFC又是怎么说呢？<br> 我是这样理解的。首先绝对定位和浮动定位必须产生新的BFC，就想根元素会产生默认的BFC那样，供采用常规流的块级子孙盒子使用。但像Collapsing margins这种由BFC引起的行为特征，由于盒子本身不再受原来BFC的影响，自然就不会出现Collapsing margins了。<br><strong>其实我有个疑问：那就是为什么一个文档可以有多个BFC，却只有一个IFC呢？</strong></p>
<h2 id="articleHeader3">BFC下盒子定位的奥义</h2>
<p>我想大家都试过采用这种方式实现水平居中(IE5.5下无效)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style type=&quot;text/css&quot;>
  .center{
    font-size: 30px;
    line-height: 2;
    text-align: center;
    background: #06f;
    
    width: 200px;
    margin: 0 auto;
  }
</style>
<body>
  <div class=&quot;center&quot;>hello world:)</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#06f</span>;
    
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span>hello world:)<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006779792" src="https://static.alili.tech/img/remote/1460000006779792" alt="" title="" style="cursor: pointer;"></span><br> 参与BFC的盒子独占一行，我想大家应该没有异议了，但具体是如何独占法呢？看等式吧!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' = width of containing block" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">'margin</span>-left' + <span class="hljs-symbol">'border</span>-left-width' + <span class="hljs-symbol">'padding</span>-left' + <span class="hljs-symbol">'width'</span> + <span class="hljs-symbol">'padding</span>-right' + <span class="hljs-symbol">'border</span>-right-width' + <span class="hljs-symbol">'margin</span>-right' = width <span class="hljs-keyword">of</span> containing block</code></pre>
<p>其中margin-left/width/margin-right可为auto，且具有以下规则：</p>
<ol>
<li><p>若width为auto，则其他设置为auto的属性的实际值为0，并让width的实际值满足等式；</p></li>
<li><p>若width为数值，而margin-left/right均为auto，且除marin-left/right外其他属性值总和小于containing block的宽度，那么margin-left == margin-right == ('border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width')/2；否则margin-left == margin-right == 0.</p></li>
</ol>
<h2 id="articleHeader4">Normal flow的小弟——Relative positioning</h2>
<p> 我们可以以Normal flow或Float定位模式作为基础之上再叠加一个相对定位，从而实现更灵活的定位操作。<br> 相对定位的最强武器就是<code>top/right/bottom/left</code>4个属性了，好明显它们默认值均是auto。另外所谓基于Normal flow或Float定位模式的相对定位，自然就是以Normal flow或Float定位模式下margin box的4条边作为参考系了。<br>接下来只要掌握以下规则，就可以运用自如了：</p>
<ol>
<li><p>left/right均为auto，则实际值为0;</p></li>
<li><p>left/right其中一个为数值，则两者等式left == -right;</p></li>
<li><p>left/right均为数值，则根据direction值。若direction为ltr，则left值保留，而right = -left；若direction为rtl，则right值保留，而left = -right。<br>(top/bottom规则同上)</p></li>
</ol>
<p><strong>注意：</strong></p>
<ol>
<li><p>叠加相对定位后的盒子不会影响其他盒子的排版，只是会发生重叠的效果而已;</p></li>
<li><p>若相对定位后的盒子超出所属containing block的范围，且<code>overflow:auto|scroll;</code>则会导致出现滚动条的情况，从而影响其他盒子的排版。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;width:100px; height:100px; overflow:auto; border:2px solid blue;&quot;>
<div style=&quot;width:20px; height:20px; background-color:red; position:relative; top:100px; left:100px;&quot;>A</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">&lt;div</span> <span class="hljs-string">style="width:100px;</span> <span class="hljs-attr">height:100px;</span> <span class="hljs-attr">overflow:auto;</span> <span class="hljs-attr">border:2px</span> <span class="hljs-string">solid</span> <span class="hljs-string">blue;"&gt;</span>
<span class="hljs-string">&lt;div</span> <span class="hljs-string">style="width:20px;</span> <span class="hljs-attr">height:20px;</span> <span class="hljs-attr">background-color:red;</span> <span class="hljs-attr">position:relative;</span> <span class="hljs-attr">top:100px;</span> <span class="hljs-attr">left:100px;"&gt;A&lt;/div&gt;</span>
<span class="hljs-string">&lt;/div&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004891495" src="https://static.alili.tech/img/remote/1460000004891495" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">总结</h2>
<p>若有纰漏，请各位指正<br>  尊重原创，转载请注明来自：<a href="http://www.cnblogs.com/fsjohnhuang/p/5364580.html%5E_%5E" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/fsjohnhuang/p/536...</a>肥子John</p>
<h2 id="articleHeader6">感谢</h2>
<p><a href="https://www.w3.org/TR/CSS21/visuren.html#relative-positioning" rel="nofollow noreferrer" target="_blank">Relative positioning</a><br><a href="https://www.w3.org/TR/CSS21/visudet.html" rel="nofollow noreferrer" target="_blank">Visual formatting model details</a><br><a href="http://www.w3help.org/zh-cn/kb/010/" rel="nofollow noreferrer" target="_blank">KB010: 常规流( Normal flow )</a><br><a href="http://www.w3help.org/zh-cn/kb/009/" rel="nofollow noreferrer" target="_blank">KB009: CSS 定位体系概述</a><br><a href="http://www.css88.com/book/css/properties/layout/display.htm" rel="nofollow noreferrer" target="_blank">http://www.css88.com/book/css/properties...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：你一定误解过的Normal flow

## 原文链接
[https://segmentfault.com/a/1190000004891489](https://segmentfault.com/a/1190000004891489)


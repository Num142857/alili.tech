---
title: 'css外边距折叠（margin collapsing）' 
date: 2019-02-14 2:30:37
hidden: true
slug: 2h0heilf57z
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前文</h2>
<p>这是的一个经典的老问题，因为之前刚好有读者朋友问到，顺便整理一下。</p>
<h3 id="articleHeader1">从一个简单例子说起</h3>
<p>先看一个简单示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <style>
    .slide1 div {
      margin:10px 0;
    }
  </style>
 <div class=&quot;slide1&quot;>
    <h3>第1种外边距折叠：兄弟元素</h3>
    <p>文本上下间距10px</p>
    <p>文本上下间距10px</p>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.slide1</span> <span class="hljs-selector-tag">div</span> {
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>第1种外边距折叠：兄弟元素<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>文本上下间距10px<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>文本上下间距10px<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiPME?w=1730&amp;h=120" src="https://static.alili.tech/img/bVbiPME?w=1730&amp;h=120" alt="情况1" title="情况1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiPMX?w=1709&amp;h=126" src="https://static.alili.tech/img/bVbiPMX?w=1709&amp;h=126" alt="情况2" title="情况2" style="cursor: pointer;"></span></p>
<p>看这个例子中的两个<code>p</code>标签，根据样式定义：第一个<code>p</code>的<code>margin-bottom</code>和第二个<code>p</code>的<code>margin-top</code> 都是10px，那实际距离应该等于20px才对，但是用浏览器查看一下可以发现，最终的边距是<code>10px</code>。 这个例子就是外边距折叠：<strong>块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距。</strong></p>
<h3 id="articleHeader2">分类情况</h3>
<p>外边距折叠有3种基本情况：</p>
<ol>
<li>相邻元素</li>
<li>父元素和第一个子元素（或者最后一个子元素，等下记得回头思考下这里为啥是第一个或者最后一个）</li>
<li>空的块级元素</li>
</ol>
<p>先不急着记忆，首先，前文的例子中就是第一种情况--相邻的两个元素之间发生的外边距折叠。<br>第二种和第三种情况如下：<br><span class="img-wrap"><img data-src="/img/bVbiPMK?w=1917&amp;h=418" src="https://static.alili.tech/img/bVbiPMK?w=1917&amp;h=418" alt="情况2" title="情况2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiPMO?w=1917&amp;h=440" src="https://static.alili.tech/img/bVbiPMO?w=1917&amp;h=440" alt="情况3" title="情况3" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <style>
    .father {
      background-color: green;

    }
    .child {
      margin-top: 50px;
      background-color: red;
      height: 300px;
    }
    
      .slide3 {
      margin: 10px 0;
    }
  </style>
  <h3>第2种外边距折叠：父元素和首个子元素</h3>
  <div class=&quot;slide2 father&quot;>
    <!-- 父元素是绿色 -->
    <div class=&quot;slide2 child&quot;>
      <!-- 子元素是红色 -->
    </div>
  </div>
  <h3>第3种外边距折叠：空的块级元素</h3>
  <div class=&quot;slide3&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.father</span> {
      <span class="hljs-attribute">background-color</span>: green;

    }
    <span class="hljs-selector-class">.child</span> {
      <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">50px</span>;
      <span class="hljs-attribute">background-color</span>: red;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
    }
    
      <span class="hljs-selector-class">.slide3</span> {
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>第2种外边距折叠：父元素和首个子元素<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide2 father"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 父元素是绿色 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide2 child"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- 子元素是红色 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>第3种外边距折叠：空的块级元素<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>他们的图像也分别如图：</p>
<ul>
<li>情况2： 子元素的外边距会“转移”到父元素的外面</li>
<li>情况3：该元素的上下外边距会折叠</li>
</ul>
<p>好了，到这里我们不妨来看看这几种情况的共同点（建议画一下他们的盒模型，我懒就不画了-_-）,可以发现发生外边距折叠的共同原因：<strong>margin之间直接接触，没有阻隔</strong>。</p>
<p>如何理解直接接触？很简单：</p>
<ul>
<li>第一个例子中，两个<code>&lt;p&gt;</code>标签的垂直方向<code>margin</code>是直接接触的；</li>
<li>第二个例子中，由于父元素的<code>padding</code>,<code>border</code>都为0，所以<code>margin</code>和它的子元素也是直接接触的。（这个例子画出盒模型就很好理解）</li>
<li>第三个例子中，空元素本身的上下边距也是直接接触的（<code>padding</code>,<code>border</code>也是0）</li>
</ul>
<h3 id="articleHeader3">各种情况下折叠的结果</h3>
<p>折叠后的边距如何计算，这个可以简单验证下：</p>
<ol>
<li>如果两个外边距都是正值，折叠后的边距取较大的一个</li>
<li>如果两个边距一正一负，折叠后的边距为边距之和</li>
<li>如果两个边距都为负数，折叠后边距为较小的边距之和</li>
</ol>
<h3 id="articleHeader4">如何防止外边距折叠</h3>
<p>前文说到，发生外边距折叠的原因是，外边距直接接触，因此防止折叠的方式就是，阻隔这个直接接触，组合的方法包括：</p>
<ol>
<li>嵌套情况只要<code>border padding </code>非0，或者有<code>inline</code>元素隔开，比如父元素里加一行文字也可以（可以直接在情况2尝试）</li>
<li>任何借助bfc形成阻隔的方式，如浮动，<code>display:table</code>等（<code>BFC</code>不熟悉的同学先查查，我后面补上）</li>
</ol>
<h3 id="articleHeader5">小结</h3>
<p>还得补充一下，前面讨论的是基本情况，在基本情况下还可以进行组合，比如多个相邻元素之间；多层后代元素嵌套等等，弄明白基本原理，其他情况只要写写小的demo验证下就很好理解了。然后是惯例：<strong>如果内容有错误的地方欢迎指出（觉得看着不理解不舒服想吐槽也完全没问题）；如果对你有帮助，欢迎点赞和收藏，转载请征得同意后著明出处，如果有问题也欢迎私信交流，主页有邮箱地址</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css外边距折叠（margin collapsing）

## 原文链接
[https://segmentfault.com/a/1190000016842993](https://segmentfault.com/a/1190000016842993)


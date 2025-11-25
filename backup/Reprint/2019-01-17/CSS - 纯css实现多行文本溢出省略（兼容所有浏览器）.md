---
title: 'CSS - 纯css实现多行文本溢出省略（兼容所有浏览器）' 
date: 2019-01-17 2:30:25
hidden: true
slug: lt7hwml1ufm
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>多行文本超出高度限制出现省略号 , 移动端多为webkit内核的 , 有扩展属性-webkit-line-clamp , 但并不是CSS规范中的属性 , PC端往往要借助js去实现这一效果，但麻烦且不是很靠谱，今天就用纯CSS来实现一个完全兼容的多行省略。</p>
<h1 id="articleHeader1">正文</h1>
<h2 id="articleHeader2">一、webkit内核的实现</h2>
<p><code>-webkit-line-clamp</code>设置块元素包含的文本行数；<br><code>display: -webkit-box</code>设置块元素的布局为伸缩布局；<br><code>-webkit-box-orient</code>设置伸缩项的布局方向；<br><code>text-overflow: ellipsis;</code>则表示超出盒子的部分使用省略号表示。</p>
<h2 id="articleHeader3">二、非webkit内核实现</h2>
<blockquote><p>不过本文将要介绍的方法是<code>采用CSS规范中的属性</code>，并结合特殊的实现技巧完成的。这意味着在实现CSS2.1规范的浏览器中都是可以兼容的，不将仅仅是纯粹的移动端领域，在传统的PC浏览器（你们懂得我指的是哪些浏览器）中仍是可行的。好吧，让我们一起见识下。</p></blockquote>
<p>一共7个步骤，最简单的就是截断文本，最难的部分则是<code>让一个元素出在其父块的溢出时的右下方</code>，并且当父元素未溢出时该元素消失不可见。（<code>代码可直接粘贴看效果</code>）</p>
<h3 id="articleHeader4">1、基本结构布局</h3>
<p>最简单的开始：当父包含框比较小时，将子元素布局到父包含框的右下角；<br>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;wrap&quot;>
        <div class=&quot;prop&quot;>
            1.prop
        </div>
        <div class=&quot;main&quot;>
            2.main 这里是主题内容，多行省略
        </div>
        <div class=&quot;end&quot;>
            3.end
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"prop"</span>&gt;
            <span class="hljs-number">1.</span><span class="hljs-keyword">prop</span>
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;
            <span class="hljs-number">2.</span>main 这里是主题内容，多行省略
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"end"</span>&gt;
            <span class="hljs-number">3.</span><span class="hljs-keyword">end</span>
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap {
    width: 400px;
    height: 50px;
    margin: 20px 20px 50px 300px;
    border: 5px solid #AAA;
    line-height: 25px;
}
.prop {
    float: left;
    width: 50px;
    height: 50px;
    background: #FAF;
}
.main {
    float: right;
    width: 350px;
    background: #AFF;
    word-break: break-all;
}
.end {
    position: relative;
    float: right;
    width: 50px;
    background: #FFA;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrap</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">50px</span> <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-number">#AAA</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
}
<span class="hljs-selector-class">.prop</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAF</span>;
}
<span class="hljs-selector-class">.main</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#AFF</span>;
    <span class="hljs-attribute">word-break</span>: break-all;
}
<span class="hljs-selector-class">.end</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FFA</span>;
}</code></pre>
<p><strong>效果如下面几张图（<code>注意黄色end的位置</code>）, 其实这个实现完全利用了元素浮动的基本规则。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLA53?w=417&amp;h=69" src="https://static.alili.tech/img/bVLA53?w=417&amp;h=69" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVLA6t?w=426&amp;h=122" src="https://static.alili.tech/img/bVLA6t?w=426&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">2、定位模拟'...'</h3>
<p>我们通过创建一个子元素来替代将要显示的省略号，当本文溢出的情形下该元素显示在正确的位置上。在接下来的实现中，我们创建一个realend元素，利用上一步骤中end元素浮动后的位置来实现realEnd元素的定位。<br>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;wrap&quot;>
        <div class=&quot;prop&quot;>1.prop</div>
        <div class=&quot;main&quot;>
            2.main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
        </div>
        <div class=&quot;end&quot;>
            3.end
            <div class=&quot;realEnd&quot;>realEnd</div>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"prop"</span>&gt;<span class="hljs-number">1.</span><span class="hljs-keyword">prop</span>&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;
            <span class="hljs-number">2.</span>main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"end"</span>&gt;
            <span class="hljs-number">3.</span><span class="hljs-keyword">end</span>
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"realEnd"</span>&gt;realEnd&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新增下面样式即可
.realEnd {
    position: absolute;
    width: 100%;
    height: 25px;
    top: -25px; /*等于高度的负值，就是文字的行高*/
    left: 350px;
    background: #FAA;
    font-size: 13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// 新增下面样式即可</span>
<span class="hljs-selector-class">.realEnd</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">25px</span>; <span class="hljs-comment">/*等于高度的负值，就是文字的行高*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAA</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
}</code></pre>
<p><strong>效果如图下图</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLBbo?w=431&amp;h=119" src="https://static.alili.tech/img/bVLBbo?w=431&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>若父元素并没有溢出，那么realend元素会出现在其右侧(设置wrap overflow：hidden即可，下面会解决)</p>
<p><span class="img-wrap"><img data-src="/img/bVLBbO?w=792&amp;h=133" src="https://static.alili.tech/img/bVLBbO?w=792&amp;h=133" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">3、优化定位</h3>
<p>第二步中我们针对end元素设置了相对定位，对realEnd元素设置了绝对定位。但是我们可以采用更简单的代码来实现，即只使用相对定位。熟悉定位模型的同学应该知道，相对定位的元素仍然占据文本流，同时针对元素设置偏移。这样， 就可以去掉end元素了，仅针对realEnd元素设置相对定位。<br>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;wrap&quot;>
        <div class=&quot;prop&quot;>1.prop</div>
        <div class=&quot;main&quot;>
            2.main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
        </div>
        <div class=&quot;realEnd&quot;>realEnd</div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"prop"</span>&gt;<span class="hljs-number">1.</span><span class="hljs-keyword">prop</span>&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;
            <span class="hljs-number">2.</span>main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
        &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"realEnd"</span>&gt;realEnd&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 删除end样式，realEnd样式更改如下
.realEnd {
    float: right;
    position: relative;
    width: 50px;
    height: 25px;
    top: -25px; /*等于高度的负值，就是文字的行高*/
    left: 350px;
    background: #FAA;
    font-size: 13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// 删除end样式，realEnd样式更改如下</span>
<span class="hljs-selector-class">.realEnd</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">25px</span>; <span class="hljs-comment">/*等于高度的负值，就是文字的行高*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">350px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAA</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
}</code></pre>
<p><strong>效果如图（<code>黄色的end已经没了</code>）</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLBee?w=457&amp;h=130" src="https://static.alili.tech/img/bVLBee?w=457&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">4、削窄prop元素</h3>
<p>目前，最左侧的prop元素的作用在于让realend元素在文本溢出时处在其正下方，在前几节的示例代码中为了直观的演示，设置prop元素的宽度为50px，那么现在为了更好的模拟实际的效果，我们缩小prop元素的宽度。</p>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 更改部分样式如下
.prop {
    float: left;
    width: 5px;/*缩小宽度为5px，其余属性不变*/
    height: 50px;
    background: #FAF;
}
.main {
    float: right;
    width: 400px;
    margin-left: -5px;/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/
    background: #AFF;
    word-break: break-all;
}
.realEnd {
    float: right;
    position: relative;
    width: 50px;
    height: 25px;
    top: -25px; /*等于高度的负值，就是文字的行高*/
    left: 400px;
    /*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/
    margin-left: -50px;
    padding-right: 5px;
    background: #FAA;
    font-size: 13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// 更改部分样式如下</span>
<span class="hljs-selector-class">.prop</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;<span class="hljs-comment">/*缩小宽度为5px，其余属性不变*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAF</span>;
}
<span class="hljs-selector-class">.main</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">5px</span>;<span class="hljs-comment">/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#AFF</span>;
    <span class="hljs-attribute">word-break</span>: break-all;
}
<span class="hljs-selector-class">.realEnd</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">25px</span>; <span class="hljs-comment">/*等于高度的负值，就是文字的行高*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-comment">/*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/</span>
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAA</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
}</code></pre>
<blockquote><p>由于CSS规范规定padding的值不可以为负数，因此只有设置margind-left为负值，<code>且等于其宽度</code>。这样做的最终目的就是保证realend元素处在prop元素的下方，保证在文本溢出的情况下定位准确性:</p></blockquote>
<p><strong>效果图如下</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVLBlq?w=423&amp;h=122" src="https://static.alili.tech/img/bVLBlq?w=423&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">5、流式布局 + 伪元素</h3>
<p>目前，realend元素的相关属性仍采用px度量，为了更好的扩展性，可以改用%替代。</p>
<p>同时，prop元素和realend元素可以采用伪元素来实现，减少额外标签的使用。</p>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mutil-line-ellipsis {
    width: 400px;
    height: 50px;
    margin: 20px 20px 50px 300px;
    border: 5px solid #AAA;
    line-height: 25px;
    /*overflow: hidden;*/
}
/*相当于之前的prop*/
.mutil-line-ellipsis:before {
    content: '';
    float: left;
    width: 5px;/*缩小宽度为5px，其余属性不变*/
    height: 50px;
    background: #FAF;
}
/*相当于之前的main*/
.mutil-line-ellipsis > :first-child {
    float: right;
    width: 100%;
    margin-left: -5px;/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/
    background: #AFF;
    word-break: break-all;
}
/*相当于之前的realEnd*/
.mutil-line-ellipsis:after {
    content: 'realEnd';
    float: right;
    position: relative;
    width: 50px;
    height: 25px;
    top: -25px; /*等于高度的负值，就是文字的行高*/
    left: 100%;
    /*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/
    margin-left: -50px;
    padding-right: 5px;
    background: #FAA;
    font-size: 13px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mutil-line-ellipsis</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">50px</span> <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-number">#AAA</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-comment">/*overflow: hidden;*/</span>
}
<span class="hljs-comment">/*相当于之前的prop*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;<span class="hljs-comment">/*缩小宽度为5px，其余属性不变*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAF</span>;
}
<span class="hljs-comment">/*相当于之前的main*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span> &gt; <span class="hljs-selector-pseudo">:first-child</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">5px</span>;<span class="hljs-comment">/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#AFF</span>;
    <span class="hljs-attribute">word-break</span>: break-all;
}
<span class="hljs-comment">/*相当于之前的realEnd*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'realEnd'</span>;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">25px</span>; <span class="hljs-comment">/*等于高度的负值，就是文字的行高*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-comment">/*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/</span>
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#FAA</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
}</code></pre>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;mutil-line-ellipsis&quot;>
    <div>
        2.main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点
        内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mutil-line-ellipsis"</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;
        <span class="hljs-number">2.</span>main 这里是要多行文本溢出省略的，内容多一点，内容多一点，内容多一点，内容多一点
        内容多一点，内容多一点，内容多一点，内容多一点，内容多一点，内容多一点
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>效果和上一步一样</p>
<h3 id="articleHeader9">6、隐藏</h3>
<p>之前的实现中在文本未溢出的情况下，realEnd元素会出现在父元素的右侧，正如<br><span class="img-wrap"><img data-src="/img/bVLHXc?w=882&amp;h=105" src="https://static.alili.tech/img/bVLHXc?w=882&amp;h=105" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>设置<br>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mutil-line-ellipsis {
     overflow: hidden;   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mutil-line-ellipsis</span> {
     <span class="hljs-attribute">overflow</span>: hidden;   
}</code></pre>
<h3 id="articleHeader10">7、美化</h3>
<p>现在我们离完结就差一步了，即去掉各元素的背景色，并且用“...”替换文本。最后为了优化体验，采用渐变来隐藏“...”覆盖的文本，（省略了一些兼容性的属性）。<br>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".mutil-line-ellipsis {
    width: 400px;
    height: 50px;
    line-height: 25px;
    margin: 20px 20px 50px 300px;
    border: 5px solid #AAA;
    line-height: 25px;
    overflow: hidden;
}
/*相当于之前的prop*/
.mutil-line-ellipsis:before {
    content: '';
    float: left;
    width: 5px;/*缩小宽度为5px，其余属性不变*/
    height: 50px;
}
/*相当于之前的main*/
.mutil-line-ellipsis > :first-child {
    float: right;
    width: 100%;
    margin-left: -5px;/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/
    word-break: break-all;
}
/*相当于之前的realEnd*/
.mutil-line-ellipsis:after {
    content: '...';
    box-sizing: content-box;
    float: right;
    position: relative;
    width: 50px;
    height: 25px;
    top: -25px; /*等于高度的负值，就是文字的行高*/
    left: 100%;
    /*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/
    margin-left: -50px;
    padding-right: 5px;
    font-size: 13px;
    text-align: right;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), #ffffff 40px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.mutil-line-ellipsis</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">50px</span> <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid <span class="hljs-number">#AAA</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-comment">/*相当于之前的prop*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">5px</span>;<span class="hljs-comment">/*缩小宽度为5px，其余属性不变*/</span>
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}
<span class="hljs-comment">/*相当于之前的main*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span> &gt; <span class="hljs-selector-pseudo">:first-child</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">5px</span>;<span class="hljs-comment">/*让main元素左移5px，这样main元素在宽度上就完全占满了父元素；*/</span>
    <span class="hljs-attribute">word-break</span>: break-all;
}
<span class="hljs-comment">/*相当于之前的realEnd*/</span>
<span class="hljs-selector-class">.mutil-line-ellipsis</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">'...'</span>;
    <span class="hljs-attribute">box-sizing</span>: content-box;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">25px</span>;
    <span class="hljs-attribute">top</span>: -<span class="hljs-number">25px</span>; <span class="hljs-comment">/*等于高度的负值，就是文字的行高*/</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-comment">/*而设置margin-left: -50px、padding-right: 5px则是为了让realend元素的盒模型的最终宽度计算为5px。*/</span>
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">text-align</span>: right;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, rgba(255, 255, 255, 0), <span class="hljs-number">#ffffff</span> <span class="hljs-number">40px</span>);
}</code></pre>
<p>效果（自己可调整省略样式）</p>
<p><span class="img-wrap"><img data-src="/img/bVLHZu?w=434&amp;h=79" src="https://static.alili.tech/img/bVLHZu?w=434&amp;h=79" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader11">总结之兼容性</h1>
<p>从上文的实现细节来看，我们利用的技巧完全是CSS规范中的浮动+定位+盒模型宽度计算，唯一存在兼容性问题的在于无关痛痒的渐变实现，因此可以在大多数浏览器下进行尝试。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS - 纯css实现多行文本溢出省略（兼容所有浏览器）

## 原文链接
[https://segmentfault.com/a/1190000008921613](https://segmentfault.com/a/1190000008921613)


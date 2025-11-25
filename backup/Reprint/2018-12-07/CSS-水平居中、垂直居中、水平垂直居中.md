---
title: 'CSS-水平居中、垂直居中、水平垂直居中' 
date: 2018-12-07 2:30:10
hidden: true
slug: dtup9svmqyt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1、水平居中</h1>
<h4>
<strong>水平居中</strong>可分为<strong>行内元素水平居中</strong>和<strong>块级元素水平居中</strong>
</h4>
<h4><strong>1.1 行内元素水平居中</strong></h4>
<p>这里行内元素是指文本text、图像img、按钮超链接等，只需给父元素设置text-align:center即可实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center{
        text-align:center;
}
<div class=&quot;center&quot;>水平居中</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>.center{
        <span class="hljs-built_in">text</span>-align:center;
}
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"center"</span>&gt;水平居中&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h4><strong>1.2 块级元素水平居中</strong></h4>
<ul>
<li>
<p><strong>定宽块级元素水平居中</strong><br>  只需给需要居中的块级元素加margin:0 auto即可，<strong>但这里需要注意的是，这里块状元素的宽度width值一定要有</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .center{
      width:200px;
      margin:0 auto;
      border:1px solid red;
  }
  <div class=&quot;center&quot;>水平居中</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  .center{
      <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
      <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid red;
  }
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"center"</span>&gt;水平居中&lt;/div&gt;
</code></pre>
</li>
<li>
<p><strong>不定宽块级元素水平居中</strong><br>  不定宽，即块级元素宽度不固定<br><strong>方法1：设置table</strong></p>
<p><strong>通过给要居中显示的元素</strong>，设置display:table，然后设置margin:0 auto来实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .center{
      display:table;
      margin:0 auto;
      border:1px solid red;
  }
  <div class=&quot;center&quot;>水平居中</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  .center{
      <span class="hljs-attribute">display</span>:table;
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
      <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid red;
  }
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"center"</span>&gt;水平居中&lt;/div&gt;</code></pre>
<p><strong>方法2：设置inline-block</strong>（多个块状元素）<br>  子元素设置inline-block，同时父元素设置text-align:center</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .center{
      text-align:center;
  }
  .inlineblock-div{
      display:inline-block;
  }
  <div class=&quot;center&quot;>
      <div class=&quot;inlineblock-div&quot;>1</div>
      <div class=&quot;inlineblock-div&quot;>2</div>
  </div>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>  .center{
      <span class="hljs-built_in">text</span>-align:center;
  }
  .inlineblock-<span class="hljs-keyword">div</span>{
      display:inline-block;
  }
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"center"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inlineblock-div"</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"inlineblock-div"</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;

</code></pre>
<p><strong>方法3：设置flex布局</strong><br>  只需把要处理的块状元素的父元素设置display:flex,justify-content:center;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .center{
      display:flex;
      justify-content:center;
  }
  <div class=&quot;center&quot;>
      <div class=&quot;flex-div&quot;>1</div>
      <div class=&quot;flex-div&quot;>2</div>
  </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>  .center{
      display:flex;
      justify-content:center;
  }
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"center"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"flex-div"</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"flex-div"</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong>方法4：position + 负margin；</strong><br><strong>方法5：position + margin：auto；</strong><br><strong>方法6：position + transform；</strong></p>
<p><strong>注：</strong>这里方法4、5、6同下面垂直居中一样的道理，只不过需要把top/bottom改为left/right，在垂直居中部分会详细讲述。</p>
</li>
</ul>
<h1 id="articleHeader1">2、垂直居中</h1>
<h4><strong>2.1 单行文本垂直居中</strong></h4>
<ul>
<li>设置paddingtop=paddingbottom；或</li>
<li>设置line-height=height；</li>
</ul>
<h4><strong>2.2 多行文本垂直居中</strong></h4>
<p>通过设置父元素table，子元素table-cell和vertical-align<br>vertical-align:middle的意思是把元素放在父元素的中部<br><span class="img-wrap"><img data-src="/img/bV7oef?w=532&amp;h=440" src="https://static.alili.tech/img/bV7oef?w=532&amp;h=440" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV7ofZ?w=372&amp;h=325" src="https://static.alili.tech/img/bV7ofZ?w=372&amp;h=325" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4><strong>2.3 块级元素垂直居中</strong></h4>
<p><strong>方法1：flex布局</strong><br>在需要垂直居中的父元素上，设置display:flex和align-items：center<br>要求：父元素必须显示设置height值<br><span class="img-wrap"><img data-src="/img/bV7ohG?w=268&amp;h=218" src="https://static.alili.tech/img/bV7ohG?w=268&amp;h=218" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>显示效果：<br><span class="img-wrap"><img data-src="/img/bV7ohK?w=293&amp;h=321" src="https://static.alili.tech/img/bV7ohK?w=293&amp;h=321" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>方法2：利用position和top和负margin</strong>（需知宽高）<br>1、设置元素为absolute/relative/fixed<br>2、margin=负一半<br><span class="img-wrap"><img data-src="/img/bV7onI?w=577&amp;h=546" src="https://static.alili.tech/img/bV7onI?w=577&amp;h=546" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>效果如下：<br><span class="img-wrap"><img data-src="/img/bV7on3?w=275&amp;h=229" src="https://static.alili.tech/img/bV7on3?w=275&amp;h=229" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>方法3：利用position和top/bottom和margin:auto</strong>（注意不是margin:0 auto）<br>1、position：absolute/relative/fixed<br>2、top/bottom：0<br>3、margin：auto<br><span class="img-wrap"><img data-src="/img/bV7ouX?w=513&amp;h=522" src="https://static.alili.tech/img/bV7ouX?w=513&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bV7ou5?w=241&amp;h=224" src="https://static.alili.tech/img/bV7ou5?w=241&amp;h=224" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>方法4：利用position和top和transform<br>transform中translate偏移的百分比就是相对于元素自身的尺寸而言的。<br><span class="img-wrap"><img data-src="/img/bV7ovU?w=529&amp;h=507" src="https://static.alili.tech/img/bV7ovU?w=529&amp;h=507" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>效果如下：<br><span class="img-wrap"><img data-src="/img/bV7owb?w=252&amp;h=225" src="https://static.alili.tech/img/bV7owb?w=252&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>注：</h4>
<ul>
<li>上述的块级垂直居中方法，稍加改动，即可成为块级水平居中方法，如top/bottom换成left/right</li>
<li>transform方法，可用于未知元素大小的居中</li>
</ul>
<h1 id="articleHeader2">3、水平垂直居中</h1>
<p><strong>方法1：绝对定位+margin:auto</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    div{
        width: 200px;
        height: 200px;
        background: green;
        
        position:absolute;
        left:0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: green;
        
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: auto;
    }</code></pre>
<p><strong>方法2：绝对定位+负margin</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    div{
        width:200px;
        height: 200px;
        background:green;
        
        position: absolute;
        left:50%;
        top:50%;
        margin-left:-100px;
        margin-top:-100px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>:green;
        
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">100px</span>;
    }</code></pre>
<p><strong>方法3：绝对定位+transform</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    div{
        width: 200px;
        height: 200px;
        background: green;
        
        position:absolute;
        left:50%;    /* 定位父级的50% */
        top:50%;
        transform: translate(-50%,-50%); /*自己的50% */
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">background</span>: green;
        
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;    <span class="hljs-comment">/* 定位父级的50% */</span>
        <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%); <span class="hljs-comment">/*自己的50% */</span>
    }</code></pre>
<p><strong>方法4：flex布局</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   .box{
         height:600px;  
         
         display:flex;
         justify-content:center;  //子元素水平居中
         align-items:center;      //子元素垂直居中
           /* aa只要三句话就可以实现不定宽高水平垂直居中。 */
    }
    .box>div{
        background: green;
        width: 200px;
        height: 200px;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>   <span class="hljs-selector-class">.box</span>{
         <span class="hljs-attribute">height</span>:<span class="hljs-number">600px</span>;  
         
         <span class="hljs-attribute">display</span>:flex;
         <span class="hljs-attribute">justify-content</span>:center;  <span class="hljs-comment">//子元素水平居中</span>
         <span class="hljs-attribute">align-items</span>:center;      <span class="hljs-comment">//子元素垂直居中</span>
           <span class="hljs-comment">/* aa只要三句话就可以实现不定宽高水平垂直居中。 */</span>
    }
    <span class="hljs-selector-class">.box</span>&gt;<span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">background</span>: green;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    }</code></pre>
<p><strong>方法5：table-cell实现居中</strong></p>
<ul><li>设置<br>  display:table-cell;<br>  text-align:center;<br>vertical-align: middle;</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS-水平居中、垂直居中、水平垂直居中

## 原文链接
[https://segmentfault.com/a/1190000014116655](https://segmentfault.com/a/1190000014116655)


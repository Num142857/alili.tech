---
title: '前端面试题总结——HTML(持续更新中)' 
date: 2018-12-13 2:30:07
hidden: true
slug: fgr3ndkz3rt
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端面试题总结——HTML(持续更新中)</strong></h1>
<h2 id="articleHeader1">1.什么是HTML？</h2>
<p>HTML：HyperText Markup Language超文本标记语言</p>
<h2 id="articleHeader2">2.XHTML和HTML有什么区别</h2>
<p>HTML是一种基本的WEB网页设计语言，XHTML是一个基于XML的标记语言</p>
<h2 id="articleHeader3">3.简述一下你对HTML语义化的理解？</h2>
<p>html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;</p>
<h2 id="articleHeader4">4.浏览器页面有哪三层构成，分别是什么，作用是什么?</h2>
<p>浏览器页面构成：结构层、表示层、行为层<br>分别是：HTML、CSS、JavaScript<br>作用：HTML实现页面结构，CSS完成页面的表现与风格，JavaScript实现一些客户端的功能与业务。</p>
<h2 id="articleHeader5">5.Doctype作用？严格模式与混杂模式如何区分？</h2>
<p>（1）作用：用于告知浏览器的解析器用什么文档标准解析这个文档。<br>（2）区分:如果HTML文档包含形式完整的DOCTYPE，那么他一般以标准模式呈现。DOCTYPE不存在或者格式不正确会导致文档已混杂模式呈现。</p>
<h2 id="articleHeader6">6.Quirks模式是什么？它和Standards模式有什么区别</h2>
<p>区别：<br>总体会有布局、样式解析和脚本执行三个方面的区别。<br>盒模型：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，而在Quirks 模式下，IE的宽度和高度还包含了padding和border。<br>设置行内元素的高宽：在Standards模式下，给&lt;span&gt;等行内元素设置wdith和height都不会生效，而在quirks模式下，则会生效。<br>用margin:0 auto设置水平居中：使用margin:0 auto在standards模式下可以使元素水平居中，但在quirks模式下却会失效。</p>
<h2 id="articleHeader7">7.页面导入样式时，使用link和@import有什么区别？</h2>
<p>（1）作用不同：link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；<br>   而@import是CSS提供的，只能用于加载CSS;<br>（2）加载不同：页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;<br>（3）兼容不同：import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;</p>
<h2 id="articleHeader8">8.知道的网页制作会用到的图片格式有哪些？</h2>
<p>Webp：WebP格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。<br>并能节省大量的服务器带宽资源和数据空间。Facebook Ebay等知名网站已经开始测试并使用WebP格式。<br>Apng：是PNG的位图动画扩展，可以实现png格式的动态图片效果，有望代替GIF成为下一代动态图标准。</p>
<h2 id="articleHeader9">9.文本标记</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.特殊字符
  1.&amp;nbsp; 表示一个空格
  2.&amp;lt; 表示一个<
  3.&amp;gt; 表示一个>
  4.&amp;copy; 表示版权
  5.&amp;yen; ￥
2.文本样式
  1.<b></b> :加粗
  2.<i></i> :斜体
  3.<u></u> :下划线
  4.<s></s> :删除线
  5.<sup></sup> :上标
  6.<sub></sub> :下标

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-number">1.</span>特殊字符
  <span class="hljs-number">1.</span><span class="hljs-variable">&amp;nbsp</span>; 表示一个空格
  <span class="hljs-number">2.</span><span class="hljs-variable">&amp;lt</span>; 表示一个<span class="hljs-params">&lt;
  <span class="hljs-number">3.</span><span class="hljs-variable">&amp;gt</span>; 表示一个&gt;</span>
  <span class="hljs-number">4.</span><span class="hljs-variable">&amp;copy</span>; 表示版权
  <span class="hljs-number">5.</span><span class="hljs-variable">&amp;yen</span>; ￥
<span class="hljs-number">2.</span>文本样式
  <span class="hljs-number">1.</span><span class="hljs-params">&lt;b&gt;</span><span class="hljs-params">&lt;/b&gt;</span> :加粗
  <span class="hljs-number">2.</span><span class="hljs-params">&lt;i&gt;</span><span class="hljs-params">&lt;/i&gt;</span> :斜体
  <span class="hljs-number">3.</span><span class="hljs-params">&lt;u&gt;</span><span class="hljs-params">&lt;/u&gt;</span> :下划线
  <span class="hljs-number">4.</span><span class="hljs-params">&lt;s&gt;</span><span class="hljs-params">&lt;/s&gt;</span> :删除线
  <span class="hljs-number">5.</span><span class="hljs-params">&lt;sup&gt;</span><span class="hljs-params">&lt;/sup&gt;</span> :上标
  <span class="hljs-number">6.</span><span class="hljs-params">&lt;sub&gt;</span><span class="hljs-params">&lt;/sub&gt;</span> :下标

</code></pre>
<h2 id="articleHeader10">10.什么是锚点</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 锚点就是网页中一个记号，可以通过超级链接跳转到该记号位置处。
 1.定义锚点
    1.使用a标记的name属性定义锚点
      <a name=&quot;锚点名称&quot;></a>
    2.使用任意标记的id属性定义锚点
      <ANY id=&quot;锚点名称&quot;></ANY>
 2.链接到锚点
      <a href=&quot;#锚点名称&quot;>本页面</a>
      <a href=&quot;url#锚点名称&quot;>其它页面</a>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 锚点就是网页中一个记号，可以通过超级链接跳转到该记号位置处。
 1.定义锚点
    1.使用a标记的name属性定义锚点
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    2.使用任意标记的id属性定义锚点
      <span class="hljs-tag">&lt;<span class="hljs-name">ANY</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"锚点名称"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ANY</span>&gt;</span>
 2.链接到锚点
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#锚点名称"</span>&gt;</span>本页面<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"url#锚点名称"</span>&gt;</span>其它页面<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre>
<h2 id="articleHeader11">11.div+css的布局有什么优点？</h2>
<p>（1）改版的时候更方便 只要改css文件。<br>（2）页面加载速度更快、结构化清晰、页面显示简洁。<br>表现与结构相分离。<br>（3）易于优化（seo）搜索引擎更友好，排名更容易靠前。</p>
<h2 id="articleHeader12">12.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？</h2>
<p>首先：CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。<br>（1）行内元素有：a b span img input select <br>（2）块级元素有：div p ul ol li dl dt dd  h1-h6<br>（3）常见的空元素：br-换行，hr-水平分割线；</p>
<h2 id="articleHeader13">13.iframe有那些缺点？</h2>
<p>1.iframe会阻塞主页面的Onload事件，会影响页面的并行加载；<br>2.搜索引擎的检索程序无法解读这种页面，不利于SEO;<br>改进：通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。</p>
<h2 id="articleHeader14">14.Label的作用是什么？是怎么用的？</h2>
<p>label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。</p>
<h2 id="articleHeader15">15.隐藏元素的几种方法</h2>
<p>（1）display:none;<br>（2）visibility:hidden;<br>（3）opacity:0;<br>（4）position:absolute; left:-10000px;</p>
<h2 id="articleHeader16">16.简述一下src与href的区别。</h2>
<p>src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。</p>
<h2 id="articleHeader17">17.实现不使用 border 画出1px高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果</h2>
<p>&lt;div style="height:1px;overflow:hidden;background:red"&gt;&lt;/div&gt;</p>
<h2 id="articleHeader18">18.如何给背景图片加上超链接</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;swiper-slide &quot; 
style='background:#dedede url() no-repeat center center;background-size:contain'>
    <a  class=&quot;banner-a&quot;rel=&quot;nofollow&quot; href=&quot;#&quot;></a>
</div>

.banner-a{
      width:100%;
      height: 8rem;
      display: inline-block;
}    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div class=<span class="hljs-string">"swiper-slide "</span> 
<span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>:#dedede url() no-repeat <span class="hljs-built_in">center</span> <span class="hljs-built_in">center</span>;<span class="hljs-built_in">background</span>-size:contain'&gt;
    &lt;a  class=<span class="hljs-string">"banner-a"</span>rel=<span class="hljs-string">"nofollow"</span> href=<span class="hljs-string">"#"</span>&gt;&lt;/a&gt;
&lt;/div&gt;

.banner-a{
      <span class="hljs-built_in">width</span>:<span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
      <span class="hljs-built_in">height</span>: 8<span class="hljs-built_in">rem</span>;
      <span class="hljs-built_in">display</span>: inline-<span class="hljs-built_in">block</span>;
}    
</code></pre>
<h2 id="articleHeader19">19.清除浮动的方法有哪些？</h2>
<p>第一种：clear:both</p>
<p>在父元素的里面添加一个空的clear的div（跟浮动的子级同级），然后再为这个类添加属性值clear:both;便可以清除浮动。</p>
<p>第二种：overflow：hidden</p>
<p>在父元素的样式中添加overflow: hidden;也可以清除浮动，如下css代码，但不提倡使用这个方法，overflow: hidden;还有一个意思就是隐藏超出的部分，处理不好还是会给页面带来麻烦。</p>
<p>第三种：clearfix(推荐使用)</p>
<p>1.在父集元素类名中添加 clear-fix<br>2.写伪类样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>  
.clear-fix::after {
   content:&quot;&quot;; 
   display: block; 
   clear:both; 
}
</style>

<div class=&quot;header-line clear-fix&quot;>
            <div class=&quot;header-logo&quot;>
                <a class=&quot;logo&quot;href=&quot; https://www.meisaas.com/index.html&quot;>样式方案</a>
            </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">  
<span class="hljs-selector-class">.clear-fix</span><span class="hljs-selector-pseudo">::after</span> {
   <span class="hljs-attribute">content</span>:<span class="hljs-string">""</span>; 
   <span class="hljs-attribute">display</span>: block; 
   <span class="hljs-attribute">clear</span>:both; 
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header-line clear-fix"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header-logo"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span><span class="hljs-attr">href</span>=<span class="hljs-string">" https://www.meisaas.com/index.html"</span>&gt;</span>样式方案<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题总结——HTML(持续更新中)

## 原文链接
[https://segmentfault.com/a/1190000013353474](https://segmentfault.com/a/1190000013353474)


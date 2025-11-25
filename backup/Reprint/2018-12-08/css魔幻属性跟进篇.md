---
title: 'css魔幻属性跟进篇' 
date: 2018-12-08 2:30:30
hidden: true
slug: 4hmr0x9y6hu
categories: [reprint]
---

{{< raw >}}

                    
<p>白话：即上一篇我脑中飘来飘去的css魔幻属性自己的文章推出之后，这是自己写的第四篇CSS相关的文章，文章绝大部分是自己工作总结得来，另一部分是平日sf回答的与面试中向面试官交流学到的，都是一些比较基础，刨根问底的知识分享。</p>
<ul>
<li><a href="http://closertb.site/2017/12/%E6%88%91%E8%84%91%E4%B8%AD%E9%A3%98%E6%9D%A5%E9%A3%98%E5%8E%BB%E7%9A%84css%E9%AD%94%E5%B9%BB%E5%B1%9E%E6%80%A7/" rel="nofollow noreferrer" target="_blank">我脑中飘来飘去的css魔幻属性</a></li>
<li><a href="http://closertb.site/2017/06/%E6%88%91%E6%89%80%E4%B8%8D%E6%B3%A8%E6%84%8F%E7%9A%84%E9%82%A3%E4%BA%9BCSS%E5%86%B7%E7%9F%A5%E8%AF%86%EF%BC%8C%E5%8D%B4%E9%98%BB%E6%AD%A2%E4%BA%86%E6%88%91%E5%81%9A%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%80%9F%E5%BA%A6/" rel="nofollow noreferrer" target="_blank">我所不注意的那些CSS冷知识，却阻止了我做项目的速度</a></li>
<li><a href="http://closertb.site/2017/11/%E5%85%B3%E4%BA%8ECSS%E6%A0%B7%E5%BC%8F%E5%8A%A8%E6%80%81%E6%B3%A8%E5%85%A5%EF%BC%8C%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84%E9%82%A3%E4%BA%9B%E5%86%B7%E7%9F%A5%E8%AF%86/" rel="nofollow noreferrer" target="_blank">关于CSS样式动态注入，你不知道的那些冷知识</a></li>
</ul>
<h2 id="articleHeader0">清除浮动的原理</h2>
<p>在上一篇我脑中飘来飘去的css魔幻属性提到浮动不按想要的方式浮，里面提到清除浮动其实按原理来讲，就两个：</p>
<ul>
<li>clear：both(不准确，后面会讲)</li>
<li>触发BFC</li>
</ul>
<p>前面因为没咋搞明白，就没有说为什么，最近因为偶然在sf上有人提问，就顺着这个问题去搜了相关资料，找了点答案。</p>
<h3 id="articleHeader1">clear 清除浮动</h3>
<p>clear清除浮动的操作，基本思路是这样。首先为要清除浮动的盒子引入清除元素，现实表现里一般为一个空元素或者伪元素（before,after）。设置了clear属性后，盒子渲染时，会将这个元素的top border（上边缘）与浮动元素的底部对齐，来达到将盒子撑开的目的。但是这个与浮动元素底部对齐的元素与clear设置的属性（both,left,top）有关,具体可以看<a href="https://www.w3.org/wiki/CSS/Properties/clear" rel="nofollow noreferrer" target="_blank">W3C标准</a>。还是很简单易懂的。如果说的不是很明白，可以拷贝这段代码，试一下，然后切换clear的值，就会有种恍然大悟的感觉。 如果你觉得还不够直观，你可以将content的“”里写两个字，或则加个margin,border什么的。 <br><strong> html 代码 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div class=&quot;float-left&quot;>
        这是左边浮动元素
    </div>
    <div class=&quot;clear-box&quot;>
        <div class=&quot;float-right&quot;>这是右侧浮动元素</div>
        <div>这是正常布局文档流元素。</div>
    </div>
</body>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;body&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"float-left"</span>&gt;
        这是左边浮动元素
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"clear-box"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"float-right"</span>&gt;这是右侧浮动元素&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span>&gt;这是正常布局文档流元素。&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/body&gt;  
</code></pre>
<p><strong> css代码 </strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".float-left{
  float: left;
  width: 100px;
  height: 100px;
  background-color: lightpink;
}
.clear-box{
  margin-top: 50px; //这个没有用
  background-color: lightgreen;
  font-size: 16px;
}
.clear-box:after{
  content: '';
  display: block;
  clear: right; //both left
}
.float-right{
    width:100px;
    height:75px;
    float:left;
    background-color:red;
    border:1px solid black;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.float-left</span>{
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background-color</span>: lightpink;
}
<span class="hljs-selector-class">.clear-box</span>{
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">50px</span>; <span class="hljs-comment">//这个没有用</span>
  <span class="hljs-attribute">background-color</span>: lightgreen;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}
<span class="hljs-selector-class">.clear-box</span>:after{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">clear</span>: right; <span class="hljs-comment">//both left</span>
}
<span class="hljs-selector-class">.float-right</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">75px</span>;
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">background-color</span>:red;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid black;
}
</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/745/978/745978850-5ab21c2f0fd8b_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/745/978/745978850-5ab21c2f0fd8b_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/405/395/4053951900-5ab21b52a20b0_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/405/395/4053951900-5ab21b52a20b0_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">BFC 清除浮动</h3>
<p>说BFC清除浮动之前，得知道BFC的概念：  <br>块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是<strong>浮动元素</strong>与其他元素的交互限定区域。其作用简单来讲就是，保证整个文档流中盒子与盒子之间的布局不相互干扰，这里其实已经很显示的说明BFC一大功效就是清除浮动，<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context" rel="nofollow noreferrer" target="_blank">触发BFC的条件详见MDN</a>。  <br>至于BFC为什么可以清除浮动，就是形成BFC的盒子，其边框会去查询盒子里所有的正常布局文档流，和浮动的文档流，然后将盒子的底部边缘与盒子里最底部元素的盒子边缘对齐（这么讲会不会被警察关禁闭）。与clear区别的，这种清除浮动由于是盒子自己触发BFC，所以只能清除盒子里面的元素，而前面可以清除同一行所有左右两边的浮动。</p>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/378/420/3784209841-5ab2226976a34_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/378/420/3784209841-5ab2226976a34_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>自此，清除浮动的原理就讲完了。但在这次参加面试前，一个问题自己也一直想搞懂，浮动是否脱离了文档流。MDN中是这样定义的：float CSS属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动中移除，尽管仍然保持部分的流动性（与绝对定位相反）。这相反指的是什么，想知道。  </p>
<p><strong>重点强调：</strong>设置了float属性的元素，其display是什么属性。答案：block。inline元素设置为float后，其width和height都变成了可设置的属性。其原因就是设置float触发了BFC。是inline元素变成了一个块级盒子。其同样适用于设置position属性为绝对定位或固定定位的内联元素。</p>
<h2 id="articleHeader3">重新认识盒子之padding</h2>
<p>学前端的，出去面试，浮动和盒模型是必问。这里也不再说正常盒模型（W3C）与怪异盒模型（IE）的区别，重点谈padding。</p>
<h3 id="articleHeader4">设置相对单位时，其参照值是谁</h3>
<p>首先是说说单位。一般来说设定盒子某一属性，有如下几种单位可以设置：</p>
<ul>
<li>padding ：20%；</li>
<li>padding ：2em；</li>
<li>padding ：5px;(最常见的)</li>
<li>padding ：2vh；</li>
<li>padding ：2rem;</li>
</ul>
<p>px,vh,vw,rem这些绝对单位很好理解，但如果是em和%,你是否足够留意，其是根据谁来作为参照来计算的。首先%，直接看代码和效果图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;big&quot;>
     <div class=&quot;small&quot;>这是子元素</div>
 </div>
    
.big{
  height:200px;
  width:1000px;
  background-color: yellowgreen;
}
.big .small{
  width:50%;
  height:50%;
  margin-top:5%;
  margin-left:5%;
  border-top: 5px solid red;
  border-left: 5px solid red;
  padding-top: 5%;
  padding-left: 5%;
  background-color: #0e8cf6;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"big"</span>&gt;
     &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"small"</span>&gt;这是子元素&lt;/div&gt;
 &lt;/div&gt;
    
.big{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">1000px</span>;
  <span class="hljs-attribute">background-color</span>: yellowgreen;
}
<span class="hljs-selector-class">.big</span> .small{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">5%</span>;
  <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">5%</span>;
  <span class="hljs-attribute">border-top</span>: <span class="hljs-number">5px</span> solid red;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">5px</span> solid red;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">5%</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">5%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0e8cf6</span>;
}

</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/365/037/3650372559-5ab26c5fe6623_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/365/037/3650372559-5ab26c5fe6623_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/244/847/2448479491-5ab26bab3e122_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/244/847/2448479491-5ab26bab3e122_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从上面的图可以看出，margin,padding无论是top还是left设置为5%都是50,算下来就是以父级元素的宽度来作为参照的。不要问为啥border不能设置百分比，我不知道，我也没这种需求。  <br>再看一下以em为单位是以谁做参照，HTML与上面一致，上css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".big{
  height:200px;
  width:1000px;
  font-size: 14px;
  background-color: yellowgreen;
}
.big .small{
  width:50%;
  height:50%;
  margin-top:2em;
  margin-left:2em;
  border-top: 5px solid red;
  border-left: 5px solid red;
  padding-top: 2em;
  padding-left: 2em;
  font-size: 20px;
  background-color: #0e8cf6;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.big</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">1000px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
  <span class="hljs-attribute">background-color</span>: yellowgreen;
}
<span class="hljs-selector-class">.big</span> <span class="hljs-selector-class">.small</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">2em</span>;
  <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">2em</span>;
  <span class="hljs-attribute">border-top</span>: <span class="hljs-number">5px</span> solid red;
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">5px</span> solid red;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">2em</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0e8cf6</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/137/590/1375908612-5ab26dc5dc8a0_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/137/590/1375908612-5ab26dc5dc8a0_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从计算样式盒子可以看出，margin,padding无论是top还是left设置为2em都是以元素自身的font-size来计算的，所以和百分比又不一样。</p>
<p>如果知道这些，UI需求是让你在一个盒子里画一个正方形盒子，你就很自然的会想到。用padding的百分比特性来做。<br><strong> 如果再多想一些，当我们用css3特性来做位移比如：transform：translate（50%，50%）,其又是相对谁来计算呢？这里直接给出答案：其参照值是元素本身的长和宽，和前面padding又不一样。</strong></p>
<h3 id="articleHeader5">盒子里面的绝对定位，其零点在哪里</h3>
<p>自己写了一年css,其实一直只关注了设置border-box与content-box盒子模型时padding表现的差别。但这个盒子的零点，及子元素固定定位相对的零点在哪里呢？还是先看代码和效果图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;big&quot;>
    <div class=&quot;small&quot;>
        <!--<div class=&quot;normal&quot;>这是正常文档流子元素</div>-->
        <div class=&quot;position&quot;>这是绝对定位子元素</div>
    </div>
</div> 

.small .normal{
  height:40px;
  background-color: #999;
}
.small .position{
  position: absolute;
  width: 90%;
  height:30px;
  //top:0; 
  //left:0;
  background-color: white;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"big"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"small"</span>&gt;
        &lt;!--&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"normal"</span>&gt;这是正常文档流子元素&lt;/div&gt;--&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"position"</span>&gt;这是绝对定位子元素&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt; 

<span class="hljs-selector-class">.small</span> .<span class="hljs-attribute">normal</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#999</span>;
}
<span class="hljs-selector-class">.small</span> .<span class="hljs-attribute">position</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">30px</span>;
  <span class="hljs-comment">//top:0; </span>
  <span class="hljs-comment">//left:0;</span>
  <span class="hljs-attribute">background-color</span>: white;
}
</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/140/836/1408365083-5ab2fb1de8ad6_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/140/836/1408365083-5ab2fb1de8ad6_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/305/913/3059133048-5ab2fbfff29ad_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/305/913/3059133048-5ab2fbfff29ad_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上面四张图片，分别展示了绝对定位时，设置top，left与不设置的差别。不设置时，其文档流开始的起点是<strong>正常文档流</strong>的位置，而设置了top，left的地方，其起点是父元素（padding+content）区域零点的位置。以上效果和父元素设置不设置box-sizing: border-box属性无关，表现一致。</p>
<h3 id="articleHeader6">奇葩的内联元素padding</h3>
<p>sf上面有这样<a href="https://segmentfault.com/q/1010000013651675/a-1020000013652427">一个提问</a>：为什么设置display:inline后，padding-bottom仍然起作用？如果一般看过css基础知识的人，都知道内联元素设置margin-top、bottom,padding-top、bottom是不起作用的，所以日常开发，我们一般不会用这两个属性,要用时更多也是把内联元素转换为inline-box。重现问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;fu&quot;>
    <p>1505</p>
    <p>计科</p>
</div>  

#fu{
  //  margin-top: 20px;
  //  background-color: yellowgreen;
}
#fu p{
  display: inline;
  margin: 20px;
  padding: 20px;
  border: 5px solid transparent;
  background-color: #0e8cf6;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;div id="fu"&gt;</span>
    <span class="hljs-params">&lt;p&gt;</span><span class="hljs-number">1505</span><span class="hljs-params">&lt;/p&gt;</span>
    <span class="hljs-params">&lt;p&gt;</span>计科<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span>  

<span class="hljs-meta">#fu{</span>
  <span class="hljs-comment">//  margin-top: 20px;</span>
  <span class="hljs-comment">//  background-color: yellowgreen;</span>
}
<span class="hljs-meta">#fu p{</span>
<span class="hljs-symbol">  display:</span> inline;
<span class="hljs-symbol">  margin:</span> <span class="hljs-number">20</span>px;
<span class="hljs-symbol">  padding:</span> <span class="hljs-number">20</span>px;
<span class="hljs-symbol">  border:</span> <span class="hljs-number">5</span>px solid transparent;
  background-color: <span class="hljs-meta">#0e8cf6;</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/263/892/2638925197-5ab3080339029_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/263/892/2638925197-5ab3080339029_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>上面是三幅图，分别代表三种状态。通过不断递进，我们就可以回答上面那个问题了。其实不是padding-bottom仍然起作用，准确来说是padding-bottom与padding-top都会起作用，只是起作用只是从表现上起作用，但并不占据文档流。怎么理解？第一：父元素黄绿色背景区域的高度和子元素内容高度一致，说明padding高度并没有被计算在内；第二：父元素没有加margin-top来占位时，padding-top那块区域是不可见的，所以内联元素padding是没有在正常文档流的。至于为什么，可以理解为内联元素没有盒模型，其高度由内容决定。由于其没有盒模型，所以没法控制padding-top和padding-bottom。</p>
<h2 id="articleHeader7">纵向上的margin:auto 用于垂直居中</h2>
<p>这一波面试，谈css的技术面试官，基本都会提怎么垂直水平居中。这确实是一个老生常谈的问题，以致于我越往后，回答的越含糊，如果你还不知道，可以看看<a href="https://juejin.im/post/5854e137128fe100698e6271" rel="nofollow noreferrer" target="_blank">这篇文章</a>。基本就四种：table,flex,translate,定位加margin：auto。最后这一种很少人听说，但在居中盒子长宽值确定时，适用性确实很高。具体怎么操作呢：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div class=&quot;item&quot;>
        <div class=&quot;items-center&quot;>
            这是一个居中
        </div>
 </div>

.item{
  width: 500px;
  height: 500px;
  position: relative;/*关键设置*/
  background-color: #999;
}  
.item-center{
    position: absolute; /*关键设置，也可fixed*/
    top:0; /*关键设置*/
    bottom: 0;/*关键设置*/
    left:0;/*关键设置*/
    right:0;/*关键设置*/
    height:300px;/*关键设置，也可其他单位*/
    width: 300px;/*关键设置，也可其他单位*/
    margin: auto;/*关键设置*/
    background-color: yellowgreen;
    border: 5px solid darkgray;
}  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"item"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"items-center"</span>&gt;
            这是一个居中
        &lt;/div&gt;
 &lt;/div&gt;

.item{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
  <span class="hljs-attribute">position</span>: relative;<span class="hljs-comment">/*关键设置*/</span>
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#999</span>;
}  
.item-center{
    <span class="hljs-attribute">position</span>: absolute; <span class="hljs-comment">/*关键设置，也可fixed*/</span>
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>; <span class="hljs-comment">/*关键设置*/</span>
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;<span class="hljs-comment">/*关键设置*/</span>
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;<span class="hljs-comment">/*关键设置*/</span>
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;<span class="hljs-comment">/*关键设置*/</span>
    <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;<span class="hljs-comment">/*关键设置，也可其他单位*/</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;<span class="hljs-comment">/*关键设置，也可其他单位*/</span>
    <span class="hljs-attribute">margin</span>: auto;<span class="hljs-comment">/*关键设置*/</span>
    <span class="hljs-attribute">background-color</span>: yellowgreen;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid darkgray;
}  
</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/205/609/2056099390-5ab31bad7ad0d_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/205/609/2056099390-5ab31bad7ad0d_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上面的效果图，可以看到这种水平垂直居中方案也是666啊，前提是width,height必须显示设定，只兼容IE8+，其同样也适用于position：fixed的情况，具体视UI需求。我们通常只知道针对于块级元素，如果其定宽，可以使用margin：0 auto；来水平居中的，那这里又用auto实现了垂直居中，怎么实现的？本来想好好写的，可又看见我张老师已经做了一次剖析，自己只能仰望，<a href="http://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D-%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD/" rel="nofollow noreferrer" target="_blank">献上地址</a>。基本上从两个方面解释，能稍微解释同：<br>1：left,right,top,bottom设置为0，那么就说明item-center这个盒子，是会填满整个父级容器item的；<br>2：margin：auto 默认只会计算左右边距，所以上下如果设置为auto时默认是0；但对于脱离了正常文档流的定位元素，这个auto对于上下也是有效的，会自动均分左右两边的距离。所以这个盒子已经显示设定宽高，那么margin就会自动计算均分，达到居中的效果。</p>
<h2 id="articleHeader8">一些零碎的知识</h2>
<p>下面是一些零碎的经验分享，写出来共勉。</p>
<h3 id="articleHeader9">字体图标的使用</h3>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/957/959/95795980-5ab856000afa8_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/957/959/95795980-5ab856000afa8_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>字体图标出现以后，其实精灵图的很多实用场景就被取代了，前端切图仔又可以好好安心写代码了。但使用字体图标图标还是有需要注意的地方，比如上方那张图，从正常到不正常（字体边框模糊），其实也就是font-weight设置的问题，由于font的继承性关系，所以很容易出现问题,所以字体图标样式初始化的时候将font-style与weight置为important还是很有必要的。  </p>
<p>.ued-components{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family:&quot;fe-components&quot; !important;  //引用字体图标库
font-size:16px;
font-style:normal !important;  //设置字体样式
font-weight:normal !important;  //设置字体加粗程度
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">font-family</span>:<span class="hljs-string">"fe-components"</span> <span class="hljs-meta">!important</span>;  <span class="hljs-comment">//引用字体图标库</span>
<span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;
<span class="hljs-attribute">font-style</span>:normal <span class="hljs-meta">!important</span>;  <span class="hljs-comment">//设置字体样式</span>
<span class="hljs-attribute">font-weight</span>:normal <span class="hljs-meta">!important</span>;  <span class="hljs-comment">//设置字体加粗程度</span>
-webkit-<span class="hljs-attribute">font</span>-smoothing: antialiased;
-moz-osx-<span class="hljs-attribute">font</span>-smoothing: grayscale;</code></pre>
<p>}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;ued-components send-img&quot;>&amp;#xe6ae;</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ued-components send-img"</span>&gt;&amp;<span class="hljs-comment">#xe6ae;&lt;/div&gt;</span></code></pre>
<h3 id="articleHeader10">CSS动画丢帧</h3>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/647/415/647415641-5ab85a4e4bc75_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/647/415/647415641-5ab85a4e4bc75_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>以上是一个用css3 animation 做的一个演示动画，如果仔细看，可以感觉到那种车速和档位不匹配的那种感觉，就是抖、抖、抖，看一下css代码的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".logo-animate {
    position: relative;
    line-height: 0;
    width: 240px;
    animation: move-float 8s linear 0s infinite;
}

@keyframes move-float {
    0% {
        margin-top:0;
    }
    50% {
        margin-top:-22px;
    }
    100% {
        margin-top:0;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.logo-animate</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">240px</span>;
    <span class="hljs-attribute">animation</span>: move-float <span class="hljs-number">8s</span> linear <span class="hljs-number">0s</span> infinite;
}

@<span class="hljs-keyword">keyframes</span> move-float {
    0% {
        <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">0</span>;
    }
    50% {
        <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">22px</span>;
    }
    100% {
        <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">0</span>;
    }
}</code></pre>
<p>在过往依赖jQuery的animate做图片轮播和列表轮播时，习惯于用margin来做位移。但是用纯css来做得时候，发现实现有明显的卡顿。后面一查看了<a href="https://segmentfault.com/a/1190000006708777">一篇文章</a>，发现css的animation实现最好依赖于transform来做，避免使用height,width,margin,padding等，具体原因在前面文章中有提到。所以代码优化一下，就是下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes move-float {
    0% {
        transform: translate(95px, 0);
    }
    50% {
        transform: translate(95px, -22px);
    }
    100% {
        transform: translate(95px, 0);
    }
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> move-float {
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(95px, 0);
    }
    50% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(95px, -22px);
    }
    100% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(95px, 0);
    }
}  </code></pre>
<h3 id="articleHeader11">字体溢出省略号的使用</h3>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/357/526/3575264451-5ab8698404a29_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/357/526/3575264451-5ab8698404a29_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上图展示的那样，当我文字过多时，需要截断文字，使用省略号来保证正常的显示效果。用css的实现基本都是下面这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">overflow</span>: hidden;
<span class="hljs-attribute">text-overflow</span>: ellipsis;
<span class="hljs-attribute">white-space</span>: nowrap;  
</code></pre>
<p>但是遇到table的情况，尽管你设置了td的width属性，但还是不起作用。这是因为table布局的流体属性，其会根据内容再重新分配空间，所以还需要加上一个table-layout：fixed 这样的属性设置。其实除了单行可以用css做文字截取，多行也可以，只是在兼容性上和效果上还不足以在线上环境来使用。但是实现思路还是可以看一看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">display</span>: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: <span class="hljs-number">2</span>;
<span class="hljs-attribute">overflow</span>: hidden;  
</code></pre>
<p><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/200/787/2007875320-5ab8712920854_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/200/787/2007875320-5ab8712920854_articlex" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端，但是要想做到兼容及显示效果完美，还是用css配合js来做，单行css来做已足够，但记得设置title属性，保证hover能读到完整的信息。        <br>作为一个写CSS不到两年的前端，在工作中吃了很多基础不扎实的亏。学CSS也不如JS那样简单，知识成体系，所以除了看完一本CSS基础知识的书以外，更多的还是写、写、写，然后思考，尝试用不同的思路来解决。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css魔幻属性跟进篇

## 原文链接
[https://segmentfault.com/a/1190000013997277](https://segmentfault.com/a/1190000013997277)


---
title: 'css写作建议和性能优化小结' 
date: 2018-12-30 2:30:10
hidden: true
slug: w5ttgsqb9h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>还有几天就到国庆中秋了，快要放假了，先祝大家节日快乐！之前写过js的写作建议和技巧，那么今天就来聊聊css吧！说到css，每一个网页都离不开css，但是对于css，很多开发者的想法就是，css只要能用来布局，把效果图排出来就可以了，其它的细节或者优化，不需要怎么考虑。但是我觉得css可不只是把页面的布局完成就是完事的，还需要考虑很多细节有优化，更不会像大家想得那么简单，在学习当中，如果发现什么技巧或者优化的点，我也会学以致用！那么今天，就分享下我总结的css写作建议和性能优化的一些问题！希望能帮让大家对神奇的css有一个新认识，当然，如果大家觉得还有什么其它的建议。欢迎指点！</p>
<h2 id="articleHeader1">2.css渲染规则</h2>
<p>首选，关于css渲染的规则，大家可能都知道，是从右到左的渲染！如下栗子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nav h3 a{font-size: 14px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.nav</span> <span class="hljs-selector-tag">h3</span> <span class="hljs-selector-tag">a</span>{<span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;}</code></pre>
<p>渲染过程大概是：首先找到所有的<code>a</code>，沿着<code>a</code>的父元素查找<code>h3</code>，然后再沿着<code>h3</code>，查找<code>.nav</code>。中途找到了符合匹配规则的节点就加入结果集。如果找到根元素<code>html</code>都没有匹配，则不再遍历这条路径，从下一个<code>a</code>开始重复这个查找匹配（只要页面上有多个最右节点为<code>a</code>）。<br>参考：<a href="http://www.cnblogs.com/zhaodongyu/p/3341080.html" rel="nofollow noreferrer" target="_blank">CSS选择器从右向左的匹配规则</a></p>
<h2 id="articleHeader2">3.嵌套层级不要超过3级</h2>
<p>一般情况下，元素的嵌套层级不能超过3级，过度的嵌套会导致代码变得臃肿，沉余，复杂。导致css文件体积变大，造成性能浪费，影响渲染的速度！而且过于依赖HTML文档结构。这样的css样式，维护起来，极度麻烦，如果以后要修改样式，可能要使用<code>!important</code>覆盖。</p>
<h2 id="articleHeader3">4.样式重置</h2>
<p>这个我目前保持中立意见，因为看着网上的文章，有些人支持使用样式重置，有些人不支持使用，谁也说服不了谁。我自己的情况，我有使用样式重置，但是是比较简单的一个总结，代码如下！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,dl,dd,h1,h2,h3,h4,h5,h6,p,form,ol,ul {
  margin: 0;
  padding: 0;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: normal;
}

ol, ul {
  list-style: none;
}
h1{
  font-size: 24px;
}

h2{
  font-size: 20px;
}

h3{
  font-size: 18px;
}

h4 {
  font-size: 16px;
}

h5{
  font-size: 14px;
}

h6{
  font-size: 12px;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}

<span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style</span>: none;
}
h1{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
}

h2{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
}

h3{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
}

<span class="hljs-selector-tag">h4</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}

h5{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}

h6{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}
</code></pre>
<h2 id="articleHeader4">5.样式级别</h2>
<p>首先，css样式级别整理如下</p>
<p>!important&gt;行内样式 &gt;id样式&gt;class样式&gt;标签名样式。<br>然后有一点要提一下就是，组合选择器使用权值会叠加的。比如id的权值是100，class是10，标签名是1（其它不清楚了）！那么<code>div.test-class</code>权值就是11，<code>div#test</code>就是101</p>
<p>比如有一个div</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;test&quot; class=&quot;test-class&quot; style=&quot;color:green;&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"test"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"test-class"</span> style=<span class="hljs-string">"color:green;"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>那么样式权值方面就是</p>
<p><code>div {color: red !improtant;}</code>（大于下面的一切）<br><code>&lt;div id="test" class="test-class" style="color:black;"&gt;&lt;/div&gt;</code>（大于111）<br><code>div#test.test-class</code>（111）<br><code>#id.test-class</code>（110）<br><code>div#test</code>（101）<br><code>#test</code>（100）<br><code>div.test-class</code>（11）<br><code>.test-class</code>（10）<br><code>div</code>（1）<br><code>*</code>（小于1）</p>
<h2 id="articleHeader5">6.inline-block的边距</h2>
<p>不解释，看图</p>
<p><span class="img-wrap"><img data-src="/img/bVVMYg?w=1458&amp;h=477" src="https://static.alili.tech/img/bVVMYg?w=1458&amp;h=477" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>上面几个<code>p</code>元素<code>margin</code>和<code>padding</code>都为0，但是还有边距。这个的解决方案有两种</p>
<p>1.删除代码之前的空行空格</p>
<p>带<code>display:inline-block</code>的元素之前的空行都删除掉，如下写法</p>
<p><span class="img-wrap"><img data-src="/img/bVVMY1?w=1384&amp;h=379" src="https://static.alili.tech/img/bVVMY1?w=1384&amp;h=379" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>2.父元素font-size设置为0,这个直接看图</p>
<p><span class="img-wrap"><img data-src="/img/bVVMY9?w=1343&amp;h=404" src="https://static.alili.tech/img/bVVMY9?w=1343&amp;h=404" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVMZf?w=1318&amp;h=432" src="https://static.alili.tech/img/bVVMZf?w=1318&amp;h=432" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">7.图片要设置width和height</h2>
<p>如果页面有使用img标签，那么img很建议设置width和height。目的是为了在网速差或者其它原因加载不出图片的时候，保证布局不会乱。<br>如下栗子，一个很普通的布局。<br><span class="img-wrap"><img data-src="/img/bVVPzW?w=404&amp;h=118" src="https://static.alili.tech/img/bVVPzW?w=404&amp;h=118" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是万一出现什么情况，图片加载不出来的话，建议的处理方式是第一种，显示一张默认图片，即使不显示默认图片，也让图片有一个占位的作用，保证布局不会乱！</p>
<p><span class="img-wrap"><img data-src="/img/bVVPz4?w=386&amp;h=116" src="https://static.alili.tech/img/bVVPz4?w=386&amp;h=116" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVPAt?w=429&amp;h=121" src="https://static.alili.tech/img/bVVPAt?w=429&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果图片加载不出，img又没有设置width和height的话，就会像下面这样，布局乱了！</p>
<p><span class="img-wrap"><img data-src="/img/bVVPzJ?w=383&amp;h=122" src="https://static.alili.tech/img/bVVPzJ?w=383&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>关于设置<code>width</code>和<code>height</code>，我顺便说几点<br>1.PC站，建议在img标签的属性设置<code>width</code>和<code>height</code>。这样避免加载不出css而错位<br>2.手机站，建议用css设置<code>img</code>的<code>width</code>和<code>height</code>，因为手机站要做适配，在属性设置<code>width</code>和<code>height</code>不灵活，比如使用rem布局，在属性那里设置不了<code>width</code>和<code>height</code>。<br>3.如果图片不固定，但是有一个<code>max-width</code>和<code>max-height</code>，那么建议在img的父元素设置width和height。img根据父元素的<code>width</code>和<code>height</code>设置<code>max-width</code>和<code>max-height</code>。</p>
<h2 id="articleHeader7">8.任意元素垂直居中</h2>
<p>这里只放图，不解释</p>
<h3 id="articleHeader8">8-1.table-cell</h3>
<p><span class="img-wrap"><img data-src="/img/bVVPSm?w=1497&amp;h=672" src="https://static.alili.tech/img/bVVPSm?w=1497&amp;h=672" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">8-2.flex</h3>
<p><span class="img-wrap"><img data-src="/img/bVVPSf?w=1571&amp;h=668" src="https://static.alili.tech/img/bVVPSf?w=1571&amp;h=668" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">8-3.position，transform</h3>
<p><span class="img-wrap"><img data-src="/img/bVVPSd?w=1571&amp;h=676" src="https://static.alili.tech/img/bVVPSd?w=1571&amp;h=676" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">8-4.position，margin</h3>
<p><span class="img-wrap"><img data-src="/img/bVVPRU?w=1567&amp;h=671" src="https://static.alili.tech/img/bVVPRU?w=1567&amp;h=671" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个方式不推荐使用，因为这个写法，<code>.div2</code>的宽高必须要设置，否则就是100%;比如设置了<code>top:0;bottom:0;</code>效果和设置<code>height:100%;</code>是一样的。如果想要避免，就必须要设置<code>height</code>。</p>
<h2 id="articleHeader12">9.图片预加载</h2>
<p>这里说的预加载，不是懒加载。首先根据我个人理解科普下，懒加载和预加载的区别。</p>
<p><strong>懒加载：</strong>页面加载的时候，先加载一部分内容（一般是先加载首屏内容），其它内容等到需要加载的时候再进行加载！</p>
<p><strong>预加载：</strong>页面加载的时候，先加载一部分内容（一般是先加载首屏内容），其它内容等到先加载的一部分内容（一般是首屏内容）加载完了，再进行加载。</p>
<p>两种方式，都是为了减少用户进入网站的时候，更快的看到首屏的内容！</p>
<p>下面栗子，将这<code>#preloader</code>这个元素加入到到html中，就可以实现通过CSS的<code>background</code>属性将图片预加载到屏幕外的背景上。只要这些图片的路径保持不变，当它们在web页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载（缓存）的图片。简单、高效，不需要任何JavaScript。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#preloader {
    /*需要预加载的图片*/
    background: url(image1.jpg) no-repeat,url(image2.jpg) no-repeat,url(image3.jpg) no-repeat;
    width: 0px;
    height: 0px;
    display: inline;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-id">#preloader</span> {
    <span class="hljs-comment">/*需要预加载的图片*/</span>
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(image1.jpg) no-repeat,<span class="hljs-built_in">url</span>(image2.jpg) no-repeat,<span class="hljs-built_in">url</span>(image3.jpg) no-repeat;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">display</span>: inline;
}</code></pre>
<p>但是这样会有一个问题，因为<code>#preloader</code>预加载的图片，会和页面上的其他内容一起加载，增加了页面的整体加载时间。所以需要用js控制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function preloader(urlArr,obj) {
    var bgText='';
    for(var i=0,len=urlArr.length;i<len;i++){
        bgText+='url('+urlArr[i]+') no-repeat,';
    }
    obj.style.background=bgText.substr(0,bgText.length-1);
}
window.onload = function() {
   preloader(['image1.jpg','image2.jpg','image3.jpg'],document.getElementById('preloader'));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">preloader</span><span class="hljs-params">(urlArr,obj)</span> {</span>
    var bgText=<span class="hljs-string">''</span>;
    <span class="hljs-keyword">for</span>(var <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>,len=urlArr.<span class="hljs-built_in">length</span>;<span class="hljs-built_in">i</span>&lt;len;<span class="hljs-built_in">i</span>++){
        bgText+=<span class="hljs-string">'url('</span>+urlArr[i]+<span class="hljs-string">') no-repeat,'</span>;
    }
    obj.style.background=bgText.substr(<span class="hljs-number">0</span>,bgText.<span class="hljs-built_in">length</span><span class="hljs-number">-1</span>);
}
window.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
   preloader([<span class="hljs-string">'image1.jpg'</span>,<span class="hljs-string">'image2.jpg'</span>,<span class="hljs-string">'image3.jpg'</span>],document.getElementById(<span class="hljs-string">'preloader'</span>));
}</code></pre>
<p>原理也很简单，就是先让首屏的图片加载完，然后再加载其它的图片。通过给<code>#preloader</code>设置背景图片，加载所需要的图片，然后页面上需要加载这些图片的时候，就直接从缓存里面拿图片，不需要通过http请求获取图片，这样加载就很快。</p>
<h2 id="articleHeader13">10.慎用*通配符</h2>
<p>在做网页的时候经常会使用下面两种方式重置样式，以此来消除标签的默认布局和不同浏览器对于同一个标签的渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{margin：0；padding：0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">*{margin：<span class="hljs-number">0</span>；padding：<span class="hljs-number">0</span>;}</code></pre>
<p>上面这种方式，代码少，但是性能差，因为渲染的时候，要匹配页面上所有的元素！很多基础样式没有<code>margin</code>和<code>padding</code>的元素，比如<code>div</code>，<code>li</code>等。都被匹配，完全没必要！<br>下面看另一种方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,dl,dd,h1,h2,h3,h4,h5,h6,p,form,ol,ul{margin：0；padding：0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">ol</span>,ul{<span class="hljs-attribute">margin</span>：<span class="hljs-number">0</span>；padding：<span class="hljs-number">0</span>;}</code></pre>
<p>这种方式，代码稍微多，但是性能比上面的方式好，在渲染的时候，只匹配<code>body,dl,dd,h1,h2,h3,h4,h5,h6,p,form,ol,ul</code>这里面的元素，这些元素带有<code>margin</code>和<code>padding</code>，需要重置！<br>再看例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test * {color: red;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.test</span> * {<span class="hljs-attribute">color</span>: red;}
</code></pre>
<p>匹配文档中所有的元素，然后分别向上逐级匹配class为test的元素，直到文档的根节点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test a {color: red;}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.test</span> <span class="hljs-selector-tag">a</span> {<span class="hljs-attribute">color</span>: red;}
</code></pre>
<p>匹配文档中所有a的元素，然后分别向上逐级匹配class为test的元素，直到文档的根节点</p>
<p>两种方式，哪种更好不言而喻，所以在开发的时候，建议避免使用通配选择器。</p>
<h2 id="articleHeader14">11.合并，压缩css</h2>
<p>这个没什么好解释的，就是压缩和合并css。</p>
<p>首先压缩css，除了使用工具，比如gulp,webpack等把代码压缩，把空格和换行都去掉。还有一个建议就是属性简写。</p>
<p>比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin-top:0;
margin-right:10px;
margin-bottom:10px;
margin-left:10px;
background-image: url('test.jpg');
background-position: top center;
background-repeat: no-repeat;
border-width:1px;
border-style:solid;
border-color:#000;
color:#0099FF;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin-top</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">margin-right</span>:<span class="hljs-number">10px</span>;
<span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">10px</span>;
<span class="hljs-attribute">margin-left</span>:<span class="hljs-number">10px</span>;
<span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">'test.jpg'</span>);
<span class="hljs-attribute">background-position</span>: top center;
<span class="hljs-attribute">background-repeat</span>: no-repeat;
<span class="hljs-attribute">border-width</span>:<span class="hljs-number">1px</span>;
<span class="hljs-attribute">border-style</span>:solid;
<span class="hljs-attribute">border-color</span>:<span class="hljs-number">#000</span>;
<span class="hljs-attribute">color</span>:<span class="hljs-number">#0099FF</span>;
</code></pre>
<p>可以换成下面的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin:0 10px 10px 10px;
background: url('test.jpg') no-repeat top center;
border:1px solid #000;
color:#09F;       
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
<span class="hljs-attribute">background</span>: url(<span class="hljs-string">'test.jpg'</span>) no-repeat top center;
<span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
<span class="hljs-attribute">color</span>:<span class="hljs-number">#09F</span>;       
</code></pre>
<p>至于合并的时候，我按照自己的开发习惯给几个建议：<br>1.合并公用的样式，比如项目的头部，底部，侧边栏这些，一般都是公用的，这些可以写在一个公用样式表上，比如<code>main.css</code>。<br>2.上面所说的main.css是每一个页面都需要引入，而样式重置表<code>reset.css</code>也是每一个页面都需要用到的，那么建议main.css和reset.css合并成一个文件，给页面引入！减少请求！<br>3.每个页面对应的样式为独立的文件，比如首页对应的是<code>index.css</code>。产品列表页对应的样式是<code>product-list.css</code>。那么<code>index.css</code>就只在首页引入，其它页面不引入，因为引入纯属浪费请求资源！其他页面对应的样式也是这个处理方式！<code>index.css</code>，<code>product-list.css</code>等其它页面的样式就保留单独的文件，不作合并处理！</p>
<h2 id="articleHeader15">12.css在head引入</h2>
<p>浏览器在所有的 stylesheets 加载完成之后，才会开始渲染整个页面，在此之前，浏览器不会渲染页面里的任何内容，页面会一直呈现空白。这也是为什么要把 stylesheet 放在头部的原因。如果放在 HTML 页面底部，页面渲染就不仅仅是在等待 stylesheet 的加载，还要等待 html 内容加载完成，这样一来，用户看到页面的时间会更晚。</p>
<h2 id="articleHeader16">13.避免使用@import</h2>
<p>css样式文件有两种引入方式，一种是<code>link</code>元素，另一种是<code>@import</code>。在这里，我建议就是避免使用<code>@import</code>。因为<code>@import</code>会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时。而且多个<code>@import</code>可能会导致下载顺序紊乱。比如一个css文件<code>index.css</code>包含了以下内容：<code>@import url("reset.css")</code>。那么浏览器就必须先把<code>index.css</code>下载、解析和执行后，才下载、解析和执行第二个文件reset.css。简单的解决方法是使用<code>&lt;link&gt;</code>替代<code>@import</code>。</p>
<h2 id="articleHeader17">14.从PSD文件思考怎么写代码</h2>
<p>接到效果图，先不用着急切图，先看下psd文件。思考下怎么排版，那些模块可以做成公用的模块，模块应该怎么命名，写样式等！<br>当我们拿到设计师给的PSD时，首先不要急于写CSS代码，首先对整个页面进行分析，先思考下面几点：　　<br>(1)分析页面有哪些模块是公用的，常见公用模块有头部，底部，菜单栏，悬浮按钮等等　　<br>(2)分析模块有什么样式，把公用的样式提取出来，公用样式包括公用的状态样式，比如按钮，输入框，下拉框等公用的选中状态，禁用状态的样式等等。</p>
<h2 id="articleHeader18">15.小图标的处理方案</h2>
<p>一个网站，肯定会有很多个小图标，对于这些小图标，目前的解决方案有两个，cssSprite(雪碧图)，字体图标，把图片转成base64。下面对比一下这两种方式！<br><strong>cssSprite：</strong>把所有icon图片合成一张png图片，使用的是在，对节点设置宽高，加上bacgroud-position。以背景图方式显展示需要的icon，如果一个网站有20图标，那么就要请求20次，使用cssSprite，只需要请求一次，大大的减少了http请求。缺点就是管理不灵活，如果需要新增一个图标，都需要改合并图片的源文件，图标定位也要规范，不然容易干扰图片之间的定位！<br><strong>字体图标：</strong>简单粗暴的理解就是把所有的图标当成一个字体处理！这样不用去请求图片。一般是使用class来定义图标，要替换图标时，只需更换样式名，管理方便，语意明确，灵活放大缩小，并且不会造成失真。但是只支持单色的图片。<br><strong>base64：</strong>另一种方案就是把小的icon图片转成base64编码，这样可以不用去请求图片，把base64编码直接整合到js或者css里面，可以防止因为一些相对路径，或者图片被不小删除了等问题导致图片404错误。但是找个方式会生成一大串的base64编码。一般来说，8K以下的图片才转换成base64编码。如果把一张50K的图片转成base64编码，那么会生成超过65000个字符的base64编码，字符的大小就已经是将近70K了！建议就是：8K以下的图片才转换成base64编码。</p>
<h2 id="articleHeader19">16.不要在ID选择器前面进行嵌套或写标签</h2>
<p>1.ID在页面上本来就是唯一的而且人家权值那么大，前方嵌套（<code>.content #test</code>）完全是浪费性能。以及多写一些没有意义的代码！这个虽然是一句话，但是还是有人犯这样的错！<br>2.除了嵌套，在id的前面也不需要加标签或者其它选择器。比如 <code>div#test</code>或者<code>.test#test</code>。这两种方式完全是多余的，理由就是ID在页面就是唯一的。前面加任何东西都是多余的！</p>
<h2 id="articleHeader20">17.把常用样式抽封装成公用样式</h2>
<p>把长段相同样式提取出来作为公用样式使用，比如常用的清除浮动，单行超出显示省略号，多行超出省略号等等。</p>
<p>如下栗子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*超出省略号*/
/*<p class='text-ellipsis'></p>*/
.text-ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/*清除浮动*/
/*<div class='clearfix'></div>*/
.clearfix:after {
    display: block;
    content: '';
    clear: both;
    height:0;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*超出省略号*/</span>
<span class="hljs-comment">/*&lt;p class='text-ellipsis'&gt;&lt;/p&gt;*/</span>
<span class="hljs-selector-class">.text-ellipsis</span>{
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">white-space</span>: nowrap;
  <span class="hljs-attribute">text-overflow</span>: ellipsis;
}
<span class="hljs-comment">/*清除浮动*/</span>
<span class="hljs-comment">/*&lt;div class='clearfix'&gt;&lt;/div&gt;*/</span>
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">clear</span>: both;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
}

</code></pre>
<h2 id="articleHeader21">18.css3动画的优化</h2>
<p>在我之前一篇文章（移动web开发问题和优化小结），也有写过关于这个的优化建议，之前说的两个建议是：<br>1.CSS3动画或者过渡尽量使用<code>transform</code>和<code>opacity</code>来实现动画，不要使用<code>left</code>和<code>top</code>。<br>2.动画和过渡能用<code>css3</code>解决的，就不要使用<code>js</code>。如果是复杂的动画可以使用<code>css3+js</code>（或者<code>html5+css3+js</code>）配合开发，效果只有想不到，没有做不到。</p>
<p>下面补充一个：动画不宜过多，尤其是手机网站，否则会出现性能的问题，比如cpu一下子就被占用满了，掉帧等。而且，不建议给每一个元素都使用硬件加速。</p>
<p>参考链接：<br><a href="http://www.w3cplus.com/animation/animation-performance.html" rel="nofollow noreferrer" target="_blank">CSS Animation性能优化</a><br><a href="http://www.cnblogs.com/sowhite/p/6524689.html" rel="nofollow noreferrer" target="_blank">css3动画性能优化</a><br><a href="http://www.w3cplus.com/css3/introduction-to-hardware-acceleration-css-animations.html" rel="nofollow noreferrer" target="_blank">CSS动画之硬件加速</a><br><a href="http://www.w3cplus.com/animation/animations.html" rel="nofollow noreferrer" target="_blank">Web动画</a></p>
<h2 id="articleHeader22">19.body设置最小宽度</h2>
<p>这个是在PC站会出现的问题，应该大家都知道。下面简单说一下!<br>比如下面的栗子，一个网站，页面内容宽度是1200px。看着很正常，没什么特别</p>
<p><span class="img-wrap"><img data-src="/img/bVVUx9?w=1310&amp;h=136" src="https://static.alili.tech/img/bVVUx9?w=1310&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果这个时候，把页面窗口缩小。小于1200px，页面出现滚动条，然后把滚动条拖到最右边</p>
<p><span class="img-wrap"><img data-src="/img/bVVUys?w=979&amp;h=136" src="https://static.alili.tech/img/bVVUys?w=979&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这样是不是就发现，顶部的图片和背景有一部分是断层了！解决这个问题也很简单，就是给<code>body</code>加上<code>min-width</code>。值就是页面宽度的值。<code>body{min-width:1200px;}</code></p>
<p>重复上一步操作，无论怎么改变浏览器窗口大小，都是正常的</p>
<p><span class="img-wrap"><img data-src="/img/bVVUyS?w=957&amp;h=142" src="https://static.alili.tech/img/bVVUyS?w=957&amp;h=142" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>之所以会出现这样的问题，是因为，比如窗口缩小到900px的时候，小于内容宽度的1200px。就是出现横向的滚动条，但是<code>body</code>的宽度是900px。这个时候，如果有元素（比如图片的灰色区域和粉红色的图片）是相对<code>body</code>的<code>width</code>设置100%，那么实际上这些元素的宽度也就是900px。所以会出现断层那些的视觉！解决方式就是给<code>body</code>加上<code>min-width</code>。让<code>body</code>的宽度最小不会小于内容的宽度！</p>
<h2 id="articleHeader23">20.小结</h2>
<p>关于我对css写作建议和性能优化的一个总结，就到这里了。css，绝对不是那种只要能用就行，或者只要能用css把布局弄好就行的一门语言。css给我的感觉，就是上手很简单，但是如果想用好css，还是得花时间去研究。css或者css3，能够优化的东西还有很多，用好css或者css3能够少写很多js代码，做出来的东西也是很神奇，大家还是得继续学习当中的知识！<br>如果大家觉得我文章有哪个地方写得不好，写错了，欢迎指正。如果有什么其它的建议，欢迎指点，让大家互相交流，互相学习，一起进步！最后，祝大家节日快乐！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css写作建议和性能优化小结

## 原文链接
[https://segmentfault.com/a/1190000011390896](https://segmentfault.com/a/1190000011390896)


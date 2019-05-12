---
title: '通过案例理解position:relative和position:absolute' 
date: 2019-02-03 2:30:40
hidden: true
slug: h6ed8494ylb
categories: [reprint]
---

{{< raw >}}

                    
<p>w3school过了HTML的知识之后，觉得要自己单纯地去啃知识点有点枯燥，然后自己也很容易忘记，所以便找具体的网站练手便补上不懂的知识点。position:relative和postion:absolute困扰了我快一个星期之久，网上找到的资料鱼龙混杂，刚确定“这样”的理解之后，看另一份资料，发现“这样”理解是错了，就这样不断更正，并记录下来，最终整理出这份，以备参阅。</p>
<p>若有错误，请指正。</p>
<p>下面的结果都是基于firefox38版本来测试的。</p>
<h3 id="articleHeader0">position:relative相对定位</h3>
<p><strong>1. 如何定位？</strong><br>每个元素在页面的普通流中会“占有”一个位置，这个位置可以理解为默认值，而相对定位就是将元素偏离元素的默认位置，但普通流中依然保持着原有的默认位置。（在父级节点的content-box区定位，父级节点有文字的话，元素的默认位置则是紧随文字）<br><strong>2. 不会改变行内元素的display属性。</strong><br><strong>3. 并没有脱离普通流，只是视觉上发生的偏移。</strong><br>代码——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style='margin:0;padding:0;background:#BDD7EE;color:white;'>
<div class='contain' style='margin:10px;border:10px solid white;width:300px;background:#F8CBAD;padding:10px 0 0 10px;font-size:20px;font-weight:bold;'>
  <div class='one' style='width:50px;height:50px;background-color:#FFE699;top:-10px;left:0px;'></div>
  <div class='two' style='height:50px;color:#fff;background-color:#C5E0B4;'>position:relative定位测试</div>
</div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;body <span class="hljs-built_in">style</span>='margin:<span class="hljs-number">0</span>;padding:<span class="hljs-number">0</span>;<span class="hljs-built_in">background</span>:#BDD7EE;<span class="hljs-built_in">color</span>:white;'&gt;
&lt;div class='contain' <span class="hljs-built_in">style</span>='margin:10px;<span class="hljs-built_in">border</span>:10px solid white;<span class="hljs-built_in">width</span>:300px;<span class="hljs-built_in">background</span>:#F8CBAD;padding:10px <span class="hljs-number">0</span> <span class="hljs-number">0</span> 10px;<span class="hljs-built_in">font</span>-size:20px;<span class="hljs-built_in">font</span>-weight:bold;'&gt;
  &lt;div class='one' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">width</span>:50px;<span class="hljs-built_in">height</span>:50px;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;top:-10px;left:<span class="hljs-number">0px</span>;'&gt;&lt;/div&gt;
  &lt;div class='two' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">height</span>:50px;<span class="hljs-built_in">color</span>:#fff;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;<span class="hljs-built_in">position</span>:relative定位测试&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>
<p>显示——  <br><span class="img-wrap"><img data-src="/img/remote/1460000008328048" src="https://static.alili.tech/img/remote/1460000008328048" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>给子元素one的style加上position:relative;后显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328049" src="https://static.alili.tech/img/remote/1460000008328049" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>给父级元素contain的style加上文字后显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328050" src="https://static.alili.tech/img/remote/1460000008328050" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>将one由div节点改为span节点，并加入文字“你好”之后显示——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style='margin:0;padding:0;background:#BDD7EE;color:white;'>
<div class='contain' style='margin:10px;border:10px solid white;width:300px;background:#F8CBAD;padding:10px 0 0 10px;font-size:20px;font-weight:bold;'>如果父级节点有文字的话...
  <span class='one' style='width:50px;height:50px;background-color:#FFE699;position:relative;top:-10px;left:0px;'>你好</span>
  <div class='two' style='height:50px;color:#fff;background-color:#C5E0B4;'>position:relative定位测试</div>
</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;body <span class="hljs-built_in">style</span>='margin:<span class="hljs-number">0</span>;padding:<span class="hljs-number">0</span>;<span class="hljs-built_in">background</span>:#BDD7EE;<span class="hljs-built_in">color</span>:white;'&gt;
&lt;div class='contain' <span class="hljs-built_in">style</span>='margin:10px;<span class="hljs-built_in">border</span>:10px solid white;<span class="hljs-built_in">width</span>:300px;<span class="hljs-built_in">background</span>:#F8CBAD;padding:10px <span class="hljs-number">0</span> <span class="hljs-number">0</span> 10px;<span class="hljs-built_in">font</span>-size:20px;<span class="hljs-built_in">font</span>-weight:bold;'&gt;如果父级节点有文字的话...
  &lt;span class='one' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">width</span>:50px;<span class="hljs-built_in">height</span>:50px;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">position</span>:relative;top:-10px;left:<span class="hljs-number">0px</span>;'&gt;你好&lt;/span&gt;
  &lt;div class='two' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">height</span>:50px;<span class="hljs-built_in">color</span>:#fff;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;<span class="hljs-built_in">position</span>:relative定位测试&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328051" src="https://static.alili.tech/img/remote/1460000008328051" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader1">position:absolute绝对定位</h3>
<p><strong>1. 如何定位浮动？</strong></p>
<ul>
<li><p>设置了TRBL<br>相对最近的设定了position:relative/absolute的父（祖先）节点的padding-box的区进行定位（忽略文字），找不到符合条件的父（祖先）节点，则相对浏览器窗口进行定位。</p></li>
<li><p>没有设置了TRBL<br>则默认浮动，默认浮动在父级节点的content-box区。</p></li>
</ul>
<p><strong>2. 不管是块级元素还是行内元素，应用了position:absolute之后，display为block：</strong></p>
<ul>
<li><p>可以设置width和height</p></li>
<li><p>没有设置的话，width默认为auto</p></li>
</ul>
<p><strong>3. 脱离文档流，容器（父）元素将得不到脱离普通流的子元素高度</strong></p>
<p>代码——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style='margin:10px;width:300px;color:white;background-color:#BDD7EE;'>
<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
    <div style='background-color:#C5E0B4;'>子元素</div>
  </div>
</div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;body <span class="hljs-built_in">style</span>='margin:10px;<span class="hljs-built_in">width</span>:300px;<span class="hljs-built_in">color</span>:white;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#BDD7EE;'&gt;
&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
    &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;子元素&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>
<p>显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328052" src="https://static.alili.tech/img/remote/1460000008328052" alt="" title="" style="cursor: pointer;"></span></p>
<p>给子元素的style加上position:absolute;top:0px;left:0px;后显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328053" src="https://static.alili.tech/img/remote/1460000008328053" alt="" title="" style="cursor: pointer;"></span></p>
<p>给子元素的style加上position:absolute;top:0px;后显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328054" src="https://static.alili.tech/img/remote/1460000008328054" alt="" title="" style="cursor: pointer;"></span></p>
<p>注释：应用了position:absolute之后之设置了top，所以子元素的top紧贴浏览器窗口的top（距离为0px），因为没有设置left，所以子元素左边就默认父级元素content-box区的左侧进行定位（没应用position:absolute之前左侧该在哪个位置就在那个位置）<br>给子元素的style加上position:absolute;后显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328055" src="https://static.alili.tech/img/remote/1460000008328055" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>案例：理解应用了position:absolute的元素没有设置TRBL的话，则默认浮动在父级节点的content-box区</h4>
<p>用一句通俗易懂的话来说就是，它该在哪个位置就在哪个位置，只不过不占位而已。<br>先理解下上面示例代码的显示图，以及给自己元素加上position:absolute后的显示图。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328056" src="https://static.alili.tech/img/remote/1460000008328056" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>给子元素的样式加上：display:inline;我们看看如果子元素是内联元素的话会如何显示。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328057" src="https://static.alili.tech/img/remote/1460000008328057" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>假如有两个同级块级元素，看看第一个子元素和第二个子元素分别应用position:absolute后的效果如何。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
      <div style='background-color:#62C292;'>子元素(上)</div>
      <div style='background-color:#C5E0B4;'>子元素(下)</div>
  </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#62C292;'&gt;子元素(上)&lt;/div&gt;
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;子元素(下)&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328058" src="https://static.alili.tech/img/remote/1460000008328058" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果这两个同级块级元素都应用了position:absolute;这两个元素会进行重叠，子元素(下)显示在前面，那是因为默认代码靠后的元素的z-index比较大。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328059" src="https://static.alili.tech/img/remote/1460000008328059" alt="" title="" style="cursor: pointer;"></span></p>
<p>上面的案例中，将第二个子级元素换为内联元素，子元素(下)的起点位置并没有改变。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328060" src="https://static.alili.tech/img/remote/1460000008328060" alt="" title="" style="cursor: pointer;"></span></p>
<p>试试给代码中的第一个元素的style加上display:inline;看看上面的子元素是内联元素的话会如何显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
      <div style='background-color:#62C292;display:inline;'>子元素(上)</div>
      <div style='background-color:#C5E0B4;'>子元素(下)</div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#62C292;<span class="hljs-built_in">display</span>:inline;'&gt;子元素(上)&lt;/div&gt;
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;子元素(下)&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328061" src="https://static.alili.tech/img/remote/1460000008328061" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在调换下应用position:absolute的位置<br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
      <div style='background-color:#C5E0B4;'>子元素(上)</div>
      <div style='background-color:#62C292;'>子元素(下)</div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;子元素(上)&lt;/div&gt;
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#62C292;'&gt;子元素(下)&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328062" src="https://static.alili.tech/img/remote/1460000008328062" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>第一个子元素是内联元素的话——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
      <div style='background-color:#C5E0B4;display:inline;'>子元素(上)</div>
      <div style='background-color:#62C292;'>子元素(下)</div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;<span class="hljs-built_in">display</span>:inline;'&gt;子元素(上)&lt;/div&gt;
      &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#62C292;'&gt;子元素(下)&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328063" src="https://static.alili.tech/img/remote/1460000008328063" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>综上：不管是块级元素还是内联元素应用position:absolute并且不设置TRBL，它都会默认在父级元素的content-box区浮动。原来的起点位置也是应用绝对定位后的起点位置，<strong>只不过如果应用了position:absolute的内联元素左边也有内联元素的话，它的起点位置会变得更靠前，直到紧挨左边内联元素的边界。</strong></p>
<h3 id="articleHeader2">综合案例：看看position:relative和position:absolute的综合效果</h3>
<p>沿用position:absolute的案例代码——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body style='margin:10px;width:300px;color:white;background-color:#BDD7EE;'>
<div style='background-color:#F8CBAD;padding-top:10px;'>祖先元素
  <div style='background-color:#FFE699;border:10px solid white;padding-top:10px;'>父级元素
    <div style='background-color:#C5E0B4;'>子元素</div>
  </div>
</div>
</body>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;body <span class="hljs-built_in">style</span>='margin:10px;<span class="hljs-built_in">width</span>:300px;<span class="hljs-built_in">color</span>:white;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#BDD7EE;'&gt;
&lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#F8CBAD;padding-top:10px;'&gt;祖先元素
  &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">border</span>:10px solid white;padding-top:10px;'&gt;父级元素
    &lt;div <span class="hljs-built_in">style</span>='<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;子元素&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre>
<p>在上面代码的基础上分别应用以下的定位后看看效果，并理解。<br><span class="img-wrap"><img data-src="/img/remote/1460000008328064" src="https://static.alili.tech/img/remote/1460000008328064" alt="" title="" style="cursor: pointer;"></span></p>
<h4>案例诊断：</h4>
<ul><li><p>给祖先div加上"position:relative;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328065" src="https://static.alili.tech/img/remote/1460000008328065" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>给父级div加上"position:relative;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328066" src="https://static.alili.tech/img/remote/1460000008328066" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>给祖先和父级div加上"position:relative;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328067" src="https://static.alili.tech/img/remote/1460000008328067" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>给祖先div加上"position:absolute;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328068" src="https://static.alili.tech/img/remote/1460000008328068" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>给父级div加上"position:absolute;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328069" src="https://static.alili.tech/img/remote/1460000008328069" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>给祖先和父级div加上"position:absolute;"以及给子元素加上<br>"position:absolute;top:0px;left:0px;"</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008328070" src="https://static.alili.tech/img/remote/1460000008328070" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">应用：消除环绕浮动元素的影响</h3>
<p>父级，position:relative（不设TRBL）<br>子级，第一个div的float:left；第二个div的position:absolute（不设TRBL）<br>因为第二个子级div元素默认会在父级元素的content-box区浮动，它可以消除上一个同级子级div元素的环绕浮动影响。<br>案例代码——</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='contain' style='margin:10px;width:300px;background:#F8CBAD;padding:10px 0 10px;color:white;'>
  <div class='one' style='width:30px;height:30px;background-color:#FFE699;float:left;'></div>
  <div class='two' style='color:#fff;background-color:#C5E0B4;'>position:absolute消除浮动环绕的影响测试</div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>&lt;div class='contain' <span class="hljs-built_in">style</span>='margin:10px;<span class="hljs-built_in">width</span>:300px;<span class="hljs-built_in">background</span>:#F8CBAD;padding:10px <span class="hljs-number">0</span> 10px;<span class="hljs-built_in">color</span>:white;'&gt;
  &lt;div class='one' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">width</span>:30px;<span class="hljs-built_in">height</span>:30px;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#FFE699;<span class="hljs-built_in">float</span>:left;'&gt;&lt;/div&gt;
  &lt;div class='two' <span class="hljs-built_in">style</span>='<span class="hljs-built_in">color</span>:#fff;<span class="hljs-built_in">background</span>-<span class="hljs-built_in">color</span>:#C5E0B4;'&gt;<span class="hljs-built_in">position</span>:absolute消除浮动环绕的影响测试&lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p>显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328071" src="https://static.alili.tech/img/remote/1460000008328071" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000008328072" src="https://static.alili.tech/img/remote/1460000008328072" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>给父级元素加上position:relative，给第二个子级元素加上position:absolute后，显示——<br><span class="img-wrap"><img data-src="/img/remote/1460000008328073" src="https://static.alili.tech/img/remote/1460000008328073" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000008328074" src="https://static.alili.tech/img/remote/1460000008328074" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们看到，确实是消除了环绕浮动元素环绕的影响，position:absolute的优先级高，所以float元素被遮住了，并不是消失了。另外看到contain元素的高度不受子元素的影响了，因为它们都脱离文档流了。</p>
<p><strong>参考颜色</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000008328075" src="https://static.alili.tech/img/remote/1460000008328075" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>修改记录</strong></p>
<ul><li><p>2016.12.23增补案例理解默认浮动</p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过案例理解position:relative和position:absolute

## 原文链接
[https://segmentfault.com/a/1190000006924181](https://segmentfault.com/a/1190000006924181)


---
title: 'CSS效果篇--纯CSS+HTML实现checkbox的思路与实例' 
date: 2018-12-18 2:30:11
hidden: true
slug: uke5l4a45z8
categories: [reprint]
---

{{< raw >}}

                    
<p><code>checkbox</code>应该是一个比较常用的<code>html</code>功能了，不过浏览器自带的checkbox往往样式不怎么好看，而且不同浏览器效果也不一样。出于美化和统一视觉效果的需求，checkbox的自定义就被提出来了。这里对实现方法做个总结。</p>
<h2 id="articleHeader0">实现思路</h2>
<p>纯<code>css</code>实现的主要手段是利用<code>label</code>标签的模拟功能。<code>label</code>的<code>for</code>属性可以关联一个具体的<code>input</code>元素，即使这个<code>input</code>本身不可被用户可见，有个与它对应的<code>label</code>后，用户可以直接通过和<code>label</code>标签交互来替代原生的<code>input</code>——而这给我们的样式模拟留下了空间。简而言之就是:</p>
<blockquote>隐藏原生<code>input</code>，样式定义的过程留给<code>label</code> （那为什么不直接改变<code>checkbox</code>的样式？因为checkbox作为浏览器默认组件，样式更改上并没有label那么方便，很多属性对<code>checkbox</code>都是不起作用的，比如<code>background</code>,而<code>label</code>在样式上基本和<code>div</code>一样'任人宰割')</blockquote>
<p>而在选择事件上，由于css的<code>“相邻选择符(E+F)”</code>的存在，让我们可以直接利用html的默认checkbox，免去了js模拟选择的麻烦。</p>
<h2 id="articleHeader1">demo详解</h2>
<p>DEMO的部分CSS3属性只写了webkit前缀，所以建议用webkit内核的浏览器查看本页<br>HTML代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!-- input的id必须有，这个是label进行元素匹配所必需的 -->
 <!-- 可以看到每个input的id和label的“for”属性对应同一字符串 -->
<input type=&quot;checkbox&quot; id=&quot;checkbox01&quot; />
<label for=&quot;checkbox01&quot;></label>

<input type=&quot;checkbox&quot; id=&quot;checkbox02&quot; />
<label for=&quot;checkbox02&quot;></label>

<input type=&quot;checkbox&quot; id=&quot;checkbox03&quot; />
<label for=&quot;checkbox03&quot;></label>

<input type=&quot;checkbox&quot; id=&quot;checkbox04&quot; />
<label for=&quot;checkbox04&quot;></label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-comment">&lt;!-- input的id必须有，这个是label进行元素匹配所必需的 --&gt;</span>
 <span class="hljs-comment">&lt;!-- 可以看到每个input的id和label的“for”属性对应同一字符串 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox01"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox01"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox02"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox02"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox03"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox03"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"checkbox04"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox04"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
<p>HTML构建完成，接下来是对应的css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 隐藏所有checkbox */
input[type='checkbox'] {
  display: none;
}

/* 对label进行模拟.背景图片随便拼凑的，不要吐槽品味*/
/*   transition效果是做个背景切换效果，这里单纯演示而已，实际上这个过渡不加更自然*/
label {
  display: inline-block;
  width: 60px;
  height: 60px;
  position: relative;
  background: url(//www.chitanda.me/images/blank.png);
  background-position: 0 0px;
  -webkit-transition: background 0.5s linear;
}

/*  利用相邻选择符和checkbox`:checked`的状态伪类来模拟默认选中效果（就是点击后那个勾号的效果）  */
/*如果这段代码注释，点击后将没有任何反馈给用户*/
/*因为label本身是没有点击后被选中的状态的，checkbox被隐藏后，这个状态只能手动模拟*/
input[type='checkbox']:checked+label {
  background-position: 0 -60px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 隐藏所有checkbox */</span>
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span> {
  <span class="hljs-attribute">display</span>: none;
}

<span class="hljs-comment">/* 对label进行模拟.背景图片随便拼凑的，不要吐槽品味*/</span>
<span class="hljs-comment">/*   transition效果是做个背景切换效果，这里单纯演示而已，实际上这个过渡不加更自然*/</span>
<span class="hljs-selector-tag">label</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(//www.chitanda.me/images/blank.png);
  <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">-webkit-transition</span>: background <span class="hljs-number">0.5s</span> linear;
}

<span class="hljs-comment">/*  利用相邻选择符和checkbox`:checked`的状态伪类来模拟默认选中效果（就是点击后那个勾号的效果）  */</span>
<span class="hljs-comment">/*如果这段代码注释，点击后将没有任何反馈给用户*/</span>
<span class="hljs-comment">/*因为label本身是没有点击后被选中的状态的，checkbox被隐藏后，这个状态只能手动模拟*/</span>
<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type='checkbox']</span><span class="hljs-selector-pseudo">:checked+label</span> {
  <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> -<span class="hljs-number">60px</span>;
}</code></pre>
<p>上面代码的效果如下所示，看起来好像也可以了。</p>
<p>不过仔细想想，貌似缺了点什么：<strong>选项对应的提示文字</strong></p>
<p>对css不了解的新人可能这时候第一反应就是在<code>label</code>后面用<code>p</code>标签或者<code>span</code>标签来添加文字。不过这种方式都不怎么优雅。个人建议用css的<code>::before</code>和<code>::after伪元素</code>（::before和:before是一个东西。不过为了把“伪元素”和“伪类”区分出来，W3C建议的写法是伪元素用::而伪类用:）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 伪元素的生效很简单，定义`content`就好，其余的属性和普通div一样 */
label::after {
   content: attr(data-name);
   /*利用attr可以减少css代码量,data-name写在html部分的label属性里*/
  display: inline-block;
  position: relative;
  width: 120px;
  height: 60px;
  left: 100%;
  vertical-align: middle;
  margin: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 伪元素的生效很简单，定义`content`就好，其余的属性和普通div一样 */</span>
<span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">::after</span> {
   <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-name);
   <span class="hljs-comment">/*利用attr可以减少css代码量,data-name写在html部分的label属性里*/</span>
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">vertical-align</span>: middle;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<p>当然既然可以用::after模拟label的文字，那也就可以用::before模拟label的checkbox样式，这里就不做解析了。</p>
<p>这里提一下伪类和伪元素的区分：</p>
<blockquote>1）伪类：存在的意义是为了通过选择器找到那些不存在于DOM树中的信息以及不能被常规CSS选择器获取到的信息。 伪类由一个冒号:开头，冒号后面是伪类的名称和包含在圆括号中的可选参数。</blockquote>
<p>常用的伪类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":active 向被激活的元素添加样式。 
:focus 向拥有键盘输入焦点的元素添加样式。 
:hover 当鼠标悬浮在元素上方时，向元素添加样式。 
:link 向未被访问的链接添加样式。 
:visited 向已被访问的链接添加样式。 
:first-child 向元素的第一个子元素添加样式。 
:checked 向选中的控件元素添加样式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-symbol">:active</span> 向被激活的元素添加样式。 
<span class="hljs-symbol">:focus</span> 向拥有键盘输入焦点的元素添加样式。 
<span class="hljs-symbol">:hover</span> 当鼠标悬浮在元素上方时，向元素添加样式。 
<span class="hljs-symbol">:link</span> 向未被访问的链接添加样式。 
<span class="hljs-symbol">:visited</span> 向已被访问的链接添加样式。 
<span class="hljs-symbol">:first-child</span> 向元素的第一个子元素添加样式。 
<span class="hljs-symbol">:checked</span> 向选中的控件元素添加样式</code></pre>
<blockquote>2）伪元素:伪元素在DOM树中创建了一些抽象元素，这些抽象元素是不存在于文档语言里的（可以理解为html源码）；</blockquote>
<p>注意: css3为了区分伪类和伪元素，规定伪类前面有一个冒号，伪元素前面有两个冒号</p>
<p>常用伪元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::before 为作用元素的第一个子节点插入dom中
::after 为作用元素的最后一个子节点插入dom中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>::<span class="hljs-keyword">before</span> 为作用元素的第一个子节点插入dom中
::<span class="hljs-keyword">after</span> 为作用元素的最后一个子节点插入dom中</code></pre>
<ul>
<li>同：都是通过选择器为元素添加样式</li>
<li>异：伪元素会创建一个元素，但不是真正的Html元素，伪类相当于为一个元素创建一个class样式</li>
</ul>
<h2 id="articleHeader2">实例：自定义radio</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;radio&quot; id=&quot;radio&quot;>
<label for=&quot;radio&quot;></label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"radio"</span> id=<span class="hljs-string">"radio"</span>&gt;
&lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"radio"</span>&gt;&lt;/<span class="hljs-keyword">label</span>&gt;</code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input{
    display:none;
}
label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #333;
    border-radius: 50%;
    position: relative;
}
label::after {
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    -ms-transition: all .5s ease;
    transition: all .5s ease;
    cursor: pointer;
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    margin-top:-8px;
    margin-left:-8px;
    z-index: 1;
    content: '';
    border:1px solid #333;
}

input:checked+label::after{
    background:red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span>{
    <span class="hljs-attribute">display</span>:none;
}
<span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">-webkit-transition</span>: all .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-moz-transition</span>: all .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-o-transition</span>: all .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-ms-transition</span>: all .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">8px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">8px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">background</span>:red;
}</code></pre>
<p>实现效果：<br>点击前：<span class="img-wrap"><img data-src="/img/bV1Eta?w=54&amp;h=44" src="https://static.alili.tech/img/bV1Eta?w=54&amp;h=44" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>点击后：<span class="img-wrap"><img data-src="/img/bV1Esh?w=50&amp;h=44" src="https://static.alili.tech/img/bV1Esh?w=50&amp;h=44" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">实例：自定义checkbox</h2>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;checkbox&quot; id=&quot;checkbox&quot;>
<label for=&quot;checkbox&quot;></label>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"checkbox"</span> id=<span class="hljs-string">"checkbox"</span>&gt;
&lt;<span class="hljs-keyword">label</span> <span class="hljs-keyword">for</span>=<span class="hljs-string">"checkbox"</span>&gt;&lt;/<span class="hljs-keyword">label</span>&gt;</code></pre>
<p>css代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input{
    display:none;
}
label {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #333;
    position: relative;
}
label::after {
    -webkit-transition: opacity .5s ease;
    -moz-transition: opacity .5s ease;
    -o-transition: opacity .5s ease;
    -ms-transition: opacity .5s ease;
    transition: opacity .5s ease;
    cursor: pointer;
    position: absolute;
    content: '';
    opacity: 0;
}

input:checked+label::after{
    border: 2px solid #d73d32;
     border-top: none;
     border-right: none;
     -webkit-transform: rotate(-45deg);
     -ms-transform: rotate(-45deg);
     transform: rotate(-45deg);
     width:20px;
     height:10px;
     top:50%;
     margin-top:-8px;
     left:50%;
     margin-left:-10px;
     opacity: 1.0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span>{
    <span class="hljs-attribute">display</span>:none;
}
<span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">-webkit-transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-moz-transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-o-transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">-ms-transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">5s</span> ease;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:checked+label</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#d73d32</span>;
     <span class="hljs-attribute">border-top</span>: none;
     <span class="hljs-attribute">border-right</span>: none;
     <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
     <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
     <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-45deg);
     <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
     <span class="hljs-attribute">height</span>:<span class="hljs-number">10px</span>;
     <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
     <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">8px</span>;
     <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
     <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">10px</span>;
     <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1.0</span>;
}</code></pre>
<p>实现效果：<br>点击前：<span class="img-wrap"><img data-src="/img/bV1EtD?w=67&amp;h=45" src="https://static.alili.tech/img/bV1EtD?w=67&amp;h=45" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>点击后：<span class="img-wrap"><img data-src="/img/bV1EtN?w=47&amp;h=45" src="https://static.alili.tech/img/bV1EtN?w=47&amp;h=45" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>样式中用到了css3选择器，想详情了解，可查看:<a href="https://segmentfault.com/a/1190000003708884">《CSS基础篇--CSS3属性选择器与(:not)选择器》</a></p>
<p>参考地址：<a href="https://segmentfault.com/a/1190000003711140" target="_blank">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS效果篇--纯CSS+HTML实现checkbox的思路与实例

## 原文链接
[https://segmentfault.com/a/1190000012748027](https://segmentfault.com/a/1190000012748027)


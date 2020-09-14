---
title: '页面架构HTML+CSS ヾ(o◕∀◕)ﾉ 常用居中&多列布局' 
date: 2019-01-16 2:30:08
hidden: true
slug: v3gammzer9m
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">CSS Reset</h1>
<h2 id="articleHeader1">1.作用</h2>
<p>（1）清除浏览器默认样式<br>（2）全局样式定义</p>
<h2 id="articleHeader2">2.特别注意</h2>
<p>（1）项目开发初期就定义好<br>（2）<code>reset.css</code> 在引入的时候一定要放在第一位<br>（3）不同的产品<code>reset.css</code>不一样</p>
<h2 id="articleHeader3">3.table合并边框间距</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="table {
  border-collapse: collapse; // 合并边框
  border-spacing: 0; //边框间距。当 `border-collapse` 值为 `seperate` 时生效

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>table {
  <span class="hljs-built_in">border</span>-<span class="hljs-built_in">collapse</span>: <span class="hljs-built_in">collapse</span>; // 合并边框
  <span class="hljs-built_in">border</span>-spacing: <span class="hljs-number">0</span>; //边框间距。当 `<span class="hljs-built_in">border</span>-<span class="hljs-built_in">collapse</span>` 值为 `seperate` 时生效

}
</code></pre>
<h2 id="articleHeader4">4.一个并不完整也并不通用的reset.css样例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
    header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
    table{border-collapse:collapse;border-spacing:0;}
    caption,th{text-align:left;font-weight:normal;}
    html,body,fieldset,img,iframe,abbr{border:0;}
    i,cite,em,var,address,dfn{font-style:normal;}
    [hidefocus],summary{outline:0;}
    li{list-style:none;}
    h1,h2,h3,h4,h5,h6,small{font-size:100%;}
    sup,sub{font-size:83%;}
    pre,code,kbd,samp{font-family:inherit;}
    q:before,q:after{content:none;}
    textarea{overflow:auto;resize:none;}
    label,summary{cursor:default;}
    a,button{cursor:pointer;}
    h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:normal;}
    del,ins,u,s,a,a:hover{text-decoration:none;}
    body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,simsun;color:#333;outline:0;}
    body{background:#fff;}
    a,a:hover{color:#333;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">div</span>,<span class="hljs-selector-tag">dl</span>,<span class="hljs-selector-tag">dt</span>,<span class="hljs-selector-tag">dd</span>,<span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">ol</span>,<span class="hljs-selector-tag">li</span>,<span class="hljs-selector-tag">p</span>,<span class="hljs-selector-tag">blockquote</span>,pre,hr,<span class="hljs-selector-tag">figure</span>,<span class="hljs-selector-tag">table</span>,<span class="hljs-selector-tag">caption</span>,<span class="hljs-selector-tag">th</span>,<span class="hljs-selector-tag">td</span>,<span class="hljs-selector-tag">form</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">legend</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">textarea</span>,menu{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;}
    <span class="hljs-selector-tag">header</span>,<span class="hljs-selector-tag">footer</span>,<span class="hljs-selector-tag">section</span>,<span class="hljs-selector-tag">article</span>,<span class="hljs-selector-tag">aside</span>,<span class="hljs-selector-tag">nav</span>,<span class="hljs-selector-tag">hgroup</span>,<span class="hljs-selector-tag">address</span>,<span class="hljs-selector-tag">figure</span>,<span class="hljs-selector-tag">figcaption</span>,<span class="hljs-selector-tag">menu</span>,details{<span class="hljs-attribute">display</span>:block;}
    table{<span class="hljs-attribute">border-collapse</span>:collapse;<span class="hljs-attribute">border-spacing</span>:<span class="hljs-number">0</span>;}
    <span class="hljs-selector-tag">caption</span>,th{<span class="hljs-attribute">text-align</span>:left;<span class="hljs-attribute">font-weight</span>:normal;}
    <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">fieldset</span>,<span class="hljs-selector-tag">img</span>,<span class="hljs-selector-tag">iframe</span>,abbr{<span class="hljs-attribute">border</span>:<span class="hljs-number">0</span>;}
    <span class="hljs-selector-tag">i</span>,<span class="hljs-selector-tag">cite</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">var</span>,<span class="hljs-selector-tag">address</span>,dfn{<span class="hljs-attribute">font-style</span>:normal;}
    [hidefocus],summary{<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}
    li{<span class="hljs-attribute">list-style</span>:none;}
    <span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,small{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">100%</span>;}
    <span class="hljs-selector-tag">sup</span>,sub{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">83%</span>;}
    pre,<span class="hljs-selector-tag">code</span>,<span class="hljs-selector-tag">kbd</span>,samp{<span class="hljs-attribute">font-family</span>:inherit;}
    <span class="hljs-selector-tag">q</span>:before,<span class="hljs-selector-tag">q</span>:after{<span class="hljs-attribute">content</span>:none;}
    textarea{<span class="hljs-attribute">overflow</span>:auto;<span class="hljs-attribute">resize</span>:none;}
    <span class="hljs-selector-tag">label</span>,summary{<span class="hljs-attribute">cursor</span>:default;}
    <span class="hljs-selector-tag">a</span>,button{<span class="hljs-attribute">cursor</span>:pointer;}
    <span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h2</span>,<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">h4</span>,<span class="hljs-selector-tag">h5</span>,<span class="hljs-selector-tag">h6</span>,<span class="hljs-selector-tag">em</span>,<span class="hljs-selector-tag">strong</span>,b{<span class="hljs-attribute">font-weight</span>:normal;}
    <span class="hljs-selector-tag">del</span>,<span class="hljs-selector-tag">ins</span>,u,s,<span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">a</span>:hover{<span class="hljs-attribute">text-decoration</span>:none;}
    <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">textarea</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">button</span>,select,keygen,legend{<span class="hljs-attribute">font</span>:<span class="hljs-number">12px</span>/<span class="hljs-number">1.14</span> arial,simsun;<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;<span class="hljs-attribute">outline</span>:<span class="hljs-number">0</span>;}
    body{<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;}
    <span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">a</span>:hover{<span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;}</code></pre>
<h1 id="articleHeader5">布局解决方案</h1>
<h2 id="articleHeader6">居中布局</h2>
<h3 id="articleHeader7">1.水平居中</h3>
<p>父元素和子元素宽度未知。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;child&quot;>child</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"child"</span>&gt;child&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>要达到的效果是这样：<br><span class="img-wrap"><img data-src="/img/bVMh18?w=588&amp;h=121" src="https://static.alili.tech/img/bVMh18?w=588&amp;h=121" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>方法一：flex + justify-content</h4>
<p>主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { 
  display: flex;
  justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { 
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>没啥好解释，直接看 <a href="https://jsfiddle.net/DarcyAn/tz62nf4L/" rel="nofollow noreferrer" target="_blank">神奇的flex实现栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/tz62nf4L/" data-typeid="0">点击预览</button> 吧 (~￣▽￣)~</p>
<h4>方法二：absolute + transform</h4>
<p>主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { position: relative; }
.child { 
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-class">.child</span> { 
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<p>原理是：<code>left: 50%;</code>在子元素的左侧添加了一段距离，这段距离是父元素宽度的50%，接着因为translateX(50%) 设置百分比时的参照物是自身宽度，所以向左偏移了自身宽度的50%，就居中啦  ╮(‵▽′)╭ </p>
<p><a href="https://jsfiddle.net/DarcyAn/0nrw7s4w/" rel="nofollow noreferrer" target="_blank">动动小手看看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/0nrw7s4w/" data-typeid="0">点击预览</button></p>
<h4>方法三：inline-block + text-align</h4>
<p>主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { text-align: center; }
.child { display: inline-block; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">text-align</span>: center; }
<span class="hljs-selector-class">.child</span> { <span class="hljs-attribute">display</span>: inline-block; }</code></pre>
<p>这种方法有一个问题是：<code>parent</code>设置了<code>text-align: center;</code>后， 因为这个属性可继承，会导致<code>child</code>中的文字也会居中，而这个效果是我们未必需要的，所以我们很多时候需要在<code>.child</code>中加一句 <code>text-align: left;</code></p>
<p><a href="https://jsfiddle.net/DarcyAn/e8ns3qnx/" rel="nofollow noreferrer" target="_blank">自己看看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/e8ns3qnx/" data-typeid="0">点击预览</button></p>
<h4>方法四：table + margin</h4>
<p>主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child { display: table; margin: 0 auto; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.child</span> { <span class="hljs-attribute">display</span>: table; <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto; }</code></pre>
<p>table的特点：宽度为内容宽度 的<strong>块状元素</strong>，所以也可以用<code>margin: 0 auto;</code>居中。</p>
<p>优点：只设置子元素样式就可以了，不需关心父元素。</p>
<p><a href="https://jsfiddle.net/DarcyAn/c0krtduf/" rel="nofollow noreferrer" target="_blank">看看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/c0krtduf/" data-typeid="0">点击预览</button></p>
<p>不喜欢这第四个方案，table是辣么有语义的一个样式，为什么随便把人家变成table (￣.￣)</p>
<h3 id="articleHeader8">2.垂直居中</h3>
<p>父元素和子元素高度未知。</p>
<p>意欲达到的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVMh5R?w=117&amp;h=317" src="https://static.alili.tech/img/bVMh5R?w=117&amp;h=317" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>方法一：flex+ align-items</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>同<strong>水平居中</strong>的方法一</p>
<p><a href="https://jsfiddle.net/DarcyAn/d3zrvz4q/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/d3zrvz4q/" data-typeid="0">点击预览</button></p>
<h4>方法二：absolute + transform</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p>同<strong>水平居中</strong>的方法二</p>
<p><a href="https://jsfiddle.net/DarcyAn/btx0ueox/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/btx0ueox/" data-typeid="0">点击预览</button></p>
<h4>方法三：table-cell + vertical-align</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: table-cell;
  vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p>vertical-align 可以作用在 <code>inline</code>元素，<code>inline-table</code>元素，以及<code>table-cell</code>元素上。</p>
<p><a href="https://jsfiddle.net/DarcyAn/xz1879vk/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/xz1879vk/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader9">3.水平垂直居中</h3>
<p>父元素和子元素宽高都未知。</p>
<p><span class="img-wrap"><img data-src="/img/bVMh7w?w=313&amp;h=314" src="https://static.alili.tech/img/bVMh7w?w=313&amp;h=314" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>方法一：flex + justify-content + align-items</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  justify-content: center;
  align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>综合了<strong>水平居中</strong>和<strong>垂直居中</strong>的方法一</p>
<p><a href="https://jsfiddle.net/DarcyAn/cyyphynb/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/cyyphynb/" data-typeid="0">点击预览</button></p>
<h4>方法二： absolute + transform</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { position: relative; }
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p>综合了<strong>水平居中</strong>和<strong>垂直居中</strong>的方法二</p>
<p><a href="https://jsfiddle.net/DarcyAn/2rb78s87/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/2rb78s87/" data-typeid="0">点击预览</button></p>
<h4>方法三： absolute + margin: auto; （常用）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { position: relative; }
.child {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">margin</span>: auto;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p><a href="https://jsfiddle.net/DarcyAn/r8ds772e/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/r8ds772e/" data-typeid="0">点击预览</button></p>
<h4>方法四：[inline-block + text-align] + [table-cell + vertical-align]</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.child {
  display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">vertical-align</span>: middle;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p><a href="https://jsfiddle.net/DarcyAn/h9o8batt/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/h9o8batt/" data-typeid="0">点击预览</button></p>
<h2 id="articleHeader10">多列布局</h2>
<h3 id="articleHeader11">1.一列定宽 + 一列自适应</h3>
<p><span class="img-wrap"><img data-src="/img/bVMk9w?w=599&amp;h=175" src="https://static.alili.tech/img/bVMk9w?w=599&amp;h=175" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;left&quot;><p>left</p></div>
  <div class=&quot;right&quot;>
    <p>right</p>
    <p>right</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h4>方法1：float + margin</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left {float: left; width: 100px;}
.right { margin-left: 120px;} //有20px是间距" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.left</span> {<span class="hljs-attribute">float</span>: left; <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">120px</span>;} <span class="hljs-comment">//有20px是间距</span></code></pre>
<h4>方法2：（对方法一的改进）float + margin + (fix)</h4>
<p>因为方法1在低版本浏览器有兼容性问题，所以改进一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首先在right外面加了right-fix这个div
<div class=&quot;parent&quot;>
  <div class=&quot;left&quot;><p>left</p></div>
  <div class=&quot;right-fix&quot;> 
    <div class=&quot;right&quot;>
      <p>right</p>
      <p>right</p>
    </div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 首先在right外面加了right-fix这个div
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right-fix"</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS改动：</p>
<p>STEP1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .left 和 .right 设置暂时不变
.right-fix {float: right; width: 100%;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>// .<span class="hljs-built_in">left</span> 和 .<span class="hljs-built_in">right</span> 设置暂时不变
.<span class="hljs-built_in">right</span>-<span class="hljs-built_in">fix</span> {float: <span class="hljs-built_in">right</span>; width: <span class="hljs-number">100</span>%;}</code></pre>
<p>效果为：（注意：我们把right-fix设置为白色背景，只是为了方便观察。）</p>
<p><span class="img-wrap"><img data-src="/img/bVMlz7?w=459&amp;h=124" src="https://static.alili.tech/img/bVMlz7?w=459&amp;h=124" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>STEP2：</p>
<p>可以看到，由于right-fix宽度为100%，所以跑到了left下面一行。想要回到同一行，需要给right-fix设置一个负的margin-left值-100px。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".right-fix { margin-left: -100px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.right-fix</span> { <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>; }</code></pre>
<p>关于为什么设置了<code>margin-left: 100px;</code>就可以使得回到同一行呢？是因为设置了负的margin-left值之后，浏览器计算right-fix元素的宽度后，会加上-100px，也就是减掉100px，这也就是left的宽度，所以left 与 right-fix 加起来没有超过整行的宽度。<br>想要进一步了解负的margin值可以参考这篇文章：<a href="http://www.cnblogs.com/2050/archive/2012/08/13/2636467.html#2457812" rel="nofollow noreferrer" target="_blank">CSS布局奇淫巧计之-强大的负边距</a></p>
<p>效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVMlA8?w=522&amp;h=88" src="https://static.alili.tech/img/bVMlA8?w=522&amp;h=88" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>STEP3：</p>
<p>不幸的是，因为html文档中right-fix处于left后面，所以left被right-fix遮住了，实际应用中right-fix虽然没有背景色，但是我们还是不会希望它覆盖在left上面。</p>
<p>所以，我们需要提高 left 的层级。如何提高呢？由于设置了position: relative;的元素层级要高于普通元素，所以加上这样一条：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{ position: relative; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.left</span>{ <span class="hljs-attribute">position</span>: relative; }</code></pre>
<p>具体可以参考张鑫旭写的一篇讲解<code>position:relative;</code>很详细的文章：<a href="http://www.zhangxinxu.com/wordpress/2011/08/css%E7%9B%B8%E5%AF%B9%E5%AE%9A%E4%BD%8Drelative%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8Dabsolute%E7%B3%BB%E5%88%97%EF%BC%88%E5%9B%9B%EF%BC%89/" rel="nofollow noreferrer" target="_blank">CSS 相对/绝对(relative/absolute)定位系列（四）</a></p>
<p>最终达到我们要的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVMlBL?w=519&amp;h=89" src="https://static.alili.tech/img/bVMlBL?w=519&amp;h=89" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://jsfiddle.net/DarcyAn/t7xjwujj/" rel="nofollow noreferrer" target="_blank">到jsfiddle中自己试试去</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/t7xjwujj/" data-typeid="0">点击预览</button></p>
<h4>方法3：float + overflow</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
  width: 100px;
  margin-right: 20px;
}
.right {
  overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.left</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>原理是：设置了overflow:hidden; 之后，会触发BFC模式，而BFC模式内部的布局不受外部影响，所以不会受浮动影响，不会围绕left而是跑到left右边去了。</p>
<h4>方法4：table</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
  display: table;
  width: 100%;
  table-layout: fixed; //加速table渲染，实现了布局优先
}
.left, .right {
  display: table-cell;
}
.left {
  width: 100px;
  padding-right: 20px;//因为table-cell不能设margin，所以设置padding来加间距
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.parent{
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">table-layout</span>: fixed; <span class="hljs-comment">//加速table渲染，实现了布局优先</span>
}
<span class="hljs-selector-class">.left</span>, <span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;<span class="hljs-comment">//因为table-cell不能设margin，所以设置padding来加间距</span>
}</code></pre>
<p>根据table的特性,left设置了100px后，right就占了剩余宽度。</p>
<h4>方法5：flex</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{ display: flex; }
.left{ width: 100px; margin-right: 20px; }
.right{ flex: 1; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span>{ <span class="hljs-attribute">display</span>: flex; }
<span class="hljs-selector-class">.left</span>{ <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>; }
<span class="hljs-selector-class">.right</span>{ <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; }</code></pre>
<p>So easy.</p>
<h3 id="articleHeader12">2.多列定宽 + 一列自适应</h3>
<p>再加一列定宽就行啦 o(≧v≦)o</p>
<h3 id="articleHeader13">3.不定宽 + 一列自适应</h3>
<p><span class="img-wrap"><img data-src="/img/bVMlDY?w=427&amp;h=131" src="https://static.alili.tech/img/bVMlDY?w=427&amp;h=131" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>不定宽</strong>意思是：<br>1.可以随意更改宽度：比如改为100px，200px，同时不需要更改其他样式也可以做到两列自适应布局。<br>2.或不设置宽度而是由里面子元素的宽度决定。</p>
<p>以下方法对应 [一列定宽+一列自适应] 中的方法</p>
<p>方法1： float + margin ？</p>
<p>不好意思，做不到。</p>
<p>方法2： float + margin +（fix） ？</p>
<p>不好意思，也做不到。</p>
<p>方法3： float + overflow ？</p>
<p>阔以！<strong>right的样式没有依赖于width的宽度。</strong>代码量也少，很棒棒哦！</p>
<p>方法4：table</p>
<p>阔以！<strong>right的样式没有依赖于width的宽度，即不关心width的宽度。</strong></p>
<p>方法5：flex</p>
<p>强大的flex当然可以~（傲娇脸 ）</p>
<h3 id="articleHeader14">4.两列不定宽 + 一列自适应</h3>
<p>没错，跟你想的一样，加一列不定宽的就行了，样式都一样 ㄟ( ▔, ▔ )ㄏ</p>
<h3 id="articleHeader15">5.等分布局</h3>
<p><span class="img-wrap"><img data-src="/img/bVMlFE?w=544&amp;h=326" src="https://static.alili.tech/img/bVMlFE?w=544&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>C + G = 4*（W + G） <br>以下例子假设间距G = 20px</p>
<p>结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;column&quot;><p>1</p></div>
  <div class=&quot;column&quot;><p>2</p></div>
  <div class=&quot;column&quot;><p>3</p></div>
  <div class=&quot;column&quot;><p>4</p></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"column"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>方法1：float</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{ margin-left: -20px; }//就是上面公式中等号左边的G
.column{
  float: left;
  width: 25%;
  padding-left: 20px;//这里要注意，因为我们用padding来表示间距，所以如果你是给p元素设置了background-color，会发现没有间距，p标签的width才是上图中的W
  box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.parent</span>{ <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>; }<span class="hljs-comment">//就是上面公式中等号左边的G</span>
<span class="hljs-selector-class">.column</span>{
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;<span class="hljs-comment">//这里要注意，因为我们用padding来表示间距，所以如果你是给p元素设置了background-color，会发现没有间距，p标签的width才是上图中的W</span>
  <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>方法2：table</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent-fix&quot;>
    <div class=&quot;parent&quot;>
      <div class=&quot;column&quot;><p>1</p></div>
      <div class=&quot;column&quot;><p>2</p></div>
      <div class=&quot;column&quot;><p>3</p></div>
      <div class=&quot;column&quot;><p>4</p></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"parent-fix"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"parent"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent-fix{
  margin-left: -20px;
}
.parent {
  display: table;
  width: 100%;
}
.column {
  display: table-cell;
  padding-left: 20px;//因为单元格不能设置margin，所以间距只能用padding来做。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.parent-fix</span>{
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: table;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.column</span> {
  <span class="hljs-attribute">display</span>: table-cell;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;<span class="hljs-comment">//因为单元格不能设置margin，所以间距只能用padding来做。</span>
}</code></pre>
<p>因为table的width默认是随内容宽度变化的，所以需要手动设置<code>width: 100%;</code>。又因为明确设置了宽度的元素就没办法用将margin设为负值的方式增加20px宽度了，所以需要在外面加一个父元素<code>parent-fix</code>。<br>这里大家可以自己试试比较一下给<code>parent-fix</code><strong>设置width为100%</strong>与<strong>不设置width</strong>时parent-fix实际宽度（用调试工具里的查看元素看）的区别来理解。</p>
<p><a href="https://jsfiddle.net/DarcyAn/o7czrt0o/" rel="nofollow noreferrer" target="_blank">呐，jsfiddle示例在这</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/o7czrt0o/" data-typeid="0">点击预览</button></p>
<p>方法3：flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent { display: flex; }
.column { flex: 1; } 
.column + .column { margin-left: 20px; }//好用的兄弟选择器 (｡・`ω´･)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.parent</span> { <span class="hljs-attribute">display</span>: flex; }
<span class="hljs-selector-class">.column</span> { <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; } 
<span class="hljs-selector-class">.column</span> + <span class="hljs-selector-class">.column</span> { <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>; }<span class="hljs-comment">//好用的兄弟选择器 (｡・`ω´･)</span></code></pre>
<h3 id="articleHeader16">6.一列定宽+一列自适应（当其中较高的一列高度变化，另一列同步变化）</h3>
<p>右侧变高，左侧高度随之变化：</p>
<p><span class="img-wrap"><img data-src="/img/bVMo93?w=765&amp;h=276" src="https://static.alili.tech/img/bVMo93?w=765&amp;h=276" alt="右侧变高，左侧高度随之变化1" title="右侧变高，左侧高度随之变化1" style="cursor: pointer;"></span></p>
<p>↓↓</p>
<p><span class="img-wrap"><img data-src="/img/bVMpan?w=767&amp;h=200" src="https://static.alili.tech/img/bVMpan?w=767&amp;h=200" alt="右侧变高，左侧高度随之变化2" title="右侧变高，左侧高度随之变化2" style="cursor: pointer;"></span></p>
<p>方法1：table</p>
<p>table的列之间有天然等高的特性。</p>
<p>就是上面 <strong>1.一列定宽 + 一列自适应</strong>中的<strong>方法4：table</strong>。</p>
<p>方法2：flex</p>
<p>flex也是天然的等高 &lt;(￣︶￣)&gt; 因为它默认的align-items为stretch，即在交叉轴上默认拉伸占满整个容器。</p>
<p>仍旧是上面<strong>1.一列定宽 + 一列自适应</strong>中的<strong>方法5：flex</strong>。</p>
<p><a href="https://jsfiddle.net/DarcyAn/kshefy4s/" rel="nofollow noreferrer" target="_blank">简单到不好意思给栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/kshefy4s/" data-typeid="0">点击预览</button></p>
<p>方法3：float</p>
<p>仍旧是参照上面<strong>1.一列定宽 + 一列自适应</strong>中的<strong>方法3：float + overflow</strong>，float并没有天然等高，所以要在这个基础上做改动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
  width: 100px;
  margin-right: 20px;
}
.right {
  overflow: hidden;
}
//增加部分
.left, .right{
  padding-bottom: 9999px;//使得有背景色的部分变的很高
  margin-bottom: -9999px;//用负的margin抵消掉很高的padding，让高度变回left和right中较高的那部分的内容高度，以便parent用overflow: hidden;去隐藏掉超出部分
}
.parent {
  overflow: hidden;//隐藏掉超出边界的部分 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.<span class="hljs-attribute">left</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-comment">//增加部分</span>
<span class="hljs-selector-class">.left</span>, .<span class="hljs-attribute">right</span>{
  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">9999px</span>;<span class="hljs-comment">//使得有背景色的部分变的很高</span>
  <span class="hljs-attribute">margin-bottom</span>: -<span class="hljs-number">9999px</span>;<span class="hljs-comment">//用负的margin抵消掉很高的padding，让高度变回left和right中较高的那部分的内容高度，以便parent用overflow: hidden;去隐藏掉超出部分</span>
}
<span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">overflow</span>: hidden;<span class="hljs-comment">//隐藏掉超出边界的部分 </span>
}</code></pre>
<p>其实left的实际高度并没有变，是一种伪等高，只是背景变高。</p>
<p><a href="https://jsfiddle.net/DarcyAn/8hyacvkg/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/8hyacvkg/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader17">7.全等四宫格</h3>
<p><span class="img-wrap"><img data-src="/img/bVqUsZ" src="https://static.alili.tech/img/bVqUsZ" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这是练习题，置几试试吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
  <div class=&quot;outer&quot;>
    <div class=&quot;column&quot;>1</div>
    <div class=&quot;column&quot;>2</div>
  </div>
  <div class=&quot;outer&quot;>
    <div class=&quot;column&quot;>3</div>
    <div class=&quot;column&quot;>4</div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"outer"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"column"</span>&gt;<span class="hljs-number">1</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"column"</span>&gt;<span class="hljs-number">2</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"outer"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"column"</span>&gt;<span class="hljs-number">3</span>&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"column"</span>&gt;<span class="hljs-number">4</span>&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>方法1：flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.outer {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">flex-wrap</span>: wrap;
  <span class="hljs-attribute">align-content</span>: space-between;
}
<span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: space-between;
}
</code></pre>
<p><a href="https://jsfiddle.net/DarcyAn/d1ndbpxn/" rel="nofollow noreferrer" target="_blank">一颗仅供参考的栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/d1ndbpxn/" data-typeid="0">点击预览</button></p>
<p>方法2：float</p>
<p><a href="https://jsfiddle.net/DarcyAn/twckmv31/" rel="nofollow noreferrer" target="_blank">我的栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/twckmv31/" data-typeid="0">点击预览</button></p>
<p>方法3：table</p>
<p><a href="https://jsfiddle.net/DarcyAn/t1for4g0/" rel="nofollow noreferrer" target="_blank">一个栗子不一定对</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/t1for4g0/" data-typeid="0">点击预览</button></p>
<h2 id="articleHeader18">全屏布局</h2>
<h3 id="articleHeader19">1.定宽（px）+自适应</h3>
<p><span class="img-wrap"><img data-src="/img/bVMsBG?w=588&amp;h=428" src="https://static.alili.tech/img/bVMsBG?w=588&amp;h=428" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>只有主内容区 right 随内容滚动。</p>
<p>方法1.position</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
<div class=&quot;top&quot;>top</div>
<div class=&quot;left&quot;>left</div>
<div class=&quot;right&quot;><div class=&quot;help-right&quot;>right</div></div>
<div class=&quot;bottom&quot;>bottom</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;top&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"help-right"</span>&gt;right&lt;/<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bottom"</span>&gt;bottom&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body, .parent {height: 100%; overflow: hidden;}//为了让整个页面不滚动
.top {
  position: absolute;
  top: 0; 
  left: 0; right: 0; //注意这个很棒的设置！可以自动占满整行 ヾ(o◕∀◕)ﾉ 
  height: 100px;
}
.left {
  position: absolute;
  left: 0;
  top: 100px; bottom: 50px;
  width:200px;
}
.right {
  position: absolute;
  left: 200px; right: 0;
  top: 100px; bottom: 50px; //这也是上下占满除了top和bottom之外的所有高度
  overflow: auto;//让主内容区可以滚动
}
.help-right {//假装有很多内容
  width: 1000px;
  height: 1000px;
}
.bottom{
  position: absolute;
  bottom: 0; 
  left: 0; right: 0;
  height: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-class">.parent</span> {<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">overflow</span>: hidden;}<span class="hljs-comment">//为了让整个页面不滚动</span>
<span class="hljs-selector-class">.top</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-comment">//注意这个很棒的设置！可以自动占满整行 ヾ(o◕∀◕)ﾉ </span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">50px</span>; <span class="hljs-comment">//这也是上下占满除了top和bottom之外的所有高度</span>
  <span class="hljs-attribute">overflow</span>: auto;<span class="hljs-comment">//让主内容区可以滚动</span>
}
<span class="hljs-selector-class">.help-right</span> {<span class="hljs-comment">//假装有很多内容</span>
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">1000px</span>;
}
<span class="hljs-selector-class">.bottom</span>{
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<p><a href="https://jsfiddle.net/DarcyAn/50j3q2bg/" rel="nofollow noreferrer" target="_blank">动手写写才记得住</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/50j3q2bg/" data-typeid="0">点击预览</button></p>
<p>方法2.flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;parent&quot;>
<div class=&quot;top&quot;>top</div>
<div class=&quot;middle&quot;>
<div class=&quot;left&quot;>left</div>
<div class=&quot;right&quot;><div class=&quot;help-right&quot;>right</div></div>
</div>
<div class=&quot;bottom&quot;>bottom</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"parent"</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"top"</span>&gt;top&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"middle"</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left"</span>&gt;left&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right"</span>&gt;&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"help-right"</span>&gt;right&lt;/<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bottom"</span>&gt;bottom&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body, .parent {height: 100%; overflow: hidden;}
.parent {display: flex; flex-direction: column;}
.top { height: 100px; }
.middle {flex: 1; display: flex;}
.left { width:200px; }
.right { flex: 1; overflow: auto; }
.help-right { width: 1000px; height: 1000px; }
.bottom{ height: 50px; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-class">.parent</span> {<span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">overflow</span>: hidden;}
<span class="hljs-selector-class">.parent</span> {<span class="hljs-attribute">display</span>: flex; <span class="hljs-attribute">flex-direction</span>: column;}
<span class="hljs-selector-class">.top</span> { <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>; }
<span class="hljs-selector-class">.middle</span> {<span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">display</span>: flex;}
<span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>; }
<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">overflow</span>: auto; }
<span class="hljs-selector-class">.help-right</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">1000px</span>; }
<span class="hljs-selector-class">.bottom</span>{ <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>; }</code></pre>
<p><a href="https://jsfiddle.net/DarcyAn/txcfpsLy/" rel="nofollow noreferrer" target="_blank">栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/txcfpsLy/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader20">2.百分比定宽（%）+自适应</h3>
<p>方法1.position ， 方法2.flex ：</p>
<p>把原来的用px写的定宽改成百分比就可以了。是相对于body的高度和宽度来变化的。感觉top和bottom高度设置百分比不是很实用。</p>
<h3 id="articleHeader21">3.自适应+自适应</h3>
<p><span class="img-wrap"><img data-src="/img/bVMsCj?w=583&amp;h=434" src="https://static.alili.tech/img/bVMsCj?w=583&amp;h=434" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>方法1.position</p>
<p>定宽的高度和宽度影响旁边栏的布局，所以实现不了  - 。-</p>
<p>方法2.flex</p>
<p>阔以实现，而且相当简单 ╮(╯▽╰)╭  把刚刚设置了高度和宽度的地方去掉就可以了  ∑(っ °Д °;)っ </p>
<p><a href="https://jsfiddle.net/DarcyAn/j1t84e9r/" rel="nofollow noreferrer" target="_blank">惊人的栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="DarcyAn/j1t84e9r/" data-typeid="0">点击预览</button></p>
<p>方法3.Grid</p>
<p>阔以实现，但是因为还是W3C的草案，所以会经常变化，不稳定，而且浏览器支持也不好。</p>
<h1 id="articleHeader22">响应式</h1>
<h3 id="articleHeader23">想要达到的效果</h3>
<p>只写一个网站，在多个终端显示，在小屏幕上会隐藏部分元素。</p>
<h3 id="articleHeader24">现在的情况</h3>
<p>在PC端浏览器中可以正常访问的网站，到了手机上之后，内容就会变得特别小。<br>原因：所有的移动设备都有一个viewport（视窗），这个视窗不是手机屏幕大小，而是一个虚拟的窗口，比如iPhone4的viewport宽度为980px（如下图所示）。显示的时候再按照比例将这980px的内容压缩显示到实际的屏幕宽度中。</p>
<p><span class="img-wrap"><img data-src="/img/bVMsCT?w=667&amp;h=456" src="https://static.alili.tech/img/bVMsCT?w=667&amp;h=456" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader25">所以为防止让页面缩小，在移动设备中，我们会做如下设置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;
 width=device-width //让宽度等于设备宽度，因为不同的移动设备宽度不同 iphone4为320px
 ,initial-scale=1.0 //初始缩放1.0， 即不缩放，网站就不会被缩小了
 ,user-scalable=no //防止用户手动缩放
&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>&lt;meta name=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"</span>
 width=device-width <span class="hljs-comment">//让宽度等于设备宽度，因为不同的移动设备宽度不同 iphone4为320px</span>
 ,initial-scale=<span class="hljs-number">1.0</span> <span class="hljs-comment">//初始缩放1.0， 即不缩放，网站就不会被缩小了</span>
 ,user-scalable=no <span class="hljs-comment">//防止用户手动缩放</span>
<span class="hljs-string">"&gt;</span></code></pre>
<h3 id="articleHeader26">设置结束之后，如何具体开发？</h3>
<h4>方法1.宽度尽量自适应，而不要用定宽。</h4>
<h4>方法2.用媒体查询 @media</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media screen and (max-width: 320px) {
  //最大宽度为320px，即视窗宽度小于等于320px
  div{..}
  .class-name{...}
}

@media screen and (min-width: 320px) and (max-width: 769px){
  //最小宽度为320px，最大宽度为769px，即视窗宽度大于320px，小于769px
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>@media screen <span class="hljs-keyword">and</span> (max-width: <span class="hljs-number">320</span>px) {
  //最大宽度为<span class="hljs-number">320</span>px，即视窗宽度小于等于<span class="hljs-number">320</span>px
  <span class="hljs-keyword">div</span><span class="hljs-meta">{..}</span>
  .class-name<span class="hljs-meta">{...}</span>
}

@media screen <span class="hljs-keyword">and</span> (min-width: <span class="hljs-number">320</span>px) <span class="hljs-keyword">and</span> (max-width: <span class="hljs-number">769</span>px){
  //最小宽度为<span class="hljs-number">320</span>px，最大宽度为<span class="hljs-number">769</span>px，即视窗宽度大于<span class="hljs-number">320</span>px，小于<span class="hljs-number">769</span>px
}</code></pre>
<h1 id="articleHeader27">页面优化</h1>
<h2 id="articleHeader28">目的</h2>
<p>减少卡顿<br>利于SEO<br>便于代码维护</p>
<h2 id="articleHeader29">方法</h2>
<h3 id="articleHeader30">1. 减少页面请求</h3>
<h4>减少css文件请求</h4>
<p>（1）多个css文件合并成一个<br>（2）少量css样式内联<br>（3）避免用import的方式引入css文件，因为每个import语句都会产生一个css请求，并且是同步的请求。</p>
<h3 id="articleHeader31">2.减少资源文件大小</h3>
<p>（1）减少图片大小<br>选择合适的图片格式，小尺寸、半透明的用png，大尺寸、色彩绚丽用jpg（因为jpg会对图片进行压缩）<br>压缩图片</p>
<p>（2）css值缩写<br>margin，padding，border，font，border-radius等属性</p>
<p>（3）省略值为0 的单位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin: 0 10px;
line-height: .5;
background-position: 50% 0;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
<span class="hljs-attribute">line-height</span>: .<span class="hljs-number">5</span>;
<span class="hljs-attribute">background-position</span>: <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;
</code></pre>
<p>（4）颜色值最短表示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="red
rgb(0,0,0)
rgba(0,0,0,0)
#000000
#000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>red
rgb(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
#<span class="hljs-number">000000</span>
#<span class="hljs-number">000</span></code></pre>
<p>（5）css选择器合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left, .right {...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">.left, .right <span class="hljs-meta">{...}</span></code></pre>
<p>（6）文件压缩<br>用工具对文件进行自动压缩，去掉空格。</p>
<h3 id="articleHeader32">3.提升页面性能</h3>
<h4>加载顺序</h4>
<p>css通常放在head中，而js通常放在body底部，因为js会阻碍其他资源加载。</p>
<h4>减少标签数量。</h4>
<h4>选择器长度</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body .menu ul li a { ... } //太长了
.menu a { ... } //更好" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span> <span class="hljs-selector-class">.menu</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> { ... } <span class="hljs-comment">//太长了</span>
<span class="hljs-selector-class">.menu</span> <span class="hljs-selector-tag">a</span> { ... } <span class="hljs-comment">//更好</span></code></pre>
<h4>避免耗性能属性</h4>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expression
filter
border-radius
box-shadow
gradients" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>expression
filter
<span class="hljs-built_in">border</span>-<span class="hljs-built_in">radius</span>
<span class="hljs-built_in">box</span>-shadow
gradients</code></pre>
<h4>给图片设置固定宽高，并且图片实际宽高与设置宽高相同，否则浏览器会回流设置多次宽高</h4>
<h4>所有表现用css实现</h4>
<h3 id="articleHeader33">4.通过规范提高代码可读性，可维护性</h3>
<p>（1）规范：缩进，变量名等<br>（2）语义化：除了标签，css、id名最好也尽量有意义<br>（3）尽量避免Hack，一定要用也要统一的标识，比如IE7用*<br>（4）模块化：相关联的结构做成一个个模块，复用性更强<br>（5）添加注释</p>
<h1 id="articleHeader34">规范与模块化</h1>
<h2 id="articleHeader35">规范</h2>
<p>1.注释的文字两侧需加空格，防止因编码问题导致注释失效</p>
<p>2.为避免命名污染，可以给class加前缀，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="g- 布局命名
m- 模块命名
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>g- 布局命名
m- 模块命名
</code></pre>
<p>3.语义化命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//结构化命名
top { ... }

//改用语义化命名
nav { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//结构化命名</span>
top { ... }

<span class="hljs-comment">//改用语义化命名</span>
nav { ... }</code></pre>
<p>4.属性的书写顺序</p>
<p><span class="img-wrap"><img data-src="/img/bVMwjz?w=848&amp;h=457" src="https://static.alili.tech/img/bVMwjz?w=848&amp;h=457" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader36">模块化</h2>
<h3 id="articleHeader37">什么是模块化</h3>
<blockquote><ol>
<li><p>一系列相关联的结构组成的整体</p></li>
<li><p>带有一定的语义，而非表现</p></li>
</ol></blockquote>
<p>比如，翻页器（或叫分页器paging）、轮播图。</p>
<h3 id="articleHeader38">怎么做？</h3>
<blockquote><ol>
<li><p>为模块分类命名（如.m-, .md-）</p></li>
<li><p>以一个主选择器开头（模块根节点）</p></li>
<li><p>使用以主选择器开头的后代选择器（模块子节点）</p></li>
</ol></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;m-nav&quot;>
  <ul>
    <li class=&quot;z-crt&quot;><a>链接</a></li>
    <li><a>链接</a></li>
  </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"m-nav"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"z-crt"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>链接<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>链接<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//根节点
.m-nav { ... }
//子节点
.m-nav ul{ ... }
.m-nav li{ ... }
.m-nav a{ ... }
.m-nav .z-crt a{ ... }/* 交互状态变化 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//根节点</span>
<span class="hljs-selector-class">.m-nav</span> { ... }
<span class="hljs-comment">//子节点</span>
<span class="hljs-selector-class">.m-nav</span> ul{ ... }
<span class="hljs-selector-class">.m-nav</span> li{ ... }
<span class="hljs-selector-class">.m-nav</span> a{ ... }
<span class="hljs-selector-class">.m-nav</span> <span class="hljs-selector-class">.z-crt</span> a{ ... }<span class="hljs-comment">/* 交互状态变化 */</span></code></pre>
<p>若有一个模块只是比上述模块多了一个按钮，其余部分完全相同，怎么办？</p>
<h3 id="articleHeader39">怎样扩展？</h3>
<p>为根节点加一个class就好了，这里我们加一个 <code>m-nav-1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;m-nav m-nav-1&quot;>
  <ul>
    <li class=&quot;z-crt&quot;><a>链接</a></li>
    <li><a>链接</a></li>
  </ul>
  <a class=&quot;btn&quot;>我是新加的a标签</a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-nav m-nav-1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"z-crt"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>链接<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>链接<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>我是新加的a标签<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//变化的部分在 .m-nav-1 这个新class中写
.m-nav-1 { ... }
.m-nav-1 a{ ... }
.m-nav-1 .btn{ ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//变化的部分在 .m-nav-1 这个新class中写</span>
<span class="hljs-selector-class">.m-nav-1</span> { ... }
<span class="hljs-selector-class">.m-nav-1</span> a{ ... }
<span class="hljs-selector-class">.m-nav-1</span> .btn{ ... }</code></pre>
<h3 id="articleHeader40">网易的规范和代码库</h3>
<p><a href="http://nec.netease.com/standard" rel="nofollow noreferrer" target="_blank">规范页</a>：包含了CSS规范、HTML规范和工程师规范</p>
<p><a href="http://nec.netease.com/library" rel="nofollow noreferrer" target="_blank">代码库</a>：包含了常用的布局方式、常见模块和元件的实现以及一些bug、技巧等</p>
<p>——————<br><em>教是最好的学。</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
页面架构HTML+CSS ヾ(o◕∀◕)ﾉ 常用居中&多列布局

## 原文链接
[https://segmentfault.com/a/1190000009152865](https://segmentfault.com/a/1190000009152865)


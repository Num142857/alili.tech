---
title: '用Canvas实现文本编辑器（支持艺术字渲染与动画）' 
date: 2019-01-18 2:30:34
hidden: true
slug: 06kzovqi2sob
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>导言</strong></h2>
<p>目前富文本编辑器的实现主要有两种技术方案：一个是利用contenteditable属性直接对html元素进行编辑，如draft.js；另一种是代理textarea + 自定义div + 模拟光标实现。对于类似"word"的经典富文本编辑器，一般会采用以上两种技术方案之一，而不会考虑用canvas实现。</p>
<p>事实上，官方最佳实践中已经特别声明了不推荐用canvas实现编辑器，详见<a href="https://www.w3.org/TR/2dcontext/#best-practices" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/2dconte...</a><br>不推荐的原因包括光标位置维护、键盘移动的实现、以及没有原生文本输入处理等等。</p>
<p><strong>既然如此，为何还要用canvas制作文本编辑器呢？</strong>这是因为对一些特殊的创作来说，canvas能更好的实现展示需求。比如艺术字效果的渲染，以及文本、背景动画等。</p>
<p>基于这点想法，便有了“简诗”这个自娱自乐的小项目。</p>
<p>简诗是为短诗文创作而开发的文本编辑器，主要面向中文写作。中文最特别之处便在于其笔画，所以在开发之初，我便想对文字进行处理之时，一定要把汉字进行笔画分割，以便实现更多有趣的效果的。</p>
<p>项目中文字由WebGL进行渲染。基本思路是先根据用户选择的字体，将文字写在离屏canvas上，然后利用getImageData api获取文字像素数据，进行连通域查询、分割、边缘查找及三角化后，由WebGL进行渲染。</p>
<p><em>（注：这种处理方式的好处是对任意系统支持的字体都可以实现艺术效果，而无需额外的字体开发。目前项目中没有引入字体文件，用到的字体都是Mac内置的字体，Mac用户如发现其中有的字体系统没有默认安装，只需到“字体册”中安装一下即可）</em></p>
<p>这一系列过程会单开一篇文章来写，本文主要描述canvas编辑器核心的实现。</p>
<h2 id="articleHeader1">实现效果</h2>
<p><span class="img-wrap"><img data-src="/img/bVK9s7?w=1382&amp;h=771" src="https://static.alili.tech/img/bVK9s7?w=1382&amp;h=771" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>预览地址：<a href="https://moyuer1992.github.io/pages/jianshi/" rel="nofollow noreferrer" target="_blank">https://moyuer1992.github.io/...</a><br>源码地址：<a href="https://github.com/moyuer1992/jianshi" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a></p>
<h2 id="articleHeader2">技术关键点</h2>
<h3 id="articleHeader3">文字键入（代理输入框）</h3>
<p>用canvas实现编辑器最关键的一点就是如何监听键盘文字输入，如果通过键盘事件自己处理，英文尚可，中文肯定是不可行的。所以还是需要使用原生textarea做一层代理。</p>
<p>代理textarea输入框是不可见的。这里需特别注意下，若用display: none隐藏输入框，则无法触发focus事件，所以输入框需要利用z-index来做隐藏。</p>
<p>当用户点击canvas时，程序控制触发textarea的focus事件，继而用户输入时，也自然触发了textarea的input事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pos = this._convertWindowPosToCanvas(e.clientX, e.clientY);
if (pos.x !== -1 &amp;&amp; pos.y !== -1) {
  this.focus(pos.x, pos.y);
} else {
  this.blur();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> pos = <span class="hljs-keyword">this</span>._convertWindowPosToCanvas(e.clientX, e.clientY);
<span class="hljs-keyword">if</span> (pos.x !== <span class="hljs-number">-1</span> &amp;&amp; pos.y !== <span class="hljs-number">-1</span>) {
  <span class="hljs-keyword">this</span>.focus(pos.x, pos.y);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">this</span>.blur();
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="focus (x, y) {
  var pos = this.findPosfromMap(x, y);
  this.selection.update(pos.row, pos.col);
  this.updateCursor();
  this.$input.focus();
  this.$cursor.css('visibility', 'visible');
  this.onFocus = true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>focus (x, y) {
  <span class="hljs-keyword">var</span> pos = <span class="hljs-keyword">this</span>.findPosfromMap(x, y);
  <span class="hljs-keyword">this</span>.selection.update(pos.row, pos.col);
  <span class="hljs-keyword">this</span>.updateCursor();
  <span class="hljs-keyword">this</span>.$input.focus();
  <span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'visibility'</span>, <span class="hljs-string">'visible'</span>);
  <span class="hljs-keyword">this</span>.onFocus = <span class="hljs-literal">true</span>;
}</code></pre>
<h3 id="articleHeader4">中文输入</h3>
<p>按照上述方法，很容易想到处理文本输入的流程：</p>
<ul>
<li><p>监听隐藏输入框的input事件</p></li>
<li><p>触发input事件时，将输入框value取出，渲染到canvas中对应位置</p></li>
<li><p>清空输入框，继续监听</p></li>
</ul>
<p>然而，当输入中文时，一些输入法会出现这种现象：<br><span class="img-wrap"><img data-src="/img/bVK0vM?w=1023&amp;h=209" src="https://static.alili.tech/img/bVK0vM?w=1023&amp;h=209" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>显然，当使用中文输入法键入拼音时，拼音字母已经写入输入框中，触发了input事件，但事实上用户并没有键入完毕。这就导致了最终拼音字母和汉字全部被写到了canvas上，这并非我们想要的结果。</p>
<p>如何解决呢？这里需要用到input元素的onCompStart和onCompEnd事件。</p>
<p>当中文输入开始时，会触发onCompStart事件，此时做一个标记，告知程序用户正在中文输入，input事件触发时，判断当前是否正在键入中文，若是，则不作任何操作。待onCompEnd触发时，取消中文输入标记，将文字渲染到canvas上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$input.on('compositionstart', this.onCompStart.bind(this));
this.$input.on('compositionend', this.onCompEnd.bind(this));
this.$input.on('input', this.onInputChar.bind(this));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$input.on(<span class="hljs-string">'compositionstart'</span>, <span class="hljs-keyword">this</span>.onCompStart.bind(<span class="hljs-keyword">this</span>));
<span class="hljs-keyword">this</span>.$input.on(<span class="hljs-string">'compositionend'</span>, <span class="hljs-keyword">this</span>.onCompEnd.bind(<span class="hljs-keyword">this</span>));
<span class="hljs-keyword">this</span>.$input.on(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">this</span>.onInputChar.bind(<span class="hljs-keyword">this</span>));</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onCompStart (e) {
  this.inputStatus = 'CHINESE_TYPING';
}

onCompEnd (e) {
  var that = this;
  setTimeout(function () {
    that.input();
    that.inputStatus = 'CHINESE_TYPE_END';
  }, 100)
}

onInputChar (e) {
  if (this.inputStatus === 'CHINESE_TYPING') {
    return;
  }

  this.inputStatus = 'CHAR_TYPING';
  this.input();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>onCompStart (e) {
  <span class="hljs-keyword">this</span>.inputStatus = <span class="hljs-string">'CHINESE_TYPING'</span>;
}

onCompEnd (e) {
  <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
  setTimeout(function () {
    that.input();
    that.inputStatus = <span class="hljs-string">'CHINESE_TYPE_END'</span>;
  }, <span class="hljs-number">100</span>)
}

onInputChar (e) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.inputStatus === <span class="hljs-string">'CHINESE_TYPING'</span>) {
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-keyword">this</span>.inputStatus = <span class="hljs-string">'CHAR_TYPING'</span>;
  <span class="hljs-keyword">this</span>.input();
}</code></pre>
<h3 id="articleHeader5">虚拟光标</h3>
<p>用canvas实现编辑器需要模拟光标，这里用一个div来实现，设置position为absolute，用top、left来定位光标位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$cursor = $('<div class=&quot;cursor&quot;></div>');
this.cursorNode = this.$cursor.get(0);
this.$cursor.css('width', '1px');
this.$cursor.css('height', this.style.lineHeight() + 'px');
this.$cursor.css('position', 'absolute');
this.$cursor.css('top', this.selection.rowIndex * this.style.lineHeight());
this.$cursor.css('left', this.selection.colIndex * this.fontSize);
this.$cursor.css('background-color', 'black');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$cursor = $(<span class="hljs-string">'&lt;div class="cursor"&gt;&lt;/div&gt;'</span>);
<span class="hljs-keyword">this</span>.cursorNode = <span class="hljs-keyword">this</span>.$cursor.<span class="hljs-keyword">get</span>(<span class="hljs-number">0</span>);
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'width'</span>, <span class="hljs-string">'1px'</span>);
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'height'</span>, <span class="hljs-keyword">this</span>.style.lineHeight() + <span class="hljs-string">'px'</span>);
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'position'</span>, <span class="hljs-string">'absolute'</span>);
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'top'</span>, <span class="hljs-keyword">this</span>.selection.rowIndex * <span class="hljs-keyword">this</span>.style.lineHeight());
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'left'</span>, <span class="hljs-keyword">this</span>.selection.colIndex * <span class="hljs-keyword">this</span>.fontSize);
<span class="hljs-keyword">this</span>.$cursor.css(<span class="hljs-string">'background-color'</span>, <span class="hljs-string">'black'</span>);</code></pre>
<p>用css动画实现光标1s闪动一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes cursor {
  from {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.cursor {
  animation: cursor 1s ease infinite;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> cursor {
  <span class="hljs-selector-tag">from</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  }

  50% {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  }

  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  }
}

<span class="hljs-selector-class">.cursor</span> {
  <span class="hljs-attribute">animation</span>: cursor <span class="hljs-number">1s</span> ease infinite;
}</code></pre>
<p>原理虽然简单，但是随着文字、排版、用户操作变更，如何维护光标位置，是一件较为繁琐的事。</p>
<p>这里定义了Selection类以存储用户选择区域。未选择任何文本的情况下，selection位置及为光标所在位置。（目前此项目尚未支持选择文本功能，但Selection类的设计方式对以后此功能的添加是支持的。）</p>
<p>selection对象中，位置存储完全是针对文本矩阵的，而非对应屏幕上真正的坐标。项目中另外定义了map矩阵存储文本位置数据。map的具体设计下面一节会详细讲到。</p>
<p>更新光标函数如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="updateCursor () {
  var pos = this.selection.getSelEndPosition();
  this.$cursor.css('height', this.style.lineHeight() + 'px');
  this.$cursor.css('left', this.map[pos.rowIndex][pos.colIndex].cursorX + 'px');
  this.$cursor.css('top', this.map[pos.rowIndex][pos.colIndex].cursorY + 'px');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>updateCursor () {
  var pos = this.selection.getSelEndPosition();
  this.$cursor.css('height', this.style.lineHeight() + 'px');
  this.$cursor.css('left', this.map[<span class="hljs-string">pos.rowIndex</span>][<span class="hljs-symbol">pos.colIndex</span>].cursorX + 'px');
  this.$cursor.css('top', this.map[<span class="hljs-string">pos.rowIndex</span>][<span class="hljs-symbol">pos.colIndex</span>].cursorY + 'px');
}</code></pre>
<h3 id="articleHeader6">文字排版</h3>
<p>上一节中已经提到，项目中定义了map矩阵存储文本位置信息。每次渲染文字时，会依据当前样式（版式、文字大小等）更新map数据。<br>目前项目支持居中和左对齐两个版式，map更新时，这两个版式的位置计算有所不同。</p>
<p>对于左对齐版式，逻辑比较简单，只要从左边边距处开始，逐个写入文字，直至换行即可。<br>而对于居中版式，逻辑要稍微复杂一些，处理每段文字时，要先根据每段文字总长度、canvas宽度、边距大小来确定文字位置。如果此段文字不足一行，则直接居中显示，若超过一行，将每行填满后，对不足一行的部分居中显示。</p>
<p>每个map元素结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  char: 对应字符/文字,
  x: 文字起始x坐标,
  y: 文字起始y坐标,
  cursorX: 对应光标x坐标,
  cursorY: 对应光标y坐标
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
<span class="hljs-symbol">  char:</span> 对应字符/文字,
<span class="hljs-symbol">  x:</span> 文字起始x坐标,
<span class="hljs-symbol">  y:</span> 文字起始y坐标,
<span class="hljs-symbol">  cursorX:</span> 对应光标x坐标,
<span class="hljs-symbol">  cursorY:</span> 对应光标y坐标
}</code></pre>
<h3 id="articleHeader7">动画精灵</h3>
<p>之所以用canvas实现文本编辑器，便是为了艺术效果的渲染以及文字、背景动画。项目希望实现文字、背景样式的自由切换，为了降低耦合度，为每种文字、背景样式单独定义精灵。</p>
<p>文本精灵基类：<a href="https://github.com/moyuer1992/jianshi/blob/master/app/scripts/share/TextSprite.js" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a><br>文本精灵文件夹：<a href="https://github.com/moyuer1992/jianshi/tree/master/app/scripts/textSprites" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a><br>背景精灵基类：<a href="https://github.com/moyuer1992/jianshi/blob/master/app/scripts/share/BgSprite.js" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a><br>背景精灵文件夹：<a href="https://github.com/moyuer1992/jianshi/tree/master/app/scripts/bgSprites" rel="nofollow noreferrer" target="_blank">https://github.com/moyuer1992...</a></p>
<p>精灵类中的核心是drawStatic、drawFrame、advance三个方法。<br>advance函数中，对进入下一帧时需要改变的参数进行定义。</p>
<p>drawStatic用于静态效果的渲染。Editor类中，每次需要重新渲染静态文字时，都会调用此方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_fillText () {
  if (this.map.length === 1 &amp;&amp; this.map[0].length === 1) {
    this.clearText();
  } else {
    $('.render-tip').addClass('show');
    setTimeout(this.textSprite.drawStatic.bind(this.textSprite), 0);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>_fillText () {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.map.length === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">this</span>.map[<span class="hljs-number">0</span>].length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.clearText();
  } <span class="hljs-keyword">else</span> {
    $(<span class="hljs-string">'.render-tip'</span>).addClass(<span class="hljs-string">'show'</span>);
    setTimeout(<span class="hljs-keyword">this</span>.textSprite.drawStatic.bind(<span class="hljs-keyword">this</span>.textSprite), <span class="hljs-number">0</span>);
  }
}</code></pre>
<p>drawFrame用于动画效果每一帧的渲染，当动画播放时，会逐帧调用此方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="play () {
  this.animating = true;
  this.animationInfo = {
    textStop: false,
    bgStop: false
  };
  this.startTime = Date.now();
  this.textSprite.update();
  this.bgSprite.update();

  window.requestAnimationFrame(this.tick.bind(this));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>play () {
  <span class="hljs-keyword">this</span>.animating = <span class="hljs-literal">true</span>;
  <span class="hljs-keyword">this</span>.animationInfo = {
    textStop: <span class="hljs-literal">false</span>,
    bgStop: <span class="hljs-literal">false</span>
  };
  <span class="hljs-keyword">this</span>.startTime = Date.now();
  <span class="hljs-keyword">this</span>.textSprite.update();
  <span class="hljs-keyword">this</span>.bgSprite.update();

  window.requestAnimationFrame(<span class="hljs-keyword">this</span>.tick.bind(<span class="hljs-keyword">this</span>));
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tick () {
  if (!this.animating) {
    return;
  }

  var t = Date.now() - this.startTime;
  !this.animationInfo.textStop &amp;&amp; (this.animationInfo.textStop = this.textSprite.advance(t));
  !this.animationInfo.bgStop &amp;&amp; (this.animationInfo.bgStop = this.bgSprite.advance(t));

  if (this.animationInfo.textStop &amp;&amp; this.animationInfo.bgStop) {
    this.stopPlay();
  } else {
    this.animationInfo.bgStop ? this.bgSprite.drawStatic() : this.bgSprite.drawFrame();
    this.animationInfo.textStop ? this.textSprite.drawStatic() : this.textSprite.drawFrame();
    window.requestAnimationFrame(this.tick.bind(this));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>tick () {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.animating) {
    <span class="hljs-keyword">return</span>;
  }

  <span class="hljs-keyword">var</span> t = Date.now() - <span class="hljs-keyword">this</span>.startTime;
  !<span class="hljs-keyword">this</span>.animationInfo.textStop &amp;&amp; (<span class="hljs-keyword">this</span>.animationInfo.textStop = <span class="hljs-keyword">this</span>.textSprite.advance(t));
  !<span class="hljs-keyword">this</span>.animationInfo.bgStop &amp;&amp; (<span class="hljs-keyword">this</span>.animationInfo.bgStop = <span class="hljs-keyword">this</span>.bgSprite.advance(t));

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.animationInfo.textStop &amp;&amp; <span class="hljs-keyword">this</span>.animationInfo.bgStop) {
    <span class="hljs-keyword">this</span>.stopPlay();
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.animationInfo.bgStop ? <span class="hljs-keyword">this</span>.bgSprite.drawStatic() : <span class="hljs-keyword">this</span>.bgSprite.drawFrame();
    <span class="hljs-keyword">this</span>.animationInfo.textStop ? <span class="hljs-keyword">this</span>.textSprite.drawStatic() : <span class="hljs-keyword">this</span>.textSprite.drawFrame();
    window.requestAnimationFrame(<span class="hljs-keyword">this</span>.tick.bind(<span class="hljs-keyword">this</span>));
  }
}</code></pre>
<h2 id="articleHeader8">程序架构</h2>
<p><span class="img-wrap"><img data-src="/img/bVK9C6?w=1858&amp;h=976" src="https://static.alili.tech/img/bVK9C6?w=1858&amp;h=976" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>程序的整体架构如上图所示，在入口main.js中，直接新建Editor类实例，并初始化UI组件。</p>
<p>项目中最核心的部分就是Editor类。</p>
<p>Editor包含的数据：</p>
<ul>
<li><p>data对象，用于存储文本数据</p></li>
<li><p>selection对象，用于存储选择信息</p></li>
<li><p>style对象，用于存储当前样式信息</p></li>
<li><p>map矩阵，用于存储当前文本对应位置</p></li>
</ul>
<p>Editor包含的渲染精灵</p>
<ul>
<li><p>bgSprite, 当前渲染背景的精灵</p></li>
<li><p>textSprite, 当前渲染文字的精灵</p></li>
</ul>
<p>Editor包含的节点元素：</p>
<ul>
<li><p>$input, 隐藏输入框</p></li>
<li><p>$canvas, 用于渲染普通canvas文本</p></li>
<li><p>$glcanvas, 用于渲染WebGL文本</p></li>
<li><p>$bgCanvas, 用于渲染普通背景</p></li>
<li><p>$bgGlcanvas, 用于渲染WebGL背景</p></li>
</ul>
<p>这里需要解释一下为何将文本、背景进行解耦分层。</p>
<p>首先, 每个canvas一旦调用getContext('2d')方法，再调用getContext('WebGL')方法则会返回null。也就是说，同一个canvas只能获取普通2d context和WebGL context中的一个，这意味着我们无法同时调用WebGL api和原生canvas api。所以对于文字或背景的渲染，都分成WebGL和原生canvas两种。</p>
<p>另外，由于项目中文本、背景样式都可以自由切换，若都用同一个canvas进行渲染，保持文本样式不变，而对背景样式进行切换时，则整个canvas都要重绘。为避免这样的开销，项目中将文本、背景进行分层绘制。</p>
<p>此处或许有人会考虑到最终图像保存的问题。是的，进行分层后，图像保存需要另外做一些处理，但并不太复杂，只需将每层canvas图像逐层绘制到一个离屏canvas上即可。</p>
<p>例如，导出png格式图片代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="generatePng () {
  var canvas = document.createElement('canvas');
  canvas.width = this.canvasNode.width;
  canvas.height = this.canvasNode.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(this.bgCanvasNode, 0, 0);
  ctx.drawImage(this.bgGlcanvasNode, 0, 0);
  ctx.drawImage(this.canvasNode, 0, 0);
  ctx.drawImage(this.glcanvasNode, 0, 0);

  var imgData = canvas.toDataURL(&quot;image/png&quot;);
  return imgData;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>generatePng () {
  <span class="hljs-keyword">var</span> canvas = document.createElement(<span class="hljs-string">'canvas'</span>);
  canvas.width = <span class="hljs-keyword">this</span>.canvasNode.width;
  canvas.height = <span class="hljs-keyword">this</span>.canvasNode.height;
  <span class="hljs-keyword">var</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
  ctx.drawImage(<span class="hljs-keyword">this</span>.bgCanvasNode, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  ctx.drawImage(<span class="hljs-keyword">this</span>.bgGlcanvasNode, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  ctx.drawImage(<span class="hljs-keyword">this</span>.canvasNode, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  ctx.drawImage(<span class="hljs-keyword">this</span>.glcanvasNode, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

  <span class="hljs-keyword">var</span> imgData = canvas.toDataURL(<span class="hljs-string">"image/png"</span>);
  <span class="hljs-keyword">return</span> imgData;
}</code></pre>
<p>下图描述了项目核心结构、流程：<br><span class="img-wrap"><img data-src="/img/bVK9Es?w=912&amp;h=369" src="https://static.alili.tech/img/bVK9Es?w=912&amp;h=369" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>其中，样式切换是一个关键流程。项目中将样式配置统一保存在config.js文件中。<br>其中样式索引保存在config.state对象中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state: {
  fontIndex: 0,
  fontSizeIndex: 0,
  fontColorIndex: 0,
  textStyleIndex: 0,
  textAlignIndex: 0,
  backgroundIndex: 0,
  animationIndex: 1,
  bgColorIndex: 0
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">state:</span> {
<span class="hljs-symbol">  fontIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  fontSizeIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  fontColorIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  textStyleIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  textAlignIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  backgroundIndex:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">  animationIndex:</span> <span class="hljs-number">1</span>,
<span class="hljs-symbol">  bgColorIndex:</span> <span class="hljs-number">0</span>
}</code></pre>
<p>而对应可切换的样式定义保存在相应map数组中。举个例子，对背景样式的配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="backgroundMap: [
  {
    Klass: 'PureBgSprite',
    label: '纯色',
    value: 0,
    colors: ['rgb(235, 235, 235)', '#FEFEFE', '#3a3a3a']
  },
  {
    Klass: 'TreeBgSprite',
    label: '月下林间',
    value: 1,
    colors: ['rgb(235, 235, 235)', '#b1a69b', '#3a3a3a']
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">backgroundMap</span>: [
  {
    <span class="hljs-attribute">Klass</span>: <span class="hljs-string">'PureBgSprite'</span>,
    <span class="hljs-attribute">label</span>: <span class="hljs-string">'纯色'</span>,
    <span class="hljs-attribute">value</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">colors</span>: [<span class="hljs-string">'rgb(235, 235, 235)'</span>, <span class="hljs-string">'#FEFEFE'</span>, <span class="hljs-string">'#3a3a3a'</span>]
  },
  {
    <span class="hljs-attribute">Klass</span>: <span class="hljs-string">'TreeBgSprite'</span>,
    <span class="hljs-attribute">label</span>: <span class="hljs-string">'月下林间'</span>,
    <span class="hljs-attribute">value</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">colors</span>: [<span class="hljs-string">'rgb(235, 235, 235)'</span>, <span class="hljs-string">'#b1a69b'</span>, <span class="hljs-string">'#3a3a3a'</span>]
  }
]</code></pre>
<p>backgroundMap数组中每项对应一个样式选择，Klass描述了定义该样式的精灵类名，label定义了工具栏中显示的样式名称，value即对应的样式索引，colors定义了该背景支持的切换颜色。</p>
<p>每次切换背景样式时，程序会根据Klass获取相应精灵实例，并将editor对象中的bgSprite指向该精灵实例。这里特别注意一下，为保证每个精灵对象从始至终都只有一个实例，这里应用了单例模式。</p>
<p>根据类名获取对象实例的方法定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getSpriteEntity: function () {
  var entities = [];
  return function (className, editor) {
    var Klass = eval(className);
    return entities[className] ? entities[className] : entities[className] = new Klass(editor);
  };
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>getSpriteEntity: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> entities = [];
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">className, editor</span>) </span>{
    <span class="hljs-keyword">var</span> Klass = <span class="hljs-built_in">eval</span>(className);
    <span class="hljs-keyword">return</span> entities[className] ? entities[className] : entities[className] = <span class="hljs-keyword">new</span> Klass(editor);
  };
}()</code></pre>
<p>每次样式切换时，会把map中定义的具体参数赋给style对象，渲染时根据样式参数进行不同处理。</p>
<h2 id="articleHeader9">后续</h2>
<p>到此为止，本文主要描述了编辑器的架构以及实现。而其中一些有趣的细节实现（如WebGL文本渲染，对中文笔画分割实现有趣的动画等）并没有描写。这些将来会单开博文来写。</p>
<p>同时项目还有许多常用功能没有实现，比如光标位置切换不支持上下键，无法选择文本等，这些留作以后完善吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Canvas实现文本编辑器（支持艺术字渲染与动画）

## 原文链接
[https://segmentfault.com/a/1190000008816574](https://segmentfault.com/a/1190000008816574)


---
title: '瀑布流插件Masonry的配置和使用' 
date: 2019-02-01 2:30:10
hidden: true
slug: jw6pk6n6bq
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://masonry.desandro.com/" rel="nofollow noreferrer" target="_blank">Masonry</a>是最流行的瀑布流插件之一，配置简单，功能强大，在Github上收获了1w+ stars。如果你想使用瀑布流提升网站体验，Masonry将是不错的选择。</p>
<blockquote><p>瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。最早采用此布局的网站是Pinterest，逐渐在国内流行开来。国内大多数清新站基本为这类风格,像花瓣网、蘑菇街、美丽说等。</p></blockquote>
<p>需要注意的是，如果你需要加载图片，Masonry不会在图片加载完后重新布局，这可能会影响你的布局效果，建议配合使用<a href="http://imagesloaded.desandro.com/" rel="nofollow noreferrer" target="_blank">imagesloaded</a>插件。<br><a href="https://segmentfault.com/a/1190000007316974">imagesloaded配置与使用</a></p>
<h2 id="articleHeader0">安装方式</h2>
<p>Bower</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bower install masonry --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>masonry --save</code></pre>
<p>Npm</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install masonry-layout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> masonry-layout</code></pre>
<p>加载</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/path/to/masonry.pkgd.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/path/to/masonry.pkgd.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader1">html代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;grid&quot;>
  <div class=&quot;grid-item&quot;></div>
  <div class=&quot;grid-item&quot;></div>
  ...
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid"</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-item"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"grid-item"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  ...
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<h2 id="articleHeader2">配置方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery方式
$('.grid').masonry({
  columnWidth: 200,
  itemSelector: '.grid-item'
});

// Vanilla方式
var msnry = new Masonry( '.grid', {
  columnWidth: 200,
  itemSelector: '.grid-item'
});

<!-- HTML方式，不推荐 -->
<div class=&quot;grid&quot; data-masonry='{ &quot;columnWidth&quot;: 200, &quot;itemSelector&quot;: &quot;.grid-item&quot; }'>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">// jQuery方式
$('.grid').masonry(</span><span class="hljs-template-variable">{
  columnWidth: 200,
  itemSelector: '.grid-item'
}</span><span class="xml">);

// Vanilla方式
var msnry = new Masonry( '.grid', </span><span class="hljs-template-variable">{
  columnWidth: 200,
  itemSelector: '.grid-item'
}</span><span class="xml">);

<span class="hljs-comment">&lt;!-- HTML方式，不推荐 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"grid"</span> <span class="hljs-attr">data-masonry</span>=<span class="hljs-string">'</span></span></span><span class="hljs-template-variable">{ "columnWidth": 200, "itemSelector": ".grid-item" }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">'</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader3">设置网格宽度</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="columnWidth: 80
columnWidth: elements
columnWidth: '.grid-sizer'
.grid-item { width: 20%; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">columnWidth:</span> <span class="hljs-number">80</span>
<span class="hljs-string">columnWidth:</span> elements
<span class="hljs-string">columnWidth:</span> <span class="hljs-string">'.grid-sizer'</span>
.grid-item { <span class="hljs-string">width:</span> <span class="hljs-number">20</span>%; }
</code></pre>
<h2 id="articleHeader4">全部属性配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.grid').masonry({
  columnWidth: 200,
  itemSelector: '.grid-item'，     // 要布局的网格元素
  gutter：10,                      // 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置
  percentPosition：true,           // 使用columnWidth对应元素的百分比尺寸
  stamp:'.grid-stamp',             // 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方
  fitWidth: true,                  // 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示
  originLeft: true,                // 默认true网格左对齐，设为false变为右对齐
  originTop: true,                 // 默认true网格对齐顶部，设为false对齐底部
  containerStyle: { position: 'relative' },     // 设置容器样式
  transitionDuration: '0.8s',      // 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式
  stagger: '0.03s',                // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间  
  resize： false,                  // 改变窗口大小将不会影响布局
  initLayout: true,                // 初始化布局，设未true可手动初试化布局
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>$(<span class="hljs-string">'.grid'</span>).masonry({
  columnWidth: <span class="hljs-number">200</span>,
  itemSelector: <span class="hljs-string">'.grid-item'</span>，     <span class="hljs-comment">// 要布局的网格元素</span>
  gutter：<span class="hljs-number">10</span>,                      <span class="hljs-comment">// 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置</span>
  percentPosition：<span class="hljs-literal">true</span>,           <span class="hljs-comment">// 使用columnWidth对应元素的百分比尺寸</span>
  stamp:<span class="hljs-string">'.grid-stamp'</span>,             <span class="hljs-comment">// 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方</span>
  fitWidth: <span class="hljs-literal">true</span>,                  <span class="hljs-comment">// 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示</span>
  originLeft: <span class="hljs-literal">true</span>,                <span class="hljs-comment">// 默认true网格左对齐，设为false变为右对齐</span>
  originTop: <span class="hljs-literal">true</span>,                 <span class="hljs-comment">// 默认true网格对齐顶部，设为false对齐底部</span>
  containerStyle: { <span class="hljs-built_in">position</span>: <span class="hljs-string">'relative'</span> },     <span class="hljs-comment">// 设置容器样式</span>
  transitionDuration: <span class="hljs-string">'0.8s'</span>,      <span class="hljs-comment">// 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式</span>
  stagger: <span class="hljs-string">'0.03s'</span>,                <span class="hljs-comment">// 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间  </span>
  <span class="hljs-built_in">resize</span>： <span class="hljs-literal">false</span>,                  <span class="hljs-comment">// 改变窗口大小将不会影响布局</span>
  initLayout: <span class="hljs-literal">true</span>,                <span class="hljs-comment">// 初始化布局，设未true可手动初试化布局</span>
});
</code></pre>
<h2 id="articleHeader5">方法调用方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery方式。重新布局，添加元素，另一种方式添加元素，重新布局
$grid.masonry().append( elem ).masonry( 'appended', elem ).masonry();

// vanilla方式。同上
var msnry = new Masonry( '.grid', {...});
gridElement.appendChild( elem );
msnry.appended( elem );
msnry.layout();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// jQuery方式。重新布局，添加元素，另一种方式添加元素，重新布局
$grid.masonry().append( elem ).masonry( 'appended', elem ).masonry();

// vanilla方式。同上
<span class="hljs-keyword">var</span> msnry = new <span class="hljs-type">Masonry</span>( '.grid', <span class="hljs-meta">{...}</span>);
gridElement.appendChild( elem );
msnry.appended( elem );
msnry.layout();
</code></pre>
<h2 id="articleHeader6">全部方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$grid.masonry();                             // 重新布局
$grid.masonry( options );                    // 修改设置，再重新布局
$grid.masonry( 'layoutItems', items, isStill );     // 重布局指定元素，isStill接受布尔值，表示是否变换
$grid.masonry( 'stamp', $stamp );            // 固定元素
$grid.masonry( 'unstamp', $stamp );          // 解除固定
$grid.masonry( 'appended', elements );       // 在最后添加元素
$grid.masonry( 'prepended', elements );      // 在最前添加元素    
$grid.masonry( 'addItems', elements );       // 添加元素，但不布局
$grid.masonry( 'remove', elements );         // 删除元素    

 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-variable">$grid</span>.masonry();                             <span class="hljs-regexp">//</span> 重新布局
<span class="hljs-variable">$grid</span>.masonry( options );                    <span class="hljs-regexp">//</span> 修改设置，再重新布局
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'layoutItems'</span>, items, isStill );     <span class="hljs-regexp">//</span> 重布局指定元素，isStill接受布尔值，表示是否变换
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'stamp'</span>, <span class="hljs-variable">$stamp</span> );            <span class="hljs-regexp">//</span> 固定元素
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'unstamp'</span>, <span class="hljs-variable">$stamp</span> );          <span class="hljs-regexp">//</span> 解除固定
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'appended'</span>, elements );       <span class="hljs-regexp">//</span> 在最后添加元素
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'prepended'</span>, elements );      <span class="hljs-regexp">//</span> 在最前添加元素    
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'addItems'</span>, elements );       <span class="hljs-regexp">//</span> 添加元素，但不布局
<span class="hljs-variable">$grid</span>.masonry( <span class="hljs-string">'remove'</span>, elements );         <span class="hljs-regexp">//</span> 删除元素    

 
</code></pre>
<h2 id="articleHeader7">全部事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery方式
var msnry = $grid.masonry( 'on', eventName, listener );
var msnry = $grid.masonry( 'off', eventName, listener );
var msnry = $grid.masonry( 'once', eventName, listener );

// vanilla方式
msnry.on( eventName, listener );
msnry.off( eventName, listener );
msnry.once( eventName, listener );

// jQuery,布局完成事件和移除完成事件
$grid.on( 'layoutComplete', function( event, items ) {
  console.log( items.length );
});
$grid.on( 'removeComplete', function( event, removedItems ) {...} )     

// vanilla，同上
msnry.on( 'layoutComplete', function( event, items ) {
  console.log( items.length );
});
msnry.on( 'removeComplete', function( event, removedItems ) {...} )
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// jQuery方式</span>
<span class="hljs-keyword">var</span> msnry = $grid.masonry( <span class="hljs-string">'on'</span>, eventName, listener );
<span class="hljs-keyword">var</span> msnry = $grid.masonry( <span class="hljs-string">'off'</span>, eventName, listener );
<span class="hljs-keyword">var</span> msnry = $grid.masonry( <span class="hljs-string">'once'</span>, eventName, listener );

<span class="hljs-comment">// vanilla方式</span>
msnry.on( eventName, listener );
msnry.off( eventName, listener );
msnry.once( eventName, listener );

<span class="hljs-comment">// jQuery,布局完成事件和移除完成事件</span>
$grid.on( <span class="hljs-string">'layoutComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( event, items )</span> </span>{
  console.log( items.length );
});
$grid.on( <span class="hljs-string">'removeComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( event, removedItems )</span> </span>{...} )     

<span class="hljs-comment">// vanilla，同上</span>
msnry.on( <span class="hljs-string">'layoutComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( event, items )</span> </span>{
  console.log( items.length );
});
msnry.on( <span class="hljs-string">'removeComplete'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( event, removedItems )</span> </span>{...} )
</code></pre>
<h2 id="articleHeader8">Utilties</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$grid.masonry('reloadItems');     // 重新载入元素，适用Angular和React被改变DOM元素后
$grid.masonry('destroy');         // 移除Masonry,元素返回初试化前状态
var elems = $grid.masonry('getItemElements');     // 返回网格元素
var msnry = $('.grid').data('masonry');           // 返回Masonry实例
var msnry = Masonry.data( $('.grid')[0] );        // 根据网格，返回Masonry实例

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>$grid.masonry(<span class="hljs-string">'reloadItems'</span>);     <span class="hljs-comment">// 重新载入元素，适用Angular和React被改变DOM元素后</span>
$grid.masonry(<span class="hljs-string">'destroy'</span>);         <span class="hljs-comment">// 移除Masonry,元素返回初试化前状态</span>
<span class="hljs-built_in">var</span> elems = $grid.masonry(<span class="hljs-string">'getItemElements'</span>);     <span class="hljs-comment">// 返回网格元素</span>
<span class="hljs-built_in">var</span> msnry = $(<span class="hljs-string">'.grid'</span>).<span class="hljs-built_in">data</span>(<span class="hljs-string">'masonry'</span>);           <span class="hljs-comment">// 返回Masonry实例</span>
<span class="hljs-built_in">var</span> msnry = Masonry.<span class="hljs-built_in">data</span>( $(<span class="hljs-string">'.grid'</span>)<span class="hljs-meta">[</span><span class="hljs-number">0</span><span class="hljs-meta">]</span> );        // 根据网格，返回Masonry实例

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
瀑布流插件Masonry的配置和使用

## 原文链接
[https://segmentfault.com/a/1190000007316788](https://segmentfault.com/a/1190000007316788)


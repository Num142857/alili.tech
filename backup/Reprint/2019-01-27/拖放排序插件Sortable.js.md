---
title: '拖放排序插件Sortable.js' 
date: 2019-01-27 2:31:00
hidden: true
slug: dn61yk7b9cl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>Sortable.js是一款轻量级的拖放排序列表的js插件（虽然体积小，但是功能很强大）<br>下载地址：<a href="https://github.com/RubaXa/Sortable" rel="nofollow noreferrer" target="_blank">https://github.com/RubaXa/Sor...</a><br>官方DEMO：<a href="http://rubaxa.github.io/Sortable/" rel="nofollow noreferrer" target="_blank">http://rubaxa.github.io/Sorta...</a></p>
<hr>
<h2 id="articleHeader1">特点</h2>
<ul>
<li>支持触屏设备和大部分浏览器（IE9以下的就不支持了，原因都懂得）</li>
<li>可以从一个列表容器中拖拽一个列表单元到其他容器或本列表容器中进行排序</li>
<li>移动列表单元时有css动画</li>
<li>支持拖放操作和可选择的文本（这句我也没理解，大概意思就是对原生的拖放进行拓展了）</li>
<li>非常友善的滚动效果</li>
<li>基于原生HTML5中的拖放API</li>
<li>支持多种框架（angular、vue、react等）</li>
<li>支持所有的css框架，像Bootstrap</li>
<li>简单的API，方便使用</li>
<li>CDN</li>
<li>不依赖jQuery</li>
</ul>
<hr>
<h2 id="articleHeader2">安装</h2>
<p>npm安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install sortablejs --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> sortablejs <span class="hljs-comment">--save</span></code></pre>
<p>bower安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ bower install --save sortablejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">bower </span><span class="hljs-keyword">install </span>--save sortablejs</code></pre>
<p>当然还有直接引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;../../js/Sortable.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../js/Sortable.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<hr>
<h2 id="articleHeader3">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;items&quot;>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"items"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>可以通过Sorable对象中的create方法创建</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var el = document.getElementById('items');
var sortable = Sortable.create(el,{});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var el</span> = document.getElementById(<span class="hljs-string">'items'</span>);
<span class="hljs-attribute">var sortable</span> = Sortable.create(el,{});</code></pre>
<p>也可以通过新建个Sortable对象来创建</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sortable = new Sortable(el, {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> sortable = <span class="hljs-keyword">new</span> <span class="hljs-type">Sortable</span>(el, {})</code></pre>
<p>实例中dom结构中用到的是ul（无序列表），当然也可以用其他的元素来构造例如使用div等</p>
<hr>
<h2 id="articleHeader4">配置项</h2>
<p>先把他的整体配置写出来，在一个个介绍</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sortable = new Sortable(el, {
    group: &quot;name&quot;,  // or { name: &quot;...&quot;, pull: [true, false, clone], put: [true, false, array] }
    sort: true,  // sorting inside list
    delay: 0, // time in milliseconds to define when the sorting should start
    disabled: false, // Disables the sortable if set to true.
    store: null,  // @see Store
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
    handle: &quot;.my-handle&quot;,  // Drag handle selector within list items
    filter: &quot;.ignore-elements&quot;,  // Selectors that do not lead to dragging (String or Function)
    draggable: &quot;.item&quot;,  // Specifies which items inside the element should be draggable
    ghostClass: &quot;sortable-ghost&quot;,  // Class name for the drop placeholder
    chosenClass: &quot;sortable-chosen&quot;,  // Class name for the chosen item
    dragClass: &quot;sortable-drag&quot;,  // Class name for the dragging item
    dataIdAttr: 'data-id',

    forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

    fallbackClass: &quot;sortable-fallback&quot;,  // Class name for the cloned DOM Element when using forceFallback
    fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
    fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.        

    scroll: true, // or HTMLElement
    scrollFn: function(offsetX, offsetY, originalEvent) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
    scrollSpeed: 10, // px

    setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
        dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
    },

    // Element is chosen
    onChoose: function (/**Event*/evt) {
        evt.oldIndex;  // element index within parent
    },

    // Element dragging started
    onStart: function (/**Event*/evt) {
        evt.oldIndex;  // element index within parent
    },

    // Element dragging ended
    onEnd: function (/**Event*/evt) {
        evt.oldIndex;  // element's old index within parent
        evt.newIndex;  // element's new index within parent
    },

    // Element is dropped into the list from another list
    onAdd: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        evt.from;  // previous list
        // + indexes from onEnd
    },

    // Changed sorting within list
    onUpdate: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        // + indexes from onEnd
    },

    // Called by any change to the list (add / update / remove)
    onSort: function (/**Event*/evt) {
        // same properties as onUpdate
    },

    // Element is removed from the list into another list
    onRemove: function (/**Event*/evt) {
        // same properties as onUpdate
    },

    // Attempt to drag a filtered element
    onFilter: function (/**Event*/evt) {
        var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
    },

    // Event when you move an item in the list or between lists
    onMove: function (/**Event*/evt, /**Event*/originalEvent) {
        // Example: http://jsbin.com/tuyafe/1/edit?js,output
        evt.dragged; // dragged HTMLElement
        evt.draggedRect; // TextRectangle {left, top, right и bottom}
        evt.related; // HTMLElement on which have guided
        evt.relatedRect; // TextRectangle
        originalEvent.clientY; // mouse position
        // return false; — for cancel
    },

    // Called when creating a clone of element
    onClone: function (/**Event*/evt) {
        var origEl = evt.item;
        var cloneEl = evt.clone;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> sortable = <span class="hljs-keyword">new</span> Sortable(el, {
    group: <span class="hljs-string">"name"</span>,  <span class="hljs-comment">// or { name: "...", pull: [true, false, clone], put: [true, false, array] }</span>
    sort: <span class="hljs-keyword">true</span>,  <span class="hljs-comment">// sorting inside list</span>
    delay: <span class="hljs-number">0</span>, <span class="hljs-comment">// time in milliseconds to define when the sorting should start</span>
    disabled: <span class="hljs-keyword">false</span>, <span class="hljs-comment">// Disables the sortable if set to true.</span>
    store: <span class="hljs-keyword">null</span>,  <span class="hljs-comment">// @see Store</span>
    animation: <span class="hljs-number">150</span>,  <span class="hljs-comment">// ms, animation speed moving items when sorting, `0` — without animation</span>
    handle: <span class="hljs-string">".my-handle"</span>,  <span class="hljs-comment">// Drag handle selector within list items</span>
    filter: <span class="hljs-string">".ignore-elements"</span>,  <span class="hljs-comment">// Selectors that do not lead to dragging (String or Function)</span>
    draggable: <span class="hljs-string">".item"</span>,  <span class="hljs-comment">// Specifies which items inside the element should be draggable</span>
    ghostClass: <span class="hljs-string">"sortable-ghost"</span>,  <span class="hljs-comment">// Class name for the drop placeholder</span>
    chosenClass: <span class="hljs-string">"sortable-chosen"</span>,  <span class="hljs-comment">// Class name for the chosen item</span>
    dragClass: <span class="hljs-string">"sortable-drag"</span>,  <span class="hljs-comment">// Class name for the dragging item</span>
    dataIdAttr: <span class="hljs-string">'data-id'</span>,

    forceFallback: <span class="hljs-keyword">false</span>,  <span class="hljs-comment">// ignore the HTML5 DnD behaviour and force the fallback to kick in</span>

    fallbackClass: <span class="hljs-string">"sortable-fallback"</span>,  <span class="hljs-comment">// Class name for the cloned DOM Element when using forceFallback</span>
    fallbackOnBody: <span class="hljs-keyword">false</span>,  <span class="hljs-comment">// Appends the cloned DOM Element into the Document's Body</span>
    fallbackTolerance: <span class="hljs-number">0</span>, <span class="hljs-comment">// Specify in pixels how far the mouse should move before it's considered as a drag.        </span>

    scroll: <span class="hljs-keyword">true</span>, <span class="hljs-comment">// or HTMLElement</span>
    scrollFn: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(offsetX, offsetY, originalEvent)</span> </span>{ ... }, <span class="hljs-comment">// if you have custom scrollbar scrollFn may be used for autoscrolling</span>
    scrollSensitivity: <span class="hljs-number">30</span>, <span class="hljs-comment">// px, how near the mouse must be to an edge to start scrolling.</span>
    scrollSpeed: <span class="hljs-number">10</span>, <span class="hljs-comment">// px</span>

    setData: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/** DataTransfer */</span>dataTransfer, <span class="hljs-comment">/** HTMLElement*/</span>dragEl)</span> </span>{
        dataTransfer.setData(<span class="hljs-string">'Text'</span>, dragEl.textContent); <span class="hljs-comment">// `dataTransfer` object of HTML5 DragEvent</span>
    },

    <span class="hljs-comment">// Element is chosen</span>
    onChoose: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        evt.oldIndex;  <span class="hljs-comment">// element index within parent</span>
    },

    <span class="hljs-comment">// Element dragging started</span>
    onStart: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        evt.oldIndex;  <span class="hljs-comment">// element index within parent</span>
    },

    <span class="hljs-comment">// Element dragging ended</span>
    onEnd: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        evt.oldIndex;  <span class="hljs-comment">// element's old index within parent</span>
        evt.newIndex;  <span class="hljs-comment">// element's new index within parent</span>
    },

    <span class="hljs-comment">// Element is dropped into the list from another list</span>
    onAdd: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-keyword">var</span> itemEl = evt.item;  <span class="hljs-comment">// dragged HTMLElement</span>
        evt.from;  <span class="hljs-comment">// previous list</span>
        <span class="hljs-comment">// + indexes from onEnd</span>
    },

    <span class="hljs-comment">// Changed sorting within list</span>
    onUpdate: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-keyword">var</span> itemEl = evt.item;  <span class="hljs-comment">// dragged HTMLElement</span>
        <span class="hljs-comment">// + indexes from onEnd</span>
    },

    <span class="hljs-comment">// Called by any change to the list (add / update / remove)</span>
    onSort: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-comment">// same properties as onUpdate</span>
    },

    <span class="hljs-comment">// Element is removed from the list into another list</span>
    onRemove: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-comment">// same properties as onUpdate</span>
    },

    <span class="hljs-comment">// Attempt to drag a filtered element</span>
    onFilter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-keyword">var</span> itemEl = evt.item;  <span class="hljs-comment">// HTMLElement receiving the `mousedown|tapstart` event.</span>
    },

    <span class="hljs-comment">// Event when you move an item in the list or between lists</span>
    onMove: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt, <span class="hljs-comment">/**Event*/</span>originalEvent)</span> </span>{
        <span class="hljs-comment">// Example: http://jsbin.com/tuyafe/1/edit?js,output</span>
        evt.dragged; <span class="hljs-comment">// dragged HTMLElement</span>
        evt.draggedRect; <span class="hljs-comment">// TextRectangle {left, top, right и bottom}</span>
        evt.related; <span class="hljs-comment">// HTMLElement on which have guided</span>
        evt.relatedRect; <span class="hljs-comment">// TextRectangle</span>
        originalEvent.clientY; <span class="hljs-comment">// mouse position</span>
        <span class="hljs-comment">// return false; — for cancel</span>
    },

    <span class="hljs-comment">// Called when creating a clone of element</span>
    onClone: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(<span class="hljs-comment">/**Event*/</span>evt)</span> </span>{
        <span class="hljs-keyword">var</span> origEl = evt.item;
        <span class="hljs-keyword">var</span> cloneEl = evt.<span class="hljs-keyword">clone</span>;
    }
});</code></pre>
<p><strong>属性：</strong></p>
<ul>
<li>
<p><strong>group</strong>：string or object</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       string：命名，个人建议用元素id就行,用处是为了设置可以拖放容器时使用，在array中的put的设置中再做介绍；
       object：{name,pull,put}
               name：同string的方法，
               pull：pull用来定义从这个列表容器移动出去的设置，true/false/'clone'/function
                   true:列表容器内的列表单元可以被移出；
                   false：列表容器内的列表单元不可以被移出；
                   'clone'：列表单元移出，移动的为该元素的副本；
                   function：用来进行pull的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否移出；
               put：put用来定义往这个列表容器放置列表单元的的设置，true/false/['foo','bar']/function
                   true:列表容器可以从其他列表容器内放入列表单元；
                   false：与true相反；
                   ['foo','bar']：这个可以是一个字符串或者是字符串的数组，代表的是group配置项里定义的name值；
                   function：用来进行put的函数判断，可以进行复杂逻辑，在函数中return false/true来判断是否放入；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ocaml"><code>       <span class="hljs-built_in">string</span>：命名，个人建议用元素id就行,用处是为了设置可以拖放容器时使用，在<span class="hljs-built_in">array</span>中的put的设置中再做介绍；
       <span class="hljs-keyword">object</span>：{name,pull,put}
               name：同<span class="hljs-built_in">string</span>的方法，
               pull：pull用来定义从这个列表容器移动出去的设置，<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>/<span class="hljs-symbol">'clone'</span>/<span class="hljs-keyword">function</span>
                   <span class="hljs-literal">true</span>:列表容器内的列表单元可以被移出；
                   <span class="hljs-literal">false</span>：列表容器内的列表单元不可以被移出；
                   <span class="hljs-symbol">'clone'</span>：列表单元移出，移动的为该元素的副本；
                   <span class="hljs-keyword">function</span>：用来进行pull的函数判断，可以进行复杂逻辑，在函数中return <span class="hljs-literal">false</span>/<span class="hljs-literal">true</span>来判断是否移出；
               put：put用来定义往这个列表容器放置列表单元的的设置，<span class="hljs-literal">true</span>/<span class="hljs-literal">false</span>/[<span class="hljs-symbol">'foo'</span>,<span class="hljs-symbol">'bar'</span>]/<span class="hljs-keyword">function</span>
                   <span class="hljs-literal">true</span>:列表容器可以从其他列表容器内放入列表单元；
                   <span class="hljs-literal">false</span>：与<span class="hljs-literal">true</span>相反；
                   [<span class="hljs-symbol">'foo'</span>,<span class="hljs-symbol">'bar'</span>]：这个可以是一个字符串或者是字符串的数组，代表的是group配置项里定义的name值；
                   <span class="hljs-keyword">function</span>：用来进行put的函数判断，可以进行复杂逻辑，在函数中return <span class="hljs-literal">false</span>/<span class="hljs-literal">true</span>来判断是否放入；
</code></pre>
</li>
<li>
<strong>sort</strong>：boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序；</li>
<li>
<strong>delay</strong>：number 定义鼠标选中列表单元可以开始拖动的延迟时间；</li>
<li>
<strong>disabled</strong>：boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；</li>
<li>
<strong>animation</strong>：number  单位：ms，定义排序动画的时间；</li>
<li>
<strong>handle</strong>：selector 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动；</li>
<li>
<strong>filter</strong>：selector 格式为简单css选择器的字符串，定义哪些列表单元不能进行拖放，可设置为多个选择器，中间用“，”分隔；</li>
<li>
<strong>draggable</strong>：selector 格式为简单css选择器的字符串，定义哪些列表单元可以进行拖放</li>
<li>
<strong>ghostClass</strong>：selector 格式为简单css选择器的字符串，当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class，我们可以通过这种方式来给影子元素进行编辑样式；</li>
<li>
<strong>chosenClass</strong>：selector 格式为简单css选择器的字符串，当选中列表单元时会给该单元增加一个class；</li>
<li>
<strong>forceFallback</strong>：boolean 如果设置为true时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式等；</li>
<li>
<strong>fallbackClass</strong>：string 当forceFallback设置为true时，拖放过程中鼠标附着单元的样式；</li>
<li>
<strong>scroll</strong>：boolean 默认为true，当排序的容器是个可滚动的区域，拖放可以引起区域滚动</li>
</ul>
<p><strong>事件：</strong></p>
<ul>
<li>
<strong>onChoose</strong>：function 列表单元被选中的回调函数</li>
<li>
<strong>onStart</strong>：function 列表单元拖动开始的回调函数</li>
<li>
<strong>onEnd</strong>：function 列表单元拖放结束后的回调函数</li>
<li>
<strong>onAdd</strong>：function 列表单元添加到本列表容器的回调函数</li>
<li>
<strong>onUpdate</strong>：function 列表单元在列表容器中的排序发生变化后的回调函数</li>
<li>
<strong>onRemove</strong>：function 列表元素移到另一个列表容器的回调函数</li>
<li>
<strong>onFilter</strong>：function 试图选中一个被filter过滤的列表单元的回调函数</li>
<li>
<strong>onMove</strong>：function 当移动列表单元在一个列表容器中或者多个列表容器中的回调函数</li>
<li>
<strong>onClone</strong>：function 当创建一个列表单元副本的时候的回调函数</li>
</ul>
<p><strong>事件对象：</strong><br>事件对象在各个函数中略有不同，可通过输出对象查看对象的属性，下面简单列举几个：</p>
<ul>
<li>
<strong>to</strong>：HTMLElement--移动到列表容器</li>
<li>
<strong>from</strong>：HTMLElement--来源的列表容器</li>
<li>
<strong>item</strong>：HTMLElement--被移动的列表单元</li>
<li>
<strong>clone</strong>：HTMLElement--副本的列表单元</li>
<li>
<strong>oldIndex</strong>：number/undefined--在列表容器中的原序号</li>
<li>
<strong>newIndex</strong>：number/undefined--在列表容器中的新序号</li>
</ul>
<hr>
<h2 id="articleHeader5">方法</h2>
<ul>
<li>
<strong>option(name[,value])</strong><br>   获得或者设置项参数，使用方法类似于jQuery用法，没有第二个参数为获得option中第一个参数所对应的值，有第二个参数时，将重新赋给第一个参数所对应的值；</li>
<li>
<strong>closest</strong><br>   没理解</li>
<li>
<strong>toArray()</strong><br>  序列化可排序的列表单元的data-id（可通过配置项中dataIdAttr修改）放入一个数组，并返回这个数组中</li>
<li>
<strong>sort()</strong><br>   通过自定义列表单元的data-id的数组对列表单元进行排序</li>
<li>save()</li>
<li>destroy()</li>
</ul>
<p>有问题加我qq吧，这个评论翻着不是很好找，635905156</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
拖放排序插件Sortable.js

## 原文链接
[https://segmentfault.com/a/1190000008209715](https://segmentfault.com/a/1190000008209715)


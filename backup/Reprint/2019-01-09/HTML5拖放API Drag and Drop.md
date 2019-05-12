---
title: 'HTML5拖放API Drag and Drop' 
date: 2019-01-09 2:30:12
hidden: true
slug: hlg66wy89ih
categories: [reprint]
---

{{< raw >}}

                    
<p>此文研究Web API中的拖放接口，提供各个属性和方法的说明，解决拖放过程中的拖拽数据对象存储和获取问题。</p>
<p>拖放API作用到两个目标对象，分别是拖拽目标对象和放置目标对象。</p>
<h2 id="articleHeader0">拖拽目标</h2>
<p>一个设置<code>draggable</code>属性的值为<code>true</code>DOM元素或者一个选中状态的文本区块可以成为拖拽目标。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div draggable=&quot;true&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> draggable=<span class="hljs-string">"true"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>OR<br><span class="img-wrap"><img data-src="/img/remote/1460000010127535" src="https://static.alili.tech/img/remote/1460000010127535" alt="yy 20170629201338" title="yy 20170629201338" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">放置目标</h2>
<p>一个绑定了下图放置目标对应的5个事件的DOM元素可以成为放置目标。</p>
<h2 id="articleHeader2">事件</h2>
<p>拖放API有8个事件，其中有3个事件绑定在拖拽目标上，有5个事件绑定在放置目标上。</p>
<h3 id="articleHeader3">绑定在拖拽目标</h3>
<table>
<thead><tr>
<th>Evnet</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>dragstart</td>
<td>当用户开始拖拽一个元素或者一个文本选取区块的时触发。</td>
</tr>
<tr>
<td>drag</td>
<td>当用户正在拖拽一个元素或者一个文本选取区块的时触发。</td>
</tr>
<tr>
<td>dragend</td>
<td>当用户结束拖拽一个元素或者一个文本选取区块的时触发。（如放开鼠标按键或按下键盘的 escap 键）</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader4">绑定在放置目标</h3>
<table>
<thead><tr>
<th>Event</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>dragenter</td>
<td>当一个元素或文字选取区块被拖曳移动进入一个有效的放置目标时触发。</td>
</tr>
<tr>
<td>dragover</td>
<td>当一个元素或文字选取区块被拖曳移动经过一个有效的放置目标时触发。</td>
</tr>
<tr>
<td>dragleave</td>
<td>当一个元素或文字选取区块被拖曳移动离开一个有效的放置目标时触发。</td>
</tr>
<tr>
<td>dragexist</td>
<td>当一个元素不再是被选取中的拖曳元素时触发。（Firefox能触发，触发顺序：dragexist-&gt;dragleave-&gt;drop；Chrome无法触发）</td>
</tr>
<tr>
<td>drop</td>
<td>当一个元素或文字选取区块被放置至一个有效的放置目标时触发。</td>
</tr>
</tbody>
</table>
<p>通过下图能更直观观察每个事件触发的时机</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010127536" src="https://static.alili.tech/img/remote/1460000010127536" alt="dragdrop-events" title="dragdrop-events" style="cursor: pointer;"></span></p>
<p><a href="https://jsfiddle.net/leechikit/7buhdcko/" rel="nofollow noreferrer" target="_blank">戳我看源码</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/7buhdcko/" data-typeid="0">点击预览</button></p>
<blockquote><p>注意：在<strong>dragover</strong>事件中使用<code>event.preventDefault();</code>阻止默认事件，才能触发<strong>drop</strong>事件</p></blockquote>
<h2 id="articleHeader5">DataTransfer对象</h2>
<p>在进行拖放操作时，会触发上面所述的8个事件，每个<strong>event</strong>事件对象中都会有<strong>DataTransfer</strong>对象用来保存被拖动的数据。它可以保存一项或多项数据、一种或者多种数据类型。</p>
<h3 id="articleHeader6">effectAllowed</h3>
<p>用来指定拖动时被允许的效果。</p>
<p>在<strong>dragstart</strong>事件中设置</p>
<h3 id="articleHeader7">属性</h3>
<h3 id="articleHeader8">dropEffect</h3>
<p>设置实际的放置效果，它应该始终设置成<strong>effectAllowed</strong>的可能值之一 。</p>
<p>在<strong>dragenter</strong>事件和<strong>dragover</strong>事件中设置</p>
<p>effectAllowed和dropEffect属性的栗子：<a href="https://jsfiddle.net/leechikit/o6r3wtpq/" rel="nofollow noreferrer" target="_blank">戳我看源码</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/o6r3wtpq/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader9">files</h3>
<p>包含一个在数据传输上所有可用的本地文件列表。如果拖动操作不涉及拖动文件，此属性是一个空列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filesZoneEl.addEventListener(&quot;drop&quot;, (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    for (let i = 0, len = files.length; i < len; i++) {
        let liEl = document.createElement(&quot;li&quot;);
        liEl.innerHTML = files[i].name;
        filesListEl.appendChild(liEl);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>filesZoneEl.addEventListener(<span class="hljs-string">"drop"</span>, (event) =&gt; {
    event.preventDefault();
    <span class="hljs-keyword">let</span> <span class="hljs-attr">files</span> = event.dataTransfer.files;
    for (<span class="hljs-keyword">let</span> <span class="hljs-attr">i</span> = <span class="hljs-number">0</span>, <span class="hljs-attr">len</span> = files.length; i &lt; len; i++) {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">liEl</span> = document.createElement(<span class="hljs-string">"li"</span>);
        liEl.<span class="hljs-attr">innerHTML</span> = files[i].name;
        filesListEl.appendChild(liEl);
    }
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010127537" src="https://static.alili.tech/img/remote/1460000010127537" alt="drag-file" title="drag-file" style="cursor: pointer;"></span></p>
<p><a href="https://jsfiddle.net/leechikit/dqgjr4r0/" rel="nofollow noreferrer" target="_blank">戳我看源码</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/dqgjr4r0/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader10">types</h3>
<p>保存一个被存储数据的类型列表作为第一项，顺序与被添加数据的顺序一致。如果没有添加数据将返回一个空列表。</p>
<h3 id="articleHeader11">items</h3>
<p>存储<strong>DataTransferItem</strong>数据对象的列表。</p>
<h3 id="articleHeader12">方法</h3>
<h3 id="articleHeader13">addElement()</h3>
<p>设置拖动源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.addElement(element);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.addElement</span>(<span class="hljs-selector-tag">element</span>);</code></pre>
<h3 id="articleHeader14">setData()</h3>
<p>为一个给定的类型设置数据并存储在<strong>items</strong>属性中。</p>
<h3 id="articleHeader15">getData()</h3>
<p>从<strong>items</strong>属性中获取给定类型的数据，无数据时返回空字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.getData(type);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.getData</span>(<span class="hljs-selector-tag">type</span>);</code></pre>
<h3 id="articleHeader16">clearData()</h3>
<p>从<strong>items</strong>属性中删除与给定类型关联的数据，若类型为空则删除所有数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.clearData(type);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.clearData</span>(<span class="hljs-selector-tag">type</span>);</code></pre>
<h3 id="articleHeader17">setDragImage()</h3>
<p>自定义一个期望的拖动时的图片，默认为被拖动的节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.setDragImage(imgElement, offsetX, offsetY);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.setDragImage</span>(<span class="hljs-selector-tag">imgElement</span>, <span class="hljs-selector-tag">offsetX</span>, <span class="hljs-selector-tag">offsetY</span>);
</code></pre>
<table>
<thead><tr>
<th>Param</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>imgElement</td>
<td>要用作拖动反馈图像元素。</td>
</tr>
<tr>
<td>offsetX</td>
<td>图像内的水平偏移量。</td>
</tr>
<tr>
<td>offsetY</td>
<td>图像内的垂直偏移量。</td>
</tr>
</tbody>
</table>
<p>设置拖动时的图片时，要把图片预加载，否则图片会在拖动开始<strong>dragstart</strong>事件触发时才会加载图片，会导致拖动图出不来或闪一下的后果。可把图片放到<code>&lt;img&gt;</code>标签并设置<code>display:none;</code>，原理详看我之前的文章<a href="https://segmentfault.com/a/1190000010032501">Web图片资源的加载与渲染时机</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010127538" src="https://static.alili.tech/img/remote/1460000010127538" alt="drag-imgage" title="drag-imgage" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">DataTransferItemList</h2>
<p><strong>dataTramsfer</strong>对象的<strong>items</strong>属性，包含了一系列<strong>DataTransferItem</strong>拖拽数据对象。</p>
<h3 id="articleHeader19">属性</h3>
<h3 id="articleHeader20">length</h3>
<p>数组长度。</p>
<h3 id="articleHeader21">方法</h3>
<h3 id="articleHeader22">add()</h3>
<p>增加一个拖拽数据对象到<strong>items</strong>属性中，并返回增加的拖拽数据对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.add(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.add</span>(<span class="hljs-selector-tag">file</span>);</code></pre>
<h3 id="articleHeader23">remove()</h3>
<p>从<strong>items</strong>属性中移除指定位置的一个拖拽数据对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.remove(index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.remove</span>(<span class="hljs-selector-tag">index</span>);</code></pre>
<h3 id="articleHeader24">clear()</h3>
<p>清空<strong>items</strong>属性中的所拖拽数据对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.clear();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.clear</span>();</code></pre>
<h2 id="articleHeader25">DataTransferItem</h2>
<p><strong>DataTransferItemList</strong>列表中的拖拽数据对象。</p>
<h3 id="articleHeader26">属性</h3>
<h3 id="articleHeader27">kind</h3>
<p>拖拽数据对象类型。</p>
<table>
<thead><tr>
<th>Value</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>file</td>
<td>文件类型。</td>
</tr>
<tr>
<td>string</td>
<td>文本字符串类型。</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader28">type</h3>
<p>MIME类型的Unicode字符串，例如<strong>text/plain</strong>、<strong>text/html</strong>或<strong>image/png</strong>。</p>
<h3 id="articleHeader29">方法</h3>
<h3 id="articleHeader30">getAsFile()</h3>
<p>若拖拽数据对象是文件类型，则返回一个文件对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let itemList = event.dataTransfer.items;
for (let i = 0, len = itemList.length; i < len; i++) {
    if (itemList[i].kind == &quot;file&quot;) {
        console.log(itemList[i].getAsFile());
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">itemList</span> = event.dataTransfer.items;
for (<span class="hljs-keyword">let</span> <span class="hljs-attr">i</span> = <span class="hljs-number">0</span>, <span class="hljs-attr">len</span> = itemList.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (itemList[i].<span class="hljs-attr">kind</span> == <span class="hljs-string">"file"</span>) {
        console.log(itemList[i].getAsFile());
    }
}</code></pre>
<h3 id="articleHeader31">getAsString()</h3>
<p>若拖拽数据对象是文本字符串类型，通过回调函数获取拖拽数据中的字符串数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let itemList = event.dataTransfer.items;
for (let i = 0, len = itemList.length; i < len; i++) {
    if (itemList[i].kind == &quot;string&quot;) {
        itemList[i].getAsString((data) => {
            console.log(data);
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">let</span> <span class="hljs-keyword">itemList </span>= event.dataTransfer.<span class="hljs-keyword">items;
</span><span class="hljs-symbol">for</span> (let i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">itemList.length; </span>i &lt; len<span class="hljs-comment">; i++) {</span>
    <span class="hljs-meta">if</span> (<span class="hljs-keyword">itemList[i].kind </span>== <span class="hljs-string">"string"</span>) {
        <span class="hljs-keyword">itemList[i].getAsString((data) </span>=&gt; {
            console.log(<span class="hljs-meta">data</span>)<span class="hljs-comment">;</span>
        })<span class="hljs-comment">;</span>
    }
}</code></pre>
<h2 id="articleHeader32">拖放对象的数据存储</h2>
<p>在进行拖放操作时，有可能需要把拖拽目标的数据传送给放置目标，此时一般操作是在<strong>dragstart</strong>事件触发时把需要的数据存储到一个变量，然后再<strong>drop</strong>事件触发时获取这个变量。但当<strong>dragstart</strong>事件和<strong>drop</strong>事件在不同的文件定义，又不想玷污全局变量的情况下，我们需要更好的办法来存储拖放数据。</p>
<p>在<strong>DataTransfer</strong>对象中的<strong>items</strong>属性就是用来存储拖放数据的，数据类型分为文本类型和文件类型。</p>
<h3 id="articleHeader33">存储文本字符串类型数据：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.setData(type, data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code style="word-break: break-word; white-space: initial;"><span class="hljs-title">event</span>.dataTransfer.setData(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-keyword">data</span>);</span></code></pre>
<p>OR</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.add(data, type);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.add</span>(<span class="hljs-selector-tag">data</span>, <span class="hljs-selector-tag">type</span>);</code></pre>
<blockquote><p>一种文本字符串类型只能存储一个数据，当重复文本字符串类型存储数据时，后者会覆盖前者。</p></blockquote>
<h3 id="articleHeader34">存储文件类型数据：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.add(file);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.add</span>(<span class="hljs-selector-tag">file</span>);</code></pre>
<h3 id="articleHeader35">获取所有文本字符串类型的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.types" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.types</span></code></pre>
<h3 id="articleHeader36">获取所有文件类型的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let files = event.dataTransfer.files;
for (let i = 0, len = files.length; i < len; i++) {
    console.log(files[i]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-keyword">let</span> files = event.dataTransfer.files;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span> = files.length; i &lt; <span class="hljs-built_in">len</span>; i++) {
    console.<span class="hljs-built_in">log</span>(files[i]);
}</code></pre>
<p>OR</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let itemList = event.dataTransfer.items;
for (let i = 0, len = itemList.length; i < len; i++) {
    if (itemList[i].kind == &quot;file&quot;) {
        console.log(itemList[i].getAsFile());
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code><span class="hljs-keyword">let</span> <span class="hljs-attr">itemList</span> = event.dataTransfer.items;
for (<span class="hljs-keyword">let</span> <span class="hljs-attr">i</span> = <span class="hljs-number">0</span>, <span class="hljs-attr">len</span> = itemList.length; i &lt; len; i++) {
    <span class="hljs-keyword">if</span> (itemList[i].<span class="hljs-attr">kind</span> == <span class="hljs-string">"file"</span>) {
        console.log(itemList[i].getAsFile());
    }
}</code></pre>
<h3 id="articleHeader37">获取所有文本字符串类型的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let itemList = event.dataTransfer.items;
for (let i = 0, len = itemList.length; i < len; i++) {
    if (itemList[i].kind == &quot;string&quot;) {
        itemList[i].getAsString((data) => {
            console.log(data);
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">let</span> <span class="hljs-keyword">itemList </span>= event.dataTransfer.<span class="hljs-keyword">items;
</span><span class="hljs-symbol">for</span> (let i = <span class="hljs-number">0</span>, len = <span class="hljs-keyword">itemList.length; </span>i &lt; len<span class="hljs-comment">; i++) {</span>
    <span class="hljs-meta">if</span> (<span class="hljs-keyword">itemList[i].kind </span>== <span class="hljs-string">"string"</span>) {
        <span class="hljs-keyword">itemList[i].getAsString((data) </span>=&gt; {
            console.log(<span class="hljs-meta">data</span>)<span class="hljs-comment">;</span>
        })<span class="hljs-comment">;</span>
    }
}</code></pre>
<h3 id="articleHeader38">获取指定文本字符串类型的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.getData(type);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.getData</span>(<span class="hljs-selector-tag">type</span>);</code></pre>
<h3 id="articleHeader39">删除指定文本字符串类型的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.clearData(type);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.clearData</span>(<span class="hljs-selector-tag">type</span>);</code></pre>
<h3 id="articleHeader40">删除指定位置的拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.remove(index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.remove</span>(<span class="hljs-selector-tag">index</span>);</code></pre>
<h3 id="articleHeader41">清空所有拖拽数据对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.clearData();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.clearData</span>();</code></pre>
<p>OR</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.dataTransfer.items.clear();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">event</span><span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.items</span><span class="hljs-selector-class">.clear</span>();</code></pre>
<h3 id="articleHeader42">栗子</h3>
<p>上面的几个栗子都使用了以上方法存储和获取拖拽数据对象，感兴趣的可以看看源码。</p>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles" target="_blank">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000010127530">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5拖放API Drag and Drop

## 原文链接
[https://segmentfault.com/a/1190000010127530](https://segmentfault.com/a/1190000010127530)


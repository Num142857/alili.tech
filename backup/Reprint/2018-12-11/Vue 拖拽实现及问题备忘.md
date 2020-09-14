---
title: 'Vue 拖拽实现及问题备忘' 
date: 2018-12-11 2:30:10
hidden: true
slug: ngf3q0d5tsc
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>以下备忘拖拽的简单实现和其中存在的问题，以此为基石可以扩展开发多种拖拽效果。</blockquote>
<h2 id="articleHeader0">1. 拖拽样式</h2>
<p>如下图，我们想实现的效果为：</p>
<p>当方块从上方灰块被拖拽到下方时，下方灰块中会出现该方块。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606986?w=3356&amp;h=708" src="https://static.alili.tech/img/remote/1460000013606986?w=3356&amp;h=708" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606987?w=3352&amp;h=706" src="https://static.alili.tech/img/remote/1460000013606987?w=3352&amp;h=706" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>让我们先把以上页面效果实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
    .drag-field,
    .drop-field{
        height: 10rem;
        box-sizing: border-box;
        padding: 1rem;
        background-color: #eee;
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .item{
        width: 30%;
        height: 3rem;
        text-align: center;
        line-height: 3rem;
        font-size: .9rem;
        background-color: royalblue;
        color: #eee;
    }
    .item:hover{
        cursor: pointer;
    }
</style>

<template>
    <div class=&quot;hello&quot;>
        <div class=&quot;drag-field&quot;>
            <div class=&quot;item&quot;
                 v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;
            >
                "{{" item.label "}}"
            </div>
        </div>
        <div class=&quot;drop-field&quot;>
            <div class=&quot;item&quot; v-if=&quot;droppedItem !== ''&quot;>
                "{{" droppedItem "}}"
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: '',
        data () {
            return {
                droppedItem: '',
                items: [
                    {
                        id: 1,
                        label: '模块一'
                    },
                    {
                        id: 2,
                        label: '模块二'
                    },
                    {
                        id: 3,
                        label: '模块三'
                    }
                ]
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.drag-field</span>,
    <span class="hljs-selector-class">.drop-field</span>{
        <span class="hljs-attribute">height</span>: <span class="hljs-number">10rem</span>;
        <span class="hljs-attribute">box-sizing</span>: border-box;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1rem</span>;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">justify-content</span>: space-around;
        <span class="hljs-attribute">align-items</span>: center;
    }

    <span class="hljs-selector-class">.item</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">3rem</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">3rem</span>;
        <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">9rem</span>;
        <span class="hljs-attribute">background-color</span>: royalblue;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#eee</span>;
    }
    <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:hover</span>{
        <span class="hljs-attribute">cursor</span>: pointer;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drag-field"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>
                 <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in items"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>
            &gt;</span>
                </span><span class="hljs-template-variable">"{{" item.label "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"drop-field"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"droppedItem !== ''"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" droppedItem "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>,
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">droppedItem</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">items</span>: [
                    {
                        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
                        <span class="hljs-attr">label</span>: <span class="hljs-string">'模块一'</span>
                    },
                    {
                        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
                        <span class="hljs-attr">label</span>: <span class="hljs-string">'模块二'</span>
                    },
                    {
                        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
                        <span class="hljs-attr">label</span>: <span class="hljs-string">'模块三'</span>
                    }
                ]
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader1">2. 拖拽相关事件</h2>
<p>为了让 DOM 元素可以拖拽，我们需要为元素增加 draggable="true"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;item&quot;
     draggable=&quot;true&quot;
     v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;
>
    "{{" item.label "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"item"</span>
     draggable=<span class="hljs-string">"true"</span>
     v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in items"</span> :key=<span class="hljs-string">"index"</span>
&gt;
    "{{" <span class="hljs-built_in">item</span>.label "}}"
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h3 id="articleHeader2">2.1 拖拽事件介绍</h3>
<ul>
<li>@dragstart：拖拽开始事件，可绑定于被拖拽元素上；</li>
<li>@dragend：拖拽结束事件，可绑定于被拖拽元素上；</li>
<li>@dragover：拖拽持续移动事件，建议绑定于可拖放区域（下方灰色块）；</li>
<li>@dragenter：进入拖放区域，建议绑定于可拖放区域（下方灰色块），该事件仅在进入拖放区域时触发，在其内部移动时不触发，离开某一可拖放区域后再进入时会再次触发；</li>
</ul>
<h3 id="articleHeader3">2.2 ondrop</h3>
<p>拖放事件，绑定于可拖放区域上。</p>
<p>之所以把这个方法单独拎出来，是因为在使用该方法时存在一些注意事项。</p>
<p>当我们这样使用时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drop-field&quot;
     @drop=&quot;drop&quot;
>
    ...
</div>


methods: {
    drop (event) {
        console.log('drop', event)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"drop-field"</span>
     @drop=<span class="hljs-string">"drop"</span>
&gt;
    ...
&lt;/div&gt;


methods: {
    drop (<span class="hljs-keyword">event</span>) {
        console.log(<span class="hljs-string">'drop'</span>, <span class="hljs-keyword">event</span>)
    }
}</code></pre>
<p>发现当我们将可拖拽元素拖放至此时，并没有触发事件。</p>
<p>根据 MDN 的文档：</p>
<blockquote>A listener for the dragenter and dragover events are used to indicate valid drop targets, that is, places where dragged items may be dropped. Most areas of a web page or application are not valid places to drop data. Thus, the default handling for these events is to not allow a drop.", hence the only way for the drop event to be fired is to first cancel the dragenter or dragover event.</blockquote>
<p>我们必须阻止某一 DOM 元素对 dragover 的默认行为，才能使 drop 事件在其上正确执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drop-field&quot;
     @drop=&quot;drop&quot;
     @dragover=&quot;dragover&quot;
>
    ...
</div>

methods: {
    drop (event) {
        console.log('drop', event)
    },
    dragover (event) {
        event.preventDefault()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"drop-field"</span>
     @drop=<span class="hljs-string">"drop"</span>
     @dragover=<span class="hljs-string">"dragover"</span>
&gt;
    ...
&lt;/div&gt;

methods: {
    drop (<span class="hljs-keyword">event</span>) {
        console.log(<span class="hljs-string">'drop'</span>, <span class="hljs-keyword">event</span>)
    },
    dragover (<span class="hljs-keyword">event</span>) {
        <span class="hljs-keyword">event</span>.preventDefault()
    }
}</code></pre>
<p>在 Vue 中，我们可以将组织默认行为的过程简写如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@dragover=&quot;dragover&quot;

# 改为：

@dragover.prevent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@dragover</span>=<span class="hljs-string">"dragover"</span>

# 改为：

<span class="hljs-variable">@dragover</span>.prevent</code></pre>
<h3 id="articleHeader4">2.3 DragEvent</h3>
<p>注意，无论是 dragxxx 或 drop 事件，其传递的参数都是 DragEvent。</p>
<p>让我很费解的是，对于在拖放区绑定的 drop 事件而言，其 DragEvent 中竟然无法找到被拖拽元素。</p>
<p>这也就意味着，不借助额外变量，drop 事件是无法知道被拖放者是什么的。</p>
<p>但我们仍可以借助 DragEvent 中的 DataTransfer 来进行被拖放对象的消息传递。</p>
<p>流程如下：</p>
<h4>2.3.1 在被拖拽对象的 dropstart 事件中传递消息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;item&quot;
     draggable=&quot;true&quot;
     @dragstart=&quot;dragstart&quot;
     v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;
>
    "{{" item.label "}}"
</div>


dragstart (event) {
    console.log('dragstart', event)
    event.dataTransfer.setData('my-info', 'hello')
    event.dataTransfer.setData('my-extra-info', 'world')
}     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"item"</span>
     draggable=<span class="hljs-string">"true"</span>
     @dragstart=<span class="hljs-string">"dragstart"</span>
     v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in items"</span> :key=<span class="hljs-string">"index"</span>
&gt;
    "{{" item<span class="hljs-selector-class">.label</span> "}}"
&lt;/div&gt;


dragstart (event) {
    console.log(<span class="hljs-string">'dragstart'</span>, event)
    event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.setData</span>(<span class="hljs-string">'my-info'</span>, <span class="hljs-string">'hello'</span>)
    event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.setData</span>(<span class="hljs-string">'my-extra-info'</span>, <span class="hljs-string">'world'</span>)
}     </code></pre>
<h4>2.3.2 在拖放区的 drop 事件中获取消息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;drop-field&quot;
     @drop=&quot;drop&quot;
     @dragover.prevent
>
    <div class=&quot;item&quot;
         v-if=&quot;droppedItem !== ''&quot;>
        "{{" droppedItem "}}"
    </div>
</div>

drop (event) {
    console.log('drop', event)
    console.log(event.dataTransfer.getData('my-info'))
    console.log(event.dataTransfer.getData('my-extra-info'))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"drop-field"</span>
     @drop=<span class="hljs-string">"drop"</span>
     @dragover<span class="hljs-selector-class">.prevent</span>
&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"item"</span>
         v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"droppedItem !== ''"</span>&gt;
        "{{" droppedItem "}}"
    &lt;/div&gt;
&lt;/div&gt;

drop (event) {
    console.log(<span class="hljs-string">'drop'</span>, event)
    console.log(event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.getData</span>(<span class="hljs-string">'my-info'</span>))
    console.log(event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.getData</span>(<span class="hljs-string">'my-extra-info'</span>))
}</code></pre>
<h4>2.3.3 在被拖拽对象的 dragend 事件中清除消息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;item&quot;
     draggable=&quot;true&quot;
     @dragstart=&quot;dragstart&quot;
     @dragend=&quot;dragend&quot;
     v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;
>
    "{{" item.label "}}"
</div>

dragend (event) {
    console.log('dragend', event);
    event.dataTransfer.clearData()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>
     draggable=<span class="hljs-string">"true"</span>
     @dragstart=<span class="hljs-string">"dragstart"</span>
     @dragend=<span class="hljs-string">"dragend"</span>
     v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in items"</span> :key=<span class="hljs-string">"index"</span>
&gt;
    "{{" item.label "}}"
&lt;/div&gt;

dragend (<span class="hljs-keyword">event</span>) {
    console.log(<span class="hljs-string">'dragend'</span>, <span class="hljs-keyword">event</span>);
    <span class="hljs-keyword">event</span>.dataTransfer.clearData()
}</code></pre>
<h4>2.3.4 注意事项一：不能在被拖拽对象的 dragend 事件中传递消息</h4>
<p>在整个拖拽过程中，事件的先后顺序为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Step1: 拖拽对象的 dropstart；
Step2: 拖放区的 drop；
Step3：拖拽对象的 dropend；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>Step1: 拖拽对象的 dropstart；
Step2: 拖放区的 drop；
Step3：拖拽对象的 dropend；</code></pre>
<p>因而，如果在 dragend 中传递消息，是不能被 drop 捕获的。</p>
<h4>2.3.5 注意事项二：不能在被拖拽对象的 dragover 事件中传递消息</h4>
<p>如果我们在被拖拽对象的 dragover 事件中传递消息，由于 dragover 事件的作用对象是「可拖放区」，即此时，该 dragover 中的 DragEvent 是以「可拖放区」身份施加的，故而不会传递到 drop 中。</p>
<h4>2.3.6 注意事项三：消息只能是 String 类型</h4>
<p><code>dataTransfer</code> 中设置的消息（ 即 <code>setData</code> 的第二个参数 ）只能是字符串类型。如果想要传递对象，需要先进行序列化。</p>
<h4>2.3.7 注意事项四：Vue 中事件参数</h4>
<p>在上面的代码中，如果我们在 <code>@dragstart</code> 中想传递一些参数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@dragstart=&quot;dragstart(item)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">dragstart</span>="<span class="hljs-keyword">dragstart</span>(<span class="hljs-keyword">item</span>)"</code></pre>
<p>就会遇到一个问题：默认传递的 DragEvent 参数丢失了。</p>
<p>此时，我们需要使用 Vue 的特殊变量来实现事件参数的传递：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@dragstart=&quot;dragstart($event, item)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">dragstart</span>="<span class="hljs-keyword">dragstart</span>($<span class="hljs-keyword">event</span>, item)<span class="hljs-string">"</span></code></pre>
<h2 id="articleHeader5">3. 拖拽实现</h2>
<p>结合以上内容，我们的实现思路如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013606988?w=628&amp;h=736" src="https://static.alili.tech/img/remote/1460000013606988?w=628&amp;h=736" alt="" title="" style="cursor: pointer;"></span></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;item&quot;
     draggable=&quot;true&quot;
     @dragstart=&quot;dragstart($event, item)&quot;
     @dragend=&quot;dragend&quot;
     v-for=&quot;(item, index) in items&quot; :key=&quot;index&quot;
>
    "{{" item.label "}}"
</div>

<div class=&quot;drop-field&quot;
     @drop=&quot;drop&quot;
     @dragover.prevent
>
    <div class=&quot;item&quot;
         v-if=&quot;droppedItem !== ''&quot;>
        "{{" droppedItem "}}"
    </div>
</div>


methods: {
    drop (event) {
        this.droppedItem = event.dataTransfer.getData('item')
    },
    dragstart (event, item) {
        event.dataTransfer.setData('item', item.label)
    },
    dragend (event) {
        event.dataTransfer.clearData()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"item"</span>
     draggable=<span class="hljs-string">"true"</span>
     @dragstart=<span class="hljs-string">"dragstart($event, item)"</span>
     @dragend=<span class="hljs-string">"dragend"</span>
     v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in items"</span> :key=<span class="hljs-string">"index"</span>
&gt;
    "{{" item<span class="hljs-selector-class">.label</span> "}}"
&lt;/div&gt;

&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"drop-field"</span>
     @drop=<span class="hljs-string">"drop"</span>
     @dragover<span class="hljs-selector-class">.prevent</span>
&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"item"</span>
         v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"droppedItem !== ''"</span>&gt;
        "{{" droppedItem "}}"
    &lt;/div&gt;
&lt;/div&gt;


methods: {
    drop (event) {
        this<span class="hljs-selector-class">.droppedItem</span> = event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.getData</span>(<span class="hljs-string">'item'</span>)
    },
    dragstart (event, item) {
        event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.setData</span>(<span class="hljs-string">'item'</span>, item.label)
    },
    dragend (event) {
        event<span class="hljs-selector-class">.dataTransfer</span><span class="hljs-selector-class">.clearData</span>()
    }
}</code></pre>
<p>在 Vue 项目中，被拖拽对象和可拖放区域可能放在不同组件之中，此时，关键数据的传递最好借助 Vuex 等数据总线实现。让数据而非 DOM 流转是 Vue 项目的基本思路。</p>
<h2 id="articleHeader6">参考链接</h2>
<ol>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/AI/DataTransfer#addElement.28.29" rel="nofollow noreferrer" target="_blank">DataTransfer - Web API 接口 | MDN</a></li>
<li><a href="http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/" rel="nofollow noreferrer" target="_blank">HTML5 drag &amp; drop 拖拽与拖放简介 « 张鑫旭-鑫空间-鑫生活</a></li>
<li><a href="https://segmentfault.com/q/1010000008783546/a-1020000008784289">Vue.js里面点击事件传递了参数还能使用事件参数吗？如何使用？ - radical的回答 - SegmentFault 思否</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/setData" rel="nofollow noreferrer" target="_blank">DataTransfer.setData() - Web API 接口 | MDN</a></li>
<li><a href="https://forum-archive.vuejs.org/topic/659/html5-drag-and-drop-events-with-vue/10" rel="nofollow noreferrer" target="_blank">HTML5 Drag and Drop events with Vue | Vue.js Discussion</a></li>
<li><a href="https://www.w3schools.com/jsreF/event_ondrop.asp" rel="nofollow noreferrer" target="_blank">ondrop Event</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 拖拽实现及问题备忘

## 原文链接
[https://segmentfault.com/a/1190000013606983](https://segmentfault.com/a/1190000013606983)


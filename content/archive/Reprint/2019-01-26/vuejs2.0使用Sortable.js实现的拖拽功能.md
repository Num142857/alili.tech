---
title: 'vuejs2.0使用Sortable.js实现的拖拽功能' 
date: 2019-01-26 2:30:18
hidden: true
slug: gmzd0m7wc7g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p>在使用vue1.x之前的版本的时候，页面中的拖拽功能，我在项目中是直接用的jquery ui中的sortable.js，只是在拖拽完成后，在update的回调函数中又重新排序了存放数据的数组。但是当把vue升级到2.0以上后发现拖拽功能失效了，于是使用了下面代码。</p>
<p>该案例主要是在用于vuejs2.0中实现的拖拽功能，用到的的js有Sortable.js，vuedraggable.js，当然还有vue.min.js，提供的案例使用的require.js加载。</p>
<h2 id="articleHeader1">实现效果</h2>
<p>实现后的效果如图所示：<br><span class="img-wrap"><img data-src="/img/bVJBAH?w=1073&amp;h=253" src="https://static.alili.tech/img/bVJBAH?w=1073&amp;h=253" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其中鼠标放到红色的id1,id2,id3,id4可以进行拖动。</p>
<h2 id="articleHeader2">html主要代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<draggable :list=&quot;list2&quot; :move=&quot;getdata&quot; @update=&quot;datadragEnd&quot; :options=&quot;{animation: 300,handle:'.dargDiv'}&quot;>
        <transition-group name=&quot;list-complete&quot; >
            <div v-for=&quot;element in list2&quot; :key=&quot;element.it.name&quot;  class=&quot;list-complete-item&quot;>
                <div class=&quot;styleclass dargDiv&quot;>"{{"element.id"}}"</div>
                <div class=&quot;styleclass&quot;>"{{"element.it.name"}}"</div>

            </div>
        </transition-group>
    </draggable>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;draggable :<span class="hljs-built_in">list</span>=<span class="hljs-string">"list2"</span> :move=<span class="hljs-string">"getdata"</span> @update=<span class="hljs-string">"datadragEnd"</span> :options=<span class="hljs-string">"{animation: 300,handle:'.dargDiv'}"</span>&gt;
        &lt;transition-group <span class="hljs-built_in">name</span>=<span class="hljs-string">"list-complete"</span> &gt;
            &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"element in list2"</span> :key=<span class="hljs-string">"element.it.name"</span>  <span class="hljs-built_in">class</span>=<span class="hljs-string">"list-complete-item"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"styleclass dargDiv"</span>&gt;"{{"element.<span class="hljs-built_in">id</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"styleclass"</span>&gt;"{{"element.<span class="hljs-keyword">it</span>.<span class="hljs-built_in">name</span>"}}"&lt;/<span class="hljs-keyword">div</span>&gt;

            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/transition-group&gt;
    &lt;/draggable&gt;
    </code></pre>
<h2 id="articleHeader3">css代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    font-family:'微软雅黑'
}
[v-cloak]{
    display:none;
}
#example{
    width:1000px;
    margin:0 auto;
}
.list-complete-item {
  transition: all 1s;
    height:50px;
    line-height: 50px;
    background: #000;
    color:#fff;
    text-align: center;
    font-size:24px;
    margin-top:10px;
}
.styleclass{
    width:100px;
    float:left;
}
.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
  height: 0px;
  margin-top: 0px;
  padding: 0px;
  border: solid 0px;
}
.list-complete-sortable-chosen,.list-complete-sortable-ghost{
 opacity: 0;
  height: 0px;
  margin-top: 0px;
  padding: 0px;
  border: solid 0px;
}
.dargDiv{
    cursor:move;
    background:red;
}
.wrods{
    margin-top:50px;
}
p{
    line-height:24px;
    text-align:center;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">font-family</span>:<span class="hljs-string">'微软雅黑'</span>
}
<span class="hljs-selector-attr">[v-cloak]</span>{
    <span class="hljs-attribute">display</span>:none;
}
<span class="hljs-selector-id">#example</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">1000px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.list-complete-item</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">24px</span>;
    <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.styleclass</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">float</span>:left;
}
<span class="hljs-selector-class">.list-complete-enter</span>, <span class="hljs-selector-class">.list-complete-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.list-complete-sortable-chosen</span>,<span class="hljs-selector-class">.list-complete-sortable-ghost</span>{
 <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-class">.dargDiv</span>{
    <span class="hljs-attribute">cursor</span>:move;
    <span class="hljs-attribute">background</span>:red;
}
<span class="hljs-selector-class">.wrods</span>{
    <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">50px</span>;
}
<span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">24px</span>;
    <span class="hljs-attribute">text-align</span>:center;
}
</code></pre>
<h2 id="articleHeader4">js代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(['vue','vuedraggable'],function(Vue,draggable){
    Vue.component('draggable', draggable);
     new Vue({
        el: '#example',
        data: {
           list2:[
           {id:&quot;id1&quot;,it:{name:'bbbb'"}}",
           {id:&quot;id2&quot;,it:{name:'2222'"}}",
           {id:&quot;id3&quot;,it:{name:'3333'"}}",
           {id:&quot;id4&quot;,it:{name:'4444'"}}"
           ]
        },
        methods:{
            getdata: function(evt){
                console.log(evt.draggedContext.element.id);
            },
            datadragEnd:function(evt){
                console.log('拖动前的索引：'+evt.oldIndex);
                console.log('拖动后的索引：'+evt.newIndex);

            }

        }
    })

})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">require</span>([<span class="hljs-string">'vue'</span>,<span class="hljs-string">'vuedraggable'</span>],function(Vue,draggable){
    <span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'draggable'</span>, draggable);
     <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
        <span class="hljs-attribute">el</span>: <span class="hljs-string">'#example'</span>,
        <span class="hljs-attribute">data</span>: {
           <span class="hljs-attribute">list2</span>:[
           {<span class="hljs-attribute">id</span>:<span class="hljs-string">"id1"</span>,<span class="hljs-attribute">it</span>:{<span class="hljs-attribute">name</span>:<span class="hljs-string">'bbbb'</span>"}}",
           {<span class="hljs-attribute">id</span>:<span class="hljs-string">"id2"</span>,<span class="hljs-attribute">it</span>:{<span class="hljs-attribute">name</span>:<span class="hljs-string">'2222'</span>"}}",
           {<span class="hljs-attribute">id</span>:<span class="hljs-string">"id3"</span>,<span class="hljs-attribute">it</span>:{<span class="hljs-attribute">name</span>:<span class="hljs-string">'3333'</span>"}}",
           {<span class="hljs-attribute">id</span>:<span class="hljs-string">"id4"</span>,<span class="hljs-attribute">it</span>:{<span class="hljs-attribute">name</span>:<span class="hljs-string">'4444'</span>"}}"
           ]
        },
        <span class="hljs-attribute">methods</span>:{
            <span class="hljs-attribute">getdata</span>: function(evt){
                console.log(evt.draggedContext.element.id);
            },
            <span class="hljs-attribute">datadragEnd</span>:function(evt){
                <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'拖动前的索引：'</span>+evt.oldIndex);
                <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">'拖动后的索引：'</span>+evt.newIndex);

            }

        }
    })

})
</code></pre>
<p>里面的可配置的很多细节请参考参考地址，这里不做详细介绍。<br>页面展示地址：<a href="https://hxlmqtily1314.github.io/Vue.Draggable-case/" rel="nofollow noreferrer" target="_blank">https://hxlmqtily1314.github....</a><br>github地址：<a href="https://github.com/hxlmqtily1314/Vue.Draggable-case" rel="nofollow noreferrer" target="_blank">https://github.com/hxlmqtily1...</a>  <br>参考地址:<a href="https://github.com/SortableJS/Vue.Draggable" rel="nofollow noreferrer" target="_blank">https://github.com/SortableJS...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2.0使用Sortable.js实现的拖拽功能

## 原文链接
[https://segmentfault.com/a/1190000008419229](https://segmentfault.com/a/1190000008419229)


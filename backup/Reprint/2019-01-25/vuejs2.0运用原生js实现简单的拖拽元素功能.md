---
title: 'vuejs2.0运用原生js实现简单的拖拽元素功能' 
date: 2019-01-25 2:30:24
hidden: true
slug: wd1i4kdw4jq
categories: [reprint]
---

{{< raw >}}

                    <div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no&quot;/>
<meta charset=&quot;utf-8&quot;>
<title></title>
<meta name=&quot;keywords&quot; content=&quot;&quot; />
<meta name=&quot;description&quot; content=&quot;&quot; />

<style>
.select-item {
  background-color: #5bc0de;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor:pointer;
  padding: 6px 20px;
  color: #fff;
}
 .cursored{
  cursor: default;
}
.project-content,.people-content {
    margin: 30px 50px;
}
.people-content {
    margin-top: 30px;
}
.drag-div {
    border: 1px solid #5bc0de;
    padding:10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
}
.select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
}
.drag-people-label{
  margin-bottom:0;
  padding-right:10px;
}
[v-cloak]{
    display:none;
}
</style>
</head>
<body>

<div class='drag-content' id=&quot;dragCon&quot; >
  <div class='project-content'>
    <div class='select-item' draggable='true' @dragstart='drag($event)' v-for=&quot;pjdt in projectdatas&quot;>"{{"pjdt.name"}}"</div>
  </div>
  <div class='people-content'>
    <div class='drag-div' v-for=&quot;ppdt in peopledata&quot; @drop='drop($event)' @dragover='allowDrop($event)'>
      <div class='select-project-item'>
        <label class='drag-people-label'>"{{"ppdt.name"}}":</label>
      </div>
    </div>
  </div>
</div>
<script type=&quot;text/javascript&quot; src=&quot;js/vue.min2.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    var dom;
    var ss = new Vue({
        'el':'#dragCon',
        data:{
            projectdatas:[{
                id:1,
                name:'葡萄'
              },{
                id:2,
                name:'芒果'
              },{
                id:3,
                name:'木瓜'
              },{
                id:4,
                name:'榴莲'
              }],


               peopledata:[{
                id:1,
                name:'小颖'
              },{
                id:2,
                name:'hover'
              },{
                id:3,
                name:'空巢青年三 '
              },{
                id:3,
                name:'一丢丢'
              }]

        },
        mounted:function(){
            this.$nextTick(function(){
                
            })
        },
          watch:{
            projectdatas:{
                handler:function(val,oldval){

                },
                deep:true
            },
            peopledata:{
                handler:function(val,oldval){

                },
                deep:true
            }
        },

        methods: {
            drag:function(event){
               dom = event.currentTarget
            },
            drop:function(event){
              event.preventDefault();
              event.target.appendChild(dom);
            },
            allowDrop:function(event){
              event.preventDefault();
            }
          }

    });


</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.select-item</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#5bc0de</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">cursor</span>:pointer;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
 <span class="hljs-selector-class">.cursored</span>{
  <span class="hljs-attribute">cursor</span>: default;
}
<span class="hljs-selector-class">.project-content</span>,<span class="hljs-selector-class">.people-content</span> {
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> <span class="hljs-number">50px</span>;
}
<span class="hljs-selector-class">.people-content</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.drag-div</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#5bc0de</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.select-project-item</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
}
<span class="hljs-selector-class">.drag-people-label</span>{
  <span class="hljs-attribute">margin-bottom</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding-right</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-attr">[v-cloak]</span>{
    <span class="hljs-attribute">display</span>:none;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'drag-content'</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dragCon"</span> &gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'project-content'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'select-item'</span> <span class="hljs-attr">draggable</span>=<span class="hljs-string">'true'</span> @<span class="hljs-attr">dragstart</span>=<span class="hljs-string">'drag($event)'</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pjdt in projectdatas"</span>&gt;</span></span><span class="hljs-template-variable">"{{"pjdt.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'people-content'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'drag-div'</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"ppdt in peopledata"</span> @<span class="hljs-attr">drop</span>=<span class="hljs-string">'drop($event)'</span> @<span class="hljs-attr">dragover</span>=<span class="hljs-string">'allowDrop($event)'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'select-project-item'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'drag-people-label'</span>&gt;</span></span><span class="hljs-template-variable">"{{"ppdt.name"}}"</span><span class="xml">:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.min2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> dom;
    <span class="hljs-keyword">var</span> ss = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-string">'el'</span>:<span class="hljs-string">'#dragCon'</span>,
        data:{
            projectdatas:[{
                id:<span class="hljs-number">1</span>,
                name:<span class="hljs-string">'葡萄'</span>
              },{
                id:<span class="hljs-number">2</span>,
                name:<span class="hljs-string">'芒果'</span>
              },{
                id:<span class="hljs-number">3</span>,
                name:<span class="hljs-string">'木瓜'</span>
              },{
                id:<span class="hljs-number">4</span>,
                name:<span class="hljs-string">'榴莲'</span>
              }],


               peopledata:[{
                id:<span class="hljs-number">1</span>,
                name:<span class="hljs-string">'小颖'</span>
              },{
                id:<span class="hljs-number">2</span>,
                name:<span class="hljs-string">'hover'</span>
              },{
                id:<span class="hljs-number">3</span>,
                name:<span class="hljs-string">'空巢青年三 '</span>
              },{
                id:<span class="hljs-number">3</span>,
                name:<span class="hljs-string">'一丢丢'</span>
              }]

        },
        mounted:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                
            })
        },
          watch:{
            projectdatas:{
                handler:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val,oldval)</span></span>{

                },
                deep:<span class="hljs-literal">true</span>
            },
            peopledata:{
                handler:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val,oldval)</span></span>{

                },
                deep:<span class="hljs-literal">true</span>
            }
        },

        methods: {
            drag:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
               dom = event.currentTarget
            },
            drop:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
              event.preventDefault();
              event.target.appendChild(dom);
            },
            allowDrop:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
              event.preventDefault();
            }
          }

    });


</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2.0运用原生js实现简单的拖拽元素功能

## 原文链接
[https://segmentfault.com/a/1190000008494035](https://segmentfault.com/a/1190000008494035)


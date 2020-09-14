---
title: 'Vue案例之拖拽' 
date: 2019-01-16 2:30:08
hidden: true
slug: ob0grtan2lc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue拖拽</h2>
<p><span class="img-wrap"><img data-src="/img/bVMunR?w=294&amp;h=232" src="https://static.alili.tech/img/bVMunR?w=294&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>                                                       HTML
    位置
    <br>x:"{{"val.x"}}" <br>y:"{{"val.y"}}"
    <div v-drag=&quot;greet&quot; id=&quot;drag&quot; :style=&quot;style&quot;>
    //注意这里要通过指令绑定函数将当前元素的位置数据传出来
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>                                                       HTML
    位置
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>x:</span><span class="hljs-template-variable">"{{"val.x"}}"</span><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>y:</span><span class="hljs-template-variable">"{{"val.y"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-drag</span>=<span class="hljs-string">"greet"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"drag"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"style"</span>&gt;</span>
    //注意这里要通过指令绑定函数将当前元素的位置数据传出来
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('drag',//自定义指令                                      JS
        {bind:function (el, binding) {
                let oDiv = el;   //当前元素
                let self = this;  //上下文
                oDiv.onmousedown = function (e) {
                 //鼠标按下，计算当前元素距离可视区的距离
                    let disX = e.clientX - oDiv.offsetLeft;
                    let disY = e.clientY - oDiv.offsetTop;

                    document.onmousemove = function (e) {
                      //通过事件委托，计算移动的距离 
                        let l = e.clientX - disX;
                        let t = e.clientY - disY;
                      //移动当前元素  
                        oDiv.style.left = l + 'px';
                        oDiv.style.top = t + 'px';
                         //将此时的位置传出去
                        binding.value({x:e.pageX,y:e.pageY})
                    };
                    document.onmouseup = function (e) {
                    
                        document.onmousemove = null;
                        document.onmouseup = null;
                     };
                };
            }
        }
    );
    window.onload = function () {
        let vm = new Vue({
            el: '#box',
            data: {
                val: '123',
                style: {
                    width: '100px',
                    height: '100px',
                    background: 'aqua',
                    position: 'absolute',
                    right: '30px',
                    top: 0
                }
            },
            methods:{
            //接受传来的位置数据，并将数据绑定给data下的val
                greet(val){
                    vm.val = val;
                }
            } ,
      });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Vue.directive(<span class="hljs-string">'drag'</span>,<span class="hljs-comment">//自定义指令                                      JS</span>
        {<span class="hljs-attr">bind</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding</span>) </span>{
                <span class="hljs-keyword">let</span> oDiv = el;   <span class="hljs-comment">//当前元素</span>
                <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">//上下文</span>
                oDiv.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                 <span class="hljs-comment">//鼠标按下，计算当前元素距离可视区的距离</span>
                    <span class="hljs-keyword">let</span> disX = e.clientX - oDiv.offsetLeft;
                    <span class="hljs-keyword">let</span> disY = e.clientY - oDiv.offsetTop;

                    <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                      <span class="hljs-comment">//通过事件委托，计算移动的距离 </span>
                        <span class="hljs-keyword">let</span> l = e.clientX - disX;
                        <span class="hljs-keyword">let</span> t = e.clientY - disY;
                      <span class="hljs-comment">//移动当前元素  </span>
                        oDiv.style.left = l + <span class="hljs-string">'px'</span>;
                        oDiv.style.top = t + <span class="hljs-string">'px'</span>;
                         <span class="hljs-comment">//将此时的位置传出去</span>
                        binding.value({<span class="hljs-attr">x</span>:e.pageX,<span class="hljs-attr">y</span>:e.pageY})
                    };
                    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                    
                        <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                        <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
                     };
                };
            }
        }
    );
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#box'</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">val</span>: <span class="hljs-string">'123'</span>,
                <span class="hljs-attr">style</span>: {
                    <span class="hljs-attr">width</span>: <span class="hljs-string">'100px'</span>,
                    <span class="hljs-attr">height</span>: <span class="hljs-string">'100px'</span>,
                    <span class="hljs-attr">background</span>: <span class="hljs-string">'aqua'</span>,
                    <span class="hljs-attr">position</span>: <span class="hljs-string">'absolute'</span>,
                    <span class="hljs-attr">right</span>: <span class="hljs-string">'30px'</span>,
                    <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>
                }
            },
            <span class="hljs-attr">methods</span>:{
            <span class="hljs-comment">//接受传来的位置数据，并将数据绑定给data下的val</span>
                greet(val){
                    vm.val = val;
                }
            } ,
      });
    }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue案例之拖拽

## 原文链接
[https://segmentfault.com/a/1190000009134142](https://segmentfault.com/a/1190000009134142)


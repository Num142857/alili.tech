---
title: '温故js系列（10）-事件event' 
date: 2019-02-05 2:30:09
hidden: true
slug: s3vuoizivaa
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/11" rel="nofollow noreferrer" target="_blank">Event</a></p>
<h2 id="articleHeader0">JavaScript-事件event</h2>
<p>JavaScript中，事件一般是指浏览器和用户操作进行交互。我们可以通过侦听器（或者处理程序）来预定事件，以便事件发生的时候执行相应的代码。</p>
<h3 id="articleHeader1">事件模型</h3>
<p>JavaScript的事件模型有DOM0，脚本模型，DOM2&amp;DOM3三个模型。</p>
<h4>DOM0模型</h4>
<p>DOM0模型即内联模型，这种模型是最传统接单的一种处理事件的方法。在内联模型中，事件处理函数是HTML标签的一个属性，用于处理指定事件。虽然内联在早期使用较多，但它是和HTML 混写的，并没有与HTML 分离。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;click me &quot; onclick=&quot;console.log('xzavier win');&quot; />
//点击在打印台输出 xzavier win 

<input type=&quot;button&quot; value=&quot;click me &quot; onclick=&quot;func();&quot; />
<script type=&quot;text/javascript&quot;>
function func(){
  console.log('xzavier win win');
}
//点击在打印台输出 xzavier win win" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"click me "</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"console.log('xzavier win');"</span> /&gt;</span>
//点击在打印台输出 xzavier win 

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"click me "</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"func();"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier win win'</span>);
}
<span class="hljs-comment">//点击在打印台输出 xzavier win win</span></span></code></pre>
<p>其实世上本来没有DOM0，叫的人多了,也就有了DOM0。1998 年 10 月 DOM1级规范成为 W3C 的推荐标准，在此之前的实现我们就习惯称为DOM0级，后来就都叫DOM0了。</p>
<h4>脚本模型</h4>
<p>内联模型违反了HTML 与JavaScript 代码层次分离的原则。脚本模型让我们可以在JavaScript 中处理事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
var oBotton = document.getElementById('myBotton');
oBotton.onclick = function () {
  console.log('xzavier win win');
};  //点击在打印台输出 xzavier win win" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input type=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
<span class="hljs-keyword">var</span> oBotton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBotton'</span>);
oBotton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier win win'</span>);
};  <span class="hljs-comment">//点击在打印台输出 xzavier win win</span></code></pre>
<h4>DOM2&amp;DOM3模型</h4>
<p>DOM2和DOM3级别则在这个结构的基础上引入了更多的交互能力，也支持了更高级的XML特性。为此DOM2和DOM3级分为许多模块（模块之间具有某种关联），分别描述了DOM的某个非常具体的子集。</p>
<p>1、DOM2级核心（DOM Level 2 Core）：在1级核心的基础上构建，为节点添加了更多方法和属性；<br>2、DOM2级视图（DOM Level 2 Views）：为文档定义了基于样式信息的不同视图；<br>3、DOM2级事件（DOM Level 2 Style）：定义了如何以编程方式来访问和改变CSS样式信息；<br>4、DOM2级遍历和范围（DOM Level 2 Traversal and Range）：引入了遍历DOM文档和选择其特定部分的新接口。<br>5、DOM2级HTML（DOM Level 2 HTML）：在1级HTML基础上构建，添加了更多属性、方法和新接口。<br>6、DOM3级又增加了XPath模块和加载与保存（Load and Save）模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
var oBotton = document.getElementById('myBotton'); 

oBotton1.addEventListener('click', function () {
    console.log('xzavier win win');
});  //点击在打印台输出 xzavier win win" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input type=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
<span class="hljs-keyword">var</span> oBotton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBotton'</span>); 

oBotton1.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier win win'</span>);
});  <span class="hljs-comment">//点击在打印台输出 xzavier win win</span></code></pre>
<p>DOM2 级事件”定义了两个方法，用于添加事件和删除事件处理程序的操作：<br>addEventListener()和removeEventListener()。所有DOM 节点中都包含这两个方法，并且它们都接受3 个参数；事件名、函数、冒泡或捕获的布尔值(true 表示捕获，false 表示冒泡)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('load', function () {
    console.log('xzavier');
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier'</span>);
}, <span class="hljs-literal">false</span>);</code></pre>
<p>IE 实现了与DOM2 中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同的参数：事件名称和函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.attachEvent('onload', function () {
    console.log('xzavier');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.attachEvent(<span class="hljs-string">'onload'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier'</span>);
});</code></pre>
<p>写一个ready()方法，DOM结构绘制完毕后就执行，不必等到加载完毕，也实践下兼容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ready(fn){
    if(document.addEventListener) {        //标准浏览器
        document.addEventListener('DOMContentLoaded', function() {
            //注销事件, 避免反复触发
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            fn();            //执行函数
        }, false);
    }else if(document.attachEvent) {        //IE
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();        //函数执行
            }
        });
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ready</span>(<span class="hljs-params">fn</span>)</span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.addEventListener) {        <span class="hljs-comment">//标准浏览器</span>
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//注销事件, 避免反复触发</span>
            <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,<span class="hljs-built_in">arguments</span>.callee, <span class="hljs-literal">false</span>);
            fn();            <span class="hljs-comment">//执行函数</span>
        }, <span class="hljs-literal">false</span>);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.attachEvent) {        <span class="hljs-comment">//IE</span>
        <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onreadystatechange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.readyState == <span class="hljs-string">'complete'</span>) {
                <span class="hljs-built_in">document</span>.detachEvent(<span class="hljs-string">'onreadystatechange'</span>, <span class="hljs-built_in">arguments</span>.callee);
                fn();        <span class="hljs-comment">//函数执行</span>
            }
        });
    }
};
</code></pre>
<h3 id="articleHeader2">事件类型</h3>
<p>JavaScript 可以处理的事件类型为：鼠标事件、键盘事件、HTML 事件。</p>
<h4>鼠标事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
var oBotton = document.getElementById('myBotton'); 
click：当用户单击鼠标按钮或按下回车键时触发
oBotton.onclick = function () {
    console.log('xzavier is so ...');
};
dblclick：当用户双击主鼠标按钮时触发
oBotton.ondblclick = function () {
    console.log('xzavier is so ...');
};
mousedown：当用户按下了鼠标还未弹起时触发
oBotton.onmousedown = function () {
    console.log('xzavier is so ...');
};
mouseup：当用户释放鼠标按钮时触发
oBotton.onmouseup = function () {
    console.log('xzavier is so ...');
};
mouseover：当鼠标移到某个元素上方时触发
oBotton.onmouseover = function () {
    console.log('xzavier is so ...');
};
mouseenter：同mouseover，但子元素不会触发
oBotton.onmouseenter = function () {
    console.log('xzavier is so ...');
};
mouseout：当鼠标移出某个元素上方时触发
oBotton.onmouseout = function () {
    console.log('xzavier is so ...');
};
mouseleave: 同onmouseout，但子元素不会触发
oBotton.onmouseleave = function () {
    console.log('xzavier is so ...');
};
mousemove：当鼠标指针在元素上移动时触发
oBotton.onmousemove = function () {
    console.log('xzavier is so ...');
};
drag: 事件在元素或者选取的文本被拖动时触发,但必须设有draggable=&quot;true&quot;
oBotton.ondrag = function () {
    console.log('xzavier is so ...');
};
在拖动元素时，每隔 350 毫秒会触发 ondrag 事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;input type=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
<span class="hljs-keyword">var</span> oBotton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBotton'</span>); 
click：当用户单击鼠标按钮或按下回车键时触发
oBotton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
dblclick：当用户双击主鼠标按钮时触发
oBotton.ondblclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mousedown：当用户按下了鼠标还未弹起时触发
oBotton.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mouseup：当用户释放鼠标按钮时触发
oBotton.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mouseover：当鼠标移到某个元素上方时触发
oBotton.onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mouseenter：同mouseover，但子元素不会触发
oBotton.onmouseenter = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mouseout：当鼠标移出某个元素上方时触发
oBotton.onmouseout = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mouseleave: 同onmouseout，但子元素不会触发
oBotton.onmouseleave = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
mousemove：当鼠标指针在元素上移动时触发
oBotton.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
drag: 事件在元素或者选取的文本被拖动时触发,但必须设有draggable=<span class="hljs-string">"true"</span>
oBotton.ondrag = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
在拖动元素时，每隔 <span class="hljs-number">350</span> 毫秒会触发 ondrag 事件</code></pre>
<p>mouseover与mouseenter<br>不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。</p>
<p>mouseout与mouseleave<br>不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。</p>
<p>关于拖拽<br>在拖动目标上触发事件 (源元素):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ondragstart - 用户开始拖动元素时触发
ondrag - 元素正在拖动时触发
ondragend - 用户完成元素拖动后触发
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">ondragstart</span> - 用户开始拖动元素时触发
ondrag - 元素正在拖动时触发
ondragend - 用户完成元素拖动后触发
</code></pre>
<p>释放目标时触发的事件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">ondragenter</span> - 当被鼠标拖动的对象进入其容器范围内时触发此事件
ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
</code></pre>
<h4>键盘事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="keydown：当用户按下键盘上任意键触发，如果按住不放，会重复触发。
onkeydown = function () {
    console.log('xzavier is so ...');
};
keypress：当用户按下键盘上的字符键触发，如果按住不放，会重复触发。
onkeypress = function () {
    console.log('xzavier is so ...');
};
keyup：当用户释放键盘上的键触发。
onkeyup = function () {
    console.log('xzavier is so ...');
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>keydown：当用户按下键盘上任意键触发，如果按住不放，会重复触发。
onkeydown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
keypress：当用户按下键盘上的字符键触发，如果按住不放，会重复触发。
onkeypress = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
keyup：当用户释放键盘上的键触发。
onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xzavier is so ...'</span>);
};
</code></pre>
<p>keydown返回的是键盘的代码, keypress返回的是ASCII字符。如果只想读取字符, 用keypress, 如果想读各键的状态, 用keydown.</p>
<h4>HTML 事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="load：当页面完全加载后在window 上面触发，或当框架集加载完毕后在框架集上触发。
window.onload = function () {
    console.log('xzavier is so ...');
};
unload：当页面完全卸载后在window 上面触发，或当框架集卸载后在框架集上触发。
window.onunload = function () {
    console.log('xzavier is so ...');
};
select：当用户选择文本框(input 或textarea)中的一个或多个字符触发。
input.onselect = function () {
    console.log('xzavier is so ...');
};
<input type=&quot;textarea&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
var oBotton = document.getElementById('myBotton'); 
change：当文本框(input 或textarea)内容改变且失去焦点后触发。
oBotton.onchange = function () {
    console.log('xzavier is so ...');
};
focus：当页面或者元素获得焦点时在window 及相关元素上面触发。
oBotton.onfocus = function () {
    console.log('xzavier is so ...');
};
blur：当页面或元素失去焦点时在window 及相关元素上触发。
oBotton.onblur = function () {
    console.log('xzavier is so ...');
};
submit：当用户点击提交按钮在<form>元素上触发。
form.onsubmit = function () {
    console.log('xzavier is so ...');
};
reset：当用户点击重置按钮在<form>元素上触发。
form.onreset= function () {
    console.log('xzavier is so ...');
};
resize：当窗口或框架的大小变化时在window 或框架上触发。
window.onresize = function () {
    console.log('xzavier is so ...');
};
scroll：当用户滚动带滚动条的元素时触发。
window.onscroll = function () {
    console.log('xzavier is so ...');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-built_in">load</span>：当页面完全加载后在window 上面触发，或当框架集加载完毕后在框架集上触发。
window.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
unload：当页面完全卸载后在window 上面触发，或当框架集卸载后在框架集上触发。
window.onunload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
<span class="hljs-keyword">select</span>：当用户选择文本框(input 或textarea)中的一个或多个字符触发。
input.onselect = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
&lt;input <span class="hljs-built_in">type</span>=<span class="hljs-string">"textarea"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
var oBotton = document.getElementById(<span class="hljs-string">'myBotton'</span>); 
change：当文本框(input 或textarea)内容改变且失去焦点后触发。
oBotton.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
focus：当页面或者元素获得焦点时在window 及相关元素上面触发。
oBotton.onfocus = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
blur：当页面或元素失去焦点时在window 及相关元素上触发。
oBotton.onblur = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
submit：当用户点击提交按钮在&lt;form&gt;元素上触发。
form.onsubmit = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
reset：当用户点击重置按钮在&lt;form&gt;元素上触发。
form.onreset= <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
resize：当窗口或框架的大小变化时在window 或框架上触发。
window.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};
scroll：当用户滚动带滚动条的元素时触发。
window.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'xzavier is so ...'</span>);
};</code></pre>
<h3 id="articleHeader3">事件对象</h3>
<p>事件对象就是event 对象，通过处理函数传递。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过处理函数传递事件对象
<input type=&quot;textarea&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
var oBotton = document.getElementById('myBotton'); 
oBotton.addEventListener('click', function (e) { //接受事件对象参数
    console.log(e);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//通过处理函数传递事件对象</span>
&lt;input type=<span class="hljs-string">"textarea"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
<span class="hljs-keyword">var</span> oBotton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBotton'</span>); 
oBotton.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{ <span class="hljs-comment">//接受事件对象参数</span>
    <span class="hljs-built_in">console</span>.log(e);
});</code></pre>
<p>event 对象的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性名                          描述
type                获取这个事件的事件类型，例如：click
target              获取绑定事件的DOM 元素
data                获取事件调用时的额外数据
relatedTarget       获取移入移出目标点离开或进入的那个DOM 元素
currentTarget       获取冒泡前触发的DOM 元素，等同与this
pageX/pageY         获取相对于页面原点的水平/垂直坐标
screenX/screenY     获取显示器屏幕位置的水平/垂直坐标(非jQuery 封装)
clientX/clientY     获取相对于页面视口的水平/垂直坐标(非jQuery 封装)
result              获取上一个相同事件的返回值
timeStamp           获取事件触发的时间戳
which               获取鼠标的左中右键(1,2,3)，或获取键盘按键
altKey/shiftKey/ctrlKey/metaKey 获取是否按下了alt、shift、ctrl或 meta 键" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>属性名                          描述
type                获取这个事件的事件类型，例如：click
target              获取绑定事件的DOM 元素
data                获取事件调用时的额外数据
relatedTarget       获取移入移出目标点离开或进入的那个DOM 元素
currentTarget       获取冒泡前触发的DOM 元素，等同与<span class="hljs-keyword">this</span>
pageX<span class="hljs-regexp">/pageY         获取相对于页面原点的水平/</span>垂直坐标
screenX<span class="hljs-regexp">/screenY     获取显示器屏幕位置的水平/</span>垂直坐标(非jQuery 封装)
clientX<span class="hljs-regexp">/clientY     获取相对于页面视口的水平/</span>垂直坐标(非jQuery 封装)
result              获取上一个相同事件的返回值
timeStamp           获取事件触发的时间戳
which               获取鼠标的左中右键(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>)，或获取键盘按键
altKey<span class="hljs-regexp">/shiftKey/</span>ctrlKey<span class="hljs-regexp">/metaKey 获取是否按下了alt、shift、ctrl或 meta 键</span></code></pre>
<p>event.target 得到的是触发元素的DOM，event.currentTarget 得到的是监听元素的DOM。而this 也是得到监听元素的DOM。</p>
<h3 id="articleHeader4">冒泡和默认行为</h3>
<p>如果在页面中重叠了多个元素，并且重叠的这些元素都绑定了同一个事件，那么就会出现冒泡问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;myDiv&quot; style=&quot;width:200px;height:200px;background:#666;&quot;>
    input type=&quot;button&quot; id=&quot;myBotton&quot; value=&quot;click me &quot; />
</div>
var oBotton = document.getElementById('myBotton');
var oDiv = document.getElementById('myDiv'); 
//三个不同元素触发事件
oBotton.addEventListener('click', function () {
  console.log('input');
});
oDiv.addEventListener('click', function () {
  console.log('div');
});
document.addEventListener('click', function () {
  console.log('document');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div id=<span class="hljs-string">"myDiv"</span> style=<span class="hljs-string">"width:200px;height:200px;background:#666;"</span>&gt;
    input type=<span class="hljs-string">"button"</span> id=<span class="hljs-string">"myBotton"</span> value=<span class="hljs-string">"click me "</span> /&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
<span class="hljs-keyword">var</span> oBotton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myBotton'</span>);
<span class="hljs-keyword">var</span> oDiv = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myDiv'</span>); 
<span class="hljs-comment">//三个不同元素触发事件</span>
oBotton.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'input'</span>);
});
oDiv.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'div'</span>);
});
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'document'</span>);
});</code></pre>
<p>当点击文档的时候，只触发文档事件；当点击div 层时，触发了div 和文档两个；当我们点击按钮时，触发了按钮、div 和文档。触发的顺序是从小范围到大范围。这就是所谓的冒泡现象，一层一层往上冒泡触发。</p>
<p>网页中的元素，在操作的时候会有自己的默认行为。比如：右击文本框输入区域，会弹出系统菜单、点击超链接会跳转到指定页面、点击提交按钮会提交数据。我们可以组织默认行为的发生</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//禁止链接跳转
$('a').click(function (e) {
    e.preventDefault();
});
//禁止提交表单跳转
$('form').submit(function (e) {
    e.preventDefault();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//禁止链接跳转</span>
$(<span class="hljs-string">'a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
});
<span class="hljs-comment">//禁止提交表单跳转</span>
$(<span class="hljs-string">'form'</span>).submit(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    e.preventDefault();
});</code></pre>
<p>如果想让上面的超链接同时阻止默认行为且禁止冒泡行为，可以把两个方法同时写上：event.stopPropagation()和event.preventDefault()。这两个方法如果需要同时启用的时候，还有一种简写方案代替，就是直接return false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a').click(function (e) {
    return false;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
});</code></pre>
<p>冒泡和默认行为的一些方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方法名                                  描述
preventDefault()                取消某个元素的默认行为
isDefaultPrevented()            判断是否调用了preventDefault()方法
stopPropagation()               取消事件冒泡
isPropagationStopped()          判断是否调用了stopPropagation()方法
stopImmediatePropagation()      取消事件冒泡，并取消该事件的后续事件处理函数
isImmediatePropagationStopped() 判断是否调用了stopImmediatePropagation()方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>方法名                                  描述
<span class="hljs-function"><span class="hljs-title">preventDefault</span><span class="hljs-params">()</span></span>                取消某个元素的默认行为
<span class="hljs-function"><span class="hljs-title">isDefaultPrevented</span><span class="hljs-params">()</span></span>            判断是否调用了preventDefault()方法
<span class="hljs-function"><span class="hljs-title">stopPropagation</span><span class="hljs-params">()</span></span>               取消事件冒泡
<span class="hljs-function"><span class="hljs-title">isPropagationStopped</span><span class="hljs-params">()</span></span>          判断是否调用了stopPropagation()方法
<span class="hljs-function"><span class="hljs-title">stopImmediatePropagation</span><span class="hljs-params">()</span></span>      取消事件冒泡，并取消该事件的后续事件处理函数
<span class="hljs-function"><span class="hljs-title">isImmediatePropagationStopped</span><span class="hljs-params">()</span></span> 判断是否调用了stopImmediatePropagation()方法</code></pre>
<h3 id="articleHeader5">捕获冒泡</h3>
<p>1.事件冒泡：事件按照从最特定的事件目标到最不特定的事件目标(一般为document对象)的顺序触发。<br>2.事件捕获(event capturing)：事件从最不精确的对象(一般为document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)。<br>3.DOM事件流：同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。</p>
<p>事件捕获阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。<br>事件冒泡阶段：事件从事件目标(target)开始，往上冒泡直到页面的最上一级标签。<br>不是所有的事件都能冒泡，例如：blur、focus、load、unload等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="W3C : addEventListener('click',doSomething,true); //true=捕获 false=冒泡
诸如onclick,onchange 事件采用事件冒泡方式
IE : attachEvent(&quot;onclick&quot;, doSomething2); 不支持捕获，只有冒泡.

阻止事件冒泡：
在W3c中，使用stopPropagation()方法
    在IE下设置cancelBubble = true；
    在捕获的过程中stopPropagation（）后，后面的冒泡过程也不会发生了~
阻止事件的默认行为，例如click <a>后的跳转~
    在W3c中，使用preventDefault()方法；
    在IE下设置window.event.returnValue = false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>W3C : <span class="hljs-type">addEventListener</span>(<span class="hljs-symbol">'click</span>',doSomething,<span class="hljs-literal">true</span>); //<span class="hljs-literal">true</span>=捕获 <span class="hljs-literal">false</span>=冒泡
诸如onclick,onchange 事件采用事件冒泡方式
IE : <span class="hljs-type">attachEvent</span>(<span class="hljs-string">"onclick"</span>, doSomething2); 不支持捕获，只有冒泡.

阻止事件冒泡：
在W3c中，使用stopPropagation()方法
    在IE下设置cancelBubble = <span class="hljs-literal">true</span>；
    在捕获的过程中stopPropagation（）后，后面的冒泡过程也不会发生了~
阻止事件的默认行为，例如click &lt;a&gt;后的跳转~
    在W3c中，使用preventDefault()方法；
    在IE下设置window.event.returnValue = <span class="hljs-literal">false</span>;</code></pre>
<h3 id="articleHeader6">事件委托</h3>
<p>事件委托的原理就是事件冒泡。使用事件委托技术可以让你对每个节点添加事件监听器，事件监听器被添加到它们的父元素上。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。<br>获取点击的元素的信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul id=&quot;test&quot;>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ul>
// 方法一：
var lis = document.getElementById('test').getElementsByTagName('li');
for(var i = 0;i < 3;i++){
    lis[i].index = i;
    lis[i].onclick = function(){
        console.log(this.index);
    };
} 
// 方法二：
var lis = document.getElementById('test').getElementsByTagName('li');
for(var i = 0;i < 3;i++){
    lis[i].index = i;
    lis[i].onclick = (function(val){
        return function() {
            console.log(val);
        }
    })(i);
}
// 方法三 事件委托  委托给ul
var oUl = document.getElementById('test');
oUl.addEventListener('click',function(e){
    var lis = e.target;
    console.log(lis); 
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>ul id=<span class="hljs-string">"test"</span>&gt;
    &lt;<span class="hljs-keyword">li</span>&gt;first&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span>&gt;second&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span>&gt;third&lt;/<span class="hljs-keyword">li</span>&gt;
&lt;/ul&gt;
<span class="hljs-comment">// 方法一：</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">lis</span> = document.getElementById('<span class="hljs-keyword">test</span>').getElementsByTagName('<span class="hljs-keyword">li</span>');
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = 0;i &lt; 3;i++){
    <span class="hljs-keyword">lis</span>[i].index = i;
    <span class="hljs-keyword">lis</span>[i].onclick = function(){
        console.<span class="hljs-built_in">log</span>(this.index);
    };
} 
<span class="hljs-comment">// 方法二：</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">lis</span> = document.getElementById('<span class="hljs-keyword">test</span>').getElementsByTagName('<span class="hljs-keyword">li</span>');
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = 0;i &lt; 3;i++){
    <span class="hljs-keyword">lis</span>[i].index = i;
    <span class="hljs-keyword">lis</span>[i].onclick = (function(val){
        <span class="hljs-keyword">return</span> function() {
            console.<span class="hljs-built_in">log</span>(val);
        }
    })(i);
}
<span class="hljs-comment">// 方法三 事件委托  委托给ul</span>
<span class="hljs-keyword">var</span> oUl = document.getElementById('<span class="hljs-keyword">test</span>');
oUl.addEventListener('click',function(<span class="hljs-keyword">e</span>){
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">lis</span> = <span class="hljs-keyword">e</span>.target;
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">lis</span>); 
});
</code></pre>
<p>学习参考：<a href="http://www.tuicool.com/articles/u2Qnmij" rel="nofollow noreferrer" target="_blank">DOM3级与事件</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（10）-事件event

## 原文链接
[https://segmentfault.com/a/1190000006685553](https://segmentfault.com/a/1190000006685553)


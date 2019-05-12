---
title: '前端知识点总结——JQ' 
date: 2018-12-12 2:30:10
hidden: true
slug: d8ama445l1w
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——JQ</strong></h1>
<h2 id="articleHeader1">1.什么是jQuery:</h2>
<p>jQuery: 第三方的极简化的DOM操作的函数库<br>  第三方: 下载<br>  极简化: 是DOM操作的终极简化: 4个方面:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. DOM: 增删改查
2. 事件绑定:
3. 动画效果:
4. Ajax" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>DOM: 增删改查
<span class="hljs-bullet">2. </span>事件绑定:
<span class="hljs-bullet">3. </span>动画效果:
<span class="hljs-bullet">4. </span>Ajax</code></pre>
<p>DOM操作: 学习jQuery还是在学DOM，只不过API简化了<br>  函数库: jQuery中都是函数，用函数来解决一切问题<br> 为什么使用:</p>
<ol>
<li>DOM操作的终极简化</li>
<li>解决了大部分浏览器兼容性问题<br> 凡是jQuery让用的，都没有兼容性问题</li>
</ol>
<h2 id="articleHeader2">2.如何使用:</h2>
<p>下载: 版本:<br>  1.x: 兼容旧浏览器 IE8</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.x.js  未压缩版  
  优: 包含完备的注释，格式，变量名，可读性好
  缺: 体积大，不便于传输
 何时: 学习和开发阶段
1.x.min.js  压缩版
  优: 体积小，便于传输
  缺: 去掉注释，格式，极简化了变量名
      可读性差
 何时: 生产环境" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.js</span>  未压缩版  
  优: 包含完备的注释，格式，变量名，可读性好
  缺: 体积大，不便于传输
 何时: 学习和开发阶段
<span class="hljs-number">1</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>  压缩版
  优: 体积小，便于传输
  缺: 去掉注释，格式，极简化了变量名
      可读性差
 何时: 生产环境</code></pre>
<p>2.x: 不再兼容旧浏览器<br>  3.x: 不再兼容旧浏览器，提供了更多新特性: <br>   鄙视: 3.x的新特性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 所有代码运行在严格模式下
2. 用for...of代替了forEach  $.each
3. 新动画API: requestAnimationFrame()
4. 支持promise
5. ajax的API防备跨站点脚本(XSS)攻击
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>所有代码运行在严格模式下
<span class="hljs-bullet">2. </span>用for...of代替了forEach  $.each
<span class="hljs-bullet">3. </span>新动画API: requestAnimationFrame()
<span class="hljs-bullet">4. </span>支持promise
<span class="hljs-bullet">5. </span>ajax的API防备跨站点脚本(XSS)攻击
</code></pre>
<p>引入网页: 2种:</p>
<ol>
<li>引入服务器本地的js文件: &lt;script src="js/jquery-1.x.js"</li>
<li>引入CDN网络中共享的js文件:</li>
</ol>
<p>&lt;script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.js"</p>
<p>原理: <br>  引入jquery-1.x.js其实是在全局添加了一种新类型jQuery<br>  包括: <br>   构造函数jQuery: 用于创建jQuery类型的子对象<br>   原型对象jQuery.fn: 用于保存只有jQuery类型的子对象才能访问的共有方法<br>  如何使用jQuery简化版API: <br>   问题: DOM元素无法使用jQuery简化版API<br>   解决: 要想使用jQuery简化版API，必须先创建jQuery类型的子对象: <br>  如何创建jQuery类型的子对象: 2种:</p>
<ol>
<li>通过查找DOM元素，将DOM元素保存到新创建的jQuery对象中: <br> var $jq=$("selector")<br> 什么是jQuery对象: 包含找到的DOM元素的类数组对象</li>
<li>将已经获得的DOM元素直接保存进新创建的jQuery对象中</li>
</ol>
<p>jQuery API的通用特点: 3个</p>
<ol>
<li>自带遍历: 对jQuery对象整体调用一次API，等效于对内部每个元素都调用一次API</li>
<li>一个函数两用: 给新值，就修改；没给新值，就读取原值</li>
<li>每个函数都返回正在操作的jq对象: 链式操作!</li>
</ol>
<h2 id="articleHeader3">3.查找: 选择器</h2>
<p>基本选择器: 同CSS<br>  id  class   element   *    ,<br> 层次选择器: 同CSS<br>  空格   &gt;    +     ~<br> 子元素过滤选择器: 同CSS<br>  在各自父元素内，分别排序，从1开始<br>  :first-child  :last-child  :only-child<br>  :nth-child(2n/2n+1/odd/even/i)<br> 基本过滤选择器(位置过滤选择器): jQuery新增<br>  将所有符合条件的元素，保存在一个统一的集合中，在集合内统一编号。从0开始<br>  :first/last    :gt/lt/eq(i)    :even/odd<br> 属性过滤选择器: 同CSS<br> 内容过滤: jQuery新增4种:</p>
<ol>
<li>以内容中的文本作为条件查询父元素<br> :contains(text) 内容包含指定文字的元素</li>
<li>以子元素的特征作为查询条件，查询父元素<br> :has(selector) 包含符合selector要求的子元素的父元素</li>
<li>空元素/非空元素: <br> :parent<br> :empty</li>
</ol>
<p>可见性过滤: jQuery新增<br>  :hidden 只能选择两种隐藏的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type=&quot;hidden&quot;     display:none" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;"><span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"hidden"</span>     display:none</code></pre>
<p>:visible<br> 状态过滤: 同CSS  四大状态: <br>  :enabled  :disabled   :checked   :selected<br> 表单元素过滤: <br>  :input  选择所有表单元素: input select textarea button<br>  :[type] 每种type都对应一种选择器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":text  :password  :file    :button  :submit ....



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-meta">:text  :password</span>  :file    :button  :submit ....



</code></pre>
<h2 id="articleHeader4">4.修改:</h2>
<p>内容: 3种:<br>  html代码片段: $(...).html([新内容])    .innerHTML<br>  纯文本内容: $(...).text([新内容])     .textContent<br>  表单元素的值: $(...).val([新值])     .value<br>  清空内容: $(...).empty();<br> 属性: 3种: <br>  HTML标准属性: $(...).attr("属性名"[,"值"])</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="问题: 一次只能修改一个属性的值:
解决: 同时修改多个属性的值:
 $(...).attr({
   属性名:值,
   属性名:值,
      ... : ...
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>问题: 一次只能修改一个属性的值:
解决: 同时修改多个属性的值:
 $(...).attr({
   属性名:值,
   属性名:值,
      ... : ...
 })</code></pre>
<p>状态属性: $(...).prop("属性名"[,bool])<br>  自定义扩展属性: $(...).data("属性名"[,"值"])<br> 样式:<br>  修改: 内联样式: <br>  获取: 计算后的样式: <br>  都用.css: $(...).css("css属性名"[,值])<br>  问题: 单独修改每个css属性，代码繁琐<br>  解决: 用class批量修改样式:<br>   $(...).addClass("class ... ")<br>   $(...).removeClass("class ...")<br>   $(...).hasClass("class ...")</p>
<p>$(...).toggleClass("class ...")</p>
<ol>
<li>
<p>按节点间关系查找: <br>2大类:</p>
<ol>
<li>父子:<br>$(...).parent()<br>$(...).children(["selector"])<br> 问题: 只能获得直接子元素<br> 解决: 在所有后代中查找<br>  $(...).find("selector")<br>$(...).children().first();<br>$(...).children().last();</li>
<li>兄弟: <br>$(...).prev/next()<br>$(...).prevAll/nextAll(["selector"])<br>$(...).siblings(["selector"])</li>
</ol>
</li>
<li>
<p>添加,删除,替换,克隆:<br>添加: 2步:</p>
<ol>
<li>创建新元素: var $elem=$("html代码片段")</li>
<li>
<p>将新元素添加到DOM树: <br>  末尾追加: $parent.append($elem) //return $parent</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       $elem.appendTo($parent) //return $elem" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">       $elem.appendTo($parent) //<span class="hljs-keyword">return</span> $elem</code></pre>
<p>开头插入: $parent.prepend($elem) //return $parent</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       $elem.prependTo($parent) //return $elem" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">       $elem.prependTo($parent) //<span class="hljs-keyword">return</span> $elem</code></pre>
<p>指定元素前插入: $child.before($elem)<br>  指定元素后插入: $child.after($elem)</p>
</li>
</ol>
</li>
</ol>
<p>可简化为1步: <br>   $("html代码片段").appendTo($parent)<br>   $parent.append("html代码片段")</p>
<p>移除: $(...).remove()<br> 替换: $(...).replaceWith(); //右替换左 //return 左</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  $(...).replaceAll(...); //左替换右 //return 左" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">  $(...).replaceAll(...); <span class="hljs-comment">//左替换右 //return 左</span></code></pre>
<p>克隆: $(...).clone();<br>  浅克隆: 仅复制内容和样式，不复制行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clone() 默认是浅克隆" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code style="word-break: break-word; white-space: initial;"><span class="hljs-title">.clone() 默认是浅克隆</span></code></pre>
<p>深克隆: 即复制内容和样式，又复制行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clone(true) 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>.<span class="hljs-keyword">clone</span>(<span class="hljs-keyword">true</span>) 
</code></pre>
<h2 id="articleHeader5">5.事件:</h2>
<p>鄙视: jq中有几种事件绑定方式，分别是什么:</p>
<ol>
<li>
<p>.bind("事件名",handler)<br>  .unbind("事件名",handler)<br>   3个重载:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" .unbind(&quot;事件名&quot;,handler) 移除指定事件上的一个处理函数
 .unbind(&quot;事件名&quot;)  移除指定事件上的所有处理函数
 .unbind() 移除所有事件上的所有处理函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-selector-class">.unbind</span>(<span class="hljs-string">"事件名"</span>,handler) 移除指定事件上的一个处理函数
 <span class="hljs-selector-class">.unbind</span>(<span class="hljs-string">"事件名"</span>)  移除指定事件上的所有处理函数
 <span class="hljs-selector-class">.unbind</span>() 移除所有事件上的所有处理函数</code></pre>
</li>
<li>.one("事件名",handler)<br> 只能触发一次，触发后，自动解绑</li>
<li>
<p>.delegate("selector","事件名",handler)<br> 其实就是利用冒泡的简化版：</p>
<ol>
<li>将利用冒泡中的目标元素判断提升到第一个参数，用选择器作为判断条件</li>
<li>将this重新指回了目标元素</li>
</ol>
</li>
</ol>
<p>鄙视: .delegate vs .bind</p>
<ol>
<li>绑定位置不同: <br>  .bind() 直接绑在目标元素(子元素)上<br>  .delegate() 绑在父元素上</li>
<li>事件监听的个数不同:<br>  .bind() 导致事件监听个数增多<br>  .delegate() 始终只有一个监听</li>
<li>.bind() 无法让动态生成的新元素自动获得事件处理函数<br>  .delegate() 即使后来动态生成的新元素也可自动获得父元素上的事件处理函数</li>
</ol>
<p>解绑: .undelegate()</p>
<ol>
<li>.live/die() 废弃</li>
<li>
<p>.on: 统一bind和delegate的用法</p>
<ol>
<li>代替bind: .on("事件名",handler)</li>
<li>代替delegate: .on("事件名","选择器",handler)</li>
</ol>
</li>
</ol>
<p>解绑: .off()</p>
<ol><li>终极简化: .事件名(handler)</li></ol>
<h2 id="articleHeader6">6.页面加载后执行: 2种:</h2>
<ol>
<li>
<p>DOMContentLoaded: <br>  DOM内容(html,js)加载完成,就提前触发<br> 何时: 操作不需要等待css和图片时，首选DOMContentLoaded<br> jQuery: $(document).ready(function(){ ... })<br>  简化: $().ready(function(){...})<br>   更简化: $(function(){...})</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" ES6: $(()=>{ ... })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"> ES6: $(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{ ... })</code></pre>
</li>
<li>window.onload=function(){<br>   //等待页面所有内容(html,css,js,图片)都加载完才能执行<br>  }<br> 何时: 如果必须等待css和图片加载完，才能执行的操作，必须放在window.onload中</li>
</ol>
<p>鄙视: jQuery中$的原理: 4种重载</p>
<ol>
<li>如果传入选择器字符串，则查找并创建jq对象<br> 优化: speed up<br>  如果选择器只是一个id，则调用getElementById<br>  如果选择器只是一个标签，则调用getElementsByTagName<br>  如果选择器只是一个class，则调用getElementsByClassName<br>  如果选择器复杂，才调querySelectorAll</li>
<li>如果传入DOM元素对象，则封装现有DOM元素为jq对象</li>
<li>如果传入html代码片段，就创建新元素:</li>
<li>如果传入函数，就绑定DOM内容加载后执行</li>
</ol>
<h2 id="articleHeader7">7.鼠标事件:</h2>
<p>DOM: mouseover  mouseout<br>   进出子元素，也会反复触发父元素上的事件<br> jq: mouseenter   mouseleave<br>   进出子元素，不再触发父元素上的事件<br>   简化: 如果同时绑定mouseenter和mouseleave</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可简化为.hover(enterHandler, leaveHandler)
 如果enterHandler和leaveHandler可统一为一个处理函数: .hover(handler)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code>可简化为.hover(enterHandler, leaveHandler)
 如果enterHandler和leaveHandler可统一为一个处理函数: .hover(<span class="hljs-keyword">handler</span>)
</code></pre>
<p>模拟触发: <br> $(...).trigger("事件名") =&gt; $(...).事件名()</p>
<h2 id="articleHeader8">8.动画:</h2>
<p>简单动画: 3种:</p>
<ol>
<li>
<p>显示隐藏: .show(ms)   .hide(ms)    .toggle(ms)<br> 不带参数，默认: 瞬间显示隐藏，不带动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 原理: display属性实现的，不支持动画" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"> 原理: <span class="hljs-built_in">display</span>属性实现的，不支持动画</code></pre>
<p>带毫秒数参数: 会有动画效果</p>
</li>
<li>上滑下滑: .slideUp(ms) .slideDown(ms) .slideToggle(ms)</li>
<li>淡入淡出: .fadeIn(ms)  .fadeOut(ms)   .fadeToggle(ms)</li>
</ol>
<p>问题: 1. 效果是固定的，不便于维护</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  2. 用程序的定时器实现的动效，效率不如transition" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-number">2.</span> 用程序的定时器实现的动效，效率不如transition</code></pre>
<p>万能动画: <br> $(...).animate({<br>   css属性:目标值,<br>   css属性:目标值,<br> },ms)<br> 问题: 只支持单个数值的css属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="不支持颜色和CSS3变换
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>不支持颜色和CSS3变换
</code></pre>
<p>动画播放后自动执行: 动画API的最后一个参数都是一个回调函数，在动画播放完成后自动执行!<br>  回调函数中的this，指正在播放动画的当前DOM元素</p>
<h2 id="articleHeader9">9.排队和并发:</h2>
<ol>
<li>并发: 多个css属性同时变化<br>  放在一个animate函数内的多个css属性默认并发变化</li>
<li>排队: 多个css属性先后变化<br>  对同一个元素，先后调用多个动画API，都是排队执行<br>  原理: 所有动画API起始并不是立刻开始动画，而仅是将当前动画函数加入元素的动画队列中等待执行。</li>
</ol>
<p>停止动画: $(...).stop();<br> 默认: 仅停止动画队列中，当前正在播放的一个动画，队列中后续动画，依然执行！<br> 如何停止动画，并清空队列: .stop(true)</p>
<p>选择器: :animated 可选择或判断一个正在播放动画的元素</p>
<h2 id="articleHeader10">10.类数组对象操作:</h2>
<p>遍历: <br> $(...).each(function(i,elem){<br>   //this-&gt;当前elem<br> })<br> 鄙视: $(...).each()  vs  $.each(数组/集合,fun)</p>
<p>查找: <br> var i=$(...).index(要找的DOM元素/jq对象)<br>  简化: 如果在一个父元素内查找子元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(子元素).index();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>$(子元素).<span class="hljs-keyword">index</span>();
</code></pre>
<h2 id="articleHeader11">11.为jquery添加自定义方法:</h2>
<ol>
<li>
<p>添加在jQuery.fn中<br>  强调: jQuery.fn.自定义方法=function(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     //this->将来调用该方法的jq对象
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>     <span class="hljs-comment">//this-&gt;将来调用该方法的jq对象</span>
   }</code></pre>
</li>
<li>调用时: $(...).自定义方法()</li>
</ol>
<h2 id="articleHeader12">12.插件: 为标准函数库或框架添加功能的第三方库</h2>
<ol><li>
<p>官方插件jQuery UI: <br>使用jQueryUi:<br> 先引入jquery.js，因为jQuery UI是基于jQuery开发的<br> 再引入jquery-ui.js<br> 再编写自定义脚本<br>包括: <br> 交互: 自学<br> 效果:</p>
<ol>
<li>重写了三类简单动画API，添加了新的动效</li>
<li>为addClass/removeClass/toggleClass，也添加了动效</li>
<li>重写了animate方法，支持颜色动画</li>
</ol>
</li></ol>
<p>部件: <br>   什么是部件: 具有完整样式和行为的小功能<br>   如何使用: 4步:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 引入: jquery-ui.css
2. 按照部件约定，编写html内容结构
3. 引入jquery.js和jquery-ui.js
4. 在自定义脚本中，找到插件的父元素，调用插件API" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>引入: jquery-ui.css
<span class="hljs-bullet">2. </span>按照部件约定，编写html内容结构
<span class="hljs-bullet">3. </span>引入jquery.js和jquery-ui.js
<span class="hljs-bullet">4. </span>在自定义脚本中，找到插件的父元素，调用插件API</code></pre>
<p>原理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="侵入性: 在开发者不知情的情况下，自动添加class和行为
优: 简单!
缺: 不可维护!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>侵入性: 在开发者不知情的情况下，自动添加<span class="hljs-class"><span class="hljs-keyword">class</span>和行为</span>
优: 简单!
缺: 不可维护!
</code></pre>
<p>jQuery UI vs bootstrap<br>  jQuery UI 傻瓜式，侵入式<br>   优: 简单  缺: 不可维护<br>  bootstrap 少量手动添加样式和行为(自定义扩展属性)<br>   缺: 相比jQuery UI，稍微麻烦<br>   优: 可定制!</p>
<h2 id="articleHeader13">13.第三方插件:</h2>
<p>文件上传:<br> 富文本编辑器:<br> masonry: 彩砖墙/瀑布流</p>
<h2 id="articleHeader14">14.自定义插件:</h2>
<p>何时: 只要希望复用一块功能和样式时，都要封装为插件<br> 如何: <br>  前提: 必须已经用原生的html,css,jss实现了插件的功能<br>  2种封装插件的风格: <br>  jQuery侵入式:</p>
<ol>
<li>将插件所需的css提取出来，保存在单独的css文件中</li>
<li>
<p>定义插件的js文件: <br>  先检查是否提前引入了jQuery<br>  定义插件函数，保存在jQuery的原型对象jQuery.fn中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="侵入: 根据插件需要，为子元素自动添加class
      为子元素绑定事件处理函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>侵入: 根据插件需要，为子元素自动添加<span class="hljs-class"><span class="hljs-keyword">class</span></span>
      为子元素绑定事件处理函数</code></pre>
</li>
<li>使用插件: <br>  引入插件的css文件<br>  在body中按插件的规定，编写html内容<br>  引入jquery.js和插件的js文件<br>  在自定义脚本中，查找要应用插件的父元素，调用插件函数</li>
</ol>
<p>Bootstrap DIY式:</p>
<ol>
<li>将css拷贝到独立的css文件中</li>
<li>编写js:<br>  先验证是否提前加载了jQuery<br>  查找自定义扩展属性，为其绑定事件</li>
<li>使用插件:<br>  引入插件的css<br>  按照插件的HTML格式要求，编写内容<br>  为插件的HTML元素手动添加class<br>  为触发事件的元素添加指定的自定义扩展属性</li>
</ol>
<h2 id="articleHeader15">15.jQuery的ajax API</h2>
<p>$.ajax({<br>  type:"get/post",<br>  url:"xxx",<br>  data:"rawData"/{ 变量名:值, ...}<br>  dataType:"json",<br>  beforeSend(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在发送之前触发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//在发送之前触发</span></code></pre>
<p>}<br>  completed(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//只要请求完成，无论成功还是失败，都触发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//只要请求完成，无论成功还是失败，都触发</span></code></pre>
<p>}<br>  success(data){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//请求成功触发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//请求成功触发</span></code></pre>
<p>}<br>  error(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//发生错误时触发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//发生错误时触发</span></code></pre>
<p>}<br> }).then(data=&gt;{<br>   ... ...<br> }).catch(err=&gt;{ ... })<br> 简写:</p>
<ol><li>专门发送get请求</li></ol>
<p>$.get(url,data,dataType).then(data=&gt;{ ... })</p>
<ol><li>专门发送get请求，接收JSON响应，并自动转为js对象</li></ol>
<p>$.getJSON(url,data).then(data=&gt;{ ... })</p>
<ol><li>专门发送get请求，接收js语句响应，并执行</li></ol>
<p>$.getScript(url,data)</p>
<ol><li>专门发送get请求，获取一段html代码片段的响应，并自动填充到前面的父元素中</li></ol>
<p>$(父元素).load("xx.php/xx.html")<br>  强调: 不支持then!</p>
<p>专门简化post请求的: <br> $.post(url,data,dataType).then(data=&gt;{ ... })</p>
<h2 id="articleHeader16">16.跨域请求:</h2>
<p>跨域: <br>  从<a href="http://store.company.com/dir/page.html" rel="nofollow noreferrer" target="_blank">http://store.company.com/dir/...</a></p>
<p>允许跨域请求: link, img, script<br> 不允许跨域: xhr对象 (ajax请求)<br> 变通: script 需要服务器返回一段可执行的js语句</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 服务器应该返回包含数据的一条可执行的js语句" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code style="word-break: break-word; white-space: initial;"> 服务器应该返回包含数据的一条可执行的<span class="hljs-keyword">js</span>语句</code></pre>
<p>如何实现:<br>  客户端实现:  JSONP (填充式json)</p>
<ol>
<li>在客户端定义处理函数</li>
<li>在按钮单击事件中，动态创建script元素，src设置为服务端地址，并携带请求参数callback=函数名</li>
<li>在服务器端，接收请求参数中的函数名，将函数名和要返回的数据，拼接为一条可执行的js语句</li>
<li>客户端script，请求服务端php，获得可执行语句，自动调用提前定义好的函数处理数据</li>
<li>在客户端处理函数结尾，要动态删除script</li>
</ol>
<p>起始jQuery的ajax api都可用, 只不过，dataType必须都写成jsonp，原理同上。</p>
<p>服务端: header("Access-Control-Allow-Origin:*");<br>   允许客户端使用xhr对象跨域请求！</p>
<p><strong>结语：觉得总结的还可以的话，点下赞咯，你们的鼓励是我前进的动力，谢谢各位老铁们！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——JQ

## 原文链接
[https://segmentfault.com/a/1190000013476906](https://segmentfault.com/a/1190000013476906)


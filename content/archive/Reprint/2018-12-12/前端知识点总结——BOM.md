---
title: '前端知识点总结——BOM' 
date: 2018-12-12 2:30:10
hidden: true
slug: 465r4i1jkf2
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——BOM</strong></h1>
<h2 id="articleHeader1">1.BOM: Browser Object Model</h2>
<p>什么是: 专门操作浏览器窗口的API<br>   没有标准, 导致浏览器兼容性问题<br> 包括: <br>  window <br>  history<br>  location<br>  navigator<br>  dom<br>  event<br>  screen</p>
<h2 id="articleHeader2">2.window:</h2>
<p>属性: .innerWidth,  .innerHeight 浏览器窗口中，文档显示区的宽和高<br> 方法: .open()  .close() .open("url","name")</p>
<p>三种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.在当前窗口打开，可后退: .open(&quot;url&quot;,&quot;_self&quot;)
    2.在新窗口打开，可打开多个: .open(&quot;url&quot;,&quot;_blank&quot;)
    3.在新窗口打开，只能打开一个: 
      .open(&quot;url&quot;,&quot;自定义窗口名&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    <span class="hljs-number">1.</span>在当前窗口打开，可后退: .<span class="hljs-built_in">open</span>(<span class="hljs-string">"url"</span>,<span class="hljs-string">"_self"</span>)
    <span class="hljs-number">2.</span>在新窗口打开，可打开多个: .<span class="hljs-built_in">open</span>(<span class="hljs-string">"url"</span>,<span class="hljs-string">"_blank"</span>)
    <span class="hljs-number">3.</span>在新窗口打开，只能打开一个: 
      .<span class="hljs-built_in">open</span>(<span class="hljs-string">"url"</span>,<span class="hljs-string">"自定义窗口名"</span>)
</code></pre>
<h2 id="articleHeader3">3.history: 保存当前窗口打开后，成功访问过的url的历史记录栈</h2>
<p>在当前窗口中，每访问一个新url，都会将新url压入history<br> API: history.go(n)</p>
<p>3种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 前进: history.go(1)  
 后退: history.go(-1)  
 刷新: history.go(0)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code> 前进: <span class="hljs-keyword">history</span>.<span class="hljs-keyword">go</span>(<span class="hljs-number">1</span>)  
 后退: <span class="hljs-keyword">history</span>.<span class="hljs-keyword">go</span>(-<span class="hljs-number">1</span>)  
 刷新: <span class="hljs-keyword">history</span>.<span class="hljs-keyword">go</span>(<span class="hljs-number">0</span>)
</code></pre>
<h2 id="articleHeader4">4.location: 保存当前窗口正在打开的url的对象</h2>
<p>属性: <br>  .href 完整url地址<br>  .protocol 协议<br>  .host 主机名+端口号<br>  .hostname  主机名<br>  .port  端口号<br>  .pathname 相对路径<br>  .hash  #锚点地址<br>  .search  ?查询字符串</p>
<p>方法:</p>
<ol>
<li>在当前窗口打开，可后退:<br>  location.assign(url) =&gt; location.href=url  =&gt; location=url</li>
<li>在当前窗口打开，禁止后退:<br>  location.replace(url)</li>
<li>
<p>重新加载页面: 刷新: 2种:</p>
<ol>
<li>普通刷新:<br> 优先从浏览器本地缓冲获取资源:<br>  F5<br>  history.go(0)<br>  location.reload(/<em>false</em>/)</li>
<li>强制刷新:<br> 无论本地是否有缓存，总是强制从服务器获取资源<br>  location.reload(true)</li>
</ol>
</li>
</ol>
<h2 id="articleHeader5">5.定时器: 2种:</h2>
<ol><li>
<p>周期性定时器:<br> 什么是: 让程序每隔指定的时间间隔，反复执行一项任务<br> 何时: 只要让程序按照指定的时间间隔，自动执行一项任务<br> 如何: 3件事:<br>  1.任务函数: 让定时器反复执行的任务<br>  2.启动定时器: timer=setInterval(task, interval)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="让程序，每隔interval 毫秒自动执行一次task任务" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">让程序，每隔interval 毫秒自动执行一次<span class="hljs-keyword">task</span>任务</code></pre>
<p>3.停止定时器: clearInterval(timer)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timer: 定时器的序号, 在内存中唯一标识定时器的整数
 专门用于停止定时器
 如何获得: 只能在启动定时器时获得。
 何时: 只要一个定时器可能被停止，就要在启动时，先保存定时器序号
 好的习惯: 在clearInterval之后，手动清除timer中残留的序号: timer=null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code><span class="hljs-built_in">timer</span>: 定时器的序号, 在内存中唯一标识定时器的整数
 专门用于停止定时器
 如何获得: 只能在启动定时器时获得。
 何时: 只要一个定时器可能被停止，就要在启动时，先保存定时器序号
 好的习惯: 在clearInterval之后，手动清除<span class="hljs-built_in">timer</span>中残留的序号: <span class="hljs-built_in">timer</span>=<span class="hljs-literal">null</span>;</code></pre>
<p>停止定时器: 2种情况:</p>
<ol>
<li>用户手动停止:</li>
<li>定时器可自动停止: <br>  在任务函数中，设定临界值，如果没有达到临界值，则继续执行任务，否则，如果达到临界值，就自动调用clearInterval</li>
</ol>
</li></ol>
<p>2.一次性定时器: <br>  什么是: 让程序先等待一段时间，再执行一次任务。执行后，自动停止。<br>  何时: 只要让程序延迟执行一件事时<br>  如何: 3件事:<br>   1.task<br>   2.启动定时器: timer=setTimeout(task,wait)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 让程序等待wait毫秒后，自动执行一次task，执行后自动停止" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;"> 让程序等待<span class="hljs-keyword">wait</span>毫秒后，自动执行一次<span class="hljs-keyword">task</span>，执行后自动停止</code></pre>
<p>3.停止定时器: clearTimeout(timer)</p>
<h2 id="articleHeader6">6.定时器原理:</h2>
<p>定时器中的任务函数，必须等待主程序所有语句执行后，才能执行。</p>
<h2 id="articleHeader7">7.navigator:</h2>
<p>1.什么是: 保存浏览器配置信息的对象<br> 包括: <br>  .cookieEnabled: 判断当前浏览器是否启用cookie</p>
<p>2.什么是cookie: 在客户端持久存储用户私密数据的小文件<br>   为什么: 内存中所有数据都是临时的! 程序关闭，内存中一切变量都释放!<br>   何时: 只要希望在客户端持久保存数据，都用cookie<br>   .plugins: 包含浏览器所有插件信息的集合</p>
<p>3.什么是插件: 为浏览器添加新功能的小软件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如何判断是否安装指定插件: " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">如何判断是否安装指定插件: </code></pre>
<p>.userAgent: 保存浏览器名称和版本号的字符串<br>   何时: 只要判断浏览器名称和版本号</p>
<h2 id="articleHeader8">8.event:</h2>
<p>什么是事件: 人为触发的，或浏览器自动触发的页面内容状态的改变。<br> 什么是事件处理函数: 当事件发生时，自动执行的函数。<br> 如何绑定: 3种:</p>
<ol>
<li>在HTML中绑定: <br> 绑定: &lt;ANY on事件名="js语句"&gt;<br> 当事件发生时: 自动执行js语句<br> 问题: 不符合内容与行为分离的原则，不便于维护和重用<br> 但是: 在组件开发中，反而要求内容，行为和样式集中定义在一个小组件内，自成体系。</li>
<li>在js中绑定, 每个事件只能绑定一个处理函数: <br> ANY.on事件名=function(){ ... }<br> 当事件发生时: ANY.on事件名() //this-&gt;ANY<br> 问题: 用赋值方式绑定事件处理函数</li>
<li>在js中绑定，每个事件可绑定多个处理函数:<br> ANY.addEventListener('事件名',handler)<br>  在浏览器中为ANY元素的指定事件，添加一个事件监听对象。将事件监听对象加入到浏览器的监听队列中。<br>  触发事件时: 浏览器会遍历监听队列中的每个监听对象，找到触发事件元素上对应事件的监听对象，调用其处理函数<br> 移除事件监听:<br> ANY.removeEventListener('事件名',handler)<br> 说明: handler必须是绑定时使用的原函数对象<br> 强调: 如果一个处理函数，有可能被移除，则不能使用匿名函数绑定。应使用有名的函数绑定</li>
</ol>
<h2 id="articleHeader9">9.DOM事件模型:</h2>
<p>什么是: 从事件触发到处理函数执行，所经过的过程<br>  3个阶段:</p>
<ol>
<li>捕获capture: 由外向内，记录各级父元素上绑定的事件处理函数。——仅记录，不触发!</li>
<li>目标触发: 优先触发实际点击的元素上绑定的处理函数</li>
<li>冒泡执行: 由内向外，按捕获阶段记录的处理函数的倒序，依次执行父元素上的处理函数。</li>
</ol>
<h2 id="articleHeader10">10.事件对象:</h2>
<p>什么是: 当事件发生时，自动创建的，封装事件信息的对象<br>  何时: 只要希望获得事件信息，或修改事件的默认行为时<br>  如何获取: 事件对象默认总是以处理函数第一个参数，自动传入<br>  如何使用:</p>
<ol>
<li>取消冒泡: e.stopPropagation()</li>
<li>
<p>利用冒泡: <br> 优化: 尽量减少事件监听的个数<br>  为什么: 浏览器查找事件监听，采用的是遍历的方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     事件监听多，浏览器查找就慢" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">     事件监听多，浏览器查找就慢</code></pre>
<p>何时: 如果对多个子元素绑定相同事件时，都要利用冒泡<br>  如何: 只要在父元素绑定一次，所有子元素共用即可!<br>   2个难题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 获得目标元素:
  目标元素: 最初实际触发事件的当前元素
  如何获得: 
   错误: this->父元素
   正确: e.target
2. 筛选目标元素:
  比如: 通过nodeName, class, 内容。。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-number">1.</span> 获得目标元素:
  目标元素: 最初实际触发事件的当前元素
  如何获得: 
   错误: <span class="hljs-keyword">this</span>-&gt;父元素
   正确: e.target
<span class="hljs-number">2.</span> 筛选目标元素:
  比如: 通过nodeName, <span class="hljs-class"><span class="hljs-keyword">class</span>, <span class="hljs-type">内容。。。</span></span></code></pre>
</li>
<li>
<p>阻止默认行为: <br> 何时: 只要事件的默认行为不是想要的<br> 如何:  e.preventDefault();<br> 何时:</p>
<ol>
<li>用a当按钮时，a会自动向地址栏中添加#锚点地址。</li>
<li>提交表单时，如果验证没通过，可阻止提交<br> 自定义表单提交: <br>  input button + onclick + form.submit<br>  input submit + form.onsubmit事件 + e.preventDefault()</li>
<li>HTML5中拖拽API: 首先要阻止浏览器默认的拖拽行为</li>
</ol>
</li>
</ol>
<h2 id="articleHeader11">11.鼠标坐标: 3组:</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 相对于屏幕左上角: e.screenX,  e.screenY
2. 相对于文档显示区左上角: e.clientX,  e.clientY
3. 相对于当前元素左上角:  e.offsetX,   e.offsetY
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>. 相对于屏幕左上角: e<span class="hljs-selector-class">.screenX</span>,  e<span class="hljs-selector-class">.screenY</span>
<span class="hljs-number">2</span>. 相对于文档显示区左上角: e<span class="hljs-selector-class">.clientX</span>,  e<span class="hljs-selector-class">.clientY</span>
<span class="hljs-number">3</span>. 相对于当前元素左上角:  e<span class="hljs-selector-class">.offsetX</span>,   e<span class="hljs-selector-class">.offsetY</span>
</code></pre>
<h2 id="articleHeader12">12.页面滚动:</h2>
<p>事件: window.onscroll<br>  获得页面滚动过的高度: body顶部超出文档显示区顶部的距离</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollTop=document.documentElement.scrollTop
        ||document.body.scrollTop;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>scrollTop=<span class="hljs-built_in">document</span>.documentElement.scrollTop
        ||<span class="hljs-built_in">document</span>.body.scrollTop;</code></pre>
<p>滚动API: <br>  window.scrollTo(left, top)<br>  window.scrollBy(left的增量,top的增量)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——BOM

## 原文链接
[https://segmentfault.com/a/1190000013426834](https://segmentfault.com/a/1190000013426834)


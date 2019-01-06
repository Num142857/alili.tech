---
title: 'JS事件浅析' 
date: 2019-01-07 2:30:11
hidden: true
slug: gu5ytmacclt
categories: [reprint]
---

{{< raw >}}

                    
<p>一个网页由三层组成（html 结构，js 行为，css 表现），一切的东西其实都建立在html上，html里面的dom提供了一些事件，然后通过js封装，我们可以用js去调用dom上的事件。事件有很多，有我用过的有我没用过的，今天我想分析一番。</p>
<h2 id="articleHeader0">事件流</h2>
<p>我们都知道，有两种事件流，一个是冒泡一个是捕获。</p>
<p>捕获就是从body开始到你触发事件的节点，从外到内的一个过程。</p>
<p>冒泡呢，与之相反，从你触发的节点开始，一级一级往外，直到body，是一个从内到外的过程。</p>
<p>那么他们两个是同时进行的吗？他们的顺序是先捕获，再冒泡。</p>
<p>在addEventListener中addEventListener（event事件名称，function回调函数，是否在捕获或冒泡阶段执行）第三个参数可以改变事件触发时机。</p>
<h2 id="articleHeader1">事件对象 event</h2>
<p><code>div.onclick=function(event){}</code>这个里面的event就是事件对象，我这里说几个常用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.preventDefault() //阻止默认事件，表单提交，a标签。
event.stopPropagation() //阻止传递下去，一帮用在一些自定义组件上，比如遮罩隐藏，在弹框上就要阻止传递了。
event.target //触发事件的元素，事件委托会用到。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">event</span>.preventDefault() <span class="hljs-comment">//阻止默认事件，表单提交，a标签。</span>
<span class="hljs-keyword">event</span>.stopPropagation() <span class="hljs-comment">//阻止传递下去，一帮用在一些自定义组件上，比如遮罩隐藏，在弹框上就要阻止传递了。</span>
<span class="hljs-keyword">event</span>.target <span class="hljs-comment">//触发事件的元素，事件委托会用到。</span>
</code></pre>
<h2 id="articleHeader2">事件名称</h2>
<p>下面我会把事件列举一下</p>
<ul>
<li>
<p>通用事件</p>
<ul>
<li><p><code>load</code>   加载成功，window.load(function(){}),还有一个与之类似的<code>DOMContentLoad</code>当DOM加载完成之后触发。</p></li>
<li><p><code>unload</code> 与之相反，卸载的时候</p></li>
<li><p><code>error</code>  发送错误的时候，这个比较有意思。img触发error之后使用一张占位图。监听全局的错误提示，然后统计汇总，比如<a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">fundebug</a>，也可以自己根据特性写一个针对公司项目的。</p></li>
<li><p><code>scroll</code> 滚动的时候触发，无限滚动之类的一些效果</p></li>
<li><p><code>resize</code> 放大缩小窗口的时候发生变化，和上面的scroll都需要注意去抖，</p></li>
</ul>
</li>
<li>
<p>鼠标事件 <a href="http://jsrun.net/mFYKp" rel="nofollow noreferrer" target="_blank">传送门，去看鼠标事件</a></p>
<ul>
<li><p><code>click</code>  单击事件，在DOM上单击鼠标时候触发。用户在完成一次mousedown和mouseup之后触发click。触发顺序是：mousedown -&gt; mouseup -&gt; click。</p></li>
<li><p><code>mousedown</code>和<code>mouseup</code> 鼠标按下和弹起，使用频率不是很高。可以做一下拖动之类的效果。</p></li>
<li><p><code>mouseout</code>和<code>mouseover</code> 鼠标移出和移入，使用起来会有冒泡的问题，可以使用延时的方法解决</p></li>
<li><p><code>mouseleave</code>和<code>mouseenter</code> 鼠标移除和移除，解决了冒泡的问题。</p></li>
<li><p><code>mousemove</code> 鼠标移动</p></li>
</ul>
</li>
<li>
<p>键盘通用事件</p>
<ul>
<li><p><code>keydown</code>  按下键盘</p></li>
<li><p><code>keypress</code> 中间的一个事件</p></li>
<li><p><code>keyup</code>    抬起键盘</p></li>
<li><p><code>textInput</code> 是对keypress的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发textInput事件。</p></li>
<li><p><code>compositionstart</code> 在IME的文本复合系统打开时触发，表示要开始输入了。当你使用输入法的时候会触发一下</p></li>
<li><p><code>compositionupdate</code> 在向输入字段中插入新字符时触发。</p></li>
<li><p><code>compositionend</code> 在IME的文本复合系统关闭时触发，表示返回正常键盘的输入状态。</p></li>
</ul>
</li>
<li>
<p>控件事件</p>
<ul>
<li><p><code>input</code> 当内容发生改变的时触发，有可能是代码触发的改动兼容ie的话<code>input propertychange</code></p></li>
<li><p><code>change</code> 当失去焦点时，内容改变触发</p></li>
<li><p><code>blur</code> 失去焦点触发</p></li>
<li><p><code>focus</code> 获得焦点触发</p></li>
</ul>
</li>
<li>
<p>DOM变动事件<br> 这类事件我没有用到过，前段时间在网上看到了一些，整合一下写写测试<a href="http://jsrun.net/vFYKp" rel="nofollow noreferrer" target="_blank">测试地址</a></p>
<ul>
<li><p>DOMNodeInserted 插入节点时触发，appendChild这种</p></li>
<li><p>DOMNodeRemoved 移除节点时触发，removeChild</p></li>
<li><p>DOMSubtreeModified 发生变化最后会触发</p></li>
<li><p>DOMNodeInsertedIntoDocument</p></li>
<li><p>DOMAttrModified</p></li>
<li><p>DOMCharacterDataModified</p></li>
</ul>
</li>
<li>
<p>触摸事件 移动端</p>
<ul>
<li><p>touchstart 触摸</p></li>
<li><p>touchmove  触摸时移动</p></li>
<li><p>touchend   移开<br>  手势 gesturestart - gesturechange - gestureend</p></li>
</ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS事件浅析

## 原文链接
[https://segmentfault.com/a/1190000010321471](https://segmentfault.com/a/1190000010321471)


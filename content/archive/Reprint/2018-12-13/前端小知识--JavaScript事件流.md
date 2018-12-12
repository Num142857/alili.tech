---
title: '前端小知识--JavaScript事件流' 
date: 2018-12-13 2:30:07
hidden: true
slug: 67p8ta3ublw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">JavaScript事件流</h2>
<h2 id="articleHeader1">0.DOM级别与DOM事件</h2>
<blockquote>首先在介绍DOM事件之前我们先来认识下DOM的不同级别。针对不同级别的DOM，我们的DOM事件处理方式也是不一样的。<br>DOM级别一共可以分为4个级别：DOM0级，DOM1级，DOM2级和DOM3级，<br>而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。</blockquote>
<p>如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV3NgN?w=892&amp;h=405" src="https://static.alili.tech/img/bV3NgN?w=892&amp;h=405" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>其中1级DOM标准中并没有定义事件相关的内容，所以没有所谓的1级DOM事件模型。</p>
<h2 id="articleHeader2">1.事件</h2>
<blockquote>
<strong>事件</strong>指可以被 JavaScript 侦测到的行为。即鼠标点击、页面或图像载入、鼠标悬浮于页面的某个热点之上、在表单中选取输入框、确认表单、键盘按键等操作。事件通常与函数配合使用，当事件发生时函数才会执行。<br><strong>事件名称</strong>：click/mouseover/blur("不带on")<p>响应某个事件的函数就是<strong>事件处理程序</strong>(事件侦听器)。<br><strong>事件处理程序函数名称</strong>：onclick/onmouseove/onblur</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例子代码--点击事件触发alert函数
<button onclick=&quot;alert('hello')&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>例子代码--点击事件触发alert函数
&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onclick</span>=<span class="hljs-string">"alert('hello')"</span>&gt;&lt;/<span class="hljs-keyword">button</span>&gt;</code></pre>
<p>更多事件类别请参考w3c中关于事件的详细类别。<br><a href="http://www.w3school.com.cn/js/js_events.asp" rel="nofollow noreferrer" target="_blank">JavaScript 事件</a><br><a href="http://www.w3school.com.cn/jsref/jsref_events.asp" rel="nofollow noreferrer" target="_blank">JavaScript 事件参考手册</a></p>
<h2 id="articleHeader3">2.事件流</h2>
<blockquote>
<strong>事件流</strong>指从页面中接收事件的顺序,也可理解为事件在页面中传播的顺序。</blockquote>
<p>一点背景：<br>早期的IE事件传播方向为由上至下，即从document逐级向下传播到目标元素；<br>而Netscape公司的Netscape Navigator则是朝相反的方向传播，也就是从目标元素开始向上逐级传播最终至window。 两家公司对于事件流出现了截然相反的定义。</p>
<p>后来ECMAScript在DOM2中对事件流进行了进一步规范，基本上就是上述二者的结合。<br>当事件发生时，最先得到通知的是window，然后是document，由上至下逐级依次而入，直到真正触发事件的那个元素(目标元素)为止，这个过程就是捕获。<br>接下来，事件会从目标元素开始起泡，由下至上逐级依次传播，直到window对象为止，这个过程就是冒泡。<br>所以捕获比冒泡先执行。<br>其中DOM3级事件在DOM2的基础之上添加了更多的事件类型。</p>
<p>DOM2级事件规定的事件流包括三个阶段：<br>（1）事件捕获阶段（2）处于目标阶段（3）事件冒泡阶段。<br>下面图片来自：<a href="https://www.w3.org/TR/DOM-Level-3-Events/#event-flow" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/DOM-Lev...</a><br><span class="img-wrap"><img data-src="/img/bV3M80?w=964&amp;h=817" src="https://static.alili.tech/img/bV3M80?w=964&amp;h=817" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们写一个例子：如下图，中间白色区域的盒子分别为box1,box2...box6,包含控制按钮设置我们的事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div>
        <h4 id=&quot;currentBox&quot;>点击按钮设置类型后再点击中心</h4>
        <button class=&quot;btn&quot; id=&quot;btnCapture&quot; onclick=&quot;setCapture()&quot;>设置捕获</button>
        <button class=&quot;btn&quot; id=&quot;btnBubble&quot; onclick=&quot;setBubble()&quot;>设置冒泡</button>
        <button class=&quot;btn&quot; id=&quot;btnAll&quot; onclick=&quot;setAll()&quot;>设置捕获和冒泡</button>
        <button class=&quot;btn&quot; onclick=&quot;clearAll()&quot;>动画完成后再清除设置</button>
    </div>
    <div class=&quot;box&quot; id=&quot;box1&quot;>
        <div class=&quot;box&quot; id=&quot;box2&quot;>
            <div class=&quot;box&quot; id=&quot;box3&quot;>
                <div class=&quot;box&quot; id=&quot;box4&quot;>
                    <div class=&quot;box&quot; id=&quot;box5&quot;>
                        <div class=&quot;box&quot; id=&quot;box6&quot;>
                            点击

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>    &lt;<span class="hljs-keyword">div</span>&gt;
        &lt;h4 <span class="hljs-built_in">id</span>=<span class="hljs-string">"currentBox"</span>&gt;点击按钮设置类型后再点击中心&lt;/h4&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnCapture"</span> onclick=<span class="hljs-string">"setCapture()"</span>&gt;设置捕获&lt;/button&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnBubble"</span> onclick=<span class="hljs-string">"setBubble()"</span>&gt;设置冒泡&lt;/button&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"btnAll"</span> onclick=<span class="hljs-string">"setAll()"</span>&gt;设置捕获和冒泡&lt;/button&gt;
        &lt;button <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn"</span> onclick=<span class="hljs-string">"clearAll()"</span>&gt;动画完成后再清除设置&lt;/button&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box1"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box2"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box3"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box4"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box5"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"box6"</span>&gt;
                            点击

                        &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>大概流程图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV3Dl4?w=850&amp;h=706" src="https://static.alili.tech/img/bV3Dl4?w=850&amp;h=706" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>演示效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/bV3Djb?w=1518&amp;h=858" src="https://static.alili.tech/img/bV3Djb?w=1518&amp;h=858" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://github.com/JiaXinYi/ife-study/blob/master/%E5%89%8D%E7%AB%AF%E5%B0%8F%E7%9F%A5%E8%AF%86/eventflow.html" rel="nofollow noreferrer" target="_blank">例子源码</a><br><a href="http://www.cnblogs.com/souvenir/p/4988367.html" rel="nofollow noreferrer" target="_blank">参考链接————小侠同学</a></p>
<h2 id="articleHeader4">3.事件处理程序</h2>
<blockquote>前面我们已经说到了，事件处理程序就是响应某个事件的函数，简单地来说，就是函数。我们又把事件处理程序称为事件侦听器。事件处理程序是以"on"开头的，比如点击事件的处理程序是"onclick",事件处理程序大概有以下5种。</blockquote>
<ul>
<li>1.HTML事件处理程序</li>
<li>2.DOM0级事件处理程序</li>
<li>3.DOM2级事件处理程序</li>
<li>4.IE事件处理程序</li>
<li>5.跨浏览器的事件处理程序</li>
</ul>
<h3 id="articleHeader5">3.1 HTML事件处理程序</h3>
<p>像我们的第一个例子，就是HTML事件处理程序，它是写在html里面的，是全局作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例子代码--点击事件触发alert函数
<button onclick=&quot;alert('hello')&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>例子代码--点击事件触发alert函数
&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onclick</span>=<span class="hljs-string">"alert('hello')"</span>&gt;&lt;/<span class="hljs-keyword">button</span>&gt;</code></pre>
<p>当我们需要使用一个复杂的函数时，将js代码写在这里面，显然很不合适，所以有了下面这种写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="例子代码--点击事件触发doSomething()函数，这个函数写在单独的js文件或<script>之中。
<button onclick=&quot;doSomething()&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>例子代码--点击事件触发doSomething()函数，这个函数写在单独的js文件或<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">之中。
&lt;button onclick=<span class="hljs-string">"doSomething()"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span></code></pre>
<p>这样会出现一个时差问题，当用户在HTML元素出现一开始就进行点击，有可能js还没有加载好，这时候就会报错。但我们可以将函数封装在try-catch块中来处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;try{doSomething();}catch(err){}&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">button</span> <span class="hljs-keyword">onclick</span>=<span class="hljs-string">"try{doSomething();}catch(err){}"</span>&gt;&lt;/<span class="hljs-keyword">button</span>&gt;</code></pre>
<p>同时，一个函数的改变，同时可能会涉及html和js的修改，这样是很不方便的，综上，我们有了DOM0级事件处理程序。</p>
<h3 id="articleHeader6">3.2 DOM0级事件处理程序</h3>
<p>之所以有DOM0级事件处理程序，和我们之前提到的IE以及Netscape对应事件传播方向不同处理而产生的事件处理程序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.onclick=function(){
    alert(&quot;hello&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>可以看到button.onclick这种形式，这里事件处理程序作为了btn对象的方法，是局部作用域。<br>所以我们可以用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = null;来删除指定的事件处理程序。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">btn.onclick </span>= null<span class="hljs-comment">;来删除指定的事件处理程序。</span></code></pre>
<p>如果我们尝试给事件添加两个事件，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.onclick=function(){
    alert(&quot;hello&quot;);
  }
  btn.onclick=function(){
    alert(&quot;hello again&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
  btn.onclick=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello again"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>输出，hello again，很明显，第一个事件函数被第二个事件函数给覆盖掉了，所以，DOM0级事件处理程序不能添加多个，也不能控制事件流到底是捕获还是冒泡。</p>
<h3 id="articleHeader7">3.3 DOM2级事件处理程序（不支持IE）</h3>
<p>进一步规范之后，有了DOM2级事件处理程序，其中定义了两个方法：<br>addEventListener()   ---添加事件侦听器<br>removeEventListener()   ---删除事件侦听器<br>具体用法看<br>1.<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>2.<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>函数均有3个参数，<br>第一个参数是要处理的事件名(不带on前缀的才是事件名)<br>第二个参数是作为事件处理程序的函数<br>第三个参数是一个boolean值，默认false表示使用冒泡机制，true表示捕获机制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.addEventListener('click',hello，false);
  btn.addEventListener('click',helloagain，false);
  function hello(){
    alert(&quot;hello&quot;);
  }
  function helloagain(){
    alert(&quot;hello again&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.addEventListener(<span class="hljs-string">'click'</span>,hello，<span class="hljs-literal">false</span>);
  btn.addEventListener(<span class="hljs-string">'click'</span>,helloagain，<span class="hljs-literal">false</span>);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloagain</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello again"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这时候两个事件处理程序都能够成功触发，说明可以绑定多个事件处理程序，但是注意，如果定义了一摸一样时监听方法，是会发生覆盖的，即同样的事件和事件流机制下相同方法只会触发一次，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.addEventListener('click',hello，false);
  btn.addEventListener('click',hello，false);
  function hello(){
    alert(&quot;hello&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.addEventListener(<span class="hljs-string">'click'</span>,hello，<span class="hljs-literal">false</span>);
  btn.addEventListener(<span class="hljs-string">'click'</span>,hello，<span class="hljs-literal">false</span>);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>removeEventListener()的方法几乎和添加时用法一摸一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.addEventListener('click',hello，false);
  btn.removeEventListener('click',hello，false);
  function hello(){
    alert(&quot;hello&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.addEventListener(<span class="hljs-string">'click'</span>,hello，<span class="hljs-literal">false</span>);
  btn.removeEventListener(<span class="hljs-string">'click'</span>,hello，<span class="hljs-literal">false</span>);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样的话，事件处理程序只会执行一次。<br>但是要注意，如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。<br>这时候的this指向该元素的引用。<br>这里事件触发的顺序是添加的顺序。</p>
<h3 id="articleHeader8">3.4 IE事件处理程序</h3>
<p>对于 Internet Explorer 来说，在IE 9之前，你必须使用 attachEvent 而不是使用标准方法 addEventListener。<br>IE事件处理程序中有类似与DOM2级事件处理程序的两个方法：<br>1.attachEvent()<br>2.detachEvent()<br>它们都接收两个参数：<br>1.事件处理程序名称。如onclick、onmouseover，注意：这里不是事件，而是事件处理程序的名称，所以有on。<br>2.事件处理程序函数。<br>之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持冒泡事件流。<br>removeEventListener()的方法几乎和添加时用法一摸一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  btn.attachEvent('onclick',hello);
  btn.detachEvent('onclick',hello);
  function hello(){
    alert(&quot;hello&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  btn.attachEvent(<span class="hljs-string">'onclick'</span>,hello);
  btn.detachEvent(<span class="hljs-string">'onclick'</span>,hello);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里事件触发的顺序不是添加的顺序而是添加顺序的相反顺序。<br>使用 attachEvent 方法有个缺点，this 的值会变成 window 对象的引用而不是触发事件的元素。</p>
<h3 id="articleHeader9">3.5 跨浏览器的事件处理程序</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为了兼容IE浏览器和标准的浏览器，我们需要编写通用的方法来处理：
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent(&quot;on&quot; + type, handler);
        } else {
            element[&quot;on&quot; + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener()) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent(&quot;on&quot; + type, handler);
        } else {
            element[&quot;on&quot; + type] = null;
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>为了兼容IE浏览器和标准的浏览器，我们需要编写通用的方法来处理：
var EventUtil = {
    addHandler: <span class="hljs-keyword">function</span> (element, <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>) {</span>
        <span class="hljs-keyword">if</span> (element.addEventListener) {
            element.addEventListener(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>, <span class="hljs-title">false</span>);</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
            element.attachEvent(<span class="hljs-string">"on"</span> + <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>);</span>
        } <span class="hljs-keyword">else</span> {
            element[<span class="hljs-string">"on"</span> + <span class="hljs-class"><span class="hljs-keyword">type</span>] </span>= handler;
        }
    },
    removeHandler: <span class="hljs-keyword">function</span> (element, <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>) {</span>
        <span class="hljs-keyword">if</span> (element.removeEventListener()) {
            element.removeEventListener(<span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>, <span class="hljs-title">false</span>);</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.detachEvent) {
            element.detachEvent(<span class="hljs-string">"on"</span> + <span class="hljs-class"><span class="hljs-keyword">type</span>, <span class="hljs-title">handler</span>);</span>
        } <span class="hljs-keyword">else</span> {
            element[<span class="hljs-string">"on"</span> + <span class="hljs-class"><span class="hljs-keyword">type</span>] </span>= <span class="hljs-keyword">null</span>;
        }
    }
};</code></pre>
<p>这一部分需要创建两个方法：<br>addHandler()  --这个方法职责是视情况来使用DOM0级、DOM2级、IE事件处理程序来添加事件。<br>removeHandler()--这个方法就是移除使用addHandler添加的事件。<br>这两个方法接收相同的三个参数：<br>1.要操作的元素--通过dom方法获取<br>2.事件名称--注意：没有on，如"click"、"mouseover"<br>3.事件处理程序函数--对应的函数</p>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
  var btn=document.getElementById(&quot;btn&quot;);
  EventUtil.addHandler(btn,'click',hello);
  EventUtil.removeHandler(btn,'click',hello);
  function hello(){
    alert(&quot;hello&quot;);
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
  EventUtil.addHandler(btn,<span class="hljs-string">'click'</span>,hello);
  EventUtil.removeHandler(btn,<span class="hljs-string">'click'</span>,hello);
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"hello"</span>);
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader10">4.事件对象</h2>
<blockquote>事件对象是用来记录一些事件发生时的相关信息的对象，但事件对象只有事件发生时才会产生，并且只能是事件处理函数内部访问，在所有事件处理函数运行结束后，事件对象就被销毁！</blockquote>
<p>属性和方法如图，详细请查看以下链接：<br>1.HTML DOM Event 对象：<a href="http://www.w3school.com.cn/jsref/dom_obj_event.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/js...</a><br>2.详细介绍请查看：<a href="http://www.jb51.net/article/99099.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/9...</a><br><span class="img-wrap"><img data-src="/img/bV3Oft?w=1029&amp;h=745" src="https://static.alili.tech/img/bV3Oft?w=1029&amp;h=745" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">4.1 属性</h3>
<p>下面是一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点击</button>
 
<script>
        var btn=document.getElementById(&quot;btn&quot;);
        btn.ddEventListener('click', doCurrent, true);
        // 判断事件的属性
        function doCurrent(event) {
            //获取当前事件触发的div
            var target = event.currentTarget;

            //通过判断事件的event.eventPhase属性返回事件传播的当前阶段
            //1：捕获阶段、2：正常事件派发和3：起泡阶段。
            //得到当前阶段和id值并输出
            var msg = (event.eventPhase == 1 ? '捕获阶段：' : '冒泡阶段：')+ target.attributes[&quot;id&quot;].value;;
            console.log(msg);
        }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btn=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn"</span>);
        btn.ddEventListener(<span class="hljs-string">'click'</span>, doCurrent, <span class="hljs-literal">true</span>);
        <span class="hljs-comment">// 判断事件的属性</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doCurrent</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-comment">//获取当前事件触发的div</span>
            <span class="hljs-keyword">var</span> target = event.currentTarget;

            <span class="hljs-comment">//通过判断事件的event.eventPhase属性返回事件传播的当前阶段</span>
            <span class="hljs-comment">//1：捕获阶段、2：正常事件派发和3：起泡阶段。</span>
            <span class="hljs-comment">//得到当前阶段和id值并输出</span>
            <span class="hljs-keyword">var</span> msg = (event.eventPhase == <span class="hljs-number">1</span> ? <span class="hljs-string">'捕获阶段：'</span> : <span class="hljs-string">'冒泡阶段：'</span>)+ target.attributes[<span class="hljs-string">"id"</span>].value;;
            <span class="hljs-built_in">console</span>.log(msg);
        }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在这个例子里，我们用到了<strong>currentTarget</strong>、<strong>eventPhase </strong>属性。</p>
<h3 id="articleHeader12">4.2 方法</h3>
<p>Event对象主要有以下两个方法，用于处理事件的传播（冒泡、捕获）和事件的取消。<br><strong>stopPropagation()</strong>——冒泡机制下，阻止事件的进一步往上冒泡</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var btn1=document.getElementById(&quot;btn1&quot;);
    var content=document.getElementById(&quot;content&quot;);
    btn1.addEventListener(&quot;click&quot;,function(event){
        alert(&quot;btn1&quot;);
        event.stopPropagation();
    },false);
    content.addEventListener(&quot;click&quot;,function(){
        alert(&quot;content&quot;);
    },false);
    //这里会输出btn1，阻止了向content的冒泡" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> btn1=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"btn1"</span>);
    <span class="hljs-keyword">var</span> content=<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"content"</span>);
    btn1.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
        alert(<span class="hljs-string">"btn1"</span>);
        event.stopPropagation();
    },<span class="hljs-literal">false</span>);
    content.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">"content"</span>);
    },<span class="hljs-literal">false</span>);
    <span class="hljs-comment">//这里会输出btn1，阻止了向content的冒泡</span></code></pre>
<p><strong>preventDefault()</strong>——用于取消事件的默认操作,比如链接的跳转或者表单的提交，主要是用来阻止标签的默认行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a id=&quot;go&quot; href=&quot;https://www.baidu.com/&quot;>禁止跳转</a>
var go = document.getElementById('go');
function goFn(event) {
 event.preventDefault();
// 不会跳转
}
go.addEventListener('click', goFn, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>&lt;a id=<span class="hljs-string">"go"</span> href=<span class="hljs-string">"https://www.baidu.com/"</span>&gt;禁止跳转&lt;/a&gt;
<span class="hljs-keyword">var</span> go = document.getElementById(<span class="hljs-string">'go'</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">goFn</span><span class="hljs-params">(event)</span> </span>{
 event.preventDefault();
<span class="hljs-comment">// 不会跳转</span>
}
go.addEventListener(<span class="hljs-string">'click'</span>, goFn, <span class="hljs-literal">false</span>);</code></pre>
<h3 id="articleHeader13">4.3 兼容性</h3>
<p>当然，事件对象也存在一定的兼容性问题，在IE8及以前本版之中，通过设置属性注册事件处理程序时，调用的时候并未传递事件对象，需要通过全局对象window.event来获取。解决方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getEvent(event) {
 event = event || window.event;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function">function <span class="hljs-title">getEvent</span>(<span class="hljs-params"><span class="hljs-keyword">event</span></span>) </span>{
 <span class="hljs-keyword">event</span> = <span class="hljs-keyword">event</span> || window.<span class="hljs-keyword">event</span>;
}</code></pre>
<p>在IE浏览器上面是event事件是没有preventDefault()这个属性的，所以在IE上，我们需要设置的属性是returnValue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.event.returnValue=false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">window<span class="hljs-selector-class">.event</span><span class="hljs-selector-class">.returnValue</span>=false</code></pre>
<p>stopPropagation()也是，所以需要设置cancelBubble，cancelBubble是IE事件对象的一个属性，设置这个属性为true能阻止事件进一步传播。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="event.cancelBubble=true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">event</span>.cancelBubble=<span class="hljs-literal">true</span></code></pre>
<h2 id="articleHeader14">5.事件委托</h2>
<blockquote>事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。</blockquote>
<p>例子说明，我们为ul添加新的li，其中对li标签元素绑定了click事件，但是发现，后增加的元素没有办法触发我们的click事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <button id=&quot;btnAdd&quot;>添加</button>
    <ul id=&quot;ulList&quot;>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var btnAdd = document.getElementById('btnAdd');
        var ulList = document.getElementById('ulList');
        var list = document.getElementsByTagName('li');
        var num = 3;
        btnAdd.onclick = function () {
            num++;
            var li = document.createElement('li');
            li.innerHTML = num;
            ulList.appendChild(li)
        }
        for (i = 0; i < list.length; i++) {
            list[i].onclick = function(){
                alert(this.innerHTML);
            }
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btnAdd"</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ulList"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btnAdd = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btnAdd'</span>);
        <span class="hljs-keyword">var</span> ulList = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ulList'</span>);
        <span class="hljs-keyword">var</span> list = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'li'</span>);
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">3</span>;
        btnAdd.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            num++;
            <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
            li.innerHTML = num;
            ulList.appendChild(li)
        }
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; list.length; i++) {
            list[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                alert(<span class="hljs-keyword">this</span>.innerHTML);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3O5F?w=1390&amp;h=864" src="https://static.alili.tech/img/bV3O5F?w=1390&amp;h=864" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这是因为如果事件涉及到更新HTML节点或者添加HTML节点时，新添加的节点无法绑定事件，更新的节点也是无法绑定事件，表现的行为是无法触发事件。<br>其中一种解决方法是，添加子节点的时候，再次为其添加监听事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <button id=&quot;btnAdd&quot;>添加</button>
    <ul id=&quot;ulList&quot;>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var btnAdd = document.getElementById('btnAdd');
        var ulList = document.getElementById('ulList');
        var list = document.getElementsByTagName('li');
        var num = 3;

        function doclick() {
            for (i = 0; i < list.length; i++) {
                list[i].onclick = function () {
                    alert(this.innerHTML);
                }
            }
        }
        doclick();


        btnAdd.onclick = function () {
            num++;
            var li = document.createElement('li');
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btnAdd"</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ulList"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btnAdd = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btnAdd'</span>);
        <span class="hljs-keyword">var</span> ulList = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ulList'</span>);
        <span class="hljs-keyword">var</span> list = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'li'</span>);
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">3</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doclick</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; list.length; i++) {
                list[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    alert(<span class="hljs-keyword">this</span>.innerHTML);
                }
            }
        }
        doclick();


        btnAdd.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            num++;
            <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这也是问题所在：<br>　1.首先我们多次操作DOM获取元素，这样势必会降低浏览器处理性能<br>　2.事件不具有继承性，如果我们动态在页面中添加了一个元素，那么还需要重新走一遍上述程序为其添加监听事件</p>
<p>那么有没有更好的方法呢？根据事件的冒泡原理，我们还可以实现另外一个很重要的功能：<strong>事件委托</strong>。</p>
<p>我们只监听最外层的元素，然后在事件函数中根据事件来源进行不同的事件处理。这样，我们添加事件监听时只需要操作一个元素，极大的降低了DOM访问，并且不用再给新增的元素添加监听事件了，因为元素的事件会冒泡到最外层，被我们截获。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <button id=&quot;btnAdd&quot;>添加</button>
    <ul id=&quot;ulList&quot;>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var btnAdd = document.getElementById('btnAdd');
        var ulList = document.getElementById('ulList');
        var num = 3;

        ulList.onclick = function(event){
            var event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.nodeName.toLowerCase() == 'li'){
                alert(target.innerHTML);
            }
        }

        btnAdd.onclick = function () {
            num++;
            var li = document.createElement('li');
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btnAdd"</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ulList"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> btnAdd = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btnAdd'</span>);
        <span class="hljs-keyword">var</span> ulList = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ulList'</span>);
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">3</span>;

        ulList.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
            <span class="hljs-keyword">var</span> event = event || <span class="hljs-built_in">window</span>.event;
            <span class="hljs-keyword">var</span> target = event.target || event.srcElement;
            <span class="hljs-keyword">if</span>(target.nodeName.toLowerCase() == <span class="hljs-string">'li'</span>){
                alert(target.innerHTML);
            }
        }

        btnAdd.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            num++;
            <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
            li.innerHTML = num;
            ulList.appendChild(li);
            doclick();
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，当然，这里当点击ul的时候，也是会触发的，所以要判断点击的对象到底是不是li标签元素。</p>
<p>Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较（习惯问题）。</p>
<p>这样，我们就实现了我们的事件委托，当然，不是所有的事件都是可以委托的。<br>适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。</p>
<p>当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，新增加的节点也可以触发事件效果。</p>
<p>参考：<br>1.<a href="http://www.cnblogs.com/souvenir/p/4988367.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/souven...</a><br>2.<a href="https://www.cnblogs.com/st-leslie/p/5907556.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/st-le...</a><br>3.<a href="https://segmentfault.com/a/1190000003497939">https://segmentfault.com/a/11...</a><br>4.<a href="http://www.jb51.net/article/99317.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/9...</a><br>5.<a href="http://www.w3school.com.cn/jsref/dom_obj_event.asp" rel="nofollow noreferrer" target="_blank">http://www.w3school.com.cn/js...</a><br>6.<a href="http://www.jb51.net/article/83052.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/8...</a><br>7.<a href="http://www.jb51.net/article/99094.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/9...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端小知识--JavaScript事件流

## 原文链接
[https://segmentfault.com/a/1190000013265547](https://segmentfault.com/a/1190000013265547)


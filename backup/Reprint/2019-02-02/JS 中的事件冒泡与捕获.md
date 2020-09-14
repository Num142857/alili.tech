---
title: 'JS 中的事件冒泡与捕获' 
date: 2019-02-02 2:30:10
hidden: true
slug: aa689xb61kr
categories: [reprint]
---

{{< raw >}}

                    
<p>刚接触 JS 的那个时候，啥也不懂，只想着如何利用 Google、百度到的函数来解决实际的问题，不会想到去一探究竟。</p>
<p>渐渐的，对 JS 的语言的不断深入，有机会去了解一些原理性东西。最近在看 JQuery 源码，感触很多，总想着用原生的 JS 去实现自己的一个 JQuery 库。说实在的，JQuery 里面很多函数和思路，是千百开源工作者长期的贡献，哪能是短时间就能消化的了。</p>
<p>最近再次碰到 <code>addEventListener</code>函数(MDN 上关于 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer" target="_blank">addEventListener</a> 的介绍，很详细)，由于之前并没有弄懂第三个参数的含义，要么默认值，要么手动设置成 false。这次看了不少文章，彻底把事件冒泡和捕获弄懂。</p>
<h2 id="articleHeader0">什么事件冒泡与捕获</h2>
<p>事件冒泡与捕获是 DOM 中事件传播的两种方式，比如说对于注册了相同事件的两个 DOM 元素(简单点就是两个 div，一里一外)，当点击里层 div 的时候，这两个事件谁先执行。</p>
<p><strong>冒泡事件</strong>，由里向外，最里层的元素先执行，然后冒泡到外层。</p>
<p><strong>捕获事件</strong>，由外向里，最外层的元素先执行，然后传递到内部。</p>
<p>在 IE 9 之前是只支持事件冒泡，IE 9(包括 IE 9) 之后和目前主流的浏览器都同时支持两种事件。</p>
<p>如何设置，只需修改 <code>addEventListener</code>的第三个参数，true 为捕获，false 为冒泡，默认为冒泡。</p>
<p>举个简单的例子，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <span class=&quot;out&quot;>
    <span class=&quot;in&quot;></span>
  </span>
</div>
<script type=&quot;text/javascript&quot;>
  var dom_out = document.getElementsByClassName('out')[0];
  var dom_in = document.getElementsByClassName('in')[0];
  dom_out.addEventListener('click',function(){
    alert('out');
  },false);
  dom_in.addEventListener('click',function(){
    alert('in');
  },false);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"out"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> dom_out = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'out'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> dom_in = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'in'</span>)[<span class="hljs-number">0</span>];
  dom_out.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'out'</span>);
  },<span class="hljs-literal">false</span>);
  dom_in.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'in'</span>);
  },<span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEmdc?w=157&amp;h=123" src="https://static.alili.tech/img/bVEmdc?w=157&amp;h=123" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在上面这个例子中，事件是按照冒泡来执行的，点击里层的 <code>in</code>，会看到先 <code>alert</code> 的顺序是先 "in" 后 "out"，如果把事件改成捕获，<code>alert</code> 的顺序又不一样了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
  var dom_out = document.getElementsByClassName('out')[0];
  var dom_in = document.getElementsByClassName('in')[0];
  dom_out.addEventListener('click',function(){
    alert('out');
  },true);
  dom_in.addEventListener('click',function(){
    alert('in');
  },true);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> dom_out = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'out'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> dom_in = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'in'</span>)[<span class="hljs-number">0</span>];
  dom_out.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'out'</span>);
  },<span class="hljs-literal">true</span>);
  dom_in.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'in'</span>);
  },<span class="hljs-literal">true</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEmdk?w=175&amp;h=125" src="https://static.alili.tech/img/bVEmdk?w=175&amp;h=125" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上面这个例子是捕获事件的例子，点击 <code>in</code>效果是不是不一样呢？</p>
<p>之所以会有冒泡和捕获事件(像 IE 9 之前的浏览器不支持捕获事件，还真是反程序员)，毕竟在实际中处理事情肯定有个先后顺序，要么由里向外，要么由外向里，两者都是必须的。</p>
<p>但有时候为了兼容 IE 9 以下版本的浏览器，都会把第三个参数设置成 false 或者默认(默认就是 false)。</p>
<h2 id="articleHeader1">进一步理解冒泡和捕获</h2>
<p>现在已经说清楚冒泡和捕获，那么如果同时出现冒泡和捕获会出现什么结果？</p>
<p>原来浏览器处理时间分为两个阶段，捕获阶段和冒泡阶段，</p>
<ul>
<li><p>先执行捕获阶段，如果事件是在捕获阶段执行的(true 情况)，则执行；</p></li>
<li><p>然后是冒泡阶段，如果事件是在冒泡阶段执行的(false 情况)，则执行；</p></li>
</ul>
<p>来看一看例子就知道了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <span class=&quot;s1&quot;>s1
    <span class=&quot;s2&quot;>s2
      <span class=&quot;s3&quot;>s3
      </span>
    </span>
  </span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s1"</span>&gt;</span>s1
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s2"</span>&gt;</span>s2
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"s3"</span>&gt;</span>s3
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这次我们设置三个 span，分别是 s1, s2, s3，然后设置 s1，s3 为冒泡执行，s2 为捕获执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
  var s1 = document.getElementsByClassName('s1')[0];
  var s2 = document.getElementsByClassName('s2')[0];
  var s3 = document.getElementsByClassName('s3')[0];
  s1.addEventListener('click',function(){
    alert('s1');
  },false);
  s2.addEventListener('click',function(){
    alert('s2');
  },true);
  s3.addEventListener('click',function(){
    alert('s3');
  },false);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> s1 = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'s1'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> s2 = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'s2'</span>)[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">var</span> s3 = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'s3'</span>)[<span class="hljs-number">0</span>];
  s1.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'s1'</span>);
  },<span class="hljs-literal">false</span>);
  s2.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'s2'</span>);
  },<span class="hljs-literal">true</span>);
  s3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">'s3'</span>);
  },<span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEmdq?w=225&amp;h=172" src="https://static.alili.tech/img/bVEmdq?w=225&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从运行的效果来看，点击 s3，依次 <code>alert</code> s2 =&gt; s3 =&gt; s1，说明：</p>
<ul>
<li><p>捕获事件和冒泡事件同时存在的，而且捕获事件先执行，冒泡事件后执行；</p></li>
<li><p>如果元素存在事件且事件的执行时间与当前逻辑一致(冒泡或捕获)，则执行。</p></li>
</ul>
<h2 id="articleHeader2">默认事件取消与停止冒泡</h2>
<p>当然，有时候我们只想执行最内层或最外层的事件，根据内外层关系来把范围更广的事件取消掉(对于新手来说，不取消冒泡，很容易中招的出现 bug)。<code>event.stopPropagation()</code>(IE 中<code>window.event.cancelBubble = true</code>)可以用来取消事件冒泡。</p>
<p>有时候对于浏览器的默认事件也需要取消，这时候用到的函数则是 <code>event.preventDefault()</code>(IE 中<code>window.event.returnValue = false</code>)。</p>
<p><strong>那么默认事件取消和停止冒泡有什么区别呢？</strong>我的理解：浏览器的默认事件是指浏览器自己的事件(这不废话吗)，比如 <code>a 标签</code> 的点击，表单的提交等，取消掉就不会执行啦；冒泡则取消的是由外向里(捕获)、由里向外(冒泡)，stop 之后，就不会继续遍历了。stackoverflow 上的<a href="http://stackoverflow.com/questions/5963669/whats-the-difference-between-event-stoppropagation-and-event-preventdefault" rel="nofollow noreferrer" target="_blank">解答</a></p>
<p>看下例子，依旧是上面那个例子，不过每个函数都加了 停止冒泡：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s1.addEventListener('click',function(e){
  e.stopPropagation();
  alert('s1');
},false);
s2.addEventListener('click',function(e){
  e.stopPropagation();
  alert('s2');
},true);
s3.addEventListener('click',function(e){
  e.stopPropagation();
  alert('s3');
},false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">s1.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e.stopPropagation();
  alert(<span class="hljs-string">'s1'</span>);
},<span class="hljs-literal">false</span>);
s2.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e.stopPropagation();
  alert(<span class="hljs-string">'s2'</span>);
},<span class="hljs-literal">true</span>);
s3.addEventListener(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  e.stopPropagation();
  alert(<span class="hljs-string">'s3'</span>);
},<span class="hljs-literal">false</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEmdy?w=226&amp;h=168" src="https://static.alili.tech/img/bVEmdy?w=226&amp;h=168" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击的结果是：当点击 s2 或 s3 的时候，都会 <code>alert</code> s2，点击 s1，弹出 s1。因为事件被取消的缘故，点击 s3，执行 s2后就不会在向下执行了。</p>
<p>在看一个 <code>preventDefault</code> 的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <a href=&quot;/&quot;>点我回主页</a>
</div>
<div>
  <a href=&quot;/&quot; class=&quot;back&quot;>点我不回主页</a>
</div>
<script type=&quot;text/javascript&quot;>
  var back = document.getElementsByClassName('back')[0];
  back.addEventListener('click', function(e){
    e.preventDefault();
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>点我回主页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"back"</span>&gt;</span>点我不回主页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> back = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'back'</span>)[<span class="hljs-number">0</span>];
  back.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    e.preventDefault();
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVEmdA?w=143&amp;h=86" src="https://static.alili.tech/img/bVEmdA?w=143&amp;h=86" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>第二个链接是不是回不了主页，因为浏览器的默认事件被取消了。</p>
<p><del>以上所有例子请在非低版本 IE 浏览器的环境下浏览</del> O_o</p>
<h2 id="articleHeader3">总结</h2>
<p>总结就补充两个兼容 IE 的函数吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stopBubble(e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if ( e &amp;&amp; e.stopPropagation )
      //因此它支持W3C的stopPropagation()方法
      e.stopPropagation();
  else
      //否则，我们需要使用IE的方式来取消事件冒泡
      window.event.cancelBubble = true;
}
//阻止浏览器的默认行为
function stopDefault( e ) {
  //阻止默认浏览器动作(W3C)
  if ( e &amp;&amp; e.preventDefault )
      e.preventDefault();
  //IE中阻止函数器默认动作的方式
  else
      window.event.returnValue = false;
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopBubble</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-comment">//如果提供了事件对象，则这是一个非IE浏览器</span>
  <span class="hljs-keyword">if</span> ( e &amp;&amp; e.stopPropagation )
      <span class="hljs-comment">//因此它支持W3C的stopPropagation()方法</span>
      e.stopPropagation();
  <span class="hljs-keyword">else</span>
      <span class="hljs-comment">//否则，我们需要使用IE的方式来取消事件冒泡</span>
      <span class="hljs-built_in">window</span>.event.cancelBubble = <span class="hljs-literal">true</span>;
}
<span class="hljs-comment">//阻止浏览器的默认行为</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stopDefault</span>(<span class="hljs-params"> e </span>) </span>{
  <span class="hljs-comment">//阻止默认浏览器动作(W3C)</span>
  <span class="hljs-keyword">if</span> ( e &amp;&amp; e.preventDefault )
      e.preventDefault();
  <span class="hljs-comment">//IE中阻止函数器默认动作的方式</span>
  <span class="hljs-keyword">else</span>
      <span class="hljs-built_in">window</span>.event.returnValue = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<p>共勉！</p>
<h3 id="articleHeader4">参考</h3>
<blockquote><p><a href="http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing" rel="nofollow noreferrer" target="_blank">stackoverflow 什么是事件冒泡和捕捉</a><br><a href="http://stackoverflow.com/questions/5963669/whats-the-difference-between-event-stoppropagation-and-event-preventdefault" rel="nofollow noreferrer" target="_blank">stackoverflow stopPropagation 和 preventDefault 的区别</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer" target="_blank">MDN addEventListener</a><br><a href="http://www.aspxhome.com/javascript/skills/200712/262128.htm" rel="nofollow noreferrer" target="_blank">javascript阻止事件冒泡和浏览器的默认行为</a></p></blockquote>
<p>由于 SF 编辑器不支持上传 demo，只能以图片展示，欢迎来 <a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">我的博客</a> 查看 demo。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 中的事件冒泡与捕获

## 原文链接
[https://segmentfault.com/a/1190000007196129](https://segmentfault.com/a/1190000007196129)


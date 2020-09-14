---
title: '关于修改DOM是异步还是同步的问题' 
date: 2019-02-08 2:30:41
hidden: true
slug: lrtc8swue1h
categories: [reprint]
---

{{< raw >}}

                    
<p>回 <a href="/u/bf">@bf</a>  同学 </p>
<p>本篇文章不是笔记也不是心得，而是关于一个问题的讨论，问题最初出现于<a href="https://segmentfault.com/q/1010000005630545?_ea=903562">https://segmentfault.com/q/1010000005630545?_ea=903562</a></p>
<p>由于 <a href="/u/bf">@bf</a>  同学不方便加QQ/微信，而这个问题又比较大，在问答评论里不好描述清楚，so，趁着周末专门写了一篇文章来回应 <a href="/u/bf">@bf</a> 同学</p>
<p><a href="/u/bf">@bf</a> 同学，提到了一个观点：<strong>对DOM的修改永远是异步的</strong></p>
<p>当时就震惊到我了（可能技术不达标，少见多怪的缘故，哈哈）</p>
<p>说实话，干了好几年开发，第一次明确地听到有人这样说，根据自己看的书及一些javascript编程经验来说，起初我认为是错误的。</p>
<p>然后看了看 <a href="/u/bf">@bf</a> 同学的回复，能自圆其说，还说的头头是道，所以我真的以为<strong>对DOM的修改永远是异步的</strong>是正确的。然后怀着震惊的心情（因为跟经验相违背），还写了一篇博客记录<a href="http://www.liyanshan.com/2016/06/09/%E5%AF%B9DOM%E7%9A%84%E4%BF%AE%E6%94%B9%E6%B0%B8%E8%BF%9C%E9%83%BD%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84/" rel="nofollow noreferrer" target="_blank">http://www.liyanshan.com/2016/06/09/%E5%AF%B9DOM%E7%9A%84%E4%BF%AE%E6%94%B9%E6%B0%B8%E8%BF%9C%E9%83%BD%E6%98%AF%E5%BC%82%E6%AD%A5%E7%9A%84/</a></p>
<p>经过这么些天的发酵和消化，觉得对这个观点又回到了最初的认识（即这个观点是错的）。</p>
<p>还请 <a href="/u/bf">@bf</a> 同学跟我多多探讨 ！</p>
<p>关于javascript修改dom是异步还是同步的问题：</p>
<p>先来看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li id=&quot;i0&quot;></li>
    <li id=&quot;i1&quot;></li>
    <li id=&quot;i2&quot;></li>
    <li id=&quot;i3&quot;></li>
    <li id=&quot;i4&quot;></li>
</ul>
<ul id=&quot;newEle&quot;></ul>

<script>
 for(var i = 0;i<5;i++){
    var item = document.getElementById('i'+i);
    item.innerHTML = i;
 }
 var newEle = document.getElementById('newEle');
 for(i=0;i<5;i++){
    var li = document.createElement(&quot;li&quot;);
    li.innerHTML = i;
    newEle.appendChild(li);
 }
</script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"i0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"i1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"i2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"i3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"i4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"newEle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt;<span class="hljs-number">5</span>;i++){
    <span class="hljs-keyword">var</span> item = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'i'</span>+i);
    item.innerHTML = i;
 }
 <span class="hljs-keyword">var</span> newEle = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'newEle'</span>);
 <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">5</span>;i++){
    <span class="hljs-keyword">var</span> li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"li"</span>);
    li.innerHTML = i;
    newEle.appendChild(li);
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  </code></pre>
<p>上述代码的结果完全就是同步的表现，如果是异步的话，毫无疑问，第一个ul下的li每个内容都应该是5，第二个也应该是5。</p>
<p>这是数学中的反证法。即一个命题，哪怕我找出一个特例（何况我能找出很多例子）能推翻这个命题，那么这个命题就不成立。</p>
<p><a href="/u/bf">@bf</a> 同学可能会说了，他也用反证法，比如script标签的加载，来证明<strong>DOM修改是异步的</strong></p>
<p>但是这个特例的问题在于：</p>
<p><strong>把下载的异步性当成了DOM修改的异步性</strong></p>
<p>script标签加载是异步的，因为要走网络（比如走网络的ajax和图片下载等都是异步的，当然ajax也可以写成同步的），也就是说，浏览器开了一个线程下载要用的script，但是马上返回（交给HTTP请求线程就不管了，请求结束，请求线程会把结果放入事件队列里），接着执行或下载其他部分。其实这个问题我在引起这个讨论的问题上已经回答了（可能回答的没有那么清楚）。</p>
<p>然后又陆陆续续地看了一些书，查了一些资料，问了一些大牛，越来越坚信<strong>DOM修改是同步的</strong></p>
<blockquote><p>JavaScript异步编程第一章 - 异步的I/O函数（1.2.1）</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVyvPL" src="https://static.alili.tech/img/bVyvPL" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个也符合我最初跟 <a href="/u/bf">@bf</a> 同学的解释：修改DOM是同步的，但是渲染是异步的。因为JavaScript引擎线程跟GUI渲染线程是互斥的，即<strong>我执行的时候，你就靠边站，我执行完你才能执行</strong></p>
<p>详见我2014年写的一篇关于异步的文章（当时就是记录一下心得与笔记，也不会自己搭博客，也不会MD，所以请 <a href="/u/bf">@bf</a> 同学凑合看）<a href="http://blog.sina.com.cn/s/blog_6fd55a970102v64x.html" rel="nofollow noreferrer" target="_blank">http://blog.sina.com.cn/s/blog_6fd55a970102v64x.html</a></p>
<blockquote><p>在群里提问</p></blockquote>
<p>这个其实就相当于回答了js是同步修改的。。因为这是三个异步函数！</p>
<p><span class="img-wrap"><img data-src="/img/bVyvPV" src="https://static.alili.tech/img/bVyvPV" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>而 <a href="/u/bf">@bf</a> 同学在后面的回复中，提到了一篇文章<a href="https://leozdgao.me/why-dom-slow/" rel="nofollow noreferrer" target="_blank">https://leozdgao.me/why-dom-slow/</a>，额，我看了看这篇文章，发现其实我今年年初就看过了，当时貌似是用<code>浏览器重排和重绘</code>搜索到的。。</p>
<p>这篇文章主要是讲 重排和重绘及性能优化一类的知识。</p>
<p><a href="/u/bf">@bf</a> 同学可能受到这句话的影响：</p>
<blockquote><p>一般情况下，浏览器的layout是lazy的，也就是说：在js脚本执行时，是不会去更新DOM的，任何对DOM的修改都会被暂存在一个队列中，在当前js的执行上下文完成执行后，会根据这个队列中的修改，进行一次layout。</p></blockquote>
<p>这个其实说明不了<strong>修改DOM永远是异步的</strong>，这个是JavaScript引擎实现层面上的知识，是对js修改DOM的优化，它放入的队列其实不是<code>事件队列</code>，如果放到了<code>事件队列</code>中，才是异步的。。C++实现一个队列是何其简单啊！js实现队列更简单！只是实现层面的东西，对程序猿都是透明的。。所以没啥可说的。只能帮助我们理解重排和重绘的机制，而不能得出<strong>修改DOM永远是异步的</strong>结论。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于修改DOM是异步还是同步的问题

## 原文链接
[https://segmentfault.com/a/1190000005803237](https://segmentfault.com/a/1190000005803237)


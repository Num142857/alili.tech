---
title: Event Loop 其实也就这点事
hidden: true
categories: reprint
slug: 956c5598
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<p>前段时间在网上陆续看了很多关于 Event loop 的文章，看完也就混个眼熟，可能内心深处对这种偏原理的知识有一些抵触心情，看完后也都没有去深入理解。最近在看 Vue 的源码，在读到关于 nextTick 的实现时，总有一种似曾相识的感觉，于是去网上查了下资料，原来 nextTick 的实现正是基于 Event loop 机制（引起重视了）。  <br>Anyway，在翻阅了一些资料以后，将我对 Event loop 的理解记录下来，爱看不看。</p>
<h2 id="articleHeader0">Call Stack</h2>
<p>众所周知，JavaScript 是 one-threaded，也就意味着在执行 JavaScript 的过程中，是 <strong>One thing at a time</strong>，而这样的特性，正是由一个叫 Call Stack 的东西决定的（有且仅有一个）。  <br>既然是栈，就满足 FILO 的原则。故 Call Stack 在函数运行时的表现为：</p>
<ul>
<li>当有函数执行时，该函数被 push 到 Call Stack</li>
<li>当函数执行结束时，该函数从 Call Stack 内被 pop 出</li>
<li>如果函数内有调用到其他函数（执行结束前），则将其他函数再 push 到 Call Stack 中，等到调用结束时 pop 出</li>
</ul>
<p>由此可见，如果一个函数定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dead = () => {
    return dead();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> dead = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> dead();
}</code></pre>
<p>那么当其被执行时，就会向 Call Stack 中不断的 push 同一个函数（dead），导致整个页面挂掉。</p>
<h2 id="articleHeader1">When Call Stack Meets Sync Request</h2>
<p>众所又周知了，在 jQuery 提供的 Ajax 函数中，可供开发者选择请求是 sync 还是 async，我们先讨论 Call Stack 遇到 sync 请求时会发生什么。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const name = $.ajaxSync(URL_1);
const info = $.ajaxSync(URL_2);
const work = $.ajaxSync(URL_3);

console.log(name);
console.log(info);
console.log(work);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> name = $.ajaxSync(URL_1);
<span class="hljs-keyword">const</span> info = $.ajaxSync(URL_2);
<span class="hljs-keyword">const</span> work = $.ajaxSync(URL_3);

<span class="hljs-built_in">console</span>.log(name);
<span class="hljs-built_in">console</span>.log(info);
<span class="hljs-built_in">console</span>.log(work);</code></pre>
<p>屋漏偏逢连阴雨，此时的网络状态又极差，每一个网络请求从发出到成功要经历五秒，想象一下上面这段代码如果跑起来了，会发生什么？  <br>这是一件让人绝望的事情：  <br>随着程序的推进，ajaxSync 函数会先后三次被 push 并 pop 出 Call Stack，而每一次从 push 到 pop 的过程需要耗费五秒钟的时间。  <br>无论从工程效率还是用户体验的角度来说，这都是不被允许的一件事情。</p>
<h2 id="articleHeader2">Async &amp; Callback</h2>
<p>为了杜绝上面的问题，浏览器提供给了开发者一个叫做异步 + Callback 的解决方案。先看一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('kyrieliu');

setTimeout(function(){
    console.log('about Event Loop');
}, 5000);

console.log(' is writing an article ');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'kyrieliu'</span>);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'about Event Loop'</span>);
}, <span class="hljs-number">5000</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">' is writing an article '</span>);</code></pre>
<p>运行结果显而易见。  <br>ok，那么这段代码在 Call Stack 中的表现又是怎样的呢？  <br>基于上面文章所述，我推测：  <br>首先，第一行代码入栈，执行完毕后出栈；紧接着，setTimeout 入栈，然后emmm，事情有点不对劲了：如果 setTimeout 入栈执行后立刻出栈，那么它内部的 console 为什么五秒后才打印出来？</p>
<h2 id="articleHeader3">Task Queue</h2>
<p>问题的关键，是一个叫做 <strong>Task Queue</strong> 的东西。  <br>紧接着刚才的步骤：setTimeout入栈后执行并触发了一个五秒的 timer，这个 timer 由 Web api 维护，至此，setTimeout执行完毕并出栈，第三个 console 入栈执行并出栈。五秒后，timer 结束计时，将回调函数 callback 下放到 task queue 中。  <br>但 callback 还未执行，它什么时候执行呢？<strong>Call Stack 为空的时候。</strong>  <br>此时的 call stack 已经为空，所以 callback 被 push 进栈执行并 pop 出，这样一来就解释得通了。 <br>至此，正式引出 Event Loop 的概念。</p>
<h2 id="articleHeader4">Event Loop</h2>
<p><strong>If the call stack is clear and there's something in the task queue, push the first thing on the queue onto the stack.</strong></p>
<h2 id="articleHeader5">setTimeout(callback, 0)</h2>
<p>在最开始接触 JavaScript 的时候，看到上面这行代码的我是懵蔽的，0ms 后执行 callback， WTF?  <br>在了解了 Event Loop 的运行机制后，再回过头来尝试解释一下这行代码，即：在 setTimeout 入栈执行时，内部的 callback 会立即被下放到 task queue 中，但它无法执行，因为此时的 call stack 不为空，等到 call stack 为空时，callback 才得以执行。</p>
<h2 id="articleHeader6">Thanks</h2>
<ul>
<li><a href="https://vimeo.com/96425312" rel="nofollow noreferrer" target="_blank">Philip Roberts: Help, I’m stuck in an event-loop.</a></li>
<li><a href="http://latentflip.com/loupe" rel="nofollow noreferrer" target="_blank">A super-cool demo of Event Loop</a></li>
</ul>
<h2 id="articleHeader7">广而告之</h2>
<blockquote>个人公众号，不止于前端<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000016242093?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000016242093?w=258&amp;h=258" alt="公众号：劉凯里" title="公众号：劉凯里" style="cursor: pointer; display: inline;"></span>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016242090](https://segmentfault.com/a/1190000016242090)

## 原文标题
Event Loop 其实也就这点事

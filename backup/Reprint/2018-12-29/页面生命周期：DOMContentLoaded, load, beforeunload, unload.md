---
title: '页面生命周期：DOMContentLoaded, load, beforeunload, unload' 
date: 2018-12-29 2:30:10
hidden: true
slug: 3hj8boa8qn4
categories: [reprint]
---

{{< raw >}}

                    
<h1>页面生命周期：DOMContentLoaded, load, beforeunload, unload</h1>
<p>原文地址：<a href="http://javascript.info/onload-ondomcontentloaded" rel="nofollow noreferrer">http://javascript.info/onload...</a></p>
<p>HTML页面的生命周期有以下三个重要事件：</p>
<ul>
<li>
<code>DOMContentLoaded</code> — 浏览器已经完全加载了HTML，DOM树已经构建完毕，但是像是  <code>&lt;img&gt;</code> 和样式表等外部资源可能并没有下载完毕。</li>
<li>
<code>load</code> — 浏览器已经加载了所有的资源（图像，样式表等）。</li>
<li>
<code>beforeunload/unload</code> -- 当用户离开页面的时候触发。</li>
</ul>
<p>每个事件都有特定的用途</p>
<ul>
<li>
<code>DOMContentLoaded</code> -- DOM加载完毕，所以js可以访问所有DOM节点，初始化界面。</li>
<li>
<code>load</code> -- 附加资源已经加载完毕，可以在此事件触发时获得图像的大小（如果没有被在HTML/CSS中指定）</li>
<li>
<code>beforeunload/unload</code> -- 用户正在离开页面：可以询问用户是否保存了更改以及是否确定要离开页面。</li>
</ul>
<p>来看一下每个事件的细节。</p>
<h2>DOMContentLoaded</h2>
<p><code>DOMContentLoaded</code> 由 <code>document</code> 对象触发。</p>
<p>我们使用 <code>addEventListener</code> 来监听它：</p>
<pre><code class="javascript">document.addEventListener("DOMContentLoaded", ready);</code></pre>
<p>举个例子</p>
<pre><code class="html">&lt;script&gt;
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

  document.addEventListener("DOMContentLoaded", ready);
&lt;/script&gt;

&lt;img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&amp;cache=0"&gt;</code></pre>
<p>在这个例子中 <code>DOMContentLoaded</code>在document加载完成后就被触发，无需等待其他资源的载入，所以<code>alert</code>输出的图像的大小为0。</p>
<p>这么看来<code>DOMContentLoaded</code> 似乎很简单，DOM树构建完毕之后就运行该事件，不过其实存在一些陷阱。</p>
<h3>DOMContentLoaded 和脚本</h3>
<p>当浏览器在解析HTML页面时遇到了 <code>&lt;script&gt;...&lt;/script&gt;</code> 标签，将无法继续构建DOM树（译注：UI渲染线程与JS引擎是互斥的，当JS引擎执行时UI线程会被挂起），必须立即执行脚本。所以 <code>DOMContentLoaded</code> 有可能在所有脚本执行完毕后触发。</p>
<p>外部脚本（带<code>src</code>的）的加载和解析也会暂停DOM树构建，所以 <code>DOMContentLoaded</code> 也会等待外部脚本。</p>
<p>不过有两个例外是带<code>async</code>和<code>defer</code>的外部脚本，他们告诉浏览器继续解析而不需要等待脚本的执行，所以用户可以在脚本加载完成前可以看到页面，有较好的用户体验。</p>
<p><code>async</code>和<code>defer</code>属性仅仅对外部脚本起作用，并且他们在<code>src</code>不存在时会被自动忽略。</p>
<p>它们都告诉浏览器继续处理页面上的内容，而在后台加载脚本，然后在脚本加载完毕后再执行。所以脚本不会阻塞DOM树的构建和页面的渲染。</p>
<p><strong>（译注：其实这里是不对的，带有<code>async</code>和<code>defer</code>的脚本的下载是和HTML的下载与解析是异步的，但是js的执行一定是和UI线程是互斥的，像下面这张图所示，<code>async</code>在下载完毕后的执行会阻塞HTML的解析）</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011761998" src="https://static.alili.tech/img/remote/1460000011761998" alt="" title=""></span></p>
<p>他们有两处不同：</p>
<table>
<thead><tr>
<th align="left"> </th>
<th align="left"><code>async</code></th>
<th align="left"><code>defer</code></th>
</tr></thead>
<tbody>
<tr>
<td align="left">顺序</td>
<td align="left">带有<code>async</code>的脚本是优先执行先加载完的脚本，他们在页面中的顺序并不影响他们执行的顺序。</td>
<td align="left">带有<code>defer</code>的脚本按照他们在页面中出现的顺序依次执行。</td>
</tr>
<tr>
<td align="left"><code>DOMContentLoaded</code></td>
<td align="left">带有<code>async</code>的脚本也许会在页面没有完全下载完之前就加载，这种情况会在脚本很小或本缓存，并且页面很大的情况下发生。</td>
<td align="left">带有<code>defer</code>的脚本会在页面加载和解析完毕后执行，刚好在  <code>DOMContentLoaded</code><strong>之前</strong>执行。</td>
</tr>
</tbody>
</table>
<p>所以<code>async</code>用在那些完全不依赖其他脚本的脚本上。</p>
<pre><code class="html">### DOMContentLoaded and styles

External style sheets don't affect DOM, and so `DOMContentLoaded` does not wait for them.
外部样式表并不会影响DOM，所以`DOMContentLoaded`并不会被他们阻塞。
But there's a pitfall: if we have a script after the style, then that script must wait for the stylesheet to execute:
不过仍然有一个陷阱：如果在样式后面有一个内联脚本，那么脚本必须等待样式先加载完。

&lt;link type="text/css" rel="stylesheet" href="style.css"&gt;
&lt;script&gt;
  // the script doesn't not execute until the stylesheet is loaded
  // 脚本直到样式表加载完毕后才会执行。
  alert(getComputedStyle(document.body).marginTop);
&lt;/script&gt;</code></pre>
<p>发生这种事的原因是脚本也许会像上面的例子中所示，去得到一些元素的坐标或者基于样式的属性。所以他们自然要等到样式加载完毕才可以执行。</p>
<p><code>DOMContentLoaded</code>需要等待脚本的执行，脚本又需要等待样式的加载。</p>
<h3>浏览器的自动补全</h3>
<p>Firefox, Chrome和Opera会在<code>DOMContentLoaded</code>执行时自动补全表单。</p>
<p>例如，如果页面有登录的界面，浏览器记住了该页面的用户名和密码，那么在 <code>DOMContentLoaded</code>运行的时候浏览器会试图自动补全表单（如果用户设置允许）。</p>
<p>所以如果<code>DOMContentLoaded</code>被一个需要长时间执行的脚本阻塞，那么自动补全也会等待。你也许见过某些网站（如果你的浏览器开启了自动补全）—— 浏览器并不会立刻补全登录项，而是等到整个页面加载完毕后才填充。这就是因为在等待<code>DOMContentLoaded</code>事件。</p>
<p>使用带<code>async</code>和<code>defer</code>的脚本的一个好处就是，他们不会阻塞<code>DOMContentLoaded</code>和浏览器自动补全。（译注：其实执行还是会阻塞的）</p>
<h2>window.onload</h2>
<p><code>window</code>对象上的<code>onload</code>事件在所有文件包括样式表，图片和其他资源下载完毕后触发。</p>
<p>下面的例子正确检测了图片的大小，因为<code>window.onload</code>会等待所有图片的加载。</p>
<pre><code class="html">&lt;script&gt;
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
&lt;/script&gt;

&lt;img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&amp;cache=0"&gt;</code></pre>
<h2>window.onunload</h2>
<p>用户离开页面的时候，<code>window</code>对象上的<code>unload</code>事件会被触发，我们可以做一些不存在延迟的事情，比如关闭弹出的窗口，可是我们无法阻止用户转移到另一个页面上。</p>
<p>所以我们需要使用另一个事件 —  <code>onbeforeunload</code>。</p>
<h2>window.onbeforeunload</h2>
<p>如果用户即将离开页面或者关闭窗口时，<code>beforeunload</code>事件将会被触发以进行额外的确认。</p>
<p>浏览器将显示返回的字符串，举个例子：</p>
<pre><code class="javascript">window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};</code></pre>
<p>有些浏览器像Chrome和火狐会忽略返回的字符串取而代之显示浏览器自身的文本，这是为了安全考虑，来保证用户不受到错误信息的误导。</p>
<h2>readyState</h2>
<p>如果我们在整个页面加载完毕后设置<code>DOMContentLoaded</code>会发生什么呢？</p>
<p>啥也没有，<code>DOMContentLoaded</code>不会被触发。</p>
<p>有一些情况我们无法确定页面上是否已经加载完毕，比如一个带有<code>async</code>的外部脚本的加载和执行是异步的（注：执行并不是异步的-_-）。在不同的网络状况下，脚本有可能是在页面加载完毕后执行也有可能是在页面加载完毕前执行，我们无法确定。所以我们需要知道页面加载的状况。</p>
<p><code>document.readyState</code>属性给了我们加载的信息，有三个可能的值：</p>
<ul>
<li>
<code>loading</code> 加载 - document仍在加载。</li>
<li>
<code>interactive</code> 互动 - 文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。</li>
<li>
<code>complete</code> - 文档和所有子资源已完成加载。状态表示 <code>load</code> 事件即将被触发。</li>
</ul>
<p>所以我们可以检查 <code>document.readyState</code> 的状态，如果没有就绪可以选择挂载事件，如果已经就绪了就可以直接立即执行。</p>
<p>像这样：</p>
<pre><code class="javascript">function work() { /*...*/ }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}</code></pre>
<p>每当文档的加载状态改变的时候就有一个<code>readystatechange</code>事件被触发，所以我们可以打印所有的状态。</p>
<pre><code class="javascript">// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () =&gt; console.log(document.readyState));</code></pre>
<p><code>readystatechange</code> 是追踪页面加载的一个可选的方法，很早之前就已经出现了。不过现在很少被使用了，为了保持完整性还是介绍一下它。</p>
<p><code>readystatechange</code>的在各个事件中的执行顺序又是如何呢？</p>
<pre><code class="html">&lt;script&gt;
  function log(text) { /* output the time and message */ }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () =&gt; log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () =&gt; log('DOMContentLoaded'));

  window.onload = () =&gt; log('window onload');
&lt;/script&gt;

&lt;iframe src="iframe.html" onload="log('iframe onload')"&gt;&lt;/iframe&gt;

&lt;img src="http://en.js.cx/clipart/train.gif" id="img"&gt;
&lt;script&gt;
  img.onload = () =&gt; log('img onload');
&lt;/script&gt;</code></pre>
<p>输出如下:</p>
<ol>
<li>[1] initial readyState:loading</li>
<li>[2] readyState:interactive</li>
<li>[2] DOMContentLoaded</li>
<li>[3] iframe onload</li>
<li>[4] readyState:complete</li>
<li>[4] img onload</li>
<li>[4] window onload</li>
</ol>
<p>方括号中的数字表示他们发生的时间，真实的发生时间会更晚一点，不过相同数字的时间可以认为是在同一时刻被按顺序触发（误差在几毫秒之内）</p>
<ul>
<li>
<code>document.readyState</code> 在 <code>DOMContentLoaded</code>前一刻变为<code>interactive</code>，这两个事件可以认为是同时发生。</li>
<li>
<code>document.readyState</code> 在所有资源加载完毕后（包括<code>iframe</code>和<code>img</code>）变成<code>complete</code>，我们可以看到<code>complete</code>、 <code>img.onload</code>和<code>window.onload</code>几乎同时发生，区别就是<code>window.onload</code>在所有其他的<code>load</code>事件之后执行。</li>
</ul>
<h2>总结</h2>
<p>页面事件的生命周期：</p>
<ul>
<li>
<p><code>DOMContentLoaded</code>事件在DOM树构建完毕后被触发，我们可以在这个阶段使用js去访问元素。</p>
<ul>
<li>
<code>async</code>和<code>defer</code>的脚本可能还没有执行。</li>
<li>图片及其他资源文件可能还在下载中。</li>
</ul>
</li>
<li>
<code>load</code>事件在页面所有资源被加载完毕后触发，通常我们不会用到这个事件，因为我们不需要等那么久。</li>
<li>
<code>beforeunload</code>在用户即将离开页面时触发，它返回一个字符串，浏览器会向用户展示并询问这个字符串以确定是否离开。</li>
<li>
<code>unload</code>在用户已经离开时触发，我们在这个阶段仅可以做一些没有延迟的操作，由于种种限制，很少被使用。</li>
<li>
<p><code>document.readyState</code>表征页面的加载状态，可以在<code>readystatechange</code>中追踪页面的变化状态：</p>
<ul>
<li>
<code>loading</code> — 页面正在加载中。</li>
<li>
<code>interactive</code> -- 页面解析完毕，时间上和 <code>DOMContentLoaded</code>同时发生，不过顺序在它之前。</li>
<li>
<code>complete</code> -- 页面上的资源都已加载完毕，时间上和<code>window.onload</code>同时发生，不过顺序在他之前。</li>
</ul>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
页面生命周期：DOMContentLoaded, load, beforeunload, unload

## 原文链接
[https://segmentfault.com/a/1190000011468675](https://segmentfault.com/a/1190000011468675)


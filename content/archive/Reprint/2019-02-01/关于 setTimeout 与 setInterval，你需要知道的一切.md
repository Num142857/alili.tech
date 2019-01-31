---
title: '关于 setTimeout 与 setInterval，你需要知道的一切' 
date: 2019-02-01 2:30:10
hidden: true
slug: v1o2b6buf9f
categories: [reprint]
---

{{< raw >}}

                    
<p>我们都知道的是<code>setTimout</code>是用来延迟一个简单的动作的，然而，<code>setInterval</code>的目的是用来重复执行某个动作的。</p>
<p>然后，以上只是一半的事实。因为如果一个函数需要在一个间隔时间内重复的执行，你也可以轻松的使用 <code>setTimeout</code> 设定延迟时间，被延迟执行的函数再进行自调用以此实现循环。</p>
<p>所以，这里有2种方法做同样的事</p>
<p><strong>一个用<code>setInterval</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doStuff = function () {
  // Do stuff
};
setInterval(doStuff, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// Do stuff</span>
};
setInterval(doStuff, <span class="hljs-number">1000</span>);</code></pre>
<p><strong>一个用<code>setTimeout</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var doStuff = function () {
    // DoStuff
    setTimeout(doStuff, 1000); 
};
setTimeout(doStuff, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// DoStuff</span>
    setTimeout(doStuff, <span class="hljs-number">1000</span>); 
};
setTimeout(doStuff, <span class="hljs-number">1000</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果你想立即执行函数，可以这样写
var doStuff = function () {
    setTimeout(doStuff, 1000);
}
doStuff();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// 如果你想立即执行函数，可以这样写</span>
<span class="hljs-keyword">var</span> doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
    setTimeout(doStuff, 1000);
}</span>
<span class="hljs-title">doStuff</span><span class="hljs-params">()</span>;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 或者，更酷的方式，使用立即执行函数
(function doStuff () {
   // Do Stuff
   setTimeout(doStuff, 1000);
}())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 或者，更酷的方式，使用立即执行函数</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStuff</span> <span class="hljs-params">()</span> </span>{
   <span class="hljs-comment">// Do Stuff</span>
   setTimeout(doStuff, <span class="hljs-number">1000</span>);
}())</code></pre>
<p>这必然导致下面两个问题</p>
<p><strong>问题：</strong><code>setInterval</code>和self-invoking <code>setTimeout-loops</code>是可以互相替换的吗?<br><strong>答案：</strong>不，当然不行。它们之间有着很细微的区别，但是如果想写出好的代码，这些细微的区别便是你想知道的事。</p>
<p>当然，接下我将会诉说的，<strong>第一，</strong>我将告诉你，我们通常会遇到什么样的问题，<strong>第二，</strong>我将开始介绍它们之间细微的区别，这些区别将让我们从这两个选择中选出更具吸引力的那个一，<strong>第三，</strong>我将告诉你其实根本不用关心另一个。然后。这里是结论，<code>setTimeout</code>将是更惊艳的那一个。接下来我将一点一点解释。</p>
<h3 id="articleHeader0">进程堵塞</h3>
<p><strong>首先：</strong>如果你试着重复调用的函数并不会化太多的时间来跑，那么将不会有任何问题。即使如此，被调用的函数依然会出现2中不同的情况：它既可以在CPU上高集中的运行脚本，或者它也可以在脚本流外先发出一个命令，并等待结果的到来。</p>
<p>我们主要研究先看第二种情况。典型的便是ajax回调：你的脚本并不会等待服务器的响应，它会自己执行到最后，并让回调函数来监听ajax响应。</p>
<p>现在，一些网站想要你保持实时更新，像Gmail，当你获得一封新的邮件时便会刷新你的邮箱。这里服务端有新消息时便实时通知浏览器端的技术，通常叫做ajax轮询。浏览器隔一段时间像服务器发送一个请求，询问这里有没有需要更新的消息。</p>
<p>你也许会想，你很擅长使用<code>setInterval</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不要这样做
var pollServerForNewMail = function () {
  $.getJSON('/poll_newmail.php', function (response) {
    if (response.newMail) {
      alert(
        &quot;New mail. At last. You made me walk all the way to the server and back every &quot; +
        &quot;second for this, so if this isn't life-or-death, you got another thing coming.&quot;
      );
    }
  });
};
setInterval(pollServerForNewMail, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 不要这样做</span>
<span class="hljs-keyword">var</span> pollServerForNewMail = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $.getJSON(<span class="hljs-string">'/poll_newmail.php'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-keyword">if</span> (response.newMail) {
      alert(
        <span class="hljs-string">"New mail. At last. You made me walk all the way to the server and back every "</span> +
        <span class="hljs-string">"second for this, so if this isn't life-or-death, you got another thing coming."</span>
      );
    }
  });
};
setInterval(pollServerForNewMail, <span class="hljs-number">1000</span>);</code></pre>
<p>其实像上面那样写并不好。因为请求发送出去到回来是需要时间的，但是这段时间谁能保证会比你设置的间隔时间要短呢？</p>
<p>一个典型的初学者的错误，会想将轮询的间隔时间设置的长一点也许可以解决这个问题。然后，事实是，无论你的间隔时间设的是多少，它依然有可能比，ajax响应的时间短。也就是说，有可能会发生，第一个请求还没回来的情况下，第二请求又已经发出去了。而你需要的是两个请求之间有呼吸的空间，而<code>setTimeout</code>便可以解决这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function pollServerForNewMail() {
  $.getJSON('/poll_newmail.php', function (response) {
    if (response.newMail) {
      alert(
        &quot;You have received a letter, good sir. &quot; + 
        &quot;I will have a quick lie-down and be on my way shortly.&quot;
      );
    }
    setTimeout(pollServerForMail, 1000);
  });
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span> pollServerForNewMail() {
  $.getJSON(<span class="hljs-name">'/poll_newmail.php'</span>, function (<span class="hljs-name">response</span>) {
    if (<span class="hljs-name">response.newMail</span>) {
      alert(
        <span class="hljs-string">"You have received a letter, good sir. "</span> + 
        <span class="hljs-string">"I will have a quick lie-down and be on my way shortly."</span>
      )<span class="hljs-comment">;</span>
    }
    setTimeout(<span class="hljs-name">pollServerForMail</span>, <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
  })<span class="hljs-comment">;</span>
}())<span class="hljs-comment">;</span></code></pre>
<p>在第一次发出请求，服务器响应之前，不会发生任何事。在响应回来时，才会继续发出第二个请求。当然，这也就意味着，两个轮询之间的时间超过了1秒，这也依赖于各种各样的因素，像网速和服务器的响应速度等。但是，显然的，这对我们要做的事来说并不算是什么问题。</p>
<h3 id="articleHeader1">例子</h3>
<p>这里有两个例子来更好的进行说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timesRun = 0;
var startTime = new Date().getTime();

var doStuff = function () {
  var now = new Date().getTime();

  // 只跑5次
  if (++timesRun == 5) clearInterval(timer);

  console.log('Action ' + timesRun + ' started ' + (now - startTime) + 'ms after script start');

  // Waste some time
  for (var i = 0; i < 100000; i++) {
    document.getElementById('unobtanium');
  }

  console.log('and took ' + (new Date().getTime() - now) + 'ms to run.');
};

var timer = setInterval(doStuff, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timesRun = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();

<span class="hljs-keyword">var</span> doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();

  <span class="hljs-comment">// 只跑5次</span>
  <span class="hljs-keyword">if</span> (++timesRun == <span class="hljs-number">5</span>) clearInterval(timer);

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Action '</span> + timesRun + <span class="hljs-string">' started '</span> + (now - startTime) + <span class="hljs-string">'ms after script start'</span>);

  <span class="hljs-comment">// Waste some time</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++) {
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'unobtanium'</span>);
  }

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'and took '</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - now) + <span class="hljs-string">'ms to run.'</span>);
};

<span class="hljs-keyword">var</span> timer = setInterval(doStuff, <span class="hljs-number">1000</span>);</code></pre>
<p>下面是结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Action 1 started 1000ms after script start
and took 8ms to run.
Action 2 started 2000ms after script start
and took 8ms to run.
Action 3 started 3004ms after script start
and took 6ms to run.
Action 4 started 4002ms after script start
and took 6ms to run.
Action 5 started 5000ms after script start
and took 6ms to run." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Action <span class="hljs-number">1</span> started <span class="hljs-number">1000</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">8</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">2</span> started <span class="hljs-number">2000</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">8</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">3</span> started <span class="hljs-number">3004</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">6</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">4</span> started <span class="hljs-number">4002</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">6</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">5</span> started <span class="hljs-number">5000</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">6</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.</code></pre>
<p>这里并没有多大的意外。这段代码中间的循环花了一点时间，但是<code>setInterval</code>依然很严格的执行了它的计划。在一秒的间隔之间，开始时间之间并没有一点空隙。</p>
<p>现在是<code>setTimeout-loop</code>的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timesRun = 0;
var startTime = new Date().getTime();

var doStuff = function () {
  var now = new Date().getTime();

  console.log('Action ' + (timesRun + 1) + ' started ' + (now - startTime) + 'ms after script start');

  // Waste some time
  for (var i = 0; i < 100000; i++) {
    document.getElementById('unobtanium');
  }

  console.log('and took ' + (new Date().getTime() - now) + 'ms to run.');

  // Run only 5 times
  if (++timesRun < 5) {
    setTimeout(doStuff, 1000);
  }
};

setTimeout(doStuff, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> timesRun = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();

<span class="hljs-keyword">var</span> doStuff = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Action '</span> + (timesRun + <span class="hljs-number">1</span>) + <span class="hljs-string">' started '</span> + (now - startTime) + <span class="hljs-string">'ms after script start'</span>);

  <span class="hljs-comment">// Waste some time</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++) {
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'unobtanium'</span>);
  }

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'and took '</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - now) + <span class="hljs-string">'ms to run.'</span>);

  <span class="hljs-comment">// Run only 5 times</span>
  <span class="hljs-keyword">if</span> (++timesRun &lt; <span class="hljs-number">5</span>) {
    setTimeout(doStuff, <span class="hljs-number">1000</span>);
  }
};

setTimeout(doStuff, <span class="hljs-number">1000</span>);</code></pre>
<p>输出结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Action 1 started 1010ms after script start
and took 8ms to run.
Action 2 started 2021ms after script start
and took 8ms to run.
Action 3 started 3031ms after script start
and took 5ms to run.
Action 4 started 4037ms after script start
and took 6ms to run.
Action 5 started 5043ms after script start
and took 6ms to run." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Action <span class="hljs-number">1</span> started <span class="hljs-number">1010</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">8</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">2</span> started <span class="hljs-number">2021</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">8</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">3</span> started <span class="hljs-number">3031</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">5</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">4</span> started <span class="hljs-number">4037</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">6</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.
Action <span class="hljs-number">5</span> started <span class="hljs-number">5043</span>ms <span class="hljs-keyword">after</span> <span class="hljs-keyword">script</span> start
<span class="hljs-keyword">and</span> took <span class="hljs-number">6</span>ms <span class="hljs-keyword">to</span> <span class="hljs-built_in">run</span>.</code></pre>
<p>这里也并没有太多的意外。我们已经知道<code>setTimeout-loop</code>并不会严格的执行计划，而是在函数下一次调用之前，会给函数它足够的时间执行它里面的代码。</p>
<h3 id="articleHeader2">结论</h3>
<p>不要使用<code>setInterval</code>,如果你在乎你的时间。<code>setTimeout-loop</code>可以给你足够的时间控制你的脚本和回调，</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 setTimeout 与 setInterval，你需要知道的一切

## 原文链接
[https://segmentfault.com/a/1190000007469371](https://segmentfault.com/a/1190000007469371)


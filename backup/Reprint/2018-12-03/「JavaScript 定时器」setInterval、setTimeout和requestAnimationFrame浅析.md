---
title: '「JavaScript 定时器」setInterval、setTimeout和requestAnimationFrame浅析' 
date: 2018-12-03 2:30:08
hidden: true
slug: i6vtdycuied
categories: [reprint]
---

{{< raw >}}

                    
<h3><strong>一.常见定时器</strong></h3>
<pre><code>我们常见的定时器有以下两种

1. window.setTimeout 用于在指定的毫秒数后执行某段既定的代码
2. window.setInterval 用于每隔一段毫秒数重复执行既定的代码

这两个方法都可以通过手工设置时间来设定是多少毫秒后执行这段代码，或者是每隔多少毫秒执行这段代码。  
</code></pre>
<p>虽然我们期待浏览器按照我们设定的时间精确的执行代码，但是js却不能保证代码能恰好在那个时间点被运行，原因有两个。</p>
<ul>
<li>大多数浏览器并没有精确到毫秒级别的触发事件，例如，我们设定某个函数在3毫秒后执行，在老版本的IE中，这个函数至少会在15毫秒以后执行。而在现代浏览器中，这个数值会短一点，但时间差一般也会超过1毫秒。</li>
<li>第二个原因与js的运行机制有关，具体见<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer">JavaScript 运行机制详解：再谈Event Loop</a>.简单来说，就是js是一个单线程的解释器，一段时间只能执行一段代码，所以运行时分为主线程和任务队列两部分。而我们在定时器中设置的时间，仅代表1000毫秒后把这个任务插入到任务队列中，而此时必须要等到主线程的代码执行完毕，才能执行任务队列中的定时器的任务（在任务队列中也有调度，不一定第一个执行当前任务），因此时间是无法保证的。</li>
</ul>
<h3><strong>二、requestAnimationFrame</strong></h3>
<p>那有没有时间准确的定时器呢？有一种选择是<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame" rel="nofollow noreferrer">requestAnimationFrame</a>.  示例如下：</p>
<pre><code> function animateMe(){
    requestAnimationFrame(function(){
      console.log(new Date());
      animateMe();
    })
}
animateMe();</code></pre>
<p>这个api的原理是在由系统来决定回调函数的执行时机，在每一次系统绘制之前，会主动调用requestAnimationFrame中的回调函数，而频率也<strong>紧紧跟随</strong>浏览器的刷新频率。比如一般电脑的刷新频率通常为60Hz，即一秒钟重绘60次，那么回调函数就等于1000/60=16.7毫秒被执行一次，而如果刷新频率变为75Hz，那么这个时间就变为1000/75=13.3毫秒被执行一次。这样能保证回调函数在每一次绘制的间隔时间内只被执行一次，因此它的时间是可靠的。</p>
<h3><strong>三、实战</strong></h3>
<p>光说不练假把式，现在我们就用上面介绍的三种定时器完成进度条的效果。  </p>
<p>1.setInterval</p>
<pre><code>var timer;
$('.runBtn').click(function(){
    clearInterval(timer);
    $('#bar').width(0);
    timer = setInterval(function(){
      if($('#bar').width() &lt; 500){
         $('#bar').width($('#bar').width()+5);
         $('#bar').text($('#bar').width()/5+'%');
      }else{
        clearInterval(timer);
      } 
    },16);
 });</code></pre>
<p><a href="https://jsfiddle.net/21fepjjx/7/" rel="nofollow noreferrer">点此预览效果</a></p>
<p>2.setTimeout</p>
<pre><code>var timer;
$('.runBtn').click(function(){
    clearTimeout(timer);
    $('#bar').width(0);
    timer = setTimeout(function fn(){
      if($('#bar').width() &lt; 500){
         $('#bar').width($('#bar').width()+5);
         $('#bar').text($('#bar').width()/5+'%');
         timer = setTimeout(fn,16);
      }else{
        clearTimeout(timer);
      } 
    },16);
 });</code></pre>
<p><a href="https://jsfiddle.net/Jchermy/pzt50zgy/1/" rel="nofollow noreferrer">点此预览效果</a></p>
<p>3.requestAnimationFrame</p>
<pre><code>var timer;
$('.runBtn').click(function(){
    cancelAnimationFrame(timer);
    $('#bar').width(0);
    timer = requestAnimationFrame(function fn(){
      if($('#bar').width() &lt; 500){
         $('#bar').width($('#bar').width()+5);
         $('#bar').text($('#bar').width()/5+'%');
         requestAnimationFrame(fn);
      }else{
        cancelAnimationFrame(timer);
      } 
    });
 });</code></pre>
<p><a href="https://jsfiddle.net/Jchermy/21fepjjx/10/" rel="nofollow noreferrer">点此预览效果</a></p>
<h3><strong>四、最后</strong></h3>
<p>文章都来自本人的总结，难免有些纰漏，欢迎大家指正。一起学习，一起进步。如果觉得不错，欢迎点赞收藏嘤嘤嘤~~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「JavaScript 定时器」setInterval、setTimeout和requestAnimationFrame浅析

## 原文链接
[https://segmentfault.com/a/1190000014661035](https://segmentfault.com/a/1190000014661035)


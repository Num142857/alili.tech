---
title: '关于localStorage面试的那点事' 
date: 2018-12-26 2:30:14
hidden: true
slug: wvdt6yzri7
categories: [reprint]
---

{{< raw >}}

                    
<p>最近面试的时候关于html5API总会被问到localStorage的问题， 对于一般的问题很简单，无非就是</p>
<ul>
<li><p>localStorage、sessionStorage和cookie这三个客户端缓存的区别</p></li>
<li><p>localStorage的API，getItem,setItem,clear等等</p></li>
<li><p>localStorage存取数据是以字符串的形式，最大容量是5M</p></li>
</ul>
<p>上面的三个问题大部分同学都可以回答出来，那么，面试官的问题来了：</p>
<p><strong>字符串最大容量是5M，那么我如果存储容量溢出了怎么办？</strong></p>
<blockquote><p>其实这个5M对于不同浏览器来说也是不确定的，不过大体上是一个5M的范围，溢出了怎么办，肯定会发生错误啊。浏览器会报一个名为“QuotaExceededError”的错误，如下图：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVYeWV?w=832&amp;h=120" src="https://static.alili.tech/img/bVYeWV?w=832&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>最后一次溢出的字符串是会存储到最大容量停止还是不会存储？</strong></p>
<blockquote><p>正常情况下，可能不会存储5M的字符串，但是也不能保证浏览器日积月累的情况下，恰巧用户也没清理过缓存，那么当最后容量接近5M的时候，我们再存储一个字符串进去的时候会发生错误，发生错误的字符串是存了一半？还是压根就没存呢？答案是---<strong>没存</strong>。下面是我写的一个demo，最后发现报错的时候刷新浏览器，localStorage的当前容量为发生变化。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVYeXC?w=1070&amp;h=341" src="https://static.alili.tech/img/bVYeXC?w=1070&amp;h=341" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>既然存在安全问题，那么localStorage的使用就不是绝对安全的，如何更安全的使用localStorage？</strong></p>
<blockquote><p>前端的安全性是十分重要的一个话题，因为我们直接与用户打交道，你的程序在前端发生不可预知的错误是一定要避免的。因此这种不安全的API，我们需要找到解决办法，下面是我的一个解决办法（可能不是最优解，但是可行）。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
  var safeLocalStorage = function(key, value) {
    try{
      localStorage.setItem(key,value);
    }catch(oException){
      if(oException.name == 'QuotaExceededError'){
          console.log('已经超出本地存储限定大小！');
          // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
          localStorage.clear();
          localStorage.setItem(key,value);
      }
    }
  }
  this.safeLocalStorage = safeLocalStorage;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
  var safeLocalStorage = function(<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>, value) {
    try{
      localStorage.setItem(<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>,value)<span class="hljs-comment">;</span>
    }catch(<span class="hljs-name">oException</span>){
      if(<span class="hljs-name">oException.name</span> == 'QuotaExceededError'){
          console.log(<span class="hljs-name">'</span>已经超出本地存储限定大小！')<span class="hljs-comment">;</span>
          // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
          localStorage.clear()<span class="hljs-comment">;</span>
          localStorage.setItem(<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>,value)<span class="hljs-comment">;</span>
      }
    }
  }
  this.safeLocalStorage = safeLocalStorage;
})()<span class="hljs-comment">;</span></code></pre>
<p>面试官一波素质三连！对于只是会使用localStorage的同学来说，肯定是不得其解的。其实这也是很多同学准备面试的时候因该考虑的问题，或者说应该主攻的方向（虽然我才毕业，但是自身遇到的问题总结出来希望对大家有帮助）。在学习知识时，懂得使用固然重要，但是如果想熟练掌握一个知识点，必须更加深刻的挖掘才可以。  </p>
<p>Demo地址：<a href="https://github.com/zhoudeyou945/LocalStorage-zhoudy" rel="nofollow noreferrer" target="_blank">https://github.com/zhoudeyou9...</a><br>前端小白，第一次发文，决心把自己的学习成长过程写下来，欢迎批评指正o(<em>￣︶￣</em>)o</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于localStorage面试的那点事

## 原文链接
[https://segmentfault.com/a/1190000011934875](https://segmentfault.com/a/1190000011934875)


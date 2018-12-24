---
title: '写给小白看的JS异步' 
date: 2018-12-25 2:30:11
hidden: true
slug: 8mpy7c0co7s
categories: [reprint]
---

{{< raw >}}

                    
<p>某天突然写了个方法要从后台调用数据，显示在前台页面，但是输出结果总是空undefined，得不到数据。多方找资料才发现，原来是入了JS异步的“坑”。</p>
<p>我们常常听到单线程、多线程、同步、异步这些概念，那么这些东西到底是什么呢？<br>那么我们先从上面那几个概念说起 o(<em>￣▽￣</em>)ブ</p>
<h2 id="articleHeader0">单线程、多线程、同步、异步基本理解</h2>
<p>每个正在运行的程序（即进程）至少有一个线程，被称为主线程。主线程在启动程序时被创建，用于执行main函数。</p>
<ul>
<li><p>单线程就是只有一个主线的线程，代码从上往下顺序运行，主线程负责执行程序的所有代码（UI展现以及刷新，网络请求，本地存储等等）【一个线程要做所有的事情，想想都有点累呢】</p></li>
<li><p>多线程顾名思义，就是有多个线程的程序，可以由用户自主创建。用户自主创建的若干进程相对于主线程而言就是子线程。子线程和主线程都是独立的运行单元，各自的执行互不影响，因此能够并发执行。</p></li>
</ul>
<p>光听这些干巴巴的理论是不是觉得有点晕？   巧了，我乍一看的时候也晕。<br>在找资料的过程中，我发现了别人的这么一个形象的比喻。</p>
<p><strong>打个比方，单线程就是你去厨房又烧饭又烧菜，一个人来回跑；多线程就是两个人，一个单做饭，一个单做菜。</strong></p>
<p>这么说，应该更好理解了吧？</p>
<p>而什么又是同步和异步呢？</p>
<p>我们用一个简单的生活例子来说明。</p>
<p>你打电话订酒店，问工作人员有没有房间，这时候，工作人员需要查找有没有房间才能回答你。</p>
<ul>
<li><p>同步就是不挂电话一直等，直到工作人员告诉你有没有房间。</p></li>
<li><p>异步就是挂断电话，你去做别的事情，比如吃饭喝水，工作人员查到了信息再打电话告诉你。</p></li>
</ul>
<p>那么我们的主题来了</p>
<h2 id="articleHeader1">JS的异步操作是怎样的呢？</h2>
<p>JS的执行环境是单线程的，也就是说，程序顺序执行下来，一次只能执行一个任务，程序想要往下运行，就必须等待当前的任务执行完毕，不管当前的任务要执行多久（要是后面的程序急着跑出来可真的是等的很难受呢）。</p>
<p>为了解决后面程序等的难受的这个阻塞问题。JavaScript有一种异步处理模式，其实就是延时处理。</p>
<p>我们再来抛出例子来说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var getUserInfo = function () {
            $.getJSON(&quot;http://www.easy-mock.com/mock/5a09868228b23066479b8379/ajaxData/getUserInfo&quot;, function () {
                return data;
            });
        }
        var data = getUserInfo();
        renderUserInfo(data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-keyword">var</span> getUserInfo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            $.getJSON(<span class="hljs-string">"http://www.easy-mock.com/mock/5a09868228b23066479b8379/ajaxData/getUserInfo"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> data;
            });
        }
        <span class="hljs-keyword">var</span> data = getUserInfo();
        renderUserInfo(data)</code></pre>
<p>getUserInfo这个函数被调用，要取后台取数据，可能要耗费很多时间，这就要让renderUserInfo一直等着，直到取出data才能运行。幸好JS有异步操作，取数据的时候，不用renderUserInfo一直等着data取出来，而是直接执行。</p>
<p>这么说的话，那么这两个函数到底是什么顺序执行的呐？不急，我们来调试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getUserInfo = function () {
            console.log('aaa');
            $.getJSON(&quot;http://www.easy-mock.com/mock/5a09868228b23066479b8379/ajaxData/getUserInfo&quot;, function () {
                console.log('bbb');
                return data;
            });
        }
        var data = getUserInfo();
        console.log(data);
        console.log('ccc');
        renderUserInfo(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getUserInfo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aaa'</span>);
            $.getJSON(<span class="hljs-string">"http://www.easy-mock.com/mock/5a09868228b23066479b8379/ajaxData/getUserInfo"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bbb'</span>);
                <span class="hljs-keyword">return</span> data;
            });
        }
        <span class="hljs-keyword">var</span> data = getUserInfo();
        <span class="hljs-built_in">console</span>.log(data);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ccc'</span>);
        renderUserInfo(data);</code></pre>
<p>顺序执行下来的输出原以为是"aaa","bbb","ccc"吧？</p>
<p>然而事情并没有这么简单。我们来看一下控制台的输出：<br><span class="img-wrap"><img data-src="/img/bVYzOs?w=95&amp;h=113" src="https://static.alili.tech/img/bVYzOs?w=95&amp;h=113" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>输出的结果竟然不是顺序的。<br>也就是说函数执行到getJSON取数据的时候，程序并没有等它取出数据再执行下一步，而是跳过了取数据这一个阶段，直接执行输出data了，因此，data也为空。</p>
<p>这就是JS的异步机制了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
写给小白看的JS异步

## 原文链接
[https://segmentfault.com/a/1190000012015101](https://segmentfault.com/a/1190000012015101)


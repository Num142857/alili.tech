---
title: '小技巧|移动端网页调试神器Eruda使用技巧' 
date: 2018-12-27 2:30:12
hidden: true
slug: zh28rsd2j88
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVXvig?w=2396&amp;h=1302" src="https://static.alili.tech/img/bVXvig?w=2396&amp;h=1302" alt="移动端网页调试神器Eruda使用技巧" title="移动端网页调试神器Eruda使用技巧" style="cursor: pointer; display: inline;"></span></p>
<p>做移动端Web开发的一大痛点就是，在真机运行下无法查看console.log日志和其他信息如网络请求、显示本地存储等信息。如果网页是运行在手机浏览器中还算好，可以把网址在电脑上打开查看console信息，但是如果是做APP的内嵌H5页面，那就只能靠开发阶段在浏览器模拟环境中尽量没有Bug，但是，一旦H5上线后报错那就比较麻烦了，而且还依赖APP环境才能跑的网页，更加难以查找问题。如果让移动端也拥有类似Chrome DevTools工具那岂不是很愉快么？</p>
<p>vConsole便是这样一款很棒的移动端DevTools工具，由大厂企鹅出品。但本文把他定位为男二号，今天的主角男一号是：<strong>Eruda</strong>！vConsole的同类。如果你不知道怎么在移动端调试网页，那么本篇文章对你很有帮助，如果你是vConsole的用户，那么你也可尝试一下Eruda，如果你是移动端网页开发骨灰级玩家，那么可以选择低调的忽略本文。</p>
<h2 id="articleHeader0">Eruda是谁？</h2>
<p>大家好，给大家介绍一下，这是我的.....。Eruda 是一个专为手机网页前端设计的调试面板，类似 DevTools 的迷你版，其主要功能包括：捕获 console 日志、检查元素状态、显示性能指标、捕获XHR请求、显示本地存储和 Cookie 信息、浏览器特性检测等等。</p>
<p>GitHub地址为：<a href="https://github.com/liriliri/eruda" rel="nofollow noreferrer" target="_blank">https://github.com/liriliri/eruda</a>，颜值和技能都很棒的Erdua：<br><span class="img-wrap"><img data-src="/img/remote/1460000011759305" src="https://static.alili.tech/img/remote/1460000011759305" alt="颜值和技能都很棒的Eruda" title="颜值和技能都很棒的Eruda" style="cursor: pointer;"></span><br>详细介绍可以戳<a href="https://github.com/liriliri/eruda/blob/master/doc/README_CN.md" rel="nofollow noreferrer" target="_blank">这里</a>产看，我就不赘述了</p>
<h2 id="articleHeader1">使用技巧</h2>
<p>这才是本文重点。Eruda的基本使用方法推荐使用CDN和可配置参数的形式，在页面引入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function () {
    var src = '//cdn.bootcss.com/eruda/1.2.4/eruda.min.js';
    if (!/eruda=true/.test(window.location) &amp;&amp; localStorage.getItem('active-eruda') !== 'true') return;
    document.write('<scr' + 'ipt src=&quot;' + src + '&quot;></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> src = <span class="hljs-string">'//cdn.bootcss.com/eruda/1.2.4/eruda.min.js'</span>;
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/eruda=true/</span>.test(<span class="hljs-built_in">window</span>.location) &amp;&amp; localStorage.getItem(<span class="hljs-string">'active-eruda'</span>) !== <span class="hljs-string">'true'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;scr'</span> + <span class="hljs-string">'ipt src="'</span> + src + <span class="hljs-string">'"&gt;&lt;/scr'</span> + <span class="hljs-string">'ipt&gt;'</span>);
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;scr'</span> + <span class="hljs-string">'ipt&gt;eruda.init();&lt;/scr'</span> + <span class="hljs-string">'ipt&gt;'</span>);
})();</code></pre>
<p><code>eruda.init();</code>里面可以传入要初始化哪些面板，默认加载所有。</p>
<p>这样使用方式没有错，但是如果Eruda要跟着发布到线上的话，那我们要删除这段代码？因为这样会不管你需不需要调试Eruda都会立即加载，在页面出现Eruda的图标。我的目标是，Eruda可以保留在页面里，无论什么环境，只要我们想呼唤它出现的时候它才出现，不需要它的时候它只是一段不会生效的普通代码。</p>
<p>我想到的办法是：首先把上述引入代码的<code>src</code>放到<code>if</code>里，同时把<code>localStorage</code>改为<code>sessionStorage</code>，<code>active-eruda</code>参数也可以改个更短的名字，改后的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";(function () {
    if (!/eruda=true/.test(window.location) || sessionStorage.getItem('eruda') !== 'true') return;
    var src = '//cdn.bootcss.com/eruda/1.2.4/eruda.min.js';
    document.write('<scr' + 'ipt src=&quot;' + src + '&quot;></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/eruda=true/</span>.test(<span class="hljs-built_in">window</span>.location) || sessionStorage.getItem(<span class="hljs-string">'eruda'</span>) !== <span class="hljs-string">'true'</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">var</span> src = <span class="hljs-string">'//cdn.bootcss.com/eruda/1.2.4/eruda.min.js'</span>;
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;scr'</span> + <span class="hljs-string">'ipt src="'</span> + src + <span class="hljs-string">'"&gt;&lt;/scr'</span> + <span class="hljs-string">'ipt&gt;'</span>);
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;scr'</span> + <span class="hljs-string">'ipt&gt;eruda.init();&lt;/scr'</span> + <span class="hljs-string">'ipt&gt;'</span>);
})();</code></pre>
<p>这段代码的意思是如果URL中有参数<code>eruda=true</code>或者sessionStorage中<code>eruda</code>的值为true才加载Eruda。这样的好处是，我们需要调试的时候可以在网页URL后面加个参数即可，不需要调试的它不会加载。</p>
<p>然而，这在开发阶段可以这样做比较好，但是在线上环境可能要加URL参数比较麻烦。于是我想到了在页面中点击某个元素10次再加载Eruda，点击10次或者更多次，然后在sessionStorage中写入<code>eruda=true</code>，然后刷新当前页。相反，再点击10次关闭Eruda。用这样比较隐藏的方式开启或关闭Eruda，这样线上环境也可以自由开启或关闭Eruda了。</p>
<p>例子：假如有这样的一个页面，里有一个标题文字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>——规则详情——</h2>
<div>
.....
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>——规则详情——<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
.....
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>那么我们可以在<code>h2</code>标签上绑定一个<code>click</code>事件，加入方法名叫<code>showEruda</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2 onclick=&quot;showEruda&quot;>——规则详情——</h2>
<div>
.....
</div>

<script>
var count = 0;
function showEruda () {
    if (count >= 10) {    
        var erdua = sessionStorage.getItem('erdua');
        if (!erdua || erdua === 'false'){
            sessionStorage.setItem('eruda', 'true')
        } else {
            sessionStorage.setItem('eruda', 'false')
        }
        location.reload()
    }
    count++
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"showEruda"</span>&gt;</span>——规则详情——<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
.....
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showEruda</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (count &gt;= <span class="hljs-number">10</span>) {    
        <span class="hljs-keyword">var</span> erdua = sessionStorage.getItem(<span class="hljs-string">'erdua'</span>);
        <span class="hljs-keyword">if</span> (!erdua || erdua === <span class="hljs-string">'false'</span>){
            sessionStorage.setItem(<span class="hljs-string">'eruda'</span>, <span class="hljs-string">'true'</span>)
        } <span class="hljs-keyword">else</span> {
            sessionStorage.setItem(<span class="hljs-string">'eruda'</span>, <span class="hljs-string">'false'</span>)
        }
        location.reload()
    }
    count++
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这样点击规则详情10次就可以唤起Eruda了，再点击10次就关闭Eruda，反正我觉得这样挺好的。</p>
<p>不知道大家都是怎么用的呢？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小技巧|移动端网页调试神器Eruda使用技巧

## 原文链接
[https://segmentfault.com/a/1190000011759300](https://segmentfault.com/a/1190000011759300)


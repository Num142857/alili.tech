---
title: '打造专属自己的html5拼图小游戏' 
date: 2019-02-11 2:30:49
hidden: true
slug: w8g0zfgdean
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近公司刚好有个活动是要做一版 <a href="http://game.yangbai.me" rel="nofollow noreferrer" target="_blank">html5的拼图小游戏</a>，于是自己心血来潮，自己先实现了一把，也算是尝尝鲜了。下面就把大体的思路介绍一下，希望大家都可以做出一款属于自己的拼图小游戏，必须是更炫酷，更好玩！来吧，大家一起加油。。。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVu8fB" src="https://static.alili.tech/img/bVu8fB" alt="logo.png" title="logo.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">利用canvas切出小块图片</h2>
<p>我们知道现在的拼图游戏都是由九张小图片依次排列组成的，就是类似九宫格那样。那么以前的做法就是我们利用Photoshop这样的工具把原始大图【尺寸一般都是正方形的哦】切成九张小块的正方形小图，但是这种做法有点不灵活，如果我们要更换图片的话，就得重新去切图，好麻烦。。。<br>不过没关系，现在我们有了canvas！利用canvas我们可以很轻松的做到这些。核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var image = new Image();
image.onload = function() {
    var index = 1;
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            ctx.drawImage(image, 300*j, 300*i, 300, 300, 0, 0, 300, 300);
            $lis.eq(index-1).find('img').attr('src', canvas.toDataURL('image/jpeg'));
            index++;
        }
    }
}
//900x900
image.src = &quot;shanlian.jpg&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var image = new Image();
image.onload = function() {
    var index = <span class="hljs-number">1</span>;
    for (var i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">3</span>; i++) {
        for (var j=<span class="hljs-number">0</span>; j&lt;<span class="hljs-number">3</span>; j++) {
            ctx.drawImage(image, <span class="hljs-number">300</span>*j, <span class="hljs-number">300</span>*i, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>);
            $lis.eq(index<span class="hljs-number">-1</span>).find('img').attr('src', canvas.toDataURL('image/jpeg'));
            index++;
        }
    }
}
<span class="hljs-comment">//900x900</span>
image.src = <span class="hljs-string">"shanlian.jpg"</span>;</code></pre>
<h2 id="articleHeader1">实现小块图片的随机排列</h2>
<p>这里的核心是利用了javascript数组的随机排序，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="imgArr.sort(function(a, b) {
    return Math.random() - Math.random();
});
var index = 1;
for (var i=0; i<3; i++) {
    for (var j=0; j<3; j++) {
        ctx.drawImage(image, 300*j, 300*i, 300, 300, 0, 0, 300, 300);
        $lis.eq(imgArr[index-1]-1).find('img').data('seq', index).attr('src', canvas.toDataURL('image/jpeg'));
        index++;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>imgArr.sort(function(a, b) {
    <span class="hljs-keyword">return</span> Math.random() - Math.random();
});
var <span class="hljs-keyword">index</span> = <span class="hljs-number">1</span>;
<span class="hljs-keyword">for</span> (var i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">3</span>; i++) {
    <span class="hljs-keyword">for</span> (var j=<span class="hljs-number">0</span>; j&lt;<span class="hljs-number">3</span>; j++) {
        ctx.drawImage(image, <span class="hljs-number">300</span>*j, <span class="hljs-number">300</span>*i, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">300</span>, <span class="hljs-number">300</span>);
        $lis.e<span class="hljs-string">q(imgArr[index-1]-1)</span>.find(<span class="hljs-string">'img'</span>).data(<span class="hljs-string">'seq'</span>, <span class="hljs-keyword">index</span>).attr(<span class="hljs-string">'src'</span>, canvas.toDataURL(<span class="hljs-string">'image/jpeg'</span>));
        <span class="hljs-keyword">index</span>++;
    }
}</code></pre>
<h2 id="articleHeader2">相关touch事件的监听和实现</h2>
<p>这里无非就是利用向左滑动，向右滑动这些去实现拼图的操作。核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//阻止手机上浏览器的弹性下拉。。。
$('body').on('touchstart', function(e) {
    e.preventDefault();
});
$lis.on('swipeLeft', function(e) {
    e.preventDefault();
    var $this = $(this);
    var index = $this.index();
    var html = $this.html();
    var $prev = $this.prev();
    if ($.inArray(index, [3, 6]) > -1 || $prev.size() <= 0) {
        return false;
    }
    $this.html($prev.html());
    $prev.html(html);
    App.check();
});
$lis.on('swipeRight', function(e) {
    e.preventDefault();
    var $this = $(this);
    var index = $this.index();
    var html = $this.html();
    var $next = $this.next();
    if ($.inArray(index, [2, 5]) > -1 || $next.size() <= 0) {
        return false;
    }
    $this.html($next.html());
    $next.html(html);
    App.check();
});
$lis.on('swipeUp', function(e) {
    e.preventDefault();
    var $this = $(this);
    var html = $this.html();
    var index = $this.index() - 3;
    var $up = $lis.eq(index);
    if (index >= 0 &amp;&amp; $up.size() > 0) {
        $this.html($up.html());
        $up.html(html);
        App.check();
    }
});
$lis.on('swipeDown', function(e) {
    e.preventDefault();
    var $this = $(this);
    var html = $this.html();
    var index = $this.index() + 3;
    var $down = $lis.eq(index);
    if (index < 9 &amp;&amp; $down.size() > 0) {
        $this.html($down.html());
        $down.html(html);
        App.check();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//阻止手机上浏览器的弹性下拉。。。</span>
$(<span class="hljs-string">'body'</span>).on(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    e.preventDefault();
});
$lis.on(<span class="hljs-string">'swipeLeft'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    e.preventDefault();
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">$this</span> = $(this);
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">$this</span>.index();
    <span class="hljs-keyword">var</span> html = <span class="hljs-keyword">$this</span>.html();
    <span class="hljs-keyword">var</span> $prev = <span class="hljs-keyword">$this</span>.prev();
    <span class="hljs-keyword">if</span> ($.inArray(index, [<span class="hljs-number">3</span>, <span class="hljs-number">6</span>]) &gt; <span class="hljs-number">-1</span> || $prev.size() &lt;= <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }
    <span class="hljs-keyword">$this</span>.html($prev.html());
    $prev.html(html);
    App.check();
});
$lis.on(<span class="hljs-string">'swipeRight'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    e.preventDefault();
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">$this</span> = $(this);
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">$this</span>.index();
    <span class="hljs-keyword">var</span> html = <span class="hljs-keyword">$this</span>.html();
    <span class="hljs-keyword">var</span> $next = <span class="hljs-keyword">$this</span>.next();
    <span class="hljs-keyword">if</span> ($.inArray(index, [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>]) &gt; <span class="hljs-number">-1</span> || $next.size() &lt;= <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }
    <span class="hljs-keyword">$this</span>.html($next.html());
    $next.html(html);
    App.check();
});
$lis.on(<span class="hljs-string">'swipeUp'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    e.preventDefault();
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">$this</span> = $(this);
    <span class="hljs-keyword">var</span> html = <span class="hljs-keyword">$this</span>.html();
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">$this</span>.index() - <span class="hljs-number">3</span>;
    <span class="hljs-keyword">var</span> $up = $lis.eq(index);
    <span class="hljs-keyword">if</span> (index &gt;= <span class="hljs-number">0</span> &amp;&amp; $up.size() &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">$this</span>.html($up.html());
        $up.html(html);
        App.check();
    }
});
$lis.on(<span class="hljs-string">'swipeDown'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{
    e.preventDefault();
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">$this</span> = $(this);
    <span class="hljs-keyword">var</span> html = <span class="hljs-keyword">$this</span>.html();
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">$this</span>.index() + <span class="hljs-number">3</span>;
    <span class="hljs-keyword">var</span> $down = $lis.eq(index);
    <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">9</span> &amp;&amp; $down.size() &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">$this</span>.html($down.html());
        $down.html(html);
        App.check();
    }
});</code></pre>
<h2 id="articleHeader3">游戏是否完成的判断</h2>
<p>这里的话，拼图顺序的每一次变化都要去检测一下是否完成了，原理就是获取当前小块图片的顺序和原始的图片进行比较。核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var resArr = [];
$('#gameBox img').each(function(k, v) {
    resArr.push(v.getAttribute(&quot;data-seq&quot;));
});
if (resArr.join(&quot;&quot;) === oriArr.join(&quot;&quot;)) {
    //完成的处理。。。
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> resArr = [];
$(<span class="hljs-string">'#gameBox img'</span>).each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k, v</span>) </span>{
    resArr.push(v.getAttribute(<span class="hljs-string">"data-seq"</span>));
});
<span class="hljs-keyword">if</span> (resArr.join(<span class="hljs-string">""</span>) === oriArr.join(<span class="hljs-string">""</span>)) {
    <span class="hljs-comment">//完成的处理。。。</span>
}</code></pre>
<p>核心代码和思路就是上面这些，其实整个过程走下来还是蛮简单的，接下来无非要做的就是再加一下花哨的东西了（时间，难度等级，排名等等）。如果大家感兴趣的话，完整版代码猛戳 <a href="https://github.com/yangbai1991/html5-puzzle" rel="nofollow noreferrer" target="_blank">这里</a> 了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
打造专属自己的html5拼图小游戏

## 原文链接
[https://segmentfault.com/a/1190000004997538](https://segmentfault.com/a/1190000004997538)


---
title: '你所不知道的 Console' 
date: 2019-02-02 2:30:10
hidden: true
slug: sqax56bolg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">你所不知道的 Console</h1>
<blockquote>本文原稿来自 <a href="https://github.com/zhangxiangliang/your-dont-know-series/blob/master/your-dont-know-console.md" rel="nofollow noreferrer" target="_blank">你所不知道的 X 系列</a>
</blockquote>
<h2 id="articleHeader1">1.凡人视角</h2>
<h4>打印字符串</h4>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;I am a 凡人&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I am a 凡人"</span>);</code></pre>
<h4>打印提示消息</h4>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.info(&quot;Yes, you arm a 凡人&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.info(<span class="hljs-string">"Yes, you arm a 凡人"</span>);</code></pre>
<h4>打印警告消息</h4>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.warn(&quot;凡人你居然敢窥视我&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"凡人你居然敢窥视我"</span>);</code></pre>
<h4>打印错误消息</h4>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.error(&quot;天兵天将，把这个凡人给我打入地狱&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.error(<span class="hljs-string">"天兵天将，把这个凡人给我打入地狱"</span>);</code></pre>
<h4>打印调试信息</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.debug(&quot;我就是传说中的debug&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">console.debug(<span class="hljs-string">"我就是传说中的debug"</span>)<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader2">2.上帝视角</h2>
<h4>查看所有方法</h4>
<p><code>console</code> 除了上面的几个方法还有什么方法呢？<code>log</code> 除了能打印字符串外，还能打印出对象，我们可以利用 <code>console.log</code> 打印自己。</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(console);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">console</span>);</code></pre>
<p>输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {
    assert: ...,
    clear: ...,
    count: ...,
    debug: ...,
    dir: ...,
    dirxml: ...,
    error: ...,
    group: ...,
    groupCollapsed: ...,
    groupEnd: ...,
    info: ...,
    log: ...,
    markTimeline: ...,
    profile: ...,
    profileEnd: ...,
    table: ...,
    time: ...,
    timeEnd: ...,
    timeStamp: ...,
    timeline: ...,
    timelineEnd: ...,
    trace: ...,
    warn: ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span> {
    <span class="hljs-attr">assert</span>: ...,
    <span class="hljs-attr">clear</span>: ...,
    <span class="hljs-attr">count</span>: ...,
    <span class="hljs-attr">debug</span>: ...,
    <span class="hljs-attr">dir</span>: ...,
    <span class="hljs-attr">dirxml</span>: ...,
    <span class="hljs-attr">error</span>: ...,
    <span class="hljs-attr">group</span>: ...,
    <span class="hljs-attr">groupCollapsed</span>: ...,
    <span class="hljs-attr">groupEnd</span>: ...,
    <span class="hljs-attr">info</span>: ...,
    <span class="hljs-attr">log</span>: ...,
    <span class="hljs-attr">markTimeline</span>: ...,
    <span class="hljs-attr">profile</span>: ...,
    <span class="hljs-attr">profileEnd</span>: ...,
    <span class="hljs-attr">table</span>: ...,
    <span class="hljs-attr">time</span>: ...,
    <span class="hljs-attr">timeEnd</span>: ...,
    <span class="hljs-attr">timeStamp</span>: ...,
    <span class="hljs-attr">timeline</span>: ...,
    <span class="hljs-attr">timelineEnd</span>: ...,
    <span class="hljs-attr">trace</span>: ...,
    <span class="hljs-attr">warn</span>: ...
}</code></pre>
<p>啊咧咧？怎么这么多方法。其实上面的 <code>console</code> 方法 <code>不一定每个浏览器</code> 都有实现，我这边使用的是 <code>chrome浏览器</code> 。所以说，这个特性是非标准的，请尽量不要在 <code>生产环境</code> 中使用它。</p>
<p>但是我们可以在 <code>开发环境</code> 中，<code>合理的利用</code> 这些方法来帮助我们开发。</p>
<h4>清理控制台</h4>
<p>如果我们在控制台调试的时候，难免 <code>强迫症</code> 发作想清理掉已经乱七八糟的控制台。浏览器和命令行 <code>clear</code> 一样提供了一个清理函数 <code>console.clear()</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.clear()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.clear()</code></pre>
<p>当然我们也可以用 <code>chrome</code> 的 <code>command line api</code> 来清理控制台。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clear()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">clear()</code></pre>
<p>又或者可以使用按键Mac上 <code>cmd + k</code> ，Win <code>ctrl + l</code>（我用的是<code>chrome浏览器</code>）。</p>
<h4>分组</h4>
<p>当代码非常长，或者我们需要把一个函数，或者一个文件中的函数等区分出来。我们可以使用分组来实现。</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.group('凡人');
console.log(&quot;手&quot;);
console.log(&quot;脚&quot;);
console.groupEnd();

console.group('神');
console.log(&quot;法力无边&quot;);
console.log(&quot;腾云架雾&quot;);
console.groupEnd();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.group(<span class="hljs-string">'凡人'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"手"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"脚"</span>);
<span class="hljs-built_in">console</span>.groupEnd();

<span class="hljs-built_in">console</span>.group(<span class="hljs-string">'神'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"法力无边"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"腾云架雾"</span>);
<span class="hljs-built_in">console</span>.groupEnd();</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/bVCmKx?w=718&amp;h=252" src="https://static.alili.tech/img/bVCmKx?w=718&amp;h=252" alt="console.group" title="console.group" style="cursor: pointer;"></span></p>
<p>如果想要输出为折叠，我们可以使用 <code>console.groupCollapsed</code> ，用法和 <code>console.group</code> 类似。</p>
<h4>查看对象信息</h4>
<p>有时候我们需要打印出对象信息,可以使用 <code>console.log</code> 来进行简单的输出。</p>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    head: 1,
    hand: 2,
    leg: 2
};
console.log(person);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var person = {
<span class="hljs-symbol">    head:</span> <span class="hljs-number">1</span>,
<span class="hljs-symbol">    hand:</span> <span class="hljs-number">2</span>,
<span class="hljs-symbol">    leg:</span> <span class="hljs-number">2</span>
};
console.log(person);
</code></pre>
<p>呜呜，可是这个显示得好丑，我们这个时候就可以使用传说中的神器 <code>console.table</code> 来帮助我们清楚的显示 <code>关联数组信息</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [
    {
        '姓名': '幼儿园', 
        '性别': '女'
    },
    {
        '姓名': '李狗嗨',
        '数量': 1
    }
];
console.table(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = [
    {
        <span class="hljs-string">'姓名'</span>: <span class="hljs-string">'幼儿园'</span>, 
        <span class="hljs-string">'性别'</span>: <span class="hljs-string">'女'</span>
    },
    {
        <span class="hljs-string">'姓名'</span>: <span class="hljs-string">'李狗嗨'</span>,
        <span class="hljs-string">'数量'</span>: <span class="hljs-number">1</span>
    }
];
console.table(<span class="hljs-keyword">data</span>);</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/bVCmKK?w=1374&amp;h=172" src="https://static.alili.tech/img/bVCmKK?w=1374&amp;h=172" alt="console.table" title="console.table" style="cursor: pointer; display: inline;"></span></p>
<p>但是如果想要看详细的对象信息，我们可以使用 <code>console.dir</code>，将一个 <code>JavaScript</code> 对象的所有属性和属性值显示成一个可交互的列表，它还能打印出函数等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.dir(clear);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.dir(clear);</code></pre>
<p>什么？你想看某个节点中的html代码？没事，我们可以用 <code>console.dirxml</code> 来查看页面中对应元素的 <code>html/xml</code> 内容。</p>
<p>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='person'>
    <p>I am a 凡人</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'person'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I am a 凡人<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>javascirpt代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = document.getElementById('person');
console.dirxml(person)；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> person = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'person'</span>);
<span class="hljs-built_in">console</span>.dirxml(person)；</code></pre>
<h4>性能测试</h4>
<p>雷军粑粑老是喜欢说：“不服？跑个分。”有时候，我们也需要对代码跑个分。这个时候，我们可以使用<code>console.time</code>和<code>console.timeEnd</code>，他们可以记录代码运行所花费的时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;神机妙算&quot;);
(function () {
    for(var i = 0; i < 10; i++) {
        var sum = (function () {
            var flog = 0;
            for(var i = 0; i < 10; i++) {
                flog+=i;
            }
        })();
    }
})();
console.timeEnd(&quot;神机妙算&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.time(<span class="hljs-string">"神机妙算"</span>);
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        <span class="hljs-keyword">var</span> sum = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> flog = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
                flog+=i;
            }
        })();
    }
})();
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"神机妙算"</span>);</code></pre>
<p>啊咧咧？你这个顶多就是 <code>计时器</code> 怎么能说是 <code>性能测试</code> 。客官别急，我们这还有一个叫做 <code>console.profile</code> 和 <code>console.profileEnd</code> 姐妹呢~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.profile(&quot;神机妙算&quot;);
(function () {
    for(var i = 0; i < 10; i++) {
        var sum = (function () {
            var flog = 0;
            for(var i = 0; i < 10; i++) {
                flog+=i;
            }
        })();
    }
})();
console.profileEnd(&quot;神机妙算&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.profile(<span class="hljs-string">"神机妙算"</span>);
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
        <span class="hljs-keyword">var</span> sum = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> flog = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
                flog+=i;
            }
        })();
    }
})();
<span class="hljs-built_in">console</span>.profileEnd(<span class="hljs-string">"神机妙算"</span>);</code></pre>
<p>输出会显示在 <code>profile</code></p>
<p><span class="img-wrap"><img data-src="/img/bVCmKN?w=2098&amp;h=440" src="https://static.alili.tech/img/bVCmKN?w=2098&amp;h=440" alt="console.profile" title="console.profile" style="cursor: pointer;"></span></p>
<p>什么还是不够？你还想知道运行时的结果栈？可以可以，我们这还有一位 <code>console.trace</code> 哦。他可以看透大爷你的一局一动哦。<br>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(num) {
    if (0 < num) {
        console.trace(&quot;现在num的值为&quot;, num);
        return num + add(num - 1);
    } else {
        return 0;
    }
}

var a =3;
add(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function add(<span class="hljs-built_in">num</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-number">0</span> &lt; <span class="hljs-built_in">num</span>) {
        console.<span class="hljs-built_in">trace</span>(<span class="hljs-string">"现在num的值为"</span>, <span class="hljs-built_in">num</span>);
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">num</span> + add(<span class="hljs-built_in">num</span> - <span class="hljs-number">1</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">return</span> <span class="hljs-number">0</span>;
    }
}

<span class="hljs-built_in">var</span> a =<span class="hljs-number">3</span>;
add(<span class="hljs-number">3</span>);</code></pre>
<p>输出：</p>
<p><span class="img-wrap"><img data-src="/img/bVCmKS?w=1116&amp;h=206" src="https://static.alili.tech/img/bVCmKS?w=1116&amp;h=206" alt="console.trace" title="console.trace" style="cursor: pointer;"></span></p>
<h4>判断真假</h4>
<p>平时我们在写代码是时候，经常需要判断一下当前值的真假情况，使用if或者三元表达式来达到目的。我们现在也可以使用 <code>console.assert</code> 来判断，该方法会在条件为错误时，返回一个 <code>console.error</code> 的输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.assert(1 == 1);
console.assert(1 == 0);
console.assert(!(1 == 0));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>console.assert(<span class="hljs-number">1</span> == <span class="hljs-number">1</span>);
console.assert(<span class="hljs-number">1</span> == <span class="hljs-number">0</span>);
console.assert(!(<span class="hljs-number">1</span> == <span class="hljs-number">0</span>));</code></pre>
<h4>统计次数</h4>
<p>有时候我们需要统计一个函数或者被调用了几次，我们通常会增加一个变量 <code>count</code> 来记录，然后在控制台中查看。这样相当的麻烦，我们可以使用 <code>console.count</code> 函数来帮忙我们记录次数，并输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hi(name) {
    console.count(name);
    return &quot;hi &quot; + name;
}

for(var i = 0; i < 10; i++) {
    if(i < 4) {
        hi(&quot;person&quot;);
    } else {
        hi(&quot;god&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hi</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-built_in">console</span>.count(name);
    <span class="hljs-keyword">return</span> <span class="hljs-string">"hi "</span> + name;
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">if</span>(i &lt; <span class="hljs-number">4</span>) {
        hi(<span class="hljs-string">"person"</span>);
    } <span class="hljs-keyword">else</span> {
        hi(<span class="hljs-string">"god"</span>);
    }
}</code></pre>
<h2 id="articleHeader3">总结</h2>
<p><code>console</code> 中有很多对我们调试代码有帮助的函数，我们可以在开发环境中配合 <code>console</code> 来调试代码，使得我们测试更加便利。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你所不知道的 Console

## 原文链接
[https://segmentfault.com/a/1190000006721606](https://segmentfault.com/a/1190000006721606)


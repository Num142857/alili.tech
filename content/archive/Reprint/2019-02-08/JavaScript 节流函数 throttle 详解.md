---
title: 'JavaScript 节流函数 throttle 详解' 
date: 2019-02-08 2:30:40
hidden: true
slug: h3r9nmzwpq5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文：<a href="https://keelii.github.io/2016/06/11/javascript-throttle/" rel="nofollow noreferrer" target="_blank">https://keelii.github.io/2016/06/11/javascript-throttle/</a></p></blockquote>
<p>在浏览器 DOM 事件里面，有一些事件会随着用户的操作不间断触发。比如：重新调整浏览器窗口大小（resize），浏览器页面滚动（scroll），鼠标移动（mousemove）。也就是说用户在触发这些浏览器操作的时候，如果脚本里面绑定了对应的事件处理方法，这个方法就不停的触发。</p>
<p>这并不是我们想要的，因为有的时候如果事件处理方法比较庞大，DOM 操作比如复杂，还不断的触发此类事件就会造成性能上的损失，导致用户体验下降（UI 反映慢、浏览器卡死等）。所以通常来讲我们会给相应事件添加延迟执行的逻辑。</p>
<p>通常来说我们用下面的代码来实现这个功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var COUNT = 0;
function testFn() { console.log(COUNT++); }
// 浏览器resize的时候
// 1. 清除之前的计时器
// 2. 添加一个计时器让真正的函数testFn延后100毫秒触发
window.onresize = function () {
    var timer = null;
    clearTimeout(timer);

    timer = setTimeout(function() {
        testFn();
    }, 100);
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> COUNT = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFn</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(COUNT++); }
<span class="hljs-comment">// 浏览器resize的时候</span>
<span class="hljs-comment">// 1. 清除之前的计时器</span>
<span class="hljs-comment">// 2. 添加一个计时器让真正的函数testFn延后100毫秒触发</span>
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
    clearTimeout(timer);

    timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        testFn();
    }, <span class="hljs-number">100</span>);
};
</code></pre>
<p>细心的同学会发现上面的代码其实是错误的，这是新手会犯的一个问题：setTimeout 函数返回值应该保存在一个相对全局变量里面，否则每次 resize 的时候都会产生一个新的计时器，这样就达不到我们发的效果了</p>
<p>于是我们修改了代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timer = null;
window.onresize = function () {
    clearTimeout(timer);
    timer = setTimeout(function() {
        testFn();
    }, 100);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    clearTimeout(timer);
    timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        testFn();
    }, <span class="hljs-number">100</span>);
};</code></pre>
<p>这时候代码就正常了，但是又多了一个新问题 —— 产生了一个全局变量 timer。这是我们不想见到的，如果这个页面还有别的功能也叫 timer 不同的代码之前就是产生冲突。为了解决这个问题我们要用 JavaScript 的一个语言特性：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures" rel="nofollow noreferrer" target="_blank">闭包</a> closures 。相关知识读者可以去 MDN 中了解，改造后的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */
var throttle = function (fn, delay) {
    var timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
};
window.onresize = throttle(testFn, 200, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */</span>
<span class="hljs-keyword">var</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, delay</span>) </span>{
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        clearTimeout(timer);
        timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            fn();
        }, delay);
    }
};
<span class="hljs-built_in">window</span>.onresize = throttle(testFn, <span class="hljs-number">200</span>, <span class="hljs-number">1000</span>);</code></pre>
<p>我们用一个闭包函数（throttle节流）把 timer 放在内部并且返回延时处理函数，这样以来 timer 变量对外是不可见的，但是内部延时函数触发时还可以访问到 timer 变量。</p>
<p>当然这种写法对于新手来说不好理解，我们可以变换一种写法来理解一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var throttle = function (fn, delay) {
    var timer = null;

    return function () {
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn();
        }, delay);
    }
};

var f = throttle(testFn, 200);
window.onresize = function () {
    f();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, delay</span>) </span>{
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        clearTimeout(timer);
        timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            fn();
        }, delay);
    }
};

<span class="hljs-keyword">var</span> f = throttle(testFn, <span class="hljs-number">200</span>);
<span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    f();
};</code></pre>
<p>这里主要了解一点：throttle 被调用后返回的 function 才是真正的 onresize 触发时需要调用的函数</p>
<p>现在看起来这个方法已经接近完美了，然而实际使用中并非如此。举个例子：</p>
<blockquote><p>如果用户 <strong>不断的</strong> resize 浏览器窗口大小，这时延迟处理函数一次都不会执行</p></blockquote>
<p>于是我们又要添加一个功能：当用户触发 resize 的时候应该 <strong>在某段时间</strong> 内至少触发一次，既然是在某段时间内，那么这个判断条件就可以取当前的时间毫秒数，每次函数调用把当前的时间和上一次调用时间相减，然后判断差值如果大于 <strong>某段时间</strong> 就直接触发，否则还是走 timeout 的延迟逻辑。</p>
<p>下面的代码里面需要指出的是：</p>
<ol>
<li><p>previous 变量的作用和 timer 类似，都是记录上一次的标识，必须是相对的全局变量</p></li>
<li><p>如果逻辑流程走的是“至少触发一次”的逻辑，那么函数调用完成需要把 previous 重置成当前时间，简单来说就是：相对于下一次的上一次其实就是当前</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
var throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;

    return function () {
        var now = +new Date();

        if ( !previous ) previous = now;

        if ( now - previous > atleast ) {
            fn();
            // 重置上一次开始时间为本次结束时间
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn();
            }, delay);
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */</span>
<span class="hljs-keyword">var</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, delay, atleast</span>) </span>{
    <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> previous = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

        <span class="hljs-keyword">if</span> ( !previous ) previous = now;

        <span class="hljs-keyword">if</span> ( now - previous &gt; atleast ) {
            fn();
            <span class="hljs-comment">// 重置上一次开始时间为本次结束时间</span>
            previous = now;
        } <span class="hljs-keyword">else</span> {
            clearTimeout(timer);
            timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                fn();
            }, delay);
        }
    }
};</code></pre>
<p>实践：</p>
<p>我们模拟一个窗口 scroll 时节流的场景，也就是说当用户滚动页面向下的时候我们需要节流执行一些方法，比如：计算 DOM 位置等需要连续操作 DOM 元素的动作</p>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>throttle</title>
</head>
<body>
    <div style=&quot;height:5000px&quot;>
        <div id=&quot;demo&quot; style=&quot;position:fixed;&quot;></div>
    </div>
    <script>
    var COUNT = 0, demo = document.getElementById('demo');
    function testFn() {demo.innerHTML += 'testFN 被调用了 ' + ++COUNT + '次<br>';}

    var throttle = function (fn, delay, atleast) {
        var timer = null;
        var previous = null;

        return function () {
            var now = +new Date();

            if ( !previous ) previous = now;
            if ( atleast &amp;&amp; now - previous > atleast ) {
                fn();
                // 重置上一次开始时间为本次结束时间
                previous = now;
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn();
                    previous = null;
                }, delay);
            }
        }
    };
    window.onscroll = throttle(testFn, 200);
    // window.onscroll = throttle(testFn, 500, 1000);
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>throttle<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height:5000px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:fixed;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> COUNT = <span class="hljs-number">0</span>, demo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'demo'</span>);
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testFn</span>(<span class="hljs-params"></span>) </span>{demo.innerHTML += <span class="hljs-string">'testFN 被调用了 '</span> + ++COUNT + <span class="hljs-string">'次&lt;br&gt;'</span>;}

    <span class="hljs-keyword">var</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn, delay, atleast</span>) </span>{
        <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> previous = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

            <span class="hljs-keyword">if</span> ( !previous ) previous = now;
            <span class="hljs-keyword">if</span> ( atleast &amp;&amp; now - previous &gt; atleast ) {
                fn();
                <span class="hljs-comment">// 重置上一次开始时间为本次结束时间</span>
                previous = now;
                clearTimeout(timer);
            } <span class="hljs-keyword">else</span> {
                clearTimeout(timer);
                timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    fn();
                    previous = <span class="hljs-literal">null</span>;
                }, delay);
            }
        }
    };
    <span class="hljs-built_in">window</span>.onscroll = throttle(testFn, <span class="hljs-number">200</span>);
    <span class="hljs-comment">// window.onscroll = throttle(testFn, 500, 1000);</span>
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们用两个 case 来测试效果，分别是添加至少触发 atleast 参数和不添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// case 1
window.onscroll = throttle(testFn, 200);
// case 2
window.onscroll = throttle(testFn, 200, 500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// case 1</span>
<span class="hljs-built_in">window</span>.onscroll = throttle(testFn, <span class="hljs-number">200</span>);
<span class="hljs-comment">// case 2</span>
<span class="hljs-built_in">window</span>.onscroll = throttle(testFn, <span class="hljs-number">200</span>, <span class="hljs-number">500</span>);</code></pre>
<p><strong>case 1</strong> 的表现为：在页面滚动的过程（不能停止）中 testFN 不会被调用，直到停止的时候会调用一次，也就是说执行的是 throttle 里面 <strong>最后</strong> 一个 setTimeout ，效果如图（查看原 gif 图）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006933522?w=534&amp;h=333" src="https://static.alili.tech/img/remote/1460000006933522?w=534&amp;h=333" alt="case1" title="case1" style="cursor: pointer;"></span></p>
<p><strong>case 2</strong> 的表现为：在页面滚动的过程（不能停止）中 testFN 第一次会延迟 500ms 执行（来自至少延迟逻辑），后来至少每隔 500ms 执行一次，效果如图</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005803788" src="https://static.alili.tech/img/remote/1460000005803788" alt="case2" title="case2" style="cursor: pointer;"></span></p>
<p>至此为止，我们想要实现的效果已经基本完成。后续的一些辅助性优化读者可以自己琢磨，如：函数 this 指向，返回值保存等。</p>
<p>引用：</p>
<ol>
<li><p>测试代码 <a href="http://jsbin.com/tanuxegija/edit" rel="nofollow noreferrer" target="_blank">http://jsbin.com/tanuxegija/edit</a></p></li>
<li><p>完整版本代码 <a href="http://jsbin.com/jigozuvuko" rel="nofollow noreferrer" target="_blank">http://jsbin.com/jigozuvuko</a></p></li>
<li><p>Debounce VS throttle <a href="https://github.com/dcorb/debounce-throttle" rel="nofollow noreferrer" target="_blank">https://github.com/dcorb/debounce-throttle</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 节流函数 throttle 详解

## 原文链接
[https://segmentfault.com/a/1190000005803785](https://segmentfault.com/a/1190000005803785)


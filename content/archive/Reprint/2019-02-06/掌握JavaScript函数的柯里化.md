---
title: '掌握JavaScript函数的柯里化' 
date: 2019-02-06 2:30:09
hidden: true
slug: x5e323tgxcf
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/dreamapplehappy/hacking-with-javascript/blob/master/books/javascript-the-good-parts/chapter-4-function/currying.md" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<blockquote><p><a href="https://www.haskell.org/" rel="nofollow noreferrer" target="_blank">Haskell</a>和<a href="http://www.scala-lang.org/" rel="nofollow noreferrer" target="_blank">scala</a>都支持函数的柯里化,JavaScript函数的柯里化还与<a href="http://eloquentjavascript.net/1st_edition/chapter6.html" rel="nofollow noreferrer" target="_blank">JavaScript的函数编程</a>有很大的联系,如果你感兴趣的话,可以在这些方面多下功夫了解,相信收获一定很多.</p></blockquote>
<p>看本篇文章需要知道的一些知识点</p>
<ul>
<li><p>函数部分的<code>call</code>/<code>apply</code>/<code>arguments</code></p></li>
<li><p>闭包</p></li>
<li><p>高阶函数</p></li>
<li><p>不完全函数</p></li>
</ul>
<p>文章后面有对这些知识的简单解释,大家可以看看.</p>
<h3 id="articleHeader0">什么是柯里化?</h3>
<p>我们先来看看<a href="https://zh.wikipedia.org/zh-cn/%E6%9F%AF%E9%87%8C%E5%8C%96" rel="nofollow noreferrer" target="_blank">维基百科</a>中是如何定义的:<strong>在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。</strong></p>
<p>我们可以举个简单的例子,如下函数<code>add</code>是一般的一个函数,就是将传进来的参数<code>a</code>和<code>b</code>相加;函数<code>curryingAdd</code>就是对函数<code>add</code>进行柯里化的函数;<br>这样一来,原来我们需要直接传进去两个参数来进行运算的函数,现在需要分别传入参数<code>a</code>和<code>b</code>,函数如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add(a, b) {
    return a + b;
}

function curryingAdd(a) {
    return function(b) {
        return a + b;
    }
}

add(1, 2); // 3
curryingAdd(1)(2); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curryingAdd</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">b</span>) </span>{
        <span class="hljs-keyword">return</span> a + b;
    }
}

add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span>
curryingAdd(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>); <span class="hljs-comment">// 3</span></code></pre>
<p>看到这里你可能会想,这样做有什么用?为什么要这样做?这样做能够给我们的应用带来什么样的好处?先别着急,我们接着往下看.</p>
<h4>为什么要对函数进行柯里化?</h4>
<ul>
<li><p>可以使用一些小技巧(见下文)</p></li>
<li><p>提前绑定好函数里面的某些参数,达到参数复用的效果,提高了适用性.</p></li>
<li><p>固定易变因素</p></li>
<li><p>延迟计算</p></li>
</ul>
<p>总之,函数的柯里化能够让你重新组合你的应用,把你的复杂功能拆分成一个一个的小部分,每一个小的部分都是简单的,便于理解的,而且是容易测试的;</p>
<h3 id="articleHeader1">如何对函数进行柯里化?</h3>
<p>在这一部分里,我们由浅入深的一步步来告诉大家如何对一个多参数的函数进行柯里化.其中用到的知识有<code>闭包</code>,<code>高阶函数</code>,<code>不完全函数</code>等等.</p>
<ul><li><p><strong>I 开胃菜</strong></p></li></ul>
<p>假如我们要实现一个功能,就是输出语句<code>name</code>喜欢<code>song</code>,其中<code>name</code>和<code>song</code>都是可变参数;那么一般情况下我们会这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function printInfo(name, song) {
    console.log(name + '喜欢的歌曲是: ' + song);
}
printInfo('Tom', '七里香');
printInfo('Jerry', '雅俗共赏');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printInfo</span>(<span class="hljs-params">name, song</span>) </span>{
    <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">'喜欢的歌曲是: '</span> + song);
}
printInfo(<span class="hljs-string">'Tom'</span>, <span class="hljs-string">'七里香'</span>);
printInfo(<span class="hljs-string">'Jerry'</span>, <span class="hljs-string">'雅俗共赏'</span>);</code></pre>
<p>对上面的函数进行柯里化之后,我们可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curryingPrintInfo(name) {
    return function(song) {
        console.log(name + '喜欢的歌曲是: ' + song);
    }
}
var tomLike = curryingPrintInfo('Tom');
tomLike('七里香');
var jerryLike = curryingPrintInfo('Jerry');
jerryLike('雅俗共赏');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curryingPrintInfo</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">song</span>) </span>{
        <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">'喜欢的歌曲是: '</span> + song);
    }
}
<span class="hljs-keyword">var</span> tomLike = curryingPrintInfo(<span class="hljs-string">'Tom'</span>);
tomLike(<span class="hljs-string">'七里香'</span>);
<span class="hljs-keyword">var</span> jerryLike = curryingPrintInfo(<span class="hljs-string">'Jerry'</span>);
jerryLike(<span class="hljs-string">'雅俗共赏'</span>);</code></pre>
<ul><li><p><strong>II 小鸡炖蘑菇</strong></p></li></ul>
<p>上面我们虽然对对函数<code>printInfo</code>进行了柯里化,但是我们可不想在需要柯里化的时候,都像上面那样不断地进行函数的嵌套,那简直是噩梦;<br>  所以我们要创造一些帮助其它函数进行柯里化的函数,我们暂且叫它为<code>curryingHelper</code>吧,一个简单的<code>curryingHelper</code>函数如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function curryingHelper(fn) {
    var _args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var _newArgs = Array.prototype.slice.call(arguments);
        var _totalArgs = _args.concat(_newArgs);
        return fn.apply(this, _totalArgs);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">curryingHelper</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> _args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _newArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">var</span> _totalArgs = _args.concat(_newArgs);
        <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, _totalArgs);
    }
}</code></pre>
<p>这里解释一点东西,首先函数的<code>arguments</code>表示的是传递到函数中的参数对象,它不是一个数组,它是一个类数组对象;<br>  所以我们可以使用函数的<code>Array.prototype.slice</code>方法,然后使用<code>.call</code>方法来获取<code>arguments</code>里面的内容.<br>  我们使用<code>fn.apply(this, _totalArgs)</code>来给函数<code>fn</code>传递正确的参数.</p>
<p>接下来我们来写一个简单的函数验证上面的辅助柯里化函数的正确性, 代码部分如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showMsg(name, age, fruit) {
    console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
}

var curryingShowMsg1 = curryingHelper(showMsg, 'dreamapple');
curryingShowMsg1(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple

var curryingShowMsg2 = curryingHelper(showMsg, 'dreamapple', 20);
curryingShowMsg2('watermelon'); // My name is dreamapple, I'm 20 years old,  and I like eat watermelon" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showMsg</span>(<span class="hljs-params">name, age, fruit</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'My name is '</span> + name + <span class="hljs-string">', I\'m '</span> + age + <span class="hljs-string">' years old, '</span> + <span class="hljs-string">' and I like eat '</span> + fruit);
}

<span class="hljs-keyword">var</span> curryingShowMsg1 = curryingHelper(showMsg, <span class="hljs-string">'dreamapple'</span>);
curryingShowMsg1(<span class="hljs-number">22</span>, <span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>

<span class="hljs-keyword">var</span> curryingShowMsg2 = curryingHelper(showMsg, <span class="hljs-string">'dreamapple'</span>, <span class="hljs-number">20</span>);
curryingShowMsg2(<span class="hljs-string">'watermelon'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 20 years old,  and I like eat watermelon</span></code></pre>
<p>上面的结果表示,我们的这个柯里化的函数是正确的.上面的<code>curryingHelper</code>就是一个<strong>高阶函数</strong>,关于高阶函数的解释可以参照下文.</p>
<ul><li><p><strong>III 牛肉火锅</strong></p></li></ul>
<p>上面的柯里化帮助函数确实已经能够达到我们的一般性需求了,但是它还不够好,我们希望那些经过柯里化后的函数可以每次只传递进去一个参数,<br>  然后可以进行多次参数的传递,那么应该怎么办呢?我们可以再花费一些脑筋,写出一个<code>betterCurryingHelper</code>函数,实现我们上面说的那些<br>  功能.代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function betterCurryingHelper(fn, len) {
    var length = len || fn.length;
    return function () {
        var allArgsFulfilled = (arguments.length >= length);

        // 如果参数全部满足,就可以终止递归调用
        if (allArgsFulfilled) {
            return fn.apply(this, arguments);
        }
        else {
            var argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));
            return betterCurryingHelper(curryingHelper.apply(this, argsNeedFulfilled), length - arguments.length);
        }
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">betterCurryingHelper</span>(<span class="hljs-params">fn, len</span>) </span>{
    <span class="hljs-keyword">var</span> length = len || fn.length;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> allArgsFulfilled = (<span class="hljs-built_in">arguments</span>.length &gt;= length);

        <span class="hljs-comment">// 如果参数全部满足,就可以终止递归调用</span>
        <span class="hljs-keyword">if</span> (allArgsFulfilled) {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">var</span> argsNeedFulfilled = [fn].concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>));
            <span class="hljs-keyword">return</span> betterCurryingHelper(curryingHelper.apply(<span class="hljs-keyword">this</span>, argsNeedFulfilled), length - <span class="hljs-built_in">arguments</span>.length);
        }
    };
}</code></pre>
<p>其中<code>curryingHelper</code>就是上面<strong>II 小鸡炖蘑菇</strong>中提及的那个函数.需要注意的是<code>fn.length</code>表示的是这个函数的参数长度.<br>  接下来我们来检验一下这个函数的正确性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var betterShowMsg = betterCurryingHelper(showMsg);
betterShowMsg('dreamapple', 22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple', 22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple')(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> betterShowMsg = betterCurryingHelper(showMsg);
betterShowMsg(<span class="hljs-string">'dreamapple'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
betterShowMsg(<span class="hljs-string">'dreamapple'</span>, <span class="hljs-number">22</span>)(<span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
betterShowMsg(<span class="hljs-string">'dreamapple'</span>)(<span class="hljs-number">22</span>, <span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
betterShowMsg(<span class="hljs-string">'dreamapple'</span>)(<span class="hljs-number">22</span>)(<span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span></code></pre>
<p>其中<code>showMsg</code>就是<strong>II 小鸡炖蘑菇</strong>部分提及的那个函数.<br>  我们可以看出来,这个<code>betterCurryingHelper</code>确实实现了我们想要的那个功能.并且我们也可以像使用原来的那个函数一样使用柯里化后的函数.</p>
<ul><li><p><strong>IV 泡椒凤爪</strong></p></li></ul>
<p>我们已经能够写出很好的柯里化辅助函数了,但是这还不算是最刺激的,如果我们在传递参数的时候可以不按照顺来那一定很酷;当然我们也可以写出这样的函数来,<br>  这个<code>crazyCurryingHelper</code>函数如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = {};
function crazyCurryingHelper(fn, length, args, holes) {
    length = length || fn.length;
    args   = args   || [];
    holes  = holes  || [];

    return function() {
        var _args       = args.slice(),
            _holes      = holes.slice();

        // 存储接收到的args和holes的长度
        var argLength   = _args.length,
            holeLength  = _holes.length;

        var allArgumentsSpecified = false;

        // 循环
        var arg     = null,
            i       = 0,
            aLength = arguments.length;

        for(; i < aLength; i++) {
            arg = arguments[i];

            if(arg === _ &amp;&amp; holeLength) {
                // 循环holes的位置
                holeLength--;
                _holes.push(_holes.shift());
            } else if (arg === _) {
                // 存储hole就是_的位置
                _holes.push(argLength + i);
            } else if (holeLength) {
                // 是否还有没有填补的hole
                // 在参数列表指定hole的地方插入当前参数
                holeLength--;
                _args.splice(_holes.shift(), 0, arg);
            } else {
                // 不需要填补hole,直接添加到参数列表里面
                _args.push(arg);
            }
        }

        // 判断是否所有的参数都已满足
        allArgumentsSpecified = (_args.length >= length);
        if(allArgumentsSpecified) {
            return fn.apply(this, _args);
        }

        // 递归的进行柯里化
        return crazyCurryingHelper.call(this, fn, length, _args, _holes);
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _ = {};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">crazyCurryingHelper</span>(<span class="hljs-params">fn, length, args, holes</span>) </span>{
    length = length || fn.length;
    args   = args   || [];
    holes  = holes  || [];

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _args       = args.slice(),
            _holes      = holes.slice();

        <span class="hljs-comment">// 存储接收到的args和holes的长度</span>
        <span class="hljs-keyword">var</span> argLength   = _args.length,
            holeLength  = _holes.length;

        <span class="hljs-keyword">var</span> allArgumentsSpecified = <span class="hljs-literal">false</span>;

        <span class="hljs-comment">// 循环</span>
        <span class="hljs-keyword">var</span> arg     = <span class="hljs-literal">null</span>,
            i       = <span class="hljs-number">0</span>,
            aLength = <span class="hljs-built_in">arguments</span>.length;

        <span class="hljs-keyword">for</span>(; i &lt; aLength; i++) {
            arg = <span class="hljs-built_in">arguments</span>[i];

            <span class="hljs-keyword">if</span>(arg === _ &amp;&amp; holeLength) {
                <span class="hljs-comment">// 循环holes的位置</span>
                holeLength--;
                _holes.push(_holes.shift());
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (arg === _) {
                <span class="hljs-comment">// 存储hole就是_的位置</span>
                _holes.push(argLength + i);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (holeLength) {
                <span class="hljs-comment">// 是否还有没有填补的hole</span>
                <span class="hljs-comment">// 在参数列表指定hole的地方插入当前参数</span>
                holeLength--;
                _args.splice(_holes.shift(), <span class="hljs-number">0</span>, arg);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 不需要填补hole,直接添加到参数列表里面</span>
                _args.push(arg);
            }
        }

        <span class="hljs-comment">// 判断是否所有的参数都已满足</span>
        allArgumentsSpecified = (_args.length &gt;= length);
        <span class="hljs-keyword">if</span>(allArgumentsSpecified) {
            <span class="hljs-keyword">return</span> fn.apply(<span class="hljs-keyword">this</span>, _args);
        }

        <span class="hljs-comment">// 递归的进行柯里化</span>
        <span class="hljs-keyword">return</span> crazyCurryingHelper.call(<span class="hljs-keyword">this</span>, fn, length, _args, _holes);
    };
}</code></pre>
<p>一些解释,我们使用<code>_</code>来表示参数中的那些缺失的参数,如果你使用了<a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">lodash</a>的话,会有冲突的;那么你可以使用别的符号替代.<br>  按照一贯的尿性,我们还是要验证一下这个<code>crazyCurryingHelper</code>是不是实现了我们所说的哪些功能,代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var crazyShowMsg = crazyCurryingHelper(showMsg);
crazyShowMsg(_, 22)('dreamapple')('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( _, 22, 'apple')('dreamapple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( _, 22, _)('dreamapple', _, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( 'dreamapple', _, _)(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> crazyShowMsg = crazyCurryingHelper(showMsg);
crazyShowMsg(_, <span class="hljs-number">22</span>)(<span class="hljs-string">'dreamapple'</span>)(<span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
crazyShowMsg( _, <span class="hljs-number">22</span>, <span class="hljs-string">'apple'</span>)(<span class="hljs-string">'dreamapple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
crazyShowMsg( _, <span class="hljs-number">22</span>, _)(<span class="hljs-string">'dreamapple'</span>, _, <span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
crazyShowMsg( <span class="hljs-string">'dreamapple'</span>, _, _)(<span class="hljs-number">22</span>)(<span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span>
crazyShowMsg(<span class="hljs-string">'dreamapple'</span>)(<span class="hljs-number">22</span>)(<span class="hljs-string">'apple'</span>); <span class="hljs-comment">// My name is dreamapple, I'm 22 years old,  and I like eat apple</span></code></pre>
<p>结果显示,我们这个函数也实现了我们所说的那些功能.</p>
<h3 id="articleHeader2">柯里化的一些应用场景</h3>
<p>说了那么多,其实这部分才是最重要的部分;学习某个知识要一定可以用得到,不然学习它干嘛.</p>
<ul>
<li>
<p>关于函数柯里化的一些小技巧</p>
<ul>
<li>
<p>给<code>setTimeout</code>传递地进来的函数添加参数</p>
<p>一般情况下,我们如果想给一个<code>setTimeout</code>传递进来的函数添加参数的话,一般会使用之种方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hello(name) {
    console.log('Hello, ' + name);
}
setTimeout(hello('dreamapple'), 3600); //立即执行,不会在3.6s后执行
setTimeout(function() {
    hello('dreamapple');
}, 3600); // 3.6s 后执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello, '</span> + name);
}
setTimeout(hello(<span class="hljs-string">'dreamapple'</span>), <span class="hljs-number">3600</span>); <span class="hljs-comment">//立即执行,不会在3.6s后执行</span>
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    hello(<span class="hljs-string">'dreamapple'</span>);
}, <span class="hljs-number">3600</span>); <span class="hljs-comment">// 3.6s 后执行</span></code></pre>
<p>我们使用了一个新的匿名函数包裹我们要执行的函数,然后在函数体里面给那个函数传递参数值.</p>
<p>当然,在ES5里面,我们也可以使用函数的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank"><code>bind</code></a>方法,如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(hello.bind(this, 'dreamapple'), 3600); // 3.6s 之后执行函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">setTimeout(hello.bind(<span class="hljs-keyword">this</span>, <span class="hljs-string">'dreamapple'</span>), <span class="hljs-number">3600</span>); <span class="hljs-comment">// 3.6s 之后执行函数</span></code></pre>
<p>这样也是非常的方便快捷,并且可以绑定函数执行的上下文.</p>
<p>我们本篇文章是讨论函数的柯里化,当然我们这里也可以使用函数的柯里化来达到这个效果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(curryingHelper(hello, 'dreamapple'), 3600); // 其中curryingHelper是上面已经提及过的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">setTimeout(curryingHelper(hello, <span class="hljs-string">'dreamapple'</span>), <span class="hljs-number">3600</span>); <span class="hljs-comment">// 其中curryingHelper是上面已经提及过的</span></code></pre>
<p>这样也是可以的,是不是很酷.其实函数的<code>bind</code>方法也是使用函数的柯里化来完成的,详情可以看这里<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" rel="nofollow noreferrer" target="_blank">Function.prototype.bind()</a>.</p>
</li>
<li>
<p>写出这样一个函数<code>multiply(1)(2)(3) == 6</code>结果为<code>true</code>,<code>multiply(1)(2)(3)(...)(n) == (1)*(2)*(3)*(...)*(n)</code>结果为<code>true</code></p>
<p>这个题目不知道大家碰到过没有,不过通过函数的柯里化,也是有办法解决的,看下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function multiply(x) {
    var y = function(x) {
        return multiply(x * y);
    };
    y.toString = y.valueOf = function() {
        return x;
    };
    return y;
}

console.log(multiply(1)(2)(3) == 6); // true
console.log(multiply(1)(2)(3)(4)(5) == 120); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">var</span> y = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
        <span class="hljs-keyword">return</span> multiply(x * y);
    };
    y.toString = y.valueOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> x;
    };
    <span class="hljs-keyword">return</span> y;
}

<span class="hljs-built_in">console</span>.log(multiply(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>) == <span class="hljs-number">6</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(multiply(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>)(<span class="hljs-number">5</span>) == <span class="hljs-number">120</span>); <span class="hljs-comment">// true</span></code></pre>
</li>
</ul>
<p>因为<code>multiply(1)(2)(3)</code>的直接结果并不是6,而是一个函数对象<code>{ [Number: 6] valueOf: [Function], toString: [Function] }</code>,我们<br>  之后使用了<code>==</code>会将左边这个函数对象转换成为一个数字,所以就达到了我们想要的结果.还有关于为什么使用<code>toString</code>和<code>valueOf</code>方法<br>  可以看看这里的解释<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/valueOf" rel="nofollow noreferrer" target="_blank">Number.prototype.valueOf()</a>,<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString" rel="nofollow noreferrer" target="_blank">Function.prototype.toString()</a>.</p>
<ul>
<li>
<p>上面的那个函数不够纯粹,我们也可以实现一个更纯粹的函数,但是可以会不太符合题目的要求.<br>我们可以这样做,先把函数的参数存储,然后再对这些参数做处理,一旦有了这个思路,我们就不难写出些面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add() {
    var args = Array.prototype.slice.call(arguments);
    var _that = this;
    return function() {
        var newArgs = Array.prototype.slice.call(arguments);
        var total = args.concat(newArgs);
        if(!arguments.length) {
            var result = 1;
            for(var i = 0; i < total.length; i++) {
                result *= total[i];
            }
            return result;
        }
        else {
            return add.apply(_that, total);
        }
    }
}
add(1)(2)(3)(); // 6
add(1, 2, 3)(); // 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">var</span> _that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> newArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>);
        <span class="hljs-keyword">var</span> total = args.concat(newArgs);
        <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">arguments</span>.length) {
            <span class="hljs-keyword">var</span> result = <span class="hljs-number">1</span>;
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; total.length; i++) {
                result *= total[i];
            }
            <span class="hljs-keyword">return</span> result;
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> add.apply(_that, total);
        }
    }
}
add(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(); <span class="hljs-comment">// 6</span>
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)(); <span class="hljs-comment">// 6</span></code></pre>
</li>
<li>
<p>当我们的需要兼容IE9之前版本的IE浏览器的话,我们可能需要写出一些兼容的方案 ,比如事件监听;一般情况下我们应该会这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = function (el, type, fn, capture) {
        if (window.addEventListener) {
            el.addEventListener(type, fn, capture);
        }
        else {
            el.attachEvent('on' + type, fn);
        }
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, type, fn, capture</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
            el.addEventListener(type, fn, capture);
        }
        <span class="hljs-keyword">else</span> {
            el.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
        }
    };</code></pre>
</li>
</ul>
<p>这也写也是可以的,但是性能上会差一点,因为如果是在低版本的IE浏览器上每一次都会运行<code>if()</code>语句,产生了不必要的性能开销.<br>  我们也可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEvent = (function () {
        if (window.addEventListener) {
            return function (el, type, fn, capture) {
                el.addEventListener(type, fn, capture);
            }
        }
        else {
            return function (el, type, fn) {
                var IEtype = 'on' + type;
                el.attachEvent(IEtype, fn);
            }
        }
    })();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> addEvent = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, type, fn, capture</span>) </span>{
                el.addEventListener(type, fn, capture);
            }
        }
        <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, type, fn</span>) </span>{
                <span class="hljs-keyword">var</span> IEtype = <span class="hljs-string">'on'</span> + type;
                el.attachEvent(IEtype, fn);
            }
        }
    })();</code></pre>
<p>这样就减少了不必要的开支,整个函数运行一次就可以了.</p>
</li>
<li>
<p>延迟计算</p>
<p>上面的那两个函数<code>multiply()</code>和<code>add()</code>实际上就是延迟计算的例子.</p>
</li>
<li>
<p>提前绑定好函数里面的某些参数,达到参数复用的效果,提高了适用性.</p>
<p>我们的<code>I 开胃菜</code>部分的<code>tomLike</code>和<code>jerryLike</code>其实就是属于这种的,绑定好函数里面的第一个参数,然后后面根据情况分别使用不同的函数.</p>
</li>
<li>
<p>固定易变因素</p>
<p>我们经常使用的函数的<code>bind</code>方法就是一个固定易变因素的很好的例子.</p>
</li>
</ul>
<h3 id="articleHeader3">关于柯里化的性能</h3>
<p>当然,使用柯里化意味着有一些额外的开销;这些开销一般涉及到这些方面,首先是关于函数参数的调用,操作<code>arguments</code>对象通常会比操作命名的参数要慢一点;<br>  还有,在一些老的版本的浏览器中<code>arguments.length</code>的实现是很慢的;直接调用函数<code>fn</code>要比使用<code>fn.apply()</code>或者<code>fn.call()</code>要快一点;产生大量的嵌套<br>  作用域还有闭包会带来一些性能还有速度的降低.<strong>但是,大多数的web应用的性能瓶颈时发生在操作DOM上的,所以上面的那些开销比起DOM操作的开销还是比较小的.</strong></p>
<h3 id="articleHeader4">关于本章一些知识点的解释</h3>
<ul><li>
<p>琐碎的知识点</p>
<p><code>fn.length</code>: 表示的是这个函数中参数的个数.</p>
</li></ul>
<p><code>arguments.callee</code>: 指向的是当前运行的函数.<code>callee</code>是<code>arguments</code>对象的属性。<br>  在该函数的函数体内,它可以指向当前正在执行的函数.当函数是匿名函数时,这是很有用的,比如没有名字的函数表达式(也被叫做"匿名函数").<br>  详细解释可以看这里<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee" rel="nofollow noreferrer" target="_blank">arguments.callee</a>.我们可以看一下下面的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hello() {
    return function() {
        console.log('hello');
        if(!arguments.length) {
            console.log('from a anonymous function.');
            return arguments.callee;
        }
    }
}

hello()(1); // hello

/*
 * hello
 * from a anonymous function.
 * hello
 * from a anonymous function.
 */
hello()()();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
        <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">arguments</span>.length) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'from a anonymous function.'</span>);
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>.callee;
        }
    }
}

hello()(<span class="hljs-number">1</span>); <span class="hljs-comment">// hello</span>

<span class="hljs-comment">/*
 * hello
 * from a anonymous function.
 * hello
 * from a anonymous function.
 */</span>
hello()()();</code></pre>
<p><code>fn.caller</code>: 返回调用指定函数的函数.详细的解释可以看这里<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller" rel="nofollow noreferrer" target="_blank">Function.caller</a>,下面是示例代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hello() {
    console.log('hello');
    console.log(hello.caller);
}

function callHello(fn) {
    return fn();
}

callHello(hello); // hello [Function: callHello]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>);
    <span class="hljs-built_in">console</span>.log(hello.caller);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callHello</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">return</span> fn();
}

callHello(hello); <span class="hljs-comment">// hello [Function: callHello]</span></code></pre>
<ul><li>
<p>高阶函数(high-order function)</p>
<p><strong>高阶函数就是操作函数的函数,它接受一个或多个函数作为参数,并返回一个新的函数.</strong></p>
</li></ul>
<p>我们来看一个例子,来帮助我们理解这个概念.就举一个我们高中经常遇到的场景,如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f1(x, y) = x + y;
f2(x) = x * x;
f3 = f2(f3(x, y));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">f1(x, y) = x + y;
f2(x) = x * x;
f3 = f2(f3(x, y));</code></pre>
<p>我们来实现<code>f3</code>函数,看看应该如何实现,具体的代码如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1(x, y) {
    return x + y;
}

function f2(x) {
    return x * x;
}

function func3(func1, func2) {
    return function() {
        return func2.call(this, func1.apply(this, arguments));
    }
}

var f3 = func3(f1, f2);
console.log(f3(2, 3)); // 25" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f2</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> x * x;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func3</span>(<span class="hljs-params">func1, func2</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> func2.call(<span class="hljs-keyword">this</span>, func1.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>));
    }
}

<span class="hljs-keyword">var</span> f3 = func3(f1, f2);
<span class="hljs-built_in">console</span>.log(f3(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)); <span class="hljs-comment">// 25</span></code></pre>
<p>我们通过函数<code>func3</code>将函数<code>f1</code>,<code>f2</code>结合到了一起,然后返回了一个新的函数<code>f3</code>;这个函数就是我们期望的那个函数.</p>
<ul><li><p>不完全函数(partial function)</p></li></ul>
<p>什么是不完全函数呢?所谓的不完全函数和我们上面所说的柯里化基本差不多;所谓的不完全函数,就是给你想要运行的那个函数绑定一个固定的参数值;<br>  然后后面的运行或者说传递参数都是在前面的基础上进行运行的.看下面的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个将函数的arguments对象变成一个数组的方法
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}
// 我们要运行的函数
function showMsg(a, b, c){
    return a * (b - c);
}
function partialLeft(f) {
    var args = arguments;
    return function() {
        var a = array(args, 1);
        a = a.concat(array(arguments));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}
function partialRight(f) {
    var args = arguments;
    return function() {
        var a = array(arguments);
        a = a.concat(array(args, 1));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}
function partial(f) {
    var args = arguments;
    return function() {
        var a = array(args, 1);
        var i = 0; j = 0;
        for(; i < a.length; i++) {
            if(a[i] === undefined) {
                a[i] = arguments[j++];
            }
        }
        a = a.concat(array(arguments, j));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}
partialLeft(showMsg, 1)(2, 3); // 实际参数列表: [1, 2, 3] 所以结果是 1 * (2 - 3) = -1
partialRight(showMsg, 1)(2, 3); // 实际参数列表: [2, 3, 1] 所以结果是 2 * (3 - 1) = 4
partial(showMsg, undefined, 1)(2, 3); // 实际参数列表: [2, 1, 3] 所以结果是 2 * (1 - 3) = -4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一个将函数的arguments对象变成一个数组的方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">array</span>(<span class="hljs-params">a, n</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.prototype.slice.call(a, n || <span class="hljs-number">0</span>);
}
<span class="hljs-comment">// 我们要运行的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showMsg</span>(<span class="hljs-params">a, b, c</span>)</span>{
    <span class="hljs-keyword">return</span> a * (b - c);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partialLeft</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = array(args, <span class="hljs-number">1</span>);
        a = a.concat(array(<span class="hljs-built_in">arguments</span>));
        <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 打印实际传递到函数中的参数列表</span>
        <span class="hljs-keyword">return</span> f.apply(<span class="hljs-keyword">this</span>, a);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partialRight</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = array(<span class="hljs-built_in">arguments</span>);
        a = a.concat(array(args, <span class="hljs-number">1</span>));
        <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 打印实际传递到函数中的参数列表</span>
        <span class="hljs-keyword">return</span> f.apply(<span class="hljs-keyword">this</span>, a);
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partial</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">arguments</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> a = array(args, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; j = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(; i &lt; a.length; i++) {
            <span class="hljs-keyword">if</span>(a[i] === <span class="hljs-literal">undefined</span>) {
                a[i] = <span class="hljs-built_in">arguments</span>[j++];
            }
        }
        a = a.concat(array(<span class="hljs-built_in">arguments</span>, j));
        <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 打印实际传递到函数中的参数列表</span>
        <span class="hljs-keyword">return</span> f.apply(<span class="hljs-keyword">this</span>, a);
    }
}
partialLeft(showMsg, <span class="hljs-number">1</span>)(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// 实际参数列表: [1, 2, 3] 所以结果是 1 * (2 - 3) = -1</span>
partialRight(showMsg, <span class="hljs-number">1</span>)(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// 实际参数列表: [2, 3, 1] 所以结果是 2 * (3 - 1) = 4</span>
partial(showMsg, <span class="hljs-literal">undefined</span>, <span class="hljs-number">1</span>)(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>); <span class="hljs-comment">// 实际参数列表: [2, 1, 3] 所以结果是 2 * (1 - 3) = -4</span></code></pre>
<h3 id="articleHeader5">一些你可能会喜欢的JS库</h3>
<p>JavaScript的柯里化与JavaScript的函数式编程密不可分,下面列举了一些关于JavaScript函数式编程的库,大家可以看一下:</p>
<ul>
<li><p><a href="https://github.com/jashkenas/underscore" rel="nofollow noreferrer" target="_blank">underscore</a></p></li>
<li><p><a href="https://github.com/lodash/lodash/" rel="nofollow noreferrer" target="_blank">lodash</a></p></li>
<li><p><a href="https://github.com/ramda/ramda" rel="nofollow noreferrer" target="_blank">ramda</a></p></li>
<li><p><a href="https://github.com/baconjs/bacon.js" rel="nofollow noreferrer" target="_blank">bacon.js</a></p></li>
<li><p><a href="https://github.com/CrowdHailer/fn.js" rel="nofollow noreferrer" target="_blank">fn.js</a></p></li>
<li><p><a href="https://github.com/functionaljs/functional-js/" rel="nofollow noreferrer" target="_blank">functional-js</a></p></li>
</ul>
<p>欢迎提意见：<a href="https://github.com/dreamapplehappy/hacking-with-javascript/issues/2" rel="nofollow noreferrer" target="_blank">可以在这里提意见</a></p>
<h3 id="articleHeader6">参考的资料</h3>
<ul>
<li><p><a href="http://blog.carbonfive.com/2015/01/14/gettin-freaky-functional-wcurried-javascript/" rel="nofollow noreferrer" target="_blank">Gettin’ Freaky Functional w/Curried JavaScript</a></p></li>
<li><p><a href="https://www.sitepoint.com/currying-in-functional-javascript/" rel="nofollow noreferrer" target="_blank">A Beginner’s Guide to Currying in Functional JavaScript</a></p></li>
<li><p><a href="http://requiremind.com/currying-spice-up-your-javascript-functions/" rel="nofollow noreferrer" target="_blank">Currying, Spice Up Your Javascript Functions</a></p></li>
<li><p><a href="http://javascript.crockford.com/www_svendtofte_com/code/curried_javascript/" rel="nofollow noreferrer" target="_blank">Curried JavaScript functions </a></p></li>
<li><p><a href="http://blog.carbonfive.com/2015/01/05/tidying-up-a-javascript-application-with-higher-order-functions/" rel="nofollow noreferrer" target="_blank">Tidying Up a JavaScript Application with Higher-Order Functions</a></p></li>
<li><p><a href="https://codepen.io/Universalist/post/currying-functions-in-javascript" rel="nofollow noreferrer" target="_blank">Currying Functions in Javascript</a><button class="btn btn-xs btn-default ml10 preview" data-url="Universalist/post/currying-functions-in-javascript" data-typeid="3">点击预览</button></p></li>
<li><p><a href="http://www.ibm.com/developerworks/cn/web/1006_qiujt_jsfunctional/" rel="nofollow noreferrer" target="_blank">JavaScript 中的函数式编程实践</a></p></li>
<li><p><a href="http://blog.jobbole.com/77956/" rel="nofollow noreferrer" target="_blank">函数式JavaScript（4）：函数柯里化</a></p></li>
<li><p><a href="http://www.cnblogs.com/pigtail/p/3447660.html" rel="nofollow noreferrer" target="_blank">前端开发者进阶之函数柯里化Currying</a></p></li>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2013/02/js-currying/" rel="nofollow noreferrer" target="_blank">JS中的柯里化(currying)</a></p></li>
<li><p><a href="http://www.2cto.com/kf/201412/357997.html" rel="nofollow noreferrer" target="_blank">浅析JavaScript中的函数currying柯里化</a></p></li>
<li><p><a href="http://www.w3cfuns.com/notes/17507/f742cc715cacdc1a9656c2645aea55a4.html" rel="nofollow noreferrer" target="_blank">Js函数柯里化</a></p></li>
<li><p><a href="http://www.jb51.net/article/81190.htm" rel="nofollow noreferrer" target="_blank">深入解析JavaScript中函数的Currying柯里化</a></p></li>
<li><p><a href="http://toutiao.com/i6220924016044016129/" rel="nofollow noreferrer" target="_blank">js基础篇之——JavaScript的柯里化函数详解</a></p></li>
<li><p><a href="http://blog.csdn.net/yhjw2bah/article/details/7897032" rel="nofollow noreferrer" target="_blank">JS函数柯里化及其应用</a></p></li>
<li><p><a href="http://www.itxueyuan.org/view/5637.html" rel="nofollow noreferrer" target="_blank">JS闭包与柯里化</a></p></li>
<li><p><a href="http://www.jb51.net/article/83275.htm" rel="nofollow noreferrer" target="_blank">JavaScript函数柯里化详解</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/113780/javascript-curry-what-are-the-practical-applications" rel="nofollow noreferrer" target="_blank">Javascript curry - what are the practical applications?</a></p></li>
<li><p><a href="http://www.drdobbs.com/open-source/currying-and-partial-functions-in-javasc/231001821" rel="nofollow noreferrer" target="_blank">Currying and Partial Functions in JavaScript</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/36314/what-is-currying" rel="nofollow noreferrer" target="_blank">What is 'Currying'?</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
掌握JavaScript函数的柯里化

## 原文链接
[https://segmentfault.com/a/1190000006096034](https://segmentfault.com/a/1190000006096034)


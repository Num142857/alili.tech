---
title: '八皇后问题的JavaScript解法' 
date: 2019-02-10 2:30:42
hidden: true
slug: 3q3w24i95hw
categories: [reprint]
---

{{< raw >}}

                    
<p>关于八皇后问题的 JavaScript 解法，总觉得是需要学习一下算法的，哪天要用到的时候发现真不会就尴尬了</p>
<h2 id="articleHeader0">背景</h2>
<p>八皇后问题是一个以国际象棋为背景的问题：如何能够在 8×8 的国际象棋棋盘上放置八个皇后，使得任何一个皇后都无法直接吃掉其他的皇后？为了达到此目的，任两个皇后都不能处于同一条横行、纵行或斜线上</p>
<p>八皇后问题可以推广为更一般的n皇后摆放问题：这时棋盘的大小变为 n×n ，而皇后个数也变成n 。当且仅当<code>n = 1</code>或<code>n ≥ 4</code>时问题有解</p>
<h2 id="articleHeader1">盲目的枚举算法</h2>
<p>通过N重循环，枚举满足约束条件的解（八重循环代码好多，这里进行四重循环），找到四个皇后的所有可能位置，然后再整个棋盘里判断这四个皇后是否会直接吃掉彼此，程序思想比较简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function check1(arr, n) {
    for(var i = 0; i < n; i++) {
        for(var j = i + 1; j < n; j++) {
            if((arr[i] == arr[j]) || Math.abs(arr[i] - arr[j]) == j - i) {
                return false;
            }
        }
    }
    return true;
}
function queen1() {
    var arr = [];

    for(arr[0] = 1; arr[0] <= 4; arr[0]++) {
        for(arr[1] = 1; arr[1] <= 4; arr[1]++) {
            for(arr[2] = 1; arr[2] <= 4; arr[2]++) {
                for(arr[3] = 1; arr[3] <= 4; arr[3]++) {
                    if(!check1(arr, 4)) {
                        continue;
                    } else {
                        console.log(arr);
                    }
                }
            }
        }
    }
}

queen1();
//[ 2, 4, 1, 3 ]
//[ 3, 1, 4, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check1</span>(<span class="hljs-params">arr, n</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; n; j++) {
            <span class="hljs-keyword">if</span>((arr[i] == arr[j]) || <span class="hljs-built_in">Math</span>.abs(arr[i] - arr[j]) == j - i) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queen1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];

    <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">0</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">0</span>]++) {
        <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">1</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">1</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">1</span>]++) {
            <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">2</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">2</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">2</span>]++) {
                <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">3</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">3</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">3</span>]++) {
                    <span class="hljs-keyword">if</span>(!check1(arr, <span class="hljs-number">4</span>)) {
                        <span class="hljs-keyword">continue</span>;
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-built_in">console</span>.log(arr);
                    }
                }
            }
        }
    }
}

queen1();
<span class="hljs-comment">//[ 2, 4, 1, 3 ]</span>
<span class="hljs-comment">//[ 3, 1, 4, 2 ]</span></code></pre>
<p>关于结果，在 4*4 的棋盘里，四个皇后都不可能是在一排， arr[0] 到 arr[3] 分别对应四个皇后，数组的下标与下标对应的值即皇后在棋盘中的位置</p>
<h2 id="articleHeader2">回溯法</h2>
<p>『走不通，就回头』，在适当节点判断是否符合，不符合就不再进行这条支路上的探索</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function check2(arr, n) {
    for(var i = 0; i <= n - 1; i++) {
        if((Math.abs(arr[i] - arr[n]) == n - i) || (arr[i] == arr[n])) {
            return false;
        }
    }
    return true;
}

function queen2() {
    var arr = [];

    for(arr[0] = 1; arr[0] <= 4; arr[0]++) {
        for(arr[1] = 1; arr[1] <= 4; arr[1]++) {
            if(!check2(arr, 1)) continue; //摆两个皇后产生冲突的情况
            for(arr[2] = 1; arr[2] <= 4; arr[2]++) {
                if(!check2(arr, 2)) continue; //摆三个皇后产生冲突的情况
                for(arr[3] = 1; arr[3] <= 4; arr[3]++) {
                    if(!check2(arr, 3)) {
                        continue;
                    } else {
                        console.log(arr);
                    }
                }
            }
        }
    }
}

queen2();
//[ 2, 4, 1, 3 ]
//[ 3, 1, 4, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check2</span>(<span class="hljs-params">arr, n</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= n - <span class="hljs-number">1</span>; i++) {
        <span class="hljs-keyword">if</span>((<span class="hljs-built_in">Math</span>.abs(arr[i] - arr[n]) == n - i) || (arr[i] == arr[n])) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">queen2</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];

    <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">0</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">0</span>]++) {
        <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">1</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">1</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">1</span>]++) {
            <span class="hljs-keyword">if</span>(!check2(arr, <span class="hljs-number">1</span>)) <span class="hljs-keyword">continue</span>; <span class="hljs-comment">//摆两个皇后产生冲突的情况</span>
            <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">2</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">2</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">2</span>]++) {
                <span class="hljs-keyword">if</span>(!check2(arr, <span class="hljs-number">2</span>)) <span class="hljs-keyword">continue</span>; <span class="hljs-comment">//摆三个皇后产生冲突的情况</span>
                <span class="hljs-keyword">for</span>(arr[<span class="hljs-number">3</span>] = <span class="hljs-number">1</span>; arr[<span class="hljs-number">3</span>] &lt;= <span class="hljs-number">4</span>; arr[<span class="hljs-number">3</span>]++) {
                    <span class="hljs-keyword">if</span>(!check2(arr, <span class="hljs-number">3</span>)) {
                        <span class="hljs-keyword">continue</span>;
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-built_in">console</span>.log(arr);
                    }
                }
            }
        }
    }
}

queen2();
<span class="hljs-comment">//[ 2, 4, 1, 3 ]</span>
<span class="hljs-comment">//[ 3, 1, 4, 2 ]</span></code></pre>
<h2 id="articleHeader3">非递归回溯法</h2>
<p>算法框架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while(k > 0 『有路可走』 and 『未达到目标』) { // k > 0 有路可走
    if(k > n) { // 搜索到叶子节点
        // 搜索到一个解，输出
    } else {
        //a[k]第一个可能的值
        while(『a[k]在不满足约束条件且在搜索空间内』) {
            // a[k]下一个可能的值
        }
        if(『a[k]在搜索空间内』) {
            // 标示占用的资源
            // k = k + 1;
        } else {
            // 清理所占的状态空间
            // k = k - 1;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">while</span>(k &gt; <span class="hljs-number">0</span> 『有路可走』 and 『未达到目标』) { <span class="hljs-comment">// k &gt; 0 有路可走</span>
    <span class="hljs-keyword">if</span>(k &gt; n) { <span class="hljs-comment">// 搜索到叶子节点</span>
        <span class="hljs-comment">// 搜索到一个解，输出</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//a[k]第一个可能的值</span>
        <span class="hljs-keyword">while</span>(『a[k]在不满足约束条件且在搜索空间内』) {
            <span class="hljs-comment">// a[k]下一个可能的值</span>
        }
        <span class="hljs-keyword">if</span>(『a[k]在搜索空间内』) {
            <span class="hljs-comment">// 标示占用的资源</span>
            <span class="hljs-comment">// k = k + 1;</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 清理所占的状态空间</span>
            <span class="hljs-comment">// k = k - 1;</span>
        }
    }
}</code></pre>
<p>具体代码如下，最外层while下面包含两部分，一部分是对当前皇后可能值的遍历，另一部分是决定是进入下一层还是回溯上一层</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function backdate(n) {
    var arr = [];

    var k = 1; // 第n的皇后
    arr[0] = 1;

    while(k > 0) {

        arr[k-1] = arr[k-1] + 1;
        while((arr[k-1] <= n) &amp;&amp; (!check2(arr, k-1))) {
            arr[k-1] = arr[k-1] + 1;
        }
        // 这个皇后满足了约束条件，进行下一步判断

        if(arr[k-1] <= n) {
            if(k == n) { // 第n个皇后
                console.log(arr);
            } else {
                k = k + 1; // 下一个皇后
                arr[k-1] = 0;
            }
        } else {
            k = k - 1; // 回溯，上一个皇后
        }
    }
}

backdate(4);
//[ 2, 4, 1, 3 ]
//[ 3, 1, 4, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">backdate</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];

    <span class="hljs-keyword">var</span> k = <span class="hljs-number">1</span>; <span class="hljs-comment">// 第n的皇后</span>
    arr[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>;

    <span class="hljs-keyword">while</span>(k &gt; <span class="hljs-number">0</span>) {

        arr[k<span class="hljs-number">-1</span>] = arr[k<span class="hljs-number">-1</span>] + <span class="hljs-number">1</span>;
        <span class="hljs-keyword">while</span>((arr[k<span class="hljs-number">-1</span>] &lt;= n) &amp;&amp; (!check2(arr, k<span class="hljs-number">-1</span>))) {
            arr[k<span class="hljs-number">-1</span>] = arr[k<span class="hljs-number">-1</span>] + <span class="hljs-number">1</span>;
        }
        <span class="hljs-comment">// 这个皇后满足了约束条件，进行下一步判断</span>

        <span class="hljs-keyword">if</span>(arr[k<span class="hljs-number">-1</span>] &lt;= n) {
            <span class="hljs-keyword">if</span>(k == n) { <span class="hljs-comment">// 第n个皇后</span>
                <span class="hljs-built_in">console</span>.log(arr);
            } <span class="hljs-keyword">else</span> {
                k = k + <span class="hljs-number">1</span>; <span class="hljs-comment">// 下一个皇后</span>
                arr[k<span class="hljs-number">-1</span>] = <span class="hljs-number">0</span>;
            }
        } <span class="hljs-keyword">else</span> {
            k = k - <span class="hljs-number">1</span>; <span class="hljs-comment">// 回溯，上一个皇后</span>
        }
    }
}

backdate(<span class="hljs-number">4</span>);
<span class="hljs-comment">//[ 2, 4, 1, 3 ]</span>
<span class="hljs-comment">//[ 3, 1, 4, 2 ]</span></code></pre>
<h2 id="articleHeader4">递归回溯法</h2>
<p>递归调用大大减少了代码量，也增加了程序的可读性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [], n = 4;
function backtrack(k) {
    if(k > n) {
        console.log(arr);
    } else {
        for(var i = 1;i <= n; i++) {
            arr[k-1] = i;
            if(check2(arr, k-1)) {
                backtrack(k + 1);
            }
        }
    }
}

backtrack(1);
//[ 2, 4, 1, 3 ]
//[ 3, 1, 4, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [], n = <span class="hljs-number">4</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">backtrack</span>(<span class="hljs-params">k</span>) </span>{
    <span class="hljs-keyword">if</span>(k &gt; n) {
        <span class="hljs-built_in">console</span>.log(arr);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>;i &lt;= n; i++) {
            arr[k<span class="hljs-number">-1</span>] = i;
            <span class="hljs-keyword">if</span>(check2(arr, k<span class="hljs-number">-1</span>)) {
                backtrack(k + <span class="hljs-number">1</span>);
            }
        }
    }
}

backtrack(<span class="hljs-number">1</span>);
<span class="hljs-comment">//[ 2, 4, 1, 3 ]</span>
<span class="hljs-comment">//[ 3, 1, 4, 2 ]</span></code></pre>
<h2 id="articleHeader5">华而不实的amb</h2>
<p>什么是 amb ？给它一个数据列表，它能返回满足约束条件的成功情况的一种方式，没有成功情况就会失败，当然，它可以返回所有的成功情况。笔者写了上面那么多的重点，就是为了在这里推荐这个amb算法，它适合处理简单的回溯场景，很有趣，让我们来看看它是怎么工作的</p>
<p>首先来处理一个小问题，寻找相邻字符串：拿到几组字符串数组，每个数组拿出一个字符串，前一个字符串的末位字符与后一个字符串的首位字符相同，满足条件则输出这组新取出来的字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ambRun(function(amb, fail) {

    // 约束条件方法
    function linked(s1, s2) {
        return s1.slice(-1) == s2.slice(0, 1);
    }

    // 注入数据列表
    var w1 = amb([&quot;the&quot;, &quot;that&quot;, &quot;a&quot;]);
    var w2 = amb([&quot;frog&quot;, &quot;elephant&quot;, &quot;thing&quot;]);
    var w3 = amb([&quot;walked&quot;, &quot;treaded&quot;, &quot;grows&quot;]);
    var w4 = amb([&quot;slowly&quot;, &quot;quickly&quot;]);

    // 执行程序
    if (!(linked(w1, w2) &amp;&amp; linked(w2, w3) &amp;&amp; linked(w3, w4))) fail();

    console.log([w1, w2, w3, w4].join(' '));
    // &quot;that thing grows slowly&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ambRun(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">amb, fail</span>) </span>{

    <span class="hljs-comment">// 约束条件方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">linked</span>(<span class="hljs-params">s1, s2</span>) </span>{
        <span class="hljs-keyword">return</span> s1.slice(<span class="hljs-number">-1</span>) == s2.slice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>);
    }

    <span class="hljs-comment">// 注入数据列表</span>
    <span class="hljs-keyword">var</span> w1 = amb([<span class="hljs-string">"the"</span>, <span class="hljs-string">"that"</span>, <span class="hljs-string">"a"</span>]);
    <span class="hljs-keyword">var</span> w2 = amb([<span class="hljs-string">"frog"</span>, <span class="hljs-string">"elephant"</span>, <span class="hljs-string">"thing"</span>]);
    <span class="hljs-keyword">var</span> w3 = amb([<span class="hljs-string">"walked"</span>, <span class="hljs-string">"treaded"</span>, <span class="hljs-string">"grows"</span>]);
    <span class="hljs-keyword">var</span> w4 = amb([<span class="hljs-string">"slowly"</span>, <span class="hljs-string">"quickly"</span>]);

    <span class="hljs-comment">// 执行程序</span>
    <span class="hljs-keyword">if</span> (!(linked(w1, w2) &amp;&amp; linked(w2, w3) &amp;&amp; linked(w3, w4))) fail();

    <span class="hljs-built_in">console</span>.log([w1, w2, w3, w4].join(<span class="hljs-string">' '</span>));
    <span class="hljs-comment">// "that thing grows slowly"</span>
});</code></pre>
<p>看起来超级简洁有没有！不过使用的前提是，你不在乎性能，它真的是很浪费时间！</p>
<p>下面是它的 javascript 实现，有兴趣可以研究研究它是怎么把回溯抽出来的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ambRun(func) {
    var choices = [];
    var index;

    function amb(values) {
        if (values.length == 0) {
            fail();
        }
        if (index == choices.length) {
            choices.push({i: 0,
                count: values.length});
        }
        var choice = choices[index++];
        return values[choice.i];
    }

    function fail() { throw fail; }

    while (true) {
        try {
            index = 0;
            return func(amb, fail);
        } catch (e) {
            if (e != fail) {
                throw e;
            }
            var choice;

            while ((choice = choices.pop()) &amp;&amp; ++choice.i == choice.count) {}
            if (choice == undefined) {
                return undefined;
            }
            choices.push(choice);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ambRun</span>(<span class="hljs-params">func</span>) </span>{
    <span class="hljs-keyword">var</span> choices = [];
    <span class="hljs-keyword">var</span> index;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">amb</span>(<span class="hljs-params">values</span>) </span>{
        <span class="hljs-keyword">if</span> (values.length == <span class="hljs-number">0</span>) {
            fail();
        }
        <span class="hljs-keyword">if</span> (index == choices.length) {
            choices.push({<span class="hljs-attr">i</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">count</span>: values.length});
        }
        <span class="hljs-keyword">var</span> choice = choices[index++];
        <span class="hljs-keyword">return</span> values[choice.i];
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">throw</span> fail; }

    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">try</span> {
            index = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">return</span> func(amb, fail);
        } <span class="hljs-keyword">catch</span> (e) {
            <span class="hljs-keyword">if</span> (e != fail) {
                <span class="hljs-keyword">throw</span> e;
            }
            <span class="hljs-keyword">var</span> choice;

            <span class="hljs-keyword">while</span> ((choice = choices.pop()) &amp;&amp; ++choice.i == choice.count) {}
            <span class="hljs-keyword">if</span> (choice == <span class="hljs-literal">undefined</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            }
            choices.push(choice);
        }
    }
}</code></pre>
<p>以及使用 amb 实现的八皇后问题的具体代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ambRun(function(amb, fail){
    var N = 4;
    var arr = [];
    var turn = [];
    for(var n = 0; n < N; n++) {
        turn[turn.length] = n + 1;
    }
    while(n--) {
        arr[arr.length] = amb(turn);
    }
    for (var i = 0; i < N; ++i) {
        for (var j = i + 1; j < N; ++j) {
            var a = arr[i], b = arr[j];
            if (a == b || Math.abs(a - b) == j - i) fail();
        }
    }
    console.log(arr);
    fail();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ambRun(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">amb, fail</span>)</span>{
    <span class="hljs-keyword">var</span> N = <span class="hljs-number">4</span>;
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">var</span> turn = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> n = <span class="hljs-number">0</span>; n &lt; N; n++) {
        turn[turn.length] = n + <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">while</span>(n--) {
        arr[arr.length] = amb(turn);
    }
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; N; ++i) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; N; ++j) {
            <span class="hljs-keyword">var</span> a = arr[i], b = arr[j];
            <span class="hljs-keyword">if</span> (a == b || <span class="hljs-built_in">Math</span>.abs(a - b) == j - i) fail();
        }
    }
    <span class="hljs-built_in">console</span>.log(arr);
    fail();
});</code></pre>
<h2 id="articleHeader6">八皇后问题的JavaScript解法</h2>
<p>这是八皇后问题的JavaScript解法，整个程序都没用for循环，都是靠递归来实现的，充分运用了Array对象的map, reduce, filter, concat, slice方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var queens = function (boarderSize) {
  // 用递归生成一个start到end的Array
  var interval = function (start, end) {
    if (start > end) { return []; }
    return interval(start, end - 1).concat(end);
  };
  // 检查一个组合是否有效
  var isValid = function (queenCol) {
    // 检查两个位置是否有冲突
    var isSafe = function (pointA, pointB) {
      var slope = (pointA.row - pointB.row) / (pointA.col - pointB.col);
      if ((0 === slope) || (1 === slope) || (-1 === slope)) { return false; }
      return true;
    };
    var len = queenCol.length;
    var pointToCompare = {
      row: queenCol[len - 1],
      col: len
    };
    // 先slice出除了最后一列的数组，然后依次测试每列的点和待测点是否有冲突，最后合并测试结果
    return queenCol
      .slice(0, len - 1)
      .map(function (row, index) {
        return isSafe({row: row, col: index + 1}, pointToCompare);
      })
      .reduce(function (a, b) {
        return a &amp;&amp; b;
      });
  };
  // 递归地去一列一列生成符合规则的组合
  var queenCols = function (size) {
    if (1 === size) {
      return interval(1, boarderSize).map(function (i) { return [i]; });
    }
    // 先把之前所有符合规则的列组成的集合再扩展一列，然后用reduce降维，最后用isValid过滤掉不符合规则的组合
    return queenCols(size - 1)
      .map(function (queenCol) {
        return interval(1, boarderSize).map(function (row) {
          return queenCol.concat(row);
        });
      })
      .reduce(function (a, b) {
        return a.concat(b);
      })
      .filter(isValid);
  };
  // queens函数入口
  return queenCols(boarderSize);
};

console.log(queens(8));
// 输出结果:
// [ [ 1, 5, 8, 6, 3, 7, 2, 4 ],
//   [ 1, 6, 8, 3, 7, 4, 2, 5 ],
//   ...
//   [ 8, 3, 1, 6, 2, 5, 7, 4 ],
//   [ 8, 4, 1, 3, 6, 2, 7, 5 ] ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> queens = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">boarderSize</span>) </span>{
  <span class="hljs-comment">// 用递归生成一个start到end的Array</span>
  <span class="hljs-keyword">var</span> interval = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">start, end</span>) </span>{
    <span class="hljs-keyword">if</span> (start &gt; end) { <span class="hljs-keyword">return</span> []; }
    <span class="hljs-keyword">return</span> interval(start, end - <span class="hljs-number">1</span>).concat(end);
  };
  <span class="hljs-comment">// 检查一个组合是否有效</span>
  <span class="hljs-keyword">var</span> isValid = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">queenCol</span>) </span>{
    <span class="hljs-comment">// 检查两个位置是否有冲突</span>
    <span class="hljs-keyword">var</span> isSafe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pointA, pointB</span>) </span>{
      <span class="hljs-keyword">var</span> slope = (pointA.row - pointB.row) / (pointA.col - pointB.col);
      <span class="hljs-keyword">if</span> ((<span class="hljs-number">0</span> === slope) || (<span class="hljs-number">1</span> === slope) || (<span class="hljs-number">-1</span> === slope)) { <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    };
    <span class="hljs-keyword">var</span> len = queenCol.length;
    <span class="hljs-keyword">var</span> pointToCompare = {
      <span class="hljs-attr">row</span>: queenCol[len - <span class="hljs-number">1</span>],
      <span class="hljs-attr">col</span>: len
    };
    <span class="hljs-comment">// 先slice出除了最后一列的数组，然后依次测试每列的点和待测点是否有冲突，最后合并测试结果</span>
    <span class="hljs-keyword">return</span> queenCol
      .slice(<span class="hljs-number">0</span>, len - <span class="hljs-number">1</span>)
      .map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">row, index</span>) </span>{
        <span class="hljs-keyword">return</span> isSafe({<span class="hljs-attr">row</span>: row, <span class="hljs-attr">col</span>: index + <span class="hljs-number">1</span>}, pointToCompare);
      })
      .reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> a &amp;&amp; b;
      });
  };
  <span class="hljs-comment">// 递归地去一列一列生成符合规则的组合</span>
  <span class="hljs-keyword">var</span> queenCols = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">size</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-number">1</span> === size) {
      <span class="hljs-keyword">return</span> interval(<span class="hljs-number">1</span>, boarderSize).map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{ <span class="hljs-keyword">return</span> [i]; });
    }
    <span class="hljs-comment">// 先把之前所有符合规则的列组成的集合再扩展一列，然后用reduce降维，最后用isValid过滤掉不符合规则的组合</span>
    <span class="hljs-keyword">return</span> queenCols(size - <span class="hljs-number">1</span>)
      .map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">queenCol</span>) </span>{
        <span class="hljs-keyword">return</span> interval(<span class="hljs-number">1</span>, boarderSize).map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">row</span>) </span>{
          <span class="hljs-keyword">return</span> queenCol.concat(row);
        });
      })
      .reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> a.concat(b);
      })
      .filter(isValid);
  };
  <span class="hljs-comment">// queens函数入口</span>
  <span class="hljs-keyword">return</span> queenCols(boarderSize);
};

<span class="hljs-built_in">console</span>.log(queens(<span class="hljs-number">8</span>));
<span class="hljs-comment">// 输出结果:</span>
<span class="hljs-comment">// [ [ 1, 5, 8, 6, 3, 7, 2, 4 ],</span>
<span class="hljs-comment">//   [ 1, 6, 8, 3, 7, 4, 2, 5 ],</span>
<span class="hljs-comment">//   ...</span>
<span class="hljs-comment">//   [ 8, 3, 1, 6, 2, 5, 7, 4 ],</span>
<span class="hljs-comment">//   [ 8, 4, 1, 3, 6, 2, 7, 5 ] ]</span></code></pre>
<h2 id="articleHeader7">总结</h2>
<p>回溯算法是很常用的基本算法，认真掌握是没有错的，笔者也是一边学习一边写下本篇，学习内容来源</p>
<p><a href="https://zh.wikipedia.org/wiki/%E5%85%AB%E7%9A%87%E5%90%8E%E9%97%AE%E9%A2%98" rel="nofollow noreferrer" target="_blank">八皇后问题</a><br><a href="http://www.cnblogs.com/steven_oyj/archive/2010/05/22/1741376.html" rel="nofollow noreferrer" target="_blank">五大常用算法之四：回溯法</a><br><a href="http://www.cnblogs.com/houkai/p/3480940.html" rel="nofollow noreferrer" target="_blank">回溯法——八皇后问题</a><br><a href="http://mihai.bazon.net/blog/amb-in-javascript" rel="nofollow noreferrer" target="_blank">Amb() in JavaScript</a><br><a href="https://yyqian.com/post/1442113857711/" rel="nofollow noreferrer" target="_blank">八皇后问题的 JavaScript 解法</a></p>
<p>文章转载自笔者个人博客 <a href="http://gaoxuefeng.com/2016/05/13/%E5%85%AB%E7%9A%87%E5%90%8E%E9%97%AE%E9%A2%98%E7%9A%84JavaScript%E8%A7%A3%E6%B3%95/" rel="nofollow noreferrer" target="_blank">Gaoxuefeng's Blog</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
八皇后问题的JavaScript解法

## 原文链接
[https://segmentfault.com/a/1190000005120353](https://segmentfault.com/a/1190000005120353)


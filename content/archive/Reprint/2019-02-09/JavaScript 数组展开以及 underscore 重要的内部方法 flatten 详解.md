---
title: 'JavaScript 数组展开以及 underscore 重要的内部方法 flatten 详解' 
date: 2019-02-09 2:30:58
hidden: true
slug: gcu36brmteb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Why underscore</h1>
<p>（觉得这一段眼熟的童鞋可以直接跳到正文了...）</p>
<p>最近开始看 underscore.js 源码，并将 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">underscore.js 源码解读</a> 放在了我的 2016 计划中。</p>
<p>阅读一些著名框架类库的源码，就好像和一个个大师对话，你会学到很多。为什么是 underscore？最主要的原因是 underscore 简短精悍（约 1.5k 行），封装了 100 多个有用的方法，耦合度低，非常适合逐个方法阅读，适合楼主这样的 JavaScript 初学者。从中，你不仅可以学到用 void 0 代替 undefined 避免 undefined 被重写等一些小技巧 ，也可以学到变量类型判断、函数节流&amp;函数去抖等常用的方法，还可以学到很多浏览器兼容的 hack，更可以学到作者的整体设计思路以及 API 设计的原理（向后兼容）。</p>
<p>之后楼主会写一系列的文章跟大家分享在源码阅读中学习到的知识。</p>
<ul>
<li><p>underscore-1.8.3 源码解读项目地址 <a href="https://github.com/hanzichi/underscore-analysis" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis</a></p></li>
<li><p>underscore-1.8.3 源码全文注释 <a href="https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/underscore-1.8.3-analysis.js</a></p></li>
<li><p>underscore-1.8.3 源码解读系列文章 <a href="https://github.com/hanzichi/underscore-analysis/issues" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/issues</a></p></li>
</ul>
<p>欢迎围观~ （<strong>如果有兴趣，欢迎 star &amp; watch~</strong>）您的关注是楼主继续写作的动力</p>
<h1 id="articleHeader1">flatten</h1>
<p>端午休息三天，睡了两天，是该有点产出了。</p>
<p>今天要讲的是数组展开以及和数组展开息息相关的一个重要的内部方法 flatten。</p>
<p>什么是数组展开？简单的说就是将嵌套的数组 "铺平"，还是举几个简单的例子吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[[[1, 2], [1, 2, 3]], [1, 2]] => [1, 2, 1, 2, 3, 1, 2]
[[[1, 2], [1, 2, 3]], [1, 2]] => [[1, 2], [1, 2, 3], 1, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>[[[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]] =&gt; [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
[[[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]] =&gt; [[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>], <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]</code></pre>
<p>以上两种都是数组展开，第一种我们认为是深度展开，即打破所有嵌套数组，将元素提取出来放入一个数组中；第二种只展开了一层，即只把数组内嵌套的一层数组展开，而没有递归展开下去。</p>
<p>我们首先来看看 flatten 方法的调用形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flatten = function(input, shallow, strict, startIndex) {
  // ...
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, shallow, strict, startIndex</span>) </span>{
  <span class="hljs-comment">// ...</span>
};</code></pre>
<p>第一个参数 input 即为需要展开的数组，所以 flatten 方法中传入的第一个参数肯定是数组（或者 arguments）；第二个参数 shallow 是个布尔值，如果为 false，则表示数组是深度展开，如果为 true 则表示只展开一层；第四个参数表示 input 展开的起始位置，即从 input 数组中第几个元素开始展开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ans = flatten([[1, 2], [3, 4]], false, false, 1);
console.log(ans); // => [3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ans = flatten([[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]], <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(ans); <span class="hljs-comment">// =&gt; [3, 4]</span></code></pre>
<p>从第 1 项开始展开数组，即忽略了数组的第 0 项（[1, 2]）。</p>
<p>以上三个参数还是比较容易理解的，相对来说费劲的是第三个参数 strict。strict 也是个布尔值，当 shallow 为 true 并且 strict 也为 true 时，能过滤 input 参数元素中的非数组元素。好难理解啊！我们举个简单的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ans = flatten([5, 6, [1, 2], [3, 4]], true, true);
console.log(ans); // => [1, 2, 3, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ans = flatten([<span class="hljs-number">5</span>, <span class="hljs-number">6</span>, [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]], <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>);
<span class="hljs-built_in">console</span>.log(ans); <span class="hljs-comment">// =&gt; [1, 2, 3, 4]</span></code></pre>
<p>5 和 6 是 input 参数中的非数组元素，直接过滤掉了。如果 strict 为 true 并且 shallow 为 false，那么调用 flatten 方法的结果只能是 []。所以我们会看到源码里如果 strict 为 true，那么 shallow 也一定是 true。</p>
<p>直接来看源码，加了非常多的注释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flatten = function(input, shallow, strict, startIndex) {
  // output 数组保存结果
  // 即 flatten 方法返回数据
  // idx 为 output 的累计数组下标
  var output = [], idx = 0;

  // 根据 startIndex 变量确定需要展开的起始位置
  for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    // 数组 或者 arguments
    if (isArrayLike(value) &amp;&amp; (_.isArray(value) || _.isArguments(value))) {
      // flatten current level of array or arguments object
      // (!shallow === true) => (shallow === false)
      // 则表示需深度展开
      // 继续递归展开
      if (!shallow) 
        // flatten 方法返回数组
        // 将上面定义的 value 重新赋值
        value = flatten(value, shallow, strict);

      // 递归展开到最后一层（没有嵌套的数组了）
      // 或者 (shallow === true) => 只展开一层
      // value 值肯定是一个数组
      var j = 0, len = value.length;

      // 这一步貌似没有必要
      // 毕竟 JavaScript 的数组会自动扩充
      // 但是这样写，感觉比较好，对于元素的 push 过程有个比较清晰的认识
      output.length += len;

      // 将 value 数组的元素添加到 output 数组中
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) { 
      // (!strict === true) => (strict === false)
      // 如果是深度展开，即 shallow 参数为 false
      // 那么当最后 value 不是数组，是基本类型时
      // 肯定会走到这个 else-if 判断中
      // 而如果此时 strict 为 true，则不能跳到这个分支内部
      // 所以 shallow === false 如果和 strict === true 搭配
      // 调用 flatten 方法得到的结果永远是空数组 []
      output[idx++] = value;
    }
  }

  return output;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, shallow, strict, startIndex</span>) </span>{
  <span class="hljs-comment">// output 数组保存结果</span>
  <span class="hljs-comment">// 即 flatten 方法返回数据</span>
  <span class="hljs-comment">// idx 为 output 的累计数组下标</span>
  <span class="hljs-keyword">var</span> output = [], idx = <span class="hljs-number">0</span>;

  <span class="hljs-comment">// 根据 startIndex 变量确定需要展开的起始位置</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = startIndex || <span class="hljs-number">0</span>, length = getLength(input); i &lt; length; i++) {
    <span class="hljs-keyword">var</span> value = input[i];
    <span class="hljs-comment">// 数组 或者 arguments</span>
    <span class="hljs-keyword">if</span> (isArrayLike(value) &amp;&amp; (_.isArray(value) || _.isArguments(value))) {
      <span class="hljs-comment">// flatten current level of array or arguments object</span>
      <span class="hljs-comment">// (!shallow === true) =&gt; (shallow === false)</span>
      <span class="hljs-comment">// 则表示需深度展开</span>
      <span class="hljs-comment">// 继续递归展开</span>
      <span class="hljs-keyword">if</span> (!shallow) 
        <span class="hljs-comment">// flatten 方法返回数组</span>
        <span class="hljs-comment">// 将上面定义的 value 重新赋值</span>
        value = flatten(value, shallow, strict);

      <span class="hljs-comment">// 递归展开到最后一层（没有嵌套的数组了）</span>
      <span class="hljs-comment">// 或者 (shallow === true) =&gt; 只展开一层</span>
      <span class="hljs-comment">// value 值肯定是一个数组</span>
      <span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>, len = value.length;

      <span class="hljs-comment">// 这一步貌似没有必要</span>
      <span class="hljs-comment">// 毕竟 JavaScript 的数组会自动扩充</span>
      <span class="hljs-comment">// 但是这样写，感觉比较好，对于元素的 push 过程有个比较清晰的认识</span>
      output.length += len;

      <span class="hljs-comment">// 将 value 数组的元素添加到 output 数组中</span>
      <span class="hljs-keyword">while</span> (j &lt; len) {
        output[idx++] = value[j++];
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!strict) { 
      <span class="hljs-comment">// (!strict === true) =&gt; (strict === false)</span>
      <span class="hljs-comment">// 如果是深度展开，即 shallow 参数为 false</span>
      <span class="hljs-comment">// 那么当最后 value 不是数组，是基本类型时</span>
      <span class="hljs-comment">// 肯定会走到这个 else-if 判断中</span>
      <span class="hljs-comment">// 而如果此时 strict 为 true，则不能跳到这个分支内部</span>
      <span class="hljs-comment">// 所以 shallow === false 如果和 strict === true 搭配</span>
      <span class="hljs-comment">// 调用 flatten 方法得到的结果永远是空数组 []</span>
      output[idx++] = value;
    }
  }

  <span class="hljs-keyword">return</span> output;
};</code></pre>
<p>总的来说，就是持续递归调用 flatten，直到不能展开为止。给出 flatten 方法的实现源码位置 <a href="https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L489-L507" rel="nofollow noreferrer" target="_blank">https://github.com/hanzichi/underscore-analysis/blob/master/underscore-1.8.3.js/src/underscore-1.8.3.js#L489-L507</a>。</p>
<p>接着我们来看看源码中有用到这个内部方法的 API。</p>
<p>首先是 _.flatten 方法，非常简单，用了 flatten 的前三个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.flatten = function(array, shallow) {
  // array => 需要展开的数组
  // shallow => 是否只展开一层
  // false 为 flatten 方法 strict 变量
  return flatten(array, shallow, false);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_.flatten = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">array, shallow</span>) </span>{
  <span class="hljs-comment">// array =&gt; 需要展开的数组</span>
  <span class="hljs-comment">// shallow =&gt; 是否只展开一层</span>
  <span class="hljs-comment">// false 为 flatten 方法 strict 变量</span>
  <span class="hljs-keyword">return</span> flatten(array, shallow, <span class="hljs-literal">false</span>);
};</code></pre>
<p>前面说了，strict 为 true 只和 shallow 为 true 一起使用，所以没有特殊情况的话 strict 默认为 false。</p>
<p>_.union 方法同样用到了 flatten，这个方法的作用是传入多个数组，然后对数组元素去重。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ans = _.union([[1]], [1, 2], 3, 4);
console.log(ans); // => [[1], 1, 2]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ans = _.union([[<span class="hljs-number">1</span>]], [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>], <span class="hljs-number">3</span>, <span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(ans); <span class="hljs-comment">// =&gt; [[1], 1, 2]</span></code></pre>
<p>首先并不需要对数组深度展开，其次 _.union 传入的是数组，对于非数组元素可以直接忽略。这两点直接对应了 shallow 参数和 strict 参数均为 true（都不用做容错处理了）。对于一个数组的去重，最后调用 _.unique 即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.union = function() {
  // 首先用 flatten 方法将传入的数组展开成一个数组
  // 然后就可以愉快地调用 _.uniq 方法了
  // 假设 _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
  // arguments 为 [[1, 2, 3], [101, 2, 1, 10], [2, 1]]
  // shallow 参数为 true，展开一层
  // 结果为 [1, 2, 3, 101, 2, 1, 10, 2, 1]
  // 然后对其去重
  return _.uniq(flatten(arguments, true, true));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_.union = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 首先用 flatten 方法将传入的数组展开成一个数组</span>
  <span class="hljs-comment">// 然后就可以愉快地调用 _.uniq 方法了</span>
  <span class="hljs-comment">// 假设 _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);</span>
  <span class="hljs-comment">// arguments 为 [[1, 2, 3], [101, 2, 1, 10], [2, 1]]</span>
  <span class="hljs-comment">// shallow 参数为 true，展开一层</span>
  <span class="hljs-comment">// 结果为 [1, 2, 3, 101, 2, 1, 10, 2, 1]</span>
  <span class="hljs-comment">// 然后对其去重</span>
  <span class="hljs-keyword">return</span> _.uniq(flatten(<span class="hljs-built_in">arguments</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>));
};</code></pre>
<p>而 _.difference，_.pick，_.omit 方法，大家可以自己进源码去看，都大同小异，没什么特别要注意的点。（注意下 startIndex 参数即可）</p>
<p>对于内部方法 flatten，我要总结的是，可能某个内部方法会被多个 API 调用，如何设计地合理，优雅，如何兼顾到各种情况，真的需要强大的实践以及代码能力，这点还需要日后多加摸索。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 数组展开以及 underscore 重要的内部方法 flatten 详解

## 原文链接
[https://segmentfault.com/a/1190000005691641](https://segmentfault.com/a/1190000005691641)


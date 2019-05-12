---
title: 'javascript 数组去重的6种思路' 
date: 2018-12-14 2:30:11
hidden: true
slug: kpoj06ab2f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>前端在日常开发中或多或少都会碰到有对数据去重的需求，实际上，像是lodash这些工具库已经有成熟完备的实现，并且可以成熟地运用于生产环境。但是这并不妨碍我们从思维拓展的角度出发，看看去重可以用几种思路去实现。</blockquote>
<p>首先是常规的双层循环比对的思路实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doubleLoopUniq(arr) {
  let result = [];
  for (let i = 0, len = arr.length, isExist; i < len; i++) {
    // 定义一个变量表示当前元素在 result 中是否存在。
    isExist = false;
    for (let j = 0, rLen = result.length; j < rLen; j++) {
      if (result[j] === arr[i]) {
        // 依次对result 中的元素 和 原数组元素进行比对。
        isExist = true;
        break;
      }
    }
    // 最后判断如果不存在，则将此元素插入result
    !isExist &amp;&amp; result.push(arr[i]);
  }
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doubleLoopUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> result = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length, isExist; i &lt; len; i++) {
    <span class="hljs-comment">// 定义一个变量表示当前元素在 result 中是否存在。</span>
    isExist = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>, rLen = result.length; j &lt; rLen; j++) {
      <span class="hljs-keyword">if</span> (result[j] === arr[i]) {
        <span class="hljs-comment">// 依次对result 中的元素 和 原数组元素进行比对。</span>
        isExist = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">break</span>;
      }
    }
    <span class="hljs-comment">// 最后判断如果不存在，则将此元素插入result</span>
    !isExist &amp;&amp; result.push(arr[i]);
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>借助 js内置的indexOf 进行去重</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function indexOfUniq(arr) {
  let result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    // 用indexOf 简化了二层循环的流程
    if (result.indexOf(arr[i]) === -1) result.push(arr[i]);
  }
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">indexOfUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> result = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = arr.length; i &lt; len; i++) {
    <span class="hljs-comment">// 用indexOf 简化了二层循环的流程</span>
    <span class="hljs-keyword">if</span> (result.indexOf(arr[i]) === <span class="hljs-number">-1</span>) result.push(arr[i]);
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>排序后前后比对去重</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sortUniq(arr) {
  let result = [], last;
  // 这里解构是为了不对原数组产生副作用
  [ ...arr ].sort().forEach(item => {
    if (item != last) {
      result.push(item);
      last = item;
    }
  });
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sortUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> result = [], last;
  <span class="hljs-comment">// 这里解构是为了不对原数组产生副作用</span>
  [ ...arr ].sort().forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (item != last) {
      result.push(item);
      last = item;
    }
  });
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<p>通过hashTable去重</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function hashUniq(arr) {
  let hashTable = arr.reduce((result, curr, index, array) => {
    result[curr] = true;
    return result;
  }, {})
  return Object.keys(hashTable).map(item => parseInt(item, 10));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hashUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> hashTable = arr.reduce(<span class="hljs-function">(<span class="hljs-params">result, curr, index, array</span>) =&gt;</span> {
    result[curr] = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> result;
  }, {})
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(hashTable).map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">parseInt</span>(item, <span class="hljs-number">10</span>));
}</code></pre>
<p>ES6 SET一行代码实现去重</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toSetUniq(arr) {
  return Array.from(new Set(arr));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toSetUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(arr));
}</code></pre>
<p>splice 去重（直接操作数组本身，带副作用）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inPlaceUniq(arr) {
  let idx = 0;
  while (idx < arr.length) {
    let compare = idx + 1;
    while (compare < arr.length) {
      if (arr[idx] == arr[compare]) {
        arr.splice(compare, 1);
        continue;
      }
      ++compare
    }
    ++idx;
  }
  return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inPlaceUniq</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> idx = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span> (idx &lt; arr.length) {
    <span class="hljs-keyword">let</span> compare = idx + <span class="hljs-number">1</span>;
    <span class="hljs-keyword">while</span> (compare &lt; arr.length) {
      <span class="hljs-keyword">if</span> (arr[idx] == arr[compare]) {
        arr.splice(compare, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">continue</span>;
      }
      ++compare
    }
    ++idx;
  }
  <span class="hljs-keyword">return</span> arr;
}</code></pre>
<p>最后在nodejs下面简单跑个测试，看看哪个效率高~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data = [];
for (var i = 0; i < 100000; i++) {
  data.push(Math.random())
}

// 实现一个性能测试的装饰器
function performanceTest(fn, descript) {
  var a = new Date().getTime();
  return function () {
    fn.apply(this, [].slice.call(arguments, 0));
    console.log(descript, new Date().getTime() - a)
  }
}

performanceTest(hashUniq, &quot;hashTable&quot;)(data)
performanceTest(sortUniq, &quot;sortUniq&quot;)(data)
performanceTest(toSetUniq, &quot;toSetUniq&quot;)(data)
performanceTest(indexOfUniq, &quot;indexOfUniq&quot;)(data)
performanceTest(doubleLoopUniq, &quot;doubleLoopUniq&quot;)(data)
performanceTest(inPlaceUniq, &quot;inPlaceUniq&quot;)(data)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-keyword">let</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++) {
  data.push(<span class="hljs-built_in">Math</span>.random())
}

<span class="hljs-comment">// 实现一个性能测试的装饰器</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">performanceTest</span>(<span class="hljs-params">fn, descript</span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    fn.apply(<span class="hljs-keyword">this</span>, [].slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">0</span>));
    <span class="hljs-built_in">console</span>.log(descript, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - a)
  }
}

performanceTest(hashUniq, <span class="hljs-string">"hashTable"</span>)(data)
performanceTest(sortUniq, <span class="hljs-string">"sortUniq"</span>)(data)
performanceTest(toSetUniq, <span class="hljs-string">"toSetUniq"</span>)(data)
performanceTest(indexOfUniq, <span class="hljs-string">"indexOfUniq"</span>)(data)
performanceTest(doubleLoopUniq, <span class="hljs-string">"doubleLoopUniq"</span>)(data)
performanceTest(inPlaceUniq, <span class="hljs-string">"inPlaceUniq"</span>)(data)</code></pre>
<p>结果如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hashTable 168ms
sortUniq 332ms
toSetUniq 80ms
indexOfUniq 4280ms
doubleLoopUniq 13303ms
inPlaceUniq 9977ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>hashTable <span class="hljs-number">168</span>ms
sortUniq <span class="hljs-number">332</span>ms
toSetUniq <span class="hljs-number">80</span>ms
indexOfUniq <span class="hljs-number">4280</span>ms
doubleLoopUniq <span class="hljs-number">13303</span>ms
inPlaceUniq <span class="hljs-number">9977</span>ms</code></pre>
<hr>
<p>延伸思考： 如果数组内的元素是对象该怎么去重呢？</p>
<p>既然是引用类型，那么不免会使用到deepEqual，固然这种思路可以解答这道问题，但难免不够高效。</p>
<p>从上面的测试中也可见通过new Set 和 hashTable 去重是最高效的。<br>所以毫无疑问，我们要基于这两种方式去改造，我想用的是hashTable，<br>另一方面，为了降低深度比较带来的耗时，我尝试用JSON.stringify 将引用类型转化为基本类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function collectionUniq(collection) {
  let hashTable = {};
  collection.forEach(item => {
    hashTable[JSON.stringify(item)] = true;
  })
  return Object.keys(hashTable).map(item => JSON.parse(item))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">collectionUniq</span>(<span class="hljs-params">collection</span>) </span>{
  <span class="hljs-keyword">let</span> hashTable = {};
  collection.forEach(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
    hashTable[<span class="hljs-built_in">JSON</span>.stringify(item)] = <span class="hljs-literal">true</span>;
  })
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(hashTable).map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">JSON</span>.parse(item))
}</code></pre>
<p>那么问题来了，我们都知道对象的属性是无序的，假如数据是这种情况，那就GG了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let collection = [ { a: 1, b: 2, c: 3 }, { b: 2, c: 3, a: 1 } ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> collection = [ { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span> }, { <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> } ]</code></pre>
<p>有一种toHash的思路，<strong>在对这个数组进行一次基本的去重之后</strong>，为了保证准确，<br>先遍历JSON 字符串 =&gt;<br>通过 <a href="http://www.w3school.com.cn/jsref/jsref_charCodeAt.asp" rel="nofollow noreferrer" target="_blank">charCodeAt()</a>拿到每个字符串 的 unicode 编码 =&gt;<br>相加得到一个总数，最后再两两进行比较，数值相等的就是重复的，这样就达到去重的效果了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function toHash(obj) {
  let power = 1;
  let res = 0;
  const string = JSON.stringify(obj, null, 2);
  for (let i = 0, l = string.length; i < l; i++) {
    switch (string[i]) {
      case '{':
        power *= 2
        break
      case '}':
        power /= 2
        break
      case ' ':
      case '\n':
      case '\r':
      case '\t':
      break
      default:
        res += string[i].charCodeAt(0) * power
    }
  }
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toHash</span>(<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">let</span> power = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> string = <span class="hljs-built_in">JSON</span>.stringify(obj, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = string.length; i &lt; l; i++) {
    <span class="hljs-keyword">switch</span> (string[i]) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'{'</span>:
        power *= <span class="hljs-number">2</span>
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">'}'</span>:
        power /= <span class="hljs-number">2</span>
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">' '</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'\n'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'\r'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'\t'</span>:
      <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">default</span>:
        res += string[i].charCodeAt(<span class="hljs-number">0</span>) * power
    }
  }
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p>这只是一个实现基本的思路，有很大的改进空间，为了减少hash碰撞的可能，可以对一些特殊字符进行权重的增减。</p>
<p><strong>重点是保证碰撞的几率小到比中大奖还小就可以了。</strong></p>
<hr>
<p>2018.2.8 <br>上面是一个比较清奇的思路，常规的做法，实际上还是应该从优化深度比较的效率入手。<br>看到一个很好的实现思路，是一个优先判错的思路，通过预设各种前置条件来避免高代价的循环，这种思路尽管在数据量小的时候因为前置判断可能有一些微乎其微的性能损耗，但是数据量越大，优势就越明显了。感兴趣的可以了解下。<br><a href="https://github.com/epoberezkin/fast-deep-equal" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/epoberezkin/fast-deep-equal" rel="nofollow noreferrer" target="_blank">https://github.com/epoberezki...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript 数组去重的6种思路

## 原文链接
[https://segmentfault.com/a/1190000013192950](https://segmentfault.com/a/1190000013192950)


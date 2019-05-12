---
title: '1625行，解开 underscore.js 的面纱 - 第四章' 
date: 2019-02-09 2:30:58
hidden: true
slug: dio9qspdezo
categories: [reprint]
---

{{< raw >}}

                    
<p>继续前面的内容，前文我们提到了很多方法的讲解，其实到这里就已经差不多了，因为大部分代码其实都是套路，一些基础函数再灵活变化就可以组成很多实用的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>  _.sortBy = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj, iteratee, context)</span></span> {
    var <span class="hljs-built_in">index</span> = <span class="hljs-number">0</span>;
    iteratee = cb(iteratee, context);
    <span class="hljs-keyword">return</span> _.pluck(_.map(obj, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, key, list)</span></span> {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-keyword">value</span>: <span class="hljs-keyword">value</span>,
        <span class="hljs-built_in">index</span>: <span class="hljs-built_in">index</span>++,
        criteria: iteratee(<span class="hljs-keyword">value</span>, key, list)
      };
    }).sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(left, right)</span></span> {
      var a = left.criteria;
      var b = right.criteria;
      <span class="hljs-keyword">if</span> (a <span class="hljs-comment">!== b) {</span>
        <span class="hljs-keyword">if</span> (a &gt; b || a === void <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        <span class="hljs-keyword">if</span> (a &lt; b || b === void <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">return</span> left.<span class="hljs-built_in">index</span> - right.<span class="hljs-built_in">index</span>;
    }), <span class="hljs-string">'value'</span>);
  };
</code></pre>
<p><code>_.sortBy</code>，顾名思义这是一个对数组进行排序处理的函数，在原生 JAVASCRIPT 中 sort() 的详情可参考 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" rel="nofollow noreferrer" target="_blank">Array.prototype.sort()</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort" rel="nofollow noreferrer" target="_blank">TypedArray.prototype.sort()</a>。<code>_.sortBy</code> 接收三个参数分别为 obj、iteratee 回调和 context，其中 iteratee 与 context 是可选参数。<br>当传入值只有 obj 时，应该限定 obj 类型为数组且值为 Number，为什么呢，这里涉及到 JAVASCRIPT 对数字字符串的比较的问题了，JAVASCRIPT 在进行字符串比较的时候遵循的是二进制与运算，也就是说并不是数字 length 越长就会大于 length 小的。举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.sortBy([1, 2, 3, 4, 5, 6, 8, 7, 11, 13]);
  [1, 2, 3, 4, 5, 6, 7, 8, 11, 13]
  _.sortBy(['1', '2', '3', '4', '5', '6', '8', '7', '11', '13']);
  [&quot;1&quot;, &quot;11&quot;, &quot;13&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>  _.sortBy([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>]);
  [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">11</span>, <span class="hljs-number">13</span>]
  _.sortBy(['<span class="hljs-number">1</span>', '<span class="hljs-number">2</span>', '<span class="hljs-number">3</span>', '<span class="hljs-number">4</span>', '<span class="hljs-number">5</span>', '<span class="hljs-number">6</span>', '<span class="hljs-number">8</span>', '<span class="hljs-number">7</span>', '<span class="hljs-number">11</span>', '<span class="hljs-number">13</span>']);
  [<span class="hljs-string">"1"</span>, <span class="hljs-string">"11"</span>, <span class="hljs-string">"13"</span>, <span class="hljs-string">"2"</span>, <span class="hljs-string">"3"</span>, <span class="hljs-string">"4"</span>, <span class="hljs-string">"5"</span>, <span class="hljs-string">"6"</span>, <span class="hljs-string">"7"</span>, <span class="hljs-string">"8"</span>]
</code></pre>
<p>同学们都很聪明，不用我在说了，言归正传，当只有 obj 一个值且值为 Number，那么默认从左到右从小到大排序，为什么呢，我看下代码，在 <code>_.pluck</code> 中代码只做了一件事，就是整理数据，当没有 iteratee 的时候执行 <code>cb</code> 函数里的 <code>if (value == null) return _.identity;</code> 也就是相当于默认 iteratee function 为 <code>_.identity</code> 即 return obj，所以 <code>_.map</code> 中回调的 criteria 值即 value。有点绕口，代码起开（假定只有 obj 一个参数）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   _.sortBy = function(obj) {
     var index = 0;
     return _.pluck(_.map(obj, function(value, key, list) {
       return {
         value: value,
         index: index++,
         criteria: (function(value, key, list) {
             return value;
           })(value, key, list);
       };
     }).sort(function(left, right) {
       var a = left.criteria;
       var b = right.criteria;
       if (a !== b) {
         if (a > b || a === void 0) return 1;
         if (a < b || b === void 0) return -1;
       }
       return left.index - right.index;
     }), 'value');
   };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>   _.sortBy = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span></span> {
     var <span class="hljs-built_in">index</span> = <span class="hljs-number">0</span>;
     <span class="hljs-keyword">return</span> _.pluck(_.map(obj, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, key, list)</span></span> {
       <span class="hljs-keyword">return</span> {
         <span class="hljs-keyword">value</span>: <span class="hljs-keyword">value</span>,
         <span class="hljs-built_in">index</span>: <span class="hljs-built_in">index</span>++,
         criteria: (<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, key, list)</span></span> {
             <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>;
           })(<span class="hljs-keyword">value</span>, key, list);
       };
     }).sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(left, right)</span></span> {
       var a = left.criteria;
       var b = right.criteria;
       <span class="hljs-keyword">if</span> (a <span class="hljs-comment">!== b) {</span>
         <span class="hljs-keyword">if</span> (a &gt; b || a === void <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
         <span class="hljs-keyword">if</span> (a &lt; b || b === void <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
       }
       <span class="hljs-keyword">return</span> left.<span class="hljs-built_in">index</span> - right.<span class="hljs-built_in">index</span>;
     }), <span class="hljs-string">'value'</span>);
   };
</code></pre>
<p>这样看上去就直白好多。整理完数据之后就是 <code>arr.sort([compareFunction])</code> 进行排序，这里不说了。当传入参数有 iteratee 回调的时候，依旧老套路优化回调，然后根据回调函数里面的设定决定 criteria 参数值，criteria 参数是 <code>arr.sort([compareFunction])</code> 进行排序的关键标识，so一定要是 Number才行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>  var group = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(behavior, partition)</span></span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj, iteratee, context)</span></span> {
      var result = partition ? <span class="hljs-string">[[], []]</span> : {};
      iteratee = cb(iteratee, context);
      _.each(obj, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, index)</span></span> {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      <span class="hljs-keyword">return</span> result;
    };
  };
</code></pre>
<p><code>group</code> 是一个内部函数，我觉得它最特别在于将回调称之为一个 behavior，为什么呢，因为虽然 behavior function 只能被动接受 <code>value, index, obj</code> 三个参数进行数值运算，但作者巧妙的用它结合 group 包装出 <code>_.groupBy</code>、<code>_.indexBy</code>、<code>_.countBy</code>、<code>_.partition</code> 四个函数，在实际开发中我们处理数据时可能需要各种适用场景的工具，那么把如何函数写好写活呢，group 给了我很大的启发，言归正传，group 的 behavior 回调是在外部定义，源码到这里并不知道 behavior 是什么东西，所以先一带而过。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.groupBy = group(function(result, value, <span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.has(result, <span class="hljs-built_in">key</span>)) result[<span class="hljs-built_in">key</span>].<span class="hljs-built_in">push</span>(value); <span class="hljs-keyword">else</span> result[<span class="hljs-built_in">key</span>] = [value];
  });
</code></pre>
<p><code>_.groupBy</code> 官网定义<code>把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.</code>。</p>
<p>———————— 颓废的分割线 ————————</p>
<p>从昨天到今天状态不佳，昏天黑地的看了两天电影，看到最后都不知道自己在看什么，我需要吐槽一下小米路由器，由于我是 linux 系统，作为 <a href="https://www.debian.org/" rel="nofollow noreferrer" target="_blank">deiban</a> 死忠党来说一台不到两千元的台式机想要链接无线网络，折腾的时间和金钱都不如再填个路由器做中继划算，于是我买了这货 <a href="http://www.mi.com/miwifimini/" rel="nofollow noreferrer" target="_blank">小米路由器</a>，它在路由器模式下还算可以，一但调整到中继模式，这完全就是一个入坑的神展开，啪啪啪的随时无间歇性断网没商量，莫名其妙的就连不上网了，即使连接上网络网速都不如无线的一般有木有，在过去的一段时间里我有 N 次想把这款路由器摔在地上（额，或者摔在墙上），希望大家不要吐槽我两千块都不到的台式主力机，价钱虽然 lower 了点，但性能绝对够用，对于 mac 党们我很希望大家转粉，虽然我也有 mac 但是我平均开机数目大约在 1/（1~2个月）。</p>
<p>写到这里目测大约水了一百多个文字，继续前天的讲解 ╮(╯Д╰)╭ 。</p>
<p>———————— END ————————</p>
<p>官网的意思是什么呢，假如我有一个 obj，那么我可以使用 <code>_.groupBy</code> 函数将这个 obj 通过其内部值的某个属性进行分类，而这个属性值的判断也可以通过回调进行扩展断言。那么当 iteratee 为 null 时，<code>_.groupBy</code> 默认使用前面的 <code>group</code> 函数中的 cb 函数的 <code>if (value == null) return _.identity;</code> 处理 iteratee 为空的情况，我来简化一下 <code>_.groupBy</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _.groupBy = function(obj) {
    var result = partition ? [[], []] : {};
    _.each(obj, function(value, index) {
         var key = value;
        if (_.has(result, key)) result[key].push(value); else result[key] = [value];
    })
    return result;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code> _.groupBy = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span></span> {
    var result = partition ? <span class="hljs-string">[[], []]</span> : {};
    _.each(obj, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value, index)</span></span> {
         var key = value;
        <span class="hljs-keyword">if</span> (_.has(result, key)) result[key].push(value); <span class="hljs-keyword">else</span> result[key] = [value];
    })
    <span class="hljs-keyword">return</span> result;
}
</code></pre>
<p>这样理解是不是浅显很多呢，设置 result 空数组，然后 <code>_.each</code> 遍历 obj，满满的都是套路有木有，唯一亮点的地方就是 if 判断是根据 <code>_.has</code> 函数确定 result 中是否已经存在 key-value。但是这里面还有一个更深的套路，那就是作者没有对 obj 作进一步处理，所以 <code>_.groupBy</code> 函数只能适用于 Array，举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.groupBy(['one', 'two', 'three']);
  {&quot;one&quot;:[&quot;one&quot;],&quot;two&quot;:[&quot;two&quot;],&quot;three&quot;:[&quot;three&quot;]}
  _.groupBy([{a:'one'}, {b:'two'}, {c:'three'}]);
  {&quot;[object Object]&quot;:[{&quot;a&quot;:&quot;one&quot;},{&quot;b&quot;:&quot;two&quot;},{&quot;c&quot;:&quot;three&quot;}]}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-number">_</span>.groupBy([<span class="hljs-string">'one'</span>, <span class="hljs-string">'two'</span>, <span class="hljs-string">'three'</span>]);
  {<span class="hljs-string">"one"</span>:[<span class="hljs-string">"one"</span>],<span class="hljs-string">"two"</span>:[<span class="hljs-string">"two"</span>],<span class="hljs-string">"three"</span>:[<span class="hljs-string">"three"</span>]}
  <span class="hljs-number">_</span>.groupBy([{a:<span class="hljs-string">'one'</span>}, {b:<span class="hljs-string">'two'</span>}, {c:<span class="hljs-string">'three'</span>}]);
  {<span class="hljs-string">"[object Object]"</span>:[{<span class="hljs-string">"a"</span>:<span class="hljs-string">"one"</span>},{<span class="hljs-string">"b"</span>:<span class="hljs-string">"two"</span>},{<span class="hljs-string">"c"</span>:<span class="hljs-string">"three"</span>}]}
</code></pre>
<p>然后我们再说一下 <code>_.groupBy</code> 参数有第二个参数的情况，这里可以看出 cb 函数的重要性，它对 iteratee 的类型情况做了细致的判断和处理，我们前面可以知道 cb 函数除了 Null、Function、Object 意外的类型都用 <code>_.property</code> 处理，即 生成获取属性值的函数，那么我们传参为数组呢，see ↓↓↓</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _.groupBy(['one', 'two', 'three'],[1,2,3])
 {&quot;false&quot;:[&quot;one&quot;,&quot;two&quot;,&quot;three&quot;]}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code> <span class="hljs-symbol">_</span>.groupBy([<span class="hljs-string">'one'</span>, <span class="hljs-string">'two'</span>, <span class="hljs-string">'three'</span>],[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])
 {<span class="hljs-string">"false"</span>:[<span class="hljs-string">"one"</span>,<span class="hljs-string">"two"</span>,<span class="hljs-string">"three"</span>]}
</code></pre>
<p>也就是说作者虽然大才，但是并没有对超出范围的值类型做进一步的处理，也就是说 iteratee 的可选值类型只能为 Function 和 String。当然这并不是错，从工具的角度来讲我们应用函数应该遵守函数创造者设定的规则，超出规则后出现错误并不是说作者的函数一定有问题，也可能是我们太过于调皮了（比如番茄西红柿需要用平底锅来炒，但厨师非要用电饭煲，这是厨师的错还是平底锅生产商的错 ─=≡Σ((( つ•̀ω•́)つ）。</p>
<p>言归正传当传入合理的 iteratee 值时，其实整个函数的重点还是 <code>group</code> 函数内部的 <code>cb</code> 函数，因为我们可以看源码 <code>_.groupBy</code> 上的回调最终是落实到 <code>cb</code> 上，将一个函数比作一个公共房间，众多人就是传入传出的参数，那么 cb 就是门禁卡识别每个人的身份并发身份牌。如果 iteratee 是 String 则用 <code>_.property</code> 处理恰到好处（生成获取属性值的函数），如果是 Function 也只是在 <code>if (_.has(result, key)) result[key].push(value); else result[key] = [value];</code> 之前通过回调生成相应的 key 值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>  _.indexBy = <span class="hljs-keyword">group</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">result</span>, value, key)</span> <span class="hljs-comment">{
    result[key] = value;
  }</span>);</span>
</code></pre>
<p>官网释义 <em>给定一个list，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名），返回一个每一项索引的对象。</em>关键代码参考 <code>_.groupBy</code>，二者的二区别也之有一行代码，理解起来并不难，我就不再水文字了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.countBy = group(function(result, value, <span class="hljs-built_in">key</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.has(result, <span class="hljs-built_in">key</span>)) result[<span class="hljs-built_in">key</span>]++; <span class="hljs-keyword">else</span> result[<span class="hljs-built_in">key</span>] = <span class="hljs-number">1</span>;
  });
</code></pre>
<p>官网释义 <em>排序一个列表组成一个组，并且返回各组中的对象的数量的计数。类似groupBy，但是不是返回列表的值，而是返回在该组中值的数目。</em>其实就是对匹配成功的元素计数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>  var reStrSymbol = /[<span class="hljs-string">^\ud800-\udfff</span>]|[<span class="hljs-string">\ud800-\udbff</span>][<span class="hljs-symbol">\udc00-\udfff</span>]|[\ud800-\udfff]/g;
</code></pre>
<p>reStrSymbol 用于正则函数，这一块我也不是很熟悉，但是我找到了两篇文章做了参考，<a href="http://unicode.org/pipermail/unicode/2014-June/000679.html" rel="nofollow noreferrer" target="_blank">Unicode Regular Expressions, Surrogate Points and UTF-8</a>、<br><a href="http://www.unicode.org/mail-arch/unicode-ml/y2003-m10/0216.html" rel="nofollow noreferrer" target="_blank">Re: Java char and Unicode 3.0+ (was:Canonical equivalence in rendering: mandatory or recommended?)</a>、<a href="http://unicode.org/" rel="nofollow noreferrer" target="_blank">unicode</a>。另外知乎上也有人对这句话做了判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" [^\ud800-\udfff] 普通的 BMP 字符，表示不包含代理对代码点的所有字符
 [\ud800-\udbff][\udc00-\udfff] 成对的代理项对，表示合法的代理对的所有字符
 [\ud800-\udfff] 未成对的代理项字，表示代理对的代码点（本身不是合法的Unicode字符）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code> [^\ud800-\udfff] 普通的 BMP 字符，表示不包含代理对代码点的所有字符
 [<span class="hljs-string">\ud800-\udbff</span>][<span class="hljs-symbol">\udc00-\udfff</span>] 成对的代理项对，表示合法的代理对的所有字符
 [\ud800-\udfff] 未成对的代理项字，表示代理对的代码点（本身不是合法的Unicode字符）
</code></pre>
<p>以上仅供参考，我也不是很清楚，等我做好这方面功课的时候再重新说这个话题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-symbol">_</span>.toArray = function(obj) {
    <span class="hljs-keyword">if</span> (!obj) <span class="hljs-built_in">return</span> [];
    <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.isArray(obj)) <span class="hljs-built_in">return</span> slice.call(obj);
    <span class="hljs-keyword">if</span> (<span class="hljs-symbol">_</span>.isString(obj)) {
      <span class="hljs-built_in">return</span> obj.match(reStrSymbol);
    }
    <span class="hljs-keyword">if</span> (isArrayLike(obj)) <span class="hljs-built_in">return</span> <span class="hljs-symbol">_</span>.<span class="hljs-built_in">map</span>(obj, <span class="hljs-symbol">_</span>.<span class="hljs-built_in">identity</span>);
    <span class="hljs-built_in">return</span> <span class="hljs-symbol">_</span>.<span class="hljs-built_in">values</span>(obj);
  };
</code></pre>
<p>官网说 <em>把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用</em>，并给出一个 <code>(function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);</code>，说心里话每当看到 arguments 的时候我第一个印象是 <code>Array.prototype.slice.call(arguments, indexes);</code>，这里作者对待 Array 的原理同样是这个。<code>_.toArray</code> 函数本身没有重点，无非就是根据字符串、数组、对象进行数组转换，需要注意的是当转换 Object 的时候会忽略 key-value 的 key，只单独把 value 放到数组中，另外就是 <code>if (_.isArray(obj))</code> 和 <code>if (isArrayLike(obj))</code>，顾名思义第一个是判断数组，第二个难道是考虑到 <code>{'length':[1,2,3,4]}</code> 这种数据结构的情况？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>  _.<span class="hljs-built_in">size</span> = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> {</span>
    <span class="hljs-keyword">if</span> (obj == null) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> isArrayLike(obj) ? obj.<span class="hljs-built_in">length</span> : _.keys(obj).<span class="hljs-built_in">length</span>;
  };
</code></pre>
<p><code>_.size</code> 用于返回传入参数的长度，包括但不限于 Object、Array 、 String 和 Function，Function 返回的是 Function 中传入参数的个数（arguments）。另外 Map 这里有个坑，Map返回值是12，众所周知 Map是一个大的对象，所以返回值是它的12个基本属性的个数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>  _.partition = group(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result, value, pass)</span></span> {
    result[<span class="hljs-keyword">pass</span> ? <span class="hljs-number">0</span> : <span class="hljs-number">1</span>].push(<span class="hljs-keyword">value</span>);
  }, true);
</code></pre>
<p><code>_.partition</code> 是第四个用 group 函数包装的函数，用来对传入 obj 做判断时返回符合回调断言的结果集以及不符合的结果集，从 <code>result[pass ? 0 : 1].push(value)</code> 这里就可见一斑了，也就是说 group 的第三个传参 partition 也就是为了 <code>_.partition</code> 而存在。partition 使 result 的设定为固定的 <code>[[][]]</code>，这种写法我觉得并不是看上去最优雅地，理想情况是最好不存在第三个参数才对，但这一定是相对节约性能的，面对可节约的性能怎么取舍已经很清楚了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
1625行，解开 underscore.js 的面纱 - 第四章

## 原文链接
[https://segmentfault.com/a/1190000005678140](https://segmentfault.com/a/1190000005678140)


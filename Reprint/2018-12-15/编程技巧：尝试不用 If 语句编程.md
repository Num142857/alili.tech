---
title: '编程技巧：尝试不用 If 语句编程' 
date: 2018-12-15 2:30:11
hidden: true
slug: 3fayzkah3wh
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://medium.com/@samerbuna/coding-tip-try-to-code-without-if-statements-d06799eed231" rel="nofollow noreferrer" target="_blank">Coding Tip: Try to Code Without If-statements</a></blockquote>
<p><span class="img-wrap"><img data-src="/img/bV2RtB?w=2000&amp;h=775" src="https://static.alili.tech/img/bV2RtB?w=2000&amp;h=775" alt="ifcode.png" title="ifcode.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在开始，请尝试尽量避免使用<code>if</code>语句来实现我们的业务</p>
<p>你可能会疑问不使用<code>if</code>有什么好处？额~，可能也没啥很明显的好处，就是换种思考方式来解决问题。<code>if-else</code>并没有错，但在某些情况下大量的<code>if-else</code>可能会降低代码可读性。下面会列举一些实例带你感受其中的奥妙。</p>
<h2 id="articleHeader0">Challenge #1: 统计数值数组中共有多少个奇数</h2>
<p>已知一个整数类型数组，统计该数组中奇数的个数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> arrayOfIntegers = [<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-1</span>, <span class="hljs-number">5</span>];</code></pre>
<p>if实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  if (remainder === 1) {
    counter++;
  }
});
console.log(counter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> counter = <span class="hljs-number">0</span>;
arrayOfIntegers.forEach(<span class="hljs-function">(<span class="hljs-params">integer</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> remainder = <span class="hljs-built_in">Math</span>.abs(integer % <span class="hljs-number">2</span>);
  <span class="hljs-keyword">if</span> (remainder === <span class="hljs-number">1</span>) {
    counter++;
  }
});
<span class="hljs-built_in">console</span>.log(counter);</code></pre>
<p>非if实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  // 偶数除2的余数为零，奇数的余数为一
  counter += remainder;
});
console.log(counter);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> counter = <span class="hljs-number">0</span>;
arrayOfIntegers.forEach(<span class="hljs-function">(<span class="hljs-params">integer</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> remainder = <span class="hljs-built_in">Math</span>.abs(integer % <span class="hljs-number">2</span>);
  <span class="hljs-comment">// 偶数除2的余数为零，奇数的余数为一</span>
  counter += remainder;
});
<span class="hljs-built_in">console</span>.log(counter);</code></pre>
<p>记： 上述两个例子，forEach是会改变原数组的，方法是<code>可变的</code>，违背了当下所提倡的函数式编程<code>immutable</code>理念，不用在意，不是本文关注点。两个例子比较而言，<code>if语句</code>的实现可能更具兼容性，可以适应于数组元素是<code>小数</code>的情况。若数组元素为浮点类型，第二个例子就无法正常使用。</p>
<h2 id="articleHeader1">Challenge #2: 判断一个日期是周末还是工作日</h2>
<p>实现一个函数，日期对象<code> new Date()</code>作为输入，根据不同日期返回当天是<code>工作日</code>还是<code>周末</code>。</p>
<p>if实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const weekendOrWeekday = inputDate => {
  const day = inputDate.getDay();
  if (day === 0 || day === 6) {
    return 'weekend';
  }

  return 'weekday';
  // Or, for ternary fans:
  // return (day === 0 || day === 6) ? 'weekend' : 'weekday';
};
console.log(weekendOrWeekday(new Date()));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> weekendOrWeekday = <span class="hljs-function"><span class="hljs-params">inputDate</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> day = inputDate.getDay();
  <span class="hljs-keyword">if</span> (day === <span class="hljs-number">0</span> || day === <span class="hljs-number">6</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'weekend'</span>;
  }

  <span class="hljs-keyword">return</span> <span class="hljs-string">'weekday'</span>;
  <span class="hljs-comment">// Or, for ternary fans:</span>
  <span class="hljs-comment">// return (day === 0 || day === 6) ? 'weekend' : 'weekday';</span>
};
<span class="hljs-built_in">console</span>.log(weekendOrWeekday(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()));</code></pre>
<p>非if实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const weekendOrWeekday = (inputDate) => {
  const day = inputDate.getDay();
  return weekendOrWeekday.labels[day] ||
         weekendOrWeekday.labels['default'];
};
weekendOrWeekday.labels = {
  0: 'weekend',
  6: 'weekend',
  default: 'weekday'
};
console.log(weekendOrWeekday(new Date()));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> weekendOrWeekday = <span class="hljs-function">(<span class="hljs-params">inputDate</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> day = inputDate.getDay();
  <span class="hljs-keyword">return</span> weekendOrWeekday.labels[day] ||
         weekendOrWeekday.labels[<span class="hljs-string">'default'</span>];
};
weekendOrWeekday.labels = {
  <span class="hljs-number">0</span>: <span class="hljs-string">'weekend'</span>,
  <span class="hljs-number">6</span>: <span class="hljs-string">'weekend'</span>,
  <span class="hljs-attr">default</span>: <span class="hljs-string">'weekday'</span>
};
<span class="hljs-built_in">console</span>.log(weekendOrWeekday(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()));</code></pre>
<p>有没有注意到，<code>if语句</code>中的数字代表哪天是周末，判定条件分布的较为零散，我们需要做的是将数字和<code>周末或工作日</code>类型对应起来，如例子2，可以使用一个对象或者map来存储对应关系。</p>
<p>上述两个例子对比，可以明显看出<code>非if代码</code>实现具有更好的可读性和扩展性</p>
<h2 id="articleHeader2">Challenge #3: The doubler function (here be dragons)，翻译不出来~尬~</h2>
<p>实现一个doubler函数，根据输入不同，做如下处理：</p>
<ol>
<li>若输入是<code>number</code>类型， 做翻倍处理(5 =&gt; 10, -10 =&gt; -20)</li>
<li>若输入是<code>string</code>类型，重复每个字符('hello' =&gt; 'hheelloo')</li>
<li>若输入是<code>function</code>类型，调用执行两次函数</li>
<li>若输入是<code>array</code>类型，对数组的每个元素做<code>doubler</code>处理</li>
<li>若输入是<code>object</code>类型，对对象的每个属性做<code>doubler</code>处理</li>
</ol>
<p><code>switch</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const doubler = (input) => {
  switch (typeof input) {
    case 'number':
      return input + input;
    case 'string':
      return input
        .split('')
        .map(letter => letter + letter)
        .join('');
    case 'object':
      Object.keys(input)
            .map(key => (input[key] = doubler(input[key])));
      return input;
    case 'function':
      input();
      input();
  }
};
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> doubler = <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> {
  <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">typeof</span> input) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'number'</span>:
      <span class="hljs-keyword">return</span> input + input;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'string'</span>:
      <span class="hljs-keyword">return</span> input
        .split(<span class="hljs-string">''</span>)
        .map(<span class="hljs-function"><span class="hljs-params">letter</span> =&gt;</span> letter + letter)
        .join(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">case</span> <span class="hljs-string">'object'</span>:
      <span class="hljs-built_in">Object</span>.keys(input)
            .map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> (input[key] = doubler(input[key])));
      <span class="hljs-keyword">return</span> input;
    <span class="hljs-keyword">case</span> <span class="hljs-string">'function'</span>:
      input();
      input();
  }
};
<span class="hljs-built_in">console</span>.log(doubler(<span class="hljs-number">-10</span>));
<span class="hljs-built_in">console</span>.log(doubler(<span class="hljs-string">'hey'</span>));
<span class="hljs-built_in">console</span>.log(doubler([<span class="hljs-number">5</span>, <span class="hljs-string">'hello'</span>]));
<span class="hljs-built_in">console</span>.log(doubler({ <span class="hljs-attr">a</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">b</span>: <span class="hljs-string">'hello'</span> }));
<span class="hljs-built_in">console</span>.log(
  doubler(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'call-me'</span>);
  }),
);</code></pre>
<p>非<code>switch</code>实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const doubler = (input) => {
  return doubler.operationsByType[typeof input](input);
};
doubler.operationsByType = {
  number: (input) => input + input,
  string: (input) =>
    input
      .split('')
      .map((letter) => letter + letter)
      .join(''),
  function: (input) => {
    input();
    input();
  },
  object: (input) => {
    Object.keys(input)
          .map((key) => (input[key] = doubler(input[key])));
    return input;
  },
};
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> doubler = <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> doubler.operationsByType[<span class="hljs-keyword">typeof</span> input](input);
};
doubler.operationsByType = {
  <span class="hljs-attr">number</span>: <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> input + input,
  <span class="hljs-attr">string</span>: <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span>
    input
      .split(<span class="hljs-string">''</span>)
      .map(<span class="hljs-function">(<span class="hljs-params">letter</span>) =&gt;</span> letter + letter)
      .join(<span class="hljs-string">''</span>),
  <span class="hljs-attr">function</span>: <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> {
    input();
    input();
  },
  <span class="hljs-attr">object</span>: <span class="hljs-function">(<span class="hljs-params">input</span>) =&gt;</span> {
    <span class="hljs-built_in">Object</span>.keys(input)
          .map(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> (input[key] = doubler(input[key])));
    <span class="hljs-keyword">return</span> input;
  },
};
<span class="hljs-built_in">console</span>.log(doubler(<span class="hljs-number">-10</span>));
<span class="hljs-built_in">console</span>.log(doubler(<span class="hljs-string">'hey'</span>));
<span class="hljs-built_in">console</span>.log(doubler([<span class="hljs-number">5</span>, <span class="hljs-string">'hello'</span>]));
<span class="hljs-built_in">console</span>.log(doubler({ <span class="hljs-attr">a</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">b</span>: <span class="hljs-string">'hello'</span> }));
<span class="hljs-built_in">console</span>.log(
  doubler(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'call-me'</span>);
  }),
);</code></pre>
<p>和Challenge #2类似，将条件值聚合在一起做统一处理。</p>
<h2 id="articleHeader3">总结</h2>
<p>当<code>if-else</code>的判断条件较多时，将条件做集中处理(用object存储其对应关系--条件做key，处理做value)。好处是增删某个条件变得容易，代码更加可读，提倡使用<code>key-value</code>对应来取代一部分的<code>if-else</code>的条件判断。</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编程技巧：尝试不用 If 语句编程

## 原文链接
[https://segmentfault.com/a/1190000013036227](https://segmentfault.com/a/1190000013036227)


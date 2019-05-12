---
title: 'vue从入门到进阶：计算属性computed与侦听器watch（三）' 
date: 2018-12-18 2:30:10
hidden: true
slug: q33xbax5rv
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">计算属性computed</h1>
<p>模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
  "{{" message.split('').reverse().join('') "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"example"</span>&gt;
  "{{" message.split(<span class="hljs-string">''</span>).<span class="hljs-keyword">reverse</span>().join(<span class="hljs-string">''</span>) "}}"
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>所以，对于任何复杂逻辑，你都应当使用计算属性。</p>
<h2 id="articleHeader1">例子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;example&quot;>
  <p>Original message: &quot;"{{" message "}}"&quot;</p>
  <p>Computed reversed message: &quot;"{{" reversedMessage "}}"&quot;</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Original message: "</span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml">"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Computed reversed message: "</span><span class="hljs-template-variable">"{{" reversedMessage "}}"</span><span class="xml">"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#example'</span>,
  dat<span class="hljs-variable">a:</span> {
    message: <span class="hljs-string">'Hello'</span>
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      // `this` 指向 <span class="hljs-keyword">vm</span> 实例
      <span class="hljs-keyword">return</span> this.message.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
    }
  }
})</code></pre>
<p>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Original message: &quot;Hello&quot;
Computed reversed message: &quot;olleH&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>Original <span class="hljs-keyword">message</span>: <span class="hljs-string">"Hello"</span>
Computed reversed <span class="hljs-keyword">message</span>: <span class="hljs-string">"olleH"</span></code></pre>
<p>这里我们声明了一个计算属性<code> reversedMessage</code>。我们提供的函数将用作属性 <code>vm.reversedMessage</code> 的 <code>getter </code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">vm</span>.reversedMessage) // =&gt; <span class="hljs-string">'olleH'</span>
<span class="hljs-keyword">vm</span>.message = <span class="hljs-string">'Goodbye'</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">vm</span>.reversedMessage) // =&gt; <span class="hljs-string">'eybdooG'</span></code></pre>
<p>你可以打开浏览器的控制台，自行修改例子中的<code> vm</code>。<code>vm.reversedMessage</code> 的值始终取决于 <code>vm.message</code> 的值。</p>
<h2 id="articleHeader2">计算属性缓存 vs 方法</h2>
<p>你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>Reversed message: &quot;"{{" reversedMessage() "}}"&quot;</p>

// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;p&gt;</span>Reversed message: <span class="hljs-string">""{{" reversedMessage() "}}""</span>&lt;/<span class="hljs-keyword">p</span>&gt;

// 在组件中
method<span class="hljs-variable">s:</span> {
  reversedMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> this.message.<span class="hljs-keyword">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-keyword">join</span>(<span class="hljs-string">''</span>)
  }
}</code></pre>
<p>我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是<code>计算属性是基于它们的依赖进行缓存的</code>。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 <code>message</code> 还没有发生改变，多次访问 <code>reversedMessage</code> 计算属性会立即返回之前的计算结果，而不必再次执行函数。</p>
<p>这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  now: function () {
    return Date.now()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">computed</span>: {
  <span class="hljs-attribute">now</span>: function () {
    return Date.<span class="hljs-built_in">now</span>()
  }
}</code></pre>
<h2 id="articleHeader3">计算属性 vs 侦听属性</h2>
<p>Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 <code>watch</code>——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。如下例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;demo&quot;>"{{" fullName "}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"demo"</span>&gt;"{{" fullName "}}"&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> vm = new Vue({
  el: <span class="hljs-string">'#demo'</span>,
  <span class="hljs-keyword">data</span>: {
    firstName: <span class="hljs-string">'Foo'</span>,
    lastName: <span class="hljs-string">'Bar'</span>,
    fullName: <span class="hljs-string">'Foo Bar'</span>
  },
  watch: {
    firstName: function (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">val</span> + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
    },
    lastName: function (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.fullName = <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">val</span>
    }
  }
})</code></pre>
<p>上面代码是命令式且重复的。将它与计算属性的版本进行比较：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#demo'</span>,
  data: {
    firstName: <span class="hljs-string">'Foo'</span>,
    lastName: <span class="hljs-string">'Bar'</span>
  },
  computed: {
    fullName: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
    }
  }
})</code></pre>
<h2 id="articleHeader4">计算属性的 setter</h2>
<p>计算属性默认只有<code> getter </code>，不过在需要时你也可以提供一个<code> setter </code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// ...</span>
computed: {
  fullName: {
    <span class="hljs-comment">// getter</span>
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName
    },
    <span class="hljs-comment">// setter</span>
    <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(newValue)</span> </span>{
      <span class="hljs-keyword">var</span> names = newValue.split(<span class="hljs-string">' '</span>)
      <span class="hljs-keyword">this</span>.firstName = names[<span class="hljs-number">0</span>]
      <span class="hljs-keyword">this</span>.lastName = names[names.length - <span class="hljs-number">1</span>]
    }
  }
}
<span class="hljs-comment">// ...</span></code></pre>
<p>现在再运行 <code>vm.fullName = 'John Doe' </code>时，<code>setter</code> 会被调用，<code>vm.firstName</code> 和 <code>vm.lastName</code> 也会相应地被更新。</p>
<h1 id="articleHeader5">侦听器watch</h1>
<p>虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 <code>watch </code>选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;watch-example&quot;>
  <p>
    Ask a yes/no question:
    <input v-model=&quot;question&quot;>
  </p>
  <p>"{{" answer "}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"watch-example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    Ask a yes/no question:
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"question"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" answer "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src=&quot;https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js&quot;></script>
<script src=&quot;https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js&quot;></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为判定用户停止输入等待的毫秒数
      500
    )
  }
})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 --&gt;</span>
<span class="hljs-comment">&lt;!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
<span class="hljs-keyword">var</span> watchExampleVM = <span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#watch-example'</span>,
  data: {
    question: <span class="hljs-string">''</span>,
    answer: <span class="hljs-string">'I cannot give you an answer until you ask a question!'</span>
  },
  watch: {
    <span class="hljs-comment">// 如果 `question` 发生改变，这个函数就会运行</span>
    question: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(newQuestion)</span> </span>{
      <span class="hljs-keyword">this</span>.answer = <span class="hljs-string">'Waiting for you to stop typing...'</span>
      <span class="hljs-keyword">this</span>.getAnswer()
    }
  },
  methods: {
    <span class="hljs-comment">// `_.debounce` 是一个通过 Lodash 限制操作频率的函数。</span>
    <span class="hljs-comment">// 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率</span>
    <span class="hljs-comment">// AJAX 请求直到用户输入完毕才会发出。想要了解更多关于</span>
    <span class="hljs-comment">// `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，</span>
    <span class="hljs-comment">// 请参考：https://lodash.com/docs#debounce</span>
    getAnswer: _.debounce(
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.question.indexOf(<span class="hljs-string">'?'</span>) === <span class="hljs-number">-1</span>) {
          <span class="hljs-keyword">this</span>.answer = <span class="hljs-string">'Questions usually contain a question mark. ;-)'</span>
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">this</span>.answer = <span class="hljs-string">'Thinking...'</span>
        <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">this</span>
        axios.get(<span class="hljs-string">'https://yesno.wtf/api'</span>)
          .then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(response)</span> </span>{
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(error)</span> </span>{
            vm.answer = <span class="hljs-string">'Error! Could not reach the API. '</span> + error
          })
      },
      <span class="hljs-comment">// 这是我们为判定用户停止输入等待的毫秒数</span>
      <span class="hljs-number">500</span>
    )
  }
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在这个示例中，使用 <code>watch </code>选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。</p>
<p>除了 <code>watch</code> 选项之外，您还可以使用命令式的 <code>vm.$watch API</code>。</p>
<h2 id="articleHeader6">vm.$watch( expOrFn, callback, [options] )</h2>
<p>参数：</p>
<ul>
<li><code>{string | Function} expOrFn</code></li>
<li><code>{Function | Object} callback</code></li>
<li>
<p><code>{Object} [options]</code></p>
<ul>
<li>{boolean} <code>deep</code>
</li>
<li>{boolean} <code>immediate</code>
</li>
</ul>
</li>
</ul>
<p>返回值：<code>{Function} unwatch</code><br>用法：<br>观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。</p>
<blockquote>注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。</blockquote>
<p>实例1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 键路径</span>
vm.$watch(<span class="hljs-string">'a.b.c'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>, oldVal) {
  <span class="hljs-comment">// 做点什么</span>
})
</code></pre>
<p>再来一个函数的实例：<br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <input type=&quot;text&quot; v-model=&quot;a&quot;  />
    <input type=&quot;text&quot; v-model=&quot;b&quot;  />
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"app"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"a"</span>  /&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> v-model=<span class="hljs-string">"b"</span>  /&gt;
&lt;/div&gt;</code></pre>
<p>JS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//函数
var vm = new Vue({
  el: '#app',
  data: {
    a:'文本1',
    b:'文本2'
  },
  
})
vm.$watch(
  function () {
    return this.a + this.b
  },
  function (newVal, oldVal) {
    console.log(newVal,oldVal);
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//函数</span>
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">a</span>:<span class="hljs-string">'文本1'</span>,
    <span class="hljs-attr">b</span>:<span class="hljs-string">'文本2'</span>
  },
  
})
vm.$watch(
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + <span class="hljs-keyword">this</span>.b
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal, oldVal</span>) </span>{
    <span class="hljs-built_in">console</span>.log(newVal,oldVal);
  }
)</code></pre>
<p><code>vm.$watch</code> 返回一个取消观察函数，用来停止触发回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> unwatch = vm.<span class="hljs-variable">$watch</span>(<span class="hljs-string">'a'</span>, cb)
<span class="hljs-comment">// 之后取消观察</span>
<span class="hljs-function"><span class="hljs-title">unwatch</span><span class="hljs-params">()</span></span></code></pre>
<ul><li>选项：deep</li></ul>
<p>为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。注意监听数组的变动不需要这么做。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$watch('someObject', callback, {
  deep: true
})
vm.someObject.nestedValue = 123
// callback is fired" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vm.<span class="hljs-variable">$watch</span>(<span class="hljs-string">'someObject'</span>, callback, {
  deep: true
})
vm<span class="hljs-selector-class">.someObject</span><span class="hljs-selector-class">.nestedValue</span> = <span class="hljs-number">123</span>
<span class="hljs-comment">// callback is fired</span></code></pre>
<ul><li>选项：immediate</li></ul>
<p>在选项参数中指定<code> immediate: true </code>将立即以表达式的当前值触发回调：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$watch('a', callback, {
  immediate: true
})
// 立即以 `a` 的当前值触发回调" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>vm.$watch(<span class="hljs-string">'a'</span>, callback, {
  immediate: <span class="hljs-literal">true</span>
})
<span class="hljs-comment">// 立即以 `a` 的当前值触发回调</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从入门到进阶：计算属性computed与侦听器watch（三）

## 原文链接
[https://segmentfault.com/a/1190000012820619](https://segmentfault.com/a/1190000012820619)


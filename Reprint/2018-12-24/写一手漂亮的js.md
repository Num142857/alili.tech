---
title: '写一手漂亮的js' 
date: 2018-12-24 2:30:06
hidden: true
slug: 15xq8d0t9mo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>看了很多best practice，却没有人教我怎么去写一手漂亮的js代码，今天我来讲讲我自己写js的经验</p>
<h3 id="articleHeader1">不要在代码中留大段注释掉的代码</h3>
<ul><li>留给git去管理，不然你要git干嘛</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad

// function add() {
//   const a = b + c
//   return a
// }

function add() {
  return a + 1000
}

// good
function add() {
  return a + 1000
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>

<span class="hljs-comment">// function add() {</span>
<span class="hljs-comment">//   const a = b + c</span>
<span class="hljs-comment">//   return a</span>
<span class="hljs-comment">// }</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> a + <span class="hljs-number">1000</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> a + <span class="hljs-number">1000</span>
}</code></pre>
<h3 id="articleHeader2">适当地换行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
function a() {
  const {
    state_a,
    state_b,
    state_c
  } = this.state
  this.setState({state_a: state_a * 2})
  return 'done'
}

// good
function a() {
  const {
    state_a,
    state_b,
    state_c
  } = this.state

  this.setState({state_a: state_a * 2})

  return 'done'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> {
    state_a,
    state_b,
    state_c
  } = <span class="hljs-keyword">this</span>.state
  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">state_a</span>: state_a * <span class="hljs-number">2</span>})
  <span class="hljs-keyword">return</span> <span class="hljs-string">'done'</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> {
    state_a,
    state_b,
    state_c
  } = <span class="hljs-keyword">this</span>.state

  <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">state_a</span>: state_a * <span class="hljs-number">2</span>})

  <span class="hljs-keyword">return</span> <span class="hljs-string">'done'</span>
}</code></pre>
<h3 id="articleHeader3">适当的添加注释，但不要疯狂的添加注释</h3>
<ul>
<li>对一段代码或者一行特别需要注意的代码注释</li>
<li>不要疯狂的注释，太啰嗦，漂亮的代码自己会说话</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const a = 'a' // 这是a
const b = 'b' // 这是b
const c = 'c' // 这是c

// good
/**
 * 申明变量
 */
 const a = 'a'
 const b = 'b'
 const c = 'c'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-string">'a'</span> <span class="hljs-comment">// 这是a</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-string">'b'</span> <span class="hljs-comment">// 这是b</span>
<span class="hljs-keyword">const</span> c = <span class="hljs-string">'c'</span> <span class="hljs-comment">// 这是c</span>

<span class="hljs-comment">// good</span>
<span class="hljs-comment">/**
 * 申明变量
 */</span>
 <span class="hljs-keyword">const</span> a = <span class="hljs-string">'a'</span>
 <span class="hljs-keyword">const</span> b = <span class="hljs-string">'b'</span>
 <span class="hljs-keyword">const</span> c = <span class="hljs-string">'c'</span></code></pre>
<h3 id="articleHeader4">将类似行为、命名的代码归类在一起</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// bad
function handleClick(arr) {
  const a = 1

  arr.map(e => e + a)

  const b = 2

  return arr.length + b
}

// good
function handleClick(arr) {
  const a = 1
  const b = 2

  arr.map(e => e + a)

  return arr.length + b
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleClick</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>

  arr.map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e + a)

  <span class="hljs-keyword">const</span> b = <span class="hljs-number">2</span>

  <span class="hljs-keyword">return</span> arr.length + b
}

<span class="hljs-comment">// good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleClick</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>
  <span class="hljs-keyword">const</span> b = <span class="hljs-number">2</span>

  arr.map(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> e + a)

  <span class="hljs-keyword">return</span> arr.length + b
}
</code></pre>
<h3 id="articleHeader5">在不破坏语义性的情况下，'能省则省'</h3>
<ul>
<li>牢记js中函数是一等公民</li>
<li>但是，如果省略到影响可读性了，就是失败的</li>
<li>在可读性和简洁性至今必须选一个的话，永远先选可读性</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function add(a) {
  return a + 1
}

function doSomething() {

}

// bad
arr.map(a => {
  return add(a)
})

setTimeout(() => {
  doSomething()
}, 1000)

// good
arr.map(add)

setTimeout(doSomething, 1000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a</span>) </span>{
  <span class="hljs-keyword">return</span> a + <span class="hljs-number">1</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params"></span>) </span>{

}

<span class="hljs-comment">// bad</span>
arr.map(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> add(a)
})

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  doSomething()
}, <span class="hljs-number">1000</span>)

<span class="hljs-comment">// good</span>
arr.map(add)

setTimeout(doSomething, <span class="hljs-number">1000</span>)
</code></pre>
<ul><li>箭头函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const a = (v) => {
  return v + 1
}

// good
const a = v => v + 1


// bad
const b = (v, i) => {
  return {
    v,
    i
  }
}

// good
const b = (v, i) => ({v, i})


// bad
const c = () => {
  return (dispatch) => {
    // doSomething
  }
}

// good
const c = () => dispatch => {
  // doSomething
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> v + <span class="hljs-number">1</span>
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v + <span class="hljs-number">1</span>


<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    v,
    i
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> b = <span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> ({v, i})


<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> c = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">dispatch</span>) =&gt;</span> {
    <span class="hljs-comment">// doSomething</span>
  }
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> c = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> dispatch =&gt; {
  <span class="hljs-comment">// doSomething</span>
}
</code></pre>
<ul><li>提前对对象取值(写react的同学一定懂)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
const a = this.props.prop_a + this.props.prop_b

this.props.fun()

// good
const {
  prop_a,
  prop_b,
  fun
} = this.props

const a = prop_a + prop_b

fun()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-keyword">this</span>.props.prop_a + <span class="hljs-keyword">this</span>.props.prop_b

<span class="hljs-keyword">this</span>.props.fun()

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> {
  prop_a,
  prop_b,
  fun
} = <span class="hljs-keyword">this</span>.props

<span class="hljs-keyword">const</span> a = prop_a + prop_b

fun()</code></pre>
<h3 id="articleHeader6">合理使用各种表达式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
if (cb) {
  cb()
}

// good
cb &amp;&amp; cb()


// bad
if (a) {
  return b
} else {
  return c
}

// good
return a ? b : c


// bad
if (a) {
  c = a
} else {
  c = 'default'
}

// good
c = a || 'default'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (cb) {
  cb()
}

<span class="hljs-comment">// good</span>
cb &amp;&amp; cb()


<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (a) {
  <span class="hljs-keyword">return</span> b
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">return</span> c
}

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">return</span> a ? b : c


<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">if</span> (a) {
  c = a
} <span class="hljs-keyword">else</span> {
  c = <span class="hljs-string">'default'</span>
}

<span class="hljs-comment">// good</span>
c = a || <span class="hljs-string">'default'</span></code></pre>
<h3 id="articleHeader7">链式调用写法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
fetch(url).then(res => {
  return res.json()
}).then(() => {
  // doSomething
}).catch(e => {

})

// good
fetch(url)
  .then(res => {
    return res.json()
  })
  .then(() => {
    // doSomething
  })
  .catch(e => {

  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
fetch(url).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> res.json()
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// doSomething</span>
}).catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {

})

<span class="hljs-comment">// good</span>
fetch(url)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> res.json()
  })
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// doSomething</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {

  })</code></pre>
<h3 id="articleHeader8">保持代码是纵向发展的</h3>
<ul><li>发现那些在整个文件中特别'突出'的代码时，应该考虑对他们做换行处理了</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// bad
return handleClick(type, key, ref, self, source, props)

// good
return handleClick(
  type,
  key,
  ref,
  self,
  source,
  props
)

// bad
const a = this.props.prop_a === 'hello' ? <di>world</div> : null

// good
const a = this.props.prop_a === 'hello'
  ? <di>world</div>
  : null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// bad</span>
<span class="hljs-keyword">return</span> handleClick(type, key, ref, self, source, props)

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">return</span> handleClick(
  type,
  key,
  ref,
  self,
  source,
  props
)

<span class="hljs-comment">// bad</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-keyword">this</span>.props.prop_a === <span class="hljs-string">'hello'</span> ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">di</span>&gt;</span>world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span> : <span class="hljs-literal">null</span>

<span class="hljs-comment">// good</span>
<span class="hljs-keyword">const</span> a = <span class="hljs-keyword">this</span>.props.prop_a === <span class="hljs-string">'hello'</span>
  ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">di</span>&gt;</span>world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  : <span class="hljs-literal">null</span></code></pre>
<h2 id="articleHeader9">总结</h2>
<p>个人经验，如有错误，还望指正</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
写一手漂亮的js

## 原文链接
[https://segmentfault.com/a/1190000012244094](https://segmentfault.com/a/1190000012244094)


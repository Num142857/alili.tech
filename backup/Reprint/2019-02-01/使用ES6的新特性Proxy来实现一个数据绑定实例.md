---
title: '使用ES6的新特性Proxy来实现一个数据绑定实例' 
date: 2019-02-01 2:30:10
hidden: true
slug: jdtzl6o1ft
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/mog" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/jrainlau/mog" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/mog</a><br>在线体验：<a href="http://codepen.io/jrainlau/pen/YpyBBY" rel="nofollow noreferrer" target="_blank"></a><button class="btn btn-xs btn-default ml10 preview" data-url="jrainlau/pen/YpyBBY" data-typeid="3">点击预览</button><a href="http://codepen.io/jrainlau/pen/YpyBBY" rel="nofollow noreferrer" target="_blank">http://codepen.io/jrainlau/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="jrainlau/pen/YpyBBY" data-typeid="3">点击预览</button></p></blockquote>
<hr>
<p>作为一个前端开发者，曾踩了太多的“数据绑定”的坑。在早些时候，都是通过<code>jQuery</code>之类的工具手动完成这些功能，但是当数据量非常大的时候，这些手动的工作让我非常痛苦。直到使用了<code>VueJS</code>，这些痛苦才得以终结。</p>
<p><code>VueJS</code>的其中一个卖点，就是“数据绑定”。使用者无需关心数据是怎么绑定到dom上面的，只需要关注数据就好，因为<code>VueJS</code>已经自动帮我们完成了这些工作。</p>
<p>这真的非常神奇，我不可救药地爱上了<code>VueJS</code>，并且把它用到我自己的项目当中。随着使用的深入，我更加想知道它深入的原理是什么。</p>
<h2 id="articleHeader0">
<code>VueJS</code>是如何进行数据绑定的？</h2>
<p>通过阅读官方文档，我看到了下面这段话：</p>
<blockquote><p>把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。</p></blockquote>
<p>关键词是<code>Object.definProperty</code>，在<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">MDN文档</a>里面是这么说的：</p>
<blockquote><p><code>Object.defineProperty()</code>方法直接定义一个对象的属性，或者修改对象当中一个已经存在的属性，并返回这个对象。</p></blockquote>
<p>让我们写个例子来测试一下它。</p>
<p>首先，建立一个钢铁侠对象并赋予他一些属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ironman = {
  name: 'Tony Stark',
  sex: 'male',
  age: '35'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> ironman = {
  name: <span class="hljs-string">'Tony Stark'</span>,
  sex: <span class="hljs-string">'male'</span>,
  age: <span class="hljs-string">'35'</span>
}</code></pre>
<p>现在我们使用<code>Object.defineProperty()</code>方法来对他的一些属性进行修改，并且在控制台把所修改的内容输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(ironman, 'age', {
  set (val) {
    console.log(`Set age to ${val}`)
    return val
  }
})

ironman.age = '48'
// --> Set age to 48" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Object.defineProperty(ironman, <span class="hljs-string">'age'</span>, {
  <span class="hljs-keyword">set</span> (<span class="hljs-keyword">val</span>) {
    console.log(`Set age to ${<span class="hljs-keyword">val</span>}`)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">val</span>
  }
})

ironman.age = <span class="hljs-string">'48'</span>
<span class="hljs-comment">// --&gt; Set age to 48</span></code></pre>
<p>看起来挺完美的。如果把<code>console.log('Set age to ${val}')</code>改为<code>element.innerHTML = val</code>，是不是就意味着数据绑定已经完成了呢？</p>
<p>让我们再修改一下钢铁侠的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ironman = {
  name: 'Tony Stark',
  sex: 'male',
  age: '35',
  hobbies: ['girl', 'money', 'game']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-keyword">let</span> ironman = {
  name: <span class="hljs-string">'Tony Stark'</span>,
  sex: <span class="hljs-string">'male'</span>,
  age: <span class="hljs-string">'35'</span>,
  hobbie<span class="hljs-variable">s:</span> [<span class="hljs-string">'girl'</span>, <span class="hljs-string">'money'</span>, <span class="hljs-string">'game'</span>]
}</code></pre>
<p>嗯……他就是一个花花公子。现在我想把一些“爱好”添加到他身上，并且在控制台看到对应的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(ironman.hobbies, 'push', {
  value () {
    console.log(`Push ${arguments[0]} to ${this}`)
    this[this.length] = arguments[0]
  }
})

ironman.hobbies.push('wine')
console.log(ironman.hobbies)

// --> Push wine to girl,money,game
// --> [ 'girl', 'money', 'game', 'wine' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Object</span>.defineProperty(ironman.hobbies, <span class="hljs-string">'push'</span>, {
  value () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Push <span class="hljs-subst">${<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]}</span> to <span class="hljs-subst">${<span class="hljs-keyword">this</span>}</span>`</span>)
    <span class="hljs-keyword">this</span>[<span class="hljs-keyword">this</span>.length] = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]
  }
})

ironman.hobbies.push(<span class="hljs-string">'wine'</span>)
<span class="hljs-built_in">console</span>.log(ironman.hobbies)

<span class="hljs-comment">// --&gt; Push wine to girl,money,game</span>
<span class="hljs-comment">// --&gt; [ 'girl', 'money', 'game', 'wine' ]</span></code></pre>
<p>在此之前，我是使用<code>get()</code>方法去追踪对象的属性变化，但是对于一个数组，我们不能使用这个方法，而是使用<code>value()</code>方法来代替。虽然这招也灵，但是并非最好的办法。有没有更好的方法可以简化这些追踪对象或数组属性变化的方法呢？</p>
<h2 id="articleHeader1">在ECMA2015，<code>Proxy</code>是一个不错的选择</h2>
<p>什么是<code>Proxy</code>？在<del><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">MDN文档</a></del>中是这么说的（误）：</p>
<blockquote><p>Proxy可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。</p></blockquote>
<p><code>Proxy</code>是ECMA2015的一个新特性，它非常强大，但我并不会讨论太多关于它的东西，除了我们现在需要的一个。现在让我们一起来新建一个Proxy实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ironmanProxy = new Proxy(ironman, {
  set (target, property, value) {
    target[property] = value
    console.log('change....')
    return true
  }
})

ironmanProxy.age = '48'
console.log(ironman.age)

// --> change....
// --> 48" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> ironmanProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(ironman, {
  set (target, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, value) {
    target[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= value
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'change....'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
})

ironmanProxy.age = <span class="hljs-string">'48'</span>
<span class="hljs-built_in">console</span>.log(ironman.age)

<span class="hljs-comment">// --&gt; change....</span>
<span class="hljs-comment">// --&gt; 48</span></code></pre>
<p>符合预期。那么对于数组呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ironmanProxy = new Proxy(ironman.hobbies, {
  set (target, property, value) {
    target[property] = value
    console.log('change....')
    return true
  }
})

ironmanProxy.push('wine')
console.log(ironman.hobbies)

// --> change...
// --> change...
// --> [ 'girl', 'money', 'game', 'wine' ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> ironmanProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(ironman.hobbies, {
  set (target, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, value) {
    target[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= value
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'change....'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
})

ironmanProxy.push(<span class="hljs-string">'wine'</span>)
<span class="hljs-built_in">console</span>.log(ironman.hobbies)

<span class="hljs-comment">// --&gt; change...</span>
<span class="hljs-comment">// --&gt; change...</span>
<span class="hljs-comment">// --&gt; [ 'girl', 'money', 'game', 'wine' ]</span></code></pre>
<p>仍然符合预期！但是为什么输出了两次<code>change...</code>呢？因为每当我触发<code>push()</code>方法的时候，这个数组的<code>length</code>属性和<code>body</code>内容都被修改了，所以会引起两次变化。</p>
<h2 id="articleHeader2">实时数据绑定</h2>
<p>解决了最核心的问题，可以考虑其他的问题了。</p>
<p>想象一下，我们有一个模板和数据对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html template -->
<p>Hello, my name is "{{"name"}}", I enjoy eatting "{{"hobbies.food"}}"</p>

<!-- javascript -->
let ironman = {
  name: 'Tony Stark',
  sex: 'male',
  age: '35',
  hobbies: {
    food: 'banana',
    drink: 'wine'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!-- html template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello, my name is </span><span class="hljs-template-variable">"{{"name}</span><span class="xml">}, I enjoy eatting </span><span class="hljs-template-variable">"{{"hobbies.food}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-comment">&lt;!-- javascript --&gt;</span>
let ironman = </span><span class="hljs-template-variable">{
  name: 'Tony Stark',
  sex: 'male',
  age: '35',
  hobbies: {
    food: 'banana',
    drink: 'wine'
  }</span><span class="xml">
}</span></code></pre>
<p>通过前面的代码，我们知道如果想要追踪一个对象的属性变化，我们应该把这个属性作为第一个参数传入<code>Proxy</code>实例。让我们一起来创建一个返回新的<code>Proxy</code>实例的函数吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function $setData (dataObj, fn) {
    let self = this
    let once = false
    let $d = new Proxy(dataObj, {
      set (target, property, value) {
        if (!once) {
          target[property] = value
          once = true
          /* Do something here */
        }
        return true
      }
    })
    fn($d)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">$setData</span> (<span class="hljs-params">dataObj, fn</span>) </span>{
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">let</span> once = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">let</span> $d = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(dataObj, {
      set (target, <span class="hljs-keyword">property</span><span class="hljs-string"></span>, value) {
        <span class="hljs-keyword">if</span> (!once) {
          target[<span class="hljs-keyword">property</span><span class="hljs-string">] </span>= value
          once = <span class="hljs-literal">true</span>
          <span class="hljs-comment">/* Do something here */</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
    })
    fn($d)
  }</code></pre>
<p>它可以通过以下的方式被使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$setData(dataObj, ($d) => {
  /* 
   * dataObj.someProps = something
   */
})

// 或者

$setData(dataObj.arrayProps, ($d) => {
  /* 
   * dataObj.push(something)
   */
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>$setData(dataObj, ($d) =&gt; {
  <span class="hljs-comment">/* 
   * dataObj.someProps = something
   */</span>
})

<span class="hljs-comment">// 或者</span>

$setData(dataObj.arrayProps, ($d) =&gt; {
  <span class="hljs-comment">/* 
   * dataObj.push(something)
   */</span>
})</code></pre>
<p>除此之外，我们应该实现模板对数据对象的映射，这样才能用<code>Tony Stark</code>来替换<code>"{{"name"}}"</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function replaceFun(str, data) {
    let self = this
    return str.replace(/"{{"([^{}]*)"}}"/g, (a, b) => {
      return data[b]
    })
  }

replaceFun('My name is "{{"name"}}"', { name: 'xxx' })
// --> My name is xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceFun</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/"{{"([^{}]*)"}}"/g</span>, <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> data[b]
    })
  }

replaceFun(<span class="hljs-string">'My name is "{{"name"}}"'</span>, { name: <span class="hljs-string">'xxx'</span> })
<span class="hljs-comment">// --&gt; My name is xxx</span></code></pre>
<p>这个函数对于如<code>{ name: 'xx', age: 18 }</code>的单层属性对象运行良好，但是对于如<code>{ hobbies: { food: 'apple', drink: 'milk' } }</code>这样的多层属性对象却无能为力。举个例子，如果模板关键字是<code>"{{"hobbies.food"}}"</code>，那么<code>replaceFun()</code>函数就应该返回<code>data['hobbies']['food']</code>。</p>
<p>为了解决这个问题，再来一个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getObjProp (obj, propsName) {
    let propsArr = propsName.split('.')
    function rec(o, pName) {
      if (!o[pName] instanceof Array &amp;&amp; o[pName] instanceof Object) {
        return rec(o[pName], propsArr.shift())
      }
      return o[pName]
    }
    return rec(obj, propsArr.shift())
  }

getObjProp({ data: { hobbies: { food: 'apple', drink: 'milk' } } }, 'hobbies.food')
// --> return  { food: 'apple', drink: 'milk' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getObjProp</span> <span class="hljs-params">(obj, propsName)</span> {</span>
    <span class="hljs-keyword">let</span> propsArr = propsName.<span class="hljs-keyword">split</span>(<span class="hljs-string">'.'</span>)
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rec</span><span class="hljs-params">(o, pName)</span> {</span>
      <span class="hljs-keyword">if</span> (!o[pName] instanceof Array &amp;&amp; <span class="hljs-keyword">o</span>[pName] instanceof Object) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">rec</span>(<span class="hljs-keyword">o</span>[pName], propsArr.shift())
      }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">o</span>[pName]
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">rec</span>(obj, propsArr.shift())
  }

getObjProp({ dat<span class="hljs-variable">a:</span> { hobbie<span class="hljs-variable">s:</span> { food: <span class="hljs-string">'apple'</span>, drink: <span class="hljs-string">'milk'</span> } } }, <span class="hljs-string">'hobbies.food'</span>)
// --&gt; <span class="hljs-keyword">return</span>  { food: <span class="hljs-string">'apple'</span>, drink: <span class="hljs-string">'milk'</span> }</code></pre>
<p>最终的<code>replaceFun()</code>函数应该是下面这样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function replaceFun(str, data) {
    let self = this
    return str.replace(/"{{"([^{}]*)"}}"/g, (a, b) => {
      let r = self._getObjProp(data, b);
      console.log(a, b, r)
      if (typeof r === 'string' || typeof r === 'number') {
        return r
      } else {
        return self._getObjProp(r, b.split('.')[1])
      }
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">replaceFun</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/"{{"([^{}]*)"}}"/g</span>, <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> r = self._getObjProp(data, b);
      <span class="hljs-built_in">console</span>.log(a, b, r)
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> r === <span class="hljs-string">'string'</span> || <span class="hljs-keyword">typeof</span> r === <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> r
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> self._getObjProp(r, b.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">1</span>])
      }
    })
  }</code></pre>
<h2 id="articleHeader3">一个数据绑定的实例，叫做“Mog”</h2>
<p>不为什么，就叫做“Mog”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Mog {
  constructor (options) {
    this.$data = options.data
    this.$el = options.el
    this.$tpl = options.template
    this._render(this.$tpl, this.$data)
  }

  $setData (dataObj, fn) {
    let self = this
    let once = false
    let $d = new Proxy(dataObj, {
      set (target, property, value) {
        if (!once) {
          target[property] = value
          once = true
          self._render(self.$tpl, self.$data)
        }
        return true
      }
    })
    fn($d)
  }

  _render (tplString, data) {
    document.querySelector(this.$el).innerHTML = this._replaceFun(tplString, data)
  }

  _replaceFun(str, data) {
    let self = this
    return str.replace(/"{{"([^{}]*)"}}"/g, (a, b) => {
      let r = self._getObjProp(data, b);
      console.log(a, b, r)
      if (typeof r === 'string' || typeof r === 'number') {
        return r
      } else {
        return self._getObjProp(r, b.split('.')[1])
      }
    })
  }

  _getObjProp (obj, propsName) {
    let propsArr = propsName.split('.')
    function rec(o, pName) {
      if (!o[pName] instanceof Array &amp;&amp; o[pName] instanceof Object) {
        return rec(o[pName], propsArr.shift())
      }
      return o[pName]
    }
    return rec(obj, propsArr.shift())
  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Mog</span> </span>{
  <span class="hljs-keyword">constructor</span> (options) {
    <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">data</span> = options.<span class="hljs-keyword">data</span>
    <span class="hljs-keyword">this</span>.$el = options.el
    <span class="hljs-keyword">this</span>.$tpl = options.template
    <span class="hljs-keyword">this</span>._render(<span class="hljs-keyword">this</span>.$tpl, <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">data</span>)
  }

  $setData (dataObj, fn) {
    let self = <span class="hljs-keyword">this</span>
    let once = <span class="hljs-literal">false</span>
    let $d = new Proxy(dataObj, {
      <span class="hljs-keyword">set</span> (target, property, value) {
        <span class="hljs-keyword">if</span> (!once) {
          target[property] = value
          once = <span class="hljs-literal">true</span>
          self._render(self.$tpl, self.$<span class="hljs-keyword">data</span>)
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
    })
    fn($d)
  }

  _render (tplString, <span class="hljs-keyword">data</span>) {
    document.querySelector(<span class="hljs-keyword">this</span>.$el).innerHTML = <span class="hljs-keyword">this</span>._replaceFun(tplString, <span class="hljs-keyword">data</span>)
  }

  _replaceFun(str, <span class="hljs-keyword">data</span>) {
    let self = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">return</span> str.replace(/"{{"([^{}]*)"}}"/g, (a, b) =&gt; {
      let r = self._getObjProp(<span class="hljs-keyword">data</span>, b);
      console.log(a, b, r)
      <span class="hljs-keyword">if</span> (typeof r === <span class="hljs-string">'string'</span> || typeof r === <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> r
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> self._getObjProp(r, b.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">1</span>])
      }
    })
  }

  _getObjProp (obj, propsName) {
    let propsArr = propsName.split(<span class="hljs-string">'.'</span>)
    function rec(o, pName) {
      <span class="hljs-keyword">if</span> (!o[pName] instanceof Array &amp;&amp; o[pName] instanceof Object) {
        <span class="hljs-keyword">return</span> rec(o[pName], propsArr.shift())
      }
      <span class="hljs-keyword">return</span> o[pName]
    }
    <span class="hljs-keyword">return</span> rec(obj, propsArr.shift())
  }

}</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->

    <div id=&quot;app&quot;>
      <p>
        Hello everyone, my name is <span>"{{"name"}}"</span>, I am a mini <span>"{{"lang"}}"</span> framework for just <span>"{{"work"}}"</span>. I can bind data from <span>"{{"supports.0"}}"</span>, <span>"{{"supports.1"}}"</span> and <span>"{{"supports.2"}}"</span>. What's more, I was created by <span>"{{"info.author"}}"</span>, and was written in <span>"{{"info.jsVersion"}}"</span>. My motto is &quot;<span>"{{"motto"}}"</span>&quot;.
      </p>
    </div>
    <div id=&quot;input-wrapper&quot;>
      Motto: <input type=&quot;text&quot; id=&quot;set-motto&quot; autofocus>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- html --&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        Hello everyone, my name is <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>, I am a mini <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"lang"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> framework for just <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"work"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>. I can bind data from <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"supports.0"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"supports.1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> and <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"supports.2"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>. What's more, I was created by <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"info.author"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>, and was written in <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"info.jsVersion"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>. My motto is "<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"motto"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>".
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input-wrapper"</span>&gt;</span>
      Motto: <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"set-motto"</span> <span class="hljs-attr">autofocus</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- javascript -->

let template = document.querySelector('#app').innerHTML

let mog = new Mog({
  template: template,
  el: '#app',
  data: {
    name: 'mog',
    lang: 'javascript',
    work: 'data binding',
    supports: ['String', 'Array', 'Object'],
    info: {
      author: 'Jrain',
      jsVersion: 'Ecma2015'
    },
    motto: 'Every dog has his day'
  }
})

document.querySelector('#set-motto').oninput = (e) => {
  mog.$setData(mog.$data, ($d) => {
    $d.motto = e.target.value
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;!-- javascript --&gt;

let template = document.querySelector(<span class="hljs-string">'#app'</span>)<span class="hljs-selector-class">.innerHTML</span>

let mog = new Mog({
  template: template,
  el: <span class="hljs-string">'#app'</span>,
  data: {
    name: <span class="hljs-string">'mog'</span>,
    lang: <span class="hljs-string">'javascript'</span>,
    work: <span class="hljs-string">'data binding'</span>,
    supports: [<span class="hljs-string">'String'</span>, <span class="hljs-string">'Array'</span>, <span class="hljs-string">'Object'</span>],
    info: {
      author: <span class="hljs-string">'Jrain'</span>,
      jsVersion: <span class="hljs-string">'Ecma2015'</span>
    },
    motto: <span class="hljs-string">'Every dog has his day'</span>
  }
})

document.querySelector(<span class="hljs-string">'#set-motto'</span>)<span class="hljs-selector-class">.oninput</span> = (e) =&gt; {
  mog.<span class="hljs-variable">$setData</span>(mog.<span class="hljs-variable">$data</span>, (<span class="hljs-variable">$d</span>) =&gt; {
    <span class="hljs-variable">$d</span><span class="hljs-selector-class">.motto</span> = e<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.value</span>
  })
}</code></pre>
<p>你可以在<a href="http://codepen.io/jrainlau/pen/YpyBBY" rel="nofollow noreferrer" target="_blank">这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="jrainlau/pen/YpyBBY" data-typeid="3">点击预览</button>进行在线体验。</p>
<h2 id="articleHeader4">后记</h2>
<p><code>Mog</code>仅仅是一个用于学习数据绑定的实验性质的项目，代码仍然不够优雅，功能也不够丰富。但是这个小玩具让我学习了很多。如果你对它有兴趣，欢迎到<a href="https://github.com/jrainlau/mog" rel="nofollow noreferrer" target="_blank">这里</a>把项目fork走，并且加入一些你的想法。</p>
<p>感谢阅读！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用ES6的新特性Proxy来实现一个数据绑定实例

## 原文链接
[https://segmentfault.com/a/1190000007443611](https://segmentfault.com/a/1190000007443611)


---
title: 'JS函数式编程 - 函子和范畴轮' 
date: 2019-02-14 2:30:37
hidden: true
slug: k8jw1tz6zng
categories: [reprint]
---

{{< raw >}}

                    
<p>在前面几篇介绍了函数式比较重要的一些概念和如何用函数组合去解决相对复杂的逻辑。是时候开始介绍如何控制副作用了。</p>
<h2 id="articleHeader0">数据类型</h2>
<p>我们来看看<a href="https://segmentfault.com/a/1190000016671245">上一篇</a>最后例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const split = curry((tag, xs) => xs.split(tag))
const reverse = xs => xs.reverse()
const join = curry((tag, xs) => xs.join(tag))

const reverseWords = compose(join(''), reverse, split(''))

reverseWords('Hello,world!');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> split = curry(<span class="hljs-function">(<span class="hljs-params">tag, xs</span>) =&gt;</span> xs.split(tag))
<span class="hljs-keyword">const</span> reverse = <span class="hljs-function"><span class="hljs-params">xs</span> =&gt;</span> xs.reverse()
<span class="hljs-keyword">const</span> join = curry(<span class="hljs-function">(<span class="hljs-params">tag, xs</span>) =&gt;</span> xs.join(tag))

<span class="hljs-keyword">const</span> reverseWords = compose(join(<span class="hljs-string">''</span>), reverse, split(<span class="hljs-string">''</span>))

reverseWords(<span class="hljs-string">'Hello,world!'</span>);</code></pre>
<p>这里其实<code>reverseWords</code>还是很难阅读，你不知道他入参是啥，返回值又是啥。你如果不去看一下代码，一开始在使用他的时候，你应该是比较害怕的。 “我是不是少传了一个参数？是不是传错了参数？返回值真的一直都是一个字符串吗？”。这也是类型系统的重要性了，在不断了解函数式后，你会发现，函数式编程和类型是密切相关的。如果在这里<code>reverseWords</code>的类型明确给出，就相当于文档了。</p>
<p>但是，JavaScript是动态类型语言，我们不会去明确的指定类型。不过我们可以通过注释的方式加上类型:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reverseWords: string => string
const reverseWords = compose(join(''), reverse, split(''))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// reverseWords: string =&gt; string</span>
<span class="hljs-keyword">const</span> reverseWords = compose(join(<span class="hljs-string">''</span>), reverse, split(<span class="hljs-string">''</span>))</code></pre>
<p>上面就相当于指定了<code>reverseWords</code>是一个接收字符串，并返回字符串的函数。</p>
<p>JS 本身不支持静态类型检测，但是社区有很多JS的超集是支持类型检测的，比如<a href="https://github.com/facebook/flow" rel="nofollow noreferrer" target="_blank">Flow</a>还有<a href="https://github.com/Microsoft/TypeScript" rel="nofollow noreferrer" target="_blank">TypeScript</a>。当然类型检测不光是上面所说的自文档的好处，它还能在预编译阶段提前发现错误，能约束行为等。</p>
<p>当然我的后续文章还是以JS为语言，但是会在注释里面加上类型。</p>
<h2 id="articleHeader1">范畴论相关概念</h2>
<p>范畴论其实并不是特别难，不过是些抽象点的概念。而且我们不需要了解的特别深，函数式编程很多概念是从范畴论映射过来的。了解范畴论相关概念有助于我们理解函数式编程。另外，相信我，只要你小学初中学过一元函数和集合，看懂下面的没有问题。</p>
<h3 id="articleHeader2">定义</h3>
<p>范畴的定义：</p>
<ol>
<li>一组对象，是需要操作的数据的一个集合</li>
<li>一组态射，是数据对象上的映射关系，比如 f: A -&gt; B</li>
<li>态射组合，就是态射能够几个组合在一起形成一个新的态射</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVbiMeh?w=150&amp;h=150" src="https://static.alili.tech/img/bVbiMeh?w=150&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>图片出处：<a href="https://en.wikipedia.org/wiki/Category_theory" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki...</a></p>
<p>一个简单的例子，上图来自维基百科。上面就是一个范畴，一共有3个数据对象<code>A,B,C</code>，然后<code>f</code>和<code>g</code>是态射，而<code>gof</code>是一组态射组合。是不是很简单？</p>
<p>其中态射可以理解是函数，而态射的组合，我们可以理解为函数的组合。而里面的一组对象，不就是一个具有一些相同属性的数据集嘛。</p>
<h3 id="articleHeader3">函子(functor)</h3>
<p>函子是用来将两个范畴关联起来的。</p>
<p><span class="img-wrap"><img data-src="/img/bVbiMek?w=729&amp;h=857" src="https://static.alili.tech/img/bVbiMek?w=729&amp;h=857" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>图片出处：<a href="https://ncatlab.org/nlab/show/functor" rel="nofollow noreferrer" target="_blank">https://ncatlab.org/nlab/show...</a></p>
<p>对应上图，比如对于范畴 C 和 D ，函子 F : C =&gt; D 能够：将 C 中任意对象X 转换为 D 中的 F(X);  将 C 中的态射 f : X =&gt; Y 转换为 D 中的 F(f) : F(X) =&gt; F(Y)。你可以发现函子可以：</p>
<ol>
<li>转换对象</li>
<li>转换态射</li>
</ol>
<h2 id="articleHeader4">构建一个函子(functor)</h2>
<h3 id="articleHeader5">Container</h3>
<p>正如上面所说，函子能够关联两个范畴。而范畴里面必然是有一组数据对象的。这里引入Container，就是为了引入数据对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Container {
  constructor (value) {
    this.$value = value
  }
  // (value) => Container(value)
  static of(value) {
    return new Container(value)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> </span>{
  <span class="hljs-keyword">constructor</span> (value) {
    <span class="hljs-keyword">this</span>.$value = value
  }
  <span class="hljs-comment">// (value) =&gt; Container(value)</span>
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">of</span>(value) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Container(value)
  }
}</code></pre>
<p>我们声明了一个Container的类，然后给了一个静态的of方法用于去生成这个Container的实例。这个of其实还有个好听的名字，卖个关子，后面介绍。</p>
<p>我们来看一下使用这个<code>Container</code>的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Container(123)
Container.of(123)

// Container(&quot;Hello Conatiner!&quot;)
Container.of(&quot;Hello Conatiner!&quot;)

// Container(Conatiner(&quot;Test !&quot;))
Container.of(Container.of(&quot;Test !&quot;))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Container(123)</span>
Container.of(<span class="hljs-number">123</span>)

<span class="hljs-comment">// Container("Hello Conatiner!")</span>
Container.of(<span class="hljs-string">"Hello Conatiner!"</span>)

<span class="hljs-comment">// Container(Conatiner("Test !"))</span>
Container.of(Container.of(<span class="hljs-string">"Test !"</span>))
</code></pre>
<p>正如上面看到的，Container是可以嵌套的。我们仔细看一下这个Contaienr：</p>
<ol>
<li>$value的类型不确定，但是一旦赋值之后，类型就确定了</li>
<li>一个Conatiner只会有一个value</li>
<li>我们虽然能直接拿到$value，但是不要这样做，不然我们要个container干啥呢</li>
</ol>
<h3 id="articleHeader6">第一个functor</h3>
<p>让我们回看一下定义，函子是用来将两个范畴关联起来的。所以我们还需要一个态射（函数）去把两个范畴关联起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Container {
  constructor (value) {
    this.$value = value
  }
  // (value) => Container(value)
  static of(value) {
    return new Container(value)
  }
  // (fn: x=>y) => Container(fn(value))
  map(fn) {
    return new Container(fn(this.$value))
  } 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Container</span> </span>{
  <span class="hljs-keyword">constructor</span> (value) {
    <span class="hljs-keyword">this</span>.$value = value
  }
  <span class="hljs-comment">// (value) =&gt; Container(value)</span>
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">of</span>(value) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Container(value)
  }
  <span class="hljs-comment">// (fn: x=&gt;y) =&gt; Container(fn(value))</span>
  map(fn) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Container(fn(<span class="hljs-keyword">this</span>.$value))
  } 
}</code></pre>
<p>先来用一把：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const concat = curry((str, xs) => xs.concat(str))
const prop = curry((prop, xs) => xs[prop])

// Container('TEST')
Container.of('test').map(s => s.toUpperCase())

// Container(10)
Container.of('bombs').map(concat(' away')).map(prop('length')); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> concat = curry(<span class="hljs-function">(<span class="hljs-params">str, xs</span>) =&gt;</span> xs.concat(str))
<span class="hljs-keyword">const</span> prop = curry(<span class="hljs-function">(<span class="hljs-params">prop, xs</span>) =&gt;</span> xs[prop])

<span class="hljs-comment">// Container('TEST')</span>
Container.of(<span class="hljs-string">'test'</span>).map(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.toUpperCase())

<span class="hljs-comment">// Container(10)</span>
Container.of(<span class="hljs-string">'bombs'</span>).map(concat(<span class="hljs-string">' away'</span>)).map(prop(<span class="hljs-string">'length'</span>)); </code></pre>
<p>不晓得上面的curry是啥的看<a href="https://segmentfault.com/a/1190000016671245?_ea=4737845">第二篇文章</a>。</p>
<p>你可能会说：“哦，这是你说的functor，那又有啥用呢？”。接下来，就讲一个应用。</p>
<p>不过再讲应用前先讲一下这个<code>of</code>，其实上面这种functor，叫做<code>pointed functor</code>, ES5里面的Array就应用了这种模式：<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of" rel="nofollow noreferrer" target="_blank">Array.of</a>。他是一种模式，不仅仅是用来省略构建对象的new关键字的。我感觉和scala里面的<code>compaion object</code>有点类似。</p>
<h2 id="articleHeader7">Maybe type</h2>
<p>在现实的代码中，存在很多数据是可选的，返回的数据可能是存在的也可能不存在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Person = {
  info?: {
    age?: string
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">type Person = {
  info?: {
    age?: string
  }
}</code></pre>
<p>上面是flow里面的类型声明，其中<code>?</code>代表这个数据可能存在，可能不存在。我相信像上面的数据结构，你在接收后端返回的数据的时候经常遇到。假如我们要取这个<code>age</code>属性，我们通常是怎么处理的呢？</p>
<p>当然是加判断啦:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const person = { info: {} }

const getAge = (person) => {
  return person &amp;&amp; person.info &amp;&amp; person.info.age
}

getAge(person) // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> person = { <span class="hljs-attr">info</span>: {} }

<span class="hljs-keyword">const</span> getAge = <span class="hljs-function">(<span class="hljs-params">person</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> person &amp;&amp; person.info &amp;&amp; person.info.age
}

getAge(person) <span class="hljs-comment">// undefined</span></code></pre>
<p>你会发现为了取个age，我们需要加很多的判断。当数据中有很多是可选的数据，你会发现你的代码充满了这种类型判断。心累不？</p>
<p>Okey，Maybe type就是为了解决这个问题的，先让我们实现一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  get() {
    if (this.isNothing) {
      throw new Error(&quot;Get Nothing&quot;)
    } else {
      return this.$value
    }
  }

  getOrElse(optionValue) {
    if (this.isNothing) {
      return optionValue
    } else {
      return this.$value
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Maybe</span> </span>{
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">of</span>(x) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Maybe(x);
  }

  get isNothing() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$value === <span class="hljs-literal">null</span> || <span class="hljs-keyword">this</span>.$value === <span class="hljs-literal">undefined</span>;
  }

  <span class="hljs-keyword">constructor</span>(x) {
    <span class="hljs-keyword">this</span>.$value = x;
  }

  map(fn) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isNothing ? <span class="hljs-keyword">this</span> : Maybe.of(fn(<span class="hljs-keyword">this</span>.$value));
  }

  get() {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isNothing) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Get Nothing"</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$value
    }
  }

  getOrElse(optionValue) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isNothing) {
      <span class="hljs-keyword">return</span> optionValue
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$value
    }
  }
}</code></pre>
<p>应用一波：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
type Person = {
  info?: {
    age?: string
  }
}

const prop = curry((tag, xs) => xs[tag])
const map = curry((fn, f) => f.map(fn))

const person = { info: {} }

// safe get age
Maybe.of(person.info).map(prop(&quot;age&quot;)) // Nothing

// safe get age Point free style
const safeInfo = xs => Maybe.of(person.info)
const getAge = compose(map(prop('age')), safeInfo)
getAge(person) // Nothing
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
type Person = {
  info?: {
    age?: string
  }
}

<span class="hljs-keyword">const</span> prop = curry(<span class="hljs-function">(<span class="hljs-params">tag, xs</span>) =&gt;</span> xs[tag])
<span class="hljs-keyword">const</span> map = curry(<span class="hljs-function">(<span class="hljs-params">fn, f</span>) =&gt;</span> f.map(fn))

<span class="hljs-keyword">const</span> person = { <span class="hljs-attr">info</span>: {} }

<span class="hljs-comment">// safe get age</span>
Maybe.of(person.info).map(prop(<span class="hljs-string">"age"</span>)) <span class="hljs-comment">// Nothing</span>

<span class="hljs-comment">// safe get age Point free style</span>
<span class="hljs-keyword">const</span> safeInfo = <span class="hljs-function"><span class="hljs-params">xs</span> =&gt;</span> Maybe.of(person.info)
<span class="hljs-keyword">const</span> getAge = compose(map(prop(<span class="hljs-string">'age'</span>)), safeInfo)
getAge(person) <span class="hljs-comment">// Nothing</span>
</code></pre>
<p>来复盘一波，上面的map依然是一个functor（函子）。不过呢，在做类型转换的时候加上了逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="map(fn) {
  return this.isNothing ? this : Maybe.of(fn(this.$value));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">map(fn) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.isNothing ? <span class="hljs-keyword">this</span> : Maybe.of(fn(<span class="hljs-keyword">this</span>.$value));
}</code></pre>
<p>所以也就是上面的转换关系可以表示为：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiMeo?w=441&amp;h=201" src="https://static.alili.tech/img/bVbiMeo?w=441&amp;h=201" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>其实一看图就出来了，“哦，你把判断移动到了map里面。有啥用？”。ok，罗列一下好处：</p>
<ol>
<li>更安全</li>
<li>将判断逻辑进行封装，代码更简洁</li>
<li>声明式代码，没有各种各样的判断</li>
</ol>
<p>其实，不确定性，也是一种副作用。对于可选的数据，我们在运行时是很难确定他的真实的数据类型的，我们用<code>Maybe</code>封装一下其实本身就是封装这种不确定性。这样就能保证我们的一个入参只有可能会返回一种输出了。</p>
<p>先就这，下一篇介绍另外两个函子的应用(其实不应该叫应用)，<code>Either</code>和<code>IO</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS函数式编程 - 函子和范畴轮

## 原文链接
[https://segmentfault.com/a/1190000016829296](https://segmentfault.com/a/1190000016829296)


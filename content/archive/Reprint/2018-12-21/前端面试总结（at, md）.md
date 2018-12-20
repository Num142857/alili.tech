---
title: '前端面试总结（at, md）' 
date: 2018-12-21 2:30:11
hidden: true
slug: 0xsbp5ipwxbm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引入</h2>
<p>面试过去了这么久，把八月份面试题和总结发一下吧，虽然年底大家可能都不换工作~ 还是可以看看的。</p>
<p>关于面试，引用叶老湿的一句话。你的简历是自己工作的答卷，项目经历是你给面试官出的考纲。所以，我的面试一定是与我的简历、工作经历相关的，一些面试题并不一定适用于任何人，但是你可以从中了解他们考察的点，以及侧重点。基础知识可以查漏补缺。</p>
<p><a href="https://github.com/sunyongjian/blog/issues/32" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<h2 id="articleHeader1">moka</h2>
<blockquote>一家小型创业公司。因为同事有去面过的，他说面试感觉挺 diao 的，我就想去试一下啦，拿它先热热身，就从boss上投了简历。</blockquote>
<h3 id="articleHeader2">一轮</h3>
<ul>
<li>用 setTimeout 实现 setInterval，可不必关心返回值的类型。<p>我听错了条件，我以为要注意返回值的类型必须跟原生的一样，也就是返回一个 number，并可以 clear。无清除定时器功能的马上就写出来了，但是加清除定时器，还有返回值的问题，就费了半天劲... 也没弄明白。面试官比较着急了，跟我沟通的时候，我才知道返回值不一定非要跟原生的一样。</p>
</li>
<li>给了一个栗子，结合 <code>pdf.js</code> 的示例代码，找出这个栗子中为什么分辨率很低。主要是看你通过调试去解决问题的能力。</li>
<li>然后就各种结合项目各种问呗，如何解决问题的，如何团队协作沟通的。</li>
<li>还给了我一个题，让我回去用 React 实现一个群组的 CheckBox，其实最后看就是 treeselect 的雏形啊。<a href="https://github.com/sunyongjian/checkbox-demo" rel="nofollow noreferrer" target="_blank">我的实现</a>
</li>
</ul>
<h3 id="articleHeader3">二面</h3>
<ul>
<li>自我介绍</li>
<li>最近做的一个项目，其中的难点，过程。</li>
<li>最近做没做过技术调研，我捡我了解的说，比如redux和mobx的区别。</li>
<li>做技术分享的时候会关注哪几个点，<br>答： 它的实现原理，简单的一张图。一个简单的demo引入，并看一些实现。充分表现它的优势，然后跟现有的技术栈是否能结合，快速上手。有什么缺陷。</li>
<li>在第一家公司有没有记忆深刻的项目，经历。项目的话就是最开始的时候，让我自己写一个页面的时候，在一周之内搞完。。有一个特效是在轮播图上加放大镜，用swiper和自己写的放大镜。当时各种努力工作终于把这个功能做完，但是忽略了兼容性的问题。在ie8,9 是无法滚动的。然后立马切换到另一个slide.js，替换上之后放大镜失效了。当时好像是插件内部阻止了冒泡行为，我那个放大镜取不到事件了。 因为已经到deadline了，通过我们的leader跟运营人员沟通，先不要这个功能了。就上了。后来查的时候，swiper2的兼容性比较好，ie8.</li>
<li>个人的缺点 。技术上就是还是比较low， 然后就是个人的毅力感觉一般，但是最近健身感觉自己很不错。</li>
<li>怎么算是分布式的应用呢，属于自己挖坑。</li>
<li>问了我好多不是技术“点”的问题，都是大的面，细节很少。记不清了。</li>
</ul>
<h3 id="articleHeader4">三四面</h3>
<p>就是 hr 和 ceo 了，就是问一些离职原因，跟公司价值观方面的问题了。</p>
<h3 id="articleHeader5">总结</h3>
<p>无论是一面的 pdf，让我实现一个功能，还是二面的问题，都是偏重于项目实战的。他们想要的是入职就能干活的人，先能负责某块开发任务。并且在独立解决问题，团队分享方面有所表现。</p>
<h2 id="articleHeader6">腾讯 （omg）</h2>
<h3 id="articleHeader7">一面</h3>
<ul>
<li>平常开发怎么设计 react 组件的。比如 container 组件，业务组件等等的。</li>
<li>手写一个观察者，发布订阅模式。</li>
<li>什么是函数式，跟面向对象有什么区别，因为我简历写了正在学习 fp。</li>
<li>科里化，写一个</li>
<li>cache-control，http-only</li>
<li>url输入到服务器中间发生</li>
<li>redux源码</li>
<li>vue跟angular像不像</li>
<li>vue跟react的模板渲染分别是怎么做的</li>
<li>实现垂直水平居中</li>
</ul>
<h3 id="articleHeader8">二面</h3>
<ul>
<li>react 组件的结构，其实是问组件实例对象的结构，问题没理解。我说在 children 里就能看到。他问是吗，是什么样的，你平常应该用过 children 啊，应该知道啊。我推测 children 是数组，因为有 children.map 方法。他又问一定是吗。<p>这个问题上来就暴露了我对这些细节是没有关注的，而他期望的是，你用 React，连它的实例都没看过，children 可能是一个，可能是多个也不清楚。</p>
</li>
<li>那我再问一个特别简单的问题，组件之间的通信，比如父到子，子到父。再说一个兄弟组件怎么通信，嵌套了好多层呢？<p>嵌套多层的他直接说有好几种方法，你随便说几种吧。我从来木有总结过，整个人有点懵逼，也没有回答好。后来整理了一下 <a href="https://github.com/sunyongjian/blog/issues/27" rel="nofollow noreferrer" target="_blank">React组件之间的通信 </a></p>
</li>
<li>
<p>再问一个稍微有难度的，组件的 state 嵌套多层的时候，我要让最里面那个 state 变化，怎么做。我开始没理解这是啥意思，他解释说 state 是 <code>{ a: { b: { c: { d: 1 } } }</code> 这样，你 setState 的时候，怎么改属性 d 的。我说一层一层的找进去，setState 新对象。他又说那几层是可以的，假如说一百层呢，也这样吗？我就懵逼了。</p>
<p>他说 react helper里面有个 immutable 的库，就是用来处理这种情况的。</p>
<p>immutable 我是知道的，但是我了解的是通常处理不可变数据的。后来查了一下，应该是这种操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { formJS } from 'immutable';
const obj1 = { a: { b: { c: { d: 1 } } } }
const obj2 = Immutable.fromJS(obj1).updateIn(['a', 'b', 'c', 'd'], value => value + 1)
console.log(obj2.toJS); //{ a: { b: { c: { d: 2 } } } }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { formJS } <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;
<span class="hljs-keyword">const</span> obj1 = { <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">c</span>: { <span class="hljs-attr">d</span>: <span class="hljs-number">1</span> } } } }
<span class="hljs-keyword">const</span> obj2 = Immutable.fromJS(obj1).updateIn([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], value =&gt; value + <span class="hljs-number">1</span>)
<span class="hljs-built_in">console</span>.log(obj2.toJS); <span class="hljs-comment">//{ a: { b: { c: { d: 2 } } } }</span>
</code></pre>
</li>
<li>你简历上说你看过 redux 的源码，简单说一下吧。<br>终于认可了我一次，说这个确实看过，能说出来。我有点尴尬了。</li>
<li>你说你读过 《深入浅出 nodejs》，那你在项目中用过 node 吗。</li>
<li>移动端做过吗，适配问题。750px 的设计稿，你怎么做适配，给几种方案。</li>
<li>rem的原理是什么。这个答的也不好</li>
<li>然后就是让我问了一些问题，还跟我说你工作才一两年，你要的这个薪资肯定给不到，腾讯卡工作年限很严格，评级方面。最后就是现在不会直接给你面试结果，他们会横向比较几个候选人。</li>
</ul>
<h3 id="articleHeader9">总结</h3>
<p>腾讯面试的感觉就是，没有那么正式，都是部门的技术直接联系的你，然后二面就是部门负责人了，决定了是否入职。二面给我的感觉就是，他从 React 入手问一些基础的问题（一些需要留心注意的）。如果没有注意这些点，没有总结，或者看过类似的总结文章，是很难有条理的回答出来的。其实我不太喜欢他这种，“我觉得很简单... 你就应该会的” 的方式。但是这次我发现了自己的一个问题，就是面试的时候爱说一些了解的名词，但是实际没用过，恰好这个面试官都比较深入了解，也比较反感，他认为你这是 “不懂装懂”。所以面大公司，不会的还是尽量要说不会，不要犯了面小公司的错误。自己也确实没有做到注意总结，了解也确实比较浅显，为自己以后的工作学习敲响警钟。</p>
<h2 id="articleHeader10">阿里 （天猫）</h2>
<h3 id="articleHeader11">一面</h3>
<blockquote>由于一面是电话面试，主要问了好多项目的问题，如何解决问题的。</blockquote>
<ul>
<li>比如问其中一个项目，查询多字段对应处理的问题，sql语句怎么拼的，你的自定义配置是怎么回事。</li>
<li>session 和 cookie 的区别</li>
<li>使用 redux 和 mobx 的区别</li>
<li>什么是 bfc</li>
<li>node了解多少，用过吗</li>
<li>算法怎么样</li>
<li>好多问题，有点忘了，就是各种知识点... 其实百分之八九十能答出来，他也觉得不错，让我后面好好准备，架构方面，原理方面。</li>
</ul>
<h3 id="articleHeader12">二面</h3>
<blockquote>面对面</blockquote>
<ul>
<li>介绍一下你的工作历程（经验）</li>
<li>我们找一个产品或者项目具体聊聊，让我自己说。</li>
<li>介绍一下项目，技术栈，我是不会问的。</li>
<li>你用过 vue, react。你觉得他们有什么区别。</li>
<li>说一下你是怎么用的 redux</li>
<li>我自己提到了通常放在 container，他问了一个 connect 怎么做到注入 state 的。我就说 connect 是一个高阶组件，注入进来的 store，通过 state 维护？他又问那是怎么实时 render 的？我说 connect 里面应该有 监听 store 的 changes 吧。最后就说没看过 react-redux 的源码，只看过 redux 的源码。</li>
<li>看了我的一篇博客，问了一个 this.children 是实例还是 class</li>
<li>react router 的 hash ，history api 有什么区别，我说了一些表层的区别，url 的不同，实现的原理不同。他继续问还有什么内部的不同吗，我就说不了解了。</li>
<li>mobile 端有接触吗，我说做的不多，主要还是 pc 端吧，我说你可以提问。问了一个viewport的，如果 width=device-width，iphone6 上页面宽是多少，plus 是多少。如果 viewport 里设为 width=375，plus上会缩小还是放大。</li>
</ul>
<h3 id="articleHeader13">总结</h3>
<p>让我自己去聊项目，去考察我的组织、表达能力，以及沟通能力。而且这也最大程度上能了解到，关于这个项目，你自己思考了多少，主导程度。然后考察主要使用的技术栈，了解的深度如何。然后就是他们业务常用的点。刚面完，自己感觉其实还可以，因为都能回答出来，但是可能深度还不够吧。天猫的要求还是比较高的，而且面试官是从杭州过来专门面试的，也有很多候选人同时面试，只能说明自己在这里面还不够出色，不能脱颖而出。</p>
<h2 id="articleHeader14">滴滴</h2>
<h3 id="articleHeader15">一面</h3>
<ul>
<li>简单介绍一下自己</li>
<li>上来就是一个数组的构造函数上提供了什么方法，然后我就一顿说，副作用的，增删改的，map的</li>
<li>indexOf和findIndex的区别，我说没用过 findIndex</li>
<li>
<p>写了一道题，是关于作用域的题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    }
  }
}
fun(0).fun(1).fun(2);
let fn = fun(0).fun(1).fun;
fn(2);
fn(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params">n, o</span>) </span>{
  <span class="hljs-built_in">console</span>.log(o);
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">fun</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>) </span>{
      <span class="hljs-keyword">return</span> fun(m, n);
    }
  }
}
fun(<span class="hljs-number">0</span>).fun(<span class="hljs-number">1</span>).fun(<span class="hljs-number">2</span>);
<span class="hljs-keyword">let</span> fn = fun(<span class="hljs-number">0</span>).fun(<span class="hljs-number">1</span>).fun;
fn(<span class="hljs-number">2</span>);
fn(<span class="hljs-number">3</span>);</code></pre>
<p>这种题好好看看一般能答出来。</p>
</li>
<li>react 中的某个组件嵌套很深，怎么传递 props，很不错，之前整理过。</li>
<li>redux 和 mobx 的区别。我就从实现的原理，使用方式，结合 react 等方面阐述了一下。</li>
<li>你刚提到了 observer，这觉得它们是怎么实现的。redux（listerners），mobx（get，set） 的方式都说了一下。</li>
<li>observer 是什么模式。</li>
<li>还了解其他的设计模式吗。我他妈一激动把面向对象说出来了，这当然不是设计模式了，是编程思维。</li>
<li>js 模拟一个并发</li>
<li>实现两个 setTimeOut之后再做什么。1.原生实现一个串行的队列。2. 用 promise 去封装一下，然后用 promise.all/generator/async.</li>
<li>算法，问我快速排序，说一下它的原理，我说忘了。</li>
<li>问 es6 主要用那些新语法，我说了几个，箭头函数，解构赋值，const 声明等等...  他说最常用的不应该是 class 吗...</li>
<li>es5 实现一个继承，我差点给他写四五个。刚学 js 的时候整理过 <a href="https://github.com/sunyongjian/blog/issues/7" rel="nofollow noreferrer" target="_blank">link</a>
</li>
<li>es6 怎么判断一个数组？ isArray 啊。 [].isArray ? 我说 Array.isArray()，类上的静态方法。</li>
<li>css 清除浮动用什么，我说就两种，一个是 css 树形 clear，一个触发 bfc。</li>
<li>css3 动画有什么，怎么用。就是考察 transition，translate，animation 啥的。</li>
<li>less 中的 &amp; 代表什么意思。这个倒没关注打包后的代码，想了一下应该是上级作用域的选择器...</li>
<li>自动化工具用什么，我说打包的话就用 webpack，其中又有各种配置，预处理，编译啥的。配置文件自己写过吗，我说写过。</li>
<li>搭建过 react 项目的架子吗，当然。</li>
<li>最后一个问题是，<br><code>function fun() {}</code> 的原型指向哪里 ？<br><code>Function.prototype</code>。</li>
</ul>
<h3 id="articleHeader16">二面</h3>
<ul>
<li>顺了一下我的履历，问这次为什么打算跳槽，再上家公司时间也不长，期待一个什么样的工作。我说希望有一个技术都比我牛逼的团队。</li>
<li>假如说团队里的大部分人技术都不如你，怎么办。我说那也挺好，我可以发挥我的长处，做一个技术 leader 的角色。又问那如果公司不给你一个 leader 的级别呢... 我就说那也挺好的，你可以成为一个重要的角色，不可或缺的人。</li>
<li>如果你作为一个 leader，你需要什么样的下属。 我说一个不可或缺的人，一两个技术比较好的。其他不需要那么技术好，只要能胜任工作就行了。</li>
<li>你觉得你是容易相处的人吗</li>
<li>看你是信息与计算科学的，算法应该不错，手写一下快速排序吧。?我说忘了，我可以写一个冒泡或者插入，然后就写了一个冒泡。</li>
<li>怎么判断一个对象是 object，还是 array。用 <code>Object.prototype.toString.call() </code> 吧。</li>
<li>写一个节流的函数，我之前刚好看了，写了这么一个东西。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
  const throttle = wait => fn => {
  var timer;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => timer = null, wait);
      return fn(...args);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> 
  <span class="hljs-keyword">const</span> throttle = <span class="hljs-function"><span class="hljs-params">wait</span> =&gt;</span> fn =&gt; {
  <span class="hljs-keyword">var</span> timer;
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!timer) {
      timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> timer = <span class="hljs-literal">null</span>, wait);
      <span class="hljs-keyword">return</span> fn(...args);
    }
  }
}</code></pre>
<p>他说，怎么没有清定时器。我说节流函数分两种的吧，举个例子，我这个是按钮点击后，500ms 后的点击才会执行。还有一种是两个点击间隔 500ms 之内，只执行一次，防止连续快速点击。后面的没写，大概是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const throttle = wait => fn => {
  var timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, wait)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> throttle = <span class="hljs-function"><span class="hljs-params">wait</span> =&gt;</span> fn =&gt; {
  <span class="hljs-keyword">var</span> timer;
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
    clearTimeout(timer);
    timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      fn(...args);
    }, wait)
  }
}</code></pre>
<ul>
<li>什么是科里化，怎么实现一个 curry。curry 利用了什么特性，他说是其实就是闭包</li>
<li>设计模式了解吗？说一下观察者，我说我简单写一个实现吧。就写了一下。</li>
<li>react 的生命周期介绍一下</li>
<li>现在的薪资</li>
<li>你有什么问题<p>我问了一个很扯的问题，我能给团队来带什么？面试官说，不能说带来什么吧。一些本来就存在的问题，很难说加入一个人就带来质的改变什么的。最主要的还是能够独当一面吧，能够负责一个模块。</p>
</li>
</ul>
<h3 id="articleHeader17">三面</h3>
<ul>
<li>前两面的感觉如何。</li>
<li>有没有什么遗憾的地方？就是前两面没大好的地方。</li>
<li>15年毕业，你的第一家公司是 xxx，在那主要收获了什么？</li>
<li>我提到了不断自驱，学习。</li>
<li>最近解决的一个棘手的问题，前端拼 sql</li>
<li>react 的生命周期</li>
<li>现在的薪资，期望薪资</li>
<li>你有什么问题，问了一下面试官的职位，聊团队，以及我加入的项目要做的东西。</li>
<li>最后，玩游戏吗，不玩。打篮球吗，不打。在健身</li>
</ul>
<h3 id="articleHeader18">总结</h3>
<p>来滴滴面试的时候，很自信，所以自我感觉良好。一面是特别注重基础，各个知识点的问答，想起什么来问什么。看你对基础的掌握情况吧。二面我感觉更多的在看你的情商如何了，当然我的情商不是很高，面试官最后也说了，如果我更 open 一些，会更好。说我的简历上也能看出自己尝试了很多东西，可以去突破一下。当然也问了一些技术的问题。三面是团队的前端负责人，从价值观，个人的成长规划，解决问题的能力去考察，也了解了一下期望薪资。最后的问题就是看有没有共同的爱好吧...</p>
<p>相对 tmall，tx 来说，didi 考察基础，但是又没那么深入，主要是对应聘者的级别要求不一样吧。tmall 的社招不仅是看你干活能力，更多的是你会不会去 push 一些东西，其实就是找亮点，你一定要有积极性，比如说推动某个技术在项目的应用，落地。做出一些好的工具，做一些深入的研究，对业务带来了积极影响。</p>
<h2 id="articleHeader19">腾讯 （兴趣阅读）</h2>
<h3 id="articleHeader20">只有一面</h3>
<ul>
<li>各种项目各种问，问的特别细，每一个地方的实现，问你的思考 ?，以及怎么做规划排期，怎么去处理 bug 等等。<p>这块就平常自己项目中，做的足够细致就行了，有时候你提到一个点，他都会对这个点进行深挖，看你对项目的细节是否足够了解，另外还有项目整体上的了解。</p>
</li>
<li>mobx redux 的区别，从简历上挖掘出的点，去看你是否总结。<p>mobx 我做过简单的<a href="https://github.com/sunyongjian/blog/issues/28" rel="nofollow noreferrer" target="_blank">总结</a>。</p>
</li>
<li>自己做过的前端优化。经典的面试题，回答的点还是很多的，从 web 来说，从[浏览器] 发起一个 [请求]，服务器[返回]，[页面渲染]，[css渲染]，都有的说，我也有简单的<a href="https://github.com/sunyongjian/blog/issues/34" rel="nofollow noreferrer" target="_blank">总结</a>
</li>
<li>react 和 vue 有什么区别啊，特别注重考察个人的总结；</li>
<li>对前端安全的认识</li>
<li>劫持遇到过吗，主要有什么。我说了一个 dns 劫持。</li>
<li>webpack都是怎么用的</li>
<li>webpack.dll ？ context这个参数是干嘛的，我忘了...</li>
<li>react的性能优化有没有了解过啊，你都是怎么做优化的。<br> 说实话，react 的优化我很少做 - -，通常 react 的 diff-dom 带来的便利很少关注它的性能问题。不过面试我当然不会说这个，就说了几个点，shouldUpdate，pureComponent，immutable 等等的。不过他似乎不是很满意，继续问我有没有更深入的，全面的优化。我就说局限于此了。</li>
<li>问我 angular 用的怎么样，我说项目中没用过。</li>
<li>最后聊了一些他们日常的工作，主要是后台管理，运营去推送阅读等。项目目前是 angular 做的，后期会像 React 转。</li>
</ul>
<h3 id="articleHeader21">总结</h3>
<p>自己觉得能回答上来个 70% 左右，他最终告诉我，今天的表现能打个七八分吧（满分十分）。然后他就去跟他的 leader 沟通了，回来也没直接拒绝我，就给了我一些建议，要对项目整体的把控多一些，项目的思考，横向多去了解，跟你配合的同学（rd ?）做了哪些工作，还说不过也不着急，毕竟你还年轻。黑人问号脸。</p>
<p>自己的确没有去带整个项目的经历，更多的是个人负责一个模块，虽然对其他人的工作也有了解，技术上的架构也略知一二，不过还是平常的思维有局限性吧，对整体的思考太少，不过我觉得这虽然是今后发展的方向，但是目前还是专精某些点，纵向多做一些深入工作吧。</p>
<h2 id="articleHeader22">美团 （商超）</h2>
<h3 id="articleHeader23">一面</h3>
<ul>
<li>从html，css开始</li>
<li>了解盒模型吗，现在给定一个 width：200px的盒子，他的width，padding，border，margin都是怎样的</li>
<li>html的标签分哪几种，列举一些</li>
<li>img是哪种？ 我回答行内。</li>
<li>然后他就问一个img和一个span，里面一段文字，怎么排列。我说上下，img不是行内吗，怎么会上下。。</li>
<li>如果实现文字环绕排列 img，应该怎么做。图片 float</li>
<li>
<p>这个图片不定宽高，怎么实现在盒子内垂直水平居中。</p>
<ol><li>flex 2. transform: translate(-50%, -50%)  3. display:table-cell</li></ol>
</li>
<li>说一下float这个属性</li>
<li>你提到了bfc，有两个盒子，margin重叠的问题，怎么解决</li>
<li>有一个input，怎么统计他的输入 0/50，除了事件还能怎么统计</li>
<li>css3了解吗，主要用什么，animation，transition，translate，transform 这四个是干嘛的</li>
<li>实现一个进度条加载，从0 到100</li>
<li>'use strict' 是怎么解析的</li>
<li>setTimeout，setInterval。它的参数，如果在setInterval里5ms不断调用，会有什么问题吗</li>
<li>setImmediate 和Process.nextTick 的区别</li>
<li>写一个检测数据类型的方法。直接写了个 Object 的 toString</li>
<li>js 里面的数据类型，把布尔忘了- -</li>
<li>什么是柯理化啊</li>
<li>jquery 用过吗，</li>
<li>https 了解吗</li>
<li>https 一定安全吗，然后怎么解决呢。实现一个站点从 http 到 https 的迁移</li>
<li>localstorage 的跨域问题，最大存储是多少，超出了会怎么办</li>
<li>跟 cookie 的区别</li>
<li>sessionStorage 的区别</li>
<li>http的状态码，200，500，301，302，304</li>
<li>一个url从浏览器输入到解析经历了什么</li>
<li>你提到了三次握手，四次挥手是干嘛的</li>
<li>忘了...</li>
</ul>
<h3 id="articleHeader24">二面</h3>
<ul>
<li>各种优化</li>
<li>之前做的项目大概介绍一下，技术栈等等</li>
<li>各种项目里的问题</li>
<li>有没有什么优化的经验，方案。不局限于打包。</li>
<li>webpack 打包的优化</li>
<li>最近项目解决的一个技术难点</li>
<li>最近在学什么，对什么感兴趣</li>
<li>最近做的最成功的一次分享是什么</li>
<li>是不是热衷于团建。</li>
<li>现在已有 getData(id, callback) 方法，根据 id 发一个请求，并把 data 传给 callback。你写一个getDataCache的方法，实现相同的id，只发一次请求，即数据可以被缓存起来。</li>
<li>说一下http缓存，其实就那几种。</li>
<li>你们用的哪种，我说 304 多一些，为什么不用 200，效率方面 200 更高一些啊。我说的确，我们也是通过 hash 给文件打版本号，结合 maxage，让浏览器判断要不要重新请求的。</li>
<li>怎么学习前端知识啊</li>
<li>最近在看什么书</li>
<li>除了写blog，还有什么其他的，工作之外做的</li>
<li>还有几个忘了</li>
</ul>
<h3 id="articleHeader25">三面</h3>
<blockquote>三面是一个技术总监，感觉人挺不错的。</blockquote>
<ul>
<li>看你之前都是一年一跳槽，是什么考虑呢</li>
<li>为什么要从事前端呢</li>
<li>看你学的是数学，为什么最后学前端。为什么上大学的时候没好好学</li>
<li>对美团怎么看</li>
<li>问你一个算法题</li>
</ul>
<p>规律是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A B C D ... Z AA AB AC ... AZ BA BB ... CA ... ZA ... ZZ AAA AAB ...
对应：
1 2 3 4 ... 26 27  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>A B C D ... Z AA AB AC ... AZ BA BB ... CA ... ZA ... ZZ AAA AAB ...
对应：
<span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> ... <span class="hljs-number">26</span> <span class="hljs-number">27</span>  </code></pre>
<p>做一个程序，让输入一个数字，输出具体的值。比如输入 27，输出 AA。这个问题我也描述不太清，其实就是一个类似进制转化的问题。</p>
<ul>
<li>'192.168.0.1'把它转化成位数。进制的偏移问题</li>
<li>你觉得自己有什么缺点</li>
<li>你觉得你之前做的一件最酷的事情是什么</li>
<li>你有什么想问的。大概了解了一下美团超市是干嘛的，介绍的时候还问，想不想做我们的这个商超，感兴趣吗。当然说感兴趣</li>
</ul>
<h3 id="articleHeader26">总结</h3>
<p>第一面特别细，之前很少问到的 html，css，还有 jQuery，都问了。这些地方还是多少能记着一些的，能回答个差不多。并没有问你项目中使用的框架，可能关注的点不同，他们更关注基础吧。二面其实就关注性能优化比较多了，还问了很多学习，分享方面的，估计是想看你是不是热爱学习啊，学习方法，喜欢分享的话能给团队带来新鲜度，大部分团队都是有每周的分享的。他问的问题我都是比较喜欢的，开放性的话题更多一些，你能更好的展现自己。三面问了一些基础的计算机问题，这些是我不擅长的，不过大概说了一下思路，并用 js 去实现。还有很多就是面试常问的问题啦，面试前一定要考虑，做准备。比如说做过最酷的一件事，无论是什么事，只要你自己觉得酷就行了，个性面试官。总结下来就是，对这个部门的面试感觉，觉得不错，进去做的工作是移动端，这也是我之前很少做的，也不用什么 react。这个部门是一个新成立的，团队也是从 0 开始，这种团队也有好处也有坏处，好处是大家都是新人，项目也是全新的，适合你发挥。不好处就是太新了，加班是肯定的，压力也会大一些，你长时间都会处于业务中。</p>
<h2 id="articleHeader27">最后</h2>
<p>硬广。我们团队在招高级前端开发，大部门是平台技术部下的平台前端，我们负责的方向是专快司乘运营等大型管理系统，会用 React 是硬性条件，期待有 node 开发经验，基础好，爱学习是基本，要有积极主动的推动能力。另外，不喜欢做 pc，不用 react 的，或者有其他喜欢的部门，也可以推荐。先发邮件带简历联系我吧。</p>
<p>邮箱：sunyongjian0108@gmail.com</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试总结（at, md）

## 原文链接
[https://segmentfault.com/a/1190000012468918](https://segmentfault.com/a/1190000012468918)


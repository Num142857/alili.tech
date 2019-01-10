---
title: '如何优雅的理解ECMAScript中的对象' 
date: 2019-01-11 2:30:08
hidden: true
slug: 971lrwy2x15
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">序</h2>
<blockquote><p>ECMAScript is an object-oriented programming language for performing computations and manipulating computational objects within a host environment. <br>— 摘自<a href="https://tc39.github.io/ecma262/#sec-overview" rel="nofollow noreferrer" target="_blank">《ECMAScript® 2018 Language Specification》</a>.</p></blockquote>
<p>最近在看 ES 规范，越看越觉得这是一门神奇的语言。如标准所言，ES 是一门面向对象的编程语言，但它基于 prototype 的 OO 又很非主流。更神奇的是很多 JSer 拿着这门 OOP 来搞函数式和过程式编程，并且还浪的飞起。本文会围绕 ES 中的对象来展开，一起探索技术，走近科学（瞎扯淡，这并不是一篇正儿八经的技术文章）。</p>
<h2 id="articleHeader1">创世篇</h2>
<h3 id="articleHeader2">null</h3>
<p>null是万物之伊始，也是生命的尽头。null 是一种空灵的状态，似是非是，似空非空，正如 null == undefined 但是 null !== undefined，看起来什么都没有，其实是支潜力股。</p>
<p>在 JS 宇宙中，null 是站在原型链顶端的男人，是所有对象原型的尽头，拥有毁灭一切的能力，看谁不爽赋值为 null，这样黑白无常在垃圾回收的时候便可以一波带走。</p>
<p>后来 JS 的造物主 Brendan 觉得 null 的能力过于强大，于是便创造了超级英雄<br> undefined 与之抗衡。undefined 诞生的初衷，是为了维护 JS 宇宙秩序，解决错误处理和类型转换带来的问题。但是自 undefined 出现之后世界却变得更加混乱，人类不知道何时召唤 null 何时该召唤 undefined。</p>
<p>简单的说，undefined 表示此处应该有个值，但是这个值还没给出来，其实就是占了个坑，这个坑是语言内部实现帮你做的，<strong>程序员完全没有必要在代码中显示返回或者指定某个变量为 undefined</strong>，undefined 的处理完全交给程序实现就是了。所以这其实是个无需暴露给用户的能力，传说 Google 爸爸在创建 Dart 宇宙的时候就去掉了 undefined，只保留了 null。</p>
<h3 id="articleHeader3">Object</h3>
<p>古人信奉五行阴阳之说，认为世界由金木水火土五种基本元素构成，基本元素构成各种物质，物质构成世界。在 JS 宇宙中也一样，基本语言类型构成了各种对象，对象构成了整个 JS 世界，要理解这个世界，就得从找对象开始。</p>
<p>在 ES5 时代，对象分三种：</p>
<ul>
<li><p>native object（原生对象），指语义完全由规范定义并且不掺杂任何宿主环境定义的的对象；</p></li>
<li><p>host object（宿主对象），由执行环境提供，比如浏览器的window对象和history对象。JS里的对象不是原生对象就是宿主对象。</p></li>
<li><p>build-in object（内置对象），由ECMA实现提供，程序执行时就存在的对象。所有内置对象都是原生对象。</p></li>
</ul>
<p>这三类对象相辅相成，亦相克相生。所谓的道生一，一生二，二生三，三生万物，在 JS 的世界观中，大概就是指的 null 生 Object，Object 生 native &amp; host，native 又分化出buid-in，是为三才，森罗万象。</p>
<p>然而编码不止，变化不息，在 ES6 时代，规范中有关对象的划分又变成了四种：</p>
<ul>
<li><p>ordinary object：普通对象，需要具备了对象的所有基本内置方法。</p></li>
<li><p>exotic object：外来对象，如果不完全具备标准对象拥有的基本内置方法，就是外来对象。JS里的对象不是普通对象就是外来对象。</p></li>
<li><p>standard object：标准对象，语义由本规范定义的对象。</p></li>
<li><p>built-in object：内置对象，跟ES5中描述一样。</p></li>
</ul>
<p>对比来看，ES5 中对象是以宿主环境为条件划分的，ES6 中则是根据对象的基本内置方法。这其实要归结于 ES6 跨越性的变化，必然要动摇到一些基本规范描述来拥抱变化。所谓的无极生太极，太极生两仪，两仪生四象，在 JS 宇宙中大概，也许，null 就是无极，Object 就是太极，一内一外是两仪，四象嘛，当然就是上面那四种对象了啦......</p>
<p><code>当然我是在扯淡。</code></p>
<h3 id="articleHeader4">Class</h3>
<p>在我开始用 JS 搬砖之前，是不那么认真的先用了 Java 和 C++。所以一般看来，在有对象之前必先有类，对象只是类的一个实例而已。就好比找女朋友之前先得构造一个理想女票该有的属性和行为的类，然后再从该类实例化一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class GirlFriend {
  public static final Integer age = 18;
  public static final String sex = &quot;女&quot;;
  public void eat() {}
  public void shop() {}
  public void sleep() {}

  public static void main(String[] args) {
    GirlFriend honey = new GirlFriend();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GirlFriend</span> </span>{
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> Integer age = <span class="hljs-number">18</span>;
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> String sex = <span class="hljs-string">"女"</span>;
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">eat</span><span class="hljs-params">()</span> </span>{}
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">shop</span><span class="hljs-params">()</span> </span>{}
  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">sleep</span><span class="hljs-params">()</span> </span>{}

  <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">(String[] args)</span> </span>{
    GirlFriend honey = <span class="hljs-keyword">new</span> GirlFriend();
  }
}</code></pre>
<p>这很符合人类的常识，人们喜欢分类，这样便于组织管理，可以将复杂的问题简单化，清晰化。但是，这并不是世界原本的样子，也不能表现出内心最真实的渴求，只是我们自己一厢情愿的束缚。或许只有当你放下类，放下包袱，放弃规则，放纵去爱，放肆自己，放空未来......才能享受这盛夏光年激荡地青春，才会发现，会发现自己喜欢的并不是萝莉，而是御姐......</p>
<p>这便是 JS 的无类哲学：世界本无类，对象亦无根，本是弱类型，何处惹尘埃？</p>
<p>然尘世熙攘，你我结庐于人境，谁能不闻车马喧？能够做到超脱的毕竟是少数，这不，ES6 中还是引入了类的概念。</p>
<p>不过在我看来，ES6 的 class 并未动摇 JS 无类对象的哲学根基，更像是普渡众生的炫迈语法糖。毕竟，<code>typeof class GirlFriend {}</code> 返回的并不是一个类，而是一个 <code>function</code>。这意味着JS虽然有 class，本质上依然是构造函数，并不能像 Java 那样表演多继承、嵌套类等“高难度”动作。</p>
<p>这样也好，让 JSer 们继续做一个不拘一格的自由主义者。</p>
<h2 id="articleHeader5">混沌篇</h2>
<h3 id="articleHeader6">function VS object</h3>
<p>有很长一段时间，我无法清晰的理解 function 和 object 之间的暧昧关系，就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function instanceof Object // 返回 true
Object instanceof Function // 依然返回 true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Function</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span> <span class="hljs-comment">// 返回 true</span>
<span class="hljs-built_in">Object</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span> <span class="hljs-comment">// 依然返回 true</span></code></pre>
<p>那么问题来了，到底是先有 Object，还是先有 Function ？</p>
<p>按照创世篇的理念来讲，必然是先有 Object 的概念，然后才孕育出 Function，所以 Object 是蛋，Function 是鸡(有关先有蛋还是先有鸡的哲学问题，我是更倾向于先有蛋的。这个蛋是天地未开，阴阳一体，混沌之道。所谓道生蛋，蛋生鸡，鸡中有蛋，蛋中有鸡，鸡又生蛋，蛋又生鸡，蛋蛋鸡鸡，无穷尽也，说的就是这个道理)。</p>
<p>当然我是有理论依据的，按照 ES2018 中关于 <a href="https://tc39.github.io/ecma262/#sec-ecmascript-overview" rel="nofollow noreferrer" target="_blank">Object</a> 的描述：</p>
<blockquote><p>In ECMAScript, <strong>an object is a collection of zero or more properties each with attributes that determine how each property can be used</strong>—for example, when the Writable attribute for a property is set to false, any attempt by executed ECMAScript code to assign a different value to the property fails. Properties are containers that hold other objects, primitive values, or functions. A primitive value is a member of one of the following built-in types: Undefined, Null, Boolean, Number, String, and Symbol; <strong>an object is a member of the built-in type Object</strong>; and <strong>a function is a callable object</strong>. A function that is associated with an object via a property is called a method.</p></blockquote>
<p>这里明确指出了函数是可调用的对象。对象本身的定义就是属性的集合，函数就是拥有特定属性的集合。所以从表面上看，确实是先有对象的概念才衍生出函数的概念。然细思极恐，如果你仔细研读标准，就会发现在对象诞生之时，函数其实已经出现了！所以标准中才叫<a href="https://tc39.github.io/ecma262/#sec-ecmascript-function-objects" rel="nofollow noreferrer" target="_blank">function object</a>：</p>
<blockquote><p>An ECMAScript function object is an ordinary object and has the same internal slots and the same internal methods as other ordinary objects.</p></blockquote>
<p>这是一种既满足先有蛋后有鸡又满足同时有蛋和鸡的量子叠加态。所以这个时候讨论谁先谁后已经没有意义了，本自同根生，相煎何太急？</p>
<p>况且他们真的是同根生，这是有科学依据的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getPrototypeOf(Function) === Object.getPrototypeOf(Object)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Function</span>) === <span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-built_in">Object</span>)</code></pre>
<blockquote><p>规范中使用<code>[[prototype]]</code>表示原型，并提供了<code>getPrototypeOf</code>方法来获取它，浏览器有一个非标准的实现，可通过<code>__proto__</code>内部属性来访问，本文图方便就使用<code>__proto__</code>来访问。</p></blockquote>
<p>回到最初的问题，正是因为 Object 和 Function 的<code>[[prototype]]</code>相同，所以 instanceof 才会返回 true。不过这里的 Object 并不是我们所说的 Object 数据类型，而是对象构造函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof Function // 返回 &quot;function&quot;
typeof Object   // 依然返回 &quot;function&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Function</span> <span class="hljs-comment">// 返回 "function"</span>
<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Object</span>   <span class="hljs-comment">// 依然返回 "function"</span></code></pre>
<p>构造函数都有一个prototype属性，所有通过构造函数实例化的对象的<code>[[prototype]]</code>都会指向该构造函数的 <a href="https://tc39.github.io/ecma262/#sec-terms-and-definitions-prototype" rel="nofollow noreferrer" target="_blank">prototype</a> 属性的引用,即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="实例对象.__proto__ === 构造函数.prototype              // ①" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">实例对象.__proto__ === 构造函数.prototype              <span class="hljs-comment">// ①</span></code></pre>
<p>所有函数都是基于 Function 构造出来的，由式①可知：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Function 和 Object 作为构造函数，自然不例外
Function.__proto__ === Function.prototype           // ②      
Object.__proto__ === Function.prototype             // ③
在座的各位函数.__proto__ === Function.prototype    // ④" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Function 和 Object 作为构造函数，自然不例外</span>
<span class="hljs-built_in">Function</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype           <span class="hljs-comment">// ②      </span>
<span class="hljs-built_in">Object</span>.__proto__ === <span class="hljs-built_in">Function</span>.prototype             <span class="hljs-comment">// ③</span>
在座的各位函数.__proto__ === <span class="hljs-built_in">Function</span>.prototype    <span class="hljs-comment">// ④</span></code></pre>
<p>前面也有说到，所有对象的原型都会指向一个最基本的太极对象，太极原型终于无极。Function 构造函数作为一个特殊的对象，自然也有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.__proto__ === null
Object.__proto__.__proto__ === Object.prototype
Function.__proto__.__proto__ === Object.prototype   // ⑤
Function.prototype.__proto__ === Object.prototype   // 可由②⑤推出
在座的各位函数.__proto__.__proto__ === Object.prototype // 可由④⑤推出" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.prototype.__proto__ === <span class="hljs-literal">null</span>
<span class="hljs-built_in">Object</span>.__proto__.__proto__ === <span class="hljs-built_in">Object</span>.prototype
<span class="hljs-built_in">Function</span>.__proto__.__proto__ === <span class="hljs-built_in">Object</span>.prototype   <span class="hljs-comment">// ⑤</span>
<span class="hljs-built_in">Function</span>.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype   <span class="hljs-comment">// 可由②⑤推出</span>
在座的各位函数.__proto__.__proto__ === <span class="hljs-built_in">Object</span>.prototype <span class="hljs-comment">// 可由④⑤推出</span></code></pre>
<p>明白了上述道理，也就明白了 JS 原型的真谛，可谓玄之又玄，众妙之门。</p>
<p><span class="img-wrap"><img data-src="/img/bVPGpb?w=520&amp;h=586" src="https://static.alili.tech/img/bVPGpb?w=520&amp;h=586" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">prototype chain</h3>
<p>ES 原型链的设计，其实是非常符合自然法则的。</p>
<p>我们每个人看似独立的个体，其实都可以追溯到共同的祖先。就好比 JS 中的对象看似独立，其实都有着同一个原型。原型链就跟血液一样，可以遗传父辈属性实现继承，但是比起血缘关系，又更像是血继限界，除了遗传之外还能进化出新的能力。这一点，比起基于类的继承更加灵活，也更符合进化论的思想。</p>
<p>但是有一点，ES 是单原型单继承的，这不符合自然规律。现实中孩子一般继承了父母双方的基因。试想一下，如果对象的原型是一个数组，可继承每一个原型对象的属性，那么 JS 世界会发生哪些变化？</p>
<p>最直接的就是可以支持多继承了，但本质上不会有变化，最终都会上溯到 Object.prototype。不过查户口会变得异常困难。如果要判断一个对象是否具有某个属性，要遍历的就不是原型链了，而是原型网，这是一个十分耗时的操作，所以单继承虽然丧失了生物的多样性，却保持了血统的纯正性，让这门语言可以一直保持简单，优雅。</p>
<p>嗯，我成功的说服了自己，单原型单继承并不是 JS 的缺陷，而是体现 JS 简单耐用的神来之笔，在前端开发场景下，更能突显出它的优势。因为，老实说，前端的业务场景本就没有后端复杂，没必要引入一套复杂的体系。</p>
<p>然而原型链设计的最让我诧异的是，实例对象竟然可直接访问并修改原型，从而影响所有其他实例对象，不愧是一把原型链，连接彼此心，牵动你和我：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GirlFriend() {} // 或者 class GirlFriend {}

// 假设张无忌同时谈了两个女朋友
let zhaoMin = new GirlFriend()
let zhouZhiRuo = new GirlFriend()

// 某天周芷若黑化跟张无忌分手了
zhouZhiRuo.breakUp = true

// 周芷若一气之下将其原型也修改了
zhouZhiRuo.__proto__.breakUp = true

// 然后赵敏也躺枪了，张无忌成单身狗了
console.log(zhaoMin.breakUp) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GirlFriend</span>(<span class="hljs-params"></span>) </span>{} <span class="hljs-comment">// 或者 class GirlFriend {}</span>

<span class="hljs-comment">// 假设张无忌同时谈了两个女朋友</span>
<span class="hljs-keyword">let</span> zhaoMin = <span class="hljs-keyword">new</span> GirlFriend()
<span class="hljs-keyword">let</span> zhouZhiRuo = <span class="hljs-keyword">new</span> GirlFriend()

<span class="hljs-comment">// 某天周芷若黑化跟张无忌分手了</span>
zhouZhiRuo.breakUp = <span class="hljs-literal">true</span>

<span class="hljs-comment">// 周芷若一气之下将其原型也修改了</span>
zhouZhiRuo.__proto__.breakUp = <span class="hljs-literal">true</span>

<span class="hljs-comment">// 然后赵敏也躺枪了，张无忌成单身狗了</span>
<span class="hljs-built_in">console</span>.log(zhaoMin.breakUp) <span class="hljs-comment">// true</span></code></pre>
<p>这是不是一件非常可怕的事情！这肯定是一件非常可怕的事情！赵敏是无辜的啊！韦小宝该怎么办？</p>
<p>后来，我在规范中看到这样一段<a href="https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots" rel="nofollow noreferrer" target="_blank">描述</a>：</p>
<blockquote><p><strong>Every ordinary object has a Boolean-valued [[Extensible]] internal slot that controls whether or not properties may be added to the object</strong>. If the value of the [[Extensible]] internal slot is false then additional properties may not be added to the object. In addition, <strong>if [[Extensible]] is false the value of the [[Prototype]] internal slot of the object may not be modified</strong>. Once the value of an object's [[Extensible]] internal slot has been set to false it may not be subsequently changed to true.</p></blockquote>
<p>看样子，只要将原型对象的内部属性[[Extensible]]设置为 false 即可防止被子对象篡改。然而由于是内部属性，并不属于 ES 语言的一部分，浏览器也没有像暴露原型一样将其暴露出来，所以此路不通。另外，即使用 ES6 新增的 class，也无法避免被子对象修改的命运，估计在后面的<br> ES 版本中会加上 class 限定符吧。</p>
<p>难道就没有别的办法了吗？解铃还须系铃人，既然问题出在原型上，那么还是得从原型下手。赵敏心想，如果我也直接修改原型上breakUp属性为 false，那么周芷若也会回到无忌哥身边，干脆一不做二不休：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Wife() {}
zhaoMin.__proto__ = Wife.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Wife</span>(<span class="hljs-params"></span>) </span>{}
zhaoMin.__proto__ = Wife.prototype</code></pre>
<p>从此，张无忌和赵敏过上了幸福快乐的生活。这个故事有些夸张，但你我身边，或许就有周芷若和赵敏这样的人才。</p>
<p>可以说，ES 的原型链设计的相当自由，它只是提供了一个 playground，至于怎么去写，怎么去玩，规则都可以由你自己定义。ES 设计之初的理念就是越简单越好，所谓大道至简，悟在天成，JS 的灵活，得益于它的简单，JS 的复杂，亦归咎于它的简单。</p>
<h2 id="articleHeader8">飞升篇</h2>
<p>慢慢地，我开始觉着 ES 的设计理念由内到外散发着一股自由的气息，在 JS 的世界中，你可以很面向对象，也可以很面向过程，还可以很函数式；时而腾云驾雾游九州，时而不慎跌落终结谷；有精华亦有糟粕，正如有光明必有阴影。JS 开发路上，可能会经历人生的大彻大悟，大起大落，但这不正是我们生活的真实写照吗？我们要时刻保持一种包容和谦卑的态度，去书写更加优雅和睿智的人生，打造属于前端开发者的未来。</p>
<p>好了我编不下去了了，先这样吧。本文是<a href="https://zhuanlan.zhihu.com/p/27537439" rel="nofollow noreferrer" target="_blank">《ECMAScript 2018 标准导读》</a>中的第一篇番外，感兴趣的话可以关注下，带着哲思搞技术，你会发现编程竟如此有趣。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何优雅的理解ECMAScript中的对象

## 原文链接
[https://segmentfault.com/a/1190000009909670](https://segmentfault.com/a/1190000009909670)


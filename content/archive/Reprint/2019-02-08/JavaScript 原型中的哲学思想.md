---
title: 'JavaScript 原型中的哲学思想' 
date: 2019-02-08 2:30:40
hidden: true
slug: 58d4ata2e8c
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>欢迎来我的博客阅读：<a href="http://huang-jerryc.com/2016/06/28/JavaScript%E5%8E%9F%E5%9E%8B%E4%B8%AD%E7%9A%84%E5%93%B2%E5%AD%A6%E6%80%9D%E6%83%B3/" rel="nofollow noreferrer" target="_blank">「JavaScript 原型中的哲学思想」</a></p></blockquote>
<p>记得当年初试前端的时候，学习JavaScript过程中，原型问题一直让我疑惑许久，那时候捧着那本著名的红皮书，看到有关原型的讲解时，总是心存疑虑。</p>
<p>当在JavaScript世界中走过不少旅程之后，再次萌发起研究这部分知识的欲望，翻阅了不少书籍和资料，才搞懂<code>__proto__</code>和<code>prototype</code>的概念。</p>
<p>故以作此笔记，日后忘了可以回来看看。如果你看的过程中觉得理解有些困难，把例子在代码中跑一跑，亲手试一试也许能解决不少疑惑。</p>
<h3 id="articleHeader0">一切皆为对象</h3>
<blockquote><p>殊不知，JavaScript的世界中的对象，追根溯源来自于一个 null</p></blockquote>
<p>「一切皆为对象」，这句着实是一手好营销，易记，易上口，印象深刻。</p>
<p>万物初生时，一个<code>null</code>对象，凭空而生，接着<code>Object</code>、<code>Function</code>学着<code>null</code>的模样塑造了自己，并且它们彼此之间喜结连理，提供了<code>prototype</code>和<code>constructor</code>，一个给子孙提供了基因，一个则制造万千子子孙孙。</p>
<p>在JavaScript中，<code>null</code>也是作为一个对象存在，基于它继承的子子孙孙，当属对象。乍一看，<code>null</code>像是上帝,而<code>Object</code>和<code>Function</code>犹如JavaScript世界中的<strong>亚当</strong>与<strong>夏娃</strong>。</p>
<h3 id="articleHeader1">原型指针 <code>__proto__</code>
</h3>
<p>在JavaScript中，每个对象都拥有一个原型对象，而指向该原型对象的内部指针则是<code>__proto__</code>,通过它可以从中继承原型对象的属性，原型是JavaScript中的基因链接，有了这个，才能知道这个对象的祖祖辈辈。从对象中的<code>__proto__</code>可以访问到他所继承的原型对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Array();
a.__proto__ === Array.prototype // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
a.__proto__ === <span class="hljs-built_in">Array</span>.prototype <span class="hljs-comment">// true</span></code></pre>
<p>上面代码中，创建了一个Array的实例<code>a</code>，该实例的原型指向了<code>Array.prototype</code>。<br><code>Array.prototype</code>本身也是一个对象，也有继承的原型:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.__proto__.__proto__ === Object.prototype  // true
// 等同于 Array.prototype.__proto__ === Object.prototype" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.__proto__.__proto__ === <span class="hljs-built_in">Object</span>.prototype  <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 等同于 Array.prototype.__proto__ === Object.prototype</span></code></pre>
<p>这就说了明了，Array本身也是继承自Object的，那么Object的原型指向的是谁呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.__proto__.__proto__.__proto__ === null  // true
// 等同于 Object.prototype.__proto__ === null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">a.__proto__.__proto__.__proto__ === <span class="hljs-literal">null</span>  <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 等同于 Object.prototype.__proto__ === null</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyBmm?w=601&amp;h=461" src="https://static.alili.tech/img/bVyBmm?w=601&amp;h=461" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>所以说，JavaScript中的对象，追根溯源都是来自一个<strong>null</strong>对象。佛曰：<strong>万物皆空</strong>，善哉善哉。</p>
<p>除了使用<code>.__proto__</code>方式访问对象的原型，还可以通过<code>Object.getPrototypeOf</code>方法来获取对象的原型，以及通过<code>Object.setPrototypeOf</code>方法来重写对象的原型。</p>
<p>值得注意的是，按照语言标准，<code>__proto__</code>属性只有浏览器才需要部署，其他环境可以没有这个属性，而且前后的两根下划线，表示它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用 <code>Object.getPrototypeof</code>和<code>Object.setPrototypeOf</code>，进行原型对象的读写操作。这里用<code>__proto__</code>属性来描述对象中的原型，是因为这样来得更加形象，且容易理解。</p>
<h3 id="articleHeader2">原型对象 <code>prototype</code>
</h3>
<p>函数作为JavaScript中的一等公民，它既是函数又是对象，函数的原型指向的是<code>Function.prototype</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Foo = function() {}
Foo.__proto__ === Function.prototype // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
Foo.__proto__ === <span class="hljs-built_in">Function</span>.prototype <span class="hljs-comment">// true</span></code></pre>
<p>函数实例除了拥有<code>__proto__</code>属性之外，还拥有<code>prototype</code>属性。通过该函数构造的新的实例对象，其原型指针<code>__proto__</code>会指向该函数的<code>prototype</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Foo();
a.__proto__ === Foo.prototype; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> Foo();
a.__proto__ === Foo.prototype; <span class="hljs-comment">// true</span></code></pre>
<p>而函数的<code>prototype</code>属性，本身是一个由<code>Object</code>构造的实例对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo.prototype.__proto__ === Object.prototype; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Foo.prototype.__proto__ === <span class="hljs-built_in">Object</span>.prototype; <span class="hljs-comment">// true</span></code></pre>
<p><code>prototype</code>属性很特殊，它还有一个隐式的<code>constructor</code>，指向了构造函数本身。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Foo.prototype.constructor === Foo; // true
a.constructor === Foo; // true
a.constructor === Foo.prototype.constructor; // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Foo.prototype.constructor === Foo; <span class="hljs-comment">// true</span>
a.constructor === Foo; <span class="hljs-comment">// true</span>
a.constructor === Foo.prototype.constructor; <span class="hljs-comment">// true</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVz22b?w=830&amp;h=448" src="https://static.alili.tech/img/bVz22b?w=830&amp;h=448" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>PS: <code>a.constructor</code>属性并不属于<code>a</code>（<code>a.hasOwnProperty("constructor") === false</code>），而是读取的<code>a.__proto__.constructor</code>，所以上图用虚线表示<code>a.constructor</code>，方便理解。</p>
<h3 id="articleHeader3">原型链</h3>
<p>概念：</p>
<p>原型链作为实现继承的主要方法，其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。<br>每个构造函数都有一个原型对象(<code>prototype</code>)，原型对象都包含一个指向构造函数的指针(<code>constructor</code>)，而实例都包含一个指向原型对象的内部指针(<code>__proto__</code>)。</p>
<p>那么，假如我们让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进，就构造了实例与原型的链条，这就是<strong>原型链</strong>的基本概念。</p>
<p>意义：“原型链”的作用在于，当读取对象的某个属性时，JavaScript引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。以此类推，如果直到最顶层的Object.prototype还是找不到，则返回undefine。</p>
<h3 id="articleHeader4">亲子鉴定</h3>
<p>在JavaScript中，也存在鉴定亲子之间DNA关系的方法：</p>
<ol>
<li><p><strong>instanceof</strong> 运算符返回一个布尔值，表示一个对象是否由某个构造函数创建。</p></li>
<li><p><strong>Object.isPrototypeOf()</strong> 只要某个对象处在原型链上，isProtypeOf都返回true</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Bar = function() {}
var b = new Bar();
b instanceof Bar // true
Bar.prototype.isPrototypeOf(b) // true
Object.prototype.isPrototypeOf(Bar) // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Bar = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> Bar();
b <span class="hljs-keyword">instanceof</span> Bar <span class="hljs-comment">// true</span>
Bar.prototype.isPrototypeOf(b) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">Object</span>.prototype.isPrototypeOf(Bar) <span class="hljs-comment">// true</span></code></pre>
<p>要注意，实例<code>b</code>的原型是<code>Bar.prototype</code>而不是<code>Bar</code></p>
<h3 id="articleHeader5">一张历史悠久的图</h3>
<p><span class="img-wrap"><img data-src="/img/bVcXNb" src="https://static.alili.tech/img/bVcXNb" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是一张描述了<code>Object</code>、<code>Function</code>以及一个函数实例<code>Foo</code>他们之间原型之间联系。如果理解了上面的概念，这张图是不难读懂。</p>
<p>从上图中，能看到一个有趣的地方。</p>
<ol>
<li><p><code>Function.prototype.__proto__</code> 指向了 <code>Object.prototype</code>，这说明<code>Function.prototype</code> 是一个 <code>Object</code>实例，那么应当是先有的<code>Object</code>再有<code>Function</code>。</p></li>
<li><p>但是<code>Object.prototype.constructor.__proto__</code> 又指向了 <code>Function.prototype</code>。这样看来，没有<code>Function</code>，<code>Object</code>也不能创建实例。</p></li>
</ol>
<p>这就产生了一种类「先有鸡还是先有蛋」的经典问题，到底是先有的<code>Object</code>还是先有的<code>Function</code>呢？<br>这么哲学向的问题，留给你思考了。</p>
<p>我只是感慨：<strong>越往JavaScript的深处探索，越觉得这一门语言很哲学。</strong></p>
<h1 id="articleHeader6">先有鸡还是先有蛋？</h1>
<blockquote><p>update on 2017/01/05</p></blockquote>
<p>时隔半年，偶尔翻开这篇文章。    <br>对于这个问题，又有了新的思考。    <br>愿意跟能看到这里的你来分享一下。</p>
<p>我们可以先把 <code>Object.prototype</code> 和 <code>Function.prototype</code> 这两个拎出来看，因为他们本身就是一个实例对象。<br>为方便理解，我们改一下名字，避免和 Object 和 Function 的强关联，分别叫：<code>Op</code> 和 <code>Fp</code></p>
<p>那么就有这样的原型链存在了 </p>
<p><span class="img-wrap"><img data-src="/img/bVHOQ9?w=679&amp;h=182" src="https://static.alili.tech/img/bVHOQ9?w=679&amp;h=182" alt="先有鸡还是先有蛋" title="先有鸡还是先有蛋" style="cursor: pointer;"></span></p>
<p>我再描述一下上面的原型链，先有 null , 再有了 Op , 然后再有了 Fp ，然后以 Fp 为原型的两个构造函数 (Object, Function) 出现了。    <br>而作为构造函数，需要有个 prototype 属性用来作为以该构造函数创造的实例的继承。    <br>所以Object.prototype = Op, Function.prototype = Fp。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 原型中的哲学思想

## 原文链接
[https://segmentfault.com/a/1190000005824449](https://segmentfault.com/a/1190000005824449)


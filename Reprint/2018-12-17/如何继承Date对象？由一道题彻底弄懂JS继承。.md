---
title: '如何继承Date对象？由一道题彻底弄懂JS继承。' 
date: 2018-12-17 2:30:07
hidden: true
slug: t5bmsxkh4f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p><strong>见解有限，如有描述不当之处，请帮忙及时指出，如有错误，会及时修正。</strong></p>
<p><strong>20180201更新：</strong></p>
<p>修改用词描述，如组合寄生式改成寄生组合式，修改多处笔误（感谢@Yao Ding的反馈）</p>
<p><strong>----------长文+多图预警，需要花费一定时间----------</strong></p>
<p>故事是从一次实际需求中开始的。。。</p>
<p>某天，某人向我寻求了一次帮助，要协助写一个日期工具类，要求：</p>
<ul>
<li>此类继承自<code>Date</code>，拥有Date的所有属性和对象</li>
<li>此类可以自由拓展方法</li>
</ul>
<p>形象点描述，就是要求可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设最终的类是 MyDate，有一个getTest拓展方法
let date = new MyDate();

// 调用Date的方法，输出GMT绝对毫秒数
console.log(date.getTime());
// 调用拓展的方法，随便输出什么，譬如helloworld!
console.log(date.getTest());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 假设最终的类是 MyDate，有一个getTest拓展方法</span>
<span class="hljs-keyword">let</span> date = <span class="hljs-keyword">new</span> MyDate();

<span class="hljs-comment">// 调用Date的方法，输出GMT绝对毫秒数</span>
<span class="hljs-built_in">console</span>.log(date.getTime());
<span class="hljs-comment">// 调用拓展的方法，随便输出什么，譬如helloworld!</span>
<span class="hljs-built_in">console</span>.log(date.getTest());</code></pre>
<p>于是，随手用JS中经典的<strong>寄生组合式</strong>写了一个继承，然后，刚准备完美收工，一运行，却出现了以下的情景：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>但是的心情是这样的： <strong>?囧</strong></p>
<p>以前也没有遇到过类似的问题，然后自己尝试着用其它方法，多次尝试，均无果（不算暴力混合法的情况），其实回过头来看，是因为思路新奇，凭空想不到，并不是原理上有多难。。。</p>
<p>于是，借助强大的搜素引擎，搜集资料，最后，再自己总结了一番，才有了本文。</p>
<p><strong>----------正文开始前----------</strong></p>
<p>正文开始前，各位看官可以先暂停往下读，尝试下，在不借助任何网络资料的情况下，是否能实现上面的需求？（就以<code>10分钟</code>为限吧）</p>
<h2 id="articleHeader1">大纲</h2>
<ul>
<li>
<p>先说说如何快速快速寻求解答</p>
<ul>
<li>stackoverflow上早就有答案了！</li>
<li>倘若用的是中文搜索。</li>
</ul>
</li>
<li>
<p>分析问题的关键</p>
<ul>
<li>经典的继承法有何问题</li>
<li>为什么无法被继承？</li>
</ul>
</li>
<li>
<p>该如何实现继承？</p>
<ul>
<li>暴力混合法</li>
<li>ES5黑魔法</li>
<li>ES6大法</li>
<li>ES6写法，然后babel打包</li>
</ul>
</li>
<li>几种继承的细微区别</li>
<li>ES6继承与ES5继承的区别</li>
<li>构造函数与实例对象</li>
<li>[[Class]]与Internal slot</li>
<li>如何快速判断是否继承？</li>
<li>写在最后的话</li>
</ul>
<h2 id="articleHeader2">先说说如何快速快速寻求解答</h2>
<p>遇到不会的问题，肯定第一目标就是如何快速寻求解决方案，答案是：</p>
<ul><li>先去stackoverflow上看看有没有类似的题。。。</li></ul>
<p>于是，借助搜索引擎搜索了下，第一条就符合条件，点开进去看描述</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">stackoverflow上早就有答案了！</h3>
<p>先说说结果，再浏览一番后，确实找到了解决方案，然后回过头来一看，惊到了，因为这个问题的提问时间是<code>6 years, 7 months ago</code>。<br>也就是说，<code>2011</code>年的时候就已经有人提出了。。。</p>
<p>感觉自己落后了一个时代<strong>&gt;_&lt;</strong>。。。</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search2.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search2.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>而且还发现了一个细节，那就是<code>viewed:10,606 times</code>，也就是说至今一共也才一万多次阅读而已，考虑到前端行业的从业人数，这个比例惊人的低。<br>以点见面，看来，遇到这个问题的人并不是很多。</p>
<h3 id="articleHeader4">倘若用的是中文搜索。</h3>
<p>用中文搜索并不丢人（我遇到问题时的本能反应也是去百度）。结果是这样的：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search3.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search3.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>嗯，看来英文关键字搜索效果不错，第一条就是符合要求的。然后又试了试中文搜索。</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search4.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search4.png" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search5.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search5.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>效果不如人意，搜索前几页，唯一有一条看起来比较相近的（<code>segmentfault</code>上的那条），点进去看</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search6.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search6.png" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search7.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_search7.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>怎么说呢。。。这个问题关注度不高，浏览器数较少，而且上面的问题描述和预期的有点区别，仍然是有人回答的。<br>不过，虽然说问题在一定程度上得到了解决，但是回答者绕过了无法继承这个问题，有点未竟全功的意思。。。</p>
<h2 id="articleHeader5">分析问题的关键</h2>
<p>借助stackoverflow上的回答</p>
<h3 id="articleHeader6">经典的继承法有何问题</h3>
<p>先看看本文最开始时提到的经典继承法实现，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 经典的js寄生组合式继承
 */
function MyDate() {
    Date.apply(this, arguments);
    this.abc = 1;
}

function inherits(subClass, superClass) {
    function Inner() {}
    
    Inner.prototype = superClass.prototype;
    subClass.prototype = new Inner();
    subClass.prototype.constructor = subClass;
}

inherits(MyDate, Date);

MyDate.prototype.getTest = function() {
    return this.getTime();
};


let date = new MyDate();

console.log(date.getTest());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 经典的js寄生组合式继承
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyDate</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">Date</span>.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">this</span>.abc = <span class="hljs-number">1</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Inner</span>(<span class="hljs-params"></span>) </span>{}
    
    Inner.prototype = superClass.prototype;
    subClass.prototype = <span class="hljs-keyword">new</span> Inner();
    subClass.prototype.constructor = subClass;
}

inherits(MyDate, <span class="hljs-built_in">Date</span>);

MyDate.prototype.getTest = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getTime();
};


<span class="hljs-keyword">let</span> date = <span class="hljs-keyword">new</span> MyDate();

<span class="hljs-built_in">console</span>.log(date.getTest());</code></pre>
<p>就是这段代码⬆，这也是JavaScript高程（红宝书）中推荐的一种，一直用，从未失手，结果现在马失前蹄。。。</p>
<p>我们再回顾下它的报错：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>再打印它的原型看看：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_proto.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_proto.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>怎么看都没问题，因为按照原型链回溯规则，<code>Date</code>的所有原型方法都可以通过<code>MyDate</code>对象的原型链往上回溯到。<br>再仔细看看，发现它的关键并不是找不到方法，而是<code>this is not a Date object.</code></p>
<p>嗯哼，也就是说，关键是：<strong>由于调用的对象不是Date的实例，所以不允许调用，就算是自己通过原型继承的也不行</strong></p>
<h3 id="articleHeader7">为什么无法被继承？</h3>
<p>首先，看看<code>MDN</code>上的解释，上面有提到，JavaScript的日期对象只能通过<code>JavaScript Date</code>作为构造函数来实例化。</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_explain.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_explain.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后再看看stackoverflow上的回答：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_explain2.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_explain2.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>有提到，<code>v8</code>引擎底层代码中有限制，如果调用对象的<code>[[Class]]</code>不是<code>Date</code>，则抛出错误。</p>
<p>总的来说，结合这两点，可以得出一个结论：</p>
<p><strong>要调用Date上方法的实例对象必须通过Date构造出来，否则不允许调用Date的方法</strong></p>
<h2 id="articleHeader8">该如何实现继承？</h2>
<p>虽然原因找到了，但是问题仍然要解决啊，真的就没办法了么？当然不是，事实上还是有不少实现的方法的。</p>
<h3 id="articleHeader9">暴力混合法</h3>
<p>首先，说说说下暴力的混合法，它是下面这样子的：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_mix.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_mix.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>说到底就是：内部生成一个<code>Date</code>对象，然后此类暴露的方法中，把原有<code>Date</code>中所有的方法都代理一遍，而且严格来说，这根本算不上继承（都没有原型链回溯）。</p>
<h3 id="articleHeader10">ES5黑魔法</h3>
<p>然后，再看看ES5中如何实现？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 需要考虑polyfill情况
Object.setPrototypeOf = Object.setPrototypeOf ||
function(obj, proto) {
    obj.__proto__ = proto;

    return obj;
};

/**
 * 用了点技巧的继承，实际上返回的是Date对象
 */
function MyDate() {
    // bind属于Function.prototype，接收的参数是：object, param1, params2...
    var dateInst = new(Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();

    // 更改原型指向，否则无法调用MyDate原型上的方法
    // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
    Object.setPrototypeOf(dateInst, MyDate.prototype);

    dateInst.abc = 1;

    return dateInst;
}

// 原型重新指回Date，否则根本无法算是继承
Object.setPrototypeOf(MyDate.prototype, Date.prototype);

MyDate.prototype.getTest = function getTest() {
    return this.getTime();
};

let date = new MyDate();

// 正常输出，譬如1515638988725
console.log(date.getTest());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 需要考虑polyfill情况</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf = <span class="hljs-built_in">Object</span>.setPrototypeOf ||
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj, proto</span>) </span>{
    obj.__proto__ = proto;

    <span class="hljs-keyword">return</span> obj;
};

<span class="hljs-comment">/**
 * 用了点技巧的继承，实际上返回的是Date对象
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyDate</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// bind属于Function.prototype，接收的参数是：object, param1, params2...</span>
    <span class="hljs-keyword">var</span> dateInst = <span class="hljs-keyword">new</span>(<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-built_in">Date</span>].concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>))))();

    <span class="hljs-comment">// 更改原型指向，否则无法调用MyDate原型上的方法</span>
    <span class="hljs-comment">// ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__</span>
    <span class="hljs-built_in">Object</span>.setPrototypeOf(dateInst, MyDate.prototype);

    dateInst.abc = <span class="hljs-number">1</span>;

    <span class="hljs-keyword">return</span> dateInst;
}

<span class="hljs-comment">// 原型重新指回Date，否则根本无法算是继承</span>
<span class="hljs-built_in">Object</span>.setPrototypeOf(MyDate.prototype, <span class="hljs-built_in">Date</span>.prototype);

MyDate.prototype.getTest = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTest</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getTime();
};

<span class="hljs-keyword">let</span> date = <span class="hljs-keyword">new</span> MyDate();

<span class="hljs-comment">// 正常输出，譬如1515638988725</span>
<span class="hljs-built_in">console</span>.log(date.getTest());</code></pre>
<p>一眼看上去不知所措？没关系，先看下图来理解：（原型链关系一目了然）</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_date_es5_prototype.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_date_es5_prototype.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以看到，用的是非常巧妙的一种做法：</p>
<ul>
<li>
<p>正常继承的情况如下：</p>
<ul>
<li>
<code>new MyDate()</code>返回实例对象<code>date</code>是由<code>MyDate</code>构造的</li>
<li>原型链回溯是: <code>date(MyDate对象)-&gt;date.__proto__-&gt;MyDate.prototype-&gt;MyDate.prototype.__proto__-&gt;Date.prototype</code>
</li>
</ul>
</li>
<li>
<p>这种做法的继承的情况如下：</p>
<ul>
<li>
<code>new MyDate()</code>返回实例对象<code>date</code>是由<code>Date</code>构造的</li>
<li>原型链回溯是: <code>date(Date对象)-&gt;date.__proto__-&gt;MyDate.prototype-&gt;MyDate.prototype.__proto__-&gt;Date.prototype</code>
</li>
</ul>
</li>
</ul>
<p>可以看出，关键点在于：</p>
<ul>
<li>构造函数里返回了一个真正的<code>Date</code>对象（由<code>Date</code>构造，所以有这些内部类中的关键<code>[[Class]]</code>标志），所以它有调用<code>Date</code>原型上方法的权利</li>
<li>构造函数里的Date对象的<code>[[ptototype]]</code>（对外，浏览器中可通过<code>__proto__</code>访问）指向<code>MyDate.prototype</code>，然后<code>MyDate.prototype</code>再指向<code>Date.prototype</code>。</li>
</ul>
<p>所以最终的实例对象仍然能进行正常的原型链回溯，回溯到原本Date的所有原型方法</p>
<ul><li>这样通过一个巧妙的欺骗技巧，就实现了完美的Date继承。不过补充一点，<code>MDN</code>上有提到<strong>尽量不要修改对象的<code>[[Prototype]]</code></strong>，因为这样可能会干涉到浏览器本身的优化。</li></ul>
<p><strong>如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]</strong></p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_protowarn.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_protowarn.png" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">ES6大法</h3>
<p>当然，除了上述的ES5实现，ES6中也可以直接继承（自带支持继承<code>Date</code>），而且更为简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyDate extends Date {
    constructor() {
        super();
        this.abc = 1;
    }
    getTest() {
        return this.getTime();
    }
}

let date = new MyDate();

// 正常输出，譬如1515638988725
console.log(date.getTest());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyDate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Date</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.abc = <span class="hljs-number">1</span>;
    }
    getTest() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getTime();
    }
}

<span class="hljs-keyword">let</span> date = <span class="hljs-keyword">new</span> MyDate();

<span class="hljs-comment">// 正常输出，譬如1515638988725</span>
<span class="hljs-built_in">console</span>.log(date.getTest());</code></pre>
<p>对比下ES5中的实现，这个真的是简单的不行，直接使用ES6的Class语法就行了。</p>
<p>而且，也可以正常输出。</p>
<p>注意：<strong>这里的正常输出环境是直接用ES6运行，不经过babel打包，打包后实质上是转化成ES5的，所以效果完全不一样</strong></p>
<h3 id="articleHeader12">ES6写法，然后Babel打包</h3>
<p>虽然说上述ES6大法是可以直接继承Date的，但是，考虑到实质上大部分的生产环境是：<code>ES6 + Babel</code></p>
<p><strong>直接这样用ES6 + Babel是会出问题的</strong></p>
<p>不信的话，可以自行尝试下，Babel打包成ES5后代码大致是这样的：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_babel.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_babel.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后当信心满满的开始用时，会发现：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>对，又出现了这个问题，也许这时候是这样的<strong>⊙?⊙</strong></p>
<p>因为转译后的ES5源码中，<strong>仍然是通过<code>MyDate</code>来构造</strong>，<br>而<code>MyDate</code>的构造中又无法修改属于<code>Date</code>内部的<code>[[Class]]</code>之类的私有标志，<br>因此构造出的对象仍然不允许调用<code>Date</code>方法（调用时，被引擎底层代码识别为<code>[[Class]]</code>标志不符合，不允许调用，抛出错误）</p>
<p>由此可见，ES6继承的内部实现和Babel打包编译出来的实现是有区别的。<br>（虽说Babel的polyfill一般会按照定义的规范去实现的，但也不要过度迷信）。</p>
<h2 id="articleHeader13">几种继承的细微区别</h2>
<p>虽然上述提到的三种方法都可以达到继承<code>Date</code>的目的-混合法严格说不能算继承，只不过是另类实现。</p>
<p>于是，将所有能打印的主要信息都打印出来，分析几种继承的区别，大致场景是这样的：</p>
<p>可以参考：（ 请进入调试模式）<a href="https://dailc.github.io/fe-interview/demo/extends_date.html" rel="nofollow noreferrer" target="_blank">https://dailc.github.io/fe-interview/demo/extends_date.html</a></p>
<p>从上往下，<code>1, 2, 3, 4</code>四种继承实现分别是：（排出了混合法）</p>
<ul>
<li>ES6的Class大法</li>
<li>经典寄生组合式继承法</li>
<li>本文中的取巧做法，Date构造实例，然后更改<code>__proto__</code>的那种</li>
<li>ES6的Class大法，Babel打包后的实现（无法正常调用的）</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="~~~~以下是MyDate们的prototype~~~~~~~~~
Date {constructor: ƒ, getTest: ƒ}
Date {constructor: ƒ, getTest: ƒ}
Date {getTest: ƒ, constructor: ƒ}
Date {constructor: ƒ, getTest: ƒ}

~~~~以下是new出的对象~~~~~~~~~
Sat Jan 13 2018 21:58:55 GMT+0800 (CST)
MyDate2 {abc: 1}
Sat Jan 13 2018 21:58:55 GMT+0800 (CST)
MyDate {abc: 1}

~~~~以下是new出的对象的Object.prototype.toString.call~~~~~~~~~
[object Date]
[object Object]
[object Date]
[object Object]

~~~~以下是MyDate们的__proto__~~~~~~~~~
ƒ Date() { [native code] }
ƒ () { [native code] }
ƒ () { [native code] }
ƒ Date() { [native code] }

~~~~以下是new出的对象的__proto__~~~~~~~~~
Date {constructor: ƒ, getTest: ƒ}
Date {constructor: ƒ, getTest: ƒ}
Date {getTest: ƒ, constructor: ƒ}
Date {constructor: ƒ, getTest: ƒ}

~~~~以下是对象的__proto__与MyDate们的prototype比较~~~~~~~~~
true
true
true
true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">~~~~以下是MyDate们的prototype~~~~~~~~~
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">getTest</span>: ƒ, <span class="hljs-attr">constructor</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}

~~~~以下是<span class="hljs-keyword">new</span>出的对象~~~~~~~~~
Sat Jan <span class="hljs-number">13</span> <span class="hljs-number">2018</span> <span class="hljs-number">21</span>:<span class="hljs-number">58</span>:<span class="hljs-number">55</span> GMT+<span class="hljs-number">0800</span> (CST)
MyDate2 {<span class="hljs-attr">abc</span>: <span class="hljs-number">1</span>}
Sat Jan <span class="hljs-number">13</span> <span class="hljs-number">2018</span> <span class="hljs-number">21</span>:<span class="hljs-number">58</span>:<span class="hljs-number">55</span> GMT+<span class="hljs-number">0800</span> (CST)
MyDate {<span class="hljs-attr">abc</span>: <span class="hljs-number">1</span>}

~~~~以下是<span class="hljs-keyword">new</span>出的对象的<span class="hljs-built_in">Object</span>.prototype.toString.call~~~~~~~~~
[object <span class="hljs-built_in">Date</span>]
[object <span class="hljs-built_in">Object</span>]
[object <span class="hljs-built_in">Date</span>]
[object <span class="hljs-built_in">Object</span>]

~~~~以下是MyDate们的__proto__~~~~~~~~~
ƒ <span class="hljs-built_in">Date</span>() { [native code] }
ƒ () { [native code] }
ƒ () { [native code] }
ƒ <span class="hljs-built_in">Date</span>() { [native code] }

~~~~以下是<span class="hljs-keyword">new</span>出的对象的__proto__~~~~~~~~~
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">getTest</span>: ƒ, <span class="hljs-attr">constructor</span>: ƒ}
<span class="hljs-built_in">Date</span> {<span class="hljs-attr">constructor</span>: ƒ, <span class="hljs-attr">getTest</span>: ƒ}

~~~~以下是对象的__proto__与MyDate们的prototype比较~~~~~~~~~
<span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>
<span class="hljs-literal">true</span>
<span class="hljs-literal">true</span></code></pre>
<p>看出，主要差别有几点：</p>
<ol>
<li>MyDate们的__proto__指向不一样</li>
<li>Object.prototype.toString.call的输出不一样</li>
<li>对象本质不一样，可以正常调用的<code>1, 3</code>都是<code>Date</code>构造出的，而其它的则是<code>MyDate</code>构造出的</li>
</ol>
<p>我们上文中得出的一个结论是：<strong>由于调用的对象不是由Date构造出的实例，所以不允许调用，就算是自己的原型链上有Date.prototype也不行</strong></p>
<p>但是这里有两个变量：<strong>分别是底层构造实例的方法不一样，以及对象的<code>Object.prototype.toString.call</code>的输出不一样</strong>。<br>（另一个<code>MyDate.__proto__</code>可以排除，因为原型链回溯肯定与它无关）</p>
<p>万一它的判断是根据<code>Object.prototype.toString.call</code>来的呢？那这样结论不就有误差了？</p>
<p>于是，根据ES6中的，<code>Symbol.toStringTag</code>，使用黑魔法，动态的修改下它，排除下干扰：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 分别可以给date2，date3设置
Object.defineProperty(date2, Symbol.toStringTag, {
    get: function() {
        return &quot;Date&quot;;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 分别可以给date2，date3设置</span>
<span class="hljs-built_in">Object</span>.defineProperty(date2, <span class="hljs-built_in">Symbol</span>.toStringTag, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"Date"</span>;
    }
});</code></pre>
<p>然后在打印下看看，变成这样了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[object Date]
[object Date]
[object Date]
[object Object]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[object <span class="hljs-built_in">Date</span>]
[object <span class="hljs-built_in">Date</span>]
[object <span class="hljs-built_in">Date</span>]
[object <span class="hljs-built_in">Object</span>]</code></pre>
<p>可以看到，第二个的<code>MyDate2</code>构造出的实例，虽然打印出来是<code>[object Date]</code>，但是调用Date方法仍然是有错误</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/date_extend_error1.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>此时我们可以更加准确一点的确认：<strong>由于调用的对象不是由Date构造出的实例，所以不允许调用</strong></p>
<p>而且我们可以看到，就算通过黑魔法修改<code>Object.prototype.toString.call</code>，内部的<code>[[Class]]</code>标识位也是无法修改的。<br>（这块知识点大概是Object.prototype.toString.call可以输出内部的[[Class]]，但无法改变它，由于不是重点，这里不赘述）。</p>
<h2 id="articleHeader14">ES6继承与ES5继承的区别</h2>
<p>从上文中的分析可以看到一点：ES6的Class写法继承是没问题的。但是换成ES5写法就不行了。</p>
<p>所以ES6的继承大法和ES5肯定是有区别的，那么究竟是哪里不同呢？（主要是结合的本文继承Date来说）</p>
<p>区别：（以<code>SubClass</code>，<code>SuperClass</code>，<code>instance</code>为例）</p>
<ul>
<li>
<p>ES5中继承的实质是：（那种经典寄生组合式继承法）</p>
<ul>
<li>先由子类（<code>SubClass</code>）构造出实例对象this</li>
<li>然后在子类的构造函数中，将父类（<code>SuperClass</code>）的属性添加到<code>this</code>上，<code>SuperClass.apply(this, arguments)</code>
</li>
<li>子类原型（<code>SubClass.prototype</code>）指向父类原型（<code>SuperClass.prototype</code>）</li>
<li>所以<code>instance</code>是子类（<code>SubClass</code>）构造出的（所以没有父类的<code>[[Class]]</code>关键标志）</li>
<li>所以，<code>instance</code>有<code>SubClass</code>和<code>SuperClass</code>的所有实例属性，以及可以通过原型链回溯，获取<code>SubClass</code>和<code>SuperClass</code>原型上的方法</li>
</ul>
</li>
<li>
<p>ES6中继承的实质是：</p>
<ul>
<li>先由父类（<code>SuperClass</code>）构造出实例对象this，这也是为什么必须先调用父类的<code>super()</code>方法（子类没有自己的this对象，需先由父类构造）</li>
<li>然后在子类的构造函数中，修改this（进行加工），譬如让它指向子类原型（<code>SubClass.prototype</code>），这一步很关键，否则无法找到子类原型（<em>注，子类构造中加工这一步的实际做法是推测出的，从最终效果来推测</em>）</li>
<li>然后同样，子类原型（<code>SubClass.prototype</code>）指向父类原型（<code>SuperClass.prototype</code>）</li>
<li>所以<code>instance</code>是父类（<code>SuperClass</code>）构造出的（所以有着父类的<code>[[Class]]</code>关键标志）</li>
<li>所以，<code>instance</code>有<code>SubClass</code>和<code>SuperClass</code>的所有实例属性，以及可以通过原型链回溯，获取<code>SubClass</code>和<code>SuperClass</code>原型上的方法</li>
</ul>
</li>
</ul>
<p>以上⬆就列举了些重要信息，其它的如静态方法的继承没有赘述。（静态方法继承实质上只需要更改下<code>SubClass.__proto__</code>到<code>SuperClass</code>即可）</p>
<p>可以看着这张图快速理解：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_es5_and_es6.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_es5_and_es6.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>有没有发现呢：<strong>ES6中的步骤和本文中取巧继承Date的方法一模一样，不同的是ES6是语言底层的做法，有它的底层优化之处，而本文中的直接修改__proto__容易影响性能</strong></p>
<p><strong>ES6中在super中构建this的好处？</strong></p>
<p>因为ES6中允许我们继承内置的类，如Date，Array，Error等。如果this先被创建出来，在传给Array等系统内置类的构造函数，这些内置类的构造函数是不认这个this的。<br>所以需要现在super中构建出来，这样才能有着super中关键的<code>[[Class]]</code>标志，才能被允许调用。（否则就算继承了，也无法调用这些内置类的方法）</p>
<h2 id="articleHeader15">构造函数与实例对象</h2>
<p>看到这里，不知道是否对上文中频繁提到的<strong>构造函数</strong>，<strong>实例对象</strong>有所混淆与困惑呢？这里稍微描述下：</p>
<p>要弄懂这一点，需要先知道<code>new</code>一个对象到底发生了什么？先形象点说：</p>
<h3 id="articleHeader16">new MyClass()中，都做了些什么工作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyClass() {
    this.abc = 1;
}

MyClass.prototype.print = function() {
    console.log('this.abc:' + this.abc);
};

let instance = new MyClass();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyClass</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.abc = <span class="hljs-number">1</span>;
}

MyClass.prototype.print = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this.abc:'</span> + <span class="hljs-keyword">this</span>.abc);
};

<span class="hljs-keyword">let</span> instance = <span class="hljs-keyword">new</span> MyClass();</code></pre>
<p>譬如，上述就是一个标准的实例对象生成，都发生了什么呢？</p>
<p>步骤简述如下：（<strong>参考MDN</strong>，还有部分关于底层的描述略去-如[[Class]]标识位等）</p>
<ol>
<li>构造函数内部，创建一个新的对象，它继承自<code>MyClass.prototype</code>，<code>let instance = Object.create(MyClass.prototype);</code>
</li>
<li>使用指定的参数调用构造函数<code>MyClass</code>，并将 this绑定到新创建的对象，<code>MyClass.call(instance);</code>，执行后拥有所有实例属性</li>
<li>如果构造函数返回了一个“对象”，那么这个对象会取代整个<code>new</code>出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象。</li>
</ol>
<p>（一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。）</p>
<p>结合上述的描述，大概可以还原成以下代码：（简单还原，不考虑各种其它逻辑）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let instance = Object.create(MyClass.prototype);
let innerConstructReturn = MyClass.call(instance);
let innerConstructReturnIsObj = typeof innerConstructReturn === 'object' || typeof innerConstructReturn === 'function';

return innerConstructReturnIsObj ? innerConstructReturn : instance;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> instance = <span class="hljs-built_in">Object</span>.create(MyClass.prototype);
<span class="hljs-keyword">let</span> innerConstructReturn = MyClass.call(instance);
<span class="hljs-keyword">let</span> innerConstructReturnIsObj = <span class="hljs-keyword">typeof</span> innerConstructReturn === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> innerConstructReturn === <span class="hljs-string">'function'</span>;

<span class="hljs-keyword">return</span> innerConstructReturnIsObj ? innerConstructReturn : instance;</code></pre>
<ul><li>
<p>注意⚠️：</p>
<ul>
<li>普通的函数构建，可以简单的认为就是上述步骤</li>
<li>
<p>实际上对于一些内置类（如Date等），并没有这么简单，还有一些自己的隐藏逻辑，譬如<code>[[Class]]</code>标识位等一些重要私有属性。</p>
<ul><li>譬如可以在MDN上看到，以常规函数调用Date（即不加 new 操作符）将会返回一个字符串，而不是一个日期对象，如果这样模拟的话会无效</li></ul>
</li>
</ul>
</li></ul>
<p>觉得看起来比较繁琐？可以看下图梳理：</p>
<p><span class="img-wrap"><img data-src="https://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_new_obj.png" src="https://static.alili.techhttps://dailc.github.io/staticResource/blog/basicKnowledge/extenddate/extend_new_obj.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>那现在再回头看看。</p>
<p><strong>什么是构造函数？</strong></p>
<p>如上述中的<code>MyClass</code>就是一个构造函数，在内部它构造出了<code>instance</code>对象</p>
<p><strong>什么是实例对象？</strong></p>
<p><code>instance</code>就是一个实例对象，它是通过<code>new</code>出来的？</p>
<p><strong>实例与构造的关系</strong></p>
<p>有时候浅显点，可以认为构造函数是xxx就是xxx的实例。即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let instance = new MyClass();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> instance = <span class="hljs-keyword">new</span> MyClass();</code></pre>
<p>此时我们就可以认为<code>instance</code>是<code>MyClass</code>的实例，因为它的构造函数就是它</p>
<h3 id="articleHeader17">实例就一定是由对应的构造函数构造出的么？</h3>
<p><strong>不一定</strong>，我们那ES5黑魔法来做示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyDate() {
    // bind属于Function.prototype，接收的参数是：object, param1, params2...
    var dateInst = new(Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();

    // 更改原型指向，否则无法调用MyDate原型上的方法
    // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
    Object.setPrototypeOf(dateInst, MyDate.prototype);

    dateInst.abc = 1;

    return dateInst;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyDate</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// bind属于Function.prototype，接收的参数是：object, param1, params2...</span>
    <span class="hljs-keyword">var</span> dateInst = <span class="hljs-keyword">new</span>(<span class="hljs-built_in">Function</span>.prototype.bind.apply(<span class="hljs-built_in">Date</span>, [<span class="hljs-built_in">Date</span>].concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>))))();

    <span class="hljs-comment">// 更改原型指向，否则无法调用MyDate原型上的方法</span>
    <span class="hljs-comment">// ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__</span>
    <span class="hljs-built_in">Object</span>.setPrototypeOf(dateInst, MyDate.prototype);

    dateInst.abc = <span class="hljs-number">1</span>;

    <span class="hljs-keyword">return</span> dateInst;
}</code></pre>
<p>我们可以看到<code>instance</code>的最终指向的原型是<code>MyDate.prototype</code>，而<code>MyDate.prototype</code>的构造函数是<code>MyDate</code>，<br>因此可以认为<code>instance</code>是<code>MyDate</code>的实例。</p>
<p>但是，<strong>实际上，<code>instance</code>却是由<code>Date</code>构造的</strong></p>
<p>我们可以继续用<code>ES6</code>中的<code>new.target</code>来验证。</p>
<p><strong>注意<span style="font-weight:normal;">⚠</span>️</strong></p>
<p>关于<code>new.target</code>，<code>MDN</code>中的定义是：<strong>new.target返回一个指向构造方法或函数的引用</strong>。</p>
<p>嗯哼，也就是说，返回的是构造函数。</p>
<p>我们可以在相应的构造中测试打印：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyDate extends Date {
    constructor() {
        super();
        this.abc = 1;
        console.log('~~~new.target.name:MyDate~~~~');
        console.log(new.target.name);
    }
}

// new操作时的打印结果是：
// ~~~new.target.name:MyDate~~~~
// MyDate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyDate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Date</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.abc = <span class="hljs-number">1</span>;
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'~~~new.target.name:MyDate~~~~'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span>.target.name);
    }
}

<span class="hljs-comment">// new操作时的打印结果是：</span>
<span class="hljs-comment">// ~~~new.target.name:MyDate~~~~</span>
<span class="hljs-comment">// MyDate</span></code></pre>
<p>然后，可以在上面的示例中看到，就算是ES6的Class继承，<code>MyDate</code>构造中打印<code>new.target</code>也显示<code>MyDate</code>，<br>但实际上它是由<code>Date</code>来构造（有着<code>Date</code>关键的<code>[[Class]]</code>标志，因为如果不是Date构造（如没有标志）是无法调用Date的方法的）。</p>
<p>所以，实际上<strong>用<code>new.target</code>是无法判断实例对象到底是由哪一个构造构造的（这里指的是判断底层真正的<code>[[Class]]</code>标志来源的构造）</strong></p>
<p>在MDN上的定义也可以看到，<code>new.target</code>返回的是直接构造函数（new作用的那个），所以请不要将直接构造函数与<strong>实际上的构造</strong>搞混</p>
<p>再回到结论：<strong>实例对象不一定就是由它的原型上的构造函数构造的，有可能构造函数内部有着寄生等逻辑，偷偷的用另一个函数来构造了下</strong>,<br>当然，简单情况下，我们直接说实例对象由对应构造函数构造也没错（不过，在涉及到这种Date之类的分析时，我们还是得明白）。</p>
<h2 id="articleHeader18">[[Class]]与Internal slot</h2>
<p><strong>这一部分为补充内容。</strong></p>
<p>前文中一直提到一个概念：<strong>Date内部的<code>[[Class]]</code>标识</strong></p>
<p>其实，严格来说，不能这样泛而称之（前文中只是用这个概念是为了降低复杂度，便于理解），它可以分为以下两部分：</p>
<ul>
<li>
<p>在ES5中，每种内置对象都定义了 [[Class]] 内部属性的值，[[Class]] 内部属性的值用于内部区分对象的种类</p>
<ul>
<li>
<code>Object.prototype.toString</code>访问的就是这个[[Class]]</li>
<li>规范中除了通过<code>Object.prototype.toString</code>，没有提供任何手段使程序访问此值。</li>
<li>而且Object.prototype.toString输出无法被修改</li>
</ul>
</li>
<li>
<p>而在ES6中，之前的 [[Class]] 不再使用，取而代之的是一系列的<code>internal slot</code></p>
<ul>
<li>Internal slot 对应于与对象相关联并由各种ECMAScript规范算法使用的内部状态，它们没有对象属性，也不能被继承</li>
<li>根据具体的 Internal slot 规范，这种状态可以由任何ECMAScript语言类型或特定ECMAScript规范类型值的值组成</li>
<li>通过<code>Object.prototype.toString</code>，仍然可以输出Internal slot值</li>
<li>
<strong>简单点理解（简化理解）</strong>，Object.prototype.toString的流程是：如果是基本数据类型（除去Object以外的几大类型），则返回原本的slot，</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果是Object类型（包括内置对象以及自己写的对象），则调用`Symbol.toStringTag`

- `Symbol.toStringTag`方法的默认实现就是返回对象的Internal slot，这个方法**可以被重写**

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>如果是Object类型（包括内置对象以及自己写的对象），则调用`Symbol.toStringTag`

- `Symbol.toStringTag`方法的默认实现就是返回对象的Internal slot，这个方法**可以被重写**

</code></pre>
<p>这两点是有所差异的，需要区分（不过简单点可以统一理解为内置对象内部都有一个特殊标识，用来区分对应类型-不符合类型就不给调用）。</p>
<p>JS内置对象是这些：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Arguments&quot;, &quot;Array&quot;, &quot;Boolean&quot;, &quot;Date&quot;, &quot;Error&quot;, &quot;Function&quot;, &quot;JSON&quot;, &quot;Math&quot;, &quot;Number&quot;, &quot;Object&quot;, &quot;RegExp&quot;, &quot;String&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"Arguments"</span>, <span class="hljs-string">"Array"</span>, <span class="hljs-string">"Boolean"</span>, <span class="hljs-string">"Date"</span>, <span class="hljs-string">"Error"</span>, <span class="hljs-string">"Function"</span>, <span class="hljs-string">"JSON"</span>, <span class="hljs-string">"Math"</span>, <span class="hljs-string">"Number"</span>, <span class="hljs-string">"Object"</span>, <span class="hljs-string">"RegExp"</span>, <span class="hljs-string">"String"</span></code></pre>
<p>ES6新增的一些，这里未提到：（如Promise对象可以输出<code>[object Promise]</code>）</p>
<p>而前文中提到的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(date, Symbol.toStringTag, {
    get: function() {
        return &quot;Date&quot;;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Object</span>.defineProperty(date, <span class="hljs-built_in">Symbol</span>.toStringTag, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">"Date"</span>;
    }
});</code></pre>
<p>它的作用是重写Symbol.toStringTag，截取date（虽然是内置对象，但是仍然属于Object）的<code>Object.prototype.toString</code>的输出，让这个对象输出自己修改后的<code>[object Date]</code>。</p>
<p><strong>但是，仅仅是做到输出的时候变成了Date，实际上内部的<code>internal slot</code>值并没有被改变</strong>，因此仍然不被认为是Date</p>
<h2 id="articleHeader19">如何快速判断是否继承？</h2>
<p>其实，在判断继承时，没有那么多的技巧，就只有关键的一点：<strong><code>[[prototype]]</code>（<code>__ptoto__</code>）的指向关系</strong></p>
<p>譬如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(instance instanceof SubClass);
console.log(instance instanceof SuperClass);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(instance <span class="hljs-keyword">instanceof</span> SubClass);
<span class="hljs-built_in">console</span>.log(instance <span class="hljs-keyword">instanceof</span> SuperClass);</code></pre>
<p>实质上就是：</p>
<ul>
<li>
<code>SubClass.prototype</code>是否出现在<code>instance</code>的原型链上</li>
<li>
<code>SuperClass.prototype</code>是否出现在<code>instance</code>的原型链上</li>
</ul>
<p>然后，对照本文中列举的一些图，一目了然就可以看清关系。有时候，完全没有必要弄的太复杂。</p>
<h2 id="articleHeader20">写在最后的话</h2>
<p>由于继承的介绍在网上已经多不胜数，因此本文没有再重复描述，而是由一道Date继承题引发，展开。（关键就是原型链）</p>
<p>不知道看到这里，各位看官是否都已经弄懂了JS中的继承呢？</p>
<p>另外，遇到问题时，多想一想，有时候你会发现，其实你知道的并不是那么多，然后再想一想，又会发现其实并没有这么复杂。。。</p>
<h2 id="articleHeader21">附录</h2>
<h3 id="articleHeader22">博客</h3>
<p>初次发布<code>2018.01.15</code>于我个人博客上面</p>
<p><a href="http://www.dailichun.com/2018/01/15/howtoextenddate.html" rel="nofollow noreferrer" target="_blank">http://www.dailichun.com/2018/01/15/howtoextenddate.html</a></p>
<h3 id="articleHeader23">参考资料</h3>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes</a></li>
<li><a href="https://stackoverflow.com/questions/6075231/how-to-extend-the-javascript-date-object/30882416" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/questions/6075231/how-to-extend-the-javascript-date-object/30882416</a></li>
<li><a href="http://exploringjs.com/es6/ch_classes.html#sec_essentials-classes" rel="nofollow noreferrer" target="_blank">http://exploringjs.com/es6/ch_classes.html#sec_essentials-classes</a></li>
<li><a href="http://blog.csdn.net/github_36978270/article/details/71896444" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/github_36978270/article/details/71896444</a></li>
<li><a href="http://blog.csdn.net/pcaxb/article/details/53784309" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/pcaxb/article/details/53784309</a></li>
<li><a href="http://blog.csdn.net/kittyjie/article/details/50494915" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/kittyjie/article/details/50494915</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何继承Date对象？由一道题彻底弄懂JS继承。

## 原文链接
[https://segmentfault.com/a/1190000012841509](https://segmentfault.com/a/1190000012841509)


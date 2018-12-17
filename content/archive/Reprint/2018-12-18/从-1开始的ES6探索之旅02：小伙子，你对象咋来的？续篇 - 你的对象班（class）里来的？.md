---
title: '从-1开始的ES6探索之旅02：小伙子，你对象咋来的？续篇 - 你的对象班（class）里来的？' 
date: 2018-12-18 2:30:11
hidden: true
slug: abnwylpv97s
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>温馨提示：作者的爬坑记录，对你等大神完全没有价值，别在我这浪费生命</strong><br><strong>温馨提示-续：你们要非得看，我也拦不住，但是至少得准备个支持ES6的Chrome浏览器吧？</strong><br><strong>温馨提示-再续：ES6简直了，放着不用简直令人发指！</strong></p>
<p>书接上回，即便是程序员，也还是能够通过自己的努力辛辛苦苦找到合适对象的，见前文<a href="https://segmentfault.com/a/1190000012623928">《javascript对象不完全探索记录05：小伙子，你对象咋来的？下篇 - 啥样的对象适合你》</a></p>
<p>还记得我们新建一个炮姐和黑子废了多少事吗</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GirlFriend(name,hairColor,power){
    this.name = name;
    this.hairColor = hairColor;
    this.power = power;
}

GirlFriend.prototype.showPower = function(){
    console.log(this.power)
}

var mikoto = new GirlFriend(&quot;Mikoto&quot;,&quot;brown&quot;,&quot;Bilibili&quot;);
var kuroko = new GirlFriend(&quot;Kuroko&quot;,&quot;black&quot;,&quot;Telesport&quot;);

mikoto.showPower();//Bilibili
kuroko.showPower();//Telesport" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GirlFriend</span>(<span class="hljs-params">name,hairColor,power</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.hairColor = hairColor;
    <span class="hljs-keyword">this</span>.power = power;
}

GirlFriend.prototype.showPower = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.power)
}

<span class="hljs-keyword">var</span> mikoto = <span class="hljs-keyword">new</span> GirlFriend(<span class="hljs-string">"Mikoto"</span>,<span class="hljs-string">"brown"</span>,<span class="hljs-string">"Bilibili"</span>);
<span class="hljs-keyword">var</span> kuroko = <span class="hljs-keyword">new</span> GirlFriend(<span class="hljs-string">"Kuroko"</span>,<span class="hljs-string">"black"</span>,<span class="hljs-string">"Telesport"</span>);

mikoto.showPower();<span class="hljs-comment">//Bilibili</span>
kuroko.showPower();<span class="hljs-comment">//Telesport</span></code></pre>
<h2 id="articleHeader0">class里来了新同学</h2>
<p>当你擦擦额头的汗水一脸微笑地看着自己创建出的对象时，边上小哥早就拉着从class里找的对象去浪漫土耳其玩了一圈了。<br>其实在ES6的时代，你根本不用那么费劲，利用class这个概念，就可以帮你更方便的带来一个相对完美对象，例如刚才我们所做的，还可以通过下面的方式实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class GirlFriend{
    constructor(name,hairColor,power){
        this.name = name;
        this.hairColor = hairColor;
        this.power = power;
    }
    showPower(){
        console.log(this.power)
    }
}

var mikoto = new GirlFriend(&quot;Mikoto&quot;,&quot;brown&quot;,&quot;Bilibili&quot;);
var kuroko = new GirlFriend(&quot;Kuroko&quot;,&quot;black&quot;,&quot;Telesport&quot;);
mikoto.showPower();//Bilibili
kuroko.showPower();//Telesport" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">GirlFriend</span></span>{
    <span class="hljs-keyword">constructor</span>(name,hairColor,power){
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.hairColor = hairColor;
        <span class="hljs-keyword">this</span>.power = power;
    }
    showPower(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.power)
    }
}

<span class="hljs-keyword">var</span> mikoto = <span class="hljs-keyword">new</span> GirlFriend(<span class="hljs-string">"Mikoto"</span>,<span class="hljs-string">"brown"</span>,<span class="hljs-string">"Bilibili"</span>);
<span class="hljs-keyword">var</span> kuroko = <span class="hljs-keyword">new</span> GirlFriend(<span class="hljs-string">"Kuroko"</span>,<span class="hljs-string">"black"</span>,<span class="hljs-string">"Telesport"</span>);
mikoto.showPower();<span class="hljs-comment">//Bilibili</span>
kuroko.showPower();<span class="hljs-comment">//Telesport</span></code></pre>
<p>我们在控制台上看看两个炮姐有什么不一样</p>
<p>前一种方法的炮姐：<br><span class="img-wrap"><img data-src="/img/bV1y45?w=1090&amp;h=520" src="https://static.alili.tech/img/bV1y45?w=1090&amp;h=520" alt="前一种方法的炮姐" title="前一种方法的炮姐" style="cursor: pointer; display: inline;"></span></p>
<p>用了Class的炮姐：<br><span class="img-wrap"><img data-src="/img/bV1y1X?w=1138&amp;h=522" src="https://static.alili.tech/img/bV1y1X?w=1138&amp;h=522" alt="用了Class的炮姐" title="用了Class的炮姐" style="cursor: pointer; display: inline;"></span></p>
<p>除了之前的对象方法是个匿名函数没有<code>name</code>属性之外没什么区别，所以放心的用吧！干的就是一件事！</p>
<p>再看看我们应该怎么做，其实很简单，就是把构造函数<code>construtor()</code>和其他对象方法一起放到你自己命名的<code>class xxx{}</code>中就可以了，再利用同<em>构造函数法</em>相同的方式把对象<code>new</code>出来就OK了<br>说到底利用这种方式构造的对象的原理其实和<strong>混合法</strong>／<a href="https://segmentfault.com/a/1190000012623928" target="_blank">前文</a>有说，是一样的</p>
<p>话又说回来，其实<code>class</code>这个关键字，我早就看好你了，这不就是<strong>类</strong>吗，上文所干的事情不就是在javascript里建了一个类吗，但事实上并不是这样的</p>
<blockquote>ECMAScript 2015 中引入的 JavaScript 类(classes) 实质上是 JavaScript 现有的基于原型的继承的语法糖。 类语法不是向JavaScript引入一个新的面向对象的继承模型。JavaScript类提供了一个更简单和更清晰的语法来创建对象并<strong>处理继承</strong>。<br><em>摘自<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank">MDN Web docs - Web技术文档／javascript／类</a></em>
</blockquote>
<p>说明白点，其实还是原型链那点事，只不过写的像类一样，这样方便大家理解和使用罢了，所以为了不产生不必要的误会，我决定就不叫它<strong>类</strong>了，就是<strong><code>class</code></strong>一个javascript中特有的概念</p>
<h2 id="articleHeader1">所以这回可以痛快的继承了？</h2>
<p>是这样的，看上面定义中标黑的部分<br>在ES6中，通过对class的应用，有更好更方便的方式来处理继承<br>我们曾经举过妹妹的例子，妹妹是炮姐的克隆人，跟炮姐有相同的发色和Bilibili的能力，但是每个人有不同的能力级别，在没有用到<code>class</code>之前，我是这么干的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Sister(level,number){
    this.level = level;
    this.number = number;
    this.showLevel = function(){
        console.log(this.level);
    }
}
Sister.prototype = mikoto;
var sister01 = new Sister(3,'0001');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sister</span>(<span class="hljs-params">level,number</span>)</span>{
    <span class="hljs-keyword">this</span>.level = level;
    <span class="hljs-keyword">this</span>.number = number;
    <span class="hljs-keyword">this</span>.showLevel = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.level);
    }
}
Sister.prototype = mikoto;
<span class="hljs-keyword">var</span> sister01 = <span class="hljs-keyword">new</span> Sister(<span class="hljs-number">3</span>,<span class="hljs-string">'0001'</span>);</code></pre>
<p>而这个只是为了了解原型链相关原理的尝试，从最终的结果看借用了一些继承的思维，但继承说到底是类／class层面的，在之前不少前辈在javascript中尝试了对继承的实现，一文盖之<a href="https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance#%E5%8E%9F%E5%9E%8B%E5%BC%8F%E7%9A%84%E7%BB%A7%E6%89%BF" rel="nofollow noreferrer" target="_blank">JavaScript 中的继承 - MDN Web docs</a></p>
<p>但是在在ES6中既然有了class这个概念那么继承的概念呢<br>当然是有的！妹妹们，出来吧！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Sister extends GirlFriend {
    constructor(name, hairColor, power, number, level) {
        super(name, hairColor, power);
        this.number = number;
        this.level = level;
    }
    showLevel() {
        console.log(this.level);
        super.showPower();
    }
}

var sister1 = new Sister(&quot;Sister&quot;, &quot;brown&quot;, &quot;Bilibili&quot;, &quot;0001&quot;, 3);
sister1.showPower();//Bilibili
sister1.showLevel();//3,Bilibili" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sister</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">GirlFriend</span> </span>{
    constructor(name, hairColor, power, number, level) {
        <span class="hljs-keyword">super</span>(name, hairColor, power);
        <span class="hljs-keyword">this</span>.number = number;
        <span class="hljs-keyword">this</span>.level = level;
    }
    showLevel() {
        console.log(<span class="hljs-keyword">this</span>.level);
        <span class="hljs-keyword">super</span>.showPower();
    }
}

<span class="hljs-keyword">var</span> sister1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Sister</span>(<span class="hljs-string">"Sister"</span>, <span class="hljs-string">"brown"</span>, <span class="hljs-string">"Bilibili"</span>, <span class="hljs-string">"0001"</span>, <span class="hljs-number">3</span>);
sister1.showPower();<span class="hljs-comment">//Bilibili</span>
sister1.showLevel();<span class="hljs-comment">//3,Bilibili</span></code></pre>
<p>效果简直拔群，我们建立了和炮姐有同样发色和能力的妹妹，而且还能调用炮姐的能力，并且还有自己的新特性。<br>用法也很好理解，就是在你定义一个新的<code>class Sister</code>的时候让它<code>extends</code>要继承的<code>class GirlFriend</code>，新的<code>class</code>也可以有自己的构造函数，为自己添加新的属性，当然也可以有新的方法，还可以调用父<code>class</code>中的方法</p>
<p>这里面有个神奇的函数<code>super()</code>其实跟他一点不陌生，就跟关键字<code>class</code>一样在许多面向对象的语言中都会出现</p>
<p>而在创建妹妹的过程中，两次用到了<code>super()</code>，第一次是在构造函数中，通过<code>super()</code>调用了父<code>class</code>的构造函数使得妹妹也可以拥有和炮姐一样多的属性，第二次是在对象方法中，调用了父<code>class</code>的对象方法，使得妹妹在展示自己level的同时可以展示自己的Bilibili，在javascript中<code>super()</code>的用法也就主要是这两种</p>
<blockquote>super([arguments]); <br>// 调用 父对象/父类 的构造函数<br>super.functionOnParent([arguments]); <br>// 调用 父对象/父类 上的方法`<p><em>摘自<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super" rel="nofollow noreferrer" target="_blank">MDN Web docs - Web技术文档／javascript／super</a></em></p>
</blockquote>
<p>在这里要注意的一点是，在子class的constructor中必<strong>须先调用super才能使用关键字this</strong>，不然会报错的，究其原因</p>
<blockquote>子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。<p><em>摘自<a href="http://es6.ruanyifeng.com/?search=%E7%BB%A7%E6%89%BF&amp;x=0&amp;y=0#docs/class-extends" rel="nofollow noreferrer" target="_blank">ECMAScript6入门 Class的继承 - 阮一峰</a></em></p>
</blockquote>
<p>关于javascript中继承这点事，虽然这看上去跟真的似的，但是这还是个语法糖，还是原型链那点事<br><span class="img-wrap"><img data-src="/img/bV1AgM?w=1498&amp;h=950" src="https://static.alili.tech/img/bV1AgM?w=1498&amp;h=950" alt="还是原型链那点事" title="还是原型链那点事" style="cursor: pointer; display: inline;"></span><br>这所谓的继承，就是让<code>GirlFirend</code>成为了<code>Sister</code>的原型对象而已</p>
<p>当然ES6中关于class相关的东西还有不少，学习路漫长啊</p>
<p><strong>能看到这的都是真爱</strong><br><strong>发着烧写，满脸懵逼</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从-1开始的ES6探索之旅02：小伙子，你对象咋来的？续篇 - 你的对象班（class）里来的？

## 原文链接
[https://segmentfault.com/a/1190000012733709](https://segmentfault.com/a/1190000012733709)


---
title: 'javascript对象不完全探索记录04：小伙子，你对象咋来的？中篇 - 现出你的原型！' 
date: 2018-12-21 2:30:11
hidden: true
slug: 63g8jh3bjpq
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>温馨提示：作者的爬坑记录，对你等大神完全没有价值，别在我这浪费生命</strong></p>
<p>在上一篇博文<a href="https://segmentfault.com/a/1190000012398696">javascript对象不完全探索记录03：小伙子，你对象咋来的？上篇</a>，中大概说了说在js中，比较好理解的对象创建方式，分别是<strong>直接定义／字面量</strong>，和调用<strong>构造函数</strong></p>
<h2 id="articleHeader0">你对象还有原型？</h2>
<p>在一众博文及书中，有一个高级／不好看明白的方式，比上面这两种更收到推崇，那就是大名鼎鼎的<strong>原型方式</strong>，看到这个词，我表示不是我谦虚，是真懵逼，啥原型，什么原型，谁的原型？现看看别人给的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Car() {
}

Car.prototype.color = &quot;blue&quot;;
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Car</span><span class="hljs-params">()</span> </span>{
}

Car.prototype.color = <span class="hljs-string">"blue"</span>;
Car.prototype.doors = <span class="hljs-number">4</span>;
Car.prototype.mpg = <span class="hljs-number">25</span>;
Car.prototype.showColor = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  alert(<span class="hljs-keyword">this</span>.color);
};

<span class="hljs-keyword">var</span> oCar1 = <span class="hljs-keyword">new</span> Car();
<span class="hljs-keyword">var</span> oCar2 = <span class="hljs-keyword">new</span> Car();</code></pre>
<p><em>源自<a href="http://www.w3school.com.cn/js/pro_js_object_defining.asp" rel="nofollow noreferrer" target="_blank">ECMAScript 定义类或对象 - W3school</a></em></p>
<p>别说，还真有那么点眼熟，这种对象名称，后面跟一个<code>prototype</code>的写法，一直以来是我一个重要懵逼来源，话说这词，不就是原型的意思吗？</p>
<blockquote>
<strong>prototype</strong><br>英 [ˈprəʊtətaɪp]   美 [ˈproʊtətaɪp]  <br>n.<br><strong>原型</strong>，雏形，蓝本</blockquote>
<p>哈，在这等着我呢，其实认真一看这句<code>Car.prototype.color = "blue";</code>的语法意思是给<code>Car</code>的<code>prototype</code>的<code>color</code>赋值，翻译一下就是给<code>Car</code>的原型中的<code>color</code>属性赋值，所以说是不是能理解为<strong>原型</strong>也就是<code>prototype</code>是对象的一个属性呢？还是从头了解吧</p>
<h2 id="articleHeader1">所以你原型是啥?</h2>
<p>提到原型，就不能不提到javascript中的一个重要的懵逼概念 - 原型链</p>
<blockquote>
<strong>每个对象</strong>都有一个<strong>私有属性</strong>（称之为 [[Prototype]]），它持有一个连接到另一个称为其 prototype 对象（原型对象）的<strong>链接</strong>。该 prototype 对象又具有一个自己的原型，<strong>层层向上</strong>直到一个对象的原型为 null。（译者注：Object.getPrototypeOf(Object.prototype) === null; // true）根据定义，null 没有原型，并作为这个原型链中的最后一个环节。<p><em>源自<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">MDN Web docs - Web技术文档／javascript／继承与原型链</a></em></p>
</blockquote>
<p>这段话我注意到的有几个关键词：每个对象，私有属性，链接，层层向上</p>
<p>用直白的话描述一下，在javascript中任何一个对象都有一个叫做原型对象的对象，这个原型对象就是传说中的prototype，而指向原型对象的链接／指针／箭头／-&gt;/都存在对象内部的一个私有属性中<strong>[[Prototype]]</strong>中（*见注1）</p>
<p>也就是说对象的[[Prototype]]中并不是直接存了原型对象，而是存着一个指向原型对象的链接//这也就使得其是动态的-待研究</p>
<p>由此可以想到的，既然每个对象都有原型对象，每个对象也都可以作为其他对象的原型对象，那么就会形成一个由[[Prototype]]属性组成的链，这就是传说中的原型链了，而利用原型链，对象可以访问其原型对象的属性及方法</p>
<blockquote>
<strong>*注1</strong><br>[[prototype]]是一个隐藏属性，但很多浏览器都给每一个对象提供.__proto__这一属性，这个属性就是上文反复提到的该对象的[[prototype]]。由于这个属性不标准，因此一般不提倡使用。ES5中用Object.getPrototypeOf函数获得一个对象的[[prototype]]。ES6中，使用Object.setPrototypeOf可以直接修改一个对象的[[prototype]]<p><em>源自<a href="https://www.zhihu.com/question/34183746/answer/58068402" rel="nofollow noreferrer" target="_blank">知乎问题 - js中__proto__和prototype的区别和关系？ - 知乎用户的回答</a></em></p>
</blockquote>
<p><strong>换句话说，任何一个对象，都是在另一个被叫做原型对象的基础之上被创建出来的，这也就是所谓的原型了</strong></p>
<h2 id="articleHeader2">整这么麻烦干嘛？</h2>
<p>就像我们知道的，在学园都市里有好多少女们／对象，她们各自有不同名字，头发颜色，以及超能力，她们可以展现自己的超能力，我们建立一个名叫<code>GirlFriend()</code>的构造函数，来记录记录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function GirlFriend(name,hairColor,power){
    this.name = name;
    this.hairColor = hairColor;
    this.showPower = function(){
        console.log(power)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GirlFriend</span>(<span class="hljs-params">name,hairColor,power</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.hairColor = hairColor;
    <span class="hljs-keyword">this</span>.showPower = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(power)
    }
}</code></pre>
<p>记录／实例化炮姐和黑子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mikoto = new GirlFriend(&quot;Mikoto&quot;,&quot;brown&quot;,&quot;BiliBili&quot;);
var kuroko = new GirlFriend(&quot;Kuroko&quot;,&quot;black&quot;,&quot;Telesport&quot;);
mikoto.showPower();//BiliBili
kuroko.showPower();//Telesport" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> mikoto = <span class="hljs-keyword">new</span> <span class="hljs-type">GirlFriend</span>(<span class="hljs-string">"Mikoto"</span>,<span class="hljs-string">"brown"</span>,<span class="hljs-string">"BiliBili"</span>);
<span class="hljs-keyword">var</span> kuroko = <span class="hljs-keyword">new</span> <span class="hljs-type">GirlFriend</span>(<span class="hljs-string">"Kuroko"</span>,<span class="hljs-string">"black"</span>,<span class="hljs-string">"Telesport"</span>);
mikoto.showPower();<span class="hljs-comment">//BiliBili</span>
kuroko.showPower();<span class="hljs-comment">//Telesport</span></code></pre>
<p>直到这里一切都很正常，但是却发现炮姐不是一个人！有人处于某种原因克隆了好多炮姐,如何记录炮姐的妹妹们呢，我们创建一个构造函数<code>Sister()</code>用于记录炮姐的妹妹们</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Sister(level,number){
    this.level = level;
    this.number = number;
    this.showLevel = function(){
        console.log(this.level);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sister</span>(<span class="hljs-params">level,number</span>)</span>{
    <span class="hljs-keyword">this</span>.level = level;
    <span class="hljs-keyword">this</span>.number = number;
    <span class="hljs-keyword">this</span>.showLevel = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.level);
    }
}</code></pre>
<p>但是妹妹们也是由炮姐克隆而来的啊，炮姐有的属性她们也都应该有啊，怎么办，直接在<code>Sister()</code>里新增属性吗？太麻烦了而且这就跟炮姐没关系了，炮姐哪天要是在<code>GrilFriend()</code>里多录入一个新的属性，在<code>Sister()</code>也还得继续添加。<br>就没有什么更好的方式吗，答案是肯定的</p>
<p>于是我们就用炮姐这个实例对象作为<strong>原型对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sister.prototype = mikoto;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-type">Sister</span>.proto<span class="hljs-keyword">type</span> = mikoto;</code></pre>
<p>在这里<code>Sister.prototype</code>指的是由构造函数<code>Sister()</code>生成的实例对象所对应的原型对象<br>说白了，上面这行代码的的作用就是<strong>让所有由<code>Sister()</code>生成的实例对象的原型对象都是<code>mikoto</code>，我们来试试结果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sister = new Sister(3,'0001');
sister.showPower();//BiliBili
sister.showLevel();//3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-keyword">var</span> sister = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Sister</span>(<span class="hljs-number">3</span>,'<span class="hljs-number">0001</span>');
<span class="hljs-title">sister</span>.<span class="hljs-title">showPower</span>();<span class="hljs-comment">//BiliBili</span>
<span class="hljs-title">sister</span>.<span class="hljs-title">showLevel</span>();<span class="hljs-comment">//3</span></span></code></pre>
<p>到此为止一个拥有3级BiliBili能力的妹妹就诞生了</p>
<p>而且其整个的执行过程也与我们对<strong>链</strong>的理解一样，是从内到外，从这儿到那儿的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GirlFriend.prototype.age = 14;
console.log(sister);//见截图
console.log(sister.age)//14
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>GirlFriend.prototype.age = <span class="hljs-number">14</span>;
console.<span class="hljs-built_in">log</span>(sister);<span class="hljs-comment">//见截图</span>
console.<span class="hljs-built_in">log</span>(sister.age)<span class="hljs-comment">//14</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Bdm?w=1074&amp;h=394" src="https://static.alili.tech/img/bV0Bdm?w=1074&amp;h=394" alt="运行结果" title="运行结果" style="cursor: pointer; display: inline;"></span><br>从结果中可以看出，<code>sister</code>对象内部并没有<code>age</code>属性，在<code>sister</code>对象的原型对象<code>mikoto</code>中也没有<code>age</code>属性，但是在<code>mikoto</code>的原型对象中包含<code>age</code>属性并且有值，所以<code>sister</code>对象就顺着原型链一路找到了第一个<code>age</code>属性</p>
<p>但其实sister的因为是被克隆出来的所以只有1岁而已</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sister.age = 1;
console.log(sister);//见截图
console.log(sister.age)//1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>sister.age = <span class="hljs-number">1</span>;
console.<span class="hljs-built_in">log</span>(sister);<span class="hljs-comment">//见截图</span>
console.<span class="hljs-built_in">log</span>(sister.age)<span class="hljs-comment">//1</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV0Brb?w=1110&amp;h=426" src="https://static.alili.tech/img/bV0Brb?w=1110&amp;h=426" alt="运行结果" title="运行结果" style="cursor: pointer;"></span><br>从运行结果可以看出，<code>sister</code>对象内部有<code>age</code>属性，这个是<code>sister</code>原型链上第一个<code>age</code>属性，所以<code>sister.age</code>的值就取<code>1</code><br>为由<code>GirlFriend()</code>实例化对象的原型对象增加属性age并赋值，看看sister.age</p>
<h2 id="articleHeader3">能在说细点吗</h2>
<p>在上文代码和截图中出现了两个和prototype相关的词，prototype和_proto_，这俩货是干啥的？<br>其实上文提到了，构造函数Foo()的prototype属性指的就是这个构造函数所对应的原型对象，其实就是<strong>通过Foo()创建的对象的原型对象</strong>，所以prototype是构造函数所具有的一个属性<br>而_proto_属性是对应对象所说的，见上文注1所说，举个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sister.__proto__.age = 1
console.log(mikoto.age);//1
console.log(kuroko.age);//14
sister.__proto__.__proto__.age = 1
console.log(kuroko.age);//1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>sister.<span class="hljs-variable">__proto__</span>.age = <span class="hljs-number">1</span>
console.<span class="hljs-built_in">log</span>(mikoto.age);<span class="hljs-comment">//1</span>
console.<span class="hljs-built_in">log</span>(kuroko.age);<span class="hljs-comment">//14</span>
sister.<span class="hljs-variable">__proto__</span>.<span class="hljs-variable">__proto__</span>.age = <span class="hljs-number">1</span>
console.<span class="hljs-built_in">log</span>(kuroko.age);<span class="hljs-comment">//1</span></code></pre>
<p>正如例子中表现的，对象可以通过<code>_proto_</code>属性获得自己的原型对象，以及原型链上每一个对象</p>
<p>在截图中的原型对象中，还存在一个<code>constructor</code>的属性，这个属性指向的就是这个原型对象所对应的构造函数，也就是那个构造出原型对象为该对象的函数，一句话概括就是<strong>构造函数和其对应的对象互相拥有彼此，构造函数将对象放在<code>prototype</code>属性中，对象将构造函数放在<code>constructor</code>属性中</strong>我想这就是爱情吧</p>
<p>这里再放一张图，就能更清除解释他们之间的关系了<br><span class="img-wrap"><img data-src="/img/bVVVE9?w=520&amp;h=586" src="https://static.alili.tech/img/bVVVE9?w=520&amp;h=586" alt="prototype,_proto_,construtor之间关系" title="prototype,_proto_,construtor之间关系" style="cursor: pointer; display: inline;"></span></p>
<p><em>源自<a href="https://www.zhihu.com/question/34183746/answer/58155878" rel="nofollow noreferrer" target="_blank">知乎问题 - js中__proto__和prototype的区别和关系？ - doris的回答</a></em></p>
<h2 id="articleHeader4">话说回来</h2>
<p>绕了这么大一圈，还没忘我们为什么要研究原型吧，通过原型的方式创建对象的属性和方法，就可以利用同种对象类型的不同实例拥有想用的原型对象这一特性，避免重复创建，并且在修改原型对象的某个属性后，也可以通过原型链影响到其他所有相关对象上。</p>
<p>举个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GirlFriend.prototype.sayHello = function(){
    console.log(&quot;Ohayo!&quot;)
}
kuroko.sayHello();//Ohayo!
sister.sayHello();//Ohayo!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>GirlFriend.prototype.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Ohayo!"</span>)
}
kuroko.sayHello();<span class="hljs-comment">//Ohayo!</span>
sister.sayHello();<span class="hljs-comment">//Ohayo!</span></code></pre>
<p>并且说到底她们执行的都是同一个<code>sayHello()</code></p>
<p>关于原型这块概念相对复杂，还设计嵌套，相互引用等等深坑，还是得先捋清楚再自己多做联系来理解和熟练运用啦<br><strong>能看到这的估计都懵逼了</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript对象不完全探索记录04：小伙子，你对象咋来的？中篇 - 现出你的原型！

## 原文链接
[https://segmentfault.com/a/1190000012498290](https://segmentfault.com/a/1190000012498290)


---
title: '《JavaScript设计模式》读后感 觉很复杂' 
date: 2019-01-29 2:30:10
hidden: true
slug: 7yvui3wn8yo
categories: [reprint]
---

{{< raw >}}

                    
<p>接触前端两三个月的时候，那时候只是听说设计模式很重要，然后我就去读了一本设计模式的书，读了一部分，也不知道这些设计模式到底设计出来干嘛的，然后就没再看了。后来就自己做一些小项目也觉着好像不需要用到设计模式这个东西呀。现在，接触前端有半年了，决定再重新看看设计模式，说不定会有一些启发。于是发现了一本好书——《JavaScript设计模式》，写的通俗易懂，用一个个故事串起了一整本书，看了一部分发现原来我平时写代码的时候无意之中就用到了一些设计模式，然后就忍不住都看完了。看完整本书，让我完全改变了以前对设计模式的看法，也学到了很多在实际项目开发中的经验。这里就简单总结下这本书，也算是做个笔记，供自己以后参考。（定义一般都比较晦涩难懂，可以先看看使用场景再回来理解相关定义）    <br>先给个书的链接: <a href="https://www.amazon.cn/JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E5%BC%A0%E5%AE%B9%E9%93%AD/dp/B013HO6DNS/ref=sr_1_2?s=books&amp;ie=UTF8&amp;qid=1482324196&amp;sr=1-2&amp;keywords=javascript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F" rel="nofollow noreferrer" target="_blank">JavaScript设计模式-张容铭</a></p>
<h1 id="articleHeader0">什么是设计模式</h1>
<p>设计模式是代码设计经验的总结，为了可重用代码，保证代码的可靠性等。设计模式主要分为三大类型，创建型模式，结构型模式和行为型模式，本书还额外写了另两类设计模式，技巧型模式和架构型模式。JavaScript设计模式是以面向对象编程为基础的，JavaScript的面向对象编程和传统的C++、Java的面向对象编程有些差别，这让我一开始接触JavaScript的时候感到十分痛苦，但是这只能靠自己慢慢积累慢慢思考。想继续了解JavaScript设计模式必须要先搞懂JavaScript面向对象编程，否则只会让你自己更痛苦。</p>
<h1 id="articleHeader1">创建型设计模式</h1>
<p>创建型设计模式是一类处理对象创建的设计模式，通过某种方式控制对象的创建来避免基本对象创建时可能导致设计上的问题或增加设计上的复杂度。创建型设计模式主要有简单工厂模式，工厂方法模式，抽象工厂模式，建造者模式，原型模式和单例模式，下面一一道来。</p>
<h2 id="articleHeader2">简单工厂模式</h2>
<p>作者把简单工厂模式比喻成一个神奇的魔术师。</p>
<h3 id="articleHeader3">定义</h3>
<p>又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例，主要用来创建同一类对象。</p>
<h3 id="articleHeader4">使用场景</h3>
<p>看完上面的定义一定很不解，说的到底是啥，现在就举个例子来解释一下。比如体育商品店卖体育器材，里面有很多体育用品及其相关介绍。当你来到体育用品店买一个篮球，只需问售货员，他就会帮你找到你所要的东西。用程序实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 篮球基类
var Basketball = function() {
    this.intro = '篮球盛行于美国';
};
Basketball.prototype = {
    getMember: function() {
        console.log('每个队伍需要5名队员');
    },
    getBallSize: function() {
        console.log('篮球很大');
    }
};
// 足球基类
var Football = function() {
    this.intro = '足球盛行于美国';
};
Football.prototype = {
    getMember: function() {
        console.log('每个队伍需要11名队员');
    },
    getBallSize: function() {
        console.log('篮球很大');
    }
};
// 运动工厂
var SportsFactory = function(name) {
    switch(name) {
        case 'NBA': 
            return new Basketball();
        case 'wordCup': 
            return new Football();
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 篮球基类</span>
<span class="hljs-keyword">var</span> Basketball = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.intro = <span class="hljs-string">'篮球盛行于美国'</span>;
};
Basketball.prototype = {
    <span class="hljs-attr">getMember</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'每个队伍需要5名队员'</span>);
    },
    <span class="hljs-attr">getBallSize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'篮球很大'</span>);
    }
};
<span class="hljs-comment">// 足球基类</span>
<span class="hljs-keyword">var</span> Football = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.intro = <span class="hljs-string">'足球盛行于美国'</span>;
};
Football.prototype = {
    <span class="hljs-attr">getMember</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'每个队伍需要11名队员'</span>);
    },
    <span class="hljs-attr">getBallSize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'篮球很大'</span>);
    }
};
<span class="hljs-comment">// 运动工厂</span>
<span class="hljs-keyword">var</span> SportsFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">switch</span>(name) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">'NBA'</span>: 
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Basketball();
        <span class="hljs-keyword">case</span> <span class="hljs-string">'wordCup'</span>: 
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Football();
    }
};</code></pre>
<p>当你使用这个运动工厂时只需要记住SportsFactory这个工厂对象就好了，它会帮你找到你想要的。    <br>简单工厂模式的理念是创建对象，上面例子是将不同的类实例化，但是简单工厂模式还可以创建相似对象，将相似的东西提取，不相似的针对性处理即可。这样只需创建一个对象就可以替代多个类了。</p>
<h3 id="articleHeader5">收获与总结</h3>
<p>团队开发不同于个人，对全局变量的限制很大，要尽量少得创建全局变量。如果有同一类对象在不同需求中重复使用，那么大部分是不需要重复创建的，要学会代码复用。用简单工厂来创建对象，可以减少全局变量创建提高代码复用率，它的使用场合限制在创建单一对象。</p>
<h2 id="articleHeader6">工厂方法模式</h2>
<p>作者把工厂方法模式比喻成一张名片。</p>
<h3 id="articleHeader7">定义</h3>
<p>通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例。</p>
<h3 id="articleHeader8">使用场景</h3>
<p>在实际开发中，需求的变更是很正常的，开始需求简单可以直接创建对象，类似的需求多了可以用简单工厂方法重构，但是如果需求不停变化，那么不仅要修改工厂函数还要添加类，这样就没完了。而工厂方法模式本意是将实际创建对象的工作推迟到子类中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 工厂类
var Factory = function(type, content) {
    if(this instanceof Factory) {
        var s = new this[type](content);
        return s;
    } else {
        // 防止使用者不知道这是一个类，忘了加new操作符创建，导致全局变量污染
        return new Factory(type, content);
    }
};
Factory.prototype = {
    Java: function(content) {
        // ...
    },
    JavaScript: function(content) {
        // ...
    },
    php: function(content) {
        // ...
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 工厂类</span>
<span class="hljs-keyword">var</span> Factory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, content</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Factory) {
        <span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>[type](content);
        <span class="hljs-keyword">return</span> s;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 防止使用者不知道这是一个类，忘了加new操作符创建，导致全局变量污染</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Factory(type, content);
    }
};
Factory.prototype = {
    <span class="hljs-attr">Java</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>) </span>{
        <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-attr">JavaScript</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>) </span>{
        <span class="hljs-comment">// ...</span>
    },
    <span class="hljs-attr">php</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">content</span>) </span>{
        <span class="hljs-comment">// ...</span>
    }
};</code></pre>
<p>这样以后如果想添加其他类，只需要在Factory的原型里添加就可以了。</p>
<h3 id="articleHeader9">收获与总结</h3>
<p>对于创建很多类的对象，简单工厂模式就不适合了，通过工厂模式可以轻松创建多个类的实例对象，而且避免了使用者与对象类之间的耦合，用户不必关心创建该对象的具体类，只需调用工厂方法即可。</p>
<h2 id="articleHeader10">抽象工厂模式</h2>
<p>抽象工厂模式让你感觉出现的都是幻觉。</p>
<h3 id="articleHeader11">定义</h3>
<p>通过对类的工厂抽象使其业务用于对产品类簇的创建，而不负责某一类产品的实例。</p>
<h3 id="articleHeader12">抽象类</h3>
<p>抽象类是一种声明但不能使用的类，当你使用的时候就会报错。JavaScript中的抽象类不能像传统面向对象语言那样轻松地创建，我们可以在类的方法中手动抛出错误来模拟抽象类。你可能会想，这样的类什么都不能做能有什么用？其实它在继承上是很有用的。</p>
<h3 id="articleHeader13">使用场景</h3>
<p>抽象工厂模式不能用来创建具体对象，一般用它作为父类类创建一些子类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 抽象工厂方法
var VehicleFactory = function(subType, superType) {
    // 判断抽象工厂中是否有该抽象类
    if(typeof VehicleFactory[superType] === 'function') {
        // 缓存类
        function F() {};
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类构造函数指向子类
        subType.constructor = subType;
        // 子类原型继承父类
        subType.prototype = new F();
    } else {
        // 不存在该抽象类抛出错误
        throw new Error('未创建该抽象类');
    }
};
// 小汽车抽象类
VehicleFactory.Car = function() {
    this.type = 'car';
};
VehicleFactory.Car.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用')
    }
};
// 公交车抽象类
VehicleFactory.Bus = function() {
    this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
    getPrice: function() {
        return new Error('抽象方法不能调用');
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 抽象工厂方法</span>
<span class="hljs-keyword">var</span> VehicleFactory = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">subType, superType</span>) </span>{
    <span class="hljs-comment">// 判断抽象工厂中是否有该抽象类</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> VehicleFactory[superType] === <span class="hljs-string">'function'</span>) {
        <span class="hljs-comment">// 缓存类</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{};
        <span class="hljs-comment">// 继承父类属性和方法</span>
        F.prototype = <span class="hljs-keyword">new</span> VehicleFactory[superType]();
        <span class="hljs-comment">// 将子类构造函数指向子类</span>
        subType.constructor = subType;
        <span class="hljs-comment">// 子类原型继承父类</span>
        subType.prototype = <span class="hljs-keyword">new</span> F();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 不存在该抽象类抛出错误</span>
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'未创建该抽象类'</span>);
    }
};
<span class="hljs-comment">// 小汽车抽象类</span>
VehicleFactory.Car = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'car'</span>;
};
VehicleFactory.Car.prototype = {
    <span class="hljs-attr">getPrice</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>)
    }
};
<span class="hljs-comment">// 公交车抽象类</span>
VehicleFactory.Bus = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">'bus'</span>;
};
VehicleFactory.Bus.prototype = {
    <span class="hljs-attr">getPrice</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'抽象方法不能调用'</span>);
    }
};</code></pre>
<p>抽象工厂实际上是一个子类继承父类的方法，在该方法中需要通过传递子类以及继承父类的名称。</p>
<h3 id="articleHeader14">收获与总结</h3>
<p>抽象工厂模式是设计模式中最抽象的一种，也是创建模式中唯一一种抽象化创建模式。该模式创建出的结果不是一个真实的对象实例，而是一个类簇，指定了类的结构。</p>
<h2 id="articleHeader15">建造者模式</h2>
<p>建造者模式告诉我们分即是合。</p>
<h3 id="articleHeader16">定义</h3>
<p>将一个复杂对象的构建层与其表示层相互分离，同样的构建过程可采用不同的表示。</p>
<h3 id="articleHeader17">应用场景</h3>
<p>现在有一个发布简历的需求，就是帮别人在公司网站上发布简历，但是这些简历有一个需求，除了将兴趣爱好以及一些特长发布在页面里，其他信息如联系方式等不要发布在网站上，而且每个人想找的工作是可以分类的。这样一些需求我们需要创建的东西就多了，这时候前面的三种工厂模式都不适合了，这里就可以用建造者模式。    <br>建造者模式和只关心创建结果的工厂模式不同，虽然其目的也是创建一个对象，但是更多关心的是创建这个对象的整个过程。在本例中，我们需要的不仅仅是应聘者的实例还要在创建过程中注意这位应聘者有哪些兴趣爱好等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一位人类
var Human = function(param) {
    // 技能
    this.skill = param &amp;&amp; param.skill || '保密';
    // 兴趣爱好
    this.hobby = param &amp;&amp; param.hobby || '保密';
};
// 类人原型方法
Human.prototype = {
    getSkill: function() {
        return this.skill;
    },
    getHobby: function() {
        return this.hobby;
    }
};
// 实例化姓名类
var Named = function(name) {
    var that = this;
    // 构造器，解析姓名的姓与名
    (function(name, that) {
        that.wholeName = name;
        if(name.indexOf(' ') > -1) {
            that.FirstName = name.slice(0, name.indexOf(' '));
            that.FirstName = name.slice(name.indexOf(' '));
        }
    })(name, that);
};
// 实例化职位类
var Work = function(work) {
    var that = this;
    // 构造器，通过传入的职位特征来设置相应职位及描述
    (function(work, that) {
        switch(work) {
            case 'code':
                that.work = '工程师';
                break;
            case 'UI':
            case 'UE':
                that.work = '设计师';
                break;
            case 'teach':
                that.work = '教师';
                break;
            default:
                that.work = work;
        }
    })(work, that);
};
// 更换期望的职位
Work.prototype.changeWork = function(work) {
    this.work = work;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 创建一位人类</span>
<span class="hljs-keyword">var</span> Human = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">param</span>) </span>{
    <span class="hljs-comment">// 技能</span>
    <span class="hljs-keyword">this</span>.skill = param &amp;&amp; param.skill || <span class="hljs-string">'保密'</span>;
    <span class="hljs-comment">// 兴趣爱好</span>
    <span class="hljs-keyword">this</span>.hobby = param &amp;&amp; param.hobby || <span class="hljs-string">'保密'</span>;
};
<span class="hljs-comment">// 类人原型方法</span>
Human.prototype = {
    <span class="hljs-attr">getSkill</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.skill;
    },
    <span class="hljs-attr">getHobby</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hobby;
    }
};
<span class="hljs-comment">// 实例化姓名类</span>
<span class="hljs-keyword">var</span> Named = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// 构造器，解析姓名的姓与名</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, that</span>) </span>{
        that.wholeName = name;
        <span class="hljs-keyword">if</span>(name.indexOf(<span class="hljs-string">' '</span>) &gt; <span class="hljs-number">-1</span>) {
            that.FirstName = name.slice(<span class="hljs-number">0</span>, name.indexOf(<span class="hljs-string">' '</span>));
            that.FirstName = name.slice(name.indexOf(<span class="hljs-string">' '</span>));
        }
    })(name, that);
};
<span class="hljs-comment">// 实例化职位类</span>
<span class="hljs-keyword">var</span> Work = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">work</span>) </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// 构造器，通过传入的职位特征来设置相应职位及描述</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">work, that</span>) </span>{
        <span class="hljs-keyword">switch</span>(work) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">'code'</span>:
                that.work = <span class="hljs-string">'工程师'</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'UI'</span>:
            <span class="hljs-keyword">case</span> <span class="hljs-string">'UE'</span>:
                that.work = <span class="hljs-string">'设计师'</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">'teach'</span>:
                that.work = <span class="hljs-string">'教师'</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                that.work = work;
        }
    })(work, that);
};
<span class="hljs-comment">// 更换期望的职位</span>
Work.prototype.changeWork = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">work</span>) </span>{
    <span class="hljs-keyword">this</span>.work = work;
};</code></pre>
<p>下面来创建一位应聘者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 应聘者创建类
var Person = function(name, work) {
    // 创建应聘者缓存对象
    var _person = new Human();
    // 创建应聘者姓名解析对象
    _person.name = new Named(name);
    // 创建应聘者期望职位
    _person.work = new Work(work);
    // 返回创建的应聘者对象
    return _person;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 应聘者创建类</span>
<span class="hljs-keyword">var</span> Person = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, work</span>) </span>{
    <span class="hljs-comment">// 创建应聘者缓存对象</span>
    <span class="hljs-keyword">var</span> _person = <span class="hljs-keyword">new</span> Human();
    <span class="hljs-comment">// 创建应聘者姓名解析对象</span>
    _person.name = <span class="hljs-keyword">new</span> Named(name);
    <span class="hljs-comment">// 创建应聘者期望职位</span>
    _person.work = <span class="hljs-keyword">new</span> Work(work);
    <span class="hljs-comment">// 返回创建的应聘者对象</span>
    <span class="hljs-keyword">return</span> _person;
}</code></pre>
<h3 id="articleHeader18">收获与总结</h3>
<p>建造者模式和前面几种创建型设计模式不同，它关心对象的整个创建过程，因此通常将创建对象的类模块化，这样使创建类的每一个模块都可以得到灵活的运用与高质量的复用。这种方式对于整个对象类的拆分无形中增加了结构的复杂性，因此如果对象粒度很小，或者模块间的复用率很低，不建议使用建造者模式。</p>
<h2 id="articleHeader19">原型模式</h2>
<p>原型模式是JavaScript语言之魂。</p>
<h3 id="articleHeader20">定义</h3>
<p>用原型实例指向创建对象的类，使用于创建新的对象的类共享原型对象的属性以及方法。</p>
<h3 id="articleHeader21">使用场景</h3>
<p>还是关于子类继承父类的问题，为了提高性能，对于每次创建的一些简单的而又有差异化的属性可以放在构造函数中，将一些消耗资源比较大的方法放在基类的原型中，这样就可以避免不必要的消耗，这就是原型模式的雏形。     <br>原型模式更多的是用在对象的创建上，比如创建一个实例对象的构造函数比较复杂或者耗时比较长，或者通过创建多个对象来实现。此时最好不要用new关键字去复制这些基类，可以通过对这些对象属性或者方法进行复制来实现创建。首先要有一个原型对象的复制方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原型对象复制方法
function prototypeExtend() {
    var F = function() {},
        args = arguments,
        i = 0,
        len = args.length;
    for (; i < len; i++) {
        // 遍历每个模板对象中的属性
        for(var j in args[i]) {
            F.prototype[j] = args[i][j];
        }
    }
    // 返回缓存类实例
    return new F();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 原型对象复制方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prototypeExtend</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> F = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        args = <span class="hljs-built_in">arguments</span>,
        i = <span class="hljs-number">0</span>,
        len = args.length;
    <span class="hljs-keyword">for</span> (; i &lt; len; i++) {
        <span class="hljs-comment">// 遍历每个模板对象中的属性</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j <span class="hljs-keyword">in</span> args[i]) {
            F.prototype[j] = args[i][j];
        }
    }
    <span class="hljs-comment">// 返回缓存类实例</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}</code></pre>
<p>企鹅游戏中创建一个企鹅对象，如果没有企鹅基类，只提供了一些动作模板对象，可以通过实现这些模板对象的继承来创建一个企鹅实例对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var penguin = prototypeExtend({
    speed: 20,
    swim: function() {
        console.log('游泳速度' + this.speed);
    },
    run: function() {
        console.log('奔跑速度' + this.speed);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> penguin = prototypeExtend({
    <span class="hljs-attr">speed</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">swim</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'游泳速度'</span> + <span class="hljs-keyword">this</span>.speed);
    },
    <span class="hljs-attr">run</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'奔跑速度'</span> + <span class="hljs-keyword">this</span>.speed);
    }
})</code></pre>
<p>这样通过prototypeExtend创建的就是一个对象，不用再用new去创建一个新的实例对象。</p>
<h3 id="articleHeader22">收获与总结</h3>
<p>原型模式实际上也是一种继承，可以让多个对象分享同一个原型对象的属性和方法，这种继承的实现是不需要创建的，而是将原型对象分享给那些继承的对象。原型对象更适合在创建复杂的对象时，对于那些需求一直在变化而导致对象结构不停地改变时，将那些比较稳定的属性与方法共用而提取的继承的实现。</p>
<h2 id="articleHeader23">单例模式</h2>
<p>哈哈，让你感受下一个人的寂寞。</p>
<h3 id="articleHeader24">定义</h3>
<p>又被称为单体模式，只允许实例化一次的对象类。有时也可以用一个对象来规划一个命名空间，井井有条地管理对象上的属性和方法。</p>
<h3 id="articleHeader25">使用场景</h3>
<p>单例模式应该是JavaScript中最常见的一种设计模式了，经常为我们提供一个命名空间，来防止不同的人命名变量的冲突。还可以用它来创建一个小型的代码库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var A = {
    Util: {
        util_method1: function() {},
        util_method2: function() {}
    },
    Tool: {
        tool_method1: function() {},
        tool_method2: function() {}
    },
    Ajax: {
        ajax_method1: function() {},
        ajax_method2: function() {}
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> A = {
    <span class="hljs-attr">Util</span>: {
        <span class="hljs-attr">util_method1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">util_method2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    },
    <span class="hljs-attr">Tool</span>: {
        <span class="hljs-attr">tool_method1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">tool_method2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    },
    <span class="hljs-attr">Ajax</span>: {
        <span class="hljs-attr">ajax_method1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-attr">ajax_method2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    }
    ...
}</code></pre>
<p>如果想使用这个代码库，像下面这样访问即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A.Util.util_method1();
A.Tool.tool_method2();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">A.Util.util_method1();
A.Tool.tool_method2();</code></pre>
<h3 id="articleHeader26">收获与总结</h3>
<p>单例模式有时也被称为单体模式，它是只允许实例化一次的对象类，有时这么做也是为了节省系统资源。JavaScript中单例模式经常作为命名空间对象来实现，通过单例对象，我们可以将各个模块的代码井井有条地梳理在一起。</p>
<h1 id="articleHeader27">结构型设计模式</h1>
<p>结构型设计模式关注于如何将类或对象组合成更大、更复杂的结构，以简化设计。主要有外观模式，适配器模式，代理模式，装饰者模式，桥接模式，组合模式和享元模式。</p>
<h2 id="articleHeader28">外观模式</h2>
<p>作者把这种模式比喻成一种套餐服务。</p>
<h3 id="articleHeader29">定义</h3>
<p>为一组复杂的子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统接口的访问更加容易。在JavaScript中有时也会用于对底层结构兼容性做统一封装来简化用户使用。</p>
<h3 id="articleHeader30">使用场景</h3>
<p>为页面文档document对象添加点击事件时，如果直接用onclick来绑定事件，那么如果团队中再有人要为document绑定click事件时，就会把之前绑定的那个时间覆盖，因为这是DOM0级事件。我们应该用DOM2级事件处理程序提供的addEventListener来实现，然而老版本IE是不支持这个方法的，必须用attachEvent，这样如果我们写一个能兼容所有浏览器的方式操作起来就会更方便，这时候就可以用到外观模式。为功能统一但方法不统一的接口提供一个统一的接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 外观模式实现
function addEvent(dom, type, fn) {
    // 对于支持DOM2级事件处理程序的浏览器
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    // 对于不支持addEventListener但支持attachEvent的浏览器
    } else if(dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 外观模式实现</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">dom, type, fn</span>) </span>{
    <span class="hljs-comment">// 对于支持DOM2级事件处理程序的浏览器</span>
    <span class="hljs-keyword">if</span>(dom.addEventListener) {
        dom.addEventListener(type, fn, <span class="hljs-literal">false</span>);
    <span class="hljs-comment">// 对于不支持addEventListener但支持attachEvent的浏览器</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(dom.attachEvent) {
        dom.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        dom[<span class="hljs-string">'on'</span> + type] = fn;
    }
}</code></pre>
<p>解决浏览器兼容问题只是外观模式应用的一部分，很多代码库中都是通过外观模式来封装多个功能，简化底层造作方法的。</p>
<h3 id="articleHeader31">收获与总结</h3>
<p>当一个复杂的系统提供一系列复杂的接口方法时，为系统的管理方便会造成接口方法的使用及其复杂。通过外观模式，对接口进行二次封装可以隐藏其复杂性。</p>
<h2 id="articleHeader32">适配器模式</h2>
<p>听到这个是的名字，有没有想到水管弯弯的场景呢？</p>
<h3 id="articleHeader33">定义</h3>
<p>将一个类（对象）的接口（方法或者属性）转化成另外一个接口，以满足用户需求，使类（对象）之间接口的不兼容问题通过适配器得以解决。</p>
<h3 id="articleHeader34">使用场景</h3>
<p>公司有个活动页面正在使用公司内部开发的A框架，可是很多新来的同事使用A框架开发新的功能需求时总是感觉很吃力，而且能用的方法有限，为了让新同事尽快融入项目的开发，可以引入jQuery框架，由于A框架和jQuery框架很像，这样就可以写一个适配器而不需要将之前的代码全用jQuery写一遍。      <br>适配器模式不仅在编程中很常见，在生活中这种模式也很常见，比如三角插头充电器对于两项插头是不能用的，此时就需要一个三项转两项插头电源适配器，这就是一种适配器模式，其实它就是为了两个代码库所写的代码兼容运行而书写的额外代码。<br>JavaScript中适配器模式还能适配两个代码库，适配参数，适配数据，适配服务端数据等。以参数适配为例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doSomeThing(name, title, age, color, size, prize){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomeThing</span>(<span class="hljs-params">name, title, age, color, size, prize</span>)</span>{}</code></pre>
<p>记住这些参数的顺序是很困难的，所以我们经常是以一个参数对象方式传入的，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * obj.name: name
 * obj.title: title
 * obj.age: age
 * obj.color: color
 * obj.size: size
 * obj.prize: prize
***/
function doSomeThing(obj){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * obj.name: name
 * obj.title: title
 * obj.age: age
 * obj.color: color
 * obj.size: size
 * obj.prize: prize
***/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomeThing</span>(<span class="hljs-params">obj</span>)</span>{}</code></pre>
<p>然而当调用的时候也不能确定传递的参数是否完整，如有一些必须得参数没有传入，一些参数有默认值等，这个时候就可以用适配器来适配传入的参数对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doSomeThing(obj) {
    var _adapter = {
        name: '雨夜清荷',
        title: '设计模式',
        age: 24,
        color: 'pink',
        size: 100,
        prize: 50
    };
    for(var i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomeThing</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> _adapter = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'雨夜清荷'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'设计模式'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>,
        <span class="hljs-attr">color</span>: <span class="hljs-string">'pink'</span>,
        <span class="hljs-attr">size</span>: <span class="hljs-number">100</span>,
        <span class="hljs-attr">prize</span>: <span class="hljs-number">50</span>
    };
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> _adapter) {
        _adapter[i] = obj[i] || _adapter[i];
    }
}</code></pre>
<h3 id="articleHeader35">收获与总结</h3>
<p>JavaScript中的适配器更多应用在对象之间，为了使对象可用，通常会将对象拆分并重新包装，这样就要了解适配器对象的内部结构，这也是与外观模式的区别所在。</p>
<h2 id="articleHeader36">代理模式</h2>
<p>有没有想到牛郎织女鹊桥相会的场景？</p>
<h3 id="articleHeader37">定义</h3>
<p>由于一个对象不能直接引用另一个对象，所以需要通过代理对象在这两个对象之间起到中介作用。</p>
<h3 id="articleHeader38">使用场景</h3>
<p>跨域问题应该是使用代理模式解决的一个最典型的问题。由于用户模块上传的照片量越来越大，导致服务器需要将上传模块重新部署到另外一个域中，这就导致了跨域问题。我们可以将相册页面和上传模块所在的服务器抽象成两个对象，想让跨域两端的对象之间实现通信，就需要找个代理对象来实现他们之间的通信。    <br>代理对象有很多种，简单一点的如img之类的标签通过src可以向其他域下的服务器发送请求。不过这类请求是get请求，是单向的，不会有响应数据。另外一种代理对象的形式是通过script标签。而我们需要的代理对象，是对页面与浏览器间通信的，JSONP就实现了一种代理模式。我们知道src属性可以实现get请求，因此可以在src指向的url地址上添加一些字段信息，服务器获取这些字段信息，相应生成一分内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 前端浏览器页面
<script type=&quot;text/javascript&quot;>
// 回调函数
function jsonpCallBack(res,req) {
    console.log(res,req);
}
</script>
<script type=&quot;text/javascript&quot; src=&quot;http://localhost/test/jsonp.php?callback=jsonp CallBack&amp;data=getJsonPData&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// 前端浏览器页面
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 回调函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">jsonpCallBack</span>(<span class="hljs-params">res,req</span>) </span>{
    <span class="hljs-built_in">console</span>.log(res,req);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://localhost/test/jsonp.php?callback=jsonp CallBack&amp;data=getJsonPData"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 另一个域下的服务器请求接口
<?php
/* 后端获取请求字段数据，并生成返回内容 */
$data = $_GET[&quot;data&quot;];
$callback = $_GET[&quot;callback&quot;];
echo $callback.&quot;('success', '&quot;.$data.&quot;')&quot;;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-comment">// 另一个域下的服务器请求接口</span>
<span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">/* 后端获取请求字段数据，并生成返回内容 */</span>
$data = $_GET[<span class="hljs-string">"data"</span>];
$callback = $_GET[<span class="hljs-string">"callback"</span>];
<span class="hljs-keyword">echo</span> $callback.<span class="hljs-string">"('success', '"</span>.$data.<span class="hljs-string">"')"</span>;
<span class="hljs-meta">?&gt;</span></code></pre>
<p>这种方式可以想象成合理的一只小船，通过小船将你的请求发送给对岸，然后对岸的人们将数据放在小船里为你带回来。</p>
<h3 id="articleHeader39">收获与总结</h3>
<p>代理模式除了在跨域问题中有很多应用外，有时对对象的实例化对资源的开销很大，如页面加载初期加载文件有很多，此时能够延迟加载一些图片对页面首屏加载时间收益是很大的，通过代理可以先加载预览图片然后再加载开销大的图片。    <br>由此可见，代理模式可以解决系统之间耦合度以及系统资源开销大的问题，通过代理对象可以保护被代理对象，使被代理对象不受外界的影响。</p>
<h2 id="articleHeader40">装饰者模式</h2>
<p>显然房子装修就是一种典型的装饰者模式。</p>
<h3 id="articleHeader41">定义</h3>
<p>在不改变原对象的基础上，通过对其进行包装扩展（添加属性或者方法）使原有对象可以满足用户的更复杂需求。</p>
<h3 id="articleHeader42">使用场景</h3>
<p>静止是相对的，运动是绝对的，所以没有一成不变的需求。在实际项目开发中需求总在不断变化，当原有的功能已经不能满足用户的需求时，我们要做的就是在这个基础上添砖加瓦，设置新功能和属性来满足用户提出的需求，这就是装饰者模式要做的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 装饰者
var decorator = function(input, fn) {
    // 获取事件源
    var input = document.getElementById(input);
    // 若事件源已经绑定事件
    if(typeof input.onclick === 'function') {
        // 缓存事件源原有回调函数
        var oldClickFn = input.onclick;
        // 为事件源定义新的事件
        input.onclick = function() {
            // 事件源原有回调函数
            oldClickFn();
            // 执行事件源新增回调函数
            fn();
        }
    } else {
        input.onclick = fn;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 装饰者</span>
<span class="hljs-keyword">var</span> decorator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">input, fn</span>) </span>{
    <span class="hljs-comment">// 获取事件源</span>
    <span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.getElementById(input);
    <span class="hljs-comment">// 若事件源已经绑定事件</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> input.onclick === <span class="hljs-string">'function'</span>) {
        <span class="hljs-comment">// 缓存事件源原有回调函数</span>
        <span class="hljs-keyword">var</span> oldClickFn = input.onclick;
        <span class="hljs-comment">// 为事件源定义新的事件</span>
        input.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 事件源原有回调函数</span>
            oldClickFn();
            <span class="hljs-comment">// 执行事件源新增回调函数</span>
            fn();
        }
    } <span class="hljs-keyword">else</span> {
        input.onclick = fn;
    }
}</code></pre>
<h3 id="articleHeader43">收获与总结</h3>
<p>除了装饰者模式，适配器模式也可以对原有对象进行扩展，所不同的是适配器进行扩展很多时候是对对象内部结构的重组，因此了解其自身结构是必须的。而装饰者模式对对象的扩展是一种良性扩展，不用了解其具体实现，只是在外部进行了一次封装扩展。</p>
<h2 id="articleHeader44">桥接模式</h2>
<p>作者把这种模式比喻成城市间的公路。</p>
<h3 id="articleHeader45">定义</h3>
<p>在系统沿着多个维度变化的同时，又不增加其复杂度并已达到解耦。</p>
<h3 id="articleHeader46">使用场景</h3>
<p>有时候，页面中一些小小细节的改变常常因逻辑相似而导致大片臃肿的代码，让页面苦涩不堪。现在项目有一个需求，是要把页面上部的用户信息添加一些鼠标划过的特效，但是用户信息由很多小组件组成，对于用户名，鼠标划过直接改变背景色，但是像用户等级、用户消息这类部件只能改变里面的数字内容，处理逻辑不太一样。这样就需要写不少代码，但是又会感觉很冗余。这时候，我们首先要提取共同点，对想的抽象逻辑做抽象提取处理。    <br>对于用户信息模块的每一部分鼠标滑过与鼠标离开两个事件的执行函数有很大一部分是相似的，比如它们都处理每个部件中的某个元素，它们都是处理元素的字体颜色和背景颜色。可以创建下面这样一个函数，解除this耦合。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function changeColor(dom, color, bg) {
    // 设置元素的字体颜色
    dom.style.color = color;
    // 设置元素的背景颜色
    dom.style.background = bg;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeColor</span>(<span class="hljs-params">dom, color, bg</span>) </span>{
    <span class="hljs-comment">// 设置元素的字体颜色</span>
    dom.style.color = color;
    <span class="hljs-comment">// 设置元素的背景颜色</span>
    dom.style.background = bg;
}</code></pre>
<p>接下来就是对具体元素绑定时间了，但是仅仅知道元素事件绑定与抽象提取的设置样式方法changeColor是不够的，需要用一个方法将他们链接起来，这个方法就是桥接方法，这种模式就是桥接模式。就像你开着车去沈阳，那么你就需要找到一条连接北京与沈阳的公路，才能顺利往返两地。    <br>对于事件的桥接方法，可以用一个匿名函数来代替。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spans = document.getElementsByTagName('span');
spans[0].onmouseover = function() {
    changeColor(this, 'red', '#ddd');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spans = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'span'</span>);
spans[<span class="hljs-number">0</span>].onmouseover = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    changeColor(<span class="hljs-keyword">this</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'#ddd'</span>);
}</code></pre>
<h3 id="articleHeader47">收获与总结</h3>
<p>桥接模式最主要的特点是将实现层（如元素绑定事件）与抽象层（如修饰页面UI逻辑）解耦分离，使两部分可以独立变化，桥接模式主要是对结构之间的解耦。</p>
<h2 id="articleHeader48">组合模式</h2>
<p>作者把组合模式比喻成超值午餐，感觉很形象。</p>
<h3 id="articleHeader49">定义</h3>
<p>又称部分-整体模式，将对象组合成树形结构以表示“部分整体”的层级结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。</p>
<h3 id="articleHeader50">使用场景</h3>
<p>为强化首页用户体验，项目经理准备在用户首页添加一个新闻模块，当然新闻的内容是根据用户平时关注的内容挖掘的，因此有的人可能会显示文字新闻，有的人可能会是图片新闻等等。    <br>我们先来仔细分析下这个需求，需求中的这些新闻大致可以分为相互独立的几种类型，对某类新闻做修改时不会影响到其他类的新闻，这样可以将每一类新闻抽象成面向对象编程中的一个类，然后在这些新闻类中挑选一些组合成需要的模块，这时候就可以用组合模式了。      <br>在页面中，组合模式更常用在创建表单上，比如注册页面可能有不同的表单提交模块。对于这些需求，我们只需要有一个基本的个体，然后通过一定的组合即可实现。</p>
<h3 id="articleHeader51">收获与总结</h3>
<p>组合模式能够给我们提供一个清晰的组成结构，组合对象类通过继承同一个父类使其具有统一的方法，这样也方便了统一管理与使用。</p>
<h2 id="articleHeader52">享元模式</h2>
<p>作者把享元模式比喻成城市公交车，可以仔细思考一番。</p>
<h3 id="articleHeader53">定义</h3>
<p>运用共享技术有效地支持大量的细粒度的对象，避免对象间拥有相同内容造成多余的开销。</p>
<h3 id="articleHeader54">使用场景</h3>
<p>现在有新闻的内容太多，我们有了一个分页显示所有新闻的需求。一个简单直观的做法就是页面加载后异步请求新闻数据，然后创建所有条新闻插入页面中，需要显示哪一页就显示哪一页。但是这样做有一个很大的问题，这样一下子创建几百条新闻同时插入页面会造成多页的开销严重影响网页的性能。这里的所有新闻都有相似的结构，只是内容不同罢了，对于这种相同结构造成多余开销的问题，可以用享元模式来解决。     <br><strong>享元模式</strong> 主要是对其数据、方法共享分离，将数据和方法分成内部数据、内部方法和外部数据、外部方法。内部方法与内部数据指的是相似或共有的数据和方法，所以将其提取出来减少开销。上面例子中，所有新闻个体都有共同的结构，应该作为内部数据，而下一页按钮绑定的事件则是外部方法。同时为了使用内部数据还需要提供一个操作方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Flyweight = function() {
    // 已创建的元素
    var created = [];
    // 创建一个新闻包装容器
    function create() {
        var dom = document.createElement('div');
        // 将容器插入新闻列表容器中
        document.getElementById('container').appendChild(dom);
        // 缓存新创建的元素
        created.push(dom);
        // 返回创建的新元素
        return dom;
    }
    return {
        // 获取创建新闻元素方法
        getDiv: function() {
            // 如果已创建的元素小于当前页元素总个数(5个)，则创建
            if(created.length < 5) {
                return created();
            } else {
                // 获取第一个元素，并插入去后面
                var div = created.shift();
                created.push(div);
                return div;
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Flyweight = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 已创建的元素</span>
    <span class="hljs-keyword">var</span> created = [];
    <span class="hljs-comment">// 创建一个新闻包装容器</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> dom = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
        <span class="hljs-comment">// 将容器插入新闻列表容器中</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>).appendChild(dom);
        <span class="hljs-comment">// 缓存新创建的元素</span>
        created.push(dom);
        <span class="hljs-comment">// 返回创建的新元素</span>
        <span class="hljs-keyword">return</span> dom;
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 获取创建新闻元素方法</span>
        getDiv: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 如果已创建的元素小于当前页元素总个数(5个)，则创建</span>
            <span class="hljs-keyword">if</span>(created.length &lt; <span class="hljs-number">5</span>) {
                <span class="hljs-keyword">return</span> created();
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 获取第一个元素，并插入去后面</span>
                <span class="hljs-keyword">var</span> div = created.shift();
                created.push(div);
                <span class="hljs-keyword">return</span> div;
            }
        }
    }
}</code></pre>
<p>上面创建一个享元类，由于每页只能显示5条新闻，所以创建5个元素，保存在享元类内部，可以通过getDiv方法来获取创建的元素。下面就要实现外部数据和外部方法，外部数据就是我们要显示的所有新闻内容，由于每个内容都不一样肯定不能共享。首先，我们要根据新闻内容实例化页面，然后，对下一页绑定一个点击事件，显示下一页。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var paper = 0,
    num = 5,
    len = article.length;
// 添加五条新闻
for(var i = 0; i < 5; i++) {
    if(article[i])
        // 通过享元类获取创建的元素并写入新闻内容
        Flyweight.getDiv().innerHTML = article[i];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> paper = <span class="hljs-number">0</span>,
    num = <span class="hljs-number">5</span>,
    len = article.length;
<span class="hljs-comment">// 添加五条新闻</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
    <span class="hljs-keyword">if</span>(article[i])
        <span class="hljs-comment">// 通过享元类获取创建的元素并写入新闻内容</span>
        Flyweight.getDiv().innerHTML = article[i];
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下一页按钮绑定事件
document.getElementById('next_page').onclick = function() {
    // 如果新闻内容不足5条则返回
    if(article.length < 5) {
        return;
    }
    var n = ++paper * num % len,  // 获取当前页的第一条新闻索引
        j = 0;
    // 插入5条新闻
    for(; j < 5; j++) {
        // 如果存在n+j条则插入
        if(article[n + j]) {
            Flyweight.getDiv().innerHTML = article[n + j];
        // 否则插入起始位置第n+j-len条
        } else if(article[n + j - len]) {
            Flyweight.getDiv().innerHTML = article[n + j - len];
        } else {
            Flyweight.getDiv().innerHTML = &quot;&quot;;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 下一页按钮绑定事件</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'next_page'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 如果新闻内容不足5条则返回</span>
    <span class="hljs-keyword">if</span>(article.length &lt; <span class="hljs-number">5</span>) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">var</span> n = ++paper * num % len,  <span class="hljs-comment">// 获取当前页的第一条新闻索引</span>
        j = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 插入5条新闻</span>
    <span class="hljs-keyword">for</span>(; j &lt; <span class="hljs-number">5</span>; j++) {
        <span class="hljs-comment">// 如果存在n+j条则插入</span>
        <span class="hljs-keyword">if</span>(article[n + j]) {
            Flyweight.getDiv().innerHTML = article[n + j];
        <span class="hljs-comment">// 否则插入起始位置第n+j-len条</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(article[n + j - len]) {
            Flyweight.getDiv().innerHTML = article[n + j - len];
        } <span class="hljs-keyword">else</span> {
            Flyweight.getDiv().innerHTML = <span class="hljs-string">""</span>;
        }
    }
}</code></pre>
<p>这样用享元模式对页面重构之后每次操作只需要操作5个元素，这样性能可以提高很多。</p>
<h3 id="articleHeader55">收获与总结</h3>
<p>享元模式的应用是为了提高程序的执行效率与系统性能，因此在大型系统开发中应用比较广泛，可以避免程序中的数据重复。应用时一定要找准内部状态与外部状态，这样才能更合理地提取分离。</p>
<h1 id="articleHeader56">行为型设计模式</h1>
<p>行为型设计模式用于不同对象之间职责划分或算法抽象，行为型设计模式不仅仅涉及类和对象，还涉及类或对象之间的交流模式并加以实现。行为型设计模式主要有模板方法模式，观察者模式，状态模式，策略模式，职责链模式，命令模式，访问者模式，中介者模式，备忘录模式，迭代器模式和解释器模式，这么多的模式真得好好消化一阵子了。</p>
<h2 id="articleHeader57">模板方法模式</h2>
<p>作者把这种模式比喻成照猫画虎。</p>
<h3 id="articleHeader58">定义</h3>
<p>父类中定义一组操作算法骨架，而将一些实现步骤延迟到子类，使得子类可以不改变父类算法结构的同时可重新定义算法中某些实现步骤。</p>
<h3 id="articleHeader59">使用场景</h3>
<p>提示框归一化，一个网站有很多页面，如果每个页面的弹出框样式不太一致就会显得不是很和谐，需要将他们的样式统一。新手最直观的想法就是去每个页面一个个修改，当然这样的代价是很大的，我们需要写一个弹出框插件，将这些弹出框封装好，然后再各个页面调用即可。这是在这个插件中就可以使用模板方法模式了，不需要重复写多个样式。      <br>模板方法模式就是将多个模型抽象画归一，从中抽象出一个最基本的模板，这个模板可以作为实体也可以作为抽象对象，其他模块只需要继承这个模板方法，也可以扩展某些方法。     <br>打个比方，我们生活中用蛋糕做模具做蛋糕，做出的蛋糕是外形相同的，因为他们都用同一个模具。然而商店里面卖的蛋糕是各式各样的，这都是对蛋糕的二次加工。我们的需求中基本提示框就是我们抽象出来的模具，其他提示框比这个提示框要多一些功能，我们只需要对他们做一些二次加工就能满足需求了。     <br>模板方法不仅在归一化组件时使用，有时候创建页面时也是很常用的，比如创建三类导航，第一类是基础的，第二类是多了消息提醒功能的，第三类多了后面显示网址功能。这也可以用模板方法实现，此时抽象出来的基类是最简单的基础导航类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 格式化字符串方法
function formateString(str, data) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
        return typeof data[key] === undefined ? '': data[key]
    });
}
// 基础导航
var Nav = function(data) {
    // 基础导航样式模板
    this.item = '<a href=&quot;{#href#}&quot; title=&quot;{#title#}&quot;>{#name#}</a>';
    // 创建字符串
    this.html = '';
    // 格式化数据
    for(var i = 0, len = data.length; i < len; i++) {
        this.html += formateString(this.item, data[i]);
    }
    // 返回字符串数据
    return this.html;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 格式化字符串方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formateString</span>(<span class="hljs-params">str, data</span>) </span>{
    <span class="hljs-keyword">return</span> str.replace(<span class="hljs-regexp">/\{#(\w+)#\}/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match, key</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> data[key] === <span class="hljs-literal">undefined</span> ? <span class="hljs-string">''</span>: data[key]
    });
}
<span class="hljs-comment">// 基础导航</span>
<span class="hljs-keyword">var</span> Nav = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 基础导航样式模板</span>
    <span class="hljs-keyword">this</span>.item = <span class="hljs-string">'&lt;a href="{#href#}" title="{#title#}"&gt;{#name#}&lt;/a&gt;'</span>;
    <span class="hljs-comment">// 创建字符串</span>
    <span class="hljs-keyword">this</span>.html = <span class="hljs-string">''</span>;
    <span class="hljs-comment">// 格式化数据</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = data.length; i &lt; len; i++) {
        <span class="hljs-keyword">this</span>.html += formateString(<span class="hljs-keyword">this</span>.item, data[i]);
    }
    <span class="hljs-comment">// 返回字符串数据</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.html;
}</code></pre>
<p>对于消息提醒导航类，只需额外添加消息提醒组件模板，并与消息提醒组件模板对传入的网址数据进行装饰，得到所需的字符串，在调用从基类继承的方法处理这些字符串即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var NumNav = function(data) {
    // 消息提醒信息组件模板
    var tpl = '<b>{#num#}</b>';
    // 装饰数据
    for(var i = data.length - 1; i >= 0; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    // 继承基础导航类
    return Nav.call(this, data);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> NumNav = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// 消息提醒信息组件模板</span>
    <span class="hljs-keyword">var</span> tpl = <span class="hljs-string">'&lt;b&gt;{#num#}&lt;/b&gt;'</span>;
    <span class="hljs-comment">// 装饰数据</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = data.length - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
        data[i].name += data[i].name + formateString(tpl, data[i]);
    }
    <span class="hljs-comment">// 继承基础导航类</span>
    <span class="hljs-keyword">return</span> Nav.call(<span class="hljs-keyword">this</span>, data);
}</code></pre>
<h3 id="articleHeader60">收获与总结</h3>
<p>模板方法的核心在于对方法的重用，将核心方法封装在基类中，让子类继承基类的方法，实现基类方法的共享，达到方法共用。子类继承的方法是可扩展的，这就需要对基类继承的方法进行重写。</p>
<h2 id="articleHeader61">观察者模式</h2>
<p>作者把这种模式比喻成通信卫星。</p>
<h3 id="articleHeader62">定义</h3>
<p>又被称作发布-订阅模式或消息机制，定义了一种依赖关系，解决了主体对象与观察者之间功能的耦合。</p>
<h3 id="articleHeader63">使用场景</h3>
<p>在团队开发中，经常是一个人负责一个模块，那么每人负责的模块之间要如何进行沟通呢？比如你实现一些需求需要添加一些代码，但是这个需求需要其他模块配合，但是每个模块都是不同人写的，你不想因为新添加的代码影响到他人实现的功能，这个时候就需要用到观察者模式了。      <br>观察者模式就是为了解决主体对象与观察者之间的耦合。打个比方，目前每个国家都在研发并发射卫星，发射这些卫星是为了监控一些信息，那么它就可以被看做一个观察者或者说是一个消息系统，如果让这颗卫星为飞机导航，那么这架飞机就是一个被观察者或者说是一个主体对象。那么如果地面上的中转站或者其他飞机需要知道这架飞机的信息，于是每当飞机到达一个地方时就会向卫星发出位子信息，然后卫星又将信息广播到已经订阅这架飞机的中转站，这样就可以避免一些飞机事故发生。      <br>这时候，观察者至少需要有两个方法，一个是接收某架飞机发来的消息，一个是向订阅的中转站发送响应消息。但是，并不是每个中转站都要时刻监控飞机状态的，所以还需要一个取消注册的方法。当然这些消息还需要保存，就需要一个保存消息的容器。这时候观察者雏形就出来了，他有一个消息容器和三个方法，订阅消息方法，取消订阅消息方法，发送订阅消息方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Observer = (function() {
    // 防止消息队列暴露而被篡改，故将消息容器作为静态私有变量保存
    var __messages = {};
    return {
        // 注册信息接口
        regist: function() {},
        // 发布信息接口
        fire: function() {},
        // 移除信息接口
        remove: function() {}
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Observer = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 防止消息队列暴露而被篡改，故将消息容器作为静态私有变量保存</span>
    <span class="hljs-keyword">var</span> __messages = {};
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 注册信息接口</span>
        regist: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 发布信息接口</span>
        fire: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 移除信息接口</span>
        remove: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    }
})();</code></pre>
<p>下面就是可以自己具体实现这些接口了。</p>
<h3 id="articleHeader64">收获与总结</h3>
<p>观察者模式最主要是解决类或对象之间的耦合，解耦两个互相依赖的对象，使其依赖于观察者的消息机制。这样对于任何一个订阅者来说，其他订阅者对象的改变不会影响到自身，其自身既可以是消息的发出者也可以是消息的执行者，这都依赖于调用观察者对象中的三种方法（订阅，注销，发布消息）中的哪一种。</p>
<h2 id="articleHeader65">状态模式</h2>
<p>作者把这种模式比喻成超级玛丽。</p>
<h3 id="articleHeader66">定义</h3>
<p>当一个对象内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对像。</p>
<h3 id="articleHeader67">使用场景</h3>
<p>平时写代码的时候经常会遇到要写很多条件判断语句的情况，那么怎么减少代码中的条件判断语句呢？对于这类分支条件内部独立结果的管理，可以使用状态模式，每一种条件作为对象的一种状态，面对不同的判断结果，其实就是选择对象内的一种状态。      <br>将不同的判断结果封装在状态对象内，然后该状态对象返回一个可被调用的接口方法，用于调用状态对象内部的某种方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 投票结果状态对象
var ResultState = function() {
    // 判断结果保存在内部状态中
    var States = {
        // 每种状态作为一种独立方法保存
        state0: function() {
            console.log('这是第一种情况')：
        },
        state1: function() {
            console.log('这是第二种情况')：
        },
        state2: function() {
            console.log('这是第三种情况')：
        },
        state3: function() {
            console.log('这是第四种情况')：
        }
    }
    // 获取某种状态并执行对应方法
    function show(result) {
        States['state' + result] &amp;&amp; States['state' + result]();
    }
    return {
        // 返回调用状态方法接口
        show: show
    }
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 投票结果状态对象</span>
<span class="hljs-keyword">var</span> ResultState = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 判断结果保存在内部状态中</span>
    <span class="hljs-keyword">var</span> States = {
        <span class="hljs-comment">// 每种状态作为一种独立方法保存</span>
        state0: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是第一种情况'</span>)：
        },
        <span class="hljs-attr">state1</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是第二种情况'</span>)：
        },
        <span class="hljs-attr">state2</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是第三种情况'</span>)：
        },
        <span class="hljs-attr">state3</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这是第四种情况'</span>)：
        }
    }
    <span class="hljs-comment">// 获取某种状态并执行对应方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">show</span>(<span class="hljs-params">result</span>) </span>{
        States[<span class="hljs-string">'state'</span> + result] &amp;&amp; States[<span class="hljs-string">'state'</span> + result]();
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 返回调用状态方法接口</span>
        show: show
    }
}();</code></pre>
<p>想调用第三种结果就可以如下调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ResultState.show(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">ResultState.show(<span class="hljs-number">3</span>);</code></pre>
<p>对于状态模式，主要目的就是将条件判断的不同结果转化为状态对象的内部状态，这个内部状态一般作为状态对象的私有变量，然后提供一个能够调用状态对象内部状态的接口方法对象即可。</p>
<h3 id="articleHeader68">收获与总结</h3>
<p>状态模式既是解决程序中臃肿的分支判断语句问题，将每一个分支转化为一种状态独立出来，方便每种状态的管理又不至于每次只需时遍历所有分支。</p>
<h2 id="articleHeader69">策略模式</h2>
<p>作者把这种模式比喻成活诸葛。</p>
<h3 id="articleHeader70">定义</h3>
<p>将定义的一组算法封装起来，使其相互之间可以替换。封装的算法具有一定独立性，不会随客户端变化而变化。</p>
<h3 id="articleHeader71">使用场景</h3>
<p>年底的时候，公司商品展销页都要开展大促销活动。在圣诞节，一部分商品5折出售，一部分商品8折出售，一部分商品9折出售，到元旦搞个幸运反馈活动，普通用户满100返30，高级VIP用户满100返50。这个时候上面的状态模式就不适用了，因为每一天每一个商品只有一种促销情况，这个时候可以用策略模式。        <br>结构上看，它与状态模式很像，也是在内部封装一个对象，然后通过返回的接口对象实现实现对内部对象的调用，不同点是，策略模式不需要管理状态、状态间没有依赖关系、策略之剑可以相互替换、在策略对象内部保存的是相互独立的一些算法。看看策略对象的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 价格策略对象
var PriceStrategy = function() {
    // 内部算法对象
    var strategy = {
        // 100返30
        return30: function(price) {},
        // 100返50
        return50: function(price) {},
        // 9折
        percent90: function(price) {},
        // 8折
        percent80: function(price) {},
        // 5折
        percent50: function(price) {},
    }
    // 策略算法调用接口
    return function(algorithm, price) {
        return strategy[algorithm] &amp;&amp; strategy[algorithm](price);
    }
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 价格策略对象</span>
<span class="hljs-keyword">var</span> PriceStrategy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 内部算法对象</span>
    <span class="hljs-keyword">var</span> strategy = {
        <span class="hljs-comment">// 100返30</span>
        return30: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>) </span>{},
        <span class="hljs-comment">// 100返50</span>
        return50: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>) </span>{},
        <span class="hljs-comment">// 9折</span>
        percent90: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>) </span>{},
        <span class="hljs-comment">// 8折</span>
        percent80: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>) </span>{},
        <span class="hljs-comment">// 5折</span>
        percent50: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">price</span>) </span>{},
    }
    <span class="hljs-comment">// 策略算法调用接口</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">algorithm, price</span>) </span>{
        <span class="hljs-keyword">return</span> strategy[algorithm] &amp;&amp; strategy[algorithm](price);
    }
}();</code></pre>
<h3 id="articleHeader72">收获与总结</h3>
<p>策略模式主要特色是创建一系列策略算法，每组算法处理业务都是相同的，只是处理的过程或者处理的结果不一样，所以它们是可以相互替换的，这样就解决了算法与使用者之间的耦合。</p>
<h2 id="articleHeader73">职责链模式</h2>
<p>作者把这种模式比喻成一个有序车站。</p>
<h3 id="articleHeader74">定义</h3>
<p>解决请求的发送者与请求的接受者之间的耦合，通过职责链上的多个对象对分解请求流程，实现请求在多个对象之间的传递，知道最后一个对象完成请求的处理。</p>
<h3 id="articleHeader75">使用场景</h3>
<p>项目经理准备改善页面中的输入验证与提示交互体验。如用户在输入框输入信息后，在输入框的下面提示出一些备选项，当用户输入完成后，则要对用户输入信息进行验证等，页面中很多模块需要用户提交信息，为增强用户体验，这些输入框大部分需要具备以上两种功能。现在需要完成这个需求，但是以后可能要对原有表单交互体验做一些修改，也就是这是一个半成品需求。这种情况下，我们需要将需求里面需要做的每一件事情独立出来，这样完整的需求就变成一个个相互独立的模块需求，这样就不会因为以后需求的改变而影响我们项目的进展，这样还有利于以后的单元测试。这其实就是一种职责链模式。      <br>对于上面的需求，对输入框绑定事件是第一部分，第二部分是创建xhr进行异步数据获取，第三部分就是适配响应数据，将接收到的数据格式化成可处理的形式，最后一部分是向组件创建器传入相应数据生成组件。</p>
<h3 id="articleHeader76">收获与总结</h3>
<p>职责链模式定义了请求的传递方向，通过多个对象对请求的传递，实现一个复杂的逻辑操作。因此职责链模式将负责的需求颗粒化逐一实现每个最小分内的需求，并将请求顺序地传递。对于职责链上的每一个对象来说，它可能是请求的发起者也可能是请求的接收者，通过这种方式不仅仅简化原对象的复杂度，而且解决原请求的发起者与原请求的接收者之间的耦合。</p>
<h2 id="articleHeader77">命令模式</h2>
<h3 id="articleHeader78">定义</h3>
<p>将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端的实现参数化。</p>
<h3 id="articleHeader79">使用场景</h3>
<p>现在的需求是要做一个活动页面，平铺式的结构，不过页面的每个模块都有些相似的地方，比如每个预览产品图片区域，都有一行标题，然后标题下面是产品图片，只是图片的数量与排列不同。我们需要一种自由创建视图模块的方法，有时候创建多张图片有时候只创建一张图片，这时候可以试试命令模式。      <br>命令模式是将创建模块的逻辑封装在一个对象里，这个对象提供一个参数化的请求接口，通过调用这个接口并传递一些参数实现调用命令对象内部中的一些方法。请求部分很简单，只需要按照给定参数格式书写指令即可，所以实现部分的封装才是重点，因为它要为请求部分提供所需方法。       <br>那么哪些对象需要被命令化呢？既然需要动态展示不同模块，所以创建元素这一需求就是变化的，因此创建元素方法、展示方法应该被命令化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 模块实现模块
var viewCommand = (function() {
    var tpl = {
        // 展示图片结构模块
        product: [
            '<div>',.....,'</div>'
        ].join(''),
        // 展示标题结构模块
        title: [
        '<div>',.....,'</div>'
        ].join(''),
    },
    // 格式化字符串缓存字符串
    html = '';
    // 格式化字符串
    function formateString(str, obj) {}
    // 方法集合
    var Action = {
        // 创建方法
        create: function(data, view) {
            // 解析数据
            if(data.length) {
                // 遍历
                for(var i = 0, len = data.length; i < len; i++) {
                    html += formateString(tpl[view], data[i]);
                }
            } else {
                html += formateString(tpl[view], data);
            }
        },
        // 展示方法
        display: function(container, data, vuew) {
            // 如果传入数据
            if(data) {
                // 根据给的数据创建视图
                this.create(data, view);
            }
            // 展示模块
            document.getElementById(container).innerHTML = html;
            // 展示后清空缓存字符串
            html = '';
        }
    }
    // 命令接口
    return function excute(msg) {
        // 解析命令，如果msg.param不是数组则将其转化为数组
        msg.param = Object.prototype.toString.call(msg.param) === &quot;[object Array]&quot; ? msg.param : [msg.param];
        // Action内部调用的方法引用this，此处保证作用域this执行传入Action
        Action[msg.command].apply(Action, msg.param)
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 模块实现模块</span>
<span class="hljs-keyword">var</span> viewCommand = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> tpl = {
        <span class="hljs-comment">// 展示图片结构模块</span>
        product: [
            <span class="hljs-string">'&lt;div&gt;'</span>,.....,<span class="hljs-string">'&lt;/div&gt;'</span>
        ].join(<span class="hljs-string">''</span>),
        <span class="hljs-comment">// 展示标题结构模块</span>
        title: [
        <span class="hljs-string">'&lt;div&gt;'</span>,.....,<span class="hljs-string">'&lt;/div&gt;'</span>
        ].join(<span class="hljs-string">''</span>),
    },
    <span class="hljs-comment">// 格式化字符串缓存字符串</span>
    html = <span class="hljs-string">''</span>;
    <span class="hljs-comment">// 格式化字符串</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formateString</span>(<span class="hljs-params">str, obj</span>) </span>{}
    <span class="hljs-comment">// 方法集合</span>
    <span class="hljs-keyword">var</span> Action = {
        <span class="hljs-comment">// 创建方法</span>
        create: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, view</span>) </span>{
            <span class="hljs-comment">// 解析数据</span>
            <span class="hljs-keyword">if</span>(data.length) {
                <span class="hljs-comment">// 遍历</span>
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = data.length; i &lt; len; i++) {
                    html += formateString(tpl[view], data[i]);
                }
            } <span class="hljs-keyword">else</span> {
                html += formateString(tpl[view], data);
            }
        },
        <span class="hljs-comment">// 展示方法</span>
        display: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">container, data, vuew</span>) </span>{
            <span class="hljs-comment">// 如果传入数据</span>
            <span class="hljs-keyword">if</span>(data) {
                <span class="hljs-comment">// 根据给的数据创建视图</span>
                <span class="hljs-keyword">this</span>.create(data, view);
            }
            <span class="hljs-comment">// 展示模块</span>
            <span class="hljs-built_in">document</span>.getElementById(container).innerHTML = html;
            <span class="hljs-comment">// 展示后清空缓存字符串</span>
            html = <span class="hljs-string">''</span>;
        }
    }
    <span class="hljs-comment">// 命令接口</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">excute</span>(<span class="hljs-params">msg</span>) </span>{
        <span class="hljs-comment">// 解析命令，如果msg.param不是数组则将其转化为数组</span>
        msg.param = <span class="hljs-built_in">Object</span>.prototype.toString.call(msg.param) === <span class="hljs-string">"[object Array]"</span> ? msg.param : [msg.param];
        <span class="hljs-comment">// Action内部调用的方法引用this，此处保证作用域this执行传入Action</span>
        Action[msg.command].apply(Action, msg.param)
    }
})();</code></pre>
<p>下面就可以测试这个命令对象了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var productData = [
    {
        src: 'command/02.jpg',
        text: '绽放的桃花'
    },
    {
        src: 'command/03.jpg',
        text: '阳光下的温馨'
    }
],
// 模块标题数据
titleData = {
    title: '夏日里的一片温馨',
    tips: '暖暖的温情带给人们家的感觉'
}
// 调用命令对象
viewCommand({
    command: 'display',
    param: ['title', titleData, 'title']
});
viewCommand({
    command: 'create',
    param: ['product', productData, 'product']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> productData = [
    {
        <span class="hljs-attr">src</span>: <span class="hljs-string">'command/02.jpg'</span>,
        <span class="hljs-attr">text</span>: <span class="hljs-string">'绽放的桃花'</span>
    },
    {
        <span class="hljs-attr">src</span>: <span class="hljs-string">'command/03.jpg'</span>,
        <span class="hljs-attr">text</span>: <span class="hljs-string">'阳光下的温馨'</span>
    }
],
<span class="hljs-comment">// 模块标题数据</span>
titleData = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'夏日里的一片温馨'</span>,
    <span class="hljs-attr">tips</span>: <span class="hljs-string">'暖暖的温情带给人们家的感觉'</span>
}
<span class="hljs-comment">// 调用命令对象</span>
viewCommand({
    <span class="hljs-attr">command</span>: <span class="hljs-string">'display'</span>,
    <span class="hljs-attr">param</span>: [<span class="hljs-string">'title'</span>, titleData, <span class="hljs-string">'title'</span>]
});
viewCommand({
    <span class="hljs-attr">command</span>: <span class="hljs-string">'create'</span>,
    <span class="hljs-attr">param</span>: [<span class="hljs-string">'product'</span>, productData, <span class="hljs-string">'product'</span>]
});</code></pre>
<p>有了命令模式，想创建任何页面视图都是一件很简单的事情。</p>
<h3 id="articleHeader80">收获与总结</h3>
<p>命令模式是将执行的命令封装，解决命令发起者与命令执行者之间的耦合，每一条命令实质上是一个操作。命令的是使用者不必了解命令执行者的命令接口是如何实现的，只需要知道如何调用。</p>
<h2 id="articleHeader81">访问者模式</h2>
<p>作者把这种模式比喻成驻华大使。</p>
<h3 id="articleHeader82">定义</h3>
<p>针对于对象结构中的元素，定义在不改变对象的前提下访问结构中元素的新方法。</p>
<h3 id="articleHeader83">使用场景</h3>
<p>用DOM2级事件为页面中元素绑定事件时，为css设置一些样式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bindEvent = function(dom, type, fn) {
    if(dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if(dom.attachEvent) {
        dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
}
var demo = document.getElementById('demo');
bindEvent(demo, 'click', function() {
    this.style.background = 'red';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> bindEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom, type, fn</span>) </span>{
    <span class="hljs-keyword">if</span>(dom.addEventListener) {
        dom.addEventListener(type, fn, <span class="hljs-literal">false</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(dom.attachEvent) {
        dom.attachEvent(<span class="hljs-string">'on'</span> + type, fn);
    } <span class="hljs-keyword">else</span> {
        dom[<span class="hljs-string">'on'</span> + type] = fn;
    }
}
<span class="hljs-keyword">var</span> demo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'demo'</span>);
bindEvent(demo, <span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.style.background = <span class="hljs-string">'red'</span>;
});</code></pre>
<p>这个在IE浏览器中会出问题，因为IE的attachEvent事件中this指向的竟然是window而不是这个元素，所以如果想获取事件对象必须用window.e来获取。这个问题可以借用访问者模式来解决。       <br>访问者模式的思想是我们在不改变操作对象的同时，为它添加新的操作方法，来实现对操作对象的访问。下面看看IE的实现方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindIEEvent(dom, type, fn, data) {
    var data = data || {};
    dom.attachEvent('on' + type, function(e){
        fn.call(dom, e, data);
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindIEEvent</span>(<span class="hljs-params">dom, type, fn, data</span>) </span>{
    <span class="hljs-keyword">var</span> data = data || {};
    dom.attachEvent(<span class="hljs-string">'on'</span> + type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        fn.call(dom, e, data);
    });
};</code></pre>
<p>上面实现方法的核心就是调用call方法，call方法的作用就是更改函数执行时的作用域，这正是访问者模式的精髓。</p>
<h3 id="articleHeader84">收获与总结</h3>
<p>访问者模式解决数据与数据操作方法之间的耦合，将数据的操作方法独立于数据，使其可以自由化演变。访问者更适合那些数据稳定但是数据的操作方法易变的环境下。</p>
<h2 id="articleHeader85">中介者模式</h2>
<p>作者把这种模式比喻成媒婆，好吧，我笑了这里。</p>
<h3 id="articleHeader86">定义</h3>
<p>通过中介者对象封装一系列对象之间的交互，是对象之间不再相互引用，降低他们之间的耦合。有时中介者对象也可以改变对象之间的交互。</p>
<h3 id="articleHeader87">使用场景</h3>
<p>项目经理准备在用户首页上的导航模块添加一个设置层，让用户可以通过设置层来设置导航展开样式。但是页面中好多模块都有导航，这要改起来工作量也很大，上面讲的观察者模式虽然能解决模块之间的耦合，但是这里我们并没有需要向设置层发送请求的需求，设置层只是单向控制导航模块内导航的样式。这样的单向通信就可以使用中介者模式。     <br>观察者模式和中介者模式都是通过消息收发机制实现，不过在观察者模式中，一个对象既可以是消息的发送者也可以是消息的接收者，而中介者模式中消息的发送方只有一个就是中介者对象，而且中介者对象不能订阅消息，只有那些活跃对象（订阅者）才能订阅中介者消息。      <br>如果用中介者模式来解决上面的问题，那么中介者对象就是设置层模块对象，它负责向各个导航模块对象发送用户设置消息，而各个导航模块则应该作为消息的订阅者存在，实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 中介者对象
var Mediator = function() {
    // 消息对象
    var _msg = {};
    return {
        // 订阅消息方法，type:消息名称 action:消息回调函数
        register: function(type, action) {
            // 如果消息存在
            if(_msg[type])
                // 存入回调函数
                _msg[type].push(action);
            else {
                // 不存在则建立消息容器
                _msg[type] = [];
                _msg[type].push(action);
            }
        },
        // 发布消息方法
        send: function(type) {
            // 如果该消息已经被订阅
            if(_msg[type]) {
                // 遍历已存储的消息回调函数
                for(var i = 0, len = _msg[type].length; i < len; i++) {
                    // 执行回调函数
                    _msg[type][i] &amp;&amp; _msg[type][i]();
                }
            }
        }
    }
}();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 中介者对象</span>
<span class="hljs-keyword">var</span> Mediator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 消息对象</span>
    <span class="hljs-keyword">var</span> _msg = {};
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 订阅消息方法，type:消息名称 action:消息回调函数</span>
        register: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type, action</span>) </span>{
            <span class="hljs-comment">// 如果消息存在</span>
            <span class="hljs-keyword">if</span>(_msg[type])
                <span class="hljs-comment">// 存入回调函数</span>
                _msg[type].push(action);
            <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 不存在则建立消息容器</span>
                _msg[type] = [];
                _msg[type].push(action);
            }
        },
        <span class="hljs-comment">// 发布消息方法</span>
        send: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">type</span>) </span>{
            <span class="hljs-comment">// 如果该消息已经被订阅</span>
            <span class="hljs-keyword">if</span>(_msg[type]) {
                <span class="hljs-comment">// 遍历已存储的消息回调函数</span>
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = _msg[type].length; i &lt; len; i++) {
                    <span class="hljs-comment">// 执行回调函数</span>
                    _msg[type][i] &amp;&amp; _msg[type][i]();
                }
            }
        }
    }
}();</code></pre>
<p>这样就创建了一个中介者对象，下面就可以利用这个中介者对象完成我们的需求了。</p>
<h3 id="articleHeader88">收获与总结</h3>
<p>同观察者模式一样，中介者模式的主要业务也是通过模块间或者对象间的复杂通信，来解决模块间或对象间的耦合。在中介者模式中，订阅者是单向的，只能是订阅者而不能是发布者。而消息统一由中介者对象发布。</p>
<h2 id="articleHeader89">备忘录模式</h2>
<h3 id="articleHeader90">定义</h3>
<p>在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部状态以便日后对象使用或者对象恢复到以前的某个状态。</p>
<h3 id="articleHeader91">使用场景</h3>
<p>在前面提到的新闻页面中，有上一页和下一页的按钮，页面的内容是用异步请求获取的。如果点击下一页按钮接着再点击上一页那么之前那一页又要进行一次异步请求，这是多余的操作。因为第一次已经获取了数据，不需要再发送多余的请求。这个时候可以用备忘录模式来缓存请求过的数据。也就是说每次发生请求的时候对当前状态做一次记录，将请求到的数据以及对应得页码缓存下来，如果之后返回到之前浏览过的页面，直接在缓存中查询即可，不用发生异步请求。先创建一个新闻缓存器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Page备忘录类
var Page = function() {
    // 信息缓存对象
    var cache = {};
    return function(page, fn) {
        // 判断该页数据是否在缓存中
        if(cache[page]) {
            // 显示该页内容
            showPage(page, cache[page]);
            // 执行成功回调函数
            fn &amp;&amp; fn();
        } else {
            // 否则异步请求
            $.post('./data/getNewsData.php', {
                page: page
            }, function(res) {
                // 成功返回
                if(res.errNo == 0) {
                    showPage(page, res.data);
                    cache[page] = res.data;
                    fn &amp;&amp; fn();
                } else {
                    // 处理异常
                }
            })
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Page备忘录类</span>
<span class="hljs-keyword">var</span> Page = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 信息缓存对象</span>
    <span class="hljs-keyword">var</span> cache = {};
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">page, fn</span>) </span>{
        <span class="hljs-comment">// 判断该页数据是否在缓存中</span>
        <span class="hljs-keyword">if</span>(cache[page]) {
            <span class="hljs-comment">// 显示该页内容</span>
            showPage(page, cache[page]);
            <span class="hljs-comment">// 执行成功回调函数</span>
            fn &amp;&amp; fn();
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 否则异步请求</span>
            $.post(<span class="hljs-string">'./data/getNewsData.php'</span>, {
                <span class="hljs-attr">page</span>: page
            }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                <span class="hljs-comment">// 成功返回</span>
                <span class="hljs-keyword">if</span>(res.errNo == <span class="hljs-number">0</span>) {
                    showPage(page, res.data);
                    cache[page] = res.data;
                    fn &amp;&amp; fn();
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 处理异常</span>
                }
            })
        }
    }
}</code></pre>
<p>上面代码可以看出Page缓存器内部缓存了每次请求回来的新闻数据，这样以后如果用户想回看某页新闻数据就不需要发送不必要的请求了。</p>
<h3 id="articleHeader92">收获与总结</h3>
<p>备忘录模式最主要的任务是对现有的数据或状态进行缓存，为将类某个时刻使用或恢复做准备。但是当数据量过大时，会严重占用系统提供的资源，此时对缓存器的优化是很有必要的，复用率低的数据缓存下来是不值得的。</p>
<h2 id="articleHeader93">迭代器模式</h2>
<p>作者把这种模式比喻成一个点钞机。</p>
<h3 id="articleHeader94">定义</h3>
<p>在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。</p>
<h3 id="articleHeader95">使用场景</h3>
<p>迭代器模式主要是解决重复循环迭代的问题，之前接触过面向对象语言的应该都对迭代器有所了解。迭代器就是用来顺序地访问一个聚合对象内部元素的，它可以简化我们遍历操作，就行银行里的点钞机，有了它可以大幅度降低我们的点钞成本。下面创建一个常用的迭代器对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Iterator = function(items, container) {
    // 获取父元素
    var container = container &amp;&amp; document.getElementById(container) || document,
    // 获取元素
        items = container.getElementsByTagName(items),
    // 获取元素长度
        length = items.length,
    // 当前索引值
        index = 0;
    // 缓存原生数组splice方法
    var splice = [].splice;
    return {
        // 获取第一个元素
        first: function() {},
        // 获取最后一个元素
        second: function() {},
        // 获取前一个元素
        pre: function() {},
        // 获取后一个元素
        next: function() {},
        // 获取某一个元素
        get: function(num) {},
        // 对每一个元素执行某一个方法
        dealEach: function(fn) {},
        // 对某一个元素执行某一个方法
        dealItem: function(num, fn) {},
        // 排他方式处理某一个元素
        exclusive: function() {}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Iterator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">items, container</span>) </span>{
    <span class="hljs-comment">// 获取父元素</span>
    <span class="hljs-keyword">var</span> container = container &amp;&amp; <span class="hljs-built_in">document</span>.getElementById(container) || <span class="hljs-built_in">document</span>,
    <span class="hljs-comment">// 获取元素</span>
        items = container.getElementsByTagName(items),
    <span class="hljs-comment">// 获取元素长度</span>
        length = items.length,
    <span class="hljs-comment">// 当前索引值</span>
        index = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 缓存原生数组splice方法</span>
    <span class="hljs-keyword">var</span> splice = [].splice;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// 获取第一个元素</span>
        first: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 获取最后一个元素</span>
        second: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 获取前一个元素</span>
        pre: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 获取后一个元素</span>
        next: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
        <span class="hljs-comment">// 获取某一个元素</span>
        get: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{},
        <span class="hljs-comment">// 对每一个元素执行某一个方法</span>
        dealEach: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{},
        <span class="hljs-comment">// 对某一个元素执行某一个方法</span>
        dealItem: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num, fn</span>) </span>{},
        <span class="hljs-comment">// 排他方式处理某一个元素</span>
        exclusive: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    }
}</code></pre>
<p>下面具体实现迭代器里面的这些方法，然后就可以用这个迭代器对象啦。</p>
<h3 id="articleHeader96">收获与总结</h3>
<p>通过迭代器我们可以顺序地访问一个聚合对象中的每一个元素。在开发中，迭代器极大简化了代码中的循环语句，使代码结构清晰紧凑。用迭代器去处理一个对象时，只需要提供处理的方法，而不必去关心对象的内部结构，这也解决了对象的使用者与对象内部结构之间的耦合。</p>
<h2 id="articleHeader97">解释器模式</h2>
<h3 id="articleHeader98">定义</h3>
<p>对于一种语言，给出其文法表示，并定义一种解释器，通过使用这种解释器来解释语言中定义的句子。</p>
<h3 id="articleHeader99">使用场景</h3>
<p>一个页面中的某些功能好坏有时是靠一定的数据依据支撑的。项目经理想看看用户对最近新增的功能使用情况，前后端要给出统计数据，然而前端交互统计项中要给出交互元素路径。这件事情与冒泡事件类似，只不过在这个路径中还要关心同一层级中当前元素的兄弟元素。比如下面的结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div calss=&quot;wrap&quot;>
    <div class=&quot;link-inner&quot;>
        <a href=&quot;#&quot;>link</a>
    </div>
    <div class=&quot;button-inner&quot;>
        <button>text</button>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">calss</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link-inner"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>link<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-inner"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>text<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>要获取button相对于class为wrap的div元素的Xpath路径，那么可以表示为DIV&gt;DIV2&gt;SPAN。      <br>上面对需求的描述是一种文法，描述的是一组规则，现在要做的事实现一个规则解释器来解释上面的规则。首先要分析给出的文法，查找他们的相似点，然后该清楚我们要先实现什么再实现什么，基本上问题就能解决了。</p>
<h3 id="articleHeader100">收获与总结</h3>
<p>一些描述性语句，几次功能的提取抽象，形成了一套语法法则，这就是解释器模式要处理的事情。是否能应用解释器模式的一条重要准则是能否根据需求解析出一套完整的语法规则，不论该语法规则简单或是复杂都是必须的。</p>
<h1 id="articleHeader101">技巧型设计模式</h1>
<p>技巧型设计模式是通过一些特定技巧来解决组件的某些方面的问题，这类技巧一般通过实践经验总结得到。这本书中总结了8种技巧型设计模式，分别是链模式，委托模式，数据访问对象模式，节流模式，简单模板模式，惰性模式，参与者模式和等待者模式。有兴趣的同学可以去买书来看哦，这里就不一一解释了。</p>
<h1 id="articleHeader102">架构型设计模式</h1>
<p>架构型设计模式是一类框架结构，通过提供一些子系统，指定它们的职责，并将它们条理清晰地组织在一起。现在流行的前端框架都用了这种类型的设计模式。本书总结了6种架构型设计模式，分别是同步模块模式，异步模块模式，Widget模式，MVC模式，MVP模式和MVVM模式。</p>
<p>学习设计模式的学习对于我们来说任重而道远，我们需要在实践中不断思考不断总结。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《JavaScript设计模式》读后感 觉很复杂

## 原文链接
[https://segmentfault.com/a/1190000007899742](https://segmentfault.com/a/1190000007899742)


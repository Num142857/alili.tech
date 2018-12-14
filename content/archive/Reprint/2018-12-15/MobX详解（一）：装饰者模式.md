---
title: 'MobX详解（一）：装饰者模式' 
date: 2018-12-15 2:30:11
hidden: true
slug: 24jpmsigcjd
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们想要扩展一个对象的能力时，通常可以通过添加原型方法，修改构造函数，继承等方式。除此之外，我们还可以通过妆饰者模式来达到目的。</p>
<p>例如一个游戏角色，我们在不改变这个角色对象的条件下，给角色穿一件装备(武器)，那么角色的属性(攻击力)就会增加。这个过程，就可以由妆饰者模式来完成。</p>
<p>我们通过一个例子来演示。</p>
<p>首先我们有几件装备，他们的信息保存在<code>config.js</code>中，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config.js
export const cloth = {
    name: '七彩炫光衣',
    hp: 1000
}
export const weapon = {
    name: '青龙偃月刀',
    attack: 2000
}
export const shoes = {
    name: '神行疾步靴',
    speed: 300
}
export const defaultRole = {
    hp: 100,
    atk: 50,
    speed: 125,
    cloth: null,
    weapon: null,
    shoes: null,
    career: null,
    gender: null
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> cloth = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'七彩炫光衣'</span>,
    <span class="hljs-attr">hp</span>: <span class="hljs-number">1000</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> weapon = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'青龙偃月刀'</span>,
    <span class="hljs-attr">attack</span>: <span class="hljs-number">2000</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> shoes = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'神行疾步靴'</span>,
    <span class="hljs-attr">speed</span>: <span class="hljs-number">300</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> defaultRole = {
    <span class="hljs-attr">hp</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">atk</span>: <span class="hljs-number">50</span>,
    <span class="hljs-attr">speed</span>: <span class="hljs-number">125</span>,
    <span class="hljs-attr">cloth</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">weapon</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">shoes</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">career</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">gender</span>: <span class="hljs-literal">null</span>
}
</code></pre>
<p>然后创建一个基础的角色对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基础角色
// 有血条，攻击力，速度三个基础属性
// 以及衣服，武器，鞋子三个装备插槽
var Role = function(role) {
    this.hp = role.hp;
    this.atk = role.atk;
    this.speed = role.speed;
    this.cloth = role.cloth;
    this.weapon = role.weapon;
    this.shoes = role.shoes;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 基础角色</span>
<span class="hljs-comment">// 有血条，攻击力，速度三个基础属性</span>
<span class="hljs-comment">// 以及衣服，武器，鞋子三个装备插槽</span>
<span class="hljs-keyword">var</span> Role = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role</span>) </span>{
    <span class="hljs-keyword">this</span>.hp = role.hp;
    <span class="hljs-keyword">this</span>.atk = role.atk;
    <span class="hljs-keyword">this</span>.speed = role.speed;
    <span class="hljs-keyword">this</span>.cloth = role.cloth;
    <span class="hljs-keyword">this</span>.weapon = role.weapon;
    <span class="hljs-keyword">this</span>.shoes = role.shoes;
}</code></pre>
<p>在原型上添加奔跑和攻击两个共有方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Role.prototype = {
    constructor: Role,
    run: function() {},
    attack: function() {}
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Role.prototype = {
    <span class="hljs-attr">constructor</span>: Role,
    <span class="hljs-attr">run</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{},
    <span class="hljs-attr">attack</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>引入配置文件中的准备与默认角色</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { cloth, weapon, shoes, defaultRole } from './config';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { cloth, weapon, shoes, defaultRole } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>;</code></pre>
<p>创建职业为战士的角色对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Soldier = function(role) {
    var o = Object.assign({}, defaultRole, role);
    Role.call(this, o); // 构造函数继承
    this.nickname = o.nickname;
    this.gender = o.gender;
    this.career = '战士';
    if (role.hp == defaultRole.hp) {
        this.hp = defaultRole.hp + 20;
    } // 战士的移动血条 + 20
    if (role.speed == defaultRole.speed) {
        this.speed = defaultRole.speed + 5;
    } // 战士的移动速度 + 5
}

// 原型的继承
Soldier.prototype = Object.create(Role.prototype, {
    constructor: {
        value: Soldier,
    },
    run: {
        value: function() {
            console.log('战士的奔跑动作');
        },
    },
    attack: {
        value: function() {
            console.log('战士的基础攻击');
        }
    }
    // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Soldier = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role</span>) </span>{
    <span class="hljs-keyword">var</span> o = <span class="hljs-built_in">Object</span>.assign({}, defaultRole, role);
    Role.call(<span class="hljs-keyword">this</span>, o); <span class="hljs-comment">// 构造函数继承</span>
    <span class="hljs-keyword">this</span>.nickname = o.nickname;
    <span class="hljs-keyword">this</span>.gender = o.gender;
    <span class="hljs-keyword">this</span>.career = <span class="hljs-string">'战士'</span>;
    <span class="hljs-keyword">if</span> (role.hp == defaultRole.hp) {
        <span class="hljs-keyword">this</span>.hp = defaultRole.hp + <span class="hljs-number">20</span>;
    } <span class="hljs-comment">// 战士的移动血条 + 20</span>
    <span class="hljs-keyword">if</span> (role.speed == defaultRole.speed) {
        <span class="hljs-keyword">this</span>.speed = defaultRole.speed + <span class="hljs-number">5</span>;
    } <span class="hljs-comment">// 战士的移动速度 + 5</span>
}

<span class="hljs-comment">// 原型的继承</span>
Soldier.prototype = <span class="hljs-built_in">Object</span>.create(Role.prototype, {
    <span class="hljs-attr">constructor</span>: {
        <span class="hljs-attr">value</span>: Soldier,
    },
    <span class="hljs-attr">run</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的奔跑动作'</span>);
        },
    },
    <span class="hljs-attr">attack</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的基础攻击'</span>);
        }
    }
    <span class="hljs-comment">// ...</span>
})</code></pre>
<p>接下来我们要创建装饰类。</p>
<p>因为装饰类可能会有很多，衣服鞋子武器都肯定各有一个装饰类来分别负责不同的行为与变化，所以我们需要几个基础装饰类。通常情况下，装饰类与被装饰的类有一些相似的地方，大家可以自行体会其中的差异，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基础装饰类
var Decorator = function(role) {
    this.role = role;
    this.hp = role.hp;
    this.atk = role.atk;
    this.speed = role.speed;
    this.cloth = role.cloth;
    this.weapon = role.weapon;
    this.shoes = role.shoes;
    this.career = role.career;
    this.gender = role.gender;
    this.nickname = role.nickname;
}

Decorator.prototype = {
    constructor: Decorator,
    run: function() {
        this.role.run();
    },
    attack: function() {
        this.role.attack();
    }
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 基础装饰类</span>
<span class="hljs-keyword">var</span> Decorator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role</span>) </span>{
    <span class="hljs-keyword">this</span>.role = role;
    <span class="hljs-keyword">this</span>.hp = role.hp;
    <span class="hljs-keyword">this</span>.atk = role.atk;
    <span class="hljs-keyword">this</span>.speed = role.speed;
    <span class="hljs-keyword">this</span>.cloth = role.cloth;
    <span class="hljs-keyword">this</span>.weapon = role.weapon;
    <span class="hljs-keyword">this</span>.shoes = role.shoes;
    <span class="hljs-keyword">this</span>.career = role.career;
    <span class="hljs-keyword">this</span>.gender = role.gender;
    <span class="hljs-keyword">this</span>.nickname = role.nickname;
}

Decorator.prototype = {
    <span class="hljs-attr">constructor</span>: Decorator,
    <span class="hljs-attr">run</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.role.run();
    },
    <span class="hljs-attr">attack</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.role.attack();
    }
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>我们可以看到，基础装饰类以一个角色对象作为构建基础，并没有对角色对象做进一步改变。因此，具体的改变肯定是在具体的装饰类中进行的。</p>
<p>接来下创建一个衣服的装饰类，<code>ClothDectorator</code>，我们的例子中，装备一件衣服并不会修改其行为，只是增加属性，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ClothDecorator = function(role, cloth) {
    Decorator.call(this, role);
    this.cloth = cloth.name;
    this.hp += cloth.hp;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ClothDecorator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role, cloth</span>) </span>{
    Decorator.call(<span class="hljs-keyword">this</span>, role);
    <span class="hljs-keyword">this</span>.cloth = cloth.name;
    <span class="hljs-keyword">this</span>.hp += cloth.hp;
}</code></pre>
<p>衣服装饰类继承基础装饰类，并增加一个装备对象作为构建基础，在构造函数内部，新增了衣服插槽<code>this.cloth</code>与增加了血条。</p>
<p>我们在具体使用中感受一下具体变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var base = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}
var alex = new Soldier(base); // 新建一个战士角色
alex.run();   // 跑一跑
alex.attack(); // 攻击一下
console.log(alex);  // 查看alex对象

alex = new ClothDecorator(alex, cloth);  // 装备衣服
console.log(alex);  // 查看变化" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> base = {
    ...defaultRole,
    <span class="hljs-attr">nickname</span>: <span class="hljs-string">'alex'</span>,
    <span class="hljs-attr">gender</span>: <span class="hljs-string">'man'</span>
}
<span class="hljs-keyword">var</span> alex = <span class="hljs-keyword">new</span> Soldier(base); <span class="hljs-comment">// 新建一个战士角色</span>
alex.run();   <span class="hljs-comment">// 跑一跑</span>
alex.attack(); <span class="hljs-comment">// 攻击一下</span>
<span class="hljs-built_in">console</span>.log(alex);  <span class="hljs-comment">// 查看alex对象</span>

alex = <span class="hljs-keyword">new</span> ClothDecorator(alex, cloth);  <span class="hljs-comment">// 装备衣服</span>
<span class="hljs-built_in">console</span>.log(alex);  <span class="hljs-comment">// 查看变化</span></code></pre>
<p>从下图我们可以看到具体的变化，说明装饰成功了。</p>
<p><span class="img-wrap"><img data-src="/img/bV2UNL?w=622&amp;h=475" src="https://static.alili.tech/img/bV2UNL?w=622&amp;h=475" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>除此之外，我们还需要创建武器装饰类与鞋子装饰类，武器与鞋子的穿戴会改变角色的攻击动作与奔跑动作，因此需要多行为进行更改，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 武器装饰类
var WeaponDecorator = function(role, weapon) {
    Decorator.call(this, role);
    this.weapon = weapon.name;
    this.atk += weapon.attack;
}
WeaponDecorator.prototype = Object.create(Decorator.prototype, {
    constructor: {
        value: WeaponDecorator
    },
    attack: { // 修改攻击方法
        value: function() {
            console.log('装备了武器，攻击变得更强了');
        }
    }
})

// 鞋子装饰类
var ShoesDecorator = function(role, shoes) {
    Decorator.call(this, role);
    this.shoes = shoes.name;
    this.speed += shoes.speed;
}
ShoesDecorator.prototype = Object.create(Decorator.prototype, {
    constructor: {
        value: ShoesDecorator
    },
    run: { // 修改奔跑方法
        value: function() {
            console.log('穿上了鞋子，奔跑速度更快了');
        }
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 武器装饰类</span>
<span class="hljs-keyword">var</span> WeaponDecorator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role, weapon</span>) </span>{
    Decorator.call(<span class="hljs-keyword">this</span>, role);
    <span class="hljs-keyword">this</span>.weapon = weapon.name;
    <span class="hljs-keyword">this</span>.atk += weapon.attack;
}
WeaponDecorator.prototype = <span class="hljs-built_in">Object</span>.create(Decorator.prototype, {
    <span class="hljs-attr">constructor</span>: {
        <span class="hljs-attr">value</span>: WeaponDecorator
    },
    <span class="hljs-attr">attack</span>: { <span class="hljs-comment">// 修改攻击方法</span>
        value: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'装备了武器，攻击变得更强了'</span>);
        }
    }
})

<span class="hljs-comment">// 鞋子装饰类</span>
<span class="hljs-keyword">var</span> ShoesDecorator = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">role, shoes</span>) </span>{
    Decorator.call(<span class="hljs-keyword">this</span>, role);
    <span class="hljs-keyword">this</span>.shoes = shoes.name;
    <span class="hljs-keyword">this</span>.speed += shoes.speed;
}
ShoesDecorator.prototype = <span class="hljs-built_in">Object</span>.create(Decorator.prototype, {
    <span class="hljs-attr">constructor</span>: {
        <span class="hljs-attr">value</span>: ShoesDecorator
    },
    <span class="hljs-attr">run</span>: { <span class="hljs-comment">// 修改奔跑方法</span>
        value: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'穿上了鞋子，奔跑速度更快了'</span>);
        }
    }
})
</code></pre>
<p>角色alex穿了衣服之后，我们还可以继续为他穿上鞋子与武器。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('                  ');
console.log('------装备武器-----');
alex = new WeaponDecorator(alex, weapon); // 装备武器
alex.attack();
console.log(alex);


console.log('                  ');
console.log('------装备鞋子-----');
alex = new ShoesDecorator(alex, shoes);  // 装备鞋子
alex.run();
console.log(alex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'                  '</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------装备武器-----'</span>);
alex = <span class="hljs-keyword">new</span> WeaponDecorator(alex, weapon); <span class="hljs-comment">// 装备武器</span>
alex.attack();
<span class="hljs-built_in">console</span>.log(alex);


<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'                  '</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------装备鞋子-----'</span>);
alex = <span class="hljs-keyword">new</span> ShoesDecorator(alex, shoes);  <span class="hljs-comment">// 装备鞋子</span>
alex.run();
<span class="hljs-built_in">console</span>.log(alex);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2UPC?w=753&amp;h=507" src="https://static.alili.tech/img/bV2UPC?w=753&amp;h=507" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>OK，这就是整个装饰者模式的思路与具体实现，</p>
<p>用ES6的class实现，源代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { cloth, weapon, shoes, defaultRole } from './config';

// 基础角色
class Role {    
    constructor(role) {
        this.hp = role.hp;
        this.atk = role.atk;
        this.speed = role.speed;
        this.cloth = role.cloth;
        this.weapon = role.weapon;
        this.shoes = role.shoes;
    }
    run() {}
    attack() {}
}

class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRole, roleInfo);
        super(o);
        this.nickname = o.nickname;
        this.gender = o.gender;
        this.career = '战士';
        if (roleInfo.hp == defaultRole.hp) {
            this.hp = defaultRole.hp + 20;
        }
        if (roleInfo.speed == defaultRole.speed) {
            this.speed = defaultRole.speed + 5;
        }
    }
    run() {
        console.log('战士的奔跑动作');
    }
    attack() {
        console.log('战士的基础攻击');
    }
}

// class Mage extends Role {}

class Decorator {
    constructor(role) {
        this.role = role;
        this.hp = role.hp;
        this.atk = role.atk;
        this.speed = role.speed;
        this.cloth = role.cloth;
        this.weapon = role.weapon;
        this.shoes = role.shoes;
        this.career = role.career;
        this.gender = role.gender;
        this.nickname = role.nickname;
    }
    run() { this.role.run(); }
    attack() { this.role.attack() }
}

class ClothDecorator extends Decorator {
    constructor(role, cloth) {
        super(role);
        this.cloth = cloth.name;
        this.hp += cloth.hp;
    }
}

class WeaponDecorator extends Decorator {
    constructor(role, weapon) {
        super(role);
        this.weapon = weapon.name;
        this.atk += weapon.attack;
    }
    attack() {
        console.log('装备了武器，攻击变得更强了');
    }
}

class ShoesDecorator extends Decorator {
    constructor(role, shoes) {
        super(role);
        this.shoes = shoes.name;
        this.speed += shoes.speed;
    }
    run() {
        console.log('穿上了鞋子，奔跑速度更快了');
    }
}


const baseInfo = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}

let alex = new Soldier(baseInfo);
alex.run();
alex.attack();
console.log(alex);

console.log('                  ');
console.log('------装备衣服-----');
alex = new ClothDecorator(alex, cloth);
console.log(alex);

console.log('                  ');
console.log('------装备武器-----');
alex = new WeaponDecorator(alex, weapon);
alex.attack();
console.log(alex);


console.log('                  ');
console.log('------装备鞋子-----');
alex = new ShoesDecorator(alex, shoes);
alex.run();
console.log(alex);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { cloth, weapon, shoes, defaultRole } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>;

<span class="hljs-comment">// 基础角色</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Role</span> </span>{    
    <span class="hljs-keyword">constructor</span>(role) {
        <span class="hljs-keyword">this</span>.hp = role.hp;
        <span class="hljs-keyword">this</span>.atk = role.atk;
        <span class="hljs-keyword">this</span>.speed = role.speed;
        <span class="hljs-keyword">this</span>.cloth = role.cloth;
        <span class="hljs-keyword">this</span>.weapon = role.weapon;
        <span class="hljs-keyword">this</span>.shoes = role.shoes;
    }
    run() {}
    attack() {}
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Soldier</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Role</span> </span>{
    <span class="hljs-keyword">constructor</span>(roleInfo) {
        <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>.assign({}, defaultRole, roleInfo);
        <span class="hljs-keyword">super</span>(o);
        <span class="hljs-keyword">this</span>.nickname = o.nickname;
        <span class="hljs-keyword">this</span>.gender = o.gender;
        <span class="hljs-keyword">this</span>.career = <span class="hljs-string">'战士'</span>;
        <span class="hljs-keyword">if</span> (roleInfo.hp == defaultRole.hp) {
            <span class="hljs-keyword">this</span>.hp = defaultRole.hp + <span class="hljs-number">20</span>;
        }
        <span class="hljs-keyword">if</span> (roleInfo.speed == defaultRole.speed) {
            <span class="hljs-keyword">this</span>.speed = defaultRole.speed + <span class="hljs-number">5</span>;
        }
    }
    run() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的奔跑动作'</span>);
    }
    attack() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的基础攻击'</span>);
    }
}

<span class="hljs-comment">// class Mage extends Role {}</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Decorator</span> </span>{
    <span class="hljs-keyword">constructor</span>(role) {
        <span class="hljs-keyword">this</span>.role = role;
        <span class="hljs-keyword">this</span>.hp = role.hp;
        <span class="hljs-keyword">this</span>.atk = role.atk;
        <span class="hljs-keyword">this</span>.speed = role.speed;
        <span class="hljs-keyword">this</span>.cloth = role.cloth;
        <span class="hljs-keyword">this</span>.weapon = role.weapon;
        <span class="hljs-keyword">this</span>.shoes = role.shoes;
        <span class="hljs-keyword">this</span>.career = role.career;
        <span class="hljs-keyword">this</span>.gender = role.gender;
        <span class="hljs-keyword">this</span>.nickname = role.nickname;
    }
    run() { <span class="hljs-keyword">this</span>.role.run(); }
    attack() { <span class="hljs-keyword">this</span>.role.attack() }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ClothDecorator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Decorator</span> </span>{
    <span class="hljs-keyword">constructor</span>(role, cloth) {
        <span class="hljs-keyword">super</span>(role);
        <span class="hljs-keyword">this</span>.cloth = cloth.name;
        <span class="hljs-keyword">this</span>.hp += cloth.hp;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WeaponDecorator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Decorator</span> </span>{
    <span class="hljs-keyword">constructor</span>(role, weapon) {
        <span class="hljs-keyword">super</span>(role);
        <span class="hljs-keyword">this</span>.weapon = weapon.name;
        <span class="hljs-keyword">this</span>.atk += weapon.attack;
    }
    attack() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'装备了武器，攻击变得更强了'</span>);
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ShoesDecorator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Decorator</span> </span>{
    <span class="hljs-keyword">constructor</span>(role, shoes) {
        <span class="hljs-keyword">super</span>(role);
        <span class="hljs-keyword">this</span>.shoes = shoes.name;
        <span class="hljs-keyword">this</span>.speed += shoes.speed;
    }
    run() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'穿上了鞋子，奔跑速度更快了'</span>);
    }
}


<span class="hljs-keyword">const</span> baseInfo = {
    ...defaultRole,
    <span class="hljs-attr">nickname</span>: <span class="hljs-string">'alex'</span>,
    <span class="hljs-attr">gender</span>: <span class="hljs-string">'man'</span>
}

<span class="hljs-keyword">let</span> alex = <span class="hljs-keyword">new</span> Soldier(baseInfo);
alex.run();
alex.attack();
<span class="hljs-built_in">console</span>.log(alex);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'                  '</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------装备衣服-----'</span>);
alex = <span class="hljs-keyword">new</span> ClothDecorator(alex, cloth);
<span class="hljs-built_in">console</span>.log(alex);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'                  '</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------装备武器-----'</span>);
alex = <span class="hljs-keyword">new</span> WeaponDecorator(alex, weapon);
alex.attack();
<span class="hljs-built_in">console</span>.log(alex);


<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'                  '</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'------装备鞋子-----'</span>);
alex = <span class="hljs-keyword">new</span> ShoesDecorator(alex, shoes);
alex.run();
<span class="hljs-built_in">console</span>.log(alex);</code></pre>
<p>除了角色与装备之间的关系可以用装饰者模式来搞定之外，我们在玩游戏的时候，还知道每个角色都会在某些情况下获得不同的buff，例如大龙buf，小龙buf，红buff，蓝buff等，这些buff有的会更改角色属性，例如cd更短，攻击更高，有的会更改攻击特性，例如红buff会持续掉血，减速等，这些buff还有持续时间，大家可以思考一下，如何使用装饰者模式来完成这些buff的实现。欢迎大家留言提供思路。</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
MobX详解（一）：装饰者模式

## 原文链接
[https://segmentfault.com/a/1190000013049282](https://segmentfault.com/a/1190000013049282)


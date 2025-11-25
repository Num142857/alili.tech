---
title: 'MobX详解（二）：ES7 装饰器 decorator' 
date: 2018-12-15 2:30:11
hidden: true
slug: l9sa0yu1yi
categories: [reprint]
---

{{< raw >}}

                    
<p>在学习ES7装饰器语法之前，需要先温习一下ES5的一些基础知识。</p>
<p>假设有对象如下：(便于理解)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = {
    name: 'TOM'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'TOM'</span>
}</code></pre>
<p>在ES5中，对象中的每个属性都有一个特性值来描述这个属性的特点，他们分别是：</p>
<ul>
<li>
<code>configurable</code>: 属性是否能被delete删除，当值为false时，其他特性值也不能被改变，默认值为true</li>
<li>
<code>enumerable</code>： 属性是否能被枚举，也就是是否能被for in循环遍历。默认为true</li>
<li>
<code>writable</code>: 是否能修改属性值。默认为true</li>
<li>
<code>value</code>：具体的属性值是多少，默认为undefined</li>
<li>
<code>get</code>：当我们通过<code>person.name</code>访问name的属性值时，get将被调用。该方法可以自定义返回的具体值是多少。get默认值为undefined</li>
<li>
<code>set</code>：当我们通过<code>person.name = 'Jake'</code>设置name属性值时，set方法将被调用，该方法可以自定义设置值的具体方式，set默认值为undefined</li>
</ul>
<blockquote>需要注意的是，不能同时设置<code>value，writeable</code>与<code>get set</code>。</blockquote>
<p>我们可以通过<code>Object.defineProperty</code>(操作单个)与<code>Object.defineProperties</code>（操作多个）来修改这些特性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 三个参数分别为  target, key, descriptor(特性值的描述对象)
Object.defineProperty(person, 'name', {
  value: &quot;TOM&quot;
})

// 新增
Object.defineProperty(person, 'age', {
  value: 20
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 三个参数分别为  target, key, descriptor(特性值的描述对象)</span>
<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'name'</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-string">"TOM"</span>
})

<span class="hljs-comment">// 新增</span>
<span class="hljs-built_in">Object</span>.defineProperty(person, <span class="hljs-string">'age'</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-number">20</span>
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV2VgG?w=615&amp;h=144" src="https://static.alili.tech/img/bV2VgG?w=615&amp;h=144" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>装饰器语法与此类似，当我们想要自定义一个装饰器时，可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function nameDecorator(target, key, descriptor) {
    descriptor.value = () => {
        return 'jake';
    }
    return descriptor;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nameDecorator</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
    descriptor.value = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'jake'</span>;
    }
    <span class="hljs-keyword">return</span> descriptor;
}</code></pre>
<p>函数<code>nameDecorator</code>的定义会重写被他装饰的属性(getName)。方法的三个参数与<code>Object.defineProperty</code>一一对应，分别指当前的对象<code>Person</code>，被作用的属性<code>getName</code>，以及属性特性值的描述对象<code>descriptor</code>。函数最后必须返回<code>descriptor</code>。</p>
<p>使用时也很简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Person {
    constructor() {
        this.name = 'jake'
    }
    @nameDecorator
    getName() {
        return this.name;
    }
}

let p1 = new Person();
console.log(p1.getName())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'jake'</span>
    }
    @nameDecorator
    getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> Person();
<span class="hljs-built_in">console</span>.log(p1.getName())</code></pre>
<p>在<code>getName</code>方法前面加上<code>@nameDecorator</code>，就是装饰器语法。</p>
<p>自定义函数<code>nameDecorator</code>的参数中，target，就是装饰的对象Person，key就是被装饰的具体方法<code>getName</code>。</p>
<p>不能使用装饰器对构造函数进行更改，如果要修改构造函数，则可以通过如下的方式来完成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initDecorator(target, key, descriptor) {
    const fn = descriptor.value;
    // 改变传入的参数值
    descriptor.value = (...args) => {
        args[0] = 'TOM';
        return fn.apply(target, args);
    }
    return descriptor;
}

class Person {
    constructor(name, age) {
        this.init(name, age)
    }
    @initDecorator
    init(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}

console.log(new Person('alex', 20).getName()); // TOM" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initDecorator</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
    <span class="hljs-keyword">const</span> fn = descriptor.value;
    <span class="hljs-comment">// 改变传入的参数值</span>
    descriptor.value = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
        args[<span class="hljs-number">0</span>] = <span class="hljs-string">'TOM'</span>;
        <span class="hljs-keyword">return</span> fn.apply(target, args);
    }
    <span class="hljs-keyword">return</span> descriptor;
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(name, age) {
        <span class="hljs-keyword">this</span>.init(name, age)
    }
    @initDecorator
    init(name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
    getAge() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
    }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Person(<span class="hljs-string">'alex'</span>, <span class="hljs-number">20</span>).getName()); <span class="hljs-comment">// TOM</span></code></pre>
<p>如何希望装饰器传入一个指定的参数，可以如下做。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注意这里的差别
function initDecorator(name) {
    return function(target, key, descriptor) {
        const fn = descriptor.value;
        descriptor.value = (...args) => {
            args[0] = name;
            return fn.apply(target, args);
        }
        return descriptor;
    }
}

class Person {
    constructor(name, age) {
        this.init(name, age)
    }
    @initDecorator('xiaoming')
    init(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.age;
    }
}

console.log(new Person('alex', 20).getName());  // xiaoming" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注意这里的差别</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initDecorator</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
        <span class="hljs-keyword">const</span> fn = descriptor.value;
        descriptor.value = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
            args[<span class="hljs-number">0</span>] = name;
            <span class="hljs-keyword">return</span> fn.apply(target, args);
        }
        <span class="hljs-keyword">return</span> descriptor;
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(name, age) {
        <span class="hljs-keyword">this</span>.init(name, age)
    }
    @initDecorator(<span class="hljs-string">'xiaoming'</span>)
    init(name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
    getAge() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
    }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> Person(<span class="hljs-string">'alex'</span>, <span class="hljs-number">20</span>).getName());  <span class="hljs-comment">// xiaoming</span></code></pre>
<p>这里利用了闭包的原理，将装饰器函数外包裹一层函数，以闭包的形式缓存了传入的参数。</p>
<p>我们也可以对整个class添加装饰器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function personDecorator(target) {
    // 修改方法
    target.prototype.getName = () => {
        return 'hahahahaha'
    }
    // 新增方法，因为内部使用了this，因此一定不能使用箭头函数
    target.prototype.getAge = function() {
        return this.age
    }
    return target;
}

@personDecorator
class Person {
    constructor(name, age) {
        this.init(name, age)
    }
    init(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}

var p = new Person('alex', 30);
console.log(p.getName(), p.getAge());  // hahahahaha 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">personDecorator</span>(<span class="hljs-params">target</span>) </span>{
    <span class="hljs-comment">// 修改方法</span>
    target.prototype.getName = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'hahahahaha'</span>
    }
    <span class="hljs-comment">// 新增方法，因为内部使用了this，因此一定不能使用箭头函数</span>
    target.prototype.getAge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age
    }
    <span class="hljs-keyword">return</span> target;
}

@personDecorator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Person</span> </span>{
    <span class="hljs-keyword">constructor</span>(name, age) {
        <span class="hljs-keyword">this</span>.init(name, age)
    }
    init(name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'alex'</span>, <span class="hljs-number">30</span>);
<span class="hljs-built_in">console</span>.log(p.getName(), p.getAge());  <span class="hljs-comment">// hahahahaha 30</span></code></pre>
<p>也可以传参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xiaom = {
    name: 'xiaom',
    age: 22
}
function stuDecorator(person) {
    return function(target) {
        // 修改方法
        target.prototype.getAge = () => {
            return person.age;
        }
        // 添加方法
        target.prototype.getOther = () => {
            return 'other info.'
        }
        return target;
    }
}

function initDecorator(person) {
    return function(target, key, descriptor) {
        var method = descriptor.value;
        descriptor.value = () => {
            var ret = method.call(target, person.name);
            return ret;
        }
    }
}

@stuDecorator(xiaom)
class Student {
    constructor(name, age) {
        this.init(name, age);
    }
    @initDecorator(xiaom)
    init(name, age) {
        this.name = name;
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    getName() {
        return this.name;
    }
}

var p = new Student('hu', 18);
console.log(p.getAge(), p.getName(), p.getOther()); // 22 &quot;xiaom&quot; &quot;other info.&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xiaom = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'xiaom'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stuDecorator</span>(<span class="hljs-params">person</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>) </span>{
        <span class="hljs-comment">// 修改方法</span>
        target.prototype.getAge = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> person.age;
        }
        <span class="hljs-comment">// 添加方法</span>
        target.prototype.getOther = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-string">'other info.'</span>
        }
        <span class="hljs-keyword">return</span> target;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initDecorator</span>(<span class="hljs-params">person</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target, key, descriptor</span>) </span>{
        <span class="hljs-keyword">var</span> method = descriptor.value;
        descriptor.value = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">var</span> ret = method.call(target, person.name);
            <span class="hljs-keyword">return</span> ret;
        }
    }
}

@stuDecorator(xiaom)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
    <span class="hljs-keyword">constructor</span>(name, age) {
        <span class="hljs-keyword">this</span>.init(name, age);
    }
    @initDecorator(xiaom)
    init(name, age) {
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
    }
    getAge() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
    }
    getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
    }
}

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'hu'</span>, <span class="hljs-number">18</span>);
<span class="hljs-built_in">console</span>.log(p.getAge(), p.getName(), p.getOther()); <span class="hljs-comment">// 22 "xiaom" "other info."</span></code></pre>
<p>那么用ES7 的decorator来实现最开始的需求，则可以这样做</p>
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


function ClothDecorator(target) {
    target.prototype.getCloth = function(cloth) {
        this.hp += cloth.hp;
        this.cloth = cloth.name;
    }
}

function WeaponDecorator(target) {
    target.prototype.getWeapon = function(weapon) {
        this.atk += weapon.attack;
        this.weapon = weapon.name;
    }
    target.prototype.attack = function() {
        if (this.weapon) {
            console.log(`装备了${this.weapon}，攻击更强了`);
        } else {
            console.log('战士的基础攻击');
        }
    }
}

function ShoesDecorator(target) {
    target.prototype.getShoes = function(shoes) {
        this.speed += shoes.speed;
        this.shoes = shoes.name;
    }
    target.prototype.run = function() {
        if (this.shoes) {
            console.log(`穿上了${this.shoes}，移动速度更快了`);
        } else {
            console.log('战士的奔跑动作');
        }
    }
}


@ClothDecorator
@WeaponDecorator
@ShoesDecorator
class Soldier extends Role {
    constructor(role) {
        const o = Object.assign({}, defaultRole, role);
        super(o);
        this.nickname = role.nickname;
        this.gender = role.gender;
        this.career = '战士';
        if (role.hp == defaultRole.hp) {
            this.hp = defaultRole.hp + 20;
        }
        if (role.speed == defaultRole.speed) {
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

const base = {
    ...defaultRole,
    nickname: 'alex',
    gender: 'man'
}

const s = new Soldier(base);
s.getCloth(cloth);
console.log(s);

s.getWeapon(weapon);
s.attack();
console.log(s);

s.getShoes(shoes);
s.run();
console.log(s);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { cloth, weapon, shoes, defaultRole } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>;

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


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ClothDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getCloth = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cloth</span>) </span>{
        <span class="hljs-keyword">this</span>.hp += cloth.hp;
        <span class="hljs-keyword">this</span>.cloth = cloth.name;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WeaponDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getWeapon = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">weapon</span>) </span>{
        <span class="hljs-keyword">this</span>.atk += weapon.attack;
        <span class="hljs-keyword">this</span>.weapon = weapon.name;
    }
    target.prototype.attack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.weapon) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`装备了<span class="hljs-subst">${<span class="hljs-keyword">this</span>.weapon}</span>，攻击更强了`</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的基础攻击'</span>);
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ShoesDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getShoes = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shoes</span>) </span>{
        <span class="hljs-keyword">this</span>.speed += shoes.speed;
        <span class="hljs-keyword">this</span>.shoes = shoes.name;
    }
    target.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.shoes) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`穿上了<span class="hljs-subst">${<span class="hljs-keyword">this</span>.shoes}</span>，移动速度更快了`</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的奔跑动作'</span>);
        }
    }
}


@ClothDecorator
@WeaponDecorator
@ShoesDecorator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Soldier</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Role</span> </span>{
    <span class="hljs-keyword">constructor</span>(role) {
        <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>.assign({}, defaultRole, role);
        <span class="hljs-keyword">super</span>(o);
        <span class="hljs-keyword">this</span>.nickname = role.nickname;
        <span class="hljs-keyword">this</span>.gender = role.gender;
        <span class="hljs-keyword">this</span>.career = <span class="hljs-string">'战士'</span>;
        <span class="hljs-keyword">if</span> (role.hp == defaultRole.hp) {
            <span class="hljs-keyword">this</span>.hp = defaultRole.hp + <span class="hljs-number">20</span>;
        }
        <span class="hljs-keyword">if</span> (role.speed == defaultRole.speed) {
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

<span class="hljs-keyword">const</span> base = {
    ...defaultRole,
    <span class="hljs-attr">nickname</span>: <span class="hljs-string">'alex'</span>,
    <span class="hljs-attr">gender</span>: <span class="hljs-string">'man'</span>
}

<span class="hljs-keyword">const</span> s = <span class="hljs-keyword">new</span> Soldier(base);
s.getCloth(cloth);
<span class="hljs-built_in">console</span>.log(s);

s.getWeapon(weapon);
s.attack();
<span class="hljs-built_in">console</span>.log(s);

s.getShoes(shoes);
s.run();
<span class="hljs-built_in">console</span>.log(s);</code></pre>
<p>这里需要注意的是，装饰者模式与直接使用浏览器支持的语法在实现上的一些区别。</p>
<p>ES7 Decorator重点在于对装饰器的封装，因此我们可以将上栗中的装饰器单独封装为一个模块。在细节上做了一些调整，让我们封装的装饰器模块不仅仅可以在创建战士对象的时候使用，在我们创建其他职业例如法师，射手的时候也能够正常使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function ClothDecorator(target) {
    target.prototype.getCloth = function(cloth) {
        this.hp += cloth.hp;
        this.cloth = cloth.name;
    }
}

export function WeaponDecorator(target) {
    target.prototype.getWeapon = function(weapon) {
        this.atk += weapon.attack;
        this.weapon = weapon.name;
    }
    target.prototype.attack = function() {
        if (this.weapon) {
            console.log(`${this.nickname}装备了${this.weapon}，攻击更强了。职业：${this.career}`);
        } else {
            console.log(`${this.career}的基本攻击`);
        }
    }
}

export function ShoesDecorator(target) {
    target.prototype.getShoes = function(shoes) {
        this.speed += shoes.speed;
        this.shoes = shoes.name;
    }
    target.prototype.run = function() {
        if (this.shoes) {
            console.log(`${this.nickname}穿上了${this.shoes}，移动速度更快了。职业：${this.career}`);
        } else {
            console.log(`${this.career}的奔跑动作`);
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ClothDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getCloth = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cloth</span>) </span>{
        <span class="hljs-keyword">this</span>.hp += cloth.hp;
        <span class="hljs-keyword">this</span>.cloth = cloth.name;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WeaponDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getWeapon = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">weapon</span>) </span>{
        <span class="hljs-keyword">this</span>.atk += weapon.attack;
        <span class="hljs-keyword">this</span>.weapon = weapon.name;
    }
    target.prototype.attack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.weapon) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.nickname}</span>装备了<span class="hljs-subst">${<span class="hljs-keyword">this</span>.weapon}</span>，攻击更强了。职业：<span class="hljs-subst">${<span class="hljs-keyword">this</span>.career}</span>`</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.career}</span>的基本攻击`</span>);
        }
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ShoesDecorator</span>(<span class="hljs-params">target</span>) </span>{
    target.prototype.getShoes = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shoes</span>) </span>{
        <span class="hljs-keyword">this</span>.speed += shoes.speed;
        <span class="hljs-keyword">this</span>.shoes = shoes.name;
    }
    target.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.shoes) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.nickname}</span>穿上了<span class="hljs-subst">${<span class="hljs-keyword">this</span>.shoes}</span>，移动速度更快了。职业：<span class="hljs-subst">${<span class="hljs-keyword">this</span>.career}</span>`</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.career}</span>的奔跑动作`</span>);
        }
    }
}</code></pre>
<p>可以利用该例子，感受Decorator与继承的不同。</p>
<p>整理之后，Soldier的封装代码将会变得非常简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { cloth, weapon, shoes, defaultRole } from './config';
import { ClothDecorator, WeaponDecorator, ShoesDecorator } from './equip';
import Role from './Role';

@ClothDecorator
@WeaponDecorator
@ShoesDecorator
class Soldier extends Role {
    constructor(roleInfo) {
        const o = Object.assign({}, defaultRoleInfo, roleInfo);
        super(o);
        this.nickname = roleInfo.nickname;
        this.gender = roleInfo.gender;
        this.career = '战士';
        if (roleInfo.hp == defaultRoleInfo.hp) {
            this.hp = defaultRoleInfo.hp + 20;
        }
        if (roleInfo.speed == defaultRoleInfo.speed) {
            this.speed = defaultRoleInfo.speed + 5;
        }
    }
    run() {
        console.log('战士的奔跑动作');
    }
    attack() {
        console.log('战士的基础攻击');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { cloth, weapon, shoes, defaultRole } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>;
<span class="hljs-keyword">import</span> { ClothDecorator, WeaponDecorator, ShoesDecorator } <span class="hljs-keyword">from</span> <span class="hljs-string">'./equip'</span>;
<span class="hljs-keyword">import</span> Role <span class="hljs-keyword">from</span> <span class="hljs-string">'./Role'</span>;

@ClothDecorator
@WeaponDecorator
@ShoesDecorator
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Soldier</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Role</span> </span>{
    <span class="hljs-keyword">constructor</span>(roleInfo) {
        <span class="hljs-keyword">const</span> o = <span class="hljs-built_in">Object</span>.assign({}, defaultRoleInfo, roleInfo);
        <span class="hljs-keyword">super</span>(o);
        <span class="hljs-keyword">this</span>.nickname = roleInfo.nickname;
        <span class="hljs-keyword">this</span>.gender = roleInfo.gender;
        <span class="hljs-keyword">this</span>.career = <span class="hljs-string">'战士'</span>;
        <span class="hljs-keyword">if</span> (roleInfo.hp == defaultRoleInfo.hp) {
            <span class="hljs-keyword">this</span>.hp = defaultRoleInfo.hp + <span class="hljs-number">20</span>;
        }
        <span class="hljs-keyword">if</span> (roleInfo.speed == defaultRoleInfo.speed) {
            <span class="hljs-keyword">this</span>.speed = defaultRoleInfo.speed + <span class="hljs-number">5</span>;
        }
    }
    run() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的奔跑动作'</span>);
    }
    attack() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'战士的基础攻击'</span>);
    }
}</code></pre>
<p>那么继续上一篇文章的思考题，利用装饰器可以怎么做呢？</p>
<p>补充：如何在构建环境中支持ES7 Decorator语法</p>
<p><a href="https://technologyadvice.github.io/es7-decorators-babel6/" rel="nofollow noreferrer" target="_blank">https://technologyadvice.gith...</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
MobX详解（二）：ES7 装饰器 decorator

## 原文链接
[https://segmentfault.com/a/1190000013051904](https://segmentfault.com/a/1190000013051904)


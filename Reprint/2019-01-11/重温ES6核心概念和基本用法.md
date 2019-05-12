---
title: '重温ES6核心概念和基本用法' 
date: 2019-01-11 2:30:08
hidden: true
slug: hlolhla9g6h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>ES6在2015年6月就得以批准，至今已两年了。近一年多以来陆续看过很多ES6的资料，工作项目中也逐步的用上了很多ES6的特性（<code>let</code>,<code>const</code>,<code>promise</code>,<code>Template strings</code>,<code>Class</code>,箭头函数等等），不得不说，这些特性给开发带来了非常多的便利。但是做决定我的ES6知识其实并不够系统，这也是写本文的初衷，希望阅读本文能让你也能对ES6有更系统的理解，本文并不是那种大而全的教程，而是希望在实际工作中，能想起某个新特性可以解决你当前的问题或者优化当前的代码，之后再系统学习，应用，用过了肯定就会真的掌握了。</p>
<p>本文基于Github上的高赞文章<a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer" target="_blank">ECMAScript 6 Features</a>/Babel修改过的<a href="https://babeljs.io/learn-es2015/" rel="nofollow noreferrer" target="_blank">Learn ES2015</a>,翻译（写作？）期间，重温了阮一峰老师的<a>ECMAScript 6 入门</a>。</p>
</blockquote>
<h3 id="articleHeader0">ES6新特性列表</h3>
<p>相比ES5，ES6提供了太多的更新，简单说来，主要为以下方面（大家可以依据自己不算清晰的点选择性查看本文）：</p>
<ul>
<li><p>Arrows,箭头函数，</p></li>
<li><p>Classes，类</p></li>
<li><p>Enhanced object literals，增强的对象字面值</p></li>
<li><p>Template strings：模板字符串</p></li>
<li><p>Destructuring：解构</p></li>
<li><p>Default + rest + spread：参数默认值，rest参数,扩展运算符</p></li>
<li><p>Let + const:命名声明的新方式</p></li>
<li><p>Iterators + for..of：遍历器</p></li>
<li><p>Generators：生成器</p></li>
<li><p>Unicode：更广泛的编码支持</p></li>
<li><p>Modules：语言层面上支持的模块机制</p></li>
<li><p>Module loaders：模块加载器</p></li>
<li><p>Map + set + weakmap + weakset：新的数据结构</p></li>
<li><p>Proxies：代理器</p></li>
<li><p>Symbols：新的基本类型，独一无二的值</p></li>
<li><p>Subclassable built-ins：类的继承</p></li>
<li><p>Promises：</p></li>
<li><p>Math + number + string + array + object apis：拓展了一些内置对象的方法</p></li>
<li><p>Binary and octal literals：二进制八进制字面量</p></li>
<li><p>Reflect api：操作对象的新api</p></li>
<li><p>Tail calls:尾调用</p></li>
</ul>
<h3 id="articleHeader1">Arrows箭头函数</h3>
<p>箭头函数使用类似于<code>=&gt;</code>这样的语法定义函数，支持表达式模式和语句模式，不过其最大特点在于和父作用域具有一样的<code>this</code>。我们知道普通函数的<code>this</code> 既不指向函数自身也不指向函数的词法作用域，this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。使用箭头函数时再也不用担心<code>this</code>跳来跳去了。<br>此外如果箭头函数如果定义在另一个函数里面，箭头函数会共享它父函数的arguments变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 表达式模式箭头函数
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// 语句模式箭头函数
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// 和父作用域具有相同的this
var bob = {
  _name: &quot;Bob&quot;,
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + &quot; knows &quot; + f));
  }
}

function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 表达式模式箭头函数</span>
<span class="hljs-keyword">var</span> odds = evens.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v + <span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> nums = evens.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> v + i);
<span class="hljs-keyword">var</span> pairs = evens.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> ({<span class="hljs-attr">even</span>: v, <span class="hljs-attr">odd</span>: v + <span class="hljs-number">1</span>}));

<span class="hljs-comment">// 语句模式箭头函数</span>
nums.forEach(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (v % <span class="hljs-number">5</span> === <span class="hljs-number">0</span>)
    fives.push(v);
});

<span class="hljs-comment">// 和父作用域具有相同的this</span>
<span class="hljs-keyword">var</span> bob = {
  <span class="hljs-attr">_name</span>: <span class="hljs-string">"Bob"</span>,
  <span class="hljs-attr">_friends</span>: [],
  printFriends() {
    <span class="hljs-keyword">this</span>._friends.forEach(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>._name + <span class="hljs-string">" knows "</span> + f));
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> example = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> numbers = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> number <span class="hljs-keyword">of</span> <span class="hljs-built_in">arguments</span>) {
      numbers.push(number * number);
    }

    <span class="hljs-keyword">return</span> numbers;
  };

  <span class="hljs-keyword">return</span> example();
}

square(<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7.5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">11.5</span>, <span class="hljs-number">21</span>); <span class="hljs-comment">// returns: [4, 16, 56.25, 64, 132.25, 441]</span></code></pre>
<h3 id="articleHeader2">Classes</h3>
<p>JavaScript中其实并不存在真正的类，ES6的类其实是基于原型链模拟面向对象的一种语法糖。其本质上可以看做是构造函数的另一种写法。<br>与真的类一样，它支持<code>super</code>继承，实例，静态方法和<code>constructor</code>方法。<br>如果你也使用React，工作中定义模块时一定没少写过<code>class A extends React.Component{}</code>吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
// 通过extends关键字实现继承
class SkinnedMesh extends THREE.Mesh {
  //constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
  //一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  constructor(geometry, materials) {
    // super表示父类的构造函数，用来新建父类的this对象,
    // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。如果不调用super方法，子类就得不到this对象。
    super(geometry, materials);

    //在构造方法中绑定this,可以防止实例找不到this
    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  
  // 非定义在this上的方法都会被直接定义在原型链上
  update(camera) {
    //...
    // super在此处作为对象，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
    super.update();
  }
  // 可以使用get和set关键字，对某个属性设置存值函数和取值函数
  get boneCount() {
  // 类的方法内部如果含有this，它默认指向类的实例
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  
  // 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}

// 类的所有实例共享一个原型对象
let skin = new SkinnedMesh();
// 静态方法需要直接通过类调用
SkinnedMesh.defaultMatrix()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
  <span class="hljs-keyword">constructor</span>(x, y) {
    <span class="hljs-keyword">this</span>.x = x;
    <span class="hljs-keyword">this</span>.y = y;
  }

  toString() {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'('</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">', '</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">')'</span>;
  }
}
<span class="hljs-comment">// 通过extends关键字实现继承</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SkinnedMesh</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">THREE</span>.<span class="hljs-title">Mesh</span> </span>{
  <span class="hljs-comment">//constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。</span>
  <span class="hljs-comment">//一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。</span>
  <span class="hljs-keyword">constructor</span>(geometry, materials) {
    <span class="hljs-comment">// super表示父类的构造函数，用来新建父类的this对象,</span>
    <span class="hljs-comment">// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。如果不调用super方法，子类就得不到this对象。</span>
    <span class="hljs-keyword">super</span>(geometry, materials);

    <span class="hljs-comment">//在构造方法中绑定this,可以防止实例找不到this</span>
    <span class="hljs-keyword">this</span>.idMatrix = SkinnedMesh.defaultMatrix();
    <span class="hljs-keyword">this</span>.bones = [];
    <span class="hljs-keyword">this</span>.boneMatrices = [];
    <span class="hljs-comment">//...</span>
  }
  
  <span class="hljs-comment">// 非定义在this上的方法都会被直接定义在原型链上</span>
  update(camera) {
    <span class="hljs-comment">//...</span>
    <span class="hljs-comment">// super在此处作为对象，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</span>
    <span class="hljs-keyword">super</span>.update();
  }
  <span class="hljs-comment">// 可以使用get和set关键字，对某个属性设置存值函数和取值函数</span>
  get boneCount() {
  <span class="hljs-comment">// 类的方法内部如果含有this，它默认指向类的实例</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.bones.length;
  }
  set matrixType(matrixType) {
    <span class="hljs-keyword">this</span>.idMatrix = SkinnedMesh[matrixType]();
  }
  
  <span class="hljs-comment">// 加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用</span>
  <span class="hljs-keyword">static</span> defaultMatrix() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> THREE.Matrix4();
  }
}

<span class="hljs-comment">// 类的所有实例共享一个原型对象</span>
<span class="hljs-keyword">let</span> skin = <span class="hljs-keyword">new</span> SkinnedMesh();
<span class="hljs-comment">// 静态方法需要直接通过类调用</span>
SkinnedMesh.defaultMatrix()</code></pre>
<h3 id="articleHeader3">对象的拓展</h3>
<p>ES6中对象的使用方法得以拓展，主要包括以下几点：</p>
<ul>
<li><p>属性和方法可以简洁表示；</p></li>
<li><p>允许以表达式的模式定义属性名；</p></li>
<li><p>可以通过<code>__proto__</code>读取或设置当前对象的prototype对象;</p></li>
<li><p>使用<code>Object.is({},{})</code>判断两个对象是否完全相对，类似于<code>===</code>;</p></li>
<li><p><code>Object.assign(target, source1, source2)</code>合并对象；（浅拷贝）</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    // __proto__用以设置当前对象的prototype对象，不推荐使用，推荐使用Object.setPrototypeOf() 
    __proto__: theProtoObj,
    //‘handler:handler’可简写为handler（只需要写变量名就可以实现变量名为变量名，变量值为属性值）
    handler,
    // 简写在定义方法的时候同样有效
    toString() {
     // Super calls
     return &quot;d &quot; + super.toString();
    },
    // 方括号内的表达式用以计算属性名
    [ 'prop_' + (() => 42)() ]: 42
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-comment">// __proto__用以设置当前对象的prototype对象，不推荐使用，推荐使用Object.setPrototypeOf() </span>
    __proto__: theProtoObj,
    <span class="hljs-comment">//‘handler:handler’可简写为handler（只需要写变量名就可以实现变量名为变量名，变量值为属性值）</span>
    handler,
    <span class="hljs-comment">// 简写在定义方法的时候同样有效</span>
    toString() {
     <span class="hljs-comment">// Super calls</span>
     <span class="hljs-keyword">return</span> <span class="hljs-string">"d "</span> + <span class="hljs-keyword">super</span>.toString();
    },
    <span class="hljs-comment">// 方括号内的表达式用以计算属性名</span>
    [ <span class="hljs-string">'prop_'</span> + <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> <span class="hljs-number">42</span>)() ]: <span class="hljs-number">42</span>
};</code></pre>
<h3 id="articleHeader4">模板字符串</h3>
<p>模板字符串是一种组合字符串的语法糖，其使用类似于<code>Perl</code>,<code>Python</code>等语言的字符串修改方法类似，它的出现让我们拼合字符串时方便多了。目前相互中几乎所有字符串的拼接都用这个了，异常方便。</p>
<ul>
<li><p>模板字符串定义在两个反撇号中；</p></li>
<li><p>在模板字符串中可以直接换行，格式会得以保留；</p></li>
<li><p>通过<code>${}</code>可以很方便的在模板字符串中添加变量；</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把字符串放在``(注意不是引号)中就可以使用
`In JavaScript '\n' is a line-feed.`

// 模板字符串保留了换行
`In JavaScript this is
 not legal.`

// 在字符串中添加变量的方法，变量直接放在${}中即可
var name = &quot;Bob&quot;, time = &quot;today&quot;;
`Hello ${name}, how are you ${time}?`

// 拼合请求时异常方便了
POST`http://foo.org/bar?a=${a}&amp;b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { &quot;foo&quot;: ${foo},
       &quot;bar&quot;: ${bar"}}"`(myOnReadyStateChangeHandler);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 把字符串放在``(注意不是引号)中就可以使用</span>
<span class="hljs-string">`In JavaScript '\n' is a line-feed.`</span>

<span class="hljs-comment">// 模板字符串保留了换行</span>
<span class="hljs-string">`In JavaScript this is
 not legal.`</span>

<span class="hljs-comment">// 在字符串中添加变量的方法，变量直接放在${}中即可</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"Bob"</span>, time = <span class="hljs-string">"today"</span>;
<span class="hljs-string">`Hello <span class="hljs-subst">${name}</span>, how are you <span class="hljs-subst">${time}</span>?`</span>

<span class="hljs-comment">// 拼合请求时异常方便了</span>
POST<span class="hljs-string">`http://foo.org/bar?a=<span class="hljs-subst">${a}</span>&amp;b=<span class="hljs-subst">${b}</span>
     Content-Type: application/json
     X-Credentials: <span class="hljs-subst">${credentials}</span>
     { "foo": <span class="hljs-subst">${foo}</span>,
       "bar": <span class="hljs-subst">${bar}</span>}`</span>(myOnReadyStateChangeHandler);</code></pre>
<h3 id="articleHeader5">Destructuring 解构</h3>
<p>解构使用模式匹配的方法绑定变量和值，数组和对象都可使用。解构在绑定失败的时会实现软绑定，即没有匹配值时，返回<code>undefined</code>。使用方法可见示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数组解构
var [a, , b] = [1,2,3];
// a = 1,b = 3

// React中常见以下用法
var {a, b, c} = this.props;

// 对象解构也能用在函数的参数中
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// 绑定失败时返回undefined
var [a] = [];
a === undefined;

// 解构时也可以绑定默认值
var [a = 1] = [];
a === 1;

// 配合默认参数使用结构
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 数组解构</span>
<span class="hljs-keyword">var</span> [a, , b] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-comment">// a = 1,b = 3</span>

<span class="hljs-comment">// React中常见以下用法</span>
<span class="hljs-keyword">var</span> {a, b, c} = <span class="hljs-keyword">this</span>.props;

<span class="hljs-comment">// 对象解构也能用在函数的参数中</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params">{name: x}</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x);
}
g({<span class="hljs-attr">name</span>: <span class="hljs-number">5</span>})

<span class="hljs-comment">// 绑定失败时返回undefined</span>
<span class="hljs-keyword">var</span> [a] = [];
a === <span class="hljs-literal">undefined</span>;

<span class="hljs-comment">// 解构时也可以绑定默认值</span>
<span class="hljs-keyword">var</span> [a = <span class="hljs-number">1</span>] = [];
a === <span class="hljs-number">1</span>;

<span class="hljs-comment">// 配合默认参数使用结构</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">r</span>(<span class="hljs-params">{x, y, w = <span class="hljs-number">10</span>, h = <span class="hljs-number">10</span>}</span>) </span>{
  <span class="hljs-keyword">return</span> x + y + w + h;
}
r({<span class="hljs-attr">x</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">y</span>:<span class="hljs-number">2</span>}) === <span class="hljs-number">23</span></code></pre>
<h3 id="articleHeader6">默认值，剩余值和拓展值</h3>
<ul>
<li><p>ES6允许我们在给变量添加默认值</p></li>
<li><p>使用拓展值使得函数调用时可传入数组作为连续的参数</p></li>
<li><p>利用剩余值特性我们可以把函数尾部的参数转换为一个数组，现在使用<code>rest</code>就可以替换以前的<code>arguments</code>对象了。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给函数的参数添加默认值
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
// 可以只传参数x的值了
f(3) == 15

// 使用rest
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, &quot;hello&quot;, true) == 6

// 传入数组作为参数
function f(x, y, z) {
  return x + y + z;
}
// 直接传入数组当作上面函数的参数
f(...[1,2,3]) == 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 给函数的参数添加默认值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x, y=<span class="hljs-number">12</span></span>) </span>{
  <span class="hljs-comment">// y is 12 if not passed (or passed as undefined)</span>
  <span class="hljs-keyword">return</span> x + y;
}
<span class="hljs-comment">// 可以只传参数x的值了</span>
f(<span class="hljs-number">3</span>) == <span class="hljs-number">15</span>

<span class="hljs-comment">// 使用rest</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x, ...y</span>) </span>{
  <span class="hljs-comment">// y is an Array</span>
  <span class="hljs-keyword">return</span> x * y.length;
}
f(<span class="hljs-number">3</span>, <span class="hljs-string">"hello"</span>, <span class="hljs-literal">true</span>) == <span class="hljs-number">6</span>

<span class="hljs-comment">// 传入数组作为参数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x, y, z</span>) </span>{
  <span class="hljs-keyword">return</span> x + y + z;
}
<span class="hljs-comment">// 直接传入数组当作上面函数的参数</span>
f(...[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]) == <span class="hljs-number">6</span></code></pre>
<h3 id="articleHeader7">Let 和 Const</h3>
<p>ES6新增了块作用域，新增了两种定义变量的方法，定义变量时推荐使用<code>let</code>替代<code>var</code>，<code>let</code>定义的变量在块作用域内有效，<code>const</code>用以指定固定值，这两类新定义的变量不允许在定义前使用，也不允许重复定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
  {
    let x;
    {
      const x = &quot;sneaky&quot;;
      // 改变const
      x = &quot;foo&quot;;
    }
    // 重复定义会出错
    let x = &quot;inner&quot;;
  }
}

// 在这里想到一个使用var时新手特别容易犯的问题
for (var i=0; i<10; ++i) {
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}
// 使用var 所有的结果都是10
// 使用let 结果就是预想要的结果
for (let i=0; i<10; ++i) {
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  {
    <span class="hljs-keyword">let</span> x;
    {
      <span class="hljs-keyword">const</span> x = <span class="hljs-string">"sneaky"</span>;
      <span class="hljs-comment">// 改变const</span>
      x = <span class="hljs-string">"foo"</span>;
    }
    <span class="hljs-comment">// 重复定义会出错</span>
    <span class="hljs-keyword">let</span> x = <span class="hljs-string">"inner"</span>;
  }
}

<span class="hljs-comment">// 在这里想到一个使用var时新手特别容易犯的问题</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10</span>; ++i) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, i*<span class="hljs-number">1000</span>);
}
<span class="hljs-comment">// 使用var 所有的结果都是10</span>
<span class="hljs-comment">// 使用let 结果就是预想要的结果</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10</span>; ++i) {
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(i);
    }, i*<span class="hljs-number">1000</span>);
}</code></pre>
<h3 id="articleHeader8">Iterators + For..Of</h3>
<p>ES6为部署了Iterator接口的各种不同的数据结构提供了统一的访问机制。其本质是一个指针对象。每次调用<code>next</code>方法，可以把指针指向数据结构的下一个成员。具体说来，每一次调用next方法，都会返回数据结构的当前成员的信息（一个包含value和done两个属性的对象，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束）。</p>
<p>凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let fibonacci = {
  // 一个数据结构只要具有Symbol.iterator属性，就可被认为是可遍历的，`Symbol.iterator`是一个表达式，返回Symbol对象的iterator属性，所以需要放在[]中，本质上它是当前数据结构的遍历器生成函数。
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

// fibonacci部署了Symbol.iterator属性，只要done不为true就会一直遍历
for (var n of fibonacci) {
// 调用1000以内的值做遍历
  if (n > 1000)
    break;
  console.log(n);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> fibonacci = {
  <span class="hljs-comment">// 一个数据结构只要具有Symbol.iterator属性，就可被认为是可遍历的，`Symbol.iterator`是一个表达式，返回Symbol对象的iterator属性，所以需要放在[]中，本质上它是当前数据结构的遍历器生成函数。</span>
  [<span class="hljs-built_in">Symbol</span>.iterator]() {
    <span class="hljs-keyword">let</span> pre = <span class="hljs-number">0</span>, cur = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> {
      next() {
        [pre, cur] = [cur, pre + cur];
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">value</span>: cur }
      }
    }
  }
}

<span class="hljs-comment">// fibonacci部署了Symbol.iterator属性，只要done不为true就会一直遍历</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> n <span class="hljs-keyword">of</span> fibonacci) {
<span class="hljs-comment">// 调用1000以内的值做遍历</span>
  <span class="hljs-keyword">if</span> (n &gt; <span class="hljs-number">1000</span>)
    <span class="hljs-keyword">break</span>;
  <span class="hljs-built_in">console</span>.log(n);
}</code></pre>
<blockquote><p>原生具备<code>Iterator</code>接口的数据结构有以下几种:数组、某些类似数组的对象（字符串、DOM NodeList 对象、arguments对象）、Set和Map结构。</p></blockquote>
<p>对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。</p>
<blockquote><p>实际使用时需引入<a href="http://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">polyfill</a></p></blockquote>
<h3 id="articleHeader9">Generators</h3>
<p>可以从两个角度理解<code>Generators</code>，它既是状态机也是一个遍历器对象生成函数。执行该函数可以理解为启动了遍历器，之后每次执行<code>next()</code>函数则每次执行到<code>yield</code>处。</p>
<p>值得注意的是执行<code>next()</code>时可添加参数，这实现了在函数运行的不同阶段，可以从外部向内部注入不同的值，</p>
<p>生成器使用<code>function*</code>和<code>yield</code>简化了迭代过程，使用<code>function*</code>定义的函数返回了一个生成器实例。<br>生成器是迭代器的子类，但是包含<code>next</code>和<code>throw</code>。这使得值可以回流到生成器，<code>yield</code>是一个可以返回值的表达式。</p>
<p><code>for...of</code>循环可以自动遍历 <code>Generator</code> 函数时生成的<code>Iterator</code>对象，此时不再需要调用<code>next</code>方法。</p>
<p><code>Generator</code>的<code>return</code>方法会返回固定的值，终结遍历Generator函数。返回值的value属性就是return方法的参数，返回值的done属性为true。</p>
<p>结合<code>co</code>模块可以实现比Promise更加优雅的异步调用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用generator函数实现上述遍历器对象
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}

// 使用co模块（基于 Promise 对象的自动执行器），可以实现异步函数的自动执行
var gen = function* () {
  var f1 = yield somethingAsync();
  var f2 = yield anotherThingAsync();
};

var co = require('co');
co(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用generator函数实现上述遍历器对象</span>
<span class="hljs-keyword">var</span> fibonacci = {
  [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pre = <span class="hljs-number">0</span>, cur = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (;;) {
      <span class="hljs-keyword">var</span> temp = pre;
      pre = cur;
      cur += temp;
      <span class="hljs-keyword">yield</span> cur;
    }
  }
}

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> n <span class="hljs-keyword">of</span> fibonacci) {
  <span class="hljs-comment">// truncate the sequence at 1000</span>
  <span class="hljs-keyword">if</span> (n &gt; <span class="hljs-number">1000</span>)
    <span class="hljs-keyword">break</span>;
  <span class="hljs-built_in">console</span>.log(n);
}

<span class="hljs-comment">// 使用co模块（基于 Promise 对象的自动执行器），可以实现异步函数的自动执行</span>
<span class="hljs-keyword">var</span> gen = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> f1 = <span class="hljs-keyword">yield</span> somethingAsync();
  <span class="hljs-keyword">var</span> f2 = <span class="hljs-keyword">yield</span> anotherThingAsync();
};

<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);
co(gen);</code></pre>
<blockquote><p>实际使用时需引入<a href="http://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">polyfill</a></p></blockquote>
<h3 id="articleHeader10">Unicode</h3>
<p>ES6完整支持所有的Unicode,包括新的<code>Unicode</code>字面量和<code>u</code>模式正则，提供了新的API来处理<code>21bit</code>级别的字符串。这些新加特性使得我们的JavaScript应用有能力支持各种语言。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// same as ES5.1
&quot;?&quot;.length == 2

// 新的正则匹配模式
&quot;?&quot;.match(/./u)[0].length == 2

// 新形式
&quot;\u{20BB7}&quot;==&quot;?&quot;==&quot;\uD842\uDFB7&quot;

// codePointAt()能够正确处理4个字节储存的字符，返回一个字符的码点
&quot;?&quot;.codePointAt(0) == 0x20BB7

// for-of 遍历字符，以整体输出
for(var c of &quot;?&quot;) {
  console.log(c);
}
// ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// same as ES5.1</span>
<span class="hljs-string">"?"</span>.length == <span class="hljs-number">2</span>

<span class="hljs-comment">// 新的正则匹配模式</span>
<span class="hljs-string">"?"</span>.match(<span class="hljs-regexp">/./u</span>)[<span class="hljs-number">0</span>].length == <span class="hljs-number">2</span>

<span class="hljs-comment">// 新形式</span>
<span class="hljs-string">"\u{20BB7}"</span>==<span class="hljs-string">"?"</span>==<span class="hljs-string">"\uD842\uDFB7"</span>

<span class="hljs-comment">// codePointAt()能够正确处理4个字节储存的字符，返回一个字符的码点</span>
<span class="hljs-string">"?"</span>.codePointAt(<span class="hljs-number">0</span>) == <span class="hljs-number">0x20BB7</span>

<span class="hljs-comment">// for-of 遍历字符，以整体输出</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> c <span class="hljs-keyword">of</span> <span class="hljs-string">"?"</span>) {
  <span class="hljs-built_in">console</span>.log(c);
}
<span class="hljs-comment">// ?</span></code></pre>
<p>我们也可以在JS中写出Emoji了，很有趣，对不对：</p>
<p><span class="img-wrap"><img data-src="/img/bVPG0H?w=440&amp;h=96" src="https://static.alili.tech/img/bVPG0H?w=440&amp;h=96" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">Modules</h3>
<p>现代JS应用的开发离不开模块了，ES6对模块的定义提供了语言层面的支持。规范化了各种JavaScript模块加载器，支持运行时动态加载模块，支持异步加载模块。</p>
<p>ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量，效率要比 CommonJS 模块的加载方式高。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// lib/math.js 模块的定义
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;

// app.js 模块的全部引用
import * as math from &quot;lib/math&quot;;
alert(&quot;2π = &quot; + math.sum(math.pi, math.pi));

// otherApp.js 模块的部分引用
import {sum, pi} from &quot;lib/math&quot;;
alert(&quot;2π = &quot; + sum(pi, pi));

// 模块导出方法
// lib/mathplusplus.js
export * from &quot;lib/math&quot;;
export var e = 2.71828182846;
export default function(x) {
    return Math.log(x);
}

// 混合引入方法
import ln, {pi, e} from &quot;lib/mathplusplus&quot;;
alert(&quot;2π = &quot; + ln(e)*pi*2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// lib/math.js 模块的定义</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">return</span> x + y;
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> pi = <span class="hljs-number">3.141593</span>;

<span class="hljs-comment">// app.js 模块的全部引用</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> math <span class="hljs-keyword">from</span> <span class="hljs-string">"lib/math"</span>;
alert(<span class="hljs-string">"2π = "</span> + math.sum(math.pi, math.pi));

<span class="hljs-comment">// otherApp.js 模块的部分引用</span>
<span class="hljs-keyword">import</span> {sum, pi} <span class="hljs-keyword">from</span> <span class="hljs-string">"lib/math"</span>;
alert(<span class="hljs-string">"2π = "</span> + sum(pi, pi));

<span class="hljs-comment">// 模块导出方法</span>
<span class="hljs-comment">// lib/mathplusplus.js</span>
<span class="hljs-keyword">export</span> * <span class="hljs-keyword">from</span> <span class="hljs-string">"lib/math"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">var</span> e = <span class="hljs-number">2.71828182846</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.log(x);
}

<span class="hljs-comment">// 混合引入方法</span>
<span class="hljs-keyword">import</span> ln, {pi, e} <span class="hljs-keyword">from</span> <span class="hljs-string">"lib/mathplusplus"</span>;
alert(<span class="hljs-string">"2π = "</span> + ln(e)*pi*<span class="hljs-number">2</span>);</code></pre>
<h3 id="articleHeader12">Module Loaders（其实并非ES6标准的一部分，只是草案）</h3>
<p>模块加载器支持以下功能：</p>
<ul>
<li><p>动态加载</p></li>
<li><p>状态隔离</p></li>
<li><p>全局命名空间隔离</p></li>
<li><p>编写钩子</p></li>
<li><p>嵌套</p></li>
</ul>
<p>默认的模块加载器可以被配置，新的加载器可以被配置来评估加载独立上下文中的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 动态加载 – ‘System’ 是默认的加载器
System.import('lib/math').then(function(m) {
  alert(&quot;2π = &quot; + m.sum(m.pi, m.pi));
});

// 新的加载器创建了执行沙盒
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval(&quot;console.log('hello world!');&quot;);

// 可以直接修改模块的缓存
System.get('jquery');
System.set('jquery', Module({$: $})); // WARNING: not yet finalized" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 动态加载 – ‘System’ 是默认的加载器</span>
System.import(<span class="hljs-string">'lib/math'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>) </span>{
  alert(<span class="hljs-string">"2π = "</span> + m.sum(m.pi, m.pi));
});

<span class="hljs-comment">// 新的加载器创建了执行沙盒</span>
<span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> Loader({
  <span class="hljs-attr">global</span>: fixup(<span class="hljs-built_in">window</span>) <span class="hljs-comment">// replace ‘console.log’</span>
});
loader.eval(<span class="hljs-string">"console.log('hello world!');"</span>);

<span class="hljs-comment">// 可以直接修改模块的缓存</span>
System.get(<span class="hljs-string">'jquery'</span>);
System.set(<span class="hljs-string">'jquery'</span>, Module({<span class="hljs-attr">$</span>: $})); <span class="hljs-comment">// WARNING: not yet finalized</span></code></pre>
<h3 id="articleHeader13">Map Set WeakMap WeakSet</h3>
<p>ES6为算法提供了新的高效的数据结构，<code>WeakMaps</code>提供了防泄漏的键值对表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Set类似于数组，但是成员的值都是唯一的，没有重复的值。
var s = new Set();
s.add(&quot;hello&quot;).add(&quot;goodbye&quot;).add(&quot;hello&quot;);
s.size === 2;
s.has(&quot;hello&quot;) === true;

// Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
var m = new Map();
m.set(&quot;hello&quot;, 42);
m.set(s, 34);
m.get(s) == 34;

// WeakMap结构与Map结构类似，也是用于生成键值对的集合，但是WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，此外WeakMap的键名所指向的对象，不计入垃圾回收机制。
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// WeakSet 结构与 Set 类似，也是不重复的值的集合,但是WeakSet 的成员只能是对象，而不能是其他类型的值，此外WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Set类似于数组，但是成员的值都是唯一的，没有重复的值。</span>
<span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();
s.add(<span class="hljs-string">"hello"</span>).add(<span class="hljs-string">"goodbye"</span>).add(<span class="hljs-string">"hello"</span>);
s.size === <span class="hljs-number">2</span>;
s.has(<span class="hljs-string">"hello"</span>) === <span class="hljs-literal">true</span>;

<span class="hljs-comment">// Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。</span>
<span class="hljs-keyword">var</span> m = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
m.set(<span class="hljs-string">"hello"</span>, <span class="hljs-number">42</span>);
m.set(s, <span class="hljs-number">34</span>);
m.get(s) == <span class="hljs-number">34</span>;

<span class="hljs-comment">// WeakMap结构与Map结构类似，也是用于生成键值对的集合，但是WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名，此外WeakMap的键名所指向的对象，不计入垃圾回收机制。</span>
<span class="hljs-keyword">var</span> wm = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>();
wm.set(s, { <span class="hljs-attr">extra</span>: <span class="hljs-number">42</span> });
wm.size === <span class="hljs-literal">undefined</span>

<span class="hljs-comment">// WeakSet 结构与 Set 类似，也是不重复的值的集合,但是WeakSet 的成员只能是对象，而不能是其他类型的值，此外WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用</span>
<span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakSet</span>();
ws.add({ <span class="hljs-attr">data</span>: <span class="hljs-number">42</span> });
<span class="hljs-comment">// Because the added object has no other references, it will not be held in the set</span></code></pre>
<blockquote><p>实际使用时需引入<a href="http://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">polyfill</a></p></blockquote>
<h3 id="articleHeader14">Proxies</h3>
<p>Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。</p>
<p>可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。</p>
<blockquote><p>需要注意的是目前未被Babel支持，使用时需谨慎</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// target参数表示所要拦截的目标对象;
var target = {};

// handler参数也是一个对象，用来定制拦截行为;
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

// 生成一个Proxy实例
var p = new Proxy(target, handler);
p.world === 'Hello, world!';


// 对函数同样可以使用代理
var target = function () { return 'I am the target'; };
var handler = {
  apply: function (receiver, ...args) {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);
p() === 'I am the proxy';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// target参数表示所要拦截的目标对象;</span>
<span class="hljs-keyword">var</span> target = {};

<span class="hljs-comment">// handler参数也是一个对象，用来定制拦截行为;</span>
<span class="hljs-keyword">var</span> handler = {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">receiver, name</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">`Hello, <span class="hljs-subst">${name}</span>!`</span>;
  }
};

<span class="hljs-comment">// 生成一个Proxy实例</span>
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handler);
p.world === <span class="hljs-string">'Hello, world!'</span>;


<span class="hljs-comment">// 对函数同样可以使用代理</span>
<span class="hljs-keyword">var</span> target = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">'I am the target'</span>; };
<span class="hljs-keyword">var</span> handler = {
  <span class="hljs-attr">apply</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">receiver, ...args</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">'I am the proxy'</span>;
  }
};

<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handler);
p() === <span class="hljs-string">'I am the proxy'</span>;</code></pre>
<p>// Proxy支持的拦截操作如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var handler =
{
  get:...,
  set:...,
  has:...,
  deleteProperty:...,
  apply:...,
  construct:...,
  getOwnPropertyDescriptor:...,
  defineProperty:...,
  getPrototypeOf:...,
  setPrototypeOf:...,
  enumerate:...,
  ownKeys:...,
  preventExtensions:...,
  isExtensible:...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> handler =
{
  <span class="hljs-attr">get</span>:...,
  <span class="hljs-attr">set</span>:...,
  <span class="hljs-attr">has</span>:...,
  <span class="hljs-attr">deleteProperty</span>:...,
  <span class="hljs-attr">apply</span>:...,
  <span class="hljs-attr">construct</span>:...,
  <span class="hljs-attr">getOwnPropertyDescriptor</span>:...,
  <span class="hljs-attr">defineProperty</span>:...,
  <span class="hljs-attr">getPrototypeOf</span>:...,
  <span class="hljs-attr">setPrototypeOf</span>:...,
  <span class="hljs-attr">enumerate</span>:...,
  <span class="hljs-attr">ownKeys</span>:...,
  <span class="hljs-attr">preventExtensions</span>:...,
  <span class="hljs-attr">isExtensible</span>:...
}</code></pre>
<blockquote><p>Babel 不支持，使用时应注意</p></blockquote>
<h3 id="articleHeader15">Symbols</h3>
<p><code>Symbol</code>保证每个属性的名字都是独一无二的，这样就从根本上防止了属性名的冲突；<br>它是一种类似于字符串的数据类型,Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述；<br>Symbols是唯一的，单并非私有的，通过<code>Object.getOwnPropertySymbols</code>可以获取对应的值；<br>Symbol 值作为对象属性名时，不能用点运算符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyClass = (function() {

  // module scoped symbol
  var key = Symbol(&quot;key&quot;);

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  return MyClass;
})();

var c = new MyClass(&quot;hello&quot;)
c[&quot;key&quot;] === undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> MyClass = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-comment">// module scoped symbol</span>
  <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">"key"</span>);

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyClass</span>(<span class="hljs-params">privateData</span>) </span>{
    <span class="hljs-keyword">this</span>[key] = privateData;
  }

  MyClass.prototype = {
    <span class="hljs-attr">doStuff</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      ... this[key] ...
    }
  };

  <span class="hljs-keyword">return</span> MyClass;
})();

<span class="hljs-keyword">var</span> c = <span class="hljs-keyword">new</span> MyClass(<span class="hljs-string">"hello"</span>)
c[<span class="hljs-string">"key"</span>] === <span class="hljs-literal">undefined</span></code></pre>
<blockquote><p>由于语言限制，Babel只提供部分支持，使用时需要注意</p></blockquote>
<h3 id="articleHeader16">内置类的继承</h3>
<p>在ES6中，内置的<code>Array</code>,<code>Date</code>,<code>DOM Element</code>可以被继承以拓展了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// User code of Array subclass</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyArray</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Array</span> </span>{
    <span class="hljs-keyword">constructor</span>(...args) { <span class="hljs-keyword">super</span>(...args); }
}

<span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> MyArray();
arr[<span class="hljs-number">1</span>] = <span class="hljs-number">12</span>;
arr.length == <span class="hljs-number">2</span></code></pre>
<blockquote><p>babel 部分支持，由于ES5引擎的限制<code>Date</code>,<code>Array</code>,<code>Error</code>不被支持，但是<code>HTMLElement</code>是被支持的</p></blockquote>
<h3 id="articleHeader17">Math + Number + String + Array + Object APIs</h3>
<p>ES6 为很多旧有对象添加了新的API，这些对象包括<code>Math</code>,<code>Array器</code>，<code>String</code>,<code>Object</code>，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN(&quot;NaN&quot;) // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

&quot;abcde&quot;.includes(&quot;cd&quot;) // true
&quot;abc&quot;.repeat(3) // &quot;abcabcabc&quot;

Array.from(document.querySelectorAll('*')) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0,7,7]
[1, 2, 3].find(x => x == 3) // 3
[1, 2, 3].findIndex(x => x == 2) // 1
[1, 2, 3, 4, 5].copyWithin(3, 0) // [1, 2, 3, 1, 2]
[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;].entries() // iterator [0, &quot;a&quot;], [1,&quot;b&quot;], [2,&quot;c&quot;]
[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;].keys() // iterator 0, 1, 2
[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;].values() // iterator &quot;a&quot;, &quot;b&quot;, &quot;c&quot;

Object.assign(Point, { origin: new Point(0,0) })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Number</span>.EPSILON
<span class="hljs-built_in">Number</span>.isInteger(<span class="hljs-literal">Infinity</span>) <span class="hljs-comment">// false</span>
<span class="hljs-built_in">Number</span>.isNaN(<span class="hljs-string">"NaN"</span>) <span class="hljs-comment">// false</span>

<span class="hljs-built_in">Math</span>.acosh(<span class="hljs-number">3</span>) <span class="hljs-comment">// 1.762747174039086</span>
<span class="hljs-built_in">Math</span>.hypot(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>) <span class="hljs-comment">// 5</span>
<span class="hljs-built_in">Math</span>.imul(<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">32</span>) - <span class="hljs-number">1</span>, <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">32</span>) - <span class="hljs-number">2</span>) <span class="hljs-comment">// 2</span>

<span class="hljs-string">"abcde"</span>.includes(<span class="hljs-string">"cd"</span>) <span class="hljs-comment">// true</span>
<span class="hljs-string">"abc"</span>.repeat(<span class="hljs-number">3</span>) <span class="hljs-comment">// "abcabcabc"</span>

<span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">'*'</span>)) <span class="hljs-comment">// Returns a real Array</span>
<span class="hljs-built_in">Array</span>.of(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>) <span class="hljs-comment">// Similar to new Array(...), but without special one-arg behavior</span>
[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>].fill(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>) <span class="hljs-comment">// [0,7,7]</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].find(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x == <span class="hljs-number">3</span>) <span class="hljs-comment">// 3</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].findIndex(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x == <span class="hljs-number">2</span>) <span class="hljs-comment">// 1</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>].copyWithin(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// [1, 2, 3, 1, 2]</span>
[<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>].entries() <span class="hljs-comment">// iterator [0, "a"], [1,"b"], [2,"c"]</span>
[<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>].keys() <span class="hljs-comment">// iterator 0, 1, 2</span>
[<span class="hljs-string">"a"</span>, <span class="hljs-string">"b"</span>, <span class="hljs-string">"c"</span>].values() <span class="hljs-comment">// iterator "a", "b", "c"</span>

<span class="hljs-built_in">Object</span>.assign(Point, { <span class="hljs-attr">origin</span>: <span class="hljs-keyword">new</span> Point(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>) })</code></pre>
<blockquote><p>babel 通过 polyfill 提供部分支持</p></blockquote>
<h3 id="articleHeader18">二进制和八进制字面量</h3>
<p>ES6添加了二进制和八进制数值的字面量定义方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0b111110111 === 503 // true
0o767 === 503 // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">0b111110111</span> === <span class="hljs-number">503</span> <span class="hljs-comment">// true</span>
<span class="hljs-number">0o767</span> === <span class="hljs-number">503</span> <span class="hljs-comment">// true</span></code></pre>
<blockquote><p>babel 只支持字面量形式，不支持 Number("0o767")形式</p></blockquote>
<h3 id="articleHeader19">Promise</h3>
<p>Promise为异步编程提供了一种新的方式，Promise把未来将用到的值当做一等对象，Promise在很多前端库中已经有所支持了。这个平时用得最多了，还没使用的推荐试试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error(&quot;hmm&quot;);
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">duration = <span class="hljs-number">0</span></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        setTimeout(resolve, duration);
    })
}

<span class="hljs-keyword">var</span> p = timeout(<span class="hljs-number">1000</span>).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> timeout(<span class="hljs-number">2000</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"hmm"</span>);
}).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([timeout(<span class="hljs-number">100</span>), timeout(<span class="hljs-number">200</span>)]);
})</code></pre>
<blockquote><p>实际使用时需引入<a href="http://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">polyfill</a></p></blockquote>
<h3 id="articleHeader20">Reflect API</h3>
<p>Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API，作用如下：</p>
<ul>
<li><p>将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上；</p></li>
<li><p>修改某些Object方法的返回结果，让其变得更合理；</p></li>
<li><p>让Object操作都变成函数行为，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。</p></li>
<li><p>Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法；</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b){
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> O = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>};
<span class="hljs-built_in">Object</span>.defineProperty(O, <span class="hljs-string">'b'</span>, {<span class="hljs-attr">value</span>: <span class="hljs-number">2</span>});
O[<span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'c'</span>)] = <span class="hljs-number">3</span>;

<span class="hljs-built_in">Reflect</span>.ownKeys(O); <span class="hljs-comment">// ['a', 'b', Symbol(c)]</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">a, b</span>)</span>{
  <span class="hljs-keyword">this</span>.c = a + b;
}
<span class="hljs-keyword">var</span> instance = <span class="hljs-built_in">Reflect</span>.construct(C, [<span class="hljs-number">20</span>, <span class="hljs-number">22</span>]);
instance.c; <span class="hljs-comment">// 42</span></code></pre>
<blockquote><p>实际使用时需引入<a href="http://babeljs.io/docs/usage/polyfill/" rel="nofollow noreferrer" target="_blank">polyfill</a></p></blockquote>
<h3 id="articleHeader21">Tail Calls</h3>
<p>尾部调用被保证不能无限拓展栈，这让有无限制输入时的递归算法更加安全。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, acc = 1) {
    'use strict';
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// 堆栈越来越常用，在ES6中其使用更加安全了
factorial(100000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, acc = <span class="hljs-number">1</span></span>) </span>{
<span class="hljs-meta">    'use strict'</span>;
    <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> acc;
    <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, n * acc);
}

<span class="hljs-comment">// 堆栈越来越常用，在ES6中其使用更加安全了</span>
factorial(<span class="hljs-number">100000</span>)</code></pre>
<h3 id="articleHeader22">说明</h3>
<p>上文对ES6的新特性都做了简单的描述，但是关于<code>Reflect API</code>和<code>Proxies</code>,由于本人对他们的理解还不够透彻，说得可能有些不清不楚。希望阅读本文让你有收获，有任何疑问，大家也可以一起讨论。</p>
<h3 id="articleHeader23">有用的链接</h3>
<ul>
<li><p><a href="https://github.com/lukehoban/es6features" rel="nofollow noreferrer" target="_blank">ECMAScript 6 Features</a></p></li>
<li><p><a href="https://babeljs.io/learn-es2015/" rel="nofollow noreferrer" target="_blank">Learn ES2015</a></p></li>
<li><p><a>ECMAScript 6 入门</a></p></li>
<li><p><a href="https://github.com/getify/You-Dont-Know-JS" rel="nofollow noreferrer" target="_blank">You don't know js</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重温ES6核心概念和基本用法

## 原文链接
[https://segmentfault.com/a/1190000009885614](https://segmentfault.com/a/1190000009885614)


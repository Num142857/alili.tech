---
title: 'JS 装饰器，一篇就够' 
date: 2018-12-04 2:30:05
hidden: true
slug: mlhln5s2gji
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>更多文章，请在<a href="https://github.com/Pines-Cheng/blog/issues" rel="nofollow noreferrer">Github blog</a>查看</blockquote>
<p>在 ES6 中增加了对类对象的相关定义和操作（比如 class 和 extends ），这就使得我们在多个不同类之间共享或者扩展一些方法或者行为的时候，变得并不是那么优雅。这个时候，我们就需要一种更优雅的方法来帮助我们完成这些事情。</p>
<h2>什么是装饰器</h2>
<h3>Python 的装饰器</h3>
<p>在面向对象（OOP）的设计模式中，decorator被称为装饰模式。OOP的装饰模式需要通过继承和组合来实现，而Python除了能支持 OOP 的 decorator 外，直接从语法层次支持 decorator。</p>
<p>如果你熟悉 python 的话，对它一定不会陌生。那么我们先来看一下 python 里的装饰器是什么样子的吧：</p>
<pre><code class="python">def decorator(f):
    print "my decorator"
    return f
@decorator
def myfunc():
    print "my function"
myfunc()
# my decorator
# my function</code></pre>
<p>这里的 @decorator 就是我们说的装饰器。在上面的代码中，我们利用装饰器给我们的目标方法执行前打印出了一行文本，并且并没有对原方法做任何的修改。代码基本等同于：</p>
<pre><code class="python">def decorator(f):
    def wrapper():
        print "my decorator"
        return f()
    return wrapper
def myfunc():
    print "my function"
myfunc = decorator(myfuc)</code></pre>
<p>通过代码我们也不难看出，装饰器 decorator 接收一个参数，也就是我们被装饰的目标方法，处理完扩展的内容以后再返回一个方法，供以后调用，同时也失去了对原方法对象的访问。当我们对某个应用了装饰以后，其实就改变了被装饰方法的入口引用，使其重新指向了装饰器返回的方法的入口点，从而来实现我们对原函数的扩展、修改等操作。</p>
<h3>ES7 的装饰器</h3>
<p>ES7 中的 decorator 同样借鉴了这个语法糖，不过依赖于 ES5 的 <code>Object.defineProperty</code> 方法 。</p>
<h2>Object.defineProperty</h2>
<p><code>Object.defineProperty() </code>方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。</p>
<p>该方法允许精确添加或修改对象的属性。通过赋值来添加的普通属性会创建在属性枚举期间显示的属性（for...in 或 Object.keys 方法）， 这些值可以被改变，也可以被删除。这种方法允许这些额外的细节从默认值改变。默认情况下，使用 <code>Object.defineProperty()</code> 添加的属性值是不可变的。</p>
<h3>语法</h3>
<pre><code class="js">Object.defineProperty(obj, prop, descriptor)</code></pre>
<ul>
<li>
<code>obj</code>：要在其上定义属性的对象。</li>
<li>
<code>prop</code>：要定义或修改的属性的名称。</li>
<li>
<code>descriptor</code>：将被定义或修改的属性描述符。</li>
<li>返回值：被传递给函数的对象。</li>
</ul>
<p>在ES6中，由于 Symbol类型 的特殊性，用 Symbol类型 的值来做对象的key与常规的定义或修改不同，而<code>Object.defineProperty</code> 是定义 key为 Symbol 的属性的方法之一。</p>
<h3>属性描述符</h3>
<p>对象里目前存在的属性描述符有两种主要形式：<strong>数据描述符</strong>和<strong>存取描述符</strong>。</p>
<ul>
<li>
<strong>数据描述符</strong>是一个具有值的属性，该值可能是可写的，也可能不是可写的。</li>
<li>
<strong>存取描述符</strong>是由 getter-setter 函数对描述的属性。</li>
</ul>
<p>描述符必须是这两种形式之一；不能同时是两者。</p>
<p>数据描述符和存取描述符均具有以下可选键值：</p>
<h4>configurable</h4>
<p>当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false。</p>
<h4>enumerable</h4>
<p>enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。</p>
<p>当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中。默认为 false。<br>数据描述符同时具有以下可选键值：</p>
<h4>value</h4>
<p>该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined。</p>
<h4>writable</h4>
<p>当且仅当该属性的 writable 为 true 时，value 才能被赋值运算符改变。默认为 false。</p>
<p>存取描述符同时具有以下可选键值：</p>
<h4>get</h4>
<p>一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。</p>
<h4>set</h4>
<p>一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined。</p>
<blockquote>如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。</blockquote>
<h2>用法</h2>
<h3>类的装饰</h3>
<pre><code class="js">@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true</code></pre>
<p>上面代码中，<code>@testable</code> 就是一个装饰器。它修改了 MyTestableClass这 个类的行为，为它加上了静态属性isTestable。testable 函数的参数 target 是 MyTestableClass 类本身。</p>
<p>基本上，装饰器的行为就是下面这样。</p>
<pre><code class="js">@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;</code></pre>
<p>也就是说，<strong>装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类</strong>。</p>
<p>如果觉得一个参数不够用，可以在装饰器外面再封装一层函数。</p>
<pre><code class="js">function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false</code></pre>
<p>上面代码中，装饰器 testable 可以接受参数，这就等于可以修改装饰器的行为。</p>
<p>注意，<strong>装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时</strong>。这意味着，装饰器能在编译阶段运行代码。也就是说，<strong>装饰器本质就是编译时执行的函数</strong>。</p>
<p>前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的 prototype 对象操作。</p>
<p>下面是另外一个例子。</p>
<pre><code class="js">// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'</code></pre>
<p>上面代码通过装饰器 mixins，把Foo对象的方法添加到了 MyClass 的实例上面。</p>
<h3>方法的装饰</h3>
<p>装饰器不仅可以装饰类，还可以装饰类的属性。</p>
<pre><code class="js">class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}</code></pre>
<p>上面代码中，装饰器 readonly 用来装饰“类”的name方法。</p>
<p>装饰器函数 readonly 一共可以接受三个参数。</p>
<pre><code class="js">function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);</code></pre>
<ul>
<li>装饰器第一个参数是 <strong>类的原型对象</strong>，上例是 Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（<strong>这不同于类的装饰，那种情况时target参数指的是类本身</strong>）；</li>
<li>第二个参数是 <strong>所要装饰的属性名</strong>
</li>
<li>第三个参数是 <strong>该属性的描述对象</strong>
</li>
</ul>
<p>另外，上面代码说明，<code>装饰器（readonly</code>）会修改属性的 <code>描述对象（descriptor）</code>，然后被修改的描述对象再用来定义属性。</p>
<h3>函数方法的装饰</h3>
<p><strong>装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升</strong>。</p>
<p>另一方面，如果一定要装饰函数，可以采用高阶函数的形式直接执行。</p>
<pre><code class="js">function doSomething(name) {
  console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('Starting');
    const result = wrapped.apply(this, arguments);
    console.log('Finished');
    return result;
  }
}

const wrapped = loggingDecorator(doSomething);</code></pre>
<h2>core-decorators.js</h2>
<p><a href="https://github.com/jayphelps/core-decorators.js" rel="nofollow noreferrer">core-decorators.js</a>是一个第三方模块，提供了几个常见的装饰器，通过它可以更好地理解装饰器。</p>
<h3>@autobind</h3>
<p>autobind 装饰器使得方法中的this对象，绑定原始对象。</p>
<h3>@readonly</h3>
<p>readonly 装饰器使得属性或方法不可写。</p>
<h3>@override</h3>
<p>override 装饰器检查子类的方法，是否正确覆盖了父类的同名方法，如果不正确会报错。</p>
<pre><code class="js">import { override } from 'core-decorators';

class Parent {
  speak(first, second) {}
}

class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}

// or

class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  //
  //   Did you mean "speak"?
}</code></pre>
<h3>@deprecate (别名@deprecated)</h3>
<p>deprecate 或 deprecated 装饰器在控制台显示一条警告，表示该方法将废除。</p>
<pre><code class="js">import { deprecate } from 'core-decorators';

class Person {
  @deprecate
  facepalm() {}

  @deprecate('We stopped facepalming')
  facepalmHard() {}

  @deprecate('We stopped facepalming', { url: 'http://knowyourmeme.com/memes/facepalm' })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
//
//     See http://knowyourmeme.com/memes/facepalm for more details.
//</code></pre>
<h3>@suppressWarnings</h3>
<p>suppressWarnings 装饰器抑制 deprecated 装饰器导致的 console.warn() 调用。但是，异步代码发出的调用除外。</p>
<h2>使用场景</h2>
<h3>装饰器有注释的作用</h3>
<pre><code class="js">@testable
class Person {
  @readonly
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}</code></pre>
<p>从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。</p>
<h3>React 的 connect</h3>
<p>实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。</p>
<pre><code class="js">class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);</code></pre>
<p>有了装饰器，就可以改写上面的代码。装饰</p>
<pre><code class="js">@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}</code></pre>
<p>相对来说，后一种写法看上去更容易理解。</p>
<h3>新功能提醒或权限</h3>
<p>菜单点击时，进行事件拦截，若该菜单有新功能更新，则弹窗显示。</p>
<pre><code class="js">/**
 * @description 在点击时，如果有新功能提醒，则弹窗显示
 * @param code 新功能的code
 * @returns {function(*, *, *)}
 */
 const checkRecommandFunc = (code) =&gt; (target, property, descriptor) =&gt; {
    let desF = descriptor.value; 
    descriptor.value = function (...args) {
      let recommandFuncModalData = SYSTEM.recommandFuncCodeMap[code];

      if (recommandFuncModalData &amp;&amp; recommandFuncModalData.id) {
        setTimeout(() =&gt; {
          this.props.dispatch({type: 'global/setRecommandFuncModalData', recommandFuncModalData});
        }, 1000);
      }
      desF.apply(this, args);
    };
    return descriptor;
  };
</code></pre>
<h3>loading</h3>
<p>在 React 项目中，我们可能需要在向后台请求数据时，页面出现 loading 动画。这个时候，你就可以使用装饰器，优雅地实现功能。</p>
<pre><code class="js">@autobind
@loadingWrap(true)
async handleSelect(params) {
  await this.props.dispatch({
    type: 'product_list/setQuerypParams',
    querypParams: params
  });
}</code></pre>
<p>loadingWrap 函数如下：</p>
<pre><code class="js">export function loadingWrap(needHide) {

  const defaultLoading = (
    &lt;div className="toast-loading"&gt;
      &lt;Loading className="loading-icon"/&gt;
      &lt;div&gt;加载中...&lt;/div&gt;
    &lt;/div&gt;
  );

  return function (target, property, descriptor) {
    const raw = descriptor.value;
    
    descriptor.value = function (...args) {
      Toast.info(text || defaultLoading, 0, null, true);
      const res = raw.apply(this, args);
      
      if (needHide) {
        if (get('finally')(res)) {
          res.finally(() =&gt; {
            Toast.hide();
          });
        } else {
          Toast.hide();
        }
      }
    };
    return descriptor;
  };
}</code></pre>
<p>问题：这里大家可以想想看，如果我们不希望每次请求数据时都出现 loading，而是要求只要后台请求时间大于 300ms 时，才显示loading，这里需要怎么改？</p>
<h2>参考</h2>
<ul>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer">Object.defineProperty()</a></li>
<li><a href="https://www.sitepoint.com/javascript-decorators-what-they-are/" rel="nofollow noreferrer">JavaScript Decorators: What They Are and When to Use Them</a></li>
<li><a href="http://es6.ruanyifeng.com/#docs/decorator#core-decorators-js" rel="nofollow noreferrer">ECMAScript 6 入门</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS 装饰器，一篇就够

## 原文链接
[https://segmentfault.com/a/1190000014495089](https://segmentfault.com/a/1190000014495089)


---
title: '拿Proxy可以做哪些有意思的事儿' 
date: 2018-11-29 9:34:56
hidden: true
slug: jfupnfxx5hf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Proxy是什么</h2>
<p>首先，我们要清楚，<code>Proxy</code>是什么意思，这个单词翻译过来，就是 <strong>代理</strong>。  <br>可以理解为，有一个很火的明星，开通了一个微博账号，这个账号非常活跃，回复粉丝、到处点赞之类的，但可能并不是真的由本人在维护的。  <br>而是在背后有一个其他人 or 团队来运营，我们就可以称他们为代理人，因为他们发表的微博就代表了明星本人的意思。  <br><em>P.S. 强行举例子，因为本人不追星，只是猜测可能会有这样的运营团队</em></p>
<p>这个代入到<code>JavaScript</code>当中来，就可以理解为对<code>对象</code>或者<code>函数</code>的代理操作。</p>
<h2 id="articleHeader1">JavaScript中的Proxy</h2>
<p>Proxy是ES6中提供的新的API，可以用来定义对象各种基本操作的自定义行为  <br><em>（在文档中被称为<code>traps</code>，我觉得可以理解为一个针对对象各种行为的钩子）</em>  <br>拿它可以做很多有意思的事情，在我们需要对一些对象的行为进行控制时将变得非常有效。</p>
<h2 id="articleHeader2">Proxy的语法</h2>
<p>创建一个<code>Proxy</code>的实例需要传入两个参数</p>
<ol>
<li>
<code>target</code>  要被代理的对象，可以是一个<code>object</code>或者<code>function</code>
</li>
<li>
<code>handlers</code>对该代理对象的各种操作行为处理</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let target = {}
let handlers = {} // do nothing
let proxy = new Proxy(target, handlers)

proxy.a = 123

console.log(target.a) // 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> target = {}
<span class="hljs-keyword">let</span> handlers = {} <span class="hljs-comment">// do nothing</span>
<span class="hljs-keyword">let</span> proxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handlers)

proxy.a = <span class="hljs-number">123</span>

<span class="hljs-built_in">console</span>.log(target.a) <span class="hljs-comment">// 123</span></code></pre>
<p>在第二个参数为空对象的情况下，基本可以理解为是对第一个参数做的一次浅拷贝  <br><em>（Proxy必须是浅拷贝，如果是深拷贝则会失去了代理的意义）</em></p>
<h2 id="articleHeader3">Traps(各种行为的代理)</h2>
<p>就像上边的示例代码一样，如果没有定义对应的<code>trap</code>，则不会起任何作用，相当于直接操作了<code>target</code>。  <br>当我们写了某个<code>trap</code>以后，在做对应的动作时，就会触发我们的回调函数，由我们来控制被代理对象的行为。  </p>
<p>最常用的两个<code>trap</code>应该就是<code>get</code>和<code>set</code>了。  <br>早年<code>JavaScript</code>有着在定义对象时针对某个属性进行设置<code>getter</code>、<code>setter</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
  _age: 18,
  get age ()  {
    return `I'm ${this._age} years old`
  },
  set age (val) {
    this._age = Number(val)
  }
}

console.log(obj.age) // I'm 18 years old
obj.age = 19
console.log(obj.age) // I'm 19 years old" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">_age</span>: <span class="hljs-number">18</span>,
  get age ()  {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`I'm <span class="hljs-subst">${<span class="hljs-keyword">this</span>._age}</span> years old`</span>
  },
  set age (val) {
    <span class="hljs-keyword">this</span>._age = <span class="hljs-built_in">Number</span>(val)
  }
}

<span class="hljs-built_in">console</span>.log(obj.age) <span class="hljs-comment">// I'm 18 years old</span>
obj.age = <span class="hljs-number">19</span>
<span class="hljs-built_in">console</span>.log(obj.age) <span class="hljs-comment">// I'm 19 years old</span></code></pre>
<p>就像这段代码描述的一样，我们设置了一个属性<code>_age</code>，然后又设置了一个<code>get age</code>和<code>set age</code>。  <br>然后我们可以直接调用<code>obj.age</code>来获取一个返回值，也可以对其进行赋值。  <br>这么做有几个缺点：</p>
<ol>
<li>针对每一个要代理的属性都要编写对应的<code>getter</code>、<code>setter</code>。</li>
<li>必须还要存在一个存储真实值的<code>key</code><em>（如果我们直接在<code>getter</code>里边调用<code>this.age</code>则会出现堆栈溢出的情况，因为无论何时调用<code>this.age</code>进行取值都会触发<code>getter</code>）</em>。</li>
</ol>
<p><code>Proxy</code>很好的解决了这两个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let target = { age: 18, name: 'Niko Bellic' }
let handlers = {
  get (target, property) {
    return `${property}: ${target[property]}`
  },
  set (target, property, value) {
    target[property] = value
  }
}
let proxy = new Proxy(target, handlers)

proxy.age = 19
console.log(target.age, proxy.age)   // 19,          age : 19
console.log(target.name, proxy.name) // Niko Bellic, name: Niko Bellic" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> target = { <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'Niko Bellic'</span> }
<span class="hljs-keyword">let</span> handlers = {
  get (target, property) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${property}</span>: <span class="hljs-subst">${target[property]}</span>`</span>
  },
  set (target, property, value) {
    target[property] = value
  }
}
<span class="hljs-keyword">let</span> proxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handlers)

proxy.age = <span class="hljs-number">19</span>
<span class="hljs-built_in">console</span>.log(target.age, proxy.age)   <span class="hljs-comment">// 19,          age : 19</span>
<span class="hljs-built_in">console</span>.log(target.name, proxy.name) <span class="hljs-comment">// Niko Bellic, name: Niko Bellic</span></code></pre>
<p>我们通过创建<code>get</code>、<code>set</code>两个<code>trap</code>来统一管理所有的操作，可以看到，在修改<code>proxy</code>的同时，<code>target</code>的内容也被修改，而且我们对<code>proxy</code>的行为进行了一些特殊的处理。  <br>而且我们无需额外的用一个<code>key</code>来存储真实的值，因为我们在<code>trap</code>内部操作的是<code>target</code>对象，而不是<code>proxy</code>对象。</p>
<h2 id="articleHeader4">拿Proxy来做些什么</h2>
<p>因为在使用了<code>Proxy</code>后，对象的行为基本上都是可控的，所以我们能拿来做一些之前实现起来比较复杂的事情。<br>在下边列出了几个简单的适用场景。</p>
<h3 id="articleHeader5">解决对象属性为undefined的问题</h3>
<p>在一些层级比较深的对象属性获取中，如何处理<code>undefined</code>一直是一个痛苦的过程，如果我们用<code>Proxy</code>可以很好的兼容这种情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() => {
  let target = {}
  let handlers = {
    get: (target, property) => {
      target[property] = (property in target) ? target[property] : {}
      if (typeof target[property] === 'object') {
        return new Proxy(target[property], handlers)
      }
      return target[property]
    }
  }
  let proxy = new Proxy(target, handlers)
  console.log('z' in proxy.x.y) // false (其实这一步已经针对`target`创建了一个x.y的属性)
  proxy.x.y.z = 'hello'
  console.log('z' in proxy.x.y) // true
  console.log(target.x.y.z)     // hello
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> target = {}
  <span class="hljs-keyword">let</span> handlers = {
    <span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">target, property</span>) =&gt;</span> {
      target[property] = (property <span class="hljs-keyword">in</span> target) ? target[property] : {}
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> target[property] === <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target[property], handlers)
      }
      <span class="hljs-keyword">return</span> target[property]
    }
  }
  <span class="hljs-keyword">let</span> proxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handlers)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'z'</span> <span class="hljs-keyword">in</span> proxy.x.y) <span class="hljs-comment">// false (其实这一步已经针对`target`创建了一个x.y的属性)</span>
  proxy.x.y.z = <span class="hljs-string">'hello'</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'z'</span> <span class="hljs-keyword">in</span> proxy.x.y) <span class="hljs-comment">// true</span>
  <span class="hljs-built_in">console</span>.log(target.x.y.z)     <span class="hljs-comment">// hello</span>
})()</code></pre>
<p>我们代理了<code>get</code>，并在里边进行逻辑处理，如果我们要进行<code>get</code>的值来自一个不存在的<code>key</code>，则我们会在<code>target</code>中创建对应个这个<code>key</code>，然后返回一个针对这个<code>key</code>的代理对象。  <br>这样就能够保证我们的取值操作一定不会抛出<code>can not get xxx from undefined</code>  <br>但是这会有一个小缺点，就是如果你确实要判断这个<code>key</code>是否存在只能够通过<code>in</code>操作符来判断，而不能够直接通过<code>get</code>来判断。</p>
<h3 id="articleHeader6">普通函数与构造函数的兼容处理</h3>
<p>如果我们提供了一个<code>Class</code>对象给其他人，或者说一个<code>ES5</code>版本的构造函数。  <br>如果没有使用<code>new</code>关键字来调用的话，<code>Class</code>对象会直接抛出异常，而<code>ES5</code>中的构造函数<code>this</code>指向则会变为调用函数时的作用域。  <br>我们可以使用<code>apply</code>这个<code>trap</code>来兼容这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Test {
  constructor (a, b) {
    console.log('constructor', a, b)
  }
}

// Test(1, 2) // throw an error
let proxyClass = new Proxy(Test, {
  apply (target, thisArg, argumentsList) {
    // 如果想要禁止使用非new的方式来调用函数，直接抛出异常即可
    // throw new Error(`Function ${target.name} cannot be invoked without 'new'`)
    return new (target.bind(thisArg, ...argumentsList))()
  }
})

proxyClass(1, 2) // constructor 1 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Test</span> </span>{
  <span class="hljs-keyword">constructor</span> (a, b) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'constructor'</span>, a, b)
  }
}

<span class="hljs-comment">// Test(1, 2) // throw an error</span>
<span class="hljs-keyword">let</span> proxyClass = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(Test, {
  apply (target, thisArg, argumentsList) {
    <span class="hljs-comment">// 如果想要禁止使用非new的方式来调用函数，直接抛出异常即可</span>
    <span class="hljs-comment">// throw new Error(`Function ${target.name} cannot be invoked without 'new'`)</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> (target.bind(thisArg, ...argumentsList))()
  }
})

proxyClass(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// constructor 1 2</span></code></pre>
<p>我们使用了<code>apply</code>来代理一些行为，在函数调用时会被触发，因为我们明确的知道，代理的是一个<code>Class</code>或构造函数，所以我们直接在<code>apply</code>中使用<code>new</code>关键字来调用被代理的函数。</p>
<p>以及如果我们想要对函数进行限制，禁止使用<code>new</code>关键字来调用，可以用另一个<code>trap</code>:<code>construct</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function add (a, b) {
  return a + b
}

let proxy = new Proxy(add, {
  construct (target, argumentsList, newTarget) {
    throw new Error(`Function ${target.name} cannot be invoked with 'new'`)
  }
})

proxy(1, 2)     // 3
new proxy(1, 2) // throw an error" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span> (<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">return</span> a + b
}

<span class="hljs-keyword">let</span> proxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(add, {
  construct (target, argumentsList, newTarget) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Function <span class="hljs-subst">${target.name}</span> cannot be invoked with 'new'`</span>)
  }
})

proxy(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)     <span class="hljs-comment">// 3</span>
<span class="hljs-keyword">new</span> proxy(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// throw an error</span></code></pre>
<h3 id="articleHeader7">用Proxy来包装fetch</h3>
<p>在前端发送请求，我们现在经常用到的应该就是<code>fetch</code>了，一个原生提供的API。<br>我们可以用<code>Proxy</code>来包装它，使其变得更易用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let handlers = {
  get (target, property) {
    if (!target.init) {
      // 初始化对象
      ['GET', 'POST'].forEach(method => {
        target[method] = (url, params = {}) => {
          return fetch(url, {
            headers: {
              'content-type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin',
            method,
            ...params
          }).then(response => response.json())
        }
      })
    }

    return target[property]
  }
}
let API = new Proxy({}, handlers)

await API.GET('XXX')
await API.POST('XXX', {
  body: JSON.stringify({name: 1})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> handlers = {
  get (target, property) {
    <span class="hljs-keyword">if</span> (!target.init) {
      <span class="hljs-comment">// 初始化对象</span>
      [<span class="hljs-string">'GET'</span>, <span class="hljs-string">'POST'</span>].forEach(<span class="hljs-function"><span class="hljs-params">method</span> =&gt;</span> {
        target[method] = <span class="hljs-function">(<span class="hljs-params">url, params = {}</span>) =&gt;</span> {
          <span class="hljs-keyword">return</span> fetch(url, {
            <span class="hljs-attr">headers</span>: {
              <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'application/json'</span>
            },
            <span class="hljs-attr">mode</span>: <span class="hljs-string">'cors'</span>,
            <span class="hljs-attr">credentials</span>: <span class="hljs-string">'same-origin'</span>,
            method,
            ...params
          }).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
        }
      })
    }

    <span class="hljs-keyword">return</span> target[property]
  }
}
<span class="hljs-keyword">let</span> API = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, handlers)

<span class="hljs-keyword">await</span> API.GET(<span class="hljs-string">'XXX'</span>)
<span class="hljs-keyword">await</span> API.POST(<span class="hljs-string">'XXX'</span>, {
  <span class="hljs-attr">body</span>: <span class="hljs-built_in">JSON</span>.stringify({<span class="hljs-attr">name</span>: <span class="hljs-number">1</span>})
})</code></pre>
<p>对<code>GET</code>、<code>POST</code>进行了一层封装，可以直接通过<code>.GET</code>这种方式来调用，并设置一些通用的参数。</p>
<h3 id="articleHeader8">实现一个简易的断言工具</h3>
<p>写过测试的各位童鞋，应该都会知道断言这个东西  <br><code>console.assert</code>就是一个断言工具，接受两个参数，如果第一个为<code>false</code>，则会将第二个参数作为<code>Error message</code>抛出。  <br>我们可以使用<code>Proxy</code>来做一个直接赋值就能实现断言的工具。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let assert = new Proxy({}, {
  set (target, message, value) {
    if (!value) console.error(message)
  }
})

assert['Isn\'t true'] = false      // Error: Isn't true
assert['Less than 18'] = 18 >= 19  // Error: Less than 18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> assert = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, {
  set (target, message, value) {
    <span class="hljs-keyword">if</span> (!value) <span class="hljs-built_in">console</span>.error(message)
  }
})

assert[<span class="hljs-string">'Isn\'t true'</span>] = <span class="hljs-literal">false</span>      <span class="hljs-comment">// Error: Isn't true</span>
assert[<span class="hljs-string">'Less than 18'</span>] = <span class="hljs-number">18</span> &gt;= <span class="hljs-number">19</span>  <span class="hljs-comment">// Error: Less than 18</span></code></pre>
<h3 id="articleHeader9">统计函数调用次数</h3>
<p>在做服务端时，我们可以用<code>Proxy</code>代理一些函数，来统计一段时间内调用的次数。  <br>在后期做性能分析时可能会能够用上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function orginFunction () {}
let proxyFunction = new Proxy(orginFunction, {
  apply (target, thisArg. argumentsList) {
    log(XXX)

    return target.apply(thisArg, argumentsList)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">orginFunction</span> (<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">let</span> proxyFunction = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(orginFunction, {
  apply (target, thisArg. argumentsList) {
    log(XXX)

    <span class="hljs-keyword">return</span> target.apply(thisArg, argumentsList)
  }
})</code></pre>
<h3 id="articleHeader10">全部的traps</h3>
<p>这里列出了<code>handlers</code>所有可以定义的行为 <em>(traps)</em>：</p>
<blockquote>具体的可以查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">MDN-Proxy</a>  <br>里边同样有一些例子</blockquote>
<table>
<thead><tr>
<th align="left">traps</th>
<th align="left">description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">get</td>
<td align="left">获取某个<code>key</code>值</td>
</tr>
<tr>
<td align="left">set</td>
<td align="left">设置某个<code>key</code>值</td>
</tr>
<tr>
<td align="left">has</td>
<td align="left">使用<code>in</code>操作符判断某个<code>key</code>是否存在</td>
</tr>
<tr>
<td align="left">apply</td>
<td align="left">函数调用，仅在代理对象为<code>function</code>时有效</td>
</tr>
<tr>
<td align="left">ownKeys</td>
<td align="left">获取目标对象所有的<code>key</code>
</td>
</tr>
<tr>
<td align="left">construct</td>
<td align="left">函数通过实例化调用，仅在代理对象为<code>function</code>时有效</td>
</tr>
<tr>
<td align="left">isExtensible</td>
<td align="left">判断对象是否可扩展，<code>Object.isExtensible</code>的代理</td>
</tr>
<tr>
<td align="left">deleteProperty</td>
<td align="left">删除一个<code>property</code>
</td>
</tr>
<tr>
<td align="left">defineProperty</td>
<td align="left">定义一个新的<code>property</code>
</td>
</tr>
<tr>
<td align="left">getPrototypeOf</td>
<td align="left">获取原型对象</td>
</tr>
<tr>
<td align="left">setPrototypeOf</td>
<td align="left">设置原型对象</td>
</tr>
<tr>
<td align="left">preventExtensions</td>
<td align="left">设置对象为不可扩展</td>
</tr>
<tr>
<td align="left">getOwnPropertyDescriptor</td>
<td align="left">获取一个自有属性 <em>（不会去原型链查找）</em> 的属性描述</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader11">参考资料</h2>
<ol>
<li><a href="https://medium.com/@alonronin/magic-methods-in-javascript-meet-proxy-65e6305f4d3e" rel="nofollow noreferrer" target="_blank">Magic Methods in JavaScript? Meet Proxy!</a></li>
<li><a href="https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8" rel="nofollow noreferrer" target="_blank">How to use JavaScript Proxies for Fun and Profit</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">MDN-Proxy</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
拿Proxy可以做哪些有意思的事儿

## 原文链接
[https://segmentfault.com/a/1190000015009255](https://segmentfault.com/a/1190000015009255)


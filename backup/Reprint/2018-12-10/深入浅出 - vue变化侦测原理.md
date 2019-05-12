---
title: '深入浅出 - vue变化侦测原理' 
date: 2018-12-10 2:30:07
hidden: true
slug: bjck8xd7afh
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.codedata.cn/hacknews/152110789455628115" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<h1 id="articleHeader0">深入浅出 - vue变化侦测原理</h1>
<p>其实在一年前我已经写过一篇关于 <a href="https://github.com/berwin/Blog/issues/11" rel="nofollow noreferrer" target="_blank">vue响应式原理的文章</a>，但是最近我翻开看看发现讲的内容和我现在心里想的有些不太一样，所以我打算重新写一篇更通俗易懂的文章。</p>
<p>我的目标是能让读者读完我写的文章能学到知识，有一部分文章标题都以深入浅出开头，目的是把一个复杂的东西排除掉干扰学习的因素后剩下的核心原理通过很简单的描述来让读者学习到知识。</p>
<p>关于vue的内部原理其实有很多个重要的部分，变化侦测，模板编译，virtualDOM，整体运行流程等。</p>
<p>今天主要把变化侦测这部分单独拿出来讲一讲。</p>
<h2 id="articleHeader1">如何侦测变化？</h2>
<p>关于变化侦测首先要问一个问题，在 js 中，如何侦测一个对象的变化，其实这个问题还是比较简单的，学过js的都能知道，js中有两种方法可以侦测到变化，<code>Object.defineProperty</code> 和 ES6 的<code>proxy</code>。</p>
<p>到目前为止vue还是用的 <code>Object.defineProperty</code>，所以我们拿 <code>Object.defineProperty</code>来举例子说明这个原理。</p>
<p>这里我想说的是，不管以后vue是否会用 <code>proxy</code> 重写这部分，我讲的是原理，并不是api，所以不论以后vue会怎样改，这个原理是不会变的，哪怕vue用了其他完全不同的原理实现了变化侦测，但是本篇文章讲的原理一样可以实现变化侦测，原理这个东西是不会过时的。</p>
<p>之前我写文章有一个毛病就是喜欢对着源码翻译，结果过了半年一年人家源码改了，我写的文章就一毛钱都不值了，而且对着源码翻译还有一个缺点是对读者的要求有点偏高，读者如果没看过源码或者看的和我不是一个版本，那根本就不知道我在说什么。</p>
<p>好了不说废话了，继续讲刚才的内容。</p>
<p>知道 <code>Object.defineProperty</code> 可以侦测到对象的变化，那么我们瞬间可以写出这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            if(val === newVal){
                return
            }
            val = newVal
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function defineReactive (data, key, val) {
    <span class="hljs-type">Object</span>.defineProperty(data, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: function () {
            <span class="hljs-keyword">return</span> val
        },
        <span class="hljs-keyword">set</span>: function (newVal) {
            <span class="hljs-keyword">if</span>(val === newVal){
                <span class="hljs-keyword">return</span>
            }
            val = newVal
        }
    })
}</code></pre>
<p>写一个函数封装一下 <code>Object.defineProperty</code>，毕竟 <code>Object.defineProperty</code> 的用法这么复杂，封装一下我只需要传递一个 data，和 key，val 就行了。</p>
<p>现在封装好了之后每当 <code>data</code> 的 <code>key</code> 读取数据 <code>get</code> 这个函数可以被触发，设置数据的时候 <code>set</code> 这个函数可以被触发，但是，，，，，，，，，，，，，，，，，，发现好像并没什么鸟用？</p>
<h2 id="articleHeader2">怎么观察？</h2>
<p>现在我要问第二个问题，“怎么观察？”</p>
<p>思考一下，我们之所以要观察一个数据，目的是为了当数据的属性发生变化时，可以通知那些使用了这个 <code>key</code> 的地方。</p>
<p>举个?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>"{{" key "}}"</div>
  <p>"{{" key "}}"</p>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">&lt;template&gt;
  &lt;div&gt;"{{" key "}}"&lt;/div&gt;
  &lt;p&gt;"{{" key "}}"&lt;/p&gt;
&lt;/template&gt;</code></pre>
<p>模板中有两处使用了 <code>key</code>，所以当数据发生变化时，要把这两处都通知到。</p>
<p>所以上面的问题，我的回答是，先收集依赖，把这些使用到 <code>key</code> 的地方先收集起来，然后等属性发生变化时，把收集好的依赖循环触发一遍就好了~</p>
<p>总结起来其实就一句话，<strong>getter中，收集依赖，setter中，触发依赖</strong>。</p>
<h2 id="articleHeader3">依赖收集在哪？</h2>
<p>现在我们已经有了很明确的目标，就是要在getter中收集依赖，那么我们的依赖收集到哪里去呢？？</p>
<p>思考一下，首先想到的是每个 <code>key</code> 都有一个数组，用来存储当前 <code>key</code> 的依赖，假设依赖是一个函数存在 <code>window.target</code> 上，先把 <code>defineReactive</code> 稍微改造一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (data, key, val) {
    let dep = [] // 新增
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.push(window.target) // 新增
            return val
        },
        set: function (newVal) {
            if(val === newVal){
                return
            }
            
            // 新增
            for (let i = 0; i < dep.length; i++) {
                 dep[i](newVal, val)
            }
            val = newVal
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function defineReactive (data, key, val) {
    <span class="hljs-keyword">let</span> dep = [] <span class="hljs-comment">// 新增</span>
    <span class="hljs-type">Object</span>.defineProperty(data, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: function () {
            dep.push(window.target) <span class="hljs-comment">// 新增</span>
            <span class="hljs-keyword">return</span> val
        },
        <span class="hljs-keyword">set</span>: function (newVal) {
            <span class="hljs-keyword">if</span>(val === newVal){
                <span class="hljs-keyword">return</span>
            }
            
            <span class="hljs-comment">// 新增</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; dep.length; i++) {
                 dep[i](newVal, val)
            }
            val = newVal
        }
    })
}</code></pre>
<p>在 <code>defineReactive</code> 中新增了数组 dep，用来存储被收集的依赖。</p>
<p>然后在触发 set 触发时，循环dep把收集到的依赖触发。</p>
<p>但是这样写有点耦合，我们把依赖收集这部分代码封装起来，写成下面的样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dep</span> </span>{
  <span class="hljs-keyword">static</span> target: ?<span class="hljs-type">Watcher</span>;
  id: number;
  subs: <span class="hljs-type">Array</span>&lt;<span class="hljs-type">Watcher</span>&gt;;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: <span class="hljs-type">Watcher</span>) {
    this.subs.push(sub)
  }

  removeSub (sub: <span class="hljs-type">Watcher</span>) {
    remove(this.subs, sub)
  }

  depend () {
    <span class="hljs-keyword">if</span> (<span class="hljs-type">Dep</span>.target) {
      this.addSub(<span class="hljs-type">Dep</span>.target)
    }
  }

  notify () {
    <span class="hljs-comment">// stabilize the subscriber list first</span>
    const subs = this.subs.slice()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}</code></pre>
<p>然后在改造一下 <code>defineReactive</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (data, key, val) {
    let dep = new Dep() // 修改
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend() // 修改
            return val
        },
        set: function (newVal) {
            if(val === newVal){
                return
            }

            dep.notify() // 新增
            val = newVal
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function defineReactive (data, key, val) {
    <span class="hljs-keyword">let</span> dep = new <span class="hljs-type">Dep</span>() <span class="hljs-comment">// 修改</span>
    <span class="hljs-type">Object</span>.defineProperty(data, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: function () {
            dep.depend() <span class="hljs-comment">// 修改</span>
            <span class="hljs-keyword">return</span> val
        },
        <span class="hljs-keyword">set</span>: function (newVal) {
            <span class="hljs-keyword">if</span>(val === newVal){
                <span class="hljs-keyword">return</span>
            }

            dep.notify() <span class="hljs-comment">// 新增</span>
            val = newVal
        }
    })
}</code></pre>
<p>这一次代码看起来清晰多了，顺便回答一下上面问的问题，依赖收集到哪？收集到Dep中，Dep是专门用来存储依赖的。</p>
<h2 id="articleHeader4">收集谁？</h2>
<p>上面我们假装 <code>window.target</code> 是需要被收集的依赖，细心的同学可能已经看到，上面的代码 <code>window.target</code> 已经改成了 <code>Dep.target</code>，那 <code>Dep.target</code>是什么？我们究竟要收集谁呢？？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013821437" src="https://static.alili.tech/img/remote/1460000013821437" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>收集谁，换句话说是当属性发生变化后，通知谁。</p>
<p>我们要通知那个使用到数据的地方，而使用这个数据的地方有很多，而且类型还不一样，有可能是模板，有可能是用户写的一个 watch，所以这个时候我们需要抽象出一个能集中处理这些不同情况的类，然后我们在依赖收集的阶段只收集这个封装好的类的实例进来，通知也只通知它一个，然后它在负责通知其他地方，所以我们要抽象的这个东西需要先起一个好听的名字，嗯，就叫它watcher吧~</p>
<p>所以现在可以回答上面的问题，收集谁？？收集 Watcher。</p>
<h2 id="articleHeader5">什么是Watcher？</h2>
<p>watcher 是一个中介的角色，数据发生变化通知给 watcher，然后watcher在通知给其他地方。</p>
<p>关于watcher我们先看一个经典的使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// keypath
vm.$watch('a.b.c', function (newVal, oldVal) {
  // do something
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// keypath</span>
vm.$watch('a.b.<span class="hljs-built_in">c</span>', function (newVal, oldVal) {
  <span class="hljs-comment">// do something</span>
})</code></pre>
<p>这段代码表示当 <code>data.a.b.c</code> 这个属性发生变化时，触发第二个参数这个函数。</p>
<p>思考一下怎么实现这个功能呢？</p>
<p>好像只要把这个 watcher 实例添加到 <code>data.a.b.c</code> 这个属性的 Dep 中去就行了，然后 <code>data.a.b.c</code> 触发时，会通知到watcher，然后watcher在执行参数中的这个回调函数。</p>
<p>好，思考完毕，开工，写出如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Watch {
    constructor (expOrFn, cb) {
        // 执行 this.getter() 就可以拿到 data.a.b.c
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get () {
        Dep.target = this
        value = this.getter.call(vm, vm)
        Dep.target = undefined
    }

    update () {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watch</span> </span>{
    constructor (expOrFn, cb) {
        <span class="hljs-comment">// 执行 this.getter() 就可以拿到 data.a.b.c</span>
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.<span class="hljs-keyword">get</span>()
    }

    <span class="hljs-keyword">get</span> () {
        <span class="hljs-type">Dep</span>.target = this
        value = this.getter.call(vm, vm)
        <span class="hljs-type">Dep</span>.target = undefined
    }

    update () {
        const oldValue = this.value
        this.value = this.<span class="hljs-keyword">get</span>()
        this.cb.call(this.vm, this.value, oldValue)
    }
}</code></pre>
<p>这段代码可以把自己主动 <code>push</code> 到 <code>data.a.b.c</code> 的 Dep 中去。</p>
<p>因为我在 <code>get</code> 这个方法中，先把 Dep.traget 设置成了 <code>this</code>，也就是当前watcher实例，然后在读一下 <code>data.a.b.c</code> 的值。</p>
<p>因为读了 <code>data.a.b.c</code> 的值，所以肯定会触发 <code>getter</code>。</p>
<p>触发了 <code>getter</code> 上面我们封装的 <code>defineReactive</code> 函数中有一段逻辑就会从 <code>Dep.target</code> 里读一个依赖 <code>push</code> 到 <code>Dep</code> 中。</p>
<p>所以就导致，我只要先在 Dep.target 赋一个 <code>this</code>，然后我在读一下值，去触发一下 <code>getter</code>，就可以把 <code>this</code> 主动 <code>push</code> 到 <code>keypath</code> 的依赖中，有没有很神奇~</p>
<p>依赖注入到 <code>Dep</code> 中去之后，当这个 <code>data.a.b.c</code> 的值发生变化，就把所有的依赖循环触发 update 方法，也就是上面代码中 update 那个方法。</p>
<p><code>update</code> 方法会触发参数中的回调函数，将value 和 oldValue 传到参数中。</p>
<p>所以其实不管是用户执行的 <code>vm.$watch('a.b.c', (value, oldValue) =&gt; {})</code> 还是模板中用到的data，都是通过 watcher 来通知自己是否需要发生变化的。</p>
<h2 id="articleHeader6">递归侦测所有key</h2>
<p>现在其实已经可以实现变化侦测的功能了，但是我们之前写的代码只能侦测数据中的一个 key，所以我们要加工一下 <code>defineReactive</code> 这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新增
function walk (obj: Object) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
}

function defineReactive (data, key, val) {
    walk(val) // 新增
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            dep.depend()
            return val
        },
        set: function (newVal) {
            if(val === newVal){
                return
            }

            dep.notify()
            val = newVal
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// 新增</span>
function walk (obj: <span class="hljs-type">Object</span>) {
  const keys = <span class="hljs-type">Object</span>.keys(obj)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]])
  }
}

function defineReactive (data, key, val) {
    walk(val) <span class="hljs-comment">// 新增</span>
    <span class="hljs-keyword">let</span> dep = new <span class="hljs-type">Dep</span>()
    <span class="hljs-type">Object</span>.defineProperty(data, key, {
        enumerable: <span class="hljs-literal">true</span>,
        configurable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: function () {
            dep.depend()
            <span class="hljs-keyword">return</span> val
        },
        <span class="hljs-keyword">set</span>: function (newVal) {
            <span class="hljs-keyword">if</span>(val === newVal){
                <span class="hljs-keyword">return</span>
            }

            dep.notify()
            val = newVal
        }
    })
}</code></pre>
<p>这样我们就可以通过执行 <code>walk(data)</code>，把 <code>data</code> 中的所有 <code>key</code> 都加工成可以被侦测的，因为是一个递归的过程，所以 <code>key</code> 中的 <code>value</code> 如果是一个对象，那这个对象的所有key也会被侦测。</p>
<h2 id="articleHeader7">Array怎么进行变化侦测？</h2>
<p>现在又发现了新的问题，<code>data</code> 中不是所有的 <code>value</code> 都是对象和基本类型，如果是一个数组怎么办？？数组是没有办法通过 <code>Object.defineProperty</code> 来侦测到行为的。</p>
<p>vue 中对这个数组问题的解决方案非常的简单粗暴，我说说vue是如何实现的，大体上分三步：</p>
<p>第一步：先把原生 <code>Array</code> 的原型方法继承下来。</p>
<p>第二步：对继承后的对象使用 <code>Object.defineProperty</code> 做一些拦截操作。</p>
<p>第三步：把加工后可以被拦截的原型，赋值到需要被拦截的 <code>Array</code> 类型的数据的原型上。</p>
<p><strong>vue的实现</strong></p>
<p>第一步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">const arrayProto = <span class="hljs-type">Array</span>.prototype
export const arrayMethods = <span class="hljs-type">Object</span>.create(arrayProto)</code></pre>
<p>第二步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]

  Object.defineProperty(arrayMethods, method, {
    value: function mutator (...args) {
      console.log(methods) // 打印数组方法
      return original.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  '<span class="hljs-built_in">sort</span>',
  '<span class="hljs-built_in">reverse</span>'
]
.forEach(function (method) {
  <span class="hljs-comment">// cache original method</span>
  const original = arrayProto[method]

  <span class="hljs-type">Object</span>.defineProperty(arrayMethods, method, {
    value: function mutator (...args) {
      console.log(methods) <span class="hljs-comment">// 打印数组方法</span>
      <span class="hljs-keyword">return</span> original.apply(this, args)
    },
    enumerable: <span class="hljs-literal">false</span>,
    writable: <span class="hljs-literal">true</span>,
    configurable: <span class="hljs-literal">true</span>
  })
})</code></pre>
<p>现在可以看到，每当被侦测的 <code>array</code> 执行方法操作数组时，我都可以知道他执行的方法是什么，并且打印到 <code>console</code> 中。</p>
<p>现在我要对这个数组方法类型进行判断，如果操作数组的方法是 push unshift splice （这种可以新增数组元素的方法），需要把新增的元素用上面封装的 <code>walk</code> 来进行变化检测。</p>
<p>并且不论操作数组的是什么方法，我都要触发消息，通知依赖列表中的依赖数据发生了变化。</p>
<p>那现在怎么访问依赖列表呢，可能我们需要把上面封装的 <code>walk</code> 加工一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 工具函数
function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep() // 新增
    this.vmCount = 0
    def(value, '__ob__', this) // 新增

    // 新增
    if (Array.isArray(value)) {
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      new Observer(items[i])
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// 工具函数</span>
function def (obj: <span class="hljs-type">Object</span>, key: string, val: any, enumerable?: boolean) {
  <span class="hljs-type">Object</span>.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: <span class="hljs-literal">true</span>,
    configurable: <span class="hljs-literal">true</span>
  })
}

export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  value: any;
  dep: <span class="hljs-type">Dep</span>;
  vmCount: number; <span class="hljs-comment">// number of vms that has this object as root $data</span>

  constructor (value: any) {
    this.value = value
    this.dep = new <span class="hljs-type">Dep</span>() <span class="hljs-comment">// 新增</span>
    this.vmCount = <span class="hljs-number">0</span>
    def(value, '__ob__', this) <span class="hljs-comment">// 新增</span>

    <span class="hljs-comment">// 新增</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-type">Array</span>.isArray(value)) {
      this.observeArray(value)
    } <span class="hljs-keyword">else</span> {
      this.walk(value)
    }
  }

  <span class="hljs-comment">/**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */</span>
  walk (obj: <span class="hljs-type">Object</span>) {
    const keys = <span class="hljs-type">Object</span>.keys(obj)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }

  <span class="hljs-comment">/**
   * Observe a list of Array items.
   */</span>
  observeArray (items: <span class="hljs-type">Array</span>&lt;any&gt;) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
      new <span class="hljs-type">Observer</span>(items[i])
    }
  }
}</code></pre>
<p>我们定义了一个 <code>Observer</code>space######space类，他的职责是将 <code>data</code> 转换成可以被侦测到变化的 <code>data</code>，并且新增了对类型的判断，如果是 <code>value</code> 的类型是 <code>Array</code> 循环 Array将每一个元素丢到 Observer 中。</p>
<p>并且在 value 上做了一个标记 <code>__ob__</code>，这样我们就可以通过 <code>value</code> 的 <code>__ob__</code> 拿到Observer实例，然后使用 <code>__ob__</code> 上的 <code>dep.notify()</code> 就可以发送通知啦。</p>
<p>然后我们在改进一下Array原型的拦截器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  '<span class="hljs-built_in">sort</span>',
  '<span class="hljs-built_in">reverse</span>'
]
.forEach(function (method) {
  <span class="hljs-comment">// cache original method</span>
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    <span class="hljs-keyword">let</span> inserted
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> 'push':
      <span class="hljs-keyword">case</span> 'unshift':
        inserted = args
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> 'splice':
        inserted = args.slice(<span class="hljs-number">2</span>)
        <span class="hljs-keyword">break</span>
    }
    <span class="hljs-keyword">if</span> (inserted) ob.observeArray(inserted)
    <span class="hljs-comment">// notify change</span>
    ob.dep.notify()
    <span class="hljs-keyword">return</span> result
  })
})</code></pre>
<p>可以看到写了一个 <code>switch</code> 对 <code>method</code> 进行判断，如果是 <code>push</code>，<code>unshift</code>，<code>splice</code> 这种可以新增数组元素的方法就使用 <code>ob.observeArray(inserted)</code> 把新增的元素也丢到 <code>Observer</code> 中去转换成可以被侦测到变化的数据。</p>
<p>在最后不论操作数组的方法是什么，都会调用 <code>ob.dep.notify()</code> 去通知 <code>watcher</code> 数据发生了改变。</p>
<h2 id="articleHeader8">arrayMethods 是怎么生效的？</h2>
<p>现在我们有一个 <code>arrayMenthods</code> 是被加工后的 <code>Array.prototype</code>，那么怎么让这个对象应用到<code>Array</code> 上面呢？</p>
<p>思考一下，我们不能直接修改 <code>Array.prototype</code>因为这样会污染全局的Array，我们希望 <code>arrayMenthods</code> 只对 <code>data</code>中的<code>Array</code> 生效。</p>
<p>所以我们只需要把 <code>arrayMenthods</code> 赋值给 <code>value</code> 的 <code>__proto__</code> 上就好了。</p>
<p>我们改造一下 <code>Observer</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Observer {
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods // 新增
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  constructor (value: any) {
    this.value = value
    this.dep = new <span class="hljs-type">Dep</span>()
    this.vmCount = <span class="hljs-number">0</span>
    def(value, '__ob__', this)

    <span class="hljs-keyword">if</span> (<span class="hljs-type">Array</span>.isArray(value)) {
      value.__proto__ = arrayMethods <span class="hljs-comment">// 新增</span>
      this.observeArray(value)
    } <span class="hljs-keyword">else</span> {
      this.walk(value)
    }
  }
}</code></pre>
<p>如果不能使用 <code>__proto__</code>，就直接循环 <code>arrayMethods</code> 把它身上的这些方法直接装到 <code>value</code> 身上好了。</p>
<p><strong>什么情况不能使用 <code>__proto__</code> 我也不知道，各位大佬谁知道能否给我留个言？跪谢~</strong></p>
<p>所以我们的代码又要改造一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// can we use __proto__?
const hasProto = '__proto__' in {} // 新增
export class Observer {
  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      // 修改
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
}

function protoAugment (target, src: Object, keys: any) {
  target.__proto__ = src
}

function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift"><span class="hljs-comment">// can we use __proto__?</span>
const hasProto = '__proto__' <span class="hljs-keyword">in</span> {} <span class="hljs-comment">// 新增</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Observer</span> </span>{
  constructor (value: any) {
    this.value = value
    this.dep = new <span class="hljs-type">Dep</span>()
    this.vmCount = <span class="hljs-number">0</span>
    def(value, '__ob__', this)

    <span class="hljs-keyword">if</span> (<span class="hljs-type">Array</span>.isArray(value)) {
      <span class="hljs-comment">// 修改</span>
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } <span class="hljs-keyword">else</span> {
      this.walk(value)
    }
  }
}

function protoAugment (target, src: <span class="hljs-type">Object</span>, keys: any) {
  target.__proto__ = src
}

function copyAugment (target: <span class="hljs-type">Object</span>, src: <span class="hljs-type">Object</span>, keys: <span class="hljs-type">Array</span>&lt;string&gt;) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, l = keys.length; i &lt; l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}</code></pre>
<h2 id="articleHeader9">关于Array的问题</h2>
<p>关于vue对Array的拦截实现上面刚说完，正因为这种实现方式，其实有些数组操作vue是拦截不到的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.list[0] = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">this.list[<span class="hljs-number">0</span>] = <span class="hljs-number">2</span></code></pre>
<p>修改数组第一个元素的值，无法侦测到数组的变化，所以并不会触发 <code>re-render</code> 或 <code>watch</code> 等。</p>
<p>在例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.list.length = 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift" style="word-break: break-word; white-space: initial;">this.list.length = <span class="hljs-number">0</span></code></pre>
<p>清空数组操作，无法侦测到数组的变化，所以也不会触发 <code>re-render</code> 或 <code>watch</code> 等。</p>
<p>因为vue的实现方式就决定了无法对上面举得两个例子做拦截，也就没有办法做到响应，ES6是有能力做到的，在ES6之前是无法做到模拟数组的原生行为的，现在 ES6 的 Proxy 可以模拟数组的原生行为，也可以通过 ES6 的继承来继承数组原生行为，从而进行拦截。</p>
<h2 id="articleHeader10">总结</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013821438?w=1200&amp;h=750" src="https://static.alili.tech/img/remote/1460000013821438?w=1200&amp;h=750" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>最后掏出vue官网上的一张图，这张图其实非常清晰，就是一个变化侦测的原理图。</p>
<p><code>getter</code> 到 <code>watcher</code> 有一条线，上面写着收集依赖，意思是说 <code>getter</code> 里收集 <code>watcher</code>，也就是说当数据发生 <code>get</code> 动作时开始收集 <code>watcher</code>。</p>
<p><code>setter</code> 到 <code>watcher</code> 有一条线，写着 <code>Notify</code> 意思是说在 <code>setter</code> 中触发消息，也就是当数据发生 <code>set</code> 动作时，通知 <code>watcher</code>。</p>
<p><code>Watcher</code> 到 ComponentRenderFunction 有一条线，写着 <code>Trigger re-render</code> 意思很明显了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013821439?w=1080&amp;h=1080" src="https://static.alili.tech/img/remote/1460000013821439?w=1080&amp;h=1080" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出 - vue变化侦测原理

## 原文链接
[https://segmentfault.com/a/1190000013821434](https://segmentfault.com/a/1190000013821434)


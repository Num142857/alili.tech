---
title: '读懂ES7中javascript修饰器' 
date: 2018-12-29 2:30:10
hidden: true
slug: que666q2z7
categories: [reprint]
---

{{< raw >}}

                    
<h3>什么是修饰器</h3>
<p>修饰器（Decorator）是ES7的一个提案，它的出现能解决两个问题：</p>
<ul>
<li>不同类间共享方法</li>
<li>
<strong>编译期</strong>对类和方法的行为进行改变</li>
</ul>
<p>用法也很简单，就是在类或方法的上面加一个@符，在<code>vue in typescript</code>中经常用到</p>
<p><span class="img-wrap"><img data-src="/img/bVWjKD?w=469&amp;h=156" src="https://static.alili.tech/img/bVWjKD?w=469&amp;h=156" alt="clipboard.png" title="clipboard.png"></span></p>
<p>以上的两个用处可能不太明白，没关系，我们开始第一个例子</p>
<h3>例子1：修饰类</h3>
<pre><code>@setProp
class User {}

function setProp(target) {
    target.age = 30
}

console.log(User.age)</code></pre>
<p>这个例子要表达的是对<code>User</code>类使用<code>setProp</code>这个方法进行修饰，用来增加<code>User</code>类中<code>age</code>的属性，<code>setProp</code>方法会接收3个参数，我们现在接触第一个，<code>target</code>代表<code>User</code>类本身。</p>
<h3>例子2：修饰类(自定义参数值)</h3>
<pre><code>@setProp(20)
class User {}

function setProp(value) {
    return function (target) {
        target.age = value
    }
}

console.log(User.age)</code></pre>
<p>此例和上面功能基本一致，唯一差别在于值是参考修饰函数传过来的</p>
<h3>例子2：修饰方法</h3>
<pre><code>class User {
    @readonly
    getName() {
        return 'Hello World'
    }
}

// readonly修饰函数，对方法进行只读操作
function readonly(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
}

let u = new User()
// 尝试修改函数，在控制台会报错
u.getName = () =&gt; {
    return 'I will override'
}</code></pre>
<p>上例中，我们对<code>User</code>类中的<code>getName</code>方法使用<code>readonly</code>修饰器进行修饰，使得方法不能被修改。第一个参数我们已经知道了，参数<code>name</code>为方法名，也就是<code>readonly</code>，参数<code>descriptor</code>是个啥东西呢，看到这行<code>descriptor.writable = false</code>，我们大家猜的也差不多了，这三个参数对应的就是<code>Object.defineProperty</code>的三个参数，我们来看一下：</p>
<p><span class="img-wrap"><img data-src="/img/bVWjQ3?w=510&amp;h=191" src="https://static.alili.tech/img/bVWjQ3?w=510&amp;h=191" alt="clipboard.png" title="clipboard.png"></span></p>
<p>我们设置<code>descriptor.writable = false</code>就是让函数不可以被修改，如果我们写成</p>
<pre><code>descriptor.value = 'function (){ console.log('Hello decorator') }'</code></pre>
<p>那么，输出就是<code>Hello World</code>了，而是<code>Hello decorator</code>，是不是已经意识到修饰器的好处了。现在我们来看看实际工作中，我们用到修饰器的例子</p>
<h3>实际应用1：日志管理</h3>
<p>在用<code>webpack</code>打包时，我们经常需要好多步骤，比如第一步读取<code>package.json</code>文件，第二步处理该文件，第三步加载<code>webpack.base.js</code>文件，第四步进行打包...为了直观，我们经常在每一步打印一些日志文件，比如这步都干了些什么事，很明显打印日志的操作和业务代码根本就一点关系没有，我们不应该把日志和业务掺和在一起，这样使用修饰器就是避免这个问题，以下为代码：</p>
<pre><code>class Pack {
    @log('读取package.json文件')
    step1() {
        // do something...
        // 没有修饰器之前，我们通常把console.log放到这里写
        // 放到函数里面写会有两个坏处
        //     1.console和业务无关，会破坏函数单一性原则
        //     2.如果要删除所有的console，那我们只能深入到每一个方法中
    }
    @log('合并webpack配置文件')
    step2() {
        // do something...
    }
}

function log(value) {
    return function (target, name, descriptor) {
        // 在这里，我们还可以拿到函数的参数，打印更加详细的信息
        console.log(value)
    }
}

let pack = new Pack()
pack.step1()
pack.step2()</code></pre>
<h3>实际应用2：检查登录</h3>
<p>这个例子在实际的开发中常用得到，我们一些操作前，必须得判断用户是否登录，比较点赞、结算、发送弹幕...按照之前的写法，我们必须在每一个方法中判断用户的登录情况，然后再进行业务的操作，很显然前置条件和业务又混到了一起，用修饰器，就可以完美的解决这一问题，代码如下：</p>
<pre><code>class User {
    // 获取已登录用户的用户信息
    @checkLogin
    getUserInfo() {
        /**
         * 之前，我们都会这么写：
         *      if(checkLogin()) {
         *          // 业务代码
         *      }
         *  这段代码会在每一个需要登录的方法中执行
         *  还是上面的问题，执行的前提和业务又混到了一起
         */
        console.log('获取已登录用户的用户信息')
    }
    // 发送消息
    @checkLogin
    sendMsg() {
        console.log('发送消息')
    }
}

// 检查用户是否登录，如果没有登录，就跳转到登录页面
function checkLogin(target, name, descriptor) {
    let method = descriptor.value

    // 模拟判断条件
    let isLogin = true

    descriptor.value = function (...args) {
        if (isLogin) {
            method.apply(this, args)
        } else {
            console.log('没有登录，即将跳转到登录页面...')
        }
    }
}
let u = new User()
u.getUserInfo()
u.sendMsg()</code></pre>
<h3>结语</h3>
<p>以上只是修饰器的基本应用，只要我们掌握了原理，在实际的工作中，要思考自己的应用场景，只要我们涉及需要在执行前做一些处理的应用，不管是修改函数的参数值，还是增加属性，还是执行的先决条件，我们都可以使用修饰器，这种编程的方式，就是<strong>面向切面编程</strong></p>
<h4>源码以及使用方法，请<a href="https://github.com/sunhaikuo/decorator" rel="nofollow noreferrer">移步GitHub</a>
</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读懂ES7中javascript修饰器

## 原文链接
[https://segmentfault.com/a/1190000011479378](https://segmentfault.com/a/1190000011479378)


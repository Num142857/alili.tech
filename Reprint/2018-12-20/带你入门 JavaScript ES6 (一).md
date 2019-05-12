---
title: '带你入门 JavaScript ES6 (一)' 
date: 2018-12-20 2:30:10
hidden: true
slug: abasq56n687
categories: [reprint]
---

{{< raw >}}

                    
<p>本文同步 <a href="http://blog.phpzendo.com/?p=78" rel="nofollow noreferrer" target="_blank">带你入门 JavaScript ES6 (一)</a>，转载请注明出处。</p>
<p>ES6: 是 ECMA国际组织于 2015 年 6 月 17 日发布的 ECMAScript 第六版，正式名为 ECMAScript 2015,通常被成为 ES6 或 ECMAScript 6。</p>
<p>目录：</p>
<ul>
<li>一、let 和 const 声明块作用域变量</li>
<li>二、模版字面量</li>
<li>三、解构赋值</li>
<li>四、对象字面量简写</li>
<li>五、默认参数</li>
</ul>
<h2 id="articleHeader0">一、 let 和 const 声明块作用域变量</h2>
<p>ES6 引入 <strong>let</strong> 和 <strong>const</strong> 作为块作用域(用花括号 <strong>{}</strong> 表示)变量声明语法，用法同之前的 var 声明变量类似。不同之处在于不会对申明的变量(或常量)提升作用域范围</p>
<p>1.1 let 变量声明</p>
<p>let 语法用于声明块作用域内的可重新赋值的变量，作用域内无法重新声明</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let" rel="nofollow noreferrer" target="_blank">MDN let</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = 'huliuqing'
name = 'Hu Liuqing'
console.log(name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
name = <span class="hljs-string">'Hu Liuqing'</span>
<span class="hljs-built_in">console</span>.log(name)</code></pre>
<p>1.2 const 常量声明</p>
<p>const 语法用于声明是必须 <strong>赋值初始值</strong>,并且无法重新复制，作用域内不能重新声明</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const" rel="nofollow noreferrer" target="_blank">MDN const</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PI = 3.14
PI = 3.1415 //报错 Uncaught TypeError: Assignment to constant variable.
console.log(PI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PI = <span class="hljs-number">3.14</span>
PI = <span class="hljs-number">3.1415</span> <span class="hljs-comment">//报错 Uncaught TypeError: Assignment to constant variable.</span>
<span class="hljs-built_in">console</span>.log(PI)</code></pre>
<p>1.3 let, const 和 var 比较</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findSeason(search) {
    var seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

    for (season of seasons) {
        console.log(&quot;------START-------&quot;)
        console.log(&quot;current season:&quot; + season + &quot; I'm find:&quot; + search)

        if (season.toLowerCase() == search.toLowerCase()) {
            let isSpring        = search.toLowerCase() == 'spring'
            var theSeason       = season
            const SUMMER_SEASON = 'Summer'
            
            console.log(&quot;isSpring 1: &quot; + isSpring)
            console.log(&quot;SUMMER_SEASON 1:&quot;  + SUMMER_SEASON)
            
            return SUMMER_SEASON
        } else {
            console.log(&quot;currentIterSeason is:&quot; + theSeason)
        }        

        try{
            console.log(&quot;isSpring 2: &quot; + isSpring)
        } catch (e) {
            console.error(e.message)
        }

        try{
            console.log(&quot;SUMMER_SEASON2:&quot; + SUMMER_SEASON)
        } catch (e) {
            console.error(e.message)
        }
    }
}

console.log(findSeason(&quot;spring&quot;))

console.log(findSeason(&quot;summer&quot;))

console.log(seasons)


//运行如下
------START-------
current season:Spring I'm find:spring
isSpring 1: true
SUMMER_SEASON 1:Summer
Summer

------START-------
current season:Spring I'm find:summer
currentIterSeason is:undefined
isSprint is not definedfindSeason 
SUMMER_SEASON 2: SUMMER_SEASON is not definedfindSeason  
------START-------
current season:Summer I'm find:summer
isSpring 1: false
SUMMER_SEASON 1:Summer
Summer

Uncaught ReferenceError: seasons is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findSeason</span>(<span class="hljs-params">search</span>) </span>{
    <span class="hljs-keyword">var</span> seasons = [<span class="hljs-string">'Spring'</span>, <span class="hljs-string">'Summer'</span>, <span class="hljs-string">'Autumn'</span>, <span class="hljs-string">'Winter'</span>]

    <span class="hljs-keyword">for</span> (season <span class="hljs-keyword">of</span> seasons) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"------START-------"</span>)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"current season:"</span> + season + <span class="hljs-string">" I'm find:"</span> + search)

        <span class="hljs-keyword">if</span> (season.toLowerCase() == search.toLowerCase()) {
            <span class="hljs-keyword">let</span> isSpring        = search.toLowerCase() == <span class="hljs-string">'spring'</span>
            <span class="hljs-keyword">var</span> theSeason       = season
            <span class="hljs-keyword">const</span> SUMMER_SEASON = <span class="hljs-string">'Summer'</span>
            
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"isSpring 1: "</span> + isSpring)
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"SUMMER_SEASON 1:"</span>  + SUMMER_SEASON)
            
            <span class="hljs-keyword">return</span> SUMMER_SEASON
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"currentIterSeason is:"</span> + theSeason)
        }        

        <span class="hljs-keyword">try</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"isSpring 2: "</span> + isSpring)
        } <span class="hljs-keyword">catch</span> (e) {
            <span class="hljs-built_in">console</span>.error(e.message)
        }

        <span class="hljs-keyword">try</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"SUMMER_SEASON2:"</span> + SUMMER_SEASON)
        } <span class="hljs-keyword">catch</span> (e) {
            <span class="hljs-built_in">console</span>.error(e.message)
        }
    }
}

<span class="hljs-built_in">console</span>.log(findSeason(<span class="hljs-string">"spring"</span>))

<span class="hljs-built_in">console</span>.log(findSeason(<span class="hljs-string">"summer"</span>))

<span class="hljs-built_in">console</span>.log(seasons)


<span class="hljs-comment">//运行如下</span>
------START-------
current season:Spring I<span class="hljs-string">'m find:spring
isSpring 1: true
SUMMER_SEASON 1:Summer
Summer

------START-------
current season:Spring I'</span>m find:summer
currentIterSeason is:<span class="hljs-literal">undefined</span>
isSprint is not definedfindSeason 
SUMMER_SEASON <span class="hljs-number">2</span>: SUMMER_SEASON is not definedfindSeason  
------START-------
current season:Summer I<span class="hljs-string">'m find:summer
isSpring 1: false
SUMMER_SEASON 1:Summer
Summer

Uncaught ReferenceError: seasons is not defined</span></code></pre>
<ul>
<li>let isSpring, var theSeason, const SUMMER_SEASON 都是定义在 if 代码块内</li>
<li>当在 if 代码块外调用isSpring, theSeason, SUMMER_SEASON时，由于 let 和 const 块作用域特性会在控制台报 not defined 错误；而 var 定义的 theSeason 不会报错而仅输出 undefined，这是因为 var 声明的变量将作用域范围提升至 getSeason 作用域范围内。</li>
</ul>
<h2 id="articleHeader1">二、 模版字面量</h2>
<p>提供一种简单实现表达式嵌套的字符串字面量操作，简而言之就是能够以简单的方法实现字符串拼接操作。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings" rel="nofollow noreferrer" target="_blank">模版字面量</a></p>
<p>2.1 ES6 之前字符串拼接实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = 'huliuqing'
let age = 18
let conent = '你的名字:' + name + ' 你今年几岁了？' + age
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
<span class="hljs-keyword">let</span> age = <span class="hljs-number">18</span>
<span class="hljs-keyword">let</span> conent = <span class="hljs-string">'你的名字:'</span> + name + <span class="hljs-string">' 你今年几岁了？'</span> + age
</code></pre>
<p>随着拼接内容的增多，拼接操作越加复杂</p>
<p>2.2 ES6 使用飘号(``: 同 ~ 号在同一键位) 声明字符串字面量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let result = `请计算 1 + 2 的结果 ${1 + 2}`
console.log(result);

let name = 'huliuqing'
console.log(`你的名字？${name}`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> result = <span class="hljs-string">`请计算 1 + 2 的结果 <span class="hljs-subst">${<span class="hljs-number">1</span> + <span class="hljs-number">2</span>}</span>`</span>
<span class="hljs-built_in">console</span>.log(result);

<span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`你的名字？<span class="hljs-subst">${name}</span>`</span>)</code></pre>
<h2 id="articleHeader2">三、 解构赋值</h2>
<p>将值从<strong>数组</strong>或<strong>对象属性</strong>提取到不同变量中</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">MDN 解构赋值</a></p>
<p>ES6 之前，如果我们需要将数组中元素或对象中属性提取值并赋值给变量，实现起来比较复杂:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let numeric = [0, 1, 2]
let a = numeric[0]
let b = numeric[1]
let c = numeric[2]

console.log(a)
console.log(b)
console.log(c)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> numeric = [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
<span class="hljs-keyword">let</span> a = numeric[<span class="hljs-number">0</span>]
<span class="hljs-keyword">let</span> b = numeric[<span class="hljs-number">1</span>]
<span class="hljs-keyword">let</span> c = numeric[<span class="hljs-number">2</span>]

<span class="hljs-built_in">console</span>.log(a)
<span class="hljs-built_in">console</span>.log(b)
<span class="hljs-built_in">console</span>.log(c)</code></pre>
<p>解构赋值：语法同对象或数组初始化赋值语法，不同之处在于申明左侧定义了需要赋值的变量数组或提取的对象属性。</p>
<p>3.1 解构数组中的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1
let seasons = ['Spring', 'Summer', 'Autumn', 'Winter']
let [spring, summer, autumn, winter] = seasons // 将season 中的各个元素解构到左侧变量

console.log(spring)// Spring
console.log(summer)// Summer
console.log(autumn)// Autumn
console.log(winter)// Winter

// 2 将数组中剩余部分赋值给一个变量
let [spring2, summer2, ...autumnAndWinter] = seasons

console.log(spring2)//Spring
console.log(summer2)// Summer
console.log(autumnAndWinter)// ['Autumn', 'Winter']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 1</span>
<span class="hljs-keyword">let</span> seasons = [<span class="hljs-string">'Spring'</span>, <span class="hljs-string">'Summer'</span>, <span class="hljs-string">'Autumn'</span>, <span class="hljs-string">'Winter'</span>]
<span class="hljs-keyword">let</span> [spring, summer, autumn, winter] = seasons <span class="hljs-comment">// 将season 中的各个元素解构到左侧变量</span>

<span class="hljs-built_in">console</span>.log(spring)<span class="hljs-comment">// Spring</span>
<span class="hljs-built_in">console</span>.log(summer)<span class="hljs-comment">// Summer</span>
<span class="hljs-built_in">console</span>.log(autumn)<span class="hljs-comment">// Autumn</span>
<span class="hljs-built_in">console</span>.log(winter)<span class="hljs-comment">// Winter</span>

<span class="hljs-comment">// 2 将数组中剩余部分赋值给一个变量</span>
<span class="hljs-keyword">let</span> [spring2, summer2, ...autumnAndWinter] = seasons

<span class="hljs-built_in">console</span>.log(spring2)<span class="hljs-comment">//Spring</span>
<span class="hljs-built_in">console</span>.log(summer2)<span class="hljs-comment">// Summer</span>
<span class="hljs-built_in">console</span>.log(autumnAndWinter)<span class="hljs-comment">// ['Autumn', 'Winter']</span></code></pre>
<p>3.2 解构对象中的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1
let user = {name: 'huliuqing', age: 18}
let {name, age} = user
console.log(name)
console.log(age)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 1</span>
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'huliuqing'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>}
<span class="hljs-keyword">let</span> {name, age} = user
<span class="hljs-built_in">console</span>.log(name)
<span class="hljs-built_in">console</span>.log(age)</code></pre>
<p>3.2 默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数组解构默认值
let [a = 5, b = 7] = [1]
console.log(a)// 1 
console.log(b)// 7

//对象解构默认值
let {name = 'hlq', age = 18} = {name: 'huliuqing'}

console.log(name)// huliuqing
console.log(age)// 18
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 数组解构默认值</span>
<span class="hljs-keyword">let</span> [a = <span class="hljs-number">5</span>, b = <span class="hljs-number">7</span>] = [<span class="hljs-number">1</span>]
<span class="hljs-built_in">console</span>.log(a)<span class="hljs-comment">// 1 </span>
<span class="hljs-built_in">console</span>.log(b)<span class="hljs-comment">// 7</span>

<span class="hljs-comment">//对象解构默认值</span>
<span class="hljs-keyword">let</span> {name = <span class="hljs-string">'hlq'</span>, age = <span class="hljs-number">18</span>} = {<span class="hljs-attr">name</span>: <span class="hljs-string">'huliuqing'</span>}

<span class="hljs-built_in">console</span>.log(name)<span class="hljs-comment">// huliuqing</span>
<span class="hljs-built_in">console</span>.log(age)<span class="hljs-comment">// 18</span>
</code></pre>
<p>3.3 解构数组时忽略某些值的解构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [a, , c] = [1, 2, 3]
console.log(a)// 1
console.log(c)// 3

let {name, , address} = {name: 'huliuqing', age: 18, address: 'shanghai'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> [a, , c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="hljs-built_in">console</span>.log(a)<span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(c)<span class="hljs-comment">// 3</span>

<span class="hljs-keyword">let</span> {name, , address} = {<span class="hljs-attr">name</span>: <span class="hljs-string">'huliuqing'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">address</span>: <span class="hljs-string">'shanghai'</span>}</code></pre>
<h2 id="articleHeader3">四、 对象字面量简写</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer" rel="nofollow noreferrer" target="_blank">MDN 对象初始化</a></p>
<p>对象字面量简写，提供一种对初始化一个对象时，它的对象属性名与待赋值的变量名同名的初始化简写方法</p>
<p>比较绕口？</p>
<p>4.1 ES6 之前对象初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = 'huliuqing'
let age = 18
let user = {
    name: name,
    age: age
}
console.log(user)// Object {name: &quot;huliuqing&quot;, age: 18}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
<span class="hljs-keyword">let</span> age = <span class="hljs-number">18</span>
<span class="hljs-keyword">let</span> user = {
    <span class="hljs-attr">name</span>: name,
    <span class="hljs-attr">age</span>: age
}
<span class="hljs-built_in">console</span>.log(user)<span class="hljs-comment">// Object {name: "huliuqing", age: 18}</span></code></pre>
<p>我们可以看到属性的赋值方式 <strong>name: name</strong>，<strong>age: age</strong>， 这就是冗长的点。</p>
<p>4.2 对象字面量简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = 'huliuqing'
let age = 18
let user = {
    name,
    age
}
console.log(user)// Object {name: &quot;huliuqing&quot;, age: 18}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
<span class="hljs-keyword">let</span> age = <span class="hljs-number">18</span>
<span class="hljs-keyword">let</span> user = {
    name,
    age
}
<span class="hljs-built_in">console</span>.log(user)<span class="hljs-comment">// Object {name: "huliuqing", age: 18}</span></code></pre>
<p>4.3 对象中方法简写</p>
<p>同属性字面量简写类似，新的 ES6 语法提供了对象方法的简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name = 'huliuqing'
let age = 18
let user = {
    name,
    age,
    getUser() {
        return `${name} : ${age}`
    }, // ES6 语法
    //getUser: function() {
    //    return `${name} : ${age}`        
    //} // 之前的语法
}
console.log(user.getUser()) // huliuqing : 18
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name = <span class="hljs-string">'huliuqing'</span>
<span class="hljs-keyword">let</span> age = <span class="hljs-number">18</span>
<span class="hljs-keyword">let</span> user = {
    name,
    age,
    getUser() {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${name}</span> : <span class="hljs-subst">${age}</span>`</span>
    }, <span class="hljs-comment">// ES6 语法</span>
    <span class="hljs-comment">//getUser: function() {</span>
    <span class="hljs-comment">//    return `${name} : ${age}`        </span>
    <span class="hljs-comment">//} // 之前的语法</span>
}
<span class="hljs-built_in">console</span>.log(user.getUser()) <span class="hljs-comment">// huliuqing : 18</span>
</code></pre>
<h2 id="articleHeader4">五、默认参数</h2>
<p>函数默认参数允许在函数没有值或 undefined 被传入时，使用默认形参</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6 之前
function multiply(a, b) {
    a = typeof a === 'undefined' ? 1 : a;
    b = typeof b === 'undefined' ? 1 : b;

    return a * b;
}

multiply(2) //2
multiply(5,2) //10

// ES6 之后

function multiply(a = 1, b = 1) {
    return a * b;
}

multiply(2) // 2
multiply(5,2)// 10
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6 之前</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">a, b</span>) </span>{
    a = <span class="hljs-keyword">typeof</span> a === <span class="hljs-string">'undefined'</span> ? <span class="hljs-number">1</span> : a;
    b = <span class="hljs-keyword">typeof</span> b === <span class="hljs-string">'undefined'</span> ? <span class="hljs-number">1</span> : b;

    <span class="hljs-keyword">return</span> a * b;
}

multiply(<span class="hljs-number">2</span>) <span class="hljs-comment">//2</span>
multiply(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>) <span class="hljs-comment">//10</span>

<span class="hljs-comment">// ES6 之后</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">multiply</span>(<span class="hljs-params">a = <span class="hljs-number">1</span>, b = <span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-keyword">return</span> a * b;
}

multiply(<span class="hljs-number">2</span>) <span class="hljs-comment">// 2</span>
multiply(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>)<span class="hljs-comment">// 10</span>
</code></pre>
<h2 id="articleHeader5">参考资料</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla" rel="nofollow noreferrer" target="_blank">MDN</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let" rel="nofollow noreferrer" target="_blank">MDN let</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">MDN 解构赋值</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer" rel="nofollow noreferrer" target="_blank">MDN 对象初始化</a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters" rel="nofollow noreferrer" target="_blank">MDN 默认参数</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你入门 JavaScript ES6 (一)

## 原文链接
[https://segmentfault.com/a/1190000012583233](https://segmentfault.com/a/1190000012583233)


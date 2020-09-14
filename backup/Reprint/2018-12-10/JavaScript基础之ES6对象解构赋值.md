---
title: 'JavaScript基础之ES6对象解构赋值' 
date: 2018-12-10 2:30:07
hidden: true
slug: d1x0c9azfki
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">对象解构赋值</h2>
<p>ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构(Destructuring)。                 <br><code>--- 阮一峰《ECMAScript 6 入门》</code></p>
<p>具体的对象解构赋值的规则可以参考 <a href="http://es6.ruanyifeng.com/#docs/destructuring#%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC" rel="nofollow noreferrer" target="_blank">对象的解构赋值</a>, 说的很详细。</p>
<p>作为一个前端程序员，对于ES6这个新的语法表达式，肯定是需要熟练使用的，下面是我个人的一些理解。给大家分享一下。 </p>
<p>在ES6没有出现以前，我们是这样把对象中的值赋给变量的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一版
var obj = {name: '小明', age: 12, sex: '男'};
var name = obj.name;
var age = obj.age;
var sex = obj.sex;
var phone = obj.phone // phone => undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 第一版</span>
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>};
<span class="hljs-keyword">var</span> name = obj.name;
<span class="hljs-keyword">var</span> age = obj.age;
<span class="hljs-keyword">var</span> sex = obj.sex;
<span class="hljs-keyword">var</span> phone = obj.phone <span class="hljs-comment">// phone =&gt; undefined</span></code></pre>
<p>然后有人说这里，var被使用多次, 不好。 于是修改为下面这样?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第二版
var obj = {name: '小明', age: 12, sex: '男'};
var name = obj.name,
    age = obj.age,
    sex = obj.sex,
    phone = obj.phone;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 第二版</span>
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>};
<span class="hljs-keyword">var</span> name = obj.name,
    age = obj.age,
    sex = obj.sex,
    phone = obj.phone;</code></pre>
<p>有人说，obj这个对象被多次调用，不好...... 于是ES6来了。被修改为下面这样?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第三版
let obj = {name: '小明', age: 12, sex: '男'};
let {name, age, sex, phone} = obj" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 第三版</span>
<span class="hljs-keyword">let</span> obj = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>};
<span class="hljs-keyword">let</span> {name, age, sex, phone} = obj</code></pre>
<p>暂时没有人说不好了。</p>
<p>当我们想把对象中的属性值赋给变量的时候。一般需要考虑两个因素。分别是<strong>属性值</strong>、<strong>变量</strong>。而<strong>属性</strong>是通过<strong>属性名</strong>决定的，<strong>变量</strong>是通过<strong>变量名</strong>决定的。所以，最后决定因素就是<strong>属性名</strong>，<strong>变量名</strong>。当我们能够确定属性名和变量名的时候，它们对应的属性值和变量值之间的赋值关系也就确定了。</p>
<p>所以在ES6的解构赋值中，大致可以分为两种情形。属性名与被赋值的变量名<strong>一致</strong>与<strong>不一致</strong></p>
<h4>1. 属性名与变量名不一致</h4>
<p>当属性名称与变量名称不一致的，需要显式的指定属性名。这样才能把属性值给赋值到变量中。<br>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {name: '小明', age: 12};
let {name: userName, age: userAge} = user;
console.log(userName); // '小明'
console.log(userAge);  // 12  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> {<span class="hljs-attr">name</span>: userName, <span class="hljs-attr">age</span>: userAge} = user;
<span class="hljs-built_in">console</span>.log(userName); <span class="hljs-comment">// '小明'</span>
<span class="hljs-built_in">console</span>.log(userAge);  <span class="hljs-comment">// 12  </span></code></pre>
<h4>2. 属性名与变量名一致</h4>
<p>当属性名称与变量名称一致的，就只需要显示的指定变量名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {name: '小明', age: 12};
let {name, age} = user;
console.log(name);
console.log(age);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> {name, age} = user;
<span class="hljs-built_in">console</span>.log(name);
<span class="hljs-built_in">console</span>.log(age);</code></pre>
<p>这里的语法结构跟前面也不一样，把变量名和属性名合并在一起。   </p>
<p>当然了，上面是常见的赋值情况，还有一些其他条件下也是需要考虑的。</p>
<h3 id="articleHeader1">其他关注点</h3>
<h5>1. 属性不存在，但是依然赋给变量</h5>
<p>当要给变量赋值的属性不存在，会给变量提供一个默认值undefined</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {name: '小明', age: 12};
let { address: userAddress} = user;
console.log(userAddress);  //userAddress的就是undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> { <span class="hljs-attr">address</span>: userAddress} = user;
<span class="hljs-built_in">console</span>.log(userAddress);  <span class="hljs-comment">//userAddress的就是undefined</span></code></pre>
<h5>2. 变量赋予默认值</h5>
<p>当要给变量赋值的<strong>属性不存在</strong>的时候，变量是能够被赋予默认值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 属性不存在
let user = {name: '小明', age: 12};
let {address: userAddress = '上海'} = user;
console.log(userAddress); // 由于user中不存在address属性，所以userAddress的值是默认值 `上海`

// 属性存在
let user = {name: '小明', age: 12};
let {name: userName = '小天'} = user;
console.log(userName); // userName => '小明'
// 因为属性存在，变量无法获取默认值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 属性不存在</span>
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> {<span class="hljs-attr">address</span>: userAddress = <span class="hljs-string">'上海'</span>} = user;
<span class="hljs-built_in">console</span>.log(userAddress); <span class="hljs-comment">// 由于user中不存在address属性，所以userAddress的值是默认值 `上海`</span>

<span class="hljs-comment">// 属性存在</span>
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> {<span class="hljs-attr">name</span>: userName = <span class="hljs-string">'小天'</span>} = user;
<span class="hljs-built_in">console</span>.log(userName); <span class="hljs-comment">// userName =&gt; '小明'</span>
<span class="hljs-comment">// 因为属性存在，变量无法获取默认值</span></code></pre>
<h5>3. 同一个属性赋给多个变量</h5>
<p>对象中的一个属性值是可以同时赋予给多个变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {name: '小明', age: 12};
let { name: userName, name: user1Name} = user; 
console.log(userName); // '小明'
console.log(user1Name); // '小明'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> { <span class="hljs-attr">name</span>: userName, <span class="hljs-attr">name</span>: user1Name} = user; 
<span class="hljs-built_in">console</span>.log(userName); <span class="hljs-comment">// '小明'</span>
<span class="hljs-built_in">console</span>.log(user1Name); <span class="hljs-comment">// '小明'</span></code></pre>
<h5>4. 嵌套赋值</h5>
<p>解构赋值是可以嵌套，而且是从对象最外层开始查找</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = {name: '小明', age: 12, course: {name: '数学', score: 90"}}";
let {course} = user;
console.log(course);  // {name: &quot;数学&quot;, score: 90}

let {course: { score "}}" = user
console.log(score) // 90
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>, <span class="hljs-attr">course</span>: {<span class="hljs-attr">name</span>: <span class="hljs-string">'数学'</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">90</span>"}}";
<span class="hljs-keyword">let</span> {course} = user;
<span class="hljs-built_in">console</span>.log(course);  <span class="hljs-comment">// {name: "数学", score: 90}</span>

<span class="hljs-keyword">let</span> {<span class="hljs-attr">course</span>: { score "}}" = user
<span class="hljs-built_in">console</span>.log(score) <span class="hljs-comment">// 90</span>
</code></pre>
<h5>5. let 是否必要</h5>
<p>前面的例子中，都是是let {xxx} = {xxx} 的形式。于是就会觉得使用解构赋值就一定需要使用let、const、var。 其实不是的。let {xxx} = {xxx} 这只是其中的一种方, 声明完变量后就对其进行赋值。 解构赋值是对变量的赋值，只要是变量都是可以进行赋值的。<br>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name;
let user = {name: '小明', age: 12};
{name} = user;
// Uncaught SyntaxError: Unexpected token =
// 程序报错了，还是需要使用let ?。 
// 这里程序报的错误是SyntaxError(语法错误)，在程序预编译的时候发生的。具体的分析暂时不讨论" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name;
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
{name} = user;
<span class="hljs-comment">// Uncaught SyntaxError: Unexpected token =</span>
<span class="hljs-comment">// 程序报错了，还是需要使用let ?。 </span>
<span class="hljs-comment">// 这里程序报的错误是SyntaxError(语法错误)，在程序预编译的时候发生的。具体的分析暂时不讨论</span></code></pre>
<p>解决的方式很简单，把上面的代码块变成一段<strong>表达式</strong>就OK</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let name;
let user = {name: '小明', age: 12};
({name} = user); 
console.log(name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> name;
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
({name} = user); 
<span class="hljs-built_in">console</span>.log(name)</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>解构赋值是ES6提供一个十分方便的表达式。 在开始的时候，上面那么多的规则，很难记住。于是为了理解。我把ES6代码转变成下面这种方式，于是很快就明白了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6 的解构赋值
let user = {name: '小明', age: 12};
let {name: userName} = user;

// ES5 的对象赋值
let userName; (这里可以被赋予初始值)
let user = {name: '小明', age: 12};
if (user.name !== undefined) {   // 对象的属性不存在
    userName =  user.name  // user.name 能够赋值给多个变量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6 的解构赋值</span>
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">let</span> {<span class="hljs-attr">name</span>: userName} = user;

<span class="hljs-comment">// ES5 的对象赋值</span>
<span class="hljs-keyword">let</span> userName; (这里可以被赋予初始值)
<span class="hljs-keyword">let</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'小明'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">12</span>};
<span class="hljs-keyword">if</span> (user.name !== <span class="hljs-literal">undefined</span>) {   <span class="hljs-comment">// 对象的属性不存在</span>
    userName =  user.name  <span class="hljs-comment">// user.name 能够赋值给多个变量</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript基础之ES6对象解构赋值

## 原文链接
[https://segmentfault.com/a/1190000013817091](https://segmentfault.com/a/1190000013817091)


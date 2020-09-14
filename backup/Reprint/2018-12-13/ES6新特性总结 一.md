---
title: 'ES6新特性总结 一' 
date: 2018-12-13 2:30:07
hidden: true
slug: xas3ec5xjnh
categories: [reprint]
---

{{< raw >}}

                    
<h4>1.声明变量的关键字：const 和 let</h4>
<p>JavaScript ES6中引入了另外两个声明变量的关键字：const和let。在ES6中，我们将很少能看到var了。</p>
<p><strong>const关键字</strong></p>
<blockquote>const声明一个只读的常量。一旦声明，常量的值不能被改变。<br>const声明一个变量，就必须立即初始化，不能留到以后再赋值。</blockquote>
<p><strong>需注意</strong>：若这个变量是数组或者对象的话，它里面持有的内容是可以被更新的。</p>
<p>因为使用const声明一个复合类型的数据(主要是对象和数组)，变量名不指向数据，而是指向数据的地址。</p>
<p>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这种写法是不可行的
const str = 'hello world';
str = 'hello kitty';     //TypeError: Assignment to constant variable" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//这种写法是不可行的</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">str</span> = <span class="hljs-string">'hello world'</span>;
<span class="hljs-built_in">str</span> = <span class="hljs-string">'hello kitty'</span>;     <span class="hljs-comment">//TypeError: Assignment to constant variable</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这种写法是可行的
const arr = [1,2,3];
arr[0]=9;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//这种写法是可行的</span>
const arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
arr[<span class="hljs-number">0</span>]=<span class="hljs-number">9</span>;</code></pre>
<p><strong>let关键字</strong></p>
<blockquote>被let关键字声明的变量可以被改变。</blockquote>
<p>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这种写法是可行的
let str = 'hello world';
str = 'hello kitty';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code><span class="hljs-comment">//这种写法是可行的</span>
<span class="hljs-keyword">let</span> <span class="hljs-built_in">str</span> = <span class="hljs-symbol">'hello</span> world';
<span class="hljs-built_in">str</span> = <span class="hljs-symbol">'hello</span> kitty';</code></pre>
<p><strong>需注意</strong>：</p>
<ul>
<li>let声明的变量只有所在的代码块有效。</li>
<li>不存在变量的提升：使用let声明的变量要在声明后使用，否则会报错。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     //使用var定义的变量，存在变量的提升。
     console.log(a);   //undefined
     var a = 10; 
     
     //使用let定义的变量，不存在变量的提升，所以下面的代码会报错
     console.log(b);  // ReferenceError: b is not defined
     let b = 20;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>     <span class="hljs-comment">//使用var定义的变量，存在变量的提升。</span>
     <span class="hljs-built_in">console</span>.log(a);   <span class="hljs-comment">//undefined</span>
     <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>; 
     
     <span class="hljs-comment">//使用let定义的变量，不存在变量的提升，所以下面的代码会报错</span>
     <span class="hljs-built_in">console</span>.log(b);  <span class="hljs-comment">// ReferenceError: b is not defined</span>
     <span class="hljs-keyword">let</span> b = <span class="hljs-number">20</span>;</code></pre>
<ul>
<li>暂时性死区：使用let命令声明变量之前，该变量都是不可用的。</li>
<li>typeof不再是一个百分百安全的操作</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     typeof c;   // ReferenceError: c is not defined
     let c;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>     typeof <span class="hljs-built_in">c</span>;   <span class="hljs-comment">// ReferenceError: c is not defined</span>
     <span class="hljs-keyword">let</span> <span class="hljs-built_in">c</span>;</code></pre>
<p><strong>ES6声明变量的六种方法</strong><br>ES5只有两种声明变量的方法：<code>var</code>和<code>function</code><br>ES6除了添加<code>let</code>和<code>const</code>，还有另外两种声明变量的方法：<code>import</code>命令和<code>class</code>命令。所以，ES6一共有6种声明变量的方法。</p>
<h4>2.顶层对象的属性</h4>
<blockquote>顶层对象，浏览器中指的是window对象，在Node中指的是global对象。</blockquote>
<p>ES5中，顶层对象的属性和全局变量是等价的。举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.a = 1;
a  //1

a = 2;
window.a   //2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-built_in">window</span>.a = <span class="hljs-number">1</span>;
a  <span class="hljs-comment">//1</span>

a = <span class="hljs-number">2</span>;
<span class="hljs-built_in">window</span>.a   <span class="hljs-comment">//2</span></code></pre>
<p>ES6为了改变这一点，一方面规定，为了保持兼容性，<code>var</code>和<code>function</code>命令声明的全局变量，依旧是顶层对象的属性；<br>另一方面规定，<code>let</code>命令,<code>const</code>命令,<code>class</code>命令声明的全局变量，不属于顶层对象的属性。</p>
<p>也即是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。<br>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 1;
window.a  //1

let b=2;
window.b  //undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-built_in">window</span>.a  <span class="hljs-comment">//1</span>

<span class="hljs-keyword">let</span> b=<span class="hljs-number">2</span>;
<span class="hljs-built_in">window</span>.b  <span class="hljs-comment">//undefined</span></code></pre>
<p>上述代码中，全局变量<code>a</code>由<code>var</code>命令声明，所以是顶层对象的属性；全局变量<code>b</code>由<code>let</code>命令声明，所以它不是顶层对象的属性，返回<code>undefined</code></p>
<h4>3.模板字符串</h4>
<p>传统的JavaScript语言，输出模板通常是用字符串拼接起来的，这种写法相当繁琐不方便，于是ES6引入了模板字符串来解决这个问题。</p>
<blockquote>模板字符串(template string)是增强版的字符串，用反引号(`)标识。可以当做普通的字符串使用。也可以用来定义多行字符串，或者在字符串中嵌入变量。</blockquote>
<p>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//普通字符串
`In JavaScript '\n' is a line feed`

//多行字符串
`In JavaScript this is
 not legal`
 
 //字符串中嵌入变量
 let name = 'Bob',time = 'today';
 `Hello ${name},how are you ${time}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//普通字符串</span>
`In JavaScript <span class="hljs-string">'\n'</span> is a line feed`

<span class="hljs-comment">//多行字符串</span>
`In JavaScript this is
 not legal`
 
 <span class="hljs-comment">//字符串中嵌入变量</span>
 <span class="hljs-keyword">let</span> name = <span class="hljs-string">'Bob'</span>,time = <span class="hljs-string">'today'</span>;
 `Hello ${name},how are you ${time}`</code></pre>
<p>上述代码中的模板字符串，都是用反引号表示的。<br><strong>需注意</strong>：如果再模板字符串中需要引入反引号，则前面要用反斜杠转义。<br>举例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let greeting = `\Yo\` world" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> greeting = `\Yo\` world</code></pre>
<blockquote>模板字符串中嵌入变量，需要将变量名写在 <strong> ${ } </strong> 之中。<p>模板字符串中还能调用函数</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(){
    return &quot;Hello World&quot;;
}
`foo ${fn()} bar`
//foo Hello World bar;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello World"</span>;
}
<span class="hljs-string">`foo <span class="hljs-subst">${fn()}</span> bar`</span>
<span class="hljs-comment">//foo Hello World bar;</span></code></pre>
<h4>4.箭头函数</h4>
<blockquote>ES6中允许使用“箭头”（=&gt;）定义函数。<br>举例如下：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = v => v;
//上面的箭头函数等同于

var f = function(v){
    return v;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> v;
<span class="hljs-comment">//上面的箭头函数等同于</span>

<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v</span>)</span>{
    <span class="hljs-keyword">return</span> v;
}</code></pre>
<p>若箭头函数需要多个参数，则参数要用圆括号括起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = () => 5;
//等同于
var f = function(){return 5;}

var sum = (num1,num2) => num1+num2;
//等同于
var sum = function(num1,num2){
    return num1 + num2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-number">5</span>;
<span class="hljs-comment">//等同于</span>
<span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">5</span>;}

<span class="hljs-keyword">var</span> sum = <span class="hljs-function">(<span class="hljs-params">num1,num2</span>) =&gt;</span> num1+num2;
<span class="hljs-comment">//等同于</span>
<span class="hljs-keyword">var</span> sum = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num1,num2</span>)</span>{
    <span class="hljs-keyword">return</span> num1 + num2;
}</code></pre>
<p>由于大括号被解释为代码块，所以，如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//报错
let getTempItem = id => {id:id,name:&quot;temp&quot;};

//不报错
let getTempItem = id => ({id:id,name:&quot;temp&quot;});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//报错</span>
<span class="hljs-keyword">let</span> getTempItem = <span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> {<span class="hljs-attr">id</span>:id,<span class="hljs-attr">name</span>:<span class="hljs-string">"temp"</span>};

<span class="hljs-comment">//不报错</span>
<span class="hljs-keyword">let</span> getTempItem = <span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> ({<span class="hljs-attr">id</span>:id,<span class="hljs-attr">name</span>:<span class="hljs-string">"temp"</span>});</code></pre>
<p>箭头函数与变量结构可以结合使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const full = ({first,last}) => first + '' + last;

//等同于
function full(person){
    return person.first + '' + person.last;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> full = <span class="hljs-function">(<span class="hljs-params">{first,last}</span>) =&gt;</span> first + <span class="hljs-string">''</span> + last;

<span class="hljs-comment">//等同于</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">full</span>(<span class="hljs-params">person</span>)</span>{
    <span class="hljs-keyword">return</span> person.first + <span class="hljs-string">''</span> + person.last;
}</code></pre>
<h4>5.使用export和import实现模块化</h4>
<p>由于JavaScript是没有模块这一系统的，前辈们为了解决这一问题，提出来很多规范，其中最长用的就是 CommonJs 和 AMD 两种。前者用于服务器，后者用于浏览器。</p>
<p><strong>简单看一下CommonJs的模块化方法</strong></p>
<blockquote>在CommonJs中，暴露模块使用<code>module.exports</code>，加载模块有一个全局的方法：<code>require()</code>，用于加载模块。</blockquote>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js
let person = {
    age:'20',
    name:'Jolin'
};
module.exports = person;  //所暴露出的对象

//index.js
let person = require('./app');   //加载app模块
console.log('姓名'+person.name);  //姓名Jolin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//app.js</span>
<span class="hljs-keyword">let</span> person = {
    <span class="hljs-attr">age</span>:<span class="hljs-string">'20'</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">'Jolin'</span>
};
<span class="hljs-built_in">module</span>.exports = person;  <span class="hljs-comment">//所暴露出的对象</span>

<span class="hljs-comment">//index.js</span>
<span class="hljs-keyword">let</span> person = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app'</span>);   <span class="hljs-comment">//加载app模块</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'姓名'</span>+person.name);  <span class="hljs-comment">//姓名Jolin</span></code></pre>
<p><strong>注意</strong>：CommonJs 的模块化方法是运行于服务器端的，直接在浏览器端运行是不识别的，所以进入安装 nodejs 的目录，打开 cmd 命令窗口，键入命令<code>node index.js</code>来运行吧~</p>
<p>好了，言归正传~ ES6提供了简单的模块系统，可以取代 CommonJs 和 AMD 规范。那就是<code>export</code> 和 <code>import</code> 。</p>
<blockquote>ES6中新增了两个命令<code>export</code>和<code>import</code>，<code>export</code>命令用于暴露出模块对外的接口，而<code>import</code>则用于输入某一模块。</blockquote>
<p>示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//export.js
exports var firstName = 'Micheal';
exports var lastName = 'JackJson';
exports var year = 1958;


//import.js
import {firstName,lastName} from './export.js'
console.log(firstName+' '+lastName);   //Micheal JackJson" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//export.js</span>
<span class="hljs-keyword">exports</span> <span class="hljs-keyword">var</span> firstName = <span class="hljs-string">'Micheal'</span>;
<span class="hljs-keyword">exports</span> <span class="hljs-keyword">var</span> lastName = <span class="hljs-string">'JackJson'</span>;
<span class="hljs-keyword">exports</span> <span class="hljs-keyword">var</span> year = <span class="hljs-number">1958</span>;


<span class="hljs-comment">//import.js</span>
import <span class="hljs-comment">{firstName,lastName}</span> from <span class="hljs-string">'./export.js'</span>
console.log(firstName+<span class="hljs-string">' '</span>+lastName);   <span class="hljs-comment">//Micheal JackJson</span></code></pre>
<p>由于浏览器目前对ES2015（ES6）的语法支持不是很强，所以，即便是Firefox和Chrome浏览器，若版本较低，可能还是只支持一部分语法，那么如何才能让ES6语法能够正常的在各个浏览器运行呢？则就需要将编写的JS文件通过一些编译工具编译成ES5的语法，那么babel工具就可以实现这个转义。</p>
<p>然而，babel 只能转新的JavaScript句法（syntax）而不能转新的API，而且像<code>import</code>和<code>export</code>两个命令在现在任何浏览器都是不支持的，同时babel也无法转换其为浏览器支持的ES5，因为：</p>
<blockquote>babel只是个翻译，假设a.js 里 import 了 b.js, 对a.js进行转码，只是翻译了a.js，并不会把b.js的内容给读取合并进来, 如果想在最终的某一个js里，包含 a.js，b.js 的代码，那就需要用到打包工具。</blockquote>
<p>所以，我们可以使用webpack工具将带有<code>import</code>和<code>export</code>语法的JS文件，通过打包工具生成所有浏览器都支持的单个JS文件。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6新特性总结 一

## 原文链接
[https://segmentfault.com/a/1190000013361926](https://segmentfault.com/a/1190000013361926)


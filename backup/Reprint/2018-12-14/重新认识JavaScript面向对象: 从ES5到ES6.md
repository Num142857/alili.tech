---
title: '重新认识JavaScript面向对象: 从ES5到ES6' 
date: 2018-12-14 2:30:11
hidden: true
slug: clmh95ap8pu
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229218" src="https://static.alili.tech/img/remote/1460000013229218" alt="JavaScript" title="JavaScript" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0"><strong>一. 重新认识面向对象</strong></h3>
<h4><strong>1. JavaScript是一门面向对象的语言</strong></h4>
<p>在说明JavaScript是一个面向对象的语言之前, 我们来探讨一下面向对象的三大基本特征:  <strong>封装</strong>, <strong>继承</strong>, <strong>多态</strong>。</p>
<p><strong>封装</strong></p>
<blockquote>把抽象出来的属性和对方法组合在一起, 且属性值被保护在内部, 只有通过特定的方法进行改变和读取称为封装</blockquote>
<p>我们以代码举例, 首先我们构造一个<code>Person</code>构造函数, 它有<code>name</code>和<code>id</code>两个属性, 并有一个<code>sayHi</code>方法用于打招呼:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义Person构造函数
function Person(name, id) {
  this.name = name;
  this.id = id;
}

//在Person.prototype中加入方法
Person.prototype.sayHi = function() {
  console.log('你好, 我是' +  this.name);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义Person构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, id</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.id = id;
}

<span class="hljs-comment">//在Person.prototype中加入方法</span>
Person.prototype.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'你好, 我是'</span> +  <span class="hljs-keyword">this</span>.name);
}</code></pre>
<p>现在我们生成一个实例对象<code>p1</code>, 并调用<code>sayHi()</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//实例化对象
let p1 = new Person('阿辉', 1234);

//调用sayHi方法
p1.sayHi();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//实例化对象</span>
<span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">1234</span>);

<span class="hljs-comment">//调用sayHi方法</span>
p1.sayHi();</code></pre>
<p>在上述的代码中, <code>p1</code>这个对象并不知道<code>sayHi()</code>这个方法是如何实现的, 但是仍然可以使用这个方法. 这其实就是<strong>封装</strong>. 你也可以实现对象属性的私有和公有, 我们在构造函数中声明一个<code>salary</code>作为私有属性, 有且只有通过<code>getSalary()</code>方法查询到薪资.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, id) {
  this.name = name;
  this.id = id;
  let salary = 20000;
  this.getSalary = function (pwd) {
    pwd === 123456 ? console.log(salary) : console.log('对不起, 你没有权限查看密码');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, id</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.id = id;
  <span class="hljs-keyword">let</span> salary = <span class="hljs-number">20000</span>;
  <span class="hljs-keyword">this</span>.getSalary = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pwd</span>) </span>{
    pwd === <span class="hljs-number">123456</span> ? <span class="hljs-built_in">console</span>.log(salary) : <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'对不起, 你没有权限查看密码'</span>);
  }
}</code></pre>
<p><strong>继承</strong></p>
<blockquote>可以让某个类型的对象获得另一个类型的对象的属性和方法称为继承</blockquote>
<p>以刚才的<code>Person</code>作为父类构造器, 我们来新建一个子类构造器<code>Student</code>, 这里我们使用<code>call()</code>方法实现继承</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(name, id, subject) {
  //使用call实现父类继承
  Person.call(this, name, id);
  //添加子类的属性
  this.subject = subject;
}

let s1 = new Student('阿辉', 1234, '前端开发');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name, id, subject</span>) </span>{
  <span class="hljs-comment">//使用call实现父类继承</span>
  Person.call(<span class="hljs-keyword">this</span>, name, id);
  <span class="hljs-comment">//添加子类的属性</span>
  <span class="hljs-keyword">this</span>.subject = subject;
}

<span class="hljs-keyword">let</span> s1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">1234</span>, <span class="hljs-string">'前端开发'</span>);</code></pre>
<p><strong>多态</strong></p>
<blockquote>同一操作作用于不同的对象产生不同的执行结果, 这称为多态</blockquote>
<p>JavaScript中函数没有重载， 所以JavaScript中的多态是靠函数覆盖实现的。</p>
<p>同样以刚才的<code>Person</code>构造函数为例, 我们为<code>Person</code>构造函数添加一个<code>study</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, id) {
  this.name = name;
  this.id = id;
  this.study = function() {
    console.log(name + '在学习');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, id</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.id = id;
  <span class="hljs-keyword">this</span>.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">'在学习'</span>);
  }
}</code></pre>
<p>同样, 我们新建一个<code>Student</code>和<code>Teacher</code>构造函数, 该构造函数继承<code>Person</code>, 并也添加<code>study</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student(subject) {
  this.subject = subject;
  this.study = function() {
    console.log(this.name + '在学习' + this.subject);
  }
}
Student.prototype = new Person('阿辉', 1234);
Student.prototype.constructor = Student;

function Teacher(subject) {
  this.subject = subject;
  this.study = function() {
    console.log(this.name + '为了教学而学习' + this.subject);
  }
}
Teacher.prototype = new Person(&quot;老夫子&quot;, 4567);
Teacher.prototype.constructor = Teacher;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">subject</span>) </span>{
  <span class="hljs-keyword">this</span>.subject = subject;
  <span class="hljs-keyword">this</span>.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'在学习'</span> + <span class="hljs-keyword">this</span>.subject);
  }
}
Student.prototype = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">1234</span>);
Student.prototype.constructor = Student;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params">subject</span>) </span>{
  <span class="hljs-keyword">this</span>.subject = subject;
  <span class="hljs-keyword">this</span>.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">'为了教学而学习'</span> + <span class="hljs-keyword">this</span>.subject);
  }
}
Teacher.prototype = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"老夫子"</span>, <span class="hljs-number">4567</span>);
Teacher.prototype.constructor = Teacher;</code></pre>
<p>测试我们新建一个函数<code>doStudy</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doStudy(role) {
  if(role instanceof Person) {
    role.study();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doStudy</span><span class="hljs-params">(role)</span> </span>{
  <span class="hljs-keyword">if</span>(role <span class="hljs-keyword">instanceof</span> Person) {
    role.study();
  }
}</code></pre>
<p>此时我们分别实例化<code>Student</code>和<code>Teacher</code>, 并调用<code>doStudy</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let student = new Student('前端开发');
let teacher = new Teacher('前端开发');

doStudy(student); //阿辉在学习前端开发
doStudy(teacher); //老夫子为了教学在学习前端开发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> student = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'前端开发'</span>);
<span class="hljs-keyword">let</span> teacher = <span class="hljs-keyword">new</span> Teacher(<span class="hljs-string">'前端开发'</span>);

doStudy(student); <span class="hljs-comment">//阿辉在学习前端开发</span>
doStudy(teacher); <span class="hljs-comment">//老夫子为了教学在学习前端开发</span></code></pre>
<p>对于同一函数<code>doStudy</code>， 由于参数的不同， 导致不同的调用结果，这就实现了多态.<br><strong>JavaScript的面向对象</strong><br>从上面的分析可以论证出, JavaScript是一门面向对象的语言, 因为它实现了面向对象的所有特性. 其实, 面向对象仅仅是一个概念或者一个编程思想而已, 它不应该依赖于某个语言存在, 比如Java采用面向对象思想构造其语言, 它实现了类, 继承, 派生, 多态, 接口等机制. 但是这些机制，只是实现面向对象的一种手段， 而非必须。换言之， 一门语言可以根据自身特性选择合适的方式来实现面向对象。 由于大多数程序员首先学习的是Java, C++等高级编程语言， 因而先入为主的接受了“类”这个面向对象实际方式，所以习惯性的用类式面向对象语言中的概念来判断该语言是否是面向对象的语言。这也是很多有其他编程语言经验的人在学习JavaScript对象时，感觉到很困难的地方。</p>
<p>实际上， JavaScript是通过一种叫<strong>原型(prototype)</strong>的方式来实现面向对象编程的。下面我们就来讨论一下<strong>基于类(class-basesd)的面向对象</strong>和<strong>基于原型(protoype-based)的面向对象</strong>这两者的差别。</p>
<h4><strong>2. 基于类的面向对象和基于原型的面向对象的比较</strong></h4>
<p><strong>基于类的面向对象</strong></p>
<p>在基于<strong>类</strong>的面向对象语言中（比如Java和C++）， 是构建在<strong>类(class)</strong>和<strong>实例(instance)</strong>上的。其中<strong>类</strong>定义了所有用于具有某一特征对象的属性。<strong>类</strong>是抽象的事物， 而不是其所描述的全部对象中的任何特定的个体。另一方面， 一个<strong>实例</strong>是一个<strong>类</strong>的实例化，是其中的一个成员。</p>
<p><strong>基于原型的面向对象</strong><br>在基于<strong>原型</strong>的语言中（如JavaScript）并不存在这种区别：<strong>它只有对象！</strong>不论是构造函数(constructor)，实例(instance)，原型(prototype)本身都是对象。基于原型的语言具有所谓的原型对象的概念，新对象可以从中获得原始的属性。</p>
<p>所以，在JavaScript中有一个很有意思的<code>__proto__</code>属性（ES6以下是非标准属性）用于访问其原型对象， 你会发现，上面提到的构造函数，实例，原型本身都有<code>__proto__</code>指向原型对象。其最后顺着原型链都会指向<code>Object</code>这个构造函数，然而<code>Object</code>的原型对象的原型是<code>null</code>，不信， 你可以尝试一下<code>Object.prototype.__proto__ === null</code>为<code>true</code>。然而<code>typeof null === 'object'</code>为<code>true</code>。到这里， 我相信你应该就能明白为什么JavaScript这类基于原型的语言中没有类和实例的区别， 而是<strong>万物皆对象！</strong></p>
<p><strong>差异总结</strong></p>
<table>
<thead><tr>
<th>基于类的（Java）</th>
<th>基于原型的（JavaScript）</th>
</tr></thead>
<tbody>
<tr>
<td>类和实例是不同的事物。</td>
<td>所有对象均为实例。</td>
</tr>
<tr>
<td>通过类定义来定义类；通过构造器方法来实例化类。</td>
<td>通过构造器函数来定义和创建一组对象。</td>
</tr>
<tr>
<td>通过 new 操作符创建单个对象。</td>
<td>相同</td>
</tr>
<tr>
<td>通过类定义来定义现存类的子类， 从而构建对象的层级结构</td>
<td>指定一个对象作为原型并且与构造函数一起构建对象的层级结构</td>
</tr>
<tr>
<td>遵循类链接继承属性</td>
<td>遵循原型链继承属性</td>
</tr>
<tr>
<td>类定义指定类的所有实例的所有属性。无法在运行时动态添加属性</td>
<td>构造器函数或原型指定初始的属性集。允许动态地向单个的对象或者整个对象集中添加或移除属性。</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader1"><strong>二. ES5中的面向对象</strong></h3>
<blockquote>*这里的ES5并不特指ECMAScript 5， 而是代表ECMAScript 6 之前的ECMAScript！</blockquote>
<h4><strong>(一) ES5中对象的创建</strong></h4>
<p>在ES5中创建对象有两种方式， 第一种是使用对象字面量的方式， 第二种是使用构造函数的方式。该两种方法在特定的使用场景分别有其优点和缺点， 下面我们来分别介绍这两种创建对象的方式。</p>
<h5><strong>1. 使用对象字面量的方式</strong></h5>
<p>我们通过对象字面量的方式创建两个<code>student</code>对象，分别是<code>student1</code>和<code>student2</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var student1 = {
  name: '阿辉',
  age: 22,
  subject: '前端开发'
};

var student2 = {
  name: '阿傻',
  age: 22,
  subject: '大数据开发'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> student1 = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'阿辉'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>,
  <span class="hljs-attr">subject</span>: <span class="hljs-string">'前端开发'</span>
};

<span class="hljs-keyword">var</span> student2 = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'阿傻'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>,
  <span class="hljs-attr">subject</span>: <span class="hljs-string">'大数据开发'</span>
};</code></pre>
<p>上面的代码就是使用对象字面量的方式创建实例对象， 使用对象字面量的方式在创建单一简单对象的时候是非常方便的。但是，它也有其缺点：</p>
<ul>
<li>在生成多个实例对象时， 我们需要每次重复写<code>name</code>,<code>age</code>,<code>subject</code>属性，写起来特别的麻烦</li>
<li>虽然都是学生的对象， 但是看不出<code>student1</code>和<code>student2</code>之间有什么联系。</li>
</ul>
<p>为了解决以上两个问题， JavaScript提供了构造函数创建对象的方式。</p>
<h5><strong>2. 使用构造函数的方式</strong></h5>
<p>构造函数就其实就是一个普通的函数，当对构造函数使用<code>new</code>进行实例化时，会将其内部<code>this</code>的指向绑定实例对象上，下面我们来创建一个<code>Student</code>构造函数（构造函数约定使用大写开头，和普通函数做区分）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
  console.log(this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}</code></pre>
<p>我特意在构造函数中打印出<code>this</code>的指向。上面我们提到，构造函数其实就是一个普通的函数， 那么我们使用普通函数的调用方式尝试调用<code>Student</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Student('阿辉', 22, '前端开发'); //window{}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'前端开发'</span>); <span class="hljs-comment">//window{}</span></code></pre>
<p>采用普通方式调用<code>Student</code>时， <code>this</code>的指向是<code>window</code>。下面使用<code>new</code>来实例化该构造函数， 生成一个实例对象<code>student1</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let student1 = new Student('阿辉', 22, '前端开发'); //Student&nbsp;{name: &quot;阿辉&quot;, age: 22, subject: &quot;前端开发&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> student1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'前端开发'</span>); <span class="hljs-comment">//Student&nbsp;{name: "阿辉", age: 22, subject: "前端开发"}</span></code></pre>
<p>当我们采用<code>new</code>生成实例化对象<code>student1</code>时， <code>this</code>不再指向<code>window</code>, 而是指向的实例对象本身。这些， 都是<code>new</code>帮我们做的。上面的就是采用构造函数的方式生成实例对象的方式， 并且当我们生成其他实例对象时，由于都是采用<code>Student</code>这个构造函数实例化而来的， 我们能够清楚的知道各实例对象之间的联系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');
let student3 = new Student('阿呆', 22, 'Python');
let student4 = new Student('阿笨', 22, 'Java');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> student1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'前端开发'</span>);
<span class="hljs-keyword">let</span> student2 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿傻'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'大数据开发'</span>);
<span class="hljs-keyword">let</span> student3 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿呆'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'Python'</span>);
<span class="hljs-keyword">let</span> student4 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿笨'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'Java'</span>);</code></pre>
<h4><strong>(二) ES5中对象的继承</strong></h4>
<h5><strong>1. <code>prototype</code>的原型继承</strong></h5>
<p><code>prototype</code>是JavaScript这类基于原型继承的核心， 只要弄明白了原型和原型链， 就基本上完全理解了JavaScript中对象的继承。下面我将着重的讲解为什么要使用<code>prototype</code>和使用<code>prototype</code>实现继承的方式。</p>
<p><strong>为什么要使用<code>prototype</code>？</strong></p>
<p>我们给之前的<code>Student</code>构造函数新增一个<code>study</code>方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
  this.study = function() {
    console.log('我在学习' + this.subject);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
  <span class="hljs-keyword">this</span>.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我在学习'</span> + <span class="hljs-keyword">this</span>.subject);
  }
}</code></pre>
<p>现在我们来实例化<code>Student</code>构造函数， 生成<code>student1</code>和<code>`student2</code>, 并分别调用其<code>study</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');

student1.study(); //我在学习前端开发
student2.study(); //我在学习大数据开发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> student1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'前端开发'</span>);
<span class="hljs-keyword">let</span> student2 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿傻'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'大数据开发'</span>);

student1.study(); <span class="hljs-comment">//我在学习前端开发</span>
student2.study(); <span class="hljs-comment">//我在学习大数据开发</span></code></pre>
<p>这样生成的实例对象表面上看没有任何问题， 但是其实是有很大的<strong>性能问题</strong>！我们来看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(student1.study === student2.study); //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(student1.study === student2.study); <span class="hljs-comment">//false</span></code></pre>
<p>其实对于每一个实例对象<code>studentx</code>，其<code>study</code>方法的函数体是一模一样的，方法的执行结果只根据其实例对象决定，然而生成的每个实例都需要生成一个<code>study</code>方法去占用一份内存。这样是非常不经济的做法。新手可能会认为， 上面的代码中也就多生成了一个<code>study</code>方法， 对于内存的占用可以忽略不计。</p>
<p>那么我们在MDN中看一下在JavaScript中我们使用的<code>String</code>实例对象有多少方法？ </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229219?w=875&amp;h=905" src="https://static.alili.tech/img/remote/1460000013229219?w=875&amp;h=905" alt="String中的方法" title="String中的方法" style="cursor: pointer;"></span></p>
<p>上面的方法只是<code>String</code>实例对象中的一部分方法（我一个屏幕截取不完！）， 这也就是为什么我们的字符串能够使用如此多便利的原生方法的原因。设想一下， 如果这些方法不是挂载在<code>String.prototype</code>上， 而是像上面<code>Student</code>一样写在<code>String</code>构造函数上呢？那么我们项目中的每一个字符串，都会去生成这几十种方法去占用内存，这还没考虑<code>Math</code>,<code>Array</code>,<code>Number</code>,<code>Object</code>等对象！</p>
<p>现在我们应该知道应该将<code>study</code>方法挂载到<code>Student.prototype</code>原型对象上才是正确的写法，所有的<code>studentx</code>实例都能继承该方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}
Student.prototype.study = function() {
  console.log('我在学习' + this.subject);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
}
Student.prototype.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我在学习'</span> + <span class="hljs-keyword">this</span>.subject);
}</code></pre>
<p>现在我们实例化<code>student1</code>和<code>student2</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let student1 = new Student('阿辉', 22, '前端开发');
let student2 = new Student('阿傻', 22, '大数据开发');

student1.study(); //我在学习前端开发
student2.study(); //我在学习大数据开发

console.log(student1.study === student2.study); //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> student1 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'前端开发'</span>);
<span class="hljs-keyword">let</span> student2 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿傻'</span>, <span class="hljs-number">22</span>, <span class="hljs-string">'大数据开发'</span>);

student1.study(); <span class="hljs-comment">//我在学习前端开发</span>
student2.study(); <span class="hljs-comment">//我在学习大数据开发</span>

<span class="hljs-built_in">console</span>.log(student1.study === student2.study); <span class="hljs-comment">//true</span></code></pre>
<p>从上面的代码我们可以看出， <code>student1</code>和<code>student2</code>的<code>study</code>方法执行结果没有发生变化，但是<code>study</code>本身指向了一个内存地址。这就是为什么我们要使用<code>prototype</code>进行挂载方法的原因。接下来我们来讲解一下如何使用<code>prototype</code>来实现继承。</p>
<h5><strong>如何使用<code>prototype</code>实现继承？</strong></h5>
<p>“学生”这个对象可以分为小学生， 中学生和大学生等。我们现在新建一个小学生的构造函数<code>Pupil</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Pupil(school) {
  this.school = school;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pupil</span>(<span class="hljs-params">school</span>) </span>{
  <span class="hljs-keyword">this</span>.school = school;
}</code></pre>
<p>那么如何让<code>Pupil</code>使用<code>prototype</code>继承<code>Student</code>呢? 其实我们只要将<code>Pupil</code>的<code>prototype</code>指向<code>Student</code>的一个实例即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');
Pupil.prototype.constructor = Pupil;

let pupil1 = new Pupil('北大附小');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Pupil.prototype = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>);
Pupil.prototype.constructor = Pupil;

<span class="hljs-keyword">let</span> pupil1 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'北大附小'</span>);</code></pre>
<p>代码的第一行， 我们将<code>Pupil</code>的原型对象（<code>Pupil.prototype</code>）指向了<code>Student</code>的实例对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Pupil.prototype = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>);</code></pre>
<p>代码的第二行也许有的读者会不能理解是什么意思。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pupil.prototype.constructor = Pupil;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Pupil.prototype.constructor = Pupil;</code></pre>
<p><code>Pupil</code>作为构造函数有一个<code>protoype</code>属性指向原型对象<code>Pupil.prototype</code>，而原型对象<code>Pupil.prototype</code>也有一个<code>constructor</code>属性指回它的构造函数<code>Pupil</code>。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229220?w=841&amp;h=337" src="https://static.alili.tech/img/remote/1460000013229220?w=841&amp;h=337" alt="prototype和constructor的指向" title="prototype和constructor的指向" style="cursor: pointer;"></span></p>
<p>然而， 当我们使用实例化<code>Student</code>去覆盖<code>Pupil.prototype后</code>， 如果没有第二行代码的情况下， <code>Pupil.prototype.constructor</code>指向了<code>Student</code>构造函数， 如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000013229221?w=820&amp;h=312" src="https://static.alili.tech/img/remote/1460000013229221?w=820&amp;h=312" alt="prototype和constructor的指向错误" title="prototype和constructor的指向错误" style="cursor: pointer;"></span></p>
<p>而且， <code>pupil1.constructor</code>会默认调用<code>Pupil.prototype.constructor</code>， 这个时候<code>pupil1.constructor</code>指向了<code>Student</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');
let pupil1 = new Pupil('北大附小');

console.log(pupil1.constructor === Student); //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Pupil.prototype = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>);
<span class="hljs-keyword">let</span> pupil1 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'北大附小'</span>);

<span class="hljs-built_in">console</span>.log(pupil1.constructor === Student); <span class="hljs-comment">//true</span></code></pre>
<p>这明显是错误的， <code>pupil1</code>明明是用<code>Pupil</code>构造函数实例化出来的， 怎么其<code>constructor</code>指向了<code>Student</code>构造函数呢。所以， 我们就需要加入第二行， 修正其错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Pupil.prototype = new Student('小辉', 8, '小学义务教育课程');

//修正constructor的指向错误
Pupil.prototype.constructor = Pupil;

let pupil1 = new Pupil('北大附小');

console.log(pupil1.constructor === Student); //false
console.log(pupil1.constructor === Pupil); //ture" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Pupil.prototype = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>);

<span class="hljs-comment">//修正constructor的指向错误</span>
Pupil.prototype.constructor = Pupil;

<span class="hljs-keyword">let</span> pupil1 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'北大附小'</span>);

<span class="hljs-built_in">console</span>.log(pupil1.constructor === Student); <span class="hljs-comment">//false</span>
<span class="hljs-built_in">console</span>.log(pupil1.constructor === Pupil); <span class="hljs-comment">//ture</span></code></pre>
<p>上面就是我们的如何使用<code>prototype</code>实现继承的例子， 需要特别注意的: <strong>如果替换了prototype对象， 必须手动将<code>prototype.constructor</code>重新指向其构造函数。</strong></p>
<h5><strong>2. 使用<code>call</code>和<code>apply</code>方法实现继承</strong></h5>
<p>使用<code>call</code>和<code>apply</code>是我个人比较喜欢的继承方式， 因为只需要一行代码就可以实现继承。但是该方法也有其局限性，<code>call</code>和<code>apply</code>不能继承原型上的属性和方法， 下面会有详细说明。</p>
<p><strong>使用<code>call</code>实现继承</strong></p>
<p>同样对于上面的<code>Student</code>构造函数， 我们使用<code>call</code>实现<code>Pupil</code>继承<code>Student</code>的全部属性和方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用call实现继承
  Student.call(this, name, age, subject);
  this.school = school;
}

//实例化Pupil
let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//父类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
}

<span class="hljs-comment">//子类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pupil</span>(<span class="hljs-params">name, age, subject, school</span>) </span>{
  <span class="hljs-comment">//使用call实现继承</span>
  Student.call(<span class="hljs-keyword">this</span>, name, age, subject);
  <span class="hljs-keyword">this</span>.school = school;
}

<span class="hljs-comment">//实例化Pupil</span>
<span class="hljs-keyword">let</span> pupil2 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>, <span class="hljs-string">'北大附小'</span>);</code></pre>
<p>需要注意的是， <code>call</code>和<code>apply</code>只能继承本地属性和方法， 而不能继承原型上的属性和方法，如下面的代码所示, 我们给<code>Student</code>挂载<code>study</code>方法，<code>Pupil</code>使用<code>call</code>继承<code>Student</code>后， 调用<code>pupil2.study()</code>会报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}
//原型上挂载study方法
Student.prototype.study = function() {
  console.log('我在学习' + this.subject);
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用call实现继承
  Student.call(this, name, age, subject);
  this.school = school;
}

let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');

//报错
pupil2.study(); //Uncaught TypeError: pupil2.study is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//父类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
}
<span class="hljs-comment">//原型上挂载study方法</span>
Student.prototype.study = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我在学习'</span> + <span class="hljs-keyword">this</span>.subject);
}

<span class="hljs-comment">//子类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pupil</span>(<span class="hljs-params">name, age, subject, school</span>) </span>{
  <span class="hljs-comment">//使用call实现继承</span>
  Student.call(<span class="hljs-keyword">this</span>, name, age, subject);
  <span class="hljs-keyword">this</span>.school = school;
}

<span class="hljs-keyword">let</span> pupil2 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>, <span class="hljs-string">'北大附小'</span>);

<span class="hljs-comment">//报错</span>
pupil2.study(); <span class="hljs-comment">//Uncaught TypeError: pupil2.study is not a function</span></code></pre>
<p><strong>使用<code>apply</code>实现继承</strong><br>使用<code>apply</code>实现继承的方式和<code>call</code>类似， 唯一的不同只是参数需要使用数组的方法。下面我们使用<code>apply</code>来实现上面<code>Pupil</code>继承<code>Student</code>的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父类构造函数
function Student (name, age, subject) {
  this.name = name;
  this.age = age; 
  this.subject = subject;
}

//子类构造函数
function Pupil(name, age, subject, school) {
  //使用applay实现继承
  Student.apply(this, [name, age, subject]);
  this.school = school;
}

//实例化Pupil
let pupil2 = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//父类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span> (<span class="hljs-params">name, age, subject</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = age; 
  <span class="hljs-keyword">this</span>.subject = subject;
}

<span class="hljs-comment">//子类构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Pupil</span>(<span class="hljs-params">name, age, subject, school</span>) </span>{
  <span class="hljs-comment">//使用applay实现继承</span>
  Student.apply(<span class="hljs-keyword">this</span>, [name, age, subject]);
  <span class="hljs-keyword">this</span>.school = school;
}

<span class="hljs-comment">//实例化Pupil</span>
<span class="hljs-keyword">let</span> pupil2 = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>, <span class="hljs-string">'北大附小'</span>);</code></pre>
<h5><strong>3. 其他继承方式</strong></h5>
<p>JavaScript中的继承方式不仅仅只有上面提到的几种方法， 在《JavaScript高级程序设计》中， 还有实例继承，拷贝继承，组合继承，寄生组合继承等众多继承方式。在寄生组合继承中， 就很好的弥补了<code>call</code>和<code>apply</code>无法继承原型属性和方法的缺陷，是最完美的继承方法。这里就不详细的展开论述，感兴趣的可以自行阅读《JavaScript高级程序设计》。</p>
<h3 id="articleHeader2"><strong>三. ES6中的面向对象</strong></h3>
<p>基于原型的继承方式，虽然实现了代码复用，但是行文松散且不够流畅，可阅读性差，不利于实现扩展和对源代码进行有效的组织管理。不得不承认，基于类的继承方式在语言实现上更健壮，且在构建可服用代码和组织架构程序方面具有明显的优势。所以，ES6中提供了基于类<code>class</code>的语法。但<code>class</code>本质上是ES6提供的一颗<strong>语法糖</strong>，正如我们前面提到的，<strong>JavaScript是一门基于原型的面向对象语言</strong>。</p>
<h4><strong>(一) ES6中对象的创建</strong></h4>
<p>我们使用ES6的<code>class</code>来创建<code>Student</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义类
class Student {
  //构造方法
  constructor(name, age, subject) {
    this.name = name;
    this.age = age;
    this.subject = subject;
  }

  //类中的方法
  study(){
    console.log('我在学习' + this.subject);
  }
}

//实例化类
let student3 = new Student('阿辉', 24, '前端开发');
student3.study(); //我在学习前端开发" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//定义类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Student</span> </span>{
  <span class="hljs-comment">//构造方法</span>
  <span class="hljs-keyword">constructor</span>(name, age, subject) {
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.subject = subject;
  }

  <span class="hljs-comment">//类中的方法</span>
  study(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我在学习'</span> + <span class="hljs-keyword">this</span>.subject);
  }
}

<span class="hljs-comment">//实例化类</span>
<span class="hljs-keyword">let</span> student3 = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'阿辉'</span>, <span class="hljs-number">24</span>, <span class="hljs-string">'前端开发'</span>);
student3.study(); <span class="hljs-comment">//我在学习前端开发</span></code></pre>
<p>上面的代码定义了一个<code>Student</code>类， 可以看到里面有一个<code>constructor</code>方法， 这就是构造方法，而<code>this</code>关键字则代表实例对象。也就是说，ES5中的构造函数<code>Student</code>， 对应的是E6中<code>Student</code>类中的<code>constructor</code>方法。</p>
<p><code>Student</code>类除了构造函数方法，还定义了一个<code>study</code>方法。需要特别注意的是，在ES6中定义类中的方法的时候，前面不需要加上<code>function</code>关键字，直接把函数定义进去就可以了。另外，方法之间不要用逗号分隔，加了会报错。而且，类中的方法全部是定义在原型上的，我们可以用下面的代码进行验证。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(student3.__proto__.study === Student.prototype.study); //true
console.log(student3.hasOwnProperty('study')); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(student3.__proto__.study === Student.prototype.study); <span class="hljs-comment">//true</span>
<span class="hljs-built_in">console</span>.log(student3.hasOwnProperty(<span class="hljs-string">'study'</span>)); <span class="hljs-comment">// false</span></code></pre>
<p>上面的第一行的代码中, <code>student3.__proto__</code>是指向的原型对象，其中<code>Student.prototype</code>也是指向的原型的对象，结果为<code>true</code>就能很好的说明上面的结论： <strong>类中的方法全部是定义在原型上的</strong>。第二行代码是验证<code>student3</code>实例中是否有<code>study</code>方法，结果为<code>false</code>， 表明实例中没有<code>study</code>方法，这也更好的说明了上面的结论。其实，只要理解了<strong>ES5中的构造函数对应的是类中的<code>constructor</code>方法</strong>，就能推断出上面的结论。</p>
<h4><strong>(二) ES6中对象的继承</strong></h4>
<p>E6中<code>class</code>可以通过<code>extends</code>关键字来实现继承， 这比前面提到的ES5中使用原型链来实现继承， 要清晰和方便很多。下面我们使用ES6的语法来实现<code>Pupil</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//子类
class Pupil extends Student{
  constructor(name, age, subject, school) {
    //调用父类的constructor
    super(name, age, subject); 
    this.school = school;
  }
}

let pupil = new Pupil('小辉', 8, '小学义务教育课程', '北大附小');
pupil.study(); //我在学习小学义务教育课程" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//子类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pupil</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Student</span></span>{
  <span class="hljs-keyword">constructor</span>(name, age, subject, school) {
    <span class="hljs-comment">//调用父类的constructor</span>
    <span class="hljs-keyword">super</span>(name, age, subject); 
    <span class="hljs-keyword">this</span>.school = school;
  }
}

<span class="hljs-keyword">let</span> pupil = <span class="hljs-keyword">new</span> Pupil(<span class="hljs-string">'小辉'</span>, <span class="hljs-number">8</span>, <span class="hljs-string">'小学义务教育课程'</span>, <span class="hljs-string">'北大附小'</span>);
pupil.study(); <span class="hljs-comment">//我在学习小学义务教育课程</span></code></pre>
<p>上面代码代码中， 我们通过了<code>extends</code>实现<code>Pupil</code>子类继承<code>Student</code>父类。需要特别注意的是，子类必须在<code>constructor</code>方法中<strong>首先调用<code>super</code>方法</strong>，否则实例化时会报错。这是因为子类没有自己的<code>this</code>对象， 而是继承父类的<code>this</code>对象，然后对其加工。如果不调用<code>super</code>方法，子类就得不到<code>this</code>对象。</p>
<h3 id="articleHeader3"><strong>四.结束语</strong></h3>
<p>JavaScript 被认为是世界上最受误解的编程语言，因为它身披 c 语言家族的外衣，表现的却是 LISP 风格的函数式语言特性；没有类，却实也彻底实现了面向对象。要对这门语言有透彻的理解，就必须扒开其 c 语言的外衣，从新回到函数式编程的角度，同时摒弃原有类的面向对象概念去学习领悟它<sup>(摘自参考目录1)</sup>。现在的前端中不仅普遍的使用了ES6的新语法，而且在JavaScript的基础上还出现了TypeScript、CoffeeScript这样的超集。可以预见的是，目前在前端生态圈一片繁荣的情况下，对JSer的需求也会越来越多，但同时也对前端开发者的JavaScript的水平提出了更加严苛的要求。使用面向对象的思想去开发前端项目也是未来对JSer的基本要求之一！</p>
<h3 id="articleHeader4"><strong>五.参考文章</strong></h3>
<ol>
<li><a href="https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo/#artrelatedtopics" rel="nofollow noreferrer" target="_blank">IBM: 全面理解面向对象的JavaScript</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Details_of_the_Object_Model" rel="nofollow noreferrer" target="_blank">MDN: 对象模型的细节</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html" rel="nofollow noreferrer" target="_blank">阮一峰： Javascript面向对象编程系列</a></li>
<li><a href="http://es6.ruanyifeng.com/#docs/class" rel="nofollow noreferrer" target="_blank">阮一峰： ECMASciprt6入门</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重新认识JavaScript面向对象: 从ES5到ES6

## 原文链接
[https://segmentfault.com/a/1190000013186214](https://segmentfault.com/a/1190000013186214)


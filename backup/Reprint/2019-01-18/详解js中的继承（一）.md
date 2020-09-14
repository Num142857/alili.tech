---
title: '详解js中的继承（一）' 
date: 2019-01-18 2:30:35
hidden: true
slug: f4b53bj0fqw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近在学vue，到周末终于有空写一些东西了（想想又能骗赞，就有点小激动！）。在javascript基础中，除了闭包之外，继承也是一个难点。因为考虑到篇幅较长，所以打算分成两个部分来写。同样基于《javascript高级程序设计》，做一个详细的讲解，如果有不对的地方欢迎指正。</p>
<h2 id="articleHeader1">准备知识</h2>
<p>为了更好的讲解继承，先把一些准备知识放在前面。</p>
<h3 id="articleHeader2">1.构造函数，实例</h3>
<p>构造函数，是<strong>用来创建对象</strong>的函数，本质上也是函数。与其他函数的区别在于<strong>调用方式</strong>不同：</p>
<ul>
<li><p>如果通过<code>new</code>操作符来调用的，就是构造函数</p></li>
<li>
<p>如果没有通过<code>new</code>操作符来调用的，就是普通函数<br>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
   this.name = name;
   this.age = age;
 }
 //当做构造函数调用
 var person1 = new Person('Mike',10);
 
 //当做普通函数调用，这里相当于给window对象添加了name和age属性,这个不是重点，只要注意调用方式
 Person('Bob',12);
 
 console.log(person1)//Person {name: &quot;Mike&quot;, age: 10}
 console.log(name)//Bob
 console.log(age)//12" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
   <span class="hljs-keyword">this</span>.name = name;
   <span class="hljs-keyword">this</span>.age = age;
 }
 <span class="hljs-comment">//当做构造函数调用</span>
 <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Mike'</span>,<span class="hljs-number">10</span>);
 
 <span class="hljs-comment">//当做普通函数调用，这里相当于给window对象添加了name和age属性,这个不是重点，只要注意调用方式</span>
 Person(<span class="hljs-string">'Bob'</span>,<span class="hljs-number">12</span>);
 
 <span class="hljs-built_in">console</span>.log(person1)<span class="hljs-comment">//Person {name: "Mike", age: 10}</span>
 <span class="hljs-built_in">console</span>.log(name)<span class="hljs-comment">//Bob</span>
 <span class="hljs-built_in">console</span>.log(age)<span class="hljs-comment">//12</span></code></pre>
</li>
</ul>
<p>在<code>var person1 = new Person('Mike',10);</code>中，通过new操作符调用了函数<code>Person</code>，并且生成了<code>person1</code>,<br>这里的Person就称为<strong>构造函数</strong>，<code>person1</code>称为<code>Person</code>函数对象的一个<strong>实例</strong>。实可以通过实例的<code>constructor</code>访问对应的构造函数<strong>（但是其实上这个<code>constructor</code>不是实例的属性，后面会解释为什么）</strong>，看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Person(name, age) {
    this.name = name;
    this.age = age;
  }
 var person1 = new Person('Mike',10);
 var person2 = new Person('Alice',20);
 console.log(person1.constructor)//function Person(){省略内容...}
 console.log(person2.constructor)//function Person(){省略内容...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
  }
 <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Mike'</span>,<span class="hljs-number">10</span>);
 <span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Alice'</span>,<span class="hljs-number">20</span>);
 <span class="hljs-built_in">console</span>.log(person1.constructor)<span class="hljs-comment">//function Person(){省略内容...}</span>
 <span class="hljs-built_in">console</span>.log(person2.constructor)<span class="hljs-comment">//function Person(){省略内容...}</span></code></pre>
<h3 id="articleHeader3">2.原型对象</h3>
<p>当我们每次创建一个函数的时候，函数对象都会有一个<code>prototype</code>属性，这个属性是一个<strong>指针</strong>,指向它的<strong>原型对象</strong>。<strong>原型对象的本质也是一个对象</strong>。初次看这句话可能有点难以理解，举个例子，还是刚刚那个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function Person(name, age) {
        this.name = name;
        this.age = age;
     }
     console.log(Person.prototype)//object{constructor:Person}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
     }
     <span class="hljs-built_in">console</span>.log(Person.prototype)<span class="hljs-comment">//object{constructor:Person}</span></code></pre>
<p>可以看到<code>Person.prototype</code>指向了一个对象，即<strong>Person的原型对象</strong>，并且这个对象有一个<code>constructor</code>属性，又指向了<code>Person</code>函数对象。是不是有点晕？没关系，接下来我们就上比举例子更好的手段--画图。</p>
<h3 id="articleHeader4">3.构造函数，原型对象和实例的关系</h3>
<p>在前面，我们刚刚介绍过了构造函数，实例和原型对象，接下来我们用一张图来表示这三者之间的关系（用ps画这种图真是麻烦的要死，大家有好的工具推荐一下）：<br><span class="img-wrap"><img data-src="/img/bVKPzp?w=1000&amp;h=800" src="https://static.alili.tech/img/bVKPzp?w=1000&amp;h=800" alt="关系图" title="关系图" style="cursor: pointer; display: inline;"></span><br>从图上我们可以看到：</p>
<ul>
<li><p>函数对象的<code>prototype</code>指向原型对象，原型对象的<code>constructor</code>指向函数对象</p></li>
<li><p>实例对象的<code>[Protoptype]</code>属性指向<strong>原型对象</strong>，这里的<code>[Protoptype]</code>是<strong>内部属性</strong>，可以先理解为它是存在的，但是不允许我们访问（虽然在有些浏览器是允许访问这个属性的，但是我们先这样理解），这个属性的作用是：<strong>允许实例通过该属性访问原型对象中的属性和方法</strong>。比如说：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Person(name, age) {
        this.name = name;
        this.age = age;
      }
      //在原型对象中添加属性或者方法
     Person.prototype.sex = '男'; 
     var person1 = new Person('Mike',10);
     var person2 = new Person('Alice',20);
     //只给person2设置性别
     person2.sex = '女';
     console.log(person1.sex)//'男'
     console.log(person2.sex)//'女'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.age = age;
      }
      <span class="hljs-comment">//在原型对象中添加属性或者方法</span>
     Person.prototype.sex = <span class="hljs-string">'男'</span>; 
     <span class="hljs-keyword">var</span> person1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Mike'</span>,<span class="hljs-number">10</span>);
     <span class="hljs-keyword">var</span> person2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Alice'</span>,<span class="hljs-number">20</span>);
     <span class="hljs-comment">//只给person2设置性别</span>
     person2.sex = <span class="hljs-string">'女'</span>;
     <span class="hljs-built_in">console</span>.log(person1.sex)<span class="hljs-comment">//'男'</span>
     <span class="hljs-built_in">console</span>.log(person2.sex)<span class="hljs-comment">//'女'</span></code></pre>
<p>这里我们没有给<code>person1</code>实例设置<code>sex</code>属性，但是因为<code>[Protoptype]</code>的存在，会访问原型对象中对应的属性；<br>同时我们给person2设置<code>sex</code>属性后输出的是'女',说明只有当<strong>实例本身不存在对应的属性或方法时，才会去找原型对象上的对应属性或方法</strong></p>
<ul>
<li><p>补充一下：ECMA-262第五版的时候这个内部属性叫<code>[Prototype]</code>,而<code>_proto_</code>是<strong>Firefox，Chrome和Safari浏览器提供的一个属性</strong>，在其他的实现里面，这个内部属性是没法访问的。所以我们能从控制台看到的是<code>_proto_</code>属性，但是我在文中用的还是[Prototype]，个人认为这样较符合它的本质。</p></li>
<li><p>tips：这里刚好解释一下<code>console.log(person1.constructor)</code>时，说到的，可以通过实例的<code>constructor</code>访问构造函数，但是<code>constructor</code>本质上是原型对象的属性。</p></li>
</ul>
<h2 id="articleHeader5">继承</h2>
<h3 id="articleHeader6">原型链</h3>
<p>在js中，继承的主要思路就是利用原型链，因此如果理解了原型链，继承问题就理解了一半。在这里可以稍微休息一下，如果对前面的准备知识已经理解差不多了，就开始讲原型链了。</p>
<blockquote><p><strong>原型链的原理是：让一个引用类型继承另一个引用类型的属性和方法。</strong><br>先回顾一下刚刚讲过的知识：</p></blockquote>
<ul>
<li><p><strong>原型对象</strong>通过<code>constructor</code>属性指向<strong>构造函数</strong></p></li>
<li><p><strong>实例</strong>通过<code>[Prototype]</code>属性指向<strong>原型对象</strong></p></li>
</ul>
<p>那现在我们来思考一个问题：<strong>如果让原型对象等于另一个构造函数的实例会怎么样？</strong><br>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function A() {
     
    }
    //在A的原型上绑定sayA()方法
    A.prototype.sayA = function(){
            console.log(&quot;from A&quot;)
    }
    function B(){

    }
    
     //让B的原型对象指向A的一个实例
     B.prototype = new A();
     
     //在B的原型上绑定sayB()方法
     B.prototype.sayB = function(){
            console.log(&quot;from B&quot;)
     }
     //生成一个B的实例
     var a1 = new A();
     var b1 = new B();
     
     //b1可以调用sayB和sayA
     b1.sayB();//'from B'
     b1.sayA();//'from A'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params"></span>) </span>{
     
    }
    <span class="hljs-comment">//在A的原型上绑定sayA()方法</span>
    A.prototype.sayA = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"from A"</span>)
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params"></span>)</span>{

    }
    
     <span class="hljs-comment">//让B的原型对象指向A的一个实例</span>
     B.prototype = <span class="hljs-keyword">new</span> A();
     
     <span class="hljs-comment">//在B的原型上绑定sayB()方法</span>
     B.prototype.sayB = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"from B"</span>)
     }
     <span class="hljs-comment">//生成一个B的实例</span>
     <span class="hljs-keyword">var</span> a1 = <span class="hljs-keyword">new</span> A();
     <span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> B();
     
     <span class="hljs-comment">//b1可以调用sayB和sayA</span>
     b1.sayB();<span class="hljs-comment">//'from B'</span>
     b1.sayA();<span class="hljs-comment">//'from A'</span></code></pre>
<p>为了方便理解刚刚发生了什么，我们再上一张图：<br><span class="img-wrap"><img data-src="/img/bVKPIm?w=1515&amp;h=835" src="https://static.alili.tech/img/bVKPIm?w=1515&amp;h=835" alt="原型链" title="原型链" style="cursor: pointer;"></span><br>现在结合图片来看代码：</p>
<ul>
<li><p>首先，我们创建了A和B两个函数对象，<strong>同时也就生成了它们的原型对象</strong></p></li>
<li><p>接着，我们给A的原型对象添加了<code>sayA()</code>方法<br>*　然后是关键性的一步<code>B.prototype = new A();</code>，我们<strong>让函数对象B的<code>protytype</code>指针指向了一个A的实例</strong>,请注意我的描述：<strong>是让函数对象B的<code>protytype</code>指针指向了一个A的实例</strong>，这也是为什么最后,<strong>B的原型对象里面不再有constructor属性</strong>，其实B本来有一个真正的原型对象，原本可以通过B.prototype访问，但是我们现在改写了这个指针，使它指向了另一个对象，所以B真正的原型对象现在没法被访问了，取而代之的这个新的原型对象是A的一个实例，自然就没有<code>constructor</code>属性了</p></li>
<li><p>接下来我们给这个<strong>B.prototype</strong>指向的对象，增加一个<code>sayB</code>方法</p></li>
<li><p>然后,我们生成了一个实例b1</p></li>
<li><p>最后我们调用了b1的sayB方法，可以执行，为什么？<br><strong>因为b1有<code>[Prototype]</code>属性可以访问B prototype里面的方法；</strong></p></li>
<li><p>我们调用了b1的sayA方法，可以执行，为什么？<br><strong>因为b1沿着<code>[Prototype]</code>属性可以访问B prototype，B prototype继续沿着<code>[Prototype]</code>属性访问A prototype，最终在A.prototype上找到了sayA()方法，所以可以执行</strong></p></li>
</ul>
<p>所以，现在的结果就相当于，<strong>b1继承了A的属性和方法</strong>，这种<strong>由<code>[Prototype]</code>不断把实例和原型对象联系起来的结构就是原型链</strong>。也是js中，继承主要的实现方式。</p>
<h1 id="articleHeader7">小结</h1>
<p>因为这部分知识理解起来比较难，所以第一部分先写到这里（当然不是因为我想多写一篇来骗赞和关注啦），大家读到这里也可以歇口气了，如果这一块理解深刻，下一部分就会很轻松。<br>为了测试一下大家对于本文的理解程度，问一下几个问题：</p>
<ol>
<li><p>在最后一个例子里，<code>console.log(b1.constructor)</code>，结果是什么？</p></li>
<li><p><code>B.prototype = new A();</code>和<code> B.prototype.sayB = function(){   console.log("from B")  }</code>这两句的执行顺序能不能交换</p></li>
<li><p>最后再思考一下. 在最后一个例子里，<code>A</code>看似已经是原型链的最顶层，那<code>A</code>还能再往上吗？</p></li>
</ol>
<p>以上答案在下篇中解答，读者可以自己先试试，思考一下，有疑问也可以在评论中提出。<strong>最后，如果这篇文章对你有帮助，请大方的点收藏和推荐吧（每次都是收藏比推荐多!，组织语言，画图和排版都很辛苦的），你们的支持会给我更大的动力~</strong>以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解js中的继承（一）

## 原文链接
[https://segmentfault.com/a/1190000008739672](https://segmentfault.com/a/1190000008739672)


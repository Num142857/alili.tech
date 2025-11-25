---
title: 'JS基础-Prototype原型继承' 
date: 2018-11-30 2:30:12
hidden: true
slug: vg6ybph2pdq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概述</h2>
<p>原型和闭包是JS的两个难点，最近碰到了原型继承的概念，正好在这里总结一下。</p>
<p>既然要实现继承，就一定要有一个父类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 定义一个父类
        function father(name) {
            //属性
            this.name = name;
        }
        // 原型方法
        father.prototype.getName = function () {
            return this.name;
        }
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>        <span class="hljs-comment">// 定义一个父类</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">father</span><span class="hljs-params">(name)</span> </span>{
            <span class="hljs-comment">//属性</span>
            <span class="hljs-keyword">this</span>.name = name;
        }
        <span class="hljs-comment">// 原型方法</span>
        father.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }
        </code></pre>
<h3 id="articleHeader1">原型链继承</h3>
<p>基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。</p>
<p>回顾一下原型、实例和构造函数的关系。</p>
<blockquote>每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象内部的指针。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        // 子类
        function son(age) {
            // 属性
            this.age = age;
        };

        son.prototype = new father('jason');

        son.prototype.getAge = function () {
            return this.age;
        }

        let firstchild = new son('19');

        console.log(firstchild.getAge()) // 19
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-comment">// 子类</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">son</span>(<span class="hljs-params">age</span>) </span>{
            <span class="hljs-comment">// 属性</span>
            <span class="hljs-keyword">this</span>.age = age;
        };

        son.prototype = <span class="hljs-keyword">new</span> father(<span class="hljs-string">'jason'</span>);

        son.prototype.getAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
        }

        <span class="hljs-keyword">let</span> firstchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'19'</span>);

        <span class="hljs-built_in">console</span>.log(firstchild.getAge()) <span class="hljs-comment">// 19</span>
        </code></pre>
<p>这里需要注意几点的是：</p>
<ul><li>默认原型</li></ul>
<p>原型链的最顶端是Object，所有引用类型默认都是继承于Object的，所以默认也是有toString等方法的。</p>
<p><span class="img-wrap"><img data-src="/img/bVbawZz?w=521&amp;h=179" src="https://static.alili.tech/img/bVbawZz?w=521&amp;h=179" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li>如何确定原型和实例的关系<br>   第一个方法是，instanceof，用于检测实例与原型链中出现过的构造函数。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     console.log(firstchild instanceof Object) //true
     console.log(firstchild instanceof son) //true
     console.log(firstchild instanceof father) //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>     <span class="hljs-built_in">console</span>.log(firstchild <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>) <span class="hljs-comment">//true</span>
     <span class="hljs-built_in">console</span>.log(firstchild <span class="hljs-keyword">instanceof</span> son) <span class="hljs-comment">//true</span>
     <span class="hljs-built_in">console</span>.log(firstchild <span class="hljs-keyword">instanceof</span> father) <span class="hljs-comment">//true</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第二个方法是，isPrototypeOf方法。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>第二个方法是，isPrototypeOf方法。
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        console.log(Object.prototype.isPrototypeOf(firstchild)) //true
        console.log(son.prototype.isPrototypeOf(firstchild)) //true
        console.log(father.prototype.isPrototypeOf(firstchild)) //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>        console.log(Object<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.isPrototypeOf</span>(firstchild)) <span class="hljs-comment">//true</span>
        console.log(son<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.isPrototypeOf</span>(firstchild)) <span class="hljs-comment">//true</span>
        console.log(father<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.isPrototypeOf</span>(firstchild)) <span class="hljs-comment">//true</span></code></pre>
<ul><li>谨慎定义方法</li></ul>
<p>子类型可能要重写父类型方法，或定义父类没有的方法。不管是啥，<strong>这个方法一定要写在替换原型语句的后面</strong>。<br>还有原型链继承的时候，不能使用对象字面量创建原型方法。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        son.prototype = new father('jason');

        son.prototype = {
            getAge: function() {
                return this.age
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>        son.prototype = <span class="hljs-keyword">new</span> father(<span class="hljs-string">'jason'</span>);

        son.prototype = {
            getAge: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age
            }
        }</code></pre>
<p>这样会导致创建一个新的Object实例，而非原来的father。</p>
<ul><li>共享性和传参问题<p>第一，引用类型的原型属性会被所有实例共享。</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function father(name) {
            this.name = name;
            this.colors = ['blue', 'red', 'white'];
        }
        
        let firstchild = new son('19');
        let secondchild = new son('20');
        firstchild.colors.push(&quot;black&quot;);
        console.log(firstchild.colors) // [&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;, &quot;black&quot;]
        console.log(secondchild.colors) // [&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;, &quot;black&quot;]
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>        function father(name) {
            <span class="hljs-keyword">this</span>.name = name;
            <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">'blue'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'white'</span>];
        }
        
        let firstchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'19'</span>);
        let secondchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'20'</span>);
        firstchild.colors.push(<span class="hljs-string">"black"</span>);
        <span class="hljs-built_in">console</span>.log(firstchild.colors) <span class="hljs-regexp">//</span> [<span class="hljs-string">"blue"</span>, <span class="hljs-string">"red"</span>, <span class="hljs-string">"white"</span>, <span class="hljs-string">"black"</span>]
        <span class="hljs-built_in">console</span>.log(secondchild.colors) <span class="hljs-regexp">//</span> [<span class="hljs-string">"blue"</span>, <span class="hljs-string">"red"</span>, <span class="hljs-string">"white"</span>, <span class="hljs-string">"black"</span>]
        </code></pre>
<p>第二，不能像父类型构造函数传参数，书里准确说法是，没有办法在不影响所有实例的情况下，给父类构造函数传递参数。</p>
<h4>小结</h4>
<p>优点：</p>
<ul>
<li>非常纯粹的继承关系，实例是子类的实例，也是父类的实例</li>
<li>父类新增原型方法/原型属性，子类都能访问到</li>
<li>简单，易于实现</li>
</ul>
<p>缺点：</p>
<ul>
<li>要想为子类新增属性和方法，必须要在new father()这样的语句之后执行，不能放到构造器中</li>
<li>无法实现多继承</li>
<li><strong>来自原型对象的引用属性是所有实例共享的</strong></li>
<li>创建子类实例时，无法向父类构造函数传参</li>
</ul>
<h3 id="articleHeader2">借用构造继承</h3>
<p>在子类型的构造函数中调用父类的构造函数，使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（不用原型）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function son(age) {
            father.call(this);
            this.age = age;
        };

        son.prototype = new father('jason');
        
        son.prototype.getAge = function () {
            return this.age;
        }

        let firstchild = new son('19');
        let secondchild = new son('20');
        firstchild.colors.push(&quot;black&quot;);
        
        console.log(firstchild.colors); // [&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;, &quot;black&quot;]
        console.log(secondchild.colors); // [&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">son</span>(<span class="hljs-params">age</span>) </span>{
            father.call(<span class="hljs-keyword">this</span>);
            <span class="hljs-keyword">this</span>.age = age;
        };

        son.prototype = <span class="hljs-keyword">new</span> father(<span class="hljs-string">'jason'</span>);
        
        son.prototype.getAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
        }

        <span class="hljs-keyword">let</span> firstchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'19'</span>);
        <span class="hljs-keyword">let</span> secondchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'20'</span>);
        firstchild.colors.push(<span class="hljs-string">"black"</span>);
        
        <span class="hljs-built_in">console</span>.log(firstchild.colors); <span class="hljs-comment">// ["blue", "red", "white", "black"]</span>
        <span class="hljs-built_in">console</span>.log(secondchild.colors); <span class="hljs-comment">// ["blue", "red", "white"]</span></code></pre>
<ul>
<li>可以传递参数</li>
<li>方法都在构造函数中定义，函数复用性丢失</li>
</ul>
<h4>总结</h4>
<p>优点：</p>
<ul>
<li>由例子可见，解决了1中子类实例共享父类引用属性的问题</li>
<li>创建子类实例时，可以向父类传递参数</li>
<li>可以实现多继承（call多个父类对象）</li>
</ul>
<p>缺点：</p>
<ul>
<li>实例并不是父类的实例，只是子类的实例</li>
<li>只能继承父类的实例属性和方法，不能继承原型属性/方法</li>
<li>无法实现函数复用，每个子类都有父类实例函数的副本，影响性能</li>
</ul>
<h3 id="articleHeader3">组合继承</h3>
<p>也就是将原型链继承和构造函数继承融合，原型链实现对原型属性和方法的继承，构造函数实现对实例属性的继承。<br>这样既保证了原型上函数的复用，也保证了每个实例有自己的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         function son(name, age) {
            father.call(this, name);
            this.age = age;
        };

        son.prototype = new father();
        
        son.prototype.getAge = function () {
            return this.age;
        }


        let firstchild = new son('jason', '19');
        let secondchild = new son('jason junior', '18');
        firstchild.colors.push(&quot;black&quot;);
        
        
        console.log(firstchild.colors); // [&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;, &quot;black&quot;]
        console.log(secondchild.colors); //[&quot;blue&quot;, &quot;red&quot;, &quot;white&quot;]
        console.log(firstchild.getName()); // jason
        console.log(secondchild.getName()); // jason junior
        console.log(firstchild.getAge()); //19
        console.log(secondchild.getAge()); //18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>         <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">son</span>(<span class="hljs-params">name, age</span>) </span>{
            father.call(<span class="hljs-keyword">this</span>, name);
            <span class="hljs-keyword">this</span>.age = age;
        };

        son.prototype = <span class="hljs-keyword">new</span> father();
        
        son.prototype.getAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
        }


        <span class="hljs-keyword">let</span> firstchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'jason'</span>, <span class="hljs-string">'19'</span>);
        <span class="hljs-keyword">let</span> secondchild = <span class="hljs-keyword">new</span> son(<span class="hljs-string">'jason junior'</span>, <span class="hljs-string">'18'</span>);
        firstchild.colors.push(<span class="hljs-string">"black"</span>);
        
        
        <span class="hljs-built_in">console</span>.log(firstchild.colors); <span class="hljs-comment">// ["blue", "red", "white", "black"]</span>
        <span class="hljs-built_in">console</span>.log(secondchild.colors); <span class="hljs-comment">//["blue", "red", "white"]</span>
        <span class="hljs-built_in">console</span>.log(firstchild.getName()); <span class="hljs-comment">// jason</span>
        <span class="hljs-built_in">console</span>.log(secondchild.getName()); <span class="hljs-comment">// jason junior</span>
        <span class="hljs-built_in">console</span>.log(firstchild.getAge()); <span class="hljs-comment">//19</span>
        <span class="hljs-built_in">console</span>.log(secondchild.getAge()); <span class="hljs-comment">//18</span></code></pre>
<p>特点：</p>
<ul>
<li>可以继承实例属性/方法，也可以继承原型属性/方法</li>
<li>既是子类的实例，也是父类的实例</li>
<li>不存在引用属性共享问题</li>
<li>可传参</li>
<li>函数可复用</li>
</ul>
<p>缺点：</p>
<ul><li>调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）</li></ul>
<h3 id="articleHeader4">原型式继承</h3>
<p>为父类实例添加新特性，作为子类实例返回</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        let p = {
            name: 'jason',
            colors: ['white', 'black', 'red']
        }
        function object (o) {
            function F() {};
            F.prototype = o;
            return new F();
        }

        let firstchild = object(p)
        let secondchild = object(p)

        firstchild.name = 'jason1'
        firstchild.colors.push('blue')

        secondchild.name = 'jason2'
        secondchild.colors.push('green')

        console.log(p.colors) //&nbsp;[&quot;white&quot;, &quot;black&quot;, &quot;red&quot;, &quot;blue&quot;, &quot;green&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-keyword">let</span> p = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'jason'</span>,
            <span class="hljs-attr">colors</span>: [<span class="hljs-string">'white'</span>, <span class="hljs-string">'black'</span>, <span class="hljs-string">'red'</span>]
        }
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span> (<span class="hljs-params">o</span>) </span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{};
            F.prototype = o;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
        }

        <span class="hljs-keyword">let</span> firstchild = object(p)
        <span class="hljs-keyword">let</span> secondchild = object(p)

        firstchild.name = <span class="hljs-string">'jason1'</span>
        firstchild.colors.push(<span class="hljs-string">'blue'</span>)

        secondchild.name = <span class="hljs-string">'jason2'</span>
        secondchild.colors.push(<span class="hljs-string">'green'</span>)

        <span class="hljs-built_in">console</span>.log(p.colors) <span class="hljs-comment">//&nbsp;["white", "black", "red", "blue", "green"]</span></code></pre>
<p>ECMAScript 5新增Object.create()方法规范原型式继承。两个参数，一个参数是新对象原型的对象，一个参数是对象定义额外属性的对象，第二个可忽略，就等于上述object函数了</p>
<h3 id="articleHeader5">寄生式继承</h3>
<p>创造一个用于封装继承过程的函数，该函数内部以某种方式增强对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function create(o) {
            let clone = object(o);
            o.sayHi = function () {
                console.log('Hi')
            }
            return o;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">o</span>) </span>{
            <span class="hljs-keyword">let</span> clone = object(o);
            o.sayHi = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hi'</span>)
            }
            <span class="hljs-keyword">return</span> o;
        }</code></pre>
<h3 id="articleHeader6">寄生组合继承</h3>
<p>组合继承虽然好用，但是也有缺陷，就是会调用两次构造函数，一次在创建时候，一次在内部，那个call方法。</p>
<p>所谓寄生组合继承，即通过借用构造函数方式，继承属性，通过原型链形式继承方法。</p>
<p>沿用寄生方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function inheritPrototype (sub, sup) {
            let prototype = object(sup.prototype);
            prototype.constructor = sub;
            sub.prototype = prototype;
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>        function inheritPrototype (<span class="hljs-function"><span class="hljs-keyword">sub</span>, <span class="hljs-title">sup</span>) </span>{
            let <span class="hljs-keyword">prototype</span> = object(sup.prototype);
            prototype.constructor = <span class="hljs-function"><span class="hljs-keyword">sub</span></span>;
            <span class="hljs-function"><span class="hljs-keyword">sub</span>.<span class="hljs-title">prototype</span> = <span class="hljs-title">prototype</span></span>;
        }
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        function father(name) {
            this.name = name;
            this.colors = ['blue', 'red', 'white'];
        }

        father.prototype.getName = function () {
            return this.name;
        }

        function son(name, age) {
            father.call(this, name);
            this.age = age;
        };

        function object (o) {
            function F() {};
            F.prototype = o;
            return new F();
        }

        function inheritPrototype (sub, super) {
            let prototype = object(super.prototype);
            prototype.constructor = sub;
            sub.prototype = prototype;
        }

        inheritPrototype(son, father);

        son.prototype.getAge = function () {
            return this.age;
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">father</span>(<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">this</span>.name = name;
            <span class="hljs-keyword">this</span>.colors = [<span class="hljs-string">'blue'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'white'</span>];
        }

        father.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">son</span>(<span class="hljs-params">name, age</span>) </span>{
            father.call(<span class="hljs-keyword">this</span>, name);
            <span class="hljs-keyword">this</span>.age = age;
        };

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">object</span> (<span class="hljs-params">o</span>) </span>{
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{};
            F.prototype = o;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span> (<span class="hljs-params">sub, super</span>) </span>{
            <span class="hljs-keyword">let</span> prototype = object(<span class="hljs-keyword">super</span>.prototype);
            prototype.constructor = sub;
            sub.prototype = prototype;
        }

        inheritPrototype(son, father);

        son.prototype.getAge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.age;
        }</code></pre>
<h4>总结</h4>
<p>优点：</p>
<ul><li>堪称完美</li></ul>
<p>缺点：</p>
<ul><li>实现较为复杂</li></ul>
<blockquote>参考 &lt;&lt;JavaScript高级程序设计&gt;&gt;总结</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础-Prototype原型继承

## 原文链接
[https://segmentfault.com/a/1190000014867165](https://segmentfault.com/a/1190000014867165)


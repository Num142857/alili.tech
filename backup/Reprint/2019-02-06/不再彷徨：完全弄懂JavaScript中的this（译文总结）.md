---
title: '不再彷徨：完全弄懂JavaScript中的this（译文总结）' 
date: 2019-02-06 2:30:09
hidden: true
slug: 8gsbz203ze3
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>其实this是一个老生常谈的问题了。关于this的文章非常多，其实我本以为自己早弄明白了它，不过昨天在做项目的过程中，还是出现了一丝疑惑，想到大概之前在JavaScript weekly里收藏待看的一篇详解this的文章（后有链接，也附上了稀土上的中文译文）和另一篇一位前辈推荐的文章，就把它们看了看，对this的认识确实提升了一些。</p></blockquote>
<p>JavaScript 中的’this‘是动态的，它在函数运行时被确定而非在函数声明时被确定。所有的函数都可以调用'this'，这无关于该函数是否属于某个对象。关于this，主要有以下四种情况。</p>
<h3 id="articleHeader0">1.被当做对象的方法被调用</h3>
<p>如果该函数是被当做某一个对象的方法，那么该函数的this指向该对象；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var john = {
      firstName: &quot;John&quot;
    }
    function func() {
      alert(this.firstName + &quot;: hi!&quot;)
    }
    john.sayHi = func
    john.sayHi()  // this = john" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> john = {
      <span class="hljs-attr">firstName</span>: <span class="hljs-string">"John"</span>
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
      alert(<span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">": hi!"</span>)
    }
    john.sayHi = func
    john.sayHi()  <span class="hljs-comment">// this = john</span></code></pre>
<p>这里有一点值得注意，当一个对象的方法被取出来赋值给一个变量时，该方法变为函数触发，this指向window或underfind（严格模式）。</p>
<h3 id="articleHeader1">2.函数之内调用</h3>
<p>当函数中有 <code>this</code>，其实就意味着它被当做方法调用，之间调用相当于把他当做window对象的方法，this指向window，值得注意的是ES5其实是规定这种情况<code>this=undefined</code>的，只浏览器大多还是按照老的方法执行(本人在最新版的Chrome，Safari，Firefox中测试都指向window（201607）),在火狐下使用严格模式指向undefined；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    func()
    function func() {
        alert(this) // [object Window] or [object global] or kind of..
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    func()
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// [object Window] or [object global] or kind of..</span>
    }</code></pre>
<p>为了传递<code>this</code>，()之前应该为引用类型，类似于<code>obj.a </code>或者 <code>obj['a']</code>,不能是别的了。</p>
<p>这里还存在一个小坑，当对象的方法中还存在函数时，该函数其实是当做函数模式触发，所以其<code>this</code>默认为window（严格模式下为undefined）解决办法是给该函数绑定this。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = {  
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       // this is window or undefined in strict mode
       console.log(this === numbers); // => false
       return this.numberA + this.numberB;
     }
     return calculate();
   }
};
numbers.sum(); // => NaN or throws TypeError in strict mode  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> numbers = {  
   <span class="hljs-attr">numberA</span>: <span class="hljs-number">5</span>,
   <span class="hljs-attr">numberB</span>: <span class="hljs-number">10</span>,
   <span class="hljs-attr">sum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; true</span>
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calculate</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-comment">// this is window or undefined in strict mode</span>
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; false</span>
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.numberA + <span class="hljs-keyword">this</span>.numberB;
     }
     <span class="hljs-keyword">return</span> calculate();
   }
};
numbers.sum(); <span class="hljs-comment">// =&gt; NaN or throws TypeError in strict mode  </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = {  
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       console.log(this === numbers); // => true
       return this.numberA + this.numberB;
     }
     // use .call() method to modify the context
     return calculate.call(this);
   }
};
numbers.sum(); // => 15  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> numbers = {  
   <span class="hljs-attr">numberA</span>: <span class="hljs-number">5</span>,
   <span class="hljs-attr">numberB</span>: <span class="hljs-number">10</span>,
   <span class="hljs-attr">sum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; true</span>
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calculate</span>(<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; true</span>
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.numberA + <span class="hljs-keyword">this</span>.numberB;
     }
     <span class="hljs-comment">// use .call() method to modify the context</span>
     <span class="hljs-keyword">return</span> calculate.call(<span class="hljs-keyword">this</span>);
   }
};
numbers.sum(); <span class="hljs-comment">// =&gt; 15  </span></code></pre>
<h3 id="articleHeader2">3.在<code>new</code>中调用</h3>
<p>一个引用对象的变量实际上保存了对该对象的引用，也就是说变量实际保存的是对真实数据的一个指针。<br>使用new关键字时<code>this</code>的改变其实有以下几步：</p>
<ul>
<li><p>创建 <code>this = {}</code>.</p></li>
<li><p>new执行的过程中可能改变<code>this</code>，然后添加属性和方法；</p></li>
<li><p>返回被改变的<code>this</code>.</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Animal(name) {
        this.name = name
        this.canWalk = true
    }
    var animal = new Animal(&quot;beastie&quot;)
    alert(animal.name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">name</span>) </span>{
        <span class="hljs-keyword">this</span>.name = name
        <span class="hljs-keyword">this</span>.canWalk = <span class="hljs-literal">true</span>
    }
    <span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">"beastie"</span>)
    alert(animal.name)</code></pre>
<p>需要注意的是如果构造函数返回一个对象，那么this指向返回的那个对象；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Animal() {
        this.name = 'Mousie';
        this.age = '18';
        return {
            name: 'Godzilla'
        } // <-- will be returned
    }

    var animal = new Animal()
    console.log(animal.name) // Godzilla
    console.log(animal.age)//undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Mousie'</span>;
        <span class="hljs-keyword">this</span>.age = <span class="hljs-string">'18'</span>;
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'Godzilla'</span>
        } <span class="hljs-comment">// &lt;-- will be returned</span>
    }

    <span class="hljs-keyword">var</span> animal = <span class="hljs-keyword">new</span> Animal()
    <span class="hljs-built_in">console</span>.log(animal.name) <span class="hljs-comment">// Godzilla</span>
    <span class="hljs-built_in">console</span>.log(animal.age)<span class="hljs-comment">//undefined</span></code></pre>
<p>这里需要注意的是不要忘记使用new，否则不会创建一个新的函数。而是只是执行了函数，相当于函数调用，this其实指向window</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vehicle(type, wheelsCount) {  
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}
// Function invocation
var car = Vehicle('Car', 4);  
car.type;       // => 'Car'  
car.wheelsCount // => 4  
car === window  // => true " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vehicle</span>(<span class="hljs-params">type, wheelsCount</span>) </span>{  
  <span class="hljs-keyword">this</span>.type = type;
  <span class="hljs-keyword">this</span>.wheelsCount = wheelsCount;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
<span class="hljs-comment">// Function invocation</span>
<span class="hljs-keyword">var</span> car = Vehicle(<span class="hljs-string">'Car'</span>, <span class="hljs-number">4</span>);  
car.type;       <span class="hljs-comment">// =&gt; 'Car'  </span>
car.wheelsCount <span class="hljs-comment">// =&gt; 4  </span>
car === <span class="hljs-built_in">window</span>  <span class="hljs-comment">// =&gt; true </span></code></pre>
<h3 id="articleHeader3">4.明确调用<code>this</code>，使用<code>call</code>和<code>apply</code>
</h3>
<p>这是最具JavaScript特色的地方。<br>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  func.call(obj, arg1, arg2,...)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-function"><span class="hljs-keyword">func</span>.<span class="hljs-title">call</span><span class="hljs-params">(obj, arg1, arg2,...)</span></span></code></pre>
<p>第一个参数将作为<code>this</code>的指代对象，之后的参数将被作为函数的参数，解决方法是使用bind。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Animal(type, legs) {  
  this.type = type;
  this.legs = legs;  
  this.logInfo = function() {
    console.log(this === myCat); // => true
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
  };
}
var myCat = new Animal('Cat', 4);  
// logs &quot;The Cat has 4 legs&quot;
setTimeout(myCat.logInfo.bind(myCat), 1000); 
// setTimeout??" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span>(<span class="hljs-params">type, legs</span>) </span>{  
  <span class="hljs-keyword">this</span>.type = type;
  <span class="hljs-keyword">this</span>.legs = legs;  
  <span class="hljs-keyword">this</span>.logInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === myCat); <span class="hljs-comment">// =&gt; true</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The '</span> + <span class="hljs-keyword">this</span>.type + <span class="hljs-string">' has '</span> + <span class="hljs-keyword">this</span>.legs + <span class="hljs-string">' legs'</span>);
  };
}
<span class="hljs-keyword">var</span> myCat = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Cat'</span>, <span class="hljs-number">4</span>);  
<span class="hljs-comment">// logs "The Cat has 4 legs"</span>
setTimeout(myCat.logInfo.bind(myCat), <span class="hljs-number">1000</span>); 
<span class="hljs-comment">// setTimeout??</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var john = {
    firstName: &quot;John&quot;,
    surname: &quot;Smith&quot;
  }
  function func(a, b) {
    alert( this[a] + ' ' + this[b] )
  }
  func.call(john, 'firstName', 'surname')  // &quot;John Smith&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> john = {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">"John"</span>,
    <span class="hljs-attr">surname</span>: <span class="hljs-string">"Smith"</span>
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params">a, b</span>) </span>{
    alert( <span class="hljs-keyword">this</span>[a] + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>[b] )
  }
  func.call(john, <span class="hljs-string">'firstName'</span>, <span class="hljs-string">'surname'</span>)  <span class="hljs-comment">// "John Smith"</span>
</code></pre>
<p>至于apply，其只是以数组的方传入参数，其它部分是一样的，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  func.call(john, 'firstName', 'surname')
  func.apply(john, ['firstName', 'surname'])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  func.call(john, <span class="hljs-string">'firstName'</span>, <span class="hljs-string">'surname'</span>)
  func.apply(john, [<span class="hljs-string">'firstName'</span>, <span class="hljs-string">'surname'</span>])</code></pre>
<p>它们也可用于在 ES5 中的类继承中，调用父级构造器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Runner(name) {  
      console.log(this instanceof Rabbit); // => true
      this.name = name;  
    }
    function Rabbit(name, countLegs) {  
      console.log(this instanceof Rabbit); // => true
      // 间接调用，调用了父级构造器
      Runner.call(this, name);
      this.countLegs = countLegs;
    }
    var myRabbit = new Rabbit('White Rabbit', 4);  
    myRabbit; // { name: 'White Rabbit', countLegs: 4 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Runner</span>(<span class="hljs-params">name</span>) </span>{  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Rabbit); <span class="hljs-comment">// =&gt; true</span>
      <span class="hljs-keyword">this</span>.name = name;  
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Rabbit</span>(<span class="hljs-params">name, countLegs</span>) </span>{  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Rabbit); <span class="hljs-comment">// =&gt; true</span>
      <span class="hljs-comment">// 间接调用，调用了父级构造器</span>
      Runner.call(<span class="hljs-keyword">this</span>, name);
      <span class="hljs-keyword">this</span>.countLegs = countLegs;
    }
    <span class="hljs-keyword">var</span> myRabbit = <span class="hljs-keyword">new</span> Rabbit(<span class="hljs-string">'White Rabbit'</span>, <span class="hljs-number">4</span>);  
    myRabbit; <span class="hljs-comment">// { name: 'White Rabbit', countLegs: 4 }</span></code></pre>
<h3 id="articleHeader4">5.<code>.bind()</code>
</h3>
<p>对比方法 .apply() 和 .call()，它俩都立即执行了函数，而 .bind() 函数返回了一个新方法，绑定了预先指定好的 this ，并可以延后调用。<br>.bind() 方法的作用是创建一个新的函数，执行时的上下文环境为 .bind() 传递的第一个参数，它允许创建预先设置好 this 的函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = {  
  array: [3, 5, 10],
  getNumbers: function() {
    return this.array;    
  }
};
// Create a bound function
var boundGetNumbers = numbers.getNumbers.bind(numbers);  
boundGetNumbers(); // => [3, 5, 10]  
// Extract method from object
var simpleGetNumbers = numbers.getNumbers;  
simpleGetNumbers(); // => undefined or throws an error in strict mode  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> numbers = {  
  <span class="hljs-attr">array</span>: [<span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>],
  <span class="hljs-attr">getNumbers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.array;    
  }
};
<span class="hljs-comment">// Create a bound function</span>
<span class="hljs-keyword">var</span> boundGetNumbers = numbers.getNumbers.bind(numbers);  
boundGetNumbers(); <span class="hljs-comment">// =&gt; [3, 5, 10]  </span>
<span class="hljs-comment">// Extract method from object</span>
<span class="hljs-keyword">var</span> simpleGetNumbers = numbers.getNumbers;  
simpleGetNumbers(); <span class="hljs-comment">// =&gt; undefined or throws an error in strict mode  </span></code></pre>
<p>使用<code>.bind()</code>时应该注意，.bind() 创建了一个永恒的上下文链并不可修改。一个绑定函数即使使用 .call() 或者 .apply()传入其他不同的上下文环境，也不会更改它之前连接的上下文环境，重新绑定也不会起任何作用。<br>只有在构造器调用时，绑定函数可以改变上下文，然而这并不是特别推荐的做法。</p>
<h3 id="articleHeader5">6.箭头函数</h3>
<p>箭头函数并不创建它自身执行的上下文，使得 this 取决于它在定义时的外部函数。<br>箭头函数一次绑定上下文后便不可更改，即使使用了上下文更改的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var numbers = [1, 2];  
    (function() {  
      var get = () => {
        console.log(this === numbers); // => true
        return this;
      };
      console.log(this === numbers); // => true
      get(); // => [1, 2]
      // 箭头函数使用 .apply() 和 .call()
      get.call([0]);  // => [1, 2]
      get.apply([0]); // => [1, 2]
      // Bind
      get.bind([0])(); // => [1, 2]
    }).call(numbers);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];  
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
      <span class="hljs-keyword">var</span> get = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; true</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
      };
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === numbers); <span class="hljs-comment">// =&gt; true</span>
      get(); <span class="hljs-comment">// =&gt; [1, 2]</span>
      <span class="hljs-comment">// 箭头函数使用 .apply() 和 .call()</span>
      get.call([<span class="hljs-number">0</span>]);  <span class="hljs-comment">// =&gt; [1, 2]</span>
      get.apply([<span class="hljs-number">0</span>]); <span class="hljs-comment">// =&gt; [1, 2]</span>
      <span class="hljs-comment">// Bind</span>
      get.bind([<span class="hljs-number">0</span>])(); <span class="hljs-comment">// =&gt; [1, 2]</span>
    }).call(numbers);</code></pre>
<p>这是因为箭头函数拥有静态的上下文环境，不会因为不同的调用而改变。因此不要使用箭头函数定义方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Period (hours, minutes) {  
      this.hours = hours;
      this.minutes = minutes;
    }
    Period.prototype.format = () => {  
      console.log(this === window); // => true
      return this.hours + ' hours and ' + this.minutes + ' minutes';
    };
    var walkPeriod = new Period(2, 30);  
    walkPeriod.format(); // => 'undefined hours and undefined minutes' " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Period</span> (<span class="hljs-params">hours, minutes</span>) </span>{  
      <span class="hljs-keyword">this</span>.hours = hours;
      <span class="hljs-keyword">this</span>.minutes = minutes;
    }
    Period.prototype.format = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {  
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span> === <span class="hljs-built_in">window</span>); <span class="hljs-comment">// =&gt; true</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.hours + <span class="hljs-string">' hours and '</span> + <span class="hljs-keyword">this</span>.minutes + <span class="hljs-string">' minutes'</span>;
    };
    <span class="hljs-keyword">var</span> walkPeriod = <span class="hljs-keyword">new</span> Period(<span class="hljs-number">2</span>, <span class="hljs-number">30</span>);  
    walkPeriod.format(); <span class="hljs-comment">// =&gt; 'undefined hours and undefined minutes' </span></code></pre>
<h3 id="articleHeader6">参考</h3>
<ul>
<li><p><a href="http://javascript.info/tutorial/this" rel="nofollow noreferrer" target="_blank">Four scents of "this"</a></p></li>
<li><p><a href="https://rainsoft.io/gentle-explanation-of-this-in-javascript/?utm_source=javascriptweekly&amp;utm_medium=email" rel="nofollow noreferrer" target="_blank">Gentle explanation of 'this' keyword in JavaScript</a></p></li>
<li><p><a href="https://gold.xitu.io/entry/576d640d2e958a005724e07f" rel="nofollow noreferrer" target="_blank">JavaScript This 之谜(译文)</a></p></li>
</ul>
<p>强烈推荐觉得没弄明白的同学看看上面三篇文章，其中第三篇是第二篇的译文。如果大家对this还有疑问，也欢迎大家一起讨论，交流促进思考，共同进步。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不再彷徨：完全弄懂JavaScript中的this（译文总结）

## 原文链接
[https://segmentfault.com/a/1190000006076637](https://segmentfault.com/a/1190000006076637)


---
title: '[译] 你应了解的4种JS设计模式' 
date: 2019-02-02 2:30:10
hidden: true
slug: ic0ez5uyk2
categories: [reprint]
---

{{< raw >}}

                    
<ul><li><p>2016-10-07</p></li></ul>
<p>每个JS开发者都力求写出可维护、复用性和可读性高的代码。随着应用不断扩大，代码组织的合理性也越来越重要。设计模式为特定环境下的常见问题提供了一个组织结构，对于克服这些挑战起到至关重要的作用。</p>
<p>JavaScript 网页开发者在创建应用时，频繁地跟设计模式打交道（甚至在不知情的情况下）。</p>
<p>尽管特定环境下有各种各样的设计模式，JS 开发者还是倾向于使用一些习惯性的模式。</p>
<p>在这篇文章中，我将讨论这些常见的设计模式，展出优化代码库的方法，并深入解读JavaScript的内部构件。</p>
<p>本文讨论的设计模式包括这几种:</p>
<ul>
<li><p>模块设计模式</p></li>
<li><p>原型模式</p></li>
<li><p>观察者模式</p></li>
<li><p>单例模式</p></li>
</ul>
<p>尽管每种模式都包含很多属性，这里我强调以下几点：</p>
<ol>
<li><p><strong>上下文</strong>: 设计模式的使用场景</p></li>
<li><p><strong>问题</strong>: 我们尝试解决的问题是什么?</p></li>
<li><p><strong>解决方法</strong>: 使用设计模式如何解决我们提出的问题?</p></li>
<li><p><strong>实施</strong>: 实施方案看起来怎样?</p></li>
</ol>
<h2 id="articleHeader0">模块设计模式</h2>
<p>JS模块化是使用最普遍的设计模式，用于保持特殊的代码块与其它组件之间互相独立。为支持结构良好的代码提供了松耦合。</p>
<p>对于熟悉面向对象的开发者来说，模块就是JS的 “类”。封装是“类”的众多优点之一，可以确保它本身的状态和行为不被其它的类访问到。模块设计模式有公有和私有两种访问级别（除此之外，还有比较少为人知的保护级别、特权级别）。</p>
<p>考虑到私有的作用域，模块应该是一个立即调用函数（IIFE) ，也就是说，它是一个保护其私有变量和方法的闭包。（然而，它返回的却不是一个函数，而是一个对象）。<br>它的写法就是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (function() {

    // declare private variables and/or functions

    return {
      // declare public variables and/or functions
    }

})(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code> (function() {

    // declare<span class="hljs-keyword"> private</span> variables<span class="hljs-built_in"> and/or </span>functions

   <span class="hljs-built_in"> return </span>{
      // declare<span class="hljs-keyword"> public</span> variables<span class="hljs-built_in"> and/or </span>functions
    }

})(); </code></pre>
<p>我们在返回一个对象之前，先初始化一下私有的变量和方法。由于作用域不同，闭包外面的代码是无法访问到闭包内的私有变量的。一起来看下更具体的实现方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var HTMLChanger = (function() {
  var contents = 'contents'

  var changeHTML = function() {
    var element = document.getElementById('attribute-to-change');
    element.innerHTML = contents;
  }

  return {
    callChangeHTML: function() {
      changeHTML();
      console.log(contents);
    }
  };

})();

HTMLChanger.callChangeHTML();       // Outputs: 'contents'
console.log(HTMLChanger.contents);  // undefined " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> HTMLChanger = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> contents = <span class="hljs-string">'contents'</span>

  <span class="hljs-keyword">var</span> changeHTML = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'attribute-to-change'</span>);
    element.innerHTML = contents;
  }

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">callChangeHTML</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      changeHTML();
      <span class="hljs-built_in">console</span>.log(contents);
    }
  };

})();

HTMLChanger.callChangeHTML();       <span class="hljs-comment">// Outputs: 'contents'</span>
<span class="hljs-built_in">console</span>.log(HTMLChanger.contents);  <span class="hljs-comment">// undefined </span></code></pre>
<p>请注意 <code>callChangeHTML</code> 是在返回的对象中绑定的，因此可以访问到 <code>HTMLChanger</code> 这个命名空间内的变量。然而，在模块外面，是不能访问到闭包里面的 <code>contents</code> 的。</p>
<h3 id="articleHeader1">揭示性模块模式</h3>
<p>模块模式的另一种变体称为 <strong>揭示性模块模式</strong>，它主要是为了在保持封装性的同时，揭示在对象字面量中返回的特定的变量和方法。直接的实现方式类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Exposer = (function() {
  var privateVariable = 10;

  var privateMethod = function() {
    console.log('Inside a private method!');
    privateVariable++;
  }

  var methodToExpose = function() {
    console.log('This is a method I want to expose!');
  }

  var otherMethodIWantToExpose = function() {
    privateMethod();
  }

  return {
      first: methodToExpose,
      second: otherMethodIWantToExpose
  };
})();

Exposer.first();        // Output: This is a method I want to expose!
Exposer.second();       // Output: Inside a private method!
Exposer.methodToExpose; // undefined " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> Exposer = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> privateVariable = <span class="hljs-number">10</span>;

  <span class="hljs-keyword">var</span> privateMethod = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Inside a private method!'</span>);
    privateVariable++;
  }

  <span class="hljs-keyword">var</span> methodToExpose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'This is a method I want to expose!'</span>);
  }

  <span class="hljs-keyword">var</span> otherMethodIWantToExpose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    privateMethod();
  }

  <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">first</span>: methodToExpose,
      <span class="hljs-attr">second</span>: otherMethodIWantToExpose
  };
})();

Exposer.first();        <span class="hljs-comment">// Output: This is a method I want to expose!</span>
Exposer.second();       <span class="hljs-comment">// Output: Inside a private method!</span>
Exposer.methodToExpose; <span class="hljs-comment">// undefined </span></code></pre>
<p>尽管这样看起来更加简洁，但它是有明显不足的 -- 不能引用私有变量。这会给单元测试带来一定的挑战。类似地，公有行为也是不可重写的。</p>
<h2 id="articleHeader2">原型设计模式</h2>
<p>JS开发者要么把 <code>原型</code> 和 <code>原型继承</code> 相互混淆，要么在他们的代码里面直接使用原型。原型设计模式依赖于<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" rel="nofollow noreferrer" target="_blank">JavaScript原型继承</a>. 原型模式主要用于为高性能环境创建对象。</p>
<p>被创建的对象是从传下来的原对象克隆（浅克隆）出来的。原型模式的一种使用场景，是执行一个扩展性的数据库操作来创建一个对象，把该对象用于应用的其他层面。如果其他流程需要用到这个对象，我们不需要大量地操作数据库，只要克隆一下之前创建的对象就可以了。与其实质性地操作数据库，不如从之前创建的对象克隆一个更具优势。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007237289" src="https://static.alili.tech/img/remote/1460000007237289" alt="原型设计模式" title="原型设计模式" style="cursor: pointer;"></span></p>
<p><a href="https://upload.wikimedia.org/wikipedia/commons/1/14/Prototype_UML.svg" rel="nofollow noreferrer" target="_blank"><em>Wikipedia</em> 原型设计模式图解</a></p>
<p>UML 描述了原型交互是如何被用于克隆具体的代码实施方案的。</p>
<p>要克隆一个对象，必须存在一个构造器来实例化第一个对象。接下来，通过使用 <strong>prototype</strong> 的变量和方法来绑定对象的结构。一起来看下基本的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype.go = function() {
  // Rotate wheels
}

TeslaModelS.prototype.stop = function() {
  // Apply brake pads
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">var</span> TeslaModelS = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.numWheels    = <span class="hljs-number">4</span>;
  <span class="hljs-keyword">this</span>.manufacturer = <span class="hljs-string">'Tesla'</span>;
  <span class="hljs-keyword">this</span>.make         = <span class="hljs-string">'Model S'</span>;
}

TeslaModelS.prototype.go = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// Rotate wheels</span>
}

TeslaModelS.prototype.stop = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">// Apply brake pads</span>
} </code></pre>
<p>构造器 <code>TeslaModelS </code> 允许创建一个简单的 TeslaModelS 对象。对于一个新创建的 TeslaModelS 对象，它将保持构造器初始化的状态。此外，它也很简单的持有 <strong>go</strong> 和 <strong>stop</strong> 这两个方法，因为这两个方法是在 <strong>prototype</strong> 声明的。在原型上拓展方法，还可以这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype = {
  go: function() {
    // Rotate wheels
  },
  stop: function() {
    // Apply brake pads
  }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">var</span> TeslaModelS = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.numWheels    = <span class="hljs-number">4</span>;
  <span class="hljs-keyword">this</span>.manufacturer = <span class="hljs-string">'Tesla'</span>;
  <span class="hljs-keyword">this</span>.make         = <span class="hljs-string">'Model S'</span>;
}

TeslaModelS.prototype = {
  go: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Rotate wheels</span>
  },
  stop: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Apply brake pads</span>
  }
} </code></pre>
<h3 id="articleHeader3">揭示性原型模式</h3>
<p>类似于模块模式，原型模式也有一个 <code>揭示性模式</code>。<code>揭示性原型模式</code> 通过返回一个对象字面量，对公有和私有的成员进行封装。</p>
<p>由于我们返回的是一个对象，我们将在原型对象上添加 <code>function</code> 的前缀。通过对以上例子进行改写，我们可以选择在当前的 <code>prototype</code> 暴露哪些方法或变量，以此来保护它们的访问层级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var TeslaModelS = function() {
  this.numWheels    = 4;
  this.manufacturer = 'Tesla';
  this.make         = 'Model S';
}

TeslaModelS.prototype = function() {

  var go = function() {
    // Rotate wheels
  };

  var stop = function() {
    // Apply brake pads
  };

  return {
    pressBrakePedal: stop,
    pressGasPedal: go
  }

}(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">var</span> TeslaModelS = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.numWheels    = <span class="hljs-number">4</span>;
  <span class="hljs-keyword">this</span>.manufacturer = <span class="hljs-string">'Tesla'</span>;
  <span class="hljs-keyword">this</span>.make         = <span class="hljs-string">'Model S'</span>;
}

TeslaModelS.prototype = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{

  <span class="hljs-keyword">var</span> go = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Rotate wheels</span>
  };

  <span class="hljs-keyword">var</span> stop = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Apply brake pads</span>
  };

  <span class="hljs-keyword">return</span> {
    pressBrakePedal: stop,
    pressGasPedal: go
  }

}(); </code></pre>
<p>请注意 <code>stop</code> 和 <code>go</code> 两个方法是被隔开的，因为他们在所返回的对象作用域之外。由于 JavaScript 本身支持原型继承，也就没必要重写基本的功能了。</p>
<h2 id="articleHeader4">观察者设计模式</h2>
<p>很多时候，当应用的一部分改变了，另一部分也需要相应更新。在 AngularJs 里面，如果 <code>$scope</code> 被更新，就会触发一个事件去通知其他组件。结合观察这模式就是：如果一个对象改变了，它只要派发 <strong>broadcasts</strong> 事件通知依赖的对象它已经改变了则可。</p>
<p>又一个典型的例子就是 <code>model-view-controller (MVC)</code> 架构了；当 <code>model</code> 改变时， 更新相应的 <code>view</code>。这样做有一个好处，就是从 <code>model</code> 上解耦出 <code>view</code> 来减少依赖。</p>
<p>![观察这设计模式](&lt;html&gt;<br>&lt;head&gt;&lt;title&gt;502 Bad Gateway&lt;/title&gt;&lt;/head&gt;<br>&lt;body bgcolor="white"&gt;<br>&lt;center&gt;&lt;h1&gt;502 Bad Gateway&lt;/h1&gt;&lt;/center&gt;<br></p>
<hr>&lt;center&gt;nginx/1.9.15&lt;/center&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;<br>)<p><a href="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1000px-Observer.svg.png" rel="nofollow noreferrer" target="_blank">Wikipedia 观察者设计模式</a></p>
<p>如 UML 图表所示，<code>subject</code>、<code>observer</code>, and <code>concrete objects</code> 是必不可少的。 <code>subject</code> 包含对每个具体观察者的引用，以便传递改动信息。观察者本身是一个抽象的类，使得具体的观察者可以执行通讯方法。</p>
<p>一起来看下 AngularJS 的示例，在事件管理上应用了观察这模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // Controller 1
$scope.$on('nameChanged', function(event, args) {
    $scope.name = args.name;
});

...

// Controller 2
$scope.userNameChanged = function(name) {
    $scope.$emit('nameChanged', {name: name});
}; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code> <span class="hljs-comment">// Controller 1</span>
$scope.$on(<span class="hljs-string">'nameChanged'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event, args)</span> </span>{
    $scope.name = args.name;
});

...

<span class="hljs-comment">// Controller 2</span>
$scope.userNameChanged = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(name)</span> </span>{
    $scope.$emit(<span class="hljs-string">'nameChanged'</span>, {name: name});
}; </code></pre>
<p>使用观察者模式，重要的一点就是要区分独立的对象或者 <strong>subject(主体)</strong>。</p>
<p>在看到观察者模式众多优点的同时，我们必须注意到它的一个缺点：随着观察者数量的增加，应用的性能会大大降低。大家都比较熟悉的观察者就是 <strong>watchers</strong> 。 在AngularJS中，我们可以 <strong>watch</strong> 变量、方法和对象。<strong>$digest</strong> 循环更新，当一个作用域内对象被修改时，它就把新的值告诉每个监听者。</p>
<p>我们可以在JS中创建自己的主体和观察者。一起来看下下面的代码是如何运行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Subject = function() {
  this.observers = [];

  return {
    subscribeObserver: function(observer) {
      this.observers.push(observer);
    },
    unsubscribeObserver: function(observer) {
      var index = this.observers.indexOf(observer);
      if(index > -1) {
        this.observers.splice(index, 1);
      }
    },
    notifyObserver: function(observer) {
      var index = this.observers.indexOf(observer);
      if(index > -1) {
        this.observers[index].notify(index);
      }
    },
    notifyAllObservers: function() {
      for(var i = 0; i < this.observers.length; i++){
        this.observers[i].notify(i);
      };
    }
  };
};

var Observer = function() {
  return {
    notify: function(index) {
      console.log(&quot;Observer &quot; + index + &quot; is notified!&quot;);
    }
  }
}

var subject = new Subject();

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
var observer4 = new Observer();

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);

subject.notifyObserver(observer2); // Observer 2 is notified!

subject.notifyAllObservers();
// Observer 1 is notified!
// Observer 2 is notified!
// Observer 3 is notified!
// Observer 4 is notified! " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> Subject = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.observers = [];

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">subscribeObserver</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">observer</span>) </span>{
      <span class="hljs-keyword">this</span>.observers.push(observer);
    },
    <span class="hljs-attr">unsubscribeObserver</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">observer</span>) </span>{
      <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.observers.indexOf(observer);
      <span class="hljs-keyword">if</span>(index &gt; <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">this</span>.observers.splice(index, <span class="hljs-number">1</span>);
      }
    },
    <span class="hljs-attr">notifyObserver</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">observer</span>) </span>{
      <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.observers.indexOf(observer);
      <span class="hljs-keyword">if</span>(index &gt; <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">this</span>.observers[index].notify(index);
      }
    },
    <span class="hljs-attr">notifyAllObservers</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.observers.length; i++){
        <span class="hljs-keyword">this</span>.observers[i].notify(i);
      };
    }
  };
};

<span class="hljs-keyword">var</span> Observer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">notify</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Observer "</span> + index + <span class="hljs-string">" is notified!"</span>);
    }
  }
}

<span class="hljs-keyword">var</span> subject = <span class="hljs-keyword">new</span> Subject();

<span class="hljs-keyword">var</span> observer1 = <span class="hljs-keyword">new</span> Observer();
<span class="hljs-keyword">var</span> observer2 = <span class="hljs-keyword">new</span> Observer();
<span class="hljs-keyword">var</span> observer3 = <span class="hljs-keyword">new</span> Observer();
<span class="hljs-keyword">var</span> observer4 = <span class="hljs-keyword">new</span> Observer();

subject.subscribeObserver(observer1);
subject.subscribeObserver(observer2);
subject.subscribeObserver(observer3);
subject.subscribeObserver(observer4);

subject.notifyObserver(observer2); <span class="hljs-comment">// Observer 2 is notified!</span>

subject.notifyAllObservers();
<span class="hljs-comment">// Observer 1 is notified!</span>
<span class="hljs-comment">// Observer 2 is notified!</span>
<span class="hljs-comment">// Observer 3 is notified!</span>
<span class="hljs-comment">// Observer 4 is notified! </span></code></pre>
<h3 id="articleHeader5">发布、订阅模式</h3>
<p>然而，发布、订阅模式是采用一个话题来绑定发布者和订阅者之间的关系，订阅者接收事件通知，发布者派发事件。该事件系统支持定义特殊应用的事件，可以传递包含订阅者本身需要的自定义参数。这样做主要是为了避免订阅者和发布者之间的依赖。</p>
<p>这里有别于观察者模式的是，任何订阅者都可以通过恰当的事件处理器来注册并接受发布者广播的通知。</p>
<p>很多开发者选择把 <code>发布订阅模式</code> 和 <code>观察者模式</code> 结合起来用，尽管他们最终的目标只有一个。发布订阅模式中的订阅者是通过一些通讯媒介被告知的，而观察者则是通过执行事件处理器来获得消息通知。</p>
<p>在 AngularJs， 订阅者使用 <code>$on(event、cbk)</code> 来订阅一个事件，发布者则使用<code>$emit(‘event’, args)</code> 或者 <code>$broadcast(‘event’, args)</code> 来发布一个事件。</p>
<h2 id="articleHeader6">单例模式</h2>
<p>单例模式只允许实例化一个对象，但是相同的对象，会用很多个实例。单例模式制约着客户端创建多个对象。第一个对象创建后，就返回实例本身。</p>
<p>单例模式比较少用，很难找到实际开发的例子。使用一个办公室打印机的例子吧。假设办公室有10个人，他们都用到打印机，10台电脑共享一部打印机（一个实例）。通过分享一部打印机，他们共享相同的资源。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var printer = (function () {

  var printerInstance;

  function create () {

    function print() {
      // underlying printer mechanics
    }

    function turnOn() {
      // warm up
      // check for paper
    }

    return {
      // public + private states and behaviors
      print: print,
      turnOn: turnOn
    };
  }

  return {
    getInstance: function() {
      if(!printerInstance) {
        printerInstance = create();
      }
      return printerInstance;
    }
  };

  function Singleton () {
    if(!printerInstance) {
      printerInstance = intialize();
    }
  };

})(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code> <span class="hljs-keyword">var</span> printer = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{

  <span class="hljs-keyword">var</span> printerInstance;

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span> <span class="hljs-params">()</span> </span>{

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">print</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// underlying printer mechanics</span>
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">turnOn</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// warm up</span>
      <span class="hljs-comment">// check for paper</span>
    }

    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// public + private states and behaviors</span>
      <span class="hljs-keyword">print</span>: <span class="hljs-keyword">print</span>,
      turnOn: turnOn
    };
  }

  <span class="hljs-keyword">return</span> {
    getInstance: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">if</span>(!printerInstance) {
        printerInstance = create();
      }
      <span class="hljs-keyword">return</span> printerInstance;
    }
  };

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Singleton</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span>(!printerInstance) {
      printerInstance = intialize();
    }
  };

})(); </code></pre>
<p><code>create</code> 这个方法是私有的，因为我们不希望它被外部人员访问到，然而，<code>getInstance</code> 方法是公有的。每个办公人员都可以实例化一个 <code>printer</code>，只需要这样调用一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" `var officePrinter = printer.getInstance();` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"> `var officePrinter = printer.getInstance();` </code></pre>
<p>单例模式在 AngularJS 相当流行，最常见的是作为 <code>services</code>、<code>factories</code>、和 <code>providers</code>。它们维护状态，提供资源访问，创建两个实例摆脱一个共享的<code>service/factory/provider</code>。</p>
<p>在多线程的应用中，当多个线程尝试去访问同个资源时，就会出现 <code>竞争状态</code>。单例模式会受到竞争状态的干扰，比如在没有初始化实例的情况下，两个线程会创建两个对象，而不是返回一个实例。这与单例模式的目的是相悖的。因此，开发者在多线程应用里面使用单例模式时，必须清楚同步性。</p>
<h2 id="articleHeader7">总结</h2>
<p>设计模式经常用于比较大型的应用，想知道哪种模式更具优势，来实践吧。</p>
<p>在构建任何应用之前，都应该全面地考虑每个角色，以及它们之间存在的关系。在回顾 <code>模块模式</code>、<code>原型模式</code>、<code>观察者模式</code> 和 <code>单例模式</code> 之后，你应该能够区分它们，并且在实际开发中使用它们了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 你应了解的4种JS设计模式

## 原文链接
[https://segmentfault.com/a/1190000007231454](https://segmentfault.com/a/1190000007231454)


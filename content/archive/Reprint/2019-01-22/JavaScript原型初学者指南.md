---
title: 'JavaScript原型初学者指南' 
date: 2019-01-22 2:30:08
hidden: true
slug: 4m5m9tc9mq6
categories: [reprint]
---

{{< raw >}}

            <p>如果不好好的学习对象，你就无法在JavaScript中获得很大的成就。它们几乎是JavaScript编程语言的每个方面的基础。在这篇文章中，您将了解用于实例化新对象的各种模式，并且这样做，您将逐渐深入了解JavaScript的原型。</p>
<h3>视频Video</h3>
<p><a href="https://www.youtube.com/watch?v=XskMWBXNbp0">https://www.youtube.com/watch?v=XskMWBXNbp0</a></p>
<h3>前言</h3>
<p>如果不好好的学习对象，你就无法在JavaScript中获得很大的成就。它们几乎是JavaScript编程语言的每个方面的基础。在这篇文章中，您将了解用于实例化新对象的各种模式，并且这样做，您将逐渐深入了解JavaScript的原型。</p>
<p>对象是键/值对。创建对象的最常用方法是使用花括号{}，并使用点表示法向对象添加属性和方法。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">let</span> animal = {}
animal.name = <span class="hljs-string">'Leo'</span>
animal.energy = <span class="hljs-number">10</span>

animal.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

animal.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

animal.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

</code></pre><p>如上代码，在我们的应用程序中，我们需要创建多个动物。当然，下一步是将逻辑封装在我们可以在需要创建新动物时调用的函数内部。我们将这种模式称为Functional Instantiation，我们将函数本身称为“构造函数”，因为它负责“构造”一个​​新对象。</p>
<h4>功能实例化</h4>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">let</span> animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
    <span class="hljs-keyword">this</span>.energy += amount
  }

  animal.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
    <span class="hljs-keyword">this</span>.energy += length
  }

  animal.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
    <span class="hljs-keyword">this</span>.energy -= length
  }

  <span class="hljs-keyword">return</span> animal
}

<span class="hljs-keyword">const</span> leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

</code></pre><p>“我认为这是一门高级JavaScript课程......？”</p>
<p>现在，每当我们想要创造一种新动物（或者更广泛地说是一种新的“实例”）时，我们所要做的就是调用我们的动物功能，将动物的名字和能量水平传递给它。这非常有效，而且非常简单。但是，你能发现这种模式的弱点吗？最大的和我们试图解决的问题与三种方法有关 - 吃饭，睡觉和玩耍。这些方法中的每一种都不仅是动态的，而且它们也是完全通用的。这意味着没有理由重新创建这些方法，正如我们在创建新动物时所做的那样。你能想到一个解决方案吗？如果不是每次创建新动物时重新创建这些方法，我们将它们移动到自己的对象然后我们可以让每个动物引用该对象，该怎么办？我们可以将这种模式称为功能实例化与共享方法🤷♂️。</p>
<h4>使用共享方法的功能实例化</h4>
<pre><code class="hljs stylus">const animalMethods = {
  eat(amount) {
    console.log(${this.name} is eating.)
    this<span class="hljs-selector-class">.energy</span> += amount
  },
  sleep(length) {
    console.log(${this.name} is sleeping.)
    this<span class="hljs-selector-class">.energy</span> += length
  },
  play(length) {
    console.log(${this.name} is playing.)
    this<span class="hljs-selector-class">.energy</span> -= length
  }
}

function Animal (name, energy) {
  let animal = {}
  animal<span class="hljs-selector-class">.name</span> = name
  animal<span class="hljs-selector-class">.energy</span> = energy
  animal<span class="hljs-selector-class">.eat</span> = animalMethods<span class="hljs-selector-class">.eat</span>
  animal<span class="hljs-selector-class">.sleep</span> = animalMethods<span class="hljs-selector-class">.sleep</span>
  animal<span class="hljs-selector-class">.play</span> = animalMethods<span class="hljs-selector-class">.play</span>

  return animal
}

const leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
const snoop = Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

</code></pre><p>通过将共享方法移动到它们自己的对象并在Animal函数中引用该对象，我们现在已经解决了内存浪费和过大的动物对象的问题。</p>
<h4>Object.create</h4>
<p>让我们再次使用Object.create改进我们的例子。简单地说， <strong>Object.create允许您创建一个对象</strong>。换句话说，Object.create允许您创建一个对象，只要该对象上的属性查找失败，它就可以查询另一个对象以查看该另一个对象是否具有该属性。我们来看一些代码。</p>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> <span class="hljs-built_in">parent</span> = {
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'Stacey'</span>,
  <span class="hljs-attribute">age</span>: <span class="hljs-number">35</span>,
  <span class="hljs-attribute">heritage</span>: <span class="hljs-string">'Irish'</span>
}

<span class="hljs-keyword">const</span> child = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">parent</span>)
child.name = <span class="hljs-string">'Ryan'</span>
child.age = <span class="hljs-number">7</span>

<span class="hljs-built_in">console</span>.log(child.name) <span class="hljs-comment">// Ryan</span>
<span class="hljs-built_in">console</span>.log(child.age) <span class="hljs-comment">// 7</span>
<span class="hljs-built_in">console</span>.log(child.heritage) <span class="hljs-comment">// Irish</span>

</code></pre><p>因此在上面的示例中，因为child是使用Object.create（parent）创建的，所以每当在子级上查找失败的属性时，JavaScript都会将该查找委托给父对象。这意味着即使孩子没有遗产，父母也会在你记录孩子时这样做。这样你就会得到父母的遗产（属性值的传递）。</p>
<p>现在在我们的工具棚中使用Object.create，我们如何使用它来简化之前的Animal代码？好吧，我们可以使用Object.create委托给animalMethods对象，而不是像我们现在一样逐个将所有共享方法添加到动物中。听起来很聪明，让我们将这个称为功能实例化与共享方法用Object.create🙃实现吧。</p>
<h4>使用共享方法和Object.create进行功能实例化</h4>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> animalMethods = {
  eat(amount) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
    <span class="hljs-keyword">this</span>.energy += amount
  },
  sleep(length) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
    <span class="hljs-keyword">this</span>.energy += length
  },
  play(length) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
    <span class="hljs-keyword">this</span>.energy -= length
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">let</span> animal = <span class="hljs-built_in">Object</span>.create(animalMethods)
  animal.name = name
  animal.energy = energy

  <span class="hljs-keyword">return</span> animal
}

<span class="hljs-keyword">const</span> leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

leo.eat(<span class="hljs-number">10</span>)
snoop.play(<span class="hljs-number">5</span>)

</code></pre><p>📈所以现在当我们调用leo.eat时，JavaScript会在leo对象上查找eat方法。那个查找将失败，因为Object.create，它将委托给animalMethods对象。</p>
<p>到现在为止还挺好。尽管如此，我们仍然可以做出一些改进。为了跨实例共享方法，必须管理一个单独的对象（animalMethods）似乎有点“hacky”。这似乎是您希望在语言本身中实现的常见功能。这就是你在这里的全部原因 - prototype。</p>
<p>那么究竟什么是JavaScript的原型？好吧，简单地说，JavaScript中的每个函数都有一个引用对象的prototype属性。对吗？亲自测试一下。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doThing</span> (<span class="hljs-params"></span>) </span>{}
<span class="hljs-built_in">console</span>.log(doThing.prototype) <span class="hljs-comment">// {}</span>

</code></pre><p>如果不是创建一个单独的对象来管理我们的方法（比如我们正在使用animalMethods），我们只是将每个方法放在Animal函数的原型上，该怎么办？然后我们所要做的就是不使用Object.create委托给animalMethods，我们可以用它来委托Animal.prototype。我们将这种模式称为Prototypal Instantiation(原型实例化)。</p>
<h4>原型实例化</h4>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">let</span> animal = <span class="hljs-built_in">Object</span>.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  <span class="hljs-keyword">return</span> animal
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

<span class="hljs-keyword">const</span> leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

leo.eat(<span class="hljs-number">10</span>)
snoop.play(<span class="hljs-number">5</span>)

</code></pre><p>👏👏👏 同样，原型只是JavaScript中每个函数都具有的属性，并且如上所述，它允许我们在函数的所有实例之间共享方法。我们所有的功能仍然相同，但现在我们不必为所有方法管理一个单独的对象，我们可以使用另一个内置于Animal函数本身的对象Animal.prototype。</p>
<hr>
<h1>让我们更深入的了解一下。</h1>
<p>在这一点上，我们知道三件事：</p>
<ol>
<li><p>如何创建构造函数。</p>
</li>
<li><p>如何将方法添加到构造函数的原型中。</p>
</li>
<li><p>如何使用Object.create将失败的查找委托给函数的原型。</p>
</li>
</ol>
<p>这三个任务似乎是任何编程语言的基础。JavaScript是否真的那么糟糕，没有更简单“内置”的方式来完成同样的事情？然而并不是的，它是通过使用new关键字来完成的。</p>
<p>我们采取的缓慢，有条理的方法有什么好处，你现在可以深入了解JavaScript中新关键字的内容。</p>
<p>回顾一下我们的Animal构造函数，最重要的两个部分是创建对象并返回它。如果不使用Object.create创建对象，我们将无法在失败的查找上委托函数的原型。如果没有return语句，我们将永远不会返回创建的对象。</p>
<pre><code class="hljs fortran"><span class="hljs-function"><span class="hljs-keyword">function</span></span> Animal (<span class="hljs-keyword">name</span>, energy) {
  let animal = Object.create(Animal.prototype)
  animal.<span class="hljs-keyword">name</span> = <span class="hljs-keyword">name</span>
  animal.energy = energy

  <span class="hljs-keyword">return</span> animal
}

</code></pre><p>这是关于new的一个很酷的事情 - 当你使用new关键字调用一个函数时，这两行是隐式完成的（JavaScript引擎），并且创建的对象称为this。</p>
<p>使用注释来显示在幕后发生的事情并假设使用new关键字调用Animal构造函数，为此可以将其重写。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-comment">// const this = Object.create(Animal.prototype)</span>

  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy

  <span class="hljs-comment">// return this</span>
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

</code></pre><p>来看看如何编写：</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(amount)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

</code></pre><p>这个工作的原因以及为我们创建这个对象的原因是因为我们使用new关键字调用了构造函数。如果在调用函数时不使用new，则此对象永远不会被创建，也不会被隐式返回。我们可以在下面的示例中看到这个问题。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

<span class="hljs-keyword">const</span> leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-built_in">console</span>.log(leo) <span class="hljs-comment">// undefined</span>


</code></pre><p>此模式的名称是Pseudoclassical Instantiation（原型实例化）。</p>
<p>如果JavaScript不是您的第一种编程语言，您可能会有点不安。</p>
<blockquote>
<p>“WTF这个家伙只是重新创造了一个更糟糕的版本”</p>
</blockquote>
<p>对于那些不熟悉的人，Class允许您为对象创建蓝图。然后，无论何时创建该类的实例，都会获得一个具有蓝图中定义的属性和方法的对象。</p>
<p>听起来有点熟？这基本上就是我们对上面的Animal构造函数所做的。但是，我们只使用常规的旧JavaScript函数来重新创建相同的功能，而不是使用class关键字。当然，它需要一些额外的工作以及一些关于JavaScript引擎运行的知识，但结果是一样的。</p>
<p>这是个好消息。JavaScript不是一种死语言。它正在不断得到改进，并由<a href="https://tylermcginnis.com/videos/ecmascript/">TC-39委员会</a>添加。事实上，2015年，发布了EcmaScript（官方JavaScript规范）6(ES6)，支持Classes和class关键字。让我们看看上面的Animal构造函数如何使用新的类语法。</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, energy) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.energy = energy
  }
  eat(amount) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> eating.)
    <span class="hljs-keyword">this</span>.energy += amount
  }
  sleep(length) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> sleeping.)
    <span class="hljs-keyword">this</span>.energy += length
  }
  play(length) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> playing.)
    <span class="hljs-keyword">this</span>.energy -= length
  }
}

const leo = new Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
const snoop = new Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

</code></pre><p>很干净吧？</p>
<p>因此，如果这是创建类的新方法，为什么我们花了这么多时间来翻过旧的方式呢？原因是因为新的方式（使用class关键字）主要只是我们称之为伪古典模式的现有方式的“语法糖”。为了<em>更好的</em>理解ES6类的便捷语法，首先必须理解伪古典模式。</p>
<hr>
<p>在这一点上，我们已经介绍了JavaScript原型的基础知识。本文的其余部分将致力于理解与其相关的其他“知识渊博”主题。在另一篇文章中，我们将看看如何利用这些基础知识并使用它们来理解继承在JavaScript中的工作原理。</p>
<hr>
<h3>数组方法</h3>
<p>我们在上面深入讨论了如果要在类的实例之间共享方法，您应该将这些方法放在类（或函数）原型上。如果我们查看Array类，我们可以看到相同的模式。从历史上看，您可能已经创建了这样的数组</p>
<pre><code class="hljs accesslog">const friends = <span class="hljs-string">[]</span>

</code></pre><p>事实证明，创建一个新的Array类其实也是一个语法糖。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> friendsWithSugar = []

<span class="hljs-keyword">const</span> friendsWithoutSugar = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>()

</code></pre><p>您可能从未想过的一件事是数组的每个实例中的内置方法是从何而来的(splice, slice, pop, etc)?</p>
<p>正如您现在所知，这是因为这些方法存在于Array.prototype上，当您创建新的Array实例时，您使用new关键字将该委托设置为Array.prototype。</p>
<p>我们可以通过简单地记录Array.prototype来查看所有数组的方法。</p>
<pre><code class="hljs excel">console.log(Array.prototype)

/*
  conc<span class="hljs-symbol">at:</span> ƒ<span class="hljs-built_in">n</span> <span class="hljs-built_in">concat</span>()
  construct<span class="hljs-symbol">or:</span> ƒ<span class="hljs-built_in">n</span> Array()
  copyWith<span class="hljs-symbol">in:</span> ƒ<span class="hljs-built_in">n</span> copyWithin()
  entri<span class="hljs-symbol">es:</span> ƒ<span class="hljs-built_in">n</span> entries()
  eve<span class="hljs-symbol">ry:</span> ƒ<span class="hljs-built_in">n</span> every()
  fi<span class="hljs-symbol">ll:</span> ƒ<span class="hljs-built_in">n</span> fill()
  filt<span class="hljs-symbol">er:</span> ƒ<span class="hljs-built_in">n</span> filter()
  fi<span class="hljs-symbol">nd:</span> ƒ<span class="hljs-built_in">n</span> <span class="hljs-built_in">find</span>()
  findInd<span class="hljs-symbol">ex:</span> ƒ<span class="hljs-built_in">n</span> findIndex()
  forEa<span class="hljs-symbol">ch:</span> ƒ<span class="hljs-built_in">n</span> forEach()
  includ<span class="hljs-symbol">es:</span> ƒ<span class="hljs-built_in">n</span> includes()
  <span class="hljs-built_in">index</span><span class="hljs-symbol">Of:</span> ƒ<span class="hljs-built_in">n</span> indexOf()
  jo<span class="hljs-symbol">in:</span> ƒ<span class="hljs-built_in">n</span> join()
  ke<span class="hljs-symbol">ys:</span> ƒ<span class="hljs-built_in">n</span> keys()
  lastIndex<span class="hljs-symbol">Of:</span> ƒ<span class="hljs-built_in">n</span> lastIndexOf()
  leng<span class="hljs-symbol">th:</span> <span class="hljs-number">0</span><span class="hljs-built_in">n</span>
  m<span class="hljs-symbol">ap:</span> ƒ<span class="hljs-built_in">n</span> map()
  p<span class="hljs-symbol">op:</span> ƒ<span class="hljs-built_in">n</span> pop()
  pu<span class="hljs-symbol">sh:</span> ƒ<span class="hljs-built_in">n</span> push()
  redu<span class="hljs-symbol">ce:</span> ƒ<span class="hljs-built_in">n</span> reduce()
  reduceRig<span class="hljs-symbol">ht:</span> ƒ<span class="hljs-built_in">n</span> reduceRight()
  rever<span class="hljs-symbol">se:</span> ƒ<span class="hljs-built_in">n</span> reverse()
  shi<span class="hljs-symbol">ft:</span> ƒ<span class="hljs-built_in">n</span> shift()
  sli<span class="hljs-symbol">ce:</span> ƒ<span class="hljs-built_in">n</span> slice()
  so<span class="hljs-symbol">me:</span> ƒ<span class="hljs-built_in">n</span> some()
  so<span class="hljs-symbol">rt:</span> ƒ<span class="hljs-built_in">n</span> sort()
  spli<span class="hljs-symbol">ce:</span> ƒ<span class="hljs-built_in">n</span> splice()
  toLocaleStri<span class="hljs-symbol">ng:</span> ƒ<span class="hljs-built_in">n</span> toLocaleString()
  toStri<span class="hljs-symbol">ng:</span> ƒ<span class="hljs-built_in">n</span> toString()
  unshi<span class="hljs-symbol">ft:</span> ƒ<span class="hljs-built_in">n</span> unshift()
  valu<span class="hljs-symbol">es:</span> ƒ<span class="hljs-built_in">n</span> values()
*/

</code></pre><p>对象也存在完全相同的逻辑。所有对象将在失败的查找中委托给Object.prototype，这就是所有对象都有toString和hasOwnProperty等方法的原因。</p>
<h3>静态方法</h3>
<p>到目前为止，我们已经介绍了为什么以及如何在类的实例之间共享方法。但是，如果我们有一个对Class很重要但不需要跨实例共享的方法呢？例如，如果我们有一个函数接受一个Animal实例数组并确定下一个需要接收哪一个呢？我们将其称为nextToEat。</p>
<pre><code class="hljs stylus">function nextToEat (animals) {
  const sortedByLeastEnergy = animals.sort((<span class="hljs-selector-tag">a</span>,b) =&gt; {
    return <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.energy</span> - <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.energy</span>
  })

  return sortedByLeastEnergy[<span class="hljs-number">0</span>]<span class="hljs-selector-class">.name</span>
}

</code></pre><p>因为我们不希望在所有实例之间共享它，所以在Animal.prototype上使用nextToEat是没有意义的。相反，我们可以将其视为辅助方法。所以如果nextToEat不应该存在于Animal.prototype中，我们应该把它放在哪里？那么显而易见的答案是我们可以将nextToEat放在与Animal类相同的范围内，然后像我们通常那样在需要时引用它。</p>
<pre><code class="hljs javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, energy) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.energy = energy
  }
  eat(amount) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
    <span class="hljs-keyword">this</span>.energy += amount
  }
  sleep(length) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
    <span class="hljs-keyword">this</span>.energy += length
  }
  play(length) {
    <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
    <span class="hljs-keyword">this</span>.energy -= length
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nextToEat</span> (<span class="hljs-params">animals</span>) </span>{
  <span class="hljs-keyword">const</span> sortedByLeastEnergy = animals.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> a.energy - b.energy
  })

  <span class="hljs-keyword">return</span> sortedByLeastEnergy[<span class="hljs-number">0</span>].name
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

<span class="hljs-built_in">console</span>.log(nextToEat([leo, snoop])) <span class="hljs-comment">// Leo</span>

</code></pre><p>现在这可行，但有更好的方法。</p>
<blockquote>
<p>只要有一个特定于类本身的方法，但不需要在该类的实例之间共享，就可以将其添加为类的静态属性。</p>
</blockquote>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Animal</span> </span>{
  <span class="hljs-keyword">constructor</span>(name, energy) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.energy = energy
  }
  eat(amount) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> eating.)
    <span class="hljs-keyword">this</span>.energy += amount
  }
  sleep(length) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> sleeping.)
    <span class="hljs-keyword">this</span>.energy += length
  }
  play(length) {
    console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> playing.)
    <span class="hljs-keyword">this</span>.energy -= length
  }
  static nextToEat(animals) {
    const sortedByLeastEnergy = animals.sort((a,b) =&gt; {
      <span class="hljs-keyword">return</span> a.energy - b.energy
    })

    <span class="hljs-keyword">return</span> sortedByLeastEnergy[<span class="hljs-number">0</span>].name
  }
}

</code></pre><p>现在，因为我们在类上添加了nextToEat作为静态属性（static），所以它存在于Animal类本身（而不是它的原型）上，并且可以使用Animal.nextToEat进行访问。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

<span class="hljs-built_in">console</span>.log(Animal.nextToEat([leo, snoop])) <span class="hljs-comment">// Leo</span>


</code></pre><p>因为我们在这篇文章中都遵循了类似的模式，让我们来看看如何使用ES5完成同样的事情。在上面的例子中，我们看到了如何使用static关键字将方法直接放在类本身上。使用ES5，同样的模式就像手动将方法添加到函数对象一样简单。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

Animal.nextToEat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nextToEat</span>) </span>{
  <span class="hljs-keyword">const</span> sortedByLeastEnergy = animals.sort(<span class="hljs-function">(<span class="hljs-params">a,b</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> a.energy - b.energy
  })

  <span class="hljs-keyword">return</span> sortedByLeastEnergy[<span class="hljs-number">0</span>].name
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> snoop = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Snoop'</span>, <span class="hljs-number">10</span>)

<span class="hljs-built_in">console</span>.log(Animal.nextToEat([leo, snoop])) <span class="hljs-comment">// Leo</span>

</code></pre><h3>获取对象的原型</h3>
<p>无论您使用哪种模式创建对象，都可以使用Object.getPrototypeOf方法完成获取该对象的原型。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-keyword">const</span> prototype = <span class="hljs-built_in">Object</span>.getPrototypeOf(leo)

<span class="hljs-built_in">console</span>.log(prototype)
<span class="hljs-comment">// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}</span>

prototype === Animal.prototype <span class="hljs-comment">// true</span>


</code></pre><p>上面的代码有两个重要的要点。</p>
<p>首先，你会注意到proto是一个有4种方法，构造函数，吃饭，睡眠和游戏的对象。那讲得通。我们在实例中使用了getPrototypeOf传递，leo获取了实例的原型，这是我们所有方法都存在的地方。这告诉我们关于原型的另外一件事我们还没有谈过。默认情况下，原型对象将具有构造函数属性，该属性指向原始函数或创建实例的类。这也意味着因为JavaScript默认在原型上放置构造函数属性，所以任何实例都可以通过instance.constructor访问它们的构造函数。</p>
<p>上面的第二个重要内容是Object.getPrototypeOf（leo）=== Animal.prototype。这也是有道理的。Animal构造函数有一个prototype属性，我们可以在所有实例之间共享方法，getPrototypeOf允许我们查看实例本身的原型。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)
<span class="hljs-built_in">console</span>.log(leo.constructor) <span class="hljs-comment">// Logs the constructor function</span>

</code></pre><p>为了配合我们之前使用Object.create所讨论的内容，其工作原因是因为任何Animal实例都会在失败的查找中委托给Animal.prototype。因此，当您尝试访问leo.prototype时，leo没有prototype属性，因此它会将该查找委托给Animal.prototype，它确实具有构造函数属性。如果这段没有理解到，请回过头来阅读上面的Object.create。</p>
<blockquote>
<p>您可能已经看过 _ _ proto _ __之前用于获取实例的原型的方法，这已经是过去式来，如上所述使用 <strong>Object.getPrototypeOf（instance）</strong>。</p>
</blockquote>
<h3>确定属性是否存在于原型上</h3>
<p>在某些情况下，您需要知道属性是否存在于实例本身上，还是存在于对象委托的原型上。我们可以通过循环我们创建的leo对象来看到这一点。让我们说目标是循环leo并记录它的所有键和值。使用for循环，可能看起来像这样。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">length</span>) </span>{
  <span class="hljs-built_in">console</span>.log(${<span class="hljs-keyword">this</span>.name} is playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> leo) {
  <span class="hljs-built_in">console</span>.log(Key: ${key}. Value: ${leo[key]})
}

</code></pre><p>最有可能的是，它是这样的</p>
<pre><code class="hljs groovy"><span class="hljs-string">Key:</span> name. <span class="hljs-string">Value:</span> Leo
<span class="hljs-string">Key:</span> energy. <span class="hljs-string">Value:</span> <span class="hljs-number">7</span>

</code></pre><p>但是，如果你运行代码，你看到的是这个</p>
<pre><code class="hljs actionscript">Key: name. Value: Leo
Key: energy. Value: <span class="hljs-number">7</span>
Key: eat. Value: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(amount)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}
Key: sleep. Value: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}
Key: play. Value: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

</code></pre><p>这是为什么？for循环将循环遍历对象本身以及它所委托的原型的所有<strong>可枚举属性</strong>。因为默认情况下，您添加到函数原型的任何属性都是可枚举的，我们不仅会看到名称和能量，还会看到原型上的所有方法 - 吃，睡，玩。要解决这个问题，我们需要指定所有原型方法都是不可枚举的<strong>或者</strong>我们需要一种类似console.log的方法，如果属性是leo对象本身而不是leo委托给的原型在失败的查找。这是hasOwnProperty可以帮助我们的地方。</p>
<p>hasOwnProperty是每个对象上的一个属性，它返回一个布尔值，指示对象是否具有指定的属性作为其自己的属性，而不是对象委托给的原型。这正是我们所需要的。现在有了这些新知识，我们可以修改我们的代码，以便利用in循环中的hasOwnProperty。</p>
<pre><code class="hljs gauss">...

const leo = <span class="hljs-keyword">new</span> Animal('Leo', <span class="hljs-number">7</span>)

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> <span class="hljs-built_in">key</span> in leo) {
  <span class="hljs-keyword">if</span> (leo.hasOwnProperty(<span class="hljs-built_in">key</span>)) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Key</span>: ${<span class="hljs-built_in">key</span>}. Value: ${leo[<span class="hljs-built_in">key</span>]})
  }
}

</code></pre><p>而现在我们看到的只是leo对象本身的属性，而不是leo委托的原型。</p>
<pre><code class="hljs groovy"><span class="hljs-string">Key:</span> name. <span class="hljs-string">Value:</span> Leo
<span class="hljs-string">Key:</span> energy. <span class="hljs-string">Value:</span> <span class="hljs-number">7</span>

</code></pre><p>如果你仍然对hasOwnProperty感到困惑，这里有一些代码可能会清除它。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

Animal.prototype.eat = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(amount)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> eating.)
  <span class="hljs-keyword">this</span>.energy += amount
}

Animal.prototype.sleep = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> sleeping.)
  <span class="hljs-keyword">this</span>.energy += length
}

Animal.prototype.play = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(length)</span> </span>{
  console.log(${<span class="hljs-keyword">this</span>.name} <span class="hljs-keyword">is</span> playing.)
  <span class="hljs-keyword">this</span>.energy -= length
}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)

leo.hasOwnProperty(<span class="hljs-string">'name'</span>) <span class="hljs-comment">// true</span>
leo.hasOwnProperty(<span class="hljs-string">'energy'</span>) <span class="hljs-comment">// true</span>
leo.hasOwnProperty(<span class="hljs-string">'eat'</span>) <span class="hljs-comment">// false</span>
leo.hasOwnProperty(<span class="hljs-string">'sleep'</span>) <span class="hljs-comment">// false</span>
leo.hasOwnProperty(<span class="hljs-string">'play'</span>) <span class="hljs-comment">// false</span>

</code></pre><h3>检查对象是否是类的实例</h3>
<p>有时您想知道对象是否是特定类的实例。为此，您可以使用instanceof运算符。用例非常简单，但如果您以前从未见过它，实际的语法有点奇怪。它的工作原理如下</p>
<pre><code class="hljs delphi"><span class="hljs-keyword">object</span> instanceof <span class="hljs-keyword">Class</span>

</code></pre><p>如果object是Class的实例，则上面的语句将返回true，否则返回false。回到我们的动物示例，我们会有类似的东西。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span> <span class="hljs-params">()</span> </span>{}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)

leo <span class="hljs-keyword">instanceof</span> Animal <span class="hljs-comment">// true</span>
leo <span class="hljs-keyword">instanceof</span> User <span class="hljs-comment">// false</span>

</code></pre><p>instanceof的工作方式是检查对象原型链中是否存在constructor.prototype。在上面的例子中，leo instanceof Animal是true，因为Object.getPrototypeOf（leo）=== Animal.prototype。另外，leo instanceof User是false，因为Object.getPrototypeOf（leo）！== User.prototype。</p>
<h3>创建新的不可知构造函数</h3>
<p>你能发现下面代码中的错误吗？</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

<span class="hljs-keyword">const</span> leo = Animal(<span class="hljs-string">'Leo'</span>, <span class="hljs-number">7</span>)

</code></pre><p>即使是经验丰富的JavaScript开发人员有时也会因为上面的例子而被绊倒。因为我们正在使用之前学过的伪经典模式，所以当调用Animal构造函数时，我们需要确保使用new关键字调用它。如果我们不这样做，则不会创建this关键字，也不会隐式返回它。</p>
<p>作为复习，以下代码中，注释中的部分是在函数上使用new关键字时会发生的事情。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-comment">// const this = Object.create(Animal.prototype)</span>

  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy

  <span class="hljs-comment">// return this</span>
}

</code></pre><p>这似乎是一个非常重要的细节，让其他开发人员记住。假设我们正在与其他开发人员合作，有没有办法确保我们的Animal构造函数始终使用new关键字调用？事实证明，它是通过使用我们之前学到的instanceof运算符来实现的。</p>
<p>如果使用new关键字调用构造函数，那么构造函数体的内部将是构造函数本身的实例。这是一些代码。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> (<span class="hljs-params">name, energy</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Animal === <span class="hljs-literal">false</span>) {
    <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'Forgot to call Animal with the new keyword'</span>)
  }

  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

</code></pre><p>现在不是仅仅向函数的使用者记录警告，如果我们重新调用该函数，但这次如果不使用new关键字怎么办？</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animal</span> <span class="hljs-params">(name, energy)</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Animal === <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Animal(name, energy)
  }

  <span class="hljs-keyword">this</span>.name = name
  <span class="hljs-keyword">this</span>.energy = energy
}

</code></pre><p>现在无论是否使用new关键字调用Animal，它仍然可以正常工作。</p>
<h3>重新创建Object.create</h3>
<p>在这篇文章中，我们非常依赖于Object.create来创建委托给构造函数原型的对象。此时，您应该知道如何在代码中使用Object.create，但您可能没有想到的一件事是Object.create实际上是如何工作的。为了让你真正了解Object.create是如何工作的，我们将自己重新创建它。首先，我们对Object.create的工作原理了解多少？</p>
<ol>
<li><p>它接受一个对象的参数。</p>
</li>
<li><p>它创建一个对象，该对象在失败的查找中委托给参数对象。</p>
</li>
<li><p>它返回新创建的对象。</p>
</li>
</ol>
<p>让我们从＃1开始吧。</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">objToDelegateTo</span>) </span>{

}

</code></pre><p>很简单。</p>
<p>现在＃2 - 我们需要创建一个对象，该对象将在失败的查找中委托给参数对象。这个有点棘手。为此，我们将使用我们对新关键字和原型如何在JavaScript中工作的知识。首先，在Object.create实现的主体内部，我们将创建一个空函数。然后，我们将该空函数的原型设置为等于参数对象。然后，为了创建一个新对象，我们将使用new关键字调用我们的空函数。如果我们返回新创建的对象，那么它也将完成＃3。</p>
<pre><code class="hljs javascript"><span class="hljs-built_in">Object</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">objToDelegateTo</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{}
  Fn.prototype = objToDelegateTo
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Fn()
}

</code></pre><p>让我们来看看吧。</p>
<p>当我们在上面的代码中创建一个新函数Fn时，它带有一个prototype属性。当我们使用new关键字调用它时，我们知道我们将得到的是一个对象，该对象将在失败的查找中委托给函数的原型。如果我们覆盖函数的原型，那么我们可以决定在失败的查找中委托哪个对象。所以在我们上面的例子中，我们用调用Object.create时传入的对象覆盖Fn的原型，我们称之为objToDelegateTo。</p>
<blockquote>
<p>请注意，我们只支持Object.create的单个参数。官方实现还支持第二个可选参数，该参数允许您向创建的对象添加更多属性。</p>
</blockquote>
<h3>箭头函数</h3>
<p>箭头函数没有自己的this关键字。因此，箭头函数不能是构造函数，如果您尝试使用new关键字调用箭头函数，它将抛出错误。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> Animal = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}

<span class="hljs-keyword">const</span> leo = <span class="hljs-keyword">new</span> Animal() <span class="hljs-comment">// Error: Animal is not a constructor</span>

</code></pre><p>另外，为了证明箭头函数不能是构造函数，如下，我们看到箭头函数也没有原型属性。</p>
<pre><code class="hljs coffeescript">const Animal = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
<span class="hljs-built_in">console</span>.log(Animal.prototype) <span class="hljs-regexp">//</span> <span class="hljs-literal">undefined</span>

</code></pre>
          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript原型初学者指南

## 原文链接
[https://www.zcfy.cc/article/a-beginner-s-guide-to-javascript-s-prototype](https://www.zcfy.cc/article/a-beginner-s-guide-to-javascript-s-prototype)


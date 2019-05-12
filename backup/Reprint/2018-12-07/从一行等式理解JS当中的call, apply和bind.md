---
title: '从一行等式理解JS当中的call, apply和bind' 
date: 2018-12-07 2:30:10
hidden: true
slug: qpgs5dzs7n
categories: [reprint]
---

{{< raw >}}

                    
<p>关于JS当中的call，apply和bind，相信大家和我一样，已经看过了无数篇相关的文章，都有自己的理解。所以这篇文章并非什么科普类的文章，仅仅是把我自己的理解记录下来。</p>
<p>我的学习习惯，是喜欢把各种看似孤立的知识点串联起来，综合理解并运用，通过最简单最直观的思路把它理解透。所以，这篇文章将通过一段非常简洁的等式，把JS当中一个相对较难的知识点，call，apply和bind给串联起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat.call(dog, a, b) = cat.apply(dog, [a, b]) = (cat.bind(dog, a, b))() = dog.cat(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">cat.call(dog, a, b) = cat.apply(dog, [a, b]) = (cat.bind(dog, a, b))() = dog.cat(a, b)</code></pre>
<p>要理解JS当中的这三个关键字，首先得弄清楚它们是用来干嘛的。复杂些来说，可以引用MDN文档的原文：</p>
<blockquote>可以让call()中的对象调用当前对象所拥有的function。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。</blockquote>
<p>简单些来说，可以引用大家都看过的一句话：</p>
<blockquote>为了动态改变某个函数运行时的上下文（context）。</blockquote>
<p>又或者是</p>
<blockquote>为了改变函数体内部this的指向</blockquote>
<p>上面这些解释都很正确，说得一点问题都没有，但是里面却又引入了<code>继承</code>，<code>上下文</code>，<code>this</code>这些额外的知识点。如果我只想用最直观的办法去理解这三个关键字的作用，也许可以这么去理解：</p>
<p>定义一个猫对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Cat {
  constructor (name) {
    this.name = name
  }

  catchMouse(name1, name2) {
    console.log(`${this.name} caught 2 mouse! They call ${name1} and ${name2}.`)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
  <span class="hljs-keyword">constructor</span> (name) {
    <span class="hljs-keyword">this</span>.name = name
  }

  catchMouse(name1, name2) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> caught 2 mouse! They call <span class="hljs-subst">${name1}</span> and <span class="hljs-subst">${name2}</span>.`</span>)
  }
}</code></pre>
<p>这个猫对象拥有一个抓老鼠的技能<code>catchMouse()</code>。</p>
<p>然后类似的，定义一个狗对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
  constructor (name) {
    this.name = name
  }

  biteCriminals(name1, name2) {
    console.log(`${this.name} bite 2 criminals! Their name is ${name1} and ${name2}.`)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
  <span class="hljs-keyword">constructor</span> (name) {
    <span class="hljs-keyword">this</span>.name = name
  }

  biteCriminals(name1, name2) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> bite 2 criminals! Their name is <span class="hljs-subst">${name1}</span> and <span class="hljs-subst">${name2}</span>.`</span>)
  }
}</code></pre>
<p>这个狗对象能够咬坏人<code>biteCriminal()</code>。</p>
<p>接下来，我们实例化两个对象，分别得到一只叫“Kitty”的猫和叫“Doggy”的狗：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const kitty = new Cat('Kitty')
const doggy = new Dog('Doggy')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> kitty = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">'Kitty'</span>)
<span class="hljs-keyword">const</span> doggy = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'Doggy'</span>)</code></pre>
<p>首先让它们彼此发挥自己的技能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="kitty.catchMouse('Mickey', 'Minnie')
// Kitty caught mouse! They call Mickey and Minnie.

doggy.biteCriminal('Tom', 'Jerry')
// Doggy bite a criminal! Their name is Tom and Jerry." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">kitty</span><span class="hljs-selector-class">.catchMouse</span>(<span class="hljs-string">'Mickey'</span>, <span class="hljs-string">'Minnie'</span>)
<span class="hljs-comment">// Kitty caught mouse! They call Mickey and Minnie.</span>

<span class="hljs-selector-tag">doggy</span><span class="hljs-selector-class">.biteCriminal</span>(<span class="hljs-string">'Tom'</span>, <span class="hljs-string">'Jerry'</span>)
<span class="hljs-comment">// Doggy bite a criminal! Their name is Tom and Jerry.</span></code></pre>
<p>现在，我们希望赋予Doggy抓老鼠的能力，如果不使用这三个关键字，应该怎么做呢？</p>
<p>方案A：修改Dog对象，直接为其定义一个和Cat相同的抓老鼠技能。</p>
<p>方案B：让Doggy吃掉Kitty，直接消化吸收Kitty的所有能力。</p>
<p>其实方案A和方案B的解决办法是类似的，也是需要修改Dog对象，不过方案B会更简单粗暴一点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog {
  constructor (name, kitty) {
    this.name = name
    this.catchMouse = kitty.catchMouse
  }

  biteCriminals(name1, name2) {
    console.log(`${this.name} bite 2 criminals! Their name is ${name1} and ${name2}.`)
  }
}

const kitty = new Cat('Kitty')
const doggy = new Dog('Doggy', kitty)

doggy.catchMouse('Mickey', 'Minnie')
// Doggy caught 2 mouse! They call Mickey and Minnie." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> </span>{
  <span class="hljs-keyword">constructor</span> (name, kitty) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.catchMouse = kitty.catchMouse
  }

  biteCriminals(name1, name2) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.name}</span> bite 2 criminals! Their name is <span class="hljs-subst">${name1}</span> and <span class="hljs-subst">${name2}</span>.`</span>)
  }
}

<span class="hljs-keyword">const</span> kitty = <span class="hljs-keyword">new</span> Cat(<span class="hljs-string">'Kitty'</span>)
<span class="hljs-keyword">const</span> doggy = <span class="hljs-keyword">new</span> Dog(<span class="hljs-string">'Doggy'</span>, kitty)

doggy.catchMouse(<span class="hljs-string">'Mickey'</span>, <span class="hljs-string">'Minnie'</span>)
<span class="hljs-comment">// Doggy caught 2 mouse! They call Mickey and Minnie.</span></code></pre>
<p>上面这种方法实在是太不优雅，往往很多时候在定义Dog对像的时候根本就没有打算过要为它添加抓老鼠的方法。那么有没有一种办法能够在不修改Dog对象内容的前提下，让Doggy实例也能够拥有抓老鼠的办法呢？答案就是使用call，apply或者bind关键字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="kitty.catchMouse.call(doggy, 'Mickey', 'Minnie')

kitty.catchMouse.apply(doggy, ['Mickey', 'Minnie'])

const doggyCatchMouse = kitty.catchMouse.bind(doggy, 'Mickey', 'Minnie')
doggyCatchMouse()

// Doggy caught 2 mouse! They call Mickey and Minnie.
// Doggy caught 2 mouse! They call Mickey and Minnie.
// Doggy caught 2 mouse! They call Mickey and Minnie." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">kitty.catchMouse.call(doggy, <span class="hljs-string">'Mickey'</span>, <span class="hljs-string">'Minnie'</span>)

kitty.catchMouse.apply(doggy, [<span class="hljs-string">'Mickey'</span>, <span class="hljs-string">'Minnie'</span>])

<span class="hljs-keyword">const</span> doggyCatchMouse = kitty.catchMouse.bind(doggy, <span class="hljs-string">'Mickey'</span>, <span class="hljs-string">'Minnie'</span>)
doggyCatchMouse()

<span class="hljs-comment">// Doggy caught 2 mouse! They call Mickey and Minnie.</span>
<span class="hljs-comment">// Doggy caught 2 mouse! They call Mickey and Minnie.</span>
<span class="hljs-comment">// Doggy caught 2 mouse! They call Mickey and Minnie.</span></code></pre>
<p>反过来，让Kitty拥有咬坏人的能力，也可以通过这种办法实现，读者可以自行尝试。</p>
<p>看到这里，相信读者已经能够明白call，apply和bind的区别及作用，反过来再查看各自的概念，应该也能够更容易理解。</p>
<p>回到文章开头的等式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cat.call(dog, a, b) = cat.apply(dog, [a, b]) = (cat.bind(dog, a, b))() = dog.cat(a, b)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">cat.call(dog, a, b) = cat.apply(dog, [a, b]) = (cat.bind(dog, a, b))() = dog.cat(a, b)</code></pre>
<p>这里的“等号”其实并不严谨，因为三个关键字的区别及背后的原理肯定不是区区一个等号就能够概括的，但是对于概念的理解以及实际情况下的运用来说，这条等式未必不是一个好的思路。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一行等式理解JS当中的call, apply和bind

## 原文链接
[https://segmentfault.com/a/1190000014182270](https://segmentfault.com/a/1190000014182270)


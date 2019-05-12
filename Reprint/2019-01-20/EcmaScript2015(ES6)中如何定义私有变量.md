---
title: 'EcmaScript2015(ES6)中如何定义私有变量' 
date: 2019-01-20 2:30:11
hidden: true
slug: 7wxuryz6e4b
categories: [reprint]
---

{{< raw >}}

            <h1>EcmaScript2015(ES6)中如何定义私有变量</h1>
<p>自从世界从ES5转到ES6，为了让JavaScript代码库更加美观，ES语法（不仅是语法）发生了巨大的变化。尽管其他所有语法都有所改进，但有一件令开发人员困扰的事情是，如何在类中声明私有变量。但不幸的是，在ES6中没有专门的语法。</p>
<blockquote>
<p>没有！ES6中没有专门的语法来声明私有变量。不过有一个<a href="https://github.com/tc39/proposal-private-fields">提案</a>。</p>
</blockquote>
<h3>新提案（还没有实现）</h3>
<pre><code class="hljs axapta"><span class="hljs-class"><span class="hljs-keyword">class</span>  <span class="hljs-title">MyClass</span></span>{
  <span class="hljs-meta">#private1;</span>
  <span class="hljs-meta">#private2;</span>
  getPrivate1(){
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">this</span>.private1;
  }
}
</code></pre><p>上面的语法是提交给TC39的一个提案，还没被批准，并且在不久的将来肯定也不能用，但我们希望在未来的一些ES版本中可以有这种语法。</p>
<h2>声明私有变量的最佳方式</h2>
<p>你可以创建模块，而模块中的所有东西都是私有的，直到以及除非你使用<code>exports</code>公开它。</p>
<pre><code class="hljs kotlin">let private1  =  new  WeakMap();
let private2  =  new  WeakMap();

<span class="hljs-class"><span class="hljs-keyword">class</span>  <span class="hljs-title">MyClass</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.setPrivate1(<span class="hljs-string">"something"</span>);
    private2.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>,  <span class="hljs-string">"something else"</span>);
  }

  getPrivate1() {
    <span class="hljs-keyword">return</span>  private1.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//"something"</span>
  }

  getPrivate2() {
    <span class="hljs-keyword">return</span>  private2.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//"something else"</span>
  }

  setPrivate1(<span class="hljs-keyword">val</span>) {
    private1.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">this</span>,  <span class="hljs-keyword">val</span>);
  }
}

module.exports  =  MyClass;
</code></pre><h3>为什么不用let private1 = “something”; 这种方式</h3>
<p>为什么我们不声明一个变量private1，然后将它所需的值赋给它呢？原因是，变量private1是一个会在<code>MyClass</code>的所有实例中共享的单一变量。所以只要有任何一个实例修改了private1，那么同样的变化就会反映到其它实例上。</p>
<h3>为什么是用WeakMap而不是Map？</h3>
<p>Map和WeakMap之间的区别在于：对于WeakMap来说，如果键对象准备好被垃圾回收，就会自动删除值；而对于Map来说，它会一直维持一个对键对象的引用，从而会导致内存泄漏。</p>
<h2>声明私有变量的其它方式</h2>
<p>还有其它几种方式来声明私有变量，每种方式各有其优缺点。其中的两种方式描述如下。</p>
<h3>命名约定</h3>
<p>多年来人们一直在私有变量的名称中使用下划线。如果你根据这个约定，并且信任其他开发人员的话，就可以用这种方法。不过，这并不能确保数据的安全性，因为任何人如果想的话，他可以用或者甚至修改该数据。如果你正在开发一个库，那么这种方法强烈不推荐。</p>
<pre><code class="hljs kotlin">
<span class="hljs-class"><span class="hljs-keyword">class</span>  <span class="hljs-title">MyClass</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>._private1  =  <span class="hljs-string">"something"</span>;
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">public</span>  =  <span class="hljs-string">"something else"</span>;
  }
}
</code></pre><h3>Object.assign</h3>
<p>通过用<code>Object.assign</code>，你也能使用私有变量，并且能确保数据安全。但是这种方法的问题是，要读写该私有变量的方法不能是原型方法。这些方法与私有变量一起，也必须写在构造器内。这不仅让它对于其他开发人员来说很难去读懂，而且也是一种低效率的声明那个函数的方式；因为这些函数会被在该类的每个实例中重复（不是共享）。</p>
<pre><code class="hljs kotlin"><span class="hljs-class"><span class="hljs-keyword">class</span>  <span class="hljs-title">MyClass</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">var</span>  private1  =  <span class="hljs-string">"something"</span>;
    Object.assign(<span class="hljs-keyword">this</span>,  {
      getPrivate(){
        <span class="hljs-keyword">return</span>  private1;
      },
      setPrivate(<span class="hljs-keyword">val</span>){
        private1  =  <span class="hljs-keyword">val</span>;
      }
    });
  }

  anotherMethod(){
    console.log(private1);  <span class="hljs-comment">//ERROR</span>
  }
}
</code></pre><h2>结论</h2>
<p>有些人可能会推荐用ES6 Symbol来创建私有变量。几个月前这种方式还是有效的，不过ES6已经修改了其草案，现在Symbol键从一个对象的外部也可以访问了。所以遵循这种方式没有意义。不过，最佳实践是把你的程序分为模块，并且用我展示的第一个方式来声明私有变量。使用这种方式能确保数据安全，该类中所有方法将都能访问该数据。我所看到的唯一缺点是，它给了你一种骇客式的感觉，因为与命名约定方式中相比，私有变量与类没有太大关系。</p>
<h2>相关帖子</h2>
<ol>
<li>[ES6 Map vs WeakMap vs plain Objects – Describing the differences][55]</li>
<li>[Clone an object in vanilla JS – multiple ways][56]</li>
<li>[Understanding Ember Objects, computed properties and observers – Ember.js Tutorial part 4][57]</li>
</ol>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
EcmaScript2015(ES6)中如何定义私有变量

## 原文链接
[https://www.zcfy.cc/article/how-to-define-private-variables-in-ecmascript-2015-es6](https://www.zcfy.cc/article/how-to-define-private-variables-in-ecmascript-2015-es6)


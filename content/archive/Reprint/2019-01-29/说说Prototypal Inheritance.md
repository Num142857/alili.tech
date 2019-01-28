---
title: '说说Prototypal Inheritance' 
date: 2019-01-29 2:30:10
hidden: true
slug: xq8q20vbd68
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript开发者的繁殖速度和它的语言特性一样迅猛，这是好事，但是也把JS搞得比任何一种其他语言都更像流行乐，充满教派和玄学。但编程不是玄学，是科学和工程。这篇文章就用来阐述和探讨JavaScript中的一个比较关键的概念，虽然在实践上并不如在理论上那么意义重大。</p>
<p>Prototype Inheritance是JavaScript里的一个标志性特性。实际上它叫做Inheritance是有一些问题的，JS没有type系统，instanceof也只是一个沿着原型链查找constructor的语法糖，一个对象是谁构造出来的并不说明任何问题，因为它的对象没有结构上的稳定性承诺，只能靠程序员自觉。</p>
<p>Inheritance是OO近30年的工程实践里留下来的重要特性，但是它不是一个好的特性。当然好与不好是相对的，在绝大多数情况下它都不是太大的问题，尤其是工程进入尾声，开发者对问题和模型有充分认识的时候，Class Hierarchy可以是很合理的设计。</p>
<p>那么，在更General的层面上去问Inheritance设计解决的是什么问题呢？两个字，reuse。</p>
<p>在Java里，reuse有两个语法关键字，一个是extends，即inheritance，另一个是implements，实现interface。</p>
<p>那么为什么把implements也当成reuse呢？因为任何模块总有两个方面，使用者和提供者，implements实现了一个interface，所以等价于重用了使用者代码。</p>
<p>当然你说extends也达到了同样的目的呀？而且我还重用了父类的状态和行为呢？是的，凡是两面，有得有失；这正是它倒霉的地方。</p>
<p>它倒霉的具体情况被称为fragile base class问题，wiki上有词条，不赘述。</p>
<p>因为extends/inheritance是一种长程的关联，基类的修改对继承者的影响难以估计和维护，具有ripple effect特性，因此从耦合度的角度说，它大大提高了组件的耦合度，高耦合度不是罪过，但它应对变化的能力变差了。</p>
<p>好了，说了这么多我们说到了问题的本原。</p>
<p>在Self语言中，也是最早试图解决这个问题的语言设计者们，给出了Prototypal Inheritance设计，</p>
<p>它的设计初衷有两个：</p>
<ol>
<li><p>抹平Class和Object的差异，让修改基类变得容易；</p></li>
<li><p>如果你修改基类，复制一个基类对象然后修改，新继承者从新的基类对象开始继承。其他继承者不受影响。</p></li>
</ol>
<p>你觉得这个差别很重要吗？其实在实践上没有想象的那么重要。</p>
<p>JavaScript在设计上还有点不同，它的原型对象是共享而非复制的，结果是只适合把方法装载到原型上去，偶尔有一些同类对象相同的只读context也可以这样做，其他每对象私有态还得通过调用父类构造函数做出来，即ES6里的super关键字，如果是ES5，得手动把this bind到父类构造函数上调用。这个特性就语言而言是重要特性，但是和我们讨论的问题没太大关系。</p>
<p>更重要的问题出在设计上而不是语言层面。</p>
<p>James Gosling在一次研讨会上回答问题时，有人问了他这样一个问题，如果重新设计Java语言，他会有什么重要的取舍。Gosling的回答可能有点儿令你吃惊：他说如果可以重新来过，他不会赋予Java语言继承特性，只用implements。</p>
<p>呃？！</p>
<p>其实是可以理解的。</p>
<p>继承设计看起来在代码重用上很方便，但是它的fragile base class问题，让它无法应对软件系统的scale问题。这一点不用论证，在整个软件工业上，继承这种whitebox reuse不能scale是一个定论，单一程序用继承书写代码不是问题，但是任何有点规模的系统都是靠interface，protocol，或者所谓的component-based工程方法来搭建的，也就是在更高粒度的设计层面只有基于Interface的blackbox reuse。</p>
<p>在任何语言中，都能用blackbox reuse构建复杂系统。在JavaScript中，庞大的npm包系统实现的最终应用，也是blackbox reuse。</p>
<p>JavaScript本身是否functional是洗剪吹们喜欢探讨的，严肃的工程师不该干这个事儿；但是整个JavaScript的Community的共识是基于blackbox reuse构建系统，这是好事。</p>
<p>～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～</p>
<p>那么是否该使用extends呢？</p>
<p>很多时候没什么必要性。既然Gosling都说不该去通过inheritance-based hierarchy去组合复杂行为（牺牲低耦合度），谁还比他更有资格对这个问题发言呢？</p>
<p>通常可以把几个逻辑单元糖葫芦一样串起来实现一个从外部看来功能特别Powerful的一个对象时，也很容易把每个独立单元用decorator，facade之类的pattern串起来，可能会多写点儿代码，但不会很多，JavaScript作为无类型动态语言在书写pattern时具有显著的简洁优势。（在C++/Java里是相反的，只写inheritance显著比写pattern简洁；但是问题就是问题你无法回避，如果必须要松开耦合，还得回到pattern上定义，这也是为什么这些pattern被发明出来的原因。）</p>
<p>当然用extends方便的时候也没必要去抵触它，比如node里的event emitter，stream等等，该用就用呗，只要不去试图构造framework一样的hierarchy即可。</p>
<p>～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～</p>
<p>如果有人跟你说JavaScript不是OO语言，请一脚把它踹沟里去，JS里除了用Object Literal写出来的ex nihilo对象之外，（逻辑上）所有对象都是用构造函数构造出来的，这甚至包括全局的Object, Array，Function等等，一切皆对象是JS的最高设计思想。你怎么能说它不是OO的？</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
说说Prototypal Inheritance

## 原文链接
[https://segmentfault.com/a/1190000007835815](https://segmentfault.com/a/1190000007835815)


---
title: 'SegmentFault 技术周刊 Vol.32 - 七夕将至，你的“对象”还好吗？' 
date: 2019-01-03 2:30:11
hidden: true
slug: fxlcktu01o
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVTJ3H?w=900&amp;h=385" src="https://static.alili.tech/img/bVTJ3H?w=900&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>马上就要到七夕了，离年底老妈老爸三姑六姨七大爷“找到对象了吗？”的灵魂拷问又近了一点。今天我们就来说说让广大程序猿日思夜想抓耳挠腮的“对象”吧~</p>
<p>不过，此“对象”非彼“对象”。这个“对象”就是那个你 <code>new</code> 一下就有了的对象，不仅天天看到，还经常需要“用到”。</p>
<p>然而说到对象，又不得不从面向对象编程说起了。</p>
<blockquote><p>面向对象编程——Object Oriented Programming，是用抽象方式创建基于现实世界模型的一种编程模式。 它使用先前建立的范例，包括模块化，多态和封装几种技术。 今天，许多流行的编程语言（如Java，JavaScript，C＃，C+ +，Python，PHP，Ruby和Objective-C）都支持面向对象编程（OOP）。</p></blockquote>
<h2 id="articleHeader0">面向对象编程</h2>
<p><a href="https://segmentfault.com/a/1190000004417383">《计算机科学导论》读书笔记（一）：浅析面向过程与面向对象编程</a></p>
<blockquote>
<p>面向对象模式与面向过程模式区别在于：面向对象模式处理活动对象，而非被动对象。如日常生活中的洗衣机，汽车等。 在这些对象上执行的动作都包含在这些对象中，对象只需要接收合适的外部刺激即可。</p>
<p>还是拿打印文件做例子，在面向对象模式中的文件能把所有被文件执行的过程（面向对象中成为方法）（打印，复制粘贴等）打包在一起。在这种模式下，程序只需要向文件发出打印或者复制的请求，文件就会被打印或复制。而这些方法，也被从这些对象继承的其它对象共享。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000010393810" target="_blank">初探面向对象编程之oop与设计模式</a></p>
<blockquote>
<p>我们在使用面向对象编程时一定要记住以下几个基本原则（也就是设计面向对象程序的基本原则），这样才能够更好的理解面向对象的深意。</p>
<ul>
<li><p>单一职责原则</p></li>
<li><p>开放封闭原则</p></li>
<li><p>里氏替换原则（LSP）</p></li>
<li><p>依赖倒置原则</p></li>
<li><p>ISP 接口隔离原则</p></li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000007103935">谈谈我对面向对象以及类与对象的理解</a></p>
<blockquote><p>随着计算机技术的不断提高，现在计算机不单单是用来解决运算问题，而是被用于解决越来越贴近现实生活的复杂问题。面向对象就是这一发展进程的产物，它使得编程工作更贴近人的思维方式，从而大大提升编程效率。我们必须明白的是面向对象并不是一种编程方式，而是一种编程思维方式，这种思维方式涵盖了分析，设计，编码等。在面向对象编程中，程序的基本单元是对象，数据封装在对象中。类是对象模板，是预定义好的结构，所谓的实例化一个类，所指的就是将数据填入模板。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008361625" target="_blank">从俄罗斯方块来聊一聊面向对象</a></p>
<blockquote>
<p>在许多后端语言中，在基础部分，经常说面向对象很重要，比如在java中有类的概念，封装、继承、多态往往被称为面向对象的三个核心。简单来说，封装就是为了更好的复用与继承。在JavaScript中，在ES6之前虽然没有类的概念，但往往封装一些工具类，增强其复用性与便利性是一个不错的选择。</p>
<p>曾有句经典的话：万事万物皆对象。在许多面向对象的讲授中，可能很多的都拿人做例子，一个人是一个对象，对象有一些属性（姓名、年龄、性别等等），对象有一些方法（吃饭、行走、说话），整个人类即一个类。很多情况下，通常new一个人类，即创建了一个具体的对象。那拿到面向对象编程来说的话，这个对象可以是更为抽象的概念。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000002524530">用面向对象的思维方式来设计数据库</a></p>
<blockquote>
<p>场景</p>
<p>我们有多种类型订单：实物订单、特享商户订单、核销订单、生活缴费订单、电影票订单、机票订单、以及以后会持续新增的未知类型订单，它们都存放在不同的订单类型表中</p>
<p>第三种方式使用面向对象的方式来实现：</p>
<ul>
<li><p>先把所有订单的公有的属性抽象集合起来(如：订单编号、下单时间、订单状态、订单类型等)创建一张父订单表</p></li>
<li><p>创建各种订单专有属性表(各类订单特有属性)</p></li>
<li><p>关系：父类订单表 与 订单表 一对一的关系(每张订单表里面都能在父订单表里面有1条与之对应)</p></li>
</ul>
<p>以上方式将能满足绝大多数业务情况</p>
</blockquote>
<h2 id="articleHeader1">PHP 中的面向对象</h2>
<h3 id="articleHeader2">基础</h3>
<p><a href="https://segmentfault.com/a/1190000008744072" target="_blank">面向对象</a></p>
<blockquote>
<p>对象和类的概念及两者的关系：</p>
<ol>
<li><p>类是定义一系列属性和操作的模版，而对象则是把属性进行具体化，然后交给类处理。</p></li>
<li><p>对象就是数据，对象本身不包含方法。但是对象有一个“指针”指向一个类而这个类里可以有方法。</p></li>
<li><p>方法描述不同属性会导致不同的表现。</p></li>
<li><p>类和对象是不可分割的，有对象就必定有一个类与其对应，否则这个对象也就没有意义了。（但是有一种特殊情况：由标量进行强制类型转换的object，没有一个类与他相对应，此时PHP中一个称为“孤儿”sidClass类就会收留这个对象）。</p></li>
</ol>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000000687135">php学习笔记（二）面向对象编程</a></p>
<blockquote>
<p>类的定义：物以类聚，把具有相似特性的对象归到一个类中，类定义了这些相似对象拥有的相同属性和方法。类是相似对象的描述，称为类的定义，是该类对象的蓝图或原型。</p>
<p>成员方法：类中的函数被称为成员方法。函数和成员方法唯一的区别就是，函数实现的是某个独立的功能，而成员方法是实现类中的一个行为，是类的一部分。</p>
<p>构造函数：PHP 5 允行开发者在一个类中定义一个方法作为构造函数。具有构造函数的类会在每次创建新对象时先调用此方法，所以非常适合在使用对象之前做一些初始化工作。</p>
<p>析构函数：析构函数会在到某个对象的所有引用都被删除或者当对象被显式销毁时执行。。</p>
<p>静态类成员：有时候，可能需要创建供所有类实例共享的字段和方法，这些字段和方法与所有的类实例有关，但不能由任何特定对象调用。。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000005862446" target="_blank">PHP_OOP</a></p>
<blockquote>
<p>在php中，对象通过对类的实体化形成的对象。</p>
<p>类(class)：对象的模子。 一类的对象抽取出来。一个将对象的行为和属性的一个抽象。就是一个定义。规定了对象应该有哪些属性，应该有哪些操作(方法)。</p>
<p>实例化：一个动作，根据类中所定义的对象的特征，形成一个对象的过程。</p>
<p>注意: php 中，对象一定是通过类的实例化来的。类的地位，只是得到对象的方法。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000008802881">PHP面向对象三大特性：封装、继承、多态</a></p>
<blockquote>
<p>算法提高程序运行的速度，而设计模式提高编程的速度。</p>
<p>php是面向对象的脚本语言，而我们都知道，面向对象的语言具有三大特性：封装，继承，多态。</p>
</blockquote>
<h3 id="articleHeader3">进阶</h3>
<p><a href="https://segmentfault.com/a/1190000004067581" target="_blank">PHP经验总结 - 聊聊面向对象</a></p>
<blockquote><p>“现在大伙都在讲面向对象编程，但是我们也得先找着一个对象是不？不然怎么面向对象？怎么编程？” --- 笑话一则，但是理不亏，要搞P面向对象编程，我们起码要先搞懂对象（还有类）是什么？只有了解它，理解它，你才能驾驭它。做编程的不能瞎搞，逻辑严谨清晰最重要，要明白我们在做什么？我需要做什么？我该怎么做？接下来，我来谈谈PHP类和对象的认知，然后说一下我们应该怎么用它们。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000005060322">php面向对象中self和static的区别</a></p>
<blockquote>
<p>可以看到，在调用 <code>static</code>，子类哪怕调用的是父类的方法，但是父类方法中调用的方法还会是子类的方法（好绕嘴。。）</p>
<p>在PHP5.3版本以前，<code>static</code> 和 <code>self</code> 还是有一点区别，具体是什么，毕竟都是7版本的天下了。就不去了解了。</p>
<p>总结呢就是：<code>self</code> 只能引用当前类中的方法，而 <code>static</code> 关键字允许函数能够在运行时动态绑定类中的方法。</p>
</blockquote>
<p><a>PHP｜关于对象复制的一些事</a></p>
<blockquote>
<p>当我们需要一个对象的副本时，可以通过 <code>clone</code> 关键字，使用值复制方式新生成一个对象。</p>
<p>但是这有一个问题，对象中的某些数据，比如 <code>id</code>，我不想是一样的。但是 <code>clone</code>是做不到的。</p>
<p>这时我们可以通过实现一个特殊的方法 <code>__clone()</code> 来达到这个目的。当一个对象调用clone关键字时，其 <code>__clone()</code> 方法就会被自动调用。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000008491926">面向对象,关键字, <em>重点</em> 必看</a></p>
<blockquote>
<p>$this只能在成员方法中。$this主要用来调用成员属性和成员方法；只能调用对象的东西。</p>
<p>self可以在所有方法中使用。self主要用来调用类的常量、静态属性、静态方法，只能调用类的东西。</p>
<p>parent可以调用父类的内容：成员方法、静态属性、静态方法、常量</p>
<p>static关键字修饰的属性和方法，就是静态属性和静态方法； 静态属性和静态方法，是与某个类相关的，与对象无关。 静态属性和静态方法，不创建对象也能调用。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000010578304" target="_blank">面向对象的实例应用：图形计算器</a></p>
<blockquote><ol>
<li><p>使用动态页面实现图形计算器，可以计算给定图形的周长和面积</p></li>
<li><p>可以使用接口或抽象类作为规范，再写各子类的多态</p></li>
</ol></blockquote>
<h2 id="articleHeader4">Java 中的面向对象</h2>
<p><a href="https://segmentfault.com/a/1190000007517963">简谈我所理解的面向对象</a></p>
<blockquote>
<p>众多面向对象的编程思想虽不尽一致，但是无论哪种面向对象编程语言都具有以下的共通功能。</p>
<ol>
<li><p>不需要知道内部的详细处理就可以进行操作（封装、数据抽象）。</p></li>
<li><p>根据不同的数据类型自动选择适当的方法（多态性）。</p></li>
</ol>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000009141566" target="_blank">Java 面向对象编程的三大特性（封装、继承、多态）以及重写和重载</a></p>
<blockquote>
<p>Java 面向对象编程有三大特性：封装、继承、多态。</p>
<ul>
<li><p>封装：隐藏对象的属性和实现细节，仅对外公开访问方法，控制在程序中属性的读和写的访问级别。</p></li>
<li><p>继承：可以理解为，在一个现有类的基础之上，增加新的方法或重写已有方法，从而产生一个新类。</p></li>
<li><p>多态：相同的事物，调用其相同的方法，参数也相同时，但表现的行为却不同。</p></li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000008795879">Java 面向对象1 类 对象 方法 变量 封装</a></p>
<p><a href="https://segmentfault.com/a/1190000008795969" target="_blank">Java 面向对象2 构造器 继承 多态性 初始化块</a></p>
<h2 id="articleHeader5">Javascript 中的面向对象</h2>
<h3 id="articleHeader6">基础</h3>
<p><a href="https://segmentfault.com/a/1190000007089886">温故知新之javascript面向对象</a></p>
<blockquote>
<p>类和实例是大多数面向对象编程语言的基本概念</p>
<ul>
<li><p>类：类是对象的类型模板</p></li>
<li><p>实例：实例是根据类创建的对象</p></li>
</ul>
<p>但是，JavaScript语言的对象体系，不是基于“类”的，而是基于构造函数（constructor）和原型链（prototype）。了与普通函数区别，构造函数名字的第一个字母通常大写。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000005745202" target="_blank">JavaScript_面向对象程序设计</a></p>
<blockquote>
<p>Object每个实例都会具有的属性和方法：</p>
<ul>
<li><p>Constructor：保存着用于创建当前对象的函数。（构造函数）</p></li>
<li><p>hasOwnProperty(propertyName)：用于检测给定的属性在当前对象实例中(而不是原型中)是否存在。</p></li>
<li><p>isPrototypeOf(Object)：用于检查传入的对象是否是另外一个对象的原型。</p></li>
<li><p>propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举。</p></li>
<li><p>toLocaleString()：返回对象的字符串表示。该字符串与执行环境的地区对应.</p></li>
<li><p>toString()：返回对象的字符串表示。</p></li>
<li><p>valueOf()：返回对象的字符串、数值或布尔表示。</p></li>
</ul>
<p>判断一个对象是不是另一个对象的实例，通常使用的是 instanceof，比较少使用constructor。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000003932488">JavaScript设计模式与开发实践 | 01 - 面向对象的JavaScript</a></p>
<blockquote>
<p>JavaScript在设计的时候，模仿Java引入了两套类型机制：基本类型和对象类型。</p>
<p>按照JavaScript设计者的本意，除了undefined之外，一切都应是对象。为了实现这一目标，number、boolean等几种基本类型数据可以通过“包装类”的方式变成对象类型数据。</p>
<p>JavaScript绝大部分数据都是对象。事实上，JavaScript中的根对象是Object.prototype对象。Object.prototype对象是一个空对象。JavaScript的每个对象，都是从Object.prototype对象克隆而来。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000002617889" target="_blank">CoffeeScript—面向对象</a></p>
<blockquote>
<p>自从面向对象的编程思想出现以来，这个概念已经被炒烂了，只要编程开发大家都会拿面向对象来说事，好像只要跟面向对象沾边就会显得逼格很高一样，不过确实逼格提高了。要知道，面向对象只是一种手段，最终目的是为了提高我们项目的重用性、灵活性和扩展性。</p>
<p>为了迎合面向对象的程序设计思想，JavaScript也通过自己的语法实现了自己的一套面向对象机制。不过我想问下，前端开发当中有多少人使用过面向对象当中的继承？</p>
<p>JavaScript面向对象的实现确实有点不伦不类的感觉。下面先简单说明下JavaScript当中面向对象的实现，涉及的东西比较深，要对constructor、prototype有一定的理解，不然看起来会很吃力，或者你也可以跳开这部分内容，直接看CoffeeScript面向对象的实现。</p>
</blockquote>
<h3 id="articleHeader7">细说 Javascript 对象</h3>
<p><a href="https://segmentfault.com/a/1190000000477429">细说 Javascript 对象篇（一） : 对象的使用和属性</a></p>
<blockquote><p>一个经常容易被误解的就是数字常量不能视为对象，实际上数字常量仍然可以视为对象。这是因为 Javascript 解析器在解析点操作符时而将其视为浮点数特征而犯下的错误。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000000478987" target="_blank">细说 Javascript 对象篇（二） : 原型对象</a></p>
<blockquote>
<p>Javascript 并没有类继承模型，而是使用原型对象 prototype 进行原型式继承。</p>
<p>尽管人们经常将此看做是 Javascript 的一个缺点，然而事实上，原型式继承比传统的类继承模型要更加强大。举个例子，在原型式继承顶端构建一个类模型很简单，然而反过来则是个困难得多的任务。</p>
<p>Javascript 是唯一一个被广泛运用的原型式继承的语言，所以理解两种继承方式的差异是需要时间的。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000000480531">细说 Javascript 对象篇（三） : hasOwnProperty</a></p>
<blockquote><p>判断一个属性是定义在对象本身而不是继承自原型链，我们需要使用从 Object.prototype 继承而来的 hasOwnProperty 方法。</p></blockquote>
<p>hasOwnProperty 方法是 Javascript 中唯一一个处理对象属性而不会往上遍历原型链的。</p>
<p><a href="https://segmentfault.com/a/1190000000480560" target="_blank">细说 Javascript 对象篇（四） : for in 循环</a></p>
<blockquote>
<p>如同 in 运算符一样，使用 for in 循环遍历对象属性时，也将往上遍历整个原型链。</p>
<p>这里我们要注意两点，一是 for in 循环会忽略 enumerable 设置为 false 的属性。例如一个数组的 length 属性。第二是，由于 for in 会遍历整个原型链，所以当原型链过长时，会对性能造成影响。</p>
</blockquote>
<h3 id="articleHeader8">进阶</h3>
<p><a href="https://segmentfault.com/a/1190000000662547">JavaScript学习总结（五）原型和原型链详解</a></p>
<blockquote><p>原型链：当从一个对象那里调取属性或方法时，如果该对象自身不存在这样的属性或方法，就会去自己关联的prototype对象那里寻找，如果prototype没有，就会去prototype关联的前辈prototype那里寻找，如果再没有则继续查找Prototype.Prototype引用的对象，依次类推，直到Prototype.….Prototype为undefined（Object的Prototype就是undefined）从而形成了所谓的“原型链”。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008534849" target="_blank">Javascript面向对象编程（二）：构造函数的继承</a></p>
<blockquote><p>上面是采用prototype对象，实现继承。我们也可以换一种思路，纯粹采用"拷贝"方法实现继承。简单说，如果把父对象的所有属性和方法，拷贝进子对象，不也能够实现继承吗？这样我们就有了第五种方法。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008102945">面向对象-非构造函数的继承</a></p>
<blockquote><p>除了使用“prototype”链以外，还有另一种思路：就是把父对象的属性，全部拷贝给子对象，也能实现继承。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000004282206" target="_blank">理清javascript中的面向对象（一）——原型继承</a></p>
<blockquote>
<p>与其它编程语言不一样的是，javascript的面向对象并非依赖于抽象的类，而是通过原型链，将一个个具体的对象实例进行连接，位于原型链下游的对象实例可以读取/使用位于上游的对象实例的属性/方法。</p>
<p>下文由简及深，试图一步步理清javascript面向对象的本质。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000009704212">javascript对象详解：__proto__ 和 prototype 的区别和联系</a></p>
<blockquote><p>函数是js中的一等公民，js在创建对象的时候，都有一个叫做__proto__的内置属性，用于指向创建它的函数对象的原型对象prototype。只有函数有prototype, 当你创建一个函数时，js会自动为这个函数加上prototype属性，值是一个空对象。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000009359984" target="_blank">JavaScript深入之创建对象的多种方式以及优缺点</a></p>
<blockquote>
<p>优点：该共享的共享，该私有的私有，使用最广泛的方式</p>
<p>缺点：有的人就是希望全部都写在一起，即更好的封装性</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000002550104">js面向对象练习-拖拽效果</a></p>
<blockquote>
<p>普通方法变形</p>
<ul>
<li><p>尽量不要出现函数嵌套函数</p></li>
<li><p>可以有全局变量</p></li>
<li><p>把onload函数中不是赋值的语句放到单独函数中</p></li>
</ul>
<p>改成面向对象</p>
<ul>
<li><p>全局变量就是属性</p></li>
<li><p>函数就是方法</p></li>
<li><p>onload中创建对象</p></li>
<li><p>改this指针问题</p></li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000005824847" target="_blank">谈谈 javascript 面向对象的一些细节问题</a></p>
<p><a href="https://segmentfault.com/a/1190000002570103">JavaScript面向对象知识点小结</a></p>
<p><a href="https://segmentfault.com/a/1190000009160218" target="_blank">一张图秒懂原型链查找，这个是理解js原型继承的关键</a></p>
<h2 id="articleHeader9">社区技术群</h2>
<p>SegmentFault 官方目前开放的微信技术群如下：</p>
<ol>
<li><p>SF.GG 后端攻城狮交流群</p></li>
<li><p>SF.GG 前端攻城狮交流群</p></li>
<li><p>SF.GG 北京技术交流群</p></li>
<li><p>SF.GG 上海技术交流群</p></li>
<li><p>SF.GG 广州技术交流群</p></li>
<li><p>SF.GG 深圳技术交流群</p></li>
<li><p>SF.GG 杭州技术交流群</p></li>
</ol>
<p>以上群组仅限程序员加入，需要入群的小伙伴请添加管理员微信好友：mgr_segmentfault，备注『群名称+SF用户ID』，审核成功后会拉你进入相应技术群。</p>
<p>本期完<br>:）</p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVQQAg?w=800&amp;h=372" src="https://static.alili.tech/img/bVQQAg?w=800&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.32 - 七夕将至，你的“对象”还好吗？

## 原文链接
[https://segmentfault.com/a/1190000010837503](https://segmentfault.com/a/1190000010837503)


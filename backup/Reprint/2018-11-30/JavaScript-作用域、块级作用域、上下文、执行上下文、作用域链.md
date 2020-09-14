---
title: 'JavaScript-作用域、块级作用域、上下文、执行上下文、作用域链' 
date: 2018-11-30 2:30:12
hidden: true
slug: wrntjybvr8c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、作用域</h2>
<blockquote>在 JavaScript 中, 作用域（scope，或译有效范围）就是变量和函数的<strong>可访问范围</strong>，即作用域控制着变量和函数的<strong>可见性</strong>和<strong>生命周期</strong>
</blockquote>
<h2 id="articleHeader1">二、全局/局部作用域</h2>
<h3 id="articleHeader2">2.1 全局作用域(Global Scope)</h3>
<p>（1）<strong>不在任何函数内定义的变量</strong>就具有全局作用域。</p>
<p>（2）实际上，JavaScript默认有一个<strong>全局对象window</strong>，全局作用域的变量实际上被绑定到<strong>window的一个属性</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV91Nn?w=555&amp;h=126" src="https://static.alili.tech/img/bV91Nn?w=555&amp;h=126" alt="全局作用域" title="全局作用域" style="cursor: pointer; display: inline;"></span></p>
<p>（3）<strong>window对象的内置属性</strong>都拥有全局作用域，例如 window.name、window.location、window.top 等。</p>
<h3 id="articleHeader3">2.2 局部作用域(Local Scope)</h3>
<p>（1）JavaScript的作用域是通过<strong>函数</strong>来定义的，在一个函数中定义的变量只对这个<strong>函数内部可见</strong>，称为<strong>函数（局部）作用域</strong>。</p>
<h2 id="articleHeader4">三、全局/局部变量</h2>
<blockquote>变量能够被定义在局部或者全局作用域，这导致运行时<strong>变量的访问来自不同的作用域</strong>。</blockquote>
<h3 id="articleHeader5">3.1 全局变量</h3>
<p>（1）在<strong>函数定义外</strong>声明的变量是全局变量。  </p>
<p>（2）全局变量有 全局作用域，它的<strong>值可在整个程序中访问和修改</strong>。</p>
<p>（3）如果<strong>变量在函数内没有声明</strong>（没有使用 var 关键字），该变量为全局变量。</p>
<h3 id="articleHeader6">3.2 局部变量</h3>
<p>（1）在<strong>函数定义内</strong>声明的变量是局部变量。</p>
<p>（2）因为局部变量只作用于函数内，所以<strong>不同的函数可以使用相同名称的变量</strong>。</p>
<p>（3）每当执行函数时，都会<strong>创建</strong>和<strong>销毁</strong>该变量，且无法通过函数之外的任何代码访问该变量。</p>
<p>（4）<strong>函数外无法访问函数内的变量，函数内却可以访问函数外的变量。</strong></p>
<h2 id="articleHeader7">四、全局变量</h2>
<blockquote>1、在<strong>函数定义外</strong>声明的变量是全局变量；全局变量有全局作用域，它的<strong>值可在整个程序中访问和修改</strong>。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV91QM?w=293&amp;h=197" src="https://static.alili.tech/img/bV91QM?w=293&amp;h=197" alt="全局变量" title="全局变量" style="cursor: pointer; display: inline;"></span></p>
<blockquote>2、如果<strong>变量在函数内没有声明</strong>（没有使用 var 关键字），该变量为全局变量。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV91Rd?w=290&amp;h=179" src="https://static.alili.tech/img/bV91Rd?w=290&amp;h=179" alt="全局变量" title="全局变量" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">五、局部变量</h2>
<blockquote>1、因为局部变量只作用于函数内，所以<strong>不同的函数可以使用相同名称的变量</strong>。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV91Ay?w=291&amp;h=378" src="https://static.alili.tech/img/bV91Ay?w=291&amp;h=378" alt="局部变量" title="局部变量" style="cursor: pointer;"></span></p>
<blockquote>2、每当执行函数时，都会<strong>创建</strong>和<strong>销毁</strong>该变量，且无法通过函数之外的任何代码访问该变量。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV91z0?w=489&amp;h=231" src="https://static.alili.tech/img/bV91z0?w=489&amp;h=231" alt="局部变量" title="局部变量" style="cursor: pointer; display: inline;"></span></p>
<blockquote>3、<strong>函数外无法访问函数内的变量，函数内却可以访问函数外的变量。</strong>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV91CS?w=433&amp;h=329" src="https://static.alili.tech/img/bV91CS?w=433&amp;h=329" alt="局部变量" title="局部变量" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">六、块级作用域</h2>
<h3 id="articleHeader10">6.1 概念</h3>
<blockquote>块级作用域指在If语句，switch语句，循环语句等语句块中定义变量，这意味着变量<strong>不能在语句块之外被访问</strong>。</blockquote>
<h3 id="articleHeader11">6.2 var 不支持块级作用域</h3>
<p>（1）在If等<strong>语句块</strong>中，定义的变量从属于该块所在的作用域，和函数不同，他们不会创建新的作用域。</p>
<p><span class="img-wrap"><img data-src="/img/bV92fj?w=279&amp;h=125" src="https://static.alili.tech/img/bV92fj?w=279&amp;h=125" alt="var" title="var" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">6.3 let和const</h3>
<p>（1）为了解决块级作用域，ES6引入了 <strong>let</strong> 和 <strong>const</strong> 关键字，<strong>可以声明一个块级作用域的变量</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV92gt?w=663&amp;h=253" src="https://static.alili.tech/img/bV92gt?w=663&amp;h=253" alt="let和const" title="let和const" style="cursor: pointer;"></span></p>
<p>（2）全局作用域的生存周期与上述应用相同。局部作用域只在该函数调用执行期间存在。</p>
<h2 id="articleHeader13">七、上下文 vs 作用域</h2>
<p>（1）首先需要说明的是<strong>上下文和作用域是不同的概念</strong>。</p>
<p>（2）每个函数调用都有与之相关的作用域和上下文。从根本上说，作用域是基于<strong>函数</strong>，而上下文是基于<strong>对象</strong>。</p>
<p>（3）作用域是和每次<strong>函数调用时变量的访问有关</strong>，并且<strong>每次调用都是独立的</strong>。上下文总是关键字 <strong>this 的值</strong>，是调用当前可执行代码的对象的引用。</p>
<h2 id="articleHeader14">八、“this” 上下文</h2>
<p>（1）上下文通常是<strong>取决于</strong>一个函数如何被调用。当<strong>函数作为对象的方法</strong>被调用时，this 指向<strong>调用方法的对象</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV92PH?w=407&amp;h=172" src="https://static.alili.tech/img/bV92PH?w=407&amp;h=172" alt="上下文" title="上下文" style="cursor: pointer; display: inline;"></span></p>
<p>（2）当调用一个函数时，通过 <strong>new</strong> 操作符创建一个对象的实例，当以这种方式调用时，this 指向<strong>新创建的实例</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV92QS?w=241&amp;h=178" src="https://static.alili.tech/img/bV92QS?w=241&amp;h=178" alt="上下文" title="上下文" style="cursor: pointer; display: inline;"></span></p>
<p>（3）当调用一个<strong>未绑定函数</strong>，this 默认指向<strong>全局上下文</strong>或者<strong>浏览器中的window对象</strong>。然而如果函数在<strong>严格模式</strong>下被执行(“use strict”)，this 默认指向 <strong>undefined</strong>。</p>
<h2 id="articleHeader15">九、执行上下文</h2>
<p>（1）当函数执行时，会创建一个称为执行上下文的内部对象（<strong>可理解为作用域，不是前面讨论的上下文</strong>）。一个执行上下文定义了一个<strong>函数执行时的环境</strong>。</p>
<p>（2）函数每次执行时对应的执行上下文都是<strong>独一无二</strong>的，所以多次调用一个函数会导致创建多个执行上下文。</p>
<p>（3）当javascript代码文件被浏览器载入后，默认最先进入的是一个<strong>全局的执行上下文</strong>。当在全局上下文中调用执行一个函数时，程序流就进入该被调用函数内，此时引擎就会为该函数创建一个<strong>新的执行上下文</strong>，并且将其压入到<strong>执行栈顶部（作用域链）</strong>。浏览器总是执行位于<strong>执行栈顶部的当前执行上下文</strong>，一旦执行完毕，该执行上下文就会从执行栈顶部<strong>弹出</strong>，并且控制权将进入<strong>其下的</strong>执行上下文。这样，执行栈中的执行上下文就会被依次执行并且弹出，直到回到全局的执行上下文。</p>
<h2 id="articleHeader16">十、作用域链</h2>
<p>（1）在JavaScript中，函数也是对象，对象中有些属性我们可以访问，但有些<strong>不可以（访问）</strong>，这些属性仅供JavaScript引擎存取，<strong>[[scope]]</strong>就是其中一个。</p>
<p>（2）[[scope]]指的就是我们所说的<strong>作用域</strong>，其中存储了执行上下文的集合。</p>
<p>（3）[[scope]]中所存储的<strong>执行上下文对象的集合</strong>，这个集合呈<strong>链式链接</strong>，我们把这种链式链接叫做作用域链。</p>
<h3 id="articleHeader17">10.1 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV97gD?w=344&amp;h=343" src="https://static.alili.tech/img/bV97gD?w=344&amp;h=343" alt="执行期上下文" title="执行期上下文" style="cursor: pointer; display: inline;"></span></p>
<p>（1）运行示例代码将会导致嵌套的函数被<strong>从上倒下执行</strong>，一直到 fourth 函数，此时作用域链从上到下为： fourth, third, second, first, global。</p>
<p>（2）fourth 函数能够访问<strong>全局变量</strong>和任何定义在<strong>first,second和third函数中的变量</strong>（和访问自己的变量一样）。</p>
<p>（3）一旦fourth函数<strong>执行完成</strong>，其就会从作用域链顶部<strong>移除</strong>，并且<strong>执行权会返回到third函数</strong>。这个过程一直持续到所有代码完成执行。</p>
<h3 id="articleHeader18">10.2 攀爬作用域链</h3>
<p>（1）当不同执行上下文之间存在 <strong>变量命名冲突</strong>，可以通过攀爬作用域链解决（从顶部到底部）。这也就是说<br>在最内层函数（执行栈顶部的执行上下文）中，具有相同变量名称的变量将具有较高优先级。</p>
<p>（2）简单的说，每次试图访问函数执行上下文中的变量时，查找进程总是从<strong>自己的变量对象开始</strong>。如果在自己的变量对象中没发现要查找的变量，继续搜索作用域链。他将攀爬作用域链检查每一个执行上下文的变量对象，去寻找和<strong>变量名称匹配的值</strong>。</p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>
<p>我的博客即将搬运同步至腾讯云+社区，邀请大家一同入驻：<a href="https://cloud.tencent.com/developer/support-plan?invite_code=2th7qw1uva68c" rel="nofollow noreferrer" target="_blank">https://cloud.tencent.com/dev...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript-作用域、块级作用域、上下文、执行上下文、作用域链

## 原文链接
[https://segmentfault.com/a/1190000014876534](https://segmentfault.com/a/1190000014876534)


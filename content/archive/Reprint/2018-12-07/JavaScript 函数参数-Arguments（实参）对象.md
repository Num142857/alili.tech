---
title: 'JavaScript 函数参数-Arguments（实参）对象' 
date: 2018-12-07 2:30:09
hidden: true
slug: ug8mmfb7zk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、参数概念</h2>
<blockquote>函数运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。</blockquote>
<h3 id="articleHeader1">1.1 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV7Cj7?w=297&amp;h=156" src="https://static.alili.tech/img/bV7Cj7?w=297&amp;h=156" alt="参数的概念" title="参数的概念" style="cursor: pointer; display: inline;"></span></p>
<p>上式的 <strong>x</strong> 就是square函数的 <strong>参数</strong>。每次运行的时候，需要提供这个值，否则得不到结果。</p>
<h2 id="articleHeader2">二、形式参数和实际参数</h2>
<h3 id="articleHeader3">2.1 形式参数在<strong>函数定义</strong>时列出。</h3>
<h3 id="articleHeader4">2.2 实际参数在<strong>函数调用</strong>时传递给函数真正的<strong>值</strong>。</h3>
<p><span class="img-wrap"><img data-src="/img/bV7Crh?w=506&amp;h=129" src="https://static.alili.tech/img/bV7Crh?w=506&amp;h=129" alt="形式参数和实际参数" title="形式参数和实际参数" style="cursor: pointer; display: inline;"></span></p>
<p>形式参数和实际参数是<strong>不同的变量</strong>，他们在<strong>内存</strong>中处于<strong>不同的位置</strong>，形式参数在函数运行结束时将被释放。</p>
<h2 id="articleHeader5">三、参数规则</h2>
<h3 id="articleHeader6">3.1 函数定义时形式参数没有指定数据类型。</h3>
<h3 id="articleHeader7">3.2 函数对实际参数没有进行类型检测。</h3>
<h3 id="articleHeader8">3.3 函数对实际参数的个数没有进行检测。</h3>
<p><span class="img-wrap"><img data-src="/img/bV7CsP?w=413&amp;h=278" src="https://static.alili.tech/img/bV7CsP?w=413&amp;h=278" alt="参数的规则" title="参数的规则" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">四、默认参数</h2>
<p>如果函数在调用时未提供实际参数，参数会默认设置为： <strong>undefined</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV7CuS?w=388&amp;h=279" src="https://static.alili.tech/img/bV7CuS?w=388&amp;h=279" alt="默认参数" title="默认参数" style="cursor: pointer; display: inline;"></span></p>
<p>如果y已经定义 ， y || 返回 y, 因为 y 是 true, 否则返回 0, 因为 undefined 为 false。</p>
<h2 id="articleHeader10">五、参数个数</h2>
<h3 id="articleHeader11">5.1 实参比形参少</h3>
<p>（1）当调用函数时传递的实参比函数定义时的形参个数少，剩下的形参都将设置为 <strong>undefined</strong> 值。</p>
<p><span class="img-wrap"><img data-src="/img/bV7CzG?w=471&amp;h=125" src="https://static.alili.tech/img/bV7CzG?w=471&amp;h=125" alt="实参比形参少" title="实参比形参少" style="cursor: pointer; display: inline;"></span></p>
<p>（2）通常函数只保留靠前的参数，而省略靠后的参数。如果一定要省略靠前的参数，只有<strong>显式传入 undefined</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV7CBS?w=583&amp;h=177" src="https://static.alili.tech/img/bV7CBS?w=583&amp;h=177" alt="显式传入" title="显式传入" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">5.2 实参比形参多</h3>
<p>（1）如果函数调用时设置了过多的实际参数，剩下的实际参数<strong>没有方法直接获取</strong>，需要使用即将提到的arguments对象。</p>
<h2 id="articleHeader13">六、Arguments（实参）对象</h2>
<h3 id="articleHeader14">6.1 定义</h3>
<p>（1）由于 JavaScript 允许函数有<strong>不定数目</strong>的参数，所以需要一种机制，可以在函数体内部<strong>读取所有参数</strong>。这就是arguments对象的由来。</p>
<p>（2）arguments对象包含了<strong>函数运行时的所有参数</strong>，arguments[0]就是<strong>第一个</strong>参数，arguments[1]就是<strong>第二个</strong>参数，以此类推。这个对象只有在<strong>函数体内部</strong>，才可以使用。</p>
<h3 id="articleHeader15">6.2 示例</h3>
<p>（1）</p>
<p><span class="img-wrap"><img data-src="/img/bV7Ip8?w=407&amp;h=247" src="https://static.alili.tech/img/bV7Ip8?w=407&amp;h=247" alt="Arguments对象" title="Arguments对象" style="cursor: pointer; display: inline;"></span></p>
<p>（2）</p>
<p><span class="img-wrap"><img data-src="/img/bV7IrI?w=799&amp;h=150" src="https://static.alili.tech/img/bV7IrI?w=799&amp;h=150" alt="Arguments对象" title="Arguments对象" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader16">5.3 length属性</h3>
<p>（1）通过arguments对象的length属性，可以判断函数调用时传递的<strong>实际参数个数</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV7Ir5?w=390&amp;h=177" src="https://static.alili.tech/img/bV7Ir5?w=390&amp;h=177" alt="length属性" title="length属性" style="cursor: pointer; display: inline;"></span></p>
<p>（2）<strong>注意</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV7Itu?w=512&amp;h=204" src="https://static.alili.tech/img/bV7Itu?w=512&amp;h=204" alt="length属性" title="length属性" style="cursor: pointer; display: inline;"></span></p>
<p><strong>arguments对象</strong>的length属性显示<strong>实参</strong>的个数，<strong>函数</strong>的length属性显示<strong>形参</strong>的个数</p>
<p>（3）形参只是提供便利，但不是必需的</p>
<p><span class="img-wrap"><img data-src="/img/bV7Iub?w=507&amp;h=128" src="https://static.alili.tech/img/bV7Iub?w=507&amp;h=128" alt="形参" title="形参" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader17">5.4 和数组的关系</h3>
<p>（1）需要注意的是，虽然arguments很像数组，但它是一个<strong>对象</strong>。数组专有的方法（比如slice和forEach），不能在arguments对象上直接使用。</p>
<p>（2）如果要让arguments对象使用数组方法，真正的解决方法是将arguments<strong>转为真正的数组</strong>。</p>
<p>（3）下面是两种常用的转换方法：<strong>slice方法</strong>和<strong>逐一填入新数组</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV7IwT?w=620&amp;h=226" src="https://static.alili.tech/img/bV7IwT?w=620&amp;h=226" alt="转为数组" title="转为数组" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader18">5.5 callee 属性</h3>
<p>（1）arguments对象有一个名为callee的属性，该属性是一个<strong>指针</strong>，指向拥有这个<strong>arguments对象的函数</strong>。</p>
<p>（2）下面是经典的<strong>阶乘函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV7IxO?w=478&amp;h=227" src="https://static.alili.tech/img/bV7IxO?w=478&amp;h=227" alt="阶乘函数" title="阶乘函数" style="cursor: pointer; display: inline;"></span></p>
<p>（3）　但是，上面这个函数的执行与函数名紧紧<strong>耦合</strong>在了一起，可以使用<strong>arguments.callee</strong>可以消除函数<strong>解耦</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV7Ix9?w=565&amp;h=228" src="https://static.alili.tech/img/bV7Ix9?w=565&amp;h=228" alt="解耦" title="解耦" style="cursor: pointer; display: inline;"></span></p>
<p>（4）　但在<strong>严格模式</strong>下，访问这个属性会抛出TypeError<strong>错误</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV7Iyv?w=936&amp;h=326" src="https://static.alili.tech/img/bV7Iyv?w=936&amp;h=326" alt="严格模式" title="严格模式" style="cursor: pointer; display: inline;"></span></p>
<p>（5）这时，可以使用具名的函数表达式</p>
<p><span class="img-wrap"><img data-src="/img/bV7IyS?w=449&amp;h=227" src="https://static.alili.tech/img/bV7IyS?w=449&amp;h=227" alt="具名的函数表达式" title="具名的函数表达式" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>
<p>参考文章 </p>
<p><a href="http://javascript.ruanyifeng.com/grammar/function.html#toc15" rel="nofollow noreferrer" target="_blank">函数</a></p>
<p><a href="https://www.cnblogs.com/xiaohuochai/p/5706289.html" rel="nofollow noreferrer" target="_blank">深入理解javascript函数系列第二篇——函数参数</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 函数参数-Arguments（实参）对象

## 原文链接
[https://segmentfault.com/a/1190000014196082](https://segmentfault.com/a/1190000014196082)


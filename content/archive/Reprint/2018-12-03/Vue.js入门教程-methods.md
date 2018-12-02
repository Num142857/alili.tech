---
title: 'Vue.js入门教程-methods' 
date: 2018-12-03 2:30:08
hidden: true
slug: 17toial1q2b
categories: [reprint]
---

{{< raw >}}

                    
<h2>一、输出数据</h2>
<p>（1）在 Vue.js 的学习中，最开始接触的是使用<strong>文本插值</strong>输出数据。</p>
<p>（2）但如果需要根据某些规则或逻辑输出数据呢？在这种情况下，我们可以通过 Vue.js 中的<strong>计算属性</strong>实现。</p>
<p>（3）除了以上方式，还可以嵌入JavaScript的<strong>逻辑函数</strong>。</p>
<h2>二、文本插值</h2>
<p>如下示例，data 数据中有两个属性 firstName 和 lastName ，要求输出 fullName。</p>
<p><span class="img-wrap"><img data-src="/img/bV9rNX?w=375&amp;h=222" src="https://static.alili.tech/img/bV9rNX?w=375&amp;h=222" alt="文本插值" title="文本插值"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9rPX?w=477&amp;h=74" src="https://static.alili.tech/img/bV9rPX?w=477&amp;h=74" alt="文本插值" title="文本插值"></span></p>
<p>可以在页面中看到输出全名（fullName），也就是“前端开发 攻城狮”。</p>
<p><span class="img-wrap"><img data-src="/img/bV9rSp?w=286&amp;h=111" src="https://static.alili.tech/img/bV9rSp?w=286&amp;h=111" alt="文本插值" title="文本插值"></span></p>
<h2>三、计算属性</h2>
<p>使用 Vue.js 中的 <strong>computed</strong> 属性，并且在 computed 中创建 fullName 方法。其中键名就是函数名（fullName），而键值是函数。</p>
<p><span class="img-wrap"><img data-src="/img/bV9r1d?w=619&amp;h=347" src="https://static.alili.tech/img/bV9r1d?w=619&amp;h=347" alt="计算属性" title="计算属性"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9r1B?w=301&amp;h=73" src="https://static.alili.tech/img/bV9r1B?w=301&amp;h=73" alt="计算属性" title="计算属性"></span></p>
<p>可以在页面中看到输出全名（fullName），也就是“前端开发 攻城狮”。</p>
<p><span class="img-wrap"><img data-src="/img/bV9rSp?w=286&amp;h=111" src="https://static.alili.tech/img/bV9rSp?w=286&amp;h=111" alt="文本插值" title="文本插值"></span></p>
<h2>四、函数</h2>
<h3>4.1 说明</h3>
<p>（1）函数必须在 Vue.js 中的 <strong>methods</strong> 属性下添加，类似于计算属性（computed）。</p>
<p>（2）在 Vue.js 中，methods 被命名为<strong>方法</strong>，是调用对象上下文中的函数，还可以操作对象中包含的数据。</p>
<p><span class="img-wrap"><img data-src="/img/bV9saa?w=621&amp;h=346" src="https://static.alili.tech/img/bV9saa?w=621&amp;h=346" alt="函数" title="函数"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9sal?w=321&amp;h=76" src="https://static.alili.tech/img/bV9sal?w=321&amp;h=76" alt="函数" title="函数"></span></p>
<h3>4.2 示例</h3>
<p>（1）上述示例，对象其实就是 Vue 实例，该对象中的 <strong>键</strong> 即方法名（fullName 也就是 methods 的方法名），其 <strong>值</strong> 为一个<strong>函数</strong>。</p>
<p>（2）怎样访问方法中的数据属性？</p>
<p>Vue 代理的数据和方法在上下文中都可用，所以 <strong>this.firstName</strong> 即访问 data 中的 firstName 属性。</p>
<p>（3）Vue 中的 <strong>data</strong> 和 <strong>methods</strong> 都是上下文中的变量，所以可以通过 <strong>this.firstName</strong> 的方式访问 data 中的 firstName 属性。</p>
<p>（4）使用 Vue 的 methods 时，当调用 methods 定义的方法时，一定记得加上<strong>小括号</strong> ()，不然输出的就是<strong>函数中的字符</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV9uGV?w=299&amp;h=71" src="https://static.alili.tech/img/bV9uGV?w=299&amp;h=71" alt="Example" title="Example"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9uHN?w=397&amp;h=104" src="https://static.alili.tech/img/bV9uHN?w=397&amp;h=104" alt="Example" title="Example"></span></p>
<h3>4.3 传参</h3>
<p>（1）Vue 中的 methods 能够添加参数，类似 JavaScript 中的函数传参数。</p>
<p><span class="img-wrap"><img data-src="/img/bV9uOc?w=457&amp;h=345" src="https://static.alili.tech/img/bV9uOc?w=457&amp;h=345" alt="Example" title="Example"></span></p>
<p>（2）参数使用不同的名称，防止和 data 对象的属性同名，造成一定的混淆，这样做只是为了证明不依赖数据中的属性。</p>
<p>（3）在模板中，只需使用数据对象中的适当属性名作为 fullName 的参数传递给方法即可。</p>
<p><span class="img-wrap"><img data-src="/img/bV9uPC?w=519&amp;h=69" src="https://static.alili.tech/img/bV9uPC?w=519&amp;h=69" alt="Example" title="Example"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9rSp?w=286&amp;h=111" src="https://static.alili.tech/img/bV9rSp?w=286&amp;h=111" alt="文本插值" title="文本插值"></span></p>
<p>（4）除此之外，还可以和 JavaScript 的函数调用一样，传一些 <strong>不在</strong> data 中的属性做为参数，也能够输出在页面上。</p>
<p><span class="img-wrap"><img data-src="/img/bV9uUv?w=531&amp;h=73" src="https://static.alili.tech/img/bV9uUv?w=531&amp;h=73" alt="Example" title="Example"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9uU5?w=397&amp;h=104" src="https://static.alili.tech/img/bV9uU5?w=397&amp;h=104" alt="Example" title="Example"></span></p>
<p><a href="https://github.com/WEBING123/blog" rel="nofollow noreferrer">更多系列文章在GitHub地址</a></p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>
<p>参考文章 <a href="https://www.w3cplus.com/vue/working-with-methods-in-vue.html" rel="nofollow noreferrer">Vue 2.0的学习笔记：Vue的Methods</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js入门教程-methods

## 原文链接
[https://segmentfault.com/a/1190000014623142](https://segmentfault.com/a/1190000014623142)


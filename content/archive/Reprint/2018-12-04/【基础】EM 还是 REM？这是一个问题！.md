---
title: '【基础】EM 还是 REM？这是一个问题！' 
date: 2018-12-04 2:30:05
hidden: true
slug: rz5pm3bb2y
categories: [reprint]
---

{{< raw >}}

                    
<h2>简言</h2>
<p>应用象<code>EM</code> 和 <code>REM</code>这种相对长度单位进行页面排版是WEB开发中的最佳实践。在页面排版中较好应用<code>EM</code> 和 <code>REM</code>，根据设备尺寸缩放显示元素的大小。这就使得组件在不同设备上都达到最佳的显示效果成为可能。</p>
<p>但问题是究竟该用 <code>EM</code> 还是 <code>REM</code> 呢？关于这个问题一直存在比较大的争议。本文将会给大家介绍究竟什么是 <code>EM</code> 和 <code>REM</code> 和如何进行两者的选择，以及结合两者优势构建模块化的WEB组件。</p>
<p>注：本文内容简单，只面向初级开发人员，约2500字，阅读时间5分钟。</p>
<h2>1 什么是EM？</h2>
<p><code>em</code> 是相对长度单位。它相对于当前元素字体尺寸，即<code>font-size</code>。举例来说，如果当前元素的字体是20px，那么当前元素中的1em就等于20px。</p>
<pre><code class="css">h1 { font-size: 20px } /* 1em = 20px */
p { font-size: 16px } /* 1em = 16px */</code></pre>
<p>实际开发中，用相对长度单位（如 <code>em</code>）表示字体大小是WEB开发中的最佳实践。</p>
<p>考虑下面的代码：</p>
<pre><code class="css">h1 { font-size: 2em } </code></pre>
<p>这里的h1元素字体大小究竟是多少呢？</p>
<p>这时，我们需要根据<code>&lt;h1&gt;</code>父元素字体的大小，来计算<code>&lt;h1&gt;</code>字体的尺寸大小。如果父元素是<code>&lt;html&gt;</code>，而且<code>&lt;html&gt;</code>的字体大小是16px。就可以计算出<code>&lt;h1&gt;</code>的字体大小是32px，即2*16px。</p>
<p>用代码表示如下：</p>
<pre><code class="css">html { font-size: 16px }
h1 { font-size: 2em } /* 16px * 2 = 32px */</code></pre>
<p>设置<code>&lt;html&gt;</code>字体的大小一般来说都不是一个好主意，因为这样重写了用户浏览器的默认设置。相反，可以使用百分比值或者根本不声明<code>&lt;html&gt;</code>字体大小。</p>
<pre><code class="css">html { font-size: 100% } /* 缺省 16px */</code></pre>
<p>对于大多数用户或浏览器，字体缺省大小是16px（未做浏览器缺省字体尺寸设置）。</p>
<p><code>em</code> 还能用来指定除字体大小外的其它属性，象<code>margin</code>或<code>padding</code>等属性都可以用<code>em</code>来表示。</p>
<p>考虑下面的代码， 对于<code>&lt;h1&gt;</code>和<code>&lt;p&gt;</code>元素，<code>margin-bottom</code>值应该是多少？ （假设<code>&lt;html&gt;</code>的字号被设置为100％）。</p>
<pre><code class="css">h1 {
  font-size: 2em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 32px */
}
p {
  font-size: 1em; /* 1em = 16px */
  margin-bottom: 1em; /* 1em = 16px */
}</code></pre>
<p>上述<code>&lt;h1&gt;</code>和<code>&lt;p&gt;</code>的margin-bottom都是1em，但是外边距结果值却不相同。上述现象的出现，是因为<code>em</code>是相对于当前元素字体的大小。由于<code>&lt;h1&gt;</code>中的字体大小现在设置为2em， 因此<code>&lt;h1&gt;</code>中其它属性的1em值就是 <code>1em = 32px</code>。这里比较容易引起误解的地方。</p>
<h2>2 什么是REM？</h2>
<p><code>rem</code>表示 root em，它是相对于根元素的长度单位。这里根元素就是<code>&lt;html&gt;</code>中定义的字体大小。这意味着任何地方的1rem总是等于<code>&lt;html&gt;</code>中定义的字体大小。</p>
<p>利用上述相同的代码，我们用 <code>rem</code> 来代替 <code>em</code>，查看<code>margin-bottom</code>的计算值究竟是多少？</p>
<pre><code class="css">h1 {
  font-size: 2rem;
  margin-bottom: 1rem; /* 1rem = 16px */
}
p {
  font-size: 1rem;
  margin-bottom: 1rem; /* 1rem = 16px */
}</code></pre>
<p>如上述代码所示，1rem总是等于16px（除非变更了<code>&lt;html&gt;</code>字体的大小）。<code>rem</code>的大小相较于<code>em</code>来说意义更直接明确，也很容易理解。</p>
<h2>3 REM 还是 EM?</h2>
<p>在项目开发中究竟是选用 <code>rem</code> 还是 <code>em</code> 一直以来争议不断。一些开发人员不使用<code>rem</code>，因为<code>rem</code>使组件不那么模块化。而另一些开发人员喜欢<code>rem</code>的简单性，使用<code>rem</code>处理所有元素。</p>
<p>其实 <code>em</code>和<code>rem</code>都有各自的优势和劣势，在实际项目开发中，应该结合使用两者，利用各自的优势，从而实现较好代码质量和显示效果。</p>
<p>那么在具体的应用中如何在两者中做选择呢？有两条简单的指导原则：</p>
<ul>
<li>如果属性尺寸要根据元素字体进行缩放，则使用<code>em</code>
</li>
<li>其它情况下都使用<code>rem</code>
</li>
</ul>
<p>上述规则太简单了。 为了更好的理解上述规则，我们就以一个简单的header组件为例，说明单独使用两者来实现组件遇到的问题，并体会结合使用两者所带来的优势。</p>
<h3>3.1 只使用REM</h3>
<p>这里我们只使用<code>rem</code>来编写一个header组件，代码及运行结果如下：</p>
<pre><code class="css">.header {
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  background: #7F7CFF;
}</code></pre>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201804/vflxtnbo.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201804/vflxtnbo.jpg" alt="用rem实现header测试图1" title="用rem实现header测试图1"></span></p>
<p>接下来，网站需要一个尺寸更大的header组件。</p>
<p>变更CSS代码如下：</p>
<pre><code class="css">.header {
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  background: #7F7CFF;
}
.header-large {
  font-size: 2rem;
}</code></pre>
<p>运行结果如下：</p>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201804/ankqvsqx.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201804/ankqvsqx.jpg" alt="用rem实现header测试图2" title="用rem实现header测试图2"></span></p>
<p>从上述运行结果可以看出，文字的内边距（<code>padding</code>）过小，显示效果不协调。如果我们坚持只使用<code>rem</code>，只能变更css代码如下：</p>
<pre><code class="css">.header {
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  background: #7F7CFF;
}
.header-large {
  font-size: 2rem;
  padding: 1rem 1.5rem;
}</code></pre>
<p>变更后运行结果如下：</p>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201804/dx2qu0aa.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201804/dx2qu0aa.jpg" alt="用rem实现header测试图3" title="用rem实现header测试图3"></span></p>
<p>上述代码及运行结果，虽然达到了预期的显示效果，但却违背了代码复用的原则。如果网站有多种尺寸的.header样式，就要多次重复的定义内边距。重复的代码增加了项目复杂度，降低了可维护性。</p>
<p>这时可以利用<code>em</code>可以变更上述代码如下：</p>
<pre><code class="css">.header {
  font-size: 1rem;
  padding: 0.5em 0.75em;
  background: #7F7CFF;
}
.header-large {
  font-size: 2rem;
}</code></pre>
<p>运行结果请查看演示程序：</p>
<p><a href="http://www.42du.cn/run/119" rel="nofollow noreferrer">演示代码</a></p>
<p>如上述演示程序所示，当元素属性值的大小需要根据元素字体尺寸缩放时，就应该应用 <code>em</code> 来定义属性尺寸。这就是前述规则中的第一条规则。</p>
<h3>3.2 只使用EM</h3>
<p>如果只使用<code>em</code>来定义上述组件，结果会怎样呢？</p>
<p>我们变更上述代码如下（<code>em</code>替换<code>rem</code>）：</p>
<pre><code class="css">.header {
  font-size: 1em;
  padding: 0.5em 0.75em;
  background: #7F7CFF;
}
.header-large {
  font-size: 2em;
}</code></pre>
<p>为更接近实际，我们引入了<code>&lt;p&gt;</code>元素，并变更<code>html</code>代码如下：</p>
<pre><code class="html">&lt;div class="header header-large"&gt;名人名言&lt;/div&gt;
&lt;p&gt;简单是稳定的前提&lt;/p&gt;
&lt;div class="header"&gt;名人名言&lt;/div&gt;
&lt;p&gt;简单是稳定的前提&lt;/p&gt;</code></pre>
<p>增加p元素css代码如下：</p>
<pre><code class="css">p {
    padding: 0.5em 0.75em;
}</code></pre>
<p>运行结果如下：</p>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201804/z3jtb3eh.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201804/z3jtb3eh.jpg" alt="用em实现header测试图1" title="用em实现header测试图1"></span></p>
<p>从上述运行经果中，不难看出<code>.header-large</code>部分的标题并没有和文本左对齐。而如果只使用<code>em</code>实现左对齐，则需要变更CSS代码如下：</p>
<pre><code class="css">.header {
  font-size: 1em;
  padding: 0.5em 0.75em;
  background: #7F7CFF;
}
.header-large {
  font-size: 2em;
  padding-left: 0.375em;
  padding-right: 0.375em;
}</code></pre>
<p>变更后运行结果如下：</p>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201804/ttawu1cc.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201804/ttawu1cc.jpg" alt="用em实现header测试图2" title="用em实现header测试图2"></span></p>
<p>上述代码及运行结果，虽然达到了预期的显示效果，但却违背了代码复用的原则。如果网站有多种尺寸的.header样式，就要多次重复的定义左右边距。重复的代码增加了项目复杂度，降低了可维护性。</p>
<p>解决上述问题的办法是结合使用<code>em</code>和<code>rem</code>，即使用<code>em</code>定义上下边距，使用<code>rem</code>定义左右边距。变更后代码如下：</p>
<pre><code class="css">.header {
  padding: 0.5em 0.75rem;
  font-size: 1em;
  background: #7F7CFF;
}

.header-large {
  font-size: 2em;
}</code></pre>
<p>运行结果请查看演示程序：</p>
<p><a href="http://www.42du.cn/run/120" rel="nofollow noreferrer">演示代码</a></p>
<h3>3.3 EM还是REM总结</h3>
<p>究竟是该使用<code>em</code>还是<code>rem</code>呢？答案应该是结合使用<code>em</code>和<code>rem</code>。当属性值的大小需要根据当前元素字体尺寸缩放时，就选用<code>em</code>，其它的情况都使用更简单的<code>rem</code>。</p>
<h2>4 em及rem值的设定</h2>
<p><code>em</code>和<code>rem</code> 属性值都要经过计算转化成绝过长度单位。常用的字体尺寸用相对长度单位表示会很困难。看下面常用字体值的<code>rem</code>表示（基本字体尺寸是16px）：</p>
<ul>
<li>10px = 0.625rem</li>
<li>12px = 0.75rem</li>
<li>14px = 0.875rem</li>
<li>16px = 1rem (base)</li>
<li>18px = 1.125rem</li>
<li>20px = 1.25rem</li>
<li>24px = 1.5rem</li>
<li>30px = 1.875rem</li>
<li>32px = 2rem</li>
</ul>
<p>如上述列表所示，上述尺寸值的表示及计算都不分的不便。为了解决上述问题要用到一个小技巧，即著名的 "62.5%"技术。具体请查看下述代码：</p>
<pre><code class="css">body { font-size:62.5%; }  /* =10px */
h1   { font-size: 2.4em; } /* =24px */
p    { font-size: 1.4em; } /* =14px */</code></pre>
<p>通过62.5%的设定，就可以很容易用<code>em</code>来定义具体属性的尺寸了（10倍的关系）。</p>
<p>而<code>rem</code>，则需要采用如下的方式：</p>
<pre><code class="css">html { font-size: 62.5%; }  /* =10px */
body { font-size: 1.4rem; } /* =14px */
h1   { font-size: 2.4rem; } /* =24px */</code></pre>
<h2>5 响应式例子</h2>
<p>一个简单的响应式的例子，调整浏览器宽度查看演示效果。</p>
<p><a href="http://www.42du.cn/run/121" rel="nofollow noreferrer">演示代码</a></p>
<h2>6 参考资料</h2>
<ol>
<li><a href="https://www.w3.org/TR/css-values-3/" rel="nofollow noreferrer">W3C:CSS Values and Units Module Level 3</a></li>
<li><a href="https://zellwk.com/blog/rem-vs-em/" rel="nofollow noreferrer">zellwk:REM vs EM – The Great Debate</a></li>
<li><a href="https://www.sitepoint.com/understanding-and-using-rem-units-in-css/" rel="nofollow noreferrer">sitepoint:Understanding and Using rem Units in CSS</a></li>
<li><a href="https://webdesign.tutsplus.com/tutorials/comprehensive-guide-when-to-use-em-vs-rem--cms-23984" rel="nofollow noreferrer">tutsplus:Comprehensive Guide: When to Use Em vs. Rem</a></li>
<li><a href="https://css-tricks.com/confused-rem-em/" rel="nofollow noreferrer">css-tricks:Confused About REM and EM? </a></li>
</ol>
<h2>7 说明</h2>
<p>文中所述文字及代码部分汇编于网络。因时间不足，能力有限等原因，存在文字阐述不准及代码测试不足等诸多问题。因此只限于学习范围，不适用于实际应用。另<code>em</code>和<code>rem</code>在较老的浏览器中存在兼容性问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【基础】EM 还是 REM？这是一个问题！

## 原文链接
[https://segmentfault.com/a/1190000014500582](https://segmentfault.com/a/1190000014500582)


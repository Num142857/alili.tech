---
title: '理解js的事件冒泡和事件捕获' 
date: 2018-12-04 2:30:05
hidden: true
slug: sjpc3g9cglo
categories: [reprint]
---

{{< raw >}}

                    
<h1>理解js的事件冒泡和事件捕获</h1>
<h3>定义</h3>
<p>冒泡：作用于子元素上的事件会一级一级向上传递，类似于冒泡的形式。<br>捕获：作用于父元素的事件会一级一级向下传递到最终的子元素。</p>
<h3>使用方法</h3>
<blockquote>文档请参考<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener" rel="nofollow noreferrer">addEventListener</a>，以及<a href="http://www.runoob.com/jsref/met-element-addeventlistener.html" rel="nofollow noreferrer">runnoob的addEventListener</a>
</blockquote>
<p>EventTarget.addEventListener()语法：</p>
<pre><code>element.addEventListener(event, function, useCapture)</code></pre>
<p>注意useCapture参数，他是一个boolean值，指定事件是否在捕获或冒泡阶段执行。默认为false，如果指定为true，表明在捕获阶段执行，指定为true，表明在冒泡阶段执行。</p>
<h3>案例参考</h3>
<p>先看如下代码：</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;test&lt;/title&gt;
    &lt;style&gt;
        #parent {
            height: 300px;
            background-color: #bcbcbc;
        }
        #son {
            margin-top: 100px;
            height: 100px;
            background-color: green;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="parent"&gt;
    我是父亲
    &lt;div id="son"&gt;我是儿子&lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    function handler(event) {
        console.log('target: ', event.target);
        console.log('curtrentTarget: ', event.currentTarget);
    }
    let pa = document.getElementById('parent');
    pa.addEventListener('click', handler, false);
    let son = document.getElementById('son');
    son.addEventListener('click', handler, false);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>使用浏览器运行这段代码，效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000014553865?w=523&amp;h=305" src="https://static.alili.tech/img/remote/1460000014553865?w=523&amp;h=305" alt="p1" title="p1"></span></p>
<p>我们点击儿子div，控制台打印如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000014553866?w=389&amp;h=178" src="https://static.alili.tech/img/remote/1460000014553866?w=389&amp;h=178" alt="p2" title="p2"></span></p>
<p>可以看到第一次打印的target和currentTarget都是son，而第二次事件冒泡到了parent，此时target是son，currentTarget变成了parent。</p>
<h4>事件捕获</h4>
<p>我们把代码中的useCapture改为true：</p>
<pre><code>let pa = document.getElementById('parent');
pa.addEventListener('click', handler, true);
let son = document.getElementById('son');
son.addEventListener('click', handler, true);</code></pre>
<p>然后再次运行，结果如图：<br><span class="img-wrap"><img data-src="/img/remote/1460000014553867?w=365&amp;h=191" src="https://static.alili.tech/img/remote/1460000014553867?w=365&amp;h=191" alt="" title=""></span></p>
<p>此时事件实在捕获阶段执行，也就是说会先触发parent的click事件。</p>
<h3>target和currentTarget的区别</h3>
<p>仔细看前面的打印信息就知道了，target始终不变，它代表触发事件的那个元素（不管是冒泡阶段还是捕获阶段都是指最底层的元素（这里指son）。而currentTarget则表示当前阶段注册了EventListener的元素。</p>
<h3>如何阻止冒泡和捕获阶段事件的进一步传播</h3>
<blockquote>文档参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation" rel="nofollow noreferrer">event.stopPropagation</a>
</blockquote>
<p>API用法：</p>
<pre><code>event.stopPropagation()</code></pre>
<p>修改我们的代码，在handler中加入event.stopPropagation()：</p>
<pre><code>    function handler(event) {
        console.log('target: ', event.target);
        console.log('curtrentTarget: ', event.currentTarget);
        event.stopPropagation();
    }</code></pre>
<p>再次运行，点击儿子div，打印出来的日志如下（冒泡阶段）：<br><span class="img-wrap"><img data-src="/img/bV9luI?w=375&amp;h=120" src="https://static.alili.tech/img/bV9luI?w=375&amp;h=120" alt="图片描述" title="图片描述"></span></p>
<p>捕获阶段打印日志：<br><span class="img-wrap"><img data-src="/img/bV9lzU?w=357&amp;h=152" src="https://static.alili.tech/img/bV9lzU?w=357&amp;h=152" alt="图片描述" title="图片描述"></span></p>
<p>可以看到，冒泡阶段，点击事件没有继续向上传播到父元素；捕获阶段，点击事件没有继续向下传播到子元素。</p>
<blockquote>P.S. 请考虑下在handler方法中，this到底指向target还是currentTarget呢？</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解js的事件冒泡和事件捕获

## 原文链接
[https://segmentfault.com/a/1190000014553860](https://segmentfault.com/a/1190000014553860)


---
title: '【前端工程师手册】JavaScript之闭包' 
date: 2018-12-01 2:30:12
hidden: true
slug: d2ecfx0jwqn
categories: [reprint]
---

{{< raw >}}

                    
<p>闭包确实是一个说烂了的概念，校招社招都会被问到，今天总结一番。<br>先下定义，<strong>闭包是函数和该函数的词法作用域的组合</strong>。其实这个定义是比较教条的，可以直白的理解为闭包是一个函数，且这个函数使用了既没在它内部声明且不是它的参数的变量。<br>举个栗子，</p>
<pre><code>function foo() { 
    var a = 2;
    function bar() { 
        console.log( a );
    }
    return bar; 
}
var baz = foo();
baz(); // 2</code></pre>
<p>按照常理，foo函数在执行完毕之后会销毁掉其内部的变量a，但是bar函数内部保持着对a的引用，所以通过调用foo()把bar的引用赋给了baz，运行baz()依然可以打印出a。在这个栗子里，函数bar以及它对变量a的引用就构成了闭包。</p>
<h2>闭包和作用域</h2>
<p>对于闭包和作用域的关系，我的理解是<strong>闭包其实就是作用域的延伸</strong>。<br>由于在JavaScript中函数内部可以使用函数外部的变量，所有有时候会不知不觉的产生闭包，假如在上面那个代码片段中，不允许函数内部使用函数外部的变量，闭包也就无从谈起了。</p>
<h2>闭包有什么用？</h2>
<p><strong>模拟私有变量和私有方法</strong></p>
<pre><code>var Dog = (function(){
    var privateVal = 'dog'
    function doing(val) {
        console.log(privateVal + ' ' + val)
    }

    return {
        run: function(){
            doing('run')
        },
        bark: function(){
            doing('bark')
        }
    }
})()

Dog.run()    // dog run
Dog.bark()   //  dog bark</code></pre>
<p>可以看到的是，run和bark这两个闭包分享了同一个词法作用域，且都引用了私有方法doing。这样，我们就可以只向外暴露run和bark两个公共接口而隐藏私有的变量和方法。</p>
<h2>闭包与循环</h2>
<p>或许这是面试中出现最多的问题...</p>
<pre><code>for(var i = 1;i &lt;= 5;i++) {
    setTimeout(function() {
        console.log(i)
    }, i*1000)
}
// 每隔一秒打印一个6，共打印5次</code></pre>
<p>为什么事与愿违，而不是按照我们所想的依次的间隔1秒打印出1，2，3，4，5呢？首先，这段循环产生了5个<strong>闭包</strong>，而且最重要的是这5个闭包都处在同一个作用域中，也就是说它们引用的是同一个i，当for循环结束时，i变成了6。所以，5个匿名函数执行时会依次的去打印那同一个i，所以就打印出了5个6。<br>如何解决？<br>之前也说了让这5个闭包处于不同的作用域且让它们在各自的作用域中拥有它们各自的i即可。<br>可以使用自执行函数来创建一个新的作用域</p>
<pre><code>for(var i = 1;i &lt;= 5;i++) {
    (function(k){
        setTimeout(function() {
        console.log(k)
    }, k*1000)
    })(i)
}</code></pre>
<p>在这个代码片段中，每一个setTimeout都处于一个独立的作用域中，且都引用了它们各自的k，并不是指向了外层作用域的i，所以就会打印出1，2，3，4，5<br>也可以使用let</p>
<pre><code>for(let i = 1;i &lt;= 5;i++) {
    setTimeout(function() {
        console.log(i)
    }, i*1000)
}</code></pre>
<p>for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。<br>其实使用let的本质是</p>
<pre><code>for(let i = 1;i &lt;= 5;i++) {
    let i = 上次迭代结束的i
    setTimeout(function() {
        console.log(i)
    }, i*1000)
}</code></pre>
<p>其实闭包就这么多东西，而且主要是作用域的概念，作用域明白了，闭包也就明白了。<br>that's all, thank you.</p>
<p>参考资料<br><a href="http://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html" rel="nofollow noreferrer">深入理解JavaScript系列-闭包</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures" rel="nofollow noreferrer">MDN-闭包</a><br><a href="https://book.douban.com/subject/26351021/" rel="nofollow noreferrer">《你不知道的JavaScript-上卷》</a><br><a href="https://zhuanlan.zhihu.com/p/22486908" rel="nofollow noreferrer">「每日一题」JS 中的闭包是什么？</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】JavaScript之闭包

## 原文链接
[https://segmentfault.com/a/1190000014836484](https://segmentfault.com/a/1190000014836484)


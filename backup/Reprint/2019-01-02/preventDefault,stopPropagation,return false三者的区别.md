---
title: 'preventDefault,stopPropagation,return false三者的区别' 
date: 2019-01-02 2:30:09
hidden: true
slug: s94wuu48mk
categories: [reprint]
---

{{< raw >}}

                    
<p>逛帖子的时候看到道友发的前端面试题，</p>
<blockquote><p>preventDefault(), stopPropagation(), return false三者的区别</p></blockquote>
<p>这三者的使用想必大家并不陌生，但是细想之下还是有可究之处。</p>
<h3 id="articleHeader0">preventDefault()</h3>
<p>阻止元素在浏览器中的默认行为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a id=&quot;link&quot; href=&quot;http://wuliv.com&quot;>网站</a>
$('#link').click(function(event){
    event.preventDefault(); // 阻止了a链接href的访问或跳转
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;<span class="hljs-keyword">a</span> id=<span class="hljs-string">"link"</span> href=<span class="hljs-string">"http://wuliv.com"</span>&gt;网站&lt;/<span class="hljs-keyword">a</span>&gt;
$(<span class="hljs-string">'#link'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">event</span>){</span>
    event.preventDefault();<span class="hljs-comment"> // 阻止了a链接href的访问或跳转</span>
})</code></pre>
<h3 id="articleHeader1">stopPropagation()</h3>
<p>事件冒泡：当一个元素上的事件被触发时，比如鼠标点击了一个按钮，同样的事件将会在该按钮元素的所有父级／祖先元素上触发。这一个过程就被称为事件冒泡。它是由子级元素先触发，父级元素后触发，由内而外（由下往上）的一个流程。与之顺序相反的是事件捕获。</p>
<blockquote><p>事件捕获：父级元素先触发，子级元素后触发，在此仅做了解。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div id=&quot;inner&quot;>
    <p>事件冒泡例子</p>
    <button id=&quot;btn&quot;>我要弹个框</button>
  </div>
</div>

$('#btn').click(function(event){
  event.stopPropagation(); // 阻止了事件冒泡，不会触发&quot;#inner, body&quot;的点击事件  
  console.log('#btn')
})

$('#inner').click(function(event){
    // #btn 阻止了冒泡，这里不会执行
    // 如果不使用stopPropagation, 当#btn点击时，这里也会执行
    console.log('#inner')
})

$('body').click(function(event){
    // #btn 阻止了冒泡，.btn点击不会影响到我
    // 如果不使用stopPropagation, 当#btn点击时，这里也会执行
    console.log('body')
})

// 使用了stopPropagation()输出
'#btn'

// 不使用stopPropagation()输出
'#btn'
'#inner'
'body'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;body&gt;
  &lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"inner"</span>&gt;
    &lt;p&gt;事件冒泡例子&lt;/p&gt;
    &lt;button id=<span class="hljs-string">"btn"</span>&gt;我要弹个框&lt;/button&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

$(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">event</span>){</span>
  event.stopPropagation();<span class="hljs-comment"> // 阻止了事件冒泡，不会触发"#inner, body"的点击事件  </span>
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'#btn'</span>)
})

$(<span class="hljs-string">'#inner'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">event</span>){</span>
   <span class="hljs-comment"> // #btn 阻止了冒泡，这里不会执行</span>
   <span class="hljs-comment"> // 如果不使用stopPropagation, 当#btn点击时，这里也会执行</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'#inner'</span>)
})

$(<span class="hljs-string">'body'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-title">event</span>){</span>
   <span class="hljs-comment"> // #btn 阻止了冒泡，.btn点击不会影响到我</span>
   <span class="hljs-comment"> // 如果不使用stopPropagation, 当#btn点击时，这里也会执行</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'body'</span>)
})
<span class="hljs-comment">
// 使用了stopPropagation()输出</span>
<span class="hljs-string">'#btn'</span>
<span class="hljs-comment">
// 不使用stopPropagation()输出</span>
<span class="hljs-string">'#btn'</span>
<span class="hljs-string">'#inner'</span>
<span class="hljs-string">'body'</span></code></pre>
<h3 id="articleHeader2">stopImmediatePropagation()</h3>
<p>阻止对象绑定的剩余的事件处理函数方法的执行，并阻止当前事件的冒泡。  <br>可以理解为stopImmediatePropagation是stopPropagation的升级版，除了阻止冒泡，还能阻止结束掉当前对象未执行的其它绑定事件方法。</p>
<blockquote><p>jQuery中一个对象可以绑定多个事件方法，执行顺序会按照绑定的先后顺序来执行</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div id=&quot;inner&quot;>
        <p>stopImmediatePropagation()例子</p>
        <button id=&quot;btn&quot;>按钮</btn>
    </div>
</body>

$('body').click(function(event){
    // body 点击
    console.log('body');
});

$('#inner').click(function(event){
    // #inner 点击
    console.log('#inner');
})

$('#btn').click(function(event){
    // 第一个#btn点击
    e.stopImmediatePropagation();
    console.log('#btn 1');
})

$('#btn').click(function(event){
    // 第二个#btn点击
    console.log('#btn 2')
})

// 最终输出
'#btn 1' // (因为stopImmediatePropagation阻止了#btn绑定的剩余未执行的事件方法，并且阻止了冒泡)

// 如果不使用stopImmediatePropagation， 将输出
'#btn 1'
'#btn 2'
'#inner'
'body'
同个对象执行顺序按绑定顺序执行，冒泡则由内向外执行
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>&lt;body&gt;
    &lt;div id=<span class="hljs-string">"inner"</span>&gt;
        &lt;p&gt;stopImmediatePropagation()例子&lt;/p&gt;
        &lt;button id=<span class="hljs-string">"btn"</span>&gt;按钮&lt;/btn&gt;
    &lt;/div&gt;
&lt;/body&gt;

$(<span class="hljs-string">'body'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span>{</span>
    <span class="hljs-comment">// body 点击</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'body'</span>);
});

$(<span class="hljs-string">'#inner'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span>{</span>
    <span class="hljs-comment">// #inner 点击</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'#inner'</span>);
})

$(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span>{</span>
    <span class="hljs-comment">// 第一个#btn点击</span>
    e.stopImmediatePropagation();
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'#btn 1'</span>);
})

$(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span>{</span>
    <span class="hljs-comment">// 第二个#btn点击</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'#btn 2'</span>)
})

<span class="hljs-comment">// 最终输出</span>
<span class="hljs-string">'#btn 1'</span> <span class="hljs-comment">// (因为stopImmediatePropagation阻止了#btn绑定的剩余未执行的事件方法，并且阻止了冒泡)</span>

<span class="hljs-comment">// 如果不使用stopImmediatePropagation， 将输出</span>
<span class="hljs-string">'#btn 1'</span>
<span class="hljs-string">'#btn 2'</span>
<span class="hljs-string">'#inner'</span>
<span class="hljs-string">'body'</span>
同个对象执行顺序按绑定顺序执行，冒泡则由内向外执行
</code></pre>
<h3 id="articleHeader3">return false</h3>
<p>“return false” 相信不少同学会用来阻止元素在浏览器中的默认行为，<br>拿它当preventDefault()使用，但其实“return false”做的事情不仅仅只是阻止默认行为</p>
<p>当调用“return false”时，它执行了以下三件事情</p>
<blockquote><ol>
<li><p>event.preventDefault()</p></li>
<li><p>event.stopPropagation()</p></li>
<li><p>停止回调函数执行并立即返回</p></li>
</ol></blockquote>
<p>1，2点还好理解，那么第3点是怎么回事？<br>return语句会终止函数的执行并返回函数的值。所以不管是否返回false或是其它值，return语句后面的代码都不会执行。而返回false，使它具备了preventDefault和stropPropagation的功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a').click(function(){
    return false; // return false直接返回了，并不会执行alert
    alert('我没有被弹出来');
})

// preventDefault 和 stopPropagation 并不会阻止回调函数的执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'a'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; <span class="hljs-comment">// return false直接返回了，并不会执行alert</span>
    alert(<span class="hljs-string">'我没有被弹出来'</span>);
})

<span class="hljs-comment">// preventDefault 和 stopPropagation 并不会阻止回调函数的执行</span></code></pre>
<h3 id="articleHeader4">总结</h3>
<p>很多jQuery教程在代码演示中用“return false”来阻止执行浏览器的默认行为。  <br>久而久之，很多同学习惯滥用“return false”来代替preventDefault</p>
<p>大多数情况下，我们仅仅是想要它执行跟preventDefault的功能而已，但它却自作主张地帮你执行了另外两步操作。  <br>比较好的编程习惯是，需要用到该事件方法再去调用，否则应该避免冗余事件的执行。  <br>就像prevnetDefault完成它该有的工作，并不会阻止父节点继续处理事件，使得代码更加灵活，更易于维护。</p>
<p>日常开发中还是要慎用“return false”，除非你同时需要preventDefault和stopPropagation，并且确定你的回调函数执行完成后调用，那么你可以使用“return false”，否则还是用preventDefault 或 stopPropagation 更好些。</p>
<blockquote><p>作者：以乐之名<br>本文原创，有不当的地方欢迎指出。转载请指明出处。</p></blockquote>
<p>参考文章：<a href="http://www.cnblogs.com/dannyxie/p/5642727.html" rel="nofollow noreferrer" target="_blank">《preventDefault()、stopPropagation()、return false 之间的区别》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
preventDefault,stopPropagation,return false三者的区别

## 原文链接
[https://segmentfault.com/a/1190000010956284](https://segmentfault.com/a/1190000010956284)


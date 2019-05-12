---
title: 'JavaScript数据双向绑定的简单演示' 
date: 2019-02-12 2:30:12
hidden: true
slug: zafk2if4oy
categories: [reprint]
---

{{< raw >}}

                    
<p>对于前端，有时候需要实现视图层和数据层的双向绑定(two-way-binding), 例如当前流行的各种框架和类库:<em>Vue.js</em>、<em>Angular.js</em>、<em>React.js</em>。 然而，他们最原始的实现方式其实都相对比较简单，只不过是后来随着各种<em>Bug</em>的出现，才一如滚雪球般地被不断优化和壮大。</p>
<p>所以，不要畏惧，多多学习并摄取它们的精华。</p>
<p>这里, 我也希望通过简单的思路让你对数据的双向绑定有个大概了解，然后去看各种<em>MVVM</em>框架中对于数据双向绑定的实现才不会一头雾水。</p>
<h2 id="articleHeader0">先复习个知识点</h2>
<h3 id="articleHeader1">Nodes 和 Elements 的区别</h3>
<p><em>Element</em>继承了<em>Node</em>,而<em>Element</em>是众多<em>Node</em>类型中的其中一个, <em>nodeType === 1</em>, 所以,属于<em>Node</em>的属性可以用于<em>Element</em>，但<em>Element</em>的属性无法用于<em>Node</em>，听起来好拗口，看一下代码吧.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;demo&quot;>
  <p>大</p>
  <p>轰</p>        
</div>


var el = document.querySelector('.demo');

// true
console.log(el.children[0] instanceof Node);
// true
console.log(el.children[0] instanceof Element);

// true
console.log(el.childNodes[0] instanceof Node);
// false
console.log(el.childNodes[0] instanceof Element);

// undefined
console.log(typeof el.childNodes[0].children);
// object
console.log(typeof el.childNodes[0].childNodes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"demo"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>大<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  &lt;p&gt;轰&lt;<span class="hljs-regexp">/p&gt;        
&lt;/</span>div&gt;


<span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.demo'</span>);

<span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(el.children[<span class="hljs-number">0</span>] <span class="hljs-keyword">instanceof</span> Node);
<span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(el.children[<span class="hljs-number">0</span>] <span class="hljs-keyword">instanceof</span> Element);

<span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(el.childNodes[<span class="hljs-number">0</span>] <span class="hljs-keyword">instanceof</span> Node);
<span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(el.childNodes[<span class="hljs-number">0</span>] <span class="hljs-keyword">instanceof</span> Element);

<span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> el.childNodes[<span class="hljs-number">0</span>].children);
<span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> el.childNodes[<span class="hljs-number">0</span>].childNodes);</code></pre>
<h2 id="articleHeader2">什么是数据和视图的双向绑定？</h2>
<p>双向绑定对于理解<em>Flux</em>等架构所提倡的单向数据流特性有很好的帮助, 简单点说，就是将数据的变化绑定到UI, 同时UI的变化又和数据同步。这样一来，假如你是全站<em>Ajax</em>,你不用去管数据对UI的影响,同时也不用去管UI变化造成的数据变化,统一了数据操作的入口,非常方便维护。(不知道这样理解对不对, 望指正)</p>
<p>总而言之，双向数据绑定的底层实现大概有两种:</p>
<p>1、手动绑定,同时使用<em>dirty check</em>去循环监听。(<em>Angular.js</em>为代表)</p>
<p>2、前端数据劫持。(使用<em>defineProperty</em>, <em>Vue.js</em>貌似就是使用这种)</p>
<h3 id="articleHeader3">手动绑定 循环监听触发 （一）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这种方法的实现类似**订阅者模式**,实现思路是通过DOM的*keydown* *keyup* 
*keypress* *change*等事件触发*dirty check*(当然你也可以用setTimeout),
然后循环监听并将value写入某实例变量里面,同时更新DOM。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">这种方法的实现类似**订阅者模式**,实现思路是通过DOM的*keydown* *keyup* 
*keypress* *change*等事件触发*dirty check*(当然你也可以用setTimeout),
然后循环监听并将value写入某实例变量里面,同时更新DOM。</code></pre>
<p>若是有时间,推荐去看一下<em>Angular.js</em>文档中关于<em>digest</em> / <em>$watch</em>的介绍。</p>
<p><a href="http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day" rel="nofollow noreferrer" target="_blank">如果使用jQuery实现起来更加简单明了。</a><br><a href="http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day" rel="nofollow noreferrer" target="_blank">传送门在此</a></p>
<p><a href="https://jsfiddle.net/fondadam/sdxhhoLx/2/embedded/js,html,result" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/fondadam/sdxhhoLx/2/embedded/js,html,result</a><button class="btn btn-xs btn-default ml10 preview" data-url="fondadam/sdxhhoLx/2/embedded/js,html,result" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader4">前端数据劫持  (二)</h3>
<p>第三种方法则是<code>Vue.js</code>等框架使用的数据劫持方式。基本思路是使用<code>Object.defineProperty</code>对数据对象做属性get和set的监听，当有数据读取和赋值操作时则调用节点的指令，这样使用最通用的=等号赋值就可以触发了。</p>
<p><a href="https://jsfiddle.net/fondadam/a4qhp06s/embedded/js,html,result" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/fondadam/a4qhp06s/embedded/js,html,result</a><button class="btn btn-xs btn-default ml10 preview" data-url="fondadam/a4qhp06s/embedded/js,html,result" data-typeid="0">点击预览</button></p>
<h4>参考资料：</h4>
<p><a href="https://ouvens.github.io/frontend-javascript/2015/11/29/js-data-two-ways-binding.html" rel="nofollow noreferrer" target="_blank">javascript实现数据双向绑定的三种方式</a></p>
<p><a href="http://www.html-js.com/article/Study-of-twoway-data-binding-JavaScript-talk-about-JavaScript-every-day" rel="nofollow noreferrer" target="_blank">谈谈JavaScript中的双向数据绑定</a></p>
<p><a href="http://blog.csdn.net/vctisildur/article/details/46454755" rel="nofollow noreferrer" target="_blank"> 非常简单的js双向数据绑定框架（三）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript数据双向绑定的简单演示

## 原文链接
[https://segmentfault.com/a/1190000004681757](https://segmentfault.com/a/1190000004681757)


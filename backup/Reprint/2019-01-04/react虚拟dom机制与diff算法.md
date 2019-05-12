---
title: 'react虚拟dom机制与diff算法' 
date: 2019-01-04 2:30:11
hidden: true
slug: dznv6a9ewcj
categories: [reprint]
---

{{< raw >}}

                    
<p>React的一个突出特点是拥有极速地渲染性能。该功能依靠的就是facebook研发团队弄出的虚拟dom机制以及其独特的diff算法。下面简单解释一下react虚拟dom机制和diff算法的实现思想：</p>
<p>要讲虚拟dom机制必须提到一个概念——虚拟dom树，这是react在真实dom树基础上建立的一个抽象的树，应用、虚拟dom与真实dom的关系如下图显示：</p>
<p><span class="img-wrap"><img data-src="/img/bVSLNQ?w=639&amp;h=103" src="https://static.alili.tech/img/bVSLNQ?w=639&amp;h=103" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而标准的dom机制如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVSLOg?w=392&amp;h=95" src="https://static.alili.tech/img/bVSLOg?w=392&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对比两个图就可以发现标准dom机制下，用户在应用上的操作是直接对真实dom进行操作的，而在react应用中，用户在应用中对dom的操作其实是对虚拟dom的操作，用户的操作产生的数据改变或者state变量改变（此处的改变具体的讲就是事件函数对dom的操作）都会保存到虚拟dom上，之后再批量的对这些更改进行diff算法计算，对比操作前后的虚拟dom树，把更改后的变化再同步到真实dom上。举个例子：<br>标准dom机制下对某一节点在事件函数中做如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var A=document.getElementById('test');
 A.style.backgroundColor = &quot;black&quot;;
 A.style.backgroundColor = &quot;red&quot;;
 A.style.backgroundColor = &quot;black&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code> var A=document.getElementById(<span class="hljs-string">'test'</span>)<span class="hljs-comment">;</span>
 A.style.<span class="hljs-keyword">backgroundColor </span>= <span class="hljs-string">"black"</span><span class="hljs-comment">;</span>
 A.style.<span class="hljs-keyword">backgroundColor </span>= <span class="hljs-string">"red"</span><span class="hljs-comment">;</span>
 A.style.<span class="hljs-keyword">backgroundColor </span>= <span class="hljs-string">"black"</span><span class="hljs-comment">;</span></code></pre>
<p>如上所示，在标准dom机制下，会对A节点进行三次的dom操作。<br>而在react应用的事件函数中进行如上操作时，同样会在虚拟dom上进行三次dom的操作，但在真实dom中，它只会执行一次dom操作，即A.style.backgroundColor = "black";因为在react虚拟dom机制中，它会把所有的操作都会合并，只会对比刚开始的状态和最后操作的状态，两者中找出不同再同步到真实dom中，这就大大减少了真实dom的操作，而众所周知，dom操作是很耗性能的，这是react能做到极速渲染的原因之一。</p>
<p>另外一个原因就是react独特的diff算法，同样给出标准diff算法和react diff算法的描述，对比了就会明白了：<br>首先讲一下diff算法的处理方法，对操作前后的dom树同一层的节点进行对比，一层一层对比，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVSLSc?w=576&amp;h=318" src="https://static.alili.tech/img/bVSLSc?w=576&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在标准dom机制下：在同一位置对比前后的dom节点，发现节点改变了，会继续比较该节点的子节点，一层层对比，找到不同的节点，然后更新节点。</p>
<p>在react的diff算法下，在同一位置对比前后dom节点,只要发现不同，就会删除操作前的domm节点（包括其子节点），替换为操作后的dom节点。</p>
<p>对比两种diff算法，大家可以发现，react的diff算法下，当dom节点更改时，会大大减少dom树的节点遍历，这也是其另外一个可以实现极速渲染的一个原因。</p>
<p>欢迎朋友们交流！嗷呜~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react虚拟dom机制与diff算法

## 原文链接
[https://segmentfault.com/a/1190000010631446](https://segmentfault.com/a/1190000010631446)


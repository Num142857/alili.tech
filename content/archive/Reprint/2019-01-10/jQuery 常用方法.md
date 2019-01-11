---
title: 'jQuery 常用方法' 
date: 2019-01-10 2:30:08
hidden: true
slug: 2lpkgp6wmu8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">jQuery</h1>
<h3 id="articleHeader1">eq()和get()</h3>
<ul>
<li><p>get(): jQuery对象转DOM对象。</p></li>
<li><p>eq(): jQuery对象构建新的jQuery对象。 <code>$(selector).eq( 0 )</code></p></li>
</ul>
<h3 id="articleHeader2">查找元素</h3>
<ul>
<li><p>filter(selector) 缩小匹配的范围，初始的jQuery对象集合中筛选<code>$("p").filter(".selected, :first")</code></p></li>
<li><p>find(selector) 不会有初始集合中的内容</p></li>
<li><p>end()方法 在jquery命令链内调用，以便退回到前一个包装集。</p></li>
<li><p>contents()</p></li>
<li><p>parent(selector) 找父亲节点，可以传入expr进行过滤，比如$("span").parent()或者$("span").parent(".class")</p></li>
<li><p>parents(selector) 类似于.parent(expr),但是是查找所有祖先元素，不限于父元素</p></li>
<li><p>closest(selector) 获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上</p></li>
<li><p>children(expr) 返回所有子节点，这个方法只会返回直接的孩子节点，不会返回所有的子孙节点</p></li>
<li><p>prev() 返回上一个兄弟节点，不是所有的兄弟节点</p></li>
<li><p>prevAll() 返回所有之前的兄弟节点</p></li>
<li><p>next() 返回下一个兄弟节点，不是所有的兄弟节点</p></li>
<li><p>nextAll() 返回所有之后的兄弟节点</p></li>
<li><p>siblings() 返回兄弟姐妹节点</p></li>
</ul>
<h3 id="articleHeader3">样式 &amp; 属性</h3>
<ul>
<li><p>addClass() &amp; removeClass() 添加 &amp; 移除 类名称</p></li>
<li><p>toggleClass() 类名称不存在，则添加指定类名称；如果元素已经拥有指定类名称，则从元素中删除指定类名称。</p></li>
<li><p>css(name,value) 指定的css样式属性</p></li>
<li><p>attr() 返回 attributes 的值</p></li>
<li><p>prop() 返回 property 的值</p></li>
</ul>
<h3 id="articleHeader4">事件</h3>
<ul>
<li>
<p>event 属性</p>
<ul>
<li><p>event.pageX    相对于文档左边缘的鼠标位置。</p></li>
<li><p>event.pageY    相对于文档上边缘的鼠标位置。</p></li>
<li><p>event.preventDefault()    阻止事件的默认动作。</p></li>
<li><p>event.target    触发该事件的 DOM 元素。</p></li>
<li><p>event.type    描述事件的类型。</p></li>
</ul>
</li>
<li><p>bind(eventName, cb) 可以自定义事件</p></li>
<li><p>unbind() 从匹配元素移除一个被添加的事件处理器</p></li>
<li><p>on(event,childSelector,data,function,map) 添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）</p></li>
<li><p>off() 方法</p></li>
<li><p>one() 添加只运行一次的事件然后移除</p></li>
<li><p>trigger(eventName, param1, param2, ...) param可选，传递到事件处理程序的额外参数, 额外的参数对自定义事件特别有用。</p></li>
</ul>
<h3 id="articleHeader5">插入元素</h3>
<ul>
<li><p>insertAfter() &amp; after()：在现存元素的外部，从后面插入元素</p></li>
<li><p>insertBefore() &amp; before()：在现存元素的外部，从前面插入元素</p></li>
<li><p>appendTo() &amp; append()：在现存元素的内部，从后面插入元素</p></li>
<li><p>prependTo() &amp; prepend()：在现存元素的内部，从前面插入元素</p></li>
</ul>
<h3 id="articleHeader6">遍历</h3>
<ul>
<li><p>each() each返回的是原来的数组，并不会新创建一个数组。</p></li>
<li><p>map() 而map方法会返回一个新的数组。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 常用方法

## 原文链接
[https://segmentfault.com/a/1190000010067420](https://segmentfault.com/a/1190000010067420)


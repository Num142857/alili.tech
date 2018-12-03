---
title: 'JQuery快速使用之元素查找与操作' 
date: 2018-12-04 2:30:05
hidden: true
slug: v3mziy8c4e
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：心叶<br>时间：2018-04-22 00:41</p>
<p>以下是Jquery快速使用的查阅手册，没有个人理解的地方还请原谅，毕竟初衷只是方便开发时忘了可以快速查阅。</p>
<h2>第一步：sizzle选择器</h2>
<p>基于元素的id、类、类型、属性、属性值等"查找"（或选择）HTML元素，简单的说是基于css选择器，除此之外还有一些特定的选择器。</p>
<h2>第二步：查询祖先</h2>
<p>parent()</p>
<p>返回被选元素的直接父元素，该方法只会向上一级对 DOM 树进行遍历</p>
<p>parents()</p>
<p>可以使用可选参数来过滤对父元素的搜索<br>返回被选元素的所有祖先元素，它一路向上直到文档的根元素</p>
<p>parentsUntil()</p>
<p>返回介于两个给定元素之间的所有祖先元素，下面是例子：</p>
<pre><code>$(document).ready(function(){

    //会返回span开始到div为止的祖先元素
    
    $("span").parentsUntil("div");
    
});
</code></pre>
<h2>第三步：查询子孙</h2>
<p>children()<br>可以使用可选参数来过滤对子元素的搜索<br>返回被选元素的所有直接子元素，该方法只会向下一级对 DOM 树进行遍历</p>
<p>find()<br>可以使用可选参数来过滤对元素的搜索<br>返回被选元素的后代元素，一路向下直到最后一个后代</p>
<h2>第四步：查询同胞</h2>
<p>siblings()</p>
<p>返回被选元素的所有同胞元素</p>
<p>next()</p>
<p>返回被选元素的下一个同胞元素</p>
<p>nextAll()</p>
<p>返回被选元素的之后的全部同胞元素</p>
<p>nextUntil()</p>
<p>返回介于两个给定参数之间的所有跟随的同胞元素</p>
<pre><code>$(document).ready(function(){

    //返回介于 &lt;h2&gt;与&lt;h6&gt;元素之间的所有同胞元素
    
    $("h2").nextUntil("h6");
    
});</code></pre>
<p>prev()、prevAll() 和 prevUntil()</p>
<p>prev()、prevAll()以及prevUntil()方法的工作方式与上面的方法类似，只不过方向相反而已：它们返回的是前面的同胞元素（在 DOM 树中沿着同胞之前元素遍历，而不是之后元素遍历）。</p>
<h2>第五步：查询时添加过滤</h2>
<p>first()</p>
<p>返回选择的元素中的首个元素</p>
<p>last()</p>
<p>返回选择的元素中的最后一个元素</p>
<p>eq()</p>
<p>返回被选元素中带有指定索引号的元素，这个很容易理解，举例就是：$(element[flag])和element.eq(flag)结果一样</p>
<p>filter()</p>
<p>对查询结果进行过滤，和下面not()类似，作用相反</p>
<p>not()</p>
<p>返回不匹配标准的所有元素</p>
<pre><code>$(document).ready(function(){

    //返回不带有类名"target"的所有p元素
    
    $("p").not(".target");
    
});
</code></pre>
<p>元素找到以后，接着我们需要根据需求来对查找到的结点进行操作。</p>
<h2>第六步：text()、html()、val()以及attr()</h2>
<p>text()、html()、val()以及attr()，拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串</p>
<p>1.text() - 设置或返回所选元素的文本内容</p>
<p>2.html() - 设置或返回所选元素的内容（包括 HTML 标记）</p>
<p>3.val() - 设置或返回表单字段的值</p>
<p>4.attr() - 设置或返回属性值</p>
<pre><code>$("#btn1").click(function(){

    $("#test1").text(function(i,origText){
    
        return "旧文本: " + origText + " 新文本: index: " + i;
        
    });
    
});
</code></pre>
<h2>第七步：添加元素</h2>
<p>append() - 在被选元素的内部结尾插入内容</p>
<p>prepend() - 在被选元素的内部开头插入内容</p>
<p>after() - 在被选元素之后插入内容</p>
<p>before() - 在被选元素之前插入内容</p>
<h2>第八步：删除元素</h2>
<p>remove()可接受一个参数，允许你对被删元素进行过滤，empty()不可以</p>
<p>remove() - 删除被选元素（及其子元素）</p>
<p>empty() - 从被选元素中删除子元素</p>
<pre><code>//等同于$("p.target").remove();

$("p").remove(".target");
</code></pre>
<h2>第九步：替换元素</h2>
<p>replaceAll()和replaceWith()功能类似，但是目标和源相反</p>
<p>replaceWith() - 用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合</p>
<p>replaceAll() - 用集合的匹配元素替换每个目标元素</p>
<h2>第十步：class操作</h2>
<p>addClass() - 向被选元素添加一个或多个类</p>
<p>removeClass() - 从被选元素删除一个或多个类</p>
<p>toggleClass() - 对被选元素进行添加/删除类的切换操作</p>
<p>hasClass() - 判断一个元素是否存在该class</p>
<h2>第十一步：css()方法</h2>
<p>设置或返回被选元素的一个或多个样式属性</p>
<p>css("propertyname"); - 返回propertyname属性的值</p>
<p>css("propertyname","value"); - 设置propertyname属性的值</p>
<p>css({"propertyname":"value","propertyname":"value",...}); - 设置多个值</p>
<h2>第十二步：元素尺寸</h2>
<p>width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）</p>
<p>height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）</p>
<p>innerWidth() 方法返回元素的宽度（包括内边距）</p>
<p>innerHeight() 方法返回元素的高度（包括内边距）</p>
<p>outerWidth() 方法返回元素的宽度（包括内边距和边框）</p>
<p>outerHeight() 方法返回元素的高度（包括内边距和边框）</p>
<h2>第十三步：元素位置</h2>
<p>1.获取相对(父元素)位置</p>
<pre><code>var X = $('选择器').position().top;

var Y = $('选择器').position().left;
</code></pre>
<p>2.滚动条滚动距离</p>
<pre><code>var left=$('选择器').scrollLeft();

var top=$('选择器').scrollTop();</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JQuery快速使用之元素查找与操作

## 原文链接
[https://segmentfault.com/a/1190000014522257](https://segmentfault.com/a/1190000014522257)

